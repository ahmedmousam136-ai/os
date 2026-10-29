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
  css += ''
  + '.d-brand{display:flex;align-items:center;gap:10px;min-width:0;flex:1}.d-brand .d-title{white-space:nowrap}'
  + '.d-sub-btn{border:1px solid var(--border);background:var(--green-bg,#e6f5ef);color:var(--green,#12976A);font-weight:700;font-size:13px;border-radius:999px;padding:7px 13px;min-height:36px;cursor:pointer;font-family:inherit;white-space:nowrap}.d-sub-btn:hover{filter:brightness(.97)}'
  + '@media (max-width:480px){.d-sub-btn span{display:none}.d-sub-btn{padding:7px 10px}}'
  + '.d-top-mark{display:block;width:34px;height:34px;border-radius:9px;flex:none;background:var(--aura-mark) center/126% no-repeat}'
  + '@media (min-width:901px){.d-top-mark{display:none}}'
  + '.d-pow{font-size:10.5px;color:var(--text-tertiary);font-weight:600;letter-spacing:.02em}.d-pow b{color:var(--green)}'
  + '.d-menu-btn{width:40px;height:40px;border-radius:10px;border:1px solid var(--border);background:var(--bg);font-size:20px;line-height:1;color:var(--text-secondary)}'
  + '.d-menu{position:absolute;right:12px;top:58px;background:var(--surface);border:1px solid var(--border-mid);border-radius:12px;box-shadow:var(--sh-lg);min-width:210px;z-index:60;display:none;overflow:hidden}'
  + '.d-menu.open{display:block}.d-menu a,.d-menu button{display:block;width:100%;text-align:left;padding:13px 16px;font-size:14px;color:var(--text-primary);text-decoration:none;border-bottom:1px solid var(--border)}'
  + '.d-menu a:last-child,.d-menu button:last-child{border-bottom:none}.d-menu .who{padding:12px 16px;font-size:12px;color:var(--text-tertiary);border-bottom:1px solid var(--border)}'
  + '.d-tab .ti{margin-right:5px}'
  + '@media(max-width:700px){'
  +   'html,body{font-size:15px}.finput,select.finput,textarea.finput{font-size:16px}'
  +   '.d-top{padding:8px 12px}.d-title{font-size:19px}'
  +   '.d-tabs{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--surface);border-top:1px solid var(--border);padding:4px 4px calc(4px + env(safe-area-inset-bottom));margin:0;max-width:none;gap:2px;justify-content:space-around;box-shadow:0 -4px 16px rgba(0,0,0,.06)}'
  +   '.d-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;border:none!important;border-radius:10px;font-size:10.5px;min-width:0}'
  +   '.d-tab .ti{margin:0;font-size:20px;line-height:1.1}.d-tab .tl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}'
  +   '.d-tab.on{background:var(--green-bg);color:var(--green)}'
  +   '.d-main{padding:10px 10px 96px}.d-view{border-radius:var(--r-lg);padding:12px}'
  +   '.modal-bg{padding:0;align-items:stretch}.modal{border-radius:0;max-width:none!important;min-height:100%}'
  +   '.modal-h{position:sticky;top:0;background:var(--surface);z-index:2}'
  +   '.stat b{font-size:17px}.btn{min-height:44px}'
  + '}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();

/* ---------- the success moment after saving a bill / invoice ----------
   A green tick draws itself, the amount counts up to the total in about 0.6 s, and phones give one soft vibration. */
(function () {
  var css = '.ds-ok{text-align:center;padding:6px 0 10px}'
    + '.ds-ok svg{display:block;margin:0 auto}'
    + '.ds-ok .c{stroke-dasharray:170;stroke-dashoffset:170;animation:dsDraw .45s ease-out .05s forwards}'
    + '.ds-ok .p{stroke-dasharray:50;stroke-dashoffset:50;animation:dsDraw .3s ease-out .4s forwards}'
    + '@keyframes dsDraw{to{stroke-dashoffset:0}}'
    + '.ds-ok .amt{font-size:42px;font-weight:800;letter-spacing:-.03em;font-variant-numeric:tabular-nums;margin-top:2px;line-height:1.15}'
    + '.ds-ok .sub{font-size:13px;color:var(--text-secondary)}.ds-ok .day{font-size:12.5px;color:var(--green);font-weight:600;margin-top:8px}'
    + '.ds-pop{animation:dsPop .28s cubic-bezier(.2,.9,.3,1.2) both}@keyframes dsPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}'
    + '@media (prefers-reduced-motion:reduce){.ds-ok .c,.ds-ok .p{animation:none;stroke-dashoffset:0}.ds-pop{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();
/* o: { title, amount, decimals, sub, day } -> markup; then call deptSuccessPlay() */
function deptSuccessHtml(o) {
  return '<div class="ds-ok ds-pop"><svg width="72" height="72" viewBox="0 0 64 64" fill="none" role="img" aria-label="Saved">'
    + '<circle class="c" cx="32" cy="32" r="27" stroke="var(--green)" stroke-width="3.5"></circle>'
    + '<path class="p" d="M20 33l8 8 16-17" stroke="var(--green)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    + '<div class="sub" style="margin-top:8px">' + esc(o.title || 'Saved') + '</div>'
    + '<div class="amt" id="ds-amt" data-to="' + (Number(o.amount) || 0) + '" data-dec="' + (o.decimals ? 2 : 0) + '">&#8377;0</div>'
    + (o.sub ? '<div class="sub">' + o.sub + '</div>' : '')
    + '<div class="day" id="ds-day">' + (o.day || '') + '</div></div>';
}
function deptSuccessPlay() {
  var el = document.getElementById('ds-amt'); if (!el) return;
  var to = Number(el.getAttribute('data-to')) || 0, dec = el.getAttribute('data-dec') === '2', t0 = null, ms = 600;
  var fmt = function (v) { return '\u20B9' + (dec ? v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Math.round(v).toLocaleString('en-IN')); };
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (reduce) { el.textContent = fmt(to); }
  else {
    var step = function (t) { if (t0 === null) t0 = t; var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * e); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {}
}

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
  return m.replace(/^(MODULE_OFF|NO_STOCK|DUPLICATE|GSTIN_INVALID|DL_INVALID|PHONE_INVALID|DUE|BILL_LOCKED|GST_MANUAL):\s*/, '');
}
function dMobile(p) { var d = String(p || '').replace(/\D/g, ''); if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2); else if (d.length === 11 && d[0] === '0') d = d.slice(1); return /^[6-9]\d{9}$/.test(d) ? d : ''; }
/* ---------- checks for registration numbers (the database runs the same checks) ---------- */
/* GSTIN: 15 characters, valid state code, and the last character must match the GST check-digit formula */
function deptGstinOk(g) {
  g = String(g || '').toUpperCase().replace(/\s/g, '');
  if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(g)) return false;
  var st = parseInt(g.slice(0, 2), 10); if (!((st >= 1 && st <= 38) || st === 97 || st === 99)) return false;
  var cs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', sum = 0;
  for (var i = 0; i < 14; i++) { var v = cs.indexOf(g[i]) * (i % 2 ? 2 : 1); sum += Math.floor(v / 36) + (v % 36); }
  return cs[(36 - (sum % 36)) % 36] === g[14];
}
/* why a GSTIN is wrong, in plain words ('' = fine) */
function deptGstinProblem(g) {
  g = String(g || '').toUpperCase().replace(/\s/g, '');
  if (!g) return 'Enter the GSTIN.';
  if (g.length !== 15) return 'A GSTIN has exactly 15 characters (you typed ' + g.length + ').';
  if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(g)) return 'This is not a GSTIN. It looks like 19ABCDE1234F1Z5: 2-digit state code, 10-character PAN, then 3 characters.';
  if (!deptGstinOk(g)) return 'This GSTIN is not valid (the state code or the check digit is wrong). Copy it exactly from the GST certificate.';
  return '';
}
/* drug licence number(s): must look like a real licence, e.g. "WB/S24P/RCD-1234 (20B), 1235 (21B)",
   "20B/1234/2019, 21B/1235/2019", or the new online format "RLF20BWB2024000123" */
