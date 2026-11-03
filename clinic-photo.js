/* clinic-photo.js — three photo helpers for clinic.html (needs pharmacy-bill-scan 2026-11-03d and SQL 46)
   1. New appointment  → "Scan ID card": fills name, age / date of birth, gender, mobile. The ID number is never read or kept.
   2. Prescription     → "Photo of handwritten Rx": fills the medicine rows (unsure ones turn yellow), advice and follow-up.
   3. Patient profile  → "Old Records": photo of an old prescription / report → saved to the patient's history with a short summary.
   All three also take drag & drop and Ctrl+V (aura-drop.js). */
(function () {
  if (window.__clinicPhoto) return; window.__clinicPhoto = true;
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(m) { try { showToast(m); } catch (e) { alert(m); } }
  function cid() { try { return _clinicId; } catch (e) { return null; } }
  function sb() { try { return _supa; } catch (e) { return null; } }

  var css = document.createElement('style');
  css.textContent = '.cp-btn{display:inline-flex;align-items:center;gap:7px;cursor:pointer;border:1px dashed var(--blue-border,#93c5fd);background:var(--blue-bg,#eff6ff);color:var(--blue,#2563eb);'
    + 'border-radius:8px;padding:8px 12px;font:600 12.5px/1.2 inherit;margin:0}.cp-btn:hover{border-style:solid}.cp-btn input{display:none}'
    + '.cp-st{font-size:12px;color:var(--text-secondary,#555);margin-top:6px;line-height:1.45}.cp-st .w{color:#92400E}.cp-st .e{color:var(--red,#dc2626)}'
    + '.cp-spin{display:inline-block;width:12px;height:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:cpspin .7s linear infinite;vertical-align:-2px;margin-right:6px}'
    + '@keyframes cpspin{to{transform:rotate(360deg)}}.rx-med-row.cp-unsure .finput{background:#FEF3C7!important;border-color:#F59E0B!important}'
    + '.cp-rec{border:1px solid var(--border,#e5e7eb);border-radius:10px;padding:12px 14px;margin-bottom:10px;background:var(--surface,#fff)}'
    + '.cp-rec h4{margin:0 0 4px;font-size:13.5px;color:var(--text-primary,#111)}.cp-rec .m{font-size:11.5px;color:var(--text-secondary,#666)}'
    + '.cp-rec table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}.cp-rec td,.cp-rec th{border-bottom:1px solid var(--border,#eee);padding:4px 6px;text-align:left}'
    + '.cp-rec .fH{color:#b91c1c;font-weight:700}.cp-rec .fL{color:#1d4ed8;font-weight:700}.cp-rec .acts{display:flex;gap:8px;margin-top:8px}'
    + '.cp-rec .acts button{border:1px solid var(--border,#ddd);background:transparent;border-radius:6px;padding:4px 10px;font-size:11.5px;cursor:pointer;color:var(--text-primary,#111)}';
  document.head.appendChild(css);

  function resize(file) {
    return new Promise(function (res, rej) {
      if (!/^image\//.test(file.type || '')) { rej(new Error('Please choose a photo (JPG / PNG).')); return; }
      var fr = new FileReader();
      fr.onload = function () { var im = new Image(); im.onload = function () {
        var k = Math.min(1, 2200 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.85)); };
        im.onerror = function () { rej(new Error('This file is not a picture.')); }; im.src = fr.result; };
      fr.onerror = function () { rej(new Error('Could not read the file.')); }; fr.readAsDataURL(file);
    });
  }
  var WHY = { daily_limit: "Today's photo limit is used up. Please type it in.", ai_key_not_set: 'Photo reading is not set up on the server yet.',
    not_allowed: 'Your login cannot use photo reading for this clinic.', nothing_read: 'Nothing could be read. Take a clearer photo in good light, whole paper in the frame.' };
  async function scan(kind, dataUrl) {
    var r = await sb().functions.invoke('pharmacy-bill-scan', { body: { clinic_id: cid(), image_base64: dataUrl.split(',')[1], mime_type: 'image/jpeg', kind: kind } });
    var d = r.data; if (r.error) { try { if (r.error.context && r.error.context.json) d = await r.error.context.json(); } catch (e) {} }
    if (!d || !d.ok || d.kind !== kind) throw new Error(WHY[d && d.reason] || ((d && d.ok) ? 'Please update the pharmacy-bill-scan function on the server (version 2026-11-03d).' : 'Could not read the photo. Please try again or type it in.'));
    return d;
  }
  function busy(st, msg) { st.innerHTML = '<span class="cp-spin"></span>' + esc(msg); }
  function fail(st, e) { st.innerHTML = '<span class="e">&#9888; ' + esc(e && e.message || e) + '</span>'; }
  function button(id, text, fn) {
    var l = document.createElement('label'); l.className = 'cp-btn'; l.innerHTML = '&#128247; ' + text + '<input type="file" accept="image/*" id="' + id + '"/>';
    l.querySelector('input').addEventListener('change', function () { var f = this.files && this.files[0]; this.value = ''; if (f) fn(f); });
    return l;
  }
  function setVal(el, v) { if (!el || v == null || v === '') return false; el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); return true; }

  /* ---------- 1. ID card at registration ---------- */
  function addIdScan() {
    var phone = $('add-phone'); if (!phone || $('cp-id')) return;
    var host = phone.closest('.mb'); if (!host) return;
    var box = document.createElement('div');
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"></div><p class="qp-hint" style="margin-top:4px">Aadhaar / Voter ID / PAN / Driving licence. Only name, age, gender and mobile are filled. The ID number and the photo are not saved.</p><div class="cp-st" id="cp-id-st"></div>';
    box.firstChild.appendChild(button('cp-id', 'Scan ID card', idPick));
    host.insertBefore(box, host.firstChild);
  }
  async function idPick(f) {
    var st = $('cp-id-st'); busy(st, 'Reading the ID card… about 10 seconds.');
    try {
      var d = await scan('clid', await resize(f)), done = [];
      var ph = $('add-phone');
      if (d.phone && ph && !ph.value.trim()) {
        ph.value = d.phone; done.push('mobile');
        /* look the number up now (an existing patient's own record wins), then fill the rest */
        try { add_onPhoneInput(); clearTimeout(_addPhoneTimer); await add_lookupPhone(); } catch (e) {}
        try { if (_addLookupState && _addLookupState.status === 'existing') { st.innerHTML = '&#10003; This mobile is an <b>existing patient</b>, their saved record is loaded.'; return; } } catch (e) {}
      }
      var nm = $('add-name'); if (d.name && nm && !nm.readOnly && !nm.value.trim() && setVal(nm, d.name)) done.push('name');
      var g = $('add-gender'); if (d.gender && g && !g.value && setVal(g, d.gender)) done.push('gender');
      var dob = $('add-dob'); if (d.dob && dob && !dob.value) { setVal(dob, d.dob); try { add_onDobChange(); } catch (e) {} done.push('date of birth'); }
      var age = $('add-age'); if (!d.dob && d.age && age && !age.value && setVal(age, d.age)) done.push('age');
      st.innerHTML = done.length ? '&#10003; Filled: <b>' + esc(done.join(', ')) + '</b>. Please check them before saving.' : '<span class="w">Nothing new to fill (the boxes already had values, or the card was not clear).</span>';
    } catch (e) { fail(st, e); }
  }

  /* ---------- 2. Handwritten prescription → medicine rows ---------- */
  function addRxScan() {
    var meds = $('rx-meds'); if (!meds || $('cp-rx')) return;
    var box = document.createElement('div'); box.style.cssText = 'margin:0 0 8px';
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"></div><div class="cp-st" id="cp-rx-st">Wrote it by hand? Take a photo and the medicines are typed for you.</div>';
    box.firstChild.appendChild(button('cp-rx', 'Photo of handwritten Rx', rxPick));
    meds.parentNode.insertBefore(box, meds);
  }
  async function rxPick(f) {
    var st = $('cp-rx-st'); busy(st, 'Reading the prescription… about 15-25 seconds.');
    try {
      var d = await scan('clrx', await resize(f)), wrap = $('rx-meds');
      [].slice.call(wrap.querySelectorAll('.rx-med-row')).forEach(function (r) { if (!r.querySelector('.rx-m-name').value.trim()) r.remove(); });
      var have = [].map.call(wrap.querySelectorAll('.rx-m-name'), function (i) { return i.value.trim().toLowerCase(); });
      var added = 0, check = 0, skip = 0;
      d.meds.forEach(function (m) {
        if (have.indexOf(String(m.name).toLowerCase()) >= 0) { skip++; return; }
        addMedRow(m.name, m.dose || '', m.days != null ? String(m.days) : '', m.timing || 'After Food');
        var row = wrap.lastElementChild; added++;
        if (m.sure !== 'high') { row.classList.add('cp-unsure'); row.title = 'Written: ' + (m.raw || m.name) + ' · CHECK THIS'; check++;
          row.addEventListener('input', function () { row.classList.remove('cp-unsure'); row.title = ''; }, { once: true }); }
      });
      var extra = [];
      var ins = $('rx-instr'); if (d.advice && ins && !ins.value.trim()) { ins.value = d.advice; extra.push('advice'); }
      var fu = $('rx-followup');
      if (d.followup_days && fu && !fu.value && fu.querySelector('option[value="' + d.followup_days + '"]')) { fu.value = String(d.followup_days); try { rxOnFollowupChange(); } catch (e) {} extra.push('follow-up ' + d.followup_days + ' days'); }
      if (!wrap.querySelector('.rx-med-row')) addMedRow();
      st.innerHTML = '&#10003; <b>' + added + '</b> medicine' + (added === 1 ? '' : 's') + ' added' + (check ? ' · <span class="w">&#128993; ' + check + ' to check (yellow)</span>' : '')
        + (skip ? ' · ' + skip + ' already there' : '') + (extra.length ? ' · also filled: ' + esc(extra.join(', ')) : '')
        + (d.complaint ? '<br>Complaint / diagnosis on paper: <b>' + esc(d.complaint) + '</b>' : '')
        + '<br><span class="w">The doctor must check every medicine and dose before generating the prescription.</span>';
    } catch (e) { fail(st, e); }
  }

  /* ---------- 3. Old records in the patient profile ---------- */
  var KIND = { prescription: 'Old prescription', lab_report: 'Lab / blood report', imaging: 'X-ray / scan report', discharge: 'Discharge summary', other: 'Medical paper' };
  var RECS = [];
  function addRecords() {
    var qb = $('pp-quickbar'), hist = $('pp-sec-history'); if (!qb || !hist || $('pp-sec-records')) return;
    var b = document.createElement('button'); b.className = 'tl-qbtn'; b.id = 'cp-rec-tab';
    b.innerHTML = '&#128247; Old Records <span class="pb pb-b" id="cp-rec-count" style="margin-left:4px">0</span>';
    b.onclick = function () { ppShowSection('records', b); };
    var dl = [].filter.call(qb.children, function (x) { return /ppDownloadSummary/.test(x.getAttribute('onclick') || ''); })[0];
    qb.insertBefore(b, dl || null);
    var sec = document.createElement('div'); sec.className = 'tl-section'; sec.id = 'pp-sec-records';
    sec.innerHTML = '<div class="panel"><div class="ph"><div class="pt">Old Records</div></div><div style="padding:14px 16px">'
      + '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap" id="cp-rec-btns"></div>'
      + '<p class="qp-hint" style="margin-top:4px">Old prescription, blood report, X-ray report or discharge paper the patient brought. Photo is kept safely; the main facts are typed into this list.</p>'
      + '<div class="cp-st" id="cp-rec-st"></div><div id="cp-rec-list" style="margin-top:12px"></div></div></div>';
    hist.parentNode.appendChild(sec);
    $('cp-rec-btns').appendChild(button('cp-rec', 'Add photo of old paper', recPick));
  }
  function pid() { try { return _ppCurrentPatient && _ppCurrentPatient.patient && _ppCurrentPatient.patient.id; } catch (e) { return null; } }
  async function recLoad() {
    var p = pid(), list = $('cp-rec-list'); if (!p || !list) return;
    var r = await sb().from('clinic_records').select('*').eq('clinic_id', cid()).eq('patient_id', p).order('created_at', { ascending: false });
    if (r.error) { list.innerHTML = '<p class="qp-hint">' + (/clinic_records/.test(r.error.message || '') ? 'Old Records needs SQL 46 to be run once on the server.' : esc(r.error.message)) + '</p>'; RECS = []; }
    else RECS = r.data || [];
    $('cp-rec-count').textContent = RECS.length;
    if (!r.error) recRender();
  }
  function recRender() {
    var list = $('cp-rec-list');
    if (!RECS.length) { list.innerHTML = '<div class="empty"><div class="empty-ic">&#128203;</div><p class="empty-t">No old records yet</p><p class="empty-s">Take a photo of any old paper the patient brings.</p></div>'; return; }
    list.innerHTML = RECS.map(function (x, i) {
      var d = x.data || {}, tests = d.tests || [], meds = d.medicines || [];
      return '<div class="cp-rec"><h4>' + esc(KIND[x.rec_kind] || 'Medical paper') + (x.rec_date ? ' · ' + esc(x.rec_date) : '') + '</h4>'
        + '<div class="m">' + esc([d.doctor, d.place].filter(Boolean).join(' · ') || '—') + ' · added ' + esc(new Date(x.created_at).toLocaleDateString('en-IN')) + '</div>'
        + (x.summary ? '<div style="margin-top:6px;font-size:12.5px">' + esc(x.summary) + '</div>' : '')
        + (d.diagnosis ? '<div style="margin-top:4px;font-size:12.5px"><b>Diagnosis:</b> ' + esc(d.diagnosis) + '</div>' : '')
        + (meds.length ? '<table><tr><th>Medicine</th><th>Dose</th><th>Days</th></tr>' + meds.map(function (m) { return '<tr><td>' + esc(m.name) + '</td><td>' + esc(m.dose || '') + '</td><td>' + esc(m.days || '') + '</td></tr>'; }).join('') + '</table>' : '')
        + (tests.length ? '<table><tr><th>Test</th><th>Result</th><th>Normal range</th></tr>' + tests.map(function (t) { return '<tr><td>' + esc(t.name) + '</td><td class="' + (t.flag ? 'f' + t.flag : '') + '">' + esc(t.value) + (t.unit ? ' ' + esc(t.unit) : '') + (t.flag === 'H' ? ' &#9650;' : t.flag === 'L' ? ' &#9660;' : '') + '</td><td>' + esc(t.range || '') + '</td></tr>'; }).join('') + '</table>' : '')
        + '<div class="acts">' + (x.photo ? '<button type="button" data-i="' + i + '" data-a="photo">View photo</button>' : '') + '<button type="button" data-i="' + i + '" data-a="del">Remove</button></div></div>';
    }).join('');
    [].forEach.call(list.querySelectorAll('button[data-a]'), function (b) { b.onclick = function () { recAct(b.getAttribute('data-a'), RECS[+b.getAttribute('data-i')]); }; });
  }
  async function recAct(a, x) {
    if (!x) return;
    if (a === 'photo') {
      var w = window.open('', '_blank');
      var s = await sb().storage.from('bills').createSignedUrl(x.photo, 600);
      if (s.error) { if (w) w.close(); toast('Could not open the photo.'); return; }
      if (w) w.location = s.data.signedUrl; else location.href = s.data.signedUrl;
      return;
    }
    if (!confirm('Remove this old record from the patient\'s file?')) return;
    var r = await sb().from('clinic_records').delete().eq('id', x.id);
    if (r.error) { toast('Could not remove: ' + r.error.message); return; }
    if (x.photo) sb().storage.from('bills').remove([x.photo]);
    recLoad();
  }
  async function recPick(f) {
    var st = $('cp-rec-st'), p = pid(); if (!p) return;
    busy(st, 'Reading the paper… about 15-30 seconds.');
    try {
      var data = await resize(f), d = await scan('clrec', data);
      var path = cid() + '/clinic/records/' + Date.now() + '.jpg';
      var blob = await (await fetch(data)).blob();
      var up = await sb().storage.from('bills').upload(path, blob, { contentType: 'image/jpeg' });
      var row = { clinic_id: cid(), patient_id: p, rec_kind: d.rec_kind, rec_date: d.date, summary: d.summary,
        data: { doctor: d.doctor, place: d.place, diagnosis: d.diagnosis, medicines: d.medicines, tests: d.tests, patient_on_paper: d.patient }, photo: up.error ? null : path };
      var r = await sb().from('clinic_records').insert(row);
      if (r.error) throw new Error(/clinic_records/.test(r.error.message || '') ? 'Old Records needs SQL 46 to be run once on the server.' : r.error.message);
      var nm = String(d.patient || '').trim().toLowerCase(), pn = String((_ppCurrentPatient.patient || {}).name || '').trim().toLowerCase();
      var warn = nm && pn && nm.indexOf(pn.split(/\s+/)[0]) < 0 && pn.indexOf(nm.split(/\s+/)[0]) < 0;
      st.innerHTML = '&#10003; Saved: <b>' + esc(KIND[d.rec_kind]) + '</b>' + (up.error ? ' <span class="w">(photo could not be kept, facts saved)</span>' : '')
        + (warn ? '<br><span class="w">&#9888; Name on the paper is <b>' + esc(d.patient) + '</b>. Make sure it belongs to this patient.</span>' : '');
      recLoad();
    } catch (e) { fail(st, e); }
  }

  function wrapProfile() {
    if (typeof window.openPatientProfile !== 'function' || window.openPatientProfile.__cp) return;
    var orig = window.openPatientProfile;
    window.openPatientProfile = async function () {
      var r = await orig.apply(this, arguments);
      try { addRecords(); var l = $('cp-rec-list'); if (l) l.innerHTML = ''; $('cp-rec-st').innerHTML = ''; await recLoad(); } catch (e) {}
      return r;
    };
    window.openPatientProfile.__cp = true;
  }
  function init() { addIdScan(); addRxScan(); addRecords(); wrapProfile(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
