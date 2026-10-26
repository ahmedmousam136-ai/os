/* AuraScale NURSING HOME patient bills: ONE shared engine for the reception portal and the owner portal (nh.html).
   Moved here unchanged from both pages so that both always show exactly the same bill and the same tax. */
/* ===== PATIENT BILLS, RECEIPTS (legal format) =====
   One admission -> one bill. Three kinds of paper:
     1. INTERIM BILL (running bill)  while the patient is admitted. Not numbered as a final bill. Made after charges/payments,
        and sent every 24 hours on WhatsApp by the server (patient-bills function, West Bengal rule: updated bill every 24 hours).
     2. FINAL BILL at discharge. Its number comes from the database (nh_issue_final_bill), one series per nursing home per
        financial year (e.g. DHNH/26-27/0001), never reused. Title:
          - "BILL OF SUPPLY"                    the nursing home has a valid GSTIN (treatment is exempt from GST)
          - "INVOICE-CUM-BILL OF SUPPLY"        valid GSTIN and a room above Rs 5,000/day (not ICU): 5% GST on that room only
          - "FINAL BILL"                        no GSTIN: no GST is ever shown or charged
        Once issued it is LOCKED: charges cannot change, the PDF is never rebuilt. Only the owner can cancel it (to correct a
        mistake); the corrected bill gets a NEW number and the cancelled one stays on record.
     3. PAYMENT RECEIPT for every payment (R/26-27/0001 ...), made right after the payment and sent on WhatsApp.
   The pages are drawn by the browser (HTML -> image -> PDF) so that Bengali names and the rupee sign print correctly.
   If the bills SQL update (legal-bills.sql) has not been run yet, everything falls back to the old behaviour. */
var AURA_BILL_BUCKET = 'bills', AURA_BILL_LINK_SECONDS = 7 * 24 * 60 * 60;
var AURA_BILL_LIBS = {
  jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  html2canvas: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
};
var AURA_GST_ROOM_LIMIT = 5000, AURA_GST_ROOM_RATE = 5;
var AURA_GST_ROW_TYPE = 'GST on room rent';
var _auraBillBusy = {};
(function () {
  if (typeof FAM_I18N === 'undefined') return;
  var add = {
    en: 'Tip: your address is not set, so the bill has no address line. The owner can add it in Settings → Facility details.',
    bn: 'টিপ: আপনার ঠিকানা লেখা নেই, তাই বিলে ঠিকানা নেই। মালিক Settings → Facility details-এ যোগ করতে পারেন।',
    hi: 'सुझाव: आपका पता दर्ज नहीं है, इसलिए बिल में पता नहीं है। मालिक इसे Settings → Facility details में जोड़ सकते हैं।'
  };
  Object.keys(add).forEach(function (l) { if (FAM_I18N[l]) FAM_I18N[l].fd_missing_hint = add[l]; });
  var btn = {
    en: { bt_generate: 'Generate Bill', bt_download: 'Download bill', bt_regenerate: 'Regenerate', bt_saved: 'Saved', bt_balance: 'Balance', bt_locked: 'Final bill', bt_cancel: 'Cancel bill', bt_receipt: 'Receipt' },
    bn: { bt_generate: 'বিল তৈরি করুন', bt_download: 'বিল ডাউনলোড', bt_regenerate: 'আবার তৈরি করুন', bt_saved: 'সংরক্ষিত', bt_balance: 'বাকি', bt_locked: 'চূড়ান্ত বিল', bt_cancel: 'বিল বাতিল', bt_receipt: 'রসিদ' },
    hi: { bt_generate: 'बिल बनाएँ', bt_download: 'बिल डाउनलोड करें', bt_regenerate: 'फिर से बनाएँ', bt_saved: 'सहेजा गया', bt_balance: 'बाकी', bt_locked: 'अंतिम बिल', bt_cancel: 'बिल रद्द करें', bt_receipt: 'रसीद' }
  };
  Object.keys(btn).forEach(function (l) { if (FAM_I18N[l]) for (var k in btn[l]) FAM_I18N[l][k] = btn[l][k]; });
})();
function auraT(key, fallback) { if (typeof famT !== 'function') return fallback; var v = famT(key); return (v && v !== key) ? v : fallback; }
function auraWhereToFind() { return document.getElementById('v-bills') ? 'Open Bills in the menu to download it.' : 'Find it under Discharge (Bill column) or Billing → Invoices.'; }
function auraAddressHint(r) {
  if (!r || !r.missingAddress) return '';
  return ' ' + (typeof famT === 'function' ? famT('fd_missing_hint') : 'Tip: your address is not set. The owner can add it in Settings → Facility details.');
}
function auraLoadScript(url, ready) {
  return new Promise(function (resolve, reject) {
    if (ready()) return resolve();
    var s = document.createElement('script'); s.src = url;
    s.onload = function () { ready() ? resolve() : reject(new Error('A bill library did not start')); };
    s.onerror = function () { reject(new Error('Could not load the PDF tools (check the internet connection)')); };
    document.head.appendChild(s);
  });
}
async function auraLoadBillLibs() {
  await auraLoadScript(AURA_BILL_LIBS.jspdf, function () { return !!(window.jspdf && window.jspdf.jsPDF); });
  await auraLoadScript(AURA_BILL_LIBS.html2canvas, function () { return typeof window.html2canvas === 'function'; });
}
function auraBMoney(n) {
  n = Number(n) || 0; var neg = n < 0; n = Math.abs(n);
  var whole = Math.round(n * 100) % 100 === 0;
  var s = whole ? n.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (neg ? '-' : '') + '₹' + s;
}
function auraMoney2(n) { n = Number(n) || 0; return (n < 0 ? '-' : '') + '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function auraMoney(n) { return auraBMoney(n); }
function auraDate(d) { return auraBDate(d); }
function auraP2(x) { return ('0' + x).slice(-2); }
function auraBDate(d) {
  if (!d) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(d))) { var p = String(d).split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  var x = new Date(d); if (isNaN(x)) return '';
  return auraP2(x.getDate()) + '/' + auraP2(x.getMonth() + 1) + '/' + x.getFullYear();
}
function auraTime(d) { var x = new Date(d); if (!d || isNaN(x)) return ''; var h = x.getHours(), ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + auraP2(x.getMinutes()) + ' ' + ap; }
function auraDateTime(d) { var x = new Date(d); if (!d || isNaN(x)) return ''; return auraBDate(x) + ' ' + auraTime(x); }
function auraYmd(d) { var x = new Date(d); if (!d || isNaN(x)) return 'NODATE'; return '' + x.getFullYear() + auraP2(x.getMonth() + 1) + auraP2(x.getDate()); }
function auraPick(row, keys) { for (var i = 0; i < keys.length; i++) { if (row && row[keys[i]]) return String(row[keys[i]]); } return ''; }
function auraRound2(n) { return Math.round((Number(n) || 0) * 100) / 100; }

/* GSTIN: format AND check digit. A GSTIN that fails this is treated as "no GSTIN" everywhere (no GST on any bill). */
function auraGstinValid(g) {
  g = String(g || '').toUpperCase().trim();
  if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(g)) return false;
  var st = parseInt(g.slice(0, 2), 10); if (!(st >= 1 && st <= 38) && st !== 97 && st !== 99) return false;
  var cs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', sum = 0;
  for (var i = 0; i < 14; i++) { var v = cs.indexOf(g[i]) * (i % 2 ? 2 : 1); sum += Math.floor(v / 36) + (v % 36); }
  return cs[(36 - (sum % 36)) % 36] === g[14];
}
/* ICU / critical-care rooms are never taxed, whatever the rate */
function auraIsIcu(s) { return /\b(icu|iccu|ccu|nicu|picu|sicu|micu|hdu|itu|intensive|critical)\b/i.test(String(s || '')); }
function auraIsGstRow(c) { return !!(c && (c.gst_for_charge || String(c.charge_type || '') === AURA_GST_ROW_TYPE)); }

/* amount in words, Indian system: 1,500 -> "Rupees One Thousand Five Hundred Only" */
function auraWords(n) {
  n = Math.round((Number(n) || 0) * 100) / 100;
  var ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function two(x) { return x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? ' ' + ones[x % 10] : ''); }
  function three(x) { var h = Math.floor(x / 100), r = x % 100; return (h ? ones[h] + ' Hundred' + (r ? ' ' : '') : '') + (r ? two(r) : ''); }
  function whole(x) {
    if (x === 0) return 'Zero';
    var out = [], cr = Math.floor(x / 10000000); x %= 10000000;
    var lk = Math.floor(x / 100000); x %= 100000; var th = Math.floor(x / 1000); x %= 1000;
    if (cr) out.push(whole(cr) + ' Crore'); if (lk) out.push(two(lk) + ' Lakh'); if (th) out.push(two(th) + ' Thousand'); if (x) out.push(three(x));
    return out.join(' ');
  }
  var r = Math.floor(Math.abs(n)), p = Math.round((Math.abs(n) - r) * 100);
  return 'Rupees ' + whole(r) + (p ? ' and ' + two(p) + ' Paise' : '') + ' Only';
}
async function auraBlobToDataUrl(blob) {
  return await new Promise(function (res) { var fr = new FileReader(); fr.onload = function () { res(fr.result); }; fr.onerror = function () { res(''); }; fr.readAsDataURL(blob); });
}
/* the owner's signature / stamp (Settings -> Signature & stamp), as a data URL so it prints inside the PDF */
var _auraSignCache = {};
async function auraSignatureData(path) {
  if (!path) return '';
  if (_auraSignCache[path] !== undefined) return _auraSignCache[path];
  try { var dl = await _supa.storage.from(AURA_BILL_BUCKET).download(path); _auraSignCache[path] = (dl.data ? await auraBlobToDataUrl(dl.data) : ''); }
  catch (e) { _auraSignCache[path] = ''; }
  return _auraSignCache[path];
}
function auraNeedsSqlUpdate(e) { var m = String((e && (e.message || e.code)) || e || ''); return /could not find the function|PGRST202|schema cache|does not exist/i.test(m); }

