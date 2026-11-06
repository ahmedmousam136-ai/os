/* AuraScale — attendance first (SQL 56).
   In every staff portal (reception, pharmacy, lab, wholesale, doctor): a staff login sees a full screen
   "Check in" first and can use the portal only after one tap. Signing out asks "Check out?".
   The owner never sees this. If the server is not ready (SQL 56 not run / offline) nothing is blocked. */
(function () {
  if (window.AuraAttend) return;
  var A = window.AuraAttend = { st: null, clinic: null, ready: false };

  var css = '#aa-wall{position:fixed;inset:0;z-index:2147483000;background:linear-gradient(160deg,#0b6b4a,#0a4f39);color:#fff;display:flex;align-items:center;justify-content:center;padding:20px;font-family:"DM Sans",system-ui,sans-serif}'
    + '#aa-wall .bx{max-width:420px;width:100%;text-align:center}#aa-wall .hi{font-size:15px;opacity:.85}#aa-wall .nm{font-size:28px;font-weight:800;margin:6px 0 2px}#aa-wall .dt{font-size:14px;opacity:.8}'
    + '#aa-wall .clk{font-size:54px;font-weight:800;letter-spacing:1px;margin:22px 0 4px}#aa-wall .go{display:block;width:100%;margin:22px 0 10px;padding:22px;border:0;border-radius:20px;background:#fff;color:#0b6b4a;font-size:22px;font-weight:800;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25)}'
    + '#aa-wall .go:disabled{opacity:.7}#aa-wall .er{background:rgba(255,255,255,.14);border-radius:12px;padding:10px 12px;font-size:14px;margin-top:8px;display:none}#aa-wall .so{color:#fff;opacity:.75;font-size:13px;background:none;border:0;text-decoration:underline;cursor:pointer;margin-top:14px}'
    + '#aa-wall .ok{display:none;margin:18px auto 0;width:128px;height:128px}#aa-wall .ok .c{fill:#fff;transform-origin:50% 50%;animation:aapop .45s cubic-bezier(.2,1.4,.4,1) both}'
    + '#aa-wall .ok .k,.aa-tk .k{fill:none;stroke:#16a34a;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:80;stroke-dashoffset:80;animation:aadraw .38s .3s ease-out forwards}'
    + '.aa-tk{position:fixed;inset:0;z-index:2147483002;background:rgba(255,255,255,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"DM Sans",system-ui,sans-serif;text-align:center}'
    + '.aa-tk svg{width:128px;height:128px}.aa-tk .c{fill:#16a34a;transform-origin:50% 50%;animation:aapop .45s cubic-bezier(.2,1.4,.4,1) both}.aa-tk .k{stroke:#fff}.aa-tk b{font-size:23px;color:#0b6b4a;margin-top:14px}.aa-tk span{font-size:15px;color:#444;margin-top:6px}'
    + '@keyframes aapop{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes aadraw{to{stroke-dashoffset:0}}'
    + '#aa-chip{position:fixed;left:12px;bottom:14px;z-index:2147482000;background:#fff;color:#0b6b4a;border:1.5px solid #0b6b4a;border-radius:999px;padding:7px 12px;font:600 12.5px "DM Sans",system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.12);cursor:pointer;display:flex;gap:6px;align-items:center}'
    + '@media(max-width:820px){#aa-chip{bottom:78px;left:8px;padding:6px 10px;font-size:12px}}'
    + '#aa-md{position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"DM Sans",system-ui,sans-serif}'
    + '#aa-md .bx{background:#fff;color:#111;border-radius:18px;max-width:380px;width:100%;padding:20px;text-align:center}#aa-md h3{margin:4px 0 6px;font-size:19px}#aa-md p{margin:0 0 14px;color:#555;font-size:14px}'
    + '#aa-md button{display:block;width:100%;padding:13px;border-radius:12px;border:1.5px solid #ddd;background:#fff;font:700 15px "DM Sans",system-ui,sans-serif;margin-top:8px;cursor:pointer}#aa-md button.p{background:#b42318;border-color:#b42318;color:#fff}#aa-md button.g{background:#0b6b4a;border-color:#0b6b4a;color:#fff}';
  function addCss() { if (document.getElementById('aa-css')) return; var s = document.createElement('style'); s.id = 'aa-css'; s.textContent = css; document.head.appendChild(s); }
  function sb() { return typeof _supa !== 'undefined' ? _supa : null; }
  function cid() { return typeof _clinicId !== 'undefined' && _clinicId ? _clinicId : null; }
  function hm(t) { return t ? new Date(t).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }) : ''; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function errText(e) { return String((e && (e.message || e.error_description)) || e || '').replace(/^NEED_LOCATION:\s*/, ''); }
  function ding() {
    try { if (navigator.vibrate) navigator.vibrate([60, 40, 60]); } catch (e) {}
    try {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return; var x = new C();
      [[880, 0], [1320, 0.13]].forEach(function (n) { var o = x.createOscillator(), g = x.createGain(); o.frequency.value = n[0];
        g.gain.setValueAtTime(0.0001, x.currentTime + n[1]); g.gain.exponentialRampToValueAtTime(0.25, x.currentTime + n[1] + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, x.currentTime + n[1] + 0.35);
        o.connect(g); g.connect(x.destination); o.start(x.currentTime + n[1]); o.stop(x.currentTime + n[1] + 0.4); });
    } catch (e) {}
  }
  function where() {
    return new Promise(function (res, rej) {
      if (!navigator.geolocation) { rej(new Error('This phone cannot give its location.')); return; }
      navigator.geolocation.getCurrentPosition(function (p) { res(p.coords); }, function (e) {
        rej(new Error(e.code === 1 ? 'Location is blocked. Allow location for this site in the browser settings, then try again.' : 'Could not get the location. Turn on GPS and try again.'));
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
    });
  }
  async function punch(kind) {
    var args = { p_clinic: A.clinic, p_kind: kind };
    if (kind === 'in' && A.st && A.st.need_location) { var c = await where(); args.p_lat = c.latitude; args.p_lng = c.longitude; }
    var r = await sb().rpc('hr_punch', args);
    if (r.error && /NEED_LOCATION/.test(r.error.message || '') && !args.p_lat) { var c2 = await where(); args.p_lat = c2.latitude; args.p_lng = c2.longitude; r = await sb().rpc('hr_punch', args); }
    if (r.error) throw r.error;
    A.st.in_at = r.data.in_at; A.st.out_at = r.data.out_at; A.st.late = r.data.late;
    return r.data;
  }

  /* ---------- the "Check in" wall ---------- */
  function hello() { var h = +new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }); return h < 12 ? 'সুপ্রভাত · Good morning' : h < 17 ? 'নমস্কার · Good afternoon' : 'শুভ সন্ধ্যা · Good evening'; }
  function wall() {
    if (document.getElementById('aa-wall')) return;
    addCss();
    var back = A.st.out_at;
    var w = document.createElement('div'); w.id = 'aa-wall';
    w.innerHTML = '<div class="bx"><div class="hi">' + hello() + '</div><div class="nm">' + esc(A.st.name || '') + '</div>'
      + '<div class="dt">' + new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' }) + '</div>'
      + '<div class="clk" id="aa-clk"></div><svg class="ok" id="aa-ok" viewBox="0 0 100 100"><circle class="c" cx="50" cy="50" r="44"/><path class="k" d="M29 51 L44 66 L72 37"/></svg>'
      + '<button class="go" id="aa-go">' + (back ? '&#9654; আবার কাজ শুরু · Back to work' : '&#10004; হাজিরা দিন · Check in') + '</button>'
      + '<div style="font-size:13px;opacity:.8">' + (back ? 'You checked out at ' + hm(back) + ' today.' : 'AuraScale খুলতে আগে হাজিরা দিন') + '</div>'
      + '<div class="er" id="aa-er"></div><button class="so" id="aa-so">Sign out</button></div>';
    document.body.appendChild(w);
    var tick = function () { var c = document.getElementById('aa-clk'); if (c) c.textContent = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }); };
    tick(); A.clkT = setInterval(tick, 15000);
    document.getElementById('aa-so').onclick = function () { (A.logout || window.handleLogout)(); };
    document.getElementById('aa-go').onclick = async function () {
      var b = this, er = document.getElementById('aa-er'); er.style.display = 'none'; b.disabled = true;
      b.textContent = A.st.need_location ? 'Checking the location…' : 'Saving…';
      try {
        var d = await punch('in');
        ding();
        document.getElementById('aa-clk').style.display = 'none'; document.getElementById('aa-ok').style.display = 'block';
        b.style.display = 'none';
        b.nextSibling.innerHTML = '<b style="font-size:18px">' + (d.resumed ? 'Welcome back' : 'Checked in ' + hm(d.in_at)) + '</b>' + (d.late && !d.resumed ? ' · late' : '');
        setTimeout(function () { clearInterval(A.clkT); w.remove(); chip(); }, 1800);
      } catch (e) {
        er.textContent = errText(e); er.style.display = 'block'; b.disabled = false;
        b.innerHTML = back ? '&#9654; আবার কাজ শুরু · Back to work' : '&#10004; হাজিরা দিন · Check in';
      }
    };
  }

  /* ---------- a day off: the portal stays locked ---------- */
  function offWall() {
    if (document.getElementById('aa-wall')) return;
    addCss();
    var r = A.st.reason || '', why = r === 'weekly' ? 'আজ আপনার সাপ্তাহিক ছুটি' + (A.st.weekly_day ? ' (' + A.st.weekly_day + ')' : '') : r === 'leave' ? 'আজ আপনার ছুটি (leave)' : r.indexOf('holiday: ') === 0 ? 'আজ ছুটির দিন: ' + r.slice(9) : 'আজ আপনার ছুটি';
    var w = document.createElement('div'); w.id = 'aa-wall'; w.style.background = 'linear-gradient(160deg,#3b4a5c,#24303d)';
    w.innerHTML = '<div class="bx"><div style="font-size:64px">&#127796;</div><div class="nm">' + esc(A.st.name || '') + '</div>'
      + '<div style="font-size:19px;font-weight:700;margin-top:10px">' + esc(why) + '</div>'
      + '<div style="font-size:14px;opacity:.85;margin-top:10px">Today is a day off, so AuraScale stays closed for you.<br>If you have to work today, ask the owner to mark you <b>Present</b> for today, then open again.</div>'
      + '<button class="go" id="aa-again" style="font-size:17px;padding:16px">&#8635; Check again</button><button class="so" id="aa-so">Sign out</button></div>';
    document.body.appendChild(w);
    document.getElementById('aa-so').onclick = function () { (A.logout || window.handleLogout)(); };
    document.getElementById('aa-again').onclick = function () { w.remove(); check(); };
  }

  /* ---------- "on duty" chip ---------- */
  function chip() {
    addCss(); var c = document.getElementById('aa-chip');
    if (!A.st || !A.st.in_at || A.st.out_at) { if (c) c.remove(); return; }
    if (!c) { c = document.createElement('div'); c.id = 'aa-chip'; document.body.appendChild(c); c.onclick = function () { ask(false); }; }
    c.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#16a34a;display:inline-block"></span> On duty since ' + hm(A.st.in_at) + ' · <u>Check out</u>';
  }

  /* ---------- check out (also asked when signing out) ---------- */
  function ask(signingOut) {
    return new Promise(function (done) {
      addCss();
      var m = document.createElement('div'); m.id = 'aa-md';
      m.innerHTML = '<div class="bx"><div style="font-size:40px">&#128075;</div><h3>' + (signingOut ? 'Going home?' : 'Check out now?') + '</h3>'
        + '<p>On duty since <b>' + hm(A.st.in_at) + '</b>. Check out so today&rsquo;s hours are saved.</p>'
        + '<button class="p" id="aa-out">&#10004; Check out' + (signingOut ? ' &amp; sign out' : '') + '</button>'
        + (signingOut ? '<button id="aa-only">Sign out only (I will come back today)</button>' : '')
        + '<button id="aa-no">Cancel</button><div id="aa-mer" style="color:#b42318;font-size:13px;margin-top:8px"></div></div>';
      document.body.appendChild(m);
      var close = function (v) { m.remove(); done(v); };
      document.getElementById('aa-no').onclick = function () { close('cancel'); };
      if (signingOut) document.getElementById('aa-only').onclick = function () { close('only'); };
      document.getElementById('aa-out').onclick = async function () {
        this.disabled = true; this.textContent = 'Saving…';
        try { var d = await punch(signingOut ? 'signout' : 'out'); ding(); chip(); m.remove(); await tick('Checked out ' + hm(d.out_at), 'Have a good evening!'); done('out'); }
        catch (e) { document.getElementById('aa-mer').textContent = errText(e); this.disabled = false; this.textContent = 'Check out'; }
      };
    });
  }
  function toast(t) { if (typeof showToast === 'function') showToast(t); }
  function tick(title, sub) {
    addCss(); var d = document.createElement('div'); d.className = 'aa-tk';
    d.innerHTML = '<svg viewBox="0 0 100 100"><circle class="c" cx="50" cy="50" r="44"/><path class="k" d="M29 51 L44 66 L72 37"/></svg><b>' + title + '</b><span>' + (sub || '') + '</span>';
    document.body.appendChild(d); d.onclick = function () { d.remove(); };
    return new Promise(function (res) { setTimeout(function () { d.remove(); res(); }, 1700); });
  }
  function hookLogout() {
    if (A.hooked || typeof window.handleLogout !== 'function') return;
    A.hooked = true; A.logout = window.handleLogout;
    window.handleLogout = async function () {
      if (A.st && A.st.mode === 'staff' && A.st.in_at && !A.st.out_at) {
        var v = await ask(true);
        if (v === 'cancel') return;
      }
      return A.logout.apply(this, arguments);
    };
  }

  /* ---------- start ---------- */
  async function check() {
    var r; try { r = await sb().rpc('hr_gate', { p_clinic: A.clinic }); } catch (e) { return; }
    if (r.error || !r.data) return;            /* server not ready: never block */
    A.st = r.data; A.ready = true;
    if (A.st.mode === 'off') { offWall(); return; }
    if (A.st.mode !== 'staff') return;
    hookLogout();
    if (!A.st.in_at || A.st.out_at) wall(); else chip();
  }
  var tries = 0;
  (function go() {
    if (!sb() || !cid() || !document.body) { if (++tries < 120) setTimeout(go, 500); return; }
    A.clinic = cid(); check();
  })();
  /* a new day while the page stays open: ask again */
  setInterval(function () { if (A.ready && A.st && (A.st.mode === 'staff' || A.st.mode === 'off') && !document.getElementById('aa-wall')) { var d0 = A.day; A.day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); if (d0 && d0 !== A.day) check(); } }, 60000);
  A.day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
})();