var DEPT_STATES = 'AN|AP|AR|AS|BR|CH|CG|CT|DN|DD|DL|GA|GJ|HR|HP|JK|JH|KA|KL|LA|LD|MP|MH|MN|ML|MZ|NL|OD|OR|PY|PB|RJ|SK|TN|TS|TG|TR|UP|UK|UA|WB';
function deptDlProblem(v) {
  var d = String(v || '').toUpperCase().replace(/\s+/g, ' ').trim();
  if (!d) return 'Enter the drug licence number(s). They are printed on every bill.';
  if (d.length < 8) return 'This licence number is too short. Write it exactly as on the licence, e.g. WB/S24P/RCD-1234.';
  if (d.length > 120) return 'This is too long (120 characters at most).';
  if (!/^[A-Z0-9 \/\-.,:;&()_#'\u00b7]+$/.test(d)) return 'Use only letters, numbers and / - . , : ; & ( ) # in the licence number.';
  if (!/[0-9]{3,}/.test(d)) return 'A licence number has a serial number (at least 3 digits together). Please check the licence.';
  if ((d.match(/[A-Z]/g) || []).length < 2) return 'Write the full licence number with its letters, e.g. WB/S24P/RCD-1234 or 20B/1234.';
  if (/(.)\1{4,}/.test(d)) return 'This does not look like a real licence number.';
  if (/(^|[^A-Z])(TEST|DEMO|DUMMY|SAMPLE|ASDF|QWER|QWERTY|ABCD|ABCDE|XYZ|NIL|NONE|NA|XXX)([^A-Z]|$)/.test(d)) return 'This does not look like a real licence number.';
  var national = /^RLF ?[0-9]{2}[A-Z]{1,2} ?[A-Z]{2} ?[0-9]{4} ?[0-9]{6}/.test(d);
  var form = /(^|[^0-9])(20|21)[A-G]?([^0-9]|$)/.test(d) || /FORM ?(20|21)/.test(d);
  var state = new RegExp('^(' + DEPT_STATES + ')[^A-Z]').test(d) || new RegExp('(^|[^A-Z])(' + DEPT_STATES + ')[/\\- ]').test(d);
  if (!national && !form && !state) return 'This does not look like a drug licence number. It usually starts with the state code (e.g. WB/...), or mentions Form 20B / 21B, or is the new online number (RLF20B...).';
  return '';
}
/* automatic WhatsApp (bill / report) through AuraScale's number; returns a short line for the screen */
async function deptAutoSend(body) {
  try {
    var r = await _supa.functions.invoke('dept-whatsapp', { body: body });
    var d = r.data || {};
    if (r.error && !d.reason) return { ok: false, text: 'Automatic WhatsApp could not be sent now. Use the WhatsApp button.' };
    if (d.sent) return { ok: true, text: '✓ Sent on WhatsApp automatically.' };
    var why = { customer_not_agreed: '', no_phone: '', admitted_patient: '', already_sent: 'Already sent on WhatsApp.', patient_said_no: 'Not sent: this patient said NO to WhatsApp messages.',
      not_configured: 'Automatic WhatsApp is not switched on yet. Use the WhatsApp button.', webhook_error: 'Automatic WhatsApp failed. Use the WhatsApp button.', pdf_not_ready: 'The PDF is not ready yet.' }[d.reason];
    return { ok: false, text: why === undefined ? 'Automatic WhatsApp not sent (' + (d.reason || 'error') + '). Use the WhatsApp button.' : why };
  } catch (e) { return { ok: false, text: 'Automatic WhatsApp could not be sent now. Use the WhatsApp button.' }; }
}
/* mobile box: digits only, at most 10, with a live hint under it (red until it is a proper 10-digit number) */
function deptPhoneInput(el) {
  var d = String(el.value || '').replace(/\D/g, '');
  if (d.length > 10 && d.indexOf('91') === 0) d = d.slice(2); else if (d.length > 10 && d[0] === '0') d = d.slice(1);
  d = d.slice(0, 10); if (el.value !== d) el.value = d;
  var h = el.parentNode.querySelector('.ph-hint');
  if (!h) { h = document.createElement('div'); h.className = 'tiny ph-hint'; h.style.marginTop = '3px'; el.insertAdjacentElement('afterend', h); }
  if (!d) { h.textContent = ''; return; }
  if (!/^[6-9]/.test(d)) { h.textContent = 'A mobile number starts with 6, 7, 8 or 9.'; h.style.color = 'var(--red)'; return; }
  if (d.length < 10) { h.textContent = d.length + ' / 10 digits'; h.style.color = 'var(--red)'; return; }
  h.textContent = '✓ OK'; h.style.color = 'var(--green)';
}
function deptPhoneOk(p) { var d = String(p || '').replace(/\D/g, ''); return d.length >= 8 && d.length <= 15; }
function dEl(id) { return document.getElementById(id); }
function dShowErr(id, msg) { var e = dEl(id); if (!e) { showToast(msg); return; } e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; }
function dOpen(id) { dEl(id).classList.add('open'); }
function dClose(id) { dEl(id).classList.remove('open'); }
var _dTabTitle = {};
function dTab(name, fromHistory) {
  var btn = document.querySelector('.d-tab[data-t="' + name + '"]');
  if (!btn || btn.style.display === 'none') { name = (document.querySelector('.d-tab') || {}).getAttribute ? document.querySelector('.d-tab').getAttribute('data-t') : name; btn = document.querySelector('.d-tab[data-t="' + name + '"]'); }
  /* every tab is a step in the phone's / browser's history, so "Back" goes to the previous tab, not out of the page */
  if (!fromHistory && location.hash !== '#' + name) { try { history.pushState({ t: name }, '', '#' + name); } catch (e) {} }
  try { document.title = (btn ? ((btn.querySelector('.tl') || btn).textContent.replace(/^\W+/, '').trim()) : name) + ' · ' + (DEPT.title || '') + ' · AuraScale'; } catch (e) {}
  window.scrollTo(0, 0);
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
  var g = await nhAuthGuard(null, module); if (!g) return false;
  DEPT.role = g.role;
  var WH_ROLES = ['sales', 'inventory', 'accounts'];
  /* wholesale staff only open the Wholesale screen; nobody else opens it */
  if (module !== 'wholesale' && WH_ROLES.indexOf(g.role) >= 0) { location.replace('wholesale.html'); return false; }
  if (module === 'wholesale' && WH_ROLES.indexOf(g.role) < 0 && g.role !== 'owner') { location.href = g.role === 'doctor' ? 'doctor.html' : 'nh.html'; return false; }
  if (module !== 'wholesale' && ['owner', 'receptionist', 'pharmacist', 'lab'].indexOf(g.role) < 0) { location.href = g.role === 'doctor' ? 'doctor.html' : 'nh.html'; return false; }
  /* pharmacy staff only open the Pharmacy, lab staff only the Lab */
  if (g.role === 'pharmacist' && module !== 'pharmacy') { location.replace('pharmacy.html'); return false; }
  if (g.role === 'lab' && module !== 'lab') { location.replace('lab.html'); return false; }
  var c = await _supa.from('clinics').select('*').eq('id', _clinicId).maybeSingle();
  if (!c.data) { try { var r2 = await _supa.rpc('nhx_my_clinic', { p_clinic: _clinicId }); if (r2.data) c = { data: r2.data }; } catch (e) {} }
  DEPT.clinic = c.data || {};
  DEPT.title = title;
  DEPT.standalone = DEPT.clinic.business_type === 'pharmacy' || DEPT.clinic.business_type === 'lab' || DEPT.clinic.business_type === 'wholesale_pharmacy';
  /* a wholesale business has only the Wholesale screen; any other business never sees it */
  if (DEPT.clinic.business_type === 'wholesale_pharmacy' && module !== 'wholesale') { location.replace('wholesale.html'); return false; }
  if (module === 'wholesale' && DEPT.clinic.business_type !== 'wholesale_pharmacy') { location.replace('nh.html'); return false; }
  var back = DEPT.standalone ? '' : (g.role === 'owner' ? 'nh.html' : g.role === 'receptionist' ? 'receptionist.html' : '');
  dEl('d-fac').innerHTML = esc(DEPT.clinic.name || g.facilityName || '') + ' &middot; <span class="d-pow">Powered by <b>AuraScale OS</b></span>';
  var brand = document.querySelector('.d-top .d-brand');
  if (brand && !brand.querySelector('.d-top-mark')) { var mk = document.createElement('i'); mk.className = 'd-top-mark'; mk.setAttribute('aria-hidden', 'true'); brand.insertBefore(mk, brand.firstChild); }
  deptMenu(back, g);
  window.addEventListener('popstate', function (e) { if (e && e.state && e.state.aura === 'base' && auraDeptHomeId()) { auraDeptHome(); return; } var t = (location.hash || '').slice(1); if (t) dTab(t, true); });
  dEl('loading').style.display = 'none';
  dEl('app').style.display = 'block';
  var on = module === 'wholesale' ? true : module === 'pharmacy' ? DEPT.clinic.mod_pharmacy : DEPT.clinic.mod_lab;
  if (!on) {
    dEl('d-body').innerHTML = '<div class="d-view on" style="border-radius:var(--r-lg);text-align:center;padding:40px 16px"><div style="font-size:40px">&#128274;</div>'
      + '<h2 style="margin:10px 0 6px">' + esc(title) + ' is not switched on for your account</h2>'
      + '<p class="muted" style="max-width:420px;margin:0 auto 16px">This is an extra module. Contact AuraScale to switch it on for your account.</p>'
      + '<a class="btn btn-g" target="_blank" href="https://wa.me/918017465987?text=' + encodeURIComponent('Hi AuraScale, I want the ' + title + ' module for ' + (DEPT.clinic.name || 'my account') + '.') + '">&#128242; WhatsApp AuraScale</a>'
      + (back ? ' <a class="btn" href="' + back + '">Go to ' + (back === 'nh.html' ? 'owner portal' : 'reception') + '</a>' : '') + '</div>';
    dEl('d-tabs').style.display = 'none';
    return false;
  }
  [].forEach.call(document.querySelectorAll('[data-owner-only]'), function (el) { if (!dIsOwner()) el.style.display = 'none'; });
  return true;
}

/* the small menu at the top right: who is signed in, the other portal (only when there is one), log out */
function deptMenu(back, g) {
  var top = document.querySelector('.d-top'); if (!top || dEl('d-menu')) return;
  var old = dEl('d-back'); if (old) old.remove();
  var b = document.createElement('button'); b.className = 'd-menu-btn'; b.innerHTML = '&#8942;'; b.setAttribute('aria-label', 'Menu');
  var m = document.createElement('div'); m.className = 'd-menu'; m.id = 'd-menu';
  var roleTxt = { owner: 'Owner', receptionist: 'Reception', pharmacist: 'Pharmacist', lab: 'Lab staff', sales: 'Sales', inventory: 'Inventory', accounts: 'Accounts' }[g.role] || 'Staff';
  m.innerHTML = '<div class="who">Signed in: <b>' + esc(g.name || '') + '</b> (' + roleTxt + ')</div>'
    + (typeof auraBizMenuHtml === 'function' ? auraBizMenuHtml(_clinicId) : '')
    + (back ? '<a href="' + back + '">&#8617; ' + (back === 'nh.html' ? 'Owner portal' : 'Reception portal') + '</a>' : '')
    + (!back && g.role === 'owner' && DEPT.standalone ? '<a href="#" onclick="if(auraDeptHomeId()){auraDeptHome();}return false;" class="d-home-link" style="display:none">&#8617; Nursing home owner portal</a>' : '')
    + (DEPT.module === 'pharmacy' && DEPT.clinic.mod_lab && DEPT.role !== 'pharmacist' ? '<a href="lab.html">&#129514; Lab</a>' : '')
    + (DEPT.module === 'lab' && DEPT.clinic.mod_pharmacy && DEPT.role !== 'lab' ? '<a href="pharmacy.html">&#128138; Pharmacy</a>' : '')
    + (g.role === 'owner' ? '<button onclick="document.getElementById(\'d-menu\').classList.remove(\'open\');if(typeof auraPlansOpen===\'function\')auraPlansOpen()">&#128179; Subscription &amp; plans</button>' : '')
    + '<button onclick="if(typeof toggleTheme===\'function\')toggleTheme()">&#127912; Theme</button>'
    + '<button onclick="handleLogout()" style="color:var(--red)">&#10162; Log out</button>';
  var wrap = document.createElement('div'); wrap.style.marginLeft = 'auto'; wrap.style.display = 'flex'; wrap.style.alignItems = 'center'; wrap.style.gap = '8px';
  if (g.role === 'owner') {   /* the owner's Subscription button: plans for 1 month / 6 months / 1 year + Cashfree */
    var sb = document.createElement('button'); sb.className = 'd-sub-btn'; sb.type = 'button';
    sb.innerHTML = '&#128179;<span> Subscription</span>'; sb.title = 'Subscription & plans';
    sb.onclick = function () { if (typeof auraPlansOpen === 'function') auraPlansOpen(); };
    wrap.appendChild(sb);
  }
  wrap.appendChild(b); top.appendChild(wrap); top.appendChild(m);
  var hl = m.querySelector('.d-home-link'); if (hl && auraDeptHomeId()) hl.style.display = '';
  var me = dEl('d-me'); if (me) me.remove();
  b.onclick = function (e) { e.stopPropagation(); m.classList.toggle('open'); };
  document.addEventListener('click', function (e) { if (!e.target.closest('#d-menu')) m.classList.remove('open'); });
}
/* first tab to show: the one in the address (#bills), else the last one used */
function deptStartTab(def) {
  var t = (location.hash || '').slice(1);
  if (!t) { try { t = localStorage.getItem('aura-dept-tab-' + DEPT.module) || def; } catch (e) { t = def; } }
  if (!document.querySelector('.d-tab[data-t="' + t + '"]') || document.querySelector('.d-tab[data-t="' + t + '"]').style.display === 'none') t = def;
  try { history.replaceState({ t: t }, '', '#' + t); } catch (e) {}
  /* the owner's Back from the first screen goes to the nursing-home owner portal, not out of AuraScale */
  try { if (auraDeptHomeId()) { history.replaceState({ aura: 'base' }, '', '#' + t); history.pushState({ t: t }, '', '#' + t); } } catch (e) {}
  dTab(t, true);
}
/* the owner's nursing home (this page's own nursing home, or the one on the same login), or null */
function auraDeptHomeId() {
  if (DEPT.role !== 'owner') return null;
  if (!DEPT.standalone && DEPT.clinic && DEPT.clinic.business_type !== 'wholesale_pharmacy') return _clinicId;
  var nh = (window.AURA_BIZ_LIST || []).filter(function (b) { return (b.business_type || 'nursing_home') === 'nursing_home' && b.role === 'owner'; })[0];
  return nh ? nh.id : null;
}
function auraDeptHome() {
  var id = auraDeptHomeId();
  if (id && typeof auraBizSet === 'function') auraBizSet(id);
  window._auraLeaving = true;
  location.href = 'nh.html';
}

/* ---------- admitted patients (for "Admitted patient" bills) ---------- */
async function deptLoadAdmissions() {
  if (DEPT.standalone) { DEPT.admissions = []; return []; }
  try {
    var h = await _supa.rpc('nhx_active_admissions', { p_clinic: _clinicId, p_module: DEPT.module });
    if (!h.error && Array.isArray(h.data)) { DEPT.admissions = h.data; return h.data; }
  } catch (e) {}
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
  try {
    var h = await _supa.rpc('nhx_find_patients', { p_clinic: _clinicId, p_module: DEPT.module, p_q: q });
    if (!h.error && Array.isArray(h.data)) return h.data;
  } catch (e) {}
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
  var a5 = o.format === 'a5', W = a5 ? 559 : 794, H = a5 ? 794 : 1123, PX = a5 ? 30 : 44, PT = a5 ? 28 : 38, PB = 34;
  var host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-14000px;top:0;width:' + W + 'px;background:#fff;pointer-events:none';
  host.innerHTML = '<style>' + deptPdfCss(W, H, PX, PT, PB) + (o.css || '') + '</style>';
  document.body.appendChild(host);
  try {
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    var meas = document.createElement('div'); meas.className = 'pg'; meas.style.height = 'auto'; meas.style.paddingTop = '0'; meas.style.paddingBottom = '0'; host.appendChild(meas);
    function h(html, row) { meas.innerHTML = row ? '<table class="it">' + (o.colgroup || '') + '<tbody>' + html + '</tbody></table>' : html; return meas.scrollHeight; }
    var hHead = h(o.head), hHead2 = o.headNext ? h(o.headNext) : hHead, hThead = o.thead ? h('<table class="it">' + (o.colgroup || '') + o.thead + '</table>') : 0, hAfter = o.after ? h(o.after) : 0;
    var avail = H - PT - PB - 48;   /* room for the page footer and the 'continued' line */
    var pages = [], cur = [], used = hHead + hThead;
    var all = o.rows || [];
    all.forEach(function (r, k) {
      var rh = h(r, true);
      /* a group heading (e.g. the test name) never stays alone at the bottom of a page */
      var need = rh + (r.indexOf('class="grp"') >= 0 && all[k + 1] ? h(all[k + 1], true) : 0);
      if (cur.length && used + need > avail) { pages.push(cur); cur = []; used = hHead2 + hThead; }
      cur.push(r); used += rh;
    });
    var afterOwnPage = used + hAfter > avail && cur.length > 0;
    pages.push(cur);
    if (afterOwnPage) pages.push([]);
    host.removeChild(meas);
    var n = pages.length, out = document.createElement('div'); host.appendChild(out);
    /* o.copies: the same document printed several times, e.g. ['ORIGINAL FOR RECIPIENT', 'DUPLICATE FOR TRANSPORTER'];
       the text replaces %%COPY%% in the header. Without o.copies nothing changes. */
    var copies = (o.copies && o.copies.length) ? o.copies : [null];
    out.innerHTML = copies.map(function (cp) {
      var sub = function (h) { return String(h || '').split('%%COPY%%').join(cp || ''); };
      return pages.map(function (rows, i) {
        var tbl = rows.length ? '<table class="it">' + (o.colgroup || '') + (o.thead || '') + '<tbody>' + rows.join('') + '</tbody></table>' : '';
        var tail = (i === n - 1) ? (o.after || '') : '<div style="text-align:right;font-size:10.5px;color:#6b7a73;margin-top:6px">Continued on next page&hellip;</div>';
        return '<div class="pg">' + sub(i && o.headNext ? o.headNext : o.head) + tbl + tail + '<div class="foot"><span>' + (o.foot || '') + '</span><span>Page ' + (i + 1) + ' of ' + n + '</span></div></div>';
      }).join('');
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
/* the same look as the nursing-home final bill */
function deptPdfCss(W, H, PX, PT, PB) {
  var font = 'font-family:"Noto Sans","Noto Sans Bengali","Hind Siliguri",Arial,Helvetica,sans-serif;';
  return '.pg{box-sizing:border-box;position:relative;width:' + W + 'px;height:' + H + 'px;padding:' + PT + 'px ' + PX + 'px ' + PB + 'px;background:#fff;color:#14201b;' + font + 'font-size:12.5px;line-height:1.45;overflow:hidden}'
    + '.dh{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:3px solid #12976A;padding-bottom:12px}'
    + '.dh-name{font-size:22px;font-weight:700;color:#0b4f3a;line-height:1.2}.dh-sub{font-size:11.5px;color:#4a5b53;margin-top:3px}'
    + '.dh-t{text-align:right;flex-shrink:0;max-width:300px}.dh-t b{display:block;font-size:18px;letter-spacing:.05em;color:#12976A;line-height:1.2}.dh-t span{display:block;font-size:11.5px;color:#4a5b53;margin-top:3px}.dh-t .no{display:inline;font-size:13px;color:#14201b;font-weight:700;margin:0}'
    + '.dh2{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #12976A;padding-bottom:8px;margin-bottom:8px;font-size:12px;color:#4a5b53}.dh2 b{font-size:15px;color:#0b4f3a}'
    + '.dpt{display:grid;grid-template-columns:1fr 1fr;gap:5px 24px;margin:14px 0 12px;padding:11px 14px;background:#f4f8f6;border:1px solid #dbe7e1;border-radius:8px}'
    + '.dpt div{display:flex;gap:8px}.dpt .l{color:#6b7a73;min-width:104px;flex-shrink:0}.dpt .v{font-weight:600;overflow-wrap:anywhere}.dpt .wide{grid-column:1 / span 2}'
    + 'table.it{width:100%;border-collapse:collapse;table-layout:fixed;font-size:12px}'
    + '.it th{background:#12976A;color:#fff;text-align:left;padding:7px 8px;font-weight:600}'
    + '.it td{padding:6px 8px;border-bottom:1px solid #e3ebe7;vertical-align:top;overflow-wrap:anywhere}'
    + '.r,.it th.r,.it td.r{text-align:right}.c{text-align:center}.mut{color:#6b7a73}.sm{font-size:10.5px;color:#6b7a73}'
    + '.it tr.grp td{background:#eef6f2;font-weight:700;color:#0b4f3a;padding-top:8px}'
    + '.hi{color:#b42318;font-weight:800}'
    + '.dtot{width:340px;flex-shrink:0}.dtot .row{display:flex;justify-content:space-between;padding:4px 8px}.dtot .s{font-size:11.5px;color:#4a5b53}'
    + '.dtot .grand{margin-top:4px;padding:9px 8px;background:#eef6f2;border-radius:6px;font-size:14.5px;font-weight:700}'
    + '.dwords{margin-top:6px;text-align:right;font-size:11.5px;color:#4a5b53;font-style:italic}'
    + '.dsplit{display:flex;justify-content:space-between;gap:18px;margin-top:12px;align-items:flex-start}'
    + '.dgst{border-collapse:collapse;font-size:11px;margin-top:4px}.dgst th{background:#f4f8f6;color:#4a5b53;font-weight:600;padding:4px 8px;border-bottom:1px solid #cfdcd5;text-align:right}.dgst th:first-child,.dgst td:first-child{text-align:left}.dgst td{padding:4px 8px;border-bottom:1px solid #e3ebe7;text-align:right}'
    + '.dph{margin-top:16px;padding-bottom:5px;border-bottom:2px solid #12976A;font-weight:700;color:#0b4f3a;font-size:13px}'
    + '.dprow{display:flex;gap:8px;padding:6px 8px;border-bottom:1px solid #e3ebe7;font-size:11.5px}.dprow.h{color:#6b7a73;font-weight:600;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #cfdcd5}'
    + '.dfinal{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:12px}.dfinal .box{width:340px}.dfinal .row{display:flex;justify-content:space-between;padding:5px 8px}'
    + '.dfinal .due{margin-top:4px;padding:10px 8px;border-radius:6px;font-size:16px;font-weight:700;display:flex;justify-content:space-between}'
    + '.due-red{background:#fdecec;color:#b42318}.due-green{background:#e6f6ee;color:#0f7a4f}'
    + '.dstamp{display:inline-block;border:3px solid #0f7a4f;color:#0f7a4f;font-weight:800;font-size:22px;letter-spacing:.12em;padding:4px 16px;border-radius:6px;transform:rotate(-8deg);opacity:.85;margin-left:8px}'
    + '.dstamp.red{border-color:#b42318;color:#b42318;font-size:15px;letter-spacing:.06em}.dstamp.blue{border-color:#1d4ed8;color:#1d4ed8;font-size:14px;letter-spacing:.05em}'
    + '.dend{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-top:18px}'
    + '.ddecl{flex:1;font-size:10.8px;color:#4a5b53;border:1px solid #dbe7e1;border-radius:8px;padding:9px 12px;background:#fafcfb;line-height:1.5}.ddecl b{color:#14201b}'
    + '.dsign{width:220px;text-align:center;font-size:11px;color:#4a5b53;flex-shrink:0}.dsign img{max-width:200px;max-height:70px;display:block;margin:0 auto 2px}.dsign .sp{height:58px}'
    + '.dsign .ln{border-top:1px solid #14201b;padding-top:4px;color:#14201b;font-weight:600}'
    + '.dfin{text-align:center;font-size:10.5px;color:#6b7a73;margin-top:14px}'
    + '.foot{position:absolute;left:' + PX + 'px;right:' + PX + 'px;bottom:16px;font-size:9.6px;color:#7a8a83;display:flex;justify-content:space-between;gap:12px;border-top:1px solid #e3ebe7;padding-top:6px}';
}
/* page header + the grey details card.  o: { name, sub:[html], title, right:[html], info:[[label, value(html), wide?]] } */
function deptPdfHead(o) {
  return '<div class="dh"><div><div class="dh-name">' + esc(o.name || '') + '</div>'
    + (o.sub || []).filter(Boolean).map(function (l) { return '<div class="dh-sub">' + l + '</div>'; }).join('') + '</div>'
    + '<div class="dh-t"><b>' + esc(o.title || '') + '</b>' + (o.right || []).filter(Boolean).map(function (l) { return '<span>' + l + '</span>'; }).join('') + '</div></div>'
    + (o.info && o.info.length ? '<div class="dpt">' + o.info.filter(function (x) { return x && x[1]; }).map(function (x) { return '<div' + (x[2] ? ' class="wide"' : '') + '><span class="l">' + x[0] + '</span><span class="v">' + x[1] + '</span></div>'; }).join('') + '</div>' : '');
}
/* small header on page 2, 3 ... */
function deptPdfHeadNext(left, right) { return '<div class="dh2"><span>' + left + '</span><span>' + right + '</span></div>'; }
/* the facility's signature / stamp image (same one used on the nursing-home bills), if the owner uploaded one */
var _deptSign;
async function deptSignature() {
  if (_deptSign !== undefined) return _deptSign;
  _deptSign = '';
  var p = DEPT.clinic && DEPT.clinic.bill_sign_path; if (!p) return '';
  try {
    var dl = await _supa.storage.from('bills').download(p);
    if (dl.data) _deptSign = await new Promise(function (res) { var fr = new FileReader(); fr.onload = function () { res(String(fr.result || '')); }; fr.onerror = function () { res(''); }; fr.readAsDataURL(dl.data); });
  } catch (e) { _deptSign = ''; }
  return _deptSign;
}
function deptMoney(n) { return '&#8377;' + (Number(n) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function deptPdfDate(d) { if (!d) return ''; var x = new Date(d); return isNaN(x) ? '' : x.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }); }
function deptPdfDateTime(d) { if (!d) return ''; var x = new Date(d); return isNaN(x) ? '' : deptPdfDate(d) + ' ' + x.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }); }
/* Rupees in words, Indian system */
function deptWords(n) {
  n = Math.round(Number(n) || 0); if (!n) return 'Rupees Zero Only';
  var a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function two(x) { return x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : ''); }
  function three(x) { return (x >= 100 ? a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : ''); }
  var cr = Math.floor(n / 10000000), lk = Math.floor(n / 100000) % 100, th = Math.floor(n / 1000) % 100, r = n % 1000, out = [];
  if (cr) out.push(two(cr) + ' Crore'); if (lk) out.push(two(lk) + ' Lakh'); if (th) out.push(two(th) + ' Thousand'); if (r) out.push(three(r));
  return 'Rupees ' + out.join(' ') + ' Only';
}

/* Style A: AuraScale mark + shop name at the top of the left menu (computers); hidden on phones by aura-theme.css */
(function () {
  function addBrand() {
    var tabs = document.getElementById('d-tabs');
    if (!tabs || tabs.querySelector('.d-side-brand')) return;
    var b = document.createElement('div');
    b.className = 'd-side-brand';
    b.innerHTML = '<i role="img" aria-label="AuraScale"></i><div><b>AuraScale</b><span id="d-side-fac"></span></div>';
    tabs.insertBefore(b, tabs.firstChild);
    var f = document.createElement('div'); f.className = 'd-side-foot'; f.textContent = 'Powered by AuraScale OS'; tabs.appendChild(f);
    var src = document.getElementById('d-fac'), dst = b.querySelector('#d-side-fac');
    function sync() { if (src && dst) dst.textContent = (src.textContent || '').split('·')[0].trim(); }
    sync(); if (src && window.MutationObserver) new MutationObserver(sync).observe(src, { childList: true, characterData: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addBrand); else addBrand();
})();

/* ---------- every photo button becomes two: "Take photo" (opens the camera) + "Choose photo" (gallery / files) ----------
   Some phones open only the gallery for a plain file box, others only the camera when "capture" is set.
   Two buttons give both, everywhere (bill scan, order photo, prescription, party photo). Computers keep one "Choose photo". */
(function () {
  var touch = false; try { touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window; } catch (e) {}
  function fix(lbl) {
    if (lbl.getAttribute('data-cam')) return;
    var inp = lbl.querySelector('input[type="file"][accept^="image"]'); if (!inp) return;
    lbl.setAttribute('data-cam', '1');
    inp.removeAttribute('capture');
    var txt = [].filter.call(lbl.childNodes, function (n) { return n.nodeType === 3 && /photo/i.test(n.nodeValue); })[0];
    if (txt) txt.nodeValue = touch ? '🖼️ Choose photo' : '📷 Choose photo';
    if (!touch) return;
    var cam = lbl.cloneNode(false); cam.setAttribute('data-cam', '1');
    var ci = inp.cloneNode(false); ci.id = (inp.id || 'photo') + '-cam'; ci.setAttribute('capture', 'environment'); ci.value = '';
    cam.appendChild(document.createTextNode('📷 Take photo')); cam.appendChild(ci);
    lbl.parentNode.insertBefore(cam, lbl);
    lbl.className = lbl.className.replace(/\bbtn-g\b/, '').trim() + ' btn';   /* "Take photo" is the main (green) button */
    if (lbl.parentNode && getComputedStyle(lbl.parentNode).display.indexOf('flex') < 0) { cam.style.marginRight = '6px'; }
  }
  function scan(root) { [].forEach.call((root || document).querySelectorAll('label'), function (l) { if (l.querySelector('input[type="file"][accept^="image"]')) fix(l); }); }
  function start() {
    scan(document);
    try { new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) scan(n.parentNode || n); }); }); }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();


/* ===== PLANS & PAYMENT (built in, same code as aura-plans.js) ===== */
/* AuraScale PLANS & PAYMENT (one file for every portal: nursing home, pharmacy, wholesale, lab).
   auraPlansMount(el, { clinic: <clinics row>, all: true })   all = also list the prices of the other businesses
   Pay with Cashfree: the Edge Function "aura-pay-order" works out the amount on the server (file 37) and opens
   the Cashfree checkout. When the person comes back (?aura_order=...), the payment is checked and a green tick shows.
   Pay by UPI: QR / UPI app to AuraScale's UPI ID; AuraScale records it from the admin page. */
(function () {
  if (window.__auraPlansLoaded) return; window.__auraPlansLoaded = true;
  var UPI_ID = '8017465987-3@ybl', UPI_NAME = 'AuraScale', WA = '918017465987';
  var QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  var CF_SDK = 'https://sdk.cashfree.com/js/v3/cashfree.js';
  var OFFER_END = new Date('2026-12-01T00:00:00+05:30').getTime();
  /* the same list as the database (file 37: aura_plan_prices); the server always decides the real amount */
  var PLANS = {
    nh_15:    { kind: 'nursing_home', group: 'nh',    name: 'Nursing Home',   beds: 'Up to 15 beds', m: 2999, h: 16499, y: 29999 },
    nh_30:    { kind: 'nursing_home', group: 'nh',    name: 'Nursing Home',   beds: '16 to 30 beds', m: 3999, h: 21999, y: 39999 },
    nh_50:    { kind: 'nursing_home', group: 'nh',    name: 'Nursing Home',   beds: '31 to 50 beds', m: 5499, h: 29999, y: 54999 },
    combo_15: { kind: 'nursing_home', group: 'combo', name: 'Hospital Combo', beds: 'Up to 15 beds', m: 3499, h: 18999, y: 34999 },
    combo_30: { kind: 'nursing_home', group: 'combo', name: 'Hospital Combo', beds: '16 to 30 beds', m: 4499, h: 24499, y: 44999 },
    combo_50: { kind: 'nursing_home', group: 'combo', name: 'Hospital Combo', beds: '31 to 50 beds', m: 5999, h: 32999, y: 59999 },
    pharmacy: { kind: 'pharmacy', name: 'Pharmacy Retail', m: 459, h: 2499, y: 4599 },
    wholesale:{ kind: 'wholesale_pharmacy', name: 'Pharmacy Wholesale', m: 999, h: 5499, y: 9999 },
    lab:      { kind: 'lab', name: 'Diagnostic Lab', m: 1299, h: 6999, y: 12999 },
    clinic:   { kind: 'clinic', name: 'Clinic', m: 1499, h: 7999, y: 14999 },
    topup:    { kind: 'topup', name: 'ID-scan top-up (100 scans)', m: 499 }
  };
  var FEAT = {
    nh: ['Admissions, beds, discharge and IPD bills', 'Reception, doctor and nurse logins', 'PM-JAY / Swasthya Sathi claims, cashless bills', 'ID-card scan at registration, monthly owner report'],
    combo: ['Everything in Nursing Home', 'Pharmacy Retail inside the hospital: ward medicines go to the bill', 'Diagnostic Lab: reports go to the patient’s file', 'One price, ₹1,258 a month less than three separate plans'],
    pharmacy: ['Bill from a photo of the prescription', 'Bills on WhatsApp with GST', 'Substitutes, refill reminders, H1 register', 'Re-order from your wholesaler in one tap'],
    wholesale: ['Purchase entry from a photo of the supplier’s bill', 'GST invoices, party ledger and dues', 'Shop orders arrive in the app', 'Monthly report on the owner’s WhatsApp'],
    lab: ['Patient registration, tests and bills', 'Report PDF straight to the patient’s WhatsApp', 'Doctor referrals and commission', 'Pending dues and payment tracking'],
    clinic: ['Appointments, tokens and patient records', 'Digital prescriptions on WhatsApp', 'Visit-fee bills and daily accounts', 'Follow-up reminders']
  };
  var TERM = { m: { n: 1, t: '1 month', s: 'Monthly' }, h: { n: 6, t: '6 months', s: '6 months' }, y: { n: 12, t: '1 year', s: '1 year' } };
  var S = { el: null, c: null, beds: '15', all: false, sel: {} };

  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (x) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]; }); }
  function inr(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function toast(m) { if (typeof showToast === 'function') showToast(m); else alert(m); }
  function offerOn() { return Date.now() < OFFER_END; }
  function bonus(term) { return offerOn() ? (term === 'h' ? 1 : term === 'y' ? 2 : 0) : 0; }
  function kindOf(c) { return c && c.facility_type === 'clinic' ? 'clinic' : ((c && c.business_type) || 'nursing_home'); }
  function curPlan(c) {
    if (c && c.aura_plan && PLANS[c.aura_plan]) return c.aura_plan;
    var k = kindOf(c);
    return k === 'pharmacy' ? 'pharmacy' : k === 'wholesale_pharmacy' ? 'wholesale' : k === 'lab' ? 'lab' : k === 'clinic' ? 'clinic' : (c && c.mod_pharmacy && c.mod_lab ? 'combo_15' : 'nh_15');
  }
  function price(code, term) { var p = PLANS[code]; return p ? p[term] : 0; }
  function loadScript(src, ok) {
    return new Promise(function (res, rej) {
      if (ok()) return res();
      var s = document.createElement('script'); s.src = src; s.onload = function () { ok() ? res() : rej(new Error('load')); }; s.onerror = function () { rej(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }

  (function css() {
    if (document.getElementById('ap-css')) return;
    var st = document.createElement('style'); st.id = 'ap-css';
    st.textContent = ''
      + '.ap{display:flex;flex-direction:column;gap:14px}'
      + '.ap-cur{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;justify-content:space-between;border:1px solid var(--border);border-radius:14px;padding:14px 16px;background:var(--surface)}'
      + '.ap-cur b{font-size:15px}.ap-cur .s{font-size:12.5px;color:var(--text-secondary,#5b6b64)}'
      + '.ap-seg{display:inline-flex;background:var(--surface2,#eef3f0);border-radius:999px;padding:3px;gap:2px;flex-wrap:wrap}'
      + '.ap-seg button{border:0;background:transparent;border-radius:999px;padding:7px 14px;font-weight:700;font-size:12.5px;color:var(--text-secondary,#5b6b64);cursor:pointer;font-family:inherit}'
      + '.ap-seg button.on{background:var(--surface,#fff);color:var(--text-primary,#14201b);box-shadow:0 1px 4px rgba(0,0,0,.12)}'
      + '.ap-seg button .o{color:#A86A12;font-size:10.5px;margin-left:4px}'
      + '.ap-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}'
      + '.ap-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}'
      + '.ap-card{border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--surface);min-width:0}'
      + '.ap-card.cur{border:2px solid var(--green,#12976A)}'
      + '.ap-top{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}'
      + '.ap-nm{font-size:15px;font-weight:800}.ap-sub{font-size:12px;color:var(--text-tertiary,#7a8a83)}'
      + '.ap-tag{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:var(--green-bg,#e6f5ef);color:var(--green,#12976A);white-space:nowrap}'
      + '.ap-tag.g{background:#FBF3E4;color:#A86A12}'
      + '.ap-amt{font-size:26px;font-weight:800;line-height:1.1}.ap-amt small{font-size:12.5px;font-weight:600;color:var(--text-tertiary,#7a8a83)}'
      + '.ap-note{font-size:12px;color:var(--text-secondary,#5b6b64)}.ap-note .sv{color:var(--green,#12976A);font-weight:700}.ap-note .of{color:#A86A12;font-weight:700}'
      + '.ap-f{margin:0;padding-left:18px;font-size:12.5px;line-height:1.7;color:var(--text-secondary,#5b6b64)}'
      + '.ap-pay{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;border-radius:12px;padding:12px 14px;min-height:46px;font-weight:800;font-size:14px;cursor:pointer;background:var(--green,#12976A);color:#fff;font-family:inherit;margin-top:auto}'
      + '.ap-pay:hover{filter:brightness(.95)}.ap-pay[disabled]{opacity:.6;cursor:wait}'
      + '.ap-upi{border:0;background:none;color:var(--text-secondary,#5b6b64);text-decoration:underline;font-size:12px;cursor:pointer;font-family:inherit;padding:2px}'
      + '.ap-tbl{width:100%;border-collapse:collapse;font-size:12.5px}.ap-tbl th,.ap-tbl td{padding:8px 6px;border-top:1px solid var(--border);text-align:left}.ap-tbl th{font-size:11px;color:var(--text-tertiary,#7a8a83);text-transform:uppercase;letter-spacing:.04em;border-top:0}.ap-tbl td.n,.ap-tbl th.n{text-align:right;white-space:nowrap}'
      + '.ap-wrap{overflow-x:auto}'
      + '.ap-terms{display:grid;gap:6px}'
      + '.ap-term{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;text-align:left;border:1.5px solid var(--border);border-radius:10px;background:var(--surface);padding:9px 11px;cursor:pointer;font-family:inherit;color:inherit;min-height:46px}'
      + '.ap-term:hover{border-color:var(--green,#12976A)}.ap-term.on{border-color:var(--green,#12976A);background:var(--green-bg,#e6f5ef)}'
      + '.ap-term[disabled]{cursor:default;opacity:.75}.ap-term[disabled]:hover{border-color:var(--border)}'
      + '.ap-tl,.ap-tr{display:flex;flex-direction:column;gap:1px}.ap-tr{align-items:flex-end;text-align:right}'
      + '.ap-tl b,.ap-tr b{font-size:13.5px}.ap-tr b{font-variant-numeric:tabular-nums}'
      + '.ap-term .of{color:#A86A12;font-size:11px;font-weight:700}.ap-term .sv{color:var(--green,#12976A);font-size:11px;font-weight:700}'
      + '.ap-note .of{color:#A86A12;font-weight:700}'
      + '.ap-pay.ap-alt{background:var(--surface2,#eef3f0);color:var(--text-primary,#14201b)}'
      + '.ap-soon{text-align:center;font-weight:700;font-size:13px;color:#A86A12;background:#FBF3E4;border-radius:12px;padding:12px;margin-top:auto}'
      + '.ap-card.soon{opacity:.85}.ap-beds{align-self:flex-start}'
      + '.ap-ov{position:fixed;inset:0;z-index:300;background:rgba(15,23,20,.45);display:flex;align-items:center;justify-content:center;padding:16px}'
      + '.ap-box{background:var(--surface,#fff);color:var(--text-primary,#14201b);border-radius:18px;max-width:380px;width:100%;padding:22px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);max-height:92vh;overflow-y:auto}'
      + '.ap-ok .c{stroke-dasharray:170;stroke-dashoffset:170;animation:apC .6s ease-out forwards}.ap-ok .p{stroke-dasharray:40;stroke-dashoffset:40;animation:apC .35s .5s ease-out forwards}'
      + '@keyframes apC{to{stroke-dashoffset:0}}.ap-pop{animation:apPop .3s cubic-bezier(.2,.9,.3,1.2) both}@keyframes apPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}'
      + '@media (prefers-reduced-motion:reduce){.ap-ok .c,.ap-ok .p{animation:none;stroke-dashoffset:0}.ap-pop{animation:none}}';
    document.head.appendChild(st);
  })();

  var WHO = { pharmacy: 'Medicine shops and chemists', wholesale: 'Distributors and stockists', lab: 'Pathology labs and collection centres',
    clinic: 'Doctor chambers, polyclinics and OPD', nh: 'Hospitals with admitted patients', combo: 'Nursing home + pharmacy + lab together' };
  var FOR = { pharmacy: 'pharmacy', wholesale: 'wholesale', lab: 'lab' };              /* nh.html?add=1&for=... */
  var BTYPE = { pharmacy: 'pharmacy', wholesale: 'wholesale_pharmacy', lab: 'lab' };
  function myCode(kind) { return { pharmacy: 'pharmacy', wholesale_pharmacy: 'wholesale', lab: 'lab', clinic: 'clinic' }[kind] || null; }
  function linked(code) {
    var t = BTYPE[code]; if (!t) return null;
    return (window.AURA_BIZ_LIST || []).filter(function (b) { return b.business_type === t && b.role === 'owner'; })[0] || null;
  }
  function bedSeg() {
    return '<div class="ap-seg ap-beds" role="group" aria-label="Number of beds">' + [['15', 'Up to 15 beds'], ['30', '16–30'], ['50', '31–50']].map(function (b) {
      return '<button type="button" class="' + (S.beds === b[0] ? 'on' : '') + '" onclick="auraPlansBeds(\'' + b[0] + '\')">' + b[1] + '</button>';
    }).join('') + '</div>';
  }
  /* one business card: the 3 periods as rows (tap one), then the button */
  function card(code, o) {
    o = o || {};
    var p = PLANS[code], grp = p.group || code, sel = (S.sel[grp] || 'y'), soon = !!o.soon;
    var rows = ['m', 'h', 'y'].map(function (t) {
      var amt = p[t], save = p.m * TERM[t].n - amt, b = bonus(t), on = sel === t && !soon;
      return '<button type="button" class="ap-term' + (on ? ' on' : '') + '"' + (soon ? ' disabled' : ' onclick="auraPlansPick(\'' + grp + '\',\'' + t + '\')"') + ' aria-pressed="' + on + '">'
        + '<span class="ap-tl"><b>' + TERM[t].t + '</b>' + (b ? '<span class="of">+' + b + ' month' + (b > 1 ? 's' : '') + ' free</span>' : '') + '</span>'
        + '<span class="ap-tr"><b>' + inr(amt) + '</b>' + (save > 0 ? '<span class="sv">save ' + inr(save) + '</span>' : '<span class="ap-sub">per month</span>') + '</span></button>';
    }).join('');
    var amt = p[sel], act;
    if (soon) act = '<div class="ap-soon">In progress &middot; coming soon</div>';
    else if (o.mine) act = '<button type="button" class="ap-pay" onclick="auraPlansPay(\'' + code + '\',\'' + sel + '\',this)">&#128179; Pay ' + inr(amt) + ' with Cashfree</button>'
      + '<button type="button" class="ap-upi" onclick="auraPlansUpi(\'' + code + '\',\'' + sel + '\')">or pay by UPI QR</button>';
    else if (o.other) {
      var lk = linked(code);
      act = lk ? '<button type="button" class="ap-pay ap-alt" onclick="auraOpenBiz && auraOpenBiz(\'' + lk.id + '\')">Open ' + h(lk.name || p.name) + ' &rsaquo;</button>'
               : '<button type="button" class="ap-pay ap-alt" onclick="location.href=\'nh.html?add=1&for=' + FOR[code] + '\'">&#65291; Add ' + h(p.name) + ' (same login)</button>';
    } else act = '';
    var b = bonus(sel), note = soon ? '' : (sel === 'm' ? 'Billed every month. Stop any time.' : inr(Math.round(amt / (TERM[sel].n + b))) + ' a month' + (b ? ' &middot; <span class="of">use it for ' + (TERM[sel].n + b) + ' months</span>' : ''));
    return '<div class="ap-card' + (o.cur ? ' cur' : '') + (soon ? ' soon' : '') + '">'
      + '<div class="ap-top"><div><div class="ap-nm">' + h(p.name) + '</div><div class="ap-sub">' + h(WHO[grp] || '') + (p.beds ? ' &middot; ' + h(p.beds) : '') + '</div></div>'
      + (o.cur ? '<span class="ap-tag">YOUR PLAN</span>' : soon ? '<span class="ap-tag g">IN PROGRESS</span>' : o.tag ? '<span class="ap-tag g">' + o.tag + '</span>' : '') + '</div>'
      + (o.beds ? bedSeg() : '')
      + '<div class="ap-terms">' + rows + '</div>'
      + (note ? '<div class="ap-note">' + note + '</div>' : '')
      + '<ul class="ap-f">' + (FEAT[grp] || []).slice(0, 3).map(function (f) { return '<li>' + h(f) + '</li>'; }).join('') + '</ul>'
      + act + '</div>';
  }
  function topupCard() {
    return '<div class="ap-card"><div class="ap-top"><div><div class="ap-nm">ID-scan top-up</div><div class="ap-sub">100 extra ID-card scans, never expire</div></div></div>'
      + '<div class="ap-amt">' + inr(499) + ' <small>one time &middot; incl. GST</small></div>'
      + '<div class="ap-note">Only when your monthly scans run out.</div>'
      + '<button type="button" class="ap-pay ap-alt" onclick="auraPlansPay(\'topup\',\'one\',this)">&#9889; Pay ' + inr(499) + ' with Cashfree</button>'
      + '<button type="button" class="ap-upi" onclick="auraPlansUpi(\'topup\',\'one\')">or pay by UPI QR</button></div>';
  }
  function render() {
    var c = S.c || {}, kind = kindOf(c), cp = curPlan(c), p = PLANS[cp];
    var exp = c.subscription_expires_at ? new Date(c.subscription_expires_at) : null;
    var days = exp ? Math.ceil((exp.getTime() - Date.now()) / 86400000) : null;
    var fmt = function (d) { return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
    var curTxt = c.billing_exempt ? 'Complimentary from AuraScale: no payment is due.'
      : exp ? (days >= 0 ? 'Valid till ' + fmt(exp) + ' (' + days + ' day' + (days === 1 ? '' : 's') + ' left)' : 'Renewal was due on ' + fmt(exp))
      : '7-day free trial. Choose a plan below to continue.';
    var cards = '';
    if (kind === 'nursing_home') {
      /* the owner sees every AuraScale plan, smallest first */
      cards = card('pharmacy', { other: true }) + card('wholesale', { other: true }) + card('lab', { other: true }) + card('clinic', { soon: true })
        + card('nh_' + S.beds, { mine: true, beds: true, cur: cp === 'nh_' + S.beds })
        + card('combo_' + S.beds, { mine: true, beds: true, cur: cp === 'combo_' + S.beds, tag: 'BEST VALUE' })
        + topupCard();
    } else {
      var mc = myCode(kind) || 'pharmacy';
      cards = card(mc, { mine: kind !== 'clinic', soon: kind === 'clinic', cur: true });
    }
    S.el.innerHTML = '<div class="ap">'
      + '<div class="ap-cur"><div><div class="ap-sub" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700">Your plan</div><b>' + h(p ? p.name + (p.beds ? ' · ' + p.beds : '') : 'AuraScale') + '</b> <span class="s">' + (c.billing_exempt ? 'Free' : inr(Number(c.monthly_price) > 0 ? c.monthly_price : (p ? p.m : 0)) + ' / month incl. GST') + '</span><div class="s">' + curTxt + '</div></div>'
      + '<a class="ap-upi" style="text-decoration:none;font-weight:700" target="_blank" rel="noopener" href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Hi AuraScale, I have a question about my plan for ' + (c.name || 'my business') + '.') + '">&#128172; Ask AuraScale</a></div>'
      + '<div class="ap-grid">' + cards + '</div>'
      + '<p class="ap-note" style="margin:0">All prices include GST. Launch offer: 6 months +1 month free, 1 year +2 months free (first 50 customers, until 30 November 2026). Renew at the same price, no renewal fee. Online payment by UPI, card or net banking is handled by Cashfree Payments; your plan moves forward as soon as the payment succeeds and a GST tax invoice appears under &ldquo;Tax invoices&rdquo;.</p>'
      + '</div>';
  }

  window.auraPlansMount = function (el, opts) {
    if (!el) return;
    S.el = el; S.c = (opts && opts.clinic) || S.c || {}; S.all = !!(opts && opts.all); S.sel = S.sel || {};
    var cp = curPlan(S.c), m = /_(15|30|50)$/.exec(cp); if (m) S.beds = m[1];
    render();
    /* the list of businesses on this login can arrive a moment later: draw again so "Open ..." shows */
    if (!window.AURA_BIZ_LIST) setTimeout(function () { if (S.el === el) render(); }, 2500);
  };
  window.auraPlansPick = function (grp, t) { S.sel[grp] = t; render(); };
  window.auraPlansBeds = function (b) { S.beds = b; render(); };

  function overlay(inner) {
    var o = document.getElementById('ap-ov'); if (o) o.remove();
    o = document.createElement('div'); o.className = 'ap-ov'; o.id = 'ap-ov';
    o.innerHTML = '<div class="ap-box ap-pop" role="dialog" aria-modal="true">' + inner + '</div>';
    o.addEventListener('click', function (e) { if (e.target === o) o.remove(); });
    document.body.appendChild(o);
    return o;
  }
  window.auraPlansClose = function () { var o = document.getElementById('ap-ov'); if (o) o.remove(); };

  window.auraPlansPay = async function (code, term, btn) {
    if (typeof _supa === 'undefined' || !_clinicId) { toast('Please sign in again.'); return; }
    var old = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = 'Opening secure payment…'; }
    try {
      var ret = location.origin + location.pathname;
      var r = await _supa.functions.invoke('aura-pay-order', { body: { action: 'create', clinic_id: _clinicId, plan: code, term: term, return_url: ret } });
      var d = r.data || {}, st = 0;
      if (r.error && r.error.context && typeof r.error.context.json === 'function') {
        st = r.error.context.status || 0;
        try { d = await r.error.context.json(); } catch (e) { d = {}; }
      }
      if (r.error || !d.ok || !d.payment_session_id) {
        var why = d.reason || (st === 404 ? 'not_configured' : '') || (r.error && r.error.message) || '';
        if (why === 'not_configured' || /404|Failed to send|not found/i.test(why)) {
          overlay('<div style="font-size:34px">&#128179;</div><h3 style="margin:6px 0">Online payment is being switched on</h3><p class="ap-note" style="font-size:13px">Cashfree is being activated for AuraScale. Until then, please pay by UPI and we will confirm it within one working day.</p>'
            + '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap"><button type="button" class="ap-pay" style="width:auto;padding:10px 18px" onclick="auraPlansUpi(\'' + code + '\',\'' + term + '\')">Pay by UPI</button><button type="button" class="ap-upi" onclick="auraPlansClose()">Close</button></div>');
        } else toast('Could not start the payment: ' + (d.detail || why || 'please try again'));
        return;
      }
      await loadScript(CF_SDK, function () { return typeof window.Cashfree === 'function'; });
      var cf = window.Cashfree({ mode: d.mode === 'production' ? 'production' : 'sandbox' });
      cf.checkout({ paymentSessionId: d.payment_session_id, redirectTarget: '_self' });
    } catch (e) { toast('Could not start the payment: ' + (e && e.message ? e.message : e)); }
    finally { if (btn) { btn.disabled = false; btn.innerHTML = old; } }
  };

  window.auraPlansUpi = async function (code, term) {
    var p = PLANS[code]; if (!p) return;
    var amt = term === 'one' ? p.m : p[term], nm = (S.c && S.c.name) || '';
    var label = p.name + (p.beds ? ' (' + p.beds + ')' : '') + (term === 'one' ? '' : ' - ' + TERM[term].t);
    var url = 'upi://pay?pa=' + encodeURIComponent(UPI_ID) + '&pn=' + encodeURIComponent(UPI_NAME) + '&am=' + Number(amt).toFixed(2) + '&cu=INR&tn=' + encodeURIComponent(('AuraScale ' + label + ' ' + nm).slice(0, 70));
    var wa = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hi AuraScale, I paid ' + inr(amt) + ' by UPI for ' + label + ' (' + nm + '). UTR: ');
    overlay('<h3 style="margin:0 0 4px">Pay ' + inr(amt) + ' by UPI</h3><div class="ap-note">' + h(label) + ' &middot; incl. GST</div>'
      + '<div id="ap-qr" style="width:180px;height:180px;margin:12px auto;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--border);border-radius:10px;padding:8px"></div>'
      + '<div style="font-size:13px;font-weight:700">UPI ID: ' + UPI_ID + '</div>'
      + '<a class="ap-pay" style="margin-top:12px;text-decoration:none" href="' + url + '">Open my UPI app</a>'
      + '<a class="ap-pay" style="margin-top:8px;text-decoration:none;background:#25D366" target="_blank" rel="noopener" href="' + wa + '">Send the UTR on WhatsApp</a>'
      + '<p class="ap-note" style="margin-top:10px">AuraScale confirms UPI payments within one working day. Your plan moves forward and the tax invoice appears here.</p>'
      + '<button type="button" class="ap-upi" onclick="auraPlansClose()">Close</button>');
    try {
      await loadScript(QR_LIB, function () { return typeof window.QRCode === 'function'; });
      var box = document.getElementById('ap-qr'); if (box) { box.innerHTML = ''; new QRCode(box, { text: url, width: 164, height: 164, correctLevel: QRCode.CorrectLevel.M }); }
    } catch (e) { var b2 = document.getElementById('ap-qr'); if (b2) b2.innerHTML = '<span class="ap-note">Use the UPI ID below.</span>'; }
  };

  function successHtml(o) {
    var until = o && o.result && o.result.until ? new Date(o.result.until) : null, ord = (o && o.order) || {};
    return '<div class="ap-ok"><svg width="80" height="80" viewBox="0 0 64 64" fill="none" role="img" aria-label="Paid">'
      + '<circle class="c" cx="32" cy="32" r="27" stroke="var(--green,#12976A)" stroke-width="3.5"></circle>'
      + '<path class="p" d="M20 33l8 8 16-17" stroke="var(--green,#12976A)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'
      + '<h3 style="margin:6px 0 2px">Payment received</h3>'
      + '<div style="font-size:28px;font-weight:800">' + inr(ord.amount) + '</div>'
      + '<div class="ap-note" style="font-size:13px;margin-top:4px">' + h(ord.label || '') + '</div>'
      + (until ? '<div style="margin-top:8px;font-weight:700">Valid till ' + until.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div>' : '')
      + (ord.invoice_no ? '<div class="ap-note" style="margin-top:4px">Tax invoice ' + h(ord.invoice_no) + '</div>' : '')
      + '<button type="button" class="ap-pay" style="margin-top:14px" onclick="auraPlansClose();location.reload()">Done</button>';
  }
  /* back from Cashfree: check the order and show the result */
  async function checkReturn() {
    var m = /[?&]aura_order=([A-Za-z0-9_-]+)/.exec(location.search); if (!m) return;
    var id = m[1];
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
    var tries = 0;
    while (typeof _supa === 'undefined' || typeof _clinicId === 'undefined' || !_clinicId) { if (++tries > 60) return; await new Promise(function (r) { setTimeout(r, 500); }); }
    overlay('<div style="font-size:30px">&#9203;</div><h3 style="margin:6px 0">Checking your payment&hellip;</h3><p class="ap-note">This takes a few seconds.</p>');
    for (var i = 0; i < 6; i++) {
      var r = await _supa.functions.invoke('aura-pay-order', { body: { action: 'check', order_id: id } });
      var d = r.data || {};
      if (d.applied) {
        overlay(successHtml(d));
        try { if (navigator.vibrate) navigator.vibrate(15); } catch (e) {}
        return;
      }
      if (d.status && /FAILED|CANCELLED|EXPIRED|TERMINATED/i.test(d.status)) break;
      await new Promise(function (res) { setTimeout(res, 2500); });
    }
    overlay('<div style="font-size:34px">&#9888;&#65039;</div><h3 style="margin:6px 0">Payment not completed</h3><p class="ap-note" style="font-size:13px">If money was taken from your account, it will show here within a few minutes, or Cashfree returns it. You can also WhatsApp AuraScale on 80174 65987 with order ' + h(id) + '.</p><button type="button" class="ap-pay" onclick="auraPlansClose()">OK</button>');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', checkReturn); else checkReturn();

  /* Pharmacy / Wholesale / Lab screens: "Subscription & plans" in the top-right menu (owner only) */
  window.auraPlansOpen = async function () {
    var c = (window.DEPT && DEPT.clinic) || {};
    try { var r = await _supa.from('clinics').select('*').eq('id', _clinicId).maybeSingle(); if (r.data) c = r.data; } catch (e) {}
    var o = overlay('<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h3 style="margin:0">Subscription &amp; plans</h3><button type="button" class="ap-upi" style="font-size:20px;text-decoration:none" aria-label="Close" onclick="auraPlansClose()">&times;</button></div><div id="ap-dept-root" style="text-align:left"></div>');
    o.querySelector('.ap-box').style.maxWidth = '760px';
    window.auraPlansMount(document.getElementById('ap-dept-root'), { clinic: c, all: true });
    /* the tax invoices AuraScale issued to this business (one for every payment) */
    var box = document.createElement('div'); box.style.marginTop = '16px';
    box.innerHTML = '<h4 style="margin:0 0 8px">Tax invoices from AuraScale</h4><div class="ap-note">Loading&hellip;</div>';
    var root = document.getElementById('ap-dept-root'); if (root && root.parentNode) root.parentNode.appendChild(box);
    try {
      var iv = await _supa.from('aurascale_invoices').select('*').eq('clinic_id', _clinicId).order('invoice_date', { ascending: false });
      var rows = iv.data || []; window._deptAuraInv = rows;
      box.innerHTML = '<h4 style="margin:0 0 8px">Tax invoices from AuraScale</h4>' + (iv.error ? '<div class="ap-note">Invoices are not available yet.</div>' : !rows.length ? '<div class="ap-note">No invoices yet. A GST tax invoice is made each time you pay.</div>'
        : rows.map(function (v, i) { return '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--border,#e5e7eb);border-radius:10px;margin-bottom:6px"><div><b style="font-size:13px">' + h(v.invoice_no) + '</b><div class="ap-note" style="margin:0">' + h(new Date(v.invoice_date).toLocaleDateString('en-GB')) + ' &middot; &#8377;' + Number(v.total || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</div></div><button type="button" class="btn btn-sm" onclick="auraInvOpen(window._deptAuraInv[' + i + '])">View / PDF</button></div>'; }).join(''));
    } catch (e) { box.innerHTML = ''; }
  };
  window.AURA_PLANS_LIST = PLANS;
})();
/* AuraScale's own GST tax invoice: view / print / save as PDF (same layout as the nursing-home owner portal) */
(function () {
  if (window.auraInvOpen) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var auraMoney = function (n) { return Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var AURA_QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  var AURA_STATES = [['01','Jammu and Kashmir'],['02','Himachal Pradesh'],['03','Punjab'],['04','Chandigarh'],['05','Uttarakhand'],['06','Haryana'],['07','Delhi'],['08','Rajasthan'],['09','Uttar Pradesh'],['10','Bihar'],['11','Sikkim'],['12','Arunachal Pradesh'],['13','Nagaland'],['14','Manipur'],['15','Mizoram'],['16','Tripura'],['17','Meghalaya'],['18','Assam'],['19','West Bengal'],['20','Jharkhand'],['21','Odisha'],['22','Chhattisgarh'],['23','Madhya Pradesh'],['24','Gujarat'],['26','Dadra and Nagar Haveli and Daman and Diu'],['27','Maharashtra'],['29','Karnataka'],['30','Goa'],['31','Lakshadweep'],['32','Kerala'],['33','Tamil Nadu'],['34','Puducherry'],['35','Andaman and Nicobar Islands'],['36','Telangana'],['37','Andhra Pradesh'],['38','Ladakh']];
  function auraStateName(code) { for (var i = 0; i < AURA_STATES.length; i++) if (AURA_STATES[i][0] === code) return AURA_STATES[i][1]; return ''; }
  var auraDate = function (d) { if (!d) return ''; var x = new Date(d); return isNaN(x) ? String(d) : x.toLocaleDateString('en-GB'); };
function auraInvoiceHtml(v) {
  var line = '<div class="ln"></div>';
  var row = function (a, b, bold) { return '<div class="row' + (bold ? ' b' : '') + '"><span>' + a + '</span><span>' + b + '</span></div>'; };
  var period = (v.period_from && v.period_to) ? '<div class="small">Period: ' + esc(auraDate(v.period_from)) + ' to ' + esc(auraDate(v.period_to)) + '</div>' : '';
  var tax = v.igst > 0 ? row('IGST 18%', auraMoney(v.igst)) : row('CGST 9%', auraMoney(v.cgst)) + row('SGST 9%', auraMoney(v.sgst));
  var verify = 'AuraScale tax invoice ' + v.invoice_no + ' | GSTIN ' + v.supplier_gstin + ' | ' + auraDate(v.invoice_date) + ' | Rs ' + Number(v.total).toFixed(2) + ' | ' + v.status.toUpperCase();
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(v.invoice_no) + '</title>'
    + '<style>body{margin:0;background:#eee;font-family:"Courier New",monospace;color:#111}.rc{width:320px;margin:16px auto;background:#fff;padding:18px 16px;box-shadow:0 1px 4px rgba(0,0,0,.15)}'
    + '.c{text-align:center}.h{font-weight:700;font-size:15px}.small{font-size:11.5px;line-height:1.45}.ln{border-top:1px dashed #555;margin:8px 0}'
    + '.row{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;line-height:1.6}.b{font-weight:700;font-size:14px}.paid{display:inline-block;border:2px solid #0b7a52;color:#0b7a52;font-weight:700;padding:2px 10px;margin:4px 0}'
    + '#qr{display:flex;justify-content:center;margin:8px 0}.bar{width:320px;margin:0 auto 16px;display:flex;gap:8px}.bar button{flex:1;padding:10px;font:600 13px sans-serif;border:0;border-radius:8px;background:#0b4f3a;color:#fff;cursor:pointer}'
    + '@media print{body{background:#fff}.rc{box-shadow:none;margin:0 auto}.bar{display:none}}</style></head><body>'
    + '<div class="rc"><div class="c h">TAX INVOICE</div>' + line
    + '<div class="c"><b>' + esc(v.supplier_trade) + '</b></div><div class="c small">' + esc(v.supplier_name) + ' (Proprietor)<br>' + esc(v.supplier_address) + '<br>GSTIN: ' + esc(v.supplier_gstin) + '<br>State: ' + esc(v.supplier_state) + '</div>'
    + '<div class="c"><span class="paid">' + (v.status === 'paid' ? 'PAID' : esc(v.status.toUpperCase())) + '</span></div>' + line
    + row('Invoice No:', esc(v.invoice_no)) + row('Date:', esc(auraDate(v.invoice_date))) + line
    + '<div class="small"><b>Billed to:</b><br>' + esc(v.buyer_name) + (v.buyer_address ? '<br>' + esc(v.buyer_address) : '') + (v.buyer_gstin ? '<br>GSTIN: ' + esc(v.buyer_gstin) : '<br>GSTIN: Unregistered')
    + '<br>State: ' + esc(auraStateName(v.buyer_state_code)) + ' (' + esc(v.buyer_state_code) + ')<br>Place of supply: ' + esc(auraStateName(v.buyer_state_code)) + '</div>' + line
    + '<div class="small"><b>' + esc(v.description) + '</b><br>SAC: ' + esc(v.sac) + '</div>' + period
    + row('Taxable value', auraMoney(v.taxable)) + tax + line
    + row('TOTAL Rs', auraMoney(v.total), true) + line
    + row('Paid by', esc(v.payment_method || '-')) + (v.payment_ref ? row('Ref', esc(v.payment_ref)) : '') + row('Paid on', esc(auraDate(v.paid_at)))
    + '<div class="small">Tax is not payable on reverse charge basis.</div>' + line
    + '<div id="qr"></div><div class="c small">Scan to verify this invoice</div>' + line
    + '<div class="c small">Computer-generated invoice. No signature required.<br>Thank you for choosing AuraScale.<br>ceo@aurascale.in &middot; +91 80174 65987</div></div>'
    + '<div class="bar"><button onclick="window.print()">Download PDF / Print</button><button onclick="window.close()" style="background:#666">Close</button></div>'
    + '<script src="' + AURA_QR_LIB + '"><\/script><script>try{new QRCode(document.getElementById("qr"),{text:' + JSON.stringify(verify) + ',width:120,height:120});}catch(e){}<\/script>'
    + '</body></html>';
}

  window.auraInvOpen = function (v) {
    if (!v) return;
    var w = window.open('', '_blank');
    if (!w) { alert('Please allow pop-ups for this site to view the invoice.'); return; }
    w.document.open(); w.document.write(auraInvoiceHtml(v)); w.document.close();
  };
})();
