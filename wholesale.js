/* AuraScale Wholesale / Distributor screen. Needs nh-shared.js and aura-dept.js.
   Every save goes through the wh_* server functions (17-wholesale.sql); the screen only reads. */
'use strict';

var ROLE = '', CAN = {}, SET = {}, OWN_STATE = '19';
var ITEMS = [], ITEMMAP = {}, PARTIES = [], PARTYMAP = {}, BAL = {}, BAL_OK = false;
var SLINES = [], SPAY = 'credit', PLINES = [], BITEM = null, RLINES = [], PURCH_OF_SUP = [];
var SALES = [], SL_RANGE = 1, PURCHASES = [], BL_RANGE = 30, PAYS = [], ML_RANGE = 30, PAYDIR = 'in', STF = 'all', PTF = 'all';
var PICK = {};
var GST_STATES = { '01': 'Jammu & Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh', '05': 'Uttarakhand', '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh',
  '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh', '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram', '16': 'Tripura', '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal',
  '20': 'Jharkhand', '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat', '26': 'Dadra & Nagar Haveli and Daman & Diu', '27': 'Maharashtra', '29': 'Karnataka',
  '30': 'Goa', '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry', '35': 'Andaman & Nicobar', '36': 'Telangana', '37': 'Andhra Pradesh', '38': 'Ladakh' };

/* ---------- small helpers ---------- */
function A(v) { return esc(JSON.stringify(v)); }                 /* a value inside onclick="..." */
function r2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
function stName(c) { return c ? (GST_STATES[c] ? GST_STATES[c] + ' (' + c + ')' : c) : ''; }
function isInter(p) { return !!(p && p.state_code && p.state_code !== OWN_STATE); }
function tax(taxable, g, inter) { var t = r2(taxable * g / 100); return inter ? { c: 0, s: 0, i: t } : { c: r2(t / 2), s: r2(t - r2(t / 2)), i: 0 }; }
function today() { return dTodayIST(); }
function daysAgo(n) { var d = new Date(today() + 'T00:00:00'); d.setDate(d.getDate() - n + 1); return d.toISOString().slice(0, 10); }
function payTxt(m) { return ({ credit: 'Credit', cash: 'Cash', upi: 'UPI', bank: 'Bank', cheque: 'Cheque' })[m] || m || ''; }
function gstinOk(g) { return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/.test(g || ''); }
function segOn(id, attr, val) { [].forEach.call(dEl(id).children, function (b) { b.classList.toggle('on', b.getAttribute(attr) === String(val)); }); }
function rangeFrom(n) { return daysAgo(n); }
function ddKey(e, ddId) {
  var dd = dEl(ddId), items = [].slice.call(dd.querySelectorAll('.dd-i[data-k]')), cur = items.findIndex(function (x) { return x.classList.contains('hl'); });
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!items.length) return; cur = (cur + (e.key === 'ArrowDown' ? 1 : items.length - 1) + items.length) % items.length; items.forEach(function (x, i) { x.classList.toggle('hl', i === cur); }); }
  if (e.key === 'Enter') { e.preventDefault(); var x = items[cur < 0 ? 0 : cur]; if (x) x.click(); }
  if (e.key === 'Escape') dd.style.display = 'none';
}
function canShow() {
  [].forEach.call(document.querySelectorAll('[data-can]'), function (el) { if (!CAN[el.getAttribute('data-can')]) el.style.display = 'none'; });
}

/* ---------- start ---------- */
async function init() {
  var ok = await deptInit('wholesale', 'Wholesale'); if (!ok) return;
  ROLE = DEPT.role;
  try { whLangBox(); } catch (e) {}
  var R = function (a) { return a.indexOf(ROLE) >= 0; };
  CAN = { sell: R(['owner', 'sales']), sellRead: R(['owner', 'sales', 'accounts']), buy: R(['owner', 'inventory']), buyRead: R(['owner', 'inventory', 'accounts']),
    money: R(['owner', 'accounts']), moneyRead: R(['owner', 'accounts', 'sales']), owner: ROLE === 'owner', moneyEdit: R(['owner', 'accounts']) };
  SET = DEPT.clinic.wh_settings || {};
  OWN_STATE = (SET.gstin || '').slice(0, 2) || SET.state_code || DEPT.clinic.billing_state_code || '19';
  canShow();
  partyPicker('sell', ['customer', 'both'], function () { sellRender(); });
  partyPicker('buy', ['supplier', 'both'], function () { buyRender(); });
  partyPicker('pret', ['supplier', 'both'], function () { brLoadBills(); });
  partyPicker('pay', null, null);
  partyPicker('ship', null, null);
  partyPicker('ledg', null, function () { ledgerLoad(); });
  dEl('s-date').value = today(); dEl('b-date').value = today(); dEl('mp-date').value = today();
  var y = Number(today().slice(0, 4)); dEl('lg-from').value = (today().slice(5, 7) >= '04' ? y : y - 1) + '-04-01';   /* start of this financial year */
  dEl('lg-to').value = today();
  setupNote();
  await Promise.all([loadItems(), loadParties()]);
  sellRender(); buyRender();
  deptStartTab('home');
  document.addEventListener('click', function (e) {
    ['s-dd', 'b-dd', 'br-dd'].forEach(function (id) { if (!e.target.closest('#' + id + ',#' + id.replace('-dd', '-q'))) dEl(id).style.display = 'none'; });
    Object.keys(PICK).forEach(function (k) { if (!e.target.closest('#pp-' + k)) { var d = dEl('pp-' + k + '-dd'); if (d) d.style.display = 'none'; } });
  });
}
function setupNote() {
  var el = dEl('setup-note');
  if (!SET.name || !SET.gstin || !SET.dl_no) {
    el.style.display = 'block';
    el.innerHTML = '&#9888; Business details (name, GSTIN, drug licence) are not complete, so invoices will be missing them. '
      + (CAN.owner ? '<span class="link" onclick="dTab(\'settings\')">Fill them in Settings</span>.' : 'Ask the owner to fill them in Settings.');
  } else el.style.display = 'none';
}

/* ---------- data ---------- */
async function loadItems() {
  var r = await _supa.from('wh_items').select('*').eq('clinic_id', _clinicId).order('name');
  var b = await _supa.from('wh_batches').select('*').eq('clinic_id', _clinicId).order('expiry', { ascending: true, nullsFirst: false });
  if (r.error) { showToast('Could not load items: ' + dErr(r.error)); return; }
  ITEMMAP = {};
  ITEMS = (r.data || []).map(function (x) { x.batches = []; x.stock = 0; x.expiredQty = 0; ITEMMAP[x.id] = x; return x; });
  (b.data || []).forEach(function (bt) {
    var it = ITEMMAP[bt.item_id]; if (!it) return;
    bt.qty = Number(bt.qty); bt.expired = !!(bt.expiry && dDaysTo(bt.expiry) < 0);
    it.batches.push(bt);
    if (bt.qty > 0) { if (bt.expired) it.expiredQty += bt.qty; else it.stock += bt.qty; }
  });
  ITEMS.forEach(function (it) { var s = it.batches.filter(function (x) { return !x.expired && x.qty > 0; }); it.sellable = s; it.nearestExp = s.length ? s[0].expiry : null; });
}
async function loadParties() {
  var r = await _supa.from('org_parties').select('*').eq('clinic_id', _clinicId).order('name');
  if (r.error) { showToast('Could not load parties: ' + dErr(r.error)); return; }
  PARTIES = r.data || []; PARTYMAP = {}; PARTIES.forEach(function (p) { PARTYMAP[p.id] = p; });
}
async function loadBalances() {
  if (!CAN.moneyRead) return [];
  var r = await _supa.rpc('wh_outstanding', { p_clinic: _clinicId });
  if (r.error) { showToast(dErr(r.error)); return []; }
  BAL = {}; (r.data || []).forEach(function (x) { BAL[x.party_id] = x; }); BAL_OK = true;
  return r.data || [];
}
function itemMatch(it, q) { q = q.toLowerCase(); return (it.name || '').toLowerCase().indexOf(q) >= 0 || (it.composition || '').toLowerCase().indexOf(q) >= 0; }

/* ---------- party picker (customer / supplier search box) ---------- */
function partyPicker(key, types, onPick) {
  var box = dEl('pp-' + key); if (!box) return;
  PICK[key] = { party: null, types: types, onPick: onPick };
  box.innerHTML = '<input class="finput" id="pp-' + key + '-q" placeholder="Type name, phone or GSTIN&hellip;" autocomplete="off" oninput="ppSearch(' + A(key) + ')" onfocus="ppSearch(' + A(key) + ')" onkeydown="ddKey(event,' + A('pp-' + key + '-dd') + ')"/>'
    + '<div id="pp-' + key + '-dd" class="dd" style="display:none"></div><div class="pinfo" id="pp-' + key + '-info"></div>';
}
function ppSearch(key) {
  var P = PICK[key], q = dEl('pp-' + key + '-q').value.trim().toLowerCase(), dd = dEl('pp-' + key + '-dd');
  if (P.party && dEl('pp-' + key + '-q').value !== P.party.name) { P.party = null; dEl('pp-' + key + '-info').innerHTML = ''; if (P.onPick) P.onPick(null); }
  var list = PARTIES.filter(function (p) { return p.is_active && (!P.types || P.types.indexOf(p.party_type) >= 0) && (!q || (p.name + ' ' + (p.phone || '') + ' ' + (p.gstin || '')).toLowerCase().indexOf(q) >= 0); }).slice(0, 12);
  dd.innerHTML = list.map(function (p, i) {
    return '<div class="dd-i' + (i === 0 ? ' hl' : '') + '" data-k="1" onclick="ppPick(' + A(key) + ',' + A(p.id) + ')"><b>' + esc(p.name) + '</b> <span class="tiny">' + esc(p.party_type) + (p.gstin ? ' &middot; ' + esc(p.gstin) : '') + (p.phone ? ' &middot; ' + esc(p.phone) : '') + '</span></div>';
  }).join('') + '<div class="dd-i" style="color:var(--green);font-weight:700" onclick="partyEdit(null,' + A(key) + ',' + A(dEl('pp-' + key + '-q').value.trim()) + ')">&#10133; New party' + (q ? ': &ldquo;' + esc(dEl('pp-' + key + '-q').value.trim()) + '&rdquo;' : '') + '</div>';
  dd.style.display = 'block';
}
function ppPick(key, id) {
  var P = PICK[key], p = PARTYMAP[id]; if (!p) return;
  P.party = p; dEl('pp-' + key + '-q').value = p.name; dEl('pp-' + key + '-dd').style.display = 'none';
  ppInfo(key);
  if (P.onPick) P.onPick(p);
}
function ppInfo(key) {
  var p = PICK[key].party, el = dEl('pp-' + key + '-info'); if (!p) { el.innerHTML = ''; return; }
  var b = BAL[p.id], bal = b ? Number(b.balance) : null;
  el.innerHTML = [p.gstin ? 'GSTIN <b>' + esc(p.gstin) + '</b>' : '<span style="color:var(--amber)">No GSTIN (unregistered)</span>',
    p.state_code ? stName(p.state_code) + (isInter(p) ? ' &middot; <b>IGST</b>' : ' &middot; CGST + SGST') : '',
    p.drug_license_no ? 'DL ' + esc(p.drug_license_no) : '',
    bal !== null ? (bal > 0 ? 'Owes you <b>' + dMoney(bal) + '</b>' : bal < 0 ? 'You owe <b>' + dMoney(-bal) + '</b>' : 'No balance') + (b && Number(b.overdue) > 0 ? ' &middot; <span class="over">' + dMoney(b.overdue) + ' overdue</span>' : '') : '',
    p.credit_limit ? 'Limit ' + dMoney0(p.credit_limit) : ''].filter(Boolean).join(' &middot; ');
}
function ppSet(key, id) { if (id && PARTYMAP[id]) ppPick(key, id); else { PICK[key].party = null; dEl('pp-' + key + '-q').value = ''; dEl('pp-' + key + '-info').innerHTML = ''; } }

/* =================================================================== HOME */
async function onTab_home() {
  var stats = [], monthStart = today().slice(0, 8) + '01';
  if (CAN.sellRead) {
    var s = await _supa.from('wh_sales').select('inv_date,total,taxable,cost_total,status').eq('clinic_id', _clinicId).gte('inv_date', monthStart).eq('status', 'posted');
    var rows = s.data || [], td = rows.filter(function (x) { return x.inv_date === today(); });
    var sum = function (a, f) { return a.reduce(function (t, x) { return t + Number(x[f]); }, 0); };
    stats.push('<div><span class="tiny">Sales today (' + td.length + ')</span><b>' + dMoney0(sum(td, 'total')) + '</b></div>');
    stats.push('<div><span class="tiny">Sales this month (' + rows.length + ')</span><b>' + dMoney0(sum(rows, 'total')) + '</b>' + (CAN.owner ? '<span class="tiny">Margin ' + dMoney0(sum(rows, 'taxable') - sum(rows, 'cost_total')) + ' (before GST)</span>' : '') + '</div>');
  }
  var out = await loadBalances();
  if (CAN.moneyRead) {
    var rec = 0, od = 0, pay = 0;
    out.forEach(function (x) { if (x.balance > 0) { rec += Number(x.balance); od += Number(x.overdue); } else pay -= Number(x.balance); });
    stats.push('<div><span class="tiny">To receive</span><b>' + dMoney0(rec) + '</b><span class="tiny over">' + (od > 0 ? dMoney0(od) + ' overdue' : '') + '</span></div>');
    if (ROLE !== 'sales') stats.push('<div><span class="tiny">To pay suppliers</span><b>' + dMoney0(pay) + '</b></div>');
    var due = out.filter(function (x) { return x.balance > 0; }).sort(function (a, b) { return b.overdue - a.overdue || b.balance - a.balance; }).slice(0, 8);
    dEl('h-due').innerHTML = due.length ? '<table class="dt">' + due.map(function (x) {
      return '<tr><td><b>' + esc(x.name) + '</b>' + (x.oldest_unpaid ? '<div class="tiny">since ' + dDate(x.oldest_unpaid) + '</div>' : '') + '</td><td class="r">' + dMoney0(x.balance) + (Number(x.overdue) > 0 ? '<div class="tiny over">' + dMoney0(x.overdue) + ' overdue</div>' : '') + '</td></tr>';
    }).join('') + '</table>' : '<p class="muted">Nobody owes you money.</p>';
  } else dEl('h-due-card').style.display = 'none';
  await loadItems();
  var low = ITEMS.filter(function (it) { return it.is_active && it.stock <= Number(it.low_level || 0) && (it.stock > 0 || it.batches.length); });
  var soon = []; ITEMS.forEach(function (it) { it.batches.forEach(function (b) { if (b.qty > 0 && b.expiry && dDaysTo(b.expiry) <= 90) soon.push({ it: it, b: b }); }); });
  soon.sort(function (a, b) { return a.b.expiry < b.b.expiry ? -1 : 1; });
  var val = 0; ITEMS.forEach(function (it) { it.batches.forEach(function (b) { if (b.qty > 0 && !b.expired) val += b.qty * Number(b.purchase_rate); }); });
  stats.push('<div><span class="tiny">Stock value (cost)</span><b>' + dMoney0(val) + '</b><span class="tiny">' + low.length + ' low &middot; ' + soon.length + ' batches expiring</span></div>');
  dEl('h-stats').innerHTML = stats.join('');
  dEl('h-stock').innerHTML = (soon.length || low.length) ? '<table class="dt">'
    + soon.slice(0, 8).map(function (x) { return '<tr><td><b>' + esc(x.it.name) + '</b><div class="tiny">Batch ' + esc(x.b.batch_no) + '</div></td><td class="r">' + x.b.qty + ' ' + esc(x.it.unit) + '</td><td>' + (x.b.expired ? '<span class="tag t-r">Expired ' + dExp(x.b.expiry) + '</span>' : '<span class="tag t-a">Exp ' + dExp(x.b.expiry) + '</span>') + '</td></tr>'; }).join('')
    + low.slice(0, 8).map(function (it) { return '<tr><td><b>' + esc(it.name) + '</b></td><td class="r">' + it.stock + ' ' + esc(it.unit) + '</td><td><span class="tag ' + (it.stock > 0 ? 't-a">Low' : 't-r">Out') + '</span></td></tr>'; }).join('') + '</table>'
    : '<p class="muted">All good: nothing low or expiring in 90 days.</p>';
}

