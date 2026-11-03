/* clinic-queue.js — WhatsApp token booking for clinic.html (needs SQL 47 and the clinic-queue function)
   • Dashboard queue: "Now: token N" + "Call next patient" (moves the queue and sends WhatsApp to the patients concerned)
   • "WhatsApp booking QR": the clinic's QR poster to print, average minutes per patient, bookings on / off */
(function () {
  if (window.__clinicQueue) return; window.__clinicQueue = true;
  var WA_NUMBER = '916289246076';   /* AuraScale WhatsApp number the QR opens */
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(m) { try { showToast(m); } catch (e) {} }
  function cid() { try { return _clinicId; } catch (e) { return null; } }
  function sb() { try { return _supa; } catch (e) { return null; } }
  var SET = null;

  var css = document.createElement('style');
  css.textContent = '.cq-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 14px;border-bottom:1px solid var(--border);background:var(--surface2,var(--bg))}'
    + '.cq-now{font-size:12px;color:var(--text-secondary);margin-right:auto}.cq-now b{font-size:15px;color:var(--text-primary);margin-left:4px}'
    + '.cq-btn{display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:8px 12px;font:600 12.5px/1.2 inherit;cursor:pointer;border:1px solid var(--border-mid,var(--border));background:var(--surface);color:var(--text-primary)}'
    + '.cq-btn.pri{background:var(--green,#12976A);border-color:var(--green,#12976A);color:#fff}.cq-btn:disabled{opacity:.6;cursor:default}'
    + '.cq-ov{position:fixed;inset:0;z-index:9000;background:rgba(10,20,15,.45);display:flex;align-items:flex-start;justify-content:center;padding:24px 14px;overflow:auto}'
    + '.cq-md{background:var(--surface,#fff);color:var(--text-primary);border-radius:16px;width:min(460px,100%);padding:18px;box-shadow:0 20px 50px rgba(0,0,0,.25)}'
    + '.cq-md h3{font-size:16px;margin:0 0 4px}.cq-md p{font-size:12.5px;color:var(--text-secondary);line-height:1.55}'
    + '.cq-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid var(--border);font-size:13px}'
    + '.cq-row input[type=number]{width:70px;padding:6px 8px;border:1px solid var(--border-mid,var(--border));border-radius:8px;background:var(--bg);color:var(--text-primary);font:inherit}'
    + '#cq-qr{display:flex;justify-content:center;padding:14px 0}#cq-qr img,#cq-qr canvas{width:200px!important;height:200px!important}';
  document.head.appendChild(css);

  function waLink(code) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('BOOK ' + code); }
  async function settings(force) {
    if (SET && !force) return SET;
    var r = await sb().rpc('clq_settings', { p_clinic: cid() });
    if (r.error) { throw new Error(/clq_settings/.test(r.error.message || '') ? 'WhatsApp booking needs SQL 47 to be run once on the server.' : r.error.message); }
    SET = r.data; return SET;
  }

  /* ---------- queue bar ---------- */
  function addBar() {
    var list = $('queue-list'); if (!list || $('cq-bar')) return;
    var bar = document.createElement('div'); bar.className = 'cq-bar'; bar.id = 'cq-bar';
    bar.innerHTML = '<span class="cq-now" id="cq-now">Now with doctor:<b>—</b></span>'
      + '<button class="cq-btn" type="button" id="cq-qr-btn">&#128242; WhatsApp booking QR</button>'
      + '<button class="cq-btn pri" type="button" id="cq-next">&#128226; Call next patient</button>';
    list.parentNode.insertBefore(bar, list);
    $('cq-next').onclick = callNext; $('cq-qr-btn').onclick = openQr;
    paintNow();
  }
  function today() { var d = new Date(Date.now() + 330 * 60000); return d.toISOString().slice(0, 10); }
  function paintNow() {
    var el = $('cq-now'); if (!el) return;
    var all = window._auraAllAppointments || [], d = today();
    var cur = all.filter(function (a) { return String(a.appointment_date) === d && a.status === 'In Consultation'; })
                 .sort(function (a, b) { return (b.token || 0) - (a.token || 0); })[0];
    var wait = all.filter(function (a) { return String(a.appointment_date) === d && (!a.status || a.status === 'Waiting' || a.status === 'Checked In'); }).length;
    el.innerHTML = 'Now with doctor:<b>' + (cur ? 'Token ' + esc(cur.token || '?') + ' · ' + esc(cur.patient_name || '') : '—') + '</b>'
      + ' <span style="margin-left:8px">' + wait + ' waiting</span>';
  }
  async function callNext() {
    var b = $('cq-next'); if (b.disabled) return; b.disabled = true; var lbl = b.innerHTML; b.textContent = 'Calling…';
    try {
      var r = await sb().functions.invoke('clinic-queue', { body: { mode: 'call_next', clinic_id: cid() } });
      var d = r.data; if (r.error) { try { if (r.error.context && r.error.context.json) d = await r.error.context.json(); } catch (e) {} }
      if (!d || !d.ok) { toast(d && /clq_call_next/.test(d.reason || '') ? 'WhatsApp booking needs SQL 47 on the server.' : 'Could not call the next patient' + (d && d.reason ? ': ' + d.reason : '.')); return; }
      toast(d.called ? 'Token ' + d.called.token + ' · ' + (d.called.name || '') + ' called' + (d.sent ? ' · ' + d.sent + ' WhatsApp sent' : '') : 'No one is waiting. The last patient is marked Completed.');
      try { await fetchAppointments(); } catch (e) {}
    } catch (e) { toast('Could not call the next patient: ' + (e.message || e)); }
    finally { b.disabled = false; b.innerHTML = lbl; }
  }

  /* ---------- QR + settings ---------- */
  function closeQr() { var o = $('cq-ov'); if (o) o.remove(); }
  async function openQr() {
    closeQr();
    var ov = document.createElement('div'); ov.className = 'cq-ov'; ov.id = 'cq-ov';
    ov.innerHTML = '<div class="cq-md"><p>Loading…</p></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) closeQr(); });
    document.body.appendChild(ov);
    var s; try { s = await settings(true); } catch (e) { ov.firstChild.innerHTML = '<p style="color:var(--red)">&#9888; ' + esc(e.message) + '</p><div style="text-align:right;margin-top:10px"><button class="cq-btn" id="cq-x">Close</button></div>'; $('cq-x').onclick = closeQr; return; }
    ov.firstChild.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div><h3>WhatsApp token booking</h3>'
      + '<p>Patients scan this QR → WhatsApp opens → they tap Send → they get a token number, the people ahead, the time and a live link.</p></div>'
      + '<button class="cq-btn" id="cq-x" aria-label="Close">&#10005;</button></div>'
      + '<div id="cq-qr"></div><p style="text-align:center">Booking code: <b style="font-size:15px;color:var(--text-primary)">' + esc(s.code) + '</b></p>'
      + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0 6px">'
      + '<button class="cq-btn pri" id="cq-print">&#128424; Print QR poster</button><button class="cq-btn" id="cq-copy">&#128279; Copy booking link</button></div>'
      + '<div class="cq-row"><span>Bookings on WhatsApp today</span><select id="cq-open" style="padding:6px 8px;border:1px solid var(--border-mid,var(--border));border-radius:8px;background:var(--bg);color:var(--text-primary);font:inherit;font-weight:600"><option value="1"' + (s.open ? ' selected' : '') + '>On</option><option value="0"' + (s.open ? '' : ' selected') + '>Off</option></select></div>'
      + '<div class="cq-row"><span>Average minutes per patient<br><small style="color:var(--text-tertiary)">used for the waiting time patients see</small></span><span><input type="number" id="cq-avg" min="1" max="120" value="' + esc(s.avg_min) + '"/> min</span></div>'
      + '<p style="margin-top:8px">Use <b>Call next patient</b> on the Dashboard when the doctor is ready: the queue moves on the live page, and the patient called (and those 2 away) get a WhatsApp.</p></div>';
    $('cq-x').onclick = closeQr;
    try { new QRCode($('cq-qr'), { text: waLink(s.code), width: 400, height: 400, correctLevel: QRCode.CorrectLevel.M }); }
    catch (e) { $('cq-qr').innerHTML = '<p>QR could not be drawn. Link: ' + esc(waLink(s.code)) + '</p>'; }
    $('cq-copy').onclick = function () { try { navigator.clipboard.writeText(waLink(s.code)); toast('Booking link copied'); } catch (e) { prompt('Booking link', waLink(s.code)); } };
    $('cq-print').onclick = function () { printPoster(s); };
    var save = async function () {
      var r = await sb().rpc('clq_set', { p_clinic: cid(), p_avg_min: parseInt($('cq-avg').value, 10) || null, p_open: $('cq-open').value === '1' });
      if (r.error) { toast('Could not save: ' + r.error.message); return; }
      SET = r.data; toast(SET.open ? 'Saved · WhatsApp bookings are ON' : 'Saved · WhatsApp bookings are OFF');
    };
    $('cq-open').onchange = save; $('cq-avg').onchange = save;
  }
  function printPoster(s) {
    var img = $('cq-qr').querySelector('img'), cv = $('cq-qr').querySelector('canvas');
    var src = (img && img.src && img.src.indexOf('data:') === 0) ? img.src : (cv ? cv.toDataURL('image/png') : '');
    var w = window.open('', '_blank'); if (!w) { toast('Allow pop-ups to print the poster.'); return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>WhatsApp token · ' + esc(s.clinic) + '</title>'
      + '<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&display=swap" rel="stylesheet">'
      + '<style>@page{size:A4;margin:14mm}body{font-family:"Hind Siliguri",system-ui,sans-serif;text-align:center;color:#14201A;margin:0}'
      + 'h1{font-size:30pt;margin:6mm 0 2mm}h2{font-size:17pt;font-weight:500;margin:0 0 8mm;color:#0A6B4B}.qr{width:105mm;height:105mm;border:3mm solid #0A6B4B;border-radius:6mm;padding:4mm}'
      + 'ol{text-align:left;display:inline-block;font-size:15pt;line-height:1.8;margin:8mm 0}.code{font-size:13pt;color:#4B5B53}.foot{margin-top:6mm;font-size:10pt;color:#6B7C74}</style></head><body>'
      + '<h1>' + esc(s.clinic) + '</h1><h2>লাইনে না দাঁড়িয়ে WhatsApp-এ টোকেন নিন</h2>'
      + '<img class="qr" src="' + src + '" alt="QR">'
      + '<div><ol><li>ফোনের ক্যামেরায় QR স্ক্যান করুন</li><li>WhatsApp খুললে <b>Send</b> চাপুন</li><li>নাম, বয়স আর সমস্যা লিখুন</li><li>টোকেন নম্বর আর লাইভ লিংক পেয়ে যাবেন</li></ol></div>'
      + '<div class="code">QR কাজ না করলে WhatsApp করুন <b>' + WA_NUMBER.replace(/^91/, '+91 ') + '</b> নম্বরে, লিখুন: <b>BOOK ' + esc(s.code) + '</b></div>'
      + '<div class="foot">Powered by AuraScale · পালা কাছে এলে WhatsApp-এ জানিয়ে দেওয়া হবে</div>'
      + '<script>window.onload=function(){setTimeout(function(){window.print()},500)}<\/script></body></html>');
    w.document.close();
  }

  /* keep the bar in step with the queue */
  function hook() {
    if (typeof window.fetchAppointments === 'function' && !window.fetchAppointments.__cq) {
      var orig = window.fetchAppointments;
      window.fetchAppointments = async function () { var r = await orig.apply(this, arguments); try { addBar(); paintNow(); } catch (e) {} return r; };
      window.fetchAppointments.__cq = true;
    }
    addBar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook); else hook();
  /* WhatsApp bookings arrive by themselves: refresh the queue every minute while the Dashboard is open */
  setInterval(function () { if (!document.hidden && cid() && $('queue-list') && $('queue-list').offsetParent && !document.querySelector('.mod-ov.open, #cq-ov') && !(document.activeElement && /SELECT|INPUT|TEXTAREA/.test(document.activeElement.tagName))) { try { fetchAppointments(); } catch (e) {} } }, 60000);
})();
