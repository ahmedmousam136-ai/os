/* AuraScale Wholesale: ORDER FROM SUPPLIER (Stock -> "Order from supplier", or one product -> "Order")
   What is out of stock or running low, how much to order (about one month of sales), grouped by the supplier
   who sent it last. Each supplier gets a purchase order: PDF + WhatsApp in one tap. No database change. */
(function () {
  var css = '.wo-ok{position:fixed;inset:0;z-index:300;display:flex;align-items:center;justify-content:center;background:rgba(10,30,20,.28);opacity:0;transition:opacity .18s;pointer-events:none}'
    + '.wo-ok.on{opacity:1;pointer-events:auto}.wo-card{background:var(--surface,#fff);border-radius:20px;padding:26px 30px;min-width:240px;max-width:86vw;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);transform:scale(.92);transition:transform .25s cubic-bezier(.2,.9,.3,1.25)}'
    + '.wo-ok.on .wo-card{transform:none}.wo-t{font-weight:800;font-size:18px;margin-top:10px}.wo-s{font-size:13.5px;color:var(--text-secondary);margin-top:4px;line-height:1.45}'
    + '.wo-c{stroke-dasharray:170;stroke-dashoffset:170;animation:woC .5s ease-out forwards}.wo-p{stroke-dasharray:40;stroke-dashoffset:40;animation:woP .3s .42s ease-out forwards}'
    + '@keyframes woC{to{stroke-dashoffset:0}}@keyframes woP{to{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.wo-c,.wo-p{animation:none;stroke-dashoffset:0}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
var _woT = null;
function woOk(title, sub, ms) {
  var el = document.getElementById('wo-ok');
  if (!el) { el = document.createElement('div'); el.id = 'wo-ok'; el.className = 'wo-ok'; el.onclick = function () { el.classList.remove('on'); }; document.body.appendChild(el); }
  el.innerHTML = '<div class="wo-card" role="status"><svg width="84" height="84" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle class="wo-c" cx="32" cy="32" r="27" stroke="var(--green)" stroke-width="3.5" fill="var(--green-bg)"></circle>'
    + '<path class="wo-p" d="M20 33l8 8 16-17" stroke="var(--green)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="wo-t">' + esc(title) + '</div>' + (sub ? '<div class="wo-s">' + sub + '</div>' : '') + '</div>';
  void el.offsetWidth; el.classList.add('on'); try { if (navigator.vibrate) navigator.vibrate([12, 40, 18]); } catch (e) {}
  clearTimeout(_woT); _woT = setTimeout(function () { el.classList.remove('on'); }, ms || 1800);
}
function woLS(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem('aura-wh-' + _clinicId + '-' + k) || 'null'); localStorage.setItem('aura-wh-' + _clinicId + '-' + k, JSON.stringify(v)); } catch (e) { return null; } }