/* =================================================================== SALES */
function onTab_sell() { sellSeg(dEl('sell-seg').dataset.cur || (CAN.sell ? 'new' : 'list')); }
function sellSeg(s) {
  if (s === 'new' && !CAN.sell) s = 'list';
  dEl('sell-seg').dataset.cur = s; segOn('sell-seg', 'data-s', s);
  dEl('s-new').style.display = s === 'new' ? 'block' : 'none'; dEl('s-list').style.display = s === 'list' ? 'block' : 'none'; dEl('s-ret').style.display = s === 'ret' ? 'block' : 'none';
  if (s === 'new') { loadBalances().then(function () { ppInfo('sell'); }); }
  if (s === 'list') loadSales();
  if (s === 'ret') loadReturns('sales_return', 'sr-b');
}
function sellSearch() {
  var q = dEl('s-q').value.trim(), dd = dEl('s-dd');
  if (q.length < 2) { dd.style.display = 'none'; return; }
  var list = ITEMS.filter(function (it) { return it.is_active && itemMatch(it, q); }).sort(function (a, b) { return (b.stock > 0) - (a.stock > 0); }).slice(0, 12);
  dd.innerHTML = list.length ? list.map(function (it, i) {
    var b = it.sellable[0];
    return '<div class="dd-i' + (i === 0 ? ' hl' : '') + '" data-k="1" onclick="sellAdd(' + A(it.id) + ')"><div style="display:flex;justify-content:space-between;gap:8px"><b>' + esc(it.name) + '</b><span>' + (b ? 'MRP ' + dMoney(b.mrp) + (b.ptr ? ' &middot; PTR ' + dMoney(b.ptr) : '') : '') + '</span></div>'
      + '<div class="tiny">' + esc(it.composition || '') + (it.pack ? ' &middot; ' + esc(it.pack) : '') + ' &middot; ' + (it.stock > 0 ? '<span style="color:var(--green);font-weight:700">' + it.stock + ' ' + esc(it.unit) + ' in stock</span>' + (it.nearestExp ? ' &middot; Exp ' + dExp(it.nearestExp) : '') : '<span style="color:var(--red);font-weight:700">Out of stock</span>') + '</div></div>';
  }).join('') : '<div class="dd-i muted">No item found.' + (CAN.buy ? ' Add it with a purchase.' : '') + '</div>';
  dd.style.display = 'block';
}
function sellAdd(id) {
  var it = ITEMMAP[id]; if (!it) return;
  if (!it.sellable.length) { showToast(it.name + ' is out of stock (expired batches are never sold).'); return; }
  var b = it.sellable[0];
  SLINES.push({ item_id: id, batch_id: b.id, qty: '', free: 0, rate: b.ptr != null ? Number(b.ptr) : '', disc: 0 });
  dEl('s-q').value = ''; dEl('s-dd').style.display = 'none';
  sellRender();
  setTimeout(function () { var x = document.querySelector('#s-lines tr:last-child input[data-f="qty"]'); if (x) x.focus(); }, 30);
}
function sellSet(i, f, v) { SLINES[i][f] = v; if (f === 'batch_id') { var b = sellBatch(SLINES[i]); if (b && b.ptr != null && SLINES[i].rate === '') SLINES[i].rate = Number(b.ptr); sellRender(); } else sellRender(true); }
function sellDel(i) { SLINES.splice(i, 1); sellRender(); }
function sellBatch(l) { var it = ITEMMAP[l.item_id]; return it && it.batches.filter(function (b) { return b.id === l.batch_id; })[0]; }
function sellCalc() {
  var p = PICK.sell && PICK.sell.party, inter = isInter(p), T = { tx: 0, c: 0, s: 0, i: 0, problems: [] };
  SLINES.forEach(function (l, i) {
    var it = ITEMMAP[l.item_id], b = sellBatch(l), q = num(l.qty), fr = num(l.free), rt = num(l.rate), ds = num(l.disc);
    l._tx = r2(q * rt * (1 - ds / 100)); var t = tax(l._tx, Number(it.gst_rate), inter); l._amt = r2(l._tx + t.c + t.s + t.i);
    T.tx += l._tx; T.c += t.c; T.s += t.s; T.i += t.i;
    l._err = '';
    if (b && q + fr > b.qty) l._err = 'Only ' + b.qty + ' in this batch';
    else if (b && b.mrp > 0 && r2(rt * (1 - ds / 100) * (1 + Number(it.gst_rate) / 100)) > Number(b.mrp)) l._err = 'Rate + GST is above MRP';
    if (l._err) T.problems.push(it.name + ': ' + l._err);
  });
  T.tx = r2(T.tx); T.c = r2(T.c); T.s = r2(T.s); T.i = r2(T.i);
  var g = r2(T.tx + T.c + T.s + T.i); T.total = Math.round(g); T.ro = r2(T.total - g); T.inter = inter;
  return T;
}
function sellRender(keep) {
  var T = sellCalc(), body = dEl('s-lines');
  if (!keep) {
    body.innerHTML = SLINES.length ? SLINES.map(function (l, i) {
      var it = ITEMMAP[l.item_id];
      var opts = it.batches.filter(function (b) { return b.qty > 0 && !b.expired; }).map(function (b) { return '<option value="' + b.id + '"' + (b.id === l.batch_id ? ' selected' : '') + '>' + esc(b.batch_no) + ' &middot; ' + dExp(b.expiry) + ' &middot; ' + b.qty + ' &middot; MRP ' + Number(b.mrp).toFixed(2) + '</option>'; }).join('');
      var inp = function (f, w, st) { return '<input class="finput" data-f="' + f + '" type="number" min="0" step="' + (st || 'any') + '" value="' + esc(l[f]) + '" style="width:' + w + 'px;text-align:right" oninput="sellSet(' + i + ',' + A(f) + ',this.value)"/>'; };
      return '<tr id="sl-' + i + '"><td><b>' + esc(it.name) + '</b><div class="tiny">' + esc(it.pack || '') + ' &middot; GST ' + Number(it.gst_rate) + '%' + (it.hsn ? ' &middot; HSN ' + esc(it.hsn) : '') + '</div><div class="tiny over" id="sle-' + i + '"></div></td>'
        + '<td><select class="finput" style="min-width:170px" onchange="sellSet(' + i + ',\'batch_id\',this.value)">' + opts + '</select></td>'
        + '<td class="r">' + inp('qty', 72, 1) + '<div class="tiny">' + esc(it.unit) + '</div></td><td class="r">' + inp('free', 60, 1) + '</td><td class="r">' + inp('rate', 84) + '</td><td class="r">' + inp('disc', 62) + '</td>'
        + '<td class="r" id="sla-' + i + '"></td><td class="r"><button class="btn btn-sm btn-r" onclick="sellDel(' + i + ')">&times;</button></td></tr>';
    }).join('') : '<tr><td colspan="8" class="lines-empty">No items yet. Search above to add.</td></tr>';
  }
  SLINES.forEach(function (l, i) { var a = dEl('sla-' + i), e = dEl('sle-' + i), tr = dEl('sl-' + i); if (a) a.innerHTML = '<b>' + dMoney(l._amt) + '</b><div class="tiny">taxable ' + dMoney(l._tx) + '</div>'; if (e) e.textContent = l._err; if (tr) tr.classList.toggle('hl-r', !!l._err); });
  var p = PICK.sell && PICK.sell.party, bal = p && BAL[p.id] ? Number(BAL[p.id].balance) : 0, paid = SPAY === 'credit' ? num(dEl('s-paid').value) : T.total;
  var row = function (l, v, cls) { return '<div class="sum-row' + (cls ? ' ' + cls : '') + '"><span>' + l + '</span><span>' + v + '</span></div>'; };
  dEl('s-sum').innerHTML = row('Taxable value', dMoney(T.tx))
    + (T.inter ? row('IGST', dMoney(T.i)) : row('CGST', dMoney(T.c)) + row('SGST', dMoney(T.s)))
    + (T.ro ? row('Round off', (T.ro > 0 ? '+' : '') + T.ro.toFixed(2)) : '')
    + row('Invoice total', dMoney0(T.total), 'big')
    + (p && CAN.moneyRead ? row('Customer will owe', dMoney0(bal + T.total - paid)) : '')
    + (p && p.credit_limit && SPAY === 'credit' && bal + T.total - paid > Number(p.credit_limit) ? '<div class="tiny over">Above the credit limit of ' + dMoney0(p.credit_limit) + (CAN.owner ? ' (you can still save)' : '') + '</div>' : '')
    + (T.total > 50000 && !(dEl('tr-eway_no') && dEl('tr-eway_no').value.trim()) ? '<div class="tiny" style="color:var(--amber);margin-top:6px">Above &#8377;50,000: an e-way bill is usually needed to move these goods. Add its number under Delivery &amp; transport (now or later).</div>' : '');
}
var TR_KEYS = ['transporter', 'gr_no', 'gr_date', 'cases', 'weight', 'vehicle', 'order_no', 'order_date', 'eway_no', 'eway_date'];
function trRead(pre) { var o = {}; TR_KEYS.forEach(function (k) { var e = dEl(pre + k); if (e && e.value.trim()) o[k] = e.value.trim(); }); if (o.vehicle) o.vehicle = o.vehicle.toUpperCase(); if (o.eway_no) o.eway_no = o.eway_no.replace(/\s/g, ''); return o; }
function trClear(pre) { TR_KEYS.forEach(function (k) { var e = dEl(pre + k); if (e) e.value = ''; }); }
function shipRead() {
  if (!dEl('s-shipon').checked) return {};
  if (PICK.ship && PICK.ship.party) return { party_id: PICK.ship.party.id };
  var o = { name: dEl('sh-name').value.trim(), phone: dEl('sh-phone').value.trim(), address: dEl('sh-address').value.trim() };
  return o.name ? o : {};
}
function sellPay(m) {
  SPAY = m; segOn('s-pay', 'data-p', m);
  dEl('s-paid-box').style.display = m === 'credit' ? 'block' : 'none';
  dEl('s-ref-box').style.display = (m === 'upi' || m === 'bank' || m === 'cheque') ? 'block' : 'none';
  sellRender(true);
}
async function sellSave(override) {
  dShowErr('s-err', '');
  var p = PICK.sell.party; if (!p) { dShowErr('s-err', 'Choose the customer.'); return; }
  var lines = SLINES.filter(function (l) { return num(l.qty) > 0; });
  if (!lines.length) { dShowErr('s-err', 'Add at least one item with a quantity.'); return; }
  var T = sellCalc(); if (T.problems.length) { dShowErr('s-err', T.problems.join(' · ')); return; }
  if (lines.some(function (l) { return l.rate === '' || num(l.rate) <= 0; })) { dShowErr('s-err', 'Enter the rate for every item.'); return; }
  if (SPAY !== 'credit' && SPAY !== 'cash' && !dEl('s-ref').value.trim()) { dShowErr('s-err', 'Enter the UTR / cheque number.'); return; }
  var trv = trRead('tr-'), shv = shipRead();
  if (trv.eway_no && !/^\d{12}$/.test(trv.eway_no)) { dShowErr('s-err', 'An e-way bill number has 12 digits.'); return; }
  if (dEl('s-shipon').checked && !shv.party_id && !shv.name) { dShowErr('s-err', 'Choose or type the shop the goods are delivered to (or untick "Deliver to a different shop").'); return; }
  var body = { customer_id: p.id, inv_date: dEl('s-date').value || today(), pay_mode: SPAY, notes: dEl('s-note').value.trim(), ref_no: dEl('s-ref').value.trim(),
    paid_now: SPAY === 'credit' ? (num(dEl('s-paid').value) || 0) : null, override_credit: !!override, ship_to: shv, transport: trv,
    lines: lines.map(function (l) { return { batch_id: l.batch_id, qty: num(l.qty), free: num(l.free), rate: num(l.rate), disc: num(l.disc) }; }) };
  var btn = dEl('s-save'); btn.disabled = true; btn.textContent = 'Saving…';
  try {
    var r = await _supa.rpc('wh_sell', { p_clinic: _clinicId, p: body });
    if (r.error) {
      if (/CREDIT_LIMIT/.test(r.error.message || '') && CAN.owner && !override) {
        if (confirm((r.error.message || '').replace('CREDIT_LIMIT: ', '') + '\n\nYou are the owner. Save this invoice anyway?')) { btn.disabled = false; btn.innerHTML = '&#10003; Save &amp; make invoice'; return sellSave(true); }
      }
      throw r.error;
    }
    var sale = r.data;
    SLINES = []; dEl('s-note').value = ''; dEl('s-paid').value = ''; dEl('s-ref').value = ''; sellPay('credit'); ppSet('sell', null);
    trClear('tr-'); dEl('s-shipon').checked = false; dEl('s-shipbox').style.display = 'none'; ppSet('ship', null); ['sh-name', 'sh-phone', 'sh-address'].forEach(function (k) { dEl(k).value = ''; }); dEl('s-trans').open = false;
    sellRender();
    loadItems(); loadBalances();
    openSale(sale.id, true);
  } catch (e) { dShowErr('s-err', dErr(e).replace('CREDIT_LIMIT: ', '')); }
  finally { btn.disabled = false; btn.innerHTML = '&#10003; Save &amp; make invoice'; }
}

/* invoices list */
function slRange(n) { SL_RANGE = n; segOn('sl-range', 'data-r', n); loadSales(); }
async function loadSales() {
  var r = await _supa.from('wh_sales').select('*').eq('clinic_id', _clinicId).gte('inv_date', rangeFrom(SL_RANGE)).order('created_at', { ascending: false }).limit(2000);
  if (r.error) { showToast(dErr(r.error)); return; }
  SALES = r.data || []; slRender();
}
function slRender() {
  var q = dEl('sl-q').value.trim().toLowerCase(), live = SALES.filter(function (s) { return s.status === 'posted'; });
  var sum = function (a) { return a.reduce(function (t, s) { return t + Number(s.total); }, 0); };
  var cred = live.filter(function (s) { return s.pay_mode === 'credit'; });
  dEl('sl-stats').innerHTML = '<div><span class="tiny">Invoices (' + live.length + ')</span><b>' + dMoney0(sum(live)) + '</b></div><div><span class="tiny">On credit</span><b>' + dMoney0(sum(cred)) + '</b></div>'
    + '<div><span class="tiny">Cash / UPI / bank / cheque</span><b>' + dMoney0(sum(live) - sum(cred)) + '</b></div><div><span class="tiny">GST collected</span><b>' + dMoney0(live.reduce(function (t, s) { return t + Number(s.cgst) + Number(s.sgst) + Number(s.igst); }, 0)) + '</b></div>';
  var list = SALES.filter(function (s) { return !q || (s.inv_no + ' ' + (s.buyer.name || '')).toLowerCase().indexOf(q) >= 0; });
  dEl('sl-b').innerHTML = list.length ? list.map(function (s) {
    return '<tr style="cursor:pointer" onclick="openSale(' + A(s.id) + ')"><td>' + dDate(s.inv_date) + '</td><td><b>' + esc(s.inv_no) + '</b></td><td>' + esc(s.buyer.name || '') + (s.interstate ? ' <span class="tag t-b">IGST</span>' : '') + '</td>'
      + '<td class="r"><b>' + dMoney0(s.total) + '</b></td><td>' + (s.status === 'cancelled' ? '<span class="tag t-r">Cancelled</span>' : esc(payTxt(s.pay_mode)) + (s.pay_mode === 'credit' && s.due_date ? '<div class="tiny">due ' + dDate(s.due_date) + '</div>' : '')) + '</td><td class="r"><button class="btn btn-sm">Open</button></td></tr>';
  }).join('') : '<tr><td colspan="6" class="lines-empty">No invoices in this period.</td></tr>';
}

