/* AuraScale Nursing Home: PM-JAY / Swasthya Sathi / insurance on an admission (file 35).
   Reception -> patient -> Billing: the "Scheme" card (set scheme, card + ABHA, package, pre-auth, claim).
   "All scheme claims": every admission with a scheme, what the schemes still owe. */
var AS_SCHEMES = { pmjay: 'PM-JAY (Ayushman Bharat)', swasthya_sathi: 'Swasthya Sathi', state_scheme: 'Other state scheme', cghs_echs: 'CGHS / ECHS', private_insurance: 'Private insurance (TPA)', other: 'Other' };
var AS_PRE = { not_sent: 'Not sent', sent: 'Sent', query: 'Query raised', approved: 'Approved', rejected: 'Rejected' };
var AS_CLAIM = { not_submitted: 'Not submitted', submitted: 'Submitted', query: 'Query raised', approved: 'Approved', paid: 'Paid', rejected: 'Rejected' };
(function () {
  var css = '.as-card{border:1px solid var(--border);border-radius:14px;padding:12px 14px;margin-bottom:12px;background:var(--surface)}'
    + '.as-card.on{border-color:#7FB3E8;background:linear-gradient(180deg,rgba(37,99,235,.06),transparent)}'
    + '.as-pill{display:inline-block;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;border:1px solid var(--border);margin-right:4px}'
    + '.as-g{color:#0E7A50;border-color:#9BD7BD;background:#ECFBF3}.as-a{color:#B54708;border-color:#F5C26B;background:#FFF8EB}.as-r{color:#B42318;border-color:#F3B4AE;background:#FEF1F0}.as-b{color:#1D4ED8;border-color:#A9C2F5;background:#EEF4FF}'
    + '.as-ov{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.45);display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow-y:auto}'
    + '.as-m{background:var(--surface,#fff);border-radius:16px;width:100%;max-width:760px;box-shadow:0 20px 60px rgba(0,0,0,.25)}'
    + '.as-mh{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border);font-weight:800}'
    + '.as-mb{padding:14px 16px}.as-g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}'
    + '.as-f label{display:block;font-size:11.5px;font-weight:700;color:var(--text-secondary);margin-bottom:4px}'
    + '.as-f input,.as-f select,.as-f textarea{width:100%;box-sizing:border-box;border:1px solid var(--border);border-radius:9px;padding:9px 10px;font-size:13.5px;background:var(--surface);color:var(--text-primary);font-family:inherit}'
    + '.as-sec{font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--text-tertiary);margin:14px 0 6px}'
    + '.as-btn{border:1px solid var(--border);background:var(--surface);border-radius:9px;padding:8px 12px;font-weight:700;font-size:12.5px;cursor:pointer;color:var(--text-primary)}'
    + '.as-btn.g{background:var(--green,#0E9F6E);border-color:var(--green,#0E9F6E);color:#fff}'
    + '.as-t{width:100%;border-collapse:collapse;font-size:12.5px}.as-t th{text-align:left;font-size:10.5px;color:var(--text-tertiary);padding:6px;border-bottom:1px solid var(--border)}.as-t td{padding:8px 6px;border-bottom:1px solid var(--border);vertical-align:top}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
function asE(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function asM(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
function asToast(m) { if (typeof showToast === 'function') showToast(m); else alert(m); }
function asMissing(e) { return /PGRST20|Could not find|does not exist|schema cache/i.test(String((e && (e.message || e.code)) || e)); }
/* what the scheme is expected to pay for this admission */
function asCovered(s) {
  if (!s) return 0;
  if (s.claim_status === 'rejected' || s.preauth_status === 'rejected') return 0;
  if (s.claim_status === 'paid' && s.paid_amount != null) return Number(s.paid_amount);
  return Number(s.approved_amount != null ? s.approved_amount : s.claim_amount != null ? s.claim_amount : s.package_amount) || 0;
}
function asPill(map, v, kind) {
  var c = { approved: 'as-g', paid: 'as-g', rejected: 'as-r', query: 'as-a', sent: 'as-b', submitted: 'as-b' }[v] || '';
  return '<span class="as-pill ' + c + '">' + (kind ? kind + ': ' : '') + asE(map[v] || v) + '</span>';
}

/* ---------------- the card in the Billing tab ---------------- */
async function auraSchemeMount(root, admId) {
  if (!root || !admId) return;
  var box = document.getElementById('as-card-' + admId);
  if (!box) { box = document.createElement('div'); box.id = 'as-card-' + admId; root.insertBefore(box, root.firstChild); }
  var r = await _supa.from('nh_scheme_claims').select('*').eq('admission_id', admId).maybeSingle();
  if (r.error) { box.innerHTML = asMissing(r.error) ? '' : ''; return; }
  var s = r.data;
  window._asRow = window._asRow || {}; window._asRow[admId] = s;
  if (!s) {
    box.className = 'as-card';
    box.innerHTML = '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:180px"><b>&#127973; Payment scheme</b><div style="font-size:12px;color:var(--text-tertiary)">Cash / self-pay. Is this patient on PM-JAY (Ayushman card), Swasthya Sathi or insurance?</div></div>'
      + '<button class="as-btn g" onclick="auraSchemeEdit(\'' + admId + '\')">&#43; Add scheme</button><button class="as-btn" onclick="auraSchemeClaimsOpen()">All scheme claims</button></div>';
    return;
  }
  var cov = asCovered(s);
  box.className = 'as-card on';
  box.innerHTML = '<div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap"><div style="flex:1;min-width:200px"><b>&#127973; ' + asE(AS_SCHEMES[s.scheme] || s.scheme) + '</b>'
    + '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px">' + [s.card_no ? 'Card ' + asE(s.card_no) : '', s.abha_no ? 'ABHA ' + asE(s.abha_no.replace(/(\d{2})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4')) : '', s.package_name ? 'Package: ' + asE(s.package_name) + (s.package_code ? ' (' + asE(s.package_code) + ')' : '') : ''].filter(Boolean).join(' &middot; ') + '</div>'
    + '<div style="margin-top:6px">' + asPill(AS_PRE, s.preauth_status, 'Pre-auth') + asPill(AS_CLAIM, s.claim_status, 'Claim') + '</div></div>'
    + '<div style="text-align:right;min-width:150px"><div style="font-size:11px;color:var(--text-tertiary)">' + (s.claim_status === 'paid' ? 'Paid by the scheme' : 'Payable by the scheme') + '</div><div style="font-size:20px;font-weight:800;color:#1D4ED8">' + asM(cov) + '</div>'
    + '<div style="font-size:11.5px;color:var(--text-secondary)">Patient pays ' + asM(s.patient_pays) + '</div></div></div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="as-btn" onclick="auraSchemeEdit(\'' + admId + '\')">&#9998; Update pre-auth / claim</button><button class="as-btn" onclick="auraSchemeClaimsOpen()">All scheme claims</button></div>';
}

/* ---------------- edit form ---------------- */
function asOverlay(title, body, wide) {
  var ov = document.createElement('div'); ov.className = 'as-ov';
  ov.innerHTML = '<div class="as-m"' + (wide ? ' style="max-width:' + wide + 'px"' : '') + '><div class="as-mh"><span>' + title + '</span><button class="as-btn" aria-label="Close">&#10005;</button></div><div class="as-mb">' + body + '</div></div>';
  ov.querySelector('.as-mh button').onclick = function () { ov.remove(); };
  ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
  document.body.appendChild(ov); return ov;
}
function asSel(id, map, v) { return '<select id="' + id + '">' + Object.keys(map).map(function (k) { return '<option value="' + k + '"' + (k === v ? ' selected' : '') + '>' + asE(map[k]) + '</option>'; }).join('') + '</select>'; }
function asIn(id, label, v, type, ph) { return '<div><label for="' + id + '">' + label + '</label><input id="' + id + '" ' + (type ? 'type="' + type + '"' : '') + ' value="' + asE(v == null ? '' : v) + '"' + (ph ? ' placeholder="' + asE(ph) + '"' : '') + (type === 'number' ? ' min="0" step="0.01"' : '') + '/></div>'; }
function auraSchemeEdit(admId) {
  var s = (window._asRow || {})[admId] || {};
  var ov = asOverlay('&#127973; Payment scheme for this admission',
    '<div class="as-f">'
    + '<div class="as-g2"><div><label for="as-scheme">Scheme *</label><select id="as-scheme"><option value="">No scheme (cash / self-pay)</option>' + Object.keys(AS_SCHEMES).map(function (k) { return '<option value="' + k + '"' + (k === s.scheme ? ' selected' : '') + '>' + asE(AS_SCHEMES[k]) + '</option>'; }).join('') + '</select></div>'
    + asIn('as-card', 'Card / policy number', s.card_no, '', 'Ayushman / Swasthya Sathi card no.') + asIn('as-abha', 'ABHA number (14 digits)', s.abha_no, '', '91-1234-5678-9012') + asIn('as-ben', 'Beneficiary name (as on card)', s.beneficiary) + '</div>'
    + '<div class="as-sec">Package</div><div class="as-g2">' + asIn('as-pcode', 'Package code', s.package_code, '', 'e.g. SG039A') + asIn('as-pname', 'Package name', s.package_name, '', 'e.g. Appendectomy') + asIn('as-pamt', 'Package amount ₹', s.package_amount, 'number') + '</div>'
    + '<div class="as-sec">Pre-authorisation</div><div class="as-g2">' + asIn('as-pno', 'Pre-auth number', s.preauth_no) + '<div><label for="as-pst">Pre-auth status</label>' + asSel('as-pst', AS_PRE, s.preauth_status || 'not_sent') + '</div>' + asIn('as-appr', 'Approved amount ₹', s.approved_amount, 'number') + asIn('as-copay', 'Patient pays ₹ (co-pay / not covered)', s.patient_pays, 'number') + '</div>'
    + '<div class="as-sec">Claim</div><div class="as-g2">' + asIn('as-cno', 'Claim number', s.claim_no) + '<div><label for="as-cst">Claim status</label>' + asSel('as-cst', AS_CLAIM, s.claim_status || 'not_submitted') + '</div>'
    + asIn('as-cdate', 'Submitted on', s.claim_submitted_on, 'date') + asIn('as-camt', 'Claimed amount ₹', s.claim_amount, 'number') + asIn('as-paid', 'Amount paid by scheme ₹', s.paid_amount, 'number') + asIn('as-pdate', 'Paid on', s.paid_on, 'date') + asIn('as-utr', 'UTR / payment reference', s.utr) + '</div>'
    + '<div style="margin-top:10px"><label for="as-notes">Notes (queries, documents asked)</label><textarea id="as-notes" rows="2">' + asE(s.notes || '') + '</textarea></div>'
    + '<p style="font-size:11.5px;color:var(--text-tertiary);margin:10px 0 0">The pre-authorisation and the claim are filed on the scheme\'s own portal. Keep this record up to date so the bill shows what the scheme pays and the owner sees what is still to come.</p>'
    + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="as-btn" id="as-cancel">Cancel</button><button class="as-btn g" id="as-save">&#10003; Save</button></div></div>', 820);
  ov.querySelector('#as-cancel').onclick = function () { ov.remove(); };
  window._asRow = window._asRow || {};
  ov.querySelector('#as-save').onclick = async function () {
    var g = function (id) { return (ov.querySelector('#' + id).value || '').trim(); };
    var p = { scheme: g('as-scheme'), card_no: g('as-card'), abha_no: g('as-abha'), beneficiary: g('as-ben'), package_code: g('as-pcode'), package_name: g('as-pname'), package_amount: g('as-pamt'),
      preauth_no: g('as-pno'), preauth_status: g('as-pst'), approved_amount: g('as-appr'), patient_pays: g('as-copay'), claim_no: g('as-cno'), claim_status: g('as-cst'),
      claim_submitted_on: g('as-cdate'), claim_amount: g('as-camt'), paid_amount: g('as-paid'), paid_on: g('as-pdate'), utr: g('as-utr'), notes: g('as-notes') };
    var ab = p.abha_no.replace(/\D/g, ''); if (ab && ab.length !== 14) { asToast('The ABHA number has 14 digits.'); return; }
    if (p.claim_status === 'paid' && !p.paid_amount) { asToast('Type the amount the scheme paid.'); return; }
    var b = this; b.disabled = true; b.textContent = 'Saving…';
    var r = await _supa.rpc('nh_scheme_save', { p_admission_id: admId, p: p });
    b.disabled = false; b.innerHTML = '&#10003; Save';
    if (r.error) { asToast(asMissing(r.error) ? 'Run file 35 in Supabase first.' : (r.error.message || 'Could not save.')); return; }
    ov.remove(); asToast(p.scheme ? 'Scheme details saved.' : 'Scheme removed: cash / self-pay.');
    if (r.data) window._asRow[admId] = r.data; else delete window._asRow[admId];
    var card = document.getElementById('as-card-' + admId); if (card && card.parentNode) auraSchemeMount(card.parentNode, admId);
    if (document.getElementById('as-list')) auraSchemeClaimsLoad();
  };
}

/* ---------------- all claims of this nursing home ---------------- */
var _asF = 'open';
async function auraSchemeClaimsOpen() {
  var ov = asOverlay('&#127973; Scheme claims (PM-JAY, Swasthya Sathi, insurance)', '<div id="as-list">Loading&hellip;</div>', 1000);
  ov.id = 'as-claims';
  auraSchemeClaimsLoad();
}
async function auraSchemeClaimsLoad() {
  var el = document.getElementById('as-list'); if (!el) return;
  var r = await _supa.from('nh_scheme_claims').select('*').eq('clinic_id', _clinicId).order('updated_at', { ascending: false }).limit(1000);
  if (r.error) { el.innerHTML = asMissing(r.error) ? 'Run file 35 in Supabase first.' : asE(r.error.message); return; }
  var rows = r.data || [], ids = rows.map(function (x) { return x.admission_id; }), adm = {};
  window._asRow = window._asRow || {}; rows.forEach(function (x) { window._asRow[x.admission_id] = x; });
  for (var i = 0; i < ids.length; i += 150) {
    var a = await _supa.from('admissions').select('id,patient_name,uhid,status,admission_date,discharge_date').in('id', ids.slice(i, i + 150));
    (a.data || []).forEach(function (x) { adm[x.id] = x; });
  }
  var open = rows.filter(function (s) { return ['paid', 'rejected'].indexOf(s.claim_status) < 0; });
  var pend = open.reduce(function (t, s) { return t + asCovered(s); }, 0), paid = rows.filter(function (s) { return s.claim_status === 'paid'; }).reduce(function (t, s) { return t + (Number(s.paid_amount) || 0); }, 0);
  var notSub = rows.filter(function (s) { return s.claim_status === 'not_submitted' && adm[s.admission_id] && adm[s.admission_id].status === 'Discharged'; }).length;
  var list = rows.filter(function (s) { return _asF === 'all' || (_asF === 'open' ? ['paid', 'rejected'].indexOf(s.claim_status) < 0 : s.claim_status === _asF); });
  var tab = function (k, l) { return '<button class="as-btn' + (_asF === k ? ' g' : '') + '" onclick="_asF=\'' + k + '\';auraSchemeClaimsLoad()">' + l + '</button>'; };
  el.innerHTML = '<div class="as-g2" style="margin-bottom:12px">'
    + '<div class="as-card"><div style="font-size:11px;color:var(--text-tertiary)">STILL TO COME FROM SCHEMES</div><div style="font-size:22px;font-weight:800;color:#1D4ED8">' + asM(pend) + '</div><div style="font-size:11.5px">' + open.length + ' admission' + (open.length === 1 ? '' : 's') + '</div></div>'
    + '<div class="as-card"><div style="font-size:11px;color:var(--text-tertiary)">RECEIVED FROM SCHEMES</div><div style="font-size:22px;font-weight:800;color:#0E7A50">' + asM(paid) + '</div></div>'
    + '<div class="as-card"><div style="font-size:11px;color:var(--text-tertiary)">DISCHARGED, CLAIM NOT SUBMITTED</div><div style="font-size:22px;font-weight:800;color:' + (notSub ? '#B54708' : 'inherit') + '">' + notSub + '</div><div style="font-size:11.5px">submit these first</div></div></div>'
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' + tab('open', 'Open') + tab('not_submitted', 'Not submitted') + tab('submitted', 'Submitted') + tab('query', 'Query') + tab('approved', 'Approved') + tab('paid', 'Paid') + tab('rejected', 'Rejected') + tab('all', 'All') + '</div>'
    + (list.length ? '<div style="overflow-x:auto"><table class="as-t"><thead><tr><th>Patient</th><th>Scheme</th><th>Package</th><th>Pre-auth</th><th>Claim</th><th style="text-align:right">Scheme pays</th></tr></thead><tbody>'
      + list.map(function (s) { var a = adm[s.admission_id] || {};
        return '<tr><td><b>' + asE(a.patient_name || '-') + '</b><div style="font-size:11px;color:var(--text-tertiary)">' + asE(a.uhid || '') + ' &middot; ' + (a.status === 'Discharged' ? 'Discharged ' + (a.discharge_date ? new Date(a.discharge_date).toLocaleDateString('en-GB') : '') : 'Admitted') + '</div></td>'
          + '<td>' + asE(AS_SCHEMES[s.scheme] || s.scheme) + '<div style="font-size:11px;color:var(--text-tertiary)">' + asE(s.card_no || '') + '</div></td><td>' + asE(s.package_name || '-') + '</td>'
          + '<td>' + asPill(AS_PRE, s.preauth_status) + (s.preauth_no ? '<div style="font-size:11px">' + asE(s.preauth_no) + '</div>' : '') + '</td>'
          + '<td>' + asPill(AS_CLAIM, s.claim_status) + (s.claim_no ? '<div style="font-size:11px">' + asE(s.claim_no) + '</div>' : '') + (s.claim_submitted_on ? '<div style="font-size:11px;color:var(--text-tertiary)">' + new Date(s.claim_submitted_on).toLocaleDateString('en-GB') + '</div>' : '') + '</td>'
          + '<td style="text-align:right"><b>' + asM(asCovered(s)) + '</b>' + (s.utr ? '<div style="font-size:11px">UTR ' + asE(s.utr) + '</div>' : '') + '<div><button class="as-btn" style="margin-top:4px;padding:4px 8px" onclick="auraSchemeEdit(\'' + s.admission_id + '\')">Update</button></div></td></tr>';
      }).join('') + '</tbody></table></div>' : '<div class="as-card" style="text-align:center">Nothing here.</div>')
    + '<p style="font-size:11.5px;color:var(--text-tertiary);margin-top:10px">Tap <b>Update</b> when the scheme answers (query, approval, payment with UTR). New schemes are added from the patient &rarr; Billing.</p>';
}