var WO = { rows: [], sold: {}, lastSup: {}, f: 'out', loaded: false };
function woModal() {
  if (dEl('m-wo')) return;
  var d = document.createElement('div'); d.className = 'modal-bg'; d.id = 'm-wo';
  d.innerHTML = '<div class="modal" style="max-width:1000px"><div class="modal-h"><span>&#128722; Order from supplier</span><button class="btn btn-sm" onclick="dClose(\'m-wo\')">&times;</button></div><div class="modal-b" id="wo-b"></div></div>';
  document.body.appendChild(d);
}
async function woOpen(onlyId) {
  woModal(); dEl('wo-b').innerHTML = '<div class="tiny">Working out what to order&hellip;</div>'; dOpen('m-wo');
  await loadItems(); if (!PARTIES.length && typeof loadParties === 'function') await loadParties();
  /* sold in the last 30 days */
  var since = new Date(Date.now() + 5.5 * 3600e3 - 30 * 864e5).toISOString().slice(0, 10), sold = {};
  var s = await _supa.from('wh_sales').select('id').eq('clinic_id', _clinicId).eq('status', 'posted').gte('inv_date', since).limit(5000);
  var ids = (s.data || []).map(function (x) { return x.id; });
  for (var i = 0; i < ids.length; i += 150) {
    var it = await _supa.from('wh_sale_items').select('item_id,qty,free').in('sale_id', ids.slice(i, i + 150));
    (it.data || []).forEach(function (l) { if (l.item_id) sold[l.item_id] = (sold[l.item_id] || 0) + Number(l.qty) + Number(l.free || 0); });
  }
  /* who sent each product last */
  var p = await _supa.from('wh_purchases').select('id,supplier_id,supplier_name,created_at').eq('clinic_id', _clinicId).eq('status', 'posted').order('created_at', { ascending: false }).limit(3000);
  var pmap = {}; (p.data || []).forEach(function (x) { pmap[x.id] = x; });
  var pids = Object.keys(pmap), last = {};
  for (var j = 0; j < pids.length; j += 150) {
    var pi = await _supa.from('wh_purchase_items').select('item_id,purchase_id').in('purchase_id', pids.slice(j, j + 150));
    (pi.data || []).forEach(function (l) { var h = pmap[l.purchase_id]; if (!l.item_id || !h) return; if (!last[l.item_id] || last[l.item_id].created_at < h.created_at) last[l.item_id] = h; });
  }
  WO.sold = sold; WO.lastSup = last;
  var sent = woLS('sent') || {};
  WO.rows = ITEMS.filter(function (it) { return it.is_active; }).map(function (it) {
    var month = sold[it.id] || 0, low = Number(it.low_level || 0), h = last[it.id];
    var kind = it.stock <= 0 ? 'out' : ((low > 0 && it.stock <= low) || (month > 0 && it.stock < Math.ceil(month / 2))) ? 'low' : '';
    return { id: it.id, kind: onlyId === it.id && !kind ? 'low' : kind, on: true, qty: Math.max(1, Math.max(Math.ceil(month), low * 2, 1) - Math.max(0, it.stock)),
      sup: h && h.supplier_id && PARTYMAP[h.supplier_id] ? h.supplier_id : '', supName: h ? h.supplier_name : '', sent: sent[it.id] || null };
  }).filter(function (r) { return r.kind; });
  if (onlyId) { WO.rows.forEach(function (r) { r.on = r.id === onlyId; }); var me = WO.rows.filter(function (r) { return r.id === onlyId; })[0]; if (me) WO.f = me.kind; }
  else WO.f = WO.rows.some(function (r) { return r.kind === 'out'; }) ? 'out' : 'low';
  woRender();
}
function woSupOpts(sel) {
  return '<option value="">&mdash; choose supplier &mdash;</option>' + PARTIES.filter(function (p) { return p.is_active && p.party_type !== 'customer'; }).sort(function (a, b) { return a.name.localeCompare(b.name); })
    .map(function (p) { return '<option value="' + p.id + '"' + (p.id === sel ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('');
}
function woRender() {
  var nOut = WO.rows.filter(function (r) { return r.kind === 'out'; }).length, nLow = WO.rows.filter(function (r) { return r.kind === 'low'; }).length;
  var list = WO.rows.map(function (r, i) { r.i = i; return r; }).filter(function (r) { return r.kind === WO.f; });
  var g = {}; list.forEach(function (r) { var k = r.sup || '_'; (g[k] = g[k] || []).push(r); });
  var keys = Object.keys(g).sort(function (a, b) { if ((a === '_') !== (b === '_')) return a === '_' ? 1 : -1; return String((PARTYMAP[a] || {}).name || '').localeCompare(String((PARTYMAP[b] || {}).name || '')); });
  dEl('wo-b').innerHTML = '<div class="seg" style="margin-bottom:10px;flex-wrap:wrap"><button class="' + (WO.f === 'out' ? 'on' : '') + '" onclick="WO.f=\'out\';woRender()">&#128308; Out of stock (' + nOut + ')</button><button class="' + (WO.f === 'low' ? 'on' : '') + '" onclick="WO.f=\'low\';woRender()">&#128993; Running low (' + nLow + ')</button></div>'
    + '<p class="tiny" style="margin-bottom:8px">' + (WO.f === 'out' ? 'These products have <b>0</b> left to sell.' : 'Below their low-stock level, or will run out in about 2 weeks at the speed they sold in the last 30 days.') + ' The quantity is about one month of sales. Check the supplier and quantity, then send each supplier its order: a purchase order PDF on WhatsApp.</p>'
    + (list.length ? keys.map(function (k, gi) {
      var sp = PARTYMAP[k], rows = g[k];
      return '<div class="card" style="margin-bottom:12px;padding:12px 14px"><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><div style="flex:1;min-width:200px"><b>' + (sp ? esc(sp.name) : 'Supplier not known') + '</b> <span class="tiny">' + rows.length + ' product' + (rows.length === 1 ? '' : 's') + (sp && sp.phone ? ' &middot; ' + esc(sp.phone) : (sp ? ' &middot; <span class="over">no phone saved</span>' : '')) + '</span></div></div>'
        + '<div style="overflow-x:auto;margin-top:6px"><table class="dt"><thead><tr><th></th><th>Product</th><th class="r">In stock</th><th class="r">Sold 30 days</th><th>Supplier</th><th class="r">Order</th></tr></thead><tbody>'
        + rows.map(function (r) { var it = ITEMMAP[r.id]; if (!it) return '';
          return '<tr><td><input type="checkbox" ' + (r.on ? 'checked' : '') + ' onchange="WO.rows[' + r.i + '].on=this.checked" style="width:18px;height:18px;appearance:auto"/></td>'
            + '<td><b>' + esc(it.name) + '</b>' + (it.pack ? ' <span class="tiny">' + esc(it.pack) + '</span>' : '') + (r.sent ? ' <span class="tag t-a">Ordered ' + dDate(r.sent) + '</span>' : '') + '<div class="tiny">' + esc(it.manufacturer || it.composition || '') + '</div></td>'
            + '<td class="r">' + (it.stock > 0 ? it.stock : '<span class="over">0</span>') + ' <span class="tiny">' + esc(it.unit) + '</span></td><td class="r">' + (WO.sold[r.id] || 0) + '</td>'
            + '<td><select class="finput" style="width:180px;padding:5px" onchange="WO.rows[' + r.i + '].sup=this.value;woRender()">' + woSupOpts(r.sup) + '</select></td>'
            + '<td class="r"><input class="finput" type="number" min="1" step="1" value="' + esc(r.qty) + '" style="width:76px;text-align:right;padding:5px" oninput="WO.rows[' + r.i + '].qty=this.value"/><div class="tiny">' + esc(it.unit) + '</div></td></tr>';
        }).join('') + '</tbody></table></div>'
        + (sp ? '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn btn-g" onclick="woSend(' + A(k) + ')">&#128242; Send order on WhatsApp (PDF)</button><button class="btn btn-sm" onclick="woCopy(' + A(k) + ')">Copy list</button></div>'
          : '<div class="tiny over" style="margin-top:8px">Choose the supplier for these products (in the Supplier column) to send the order.</div>') + '</div>';
    }).join('') : '<div class="card" style="text-align:center;padding:22px"><div style="font-size:28px">&#9989;</div><b>' + (WO.f === 'out' ? 'Nothing is out of stock.' : 'Nothing is running low.') + '</b><div class="tiny">Set a <b>low-stock level</b> on a product (Stock &rarr; Open &rarr; Edit) to be warned earlier.</div></div>');
}
function woLines(sid) {
  return WO.rows.filter(function (r) { return r.kind === WO.f && r.sup === sid && r.on && Number(r.qty) > 0 && ITEMMAP[r.id]; })
    .map(function (r) { var it = ITEMMAP[r.id]; return { id: r.id, name: it.name, pack: it.pack || '', mfg: it.manufacturer || '', qty: Number(r.qty), unit: it.unit }; });
}
function woText(sid, L) {
  return 'Purchase order from ' + (SET.name || DEPT.clinic.name || '') + (SET.gstin ? ' (GSTIN ' + SET.gstin + ')' : '') + '\nDate: ' + dDate(new Date().toISOString()) + '\n\n'
    + L.map(function (l, i) { return (i + 1) + '. ' + l.name + (l.pack ? ' (' + l.pack + ')' : '') + ' - ' + l.qty + ' ' + l.unit; }).join('\n') + '\n\nPlease send with the bill. Thank you.';
}
function woCopy(sid) {
  var L = woLines(sid); if (!L.length) { showToast('Tick at least one product.'); return; } var t = woText(sid, L);
  try { navigator.clipboard.writeText(t).then(function () { woOk('Order copied', 'Paste it anywhere.'); }, function () { prompt('Copy the order:', t); }); } catch (e) { prompt('Copy the order:', t); }
}
async function woSend(sid) {
  var sp = PARTYMAP[sid], L = woLines(sid); if (!sp) return;
  if (!L.length) { showToast('Tick at least one product.'); return; }
  var n = (woLS('po-no') || 0) + 1, no = 'PO-' + ('000' + n).slice(-4), path = '';
  showToast('Making the purchase order…');
  try {
    var head = deptPdfHead({ name: SET.name || DEPT.clinic.name || '', sub: [esc(SET.address || ''), [SET.phone ? 'Phone: ' + esc(SET.phone) : '', SET.gstin ? 'GSTIN: ' + esc(SET.gstin) : ''].filter(Boolean).join(' &middot; '), SET.dl_no ? 'Drug Licence No: ' + esc(SET.dl_no) : ''],
      title: 'PURCHASE ORDER', right: ['No: <span class="no">' + no + '</span>', 'Date: ' + deptPdfDateTime(new Date().toISOString())], info: [['To', esc(sp.name)], ['GSTIN', esc(sp.gstin || '')], ['Phone', esc(sp.phone || '')], ['Address', esc(sp.address || '')]] });
    var thead = '<thead><tr><th>#</th><th>Product</th><th>Pack</th><th>Company</th><th class="r">Quantity</th></tr></thead>';
    var rows = L.map(function (l, i) { return '<tr><td class="mut">' + (i + 1) + '</td><td><b>' + esc(l.name) + '</b></td><td>' + esc(l.pack) + '</td><td>' + esc(l.mfg) + '</td><td class="r"><b>' + l.qty + '</b> ' + esc(l.unit) + '</td></tr>'; });
    var after = '<div class="dend"><div class="ddecl">Please supply the above with the bill. Rates as agreed. Short expiry (less than 6 months) not accepted.</div><div class="dsign">For ' + esc(SET.name || DEPT.clinic.name || '') + '<div class="sp"></div><div class="ln">Authorised Signatory</div></div></div>';
    var blob = await deptMakePdf({ format: 'a4', head: head, thead: thead, rows: rows, after: after, foot: 'Purchase order ' + no + ' &middot; AuraScale' });
    path = _clinicId + '/wholesale/po-' + no + '-' + Date.now() + '.pdf'; await deptUpload('bills', path, blob);
  } catch (e) { showToast('PDF not made (' + dErr(e) + '), sending the list as text.'); path = ''; }
  woLS('po-no', n);
  var sent = woLS('sent') || {}, now = new Date().toISOString(); L.forEach(function (l) { sent[l.id] = now; }); woLS('sent', sent);
  WO.rows.forEach(function (r) { if (sent[r.id]) r.sent = sent[r.id]; });
  deptWhatsApp(sp.phone || '', woText(sid, L) + (path ? '\n\nPurchase order (PDF):' : ''), 'bills', path || null);
  woRender();
  setTimeout(function () { woOk('Order ' + no + ' ready', esc(sp.name) + ' &middot; ' + L.length + ' product' + (L.length === 1 ? '' : 's') + '<br>Check it and press send in WhatsApp.', 2400); }, 500);
}