/* one invoice: details, PDF, WhatsApp, goods returned, cancel */
async function openSale(id, fresh) {
  var r = await _supa.from('wh_sales').select('*').eq('id', id).single(); if (r.error) { showToast(dErr(r.error)); return; }
  var s = r.data; if (s.status === 'cancelled' && !/-c\.pdf$/.test(s.pdf_path || '')) s.pdf_path = null;   /* make the CANCELLED copy once */
  var it = await _supa.from('wh_sale_items').select('*').eq('sale_id', id).order('name'); s._items = it.data || [];
  dEl('doc-title').textContent = 'Invoice ' + s.inv_no;
  var canRet = CAN.sell && s.status === 'posted' && s._items.some(function (x) { return Number(x.returned) < Number(x.qty) || Number(x.returned_free) < Number(x.free); });
  dEl('doc-body').innerHTML = (fresh ? '<div style="text-align:center;margin-bottom:12px"><div style="font-size:30px">&#9989;</div><div style="font-size:22px;font-weight:800">' + dMoney0(s.total) + '</div><div class="muted">' + esc(s.buyer.name || '') + ' &middot; ' + esc(payTxt(s.pay_mode)) + '</div></div>' : '')
    + '<div class="muted" style="margin-bottom:10px">' + dDate(s.inv_date) + ' &middot; ' + esc(s.buyer.name || '') + (s.buyer.gstin ? ' &middot; GSTIN ' + esc(s.buyer.gstin) : '') + ' &middot; ' + esc(payTxt(s.pay_mode)) + (s.due_date ? ' &middot; due ' + dDate(s.due_date) : '') + ' &middot; by ' + esc(s.created_by_name || '')
    + (s.status === 'cancelled' ? '<div class="note" style="margin-top:8px">Cancelled: ' + esc(s.cancel_reason || '') + '</div>' : '') + '</div>'
    + '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Item</th><th>Batch</th><th class="r">Qty + free</th><th class="r">Rate</th><th class="r">GST</th><th class="r">Amount</th></tr></thead><tbody>'
    + s._items.map(function (x) { return '<tr><td><b>' + esc(x.name) + '</b>' + (Number(x.returned) || Number(x.returned_free) ? '<div class="tiny">returned ' + Number(x.returned) + (Number(x.returned_free) ? ' + ' + Number(x.returned_free) + ' free' : '') + '</div>' : '') + '</td><td>' + esc(x.batch_no || '') + ' &middot; ' + dExp(x.expiry) + '</td><td class="r">' + Number(x.qty) + (Number(x.free) ? ' + ' + Number(x.free) : '') + '</td><td class="r">' + dMoney(x.rate) + (Number(x.disc) ? '<div class="tiny">-' + Number(x.disc) + '%</div>' : '') + '</td><td class="r">' + Number(x.gst_rate) + '%</td><td class="r">' + dMoney(x.amount) + '</td></tr>'; }).join('')
    + '</tbody></table></div>'
    + '<div style="text-align:right;margin:10px 0;font-size:13px">Taxable ' + dMoney(s.taxable) + (s.interstate ? ' &middot; IGST ' + dMoney(s.igst) : ' &middot; CGST ' + dMoney(s.cgst) + ' &middot; SGST ' + dMoney(s.sgst)) + ' &middot; <b style="font-size:16px">Total ' + dMoney0(s.total) + '</b></div>'
    + '<p class="tiny" id="doc-pdf">' + (s.pdf_path ? '' : 'Making the PDF&hellip;') + '</p>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="doc-open" disabled>&#128196; Open / print</button><button class="btn btn-g" id="doc-wa" disabled>&#128242; WhatsApp</button>'
    + '<button class="btn" id="doc-3c" disabled>&#128424; Print 3 copies</button>'
    + (CAN.sell && s.status === 'posted' ? '<button class="btn" onclick="transportForm(' + A(s.id) + ')">&#128666; Transport / e-way bill</button>' : '')
    + (canRet ? '<button class="btn" onclick="saleReturnForm(' + A(s.id) + ')">&#8617; Goods returned</button>' : '')
    + (CAN.owner && s.status === 'posted' ? '<button class="btn btn-r" onclick="saleCancel(' + A(s.id) + ')">Cancel invoice</button>' : '')
    + (fresh ? '<button class="btn btn-p" onclick="dClose(\'m-doc\');dEl(\'s-q\').focus()">&#10133; New invoice</button>' : '') + '</div><div id="doc-extra"></div>';
  dOpen('m-doc');
  try {
    var path = await ensurePdf('sale', s);
    dEl('doc-pdf').textContent = '';
    dEl('doc-open').disabled = false; dEl('doc-open').onclick = function () { deptOpenPdf('bills', path); };
    dEl('doc-3c').disabled = false; dEl('doc-3c').onclick = function () { printCopies(s); };
    dEl('doc-wa').disabled = false; dEl('doc-wa').onclick = function () {
      deptWhatsApp(s.buyer.phone, (SET.name || DEPT.clinic.name || '') + '\nInvoice ' + s.inv_no + ' dated ' + dDate(s.inv_date) + '\nAmount ' + dMoney0(s.total) + (s.pay_mode === 'credit' && s.due_date ? ' (due ' + dDate(s.due_date) + ')' : '') + '\nInvoice (PDF):', 'bills', path);
    };
  } catch (e) { dEl('doc-pdf').textContent = 'The invoice is saved, but the PDF could not be made: ' + dErr(e) + '. Open it again later.'; }
}
async function saleCancel(id) {
  var why = prompt('Why is this invoice cancelled? (stock goes back, money received with it is cancelled)'); if (!why) return;
  var r = await _supa.rpc('wh_cancel_sale', { p_clinic: _clinicId, p_id: id, p_reason: why });
  if (r.error) { showToast(dErr(r.error)); return; }
  showToast('Invoice cancelled.'); loadItems(); loadBalances(); if (dEl('s-list').style.display !== 'none') loadSales(); openSale(id);
}
function transportForm(id) {
  var s0 = SALES.filter(function (x) { return x.id === id; })[0];
  _supa.from('wh_sales').select('transport,ship_to').eq('id', id).single().then(function (r) {
    var t = (r.data && r.data.transport) || {}, sh = (r.data && r.data.ship_to) || {};
    var f = function (k, l, ty) { return '<div><label class="flbl">' + l + '</label><input class="finput" id="tf-' + k + '"' + (ty ? ' type="' + ty + '"' : '') + ' value="' + esc(t[k] || '') + '"/></div>'; };
    dEl('doc-extra').innerHTML = '<div class="card" style="margin-top:14px"><b>Delivery &amp; transport</b><div class="grid3" style="margin-top:8px">'
      + f('transporter', 'Transporter') + f('gr_no', 'G.R. / L.R. no.') + f('gr_date', 'G.R. date', 'date') + f('cases', 'Cases') + f('weight', 'Weight') + f('vehicle', 'Vehicle no.')
      + f('order_no', 'Order no.') + f('order_date', 'Order date', 'date') + f('eway_no', 'E-way bill no. (12 digits)') + f('eway_date', 'E-way bill date', 'date') + '</div>'
      + '<div class="grid3" style="margin-top:8px"><div><label class="flbl">Shipped to (shop name)</label><input class="finput" id="tf-sh-name" value="' + esc(sh.name || '') + '"/></div><div><label class="flbl">Phone</label><input class="finput" id="tf-sh-phone" value="' + esc(sh.phone || '') + '"/></div><div><label class="flbl">Delivery address</label><input class="finput" id="tf-sh-address" value="' + esc(sh.address || '') + '"/></div></div>'
      + '<p class="tiny" style="margin-top:6px">Only these details change. Items and amounts of a saved invoice can never change. The PDF is made again.</p>'
      + '<button class="btn btn-g" style="margin-top:8px" id="tf-go" onclick="transportSave(' + A(id) + ')">&#10003; Save</button><div class="err" id="tf-err"></div></div>';
  });
}
async function transportSave(id) {
  dShowErr('tf-err', '');
  var t = trRead('tf-'); if (t.eway_no && !/^\d{12}$/.test(t.eway_no)) { dShowErr('tf-err', 'An e-way bill number has 12 digits.'); return; }
  var sh = { name: dEl('tf-sh-name').value.trim(), phone: dEl('tf-sh-phone').value.trim(), address: dEl('tf-sh-address').value.trim() };
  dEl('tf-go').disabled = true;
  var r = await _supa.rpc('wh_set_transport', { p_clinic: _clinicId, p_id: id, p: { transport: t, ship_to: sh.name ? sh : {} } });
  dEl('tf-go').disabled = false;
  if (r.error) { dShowErr('tf-err', dErr(r.error)); return; }
  showToast('Saved. The invoice PDF is made again.'); openSale(id);
}
async function printCopies(s) {
  var b = dEl('doc-3c'); b.disabled = true; b.textContent = 'Making…';
  try {
    var blob = await docPdf('sale', s, ['ORIGINAL FOR RECIPIENT', 'DUPLICATE FOR TRANSPORTER', 'TRIPLICATE FOR SUPPLIER']);
    var path = _clinicId + '/wholesale/copies/' + s.id + '-3.pdf';
    await deptUpload('bills', path, blob); deptOpenPdf('bills', path);
  } catch (e) { showToast('Could not make the copies: ' + dErr(e)); }
  finally { b.disabled = false; b.innerHTML = '&#128424; Print 3 copies'; }
}
function saleReturnForm(id) {
  _supa.from('wh_sale_items').select('*').eq('sale_id', id).order('name').then(function (r) {
    var items = (r.data || []).filter(function (x) { return Number(x.returned) < Number(x.qty) || Number(x.returned_free) < Number(x.free); });
    dEl('doc-extra').innerHTML = '<div class="card" style="margin-top:14px"><b>Goods returned by the customer (credit note)</b>'
      + '<div style="overflow-x:auto;margin-top:8px"><table class="dt wl"><thead><tr><th>Item / batch</th><th class="r">Can return</th><th class="r">Qty back</th><th class="r">Free back</th><th>Back into stock?</th></tr></thead><tbody>'
      + items.map(function (x) { return '<tr data-si="' + x.id + '"><td><b>' + esc(x.name) + '</b><div class="tiny">' + esc(x.batch_no || '') + ' &middot; ' + dExp(x.expiry) + '</div></td><td class="r">' + (Number(x.qty) - Number(x.returned)) + (Number(x.free) - Number(x.returned_free) ? ' + ' + (Number(x.free) - Number(x.returned_free)) : '') + '</td>'
        + '<td class="r"><input class="finput" data-f="qty" type="number" min="0" max="' + (Number(x.qty) - Number(x.returned)) + '" style="width:70px;text-align:right"/></td><td class="r"><input class="finput" data-f="free" type="number" min="0" max="' + (Number(x.free) - Number(x.returned_free)) + '" style="width:60px;text-align:right"/></td>'
        + '<td><select class="finput" data-f="restock"><option value="true">Yes, saleable</option><option value="false">No (damaged / expired)</option></select></td></tr>'; }).join('')
      + '</tbody></table></div><div style="margin-top:8px"><label class="flbl">Reason *</label><input class="finput" id="sr-reason" placeholder="e.g. Damaged / near expiry / wrong item"/></div>'
      + '<button class="btn btn-g" style="margin-top:10px" id="sr-go" onclick="saleReturnSave(' + A(id) + ')">&#10003; Save credit note</button><div class="err" id="sr-err"></div></div>';
  });
}
async function saleReturnSave(id) {
  dShowErr('sr-err', '');
  var lines = [].map.call(document.querySelectorAll('#doc-extra tr[data-si]'), function (tr) {
    return { sale_item_id: tr.getAttribute('data-si'), qty: num(tr.querySelector('[data-f=qty]').value), free: num(tr.querySelector('[data-f=free]').value), restock: tr.querySelector('[data-f=restock]').value === 'true' };
  }).filter(function (l) { return l.qty + l.free > 0; });
  if (!lines.length) { dShowErr('sr-err', 'Enter the quantity coming back.'); return; }
  var reason = dEl('sr-reason').value.trim(); if (!reason) { dShowErr('sr-err', 'Write the reason.'); return; }
  dEl('sr-go').disabled = true;
  var r = await _supa.rpc('wh_return', { p_clinic: _clinicId, p: { kind: 'sales_return', sale_id: id, reason: reason, lines: lines } });
  dEl('sr-go').disabled = false;
  if (r.error) { dShowErr('sr-err', dErr(r.error)); return; }
  showToast('Credit note ' + r.data.no + ' saved.'); loadItems(); loadBalances();
  openReturn(r.data.id);
}

/* credit / debit notes */
async function loadReturns(kind, tb) {
  var r = await _supa.from('wh_returns').select('*').eq('clinic_id', _clinicId).eq('kind', kind).order('created_at', { ascending: false }).limit(500);
  if (r.error) { showToast(dErr(r.error)); return; }
  dEl(tb).innerHTML = (r.data || []).length ? r.data.map(function (x) {
    return '<tr style="cursor:pointer" onclick="openReturn(' + A(x.id) + ')"><td>' + dDate(x.ret_date) + '</td><td><b>' + esc(x.no) + '</b></td><td>' + esc(x.party.name || '') + '</td><td class="tiny">' + esc(x.reason || '') + '</td><td class="r"><b>' + dMoney0(x.total) + '</b></td><td class="r"><button class="btn btn-sm">Open</button></td></tr>';
  }).join('') : '<tr><td colspan="6" class="lines-empty">None yet.</td></tr>';
}
async function openReturn(id) {
  var r = await _supa.from('wh_returns').select('*').eq('id', id).single(); if (r.error) { showToast(dErr(r.error)); return; }
  var x = r.data, it = await _supa.from('wh_return_items').select('*').eq('return_id', id).order('name'); x._items = it.data || [];
  var cn = x.kind === 'sales_return';
  dEl('doc-title').textContent = (cn ? 'Credit note ' : 'Debit note ') + x.no;
  dEl('doc-body').innerHTML = '<div class="muted" style="margin-bottom:10px">' + dDate(x.ret_date) + ' &middot; ' + esc(x.party.name || '') + ' &middot; ' + esc(x.reason || '') + '</div>'
    + '<table class="dt"><thead><tr><th>Item</th><th>Batch</th><th class="r">Qty</th><th class="r">Rate</th><th class="r">Amount</th></tr></thead><tbody>'
    + x._items.map(function (l) { return '<tr><td><b>' + esc(l.name) + '</b>' + (cn ? '<div class="tiny">' + (l.restocked ? 'back in stock' : 'not saleable') + '</div>' : '') + '</td><td>' + esc(l.batch_no || '') + '</td><td class="r">' + Number(l.qty) + (Number(l.free) ? ' + ' + Number(l.free) : '') + '</td><td class="r">' + dMoney(l.rate) + '</td><td class="r">' + dMoney(l.amount) + '</td></tr>'; }).join('')
    + '</tbody></table><div style="text-align:right;margin:10px 0"><b style="font-size:16px">Total ' + dMoney0(x.total) + '</b></div>'
    + '<p class="tiny" id="doc-pdf">Making the PDF&hellip;</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="doc-open" disabled>&#128196; Open / print</button><button class="btn btn-g" id="doc-wa" disabled>&#128242; WhatsApp</button></div>';
  dOpen('m-doc');
  try {
    var path = await ensurePdf('return', x);
    dEl('doc-pdf').textContent = '';
    dEl('doc-open').disabled = false; dEl('doc-open').onclick = function () { deptOpenPdf('bills', path); };
    dEl('doc-wa').disabled = false; dEl('doc-wa').onclick = function () { deptWhatsApp(x.party.phone, (SET.name || DEPT.clinic.name || '') + '\n' + (cn ? 'Credit note ' : 'Debit note ') + x.no + ' · ' + dMoney0(x.total) + '\nPDF:', 'bills', path); };
  } catch (e) { dEl('doc-pdf').textContent = 'Saved, but the PDF could not be made: ' + dErr(e); }
}

