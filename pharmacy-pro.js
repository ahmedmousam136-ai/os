/* AuraScale Pharmacy PRO (loaded by pharmacy.html after its own script; uses its MEDS, MEDMAP, CART, posAdd ...)
   1. Re-order: what is running out, how many to order, sent to the wholesaler on AuraScale (or WhatsApp)   [file 31]
   2. Substitutes: same salt in stock when a medicine is out                                                   [no SQL]
   3. Refills due: customers whose medicines finish soon, one tap to bill them again                            [file 5]
   4. Return to supplier: expired / near-expiry / damaged stock with a return note PDF                          [file 31]
   5. Schedule H1 register: made from the bills, PDF + Excel                                                    [no SQL]
   + a "done" tick for every important action. */

if (typeof A !== 'function') { window.A = function (v) { return esc(JSON.stringify(v)); }; }   /* a value inside onclick="..." */

/* =================================================================== DONE TICK */
(function () {
  var css = '.pk-ok{position:fixed;inset:0;z-index:300;display:flex;align-items:center;justify-content:center;background:rgba(10,30,20,.28);opacity:0;transition:opacity .18s;pointer-events:none}'
    + '.pk-ok.on{opacity:1;pointer-events:auto}.pk-card{background:var(--surface,#fff);border-radius:20px;padding:26px 30px;min-width:240px;max-width:86vw;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);transform:scale(.92);transition:transform .25s cubic-bezier(.2,.9,.3,1.25)}'
    + '.pk-ok.on .pk-card{transform:none}.pk-t{font-weight:800;font-size:18px;margin-top:10px;color:var(--text-primary,#123)}.pk-s{font-size:13.5px;color:var(--text-secondary,#567);margin-top:4px;line-height:1.45}'
    + '.pk-c{stroke-dasharray:170;stroke-dashoffset:170;animation:pkC .5s ease-out forwards}.pk-p{stroke-dasharray:40;stroke-dashoffset:40;animation:pkP .3s .42s ease-out forwards}'
    + '@keyframes pkC{to{stroke-dashoffset:0}}@keyframes pkP{to{stroke-dashoffset:0}}'
    + '.pk-ring{animation:pkR .7s .5s ease-out both;transform-origin:center}@keyframes pkR{from{opacity:.55;transform:scale(.6)}to{opacity:0;transform:scale(1.5)}}'
    + '@media (prefers-reduced-motion:reduce){.pk-c,.pk-p{animation:none;stroke-dashoffset:0}.pk-ring{display:none}.pk-card{transition:none}}'
    + '.pp-pill{display:inline-block;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;border:1px solid var(--border)}'
    + '.pp-sub{margin-top:4px;padding:6px 8px;border-radius:8px;background:var(--green-bg);border:1px dashed var(--green-border);font-size:12.5px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
var _pkT = null;
function phOk(title, sub, ms) {
  var el = document.getElementById('pk-ok');
  if (!el) { el = document.createElement('div'); el.id = 'pk-ok'; el.className = 'pk-ok'; el.onclick = function () { el.classList.remove('on'); }; document.body.appendChild(el); }
  el.innerHTML = '<div class="pk-card" role="status" aria-live="polite"><svg width="84" height="84" viewBox="0 0 64 64" fill="none" aria-hidden="true">'
    + '<circle class="pk-ring" cx="32" cy="32" r="27" stroke="var(--green)" stroke-width="2"></circle>'
    + '<circle class="pk-c" cx="32" cy="32" r="27" stroke="var(--green)" stroke-width="3.5" fill="var(--green-bg)"></circle>'
    + '<path class="pk-p" d="M20 33l8 8 16-17" stroke="var(--green)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    + '<div class="pk-t">' + esc(title) + '</div>' + (sub ? '<div class="pk-s">' + sub + '</div>' : '') + '</div>';
  void el.offsetWidth; el.classList.add('on');
  try { if (navigator.vibrate) navigator.vibrate([12, 40, 18]); } catch (e) {}
  clearTimeout(_pkT); _pkT = setTimeout(function () { el.classList.remove('on'); }, ms || 1700);
}
function ppModal(id, title, wide) {
  if (dEl(id)) return;
  var d = document.createElement('div'); d.className = 'modal-bg'; d.id = id;
  d.innerHTML = '<div class="modal" style="max-width:' + (wide || 900) + 'px"><div class="modal-h"><span id="' + id + '-t">' + esc(title) + '</span><button class="btn btn-sm" onclick="dClose(\'' + id + '\')">&times;</button></div><div class="modal-b" id="' + id + '-b"></div></div>';
  document.body.appendChild(d);
}
function ppLS(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem('aura-ph-' + _clinicId + '-' + k) || 'null'); localStorage.setItem('aura-ph-' + _clinicId + '-' + k, JSON.stringify(v)); } catch (e) { return null; } }
function ppMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && (e.message || e.code)) || e)); }

/* =================================================================== 2. SUBSTITUTES (same salt, in stock) */
function saltKey(c) {
  var s = String(c || '').toLowerCase().replace(/\(.*?\)/g, ' ').replace(/\b(ip|bp|usp|tablets?|tabs?|capsules?|caps?)\b/g, ' ').replace(/(\d)\s*(milligrams?|mgs?)\b/g, '$1').replace(/[^a-z0-9.+,&]/g, '');
  if (s.length < 4) return '';
  return s.split(/[+,&]/).filter(Boolean).sort().join('+');
}
function subsFor(md, n) {
  var k = md && saltKey(md.composition); if (!k) return [];
  return MEDS.filter(function (x) { return x.id !== md.id && x.is_active && x.stock > 0 && saltKey(x.composition) === k; })
    .sort(function (a, b) { return (a.next ? Number(a.next.mrp) : 1e9) - (b.next ? Number(b.next.mrp) : 1e9); }).slice(0, n || 3);
}
function subsHtml(md, after) {
  var s = subsFor(md, 3); if (!s.length) return '';
  return '<div class="pp-sub">&#8644; <b>Same salt in stock:</b> ' + s.map(function (x) {
    return '<a href="#" style="font-weight:700;color:var(--green)" onclick="' + (after || '') + 'posAdd(\'' + x.id + '\');return false">' + esc(x.name) + '</a> <span class="tiny">' + (x.next ? dMoney(x.next.mrp) + '/' + esc(x.unit) : '') + ' &middot; ' + x.stock + ' left</span>';
  }).join(' &nbsp;|&nbsp; ') + '</div>';
}
/* out of stock at the counter: offer the substitute right there */
function ppOutOfStock(md) {
  var box = dEl('pp-subs'); if (!box) return false;
  var h = subsHtml(md, "dEl('pp-subs').innerHTML='';");
  box.innerHTML = '<div class="tiny over" style="margin-top:6px"><b>' + esc(md.name) + '</b> is out of stock.</div>' + (h || '<div class="tiny">No other medicine with the same salt is in stock. Add it to the <a href="#" onclick="dTab(\'order\');return false">re-order list</a>.</div>');
  return true;
}

