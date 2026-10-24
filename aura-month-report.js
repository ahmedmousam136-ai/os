/* AuraScale MONTHLY OWNER REPORT (Pharmacy and Wholesale portals; numbers from file 33)
   mrOpen() -> month picker, the month at a glance, PDF, WhatsApp. */
var MR = null;
function mrMonths() {
  var out = [], d = new Date(Date.now() + 5.5 * 3600e3);
  for (var i = 0; i < 13; i++) { var y = d.getUTCFullYear(), m = d.getUTCMonth() - i; while (m < 0) { m += 12; y--; } out.push(y + '-' + ('0' + (m + 1)).slice(-2)); }
  return out;
}
function mrName(mm) { var d = new Date(mm + '-01T00:00:00'); return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }); }
function mrModal() {
  if (dEl('m-mr')) return;
  var d = document.createElement('div'); d.className = 'modal-bg'; d.id = 'm-mr';
  d.innerHTML = '<div class="modal" style="max-width:900px"><div class="modal-h"><span>&#128202; Monthly report</span><button class="btn btn-sm" onclick="dClose(\'m-mr\')">&times;</button></div><div class="modal-b" id="mr-b"></div></div>';
  document.body.appendChild(d);
}
function mrOpen(month) {
  mrModal(); dOpen('m-mr');
  var ms = mrMonths(), cur = month || (new Date(Date.now() + 5.5 * 3600e3).getUTCDate() <= 5 ? ms[1] : ms[0]);
  dEl('mr-b').innerHTML = '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px"><div><label class="flbl">Month</label><select class="finput" id="mr-m" onchange="mrLoad()" style="width:190px">'
    + ms.map(function (m, i) { return '<option value="' + m + '"' + (m === cur ? ' selected' : '') + '>' + mrName(m) + (i === 0 ? ' (so far)' : '') + '</option>'; }).join('') + '</select></div>'
    + '<button class="btn" onclick="mrPdf(false)">&#128196; PDF</button><button class="btn btn-g" onclick="mrPdf(true)">&#128242; Send to my WhatsApp</button></div><div id="mr-v">Loading&hellip;</div>';
  mrLoad();
}
async function mrLoad() {
  var el = dEl('mr-v'); el.innerHTML = '<div class="tiny">Working out the month&hellip;</div>';
  var r = await _supa.rpc('aura_month_report', { p_clinic: _clinicId, p_month: dEl('mr-m').value });
  if (r.error) { el.innerHTML = '<div class="note">' + (/PGRST202|Could not find/.test(dErr(r.error)) ? 'Run file 33 in Supabase first.' : esc(dErr(r.error))) + '</div>'; return; }
  MR = r.data; el.innerHTML = mrHtml(MR, false);
}
function mrTile(label, val, sub, color) {
  return '<div class="card" style="padding:12px 14px;min-width:0"><div class="tiny" style="text-transform:uppercase;letter-spacing:.04em">' + label + '</div><div style="font-size:22px;font-weight:800;margin-top:2px' + (color ? ';color:' + color : '') + '">' + val + '</div>' + (sub ? '<div class="tiny" style="margin-top:2px">' + sub + '</div>' : '') + '</div>';
}
function mrHtml(d, pdf) {
  var s = d.sales || {}, p = d.purchases || {}, st = d.stock || {}, du = d.dues || {}, wh = d.kind === 'wholesale';
  var chg = s.prev_total > 0 ? Math.round((s.total - s.prev_total) * 100 / s.prev_total) : null;
  var M = function (n) { return dMoney0(n); };
  var grid = pdf ? 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0' : 'display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:12px';
  var h = '<div style="' + grid + '">'
    + mrTile('Sales', M(s.total), s.count + (wh ? ' invoice' : ' bill') + (s.count === 1 ? '' : 's') + (chg !== null ? ' &middot; <b style="color:' + (chg >= 0 ? 'var(--green,#0E9F6E)' : '#B42318') + '">' + (chg >= 0 ? '&#9650; ' : '&#9660; ') + Math.abs(chg) + '%</b> vs last month' : ''))
    + mrTile('Profit', M(d.profit), (d.margin_pct || 0) + '% margin &middot; before expenses', d.profit >= 0 ? 'var(--green,#0E9F6E)' : '#B42318')
    + mrTile('Purchases', M(wh ? p.total : (p.total || p.received_value)), wh ? p.count + ' bill' + (p.count === 1 ? '' : 's') : (p.count ? p.count + ' bills scanned &middot; ' : '') + 'stock received ' + M(p.received_value) + ' at cost')
    + mrTile(wh ? 'To receive' : 'Credit not paid', M(du.to_receive), (du.to_receive_parties || 0) + (wh ? ' customer' : ' bill') + ((du.to_receive_parties || 0) === 1 ? '' : 's'), du.to_receive > 0 ? '#B54708' : '')
    + (wh ? mrTile('To pay suppliers', M(du.to_pay), 'what you owe today') : mrTile('GST collected', M(s.gst), 'CGST + SGST in the bills'))
    + mrTile('Stock value', M(st.cost), 'at cost &middot; MRP ' + M(st.mrp)) + '</div>';
  var rows = [
    ['Sales (incl. GST)', M(s.total)], ['GST in sales', M(s.gst)], ['Sales without GST', M(s.taxable)], ['Cost of goods sold', M(s.cost)]]
    .concat(wh ? [['Customer returns', M(d.returns_in)]] : [['Discount given', M(s.discount)]])
    .concat([['<b>Profit (before expenses)</b>', '<b>' + M(d.profit) + '</b>']])
    .concat(wh ? [['Money received', M((d.money || {}).received)], ['Money paid to suppliers', M((d.money || {}).paid)]]
               : [['Cash', M(s.by_mode.cash)], ['UPI', M(s.by_mode.upi)], ['Card', M(s.by_mode.card)], ['Credit', M(s.by_mode.credit)]].concat(s.ipd_count ? [['Admitted patients (' + s.ipd_count + ')', M(s.ipd_total)]] : []))
    .concat([['Expired stock (at cost)', M(st.expired)], ['Expiring in 90 days (at cost)', M(st.expiring_90)]])
    .concat(wh ? [] : [['Returned to suppliers', M(d.returned_to_supplier)]]);
  h += '<div style="display:grid;grid-template-columns:' + (pdf ? '1fr 1fr' : 'repeat(auto-fit,minmax(280px,1fr))') + ';gap:12px;align-items:start">'
    + '<div><b>The month in detail</b><table class="' + (pdf ? 'it' : 'dt') + '" style="width:100%;margin-top:6px"><tbody>' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td style="text-align:right">' + r[1] + '</td></tr>'; }).join('') + '</tbody></table></div>'
    + '<div><b>Best sellers</b><table class="' + (pdf ? 'it' : 'dt') + '" style="width:100%;margin-top:6px"><tbody>' + ((d.top_items || []).length ? d.top_items.map(function (x, i) { return '<tr><td>' + (i + 1) + '. ' + esc(x.name) + '</td><td style="text-align:right">' + Number(x.qty) + '</td><td style="text-align:right">' + M(x.value) + '</td></tr>'; }).join('') : '<tr><td>No sales this month.</td></tr>') + '</tbody></table>'
    + (wh && (d.top_parties || []).length ? '<div style="margin-top:10px"><b>Biggest customers</b></div><table class="' + (pdf ? 'it' : 'dt') + '" style="width:100%;margin-top:6px"><tbody>' + d.top_parties.map(function (x, i) { return '<tr><td>' + (i + 1) + '. ' + esc(x.name) + '</td><td style="text-align:right">' + x.bills + ' inv.</td><td style="text-align:right">' + M(x.value) + '</td></tr>'; }).join('') + '</tbody></table>' : '')
    + '</div></div>'
    + '<p class="tiny" style="margin-top:10px">Profit = sales without GST minus what those goods cost you' + (wh ? ' (minus customer returns)' : '') + '. Rent, salaries and other expenses are not included. Stock and dues are as of today.</p>';
  return h;
}
async function mrPdf(wa) {
  if (!MR) return;
  try {
    showToast('Making the PDF…');
    var name = MR.name || DEPT.clinic.name || '';
    var head = deptPdfHead({ name: name, sub: [esc((window.SET && SET.address) || (window.ph && ph().address) || DEPT.clinic.address || '')], title: 'MONTHLY REPORT', right: [mrName(MR.month), 'Made: ' + deptPdfDateTime(new Date().toISOString())] });
    var blob = await deptMakePdf({ format: 'a4', head: head, rows: [], after: mrHtml(MR, true), css: '.card{border:1px solid #d9e3de;border-radius:8px;padding:8px 10px}.tiny{font-size:10px;color:#56645d}', foot: 'Monthly report ' + MR.month + ' &middot; AuraScale' });
    var path = _clinicId + '/reports/month-' + MR.month + '-' + Date.now() + '.pdf';
    await deptUpload('bills', path, blob);
    if (!wa) { deptOpenPdf('bills', path); return; }
    var s = MR.sales || {};
    deptWhatsApp(MR.owner_phone || '', name + '\nMonthly report: ' + mrName(MR.month) + '\nSales ' + dMoney0(s.total) + ' (' + s.count + ')\nProfit ' + dMoney0(MR.profit) + '\nTo receive ' + dMoney0((MR.dues || {}).to_receive) + '\nStock ' + dMoney0((MR.stock || {}).cost) + '\nReport (PDF):', 'bills', path);
  } catch (e) { showToast('PDF: ' + dErr(e)); }
}