/* =================================================================== PURCHASE */
function onTab_buy() { buySeg(dEl('buy-seg').dataset.cur || (CAN.buy ? 'new' : 'list')); }
function buySeg(s) {
  if (s === 'new' && !CAN.buy) s = 'list';
  dEl('buy-seg').dataset.cur = s; segOn('buy-seg', 'data-s', s);
  dEl('b-new').style.display = s === 'new' ? 'block' : 'none'; dEl('b-list').style.display = s === 'list' ? 'block' : 'none'; dEl('b-ret').style.display = s === 'ret' ? 'block' : 'none';
  if (s === 'list') loadPurchases();
  if (s === 'ret') { brRender(); loadReturns('purchase_return', 'dn-b'); }
}
function buySearch() {
  var q = dEl('b-q').value.trim(), dd = dEl('b-dd'); BITEM = null; dEl('b-newitem').style.display = 'none'; dEl('b-picked').textContent = '';
  if (q.length < 2) { dd.style.display = 'none'; return; }
  var list = ITEMS.filter(function (it) { return itemMatch(it, q); }).slice(0, 10), exact = list.some(function (it) { return it.name.toLowerCase() === q.toLowerCase(); });
  dd.innerHTML = list.map(function (it, i) { return '<div class="dd-i' + (i === 0 ? ' hl' : '') + '" data-k="1" onclick="buyPick(' + A(it.id) + ')"><b>' + esc(it.name) + '</b> <span class="tiny">' + esc(it.composition || '') + ' &middot; ' + it.stock + ' ' + esc(it.unit) + ' in stock</span></div>'; }).join('')
    + (exact ? '' : '<div class="dd-i" data-k="1" style="color:var(--green);font-weight:700" onclick="buyNewItem()">&#10133; New item: &ldquo;' + esc(q) + '&rdquo;</div>');
  dd.style.display = 'block';
}
function buyPick(id) {
  var it = ITEMMAP[id]; if (!it) return; BITEM = { item_id: id, name: it.name };
  dEl('b-q').value = it.name; dEl('b-dd').style.display = 'none'; dEl('b-newitem').style.display = 'none';
  dEl('b-gst').value = String(Number(it.gst_rate));
  var last = it.batches[it.batches.length - 1];
  dEl('b-picked').innerHTML = 'Sold per <b>' + esc(it.unit) + '</b>' + (it.pack ? ' (' + esc(it.pack) + ')' : '') + ' &middot; GST ' + Number(it.gst_rate) + '% &middot; in stock ' + it.stock + (last ? ' &middot; last MRP ' + dMoney(last.mrp) + (last.ptr ? ', PTR ' + dMoney(last.ptr) : '') : '');
  if (last && !dEl('b-mrp').value) dEl('b-mrp').value = last.mrp;
  if (last && last.ptr && !dEl('b-ptr').value) dEl('b-ptr').value = last.ptr;
  dEl('b-batch').focus();
}
function buyNewItem() { BITEM = { item_id: null, name: dEl('b-q').value.trim() }; dEl('b-dd').style.display = 'none'; dEl('b-newitem').style.display = 'grid'; dEl('b-picked').innerHTML = '<b>New item</b> &mdash; fill salt, HSN and pack once.'; dEl('bn-comp').focus(); }
function buyAddLine() {
  dShowErr('b-line-err', '');
  if (!BITEM || !BITEM.name) { dShowErr('b-line-err', 'Choose the item (or "New item").'); return; }
  var l = { item_id: BITEM.item_id, name: BITEM.name, batch: dEl('b-batch').value.trim().toUpperCase(), expiry: dEl('b-exp').value, qty: num(dEl('b-qty').value), free: num(dEl('b-free').value),
    rate: num(dEl('b-rate').value), disc: num(dEl('b-disc').value), gst: Number(dEl('b-gst').value), mrp: num(dEl('b-mrp').value), ptr: dEl('b-ptr').value === '' ? null : num(dEl('b-ptr').value) };
  if (!l.item_id) l.item = { name: l.name, composition: dEl('bn-comp').value.trim(), hsn: dEl('bn-hsn').value.trim(), gst_rate: l.gst, unit: dEl('bn-unit').value, pack: dEl('bn-pack').value.trim(), manufacturer: dEl('bn-mfg').value.trim() };
  if (!l.batch) { dShowErr('b-line-err', 'Enter the batch number.'); return; }
  if (!l.expiry) { dShowErr('b-line-err', 'Enter the expiry month.'); return; }
  if (!(l.qty > 0)) { dShowErr('b-line-err', 'Enter the quantity.'); return; }
  if (!(l.rate > 0)) { dShowErr('b-line-err', 'Enter the purchase rate (before GST).'); return; }
  if (!(l.mrp > 0)) { dShowErr('b-line-err', 'Enter the MRP of one unit.'); return; }
  if (l.ptr !== null && r2(l.ptr * (1 + l.gst / 100)) > l.mrp) { dShowErr('b-line-err', 'Your selling rate + GST is above the MRP.'); return; }
  PLINES.push(l); BITEM = null;
  ['b-q', 'b-batch', 'b-exp', 'b-qty', 'b-rate', 'b-mrp', 'b-ptr', 'bn-comp', 'bn-pack', 'bn-mfg'].forEach(function (x) { dEl(x).value = ''; }); dEl('b-free').value = 0; dEl('b-disc').value = 0; dEl('bn-hsn').value = '3004';
  dEl('b-newitem').style.display = 'none'; dEl('b-picked').textContent = '';
  buyRender(); dEl('b-q').focus();
}
function buyDel(i) { PLINES.splice(i, 1); buyRender(); }
function buyRender() {
  var p = PICK.buy && PICK.buy.party, inter = isInter(p), T = { tx: 0, c: 0, s: 0, i: 0 };
  dEl('b-lines').innerHTML = PLINES.length ? PLINES.map(function (l, i) {
    var tx = r2(l.qty * l.rate * (1 - l.disc / 100)), t = tax(tx, l.gst, inter); T.tx += tx; T.c += t.c; T.s += t.s; T.i += t.i;
    return '<tr><td><b>' + esc(l.name) + '</b>' + (l.item_id ? '' : ' <span class="tag t-b">new</span>') + '</td><td>' + esc(l.batch) + '<div class="tiny">' + esc(l.expiry) + '</div></td><td class="r">' + l.qty + (l.free ? ' + ' + l.free : '') + '</td><td class="r">' + dMoney(l.rate) + '</td><td class="r">' + (l.disc ? l.disc + '%' : '-') + '</td><td class="r">' + l.gst + '%</td><td class="r">' + dMoney(l.mrp) + '</td><td class="r"><b>' + dMoney(tx + t.c + t.s + t.i) + '</b></td><td class="r"><button class="btn btn-sm btn-r" onclick="buyDel(' + i + ')">&times;</button></td></tr>';
  }).join('') : '<tr><td colspan="9" class="lines-empty">No lines yet. Add them above, or scan the bill.</td></tr>';
  var g = r2(T.tx + T.c + T.s + T.i), tot = Math.round(g);
  var row = function (l, v, cls) { return '<div class="sum-row' + (cls ? ' ' + cls : '') + '"><span>' + l + '</span><span>' + v + '</span></div>'; };
  var bt = dEl('b-billtot') ? num(dEl('b-billtot').value) : 0;
  dEl('b-sum').innerHTML = row('Taxable value', dMoney(T.tx)) + (inter ? row('IGST', dMoney(T.i)) : row('CGST', dMoney(T.c)) + row('SGST', dMoney(T.s))) + (tot - g ? row('Round off', (tot - g > 0 ? '+' : '') + (tot - g).toFixed(2)) : '') + row('Bill total', dMoney0(tot), 'big')
    + (bt > 0 ? (Math.abs(bt - tot) <= 2 ? '<div class="tiny" style="color:var(--green);font-weight:700">&#10003; Matches the paper bill (' + dMoney0(bt) + ')</div>' : '<div class="tiny over">&#10007; Paper bill says ' + dMoney0(bt) + ' (difference ' + dMoney0(bt - tot) + '). A line may be missing or wrong.</div>') : '<div class="tiny">Type the grand total from the paper bill to check it.</div>');
}
async function buySave() {
  dShowErr('b-err', '');
  var p = PICK.buy.party; if (!p) { dShowErr('b-err', 'Choose the supplier.'); return; }
  if (!dEl('b-billno').value.trim()) { dShowErr('b-err', 'Enter the supplier\'s bill number.'); return; }
  if (!PLINES.length) { dShowErr('b-err', 'Add at least one line.'); return; }
  var calc = 0, inter0 = isInter(p); PLINES.forEach(function (l) { var tx = r2(l.qty * l.rate * (1 - l.disc / 100)), t = tax(tx, l.gst, inter0); calc += tx + t.c + t.s + t.i; }); calc = Math.round(r2(calc));
  var bt = num(dEl('b-billtot').value);
  if (PLINES._doc && !(bt > 0)) { dShowErr('b-err', 'Type the grand total printed on the bill.'); return; }
  if (bt > 0 && Math.abs(bt - calc) > 2 && dEl('b-note').value.trim().length < 5) { dShowErr('b-err', 'The lines add up to ' + dMoney0(calc) + ' but the paper bill says ' + dMoney0(bt) + '. Fix the lines, or write the reason (e.g. freight) in Note.'); return; }
  var body = { supplier_id: p.id, bill_no: dEl('b-billno').value.trim(), bill_date: dEl('b-date').value || today(), notes: dEl('b-note').value.trim(), doc_path: PLINES._doc || null,
    lines: PLINES.map(function (l) { var x = { batch: l.batch, expiry: l.expiry, qty: l.qty, free: l.free, rate: l.rate, disc: l.disc, gst: l.gst, mrp: l.mrp, ptr: l.ptr }; if (l.item_id) x.item_id = l.item_id; else x.item = l.item; return x; }) };
  var btn = dEl('b-save'); btn.disabled = true; btn.textContent = 'Saving…';
  try {
    var r = await _supa.rpc('wh_purchase', { p_clinic: _clinicId, p: body }); if (r.error) throw r.error;
    showToast('Purchase ' + r.data.our_no + ' saved: ' + dMoney0(r.data.total) + '. Stock updated.');
    PLINES = []; dEl('b-billno').value = ''; dEl('b-note').value = ''; dEl('b-billtot').value = ''; ppSet('buy', null); buyRender();
    await loadItems(); buySeg('list');
  } catch (e) { dShowErr('b-err', dErr(e)); }
  finally { btn.disabled = false; btn.innerHTML = '&#10003; Save purchase &amp; add to stock'; }
}
function blRange(n) { BL_RANGE = n; segOn('bl-range', 'data-r', n); loadPurchases(); }
async function loadPurchases() {
  var r = await _supa.from('wh_purchases').select('*').eq('clinic_id', _clinicId).gte('bill_date', rangeFrom(BL_RANGE)).order('bill_date', { ascending: false }).limit(2000);
  if (r.error) { showToast(dErr(r.error)); return; }
  PURCHASES = r.data || []; blRender();
}
function blRender() {
  var q = dEl('bl-q').value.trim().toLowerCase();
  var list = PURCHASES.filter(function (x) { return !q || (x.bill_no + ' ' + x.our_no + ' ' + (x.supplier_name || '')).toLowerCase().indexOf(q) >= 0; });
  dEl('bl-b').innerHTML = list.length ? list.map(function (x) {
    return '<tr style="cursor:pointer" onclick="openPurchase(' + A(x.id) + ')"><td>' + dDate(x.bill_date) + '</td><td><b>' + esc(x.supplier_name || '') + '</b><div class="tiny">Bill ' + esc(x.bill_no) + '</div></td><td>' + esc(x.our_no) + '</td><td class="r"><b>' + dMoney0(x.total) + '</b>' + (x.status === 'cancelled' ? '<div><span class="tag t-r">Cancelled</span></div>' : '') + '</td><td class="tiny">' + esc(x.created_by_name || '') + '</td><td class="r"><button class="btn btn-sm">Open</button></td></tr>';
  }).join('') : '<tr><td colspan="6" class="lines-empty">No purchases in this period.</td></tr>';
}
async function openPurchase(id) {
  var r = await _supa.from('wh_purchases').select('*').eq('id', id).single(); if (r.error) { showToast(dErr(r.error)); return; }
  var x = r.data, it = await _supa.from('wh_purchase_items').select('*').eq('purchase_id', id).order('name');
  dEl('doc-title').textContent = 'Purchase ' + x.our_no;
  dEl('doc-body').innerHTML = '<div class="muted" style="margin-bottom:10px">' + esc(x.supplier_name || '') + (x.supplier_gstin ? ' &middot; ' + esc(x.supplier_gstin) : '') + ' &middot; bill ' + esc(x.bill_no) + ' of ' + dDate(x.bill_date) + ' &middot; entered by ' + esc(x.created_by_name || '')
    + (x.status === 'cancelled' ? '<div class="note" style="margin-top:8px">Cancelled: ' + esc(x.cancel_reason || '') + '</div>' : '') + '</div>'
    + '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Item</th><th>Batch</th><th class="r">Qty + free</th><th class="r">Rate</th><th class="r">GST</th><th class="r">MRP</th><th class="r">Amount</th></tr></thead><tbody>'
    + (it.data || []).map(function (l) { return '<tr><td><b>' + esc(l.name) + '</b></td><td>' + esc(l.batch_no || '') + ' &middot; ' + dExp(l.expiry) + '</td><td class="r">' + Number(l.qty) + (Number(l.free) ? ' + ' + Number(l.free) : '') + '</td><td class="r">' + dMoney(l.rate) + (Number(l.disc) ? '<div class="tiny">-' + Number(l.disc) + '%</div>' : '') + '</td><td class="r">' + Number(l.gst_rate) + '%</td><td class="r">' + dMoney(l.mrp) + '</td><td class="r">' + dMoney(l.amount) + '</td></tr>'; }).join('')
    + '</tbody></table></div><div style="text-align:right;margin:10px 0">Taxable ' + dMoney(x.taxable) + (x.interstate ? ' &middot; IGST ' + dMoney(x.igst) : ' &middot; CGST ' + dMoney(x.cgst) + ' &middot; SGST ' + dMoney(x.sgst)) + ' &middot; <b style="font-size:16px">Total ' + dMoney0(x.total) + '</b></div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap">' + (x.doc_path ? '<button class="btn" onclick="viewBillPhoto(' + A(x.doc_path) + ')">&#128247; Bill photo</button>' : '')
    + (CAN.buy && x.status === 'posted' ? '<button class="btn" onclick="dClose(\'m-doc\');buySeg(\'ret\');ppSet(\'pret\',' + A(x.supplier_id) + ');setTimeout(function(){dEl(\'br-bill\').value=' + A(x.id) + ';brBill();},300)">&#8618; Return goods to supplier</button>' : '')
    + (CAN.owner && x.status === 'posted' ? '<button class="btn btn-r" onclick="purchaseCancel(' + A(x.id) + ')">Cancel purchase</button>' : '') + '</div>';
  dOpen('m-doc');
}
async function viewBillPhoto(p) { var r = await _supa.storage.from('bills').createSignedUrl(p, 600); if (r.error) { showToast(dErr(r.error)); return; } window.open(r.data.signedUrl, '_blank'); }
async function purchaseCancel(id) {
  var why = prompt('Why is this purchase cancelled? (its stock is removed; only possible if nothing from it was sold)'); if (!why) return;
  var r = await _supa.rpc('wh_cancel_purchase', { p_clinic: _clinicId, p_id: id, p_reason: why });
  if (r.error) { showToast(dErr(r.error)); return; }
  showToast('Purchase cancelled.'); dClose('m-doc'); loadItems(); loadPurchases();
}

/* purchase return (debit note) */
async function brLoadBills() {
  var p = PICK.pret.party, sel = dEl('br-bill'); PURCH_OF_SUP = [];
  sel.innerHTML = '<option value="">Any batch in stock</option>';
  if (p && CAN.buyRead) {
    var r = await _supa.from('wh_purchases').select('id,our_no,bill_no,bill_date,total').eq('clinic_id', _clinicId).eq('supplier_id', p.id).eq('status', 'posted').order('bill_date', { ascending: false }).limit(100);
    PURCH_OF_SUP = r.data || [];
    sel.innerHTML += PURCH_OF_SUP.map(function (x) { return '<option value="' + x.id + '">Bill ' + esc(x.bill_no) + ' &middot; ' + dDate(x.bill_date) + ' &middot; ' + dMoney0(x.total) + '</option>'; }).join('');
  }
  RLINES = []; brRender();
}
var BR_BILL_BATCHES = null;
async function brBill() {
  var id = dEl('br-bill').value; BR_BILL_BATCHES = null; RLINES = [];
  if (id) { var r = await _supa.from('wh_purchase_items').select('batch_id,rate,disc').eq('purchase_id', id); BR_BILL_BATCHES = {}; (r.data || []).forEach(function (x) { BR_BILL_BATCHES[x.batch_id] = r2(Number(x.rate) * (1 - Number(x.disc) / 100)); }); }
  brRender();
}
function brSearch() {
  var q = dEl('br-q').value.trim(), dd = dEl('br-dd');
  if (q.length < 2) { dd.style.display = 'none'; return; }
  var opts = [];
  ITEMS.filter(function (it) { return itemMatch(it, q); }).forEach(function (it) {
    it.batches.forEach(function (b) { if (b.qty > 0 && (!BR_BILL_BATCHES || BR_BILL_BATCHES[b.id] !== undefined)) opts.push({ it: it, b: b }); });
  });
  dd.innerHTML = opts.length ? opts.slice(0, 15).map(function (o) { return '<div class="dd-i" data-k="1" onclick="brAdd(' + A(o.b.id) + ',' + A(o.it.id) + ')"><b>' + esc(o.it.name) + '</b> <span class="tiny">batch ' + esc(o.b.batch_no) + ' &middot; exp ' + dExp(o.b.expiry) + (o.b.expired ? ' (expired)' : '') + ' &middot; ' + o.b.qty + ' in stock</span></div>'; }).join('')
    : '<div class="dd-i muted">No batch in stock' + (BR_BILL_BATCHES ? ' from that bill' : '') + '.</div>';
  dd.style.display = 'block';
}
function brAdd(bid, iid) {
  var it = ITEMMAP[iid], b = it.batches.filter(function (x) { return x.id === bid; })[0];
  if (RLINES.some(function (l) { return l.batch_id === bid; })) return;
  RLINES.push({ batch_id: bid, item_id: iid, qty: b.qty, rate: BR_BILL_BATCHES ? BR_BILL_BATCHES[bid] : r2(b.purchase_rate) });
  dEl('br-q').value = ''; dEl('br-dd').style.display = 'none'; brRender();
}
function brRender() {
  var p = PICK.pret && PICK.pret.party, inter = isInter(p), T = { tx: 0, t: 0 };
  dEl('br-lines').innerHTML = RLINES.length ? RLINES.map(function (l, i) {
    var it = ITEMMAP[l.item_id], b = it.batches.filter(function (x) { return x.id === l.batch_id; })[0], tx = r2(num(l.qty) * num(l.rate)), t = tax(tx, Number(it.gst_rate), inter);
    T.tx += tx; T.t += t.c + t.s + t.i;
    return '<tr><td><b>' + esc(it.name) + '</b><div class="tiny">' + esc(b.batch_no) + ' &middot; ' + dExp(b.expiry) + '</div></td><td class="r">' + b.qty + '</td>'
      + '<td class="r"><input class="finput" type="number" min="0" max="' + b.qty + '" value="' + esc(l.qty) + '" style="width:76px;text-align:right" oninput="RLINES[' + i + '].qty=this.value;brSum()"/></td>'
      + '<td class="r"><input class="finput" type="number" min="0" step="0.01" value="' + esc(l.rate) + '" style="width:84px;text-align:right" oninput="RLINES[' + i + '].rate=this.value;brSum()"/></td>'
      + '<td class="r"><b>' + dMoney(tx + t.c + t.s + t.i) + '</b></td><td class="r"><button class="btn btn-sm btn-r" onclick="RLINES.splice(' + i + ',1);brRender()">&times;</button></td></tr>';
  }).join('') : '<tr><td colspan="6" class="lines-empty">Search an item above and pick the batch going back.</td></tr>';
  var g = r2(T.tx + T.t);
  dEl('br-sum').innerHTML = '<div class="sum-row"><span>Taxable</span><span>' + dMoney(T.tx) + '</span></div><div class="sum-row"><span>' + (inter ? 'IGST' : 'CGST + SGST') + '</span><span>' + dMoney(T.t) + '</span></div><div class="sum-row big"><span>Debit note</span><span>' + dMoney0(Math.round(g)) + '</span></div>';
}
var _brT; function brSum() { clearTimeout(_brT); _brT = setTimeout(brRender, 500); }
async function brSave() {
  dShowErr('br-err', '');
  var p = PICK.pret.party; if (!p) { dShowErr('br-err', 'Choose the supplier.'); return; }
  var lines = RLINES.filter(function (l) { return num(l.qty) > 0; }).map(function (l) { return { batch_id: l.batch_id, qty: num(l.qty), rate: num(l.rate) }; });
  if (!lines.length) { dShowErr('br-err', 'Add at least one batch with a quantity.'); return; }
  var reason = dEl('br-reason').value.trim(); if (!reason) { dShowErr('br-err', 'Write the reason.'); return; }
  dEl('br-save').disabled = true;
  var r = await _supa.rpc('wh_return', { p_clinic: _clinicId, p: { kind: 'purchase_return', supplier_id: p.id, purchase_id: dEl('br-bill').value || null, reason: reason, lines: lines } });
  dEl('br-save').disabled = false;
  if (r.error) { dShowErr('br-err', dErr(r.error)); return; }
  RLINES = []; dEl('br-reason').value = ''; brRender(); await loadItems(); loadReturns('purchase_return', 'dn-b'); openReturn(r.data.id);
}