/* ---------- 1. gather everything the bill needs ---------- */
async function auraBillData(admissionId) {
  var ar = await _supa.from('admissions').select('*').eq('id', admissionId).single();
  if (ar.error || !ar.data) throw new Error('Could not load this admission.');
  var a = ar.data;
  if (a.clinic_id && typeof _clinicId !== 'undefined' && _clinicId && a.clinic_id !== _clinicId) throw new Error('This admission belongs to another facility.');
  var clinicId = a.clinic_id || _clinicId;
  var res = await Promise.all([
    _supa.from('clinics').select('*').eq('id', clinicId).single(),
    a.patient_id ? _supa.from('nh_patients').select('*').eq('id', a.patient_id).maybeSingle() : Promise.resolve({ data: null }),
    _supa.from('admission_charges').select('*').eq('admission_id', admissionId),
    _supa.from('nh_payments').select('*').eq('admission_id', admissionId),
    a.bed_id ? _supa.from('beds').select('bed_number,ward').eq('id', a.bed_id).maybeSingle() : Promise.resolve({ data: null }),
    _supa.from('patient_bills').select('*').eq('admission_id', admissionId).maybeSingle()
  ]);
  if (res[2].error) throw new Error('Could not read the charges: ' + res[2].error.message);
  if (res[3].error) throw new Error('Could not read the payments: ' + res[3].error.message);
  var c = res[0].data || {}, p = res[1].data || {}, bed = res[4].data || {}, pb = (res[5] && res[5].data) || null;
  var sortKey = function (x) { return String(x.charge_date || x.created_at || ''); };
  var all = (res[2].data || []).slice().sort(function (x, y) { var dx = sortKey(x), dy = sortKey(y); return dx < dy ? -1 : dx > dy ? 1 : String(x.created_at || '').localeCompare(String(y.created_at || '')); });
  var gstRows = all.filter(auraIsGstRow), charges = all.filter(function (x) { return !auraIsGstRow(x); });
  var payments = (res[3].data || []).slice().sort(function (x, y) { return String(x.created_at || x.payment_date || '').localeCompare(String(y.created_at || y.payment_date || '')); });
  var gstin = auraPick(c, ['gstin', 'gst_number', 'gst_no', 'gst', 'gstin_number']).toUpperCase(), gstOk = auraGstinValid(gstin);
  var gstTotal = auraRound2(gstRows.reduce(function (s, r) { return s + (Number(r.total_price) || 0); }, 0));
  var taxableIds = {}; gstRows.forEach(function (g) { if (g.gst_for_charge) taxableIds[g.gst_for_charge] = true; });
  var taxable = auraRound2(charges.filter(function (x) { return taxableIds[x.id]; }).reduce(function (s, r) { return s + (Number(r.total_price) || 0); }, 0));
  var chargesTotal = auraRound2(charges.reduce(function (s, r) { return s + (Number(r.total_price) || 0); }, 0));
  var total = auraRound2(chargesTotal + gstTotal);
  var paid = auraRound2(payments.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0));
  var uhid = a.uhid || p.uhid || '';
  var staffIds = payments.map(function (x) { return x.recorded_by; }).filter(function (v, i, arr) { return v && !payments.some(function (y) { return y.received_by_name && y.recorded_by === v; }) && arr.indexOf(v) === i; });
  var staffNames = {};
  if (staffIds.length) { try { var sr = await _supa.from('nh_staff').select('id,full_name').in('id', staffIds); (sr.data || []).forEach(function (s) { staffNames[s.id] = s.full_name; }); } catch (e) {} }
  payments.forEach(function (x) { x._by = x.received_by_name || staffNames[x.recorded_by] || ''; });
  var discharged = a.status === 'Discharged';
  var d = {
    clinicId: clinicId, adm: a, charges: charges, gstRows: gstRows, payments: payments, bill: pb,
    clinic: { name: c.name || 'Nursing Home', address: auraPick(c, ['address', 'clinic_address', 'facility_address', 'location']), phone: auraPick(c, ['phone', 'contact_phone', 'mobile']),
      gstin: gstOk ? gstin : '', gstinRaw: gstin, signPath: c.bill_sign_path || '', signatory: c.bill_signatory || '' },
    patient: { name: a.patient_name || p.full_name || 'Patient', uhid: uhid, age: (a.patient_age !== null && a.patient_age !== undefined && a.patient_age !== '') ? a.patient_age : (p.age || ''),
      gender: a.patient_gender || p.gender || '', phone: a.patient_phone || p.phone || '', address: auraPick(p, ['address', 'patient_address', 'full_address']),
      guardian: auraPick(p, ['guardian_name', 'relative_name', 'attendant_name']) },
    bed: (bed.bed_number ? 'Bed ' + bed.bed_number : '') + (bed.ward ? (bed.bed_number ? ', ' : '') + bed.ward : ''),
    doctor: a.admitting_doctor || '',
    chargesTotal: chargesTotal, gstTotal: gstTotal, taxable: taxable, total: total, paid: paid, due: auraRound2(total - paid),
    admNo: (uhid || ('ADM-' + String(a.id).slice(0, 8))) + '-' + auraYmd(a.admission_date),
    discharged: discharged, generatedAt: new Date(), kind: discharged ? 'final' : 'interim'
  };
  d.billNo = d.admNo;
  d.tax = auraTaxModel(d);
  if (gstRows.length && !gstOk) d.gstProblem = 'This bill has GST on a room, but the nursing home has no valid GSTIN. Add the GSTIN in Settings → Facility details (or ask AuraScale).';
  /* PM-JAY / Swasthya Sathi / insurance (file 35): shown on the bill; the amounts above are not changed */
  try { var sc = await _supa.from('nh_scheme_claims').select('*').eq('admission_id', admissionId).maybeSingle(); if (!sc.error && sc.data) d.scheme = sc.data; } catch (e) {}
  d.signImg = await auraSignatureData(d.clinic.signPath);
  return d;
}
/* ---------- 1b. tax of every line, read from the database (worked out there by the Tax Master; never here) ----------
   Each charge carries: tax class, HSN/SAC, treatment (exempt / taxable / not_registered / no_rule), rate, taxable value, CGST, SGST, tax.
   The GST amount itself is the linked GST line (gst_for_charge), so the totals are exactly what is stored and paid. */
function auraTaxModel(d) {
  var gstBy = {}; d.gstRows.forEach(function (g) { if (g.gst_for_charge) gstBy[g.gst_for_charge] = (gstBy[g.gst_for_charge] || 0) + (Number(g.total_price) || 0); });
  var lines = d.charges.map(function (c) {
    var tv = auraRound2(Number(c.taxable_value != null ? c.taxable_value : c.total_price) || 0);
    var tax = auraRound2(gstBy[c.id] || 0), rate = Number(c.tax_rate) || 0;
    var tr = c.tax_treatment || (tax > 0 ? 'taxable' : 'exempt');
    if (tax > 0 && !rate && tv > 0) rate = auraRound2(tax * 100 / tv);
    if (tax > 0) tr = 'taxable'; else if (tr === 'taxable') tr = 'exempt';
    var igst = auraRound2(Number(c.igst) || 0), cg = 0, sg = 0;
    if (tax > 0 && !igst) { cg = auraRound2(tax / 2); sg = auraRound2(tax - cg); }
    return { c: c, hsn: c.hsn_sac || (d.clinic.gstin ? '9993' : ''), cls: c.tax_class_name || '', treatment: tr, rate: tax > 0 ? rate : 0,
             taxable: tv, cgst: cg, sgst: sg, igst: igst, tax: tax, total: auraRound2(tv + tax), basis: c.tax_basis || '' };
  });
  var groups = {}, exempt = 0, notReg = 0, pending = 0;
  lines.forEach(function (l) {
    if (l.tax > 0) { var k = String(l.rate) + (l.igst ? 'i' : ''); var g = groups[k] || (groups[k] = { rate: l.rate, igst: !!l.igst, taxable: 0, cgst: 0, sgst: 0, igstAmt: 0, tax: 0, names: [] });
      g.taxable += l.taxable; g.cgst += l.cgst; g.sgst += l.sgst; g.igstAmt += l.igst; g.tax += l.tax; if (l.cls && g.names.indexOf(l.cls) < 0) g.names.push(l.cls); }
    else if (l.treatment === 'not_registered') notReg += l.taxable;
    else { exempt += l.taxable; if (l.treatment === 'no_rule') pending++; }
  });
  var gl = Object.keys(groups).map(function (k) { var g = groups[k]; ['taxable', 'cgst', 'sgst', 'igstAmt', 'tax'].forEach(function (x) { g[x] = auraRound2(g[x]); }); return g; })
    .sort(function (a, b) { return a.rate - b.rate; });
  var taxableTotal = auraRound2(lines.reduce(function (s, l) { return s + l.taxable; }, 0));
  return { lines: lines, groups: gl, exempt: auraRound2(exempt), notRegistered: auraRound2(notReg), pending: pending,
           subtotal: taxableTotal, totalTax: auraRound2(gl.reduce(function (s, g) { return s + g.tax; }, 0)), show: !!d.clinic.gstin };
}
function auraPct(n) { n = Math.round((Number(n) || 0) * 100) / 100; return n + '%'; }
function auraDocTitle(d) {
  if (d.kind !== 'final') return 'INTERIM BILL';
  if (!d.clinic.gstin) return 'FINAL BILL';
  return d.gstRows.length ? 'INVOICE-CUM-BILL OF SUPPLY' : 'BILL OF SUPPLY';
}

