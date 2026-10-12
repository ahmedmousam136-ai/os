/* AuraScale departments (Pharmacy, Lab): shared screen frame, PDF maker, WhatsApp, patient lookup.
   Used by pharmacy.html and lab.html. Needs nh-shared.js (login, _supa, esc, showToast) loaded first. */

var DEPT = { clinic: null, module: null, role: null, admissions: [] };

(function injectDeptCss() {
  var css = ''
  + '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}'
  + ':root{--bg:#F7F6F3;--surface:#FFF;--surface2:#FAFAF8;--border:#E8E5DF;--border-mid:#D2CEC6;--text-primary:#18170F;--text-secondary:#64605A;--text-tertiary:#9E9A93;'
  + '--blue:#2E63D4;--blue-bg:#EDF2FC;--blue-border:#BDD0F7;--green:#12976A;--green-bg:#EAFAF3;--green-border:#9ADEC3;--amber:#C27820;--amber-bg:#FDF4E6;--amber-border:#F0CEAA;'
  + '--red:#C23838;--red-bg:#FDF0F0;--red-border:#F2B8B8;--r-sm:8px;--r-md:12px;--r-lg:16px;--sh-xs:0 1px 3px rgba(0,0,0,.05);--sh-lg:0 12px 42px rgba(0,0,0,.13)}'
  + '[data-theme="dark"]{--bg:#0F1117;--surface:#171B24;--surface2:#1C2130;--border:#252A38;--border-mid:#2E3448;--text-primary:#E8E9EF;--text-secondary:#8E96B0;--text-tertiary:#525A72;'
  + '--blue:#4D85F0;--blue-bg:#1A243D;--blue-border:#2A3A5C;--green:#1BB880;--green-bg:#0E2A1F;--green-border:#1A4A35;--amber:#E09940;--amber-bg:#271E0E;--amber-border:#3D2E10;--red:#E05050;--red-bg:#250F0F;--red-border:#3D1A1A}'
  + 'html,body{background:var(--bg);color:var(--text-primary);font-family:"DM Sans",system-ui,sans-serif;font-size:14px;line-height:1.5;-webkit-text-size-adjust:100%}'
  + 'button{font-family:inherit;cursor:pointer;border:none;background:none}input,select,textarea{font-family:inherit;font-size:14px;color:var(--text-primary)}'
  + '#loading{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);z-index:200;gap:12px}'
  + '.spin{width:28px;height:28px;border:2.5px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}'
  + '.d-top{position:sticky;top:0;z-index:30;background:var(--surface);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}'
  + '.d-back{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--text-secondary);padding:7px 10px;border:1px solid var(--border);border-radius:8px;background:var(--bg);text-decoration:none}'
  + '.d-title{font-family:"Instrument Serif",serif;font-size:21px}.d-sub{font-size:11.5px;color:var(--text-tertiary);font-weight:600}'
  + '.d-tabs{display:flex;gap:4px;overflow-x:auto;padding:10px 16px 0;max-width:1200px;margin:0 auto}'
  + '.d-tab{padding:9px 14px;font-size:13px;font-weight:600;color:var(--text-secondary);border-radius:9px 9px 0 0;white-space:nowrap;border:1px solid transparent;border-bottom:none}'
  + '.d-tab.on{background:var(--surface);color:var(--text-primary);border-color:var(--border)}'
  + '.d-main{max-width:1200px;margin:0 auto;padding:0 16px 40px}.d-view{display:none;background:var(--surface);border:1px solid var(--border);border-radius:0 var(--r-lg) var(--r-lg) var(--r-lg);padding:16px;box-shadow:var(--sh-xs)}.d-view.on{display:block}'
  + '.flbl{display:block;font-size:11.5px;font-weight:700;color:var(--text-secondary);margin:0 0 4px}'
  + '.finput{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:9px;padding:10px 11px;font-size:14px;outline:none}.finput:focus{border-color:var(--blue);background:var(--surface)}'
  + 'select.finput{-webkit-appearance:none;appearance:none}'
  + '.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}'
  + '@media(max-width:720px){.grid3,.grid4{grid-template-columns:1fr 1fr}}@media(max-width:460px){.grid2,.grid3,.grid4{grid-template-columns:1fr}}'
  + '.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 16px;border-radius:9px;font-size:13px;font-weight:700;min-height:40px;border:1px solid var(--border);background:var(--surface);color:var(--text-primary)}'
  + '.btn-p{background:var(--blue);color:#fff;border-color:var(--blue)}.btn-g{background:var(--green);color:#fff;border-color:var(--green)}.btn-r{color:var(--red);border-color:var(--red-border);background:var(--red-bg)}'
  + '.btn:disabled{opacity:.55;cursor:not-allowed}.btn-sm{padding:6px 10px;min-height:30px;font-size:11.5px}'
  + '.seg{display:inline-flex;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:3px;gap:3px}.seg button{padding:8px 14px;border-radius:8px;font-size:13px;font-weight:600;color:var(--text-secondary)}.seg button.on{background:var(--surface);color:var(--text-primary);box-shadow:var(--sh-xs)}'
  + 'table.dt{width:100%;border-collapse:collapse;font-size:13px}table.dt th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--text-tertiary);padding:8px 6px;border-bottom:1px solid var(--border)}'
  + 'table.dt td{padding:9px 6px;border-bottom:1px solid var(--border);vertical-align:middle}table.dt td.r,table.dt th.r{text-align:right}'
  + '.tag{display:inline-flex;padding:2px 7px;border-radius:5px;font-size:10.5px;font-weight:700}.t-g{background:var(--green-bg);color:var(--green)}.t-a{background:var(--amber-bg);color:var(--amber)}.t-r{background:var(--red-bg);color:var(--red)}.t-b{background:var(--blue-bg);color:var(--blue)}'
  + '.card{border:1px solid var(--border);border-radius:var(--r-md);padding:14px;background:var(--surface2)}.muted{color:var(--text-secondary);font-size:12.5px}.tiny{font-size:11.5px;color:var(--text-tertiary)}'
  + '.sum-row{display:flex;justify-content:space-between;padding:4px 0;font-size:13.5px}.sum-row.big{font-size:19px;font-weight:800;border-top:1px solid var(--border);margin-top:6px;padding-top:9px}'
  + '.dd{position:absolute;left:0;right:0;top:100%;z-index:20;background:var(--surface);border:1px solid var(--border-mid);border-radius:10px;box-shadow:var(--sh-lg);max-height:320px;overflow-y:auto;margin-top:4px}'
  + '.dd-i{padding:10px 12px;border-bottom:1px solid var(--border);cursor:pointer}.dd-i:hover,.dd-i.hl{background:var(--blue-bg)}'
  + '.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;display:none;align-items:flex-start;justify-content:center;padding:30px 12px;overflow-y:auto}.modal-bg.open{display:flex}'
  + '.modal{background:var(--surface);border-radius:var(--r-lg);width:100%;max-width:640px;box-shadow:var(--sh-lg)}.modal-h{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border);font-weight:700}.modal-b{padding:16px}'
  + '.stat{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}@media(max-width:720px){.stat{grid-template-columns:1fr 1fr}}.stat>div{border:1px solid var(--border);border-radius:12px;padding:12px;background:var(--surface2)}.stat b{display:block;font-size:19px;margin-top:2px}'
  + '.err{background:var(--red-bg);color:var(--red);border:1px solid var(--red-border);border-radius:9px;padding:9px 12px;font-size:13px;margin-top:10px;display:none}'
  + '.note{background:var(--amber-bg);border:1px solid var(--amber-border);color:var(--amber);border-radius:10px;padding:10px 12px;font-size:12.5px;margin-bottom:12px}'
  + '#nh-toast{display:none;position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#18170F;color:#fff;padding:11px 18px;border-radius:10px;font-size:13px;z-index:300;max-width:92vw;box-shadow:var(--sh-lg)}#nh-toast.show{display:block}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();

/* ---------- small helpers ---------- */
function dMoney(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function dMoney0(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
function dDate(d) { if (!d) return ''; var x = new Date(d); return isNaN(x) ? '' : x.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }); }
function dDateTime(d) { if (!d) return ''; var x = new Date(d); return isNaN(x) ? '' : x.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }); }
function dExp(d) { if (!d) return '-'; var x = new Date(d + 'T00:00:00'); return isNaN(x) ? '-' : ('0' + (x.getMonth() + 1)).slice(-2) + '/' + String(x.getFullYear()).slice(-2); }
function dTodayIST() { return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10); }
function dDaysTo(d) { if (!d) return 99999; return Math.floor((new Date(d + 'T00:00:00') - new Date(dTodayIST() + 'T00:00:00')) / 86400000); }
function dErr(e) {
  var m = (e && (e.message || e.details || e.hint)) || String(e || 'Something went wrong');
  return m.replace(/^(MODULE_OFF|NO_STOCK|DUPLICATE|GSTIN_INVALID|DUE|BILL_LOCKED|GST_MANUAL):\s*/, '');
}
function dMobile(p) { var d = String(p || '').replace(/\D/g, ''); if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2); else if (d.length === 11 && d[0] === '0') d = d.slice(1); return /^[6-9]\d{9}$/.test(d) ? d : ''; }
function dEl(id) { return document.getElementById(id); }
function dShowErr(id, msg) { var e = dEl(id); if (!e) { showToast(msg); return; } e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; }
function dOpen(id) { dEl(id).classList.add('open'); }
function dClose(id) { dEl(id).classList.remove('open'); }
function dTab(name) {
  [].forEach.call(document.querySelectorAll('.d-tab'), function (b) { b.classList.toggle('on', b.getAttribute('data-t') === name); });
  [].forEach.call(document.querySelectorAll('.d-view'), function (v) { v.classList.toggle('on', v.id === 'v-' + name); });
  try { localStorage.setItem('aura-dept-tab-' + DEPT.module, name); } catch (e) {}
  if (typeof window['onTab_' + name] === 'function') window['onTab_' + name]();
}
function dIsOwner() { return DEPT.role === 'owner'; }