/* scan the supplier's bill */
function scanResize(file) {
  return new Promise(function (res, rej) {
    var fr = new FileReader();
    fr.onload = function () { var im = new Image(); im.onload = function () { var max = 2200, k = Math.min(1, max / Math.max(im.width, im.height)); var c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); c.toBlob(function (bl) { res({ data: c.toDataURL('image/jpeg', 0.85), blob: bl }); }, 'image/jpeg', 0.85); }; im.onerror = function () { rej(new Error('This file is not a picture.')); }; im.src = fr.result; };
    fr.onerror = function () { rej(new Error('Could not read the file.')); }; fr.readAsDataURL(file);
  });
}
var SCAN = [], SCAN_DOC = null;
async function scanPick(inp) {
  var f = inp.files && inp.files[0]; inp.value = ''; if (!f) return;
  var st = dEl('b-scan-st'); st.innerHTML = '<span class="spin" style="display:inline-block;width:14px;height:14px;vertical-align:middle;border-width:2px"></span> Reading the bill&hellip; this takes about 20-40 seconds.';
  try {
    var img = await scanResize(f);
    /* keep the photo with the purchase */
    SCAN_DOC = _clinicId + '/wholesale/purchase-bills/' + Date.now() + '.jpg';
    try { var up = await _supa.storage.from('bills').upload(SCAN_DOC, img.blob, { contentType: 'image/jpeg', upsert: true }); if (up.error) SCAN_DOC = null; } catch (e) { SCAN_DOC = null; }
    var r = await _supa.functions.invoke('pharmacy-bill-scan', { body: { clinic_id: _clinicId, image_base64: img.data.split(',')[1], mime_type: 'image/jpeg', module: 'wholesale' } });
    var d = r.data; if (r.error) { try { if (r.error.context && r.error.context.json) d = await r.error.context.json(); } catch (e) {} }
    if (!d || !d.ok) {
      var why = { daily_limit: 'Today\'s limit of bill photos is used up. Please add the lines by hand.', ai_key_not_set: 'Bill reading is not set up on the server yet.', not_allowed: 'Only the owner or inventory staff can scan bills.', nothing_read: 'No product lines could be read. Take a clearer, straight photo of the whole bill in good light.', image_too_large: 'The photo is too large.', not_signed_in: 'Your login has expired. Please log in again.' };
      var msg = why[d && d.reason] || ('Could not read the bill' + (d && d.message ? ': ' + d.message : (r.error ? ': ' + dErr(r.error) : '')) + '.');
      st.textContent = '⚠ ' + msg;
      if (!d || ['not_allowed', 'not_signed_in'].indexOf(d.reason) < 0) {   /* the photo could not be read: type the bill by hand on the same check screen */
        scanReview({ _failed: msg, lines: [{}] }); SCAN[0].manual = true; scanRows(); scanCheck();
      }
      return;
    }
    st.textContent = ''; scanReview(d);
  } catch (e) { st.textContent = '⚠ ' + dErr(e); }
}
function scanExp(v) {   /* MM/YYYY, MM/YY, MM-YY -> YYYY-MM */
  var m = String(v || '').match(/(\d{1,2})\s*[\/\-.]\s*(\d{2,4})/); if (!m) return '';
  var mm = Math.min(12, Math.max(1, Number(m[1]))), yy = m[2].length === 2 ? '20' + m[2] : m[2];
  return yy + '-' + ('0' + mm).slice(-2);
}
var SCAN_D = null, SCAN_SUP = '';
function scanReview(d) {
  SCAN_D = d;
  var m = PARTIES.filter(function (p) { return (d.supplier_gstin && p.gstin === String(d.supplier_gstin).toUpperCase()) || (d.supplier && p.name.toLowerCase() === String(d.supplier).toLowerCase()); })[0];
  SCAN_SUP = m ? m.id : '';
  SCAN = d.lines.map(function (l) {
    var n = String(l.name || '').toLowerCase(), first = n.split(/\s+/)[0] || '';
    var best = ITEMS.filter(function (it) { return it.name.toLowerCase() === n; })[0] || ITEMS.filter(function (it) { return first.length >= 3 && it.name.toLowerCase().indexOf(first) === 0; })[0];
    var g = (l.gst !== null && l.gst !== undefined && l.gst !== '' && [0, 5, 12, 18, 28, 40].indexOf(Number(l.gst)) >= 0) ? Number(l.gst) : '';   /* not read -> must be chosen, never assumed 0 */
    return { inc: true, read: l.name || '', orig: l.name || '', match: best ? best.id : '', batch: (l.batch || '').toUpperCase(), expiry: scanExp(l.expiry), qty: l.qty == null ? '' : l.qty, free: l.free || 0,
      rate: l.rate == null ? '' : l.rate, disc: l.disc || 0, gst: g, mrp: l.mrp == null ? '' : l.mrp, hsn: l.hsn || '', mfg: l.mfg || '', pack: l.pack || '' };
  });
  dEl('scan-body').innerHTML = (d._failed ? '<div class="note" style="background:var(--red-bg);border-color:var(--red-border);color:var(--red)">' + esc(d._failed) + ' The photo is saved with the purchase. Type the details from the paper bill below.</div>' : '')
    + '<div class="note"><b>AuraScale only goes ahead when nothing is missing.</b> Anything AI could not read (or that is not on the photo) is left empty and marked red: type it from the paper bill. If a line was missed, tap <b>Add a line</b>.</div>'
    + '<div class="grid4" style="margin-bottom:10px"><div><label class="flbl">Supplier on the bill *</label><div class="muted">' + esc(d.supplier || '(not read)') + (d.supplier_gstin ? '<br>' + esc(d.supplier_gstin) : '') + '</div><div id="sc-sup"></div></div>'
    + '<div><label class="flbl">Bill no. *</label><input class="finput" id="sc-no" value="' + esc(d.invoice_no || '') + '" oninput="scanCheck()"/></div><div><label class="flbl">Bill date *</label><input class="finput" id="sc-date" type="date" value="' + esc(d.invoice_date ? scanDate(d.invoice_date) : '') + '" oninput="scanCheck()"/></div>'
    + '<div><label class="flbl">Grand total on the bill &#8377; *</label><input class="finput" id="sc-tot" type="number" step="0.01" min="0" value="' + esc(d.bill_total == null ? '' : d.bill_total) + '" oninput="scanCheck()"/></div></div>'
    + '<div style="overflow-x:auto"><table class="dt wl" id="sc-t"><thead><tr><th></th><th>Item (match to your list, or type it)</th><th>Mfg.</th><th>Batch *</th><th>Expiry *</th><th>Qty *</th><th>Free</th><th>Rate *</th><th>Disc %</th><th>GST *</th><th>MRP *</th></tr></thead><tbody id="sc-tb"></tbody></table></div>'
    + '<button class="btn btn-sm" style="margin-top:8px" onclick="scanAddLine()">&#10133; Add a line (missed or not on the photo)</button>'
    + '<p class="tiny" style="margin-top:6px">MRP and rate are per unit you sell (e.g. per strip). If the bill shows per box, divide before adding.</p>'
    + '<div id="sc-sum" style="margin-top:10px"></div>'
    + '<div id="sc-why-box" style="display:none;margin-top:8px"><label class="flbl">The total does not match. Write why (e.g. freight added, cash discount on bill) *</label><input class="finput" id="sc-why" oninput="scanCheck()"/></div>'
    + '<button class="btn btn-g" style="margin-top:10px" id="sc-go" onclick="scanUse()">&#10003; Put the ticked lines into the purchase</button><div class="err" id="scan-err"></div>';
  scanRows();
  scanSupBox(); dOpen('m-scan'); scanCheck();
}
function scanRows() {
  var cand = function (x) { var w = String(x.read || '').toLowerCase().split(/\s+/)[0] || ''; return ITEMS.filter(function (it) { return w.length >= 3 && it.name.toLowerCase().indexOf(w) >= 0; }).slice(0, 8); };
  var inp = function (i, k, w, ty, ph) { return '<input class="finput" data-i="' + i + '" data-k="' + k + '" style="width:' + w + 'px;padding:6px" ' + (ty === 'n' ? 'type="number" step="any" min="0"' : ty === 'm' ? 'type="month"' : '') + (ph ? ' placeholder="' + ph + '"' : '') + ' value="' + esc(SCAN[i][k]) + '" oninput="SCAN[' + i + '][\'' + k + '\']=this.value;scanCheck()"/>'; };
  dEl('sc-tb').innerHTML = SCAN.map(function (x, i) {
    var cs = cand(x);
    var opts = '<option value="">&#10133; New item (type below)</option>' + cs.map(function (it) { return '<option value="' + it.id + '"' + (it.id === x.match ? ' selected' : '') + '>' + esc(it.name) + '</option>'; }).join('')
      + (x.match && !cs.some(function (it) { return it.id === x.match; }) ? '<option value="' + x.match + '" selected>' + esc(ITEMMAP[x.match].name) + '</option>' : '');
    return '<tr id="sc-r' + i + '"><td><input type="checkbox"' + (x.inc ? ' checked' : '') + ' onchange="SCAN[' + i + '].inc=this.checked;scanCheck()" style="width:18px;height:18px;appearance:auto"/></td>'
      + '<td>' + (x.manual ? '<div class="tiny">Typed by you</div>' : '<div class="tiny">Read: ' + esc(x.orig || '(nothing)') + '</div>')
      + '<select class="finput" style="width:210px;padding:6px" onchange="SCAN[' + i + '].match=this.value;scanCheck()">' + opts + '</select>'
      + '<div class="sc-new" id="sc-n' + i + '" style="margin-top:4px">' + inp(i, 'read', 210, '', 'Item name *') + '<div style="display:flex;gap:4px;margin-top:4px">' + inp(i, 'hsn', 100, '', 'HSN') + inp(i, 'pack', 104, '', 'Pack e.g. 1x10') + '</div></div>'
      + '<div class="tiny over" id="sc-e' + i + '"></div></td>'
      + '<td>' + inp(i, 'mfg', 70) + '</td><td>' + inp(i, 'batch', 92) + '</td><td>' + inp(i, 'expiry', 130, 'm') + '</td><td>' + inp(i, 'qty', 64, 'n') + '</td><td>' + inp(i, 'free', 54, 'n') + '</td><td>' + inp(i, 'rate', 76, 'n') + '</td><td>' + inp(i, 'disc', 56, 'n') + '</td>'
      + '<td><select class="finput" data-i="' + i + '" data-k="gst" style="width:70px;padding:6px" onchange="SCAN[' + i + '].gst=this.value===\'\'?\'\':Number(this.value);scanCheck()"><option value="">?</option>' + [0, 5, 12, 18, 28, 40].map(function (g) { return '<option' + (g === x.gst ? ' selected' : '') + '>' + g + '</option>'; }).join('') + '</select></td><td>' + inp(i, 'mrp', 76, 'n') + '</td></tr>';
  }).join('');
}
function scanAddLine() {
  SCAN.push({ inc: true, manual: true, read: '', orig: '', match: '', batch: '', expiry: '', qty: '', free: 0, rate: '', disc: 0, gst: '', mrp: '', hsn: '', mfg: '', pack: '' });
  scanRows(); scanCheck();
  var x = document.querySelector('#sc-r' + (SCAN.length - 1) + ' [data-k="read"]'); if (x) x.focus();
}
function scanSupBox() {
  var el = dEl('sc-sup'), p = PARTYMAP[SCAN_SUP], d = SCAN_D || {};
  el.innerHTML = p ? '<div class="tiny" style="color:var(--green);font-weight:700">&#10003; ' + esc(p.name) + '</div>'
    : '<div class="tiny over">Not in your list.</div><button class="btn btn-sm" style="margin-top:4px" onclick="partyEdit(null,\'scan\',' + A(d.supplier || '') + ',' + A(d.supplier_gstin || '') + ')">&#10133; Add this supplier</button>'
      + '<select class="finput" style="margin-top:4px;padding:6px" onchange="SCAN_SUP=this.value;scanSupBox();scanCheck()"><option value="">or choose from your list&hellip;</option>' + PARTIES.filter(function (x) { return x.is_active && x.party_type !== 'customer'; }).map(function (x) { return '<option value="' + x.id + '">' + esc(x.name) + '</option>'; }).join('') + '</select>';
}
/* every check; returns the list of problems (empty = OK to go ahead) and marks the missing boxes red */
function scanCheck() {
  var probs = [], sup = PARTYMAP[SCAN_SUP], inter = isInter(sup), tot = 0, ticked = 0, untick = 0, today0 = today();
  [].forEach.call(document.querySelectorAll('#sc-t .finput[data-k]'), function (e) { e.style.borderColor = ''; });
  var bad = function (i, k) { var e = document.querySelector('#sc-t [data-i="' + i + '"][data-k="' + k + '"]'); if (e) e.style.borderColor = 'var(--red)'; };
  SCAN.forEach(function (x, i) {
    var e = dEl('sc-e' + i), tr = dEl('sc-r' + i), msg = [];
    if (!x.inc) { untick++; if (e) e.textContent = ''; if (tr) tr.style.opacity = '.5'; return; }
    if (tr) tr.style.opacity = '';
    ticked++;
    var nb = dEl('sc-n' + i); if (nb) nb.style.display = x.match ? 'none' : 'block';
    if (!x.match && !String(x.read || '').trim()) { msg.push('item name'); bad(i, 'read'); }
    if (!String(x.batch || '').trim()) { msg.push('batch'); bad(i, 'batch'); }
    if (!/^\d{4}-\d{2}$/.test(x.expiry || '')) { msg.push('expiry'); bad(i, 'expiry'); }
    else if (x.expiry + '-28' < today0.slice(0, 7) + '-01') { msg.push('already expired'); bad(i, 'expiry'); }
    if (!(num(x.qty) > 0)) { msg.push('quantity'); bad(i, 'qty'); }
    if (num(x.free) < 0) { msg.push('free'); bad(i, 'free'); }
    if (!(num(x.rate) > 0)) { msg.push('rate'); bad(i, 'rate'); }
    if (num(x.disc) < 0 || num(x.disc) > 100) { msg.push('discount'); bad(i, 'disc'); }
    if (x.gst === '' || [0, 5, 12, 18, 28, 40].indexOf(Number(x.gst)) < 0) { msg.push('GST %'); bad(i, 'gst'); }
    if (!(num(x.mrp) > 0)) { msg.push('MRP'); bad(i, 'mrp'); }
    if (num(x.mrp) > 0 && num(x.rate) > 0 && x.gst !== '' && r2(num(x.rate) * (1 - num(x.disc) / 100) * (1 + Number(x.gst) / 100)) > num(x.mrp)) { msg.push('rate + GST is above MRP (per box vs per strip?)'); bad(i, 'rate'); bad(i, 'mrp'); }
    if (e) e.textContent = msg.length ? 'Missing / wrong: ' + msg.join(', ') : '';
    if (msg.length) probs.push('line ' + (i + 1) + ' (' + msg.join(', ') + ')');
    var tx = r2(num(x.qty) * num(x.rate) * (1 - num(x.disc) / 100)), t = tax(tx, Number(x.gst) || 0, inter); tot += tx + t.c + t.s + t.i;
  });
  if (!sup) probs.unshift('supplier (add it or choose it)');
  if (!dEl('sc-no').value.trim()) { probs.unshift('bill no.'); dEl('sc-no').style.borderColor = 'var(--red)'; } else dEl('sc-no').style.borderColor = '';
  var dt = dEl('sc-date').value; if (!dt || dt > today0) { probs.unshift(dt ? 'bill date is in the future' : 'bill date'); dEl('sc-date').style.borderColor = 'var(--red)'; } else dEl('sc-date').style.borderColor = '';
  if (!ticked) probs.push('no line is ticked');
  var billTot = num(dEl('sc-tot').value), lines = Math.round(r2(tot)), diff = r2(billTot - lines), why = dEl('sc-why').value.trim();
  if (!(billTot > 0)) { probs.push('grand total on the bill'); dEl('sc-tot').style.borderColor = 'var(--red)'; } else dEl('sc-tot').style.borderColor = '';
  var mismatch = billTot > 0 && Math.abs(diff) > 2;
  dEl('sc-why-box').style.display = mismatch ? 'block' : 'none';
  if (mismatch && why.length < 5) probs.push('the lines add up to ' + dMoney0(lines) + ' but the bill total is ' + dMoney0(billTot) + ' (difference ' + dMoney0(diff) + '): a line may be missing or misread' + (untick ? ' (' + untick + ' line(s) unticked)' : '') + '. Fix it, or write the reason below');
  dEl('sc-sum').innerHTML = '<div class="card" style="' + (probs.length ? 'border-color:var(--red-border);background:var(--red-bg)' : 'border-color:var(--green-border);background:var(--green-bg)') + '">'
    + 'Lines add up to <b>' + dMoney0(lines) + '</b>' + (billTot > 0 ? ' &middot; bill total <b>' + dMoney0(billTot) + '</b> ' + (mismatch ? '<span class="over">&#10007; does not match</span>' : '<span style="color:var(--green);font-weight:700">&#10003; matches</span>') : '')
    + (probs.length ? '<div class="over" style="margin-top:6px">Cannot go ahead yet. Missing or wrong: ' + esc(probs.join(' · ')) + '</div>' : '<div style="color:var(--green);font-weight:700;margin-top:6px">&#10003; Everything is filled. You can go ahead.</div>') + '</div>';
  var go = dEl('sc-go'); if (go) go.disabled = probs.length > 0;
  return probs;
}
function scanDate(v) { var m = String(v || '').match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/); if (!m) return ''; var y = m[3].length === 2 ? '20' + m[3] : m[3]; return y + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2); }
function scanUse() {
  var probs = scanCheck();
  if (probs.length) { dShowErr('scan-err', 'Cannot go ahead: ' + probs.join(' · ')); return; }
  var add = [];
  SCAN.forEach(function (x) {
    if (!x.inc) return;
    var it = x.match ? ITEMMAP[x.match] : null;
    var l = { item_id: it ? it.id : null, name: it ? it.name : String(x.read).trim(), batch: x.batch.trim().toUpperCase(), expiry: x.expiry, qty: num(x.qty), free: num(x.free), rate: num(x.rate), disc: num(x.disc), gst: Number(x.gst), mrp: num(x.mrp), ptr: null };
    if (!it) l.item = { name: l.name, hsn: x.hsn || '3004', gst_rate: l.gst, unit: /ml|syr|syp|susp|bottle|liq/i.test(x.pack + ' ' + l.name) ? 'bottle' : /vial|inj|amp/i.test(x.pack + ' ' + l.name) ? 'vial' : 'strip', pack: String(x.pack || '').trim(), manufacturer: String(x.mfg || '').trim() };
    add.push(l);
  });
  PLINES = PLINES.concat(add); PLINES._doc = SCAN_DOC;
  ppSet('buy', SCAN_SUP);
  dEl('b-billno').value = dEl('sc-no').value.trim(); dEl('b-date').value = dEl('sc-date').value; dEl('b-billtot').value = dEl('sc-tot').value;
  var why = dEl('sc-why').value.trim(); if (why) dEl('b-note').value = why;
  dClose('m-scan'); buyRender(); showToast(add.length + ' lines added. Check the total, then save.');
}

