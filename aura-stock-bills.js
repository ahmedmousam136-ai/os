/* AuraScale NURSING HOME STOCK: supplier bills with the original document kept for ever.
   Used by the reception portal (receptionist.html) and the owner portal (nh.html), Stock page only.
   Not used by Pharmacy, Lab or Wholesale.

   Reception:  Stock -> "Add stock from bill" -> take a photo / upload the bill (photo or PDF)
               -> the ORIGINAL file is saved first, exactly as it is, in private storage
               -> AuraScale reads a copy of it -> every value is shown for checking and can be corrected
               -> Confirm -> the bill is saved and every line is added to stock (one step, all or nothing)
               -> optional WhatsApp message to the owner's chosen number.
   Both:       "Stock bills" list with  View  ·  Edit  ·  View original bill.
   Owner:      the same list, plus the WhatsApp "stock added" setting.

   The original file is never replaced: the storage bucket has no overwrite or delete permission, and the
   database refuses any change to the saved file path or to AuraScale's first reading. Corrections are saved
   as new values with a full before / after history. Needs deploy/10-stock-bills.sql and the "stock-bills" function. */
(function () {
  var BUCKET = 'stock-bills';
  var S = { items: [], bills: [], editing: null, doc: null, extracted: null, busy: false };
  function owner() { return typeof STOCK_IS_OWNER !== 'undefined' && STOCK_IS_OWNER === true; }
  function cid() { return typeof _clinicId !== 'undefined' ? _clinicId : null; }
  function db() { return typeof _supa !== 'undefined' ? _supa : null; }
  function E(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
  function toast(m) { if (typeof showToast === 'function') showToast(m); }
  function inr(n) { var x = Number(n); return isFinite(x) && n !== null && n !== '' ? '₹' + x.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '-'; }
  function q(n) { return Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 }); }
  function dmy(iso) { if (!iso) return '-'; var d = new Date(String(iso).length <= 10 ? iso + 'T00:00:00' : iso); return isNaN(d) ? '-' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
  function when(iso) { var d = new Date(iso); return isNaN(d) ? '-' : d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }); }
  function toISODate(s) {   /* DD/MM/YYYY, DD-MM-YY, YYYY-MM-DD -> YYYY-MM-DD */
    s = String(s || '').trim(); if (!s) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    var m = s.match(/^(\d{1,2})[\/\-. ](\d{1,2})[\/\-. ](\d{2,4})$/); if (!m) return '';
    var y = m[3].length === 2 ? '20' + m[3] : m[3];
    return y + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
  }
  function err(msg) {
    var m = String((msg && msg.message) || msg || '');
    if (/stock_bill_confirm|stock_bill_edit|nh_stock_bills|schema cache|PGRST20/i.test(m)) return 'Stock bills are not set up yet. Run 10-stock-bills.sql in Supabase first.';
    if (/bucket not found/i.test(m)) return 'The "stock-bills" storage is not set up yet. Run 10-stock-bills.sql in Supabase first.';
    if (/row-level security|not allowed|403/i.test(m)) return 'Your login is not allowed to change stock.';
    return m.replace(/^.*?ERROR:\s*/, '') || 'Something went wrong. Please try again.';
  }

  /* ---------------------------------------------------------------- styles */
  var css = ''
    + '.sb-list .sb-row{display:flex;gap:12px;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);flex-wrap:wrap}'
    + '.sb-list .sb-row:last-child{border-bottom:0}'
    + '.sb-ic{width:34px;height:34px;border-radius:9px;background:var(--green-bg);color:var(--green);display:grid;place-items:center;flex:none;font-size:16px}'
    + '.sb-main{flex:1 1 220px;min-width:0}.sb-main b{display:block;font-size:14px;color:var(--text-primary)}'
    + '.sb-main span{display:block;font-size:12px;color:var(--text-tertiary);margin-top:2px}'
    + '.sb-amt{font-weight:800;font-size:14px;white-space:nowrap}'
    + '.sb-acts{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto}'
    + '.sb-acts button{border-radius:9px;font-size:12.5px;font-weight:600;padding:7px 11px;border:1px solid var(--border);background:var(--surface);color:var(--text-primary);cursor:pointer}'
    + '.sb-acts button.sb-orig{background:var(--green-bg);border-color:var(--green-border);color:var(--green)}'
    + '.sb-modal{max-width:880px!important;width:min(880px,100%)!important}'
    + '.sb-pick{display:grid;grid-template-columns:1fr 1fr;gap:10px}'
    + '.sb-pick label{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:110px;border:2px dashed var(--border-mid);border-radius:14px;cursor:pointer;font-weight:700;font-size:14px;color:var(--text-primary);background:var(--surface2);text-align:center;padding:12px}'
    + '.sb-pick label:hover{border-color:var(--green)}.sb-pick label span{font-size:28px}.sb-pick small{font-weight:500;color:var(--text-tertiary);font-size:11.5px}'
    + '.sb-pick input{position:absolute;width:1px;height:1px;opacity:0}'
    + '.sb-status{display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:12px;background:var(--surface2);border:1px solid var(--border);font-size:13px;color:var(--text-secondary)}'
    + '.sb-spin{width:18px;height:18px;border-radius:50%;border:2.5px solid var(--green-border);border-top-color:var(--green);animation:sbspin .8s linear infinite;flex:none}'
    + '@keyframes sbspin{to{transform:rotate(360deg)}}'
    + '.sb-review{display:grid;grid-template-columns:200px minmax(0,1fr);gap:16px;align-items:start}'
    + '.sb-thumb{border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--surface2);text-align:center}'
    + '.sb-thumb img{display:block;width:100%;max-height:260px;object-fit:contain;background:#fff}'
    + '.sb-thumb .sb-pdf{padding:30px 10px;font-size:13px;color:var(--text-secondary)}'
    + '.sb-thumb button{width:100%;border:0;border-top:1px solid var(--border);background:var(--surface);padding:9px;font-weight:700;font-size:12.5px;color:var(--green);cursor:pointer}'
    + '.sb-hdr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:12px}'
    + '.sb-tablewrap{overflow-x:auto;border:1px solid var(--border);border-radius:12px}'
    + '.sb-t{width:100%;border-collapse:collapse;min-width:760px;font-size:12.5px}'
    + '.sb-t th{text-align:left;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--text-tertiary);padding:8px 6px;border-bottom:1px solid var(--border);background:var(--surface2)}'
    + '.sb-t td{padding:5px 4px;border-bottom:1px solid var(--border);vertical-align:top}'
    + '.sb-t input{width:100%;min-height:34px!important;padding:5px 7px!important;font-size:13px!important;border-radius:8px!important}'
    + '.sb-t .sb-hint{font-size:10.5px;color:var(--text-tertiary);margin-top:3px;white-space:nowrap}'
    + '.sb-t .sb-hint.new{color:var(--amber)}'
    + '.sb-x{border:1px solid var(--border);background:var(--surface);border-radius:8px;width:32px;height:32px;cursor:pointer;color:var(--red)}'
    + '.sb-add{margin-top:8px;border:1px dashed var(--border-mid);background:transparent;border-radius:10px;padding:8px 12px;font-weight:700;font-size:12.5px;color:var(--green);cursor:pointer}'
    + '.sb-note{font-size:12px;color:var(--text-tertiary);margin-top:8px;line-height:1.5}'
    + '.sb-err{color:var(--red);font-size:12.5px;margin-top:8px;display:none}'
    + '.sb-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:12px}'
    + '.sb-facts div{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:9px 11px}'
    + '.sb-facts small{display:block;font-size:11px;color:var(--text-tertiary);font-weight:600}.sb-facts b{font-size:14px}'
    + '.sb-log{margin-top:14px;border-top:1px solid var(--border);padding-top:10px}'
    + '.sb-log h4{margin:0 0 8px;font-size:13px}.sb-log div{font-size:12px;color:var(--text-secondary);padding:5px 0;border-bottom:1px dashed var(--border)}'
    + '.sb-log div:last-child{border-bottom:0}'
    + '.sb-viewer{position:fixed;inset:0;z-index:99970;background:rgba(0,0,0,.82);display:flex;flex-direction:column}'
    + '.sb-viewer-bar{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:10px 14px;background:#111;color:#fff;font-size:13px;flex-wrap:wrap}'
    + '.sb-viewer-bar a,.sb-viewer-bar button{color:#fff;background:#2a2a2a;border:1px solid #444;border-radius:8px;padding:7px 12px;font-size:12.5px;text-decoration:none;cursor:pointer}'
    + '.sb-viewer-body{flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:12px}'
    + '.sb-viewer-body img{max-width:100%;height:auto;background:#fff}'
    + '.sb-viewer-body iframe{width:100%;height:100%;border:0;background:#fff;min-height:70vh}'
    + '.sb-alert{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px 16px}'
    + '.sb-alert input[type=tel]{max-width:170px}'
    + '@media (max-width:700px){.sb-review{grid-template-columns:1fr}.sb-thumb img{max-height:180px}.sb-pick{grid-template-columns:1fr}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------------------------------------------------------------- page parts */
  function mount() {
    var v = $('v-stock'); if (!v || $('sb-panel')) return;
    var head = v.querySelector('.sh');
    if (!owner() && head) {
      var acts = head.querySelector('div[style*="display:flex"]') || head;
      var b = document.createElement('button');
      b.className = 'qbtn'; b.type = 'button'; b.id = 'sb-add-btn';
      b.style.cssText = 'background:var(--green);color:#fff;border-color:var(--green);font-weight:700;padding:8px 14px;font-size:12px';
      b.innerHTML = '&#128247; Add stock from bill'; b.onclick = function () { AuraStockBills.openAdd(); };
      acts.insertBefore(b, acts.firstChild);
    }
    var panel = document.createElement('div'); panel.className = 'panel'; panel.id = 'sb-panel';
    panel.innerHTML = '<div class="ph"><div class="pt">Stock bills</div><span class="ss" id="sb-summary"></span></div>'
      + (owner() ? '<div class="sb-alert" id="sb-alert"></div>' : '')
      + '<div class="sb-list" id="sb-list"><div class="empty" style="padding:18px"><p class="empty-t">Loading&hellip;</p></div></div>';
    var list = $('stock-list'), itemsPanel = list && list.closest('.panel');
    if (itemsPanel && itemsPanel.nextSibling) v.insertBefore(panel, itemsPanel.nextSibling); else v.appendChild(panel);

    /* modals */
    var m = document.createElement('div');
    m.innerHTML = '<div class="mod-ov" id="mod-sb-edit"><div class="modal sb-modal"><div class="mh"><div class="mtitle" id="sb-title">Add stock from bill</div>'
      + '<button class="mclose" type="button" onclick="AuraStockBills.closeAdd()">&#10005;</button></div><div class="mb" id="sb-body"></div></div></div>'
      + '<div class="mod-ov" id="mod-sb-view"><div class="modal sb-modal"><div class="mh"><div class="mtitle" id="sb-v-title">Stock bill</div>'
      + '<button class="mclose" type="button" onclick="closeModal(\'mod-sb-view\')">&#10005;</button></div><div class="mb" id="sb-v-body"></div></div></div>';
    while (m.firstChild) document.body.appendChild(m.firstChild);
  }

  async function load() {
    mount();
    var c = cid(), d = db(); if (!c || !d) return;
    var it = await d.from('nh_stock_items').select('id,name,unit,quantity,is_active').eq('clinic_id', c).order('name');
    S.items = it.data || [];
    var r = await d.from('nh_stock_bills').select('*').eq('clinic_id', c).order('created_at', { ascending: false }).limit(60);
    var list = $('sb-list'); if (!list) return;
    if (r.error) { list.innerHTML = '<p class="ss" style="padding:12px 16px">' + E(err(r.error)) + '</p>'; return; }
    S.bills = r.data || [];
    $('sb-summary').textContent = S.bills.length ? S.bills.length + (S.bills.length === 60 ? '+' : '') + (S.bills.length === 1 ? ' bill' : ' bills') : '';
    list.innerHTML = S.bills.length ? S.bills.map(row).join('')
      : '<div class="empty" style="padding:20px"><p class="empty-t">No stock bills yet</p><p class="ss">'
        + (owner() ? 'When reception adds stock from a supplier bill, it appears here with the original bill.' : 'Tap <b>Add stock from bill</b> and take a photo of the supplier’s bill. AuraScale reads it for you.') + '</p></div>';
    if (owner()) loadAlert();
  }
  function row(b) {
    var n = (b.items || []).length;
    return '<div class="sb-row"><div class="sb-ic" aria-hidden="true">&#128196;</div>'
      + '<div class="sb-main"><b>' + E(b.supplier || 'Supplier not named') + (b.invoice_no ? ' · Bill ' + E(b.invoice_no) : '') + '</b>'
      + '<span>' + E(dmy(b.invoice_date)) + ' · ' + n + ' item' + (n === 1 ? '' : 's') + (b.gst_total ? ' · GST ' + E(inr(b.gst_total)) : '')
      + ' · added by ' + E(b.created_by_name || '-') + ', ' + E(when(b.created_at)) + (b.edit_count ? ' · corrected ' + b.edit_count + '×' : '') + '</span></div>'
      + '<div class="sb-amt">' + E(inr(b.total)) + '</div>'
      + '<div class="sb-acts"><button type="button" onclick="AuraStockBills.view(\'' + b.id + '\')">View</button>'
      + '<button type="button" onclick="AuraStockBills.openEdit(\'' + b.id + '\')">Edit</button>'
      + '<button type="button" class="sb-orig" onclick="AuraStockBills.original(\'' + b.id + '\')">View original bill</button></div></div>';
  }

  /* ---------------------------------------------------------------- owner: WhatsApp setting */
  async function loadAlert() {
    var box = $('sb-alert'); if (!box) return;
    var r = await db().from('clinics').select('stock_alert_on,stock_alert_whatsapp').eq('id', cid()).maybeSingle();
    if (r.error) { box.style.display = 'none'; return; }
    var on = !!(r.data && r.data.stock_alert_on), num = (r.data && r.data.stock_alert_whatsapp) || '';
    box.innerHTML = '<label style="display:flex;gap:8px;align-items:center;font-size:13px;font-weight:600"><input type="checkbox" id="sb-al-on"' + (on ? ' checked' : '') + ' style="width:18px;height:18px"/> WhatsApp me when stock is added</label>'
      + '<input class="finput" id="sb-al-num" type="tel" inputmode="numeric" maxlength="14" placeholder="10-digit WhatsApp number" value="' + E(num) + '"/>'
      + '<button class="qbtn" type="button" onclick="AuraStockBills.saveAlert()">Save</button>'
      + '<span class="ss" style="font-size:12px">Only supplier, bill no, date, total and who added it. No patient details.</span>';
  }
  async function saveAlert() {
    var r = await db().rpc('stock_alert_set', { p_clinic_id: cid(), p_on: $('sb-al-on').checked, p_number: $('sb-al-num').value });
    toast(r.error ? err(r.error) : '✓ WhatsApp setting saved');
  }

  /* ---------------------------------------------------------------- add: step 1, the original document */
  function openAdd() {
    mount(); S.editing = null; S.doc = null; S.extracted = null; S.busy = false;
    $('sb-title').textContent = 'Add stock from bill';
    $('sb-body').innerHTML = '<p class="ss" style="margin:0 0 12px">Take a clear photo of the supplier’s bill, or upload the photo / PDF they sent. The original is saved exactly as it is, and AuraScale reads the items for you to check.</p>'
      + '<div class="sb-pick">'
      + '<label for="sb-cam"><span>&#128247;</span>Take photo<small>Use the phone / tablet camera</small><input type="file" id="sb-cam" accept="image/*" capture="environment"/></label>'
      + '<label for="sb-file"><span>&#128196;</span>Upload bill<small>Photo (JPG, PNG) or PDF, up to 25 MB</small><input type="file" id="sb-file" accept="image/*,application/pdf"/></label>'
      + '</div><div id="sb-step" style="margin-top:12px"></div><div class="sb-err" id="sb-err"></div>';
    ['sb-cam', 'sb-file'].forEach(function (id) { $(id).addEventListener('change', function () { if (this.files && this.files[0]) chosen(this.files[0]); }); });
    openModal('mod-sb-edit');
  }
  function closeAdd() { closeModal('mod-sb-edit'); S.busy = false; }
  function status(html) { $('sb-step').innerHTML = html; }
  function showErr(id, m) { var e = $(id); if (e) { e.textContent = m || ''; e.style.display = m ? 'block' : 'none'; } }

  async function chosen(file) {
    if (S.busy) return; showErr('sb-err', '');
    var okType = /^image\//.test(file.type) || file.type === 'application/pdf';
    if (!okType) return showErr('sb-err', 'Please choose a photo (JPG / PNG) or a PDF.');
    if (file.size > 25 * 1024 * 1024) return showErr('sb-err', 'This file is bigger than 25 MB. Please take a photo instead.');
    S.busy = true;
    status('<div class="sb-status"><div class="sb-spin"></div>Saving the original bill&hellip;</div>');
    /* 1) the ORIGINAL file goes to private storage first, untouched (no overwrite allowed) */
    var safe = (file.name || 'bill').replace(/[^A-Za-z0-9._-]+/g, '-').slice(-80) || 'bill';
    var id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
    var path = cid() + '/' + id + '/' + safe;
    var up = await db().storage.from(BUCKET).upload(path, file, { upsert: false, contentType: file.type || 'application/octet-stream', cacheControl: '31536000' });
    if (up.error) { S.busy = false; status(''); return showErr('sb-err', err(up.error)); }
    S.doc = { path: path, name: file.name || safe, mime: file.type, size: file.size, local: URL.createObjectURL(file) };
    /* 2) a COPY is read by AuraScale (photos are made smaller for reading only; the saved original is not touched) */
    status('<div class="sb-status"><div class="sb-spin"></div>Original saved. Reading the bill (about 15–30 seconds)&hellip;</div>');
    var payload = null;
    try {
      if (file.type === 'application/pdf') {
        if (file.size <= 10 * 1024 * 1024) payload = { data: await b64(file), mime: 'application/pdf' };
      } else payload = { data: await shrink(file), mime: 'image/jpeg' };
    } catch (e) { payload = null; }
    var res = null;
    if (payload) {
      try {
        var r = await db().functions.invoke('stock-bills', { body: { mode: 'scan', clinic_id: cid(), file_base64: payload.data, mime_type: payload.mime } });
        res = r && r.data;
      } catch (e) { res = null; }
    }
    S.busy = false;
    if (res && res.ok) {
      S.extracted = res;
      review(res, 'AuraScale read <b>' + res.lines.length + '</b> line' + (res.lines.length === 1 ? '' : 's') + '. Please check every value against the bill and correct anything that is wrong before confirming.');
    } else {
      S.extracted = { ok: false, reason: (res && res.reason) || 'not_read' };
      var why = res && res.reason === 'daily_limit' ? 'Today’s limit for reading bills is used up.'
        : res && res.reason === 'ai_key_not_set' ? 'Bill reading is not switched on yet.'
        : 'AuraScale could not read this bill.';
      review({ lines: [{}] }, why + ' The original is saved. Please type the items below.');
    }
  }
  function b64(file) { return new Promise(function (ok, no) { var r = new FileReader(); r.onload = function () { ok(String(r.result).split(',')[1]); }; r.onerror = no; r.readAsDataURL(file); }); }
  function shrink(file) {
    return new Promise(function (ok, no) {
      var img = new Image(), u = URL.createObjectURL(file);
      img.onload = function () {
        var max = 2000, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u); ok(c.toDataURL('image/jpeg', 0.85).split(',')[1]);
      };
      img.onerror = function () { URL.revokeObjectURL(u); no(new Error('image')); };
      img.src = u;
    });
  }

  /* ---------------------------------------------------------------- add / edit: the review form */
  function review(d, note) {
    var isEdit = !!S.editing;
    var thumb = S.doc && /^image\//.test(S.doc.mime || '') && S.doc.local ? '<img alt="Original bill" src="' + E(S.doc.local) + '"/>' : '<div class="sb-pdf">&#128196;<br/>' + E((S.doc && S.doc.name) || 'Original bill') + '</div>';
    var h = '<div class="sb-review"><div class="sb-thumb">' + thumb + '<button type="button" onclick="AuraStockBills.originalOf(\'' + E(S.doc ? S.doc.path : '') + '\',\'' + E(S.doc ? S.doc.mime : '') + '\')">View original bill</button></div><div>'
      + '<div class="sb-status" style="margin-bottom:12px"><span>' + note + '</span></div>'
      + '<div class="sb-hdr">'
      + fld('sb-h-sup', 'Supplier', d.supplier) + fld('sb-h-gstin', 'Supplier GSTIN', d.supplier_gstin, 'maxlength="15"')
      + fld('sb-h-no', 'Bill / invoice no', d.invoice_no) + '<div><label class="flbl" for="sb-h-date">Bill date</label><input class="finput" id="sb-h-date" type="date" value="' + E(toISODate(d.invoice_date)) + '"/></div>'
      + fld('sb-h-sub', 'Amount before GST (₹)', d.subtotal, 'type="number" step="0.01" min="0"') + fld('sb-h-gst', 'GST total (₹)', d.gst_total, 'type="number" step="0.01" min="0"')
      + fld('sb-h-tot', 'Bill total (₹)', d.total, 'type="number" step="0.01" min="0"')
      + '</div>'
      + '<datalist id="sb-names">' + S.items.map(function (i) { return '<option value="' + E(i.name) + '"></option>'; }).join('') + '</datalist>'
      + '<div class="sb-tablewrap"><table class="sb-t"><thead><tr><th style="width:26%">Item</th><th style="width:9%">Qty</th><th style="width:8%">Unit</th><th style="width:10%">Rate ₹</th><th style="width:7%">GST %</th><th style="width:11%">Amount ₹</th><th style="width:11%">Batch</th><th style="width:10%">Expiry</th><th></th></tr></thead>'
      + '<tbody id="sb-lines"></tbody></table></div>'
      + '<button type="button" class="sb-add" onclick="AuraStockBills.addLine()">+ Add a line</button>'
      + (isEdit ? '<div style="margin-top:12px"><label class="flbl" for="sb-reason">Why are you correcting this bill? *</label><input class="finput" id="sb-reason" maxlength="200" placeholder="e.g. quantity read wrong, supplier corrected"/></div>' : '')
      + '<p class="sb-note">Quantities are added to stock when you confirm. Item names that match your stock list are added to that item; a new name creates a new stock item (set its bill price later in Stock → Edit). '
      + (isEdit ? 'Changing a quantity here adds or takes back the difference. The original bill and AuraScale’s first reading stay as they were.' : 'The original bill stays saved exactly as uploaded.') + '</p>'
      + '<div class="sb-err" id="sb-err2"></div>'
      + '<button class="msub" type="button" id="sb-save" onclick="AuraStockBills.save()" style="margin-top:10px">' + (isEdit ? 'Save correction' : '&#10003; Confirm and add to stock') + '</button>'
      + '</div></div>';
    $('sb-body').innerHTML = h;
    (d.lines && d.lines.length ? d.lines : [{}]).forEach(function (l) { addLine(l); });
  }
  function fld(id, label, val, attrs) {
    return '<div><label class="flbl" for="' + id + '">' + label + '</label><input class="finput" id="' + id + '" ' + (attrs || '') + ' value="' + E(val == null ? '' : val) + '"/></div>';
  }
  function addLine(l) {
    l = l || {}; var tb = $('sb-lines'); if (!tb) return;
    var tr = document.createElement('tr'); if (l.item_id) tr.setAttribute('data-item', l.item_id);
    tr.innerHTML = '<td><input class="finput" data-k="name" list="sb-names" maxlength="80" value="' + E(l.name || '') + '"' + (l.item_id ? ' readonly title="Saved line: the item cannot be changed. Remove the line and add a new one instead."' : '') + '/><div class="sb-hint"></div></td>'
      + '<td><input class="finput" data-k="qty" type="number" step="any" min="0" value="' + E(l.qty == null ? '' : l.qty) + '"/></td>'
      + '<td><input class="finput" data-k="unit" maxlength="20" value="' + E(l.unit || '') + '" placeholder="pcs"/></td>'
      + '<td><input class="finput" data-k="rate" type="number" step="any" min="0" value="' + E(l.rate == null ? '' : l.rate) + '"/></td>'
      + '<td><input class="finput" data-k="gst" type="number" step="any" min="0" value="' + E(l.gst == null ? '' : l.gst) + '"/></td>'
      + '<td><input class="finput" data-k="amount" type="number" step="any" min="0" value="' + E(l.amount == null ? '' : l.amount) + '"/></td>'
      + '<td><input class="finput" data-k="batch" maxlength="40" value="' + E(l.batch || '') + '"/></td>'
      + '<td><input class="finput" data-k="expiry" maxlength="20" placeholder="MM/YYYY" value="' + E(l.expiry || '') + '"/></td>'
      + '<td><button type="button" class="sb-x" aria-label="Remove this line" onclick="this.closest(\'tr\').remove()">&#10005;</button></td>';
    tb.appendChild(tr);
    var nm = tr.querySelector('[data-k=name]');
    nm.addEventListener('input', function () { hint(tr); }); hint(tr);
  }
  function hint(tr) {
    var nm = tr.querySelector('[data-k=name]').value.trim().toLowerCase(), h = tr.querySelector('.sb-hint');
    if (!nm) { h.textContent = ''; return; }
    var it = S.items.filter(function (i) { return i.name.trim().toLowerCase() === nm; })[0];
    if (it) { h.className = 'sb-hint'; h.textContent = 'Adds to ' + it.name + ' (' + q(it.quantity) + ' ' + it.unit + ' now)'; var u = tr.querySelector('[data-k=unit]'); if (!u.value) u.value = it.unit; }
    else { h.className = 'sb-hint new'; h.textContent = 'New stock item'; }
  }
  function gather() {
    var lines = [], bad = '';
    [].forEach.call(document.querySelectorAll('#sb-lines tr'), function (tr) {
      var o = {}; [].forEach.call(tr.querySelectorAll('[data-k]'), function (i) { o[i.getAttribute('data-k')] = i.value.trim(); });
      if (!o.name && !o.qty) return;
      if (!o.name) bad = bad || 'Every line needs an item name.';
      if (!(Number(o.qty) > 0)) bad = bad || 'Quantity must be more than 0 for ' + (o.name || 'every line') + '.';
      ['qty', 'rate', 'gst', 'amount'].forEach(function (k) { o[k] = o[k] === '' ? null : Number(o[k]); });
      if (tr.getAttribute('data-item')) o.item_id = tr.getAttribute('data-item');
      lines.push(o);
    });
    if (!lines.length) bad = bad || 'Add at least one item.';
    var header = {
      supplier: $('sb-h-sup').value.trim(), supplier_gstin: $('sb-h-gstin').value.trim().toUpperCase(), invoice_no: $('sb-h-no').value.trim(),
      invoice_date: $('sb-h-date').value || '', subtotal: $('sb-h-sub').value, gst_total: $('sb-h-gst').value, total: $('sb-h-tot').value
    };
    if (header.supplier_gstin && !/^[0-9]{2}[A-Z0-9]{13}$/.test(header.supplier_gstin)) bad = bad || 'The supplier GSTIN should be 15 letters / numbers (or leave it empty).';
    return { lines: lines, header: header, bad: bad };
  }
  async function save() {
    if (S.busy) return;
    var g = gather(); if (g.bad) return showErr('sb-err2', g.bad);
    var btn = $('sb-save'); S.busy = true; btn.disabled = true; showErr('sb-err2', '');
    var r;
    if (S.editing) {
      var reason = ($('sb-reason').value || '').trim();
      if (reason.length < 3) { S.busy = false; btn.disabled = false; return showErr('sb-err2', 'Please write why you are correcting this bill.'); }
      r = await db().rpc('stock_bill_edit', { p_bill_id: S.editing, p_header: g.header, p_items: g.lines, p_reason: reason });
    } else {
      r = await db().rpc('stock_bill_confirm', { p_clinic_id: cid(), p_doc: { path: S.doc.path, name: S.doc.name, mime: S.doc.mime, size: S.doc.size },
        p_extracted: S.extracted || {}, p_header: g.header, p_items: g.lines });
    }
    S.busy = false; btn.disabled = false;
    if (r.error) return showErr('sb-err2', err(r.error));
    var saved = r.data || {};
    closeModal('mod-sb-edit');
    toast(S.editing ? '✓ Bill corrected' : '✓ Stock added from bill ' + (saved.invoice_no || ''));
    if (!S.editing && saved.id) {   /* optional owner WhatsApp: never blocks or undoes the stock entry */
      try { db().functions.invoke('stock-bills', { body: { mode: 'notify', bill_id: saved.id } }).catch(function () {}); } catch (e) {}
    }
    S.editing = null;
    if (typeof loadStock === 'function') loadStock(); else load();
  }

  /* ---------------------------------------------------------------- edit a saved bill */
  function openEdit(id) {
    var b = S.bills.filter(function (x) { return x.id === id; })[0]; if (!b) return;
    mount(); S.editing = id; S.busy = false; S.doc = { path: b.doc_path, name: b.doc_name, mime: b.doc_mime, local: null };
    $('sb-title').textContent = 'Correct stock bill';
    $('sb-body').innerHTML = '';
    openModal('mod-sb-edit');
    review({ supplier: b.supplier, supplier_gstin: b.supplier_gstin, invoice_no: b.invoice_no, invoice_date: b.invoice_date,
             subtotal: b.subtotal, gst_total: b.gst_total, total: b.total, lines: b.items || [] },
      'Correct the values below. Your change is saved with your name, the time and the reason; the earlier values stay in the history.');
    signed(b.doc_path, function (u) { var t = document.querySelector('#sb-body .sb-thumb'); if (u && t && /^image\//.test(b.doc_mime || '')) t.firstChild.outerHTML = '<img alt="Original bill" src="' + E(u) + '"/>'; });
  }

  /* ---------------------------------------------------------------- view a saved bill + its history */
  async function view(id) {
    var b = S.bills.filter(function (x) { return x.id === id; })[0]; if (!b) return;
    mount();
    $('sb-v-title').textContent = (b.supplier || 'Stock bill') + (b.invoice_no ? ' · ' + b.invoice_no : '');
    var lines = b.items || [];
    $('sb-v-body').innerHTML = '<div class="sb-facts">'
      + fact('Supplier', b.supplier) + fact('Supplier GSTIN', b.supplier_gstin) + fact('Bill no', b.invoice_no) + fact('Bill date', dmy(b.invoice_date))
      + fact('Before GST', inr(b.subtotal)) + fact('GST', inr(b.gst_total)) + fact('Bill total', inr(b.total)) + fact('Added by', (b.created_by_name || '-') + ', ' + when(b.created_at))
      + '</div><div class="sb-tablewrap"><table class="sb-t" style="min-width:640px"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>GST %</th><th>Amount</th><th>Batch</th><th>Expiry</th></tr></thead><tbody>'
      + lines.map(function (l) { return '<tr><td><b>' + E(l.name) + '</b>' + (l.new_item ? ' <span class="sb-hint new">new item</span>' : '') + '</td><td>' + E(q(l.qty) + ' ' + (l.unit || '')) + '</td><td>' + E(inr(l.rate)) + '</td><td>' + E(l.gst == null ? '-' : l.gst) + '</td><td>' + E(inr(l.amount)) + '</td><td>' + E(l.batch || '-') + '</td><td>' + E(l.expiry || '-') + '</td></tr>'; }).join('')
      + '</tbody></table></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="msub" type="button" style="width:auto;padding:0 18px" onclick="AuraStockBills.original(\'' + b.id + '\')">View original bill</button>'
      + '<button class="qbtn" type="button" onclick="closeModal(\'mod-sb-view\');AuraStockBills.openEdit(\'' + b.id + '\')">Edit</button></div>'
      + '<div class="sb-log" id="sb-log"><h4>History</h4><div>Loading&hellip;</div></div>';
    openModal('mod-sb-view');
    var lg = await db().from('nh_stock_bill_log').select('*').eq('bill_id', id).order('at');
    var order = { uploaded: 0, extracted: 1, confirmed: 2, notified: 3, edited: 4 };
    var rows = (lg.data || []).sort(function (a, c) { return new Date(a.at) - new Date(c.at) || (order[a.action] - order[c.action]); });
    $('sb-log').innerHTML = '<h4>History</h4>' + (rows.length ? rows.map(function (x) {
      var t = when(x.at) + ' · ';
      if (x.action === 'uploaded') return '<div>' + t + 'Original bill uploaded by <b>' + E(x.by_name) + '</b>' + (x.after && x.after.file ? ' (' + E(x.after.file) + ')' : '') + '</div>';
      if (x.action === 'extracted') return '<div>' + t + (x.after && x.after.ok === false ? 'AuraScale could not read it; typed by hand' : 'Read by AuraScale (' + E(((x.after && x.after.lines) || []).length) + ' lines)') + '</div>';
      if (x.action === 'confirmed') return '<div>' + t + 'Checked and confirmed by <b>' + E(x.by_name) + '</b>; added to stock</div>';
      if (x.action === 'notified') return '<div>' + t + 'Owner told on WhatsApp</div>';
      if (x.action === 'edited') return '<div>' + t + 'Corrected by <b>' + E(x.by_name) + '</b>: “' + E(x.reason) + '”' + diff(x.before, x.after) + '</div>';
      return '<div>' + t + E(x.action) + '</div>';
    }).join('') : '<div>No history.</div>');
  }
  function fact(k, v) { return '<div><small>' + k + '</small><b>' + E(v == null || v === '' ? '-' : v) + '</b></div>'; }
  function diff(a, b) {
    if (!a || !b) return '';
    var out = [];
    ['supplier', 'supplier_gstin', 'invoice_no', 'invoice_date', 'subtotal', 'gst_total', 'total'].forEach(function (k) { if (String(a[k] == null ? '' : a[k]) !== String(b[k] == null ? '' : b[k])) out.push(k.replace(/_/g, ' ') + ': ' + (a[k] == null ? '-' : a[k]) + ' → ' + (b[k] == null ? '-' : b[k])); });
    var am = {}; (a.items || []).forEach(function (l) { am[l.item_id] = l; });
    (b.items || []).forEach(function (l) { var o = am[l.item_id]; if (!o) out.push('added ' + l.name + ' × ' + q(l.qty)); else { if (Number(o.qty) !== Number(l.qty)) out.push(l.name + ' qty ' + q(o.qty) + ' → ' + q(l.qty)); delete am[l.item_id]; } });
    Object.keys(am).forEach(function (k) { out.push('removed ' + am[k].name); });
    return out.length ? '<br/><span style="color:var(--text-tertiary)">' + E(out.join(' · ')) + '</span>' : '';
  }

  /* ---------------------------------------------------------------- the ORIGINAL document, exactly as uploaded */
  function signed(path, cb) {
    if (!path) return cb(null);
    db().storage.from(BUCKET).createSignedUrl(path, 600).then(function (r) { cb(r && r.data && r.data.signedUrl); }, function () { cb(null); });
  }
  function original(id) { var b = S.bills.filter(function (x) { return x.id === id; })[0]; if (b) originalOf(b.doc_path, b.doc_mime, b.doc_name); }
  function originalOf(path, mime, name) {
    if (!path) return;
    signed(path, function (u) {
      if (!u) return toast('Could not open the original bill. Please try again.');
      var ov = document.createElement('div'); ov.className = 'sb-viewer'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Original bill');
      var isPdf = mime === 'application/pdf' || /\.pdf$/i.test(path);
      ov.innerHTML = '<div class="sb-viewer-bar"><span>Original bill as uploaded' + (name ? ': ' + E(name) : '') + '</span><span style="display:flex;gap:8px">'
        + '<a href="' + E(u) + '" target="_blank" rel="noopener">Open in new tab</a><button type="button">Close</button></span></div>'
        + '<div class="sb-viewer-body">' + (isPdf ? '<iframe title="Original bill" src="' + E(u) + '"></iframe>' : '<img alt="Original bill" src="' + E(u) + '"/>') + '</div>';
      ov.querySelector('button').onclick = function () { ov.remove(); };
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
      document.body.appendChild(ov);
    });
  }

  window.AuraStockBills = { load: load, openAdd: openAdd, closeAdd: closeAdd, addLine: addLine, save: save, openEdit: openEdit, view: view,
                            original: original, originalOf: originalOf, saveAlert: saveAlert };

  /* refresh the bills list every time the Stock page loads */
  function hook() {
    if (typeof window.loadStock !== 'function' || window.loadStock.__sb) return;
    var orig = window.loadStock;
    window.loadStock = async function () { var r = await orig.apply(this, arguments); try { await load(); } catch (e) {} return r; };
    window.loadStock.__sb = true;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook); else hook();
  window.addEventListener('load', hook);
})();