/* ---------- 2. the page design ---------- */
function auraBillCss() {
  var font = 'font-family:"Noto Sans","Noto Sans Bengali","Hind Siliguri",Mukta,Arial,Helvetica,sans-serif;';
  return '.ab-page{box-sizing:border-box;width:794px;height:1123px;padding:38px 44px 34px;background:#fff;color:#14201b;' + font + 'font-size:12.5px;line-height:1.45;position:relative;overflow:hidden}'
    + '.ab-meas{box-sizing:border-box;width:794px;padding:0 44px;background:#fff;' + font + 'font-size:12.5px;line-height:1.45;color:#14201b}'
    + '.ab-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:3px solid #12976A;padding-bottom:12px}'
    + '.ab-clinic{font-size:22px;font-weight:700;color:#0b4f3a;line-height:1.2}'
    + '.ab-sub{font-size:11.5px;color:#4a5b53;margin-top:3px}'
    + '.ab-title{text-align:right;flex-shrink:0;max-width:300px}.ab-title b{display:block;font-size:18px;letter-spacing:.05em;color:#12976A;line-height:1.2}.ab-title span{display:block;font-size:11.5px;color:#4a5b53;margin-top:3px}'
    + '.ab-title span.no{display:inline;font-size:13px;color:#14201b;font-weight:700;margin:0}'
    + '.ab-chead{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #12976A;padding-bottom:8px;font-size:12px;color:#4a5b53}.ab-chead b{font-size:15px;color:#0b4f3a}'
    + '.ab-pt{display:grid;grid-template-columns:1fr 1fr;gap:5px 24px;margin:14px 0 12px;padding:11px 14px;background:#f4f8f6;border:1px solid #dbe7e1;border-radius:8px}'
    + '.ab-pt div{display:flex;gap:8px}.ab-pt .l{color:#6b7a73;min-width:100px;flex-shrink:0}.ab-pt .v{font-weight:600;overflow-wrap:anywhere}.ab-pt .wide{grid-column:1 / span 2}'
    + 'table.ab-t{width:100%;border-collapse:collapse;table-layout:fixed;font-size:12px}'
    + '.ab-t th{background:#12976A;color:#fff;text-align:left;padding:7px 8px;font-weight:600}'
    + '.ab-t td{padding:6px 8px;border-bottom:1px solid #e3ebe7;vertical-align:top;overflow-wrap:anywhere}'
    + '.ab-t th.ab-r,.ab-t td.ab-r,.ab-r{text-align:right}.ab-c{color:#4a5b53}'
    + '.ab-tax{display:inline-block;margin-left:6px;padding:0 5px;border-radius:4px;background:#fff4e0;color:#9a5b00;font-size:10px;font-weight:700}'
    + '.ab-ex{display:inline-block;padding:1px 6px;border-radius:4px;background:#eef6f2;color:#0b6b4a;font-size:10px;font-weight:700;white-space:nowrap}'
    + '.ab-none{padding:14px 8px;color:#6b7a73;font-style:italic;border-bottom:1px solid #e3ebe7}'
    + '.ab-tot{margin:10px 0 0 auto;width:440px}.ab-tot .row{display:flex;justify-content:space-between;padding:4px 8px}.ab-tot .sm{font-size:11.5px;color:#4a5b53}'
    + '.ab-tot .grand{margin-top:4px;padding:9px 8px;background:#eef6f2;border-radius:6px;font-size:14.5px;font-weight:700}'
    + '.ab-words{margin-top:6px;text-align:right;font-size:11.5px;color:#4a5b53;font-style:italic}'
    + '.ab-ph{margin-top:16px;padding-bottom:5px;border-bottom:2px solid #12976A;font-weight:700;color:#0b4f3a;font-size:13px}'
    + '.ab-prow{display:flex;gap:8px;padding:6px 8px;border-bottom:1px solid #e3ebe7;font-size:11.5px}.ab-prow span{overflow-wrap:anywhere}.ab-prow.h{color:#6b7a73;font-weight:600;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #cfdcd5}'
    + '.ab-final{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:12px}'
    + '.ab-final .box{width:380px}.ab-final .row{display:flex;justify-content:space-between;padding:5px 8px}'
    + '.ab-final .due{margin-top:4px;padding:10px 8px;border-radius:6px;font-size:16px;font-weight:700;display:flex;justify-content:space-between}'
    + '.ab-due-red{background:#fdecec;color:#b42318}.ab-due-green{background:#e6f6ee;color:#0f7a4f}'
    + '.ab-stamp{border:3px solid #0f7a4f;color:#0f7a4f;font-weight:800;font-size:22px;letter-spacing:.12em;padding:4px 16px;border-radius:6px;transform:rotate(-8deg);opacity:.85}'
    + '.ab-stamp.red{border-color:#b42318;color:#b42318;font-size:15px;letter-spacing:.06em}'
    + '.ab-end{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-top:18px}'
    + '.ab-decl{flex:1;font-size:10.8px;color:#4a5b53;border:1px solid #dbe7e1;border-radius:8px;padding:9px 12px;background:#fafcfb;line-height:1.5}.ab-decl b{color:#14201b}'
    + '.ab-sign{width:230px;text-align:center;font-size:11px;color:#4a5b53;flex-shrink:0}.ab-sign img{max-width:200px;max-height:70px;display:block;margin:0 auto 2px}.ab-sign .sp{height:58px}'
    + '.ab-sign .ln{border-top:1px solid #14201b;padding-top:4px;color:#14201b;font-weight:600}'
    + '.ab-foot{position:absolute;left:44px;right:44px;bottom:16px;font-size:9.6px;color:#7a8a83;display:flex;justify-content:space-between;gap:12px;border-top:1px solid #e3ebe7;padding-top:6px}';
}
function auraColgroup(d) {
  if (d && d.tax && d.tax.show) return '<colgroup><col style="width:4%"><col style="width:11.5%"><col style="width:21.5%"><col style="width:9%"><col style="width:5%"><col style="width:9%"><col style="width:12%"><col style="width:10%"><col style="width:18%"></colgroup>';
  return '<colgroup><col style="width:5%"><col style="width:12%"><col style="width:15%"><col style="width:33%"><col style="width:6%"><col style="width:14%"><col style="width:15%"></colgroup>';
}
function auraTheadHtml(d) {
  if (d && d.tax && d.tax.show) return '<thead><tr><th>#</th><th>Date</th><th>Item / service</th><th>HSN/ SAC</th><th class="ab-r">Qty</th><th class="ab-r">Rate</th><th class="ab-r">Taxable value</th><th class="ab-r">GST</th><th class="ab-r">Tax / Amount</th></tr></thead>';
  return '<thead><tr><th>#</th><th>Date</th><th>Charge type</th><th>Description</th><th class="ab-r">Qty</th><th class="ab-r">Rate</th><th class="ab-r">Amount</th></tr></thead>';
}
function auraClinicLines(d) {
  var sub = [];
  if (d.clinic.address) sub.push(esc(d.clinic.address).replace(/\n/g, ', '));
  var line2 = []; if (d.clinic.phone) line2.push('Phone: ' + esc(d.clinic.phone)); if (d.clinic.gstin) line2.push('GSTIN: ' + esc(d.clinic.gstin));
  if (line2.length) sub.push(line2.join(' &nbsp;&middot;&nbsp; '));
  return sub.map(function (x) { return '<div class="ab-sub">' + x + '</div>'; }).join('');
}
function auraHeaderFull(d) {
  var right;
  if (d.kind === 'final') {
    right = '<b>' + auraDocTitle(d) + '</b><span>Bill No: <span class="no">' + esc(d.billNo) + '</span></span><span>Date: ' + auraBDate(d.issuedAt || d.generatedAt) + '</span>'
      + (d.clinic.gstin ? '<span>SAC 9993 &middot; Healthcare services</span>' : '') + (d.cancelledNote ? '<span style="color:#b42318">' + esc(d.cancelledNote) + '</span>' : '');
  } else {
    right = '<b>INTERIM BILL</b><span>Running bill as on ' + esc(auraDateTime(d.generatedAt)) + '</span><span>Admission No: <span class="no">' + esc(d.admNo) + '</span></span><span style="color:#9a5b00;font-weight:600">Not the final bill &middot; patient still admitted</span>';
  }
  return '<div class="ab-head"><div><div class="ab-clinic">' + esc(d.clinic.name) + '</div>' + auraClinicLines(d) + '</div><div class="ab-title">' + right + '</div></div>';
}
function auraHeaderCompact(d, n) {
  return '<div class="ab-chead"><span><b>' + esc(d.clinic.name) + '</b> &nbsp;&middot;&nbsp; ' + esc(d.patient.name) + '</span><span>' + (d.kind === 'final' ? 'Bill No: ' + esc(d.billNo) : 'Interim bill ' + esc(d.admNo)) + ' (continued, page ' + n + ')</span></div>';
}
function auraPatientBlock(d) {
  var p = d.patient, a = d.adm;
  var ageGender = [p.age !== '' && p.age !== null ? esc(p.age) + ' yrs' : '', esc(p.gender || '')].filter(Boolean).join(' / ');
  var cell = function (l, v, wide) { return '<div' + (wide ? ' class="wide"' : '') + '><span class="l">' + l + '</span><span class="v">' + v + '</span></div>'; };
  return '<div class="ab-pt">'
    + cell('Billed to', esc(p.name)) + cell('Admission No', esc(d.admNo))
    + cell('UHID', esc(p.uhid || '-')) + cell('Age / Gender', ageGender || '-')
    + cell('Phone', esc(p.phone || '-')) + cell('Bed / Ward', esc(d.bed || '-'))
    + cell('Admitted on', esc(auraDateTime(a.admission_date) || auraBDate(a.admission_date) || '-')) + cell('Discharged on', d.discharged ? esc(auraDateTime(a.discharge_date) || '-') : 'Not yet discharged')
    + (d.doctor ? cell('Doctor', esc(d.doctor)) : '') + (p.guardian ? cell('Attendant', esc(p.guardian)) : '')
    + cell('Address', esc(p.address || '-'), true)
    + (d.scheme ? cell('Payment scheme', esc(auraSchemeName(d.scheme.scheme)) + (d.scheme.card_no ? ' &middot; Card ' + esc(d.scheme.card_no) : '') + (d.scheme.abha_no ? ' &middot; ABHA ' + esc(d.scheme.abha_no) : '')
        + (d.scheme.preauth_no ? ' &middot; Pre-auth ' + esc(d.scheme.preauth_no) : '') + (d.scheme.package_name ? ' &middot; Package ' + esc(d.scheme.package_name) : ''), true) : '')
    + '</div>';
}
function auraTaxableIds(d) { var m = {}; d.gstRows.forEach(function (g) { if (g.gst_for_charge) m[g.gst_for_charge] = true; }); return m; }
function auraTaxCell(l) {
  if (l.tax > 0) return '<b>' + auraPct(l.rate) + '</b><div class="ab-c" style="font-size:9.5px;white-space:nowrap">' + (l.igst ? 'IGST' : 'C ' + auraPct(l.rate / 2) + ' + S ' + auraPct(l.rate / 2)) + '</div>';
  if (l.treatment === 'no_rule') return '<span class="ab-c" style="font-size:10.5px">Rule pending</span>';
  if (l.treatment === 'not_registered') return '<span class="ab-c" style="font-size:10.5px">Not charged</span>';
  return '<span class="ab-ex">GST Exempt</span>';
}
function auraBillItems(d) {
  var items = [], tx = auraTaxableIds(d), T = d.tax;
  if (T && T.show) return auraBillItemsTax(d);
  d.charges.forEach(function (c, i) {
    var qty = (c.quantity !== null && c.quantity !== undefined && c.quantity !== '') ? c.quantity : 1;
    items.push({ t: 'crow', html: '<tr><td class="ab-c">' + (i + 1) + '</td><td>' + esc(auraBDate(c.charge_date || c.created_at)) + '</td><td>' + esc(c.charge_type || '') + '</td><td>' + esc(c.description || '')
      + (tx[c.id] ? '<span class="ab-tax">GST 5%</span>' : '') + '</td>'
      + '<td class="ab-r">' + esc(qty) + '</td><td class="ab-r">' + auraBMoney(c.unit_price) + '</td><td class="ab-r"><b>' + auraBMoney(c.total_price) + '</b></td></tr>' });
  });
  if (!d.charges.length) items.push({ t: 'cnone', html: '<div class="ab-none">No charges have been recorded for this admission.</div>' });
  var tot = '<div class="ab-tot">';
  /* (no GSTIN: the simple bill, as before) */
  if (d.gstRows.length) {
    var cg = auraRound2(d.gstTotal / 2), sg = auraRound2(d.gstTotal - cg);
    tot += '<div class="row"><span>Healthcare services (exempt from GST)</span><span>' + auraMoney2(d.chargesTotal - d.taxable) + '</span></div>'
      + '<div class="row"><span>Room rent above ₹5,000/day (taxable value)</span><span>' + auraMoney2(d.taxable) + '</span></div>'
      + '<div class="row sm"><span>CGST @ 2.5%</span><span>' + auraMoney2(cg) + '</span></div>'
      + '<div class="row sm"><span>SGST @ 2.5%</span><span>' + auraMoney2(sg) + '</span></div>';
  } else {
    tot += '<div class="row"><span>' + (d.clinic.gstin ? 'Healthcare services (exempt from GST)' : 'Total of charges') + '</span><span>' + auraMoney2(d.chargesTotal) + '</span></div>';
  }
  tot += '<div class="row grand"><span>' + (d.kind === 'final' ? 'Bill amount' : 'Bill so far') + '</span><span>' + auraMoney2(d.total) + '</span></div></div><div class="ab-words">' + esc(auraWords(d.total)) + '</div>';
  items.push({ t: 'tot', html: tot });
  return auraBillTail(d, items);
}
/* registered nursing home: every line shows HSN/SAC, taxable value, GST rate (or "GST Exempt") and tax; then the tax summary */
function auraTaxSummaryHtml(d, cls) {
  var T = d.tax, h = '<div class="' + (cls || 'ab-tot') + '">';
  h += '<div class="row"><span>Subtotal (taxable value of all items)</span><span>' + auraMoney2(T.subtotal) + '</span></div>';
  if (T.exempt) h += '<div class="row sm"><span>of which GST exempt</span><span>' + auraMoney2(T.exempt) + '</span></div>';
  if (T.notRegistered) h += '<div class="row sm"><span>of which GST not charged (not registered)</span><span>' + auraMoney2(T.notRegistered) + '</span></div>';
  T.groups.forEach(function (g) {
    h += '<div class="row sm"><span>Taxable value @ ' + auraPct(g.rate) + (g.names.length ? ' (' + esc(g.names.join(', ')) + ')' : '') + '</span><span>' + auraMoney2(g.taxable) + '</span></div>';
    if (g.igst) h += '<div class="row sm"><span>IGST @ ' + auraPct(g.rate) + '</span><span>' + auraMoney2(g.igstAmt) + '</span></div>';
    else h += '<div class="row sm"><span>CGST @ ' + auraPct(g.rate / 2) + '</span><span>' + auraMoney2(g.cgst) + '</span></div>'
            + '<div class="row sm"><span>SGST @ ' + auraPct(g.rate / 2) + '</span><span>' + auraMoney2(g.sgst) + '</span></div>';
  });
  h += '<div class="row"><span>Total GST / tax</span><span>' + auraMoney2(T.totalTax) + '</span></div>';
  return h;
}
function auraBillItemsTax(d) {
  var items = [], T = d.tax;
  T.lines.forEach(function (l, i) {
    var c = l.c, qty = (c.quantity !== null && c.quantity !== undefined && c.quantity !== '') ? c.quantity : 1;
    items.push({ t: 'crow', html: '<tr><td class="ab-c">' + (i + 1) + '</td><td style="white-space:nowrap;font-size:11px">' + esc(auraBDate(c.charge_date || c.created_at)) + '</td>'
      + '<td><b style="font-weight:600">' + esc(c.description || c.charge_type || '') + '</b>' + (c.description && c.charge_type ? '<div class="ab-c" style="font-size:10.5px">' + esc(c.charge_type) + '</div>' : '') + '</td>'
      + '<td>' + esc(l.hsn || '-') + '</td><td class="ab-r">' + esc(qty) + '</td><td class="ab-r">' + auraBMoney(c.unit_price) + '</td>'
      + '<td class="ab-r">' + auraMoney2(l.taxable) + '</td><td class="ab-r">' + auraTaxCell(l) + '</td>'
      + '<td class="ab-r">' + (l.tax > 0 ? '<span class="ab-c" style="font-size:10.5px">Tax ' + auraMoney2(l.tax) + '</span><br>' : '') + '<b>' + auraMoney2(l.total) + '</b></td></tr>' });
  });
  if (!T.lines.length) items.push({ t: 'cnone', html: '<div class="ab-none">No charges have been recorded for this admission.</div>' });
  var tot = auraTaxSummaryHtml(d) + '<div class="row grand"><span>' + (d.kind === 'final' ? 'Grand total' : 'Bill so far (grand total)') + '</span><span>' + auraMoney2(d.total) + '</span></div></div>'
    + '<div class="ab-words">' + esc(auraWords(d.total)) + '</div>';
  items.push({ t: 'tot', keep: 0, html: tot });
  return auraBillTail(d, items);
}
function auraSchemeName(k) { return ({ pmjay: 'PM-JAY (Ayushman Bharat)', swasthya_sathi: 'Swasthya Sathi', state_scheme: 'State scheme', cghs_echs: 'CGHS / ECHS', private_insurance: 'Insurance (TPA)', other: 'Scheme' })[k] || 'Scheme'; }
function auraSchemeCovered(s) {
  if (!s || s.claim_status === 'rejected' || s.preauth_status === 'rejected') return 0;
  if (s.claim_status === 'paid' && s.paid_amount != null) return Number(s.paid_amount) || 0;
  return Number(s.approved_amount != null ? s.approved_amount : s.claim_amount != null ? s.claim_amount : s.package_amount) || 0;
}
function auraBillTail(d, items) {
  items.push({ t: 'phead', keep: 2, html: '<div class="ab-ph">Payments received</div><div class="ab-prow h"><span style="width:20%">Receipt No</span><span style="width:20%">Date &amp; time</span><span style="width:19%">Mode</span><span style="flex:1">Ref / received by</span><span style="width:15%;text-align:right">Amount</span></div>' });
  d.payments.forEach(function (p) {
    var ref = [p.txn_id ? 'Ref ' + p.txn_id : '', p._by ? 'by ' + p._by : ''].filter(Boolean).join(' · ') || (p.notes || '-');
    items.push({ t: 'prow', html: '<div class="ab-prow"><span style="width:20%;font-weight:600">' + esc(p.receipt_no || '-') + '</span><span style="width:20%">' + esc(auraDateTime(p.created_at) || auraBDate(p.payment_date)) + '</span><span style="width:19%">' + esc(p.method || '') + '</span><span style="flex:1">' + esc(ref) + '</span><span style="width:15%;text-align:right"><b>' + auraBMoney(p.amount) + '</b></span></div>' });
  });
  if (!d.payments.length) items.push({ t: 'pnone', html: '<div class="ab-none">No payments received yet.</div>' });
  var settled = d.due <= 0, cashless = !settled && d.scheme && auraRound2(d.due - auraSchemeCovered(d.scheme)) <= 0;
  items.push({ t: 'final', html: '<div class="ab-final"><div>' + (d.kind === 'final' ? (settled ? '<span class="ab-stamp">PAID</span>' : cashless ? '<span class="ab-stamp">CASHLESS</span>' : '<span class="ab-stamp red">BALANCE DUE</span>') : '') + '</div><div class="box">'
    + '<div class="row"><span>' + (d.kind === 'final' ? 'Bill amount' : 'Bill so far') + '</span><span>' + auraMoney2(d.total) + '</span></div>'
    + '<div class="row"><span>Less: payments received (' + d.payments.length + ')</span><span>' + auraMoney2(d.paid) + '</span></div>'
    + (function () {
        if (!d.scheme) return '<div class="due ' + (settled ? 'ab-due-green' : 'ab-due-red') + '"><span>' + (d.due < 0 ? 'Paid in excess (refundable)' : 'Balance due') + '</span><span>' + auraMoney2(Math.abs(d.due)) + '</span></div>';
        var cov = Math.min(auraSchemeCovered(d.scheme), Math.max(d.due, 0)), pt = auraRound2(d.due - cov), paidBy = d.scheme.claim_status === 'paid';
        return '<div class="row"><span>Less: ' + (paidBy ? 'paid' : 'payable') + ' by ' + esc(auraSchemeName(d.scheme.scheme)) + (paidBy ? '' : ' (cashless)') + '</span><span>' + auraMoney2(cov) + '</span></div>'
          + '<div class="due ' + (pt <= 0 ? 'ab-due-green' : 'ab-due-red') + '"><span>' + (pt < 0 ? 'Paid in excess (refundable)' : 'Balance payable by the patient') + '</span><span>' + auraMoney2(Math.abs(pt)) + '</span></div>';
      })() + '</div></div>' });
  items.push({ t: 'end', html: auraEndBlock(d) });
  return items;
}
function auraDeclaration(d) {
  if (d.kind !== 'final') return '<b>This is an interim (running) bill, not the final bill.</b> Charges are added every day while the patient is admitted. The final bill is given at discharge. Please check the charges and ask at the reception if anything is unclear.';
  var s = '';
  if (d.clinic.gstin && d.gstRows.length) {
    var parts = (d.tax ? d.tax.groups : []).map(function (g) { return auraPct(g.rate) + ' (' + (g.igst ? 'IGST' : 'CGST ' + auraPct(g.rate / 2) + ' + SGST ' + auraPct(g.rate / 2)) + ')' + (g.names.length ? ' on ' + esc(g.names.join(', ')) : ''); });
    s = '<b>GST:</b> Healthcare services by a clinical establishment are exempt from GST (Notification No. 12/2017-Central Tax (Rate), Sl. No. 74). GST is charged item-wise only where the tax rule applies'
      + (parts.length ? ': ' + parts.join('; ') : '') + (d.tax && d.tax.groups.some(function (g) { return g.names.indexOf('Room / bed charge') >= 0; }) ? ' (room rent above ₹5,000 per day, not ICU: Notification No. 04/2022-Central Tax (Rate))' : '')
      + '. Tax is not payable on reverse charge basis.';
  }
  else if (d.clinic.gstin) s = '<b>No GST charged.</b> Healthcare services by a clinical establishment are exempt from GST (Notification No. 12/2017-Central Tax (Rate), Sl. No. 74).';
  else s = '<b>No GST has been charged on this bill.</b>';
  return s + '<br>Charges are as per the rates displayed at the nursing home. This bill is final and locked; any correction is made only by cancelling it and issuing a new bill number.';
}
function auraEndBlock(d) {
  var sign = d.signImg ? '<img src="' + d.signImg + '" alt="">' : '<div class="sp"></div>';
  return '<div class="ab-end"><div class="ab-decl">' + auraDeclaration(d) + '</div>'
    + '<div class="ab-sign">For ' + esc(d.clinic.name) + sign + '<div class="ln">Authorised Signatory</div>' + (d.clinic.signatory ? '<div>' + esc(d.clinic.signatory) + '</div>' : '') + '</div></div>';
}