/* =================================================================== STOCK */
function onTab_stock() { loadItems().then(stockRender); }
function stockFilter(f) { STF = f; segOn('st-f', 'data-f', f); stockRender(); }
function itemStatus(it) {
  var t = [];
  if (it.stock <= 0) t.push('<span class="tag t-r">Out of stock</span>'); else if (it.stock <= Number(it.low_level || 0)) t.push('<span class="tag t-a">Low</span>');
  if (it.nearestExp && dDaysTo(it.nearestExp) <= 90) t.push('<span class="tag t-a">Exp ' + dExp(it.nearestExp) + '</span>');
  if (it.expiredQty > 0) t.push('<span class="tag t-r">' + it.expiredQty + ' expired</span>');
  if (!it.is_active) t.push('<span class="tag">Hidden</span>');
  return t.join(' ') || '<span class="tag t-g">OK</span>';
}
function stockRender() {
  var q = dEl('st-q').value.trim(), val = 0, valM = 0, low = 0, e90 = 0, ex = 0;
  ITEMS.forEach(function (it) { it.batches.forEach(function (b) { if (b.qty > 0 && !b.expired) { val += b.qty * Number(b.purchase_rate); valM += b.qty * Number(b.mrp); } }); if (it.is_active && it.stock <= Number(it.low_level || 0)) low++; if (it.nearestExp && dDaysTo(it.nearestExp) <= 90) e90++; if (it.expiredQty > 0) ex++; });
  dEl('st-stats').innerHTML = '<div><span class="tiny">Items</span><b>' + ITEMS.length + '</b></div><div><span class="tiny">Stock value at cost</span><b>' + dMoney0(val) + '</b><span class="tiny">MRP ' + dMoney0(valM) + '</span></div>'
    + '<div><span class="tiny">Low / out of stock</span><b style="color:var(--amber)">' + low + '</b></div><div><span class="tiny">Expiring in 90 days &middot; expired</span><b style="color:var(--red)">' + e90 + ' &middot; ' + ex + '</b></div>';
  var list = ITEMS.filter(function (it) {
    if (q && !itemMatch(it, q)) return false;
    if (STF === 'low') return it.is_active && it.stock <= Number(it.low_level || 0);
    if (STF === 'exp90') return it.nearestExp && dDaysTo(it.nearestExp) <= 90;
    if (STF === 'expired') return it.expiredQty > 0;
    return true;
  });
  dEl('st-b').innerHTML = list.length ? list.map(function (it) {
    var b = it.sellable[0];
    return '<tr style="cursor:pointer" onclick="itemOpen(' + A(it.id) + ')"><td><b>' + esc(it.name) + '</b><div class="tiny">' + (it.composition ? esc(it.composition) + ' &middot; ' : '') + (it.pack ? esc(it.pack) + ' &middot; ' : '') + 'GST ' + Number(it.gst_rate) + '%</div></td>'
      + '<td class="r"><b>' + it.stock + '</b> <span class="tiny">' + esc(it.unit) + '</span></td><td>' + (it.nearestExp ? dExp(it.nearestExp) : '-') + '</td><td class="r">' + (b ? dMoney(b.mrp) : '-') + '</td><td class="r hide-sm">' + (b && b.ptr ? dMoney(b.ptr) : '-') + '</td><td>' + itemStatus(it) + '</td><td class="r"><button class="btn btn-sm">Open</button></td></tr>';
  }).join('') : '<tr><td colspan="7" class="lines-empty">' + (ITEMS.length ? 'Nothing matches.' : 'No items yet. Enter a purchase to add stock.') + '</td></tr>';
}
async function itemOpen(id) {
  var it = ITEMMAP[id]; if (!it) return;
  var mv = await _supa.from('wh_moves').select('*').eq('item_id', id).order('created_at', { ascending: false }).limit(30);
  var sup = function (sid) { return sid && PARTYMAP[sid] ? PARTYMAP[sid].name : ''; };
  dEl('item-title').textContent = it.name;
  dEl('item-body').innerHTML = '<div class="muted" style="margin-bottom:10px">' + esc(it.composition || '') + ' &middot; ' + esc(it.manufacturer || '') + ' &middot; GST ' + Number(it.gst_rate) + '% &middot; HSN ' + esc(it.hsn || '-') + ' &middot; per ' + esc(it.unit) + (it.pack ? ' (' + esc(it.pack) + ')' : '') + ' &middot; warn at ' + Number(it.low_level) + '</div>'
    + '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Batch</th><th>Expiry</th><th class="r">MRP</th><th class="r">PTR</th><th class="r">Cost</th><th class="r">Qty</th><th>Supplier</th><th></th></tr></thead><tbody>'
    + (it.batches.filter(function (b) { return b.qty > 0; }).map(function (b) {
      return '<tr><td>' + esc(b.batch_no) + '</td><td>' + dExp(b.expiry) + (b.expired ? ' <span class="tag t-r">Expired</span>' : dDaysTo(b.expiry) <= 90 ? ' <span class="tag t-a">Soon</span>' : '') + '</td><td class="r">' + dMoney(b.mrp) + '</td><td class="r">' + (b.ptr ? dMoney(b.ptr) : '-') + '</td><td class="r">' + dMoney(b.purchase_rate) + '</td><td class="r"><b>' + b.qty + '</b></td><td class="tiny">' + esc(sup(b.supplier_id)) + '</td>'
        + '<td class="r">' + (CAN.buy ? '<button class="btn btn-sm" onclick="batchCorrect(' + A(b.id) + ',' + b.qty + ',' + A(it.id) + ')">Correct</button>' : '') + '</td></tr>';
    }).join('') || '<tr><td colspan="8" class="muted">No stock.</td></tr>') + '</tbody></table></div>'
    + '<h4 style="font-size:13px;margin:16px 0 6px">Last movements</h4><div style="overflow-x:auto"><table class="dt"><tbody>'
    + ((mv.data || []).map(function (m) { return '<tr><td class="tiny">' + dDateTime(m.created_at) + '</td><td>' + esc(({ purchase: 'Purchase', sale: 'Sale', sales_return: 'Customer return', purchase_return: 'Back to supplier', corrected: 'Corrected', sale_cancelled: 'Invoice cancelled', purchase_cancelled: 'Purchase cancelled' })[m.kind] || m.kind) + ' ' + esc(m.ref_no || '') + '<div class="tiny">' + esc(m.batch_no || '') + ' &middot; ' + esc(m.note || '') + '</div></td><td class="r"><b>' + (m.change > 0 ? '+' : '') + Number(m.change) + '</b></td><td class="tiny">' + esc(m.created_by_name || '') + '</td></tr>'; }).join('') || '<tr><td class="muted">None.</td></tr>') + '</tbody></table></div>'
    + (CAN.buy ? '<div style="margin-top:14px"><button class="btn" onclick="itemEdit(' + A(it.id) + ')">&#9998; Edit item</button></div>' : '');
  dOpen('m-item');
}
async function batchCorrect(bid, cur, iid) {
  var v = prompt('Correct quantity in this batch (counted). Now: ' + cur); if (v === null) return;
  var why = prompt('Reason (e.g. broken, counted wrong):'); if (!why) return;
  var r = await _supa.rpc('wh_adjust', { p_clinic: _clinicId, p_batch: bid, p_new_qty: Number(v), p_reason: why });
  if (r.error) { showToast(dErr(r.error)); return; }
  showToast('Stock corrected.'); await loadItems(); stockRender(); itemOpen(iid);
}
function itemEdit(id) {
  var it = id ? ITEMMAP[id] : { name: '', composition: '', manufacturer: '', hsn: '3004', gst_rate: 5, unit: 'strip', pack: '', schedule: '', low_level: 0, is_active: true };
  var units = ['strip', 'box', 'bottle', 'vial', 'tube', 'pcs', 'sachet', 'kit'];
  dEl('item-title').textContent = id ? 'Edit ' + it.name : 'New item';
  dEl('item-body').innerHTML = '<div class="grid2">'
    + '<div><label class="flbl">Name *</label><input class="finput" id="ie-name" value="' + esc(it.name) + '"/></div>'
    + '<div><label class="flbl">Salt / composition</label><input class="finput" id="ie-comp" value="' + esc(it.composition || '') + '"/></div>'
    + '<div><label class="flbl">Manufacturer</label><input class="finput" id="ie-mfr" value="' + esc(it.manufacturer || '') + '"/></div>'
    + '<div><label class="flbl">HSN</label><input class="finput" id="ie-hsn" value="' + esc(it.hsn || '') + '"/></div>'
    + '<div><label class="flbl">GST %</label><select class="finput" id="ie-gst">' + [0, 5, 12, 18, 28, 40].map(function (g) { return '<option' + (Number(it.gst_rate) === g ? ' selected' : '') + '>' + g + '</option>'; }).join('') + '</select></div>'
    + '<div><label class="flbl">Sold per</label><select class="finput" id="ie-unit">' + units.map(function (u) { return '<option' + (it.unit === u ? ' selected' : '') + '>' + u + '</option>'; }).join('') + (units.indexOf(it.unit) < 0 ? '<option selected>' + esc(it.unit) + '</option>' : '') + '</select></div>'
    + '<div><label class="flbl">Pack (e.g. 1x10)</label><input class="finput" id="ie-pack" value="' + esc(it.pack || '') + '"/></div>'
    + '<div><label class="flbl">Schedule</label><select class="finput" id="ie-sch">' + ['', 'H', 'H1', 'X', 'G'].map(function (x) { return '<option value="' + x + '"' + ((it.schedule || '') === x ? ' selected' : '') + '>' + (x || 'None / OTC') + '</option>'; }).join('') + '</select></div>'
    + '<div><label class="flbl">Warn when stock falls to</label><input class="finput" id="ie-low" type="number" min="0" value="' + Number(it.low_level || 0) + '"/></div>'
    + (id ? '<div><label class="flbl">Show in billing</label><select class="finput" id="ie-act"><option value="true"' + (it.is_active ? ' selected' : '') + '>Yes</option><option value="false"' + (!it.is_active ? ' selected' : '') + '>No (hidden)</option></select></div>' : '')
    + '</div><button class="btn btn-g" style="margin-top:14px" onclick="itemSave(' + A(id) + ')">&#10003; Save</button><div class="err" id="ie-err"></div>';
  dOpen('m-item');
}
async function itemSave(id) {
  var p = { name: dEl('ie-name').value.trim(), composition: dEl('ie-comp').value.trim(), manufacturer: dEl('ie-mfr').value.trim(), hsn: dEl('ie-hsn').value.trim(), gst_rate: dEl('ie-gst').value, unit: dEl('ie-unit').value, pack: dEl('ie-pack').value.trim(), schedule: dEl('ie-sch').value, low_level: dEl('ie-low').value };
  if (id) p.is_active = dEl('ie-act').value === 'true';
  var r = await _supa.rpc('wh_save_item', { p_clinic: _clinicId, p_id: id, p: p });
  if (r.error) { dShowErr('ie-err', dErr(r.error)); return; }
  showToast('Saved.'); dClose('m-item'); await loadItems(); stockRender();
}

/* =================================================================== ACCOUNTS */
function onTab_money() { moneySeg(dEl('money-seg').dataset.cur || 'due'); }
function moneySeg(s) {
  if (s === 'pay' && !CAN.money) s = 'due';
  dEl('money-seg').dataset.cur = s; segOn('money-seg', 'data-s', s);
  ['due', 'pay', 'list', 'ledger'].forEach(function (k) { dEl('m-' + k).style.display = k === s ? 'block' : 'none'; });
  if (s === 'due') dueRender();
  if (s === 'list') loadPays();
  if (s === 'pay') loadBalances().then(function () { ppInfo('pay'); });
}
async function dueRender() {
  var out = await loadBalances();
  var inn = out.filter(function (x) { return x.balance > 0; }).sort(function (a, b) { return b.overdue - a.overdue || b.balance - a.balance; }), owe = out.filter(function (x) { return x.balance < 0; }).sort(function (a, b) { return a.balance - b.balance; });
  var s = function (a, f) { return a.reduce(function (t, x) { return t + Math.abs(Number(x[f])); }, 0); };
  dEl('od-stats').innerHTML = '<div><span class="tiny">To receive (' + inn.length + ' parties)</span><b>' + dMoney0(s(inn, 'balance')) + '</b></div><div><span class="tiny">Overdue</span><b class="over">' + dMoney0(s(inn, 'overdue')) + '</b></div><div><span class="tiny">To pay (' + owe.length + ')</span><b>' + dMoney0(s(owe, 'balance')) + '</b></div><div><span class="tiny">Net</span><b>' + dMoney0(s(inn, 'balance') - s(owe, 'balance')) + '</b></div>';
  var sales = ROLE === 'sales'; dEl('od-out').closest('div').style.display = sales ? 'none' : ''; dEl('od-out').closest('div').previousElementSibling.style.display = sales ? 'none' : '';
  if (sales) dEl('od-stats').innerHTML = '<div><span class="tiny">To receive (' + inn.length + ' customers)</span><b>' + dMoney0(s(inn, 'balance')) + '</b></div><div><span class="tiny">Overdue</span><b class="over">' + dMoney0(s(inn, 'overdue')) + '</b></div>';
  dEl('od-in').innerHTML = inn.length ? inn.map(function (x) {
    return '<tr><td><b>' + esc(x.name) + '</b><div class="tiny">' + esc(x.phone || '') + (x.credit_limit ? ' &middot; limit ' + dMoney0(x.credit_limit) : '') + '</div></td><td class="r"><b>' + dMoney0(x.balance) + '</b></td><td class="r">' + (Number(x.overdue) > 0 ? '<span class="over">' + dMoney0(x.overdue) + '</span>' : '-') + '</td><td>' + (x.oldest_unpaid ? dDate(x.oldest_unpaid) : '') + '</td>'
      + '<td class="r" style="white-space:nowrap"><button class="btn btn-sm" onclick="showLedger(' + A(x.party_id) + ')">Ledger</button> ' + (CAN.money ? '<button class="btn btn-sm btn-g" onclick="payFor(' + A(x.party_id) + ',\'in\',' + Number(x.balance) + ')">Receive</button> ' : '')
      + (x.phone ? '<button class="btn btn-sm" onclick="remind(' + A(x.party_id) + ')">&#128242; Remind</button>' : '') + '</td></tr>';
  }).join('') : '<tr><td colspan="5" class="lines-empty">Nobody owes you money.</td></tr>';
  dEl('od-out').innerHTML = owe.length ? owe.map(function (x) {
    return '<tr><td><b>' + esc(x.name) + '</b></td><td class="r"><b>' + dMoney0(-x.balance) + '</b></td><td class="r" style="white-space:nowrap"><button class="btn btn-sm" onclick="showLedger(' + A(x.party_id) + ')">Ledger</button> ' + (CAN.money ? '<button class="btn btn-sm btn-p" onclick="payFor(' + A(x.party_id) + ',\'out\',' + (-Number(x.balance)) + ')">Pay</button>' : '') + '</td></tr>';
  }).join('') : '<tr><td colspan="3" class="lines-empty">You owe nothing.</td></tr>';
}
function remind(pid) {
  var x = BAL[pid], p = PARTYMAP[pid]; if (!x || !p) return;
  var t = 'Dear ' + p.name + ',\nThis is a gentle reminder from ' + (SET.name || DEPT.clinic.name || '') + '.\nOutstanding amount: ' + dMoney0(x.balance) + (Number(x.overdue) > 0 ? ' (' + dMoney0(x.overdue) + ' overdue)' : '') + '.'
    + (SET.upi_id ? '\nUPI: ' + SET.upi_id : '') + (SET.bank_account ? '\nBank: ' + (SET.bank_name || '') + ' A/c ' + SET.bank_account + ' IFSC ' + (SET.bank_ifsc || '') : '') + '\nPlease ignore if already paid. Thank you.';
  window.open('https://wa.me/' + (dMobile(p.phone) ? '91' + dMobile(p.phone) : '') + '?text=' + encodeURIComponent(t), '_blank');
}
function showLedger(pid) { dTab('money'); moneySeg('ledger'); ppSet('ledg', pid); }
function payFor(pid, dir, amt) { dTab('money'); moneySeg('pay'); payDir(dir); ppSet('pay', pid); dEl('mp-amt').value = amt ? Math.round(amt) : ''; dEl('mp-amt').focus(); }
function payDir(d) { PAYDIR = d; segOn('mp-dir', 'data-d', d); dEl('mp-plbl').textContent = d === 'in' ? 'Received from *' : 'Paid to *'; }
async function paySave() {
  dShowErr('mp-err', ''); dEl('mp-done').innerHTML = '';
  var p = PICK.pay.party; if (!p) { dShowErr('mp-err', 'Choose the party.'); return; }
  var body = { party_id: p.id, direction: PAYDIR, amount: num(dEl('mp-amt').value), mode: dEl('mp-mode').value, ref_no: dEl('mp-ref').value.trim(), pay_date: dEl('mp-date').value || today(), note: dEl('mp-note').value.trim() };
  dEl('mp-save').disabled = true;
  var r = await _supa.rpc('wh_payment', { p_clinic: _clinicId, p: body });
  dEl('mp-save').disabled = false;
  if (r.error) { dShowErr('mp-err', dErr(r.error)); return; }
  var x = r.data, bal = Number(x.balance);
  dEl('mp-done').innerHTML = '<div class="card"><b>' + esc(x.no) + '</b> saved: ' + dMoney(x.amount) + (PAYDIR === 'in' ? ' received from ' : ' paid to ') + esc(p.name) + '.<br>Balance now: ' + (bal > 0 ? esc(p.name) + ' owes ' + dMoney0(bal) : bal < 0 ? 'you owe ' + dMoney0(-bal) : 'nothing due')
    + (PAYDIR === 'in' && p.phone ? '<div style="margin-top:8px"><button class="btn btn-sm btn-g" onclick="receiptWa(' + A(p.id) + ',' + A(x.no) + ',' + Number(x.amount) + ',' + bal + ')">&#128242; Send receipt on WhatsApp</button></div>' : '') + '</div>';
  ['mp-amt', 'mp-ref', 'mp-note'].forEach(function (k) { dEl(k).value = ''; }); ppSet('pay', null); loadBalances();
}
function receiptWa(pid, no, amt, bal) {
  var p = PARTYMAP[pid]; var t = (SET.name || DEPT.clinic.name || '') + '\nReceipt ' + no + '\nReceived with thanks ' + dMoney(amt) + ' from ' + p.name + '.\nBalance due: ' + dMoney0(Math.max(bal, 0));
  window.open('https://wa.me/' + (dMobile(p.phone) ? '91' + dMobile(p.phone) : '') + '?text=' + encodeURIComponent(t), '_blank');
}
function mlRange(n) { ML_RANGE = n; segOn('ml-range', 'data-r', n); loadPays(); }
async function loadPays() {
  var r = await _supa.from('wh_payments').select('*').eq('clinic_id', _clinicId).gte('pay_date', rangeFrom(ML_RANGE)).order('created_at', { ascending: false }).limit(2000);
  if (r.error) { showToast(dErr(r.error)); return; }
  PAYS = r.data || [];
  var live = PAYS.filter(function (x) { return x.status === 'posted'; }), s = function (d, m) { return live.filter(function (x) { return x.direction === d && (!m || x.mode === m); }).reduce(function (t, x) { return t + Number(x.amount); }, 0); };
  dEl('ml-stats').innerHTML = '<div><span class="tiny">Received</span><b>' + dMoney0(s('in')) + '</b><span class="tiny">cash ' + dMoney0(s('in', 'cash')) + '</span></div><div><span class="tiny">Paid</span><b>' + dMoney0(s('out')) + '</b><span class="tiny">cash ' + dMoney0(s('out', 'cash')) + '</span></div>';
  dEl('ml-b').innerHTML = PAYS.length ? PAYS.map(function (x) {
    var p = PARTYMAP[x.party_id] || {};
    return '<tr' + (x.status === 'cancelled' ? ' style="opacity:.55"' : '') + '><td>' + dDate(x.pay_date) + '</td><td><b>' + esc(x.no) + '</b>' + (x.status === 'cancelled' ? '<div><span class="tag t-r">Cancelled</span></div>' : '') + '</td><td>' + esc(p.name || '') + (x.note ? '<div class="tiny">' + esc(x.note) + '</div>' : '') + '</td><td class="tiny">' + esc(payTxt(x.mode)) + (x.ref_no ? ' &middot; ' + esc(x.ref_no) : '') + '</td>'
      + '<td class="r">' + (x.direction === 'in' ? dMoney(x.amount) : '') + '</td><td class="r">' + (x.direction === 'out' ? dMoney(x.amount) : '') + '</td><td class="r">' + (CAN.owner && x.status === 'posted' ? '<button class="btn btn-sm btn-r" onclick="payCancel(' + A(x.id) + ')">Cancel</button>' : '') + '</td></tr>';
  }).join('') : '<tr><td colspan="7" class="lines-empty">No payments in this period.</td></tr>';
}
async function payCancel(id) {
  var why = prompt('Why is this payment cancelled? (e.g. cheque bounced, entered twice)'); if (!why) return;
  var r = await _supa.rpc('wh_cancel_payment', { p_clinic: _clinicId, p_id: id, p_reason: why });
  if (r.error) { showToast(dErr(r.error)); return; }
  showToast('Payment cancelled.'); loadPays();
}
var LEDGER = null;
async function ledgerLoad() {
  var p = PICK.ledg && PICK.ledg.party; if (!p) { dEl('lg-out').innerHTML = ''; return; }
  var r = await _supa.rpc('wh_ledger', { p_clinic: _clinicId, p_party: p.id, p_from: dEl('lg-from').value || null, p_to: dEl('lg-to').value || null });
  if (r.error) { dEl('lg-out').innerHTML = '<div class="err" style="display:block">' + esc(dErr(r.error)) + '</div>'; return; }
  LEDGER = r.data;
  var bt = function (b) { b = Number(b); return b > 0 ? dMoney(b) + ' Dr' : b < 0 ? dMoney(-b) + ' Cr' : '0.00'; };
  dEl('lg-out').innerHTML = '<p class="tiny" style="margin-bottom:8px">Dr = ' + esc(p.name) + ' owes you &middot; Cr = you owe ' + esc(p.name) + '</p>'
    + '<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Date</th><th>Entry</th><th class="r">Debit</th><th class="r">Credit</th><th class="r">Balance</th></tr></thead><tbody>'
    + '<tr><td>' + dDate(LEDGER.from) + '</td><td><b>Opening balance</b></td><td></td><td></td><td class="r"><b>' + bt(LEDGER.opening) + '</b></td></tr>'
    + LEDGER.rows.map(function (x) { return '<tr><td>' + dDate(x.date) + '</td><td>' + esc(x.type) + ' <b>' + esc(x.no || '') + '</b>' + (x.note ? '<div class="tiny">' + esc(x.note) + '</div>' : '') + '</td><td class="r">' + (Number(x.debit) ? dMoney(x.debit) : '') + '</td><td class="r">' + (Number(x.credit) ? dMoney(x.credit) : '') + '</td><td class="r">' + bt(x.balance) + '</td></tr>'; }).join('')
    + '<tr><td></td><td><b>Closing balance</b></td><td class="r"><b>' + dMoney(LEDGER.debit) + '</b></td><td class="r"><b>' + dMoney(LEDGER.credit) + '</b></td><td class="r"><b>' + bt(LEDGER.closing) + '</b></td></tr></tbody></table></div>'
    + '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn" id="lg-pdf" onclick="ledgerPdf(false)">&#128196; Statement PDF</button>' + (p.phone ? '<button class="btn btn-g" onclick="ledgerPdf(true)">&#128242; Send statement on WhatsApp</button>' : '') + '</div>';
}

