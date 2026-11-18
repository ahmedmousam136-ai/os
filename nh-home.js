/* nh-home.js — new owner home on the Dashboard (Overview tab).
   Adds: 4 big cards (beds, today in/out, today's collection by method, total dues),
   a 7-day collection chart and a "সতর্কতা / Alerts" list (big dues, dues left after
   discharge, long stays, beds waiting for cleaning).
   It only READS data (admissions, beds, admission_charges, nh_payments). Nothing is written.
   If anything fails, the old cards stay as they were. */
(function () {
  var L = {
    en: {
      beds: 'Beds in use', free: 'free', occ: 'occupied', cln: 'cleaning', res: 'reserved',
      inout: 'Today in & out', inn: 'admitted', out: 'left',
      coll: "Today's collection", cash: 'Cash', upi: 'UPI', card: 'Card', other: 'Other',
      dues: 'Total dues', duesSub: '{n} patients owe money', urgent: '{n} urgent',
      week: 'Collection – last 7 days', weekTot: 'This week', vs: 'vs previous day',
      alerts: 'Alerts', allOk: 'All clear – nothing needs your attention right now.',
      aDue: '{name} – {amt} due', aDueSub: 'Bed {bed} · admitted {d} days',
      aDis: '{name} – {amt} still due after discharge', aDisSub: 'Discharged {d} days ago · call the family',
      aLong: '{name} – in bed for {d} days', aLongSub: 'Bed {bed} · check discharge plan',
      aCln: '{n} beds waiting for cleaning', aClnSub: 'Mark them free in Bed Management when ready',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], today: 'Today', sample: ''
    },
    bn: {
      beds: 'বেড ব্যবহৃত', free: 'খালি', occ: 'রোগী আছে', cln: 'পরিষ্কার হচ্ছে', res: 'সংরক্ষিত',
      inout: 'আজ ভর্তি ও ছুটি', inn: 'ভর্তি', out: 'ছুটি',
      coll: 'আজকের আদায়', cash: 'নগদ', upi: 'UPI', card: 'কার্ড', other: 'অন্যান্য',
      dues: 'মোট বকেয়া', duesSub: '{n} জন রোগীর কাছে বাকি', urgent: '{n} জন জরুরি',
      week: 'গত ৭ দিনের আদায়', weekTot: 'এই সপ্তাহে', vs: 'আগের দিনের তুলনায়',
      alerts: 'সতর্কতা', allOk: 'সব ঠিক আছে — এখন কিছু দেখার দরকার নেই।',
      aDue: '{name} — {amt} বকেয়া', aDueSub: 'বেড {bed} · {d} দিন ভর্তি',
      aDis: '{name} — ছুটির পরেও {amt} বাকি', aDisSub: '{d} দিন আগে ছুটি · পরিবারকে ফোন করুন',
      aLong: '{name} — {d} দিন ধরে ভর্তি', aLongSub: 'বেড {bed} · ছুটির পরিকল্পনা দেখুন',
      aCln: '{n}টি বেড পরিষ্কারের অপেক্ষায়', aClnSub: 'পরিষ্কার হলে বেড ম্যানেজমেন্টে খালি করুন',
      days: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'], today: 'আজ'
    },
    hi: {
      beds: 'बेड उपयोग में', free: 'खाली', occ: 'मरीज़', cln: 'सफ़ाई', res: 'आरक्षित',
      inout: 'आज भर्ती और छुट्टी', inn: 'भर्ती', out: 'छुट्टी',
      coll: 'आज की वसूली', cash: 'नकद', upi: 'UPI', card: 'कार्ड', other: 'अन्य',
      dues: 'कुल बकाया', duesSub: '{n} मरीज़ों पर बाकी', urgent: '{n} ज़रूरी',
      week: 'पिछले 7 दिन की वसूली', weekTot: 'इस हफ़्ते', vs: 'पिछले दिन से',
      alerts: 'अलर्ट', allOk: 'सब ठीक है — अभी कुछ देखने की ज़रूरत नहीं।',
      aDue: '{name} — {amt} बकाया', aDueSub: 'बेड {bed} · {d} दिन से भर्ती',
      aDis: '{name} — छुट्टी के बाद भी {amt} बाकी', aDisSub: '{d} दिन पहले छुट्टी · परिवार को फ़ोन करें',
      aLong: '{name} — {d} दिन से भर्ती', aLongSub: 'बेड {bed} · छुट्टी की योजना देखें',
      aCln: '{n} बेड सफ़ाई का इंतज़ार', aClnSub: 'साफ़ होने पर बेड मैनेजमेंट में खाली करें',
      days: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'], today: 'आज'
    }
  };
  var BIG_DUE = 20000, LONG_STAY = 10;
  var last = null;

  function lang() { var l = 'en'; try { l = localStorage.getItem('aurascale_lang') || 'en'; } catch (e) {} return L[l] ? l : 'en'; }
  function T(k, v) { var s = (L[lang()][k] != null ? L[lang()][k] : L.en[k]) || ''; if (v) for (var x in v) s = s.split('{' + x + '}').join(v[x]); return s; }
  function rs(n) { return '₹' + Math.round(n || 0).toLocaleString('en-IN'); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dayKey(d) { return new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); }
  function daysSince(d) { return Math.max(1, Math.floor((Date.now() - new Date(d)) / 86400000) + 1); }
  function navBtn(id) { return document.querySelector('.nb[onclick*="nav(\'' + id + '\'"]'); }

  var IC = {
    bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
    warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    chev: '<path d="M9 18l6-6-6-6"/>', ok: '<path d="M20 6 9 17l-5-5"/>', up: '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>'
  };
  function ic(n, s) { return '<svg width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }

  function css() {
    if (document.getElementById('oh-css')) return;
    var s = document.createElement('style'); s.id = 'oh-css';
    s.textContent = [
      '#oh-home{margin-bottom:16px}',
      '.oh-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:14px}',
      '.oh-k{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:16px 18px;text-align:left;cursor:pointer;font:inherit;color:inherit;display:flex;flex-direction:column;transition:box-shadow .15s,transform .15s,border-color .15s;min-width:0}',
      '.oh-k:hover{box-shadow:var(--sh-md);transform:translateY(-1px);border-color:var(--border-mid)}',
      '.oh-kh{display:flex;gap:10px;align-items:center;color:var(--text-secondary);font-size:14px;font-weight:600}',
      '.oh-ki{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:var(--green-bg);color:var(--green);flex:none}',
      '.oh-ki.red{background:var(--red-bg);color:var(--red)}',
      '.oh-kv{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:12px 0 10px;line-height:1.05;font-variant-numeric:tabular-nums;color:var(--text-primary)}',
      '.oh-kv small{font-size:17px;color:var(--text-tertiary);font-weight:700}',
      '.oh-kf{font-size:13.5px;color:var(--text-secondary);margin-top:auto;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center}',
      '.oh-seg{display:flex;height:8px;border-radius:99px;overflow:hidden;background:var(--border);gap:2px;margin-bottom:10px}',
      '.oh-seg i{display:block;height:100%}',
      '.oh-dot{width:9px;height:9px;border-radius:3px;display:inline-block;margin-right:5px;vertical-align:middle}',
      '.oh-io{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0 2px}',
      '.oh-io span{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:8px 10px;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.oh-io b{display:block;font-size:26px;font-weight:800;line-height:1.1;color:var(--text-primary)}',
      '.oh-pill{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:700;color:var(--red);background:var(--red-bg);padding:2px 9px;border-radius:99px}',
      '.oh-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start}',
      '.oh-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:16px 18px;min-width:0}',
      '.oh-ch{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}',
      '.oh-ch h3{margin:0;font-size:15.5px;font-weight:700;color:var(--text-primary)}',
      '.oh-ch span{font-size:13px;color:var(--text-tertiary)}',
      '.oh-tot{font-size:22px;font-weight:800;color:var(--text-primary)}',
      '.oh-trend{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:700;color:var(--green);background:var(--green-bg);padding:3px 9px;border-radius:99px}',
      '.oh-trend.down{color:var(--red);background:var(--red-bg)}',
      '.oh-chart{width:100%;height:150px;display:block;overflow:visible;margin-top:6px}',
      '.oh-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));font-size:12px;color:var(--text-tertiary);text-align:center;margin-top:4px}',
      '.oh-days b{display:block;color:var(--text-secondary);font-size:12px}',
      '.oh-days .on,.oh-days .on b{color:var(--green)}',
      '.oh-al{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}',
      '.oh-a{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:9px 8px;border-radius:12px;border:0;background:none;cursor:pointer;font:inherit;color:inherit}',
      '.oh-a:hover{background:var(--surface2)}',
      '.oh-ai{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;flex:none}',
      '.t-red .oh-ai{background:var(--red-bg);color:var(--red)}.t-amb .oh-ai{background:var(--amber-bg);color:var(--amber)}.t-blu .oh-ai{background:var(--green-bg);color:var(--green)}',
      '.oh-at{flex:1;min-width:0}.oh-at b{display:block;font-weight:700;font-size:14.5px;line-height:1.35;color:var(--text-primary)}',
      '.oh-at span{font-size:13px;color:var(--text-tertiary)}',
      '.oh-chev{color:var(--text-tertiary);flex:none}',
      '.oh-ok{display:flex;gap:10px;align-items:center;padding:14px 8px;color:var(--green);font-weight:600}',
      '@media(max-width:1100px){.oh-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}',
      '@media(max-width:900px){.oh-grid{grid-template-columns:minmax(0,1fr)}}',
      '@media(max-width:560px){.oh-kpis{gap:10px}.oh-k{padding:13px;border-radius:16px}.oh-kv{font-size:24px;margin:9px 0}.oh-kh{font-size:13px;gap:8px}.oh-ki{width:30px;height:30px}.oh-io b{font-size:21px}.oh-k.wide{grid-column:span 2}.oh-card{padding:14px}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function chart(vals) {
    var W = 600, H = 150, P = 12, max = Math.max.apply(null, vals.concat([1]));
    var pts = vals.map(function (v, i) { return [P + i * (W - 2 * P) / 6, H - P - (v / max) * (H - 2 * P)]; });
    var d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L');
    var area = d + ' L' + pts[6][0] + ' ' + (H - P) + ' L' + pts[0][0] + ' ' + (H - P) + ' Z';
    var dots = pts.map(function (p, i) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === 6 ? 6 : 4) + '" fill="' + (i === 6 ? 'var(--green)' : 'var(--surface)') + '" stroke="var(--green)" stroke-width="2.5"/>'; }).join('');
    return '<svg class="oh-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><defs><linearGradient id="ohg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--green)" stop-opacity=".22"/><stop offset="1" stop-color="var(--green)" stop-opacity="0"/></linearGradient></defs>'
      + '<line x1="0" x2="' + W + '" y1="' + (H - P) + '" y2="' + (H - P) + '" stroke="var(--border)"/>'
      + '<path d="' + area + '" fill="url(#ohg)"/><path d="' + d + '" fill="none" stroke="var(--green)" stroke-width="3" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>' + dots + '</svg>';
  }

  function render() {
    var D = last; if (!D) return;
    var box = document.getElementById('oh-home'); if (!box) return;
    var c = D.counts, tot = c.total || 0;
    var seg = function (n, col) { return n ? '<i style="width:' + (100 * n / Math.max(tot, 1)) + '%;background:' + col + '"></i>' : ''; };
    var m = D.method, tc = m.cash + m.upi + m.card + m.other;
    var mseg = function (n, col) { return n ? '<i style="width:' + (100 * n / Math.max(tc, 1)) + '%;background:' + col + '"></i>' : ''; };
    var urgent = D.alerts.filter(function (a) { return a.t === 'red'; }).length;
    var h = '<div class="oh-kpis">'
      + '<button class="oh-k" data-oh="beds"><span class="oh-kh"><span class="oh-ki">' + ic('bed') + '</span>' + T('beds') + '</span>'
      + '<span class="oh-kv">' + c.taken + '<small> / ' + tot + '</small></span>'
      + '<span class="oh-seg">' + seg(c.taken, 'var(--green)') + seg(c.cleaning, '#E0A43A') + seg(c.reserved, '#8A6AD8') + '</span>'
      + '<span class="oh-kf"><span><i class="oh-dot" style="background:var(--border-strong)"></i>' + c.free + ' ' + T('free') + '</span>'
      + (c.cleaning ? '<span><i class="oh-dot" style="background:#E0A43A"></i>' + c.cleaning + ' ' + T('cln') + '</span>' : '')
      + (c.reserved ? '<span><i class="oh-dot" style="background:#8A6AD8"></i>' + c.reserved + ' ' + T('res') + '</span>' : '') + '</span></button>'
      + '<button class="oh-k" data-oh="beds"><span class="oh-kh"><span class="oh-ki">' + ic('cal') + '</span>' + T('inout') + '</span>'
      + '<span class="oh-io"><span><b>' + D.inToday + '</b>↓ ' + T('inn') + '</span><span><b>' + D.outToday + '</b>↑ ' + T('out') + '</span></span></button>'
      + '<button class="oh-k wide" data-oh="pay"><span class="oh-kh"><span class="oh-ki">' + ic('rupee') + '</span>' + T('coll') + '</span>'
      + '<span class="oh-kv">' + rs(tc) + '</span>'
      + '<span class="oh-seg">' + mseg(m.cash, 'var(--green)') + mseg(m.upi, '#1BB880') + mseg(m.card, '#7CE6BC') + mseg(m.other, 'var(--border-strong)') + '</span>'
      + '<span class="oh-kf"><span><i class="oh-dot" style="background:var(--green)"></i>' + T('cash') + ' ' + rs(m.cash) + '</span><span><i class="oh-dot" style="background:#1BB880"></i>' + T('upi') + ' ' + rs(m.upi) + '</span>'
      + (m.card ? '<span><i class="oh-dot" style="background:#7CE6BC"></i>' + T('card') + ' ' + rs(m.card) + '</span>' : '') + (m.other ? '<span>' + T('other') + ' ' + rs(m.other) + '</span>' : '') + '</span></button>'
      + '<button class="oh-k wide" data-oh="dues"><span class="oh-kh"><span class="oh-ki red">' + ic('warn') + '</span>' + T('dues') + '</span>'
      + '<span class="oh-kv">' + esc(D.duesText) + '</span>'
      + '<span class="oh-kf"><span>' + T('duesSub', { n: D.dueCount }) + '</span>' + (urgent ? '<span class="oh-pill">' + T('urgent', { n: urgent }) + '</span>' : '') + '</span></button>'
      + '</div>';
    var w = D.week, wt = w.reduce(function (s, v) { return s + v; }, 0), y = w[5], t = w[6];
    var tr = y > 0 ? Math.round(100 * (t - y) / y) : null;
    var dl = L[lang()].days, now = new Date();
    var days = '';
    for (var i = 0; i < 7; i++) {
      var dd = new Date(now.getTime() - (6 - i) * 86400000);
      days += '<span class="' + (i === 6 ? 'on' : '') + '">' + (i === 6 ? T('today') : dl[dd.getDay()]) + '<b>' + (w[i] >= 1000 ? (w[i] / 1000).toFixed(w[i] >= 10000 ? 0 : 1) + 'k' : Math.round(w[i])) + '</b></span>';
    }
    h += '<div class="oh-grid"><div class="oh-card"><div class="oh-ch"><div><h3>' + T('week') + '</h3><span>' + T('weekTot') + ' </span><span class="oh-tot">' + rs(wt) + '</span></div>'
      + (tr !== null ? '<span class="oh-trend' + (tr < 0 ? ' down' : '') + '">' + ic('up', 14) + (tr > 0 ? '+' : '') + tr + '% ' + T('vs') + '</span>' : '') + '</div>'
      + chart(w) + '<div class="oh-days">' + days + '</div></div>';
    h += '<div class="oh-card"><div class="oh-ch"><h3>' + T('alerts') + '</h3><span>' + D.alerts.length + '</span></div>';
    if (!D.alerts.length) h += '<div class="oh-ok">' + ic('ok') + T('allOk') + '</div>';
    else {
      h += '<ul class="oh-al">';
      D.alerts.slice(0, 8).forEach(function (a, i) {
        var tt, ss;
        if (a.k === 'due') { tt = T('aDue', { name: esc(a.name), amt: rs(a.amt) }); ss = T('aDueSub', { bed: esc(a.bed), d: a.d }); }
        else if (a.k === 'dis') { tt = T('aDis', { name: esc(a.name), amt: rs(a.amt) }); ss = T('aDisSub', { d: a.d }); }
        else if (a.k === 'long') { tt = T('aLong', { name: esc(a.name), d: a.d }); ss = T('aLongSub', { bed: esc(a.bed) }); }
        else { tt = T('aCln', { n: a.n }); ss = T('aClnSub'); }
        var icn = a.k === 'due' ? 'rupee' : a.k === 'dis' ? 'phone' : a.k === 'long' ? 'clock' : 'spark';
        h += '<li><button class="oh-a t-' + a.t + '" data-oh="al" data-i="' + i + '"><span class="oh-ai">' + ic(icn, 19) + '</span><span class="oh-at"><b>' + tt + '</b><span>' + ss + '</span></span><span class="oh-chev">' + ic('chev', 16) + '</span></button></li>';
      });
      h += '</ul>';
    }
    h += '</div></div>';
    box.innerHTML = h;
    var old = document.getElementById('oh-old-kpis'); if (old) old.style.display = 'none';
  }

  function click(e) {
    var b = e.target.closest('[data-oh]'); if (!b || !last) return;
    var k = b.getAttribute('data-oh');
    if (k === 'beds' && typeof nav === 'function') nav('beds', navBtn('beds'));
    else if (k === 'pay' && typeof dashTab === 'function') dashTab('payments', document.querySelector('.dash-tab[data-dtab="payments"]'));
    else if (k === 'dues' && typeof dashTab === 'function') dashTab('billing', document.querySelector('.dash-tab[data-dtab="billing"]'));
    else if (k === 'al') {
      var a = last.alerts[+b.getAttribute('data-i')]; if (!a) return;
      if (a.k === 'cln') { if (typeof nav === 'function') nav('beds', navBtn('beds')); }
      else if (a.pid && typeof openPatientProfile === 'function') openPatientProfile(a.pid, a.name);
    }
  }

  async function load() {
    if (typeof _supa === 'undefined' || !window._clinicId && typeof _clinicId === 'undefined') return;
    var cid = typeof _clinicId !== 'undefined' ? _clinicId : window._clinicId; if (!cid) return;
    var pnl = document.getElementById('dtab-overview'); if (!pnl) return;
    css();
    var box = document.getElementById('oh-home');
    if (!box) {
      box = document.createElement('div'); box.id = 'oh-home';
      var first = pnl.querySelector('.mg6'); if (first && !first.id) first.id = 'oh-old-kpis';
      pnl.insertBefore(box, pnl.firstChild);
      box.addEventListener('click', click);
    }
    var today = dayKey(new Date());
    var tStart = new Date(today + 'T00:00:00+05:30');
    var wStart = new Date(tStart.getTime() - 6 * 86400000).toISOString();
    var disFrom = new Date(tStart.getTime() - 7 * 86400000).toISOString();
    var r = await Promise.all([
      _supa.from('admissions').select('id,patient_id,patient_name,bed_id,admission_date').eq('clinic_id', cid).eq('status', 'Active'),
      _supa.from('beds').select('id,bed_number,ward,status,is_active').eq('clinic_id', cid),
      _supa.from('nh_payments').select('amount,method,created_at').eq('clinic_id', cid).gte('created_at', wStart),
      _supa.from('admissions').select('id', { count: 'exact', head: true }).eq('clinic_id', cid).gte('admission_date', tStart.toISOString()),
      _supa.from('admissions').select('id', { count: 'exact', head: true }).eq('clinic_id', cid).eq('status', 'Discharged').gte('discharge_date', tStart.toISOString()),
      _supa.from('admissions').select('id,patient_id,patient_name,discharge_date').eq('clinic_id', cid).eq('status', 'Discharged').gte('discharge_date', disFrom)
    ]);
    if (r[0].error || r[1].error) return;
    var active = r[0].data || [], beds = r[1].data || [], pays = r[2].data || [], recent = r[5].data || [];
    /* every charge and payment of this nursing home, so the dues total is the sum of what each patient still owes */
    var r2 = await Promise.all([
      _supa.from('admission_charges').select('admission_id,total_price').eq('clinic_id', cid),
      _supa.from('nh_payments').select('admission_id,amount').eq('clinic_id', cid)
    ]);
    var ch = r2[0], pa = r2[1];
    var due = {};
    (ch.data || []).forEach(function (x) { due[x.admission_id] = (due[x.admission_id] || 0) + (+x.total_price || 0); });
    (pa.data || []).forEach(function (x) { due[x.admission_id] = (due[x.admission_id] || 0) - (+x.amount || 0); });
    var bedNo = {}; beds.forEach(function (b) { bedNo[b.id] = b.bed_number || ''; });
    var map = window.AuraBeds ? AuraBeds.admMap(active) : {};
    var counts = window.AuraBeds ? AuraBeds.counts(beds, map) : { total: beds.length, taken: active.length, free: Math.max(0, beds.length - active.length), cleaning: 0, reserved: 0 };

    var method = { cash: 0, upi: 0, card: 0, other: 0 }, week = [0, 0, 0, 0, 0, 0, 0];
    pays.forEach(function (p) {
      var k = dayKey(p.created_at), idx = 6 - Math.round((new Date(today) - new Date(k)) / 86400000);
      if (idx >= 0 && idx < 7) week[idx] += (+p.amount || 0);
      if (k === today) {
        var mm = String(p.method || '').toLowerCase();
        var key = mm.indexOf('cash') >= 0 ? 'cash' : (mm.indexOf('upi') >= 0 || mm.indexOf('gpay') >= 0 || mm.indexOf('phonepe') >= 0) ? 'upi' : mm.indexOf('card') >= 0 ? 'card' : 'other';
        method[key] += (+p.amount || 0);
      }
    });

    var alerts = [], dueCount = 0;
    active.forEach(function (a) {
      var d = due[a.id] || 0, n = daysSince(a.admission_date);
      if (d >= BIG_DUE) alerts.push({ k: 'due', t: 'red', name: a.patient_name || '?', pid: a.patient_id, amt: d, bed: bedNo[a.bed_id] || '-', d: n, s: 3e9 + d });
      else if (n >= LONG_STAY) alerts.push({ k: 'long', t: 'blu', name: a.patient_name || '?', pid: a.patient_id, bed: bedNo[a.bed_id] || '-', d: n, s: n });
    });
    recent.forEach(function (a) {
      var d = due[a.id] || 0;
      if (d > 0) { alerts.push({ k: 'dis', t: 'amb', name: a.patient_name || '?', pid: a.patient_id, amt: d, d: Math.max(0, daysSince(a.discharge_date) - 1), s: 2e9 + d }); }
    });
    if (counts.cleaning) alerts.push({ k: 'cln', t: 'blu', n: counts.cleaning, s: 1 });
    alerts.sort(function (x, y) { return y.s - x.s; });

    var allDue = 0, owing = 0;
    Object.keys(due).forEach(function (k) { if (k && k !== 'null' && due[k] > 0.5) { allDue += due[k]; owing++; } });
    var duesText = rs(allDue);
    dueCount = owing;
    last = { counts: counts, inToday: r[3].count || 0, outToday: r[4].count || 0, method: method, week: week, alerts: alerts, dueCount: dueCount, duesText: duesText };
    render();
  }

  /* hook into the existing page: redraw after every dashboard refresh and language change */
  function hook() {
    if (typeof window.loadDashboard === 'function' && !window.loadDashboard._oh) {
      var orig = window.loadDashboard;
      window.loadDashboard = async function () { var res = await orig.apply(this, arguments); try { await load(); } catch (e) { console.warn('nh-home', e); } return res; };
      window.loadDashboard._oh = true;
    }
    if (typeof window.setLanguage === 'function' && !window.setLanguage._oh) {
      var sl = window.setLanguage;
      window.setLanguage = function () { var x = sl.apply(this, arguments); try { render(); } catch (e) {} return x; };
      window.setLanguage._oh = true;
    }
  }
  hook();
  window.ohLoad = function () { return load().catch(function (e) { console.warn('nh-home', e); }); };
  /* the first dashboard load may already have happened before this file arrived */
  setTimeout(function () { var v = document.getElementById('v-dashboard'); if (v && v.classList.contains('on')) window.ohLoad(); }, 600);
})();