/* =================================================================== 3. REFILLS DUE */
async function refillLoad() {
  var box = dEl('refill-due'); if (!box) return;
  var from = new Date(Date.now() + 5.5 * 3600e3 - 3 * 864e5).toISOString().slice(0, 10), to = new Date(Date.now() + 5.5 * 3600e3 + 3 * 864e5).toISOString().slice(0, 10);
  var r = await _supa.from('ph_sales').select('id,bill_no,patient_name,patient_phone,patient_id,refill_due,refill_sent_at,created_at,total')
    .eq('clinic_id', _clinicId).eq('cancelled', false).gte('refill_due', from).lte('refill_due', to).order('refill_due').limit(40);
  if (r.error || !r.data || !r.data.length) { box.innerHTML = ''; return; }
  /* already came back after that bill? then not due */
  var list = r.data, phones = list.map(function (s) { return s.patient_phone; }).filter(Boolean);
  var later = phones.length ? await _supa.from('ph_sales').select('patient_phone,created_at').eq('clinic_id', _clinicId).eq('cancelled', false).in('patient_phone', phones).gte('created_at', from) : { data: [] };
  list = list.filter(function (s) { return !(later.data || []).some(function (x) { return x.patient_phone === s.patient_phone && x.created_at > s.created_at; }); });
  if (!list.length) { box.innerHTML = ''; return; }
  var today = dTodayIST();
  box.innerHTML = '<details class="card" id="refill-det" style="margin-bottom:12px;padding:10px 14px;border-color:var(--amber)"' + (ppLS('refill-open') === false ? '' : ' open') + '><summary style="cursor:pointer;font-weight:800">&#128276; Refills due (' + list.length + ') <span class="tiny" style="font-weight:500">customers whose medicines finish around now</span></summary>'
    + list.map(function (s) {
      var d = dDaysTo(s.refill_due), when = d < 0 ? (-d) + ' day' + (d === -1 ? '' : 's') + ' ago' : d === 0 ? 'today' : 'in ' + d + ' day' + (d === 1 ? '' : 's');
      return '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--border);padding:7px 0"><div style="flex:1;min-width:180px"><b>' + esc(s.patient_name || '') + '</b> <span class="tiny">' + esc(s.patient_phone || '') + '</span>'
        + '<div class="tiny">Due ' + when + ' &middot; last bill ' + esc(s.bill_no) + ' (' + dMoney0(s.total) + ')' + (s.refill_sent_at ? ' &middot; <span style="color:var(--green)">reminder sent &#10003;</span>' : '') + '</div></div>'
        + '<button class="btn btn-sm" onclick="refillWa(' + A(s.id) + ')">&#128242; Remind</button><button class="btn btn-sm btn-g" onclick="refillBill(' + A(s.id) + ')">&#8635; Bill again</button></div>';
    }).join('') + '</details>';
  window._REFILL = list;
  var det = dEl('refill-det'); if (det) det.addEventListener('toggle', function () { ppLS('refill-open', det.open); });
}
function refillGet(id) { return (window._REFILL || []).filter(function (s) { return s.id === id; })[0]; }
function refillWa(id) {
  var s = refillGet(id); if (!s) return; var p = ph();
  deptWhatsApp(s.patient_phone, 'Namaskar ' + (s.patient_name || '') + ',\nYour medicines from ' + (p.name || DEPT.clinic.name || '') + ' (bill ' + s.bill_no + ') may be finishing soon.\nReply on WhatsApp or visit us and we will keep them ready.\nThank you.');
}
function refillBill(id) {
  var s = refillGet(id); if (!s) return;
  if (KIND !== 'walkin') posKind('walkin');
  dEl('c-name').value = s.patient_name || ''; dEl('c-phone').value = s.patient_phone || ''; if (window.deptPhoneInput) deptPhoneInput(dEl('c-phone'));
  _repKey = ''; repeatOffer().then(function () { if (_repSale) repeatLoad(); });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
/* prescription says "for 10 days": set the refill reminder for the customer automatically */
function ppRefillFromRx(days) {
  var sel = dEl('c-refill'); if (!sel || !(days > 0) || KIND !== 'walkin') return '';
  var opts = [].map.call(sel.options, function (o) { return Number(o.value); }).filter(function (v) { return v > 0 && v <= days; });
  if (!opts.length) return '';
  var v = Math.max.apply(null, opts); sel.value = String(v);
  return dMobile(dEl('c-phone').value) ? 'Refill reminder set: after ' + v + ' days.' : 'Refill reminder after ' + v + ' days needs the customer\'s mobile number.';
}

/* =================================================================== 1. RE-ORDER */
var RO = { rows: [], groups: [], sold: {}, sup: {}, gst: {}, sent: [], whs: {} };
function onTab_order() { roLoad(); }
async function roLoad() {
  var root = dEl('ro-root'); if (!root) return;
  root.innerHTML = '<div class="tiny">Working out what is running out&hellip;</div>';
  await loadMeds();
  /* sold in the last 30 days */
  var since = new Date(Date.now() - 30 * 864e5).toISOString(), sold = {};
  var s = await _supa.from('ph_sales').select('id').eq('clinic_id', _clinicId).eq('cancelled', false).gte('created_at', since).limit(5000);
  var ids = (s.data || []).map(function (x) { return x.id; });
  for (var i = 0; i < ids.length; i += 150) {
    var it = await _supa.from('ph_sale_items').select('medicine_id,qty').in('sale_id', ids.slice(i, i + 150));
    (it.data || []).forEach(function (l) { if (l.medicine_id) sold[l.medicine_id] = (sold[l.medicine_id] || 0) + Number(l.qty); });
  }
  /* who supplied each medicine last, and the supplier's GSTIN from scanned bills */
  var b = await _supa.from('ph_batches').select('medicine_id,supplier,created_at').eq('clinic_id', _clinicId).order('created_at', { ascending: false }).limit(5000);
  var sup = {}; (b.data || []).forEach(function (x) { if (!sup[x.medicine_id] && x.supplier) sup[x.medicine_id] = String(x.supplier).trim(); });
  var pb = await _supa.from('ph_purchase_bills').select('supplier,supplier_gstin').eq('clinic_id', _clinicId).order('created_at', { ascending: false }).limit(500);
  var gst = {}; (pb.data || []).forEach(function (x) { var k = String(x.supplier || '').toLowerCase().replace(/[^a-z0-9]/g, ''); if (k && x.supplier_gstin && !gst[k]) gst[k] = x.supplier_gstin; });
  RO.sold = sold; RO.sup = sup; RO.gst = gst;
  var keep = ppLS('ro-extra') || {};
  RO.rows = MEDS.filter(function (m) {
    if (!m.is_active) return false;
    var month = sold[m.id] || 0, low = Number(m.low_level || 0);
    return keep[m.id] || (low > 0 && m.stock <= low) || (month > 0 && m.stock < Math.ceil(month / 2)) || (m.stock <= 0 && month > 0);
  }).map(function (m) {
    var month = sold[m.id] || 0, target = Math.max(Math.ceil(month), Number(m.low_level || 0) * 2, 1);
    return { id: m.id, on: true, qty: keep[m.id] && keep[m.id].qty ? keep[m.id].qty : Math.max(1, target - Math.max(0, m.stock)), supplier: (keep[m.id] && keep[m.id].sup) || sup[m.id] || 'Supplier not known' };
  });
  try { var r = await _supa.rpc('aura_orders_sent', { p_from: _clinicId }); RO.sent = r.error ? null : (r.data || []); } catch (e) { RO.sent = null; }
  roRender();
}
function roGroups() {
  var g = {}; RO.rows.forEach(function (r, i) { (g[r.supplier] = g[r.supplier] || []).push(i); });
  return Object.keys(g).sort(function (a, b) { return (a === 'Supplier not known') - (b === 'Supplier not known') || a.localeCompare(b); }).map(function (k) { return { sup: k, idx: g[k] }; });
}
function roSupKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
function roRender() {
  var root = dEl('ro-root'); RO.groups = roGroups();
  var phones = ppLS('sup-phones') || {};
  var h = '<div class="card" style="margin-bottom:12px;padding:12px 14px;background:var(--green-bg);border-color:var(--green-border)"><b>&#128722; What to order</b>'
    + '<div class="tiny">Medicines that are low, out of stock, or will run out in about 2 weeks at the speed they sold in the last 30 days. The quantity is about one month of sales. Untick or change anything, then send each supplier its order in one tap.</div></div>'
    + '<div style="position:relative;max-width:460px;margin-bottom:12px"><input class="finput" id="ro-q" placeholder="Add another medicine to the order&hellip;" oninput="roSearch()" autocomplete="off"/><div id="ro-dd" class="dd" style="display:none"></div></div>';
  if (!RO.rows.length) h += '<div class="card" style="text-align:center;padding:24px"><div style="font-size:30px">&#9989;</div><b>Nothing is running out.</b><div class="tiny">Set a <b>low-stock level</b> on a medicine (Stock &rarr; Open &rarr; Edit) to be warned earlier.</div></div>';
  RO.groups.forEach(function (gr, gi) {
    var k = roSupKey(gr.sup), wh = RO.whs[k];
    h += '<div class="card" style="margin-bottom:12px;padding:12px 14px"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><b>' + esc(gr.sup) + '</b> <span class="tiny">' + gr.idx.length + ' medicine' + (gr.idx.length === 1 ? '' : 's') + '</span>'
      + (wh && wh.length ? '<div class="tiny" style="color:var(--green);font-weight:700">&#10003; On AuraScale as ' + esc(wh[0].name) + ': the order goes straight into their billing</div>' : '') + '</div>'
      + (gr.sup !== 'Supplier not known' ? '<input class="finput" style="width:150px;padding:6px" placeholder="Supplier WhatsApp" value="' + esc(phones[k] || '') + '" onchange="roPhone(' + gi + ',this.value)" type="tel"/>' : '') + '</div>'
      + '<div style="overflow-x:auto;margin-top:8px"><table class="dt"><thead><tr><th></th><th>Medicine</th><th class="r">In stock</th><th class="r">Sold in 30 days</th><th class="r">Order</th></tr></thead><tbody>'
      + gr.idx.map(function (i) { var r = RO.rows[i], m = MEDMAP[r.id]; if (!m) return '';
        return '<tr><td><input type="checkbox" ' + (r.on ? 'checked' : '') + ' onchange="RO.rows[' + i + '].on=this.checked" style="width:18px;height:18px;appearance:auto"/></td><td><b>' + esc(m.name) + '</b><div class="tiny">' + esc(m.composition || '') + '</div></td>'
          + '<td class="r">' + (m.stock > 0 ? m.stock : '<span class="over">0</span>') + ' <span class="tiny">' + esc(m.unit) + '</span></td><td class="r">' + (RO.sold[m.id] || 0) + '</td>'
          + '<td class="r"><input class="finput" type="number" min="1" step="1" value="' + esc(r.qty) + '" style="width:80px;text-align:right;padding:6px" oninput="RO.rows[' + i + '].qty=this.value"/><div class="tiny">' + esc(m.unit) + '</div></td></tr>';
      }).join('') + '</tbody></table></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'
      + (gr.sup !== 'Supplier not known' ? (wh && wh.length ? '<button class="btn btn-g" onclick="roSendApp(' + gi + ')">&#128640; Send order on AuraScale</button>' : '<button class="btn btn-sm" onclick="roFind(' + gi + ')">&#128269; Is ' + esc(gr.sup) + ' on AuraScale?</button>') : '')
      + '<button class="btn' + (wh && wh.length ? ' btn-sm' : ' btn-g') + '" onclick="roSendWa(' + gi + ')">&#128242; Send on WhatsApp</button><button class="btn btn-sm" onclick="roCopy(' + gi + ')">Copy list</button></div></div>';
  });
  if (RO.sent === null) h += '<p class="tiny">Sending orders inside AuraScale needs the database update (file 31). WhatsApp works now.</p>';
  else if (RO.sent.length) h += '<h3 style="font-size:15px;margin:16px 0 6px">Orders sent on AuraScale</h3><div style="overflow-x:auto"><table class="dt"><thead><tr><th>Order</th><th>Wholesaler</th><th>Medicines</th><th>Status</th><th></th></tr></thead><tbody>'
    + RO.sent.map(function (o) {
      var st = { sent: '<span class="pp-pill" style="color:var(--amber)">Sent</span>', seen: '<span class="pp-pill" style="color:#2563eb">Seen by wholesaler</span>', billed: '<span class="pp-pill" style="color:var(--green)">&#10003; Billed</span>', rejected: '<span class="pp-pill" style="color:var(--red)">Cannot supply</span>', cancelled: '<span class="pp-pill">Cancelled</span>' }[o.status] || o.status;
      return '<tr><td><b>' + esc(o.order_no) + '</b><div class="tiny">' + dDateTime(o.created_at) + '</div></td><td>' + esc(o.to_name) + '</td><td class="tiny">' + o.lines.map(function (l) { return esc(l.name) + ' &times;' + Number(l.qty); }).join(', ') + '</td><td>' + st + (o.reply ? '<div class="tiny">' + esc(o.reply) + '</div>' : '') + '</td>'
        + '<td>' + (o.status === 'sent' || o.status === 'seen' ? '<button class="btn btn-sm btn-r" onclick="roCancel(' + A(o.id) + ')">Cancel</button>' : '') + '</td></tr>';
    }).join('') + '</tbody></table></div>';
  root.innerHTML = h;
  RO.groups.forEach(function (gr) { var k = roSupKey(gr.sup); if (gr.sup !== 'Supplier not known' && RO.whs[k] === undefined && RO.sent !== null) roAutoFind(gr.sup); });
}
async function roAutoFind(sup) {
  var k = roSupKey(sup), phones = ppLS('sup-phones') || {}; RO.whs[k] = null;
  var g = RO.gst[k] || '', p = phones[k] || '';
  if (!g && !p) { RO.whs[k] = []; return; }
  var r = await _supa.rpc('aura_find_wholesaler', { p_from: _clinicId, p_gstin: g, p_phone: p });
  RO.whs[k] = r.error ? [] : (r.data || []);
  if (RO.whs[k].length) roRender();
}
async function roFind(gi) {
  var gr = RO.groups[gi], k = roSupKey(gr.sup);
  var v = prompt('Type ' + gr.sup + '\'s GSTIN or mobile number (it is on their bill):', RO.gst[k] || (ppLS('sup-phones') || {})[k] || ''); if (!v) return;
  var g = /^[0-9]{2}[A-Za-z]{5}/.test(v.trim()) ? v.trim() : '', p = g ? '' : v;
  var r = await _supa.rpc('aura_find_wholesaler', { p_from: _clinicId, p_gstin: g, p_phone: p });
  if (r.error) { showToast(ppMissing(r.error) ? 'Run the database update (file 31) first.' : dErr(r.error)); return; }
  if (!r.data || !r.data.length) { showToast(gr.sup + ' is not on AuraScale yet. Send the order on WhatsApp.'); return; }
  if (g) RO.gst[k] = g; else roPhone(gi, p, true);
  RO.whs[k] = r.data; roRender(); phOk('Found on AuraScale', esc(r.data[0].name) + ' can get your orders directly.');
}
function roPhone(gi, v, quiet) { var gr = RO.groups[gi], ph1 = ppLS('sup-phones') || {}; ph1[roSupKey(gr.sup)] = String(v || '').trim(); ppLS('sup-phones', ph1); if (!quiet) { RO.whs[roSupKey(gr.sup)] = undefined; roRender(); } }
function roLines(gi) {
  return RO.groups[gi].idx.map(function (i) { return RO.rows[i]; }).filter(function (r) { return r.on && Number(r.qty) > 0 && MEDMAP[r.id]; })
    .map(function (r) { var m = MEDMAP[r.id]; return { name: m.name, qty: Number(r.qty), unit: m.unit, composition: m.composition || '' }; });
}
function roText(gi) {
  var p = ph(), L = roLines(gi);
  return 'Order from ' + (p.name || DEPT.clinic.name || '') + (p.dl_no ? ' (DL ' + p.dl_no + ')' : '') + '\nDate: ' + dDate(new Date().toISOString()) + '\n\n'
    + L.map(function (l, i) { return (i + 1) + '. ' + l.name + ' - ' + l.qty + ' ' + l.unit; }).join('\n') + '\n\nPlease send with the bill. Thank you.';
}
async function roSendApp(gi) {
  var gr = RO.groups[gi], wh = RO.whs[roSupKey(gr.sup)], L = roLines(gi);
  if (!L.length) { showToast('Tick at least one medicine.'); return; }
  if (!confirm('Send ' + L.length + ' medicine(s) to ' + wh[0].name + ' on AuraScale?')) return;
  var r = await _supa.rpc('aura_order_send', { p_from: _clinicId, p_to: wh[0].id, p_lines: L, p_note: '' });
  if (r.error) { showToast(dErr(r.error)); return; }
  roDone(gi); phOk('Order ' + r.data.order_no + ' sent', esc(wh[0].name) + ' sees it in their billing now. You will see here when they bill it.', 2400);
  roLoad();
}
function roSendWa(gi) {
  var L = roLines(gi); if (!L.length) { showToast('Tick at least one medicine.'); return; }
  var gr = RO.groups[gi]; deptWhatsApp((ppLS('sup-phones') || {})[roSupKey(gr.sup)] || '', roText(gi)); roDone(gi);
  setTimeout(function () { phOk('Order ready on WhatsApp', 'Check it and press send in WhatsApp.'); }, 400);
}
function roCopy(gi) { var t = roText(gi); try { navigator.clipboard.writeText(t).then(function () { phOk('Order copied', 'Paste it anywhere.'); }, function () { prompt('Copy the order:', t); }); } catch (e) { prompt('Copy the order:', t); } }
function roDone(gi) { var ex = ppLS('ro-extra') || {}; RO.groups[gi].idx.forEach(function (i) { delete ex[RO.rows[i].id]; }); ppLS('ro-extra', ex); }
async function roCancel(id) { if (!confirm('Cancel this order?')) return; var r = await _supa.rpc('aura_order_cancel', { p_from: _clinicId, p_id: id }); if (r.error) { showToast(dErr(r.error)); return; } showToast('Order cancelled.'); roLoad(); }
function roSearch() {
  var q = dEl('ro-q').value.trim(), dd = dEl('ro-dd'); if (q.length < 2) { dd.style.display = 'none'; return; }
  var L = MEDS.filter(function (m) { return m.is_active && matchMed(m, q); }).slice(0, 10);
  dd.innerHTML = L.length ? L.map(function (m) { return '<div class="dd-i" onclick="roAdd(\'' + m.id + '\')"><b>' + esc(m.name) + '</b> <span class="tiny">' + m.stock + ' ' + esc(m.unit) + ' in stock</span></div>'; }).join('') : '<div class="dd-i muted">No medicine found.</div>';
  dd.style.display = 'block';
}
function roAdd(id) {
  dEl('ro-dd').style.display = 'none'; dEl('ro-q').value = '';
  if (RO.rows.some(function (r) { return r.id === id; })) { showToast('Already in the list.'); return; }
  var ex = ppLS('ro-extra') || {}; ex[id] = { qty: 1, sup: RO.sup[id] || '' }; ppLS('ro-extra', ex);
  RO.rows.push({ id: id, on: true, qty: 1, supplier: RO.sup[id] || 'Supplier not known' }); roRender();
}

/* =================================================================== 4. RETURN TO SUPPLIER */
var RET = [];
function retOpen() {
  ppModal('m-ret', 'Return stock to the supplier', 980);
  RET = [];
  MEDS.forEach(function (m) { m.batches.forEach(function (b) { if (Number(b.qty) > 0) RET.push({ b: b, m: m, on: false, qty: Number(b.qty), d: dDaysTo(b.expiry) }); }); });
  RET.sort(function (a, b) { return a.d - b.d; });
  retRender('exp'); dOpen('m-ret'); retPast();
}
var _retF = 'exp';
function retRender(f) {
  _retF = f || _retF;
  var list = RET.map(function (x, i) { x.i = i; return x; }).filter(function (x) { return _retF === 'all' || x.d <= 90; });
  var sups = {}; list.forEach(function (x) { var s = (x.b.supplier || '').trim() || 'Supplier not known'; (sups[s] = sups[s] || []).push(x); });
  dEl('m-ret-b').innerHTML = '<div class="seg" style="margin-bottom:10px"><button class="' + (_retF === 'exp' ? 'on' : '') + '" onclick="retRender(\'exp\')">Expired &amp; expiring in 90 days</button><button class="' + (_retF === 'all' ? 'on' : '') + '" onclick="retRender(\'all\')">All stock (damaged / wrong item)</button></div>'
    + (Object.keys(sups).length ? Object.keys(sups).sort().map(function (s) {
      return '<div class="card" style="margin-bottom:10px;padding:10px 12px"><b>' + esc(s) + '</b><div style="overflow-x:auto"><table class="dt"><thead><tr><th></th><th>Medicine</th><th>Batch</th><th>Expiry</th><th class="r">Have</th><th class="r">Return</th><th class="r">Value</th></tr></thead><tbody>'
        + sups[s].map(function (x) { return '<tr><td><input type="checkbox" ' + (x.on ? 'checked' : '') + ' onchange="RET[' + x.i + '].on=this.checked;retSum()" style="width:18px;height:18px;appearance:auto"/></td><td><b>' + esc(x.m.name) + '</b></td><td>' + esc(x.b.batch_no) + '</td>'
          + '<td>' + dExp(x.b.expiry) + ' ' + (x.d < 0 ? '<span class="tag t-r">Expired</span>' : x.d <= 90 ? '<span class="tag t-a">' + x.d + ' days</span>' : '') + '</td><td class="r">' + Number(x.b.qty) + '</td>'
          + '<td class="r"><input class="finput" type="number" min="0" max="' + Number(x.b.qty) + '" step="1" value="' + x.qty + '" style="width:76px;text-align:right;padding:5px" oninput="RET[' + x.i + '].qty=Number(this.value)||0;retSum()"/></td><td class="r">' + dMoney(x.qty * Number(x.b.purchase_rate || 0)) + '</td></tr>'; }).join('')
        + '</tbody></table></div></div>';
    }).join('') : '<div class="card" style="text-align:center;padding:20px">&#9989; Nothing expired or expiring in the next 90 days.</div>')
    + '<div class="grid2" style="margin-top:6px"><div><label class="flbl">Return to (supplier) *</label><input class="finput" id="rt-sup" list="rt-sups"/><datalist id="rt-sups">' + Object.keys(sups).filter(function (s) { return s !== 'Supplier not known'; }).map(function (s) { return '<option value="' + esc(s) + '">'; }).join('') + '</datalist></div>'
    + '<div><label class="flbl">Reason *</label><select class="finput" id="rt-why"><option>Expired</option><option>Near expiry</option><option>Damaged / broken</option><option>Wrong item supplied</option><option>Not selling (slow moving)</option></select></div>'
    + '<div><label class="flbl">Supplier WhatsApp (to send the note)</label><input class="finput" id="rt-ph" type="tel"/></div></div>'
    + '<div id="rt-sum" class="tiny" style="margin:8px 0"></div><button class="btn btn-g" id="rt-go" onclick="retSave()">&#10003; Remove from stock &amp; make return note</button><div class="err" id="rt-err"></div>'
    + '<h3 style="font-size:14px;margin:18px 0 6px">Return notes made</h3><div id="rt-past" class="tiny">Loading&hellip;</div>';
  retSum();
}
function retSum() {
  var on = RET.filter(function (x) { return x.on && x.qty > 0; }), v = on.reduce(function (a, x) { return a + x.qty * Number(x.b.purchase_rate || 0); }, 0);
  var sups = {}; on.forEach(function (x) { sups[(x.b.supplier || '').trim()] = 1; });
  var el = dEl('rt-sum'); if (el) el.innerHTML = on.length ? '<b>' + on.length + '</b> batch' + (on.length === 1 ? '' : 'es') + ' ticked &middot; value at purchase rate <b>' + dMoney(v) + '</b>' + (Object.keys(sups).length > 1 ? ' &middot; <span class="over">from different suppliers: make one note per supplier</span>' : '') : 'Tick the batches to return.';
  var s1 = Object.keys(sups)[0]; if (s1 && dEl('rt-sup') && !dEl('rt-sup').value) dEl('rt-sup').value = s1;
  if (s1 && dEl('rt-ph') && !dEl('rt-ph').value) dEl('rt-ph').value = (ppLS('sup-phones') || {})[roSupKey(s1)] || '';
}
async function retSave() {
  dShowErr('rt-err', '');
  var on = RET.filter(function (x) { return x.on && x.qty > 0; }), sup = dEl('rt-sup').value.trim(), why = dEl('rt-why').value;
  if (!on.length) { dShowErr('rt-err', 'Tick the batches to return.'); return; }
  if (!sup) { dShowErr('rt-err', 'Write the supplier\'s name.'); return; }
  if (!confirm('Remove ' + on.length + ' batch(es) from stock and make a return note for ' + sup + '?')) return;
  var btn = dEl('rt-go'); btn.disabled = true;
  var r = await _supa.rpc('ph_return_to_supplier', { p_clinic_id: _clinicId, p_supplier: sup, p_reason: why, p_lines: on.map(function (x) { return { batch_id: x.b.id, qty: x.qty }; }) });
  btn.disabled = false;
  if (r.error) { dShowErr('rt-err', ppMissing(r.error) ? 'Run the database update (file 31) first.' : dErr(r.error)); return; }
  var ph1 = dEl('rt-ph').value.trim(); if (ph1) { var m = ppLS('sup-phones') || {}; m[roSupKey(sup)] = ph1; ppLS('sup-phones', m); }
  phOk('Return note ' + r.data.no + ' made', on.length + ' batch(es) removed from stock &middot; ' + dMoney(r.data.value), 2200);
  await loadMeds(); if (typeof stockRender === 'function') stockRender();
  retOpen();
  try { var path = await retPdf(r.data); if (ph1) deptWhatsApp(ph1, 'Return note ' + r.data.no + ' from ' + (ph().name || DEPT.clinic.name || '') + '\n' + r.data.lines.length + ' item(s), value ' + dMoney(r.data.value) + '\nReason: ' + why + '\nPDF:', 'bills', path); } catch (e) { showToast('PDF: ' + dErr(e)); }
}
async function retPdf(x) {
  var s = ph(), name = s.name || DEPT.clinic.name || '';
  var head = deptPdfHead({ name: name, sub: [esc(s.address || DEPT.clinic.address || ''), [s.phone ? 'Phone: ' + esc(s.phone) : '', s.gstin ? 'GSTIN: ' + esc(s.gstin) : ''].filter(Boolean).join(' &middot; '), s.dl_no ? 'Drug Licence No: ' + esc(s.dl_no) : ''],
    title: 'GOODS RETURN NOTE', right: ['No: <span class="no">' + esc(x.no) + '</span>', 'Date: ' + deptPdfDateTime(x.created_at)], info: [['Returned to', esc(x.supplier)], ['Reason', esc(x.reason)]] });
  var thead = '<thead><tr><th>#</th><th>Medicine</th><th>Batch</th><th>Expiry</th><th class="r">Qty</th><th class="r">MRP</th><th class="r">Rate</th><th class="r">Value</th></tr></thead>';
  var rows = x.lines.map(function (l, i) { return '<tr><td class="mut">' + (i + 1) + '</td><td><b>' + esc(l.name) + '</b></td><td>' + esc(l.batch_no) + '</td><td>' + dExp(l.expiry) + '</td><td class="r">' + Number(l.qty) + ' ' + esc(l.unit || '') + '</td><td class="r">' + Number(l.mrp).toFixed(2) + '</td><td class="r">' + Number(l.rate).toFixed(2) + '</td><td class="r"><b>' + Number(l.value).toFixed(2) + '</b></td></tr>'; });
  var after = '<div class="dtot" style="margin-left:auto"><div class="row grand"><span>Total value (at purchase rate)</span><span>' + deptMoney(x.value) + '</span></div></div>'
    + '<div class="dend"><div class="ddecl">Please accept these goods back and issue a credit note for the value shown.<br>Prepared by: ' + esc(x.created_by_name || '') + '</div><div class="dsign">For ' + esc(name) + '<div class="sp"></div><div class="ln">Authorised Signatory</div></div></div>'
    + '<div class="dend" style="margin-top:18px"><div class="ddecl">Received the above goods.</div><div class="dsign">For ' + esc(x.supplier) + '<div class="sp"></div><div class="ln">Signature &amp; stamp</div></div></div>';
  var blob = await deptMakePdf({ format: 'a4', head: head, thead: thead, rows: rows, after: after, foot: 'Goods return note ' + esc(x.no) + ' &middot; AuraScale' });
  var path = _clinicId + '/pharmacy/returns/' + x.id + '.pdf'; await deptUpload('bills', path, blob); return path;
}
async function retPast() {
  var el = dEl('rt-past'); if (!el) return;
  var r = await _supa.from('ph_supplier_returns').select('*').eq('clinic_id', _clinicId).order('created_at', { ascending: false }).limit(20);
  if (r.error) { el.innerHTML = ppMissing(r.error) ? 'Run the database update (file 31) to use returns.' : ''; return; }
  window._RETS = r.data || [];
  el.innerHTML = _RETS.length ? '<table class="dt"><tbody>' + _RETS.map(function (x) { return '<tr><td><b>' + esc(x.no) + '</b><div class="tiny">' + dDateTime(x.created_at) + '</div></td><td>' + esc(x.supplier) + '<div class="tiny">' + esc(x.reason) + ' &middot; ' + x.lines.length + ' item(s)</div></td><td class="r">' + dMoney(x.value) + '</td><td class="r"><button class="btn btn-sm" onclick="retOpenPdf(' + A(x.id) + ')">PDF</button></td></tr>'; }).join('') + '</tbody></table>' : 'None yet.';
}
async function retOpenPdf(id) { var x = (window._RETS || []).filter(function (r) { return r.id === id; })[0]; if (!x) return; try { showToast('Opening…'); var p = await retPdf(x); deptOpenPdf('bills', p); } catch (e) { showToast('PDF: ' + dErr(e)); } }

/* =================================================================== 5. SCHEDULE H1 REGISTER */
var H1 = [];
function h1Open() {
  ppModal('m-h1', 'Schedule H1 / X register', 1100);
  var m = dTodayIST().slice(0, 7);
  dEl('m-h1-b').innerHTML = '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px"><div><label class="flbl">Month</label><input class="finput" type="month" id="h1-m" value="' + m + '" onchange="h1Load()"/></div>'
    + '<button class="btn btn-sm" onclick="h1Pdf()">&#128196; PDF</button><button class="btn btn-sm" onclick="h1Csv()">&#11015; Excel (CSV)</button></div>'
    + '<p class="tiny" style="margin-bottom:8px">Made automatically from your bills: every Schedule H1 and X medicine sold, with the patient, the prescribing doctor and the batch. Mark a medicine as H1 in Stock &rarr; Open &rarr; Edit &rarr; Schedule.</p><div id="h1-t">Loading&hellip;</div>';
  dOpen('m-h1'); h1Load();
}
async function h1Load() {
  var m = dEl('h1-m').value; if (!m) return;
  var y = Number(m.slice(0, 4)), mo = Number(m.slice(5, 7)), from = new Date(Date.UTC(y, mo - 1, 1) - 5.5 * 3600e3).toISOString(), to = new Date(Date.UTC(y, mo, 1) - 5.5 * 3600e3).toISOString();
  var s = await _supa.from('ph_sales').select('id,bill_no,created_at,patient_name,patient_phone,uhid,doctor,cancelled').eq('clinic_id', _clinicId).gte('created_at', from).lt('created_at', to).order('created_at').limit(5000);
  if (s.error) { dEl('h1-t').textContent = dErr(s.error); return; }
  var by = {}; (s.data || []).forEach(function (x) { by[x.id] = x; });
  var ids = Object.keys(by), rows = [];
  for (var i = 0; i < ids.length; i += 150) {
    var it = await _supa.from('ph_sale_items').select('sale_id,name,batch_no,expiry,qty,unit,schedule,medicine_id').in('sale_id', ids.slice(i, i + 150));
    (it.data || []).forEach(function (l) { var sch = String(l.schedule || (MEDMAP[l.medicine_id] || {}).schedule || '').toUpperCase(); if (sch === 'H1' || sch === 'X') rows.push({ s: by[l.sale_id], l: l, sch: sch }); });
  }
  rows.sort(function (a, b) { return a.s.created_at < b.s.created_at ? -1 : 1; });
  H1 = rows;
  dEl('h1-t').innerHTML = rows.length ? '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>#</th><th>Date</th><th>Bill</th><th>Patient</th><th>Doctor</th><th>Medicine</th><th>Sch</th><th>Batch</th><th class="r">Qty</th></tr></thead><tbody>'
    + rows.map(function (r, i) { return '<tr' + (r.s.cancelled ? ' style="opacity:.5;text-decoration:line-through"' : '') + '><td>' + (i + 1) + '</td><td>' + dDate(r.s.created_at) + '</td><td>' + esc(r.s.bill_no) + '</td><td>' + esc(r.s.patient_name || '') + '<div class="tiny">' + esc(r.s.patient_phone || '') + '</div></td><td>' + (r.s.doctor ? esc(r.s.doctor) : '<span class="over">missing</span>') + '</td><td><b>' + esc(r.l.name) + '</b></td><td>' + r.sch + '</td><td>' + esc(r.l.batch_no || '') + '</td><td class="r">' + Number(r.l.qty) + ' ' + esc(r.l.unit || '') + '</td></tr>'; }).join('')
    + '</tbody></table></div>' : '<div class="card" style="text-align:center;padding:20px">No Schedule H1 or X medicine sold in this month.</div>';
}
function h1Csv() {
  if (!H1.length) { showToast('Nothing to download for this month.'); return; }
  var q = function (v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; };
  var csv = ['Sl,Date,Bill no,Patient,Phone,Doctor,Medicine,Schedule,Batch,Expiry,Qty,Cancelled'].concat(H1.map(function (r, i) { return [i + 1, dDate(r.s.created_at), r.s.bill_no, r.s.patient_name, r.s.patient_phone, r.s.doctor, r.l.name, r.sch, r.l.batch_no, dExp(r.l.expiry), r.l.qty + ' ' + (r.l.unit || ''), r.s.cancelled ? 'yes' : ''].map(q).join(','); })).join('\n');
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'schedule-h1-register-' + dEl('h1-m').value + '.csv'; document.body.appendChild(a); a.click(); a.remove();
}
async function h1Pdf() {
  if (!H1.length) { showToast('Nothing to print for this month.'); return; }
  try {
    showToast('Making the PDF…');
    var s = ph(), name = s.name || DEPT.clinic.name || '';
    var head = deptPdfHead({ name: name, sub: [esc(s.address || ''), s.dl_no ? 'Drug Licence No: ' + esc(s.dl_no) : '', s.pharmacist ? 'Registered Pharmacist: ' + esc(s.pharmacist) : ''], title: 'SCHEDULE H1 REGISTER', right: ['Month: ' + esc(dEl('h1-m').value)] });
    var thead = '<thead><tr><th>#</th><th>Date</th><th>Bill</th><th>Patient</th><th>Doctor</th><th>Medicine</th><th>Batch</th><th class="r">Qty</th></tr></thead>';
    var rows = H1.map(function (r, i) { return '<tr><td class="mut">' + (i + 1) + '</td><td>' + deptPdfDate(r.s.created_at) + '</td><td>' + esc(r.s.bill_no) + (r.s.cancelled ? ' (cancelled)' : '') + '</td><td>' + esc(r.s.patient_name || '') + '<div class="sm">' + esc(r.s.patient_phone || '') + '</div></td><td>' + esc(r.s.doctor || '') + '</td><td><b>' + esc(r.l.name) + '</b><div class="sm">Schedule ' + r.sch + '</div></td><td>' + esc(r.l.batch_no || '') + '</td><td class="r">' + Number(r.l.qty) + '</td></tr>'; });
    var blob = await deptMakePdf({ format: 'a4', head: head, thead: thead, rows: rows, after: '<div class="dend"><div class="ddecl">Made from the pharmacy bills. Prescriptions are kept for inspection.</div><div class="dsign">' + esc(name) + '<div class="sp"></div><div class="ln">Registered Pharmacist</div></div></div>', foot: 'Schedule H1 register &middot; AuraScale' });
    var path = _clinicId + '/pharmacy/h1-' + dEl('h1-m').value + '.pdf'; await deptUpload('bills', path, blob); deptOpenPdf('bills', path);
  } catch (e) { showToast('PDF: ' + dErr(e)); }
}

/* start */
(function ppStart() {
  if (typeof _clinicId === 'undefined' || !_clinicId || !window.MEDS) { setTimeout(ppStart, 600); return; }
  refillLoad();
})();

/* =================================================================== OPENING / CLOSING STOCK (same as wholesale) */
/* all the stock of a medicine, expired included (that is what is physically on the shelf) */
function phStockAll(m) { return m ? (m.batches || []).reduce(function (a, b) { return a + (Number(b.qty) > 0 ? Number(b.qty) : 0); }, 0) : 0; }
function stkTxt(before, after, unit) {
  before = Math.round(before * 100) / 100; after = Math.round(after * 100) / 100;
  return '<div class="tiny" style="white-space:nowrap">Stock <b>' + before + '</b> &rarr; <b style="color:' + (after < before ? 'var(--amber)' : 'var(--green)') + '">' + after + '</b>' + (unit ? ' ' + esc(unit) : '') + '</div>';
}
/* stock of each medicine RIGHT NOW, fresh from the database */
async function phNow(ids) {
  var now = {}; if (!ids.length) return now;
  var r = await _supa.from('ph_batches').select('medicine_id,qty').eq('clinic_id', _clinicId).in('medicine_id', ids);
  (r.data || []).forEach(function (x) { if (Number(x.qty) > 0) now[x.medicine_id] = (now[x.medicine_id] || 0) + Number(x.qty); });
  return now;
}
/* for a list of stock moves: the medicine's total stock just AFTER each move (map move id -> closing) */
async function phClosingAt(moves) {
  var out = {}; moves = (moves || []).filter(function (m) { return m.medicine_id; }); if (!moves.length) return out;
  try {
    var ids = Object.keys(moves.reduce(function (a, m) { a[m.medicine_id] = 1; return a; }, {}));
    var oldest = moves.reduce(function (a, m) { return m.created_at < a ? m.created_at : a; }, moves[0].created_at);
    var later = await _supa.from('ph_moves').select('id,medicine_id,change,created_at').eq('clinic_id', _clinicId).in('medicine_id', ids).gt('created_at', oldest).limit(10000);
    if (later.error) return out;
    var now = await phNow(ids);
    moves.forEach(function (m) {
      var after = (later.data || []).filter(function (x) { return x.medicine_id === m.medicine_id && x.created_at > m.created_at; }).reduce(function (a, x) { return a + Number(x.change); }, 0);
      out[m.id] = Math.round(((now[m.medicine_id] || 0) - after) * 100) / 100;
    });
  } catch (e) {}
  return out;
}
/* a saved bill: Opening / Went out / Closing / In stock today for every medicine on it */
async function phSaleStock(saleId, elId) {
  var el = dEl(elId); if (!el) return;
  try {
    var m = await _supa.from('ph_moves').select('medicine_id,name,change,created_at').eq('clinic_id', _clinicId).eq('sale_id', saleId).in('kind', ['sold', 'issued']);
    if (m.error || !m.data || !m.data.length) { el.innerHTML = ''; return; }
    var T = m.data[0].created_at, mine = {}, names = {};
    m.data.forEach(function (x) { mine[x.medicine_id] = (mine[x.medicine_id] || 0) + Number(x.change); names[x.medicine_id] = x.name; });
    var ids = Object.keys(mine);
    var later = await _supa.from('ph_moves').select('medicine_id,change').eq('clinic_id', _clinicId).in('medicine_id', ids).gt('created_at', T);
    if (later.error) { el.innerHTML = ''; return; }
    var aft = {}; (later.data || []).forEach(function (x) { aft[x.medicine_id] = (aft[x.medicine_id] || 0) + Number(x.change); });
    var now = await phNow(ids), r2 = function (v) { return Math.round(v * 100) / 100; };
    el.innerHTML = '<div class="card" style="margin:12px 0 4px;padding:10px 12px"><b>Stock of these medicines</b><div class="tiny">Opening = just before this bill &middot; Closing = just after it.</div>'
      + '<div style="overflow-x:auto;margin-top:6px"><table class="dt"><thead><tr><th>Medicine</th><th class="r">Opening</th><th class="r">Went out</th><th class="r">Closing</th><th class="r">In stock now</th></tr></thead><tbody>'
      + ids.map(function (id) {
        var md = MEDMAP[id], today = now[id] || 0, close = r2(today - (aft[id] || 0)), ch = r2(mine[id]), open = r2(close - ch);
        return '<tr><td><b>' + esc(md ? md.name : names[id]) + '</b></td><td class="r">' + open + '</td><td class="r" style="color:var(--amber);font-weight:700">' + ch + '</td><td class="r"><b>' + close + '</b></td><td class="r">' + r2(today) + ' <span class="tiny">' + esc(md ? md.unit : '') + '</span></td></tr>';
      }).join('') + '</tbody></table></div></div>';
  } catch (e) { el.innerHTML = ''; }
}

/* =================================================================== SUPPLIERS (from the distributors' bills and the stock) */
var SUPS = [];
async function supOpen() {
  ppModal('m-sup', 'Your suppliers', 1000);
  dEl('m-sup-b').innerHTML = '<div class="tiny">Loading&hellip;</div>'; dOpen('m-sup');
  var pb = await _supa.from('ph_purchase_bills').select('supplier,supplier_gstin,bill_no,bill_date,bill_total,lines_added,created_at').eq('clinic_id', _clinicId).order('created_at', { ascending: false }).limit(2000);
  var bt = await _supa.from('ph_batches').select('medicine_id,supplier,qty,purchase_rate,created_at').eq('clinic_id', _clinicId).limit(10000);
  var by = {}, get = function (name) { var k = roSupKey(name); if (!k) return null; return by[k] = by[k] || { k: k, name: String(name).trim(), gstin: '', bills: [], total: 0, meds: {}, value: 0, last: '' }; };
  (pb.data || []).forEach(function (b) { var s = get(b.supplier); if (!s) return; if (b.supplier_gstin && !s.gstin) s.gstin = b.supplier_gstin; s.bills.push(b); s.total += Number(b.bill_total) || 0; if (b.created_at > s.last) s.last = b.created_at; });
  (bt.data || []).forEach(function (b) { var s = get(b.supplier); if (!s) return; s.meds[b.medicine_id] = 1; s.value += (Number(b.qty) || 0) * (Number(b.purchase_rate) || 0); if (b.created_at > s.last) s.last = b.created_at; });
  SUPS = Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return a.last < b.last ? 1 : -1; });
  supRender();
  /* which of them are on AuraScale (re-order goes straight to them) */
  SUPS.forEach(function (s) { var ph1 = (ppLS('sup-phones') || {})[s.k] || ''; if (!s.gstin && !ph1) return;
    _supa.rpc('aura_find_wholesaler', { p_from: _clinicId, p_gstin: s.gstin, p_phone: ph1 }).then(function (r) { if (!r.error && r.data && r.data.length) { s.app = r.data[0].name; supRender(); } }, function () {}); });
}
function supRender() {
  var q = (dEl('sup-q') && dEl('sup-q').value || '').toLowerCase(), phones = ppLS('sup-phones') || {};
  var list = SUPS.filter(function (s) { return !q || (s.name + ' ' + s.gstin).toLowerCase().indexOf(q) >= 0; });
  var keep = dEl('sup-q') ? dEl('sup-q').value : '';
  dEl('m-sup-b').innerHTML = '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:10px"><b style="font-size:16px">' + SUPS.length + ' supplier' + (SUPS.length === 1 ? '' : 's') + '</b>'
    + '<input class="finput" id="sup-q" placeholder="Search name or GSTIN&hellip;" value="' + esc(keep) + '" oninput="supRender()" style="max-width:260px"/></div>'
    + '<p class="tiny" style="margin-bottom:8px">Made automatically from the distributors\' bills you scanned and the supplier name typed in Add stock. Add a WhatsApp number once to send orders and return notes.</p>'
    + (list.length ? '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Supplier</th><th>GSTIN</th><th class="r">Bills</th><th class="r">Bought</th><th class="r">Medicines</th><th>Last</th><th>WhatsApp</th></tr></thead><tbody>'
      + list.map(function (s) { var i = SUPS.indexOf(s);
        return '<tr><td><b>' + esc(s.name) + '</b>' + (s.app ? '<div class="tiny" style="color:var(--green);font-weight:700">&#10003; On AuraScale (' + esc(s.app) + ')</div>' : '') + '</td><td class="tiny">' + esc(s.gstin || '-') + '</td>'
          + '<td class="r">' + (s.bills.length ? '<a href="#" onclick="supBills(' + i + ');return false" style="font-weight:700">' + s.bills.length + '</a>' : '0') + '</td><td class="r">' + (s.total ? dMoney0(s.total) : '-') + '</td>'
          + '<td class="r">' + Object.keys(s.meds).length + '</td><td class="tiny">' + (s.last ? dDate(s.last) : '') + '</td>'
          + '<td><input class="finput" type="tel" style="width:130px;padding:5px" value="' + esc(phones[s.k] || '') + '" placeholder="Mobile" onchange="supPhone(' + i + ',this.value)"/></td></tr>'
          + '<tr id="sup-b-' + i + '" style="display:none"><td colspan="7"></td></tr>';
      }).join('') + '</tbody></table></div>' : '<div class="card" style="text-align:center;padding:20px">' + (SUPS.length ? 'Nothing matches.' : 'No suppliers yet. Scan a distributor\'s bill in <b>Add stock</b>.') + '</div>');
  var qi = dEl('sup-q'); if (qi && keep) { qi.focus(); qi.setSelectionRange(keep.length, keep.length); }
}
function supPhone(i, v) { var m = ppLS('sup-phones') || {}; m[SUPS[i].k] = String(v || '').trim(); ppLS('sup-phones', m); showToast('Saved.'); }
function supBills(i) {
  var tr = dEl('sup-b-' + i), s = SUPS[i]; if (!tr) return; tr.style.display = tr.style.display === 'none' ? '' : 'none';
  tr.firstChild.innerHTML = '<table class="dt"><tbody>' + s.bills.map(function (b) { return '<tr><td class="tiny">' + dDate(b.bill_date || b.created_at) + '</td><td>Bill <b>' + esc(b.bill_no || '-') + '</b></td><td class="r">' + (b.lines_added || 0) + ' lines</td><td class="r"><b>' + (b.bill_total ? dMoney(b.bill_total) : '-') + '</b></td></tr>'; }).join('') + '</tbody></table>';
}