/* =================================================================== PARTIES */
async function onTab_parties() { await loadParties(); if (CAN.moneyRead) await loadBalances(); partiesRender(); }
function ptFilter(f) { PTF = f; segOn('pt-f', 'data-f', f); partiesRender(); }
function partiesRender() {
  var q = dEl('pt-q').value.trim().toLowerCase();
  var list = PARTIES.filter(function (p) { return (PTF === 'all' || p.party_type === PTF || p.party_type === 'both') && (!q || (p.name + ' ' + (p.phone || '') + ' ' + (p.gstin || '')).toLowerCase().indexOf(q) >= 0); });
  dEl('pt-b').innerHTML = list.length ? list.map(function (p) {
    var b = BAL[p.id], bal = b ? Number(b.balance) : 0;
    return '<tr' + (p.is_active ? '' : ' style="opacity:.55"') + '><td><b>' + esc(p.name) + '</b><div class="tiny">' + esc(stName(p.state_code)) + (p.drug_license_no ? ' &middot; DL ' + esc(p.drug_license_no) : '') + '</div></td><td>' + esc(p.party_type) + '</td><td class="hide-sm">' + esc(p.phone || '') + '</td><td class="hide-sm tiny">' + esc(p.gstin || '') + '</td>'
      + (CAN.moneyRead ? '<td class="r">' + (bal > 0 ? '<b>' + dMoney0(bal) + '</b> <span class="tiny">Dr</span>' : bal < 0 ? '<b>' + dMoney0(-bal) + '</b> <span class="tiny">Cr</span>' : '-') + '</td>' : '')
      + '<td class="r" style="white-space:nowrap"><button class="btn btn-sm" onclick="partyEdit(' + A(p.id) + ')">Edit</button>' + (CAN.moneyRead ? ' <button class="btn btn-sm" onclick="showLedger(' + A(p.id) + ')">Ledger</button>' : '') + '</td></tr>';
  }).join('') : '<tr><td colspan="6" class="lines-empty">' + (PARTIES.length ? 'Nothing matches.' : 'No parties yet. Add your suppliers and customers.') + '</td></tr>';
}
var _partyBack = null;
function partyEdit(id, backKey, name, gstin) {
  _partyBack = backKey || null;
  var g0 = String(gstin || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  var p = id ? PARTYMAP[id] : { name: name || '', gstin: gstinOk(g0) ? g0 : '', state_code: gstinOk(g0) ? g0.slice(0, 2) : null, party_type: backKey === 'buy' || backKey === 'pret' || backKey === 'scan' ? 'supplier' : 'customer', is_active: true, opening_balance: 0 };
  var me = CAN.moneyEdit;
  dEl('party-title').textContent = id ? 'Edit ' + p.name : 'New party';
  var f = function (k, lbl, attrs, val) { return '<div><label class="flbl">' + lbl + '</label><input class="finput" id="pe-' + k + '" ' + (attrs || '') + ' value="' + esc(val !== undefined ? val : (p[k] == null ? '' : p[k])) + '"/></div>'; };
  dEl('party-body').innerHTML = '<div class="grid2">'
    + f('name', 'Name *') + '<div><label class="flbl">Type</label><select class="finput" id="pe-party_type">' + ['customer', 'supplier', 'both'].map(function (t) { return '<option' + (p.party_type === t ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select></div>'
    + f('gstin', 'GSTIN (if registered)', 'maxlength="15" style="text-transform:uppercase" oninput="this.value=this.value.toUpperCase().replace(/[^0-9A-Z]/g,\'\');peGst()"') + '<div><label class="flbl">State</label><select class="finput" id="pe-state_code"><option value="">-</option>' + Object.keys(GST_STATES).map(function (c) { return '<option value="' + c + '"' + ((p.state_code || (!id ? OWN_STATE : '')) === c ? ' selected' : '') + '>' + esc(GST_STATES[c]) + ' (' + c + ')</option>'; }).join('') + '</select></div>'
    + f('drug_license_no', 'Drug licence no(s).') + f('phone', 'Phone (WhatsApp)', 'type="tel"') + f('contact_person', 'Contact person') + f('email', 'Email', 'type="email"')
    + '<div style="grid-column:1/-1"><label class="flbl">Address</label><input class="finput" id="pe-address" value="' + esc(p.address || '') + '"/></div>'
    + f('credit_days', 'Credit days', 'type="number" min="0" max="365"' + (me ? '' : ' disabled')) + f('credit_limit', 'Credit limit &#8377; (empty = no limit)', 'type="number" min="0"' + (me ? '' : ' disabled'))
    + f('opening_balance', 'Opening balance &#8377; (+ they owe you, &minus; you owe them)', 'type="number" step="0.01"' + (me ? '' : ' disabled'))
    + (id ? '<div><label class="flbl">Active</label><select class="finput" id="pe-is_active"><option value="true"' + (p.is_active ? ' selected' : '') + '>Yes</option><option value="false"' + (!p.is_active ? ' selected' : '') + '>No (hidden in lists)</option></select></div>' : '')
    + '<div style="grid-column:1/-1"><label class="flbl">Notes</label><input class="finput" id="pe-notes" value="' + esc(p.notes || '') + '"/></div></div>'
    + (me ? '' : '<p class="tiny" style="margin-top:6px">Credit limit, credit days and opening balance can be set by the owner or accounts.</p>')
    + '<div class="tiny" id="pe-gst-st" style="margin-top:6px"></div>'
    + '<button class="btn btn-g" style="margin-top:12px" onclick="partySave(' + A(id || null) + ')">&#10003; Save</button><div class="err" id="pe-err"></div>';
  dOpen('m-party'); peGst();
}
function peGst() {
  var g = dEl('pe-gstin').value, st = dEl('pe-gst-st');
  if (!g) { st.textContent = 'No GSTIN: the party is treated as unregistered.'; return; }
  if (!gstinOk(g)) { st.innerHTML = '<span class="over">GSTIN looks wrong (15 characters, e.g. 19ABCDE1234F1Z5).</span>'; return; }
  dEl('pe-state_code').value = g.slice(0, 2);
  st.innerHTML = 'State from GSTIN: <b>' + esc(stName(g.slice(0, 2))) + '</b> &rarr; ' + (g.slice(0, 2) === OWN_STATE ? 'CGST + SGST' : '<b>IGST</b>') + ' on invoices.';
}
async function partySave(id) {
  dShowErr('pe-err', '');
  var v = function (k) { var e = dEl('pe-' + k); return e ? e.value.trim() : ''; };
  var row = { name: v('name'), party_type: v('party_type'), gstin: v('gstin') || null, state_code: v('state_code') || null, drug_license_no: v('drug_license_no') || null, phone: v('phone') || null,
    contact_person: v('contact_person') || null, email: v('email') || null, address: v('address') || null, notes: v('notes') || null };
  if (!row.name) { dShowErr('pe-err', 'Enter the name.'); return; }
  if (row.gstin && !gstinOk(row.gstin)) { dShowErr('pe-err', 'The GSTIN is not in the right format.'); return; }
  if (CAN.moneyEdit) { row.credit_days = v('credit_days') === '' ? null : Number(v('credit_days')); row.credit_limit = v('credit_limit') === '' ? null : Number(v('credit_limit')); row.opening_balance = Number(v('opening_balance')) || 0; }
  if (id) row.is_active = v('is_active') !== 'false';
  var r = id ? await _supa.from('org_parties').update(row).eq('id', id).eq('clinic_id', _clinicId).select().single()
             : await _supa.from('org_parties').insert(Object.assign({ clinic_id: _clinicId }, row)).select().single();
  if (r.error) { dShowErr('pe-err', /norm_name|duplicate/.test(r.error.message || '') ? 'A party with this name is already in your list.' : dErr(r.error)); return; }
  showToast('Saved.'); dClose('m-party'); await loadParties();
  if (_partyBack === 'scan') { SCAN_SUP = r.data.id; scanSupBox(); scanCheck(); }
  else if (_partyBack && PICK[_partyBack]) ppPick(_partyBack, r.data.id);
  if (dEl('v-parties').classList.contains('on')) partiesRender();
}

/* =================================================================== SETTINGS */
async function onTab_settings() {
  var s = SET; dEl('ws-name').value = s.name || DEPT.clinic.name || ''; dEl('ws-phone').value = s.phone || DEPT.clinic.phone || ''; dEl('ws-address').value = s.address || DEPT.clinic.address || '';
  dEl('ws-gstin').value = s.gstin || ''; dEl('ws-dl').value = s.dl_no || ''; dEl('ws-email').value = s.email || ''; dEl('ws-fssai').value = s.fssai || ''; dEl('ws-prefix').value = s.inv_prefix || '';
  dEl('ws-cdays').value = s.credit_days || ''; dEl('ws-bank').value = s.bank_name || ''; dEl('ws-acc').value = s.bank_account || ''; dEl('ws-ifsc').value = s.bank_ifsc || ''; dEl('ws-upi').value = s.upi_id || ''; dEl('ws-terms').value = s.terms || '';
  dEl('ws-bank2').value = s.bank2_name || ''; dEl('ws-acc2').value = s.bank2_account || ''; dEl('ws-ifsc2').value = s.bank2_ifsc || ''; dEl('ws-qr').value = s.upi_qr === 'off' ? 'off' : 'on';
  wsCheck(); staffLoad();
}
function wsCheck() { var g = dEl('ws-gstin').value, st = dEl('ws-gstin-st'); st.innerHTML = !g ? '' : gstinOk(g) ? 'State: <b>' + esc(stName(g.slice(0, 2))) + '</b>' : '<span class="over">15 characters, e.g. 19ABCDE1234F1Z5</span>'; }
async function wsSave() {
  dShowErr('ws-err', '');
  var p = { name: dEl('ws-name').value.trim(), phone: dEl('ws-phone').value.trim(), address: dEl('ws-address').value.trim(), gstin: dEl('ws-gstin').value.trim(), dl_no: dEl('ws-dl').value.trim(), email: dEl('ws-email').value.trim(),
    fssai: dEl('ws-fssai').value.trim(), inv_prefix: dEl('ws-prefix').value.trim().toUpperCase(), credit_days: dEl('ws-cdays').value.trim(), bank_name: dEl('ws-bank').value.trim(), bank_account: dEl('ws-acc').value.trim(),
    bank_ifsc: dEl('ws-ifsc').value.trim().toUpperCase(), upi_id: dEl('ws-upi').value.trim(), terms: dEl('ws-terms').value.trim(),
    bank2_name: dEl('ws-bank2').value.trim(), bank2_account: dEl('ws-acc2').value.trim(), bank2_ifsc: dEl('ws-ifsc2').value.trim().toUpperCase(), upi_qr: dEl('ws-qr').value };
  if (!p.name || !p.address) { dShowErr('ws-err', 'Business name and address are needed.'); return; }
  if (p.gstin && !gstinOk(p.gstin)) { dShowErr('ws-err', 'The GSTIN is not in the right format.'); return; }
  var r = await _supa.rpc('wh_save_settings', { p_clinic: _clinicId, p: p });
  if (r.error) { dShowErr('ws-err', dErr(r.error)); return; }
  SET = r.data || {}; DEPT.clinic.wh_settings = SET; OWN_STATE = (SET.gstin || '').slice(0, 2) || SET.state_code || OWN_STATE; setupNote();
  showToast('Saved. New invoices use these details.');
}
async function staffLoad() {
  var r = await _supa.rpc('wh_staff', { p_clinic: _clinicId }); if (r.error) { dEl('sf-b').innerHTML = '<tr><td class="muted">' + esc(dErr(r.error)) + '</td></tr>'; return; }
  var d = r.data || {}, rt = { sales: 'Sales', inventory: 'Inventory', accounts: 'Accounts', receptionist: 'Joining…' };
  dEl('sf-b').innerHTML = (d.staff || []).map(function (s) {
    return '<tr><td><b>' + esc(s.name || s.email || '') + '</b><div class="tiny">' + esc(s.email || '') + '</div></td><td>' + esc(rt[s.role] || s.role) + '</td><td>' + (s.active ? '<span class="tag t-g">Active</span>' : '<span class="tag t-r">Removed</span>') + '</td>'
      + '<td class="r"><button class="btn btn-sm' + (s.active ? ' btn-r' : '') + '" onclick="staffActive(' + A(s.id) + ',' + (!s.active) + ')">' + (s.active ? 'Remove access' : 'Give access again') + '</button></td></tr>';
  }).join('') + (d.invites || []).map(function (i) { return '<tr><td><b>' + esc(i.label || '') + '</b><div class="tiny">Invite code ' + esc(i.code) + '</div></td><td>' + esc(rt[i.role] || i.role) + '</td><td><span class="tag t-a">Not joined yet</span></td><td></td></tr>'; }).join('')
    || '<tr><td colspan="4" class="lines-empty">No staff yet.</td></tr>';
}
async function staffActive(id, on) {
  if (!on && !confirm('Remove this person\'s access? They are signed out and cannot open AuraScale for your business.')) return;
  var r = await _supa.rpc('wh_staff_active', { p_clinic: _clinicId, p_user: id, p_active: on });
  if (r.error) { showToast(dErr(r.error)); return; } staffLoad();
}
async function staffInvite() {
  dShowErr('sf-err', ''); dEl('sf-res').innerHTML = '';
  var ph = dMobile(dEl('sf-phone').value); if (!ph) { dShowErr('sf-err', 'Enter their 10-digit WhatsApp number (starts with 6-9).'); return; }
  var role = dEl('sf-role').value, label = dEl('sf-label').value.trim();
  dEl('sf-go').disabled = true;
  try {
    var r = await _supa.rpc('wh_invite', { p_clinic: _clinicId, p_role: role, p_label: label }); if (r.error) throw r.error;
    if (!r.data || !r.data.ok) throw new Error((r.data && r.data.error) || 'Could not make the invite.');
    var code = r.data.code, msg = 'Hi! You have been invited to join ' + (SET.name || DEPT.clinic.name || '') + ' on AuraScale (' + ({ sales: 'Sales', inventory: 'Inventory', accounts: 'Accounts' })[role] + ').\n\nYour invite code: ' + code + '\n\nOpen this link to join: https://os.aurascale.in/nh.html?invite=' + encodeURIComponent(code);
    var sent = false;
    try { var s = await _supa.functions.invoke('send-staff-invite', { body: { code: code, phone: ph } }); sent = !s.error && s.data && s.data.ok; } catch (e) {}
    dEl('sf-res').innerHTML = '<div class="card">Invite code <b>' + esc(code) + '</b> ' + (sent ? 'sent on WhatsApp to ' + esc(ph) + '.' : 'made.') + ' <button class="btn btn-sm btn-g" onclick="window.open(' + A('https://wa.me/91' + ph + '?text=' + encodeURIComponent(msg)) + ',\'_blank\')">&#128242; ' + (sent ? 'Send again from my WhatsApp' : 'Send from my WhatsApp') + '</button></div>';
    dEl('sf-label').value = ''; dEl('sf-phone').value = ''; staffLoad();
  } catch (e) { dShowErr('sf-err', dErr(e)); }
  finally { dEl('sf-go').disabled = false; }
}

/* =================================================================== PDFs */
function trRows(t) {
  var tr = [t.transporter, t.gr_no ? 'G.R. ' + t.gr_no + (t.gr_date ? ' (' + deptPdfDate(t.gr_date) + ')' : '') : '', t.cases ? t.cases + ' cases' : '', t.weight || '', t.vehicle ? 'Vehicle ' + t.vehicle : ''].filter(Boolean).map(esc).join(' &middot; ');
  var out = [];
  if (tr) out.push(['Transport', tr, true]);
  if (t.order_no || t.order_date) out.push(['Order', esc([t.order_no, t.order_date ? deptPdfDate(t.order_date) : ''].filter(Boolean).join(' dated '))]);
  if (t.eway_no) out.push(['E-way bill', '<b>' + esc(t.eway_no) + '</b>' + (t.eway_date ? ' dated ' + deptPdfDate(t.eway_date) : '')]);
  return out;
}
function sellerBlock(s) {
  s = s || SET;
  return { name: s.name || s.business || DEPT.clinic.name || '', sub: [esc(s.address || '').replace(/\n/g, ', '),
    [s.phone ? 'Phone: ' + esc(s.phone) : '', s.email ? esc(s.email) : ''].filter(Boolean).join(' &nbsp;&middot;&nbsp; '),
    [s.gstin ? 'GSTIN: <b>' + esc(s.gstin) + '</b>' : '', s.state_code ? 'State: ' + esc(stName(s.state_code)) : ''].filter(Boolean).join(' &nbsp;&middot;&nbsp; '),
    [s.dl_no ? 'Drug Licence: ' + esc(s.dl_no) : '', s.fssai ? 'FSSAI: ' + esc(s.fssai) : ''].filter(Boolean).join(' &nbsp;&middot;&nbsp; ')] };
}
var PDF_CSS = '.it{font-size:10.6px}.it th{padding:6px 5px;font-size:10px}.it td{padding:5px 5px}.dpt{font-size:11.5px}.bank{font-size:10.8px;color:#4a5b53;margin-top:4px}';
function qrLib() {
  if (window.qrcode) return Promise.resolve();
  return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'; s.onload = res; s.onerror = function () { rej(new Error('QR')); }; document.head.appendChild(s); });
}
async function upiQr(s, x) {
  try {
    await qrLib();
    var u = 'upi://pay?pa=' + encodeURIComponent(s.upi_id) + '&pn=' + encodeURIComponent((s.name || '').slice(0, 40)) + '&am=' + Number(x.total).toFixed(2) + '&cu=INR&tn=' + encodeURIComponent(x.inv_no);
    var q = window.qrcode(0, 'M'); q.addData(u); q.make(); return q.createDataURL(4, 2);
  } catch (e) { return ''; }
}
async function docPdf(kind, x, copies) {
  var sale = kind === 'sale', s = sale ? x.seller : SET, sb = sellerBlock(s), p = sale ? x.buyer : x.party, inter = x.interstate, items = x._items;
  var title = sale ? (s.gstin ? 'TAX INVOICE' : 'INVOICE') : x.kind === 'sales_return' ? 'CREDIT NOTE' : 'DEBIT NOTE';
  var no = sale ? x.inv_no : x.no, dt = sale ? x.inv_date : x.ret_date;
  var head = deptPdfHead({ name: sb.name, sub: sb.sub, title: title + (x.status === 'cancelled' ? ' (CANCELLED)' : ''),
    right: [sale ? '<b style="display:inline;font-size:10.5px;letter-spacing:.06em;color:#14201b">%%COPY%%</b>' : '', (sale ? 'Invoice No: ' : 'No: ') + '<span class="no">' + esc(no) + '</span>', 'Date: ' + deptPdfDate(dt), sale && x.due_date ? 'Due date: ' + deptPdfDate(x.due_date) : '', sale ? 'Payment: ' + esc(payTxt(x.pay_mode)) : '', !sale && x.sale_id ? 'Against invoice: ' + esc(x._ref || '') : ''],
    info: [[sale ? 'Bill to' : (x.kind === 'sales_return' ? 'Customer' : 'Supplier'), '<b>' + esc(p.name || '') + '</b>'], ['GSTIN', esc(p.gstin || 'Unregistered')], ['Address', esc(p.address || ''), true],
      ['Drug licence', esc(p.dl || '')], ['Phone', esc(p.phone || '')], ['Place of supply', esc(stName(p.state_code || (s.state_code || OWN_STATE)))], ['Tax', inter ? 'IGST (inter-state)' : 'CGST + SGST (intra-state)']]
      .concat(sale && x.ship_to && x.ship_to.name ? [['Shipped to', '<b>' + esc(x.ship_to.name) + '</b>' + (x.ship_to.address ? ', ' + esc(x.ship_to.address) : '') + (x.ship_to.dl ? ' &middot; DL ' + esc(x.ship_to.dl) : '') + (x.ship_to.phone ? ' &middot; ' + esc(x.ship_to.phone) : ''), true]] : [])
      .concat(sale ? trRows(x.transport || {}) : []) });
  var headNext = deptPdfHeadNext('<b>' + esc(sb.name) + '</b> &nbsp;&middot;&nbsp; ' + esc(p.name || ''), esc(no) + ' (continued)');
  var colgroup = '<colgroup><col style="width:4%"><col style="width:18%"><col style="width:7%"><col style="width:12%"><col style="width:6%"><col style="width:6%"><col style="width:5%"><col style="width:8%"><col style="width:8%"><col style="width:5%"><col style="width:6%"><col style="width:14%"></colgroup>';
  var thead = '<thead><tr><th>#</th><th>Product</th><th>Mfg.</th><th>Batch</th><th>Exp</th><th class="r">Qty</th><th class="r">Free</th><th class="r">MRP</th><th class="r">Rate</th><th class="r">Disc</th><th class="r">GST</th><th class="r">Taxable</th></tr></thead>';
  var rows = items.map(function (l, i) {
    return '<tr><td class="mut">' + (i + 1) + '</td><td><b>' + esc(l.name) + '</b><div class="sm">' + [l.pack ? esc(l.pack) : '', l.hsn ? 'HSN ' + esc(l.hsn) : ''].filter(Boolean).join(' &middot; ') + '</div></td><td class="sm">' + esc(l.mfg || '') + '</td><td>' + esc(l.batch_no || '') + '</td><td>' + dExp(l.expiry) + '</td>'
      + '<td class="r">' + Number(l.qty) + '</td><td class="r">' + (Number(l.free) ? Number(l.free) : '-') + '</td><td class="r">' + (l.mrp != null ? Number(l.mrp).toFixed(2) : '-') + '</td><td class="r">' + Number(l.rate).toFixed(2) + '</td><td class="r">' + (Number(l.disc) ? Number(l.disc) + '%' : '-') + '</td><td class="r">' + Number(l.gst_rate) + '%</td><td class="r"><b>' + Number(l.taxable).toFixed(2) + '</b></td></tr>';
  });
  var qr = sale && s.upi_id && s.upi_qr !== 'off' && x.pay_mode === 'credit' && x.status === 'posted' ? await upiQr(s, x) : '';
  var by = {}; items.forEach(function (l) { var k = Number(l.gst_rate); by[k] = by[k] || { t: 0, c: 0, s: 0, i: 0 }; by[k].t += Number(l.taxable); by[k].c += Number(l.cgst); by[k].s += Number(l.sgst); by[k].i += Number(l.igst); });
  var gst = '<div style="font-weight:700;color:#0b4f3a;font-size:12px">GST summary</div><table class="dgst"><tr><th>Rate</th><th>Taxable</th>' + (inter ? '<th>IGST</th>' : '<th>CGST</th><th>SGST</th>') + '<th>Total tax</th></tr>'
    + Object.keys(by).sort(function (a, b) { return a - b; }).map(function (k) { var v = by[k]; return '<tr><td>' + k + '%</td><td>' + v.t.toFixed(2) + '</td>' + (inter ? '<td>' + v.i.toFixed(2) + '</td>' : '<td>' + v.c.toFixed(2) + '</td><td>' + v.s.toFixed(2) + '</td>') + '<td>' + (v.c + v.s + v.i).toFixed(2) + '</td></tr>'; }).join('') + '</table>'
    + (sale && (s.bank_account || s.bank2_account || s.upi_id) ? '<div class="bank">' + (s.bank_account ? '<b>Bank:</b> ' + [s.bank_name, 'A/c ' + s.bank_account, s.bank_ifsc ? 'IFSC ' + s.bank_ifsc : ''].filter(Boolean).map(esc).join(' &middot; ') + '<br>' : '')
      + (s.bank2_account ? '<b>Bank:</b> ' + [s.bank2_name, 'A/c ' + s.bank2_account, s.bank2_ifsc ? 'IFSC ' + s.bank2_ifsc : ''].filter(Boolean).map(esc).join(' &middot; ') + '<br>' : '')
      + (s.upi_id ? '<b>UPI:</b> ' + esc(s.upi_id) : '') + '</div>' : '')
    + (qr ? '<div style="display:flex;gap:8px;align-items:center;margin-top:6px"><img src="' + qr + '" style="width:84px;height:84px" alt=""><div class="sm"><b style="color:#14201b">Scan to pay ' + deptMoney(x.total) + '</b><br>with any UPI app</div></div>' : '');
  var row = function (l, v, cls) { return '<div class="row' + (cls ? ' ' + cls : '') + '"><span>' + l + '</span><span>' + v + '</span></div>'; };
  var tot = '<div class="dtot">' + row('Taxable value', deptMoney(x.taxable), 's') + (inter ? row('IGST', deptMoney(x.igst), 's') : row('CGST', deptMoney(x.cgst), 's') + row('SGST', deptMoney(x.sgst), 's'))
    + (Number(x.round_off) ? row('Round off', (Number(x.round_off) > 0 ? '+' : '') + Number(x.round_off).toFixed(2), 's') : '') + row(sale ? 'Invoice total' : 'Total', deptMoney(x.total), 'grand') + '</div>';
  var sign = await deptSignature();
  var after = '<div class="dsplit"><div>' + gst + '</div>' + tot + '</div><div class="dwords">' + deptWords(x.total) + '</div>'
    + '<div class="dfinal"><div>' + (x.status === 'cancelled' ? '<span class="dstamp red">CANCELLED</span>' : sale && x.pay_mode !== 'credit' ? '<span class="dstamp">PAID</span>' : sale ? '<span class="dstamp blue">CREDIT &middot; DUE ' + deptPdfDate(x.due_date) + '</span>' : '') + '</div></div>'
    + '<div class="dend"><div class="ddecl">' + (sale ? '<b>Prices are per unit before GST; MRP includes GST.</b> Please check the goods, batch and expiry on delivery.' + (s.terms ? '<br>' + esc(s.terms) : '') : '<b>Reason:</b> ' + esc(x.reason || ''))
    + (x.notes ? '<br>Note: ' + esc(x.notes) : '') + '<br>Prepared by: ' + esc(x.created_by_name || '') + '</div>'
    + '<div class="dsign">For ' + esc(sb.name) + (sign ? '<img src="' + sign + '" alt="">' : '<div class="sp"></div>') + '<div class="ln">Authorised Signatory</div></div></div>';
  return deptMakePdf({ format: 'a4', head: head, headNext: headNext, colgroup: colgroup, thead: thead, rows: rows, after: after, css: PDF_CSS, copies: copies || (sale ? ['ORIGINAL FOR RECIPIENT'] : null),
    foot: 'Computer-generated ' + title.toLowerCase() + ' &middot; ' + esc(no) + ' &middot; AuraScale' });
}
async function ensurePdf(kind, x) {
  if (x.pdf_path) return x.pdf_path;
  if (kind === 'return' && x.sale_id) { var s = await _supa.from('wh_sales').select('inv_no').eq('id', x.sale_id).maybeSingle(); x._ref = s.data ? s.data.inv_no : ''; }
  var blob = await docPdf(kind, x), path = _clinicId + '/wholesale/' + x.id + (x.status === 'cancelled' ? '-c' : '') + '.pdf';
  await deptUpload('bills', path, blob);
  var r = await _supa.rpc('wh_set_pdf', { p_clinic: _clinicId, p_kind: kind, p_id: x.id, p_path: path }); if (r.error) throw r.error;
  x.pdf_path = path; return path;
}
async function ledgerPdf(wa) {
  if (!LEDGER) return;
  var btn = dEl('lg-pdf'); if (btn) { btn.disabled = true; btn.textContent = 'Making PDF…'; }
  try {
    var p = LEDGER.party, sb = sellerBlock(SET), bt = function (b) { b = Number(b); return b > 0 ? b.toFixed(2) + ' Dr' : b < 0 ? (-b).toFixed(2) + ' Cr' : '0.00'; };
    var head = deptPdfHead({ name: sb.name, sub: sb.sub, title: 'STATEMENT OF ACCOUNT', right: ['From ' + deptPdfDate(LEDGER.from) + ' to ' + deptPdfDate(LEDGER.to), 'Printed ' + deptPdfDateTime(new Date().toISOString())],
      info: [['Party', '<b>' + esc(p.name) + '</b>'], ['GSTIN', esc(p.gstin || 'Unregistered')], ['Address', esc(p.address || ''), true], ['Phone', esc(p.phone || '')]] });
    var colgroup = '<colgroup><col style="width:13%"><col style="width:42%"><col style="width:15%"><col style="width:15%"><col style="width:15%"></colgroup>';
    var thead = '<thead><tr><th>Date</th><th>Particulars</th><th class="r">Debit</th><th class="r">Credit</th><th class="r">Balance</th></tr></thead>';
    var rows = ['<tr><td>' + deptPdfDate(LEDGER.from) + '</td><td><b>Opening balance</b></td><td></td><td></td><td class="r"><b>' + bt(LEDGER.opening) + '</b></td></tr>'].concat(LEDGER.rows.map(function (x) {
      return '<tr><td>' + deptPdfDate(x.date) + '</td><td>' + esc(x.type) + ' ' + esc(x.no || '') + (x.note ? '<div class="sm">' + esc(x.note) + '</div>' : '') + '</td><td class="r">' + (Number(x.debit) ? Number(x.debit).toFixed(2) : '') + '</td><td class="r">' + (Number(x.credit) ? Number(x.credit).toFixed(2) : '') + '</td><td class="r">' + bt(x.balance) + '</td></tr>';
    }));
    var cl = Number(LEDGER.closing);
    var after = '<div class="dfinal"><div class="sm">Dr = amount due to ' + esc(sb.name) + ' &middot; Cr = amount due to ' + esc(p.name) + '</div><div class="box"><div class="row"><span>Total debit</span><span>' + deptMoney(LEDGER.debit) + '</span></div><div class="row"><span>Total credit</span><span>' + deptMoney(LEDGER.credit) + '</span></div>'
      + '<div class="due ' + (cl > 0 ? 'due-red' : 'due-green') + '"><span>' + (cl > 0 ? 'Balance due to us' : cl < 0 ? 'Balance due to you' : 'Balance') + '</span><span>' + deptMoney(Math.abs(cl)) + '</span></div></div></div>'
      + (SET.bank_account || SET.upi_id ? '<div class="bank" style="margin-top:10px"><b>Pay to:</b> ' + [SET.bank_name, SET.bank_account ? 'A/c ' + SET.bank_account : '', SET.bank_ifsc ? 'IFSC ' + SET.bank_ifsc : '', SET.upi_id ? 'UPI ' + SET.upi_id : ''].filter(Boolean).map(esc).join(' &middot; ') + '</div>' : '');
    var blob = await deptMakePdf({ format: 'a4', head: head, headNext: deptPdfHeadNext('<b>' + esc(sb.name) + '</b> &middot; ' + esc(p.name), 'Statement (continued)'), colgroup: colgroup, thead: thead, rows: rows, after: after, css: PDF_CSS, foot: 'Statement of account &middot; AuraScale' });
    var path = _clinicId + '/wholesale/statements/' + p.id + '-' + LEDGER.to + '.pdf';
    await deptUpload('bills', path, blob);
    if (wa) deptWhatsApp(p.phone, (SET.name || DEPT.clinic.name || '') + '\nStatement of account for ' + p.name + ' (' + dDate(LEDGER.from) + ' to ' + dDate(LEDGER.to) + ')\nBalance: ' + bt(LEDGER.closing) + '\nPDF:', 'bills', path);
    else deptOpenPdf('bills', path);
  } catch (e) { showToast('Could not make the PDF: ' + dErr(e)); }
  finally { if (btn) { btn.disabled = false; btn.innerHTML = '&#128196; Statement PDF'; } }
}

init();