/* ---------- 3. measure, split into pages, draw, assemble ---------- */
async function auraPaginateToPdf(o) {
  /* o: { css, width, height, padT, padB, foot, items, headFirst, headNext(n), footHtml(idx,n), thead, colgroup, format } */
  await auraLoadBillLibs();
  var CONTENT = o.height - o.padT - o.padB - o.foot, SAFETY = 6;
  var host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-12000px;top:0;width:' + o.width + 'px;background:#fff;pointer-events:none';
  host.innerHTML = '<style>' + o.css + '</style>';
  document.body.appendChild(host);
  try {
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    var meas = document.createElement('div'); meas.className = 'ab-meas'; meas.style.width = o.width + 'px'; host.appendChild(meas);
    function measure(html, asRow) {
      var box = document.createElement('div');
      box.innerHTML = asRow ? '<table class="ab-t">' + o.colgroup + '<tbody>' + html + '</tbody></table>' : html;
      meas.appendChild(box); var h = box.getBoundingClientRect().height; meas.removeChild(box); return h;
    }
    var hFull = measure(o.headFirst), hCompact = measure(o.headNext(2));
    var hThead = o.thead ? measure('<table class="ab-t">' + o.colgroup + o.thead + '</table>') : 0;
    o.items.forEach(function (it) { it.h = measure(it.html, it.t === 'crow') + 1; });
    var pages = [], pg = { items: [], used: hFull + SAFETY, rows: false };
    for (var i = 0; i < o.items.length; i++) {
      var it = o.items[i], own = it.h + ((it.t === 'crow' && !pg.rows) ? hThead : 0);
      var need = own; for (var k2 = 1; k2 <= (it.keep || 0) && o.items[i + k2]; k2++) need += o.items[i + k2].h;
      if (pg.items.length && pg.used + need > CONTENT) { pages.push(pg); pg = { items: [], used: hCompact + SAFETY, rows: false }; own = it.h + (it.t === 'crow' ? hThead : 0); }
      pg.items.push(it); pg.used += own; if (it.t === 'crow') pg.rows = true;
    }
    pages.push(pg);
    var n = pages.length, html = '';
    pages.forEach(function (p, idx) {
      var body = '', k = 0;
      while (k < p.items.length) {
        if (p.items[k].t === 'crow') { var rows = ''; while (k < p.items.length && p.items[k].t === 'crow') { rows += p.items[k].html; k++; } body += '<table class="ab-t">' + o.colgroup + o.thead + '<tbody>' + rows + '</tbody></table>'; }
        else { body += p.items[k].html; k++; }
      }
      html += '<div class="ab-page" style="width:' + o.width + 'px;height:' + o.height + 'px" id="aura-bill-pg-' + idx + '">' + (idx === 0 ? o.headFirst : o.headNext(idx + 1)) + body + o.footHtml(idx, n) + '</div>';
    });
    var out = document.createElement('div'); out.innerHTML = html; host.appendChild(out);
    var doc = new window.jspdf.jsPDF({ unit: 'mm', format: o.format || 'a4', compress: true });
    var Wmm = doc.internal.pageSize.getWidth(), Hmm = doc.internal.pageSize.getHeight();
    var imgs = [].slice.call(out.querySelectorAll('img')); await Promise.all(imgs.map(function (im) { return im.complete ? 0 : new Promise(function (r) { im.onload = im.onerror = r; }); }));
    for (var j = 0; j < n; j++) {
      var el = document.getElementById('aura-bill-pg-' + j);
      var canvas = await window.html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false, windowWidth: o.width, scrollX: 0, scrollY: 0 });
      if (j > 0) doc.addPage();
      doc.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, Wmm, Hmm, undefined, 'FAST');
    }
    return { blob: doc.output('blob'), pages: n };
  } finally { if (host.parentNode) host.parentNode.removeChild(host); }
}
async function auraRenderPdf(d) {
  var stamp = auraDateTime(d.generatedAt);
  return auraPaginateToPdf({
    css: auraBillCss(), width: 794, height: 1123, padT: 38, padB: 34, foot: 26, items: auraBillItems(d),
    headFirst: auraHeaderFull(d) + auraPatientBlock(d), headNext: function (n) { return auraHeaderCompact(d, n); },
    thead: auraTheadHtml(d), colgroup: auraColgroup(d), format: 'a4',
    footHtml: function (idx, n) {
      var left = d.kind === 'final' ? 'Computer-generated final bill &middot; ' + esc(d.billNo) + ' &middot; issued ' + esc(auraDateTime(d.issuedAt || d.generatedAt)) : 'Computer-generated interim bill &middot; ' + esc(d.admNo) + ' &middot; ' + esc(stamp);
      return '<div class="ab-foot"><span>' + left + ' &middot; AuraScale</span><span>Page ' + (idx + 1) + ' of ' + n + '</span></div>';
    }
  });
}

