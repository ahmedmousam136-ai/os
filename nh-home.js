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
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], today: 'Today',
      bmT: 'Bed map', bmS: 'Tap a bed to see the patient or admit a new one', bmAll: 'All', bmUsed: '{a} / {b} in use', perDay: '/day', admit: 'Admit', addBed: 'Add bed', newAdm: 'New admission', daysN: '{n} days', todayAdm: 'Admitted today', dueTag: 'Due', critical: 'Critical', off: 'Switched off',
      blT: 'Billing', blS: 'Who owes how much — in one place', blTotal: 'Total bill', blPaid: 'Collected', blDue: 'Due', blSearch: 'Search name or bed', blAllF: 'All', stUrg: 'Urgent due', stNone: 'Not paid', stPart: 'Part paid', stFull: 'Fully paid', stDis: 'Discharged', colPat: 'Patient', colTot: 'Total', colPaid: 'Paid', colDue: 'Due', colSt: 'Status', takePay: 'Take payment', viewPt: 'Open', paidOk: 'Fully paid', disAgo: 'Discharged · {n} days ago', disToday: 'Discharged · today', bedDays: 'Bed {b} · {n} days', blEmpty: 'No bills yet.', oldList: 'More billing tools', wG: 'General ward', wF: 'Female ward', wM: 'Maternity ward', wI: 'ICU / HDU', wE: 'Emergency', savedBills: 'Saved final bills',
      g1: 'Good morning', g2: 'Good afternoon', g3: 'Good evening', gsub: 'Today\'s money, beds and problems — at a glance',
      bBeds: 'Bed map', bRep: 'Reports', aSet: 'Bill setup is not finished', aSetSub: 'Address, signature & stamp are printed on every bill',
      nHome: 'Home', nPat: 'Patients', nBeds: 'Beds', nBills: 'Bills', nMore: 'Menu', bedsWord: 'beds', dark: 'Dark / light'
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
      days: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'], today: 'আজ',
      bmT: 'বেড ম্যাপ', bmS: 'বেডে চাপ দিন — রোগী দেখতে বা নতুন রোগী ভর্তি করতে', bmAll: 'সব', bmUsed: '{a} / {b} ব্যবহৃত', perDay: '/দিন', admit: 'ভর্তি করুন', addBed: 'বেড যোগ করুন', newAdm: 'নতুন ভর্তি', daysN: '{n} দিন', todayAdm: 'আজ ভর্তি', dueTag: 'বকেয়া', critical: 'সংকটজনক', off: 'বন্ধ',
      blT: 'বিলিং', blS: 'কার কত বাকি, এক জায়গায়', blTotal: 'মোট বিল', blPaid: 'আদায়', blDue: 'বকেয়া', blSearch: 'নাম বা বেড লিখে খুঁজুন', blAllF: 'সব', stUrg: 'জরুরি বকেয়া', stNone: 'জমা হয়নি', stPart: 'আংশিক জমা', stFull: 'পুরো জমা', stDis: 'ছুটি হয়েছে', colPat: 'রোগী', colTot: 'মোট বিল', colPaid: 'জমা', colDue: 'বাকি', colSt: 'অবস্থা', takePay: 'টাকা জমা নিন', viewPt: 'দেখুন', paidOk: 'পুরো জমা হয়েছে', disAgo: 'ছুটি হয়েছে · {n} দিন আগে', disToday: 'ছুটি হয়েছে · আজ', bedDays: 'বেড {b} · {n} দিন', blEmpty: 'এখনো কোনো বিল নেই।', oldList: 'বিলের আরও কাজ', wG: 'জেনারেল ওয়ার্ড', wF: 'মহিলা ওয়ার্ড', wM: 'প্রসূতি ওয়ার্ড', wI: 'আইসিইউ / এইচডিইউ', wE: 'ইমার্জেন্সি', savedBills: 'সেভ করা চূড়ান্ত বিল',
      g1: 'সুপ্রভাত', g2: 'শুভ দুপুর', g3: 'শুভ সন্ধ্যা', gsub: 'আজকের টাকা, বেড আর সমস্যা — এক নজরে',
      bBeds: 'বেড ম্যাপ', bRep: 'রিপোর্ট', aSet: 'বিলের সেটআপ এখনো বাকি', aSetSub: 'ঠিকানা, সই আর স্ট্যাম্প প্রতিটা বিলে ছাপা হয়',
      nHome: 'হোম', nPat: 'রোগী', nBeds: 'বেড', nBills: 'বিল', nMore: 'মেনু', bedsWord: 'বেড', dark: 'ডার্ক / লাইট'
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
      days: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'], today: 'आज',
      bmT: 'बेड मैप', bmS: 'बेड पर टैप करें — मरीज़ देखने या नया मरीज़ भर्ती करने के लिए', bmAll: 'सभी', bmUsed: '{a} / {b} उपयोग में', perDay: '/दिन', admit: 'भर्ती करें', addBed: 'बेड जोड़ें', newAdm: 'नई भर्ती', daysN: '{n} दिन', todayAdm: 'आज भर्ती', dueTag: 'बकाया', critical: 'गंभीर', off: 'बंद',
      blT: 'बिलिंग', blS: 'किस पर कितना बाकी, एक जगह', blTotal: 'कुल बिल', blPaid: 'वसूली', blDue: 'बकाया', blSearch: 'नाम या बेड से खोजें', blAllF: 'सभी', stUrg: 'ज़रूरी बकाया', stNone: 'जमा नहीं', stPart: 'आंशिक जमा', stFull: 'पूरा जमा', stDis: 'छुट्टी हो गई', colPat: 'मरीज़', colTot: 'कुल बिल', colPaid: 'जमा', colDue: 'बाकी', colSt: 'स्थिति', takePay: 'पैसा जमा करें', viewPt: 'देखें', paidOk: 'पूरा जमा हो गया', disAgo: 'छुट्टी · {n} दिन पहले', disToday: 'छुट्टी · आज', bedDays: 'बेड {b} · {n} दिन', blEmpty: 'अभी कोई बिल नहीं।', oldList: 'बिलिंग के और काम', wG: 'जनरल वार्ड', wF: 'महिला वार्ड', wM: 'प्रसूति वार्ड', wI: 'आईसीयू / एचडीयू', wE: 'इमरजेंसी', savedBills: 'सेव किए गए अंतिम बिल',
      g1: 'सुप्रभात', g2: 'नमस्ते', g3: 'शुभ संध्या', gsub: 'आज का पैसा, बेड और समस्याएँ — एक नज़र में',
      bBeds: 'बेड मैप', bRep: 'रिपोर्ट', aSet: 'बिल सेटअप अभी बाकी है', aSetSub: 'पता, हस्ताक्षर और मोहर हर बिल पर छपते हैं',
      nHome: 'होम', nPat: 'मरीज़', nBeds: 'बेड', nBills: 'बिल', nMore: 'मेनू', bedsWord: 'बेड', dark: 'डार्क / लाइट'
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
  var BND = '০১২৩৪৫৬৭৮৯';
  function bnDigits(root) {
    if (lang() !== 'bn' || !root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { if (n.parentNode && n.parentNode.closest && n.parentNode.closest('.nob,.oh-bt .n')) continue; if (/[0-9]/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/[0-9]/g, function (d) { return BND[d]; }); }
  }
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
      '.oh-cw{position:relative;height:150px;margin:8px 0 6px}',
      '.oh-chart{width:100%;height:100%;display:block;overflow:visible}',
      '.oh-pt{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:var(--surface);border:2.5px solid #1BB880}',
      '.oh-pt.last{width:14px;height:14px;margin:-7px 0 0 -7px;background:#1BB880;box-shadow:0 0 0 5px rgba(27,184,128,.22)}',
      '.oh-tip{position:absolute;transform:translate(-100%,-150%);background:var(--text-primary);color:var(--surface);font-size:12.5px;font-weight:700;padding:4px 9px;border-radius:8px;white-space:nowrap}',
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
    var W = 600, H = 150, P = 14, max = Math.max.apply(null, vals.concat([1])) * 1.15;
    var pts = vals.map(function (v, i) { return [P + i * (W - 2 * P) / 6, H - P - (v / max) * (H - 2 * P)]; });
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var i = 0; i < 6; i++) {   /* smooth curve through every point */
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(6, i + 2)];
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    var area = d + ' L' + pts[6][0] + ' ' + (H - P) + ' L' + pts[0][0] + ' ' + (H - P) + ' Z';
    var grid = [0.25, 0.5, 0.75].map(function (f) { var y = (P + f * (H - 2 * P)).toFixed(1); return '<line x1="0" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="var(--border)" stroke-dasharray="4 5" vector-effect="non-scaling-stroke"/>'; }).join('');
    var svg = '<svg class="oh-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><defs><linearGradient id="ohg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1BB880" stop-opacity=".28"/><stop offset="1" stop-color="#1BB880" stop-opacity="0"/></linearGradient></defs>'
      + grid + '<path d="' + area + '" fill="url(#ohg)"/><path d="' + d + '" fill="none" stroke="#1BB880" stroke-width="3" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>';
    /* dots and the "today" bubble are HTML so they stay round on any width */
    var dots = pts.map(function (p, i) { return '<i class="oh-pt' + (i === 6 ? ' last' : '') + '" style="left:' + (100 * p[0] / W) + '%;top:' + (100 * p[1] / H) + '%"></i>'; }).join('');
    var tip = '<span class="oh-tip" style="left:' + (100 * pts[6][0] / W) + '%;top:' + (100 * pts[6][1] / H) + '%">' + rs(vals[6]) + '</span>';
    return '<div class="oh-cw">' + svg + dots + tip + '</div>';
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
        if (a.k === 'due') { tt = T('aDue', { name: esc(a.name), amt: rs(a.amt) }); ss = T('aDueSub', { bed: '<span class="nob">' + esc(a.bed) + '</span>', d: a.d }); }
        else if (a.k === 'dis') { tt = T('aDis', { name: esc(a.name), amt: rs(a.amt) }); ss = T('aDisSub', { d: a.d }); }
        else if (a.k === 'long') { tt = T('aLong', { name: esc(a.name), d: a.d }); ss = T('aLongSub', { bed: '<span class="nob">' + esc(a.bed) + '</span>' }); }
        else if (a.k === 'set') { tt = T('aSet'); ss = T('aSetSub'); }
        else { tt = T('aCln', { n: a.n }); ss = T('aClnSub'); }
        var icn = a.k === 'due' ? 'rupee' : a.k === 'dis' ? 'phone' : a.k === 'long' ? 'clock' : a.k === 'set' ? 'warn' : 'spark';
        h += '<li><button class="oh-a t-' + a.t + '" data-oh="al" data-i="' + i + '"><span class="oh-ai">' + ic(icn, 19) + '</span><span class="oh-at"><b>' + tt + '</b><span>' + ss + '</span></span><span class="oh-chev">' + ic('chev', 16) + '</span></button></li>';
      });
      h += '</ul>';
    }
    h += '</div></div>';
    box.innerHTML = h;
    bnDigits(box);
    var old = document.getElementById('oh-old-kpis'); if (old) old.style.display = 'none';
    try { title(); header(); bottomNav(); } catch (e) { console.warn('nh-home title', e && e.message); }
  }


  /* ---------------- whole-page look (owner portal) ---------------- */
  var INFO = null;
  async function info(cid) {
    if (INFO) return INFO;
    try {
      var r = await _supa.from('clinics').select('name,doctor_name,address').eq('id', cid).maybeSingle();
      var d = r && r.data; if (Array.isArray(d)) d = d[0];
      INFO = d || {};
    } catch (e) { INFO = {}; }
    return INFO;
  }
  function skinCss() {
    if (document.getElementById('oh-skin-css')) return;
    var s = document.createElement('style'); s.id = 'oh-skin-css';
    s.textContent = [
      'body.oh-skin #sidebar .sb-logo{background:#05271B;border-bottom:0;padding:16px 16px 15px}',
      'body.oh-skin #sidebar .sb-mark,body.oh-skin #sidebar .sb-mark .a{color:#fff!important;-webkit-text-fill-color:#fff!important}',
      'body.oh-skin #sidebar .sb-mark .s,body.oh-skin #sidebar .sb-mark .os{color:#7CE6BC!important;-webkit-text-fill-color:#7CE6BC!important}',
      'body.oh-skin #sidebar .sb-tag{color:#8DB8A6!important}',
      'body.oh-skin #sidebar .sb-facility{margin:12px 12px 4px}',
      'body.oh-skin #sidebar .sb-facility-inner{border-radius:14px}',
      'body.oh-skin #sidebar .sb-nav{padding:6px 12px}',
      'body.oh-skin #sidebar .nav-sec{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin:12px 10px 4px!important;padding:0!important;opacity:.8}',
      'body.oh-skin #sidebar .nb{font-size:14.5px;min-height:46px;border-radius:12px;padding:10px 12px;gap:12px;font-weight:500}',
      'body.oh-skin #sidebar .nb .nb-ic svg{width:18px;height:18px}',
      'body.oh-skin #sidebar .nb.on{background:var(--green-bg);color:var(--green);font-weight:700}',
      'body.oh-skin header{height:64px}',
      'body.oh-skin header .bc-root,body.oh-skin header .bc-sep,body.oh-skin header .aura-mark-hdr,body.oh-skin #hdr-date{display:none!important}',
      'body.oh-skin header .bc-page{display:none}',
      '.oh-hc{display:flex;flex-direction:column;line-height:1.25;min-width:0}',
      '.oh-hc b{font-size:15px;font-weight:700;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.oh-hc span{font-size:12.5px;color:var(--text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.oh-ib{width:42px;height:42px;border-radius:12px;border:1px solid var(--border);background:var(--surface);display:inline-grid;place-items:center;cursor:pointer;color:var(--text-secondary)}',
      '.oh-ib:hover{background:var(--surface2)}',
      'body.oh-skin .view>.sh.oh-hide{display:none!important}',
      'body.oh-skin #v-home>.two-col{display:none}',
      'body.oh-skin #theme-toggle-btn{display:none!important}',
      '.oh-ph{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--border)}',
      '.oh-eb{font-size:13.5px;color:var(--text-tertiary);font-weight:500;margin-bottom:4px}',
      '.oh-ph h1{margin:0;font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.2;color:var(--text-primary);font-family:inherit}',
      '.oh-ph p{margin:4px 0 0;color:var(--text-secondary);font-size:15px}',
      '.oh-pa{display:flex;gap:10px;flex-wrap:wrap}',
      '.oh-b{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 18px;border-radius:12px;border:1px solid transparent;font:inherit;font-weight:700;font-size:15px;cursor:pointer;white-space:nowrap}',
      '.oh-b.p{background:#0A6B4B;color:#fff}.oh-b.p:hover{background:#08583E}',
      '.oh-b.s{background:var(--surface);border-color:var(--border-strong);color:var(--text-primary)}.oh-b.s:hover{background:var(--surface2)}',
      'body.oh-skin #v-dashboard .dash-tabs{margin-top:18px}',
      'body.oh-skin #v-dashboard .dash-tab{font-size:14.5px}',
      'body.oh-skin .panel{border-radius:18px}',
      'body.oh-skin #aura-billsetup{margin-top:14px}',
      '.oh-bn{display:none}',
      '@media(max-width:600px){',
      ' .oh-ph{margin-bottom:14px;padding-bottom:14px}.oh-ph h1{font-size:23px}.oh-pa{width:100%;display:grid;grid-template-columns:1fr 1fr}',
      ' body.oh-skin header{height:60px;background:#05271B!important;border-bottom:0}',
      ' body.oh-skin header .oh-hc b{color:#fff}body.oh-skin header .oh-hc span{color:#8DB8A6}',
      ' body.oh-skin header .hamburger{background:rgba(255,255,255,.1);border-color:transparent;color:#fff}',
      ' body.oh-skin header .oh-ib{background:rgba(255,255,255,.1);border-color:transparent;color:#fff}',
      ' body.oh-skin header #lang-switcher{background:rgba(255,255,255,.1)!important;color:#fff!important;border-color:transparent!important}',
      ' body.oh-skin .content{padding-bottom:96px!important}',
      ' .oh-bn{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));position:fixed;left:0;right:0;bottom:0;z-index:35;background:var(--surface);border-top:1px solid var(--border);padding:6px 4px calc(6px + env(safe-area-inset-bottom));box-shadow:0 -8px 24px -16px rgba(0,0,0,.25)}',
      ' .oh-bn button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:56px;border:0;background:none;color:var(--text-tertiary);font:inherit;font-size:12.5px;font-weight:600;border-radius:14px;cursor:pointer}',
      ' .oh-bn .pip{width:46px;height:30px;border-radius:99px;display:grid;place-items:center}',
      ' .oh-bn button.on{color:var(--green)}.oh-bn button.on .pip{background:var(--green-bg)}',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }
  var BN_ITEMS = [['dashboard', 'nHome', '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'], ['patients', 'nPat', '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'], ['beds', 'nBeds', IC.bed], [PAGE === 'reception' ? 'billing' : 'bills', 'nBills', '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>'], ['menu', 'nMore', '<path d="M3 12h18M3 6h18M3 18h18"/>']];
  function bottomNav() {
    var bn = document.getElementById('oh-bn');
    if (!bn) {
      bn = document.createElement('nav'); bn.id = 'oh-bn'; bn.className = 'oh-bn';
      document.body.appendChild(bn);
      bn.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        var id = b.getAttribute('data-v');
        if (id === 'menu') { if (typeof toggleSidebar === 'function') toggleSidebar(); return; }
        if (typeof nav === 'function') nav(id, navBtn(id));
      });
    }
    var cur = (document.querySelector('.view.on') || {}).id || '';
    bn.innerHTML = BN_ITEMS.map(function (it) {
      return '<button type="button" data-v="' + it[0] + '" class="' + (cur === 'v-' + it[0] ? 'on' : '') + '"><span class="pip"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + it[2] + '</svg></span>' + T(it[1]) + '</button>';
    }).join('');
  }
  function header() {
    var hl = document.querySelector('header .hdr-l'); if (!hl) return;
    var hc = document.getElementById('oh-hc');
    if (!hc) {
      hc = document.createElement('div'); hc.id = 'oh-hc'; hc.className = 'oh-hc';
      hl.appendChild(hc);
      var hr = document.querySelector('header .hdr-r');
      if (hr && !document.getElementById('oh-theme')) {
        var tb = document.createElement('button'); tb.id = 'oh-theme'; tb.className = 'oh-ib'; tb.type = 'button';
        tb.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
        tb.onclick = function () { if (typeof toggleTheme === 'function') toggleTheme(); };
        hr.appendChild(tb);
      }
    }
    var I = INFO || {}, nm = I.name || ((document.getElementById('sb-nh-name') || document.getElementById('sb-fac-name') || {}).textContent) || '';
    var tot = last && last.counts ? last.counts.total : 0;
    hc.innerHTML = '<b>' + esc(nm) + '</b><span>' + esc(I.address ? String(I.address).split('\n')[0] : '') + (tot ? (I.address ? ' · ' : '') + tot + ' ' + T('bedsWord') : '') + '</span>';
    var tb2 = document.getElementById('oh-theme'); if (tb2) tb2.setAttribute('aria-label', T('dark'));
    bnDigits(hc);
  }
  function title() {
    var dv = document.getElementById('v-dashboard') || document.getElementById('v-home'), box = document.getElementById('oh-home'); if (!dv || !box) return;
    var ph = document.getElementById('oh-ph');
    if (!ph) {
      ph = document.createElement('div'); ph.id = 'oh-ph'; ph.className = 'oh-ph';
      box.parentNode.insertBefore(ph, box);
      var sh = dv.querySelector(':scope > .sh'); if (sh) sh.classList.add('oh-hide');
      ph.addEventListener('click', function (e) {
        var b = e.target.closest('[data-ph]'); if (!b) return;
        var k = b.getAttribute('data-ph');
        if (k === 'adm') { if (typeof openRegisterModal === 'function') openRegisterModal(); return; }
        if (k === 'pay') { if (typeof openPayment === 'function') openPayment(); return; }
        if (k === 'beds') { if (typeof nav === 'function') nav('beds', navBtn('beds')); }
        else if (typeof dashTab === 'function') { dashTab('reports', document.querySelector('.dash-tab[data-dtab="reports"]')); var t = dv.querySelector('.dash-tabs'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    }
    var l = lang(), loc = l === 'bn' ? 'bn-IN' : l === 'hi' ? 'hi-IN' : 'en-IN';
    var hr = +new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' });
    var g = hr < 12 ? T('g1') : hr < 17 ? T('g2') : T('g3');
    var who = PAGE === 'reception' ? ((typeof _myName === 'string' && _myName) || '') : ((INFO && INFO.doctor_name) || (INFO && INFO.name) || '');
    var date = new Date().toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' });
    ph.innerHTML = '<div><div class="oh-eb">' + esc(date) + '</div><h1>' + g + (who ? ', ' + esc(who) : '') + '</h1><p>' + T('gsub') + '</p></div>'
      + (PAGE === 'reception'
        ? '<div class="oh-pa"><button type="button" class="oh-b s" data-ph="pay">' + ic('rupee', 18) + T('takePay') + '</button><button type="button" class="oh-b p" data-ph="adm">+ ' + T('newAdm') + '</button></div>'
        : '<div class="oh-pa"><button type="button" class="oh-b s" data-ph="rep">' + T('bRep') + '</button><button type="button" class="oh-b p" data-ph="beds">' + ic('bed', 18) + T('bBeds') + '</button></div>');
  }
  function skin() {
    skinCss(); document.body.classList.add('oh-skin');
    header(); bottomNav();
  }

  /* ---------------- bed map + billing (owner and reception) ---------------- */
  var PAGE = document.getElementById('v-dashboard') ? 'owner' : (document.getElementById('v-home') ? 'reception' : 'other');
  function cidNow() { return typeof _clinicId !== 'undefined' ? _clinicId : window._clinicId; }
  function wardName(w) {
    var k = String(w || 'General').toLowerCase();
    if (k.indexOf('icu') >= 0 || k.indexOf('hdu') >= 0) return T('wI');
    if (k.indexOf('mater') >= 0 || k.indexOf('প্রসূতি') >= 0) return T('wM');
    if (k.indexOf('female') >= 0 || k.indexOf('মহিলা') >= 0) return T('wF');
    if (k.indexOf('emerg') >= 0) return T('wE');
    if (k === 'general' || k.indexOf('জেনারেল') >= 0) return T('wG');
    return w;
  }
  async function money(cid) {
    var r = await Promise.all([
      _supa.from('admission_charges').select('admission_id,total_price').eq('clinic_id', cid),
      _supa.from('nh_payments').select('admission_id,amount').eq('clinic_id', cid)
    ]);
    var M = {};
    (r[0].data || []).forEach(function (x) { var m = M[x.admission_id] || (M[x.admission_id] = { tot: 0, paid: 0 }); m.tot += (+x.total_price || 0); });
    (r[1].data || []).forEach(function (x) { var m = M[x.admission_id] || (M[x.admission_id] = { tot: 0, paid: 0 }); m.paid += (+x.amount || 0); });
    return M;
  }
  function pageHead(view, key, title, sub, btns) {
    var v = document.getElementById(view); if (!v) return null;
    var ph = document.getElementById('oh-ph-' + key);
    if (!ph) {
      ph = document.createElement('div'); ph.id = 'oh-ph-' + key; ph.className = 'oh-ph';
      var sh = v.querySelector(':scope > .sh');
      if (sh) { sh.classList.add('oh-hide'); sh.style.display = 'none'; sh.parentNode.insertBefore(ph, sh); } else v.insertBefore(ph, v.firstChild);
    }
    ph.innerHTML = '<div><h1>' + title + '</h1><p>' + sub + '</p></div><div class="oh-pa">' + (btns || '') + '</div>';
    return ph;
  }
  function bmCss() {
    if (document.getElementById('oh-bm-css')) return;
    var s = document.createElement('style'); s.id = 'oh-bm-css';
    s.textContent = [
      '.oh-flt{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 18px}',
      '.oh-f{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:12px;border:1px solid var(--border-strong);background:var(--surface);font:inherit;font-size:14px;font-weight:600;color:var(--text-secondary);cursor:pointer}',
      '.oh-f i{width:10px;height:10px;border-radius:3px;display:inline-block}',
      '.oh-f em{font-style:normal;font-size:12px;font-weight:700;background:var(--surface2);border-radius:99px;padding:2px 8px;color:var(--text-secondary)}',
      '.oh-f.on{background:#0A6B4B;border-color:#0A6B4B;color:#fff}.oh-f.on em{background:rgba(255,255,255,.2);color:#fff}',
      '.oh-ward{margin-bottom:22px}',
      '.oh-wh{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:10px}',
      '.oh-wh h3{margin:0;font-size:16px;font-weight:700;color:var(--text-primary)}.oh-wh span{font-size:13px;color:var(--text-tertiary)}',
      '.oh-bg{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}',
      '.oh-bt{position:relative;text-align:left;min-height:116px;padding:12px 14px;border-radius:12px;border:1px solid;border-top-width:3px;cursor:pointer;font:inherit;display:flex;flex-direction:column;gap:2px;transition:transform .12s,box-shadow .12s}',
      '.oh-bt:hover{transform:translateY(-1px);box-shadow:var(--sh-md)}',
      '.oh-bt .n{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:800;font-size:16px}',
      '.oh-bt .c{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700}',
      '.oh-bt .pn{margin-top:14px;font-weight:700;font-size:14px;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.oh-bt .ps{font-size:12.5px;color:var(--text-tertiary)}',
      '.oh-bt .ad{margin-top:auto;font-size:13.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px}',
      '.oh-bt .dg{margin-top:6px;align-self:flex-start;display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:700;color:var(--red);background:var(--surface);border:1px solid var(--red-border,#f3c2c2);border-radius:99px;padding:1px 8px}',
      '.oh-bt.free{background:#EAF7F1;border-color:#BFE6D3;border-top-color:#0A6B4B}.oh-bt.free .n,.oh-bt.free .c,.oh-bt.free .ad{color:#0A6B4B}',
      '.oh-bt.occ{background:#EEF2FB;border-color:#C9D5EF;border-top-color:#2B4C9B}.oh-bt.occ .n{color:#2B4C9B}.oh-bt.occ .c{color:#2B4C9B}',
      '.oh-bt.crit{background:#FDEEEE;border-color:#F3C2C2;border-top-color:#C0392B}.oh-bt.crit .n,.oh-bt.crit .c{color:#C0392B}',
      '.oh-bt.cln{background:#FDF4E3;border-color:#F0D49A;border-top-color:#B7791F}.oh-bt.cln .n,.oh-bt.cln .c{color:#9A6212}',
      '.oh-bt.res{background:#F2EEFB;border-color:#D6CBF3;border-top-color:#6B4FC8}.oh-bt.res .n,.oh-bt.res .c{color:#5B3FB5}',
      '.oh-bt.ina{background:var(--surface2);border-color:var(--border);border-top-color:var(--border-strong);opacity:.7}',
      '[data-theme=dark] .oh-bt.free{background:rgba(27,184,128,.10);border-color:rgba(27,184,128,.35)}[data-theme=dark] .oh-bt.free .n,[data-theme=dark] .oh-bt.free .c,[data-theme=dark] .oh-bt.free .ad{color:#5FD4A6}',
      '[data-theme=dark] .oh-bt.occ{background:rgba(90,130,230,.12);border-color:rgba(90,130,230,.35)}[data-theme=dark] .oh-bt.occ .n,[data-theme=dark] .oh-bt.occ .c{color:#9DB5F5}',
      '[data-theme=dark] .oh-bt.crit{background:rgba(230,80,80,.12);border-color:rgba(230,80,80,.35)}[data-theme=dark] .oh-bt.cln{background:rgba(230,170,60,.12);border-color:rgba(230,170,60,.35)}[data-theme=dark] .oh-bt.cln .n,[data-theme=dark] .oh-bt.cln .c{color:#F0C46A}',
      '[data-theme=dark] .oh-bt.res{background:rgba(140,110,230,.14);border-color:rgba(140,110,230,.35)}[data-theme=dark] .oh-bt.res .n,[data-theme=dark] .oh-bt.res .c{color:#B9A6F5}',
      '.oh-sum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:14px}',
      '.oh-sum div{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px 18px}',
      '.oh-sum span{display:block;font-size:13.5px;color:var(--text-secondary)}.oh-sum b{display:block;font-size:24px;font-weight:800;margin-top:6px;color:var(--text-primary)}.oh-sum b.r{color:var(--red)}',
      '.oh-blbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px}',
      '.oh-srch{flex:1 1 280px;max-width:420px;display:flex;align-items:center;gap:10px;min-height:48px;padding:0 14px;border:1px solid var(--border-strong);border-radius:12px;background:var(--surface);color:var(--text-tertiary)}',
      '.oh-srch input{flex:1;border:0;outline:0;background:none;font:inherit;font-size:15px;color:var(--text-primary);min-width:0}',
      '.oh-bl{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden}',
      '.oh-tr{display:grid;grid-template-columns:minmax(0,2.2fr) 1fr 1fr 1fr 1.1fr 1.4fr;gap:12px;align-items:center;padding:12px 18px;border-top:1px solid var(--border)}',
      '.oh-tr.h{border-top:0;background:var(--surface2);font-size:13px;font-weight:600;color:var(--text-tertiary);padding-top:14px;padding-bottom:14px}',
      '.oh-tr .r{text-align:right;font-variant-numeric:tabular-nums;font-weight:700;color:var(--text-primary)}.oh-tr .r.due{color:var(--red)}.oh-tr .r.zero{color:var(--text-tertiary);font-weight:500}',
      '.oh-pt2{display:flex;gap:12px;align-items:center;min-width:0}.oh-av{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-weight:700;font-size:14px;flex:none}',
      '.oh-pt2 b{display:block;font-size:14.5px;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.oh-pt2 span{font-size:12.5px;color:var(--text-tertiary)}',
      '.oh-chip{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;padding:5px 10px;border-radius:6px;white-space:nowrap}',
      '.oh-chip:before{content:"";width:7px;height:7px;border-radius:2px;background:currentColor}',
      '.oh-chip.urg{background:var(--red-bg);color:var(--red)}.oh-chip.none{background:var(--amber-bg);color:var(--amber)}.oh-chip.part{background:rgba(43,76,155,.1);color:#2B4C9B}.oh-chip.full{background:var(--green-bg);color:var(--green)}.oh-chip.dis{background:var(--surface2);color:var(--text-secondary)}',
      '[data-theme=dark] .oh-chip.part{background:rgba(90,130,230,.15);color:#9DB5F5}',
      '.oh-act{min-height:44px;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(--border-strong);border-radius:10px;background:var(--surface);font:inherit;font-size:14px;font-weight:700;color:var(--text-primary);cursor:pointer}',
      '.oh-act:hover{background:var(--surface2)}.oh-ok2{display:inline-flex;align-items:center;justify-content:center;gap:6px;width:100%;font-size:14px;color:var(--text-secondary)}',
      '.oh-more{margin:22px 0 10px;font-size:15px;font-weight:700;color:var(--text-secondary)}',
      '@media(max-width:900px){.oh-tr.h{display:none}.oh-tr{grid-template-columns:1fr 1fr;row-gap:8px}.oh-tr .oh-pt2{grid-column:1/-1}.oh-tr .r:before{content:attr(data-l);display:block;font-size:11.5px;font-weight:500;color:var(--text-tertiary)}.oh-tr .r{text-align:left}.oh-tr .oh-ac{grid-column:1/-1}}',
      '@media(max-width:600px){.oh-sum{grid-template-columns:1fr 1fr}.oh-sum div:first-child{grid-column:1/-1}.oh-bg{grid-template-columns:repeat(2,minmax(0,1fr))}.oh-f{min-height:40px;padding:0 11px;font-size:13px}}'
    ].join('\n');
    document.head.appendChild(s);
  }
  var AVC = ['#FDECEC:#B03A2E', '#EEF2FB:#2B4C9B', '#EAF7F1:#0A6B4B', '#FDF4E3:#9A6212', '#F2EEFB:#5B3FB5'];
  function av(name) { var n = String(name || '?').trim(), c = AVC[(n.charCodeAt(0) || 0) % AVC.length].split(':'); return '<span class="oh-av" style="background:' + c[0] + ';color:' + c[1] + '">' + esc(n.charAt(0) || '?') + '</span>'; }

  var BM = { f: 'all' };
  async function bedMap() {
    var cid = cidNow(), host = document.getElementById('beds-by-ward'); if (!cid || !host) return;
    bmCss(); css(); await info(cid); try { skin(); } catch (e) {}
    var r = await Promise.all([
      _supa.from('beds').select('*').eq('clinic_id', cid).order('ward').order('bed_number'),
      _supa.from('admissions').select('id,bed_id,patient_id,patient_name,admission_date').eq('clinic_id', cid).eq('status', 'Active'),
      money(cid)
    ]);
    if (r[0].error) return;
    var beds = r[0].data || [], adm = {}, M = r[2];
    (r[1].data || []).forEach(function (a) { if (a.bed_id) adm[a.bed_id] = a; });
    BM.data = { beds: beds, adm: adm, M: M };
    var btn = PAGE === 'reception'
      ? '<button type="button" class="oh-b p" onclick="openRegisterModal()">+ ' + T('newAdm') + '</button>'
      : '<button type="button" class="oh-b p" onclick="openAddBedModal()">+ ' + T('addBed') + '</button>';
    var ph = pageHead('v-beds', 'beds', T('bmT'), T('bmS'), btn); bnDigits(ph);
    host.classList.add('oh-bmhost');
    drawBeds();
  }
  function drawBeds() {
    var host = document.getElementById('beds-by-ward'), D = BM.data; if (!host || !D) return;
    var st = function (b) { var a = D.adm[b.id]; var s = window.AuraBeds ? AuraBeds.state(b, a) : (a ? 'occupied' : 'free'); return s; };
    var grp = { all: 0, free: 0, occ: 0, cln: 0, res: 0 };
    var key = function (s) { return s === 'free' ? 'free' : s === 'cleaning' ? 'cln' : s === 'reserved' ? 'res' : s === 'inactive' ? 'ina' : 'occ'; };
    D.beds.forEach(function (b) { var k = key(st(b)); grp.all++; if (grp[k] != null) grp[k]++; });
    var F = [['all', T('bmAll'), ''], ['free', T('free'), '#1BB880'], ['occ', T('occ'), '#2B4C9B'], ['cln', T('cln'), '#E0A43A'], ['res', T('res'), '#8A6AD8']];
    var h = '<div class="oh-flt">' + F.map(function (f) { return '<button type="button" class="oh-f' + (BM.f === f[0] ? ' on' : '') + '" data-bf="' + f[0] + '">' + (f[2] ? '<i style="background:' + f[2] + '"></i>' : '') + f[1] + ' <em>' + grp[f[0]] + '</em></button>'; }).join('') + '</div>';
    var wards = {}, order = [];
    D.beds.forEach(function (b) { var w = b.ward || 'General'; if (!wards[w]) { wards[w] = []; order.push(w); } wards[w].push(b); });
    order.forEach(function (w) {
      var list = wards[w], used = 0, act = 0, rates = {};
      list.forEach(function (b) { var s = st(b); if (s !== 'inactive') act++; if (key(s) === 'occ') used++; if (b.daily_rate) rates[b.daily_rate] = (rates[b.daily_rate] || 0) + 1; });
      var rate = Object.keys(rates).sort(function (a, b) { return rates[b] - rates[a]; })[0];
      var tiles = list.filter(function (b) { return BM.f === 'all' || key(st(b)) === BM.f; }).map(function (b) {
        var s = st(b), k = key(s), a = D.adm[b.id], m = a && D.M[a.id], due = m ? m.tot - m.paid : 0;
        var cls = k === 'occ' ? (s === 'critical' ? 'crit' : 'occ') : k;
        var chip = k === 'free' ? '+ ' + T('free') : k === 'cln' ? ic('spark', 14) + T('cln') : k === 'res' ? '&#128274; ' + T('res') : k === 'ina' ? T('off') : s === 'critical' ? ic('warn', 14) + T('critical') : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
        var body = '';
        if (a) {
          var dd = daysSince(a.admission_date);
          body = '<span class="pn">' + esc(a.patient_name || '') + '</span><span class="ps">' + (dd <= 1 ? T('todayAdm') : T('daysN', { n: dd })) + '</span>' + (due >= BIG_DUE ? '<span class="dg">' + ic('warn', 12) + T('dueTag') + '</span>' : '');
        } else if (k === 'free') body = '<span class="ad">+ ' + T('admit') + '</span>';
        else if (k === 'cln') body = '<span class="ps" style="margin-top:auto">' + T('cln') + '</span>';
        else if (k === 'res') body = '<span class="ps" style="margin-top:auto">' + T('res') + '</span>';
        else body = '<span class="ps" style="margin-top:auto">' + T('off') + '</span>';
        return '<button type="button" class="oh-bt ' + cls + '" data-bid="' + esc(b.id) + '"><span class="n">' + esc(b.bed_number) + '</span><span class="c">' + chip + '</span>' + body + '</button>';
      }).join('');
      if (!tiles) return;
      h += '<section class="oh-ward"><div class="oh-wh"><h3>' + esc(wardName(w)) + '</h3><span>' + T('bmUsed', { a: used, b: act }) + (rate ? ' · ' + rs(rate) + T('perDay') : '') + '</span></div><div class="oh-bg">' + tiles + '</div></section>';
    });
    host.innerHTML = h;
    bnDigits(host);
    if (!host._oh) { host._oh = 1; host.addEventListener('click', bedClick); }
  }
  function bedClick(e) {
    var f = e.target.closest('[data-bf]'); if (f) { BM.f = f.getAttribute('data-bf'); drawBeds(); return; }
    var t = e.target.closest('[data-bid]'); if (!t || !BM.data) return;
    var b = BM.data.beds.filter(function (x) { return String(x.id) === t.getAttribute('data-bid'); })[0]; if (!b) return;
    var a = BM.data.adm[b.id], s = window.AuraBeds ? AuraBeds.state(b, a) : (a ? 'occupied' : 'free'), ward = b.ward || 'General';
    if (PAGE === 'reception') {
      if (a && a.patient_id && typeof openBedProfile === 'function') openBedProfile(b.id, b.bed_number, ward, String(b.status || 'vacant').toLowerCase(), a.id, a.patient_id, a.patient_name, daysSince(a.admission_date));
      else if (s === 'free' && typeof admitToBed === 'function') admitToBed(b.id, b.daily_rate || 0, b.bed_number, ward);
    } else {
      if (a && a.patient_id && typeof openPatientFromBed === 'function') openPatientFromBed(a.patient_id, a.patient_name || '', b.bed_number || '', ward);
      else if (typeof openEditBed === 'function') openEditBed(b.id, b.bed_number, ward, b.daily_rate || 0, b.status, b.is_active !== false);
    }
  }

  var BL = { f: 'all', q: '' };
  async function billing() {
    var cid = cidNow(); if (!cid) return;
    var view = PAGE === 'reception' ? 'v-billing' : 'v-bills', v = document.getElementById(view); if (!v) return;
    bmCss(); css(); await info(cid); try { skin(); } catch (e) {}
    var btn = PAGE === 'reception' ? '<button type="button" class="oh-b p" onclick="openPayment()">' + ic('rupee', 18) + T('takePay') + '</button>' : '';
    var ph = pageHead(view, 'bill', T('blT'), T('blS'), btn);
    var host = document.getElementById('oh-bill');
    if (!host) {
      host = document.createElement('div'); host.id = 'oh-bill';
      ph.parentNode.insertBefore(host, ph.nextSibling);
      var more = document.createElement('div'); more.className = 'oh-more'; more.id = 'oh-bill-more';
      host.parentNode.insertBefore(more, host.nextSibling);
      host.addEventListener('click', billClick);
      host.addEventListener('input', function (e) { if (e.target.id === 'oh-bq') { BL.q = e.target.value; drawBill(true); } });
    }
    var since = new Date(Date.now() - 30 * 86400000).toISOString();
    var r = await Promise.all([
      _supa.from('admissions').select('id,bed_id,patient_id,patient_name,admission_date,discharge_date,status').eq('clinic_id', cid).eq('status', 'Active'),
      _supa.from('admissions').select('id,bed_id,patient_id,patient_name,admission_date,discharge_date,status').eq('clinic_id', cid).eq('status', 'Discharged').gte('discharge_date', since),
      _supa.from('beds').select('id,bed_number').eq('clinic_id', cid),
      money(cid)
    ]);
    var bn = {}; (r[2].data || []).forEach(function (b) { bn[b.id] = b.bed_number; });
    var M = r[3], rows = [];
    (r[0].data || []).concat(r[1].data || []).forEach(function (a) {
      var m = M[a.id] || { tot: 0, paid: 0 }, due = Math.round(m.tot - m.paid), dis = a.status === 'Discharged';
      if (dis && due <= 0 && m.tot <= 0) return;
      var st = (due >= BIG_DUE || (dis && due > 0)) ? 'urg' : due <= 0 ? (dis ? 'dis' : 'full') : m.paid <= 0 ? 'none' : 'part';
      var sub = dis ? (daysSince(a.discharge_date) <= 1 ? T('disToday') : T('disAgo', { n: daysSince(a.discharge_date) - 1 })) : T('bedDays', { b: '<span class="nob">' + esc(bn[a.bed_id] || '-') + '</span>', n: daysSince(a.admission_date) });
      rows.push({ a: a, tot: m.tot, paid: m.paid, due: due, st: st, sub: sub, bed: bn[a.bed_id] || '' });
    });
    var ord = { urg: 0, none: 1, part: 2, full: 3, dis: 4 };
    rows.sort(function (x, y) { return ord[x.st] - ord[y.st] || y.due - x.due; });
    BL.rows = rows;
    drawBill();
  }
  function drawBill(keepSearch) {
    var host = document.getElementById('oh-bill'); if (!host || !BL.rows) return;
    var R = BL.rows, cnt = { all: R.length, urg: 0, none: 0, part: 0, full: 0 }, tot = 0, paid = 0, due = 0;
    R.forEach(function (x) { if (cnt[x.st] != null) cnt[x.st]++; if (x.st === 'dis') cnt.full++; tot += x.tot; paid += x.paid; due += Math.max(0, x.due); });
    var q = BL.q.trim().toLowerCase();
    var vis = R.filter(function (x) {
      var okf = BL.f === 'all' || x.st === BL.f || (BL.f === 'full' && x.st === 'dis');
      var okq = !q || String(x.a.patient_name || '').toLowerCase().indexOf(q) >= 0 || String(x.bed).toLowerCase().indexOf(q) >= 0;
      return okf && okq;
    });
    var F = [['all', T('blAllF')], ['urg', T('stUrg')], ['none', T('stNone')], ['part', T('stPart')], ['full', T('stFull')]];
    var lab = { urg: T('stUrg'), none: T('stNone'), part: T('stPart'), full: T('stFull'), dis: T('stDis') };
    var list = vis.map(function (x) {
      var act = x.due > 0
        ? (PAGE === 'reception' ? '<button type="button" class="oh-act" data-pay="' + esc(x.a.id) + '">' + ic('rupee', 16) + T('takePay') + '</button>' : '<button type="button" class="oh-act" data-open="' + esc(x.a.id) + '">' + T('viewPt') + '</button>')
        : '<span class="oh-ok2">' + ic('ok', 16) + T('paidOk') + '</span>';
      return '<div class="oh-tr"><div class="oh-pt2">' + av(x.a.patient_name) + '<div style="min-width:0"><b>' + esc(x.a.patient_name || '') + '</b><span>' + x.sub + '</span></div></div>'
        + '<div class="r" data-l="' + T('colTot') + '">' + rs(x.tot) + '</div><div class="r" data-l="' + T('colPaid') + '">' + rs(x.paid) + '</div><div class="r ' + (x.due > 0 ? 'due' : 'zero') + '" data-l="' + T('colDue') + '">' + rs(Math.max(0, x.due)) + '</div>'
        + '<div><span class="oh-chip ' + x.st + '">' + lab[x.st] + '</span></div><div class="oh-ac">' + act + '</div></div>';
    }).join('');
    var top = '<div class="oh-sum"><div><span>' + T('blTotal') + '</span><b>' + rs(tot) + '</b></div><div><span>' + T('blPaid') + '</span><b>' + rs(paid) + '</b></div><div><span>' + T('blDue') + '</span><b class="r">' + rs(due) + '</b></div></div>'
      + '<div class="oh-blbar"><label class="oh-srch"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="oh-bq" placeholder="' + T('blSearch') + '" value="' + esc(BL.q) + '"></label>'
      + F.map(function (f) { return '<button type="button" class="oh-f' + (BL.f === f[0] ? ' on' : '') + '" data-blf="' + f[0] + '">' + f[1] + ' <em>' + cnt[f[0]] + '</em></button>'; }).join('') + '</div>';
    var table = '<div class="oh-bl"><div class="oh-tr h"><div>' + T('colPat') + '</div><div class="r" style="color:inherit;font-weight:600">' + T('colTot') + '</div><div class="r" style="color:inherit;font-weight:600">' + T('colPaid') + '</div><div class="r" style="color:inherit;font-weight:600">' + T('colDue') + '</div><div>' + T('colSt') + '</div><div></div></div>'
      + (list || '<div style="padding:28px 18px;color:var(--text-tertiary)">' + T('blEmpty') + '</div>') + '</div>';
    if (keepSearch && host.querySelector('.oh-bl')) {
      var tmp = document.createElement('div'); tmp.innerHTML = table; host.querySelector('.oh-bl').replaceWith(tmp.firstChild);
      host.querySelectorAll('[data-blf] em').forEach(function () {});
      bnDigits(host.querySelector('.oh-bl'));
    } else { host.innerHTML = top + table; bnDigits(host); var inp = host.querySelector('#oh-bq'); if (inp) inp.value = BL.q; }
    var more = document.getElementById('oh-bill-more'); if (more) more.textContent = PAGE === 'reception' ? T('oldList') : T('savedBills');
  }
  function billClick(e) {
    var f = e.target.closest('[data-blf]'); if (f) { BL.f = f.getAttribute('data-blf'); drawBill(); return; }
    var p = e.target.closest('[data-pay]'); if (p) { var x = rowOf(p.getAttribute('data-pay')); if (x && typeof openTransactionPayment === 'function') openTransactionPayment(x.a.id, x.a.patient_name || ''); return; }
    var o = e.target.closest('[data-open]'); if (o) { var y = rowOf(o.getAttribute('data-open')); if (y && y.a.patient_id && typeof openPatientProfile === 'function') openPatientProfile(y.a.patient_id, y.a.patient_name || ''); }
  }
  function rowOf(id) { return (BL.rows || []).filter(function (x) { return String(x.a.id) === String(id); })[0]; }

  function click(e) {
    var b = e.target.closest('[data-oh]'); if (!b || !last) return;
    var k = b.getAttribute('data-oh');
    if (k === 'beds' && typeof nav === 'function') nav('beds', navBtn('beds'));
    else if ((k === 'pay' || k === 'dues') && PAGE === 'reception') { if (typeof nav === 'function') nav('billing', navBtn('billing')); }
    else if (k === 'pay' && typeof dashTab === 'function') dashTab('payments', document.querySelector('.dash-tab[data-dtab="payments"]'));
    else if (k === 'dues' && typeof dashTab === 'function') dashTab('billing', document.querySelector('.dash-tab[data-dtab="billing"]'));
    else if (k === 'al') {
      var a = last.alerts[+b.getAttribute('data-i')]; if (!a) return;
      if (a.k === 'cln') { if (typeof nav === 'function') nav('beds', navBtn('beds')); }
      else if (a.k === 'set') { var bs = document.getElementById('aura-billsetup'); if (bs) bs.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      else if (a.pid && PAGE === 'reception' && typeof openProfile === 'function') openProfile(a.pid, a.name);
      else if (a.pid && typeof openPatientProfile === 'function') openPatientProfile(a.pid, a.name);
    }
  }

  async function load() {
    if (typeof _supa === 'undefined' || !window._clinicId && typeof _clinicId === 'undefined') return;
    var cid = typeof _clinicId !== 'undefined' ? _clinicId : window._clinicId; if (!cid) return;
    var pnl = document.getElementById('dtab-overview') || document.getElementById('v-home'); if (!pnl) return;
    css();
    var box = document.getElementById('oh-home');
    if (!box) {
      box = document.createElement('div'); box.id = 'oh-home';
      var first = pnl.querySelector(PAGE === 'reception' ? ':scope > .mg' : '.mg6'); if (first && !first.id) first.id = 'oh-old-kpis';
      var dv = document.getElementById('v-dashboard'), tabs = dv && dv.querySelector('.dash-tabs');
      if (tabs) tabs.parentNode.insertBefore(box, tabs); else if (first) first.parentNode.insertBefore(box, first); else pnl.insertBefore(box, pnl.firstChild);
      var bs = document.getElementById('aura-billsetup');   /* bill-setup reminder goes below the cards */
      if (bs && tabs) tabs.parentNode.insertBefore(bs, tabs);
      box.addEventListener('click', click);
    }
    await info(cid);
    try { skin(); } catch (e) { console.warn('nh-home skin', e); }
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
    var bsc = document.getElementById('aura-billsetup');
    if (bsc && bsc.style.display !== 'none' && bsc.innerHTML.trim()) alerts.push({ k: 'set', t: 'amb', s: 1.5e9 });
    alerts.sort(function (x, y) { return y.s - x.s; });

    var allDue = 0, owing = 0;
    Object.keys(due).forEach(function (k) { if (k && k !== 'null' && due[k] > 0.5) { allDue += due[k]; owing++; } });
    var duesText = rs(allDue);
    dueCount = owing;
    last = { counts: counts, inToday: r[3].count || 0, outToday: r[4].count || 0, method: method, week: week, alerts: alerts, dueCount: dueCount, duesText: duesText };
    render();
  }

  /* hook into the existing page: redraw after every dashboard refresh and language change */
  function wrap(name, after) {
    var f = window[name]; if (typeof f !== 'function' || f._oh) return;
    var w = function () { var res = f.apply(this, arguments); var go = function () { try { after(); } catch (e) { console.warn('nh-home', name, e); } };
      if (res && typeof res.then === 'function') res.then(go, go); else go(); return res; };
    w._oh = true; window[name] = w;
  }
  function relang() { try { render(); drawBeds(); drawBill(); var b = document.getElementById('oh-ph-beds'); if (b && BM.data) bedMap(); if (document.getElementById('oh-bill')) billing(); } catch (e) {} }
  function hook() {
    wrap('loadDashboard', function () { return load(); });
    wrap('loadHome', function () { return load(); });
    wrap('loadBeds', function () { return bedMap(); });
    wrap('loadBillingPage', function () { return billing(); });
    wrap('tpRefreshScreens', function () { if (document.getElementById('oh-bill')) billing(); if (BM.data) bedMap(); load(); });
    wrap('setLanguage', relang);
    wrap('setFamLanguage', relang);
  }
  hook();
  if (typeof window.nav === 'function' && !window.nav._oh) { var nv = window.nav; window.nav = function () { var x = nv.apply(this, arguments); try { if (document.getElementById('oh-bn')) bottomNav(); if (arguments[0] === 'bills' && PAGE === 'owner') billing(); } catch (e) {} return x; }; window.nav._oh = true; }
  window.ohLoad = function () { return load().catch(function (e) { console.warn('nh-home', e); }); };
  /* the first dashboard load may already have happened before this file arrived */
  setTimeout(function () { var v = document.getElementById('v-dashboard') || document.getElementById('v-home'); if (v && v.classList.contains('on')) window.ohLoad(); var vb = document.getElementById('v-beds'); if (vb && vb.classList.contains('on')) bedMap().catch(function () {}); }, 600);
})();