/* ---------- start: login, module switched on? ---------- */
async function deptInit(module, title) {
  DEPT.module = module;
  try { if (localStorage.getItem('nh-theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {}
  var g = await nhAuthGuard(null); if (!g) return false;
  DEPT.role = g.role;
  if (['owner', 'receptionist', 'pharmacist', 'lab'].indexOf(g.role) < 0) { location.href = g.role === 'doctor' ? 'doctor.html' : 'nh.html'; return false; }
  var c = await _supa.from('clinics').select('*').eq('id', _clinicId).maybeSingle();
  DEPT.clinic = c.data || {};
  var back = g.role === 'owner' ? 'nh.html' : 'receptionist.html';
  dEl('d-back').href = back;
  dEl('d-fac').textContent = DEPT.clinic.name || g.facilityName || '';
  dEl('loading').style.display = 'none';
  dEl('app').style.display = 'block';
  var on = module === 'pharmacy' ? DEPT.clinic.mod_pharmacy : DEPT.clinic.mod_lab;
  if (!on) {
    dEl('d-body').innerHTML = '<div class="d-view on" style="border-radius:var(--r-lg);text-align:center;padding:40px 16px"><div style="font-size:40px">&#128274;</div>'
      + '<h2 style="margin:10px 0 6px">' + esc(title) + ' is not active for your nursing home</h2>'
      + '<p class="muted" style="max-width:420px;margin:0 auto 16px">This is an extra module. Contact AuraScale to switch it on for your account.</p>'
      + '<a class="btn btn-g" target="_blank" href="https://wa.me/918017465987?text=' + encodeURIComponent('Hi AuraScale, I want the ' + title + ' module for ' + (DEPT.clinic.name || 'my nursing home') + '.') + '">&#128242; WhatsApp AuraScale</a>'
      + ' <a class="btn" href="' + back + '">Back</a></div>';
    dEl('d-tabs').style.display = 'none';
    return false;
  }
  [].forEach.call(document.querySelectorAll('[data-owner-only]'), function (el) { if (!dIsOwner()) el.style.display = 'none'; });
  return true;
}

/* ---------- admitted patients (for "Admitted patient" bills) ---------- */
async function deptLoadAdmissions() {
  var r = await _supa.from('admissions').select('*').eq('clinic_id', _clinicId).eq('status', 'Active').order('admission_date', { ascending: false });
  var rows = r.data || [];
  var bedIds = rows.map(function (a) { return a.bed_id; }).filter(Boolean), beds = {};
  if (bedIds.length) {
    var b = await _supa.from('beds').select('id,bed_number,ward').in('id', bedIds);
    (b.data || []).forEach(function (x) { beds[x.id] = x; });
  }
  rows.forEach(function (a) { var b = beds[a.bed_id]; a._bed = b ? ((b.ward ? b.ward + ' · ' : '') + 'Bed ' + b.bed_number) : ''; });
  DEPT.admissions = rows;
  return rows;
}
function deptAdmissionOptions() {
  if (!DEPT.admissions.length) return '<option value="">No admitted patients right now</option>';
  return '<option value="">Choose the admitted patient&hellip;</option>' + DEPT.admissions.map(function (a) {
    return '<option value="' + esc(a.id) + '">' + esc(a.patient_name || '') + (a._bed ? ' — ' + esc(a._bed) : '') + (a.uhid ? ' (' + esc(a.uhid) + ')' : '') + '</option>';
  }).join('');
}

/* ---------- find a saved patient by UHID or mobile (to put reports in their health book) ---------- */
async function deptFindPatient(q) {
  q = String(q || '').trim(); if (q.length < 3) return [];
  var digits = q.replace(/\D/g, '');
  var req = _supa.from('nh_patients').select('*').eq('clinic_id', _clinicId).limit(8);
  if (/^\d{10,12}$/.test(digits) && digits.length === q.replace(/[\s+\-]/g, '').length) req = req.ilike('phone', '%' + digits.slice(-10) + '%');
  else req = req.or('uhid.ilike.%' + q.replace(/[%,()]/g, '') + '%,full_name.ilike.%' + q.replace(/[%,()]/g, '') + '%');
  var r = await req; return r.data || [];
}

/* ---------- PDF ---------- */
function deptLoadLibs() {
  function load(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = function () { rej(new Error('Could not load ' + src)); }; document.head.appendChild(s); }); }
  var p = [];
  if (!window.html2canvas) p.push(load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'));
  if (!(window.jspdf && window.jspdf.jsPDF)) p.push(load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'));
  return Promise.all(p);
}
/* o: { format:'a4'|'a5', head: html (every page), rows: [html <tr>], thead: html, colgroup, after: html (totals, once at end), foot: html (every page bottom), css } */
async function deptMakePdf(o) {
  await deptLoadLibs();
  var W = o.format === 'a5' ? 559 : 794, H = o.format === 'a5' ? 794 : 1123, PAD = 34;
  var host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-14000px;top:0;width:' + W + 'px;background:#fff;pointer-events:none';
  var baseCss = '.pg{position:relative;width:' + W + 'px;height:' + H + 'px;padding:' + PAD + 'px;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;overflow:hidden}'
    + '.pg table.it{width:100%;border-collapse:collapse;margin-top:8px}.pg table.it th{background:#F1F5F3;font-size:10.5px;text-align:left;padding:6px 5px;border-bottom:1.5px solid #333}'
    + '.pg table.it td{padding:5px;border-bottom:1px solid #ddd;font-size:11.5px;vertical-align:top}.pg .r{text-align:right}.pg .c{text-align:center}'
    + '.pg .foot{position:absolute;left:' + PAD + 'px;right:' + PAD + 'px;bottom:18px;font-size:9.5px;color:#666;border-top:1px solid #ccc;padding-top:5px;display:flex;justify-content:space-between}';
  host.innerHTML = '<style>' + baseCss + (o.css || '') + '</style>';
  document.body.appendChild(host);
  try {
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    var meas = document.createElement('div'); meas.className = 'pg'; meas.style.height = 'auto'; host.appendChild(meas);
    function h(html, row) { meas.innerHTML = row ? '<table class="it">' + (o.colgroup || '') + '<tbody>' + html + '</tbody></table>' : html; return meas.scrollHeight - PAD * 2; }
    var hHead = h(o.head), hThead = o.thead ? h('<table class="it">' + (o.colgroup || '') + o.thead + '</table>') : 0, hAfter = o.after ? h(o.after) : 0;
    var avail = H - PAD * 2 - 40;
    var pages = [], cur = [], used = hHead + hThead;
    (o.rows || []).forEach(function (r) {
      var rh = h(r, true) - 4;
      if (cur.length && used + rh > avail) { pages.push(cur); cur = []; used = hHead + hThead; }
      cur.push(r); used += rh;
    });
    var afterOwnPage = used + hAfter > avail && cur.length > 0;
    pages.push(cur);
    if (afterOwnPage) pages.push([]);
    host.removeChild(meas);
    var n = pages.length, out = document.createElement('div'); host.appendChild(out);
    out.innerHTML = pages.map(function (rows, i) {
      var tbl = rows.length ? '<table class="it">' + (o.colgroup || '') + (o.thead || '') + '<tbody>' + rows.join('') + '</tbody></table>' : '';
      var tail = (i === n - 1) ? (o.after || '') : '<div style="text-align:right;font-size:10px;color:#666;margin-top:6px">Continued on next page&hellip;</div>';
      return '<div class="pg">' + o.head + tbl + tail + '<div class="foot"><span>' + (o.foot || '') + '</span><span>Page ' + (i + 1) + ' of ' + n + '</span></div></div>';
    }).join('');
    var doc = new window.jspdf.jsPDF({ unit: 'mm', format: o.format || 'a4', compress: true });
    var Wmm = doc.internal.pageSize.getWidth(), Hmm = doc.internal.pageSize.getHeight();
    var pgs = out.querySelectorAll('.pg');
    for (var i = 0; i < pgs.length; i++) {
      var cv = await window.html2canvas(pgs[i], { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
      if (i) doc.addPage();
      doc.addImage(cv.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, Wmm, Hmm);
    }
    return doc.output('blob');
  } finally { host.remove(); }
}
async function deptUpload(bucket, path, blob) {
  var up = await _supa.storage.from(bucket).upload(path, blob, { contentType: 'application/pdf', upsert: true, cacheControl: '3600' });
  if (up.error) throw up.error;
  return path;
}
async function deptSignedUrl(bucket, path, secs) {
  var r = await _supa.storage.from(bucket).createSignedUrl(path, secs || 7 * 24 * 3600);
  if (r.error) throw r.error;
  return r.data.signedUrl;
}
async function deptOpenPdf(bucket, path) {
  var w = window.open('', '_blank');
  try { var u = await deptSignedUrl(bucket, path, 600); if (w) w.location.href = u; else location.href = u; }
  catch (e) { if (w) w.close(); showToast('Could not open the file: ' + dErr(e)); }
}
/* WhatsApp from this phone/computer, with a 7-day link to the PDF */
async function deptWhatsApp(phone, text, bucket, path) {
  var num = dMobile(phone);
  var w = window.open('', '_blank');
  try {
    var link = path ? await deptSignedUrl(bucket, path) : '';
    var url = 'https://wa.me/' + (num ? '91' + num : '') + '?text=' + encodeURIComponent(text + (link ? '\n\n' + link : ''));
    if (w) w.location.href = url; else location.href = url;
  } catch (e) { if (w) w.close(); showToast('Could not make the link: ' + dErr(e)); }
}
/* the header block printed at the top of bills / reports */
function deptPdfHead(o) {
  return '<div style="display:flex;justify-content:space-between;gap:12px;border-bottom:2px solid #0B6B4C;padding-bottom:8px">'
    + '<div><div style="font-size:19px;font-weight:800;color:#0B4F3A">' + esc(o.name || '') + '</div>'
    + '<div style="font-size:10.5px;color:#333;max-width:420px">' + esc(o.address || '') + (o.phone ? ' &middot; Ph ' + esc(o.phone) : '') + '</div>'
    + (o.lines || []).filter(Boolean).map(function (l) { return '<div style="font-size:10.5px;color:#333">' + l + '</div>'; }).join('') + '</div>'
    + '<div style="text-align:right"><div style="font-size:15px;font-weight:800;letter-spacing:.04em">' + esc(o.title || '') + '</div>'
    + (o.right || []).filter(Boolean).map(function (l) { return '<div style="font-size:11px">' + l + '</div>'; }).join('') + '</div></div>'
    + (o.party ? '<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid #ccc;font-size:11.5px">' + o.party + '</div>' : '');
}