/* ---------- 4. receipt (one payment) ---------- */
async function auraReceiptData(paymentId) {
  var pr = await _supa.from('nh_payments').select('*').eq('id', paymentId).single();
  if (pr.error || !pr.data) throw new Error('Could not load this payment.');
  var d = await auraBillData(pr.data.admission_id), pay = pr.data;
  var upto = d.payments.filter(function (x) { return String(x.created_at || '') <= String(pay.created_at || '') ; });
  if (!upto.some(function (x) { return x.id === pay.id; })) upto.push(pay);
  var me = d.payments.filter(function (x) { return x.id === pay.id; })[0] || pay;
  var paidSoFar = auraRound2(upto.reduce(function (s, x) { return s + (Number(x.amount) || 0); }, 0));
  return { d: d, pay: me, paidSoFar: paidSoFar, balance: auraRound2(d.total - paidSoFar) };
}
function auraReceiptCss() {
  return auraBillCss()
    + '.rc-amt{margin:14px 0 4px;padding:14px;border:2px solid #12976A;border-radius:10px;background:#f4f8f6;text-align:center}.rc-amt b{display:block;font-size:30px;color:#0b4f3a;letter-spacing:.01em}.rc-amt span{font-size:11.5px;color:#4a5b53}'
    + '.rc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;margin-top:12px;font-size:12px}.rc-grid div{display:flex;flex-direction:column}.rc-grid .l{color:#6b7a73;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em}.rc-grid .v{font-weight:600;overflow-wrap:anywhere}'
    + '.rc-sum{margin-top:14px;border-top:1px solid #dbe7e1}.rc-sum .row{display:flex;justify-content:space-between;padding:6px 4px;border-bottom:1px solid #eef3f0;font-size:12.5px}.rc-sum .bal{font-weight:700;font-size:14.5px}'
    + '.rc-note{margin-top:12px;padding:8px 10px;border-radius:6px;background:#fff7e8;color:#8a5300;font-weight:700;text-align:center;font-size:12px}';
}
function auraReceiptHtml(r) {
  var d = r.d, p = r.pay, a = d.adm;
  var head = '<div class="ab-head"><div><div class="ab-clinic" style="font-size:19px">' + esc(d.clinic.name) + '</div>' + auraClinicLines(d) + '</div>'
    + '<div class="ab-title"><b style="font-size:16px">PAYMENT RECEIPT</b><span>Receipt No: <span class="no">' + esc(p.receipt_no || '-') + '</span></span><span>' + esc(auraDateTime(p.created_at) || auraBDate(p.payment_date)) + '</span></div></div>';
  var g = function (l, v) { return '<div><span class="l">' + l + '</span><span class="v">' + v + '</span></div>'; };
  var against = (d.kind === 'final' && d.bill && d.bill.final_bill_no) ? 'Final bill ' + esc(d.bill.final_bill_no) : 'Admission ' + esc(d.admNo);
  var body = '<div class="rc-amt"><span>Received with thanks from <b style="display:inline;font-size:12.5px;color:#14201b">' + esc(d.patient.name) + '</b></span><b>' + auraMoney2(p.amount) + '</b><span>' + esc(auraWords(p.amount)) + '</span></div>'
    + '<div class="rc-grid">' + g('Patient', esc(d.patient.name)) + g('UHID', esc(d.patient.uhid || '-'))
    + g('Admission No', esc(d.admNo)) + g('Against', against)
    + g('Payment mode', esc(p.method || '-')) + g('Transaction ref', esc(p.txn_id || (String(p.method || '').toLowerCase().indexOf('cash') >= 0 ? 'Cash' : '-')))
    + g('Received by', esc(p._by || p.received_by_name || '-')) + g('Date &amp; time', esc(auraDateTime(p.created_at) || auraBDate(p.payment_date))) + '</div>'
    + '<div class="rc-sum"><div class="row"><span>Total bill so far</span><span>' + auraMoney2(d.total) + '</span></div>'
    + '<div class="row"><span>Total paid so far (including this)</span><span>' + auraMoney2(r.paidSoFar) + '</span></div>'
    + '<div class="row bal" style="color:' + (r.balance > 0 ? '#b42318' : '#0f7a4f') + '"><span>' + (r.balance < 0 ? 'Paid in excess' : 'Balance remaining') + '</span><span>' + auraMoney2(Math.abs(r.balance)) + '</span></div></div>'
    + '<div class="rc-note">Payment receipt &middot; not the final bill</div>'
    + '<div class="ab-end" style="margin-top:14px"><div class="ab-decl" style="font-size:10.2px">This receipt only confirms the money received. ' + (d.kind === 'final' ? 'The final bill was issued at discharge.' : 'The final bill will be given at discharge.') + '</div>'
    + '<div class="ab-sign" style="width:190px">' + (d.signImg ? '<img src="' + d.signImg + '" alt="" style="max-height:56px">' : '<div class="sp" style="height:44px"></div>') + '<div class="ln">Authorised Signatory</div>' + (d.clinic.signatory ? '<div>' + esc(d.clinic.signatory) + '</div>' : '') + '</div></div>';
  return { head: head, body: body };
}
async function auraRenderReceiptPdf(r) {
  var h = auraReceiptHtml(r);
  return auraPaginateToPdf({
    css: auraReceiptCss(), width: 559, height: 794, padT: 30, padB: 30, foot: 22, format: 'a5',
    items: [{ t: 'body', html: h.body }], headFirst: h.head, headNext: function () { return h.head; }, thead: '', colgroup: '',
    footHtml: function () { return '<div class="ab-foot" style="left:30px;right:30px"><span>Computer-generated receipt &middot; ' + esc(r.pay.receipt_no || '') + ' &middot; AuraScale</span><span>' + esc(r.d.clinic.name) + '</span></div>'; }
  });
}
async function auraMakeReceipt(paymentId) {
  try {
    var r = await auraReceiptData(paymentId);
    var made = await auraRenderReceiptPdf(r);
    var path = r.d.clinicId + '/receipts/' + paymentId + '.pdf';
    var up = await _supa.storage.from(AURA_BILL_BUCKET).upload(path, made.blob, { contentType: 'application/pdf', upsert: true, cacheControl: '3600' });
    if (up.error) throw up.error;
    var s = await _supa.rpc('nh_set_receipt_pdf', { p_payment_id: paymentId, p_path: path });
    if (s.error && !auraNeedsSqlUpdate(s.error)) throw s.error;
    return { ok: true, path: path, receiptNo: r.pay.receipt_no || '' };
  } catch (e) { return { ok: false, error: auraFriendlyError(e, 'storage') }; }
}
async function auraDownloadReceipt(paymentId, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Opening…'; }
  try {
    var r = await _supa.from('nh_payments').select('receipt_pdf_path,receipt_no').eq('id', paymentId).maybeSingle();
    var path = r.data && r.data.receipt_pdf_path;
    if (!path) { var m = await auraMakeReceipt(paymentId); if (!m.ok) throw new Error(m.error); path = m.path; }
    await auraOpenSigned(path, 'Receipt-' + String((r.data && r.data.receipt_no) || 'payment').replace(/\//g, '-'), paymentId, true);
  } catch (e) { if (typeof showToast === 'function') showToast(auraFriendlyError(e, 'storage')); }
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
}

/* ---------- 5. build, number, lock, store, record ---------- */
function auraFriendlyError(e, where) {
  var m = String((e && e.message) || e || 'Unknown error');
  if (/BILL_LOCKED/i.test(m)) return 'The final bill of this patient is already issued and locked. Only the owner can cancel it to make a correction.';
  if (/NOT_DISCHARGED/i.test(m)) return 'The final bill is made only after discharge.';
  if (/GST_WITHOUT_GSTIN/i.test(m)) return 'This bill has GST on a room, but the nursing home has no valid GSTIN. Add it in Settings → Facility details.';
  if (/bucket not found/i.test(m)) return 'The private "bills" storage is not set up yet. Run the bills SQL file once, then try again.';
  if (where === 'table' && /does not exist|schema cache|could not find the table/i.test(m)) return 'The patient_bills table is not set up yet. Run the bills SQL file once, then try again.';
  if (/row-level security|violates|not authorized|permission|policy|unauthorized/i.test(m)) return 'No permission to save bills yet. Run the bills SQL file once (it adds the access rules), then try again.';
  return m;
}
async function auraSaveBillRow(d, path, extra) {
  var sg = await _supa.storage.from(AURA_BILL_BUCKET).createSignedUrl(path, AURA_BILL_LINK_SECONDS);
  if (sg.error || !sg.data) throw (sg.error || new Error('Could not make the link'));
  var row = { clinic_id: d.clinicId, admission_id: d.adm.id, patient_name: d.patient.name, patient_phone: d.patient.phone || null,
    total: d.total, paid: d.paid, due: d.due, pdf_path: path, pdf_url: sg.data.signedUrl || sg.data.signedURL, created_at: new Date().toISOString() };
  var ex = await _supa.from('patient_bills').select('id').eq('admission_id', d.adm.id).maybeSingle();
  if (ex.error && !/no rows/i.test(String(ex.error.message))) throw ex.error;
  var wr = (ex.data && ex.data.id) ? await _supa.from('patient_bills').update(row).eq('id', ex.data.id) : await _supa.from('patient_bills').insert(row);
  if (wr.error) throw wr.error;
  return row;
}
async function auraGenerateBill(admissionId, opts) {
  opts = opts || {};
  if (!admissionId) return { ok: false, error: 'No admission selected.' };
  if (_auraBillBusy[admissionId]) return { ok: false, error: 'A bill is already being made for this admission.' };
  _auraBillBusy[admissionId] = true;
  var stage = 'build';
  try {
    var d = await auraBillData(admissionId);
    var path = d.clinicId + '/' + admissionId + '.pdf';
    if (d.kind === 'final') {
      if (d.gstProblem) throw new Error('GST_WITHOUT_GSTIN');
      /* the database gives the number (or the one already given); it also checks the bill can be final */
      var iss = await _supa.rpc('nh_issue_final_bill', { p_admission_id: admissionId });
      if (iss.error && !auraNeedsSqlUpdate(iss.error)) throw iss.error;
      var info = iss.error ? null : (Array.isArray(iss.data) ? iss.data[0] : iss.data);
      if (info && info.bill_no) {
        d.billNo = info.bill_no; d.issuedAt = info.issued_at;
        if (info.final_pdf_path && !opts.rebuildMissing) {        /* already issued and stored: locked, never rebuilt */
          var keep = await auraSaveBillRow(d, info.final_pdf_path);
          return { ok: true, row: keep, billNo: d.billNo, pages: 0, locked: true, already: true, missingAddress: !d.clinic.address, hospital: d.clinic.name };
        }
        path = d.clinicId + '/final/' + admissionId + '-' + String(d.billNo).replace(/[^A-Za-z0-9-]+/g, '-') + '.pdf';
      } else {
        d.billNo = d.admNo;     /* SQL update not run yet: old style */
      }
    }
    var made = await auraRenderPdf(d);
    stage = 'storage';
    var up = await _supa.storage.from(AURA_BILL_BUCKET).upload(path, made.blob, { contentType: 'application/pdf', upsert: true, cacheControl: '3600' });
    if (up.error) throw up.error;
    stage = 'table';
    var row = await auraSaveBillRow(d, path);
    if (d.kind === 'final' && d.issuedAt) { var at = await _supa.rpc('nh_attach_final_pdf', { p_admission_id: admissionId, p_path: path }); if (at.error && !auraNeedsSqlUpdate(at.error)) throw at.error; }
    try { await _supa.from('nh_audit_log').insert({ clinic_id: d.clinicId, actor_id: (typeof _myUid !== 'undefined' ? _myUid : null), action: d.kind === 'final' ? 'final_bill_issued' : 'bill_generated', target_table: 'patient_bills', target_id: admissionId, details: { total: d.total, paid: d.paid, due: d.due, bill_no: d.billNo, title: auraDocTitle(d) } }); } catch (e) {}
    return { ok: true, row: row, billNo: d.billNo, pages: made.pages, locked: !!d.issuedAt, missingAddress: !d.clinic.address, hospital: d.clinic.name, title: auraDocTitle(d) };
  } catch (e) {
    return { ok: false, error: auraFriendlyError(e, stage) };
  } finally { delete _auraBillBusy[admissionId]; }
}
/* send the final bill to the patient on WhatsApp (server checks the patient's WhatsApp permission) */
async function auraSendFinalBill(admissionId, resend) {
  try {
    var n = await _supa.functions.invoke('patient-bills', { body: { mode: 'final', admission_id: admissionId, resend: !!resend } });
    if (n && n.error) {
      var why = 'server_error';
      try { var ctx = n.error.context; if (ctx && typeof ctx.json === 'function') { var j = await ctx.json(); if (j && j.reason) why = j.reason; } } catch (e2) {}
      return { sent: false, reason: why };
    }
    var d = (n && n.data) || {};
    return { sent: !!d.sent, reason: d.reason || '' };
  } catch (e) { return { sent: false, reason: 'network' }; }
}
/* plain words for why the WhatsApp bill did or did not go */
function auraSendResultText(s) {
  if (s && s.sent) return 'Final bill sent to the patient on WhatsApp.';
  var m = {
    patient_not_agreed: 'the patient has not tapped "Yes" to receive WhatsApp messages yet',
    no_patient_phone: 'no WhatsApp number is saved for this patient',
    final_bill_not_ready: 'the final bill PDF is not ready yet (tap Generate Bill first)',
    already_sent: 'it was already sent earlier',
    not_configured: 'WhatsApp bill sending is not set up on the server (MAKE_BILL_WEBHOOK_URL)',
    webhook_error: 'the WhatsApp service (Make) did not accept it',
    pdf_missing: 'the bill PDF file is missing (tap Generate Bill again)',
    not_signed_in: 'your login has expired, please log in again',
    not_your_facility: 'this bill belongs to another facility',
    network: 'no internet connection'
  };
  return 'WhatsApp bill NOT sent: ' + (m[s && s.reason] || ('reason ' + ((s && s.reason) || 'unknown'))) + '.';
}
async function auraSendFinalBillClick(admId, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }
  var s = await auraSendFinalBill(admId, true);
  if (typeof showToast === 'function') showToast(auraSendResultText(s));
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
}
async function auraSendAfterIssue(admId) {
  var s = await auraSendFinalBill(admId, false);
  if (typeof showToast === 'function') setTimeout(function () { showToast(auraSendResultText(s)); }, 2500);
}
/* Used right after a discharge: never throws, never blocks, only tells the user what happened. */
async function auraGenerateBillAuto(admissionId) {
  try {
    var r = await auraGenerateBill(admissionId);
    if (typeof showToast === 'function') showToast(r.ok ? (r.locked ? 'Final bill ' + r.billNo + ' issued and locked. ' : 'Final bill saved. ') + auraWhereToFind() + auraAddressHint(r) : 'Discharged, but the bill was not saved: ' + r.error + ' (use Generate Bill to try again)');
    if (r.ok && r.locked && !r.already) auraSendAfterIssue(admissionId);
    auraAfterBill();
  } catch (e) { /* a bill problem must never disturb a discharge */ }
}

/* ---------- 6. buttons ---------- */
function auraIsOwnerHere() { try { return typeof _myRole !== 'undefined' && _myRole === 'owner'; } catch (e) { return false; } }
function auraBillButtonsHtml(admId, bill, compact) {
  var q = esc(admId), locked = !!(bill && bill.final_bill_no);
  var dl = '<button class="qbtn" style="background:var(--green-bg);border-color:var(--green-border);color:var(--green)" onclick="auraDownloadBill(\'' + q + '\',this)">&#11015; ' + esc(auraT('bt_download', 'Download bill')) + '</button>'
    + '<button class="qbtn" title="Item-wise GST / tax of this bill" onclick="auraShowTaxBreakdown(\'' + q + '\',this)">&#129534; GST / tax</button>';
  if (bill && compact === '2') return dl;
  if (bill && locked) {
    return dl + (compact === '1' ? '' : '<span style="font-size:10.5px;color:var(--text-tertiary);align-self:center">&#128274; ' + esc(auraT('bt_locked', 'Final bill')) + ' ' + esc(bill.final_bill_no) + ' &middot; ' + esc(auraT('bt_balance', 'Balance')) + ' ' + esc(auraBMoney(bill.due)) + '</span>')
      + '<button class="qbtn" style="background:#e7f8ef;border-color:#9fdcbc;color:#0b6b4c" title="Send this final bill to the patient on WhatsApp" onclick="auraSendFinalBillClick(\'' + q + '\',this)">&#128242; ' + esc(auraT('bt_sendwa', 'Send on WhatsApp')) + '</button>'
      + (auraIsOwnerHere() ? '<button class="qbtn" style="color:var(--red)" title="Cancel this final bill to correct a mistake. A new bill number will be given." onclick="auraCancelFinalBill(\'' + q + '\',this)">' + esc(auraT('bt_cancel', 'Cancel bill')) + '</button>' : '');
  }
  if (bill) {
    return dl + '<button class="qbtn" title="Rebuild the bill with the latest charges and payments" onclick="auraGenerateBillClick(\'' + q + '\',this)">&#8635; ' + esc(auraT('bt_regenerate', 'Regenerate')) + '</button>'
      + (compact === '1' ? '' : '<span style="font-size:10.5px;color:var(--text-tertiary);align-self:center">' + esc(auraT('bt_saved', 'Saved')) + ' ' + esc(auraDateTime(bill.created_at)) + ' &middot; ' + esc(auraT('bt_balance', 'Balance')) + ' ' + esc(auraBMoney(bill.due)) + '</span>');
  }
  return '<button class="qbtn" style="background:var(--blue-bg);border-color:var(--blue-border);color:var(--blue)" onclick="auraGenerateBillClick(\'' + q + '\',this)">&#128196; ' + esc(auraT('bt_generate', 'Generate Bill')) + '</button>'
    + '<button class="qbtn" title="Item-wise GST / tax of this bill" onclick="auraShowTaxBreakdown(\'' + q + '\',this)">&#129534; GST / tax</button>';
}
/* ---------- 7. GST / tax breakdown on screen (same numbers as the bill; works on a phone) ---------- */
function auraTaxCssOnce() {
  if (document.getElementById('aura-tax-css')) return;
  var st = document.createElement('style'); st.id = 'aura-tax-css';
  st.textContent = '.atx-ov{position:fixed;inset:0;z-index:99960;background:rgba(10,20,15,.55);display:flex;align-items:flex-end;justify-content:center}'
    + '@media (min-width:700px){.atx-ov{align-items:center}}'
    + '.atx{background:var(--surface,#fff);color:var(--text-primary,#14201b);width:min(760px,100%);max-height:92vh;overflow:auto;border-radius:18px 18px 0 0;box-shadow:0 20px 60px rgba(0,0,0,.25)}'
    + '@media (min-width:700px){.atx{border-radius:18px}}'
    + '.atx-h{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--border,#e3ebe7);position:sticky;top:0;background:inherit}'
    + '.atx-h b{font-size:15px}.atx-h button{border:1px solid var(--border,#e3ebe7);background:var(--surface,#fff);color:inherit;border-radius:10px;width:36px;height:36px;font-size:16px;cursor:pointer}'
    + '.atx-b{padding:12px 16px 18px}.atx-l{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;padding:10px 0;border-bottom:1px solid var(--border,#e3ebe7);font-size:13px}'
    + '.atx-l .n{font-weight:700;overflow-wrap:anywhere}.atx-l .s{grid-column:1 / -1;font-size:11.5px;color:var(--text-tertiary,#6b7a73)}.atx-l .a{text-align:right;font-weight:700;white-space:nowrap}'
    + '.atx-l .t{grid-column:1 / -1;font-size:11.5px;color:var(--text-secondary,#4a5b53)}'
    + '.atx-chip{display:inline-block;padding:1px 7px;border-radius:999px;font-size:10.5px;font-weight:800;margin-left:4px}.atx-chip.ex{background:#eef6f2;color:#0b6b4a}.atx-chip.tx{background:#fff4e0;color:#9a5b00}.atx-chip.pd{background:#f1f1f1;color:#555}'
    + '.atx-sum{margin-top:12px;border:1px solid var(--border,#e3ebe7);border-radius:12px;padding:6px 12px;background:var(--surface2,#f6faf8)}'
    + '.atx-sum .row{display:flex;justify-content:space-between;gap:10px;padding:5px 0;font-size:13px}.atx-sum .sm{font-size:12px;color:var(--text-secondary,#4a5b53)}'
    + '.atx-sum .grand{font-weight:800;font-size:15px;border-top:1px solid var(--border,#e3ebe7);margin-top:4px;padding-top:8px}'
    + '.atx-note{font-size:11.5px;color:var(--text-tertiary,#6b7a73);margin-top:10px;line-height:1.5}';
  document.head.appendChild(st);
}
async function auraShowTaxBreakdown(admId, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Loading…'; }
  try {
    var d = await auraBillData(admId), T = d.tax;
    auraTaxCssOnce();
    var ov = document.createElement('div'); ov.className = 'atx-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'GST / tax breakdown');
    var rows = T.lines.map(function (l) {
      var c = l.c, chip = l.tax > 0 ? '<span class="atx-chip tx">GST ' + auraPct(l.rate) + '</span>' : l.treatment === 'no_rule' ? '<span class="atx-chip pd">Rule pending</span>' : l.treatment === 'not_registered' ? '<span class="atx-chip pd">GST not charged</span>' : '<span class="atx-chip ex">GST Exempt</span>';
      return '<div class="atx-l"><div class="n">' + esc(c.description || c.charge_type || '') + chip + '</div><div class="a">' + auraMoney2(l.total) + '</div>'
        + '<div class="s">' + esc([c.charge_type, l.hsn ? 'HSN/SAC ' + l.hsn : '', l.cls].filter(Boolean).join(' · ')) + '</div><div class="t">'
        + (l.tax > 0 ? 'Taxable ' + auraMoney2(l.taxable) + (l.igst ? ' + IGST ' + auraMoney2(l.igst) : ' + CGST ' + auraMoney2(l.cgst) + ' + SGST ' + auraMoney2(l.sgst)) : 'Tax ₹0') + '</div></div>';
    }).join('') || '<p class="atx-note">No charges yet.</p>';
    var sum = T.show ? auraTaxSummaryHtml(d, 'atx-sum').replace(/^<div class="atx-sum">/, '<div class="atx-sum">') + '<div class="row grand"><span>Grand total</span><span>' + auraMoney2(d.total) + '</span></div></div>'
      : '<div class="atx-sum"><div class="row"><span>Total of charges</span><span>' + auraMoney2(d.chargesTotal) + '</span></div><div class="row sm"><span>No GSTIN saved: no GST is charged on this bill.</span></div><div class="row grand"><span>Bill amount</span><span>' + auraMoney2(d.total) + '</span></div></div>';
    ov.innerHTML = '<div class="atx"><div class="atx-h"><b>GST / tax &middot; ' + esc(d.patient.name) + '</b><button type="button" aria-label="Close">&#10005;</button></div><div class="atx-b">' + rows + sum
      + '<p class="atx-note">AuraScale works out GST by itself from the verified Tax Master rules (class of each item, rule valid on the charge date). Nobody types a GST rate. '
      + (T.pending ? '<b>' + T.pending + ' line' + (T.pending === 1 ? ' has' : 's have') + ' no verified rule yet</b> (no GST charged on ' + (T.pending === 1 ? 'it' : 'them') + '). ' : '')
      + 'This is the same breakdown that prints on the bill.</p></div></div>';
    var close = function () { ov.remove(); };
    ov.querySelector('.atx-h button').onclick = close; ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.body.appendChild(ov);
  } catch (e) { if (typeof showToast === 'function') showToast(auraFriendlyError(e)); }
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
}
async function auraMountBillActions(root) {
  var els = [].slice.call((root || document).querySelectorAll('[data-bill-actions]'));
  if (!els.length) return;
  var ids = []; els.forEach(function (e) { var v = e.getAttribute('data-bill-actions'); if (v && ids.indexOf(v) < 0) ids.push(v); });
  var map = {};
  try {
    var r = await _supa.from('patient_bills').select('admission_id,created_at,total,paid,due,final_bill_no').in('admission_id', ids);
    if (r.error) r = await _supa.from('patient_bills').select('admission_id,created_at,total,paid,due').in('admission_id', ids);
    (r.data || []).forEach(function (b) { map[b.admission_id] = b; });
  } catch (e) {}
  els.forEach(function (e) { var id = e.getAttribute('data-bill-actions'); e.style.cssText = 'display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap'; e.innerHTML = auraBillButtonsHtml(id, map[id], e.getAttribute('data-compact')); });
}
function auraAfterBill() { try { auraMountBillActions(document); } catch (e) {} }
async function auraGenerateBillClick(admId, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Making the bill…'; }
  var r = await auraGenerateBill(admId);
  if (typeof showToast === 'function') showToast(r.ok ? (r.locked ? 'Final bill ' + r.billNo + (r.already ? ' is already issued (locked).' : ' issued and locked.') : 'Bill saved (' + r.pages + (r.pages > 1 ? ' pages' : ' page') + ').') + ' Tap Download bill.' + auraAddressHint(r) : r.error);
  if (r.ok && r.locked && !r.already) auraSendAfterIssue(admId);
  if (btn && !r.ok) { btn.disabled = false; btn.innerHTML = old; }
  auraAfterBill();
}
async function auraCancelFinalBill(admId, btn) {
  var reason = window.prompt('Cancel this final bill?\n\nUse this only to correct a mistake. The cancelled bill stays on record, the charges unlock, and the corrected bill gets a NEW number.\n\nType the reason:');
  if (reason === null) return;
  reason = String(reason).trim(); if (reason.length < 3) { if (typeof showToast === 'function') showToast('Please type a short reason (at least 3 letters).'); return; }
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Cancelling…'; }
  var r = await _supa.rpc('nh_cancel_final_bill', { p_admission_id: admId, p_reason: reason });
  if (typeof showToast === 'function') showToast(r.error ? auraFriendlyError(r.error) : 'Bill cancelled. Correct the charges, then tap Generate Bill for the new final bill.');
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
  auraAfterBill(); try { if (typeof loadBillsPage === 'function' && document.getElementById('v-bills') && document.getElementById('v-bills').classList.contains('on')) loadBillsPage(); } catch (e) {}
}
async function auraOpenSigned(path, patientName, fallbackId, isFileName) {
  var safe = isFileName ? String(patientName || 'document').replace(/[^A-Za-z0-9-]+/g, '-') : 'Bill-' + (String(patientName || '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || String(fallbackId || 'bill').slice(0, 8));
  var s = await _supa.storage.from(AURA_BILL_BUCKET).createSignedUrl(path, 3600, { download: safe + '.pdf' });
  if (s.error || !s.data) throw (s.error || new Error('Could not open the bill'));
  var a = document.createElement('a'); a.href = s.data.signedUrl || s.data.signedURL; a.download = safe + '.pdf'; a.rel = 'noopener'; a.target = '_blank';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
async function auraDownloadBill(admId, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Opening…'; }
  try {
    var r = await _supa.from('patient_bills').select('*').eq('admission_id', admId).maybeSingle();
    if (!r.data) throw new Error('No saved bill yet. Tap Generate Bill first.');
    var path = r.data.final_pdf_path || r.data.pdf_path;
    await auraOpenSigned(path, r.data.final_bill_no ? 'Bill-' + String(r.data.final_bill_no).replace(/\//g, '-') : r.data.patient_name, admId, !!r.data.final_bill_no);
  } catch (e) { if (typeof showToast === 'function') showToast(auraFriendlyError(e, 'storage')); }
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
}
async function auraDownloadPath(path, patientName, btn) {
  var old = btn ? btn.innerHTML : ''; if (btn) { btn.disabled = true; btn.innerHTML = 'Opening…'; }
  try { await auraOpenSigned(path, patientName, 'bill'); } catch (e) { if (typeof showToast === 'function') showToast(auraFriendlyError(e, 'storage')); }
  if (btn) { btn.disabled = false; btn.innerHTML = old; }
}


/* ---------- 8. "Add charge" box (reception): shows what tax AuraScale will apply. Read-only: the database decides on save. ---------- */
(function () {
  var T = null, seq = 0;
  function el(id) { return document.getElementById(id); }
  function box() {
    var tot = el('exp-total'), qty = el('exp-qty'), typ = el('exp-type');
    if (!tot || !qty || !typ) return null;
    var b = el('exp-tax');
    if (!b) {
      b = document.createElement('div'); b.id = 'exp-tax'; b.setAttribute('aria-live', 'polite');
      b.style.cssText = 'display:none;margin-top:8px;padding:9px 11px;border-radius:10px;font-size:12px;line-height:1.45;border:1px solid var(--border);background:var(--surface2)';
      var grid = tot.closest('.rx-3') || tot.parentNode; grid.parentNode.insertBefore(b, grid.nextSibling);
    }
    return b;
  }
  async function run() {
    var b = box(); if (!b || typeof _supa === 'undefined') return;
    var adm = (typeof _bpAdmId !== 'undefined' && _bpAdmId) ? _bpAdmId : null;
    var price = Number((el('exp-price') || {}).value || 0), qty = Number((el('exp-qty') || {}).value || 1);
    if (!adm || !(price > 0)) { b.style.display = 'none'; return; }
    var my = ++seq;
    var r = await _supa.rpc('nh_tax_preview', { p_admission_id: adm, p_charge_type: (el('exp-type') || {}).value || '', p_description: (el('exp-desc') || {}).value || '',
      p_unit_price: price, p_quantity: qty || 1, p_stock_item_id: ((el('exp-stock') || {}).value) || null, p_date: ((el('exp-date') || {}).value) || null });
    if (my !== seq) return;
    if (r.error || !r.data) { b.style.display = 'none'; return; }
    var t = r.data, money = function (n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
    var name = esc(t.class_name || 'Charge') + (t.hsn_sac ? ' · HSN/SAC ' + esc(t.hsn_sac) : '');
    if (t.treatment === 'taxable' && Number(t.tax) > 0) {
      b.style.background = '#FFF4E0'; b.style.borderColor = '#F3D49B'; b.style.color = '#7A4600';
      b.innerHTML = '<b>GST ' + esc(auraPct(t.rate)) + ' will be added automatically: ' + money(t.tax) + '</b> (CGST ' + money(t.cgst) + ' + SGST ' + money(t.sgst) + ')<br>' + name;
    } else if (t.treatment === 'no_rule') {
      b.style.background = ''; b.style.borderColor = ''; b.style.color = '';
      b.innerHTML = '<b>No verified tax rule yet</b> for ' + name + '. No GST will be charged.';
    } else if (t.treatment === 'not_registered') {
      b.style.background = ''; b.style.borderColor = ''; b.style.color = '';
      b.innerHTML = '<b>No GST</b> (no GSTIN saved for this nursing home) · ' + name;
    } else {
      b.style.background = '#E6F6EE'; b.style.borderColor = '#BFE6D2'; b.style.color = '#0F5E3D';
      b.innerHTML = '<b>GST Exempt</b> · ' + name;
    }
    b.style.display = 'block';
  }
  function soon() { clearTimeout(T); T = setTimeout(run, 350); }
  function wire() {
    if (!box()) return;
    ['exp-type', 'exp-qty', 'exp-price', 'exp-stock', 'exp-date', 'exp-desc'].forEach(function (id) {
      var x = el(id); if (x && !x.__atx) { x.addEventListener('input', soon); x.addEventListener('change', soon); x.__atx = true; }
    });
    if (typeof window.expPickStock === 'function' && !window.expPickStock.__atx) { var o = window.expPickStock; window.expPickStock = function () { var r = o.apply(this, arguments); soon(); return r; }; window.expPickStock.__atx = true; }
    var m = el('mod-expense');
    if (m && !m.__atx && window.MutationObserver) { m.__atx = true; new MutationObserver(function () { if (m.classList.contains('open')) soon(); else { var b = el('exp-tax'); if (b) b.style.display = 'none'; } }).observe(m, { attributes: true, attributeFilter: ['class'] }); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
  window.addEventListener('load', wire);
  window.auraTaxPreviewRefresh = soon;
})();
