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
      wrT: 'Price per day', wrS: 'Every bed in this ward will use this price.', wrL: 'Price per day (₹)', wrDone: 'Ward price saved', wrEdit: 'Change price', cgBed: 'Bed charge', cgDoc: 'Doctor visit', cgMed: 'Medicines', cgLab: 'Tests', cgOt: 'OT / procedure', cgNur: 'Nursing', female: 'Female', male: 'Male', yrs: 'yrs', famPh: 'Family phone', ptPh: 'Phone', admBy: 'Admitted by', admWhy: 'Reason', admOn: 'Admitted on', howLong: 'Days', vitals: 'Vitals', lastAt: 'Last:', vBp: 'BP', vPulse: 'Pulse', vTemp: 'Temp', vSpo2: 'SpO2', chgList: 'Charges', paidSoFar: 'Paid so far', addChg: 'Add charge', fullProf: 'Full profile', itemsN: '{n} items', inactive: 'inactive', activate: 'Activate', deactivate: 'Deactivate', revoke: 'Revoke access', teamT: 'Team', invT: 'Invite codes', invite: 'Invite staff',
      bank: 'Bank transfer', pmHow: '1. How is the patient paying?', pmAmt: '2. How much now?', pmFull: 'Full', pmRef: 'Reference no. (optional)', pmErrM: 'Choose Cash, UPI, Card or Bank transfer first.', pmErrA: 'Enter the amount.', pmDone: 'Payment recorded', pmBill: 'Updating the bill and sending WhatsApp…', pmWa: 'WhatsApp sent ✓', pmBillOk: 'Bill updated ✓', chType: 'Type', chDesc: 'What is it for', chQty: 'Quantity', chPrice: 'Price (₹)', chPhoto: 'Bill photo (optional)', chDrop: 'Tap to take / choose a photo — or drag it here', chErr: 'Write what it is for and the price.', chDone: 'Charge added', notiT: 'Notifications', notiS: 'Alerts and recent activity',
      seeAll: 'See all', wardBeds: 'Beds by ward', recentPay: 'Recent payments', onDuty: 'On duty today', used: 'in use', today2: 'today', yest: 'yesterday', daysAgo: '{n} days ago', noPay: 'No payments yet.',
      sPresent: 'Present', sLate: 'Late', sLeave: 'On leave', sAbsent: 'Absent', sHalf: 'Half day', sOff: 'Week off', sWill: 'Coming', sNot: 'Not in yet', stfT: 'On duty today', stfS: 'By shift — who is in, who is not', stfCame: '{a} / {b} present', shM: 'Morning', shA: 'Afternoon', shN: 'Night', attBook: 'Open attendance book', noStaff: 'No staff added for attendance yet. Add them in the attendance book.', logins: 'Login accounts',
      lcT: 'Licences & compliance', lcS: 'You will be reminded before anything expires', lcUrg: 'Urgent (within 15 days)', lcSoon: 'Soon (within 60 days)', lcOk: 'OK', lc12: 'Next 12 months', lcLeft: 'days left', lcOver: 'days over', lcExp: 'Expires {d}', lcRem: 'Remind:', lcBefore: '{n} days before', lcRenew: 'Renewed', lcAdd: 'Add licence', lcEdit: 'Edit', lcName: 'Licence name', lcAuth: 'Issued by (office)', lcNo: 'Licence number', lcDate: 'Expiry date', lcSave: 'Save', lcCancel: 'Cancel', lcDel: 'Delete', lcNone: 'No licences added yet. Add your licences once — AuraScale will remind you before each one expires.', lcNeedSql: 'Licence list is not set up yet (run the SQL once).', lcNewDate: 'New expiry date', aLic: '{name} — expires in {n} days', aLicOver: '{name} — expired {n} days ago', aLicSub: 'Expires {d} · start renewal',
      wdT: 'Waiting for discharge', wdSub: '{doc}advised discharge · {bill}', wdBill: 'bill {amt} due', wdClear: 'bill cleared', wdGo: 'Discharge', aWd: '{name} — discharge advised, {amt} still due', aWdSub: 'Bed {bed} · settle the bill and discharge', adv: 'Doctor advised discharge', advOn: '✓ Discharge advised', advOff: 'Mark: doctor advised discharge', advUndo: 'Undo', lic: 'Licences', staffN: 'Staff',
      bmT: 'Bed map', bmS: 'Tap a bed to see the patient or admit a new one', bmAll: 'All', bmUsed: '{a} / {b} in use', perDay: '/day', admit: 'Admit', addBed: 'Add bed', newAdm: 'New admission', daysN: '{n} days', todayAdm: 'Admitted today', dueTag: 'Due', critical: 'Critical', off: 'Switched off',
      blT: 'Billing', blS: 'Who owes how much — in one place', blTotal: 'Total bill', blPaid: 'Collected', blDue: 'Due', blSearch: 'Search name or bed', blAllF: 'All', stUrg: 'Overdue', stNone: 'Pending', stPart: 'Partly paid', stFull: 'Paid', stDis: 'Discharged', colPat: 'Patient', colTot: 'Total', colPaid: 'Paid', colDue: 'Due', colSt: 'Status', takePay: 'Take payment', viewPt: 'Open', paidOk: 'Fully paid', disAgo: 'Discharged · {n} days ago', disToday: 'Discharged · today', bedDays: 'Bed {b} · {n} days', blEmpty: 'No bills yet.', oldList: 'More billing tools', wG: 'General ward', wF: 'Female ward', wM: 'Maternity ward', wI: 'ICU / HDU', wE: 'Emergency', savedBills: 'Saved final bills',
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
      wrT: 'দৈনিক দাম', wrS: 'এই ওয়ার্ডের সব বেড এই দামে চলবে।', wrL: 'প্রতিদিনের দাম (₹)', wrDone: 'ওয়ার্ডের দাম সেভ হয়েছে', wrEdit: 'দাম বদলান', cgBed: 'বেড ভাড়া', cgDoc: 'ডাক্তার ভিজিট', cgMed: 'ওষুধ', cgLab: 'পরীক্ষা', cgOt: 'OT / প্রসিডিওর', cgNur: 'নার্সিং', female: 'মহিলা', male: 'পুরুষ', yrs: 'বছর', famPh: 'পরিবারের ফোন', ptPh: 'ফোন', admBy: 'ভর্তি করেছেন', admWhy: 'ভর্তির কারণ', admOn: 'ভর্তির তারিখ', howLong: 'কত দিন', vitals: 'ভাইটালস', lastAt: 'শেষ:', vBp: 'রক্তচাপ', vPulse: 'পালস', vTemp: 'তাপমাত্রা', vSpo2: 'অক্সিজেন', chgList: 'খরচের তালিকা', paidSoFar: 'জমা হয়েছে', addChg: 'খরচ যোগ করুন', fullProf: 'পুরো প্রোফাইল', itemsN: '{n}টি', inactive: 'বন্ধ', activate: 'চালু করুন', deactivate: 'বন্ধ করুন', revoke: 'অ্যাক্সেস সরান', teamT: 'টিম', invT: 'আমন্ত্রণ কোড', invite: 'স্টাফ আমন্ত্রণ',
      bank: 'ব্যাংক ট্রান্সফার', pmHow: '১. রোগী কীভাবে দিচ্ছেন?', pmAmt: '২. এখন কত দিচ্ছেন?', pmFull: 'পুরো', pmRef: 'রেফারেন্স নম্বর (ইচ্ছে হলে)', pmErrM: 'আগে নগদ, UPI, কার্ড বা ব্যাংক বাছুন।', pmErrA: 'টাকার পরিমাণ লিখুন।', pmDone: 'টাকা জমা হয়েছে', pmBill: 'বিল আপডেট হচ্ছে, WhatsApp যাচ্ছে…', pmWa: 'WhatsApp চলে গেছে ✓', pmBillOk: 'বিল আপডেট হয়েছে ✓', chType: 'ধরন', chDesc: 'কীসের জন্য', chQty: 'সংখ্যা', chPrice: 'দাম (₹)', chPhoto: 'বিলের ছবি (ইচ্ছে হলে)', chDrop: 'চাপ দিয়ে ছবি তুলুন / বাছুন — বা এখানে টেনে আনুন', chErr: 'কীসের জন্য আর দাম লিখুন।', chDone: 'খরচ যোগ হয়েছে', notiT: 'বিজ্ঞপ্তি', notiS: 'সতর্কতা আর সাম্প্রতিক কাজ',
      seeAll: 'সব দেখুন', wardBeds: 'ওয়ার্ড অনুযায়ী বেড', recentPay: 'সাম্প্রতিক জমা', onDuty: 'আজ ডিউটিতে', used: 'ব্যবহৃত', today2: 'আজ', yest: 'গতকাল', daysAgo: '{n} দিন আগে', noPay: 'এখনো কোনো জমা নেই।',
      sPresent: 'উপস্থিত', sLate: 'দেরিতে', sLeave: 'ছুটিতে', sAbsent: 'অনুপস্থিত', sHalf: 'অর্ধেক দিন', sOff: 'সাপ্তাহিক ছুটি', sWill: 'আসবেন', sNot: 'এখনো আসেননি', stfT: 'আজ ডিউটিতে', stfS: 'শিফট অনুযায়ী — কে আছেন, কে নেই', stfCame: '{a} / {b} জন এসেছেন', shM: 'সকাল', shA: 'বিকেল', shN: 'রাত', attBook: 'হাজিরা খাতা খুলুন', noStaff: 'হাজিরার জন্য এখনো কোনো স্টাফ যোগ করা হয়নি। হাজিরা খাতায় যোগ করুন।', logins: 'লগইন অ্যাকাউন্ট',
      lcT: 'লাইসেন্স ও নিয়মকানুন', lcS: 'মেয়াদ শেষের আগেই আপনাকে মনে করিয়ে দেওয়া হবে', lcUrg: 'জরুরি (১৫ দিনের মধ্যে)', lcSoon: 'শীঘ্রই (৬০ দিনের মধ্যে)', lcOk: 'ঠিক আছে', lc12: 'আগামী ১২ মাস', lcLeft: 'দিন বাকি', lcOver: 'দিন পেরিয়েছে', lcExp: 'মেয়াদ শেষ {d}', lcRem: 'মনে করান:', lcBefore: '{n} দিন আগে', lcRenew: 'নবীকরণ হয়েছে', lcAdd: 'লাইসেন্স যোগ করুন', lcEdit: 'বদলান', lcName: 'লাইসেন্সের নাম', lcAuth: 'কোন দপ্তর দিয়েছে', lcNo: 'লাইসেন্স নম্বর', lcDate: 'মেয়াদ শেষের তারিখ', lcSave: 'সেভ করুন', lcCancel: 'বাতিল', lcDel: 'মুছে দিন', lcNone: 'এখনো কোনো লাইসেন্স যোগ করা হয়নি। একবার যোগ করে দিন — মেয়াদ শেষের আগে AuraScale মনে করিয়ে দেবে।', lcNeedSql: 'লাইসেন্সের তালিকা এখনো চালু হয়নি (SQL একবার চালাতে হবে)।', lcNewDate: 'নতুন মেয়াদ শেষের তারিখ', aLic: '{name} — {n} দিনে মেয়াদ শেষ', aLicOver: '{name} — {n} দিন আগে মেয়াদ শেষ হয়েছে', aLicSub: 'শেষ তারিখ {d} · নবীকরণ শুরু করুন',
      wdT: 'ছুটির অপেক্ষায়', wdSub: '{doc}ছুটির পরামর্শ · {bill}', wdBill: 'বিল {amt} বাকি', wdClear: 'বিল পরিষ্কার', wdGo: 'ছুটি দিন', aWd: '{name} — ছুটির পরামর্শ, বিল {amt} বাকি', aWdSub: 'বেড {bed} · বিল মিটিয়ে ছুটি দিন', adv: 'ডাক্তার ছুটির পরামর্শ দিয়েছেন', advOn: '✓ ছুটির পরামর্শ দেওয়া হয়েছে', advOff: 'চিহ্ন দিন: ডাক্তার ছুটির পরামর্শ দিয়েছেন', advUndo: 'ফিরিয়ে নিন', lic: 'লাইসেন্স', staffN: 'স্টাফ',
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
      wrT: 'प्रतिदिन दाम', wrS: 'इस वार्ड के सभी बेड इसी दाम पर चलेंगे।', wrL: 'प्रतिदिन दाम (₹)', wrDone: 'वार्ड का दाम सेव हुआ', wrEdit: 'दाम बदलें', cgBed: 'बेड किराया', cgDoc: 'डॉक्टर विज़िट', cgMed: 'दवाइयाँ', cgLab: 'जाँच', cgOt: 'OT / प्रक्रिया', cgNur: 'नर्सिंग', female: 'महिला', male: 'पुरुष', yrs: 'वर्ष', famPh: 'परिवार का फ़ोन', ptPh: 'फ़ोन', admBy: 'भर्ती किया', admWhy: 'भर्ती का कारण', admOn: 'भर्ती तिथि', howLong: 'कितने दिन', vitals: 'वाइटल्स', lastAt: 'अंतिम:', vBp: 'बीपी', vPulse: 'पल्स', vTemp: 'तापमान', vSpo2: 'ऑक्सीजन', chgList: 'खर्च की सूची', paidSoFar: 'जमा हुआ', addChg: 'खर्च जोड़ें', fullProf: 'पूरी प्रोफ़ाइल', itemsN: '{n} आइटम', inactive: 'बंद', activate: 'चालू करें', deactivate: 'बंद करें', revoke: 'एक्सेस हटाएँ', teamT: 'टीम', invT: 'आमंत्रण कोड', invite: 'स्टाफ आमंत्रण',
      bank: 'बैंक ट्रांसफ़र', pmHow: '1. मरीज़ कैसे दे रहे हैं?', pmAmt: '2. अभी कितना?', pmFull: 'पूरा', pmRef: 'रेफ़रेंस नं. (वैकल्पिक)', pmErrM: 'पहले नकद, UPI, कार्ड या बैंक चुनें।', pmErrA: 'राशि लिखें।', pmDone: 'पैसा जमा हुआ', pmBill: 'बिल अपडेट हो रहा है, WhatsApp जा रहा है…', pmWa: 'WhatsApp भेजा ✓', pmBillOk: 'बिल अपडेट हुआ ✓', chType: 'प्रकार', chDesc: 'किसके लिए', chQty: 'संख्या', chPrice: 'दाम (₹)', chPhoto: 'बिल की फ़ोटो (वैकल्पिक)', chDrop: 'टैप करके फ़ोटो लें / चुनें — या यहाँ खींचें', chErr: 'किसके लिए और दाम लिखें।', chDone: 'खर्च जुड़ा', notiT: 'सूचनाएँ', notiS: 'अलर्ट और हाल की गतिविधि',
      seeAll: 'सब देखें', wardBeds: 'वार्ड के अनुसार बेड', recentPay: 'हाल की जमा', onDuty: 'आज ड्यूटी पर', used: 'उपयोग में', today2: 'आज', yest: 'कल', daysAgo: '{n} दिन पहले', noPay: 'अभी कोई जमा नहीं।',
      sPresent: 'उपस्थित', sLate: 'देर से', sLeave: 'छुट्टी पर', sAbsent: 'अनुपस्थित', sHalf: 'आधा दिन', sOff: 'साप्ताहिक छुट्टी', sWill: 'आएँगे', sNot: 'अभी नहीं आए', stfT: 'आज ड्यूटी पर', stfS: 'शिफ़्ट के अनुसार — कौन है, कौन नहीं', stfCame: '{a} / {b} आए', shM: 'सुबह', shA: 'दोपहर', shN: 'रात', attBook: 'हाज़िरी रजिस्टर खोलें', noStaff: 'हाज़िरी के लिए अभी कोई स्टाफ नहीं जोड़ा गया।', logins: 'लॉगिन अकाउंट',
      lcT: 'लाइसेंस और नियम', lcS: 'समाप्ति से पहले याद दिलाया जाएगा', lcUrg: 'ज़रूरी (15 दिन में)', lcSoon: 'जल्द (60 दिन में)', lcOk: 'ठीक है', lc12: 'अगले 12 महीने', lcLeft: 'दिन बाकी', lcOver: 'दिन बीत गए', lcExp: 'समाप्ति {d}', lcRem: 'याद दिलाएँ:', lcBefore: '{n} दिन पहले', lcRenew: 'नवीनीकरण हुआ', lcAdd: 'लाइसेंस जोड़ें', lcEdit: 'बदलें', lcName: 'लाइसेंस का नाम', lcAuth: 'किस दफ़्तर ने दिया', lcNo: 'लाइसेंस नंबर', lcDate: 'समाप्ति तिथि', lcSave: 'सेव करें', lcCancel: 'रद्द', lcDel: 'हटाएँ', lcNone: 'अभी कोई लाइसेंस नहीं जोड़ा गया।', lcNeedSql: 'लाइसेंस सूची अभी चालू नहीं है (SQL एक बार चलाएँ)।', lcNewDate: 'नई समाप्ति तिथि', aLic: '{name} — {n} दिन में समाप्त', aLicOver: '{name} — {n} दिन पहले समाप्त', aLicSub: 'अंतिम तिथि {d} · नवीनीकरण शुरू करें',
      wdT: 'छुट्टी का इंतज़ार', wdSub: '{doc}छुट्टी की सलाह · {bill}', wdBill: 'बिल {amt} बाकी', wdClear: 'बिल साफ़', wdGo: 'छुट्टी दें', aWd: '{name} — छुट्टी की सलाह, बिल {amt} बाकी', aWdSub: 'बेड {bed} · बिल चुकाकर छुट्टी दें', adv: 'डॉक्टर ने छुट्टी की सलाह दी', advOn: '✓ छुट्टी की सलाह दी गई', advOff: 'चिह्नित करें: डॉक्टर ने छुट्टी की सलाह दी', advUndo: 'वापस लें', lic: 'लाइसेंस', staffN: 'स्टाफ',
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
        else if (a.k === 'lic') { tt = a.n < 0 ? T('aLicOver', { name: esc(a.name), n: -a.n }) : T('aLic', { name: esc(a.name), n: a.n }); ss = T('aLicSub', { d: dLong(a.d) }); }
        else if (a.k === 'wd') { tt = T('aWd', { name: esc(a.name), amt: rs(a.amt) }); ss = (a.by ? esc(a.by) + ' · ' : '') + T('aWdSub', { bed: '<span class="nob">' + esc(a.bed) + '</span>' }); }
        else { tt = T('aCln', { n: a.n }); ss = T('aClnSub'); }
        var icn = a.k === 'due' ? 'rupee' : a.k === 'dis' ? 'phone' : a.k === 'long' ? 'clock' : a.k === 'set' ? 'warn' : a.k === 'lic' ? 'warn' : a.k === 'wd' ? 'out' : 'spark';
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
      'body.oh-live #aura-billsetup:not(.oh-show){display:none!important}',
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
        if (k === 'oadm') { if (typeof openAdmitModal === 'function') openAdmitModal(); return; }
        if (k === 'bill') { nav('bills', navBtn('bills')); return; }
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
        : '<div class="oh-pa"><button type="button" class="oh-b s" data-ph="bill">' + ic('rupee', 18) + T('blT') + '</button><button type="button" class="oh-b p" data-ph="oadm">+ ' + T('newAdm') + '</button></div>');
  }
  function skin() {
    skinCss(); early(); document.body.classList.add('oh-skin'); licNav(); advButton(); greenCss(); bedModalHooks(); prefixHook(); listCss(); dragDrop();
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
      '.oh-bt.free{background:#EEFBF3;border-color:#BDEBCF;border-top-color:#22C55E}.oh-bt.free .n,.oh-bt.free .c,.oh-bt.free .ad{color:#0A6B4B}',
      '.oh-bt.occ,.oh-bt.crit{background:#FDF1F1;border-color:#F5C4C4;border-top-color:#E5484D}.oh-bt.occ .n,.oh-bt.occ .c,.oh-bt.crit .n,.oh-bt.crit .c{color:#C42B2B}',
      '.oh-bt.cln{background:#FFF7EA;border-color:#F7D9A8;border-top-color:#F59E0B}.oh-bt.cln .n,.oh-bt.cln .c{color:#B45309}',
      '.oh-bt.res{background:#EFF5FF;border-color:#BFD6F6;border-top-color:#3B82F6}.oh-bt.res .n,.oh-bt.res .c{color:#1D5FD1}',
      '.oh-bt.ina{background:var(--surface2);border-color:var(--border);border-top-color:var(--border-strong);opacity:.7}',
      '[data-theme=dark] .oh-bt.free{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.35)}[data-theme=dark] .oh-bt.free .n,[data-theme=dark] .oh-bt.free .c,[data-theme=dark] .oh-bt.free .ad{color:#5FD4A6}',
      '[data-theme=dark] .oh-bt.occ,[data-theme=dark] .oh-bt.crit{background:rgba(229,72,77,.12);border-color:rgba(229,72,77,.35)}[data-theme=dark] .oh-bt.occ .n,[data-theme=dark] .oh-bt.occ .c{color:#F59B9E}',
      '[data-theme=dark] .oh-bt.cln{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35)}[data-theme=dark] .oh-bt.cln .n,[data-theme=dark] .oh-bt.cln .c{color:#F6C065}',
      '[data-theme=dark] .oh-bt.res{background:rgba(59,130,246,.13);border-color:rgba(59,130,246,.35)}[data-theme=dark] .oh-bt.res .n,[data-theme=dark] .oh-bt.res .c{color:#93B8F7}',
      '.oh-wd{background:none!important;border:0!important}.oh-wd .oh-pnh{background:none!important;border:0!important;padding:0 0 10px!important}.oh-wd .oh-pnh h3{font-size:14.5px!important;font-weight:500!important;color:var(--text-secondary)!important}.oh-wd .oh-pnb{padding:0!important;display:flex;flex-direction:column;gap:10px}',
      '.oh-wd .oh-py{background:#E7F6EE;border:1px solid #BFE6D3!important;border-radius:12px;padding:14px 16px!important}.oh-wd .oh-py b{font-size:16px}.oh-wd .oh-py .r{color:var(--red);font-weight:700}',
      '[data-theme=dark] .oh-wd .oh-py{background:rgba(27,184,128,.1);border-color:rgba(27,184,128,.3)!important}',
      '.oh-wd .oh-py .oh-b{background:#0A6B4B!important;color:#fff!important;border-color:#0A6B4B!important}',
      '.oh-wr8{border:0;background:none;color:var(--green);font:inherit;font-size:13px;font-weight:600;cursor:pointer;padding:0 0 0 8px}',
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
  function av(name) { var n = String(name || '?').trim(), c = AVC[(n.charCodeAt(0) || 0) % AVC.length].split(':'); return '<span class="oh-av" style="background:' + c[0] + ';color:' + c[1] + '">' + esc(ini(n)) + '</span>'; }

  var BM = { f: 'all' };
  async function bedMap() {
    var cid = cidNow(), host = document.getElementById('beds-by-ward'); if (!cid || !host) return;
    bmCss(); bottomCss(); css(); await info(cid); try { skin(); } catch (e) {}
    var r = await Promise.all([
      _supa.from('beds').select('*').eq('clinic_id', cid).order('ward').order('bed_number'),
      _supa.from('admissions').select('id,bed_id,patient_id,patient_name,admission_date').eq('clinic_id', cid).eq('status', 'Active'),
      money(cid)
    ]);
    if (r[0].error) { host.classList.add('oh-ready'); return; }
    var beds = r[0].data || [], adm = {}, M = r[2];
    (r[1].data || []).forEach(function (a) { if (a.bed_id) adm[a.bed_id] = a; });
    BM.data = { beds: beds, adm: adm, M: M };
    BM.wd = await advised(cid).catch(function () { return []; });
    var btn = PAGE === 'reception'
      ? '<button type="button" class="oh-b s" onclick="openPayment()">' + ic('rupee', 18) + T('takePay') + '</button><button type="button" class="oh-b p" onclick="openRegisterModal()">+ ' + T('newAdm') + '</button>'
      : '<button type="button" class="oh-b s" onclick="openAddBedModal()">+ ' + T('addBed') + '</button><button type="button" class="oh-b p" onclick="openAdmitModal()">+ ' + T('newAdm') + '</button>';
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
    var F = [['all', T('bmAll'), ''], ['free', T('free'), '#22C55E'], ['occ', T('occ'), '#E5484D'], ['cln', T('cln'), '#F59E0B'], ['res', T('res'), '#3B82F6']];
    var h = wdHtml(BM.wd || [], D) + '<div class="oh-flt">' + F.map(function (f) { return '<button type="button" class="oh-f' + (BM.f === f[0] ? ' on' : '') + '" data-bf="' + f[0] + '">' + (f[2] ? '<i style="background:' + f[2] + '"></i>' : '') + f[1] + ' <em>' + grp[f[0]] + '</em></button>'; }).join('') + '</div>';
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
      h += '<section class="oh-ward"><div class="oh-wh"><h3>' + esc(wardName(w)) + '</h3><span>' + T('bmUsed', { a: used, b: act }) + (rate ? ' · ' + rs(rate) + T('perDay') : '') + (PAGE === 'owner' ? '<button type="button" class="oh-wr8" data-wr="' + esc(w) + '">✎ ' + T('wrEdit') + '</button>' : '') + '</span></div><div class="oh-bg">' + tiles + '</div></section>';
    });
    host.innerHTML = h;
    bnDigits(host);
    host.classList.add('oh-ready'); document.body.classList.add('oh-live');
    if (!host._oh) { host._oh = 1; host.addEventListener('click', bedClick); }
  }
  function bedClick(e) {
    var f = e.target.closest('[data-bf]'); if (f) { BM.f = f.getAttribute('data-bf'); drawBeds(); return; }
    var wr = e.target.closest('[data-wr]'); if (wr) { rateModal(wr.getAttribute('data-wr')); return; }
    var wd = e.target.closest('[data-wd]');
    if (wd) {
      var aa = (BM.wd || []).filter(function (x) { return String(x.id) === wd.getAttribute('data-wd'); })[0]; if (!aa) return;
      if (PAGE === 'reception' && typeof openDischargeConfirm === 'function') openDischargeConfirm(aa.id, aa.bed_id, aa.patient_name || '');
      else if (typeof openPatientFromBed === 'function') openPatientFromBed(aa.patient_id, aa.patient_name || '', '', '');
      return;
    }
    var t = e.target.closest('[data-bid]'); if (!t || !BM.data) return;
    var b = BM.data.beds.filter(function (x) { return String(x.id) === t.getAttribute('data-bid'); })[0]; if (!b) return;
    var a = BM.data.adm[b.id], s = window.AuraBeds ? AuraBeds.state(b, a) : (a ? 'occupied' : 'free'), ward = b.ward || 'General';
    if (a) { openDrawer(a.id, b.bed_number); return; }
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
        ? (PAGE === 'reception' ? '<button type="button" class="oh-act" data-pay="' + esc(x.a.id) + '">' + ic('rupee', 16) + T('takePay') + '</button>' : '<button type="button" class="oh-act" data-opay="' + esc(x.a.id) + '">' + ic('rupee', 16) + T('takePay') + '</button>')
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
    var op = e.target.closest('[data-opay]'); if (op) { var z = rowOf(op.getAttribute('data-opay')); if (z) payModal(z.a, z.a.patient_name || '', z.due); return; }
    var o = e.target.closest('[data-open]'); if (o) { var y = rowOf(o.getAttribute('data-open')); if (y && y.a.patient_id && typeof openPatientProfile === 'function') openPatientProfile(y.a.patient_id, y.a.patient_name || ''); }
  }
  function rowOf(id) { return (BL.rows || []).filter(function (x) { return String(x.a.id) === String(id); })[0]; }

  /* ---------------- fonts, fixed logo, no flash of old screens ---------------- */
  function early() {
    if (!document.getElementById('oh-font')) {
      var l = document.createElement('link'); l.id = 'oh-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
    if (document.getElementById('oh-early-css')) return;
    var s = document.createElement('style'); s.id = 'oh-early-css';
    s.textContent = [
      'body.oh-skin,body.oh-skin *:not(svg):not(path):not(code):not(pre){font-family:"Noto Sans Bengali","IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif!important}',
      'html[lang=en] body.oh-skin,html[lang=en] body.oh-skin *:not(svg):not(path):not(code):not(pre){font-family:"IBM Plex Sans","Noto Sans Bengali",system-ui,sans-serif!important}',
      'body.oh-skin .oh-bt .n,body.oh-skin .oh-mono,body.oh-skin .oh-mono *{font-family:"IBM Plex Mono",ui-monospace,monospace!important}',
      'body.oh-skin #sidebar .sb-logo{position:sticky;top:0;z-index:6}',
      'body.oh-skin header{position:sticky;top:0;z-index:30}',
      /* hide the old screens until the new ones are drawn — no flash */
      'body.oh-skin #v-notifications>.sh,body.oh-skin #v-beds>.sh,body.oh-skin #v-billing>.sh,body.oh-skin #v-bills>.sh,body.oh-skin #v-home>.sh,body.oh-skin #v-dashboard>.sh,body.oh-skin #v-staff>.sh{display:none!important}',
      'body.oh-skin #beds-by-ward:not(.oh-ready){visibility:hidden;min-height:60vh}',
      'body.oh-skin:not(.oh-bmfail) #v-beds>*:not(.oh-ph):not(#beds-by-ward){display:none!important}',
      'body.oh-live #dtab-overview>*:not(#oh-bottom):not(.oh-keep){display:none!important}',
      'body.oh-live #v-home>*:not(.oh-ph):not(#oh-home):not(#oh-bottom){display:none!important}'
    ].join('\n');
    document.head.appendChild(s);
    if (document.body) document.body.classList.add('oh-skin');
  }

  /* ---------------- home: beds by ward, recent payments, staff on duty ---------------- */
  function bottomCss() {
    if (document.getElementById('oh-bot-css')) return;
    var s = document.createElement('style'); s.id = 'oh-bot-css';
    s.textContent = [
      '#oh-bottom{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;margin-top:14px;align-items:start}',
      '.oh-pn{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;min-width:0}',
      '.oh-pn.full{grid-column:1/-1}',
      '.oh-pnh{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:var(--surface2);border-bottom:1px solid var(--border)}',
      '.oh-pnh h3{margin:0;font-size:15px;font-weight:600;color:var(--text-primary)}',
      '.oh-lnk{border:0;background:none;color:var(--green);font:inherit;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;min-height:36px}',
      '.oh-pnb{padding:16px 20px}',
      '.oh-wr{margin-bottom:16px}.oh-wr:last-child{margin-bottom:2px}',
      '.oh-wr div{display:flex;justify-content:space-between;font-size:14.5px;margin-bottom:8px}.oh-wr b{font-weight:600;color:var(--text-primary)}.oh-wr span{color:var(--text-tertiary)}',
      '.oh-bar{height:10px;background:var(--border);border-radius:3px;overflow:hidden}.oh-bar i{display:block;height:100%;background:#1BB880}.oh-bar i.hi{background:#E0A43A}',
      '.oh-py{display:flex;align-items:center;gap:14px;padding:12px 0;border-top:1px solid var(--border)}.oh-py:first-child{border-top:0;padding-top:4px}',
      '.oh-pyi{width:38px;height:38px;border-radius:9px;background:var(--surface2);display:grid;place-items:center;color:var(--text-secondary);flex:none}',
      '.oh-py b{display:block;font-size:14.5px;font-weight:600;color:var(--text-primary)}.oh-py span{font-size:13px;color:var(--text-tertiary)}.oh-py em{margin-left:auto;font-style:normal;font-weight:700;font-variant-numeric:tabular-nums;color:var(--text-primary)}',
      '.oh-duty{display:flex;flex-wrap:wrap;gap:10px}',
      '.oh-dc{display:inline-flex;align-items:center;gap:10px;background:var(--surface2);border-radius:12px;padding:6px 12px 6px 6px}',
      '.oh-dc .oh-av{width:32px;height:32px;border-radius:8px;font-size:13px}.oh-dc b{font-size:14px;font-weight:600;color:var(--text-primary)}.oh-dc span{font-size:13px;color:var(--text-tertiary)}',
      '.oh-st{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;padding:4px 10px;border-radius:5px;white-space:nowrap}',
      '.oh-st:before{content:"";width:7px;height:7px;border-radius:2px;background:currentColor}',
      '.oh-st.p{background:var(--green-bg);color:var(--green)}.oh-st.l{background:var(--amber-bg);color:var(--amber)}.oh-st.v{background:var(--red-bg);color:var(--red)}.oh-st.w{background:var(--surface2);color:var(--text-secondary);border:1px solid var(--border)}',
      '.oh-note{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--text-tertiary);margin:16px 2px}',
      '@media(max-width:900px){#oh-bottom{grid-template-columns:minmax(0,1fr)}}'
    ].join('\n');
    document.head.appendChild(s);
  }
  var IC2 = {
    upi: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    phone: IC.phone, shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    calendar: IC.cal, clock: IC.clock, info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'
  };
  function ic2(n, sz) { return '<svg width="' + (sz || 18) + '" height="' + (sz || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC2[n] + '</svg>'; }
  function when(d) { var k = dayKey(d), t = dayKey(new Date()), n = Math.round((new Date(t) - new Date(k)) / 86400000); return n <= 0 ? T('today2') : n === 1 ? T('yest') : T('daysAgo', { n: n }); }
  function methodName(m) { m = String(m || '').toLowerCase(); return m.indexOf('cash') >= 0 ? T('cash') : m.indexOf('upi') >= 0 ? T('upi') : m.indexOf('card') >= 0 ? T('card') : (m ? m : T('other')); }

  async function staffToday(cid) {
    var day = dayKey(new Date());
    var r = await Promise.all([
      _supa.from('hr_staff').select('*').eq('clinic_id', cid).order('name'),
      _supa.from('hr_attendance').select('staff_id,status,late,in_at,out_at').eq('clinic_id', cid).eq('day', day)
    ]);
    if (r[0].error) return null;
    var att = {}; (r[1].data || []).forEach(function (a) { att[a.staff_id] = a; });
    var nowMin = (function () { var p = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }).split(':'); return +p[0] * 60 + +p[1]; })();
    return (r[0].data || []).filter(function (s) { return s.is_active !== false; }).map(function (s) {
      var a = att[s.id], ds = String(s.duty_start || '10:00').slice(0, 5), hm = ds.split(':'), start = (+hm[0] || 0) * 60 + (+hm[1] || 0);
      var st = 'w', lab = T('sWill');
      if (a) {
        if (a.status === 'present') { st = a.late ? 'l' : 'p'; lab = a.late ? T('sLate') : T('sPresent'); }
        else if (a.status === 'half') { st = 'l'; lab = T('sHalf'); }
        else if (a.status === 'leave') { st = 'v'; lab = T('sLeave'); }
        else if (a.status === 'off') { st = 'w'; lab = T('sOff'); }
        else if (a.status === 'absent') { st = 'v'; lab = T('sAbsent'); }
      } else if (nowMin > start + 15) { st = 'l'; lab = T('sNot'); }
      var shift = start < 12 * 60 ? 'M' : start < 18 * 60 ? 'A' : 'N';
      return { s: s, st: st, lab: lab, start: ds, shift: shift, came: !!(a && (a.status === 'present' || a.status === 'half')) };
    });
  }
  function fmtTime(hm) {
    var p = String(hm).split(':'), h = +p[0], m = +p[1] || 0, l = lang();
    if (l === 'en') return (h % 12 || 12) + (m ? ':' + (m < 10 ? '0' : '') + m : '') + (h < 12 ? ' am' : ' pm');
    return (h % 12 || 12) + (m ? ':' + (m < 10 ? '0' : '') + m : '') + (l === 'bn' ? 'টা' : ' बजे');
  }

  async function homeExtras() {
    var cid = cidNow(); if (!cid) return;
    var pnl = document.getElementById('dtab-overview') || document.getElementById('v-home'); if (!pnl) return;
    bottomCss(); bmCss();
    var bot = document.getElementById('oh-bottom');
    if (!bot) {
      bot = document.createElement('div'); bot.id = 'oh-bottom';
      if (PAGE === 'owner') pnl.appendChild(bot); else { var hb = document.getElementById('oh-home'); hb.parentNode.insertBefore(bot, hb.nextSibling); }
      bot.addEventListener('click', function (e) {
        var b = e.target.closest('[data-go]'); if (!b) return;
        var g = b.getAttribute('data-go');
        if (g === 'beds') nav('beds', navBtn('beds'));
        else if (g === 'pay') { if (PAGE === 'reception') nav('billing', navBtn('billing')); else if (typeof dashTab === 'function') dashTab('payments', document.querySelector('.dash-tab[data-dtab="payments"]')); }
        else if (g === 'staff') { if (PAGE === 'owner') nav('staff', navBtn('staff')); else location.href = 'staff.html?c=' + encodeURIComponent(cid); }
      });
    }
    var r = await Promise.all([
      _supa.from('beds').select('id,ward,status,is_active').eq('clinic_id', cid),
      _supa.from('admissions').select('id,bed_id,patient_name').eq('clinic_id', cid).eq('status', 'Active'),
      _supa.from('nh_payments').select('admission_id,amount,method,created_at').eq('clinic_id', cid).order('created_at', { ascending: false }).limit(5),
      staffToday(cid).catch(function () { return null; })
    ]);
    var beds = r[0].data || [], act = r[1].data || [], pays = r[2].data || [], staff = r[3];
    var occ = {}; act.forEach(function (a) { if (a.bed_id) occ[a.bed_id] = 1; });
    var W = {}, order = [];
    beds.forEach(function (b) { if (b.is_active === false) return; var w = b.ward || 'General'; if (!W[w]) { W[w] = { n: 0, u: 0 }; order.push(w); } W[w].n++; if (occ[b.id]) W[w].u++; });
    var wards = order.map(function (w) { var x = W[w], pc = x.n ? Math.round(100 * x.u / x.n) : 0; return '<div class="oh-wr"><div><b>' + esc(wardName(w)) + '</b><span>' + x.u + ' / ' + x.n + ' ' + T('used') + '</span></div><div class="oh-bar"><i class="' + (pc >= 75 ? 'hi' : '') + '" style="width:' + pc + '%"></i></div></div>'; }).join('');
    var nm = {}; act.forEach(function (a) { nm[a.id] = a.patient_name; });
    var miss = pays.filter(function (p) { return p.admission_id && !nm[p.admission_id]; }).map(function (p) { return p.admission_id; });
    if (miss.length) { var rr = await _supa.from('admissions').select('id,patient_name').in('id', miss); (rr.data || []).forEach(function (a) { nm[a.id] = a.patient_name; }); }
    var payl = pays.map(function (p) { var cash = String(p.method || '').toLowerCase().indexOf('cash') >= 0; return '<div class="oh-py"><span class="oh-pyi">' + ic2(cash ? 'cash' : 'upi', 19) + '</span><div><b>' + esc(nm[p.admission_id] || '—') + '</b><span>' + esc(methodName(p.method)) + ' · ' + when(p.created_at) + '</span></div><em>' + rs(p.amount) + '</em></div>'; }).join('') || '<div style="color:var(--text-tertiary)">' + T('noPay') + '</div>';
    var duty = '';
    if (staff && staff.length) duty = '<div class="oh-duty">' + staff.map(function (x) { return '<span class="oh-dc">' + av(x.s.name) + '<b>' + esc(x.s.name) + '</b><span>· ' + esc(x.s.designation || x.s.role || '') + '</span><span class="oh-st ' + x.st + '">' + x.lab + '</span></span>'; }).join('') + '</div>';
    else duty = '<div style="color:var(--text-tertiary)">' + T('noStaff') + '</div>';
    var showDuty = !(staff === null && PAGE === 'reception');
    var hd = function (t, go) { return '<div class="oh-pnh"><h3>' + t + '</h3><button type="button" class="oh-lnk" data-go="' + go + '">' + T('seeAll') + ic('chev', 15) + '</button></div>'; };
    bot.innerHTML = '<div class="oh-pn">' + hd(T('wardBeds'), 'beds') + '<div class="oh-pnb">' + wards + '</div></div>'
      + '<div class="oh-pn">' + hd(T('recentPay'), 'pay') + '<div class="oh-pnb">' + payl + '</div></div>'
      + (showDuty ? '<div class="oh-pn full">' + hd(T('onDuty'), 'staff') + '<div class="oh-pnb">' + duty + '</div></div>' : '');
    bnDigits(bot);
  }

  /* ---------------- staff page ---------------- */
  async function staffBoard() {
    var cid = cidNow(), v = document.getElementById('v-staff'); if (!cid || !v || PAGE !== 'owner') return;
    bmCss(); bottomCss(); css(); await info(cid); try { skin(); } catch (e) {}
    var list = await staffToday(cid).catch(function () { return null; }) || [];
    var came = list.filter(function (x) { return x.came; }).length;
    pageHead('v-staff', 'staff', T('stfT'), T('stfS'), '<span class="oh-st p" style="font-size:14px;padding:10px 14px">' + T('stfCame', { a: came, b: list.length }) + '</span><button type="button" class="oh-b s" data-sb="book">' + T('attBook') + '</button><button type="button" class="oh-b p" onclick="openStaffInvite()">+ ' + T('invite') + '</button>');
    var host = document.getElementById('oh-staff');
    if (!host) {
      host = document.createElement('div'); host.id = 'oh-staff';
      var ph = document.getElementById('oh-ph-staff'); ph.parentNode.insertBefore(host, ph.nextSibling);
      var more = document.createElement('div'); more.className = 'oh-more'; more.id = 'oh-staff-more'; host.parentNode.insertBefore(more, host.nextSibling);
      v.addEventListener('click', function (e) { if (e.target.closest('[data-sb=book]')) location.href = 'staff.html?c=' + encodeURIComponent(cid); });
    }
    var css2 = document.getElementById('oh-stf-css');
    if (!css2) { css2 = document.createElement('style'); css2.id = 'oh-stf-css'; css2.textContent = '.oh-sh{display:flex;gap:10px;align-items:baseline;margin:22px 0 12px}.oh-sh b{font-size:16px;font-weight:700;color:var(--text-primary)}.oh-sh span{font-size:13.5px;color:var(--text-tertiary)}.oh-sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px}.oh-sc{display:flex;gap:14px;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 16px;min-height:108px}.oh-sc .oh-av{width:40px;height:40px}.oh-sc .i{flex:1;min-width:0}.oh-sc b{display:block;font-size:15px;font-weight:700;color:var(--text-primary)}.oh-sc .d{font-size:13px;color:var(--text-tertiary);margin:2px 0 6px}.oh-sc a{display:inline-flex;gap:6px;align-items:center;color:var(--green);text-decoration:none;font-size:14.5px}'; document.head.appendChild(css2); }
    if (!list.length) host.innerHTML = '<div class="oh-pn"><div class="oh-pnb" style="color:var(--text-tertiary)">' + T('noStaff') + '</div></div>';
    else {
      var SH = [['M', T('shM')], ['A', T('shA')], ['N', T('shN')]], h = '';
      SH.forEach(function (sh) {
        var g = list.filter(function (x) { return x.shift === sh[0]; }); if (!g.length) return;
        var times = g.map(function (x) { return x.start; }).sort();
        h += '<div class="oh-sh"><b>' + sh[1] + '</b><span>' + fmtTime(times[0]) + (times.length > 1 && times[times.length - 1] !== times[0] ? ' – ' + fmtTime(times[times.length - 1]) : '') + '</span></div><div class="oh-sg">';
        h += g.map(function (x) {
          var ph2 = x.s.phone || x.s.mobile || '';
          return '<div class="oh-sc">' + av(x.s.name) + '<div class="i"><b>' + esc(x.s.name) + '</b><div class="d">' + esc([x.s.designation || x.s.role, fmtTime(x.start)].filter(Boolean).join(' · ')) + '</div>' + (ph2 ? '<a class="nob" href="tel:' + esc(ph2) + '">' + ic2('phone', 16) + esc(ph2) + '</a>' : '') + '</div><span class="oh-st ' + x.st + '">' + x.lab + '</span></div>';
        }).join('') + '</div>';
      });
      host.innerHTML = h;
    }
    var more = document.getElementById('oh-staff-more'); if (more) more.textContent = T('logins');
    bnDigits(v.querySelector('#oh-ph-staff')); bnDigits(host);
  }

  /* ---------------- licences (owner) ---------------- */
  var LC = { rows: null, ok: true };
  async function licLoad(cid) {
    var r = await _supa.from('nh_licences').select('*').eq('clinic_id', cid).order('expires_on');
    if (r.error) { LC.ok = false; LC.rows = []; return []; }
    LC.ok = true; LC.rows = r.data || []; return LC.rows;
  }
  function daysTo(d) { return Math.round((new Date(String(d).slice(0, 10) + 'T00:00:00+05:30') - new Date(dayKey(new Date()) + 'T00:00:00+05:30')) / 86400000); }
  function dLong(d) { var l = lang(); return new Date(String(d).slice(0, 10) + 'T12:00:00+05:30').toLocaleDateString(l === 'bn' ? 'bn-IN' : l === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
  function licNav() {
    if (PAGE !== 'owner' || document.getElementById('oh-nb-lic')) return;
    var st = navBtn('staff'); if (!st) return;
    var b = document.createElement('button'); b.className = 'nb owner-only'; b.id = 'oh-nb-lic'; b.type = 'button';
    b.innerHTML = '<span class="nb-ic">' + ic2('shield', 18) + '</span><span class="oh-lic-t">' + T('lic') + '</span>';
    b.onclick = function () { nav('licences', b); };
    st.parentNode.insertBefore(b, st);
    var dv = document.getElementById('v-dashboard');
    if (dv && !document.getElementById('v-licences')) { var v = document.createElement('div'); v.className = 'view'; v.id = 'v-licences'; dv.parentNode.appendChild(v); }
  }
  async function licences() {
    var cid = cidNow(), v = document.getElementById('v-licences'); if (!cid || !v) return;
    bmCss(); bottomCss(); css(); await info(cid); try { skin(); } catch (e) {}
    var t = document.getElementById('tab-title'); if (t) t.textContent = T('lic');
    if (!document.getElementById('oh-lc-css')) { var c = document.createElement('style'); c.id = 'oh-lc-css'; c.textContent = [
      '.oh-lsum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:14px}',
      '.oh-lsum div{display:flex;gap:14px;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px}',
      '.oh-lsum i{width:44px;height:44px;border-radius:10px;display:grid;place-items:center;font-style:normal}.oh-lsum b{display:block;font-size:22px;font-weight:700;color:var(--text-primary)}.oh-lsum span{font-size:14px;color:var(--text-secondary)}',
      '.oh-tl{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:6px}.oh-tl div{background:var(--surface2);border-radius:8px;min-height:96px;padding:8px;font-size:12.5px;color:var(--text-secondary)}.oh-tl div.now{background:var(--green-bg)}',
      '.oh-tl em{display:block;font-style:normal;margin-top:8px;border-radius:6px;padding:4px 6px;font-size:12px;font-weight:600;background:var(--surface);border:1px solid var(--border)}.oh-tl em.u{background:var(--red-bg);color:var(--red);border-color:transparent}.oh-tl em.s{background:var(--amber-bg);color:var(--amber);border-color:transparent}',
      '.oh-lc{display:grid;grid-template-columns:120px minmax(0,1fr) auto;gap:20px;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;margin-top:12px}',
      '.oh-ld{border-radius:10px;text-align:center;padding:18px 6px}.oh-ld b{display:block;font-size:28px;font-weight:700}.oh-ld span{font-size:13px;font-weight:600}',
      '.oh-ld.u{background:var(--red-bg);color:var(--red)}.oh-ld.s{background:var(--amber-bg);color:var(--amber)}.oh-ld.k{background:var(--green-bg);color:var(--green)}',
      '.oh-lc h4{margin:0;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:16px;font-weight:700;color:var(--text-primary)}.oh-lc .m{font-size:13.5px;color:var(--text-tertiary);margin:4px 0}',
      '.oh-lp{height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin:10px 0}.oh-lp i{display:block;height:100%}',
      '.oh-rm{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13.5px;color:var(--text-tertiary)}.oh-rm button{min-height:40px;padding:0 12px;border-radius:8px;border:1px solid var(--border-strong);background:var(--surface);font:inherit;font-size:13.5px;cursor:pointer;color:var(--text-secondary)}.oh-rm button.on{background:#0A6B4B;border-color:#0A6B4B;color:#fff}',
      '.oh-la{display:flex;flex-direction:column;gap:8px;align-items:stretch}',
      '.oh-mod{position:fixed;inset:0;background:rgba(10,20,15,.45);z-index:200;display:grid;place-items:center;padding:16px}.oh-mbox{background:var(--surface);border-radius:16px;width:min(460px,100%);padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3)}',
      '.oh-mbox h3{margin:0 0 14px;font-size:18px}.oh-mbox label{display:block;font-size:13.5px;color:var(--text-secondary);margin:10px 0 4px}.oh-mbox input{width:100%;min-height:46px;border:1px solid var(--border-strong);border-radius:10px;padding:0 12px;font:inherit;font-size:15px;background:var(--surface);color:var(--text-primary);box-sizing:border-box}',
      '.oh-mbtn{display:flex;gap:10px;justify-content:flex-end;margin-top:18px;flex-wrap:wrap}',
      '@media(max-width:700px){.oh-lsum{grid-template-columns:1fr}.oh-tl{grid-template-columns:repeat(4,minmax(0,1fr))}.oh-lc{grid-template-columns:90px minmax(0,1fr)}.oh-la{grid-column:1/-1}}'
    ].join('\n'); document.head.appendChild(c); }
    pageHead('v-licences', 'lic', T('lcT'), T('lcS'), '<button type="button" class="oh-b p" data-lc="add">+ ' + T('lcAdd') + '</button>');
    var host = document.getElementById('oh-lic');
    if (!host) { host = document.createElement('div'); host.id = 'oh-lic'; v.appendChild(host); v.addEventListener('click', licClick); }
    var rows = await licLoad(cid);
    if (!LC.ok) { host.innerHTML = '<div class="oh-pn"><div class="oh-pnb" style="color:var(--text-tertiary)">' + T('lcNeedSql') + '</div></div>'; return; }
    var cu = 0, cs = 0, ck = 0;
    rows.forEach(function (x) { var d = daysTo(x.expires_on); if (d <= 15) cu++; else if (d <= 60) cs++; else ck++; });
    var h = '<div class="oh-lsum"><div><i style="background:var(--red-bg);color:var(--red)">' + ic('warn', 20) + '</i><span><b>' + cu + '</b>' + T('lcUrg') + '</span></div><div><i style="background:var(--amber-bg);color:var(--amber)">' + ic2('clock', 20) + '</i><span><b>' + cs + '</b>' + T('lcSoon') + '</span></div><div><i style="background:var(--green-bg);color:var(--green)">' + ic('ok', 20) + '</i><span><b>' + ck + '</b>' + T('lcOk') + '</span></div></div>';
    var l = lang(), loc = l === 'bn' ? 'bn-IN' : l === 'hi' ? 'hi-IN' : 'en-IN', now = new Date(), tl = '';
    for (var i = 0; i < 12; i++) {
      var md = new Date(now.getFullYear(), now.getMonth() + i, 1), y = md.getFullYear(), m = md.getMonth();
      var lab = md.toLocaleDateString(loc, { month: 'short' }) + (i === 0 || m === 0 ? ' ' + String(y).slice(2) : '');
      var items = rows.filter(function (x) { var e = new Date(String(x.expires_on).slice(0, 10) + 'T12:00:00'); return e.getFullYear() === y && e.getMonth() === m; }).map(function (x) { var d = daysTo(x.expires_on); return '<em class="' + (d <= 15 ? 'u' : d <= 60 ? 's' : '') + '">' + new Date(String(x.expires_on).slice(0, 10) + 'T12:00:00').getDate() + ' · ' + esc(String(x.name).split(' ')[0]) + '</em>'; }).join('');
      tl += '<div class="' + (i === 0 ? 'now' : '') + '">' + lab + items + '</div>';
    }
    h += '<div class="oh-pn"><div class="oh-pnh"><h3>' + T('lc12') + '</h3>' + ic2('calendar', 18) + '</div><div class="oh-pnb"><div class="oh-tl">' + tl + '</div></div></div>';
    if (!rows.length) h += '<div class="oh-pn" style="margin-top:12px"><div class="oh-pnb" style="color:var(--text-tertiary)">' + T('lcNone') + '</div></div>';
    rows.forEach(function (x) {
      var d = daysTo(x.expires_on), k = d <= 15 ? 'u' : d <= 60 ? 's' : 'k', col = k === 'u' ? 'var(--red)' : k === 's' ? '#E0A43A' : '#1BB880';
      var chip = k === 'u' ? '<span class="oh-chip urg">' + T('stUrg').replace(T('stUrg'), lang() === 'en' ? 'Urgent' : lang() === 'hi' ? 'ज़रूरी' : 'জরুরি') + '</span>' : k === 's' ? '<span class="oh-chip none">' + (lang() === 'en' ? 'Soon' : lang() === 'hi' ? 'जल्द' : 'শীঘ্রই') + '</span>' : '<span class="oh-chip full">' + T('lcOk') + '</span>';
      var pc = Math.max(3, Math.min(100, 100 - (Math.max(d, 0) / 365) * 100));
      var rem = (x.remind_days || [30, 15, 7]);
      h += '<div class="oh-lc"><div class="oh-ld ' + k + '"><b>' + Math.abs(d) + '</b><span>' + (d < 0 ? T('lcOver') : T('lcLeft')) + '</span></div><div style="min-width:0"><h4>' + esc(x.name) + chip + '</h4><div class="m">' + [x.authority ? esc(x.authority) : '', x.number ? (lang() === 'en' ? 'No. ' : 'নং ') + '<span class="nob">' + esc(x.number) + '</span>' : ''].filter(Boolean).join(' · ') + '</div><div class="m">' + ic2('calendar', 15) + ' ' + T('lcExp', { d: dLong(x.expires_on) }) + '</div><div class="oh-lp"><i style="width:' + pc + '%;background:' + col + '"></i></div>'
        + '<div class="oh-rm">' + ic2('bell', 15) + T('lcRem') + [30, 15, 7].map(function (n) { return '<button type="button" class="' + (rem.indexOf(n) >= 0 ? 'on' : '') + '" data-rm="' + n + '" data-id="' + x.id + '">' + T('lcBefore', { n: n }) + '</button>'; }).join('') + '</div></div>'
        + '<div class="oh-la"><button type="button" class="oh-b ' + (k === 'k' ? 's' : 'p') + '" data-lc="renew" data-id="' + x.id + '">' + ic('ok', 17) + T('lcRenew') + '</button><button type="button" class="oh-lnk" data-lc="edit" data-id="' + x.id + '">' + T('lcEdit') + '</button></div></div>';
    });
    host.innerHTML = h; bnDigits(host); bnDigits(document.getElementById('oh-ph-lic'));
  }
  function licRow(id) { return (LC.rows || []).filter(function (x) { return String(x.id) === String(id); })[0]; }
  function licModal(x, renew) {
    modCss();
    var old = document.getElementById('oh-lmod'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'oh-mod'; m.id = 'oh-lmod';
    var nd = '';
    if (renew && x) { var e = new Date(String(x.expires_on).slice(0, 10) + 'T12:00:00'); e.setFullYear(e.getFullYear() + 1); nd = e.toISOString().slice(0, 10); }
    m.innerHTML = '<div class="oh-mbox"><h3>' + (renew ? T('lcRenew') : x ? T('lcEdit') : T('lcAdd')) + '</h3>'
      + (renew ? '<b>' + esc(x.name) + '</b>' : '<label>' + T('lcName') + '</label><input id="oh-lf-n" list="oh-lf-dl" value="' + esc(x ? x.name : '') + '"><datalist id="oh-lf-dl"><option value="Clinical Establishment Licence"><option value="Fire NOC"><option value="Biomedical Waste Authorisation"><option value="Pollution Consent (CTO)"><option value="Pharmacy (Drug) Licence"><option value="Trade Licence"><option value="PC-PNDT Registration"><option value="Lift Licence"></datalist>'
        + '<label>' + T('lcAuth') + '</label><input id="oh-lf-a" value="' + esc(x ? x.authority || '' : '') + '"><label>' + T('lcNo') + '</label><input id="oh-lf-no" value="' + esc(x ? x.number || '' : '') + '">')
      + '<label>' + (renew ? T('lcNewDate') : T('lcDate')) + '</label><input id="oh-lf-d" type="date" value="' + esc(renew ? nd : x ? String(x.expires_on).slice(0, 10) : '') + '">'
      + '<div class="oh-mbtn">' + (x && !renew ? '<button type="button" class="oh-b s" data-lm="del" style="margin-right:auto;color:var(--red)">' + T('lcDel') + '</button>' : '') + '<button type="button" class="oh-b s" data-lm="x">' + T('lcCancel') + '</button><button type="button" class="oh-b p" data-lm="save">' + T('lcSave') + '</button></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', async function (e) {
      if (e.target === m || e.target.closest('[data-lm=x]')) { m.remove(); return; }
      var cid = cidNow();
      if (e.target.closest('[data-lm=del]')) { if (!confirmDel()) return; await _supa.from('nh_licences').delete().eq('id', x.id); m.remove(); licences(); return; }
      if (!e.target.closest('[data-lm=save]')) return;
      var d = document.getElementById('oh-lf-d').value; if (!d) return;
      var r;
      if (renew) r = await _supa.from('nh_licences').update({ expires_on: d, renewed_at: new Date().toISOString() }).eq('id', x.id);
      else {
        var row = { name: document.getElementById('oh-lf-n').value.trim(), authority: document.getElementById('oh-lf-a').value.trim() || null, number: document.getElementById('oh-lf-no').value.trim() || null, expires_on: d };
        if (!row.name) return;
        r = x ? await _supa.from('nh_licences').update(row).eq('id', x.id) : await _supa.from('nh_licences').insert(Object.assign({ clinic_id: cid }, row));
      }
      if (r && r.error) { if (typeof showToast === 'function') showToast(r.error.message); return; }
      m.remove(); licences();
    });
  }
  function confirmDel() { try { return window.confirm('OK?'); } catch (e) { return true; } }
  async function licClick(e) {
    var a = e.target.closest('[data-lc]');
    if (a) { var k = a.getAttribute('data-lc'), x = licRow(a.getAttribute('data-id')); if (k === 'add') licModal(null); else if (k === 'edit') licModal(x); else if (k === 'renew') licModal(x, true); return; }
    var rb = e.target.closest('[data-rm]');
    if (rb) {
      var y = licRow(rb.getAttribute('data-id')); if (!y) return; var n = +rb.getAttribute('data-rm'), cur = (y.remind_days || [30, 15, 7]).slice();
      cur = cur.indexOf(n) >= 0 ? cur.filter(function (z) { return z !== n; }) : cur.concat([n]);
      rb.classList.toggle('on');
      var r = await _supa.from('nh_licences').update({ remind_days: cur }).eq('id', y.id); if (!r.error) y.remind_days = cur;
    }
  }

  /* ---------------- waiting for discharge ---------------- */
  async function advised(cid) {
    var r = await _supa.from('admissions').select('id,bed_id,patient_id,patient_name,discharge_advised_at,discharge_advised_by').eq('clinic_id', cid).eq('status', 'Active').not('discharge_advised_at', 'is', null);
    if (r.error) return [];
    return (r.data || []).filter(function (a) { return a.discharge_advised_at; });
  }
  function wdHtml(list, D) {
    if (!list.length) return '';
    var bn = {}; D.beds.forEach(function (b) { bn[b.id] = b.bed_number; });
    return '<div class="oh-wd oh-pn" style="margin-bottom:18px"><div class="oh-pnh"><h3>' + T('wdT') + ' <span style="color:var(--text-tertiary);font-weight:500">· ' + list.length + '</span></h3></div><div class="oh-pnb">'
      + list.map(function (a) {
        var m = D.M[a.id] || { tot: 0, paid: 0 }, due = Math.round(m.tot - m.paid);
        return '<div class="oh-py">' + av(a.patient_name) + '<div style="min-width:0"><b>' + esc(a.patient_name || '') + ' · ' + (lang() === 'en' ? 'Bed ' : lang() === 'hi' ? 'बेड ' : 'বেড ') + '<span class="nob">' + esc(bn[a.bed_id] || '') + '</span></b><span>' + T('wdSub', { doc: a.discharge_advised_by ? esc(a.discharge_advised_by) + (lang() === 'bn' ? '-এর ' : lang() === 'hi' ? ' की ' : ' ') : '', bill: due > 0 ? '<span class="r">' + T('wdBill', { amt: rs(due) }) + '</span>' : T('wdClear') }) + '</span></div><button type="button" class="oh-b s" style="margin-left:auto;min-height:44px" data-wd="' + esc(a.id) + '">' + ic('out', 17) + T('wdGo') + '</button></div>';
      }).join('') + '</div></div>';
  }
  async function adviseToggle(admId, on, by) {
    var r = await _supa.rpc('nh_advise_discharge', { p_admission_id: admId, p_on: on, p_by: by || null });
    if (r.error && typeof showToast === 'function') showToast(r.error.message);
    return !r.error;
  }
  function advButton() {
    /* reception: inside the bed profile, a button to record the doctor's discharge advice */
    if (PAGE !== 'reception' || typeof window.openBedProfile !== 'function' || window.openBedProfile._ohAdv) return;
    var f = window.openBedProfile;
    var w = function (bid, num, ward, status, admId, patId, patName) {
      var res = f.apply(this, arguments);
      setTimeout(async function () {
        var op = document.getElementById('bp-occupied-panel'); if (!op || !admId) return;
        var box = document.getElementById('oh-adv'); if (!box) { box = document.createElement('div'); box.id = 'oh-adv'; box.style.margin = '12px 0'; op.insertBefore(box, op.firstChild.nextSibling || null); }
        var r = await _supa.from('admissions').select('discharge_advised_at,admitting_doctor').eq('id', admId).maybeSingle();
        if (r.error) { box.innerHTML = ''; return; }
        var d = r.data && (Array.isArray(r.data) ? r.data[0] : r.data) || {};
        var draw = function (on) {
          box.innerHTML = on ? '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="oh-chip full">' + T('advOn') + '</span><button type="button" class="oh-lnk" data-adv="0">' + T('advUndo') + '</button></div>'
            : '<button type="button" class="oh-b s" style="width:100%" data-adv="1">' + ic('ok', 16) + T('advOff') + '</button>';
        };
        draw(!!d.discharge_advised_at);
        box.onclick = async function (e) { var b = e.target.closest('[data-adv]'); if (!b) return; var on = b.getAttribute('data-adv') === '1'; if (await adviseToggle(admId, on, d.admitting_doctor)) { draw(on); if (BM.data) bedMap(); } };
      }, 60);
      return res;
    };
    w._ohAdv = true; window.openBedProfile = w;
  }

  /* ---------------- initials (Lokman Khan → LK) ---------------- */
  function ini(name) {
    var w = String(name || '').replace(/^(dr\.?|ডা\.?|sister|সিস্টার|mr\.?|mrs\.?|md\.?|মো\.?)\s+/i, '').trim().split(/\s+/).filter(Boolean);
    if (!w.length) return '?';
    var a = w[0].charAt(0), b = w.length > 1 ? w[w.length - 1].charAt(0) : '';
    if (!/[A-Za-z]/.test(a)) return a;   /* Bengali / Hindi names: one letter, like the demo */
    return (a + b).toUpperCase();
  }

  /* ---------------- solid green sidebar (owner + reception) ---------------- */
  function greenCss() {
    if (document.getElementById('oh-green-css')) return;
    var s = document.createElement('style'); s.id = 'oh-green-css';
    s.textContent = [
      'body.oh-skin #sidebar{background:#0E6B4C!important;border-right:0!important;color:#fff}',
      'body.oh-skin #sidebar .sb-logo{background:#0A5039!important}',
      'body.oh-skin #sidebar .nav-sec{color:rgba(255,255,255,.55)!important}',
      'body.oh-skin #sidebar .nb{color:rgba(255,255,255,.92)!important;background:transparent}',
      'body.oh-skin #sidebar .nb .nb-ic,body.oh-skin #sidebar .nb svg{color:inherit!important;stroke:currentColor}',
      'body.oh-skin #sidebar .nb:hover{background:rgba(255,255,255,.08)!important}',
      'body.oh-skin #sidebar .nb.on{background:#fff!important;color:#0A6B4B!important;font-weight:700}',
      'body.oh-skin #sidebar .nb-badge,body.oh-skin #sidebar .nb .badge,body.oh-skin #sidebar [id^=nav-][id$=-count]{background:#E5484D!important;color:#fff!important;border-color:transparent!important}',
      'body.oh-skin #sidebar .sb-facility-inner,body.oh-skin #sidebar .sb-fac,body.oh-skin #sidebar .sb-facility>div{background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.16)!important;color:#fff!important}',
      'body.oh-skin #sidebar .sb-facility *{color:#fff!important}',
      'body.oh-skin #sidebar .sb-foot,body.oh-skin #sidebar .sb-bottom{border-top-color:rgba(255,255,255,.14)!important}',
      'body.oh-skin #sidebar .sb-foot *,body.oh-skin #sidebar .sb-bottom *,body.oh-skin #sidebar a{color:rgba(255,255,255,.8)!important}',
      'body.oh-skin #sidebar .sb-user,body.oh-skin #sidebar .sb-me{background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.16)!important}',
      'body.oh-skin #sidebar hr,body.oh-skin #sidebar .nav-div,body.oh-skin #sidebar .sb-div{border-color:rgba(255,255,255,.14)!important;background:rgba(255,255,255,.14)!important}',
      '.oh-sbadm{display:flex;align-items:center;justify-content:center;gap:10px;margin:14px 14px 6px;min-height:52px;border-radius:12px;border:0;background:#fff;color:#0A6B4B;font:inherit;font-size:16px;font-weight:700;cursor:pointer;width:calc(100% - 28px);box-shadow:0 2px 0 rgba(0,0,0,.08)}',
      '.oh-sbadm:hover{background:#F1FBF6}'
    ].join('\n');
    document.head.appendChild(s);
  }
  function sidebarAdmit() {
    if (document.getElementById('oh-sbadm')) return;
    var lg = document.querySelector('#sidebar .sb-logo'); if (!lg) return;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'oh-sbadm'; b.className = 'oh-sbadm';
    b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span>' + T('newAdm') + '</span>';
    b.onclick = function () { if (PAGE === 'reception' && typeof openRegisterModal === 'function') openRegisterModal(); else if (typeof openAdmitModal === 'function') openAdmitModal(); };
    lg.parentNode.insertBefore(b, lg.nextSibling);
  }

  /* ---------------- ward price + ward-letter bed numbers (owner) ---------------- */
  function wardPrefix(ward, beds) {
    var same = (beds || []).filter(function (b) { return (b.ward || 'General') === ward; });
    var cnt = {};
    same.forEach(function (b) { var m = String(b.bed_number || '').match(/^([A-Za-z]+)\s*-?\s*\d/); if (m) cnt[m[1].toUpperCase()] = (cnt[m[1].toUpperCase()] || 0) + 1; });
    var best = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; })[0];
    if (best) return best;
    var k = String(ward).toLowerCase();
    if (k.indexOf('icu') >= 0) return 'I'; if (k.indexOf('hdu') >= 0) return 'H'; if (k.indexOf('mater') >= 0) return 'M';
    if (k.indexOf('female') >= 0) return 'F'; if (k === 'male' || k.indexOf('male ') === 0) return 'ML'; if (k.indexOf('general') >= 0) return 'G';
    if (k.indexOf('emerg') >= 0) return 'E'; if (k.indexOf('semi') >= 0) return 'SP'; if (k.indexOf('cabin') >= 0) return 'C'; if (k.indexOf('private') >= 0) return 'P';
    return (String(ward).match(/[A-Za-z]/) || ['B'])[0].toUpperCase();
  }
  function nextBedNo(ward, beds) {
    var p = wardPrefix(ward, beds), max = 0;
    (beds || []).forEach(function (b) { var m = String(b.bed_number || '').match(/^([A-Za-z]+)\s*-?\s*(\d+)/); if (m && m[1].toUpperCase() === p) max = Math.max(max, +m[2]); });
    return p + (max + 1);
  }
  function wardRate(ward, beds) {
    var r = {}; (beds || []).forEach(function (b) { if ((b.ward || 'General') === ward && +b.daily_rate > 0) r[b.daily_rate] = (r[b.daily_rate] || 0) + 1; });
    var k = Object.keys(r).sort(function (a, b) { return r[b] - r[a]; })[0]; return k ? +k : 0;
  }
  async function allBeds() { if (BM.data && BM.data.beds) return BM.data.beds; var r = await _supa.from('beds').select('id,bed_number,ward,daily_rate').eq('clinic_id', cidNow()); return r.data || []; }
  function bedModalHooks() {
    if (PAGE !== 'owner') return;
    var hide = function (id) { var el = document.getElementById(id); if (!el) return null; var box = el.closest('.fg,.form-group,.frow,.field') || el.parentElement; return box; };
    if (typeof window.openAddBedModal === 'function' && !window.openAddBedModal._oh) {
      var f = window.openAddBedModal;
      window.openAddBedModal = async function () {
        var res = f.apply(this, arguments);
        var beds = await allBeds(), w = document.getElementById('bed-ward'), n = document.getElementById('bed-num'), rt = document.getElementById('bed-rate-add');
        var sync = function () { if (!w) return; if (n) n.value = nextBedNo(w.value, beds); var r = wardRate(w.value, beds), box = hide('bed-rate-add'); if (rt) rt.value = r || ''; if (box) box.style.display = r ? 'none' : ''; };
        if (w && !w._oh) { w._oh = 1; w.addEventListener('change', sync); }
        sync();
        return res;
      };
      window.openAddBedModal._oh = true;
    }
    if (typeof window.openEditBed === 'function' && !window.openEditBed._ohr) {
      var g = window.openEditBed;
      window.openEditBed = async function () {
        var res = g.apply(this, arguments);
        var beds = await allBeds(), w = document.getElementById('edit-bed-ward'), rt = document.getElementById('edit-bed-rate');
        var sync = function () { var r = wardRate(w.value, beds), box = hide('edit-bed-rate'); if (r && rt) rt.value = r; if (box) box.style.display = r ? 'none' : ''; };
        if (w && !w._oh) { w._oh = 1; w.addEventListener('change', sync); }
        if (w) sync();
        return res;
      };
      window.openEditBed._ohr = true;
    }
  }
  /* typed only a number? add the ward letter: 45 in Private → P45, 69 in Maternity → M69, 600 in ICU → I600 */
  function prefixHook() {
    if (PAGE !== 'owner') return;
    [['addBed', 'bed-num', 'bed-ward'], ['saveBedEdit', 'edit-bed-num', 'edit-bed-ward']].forEach(function (x) {
      var f = window[x[0]]; if (typeof f !== 'function' || f._ohp) return;
      var w = async function () {
        var n = document.getElementById(x[1]), wd = document.getElementById(x[2]);
        if (n && wd && /^\s*\d+\s*$/.test(n.value)) n.value = wardPrefix(wd.value, await allBeds()) + n.value.trim();
        if (n) n.value = n.value.trim().toUpperCase();
        return f.apply(this, arguments);
      };
      w._ohp = true; window[x[0]] = w;
    });
    var bn = document.getElementById('bed-num'); if (bn) bn.placeholder = lang() === 'en' ? 'e.g. 45 → P45' : 'যেমন 45 লিখলে → P45';
  }
  function rateModal(ward) {
    modCss(); css();
    var beds = (BM.data && BM.data.beds) || [], cur = wardRate(ward, beds);
    var old = document.getElementById('oh-rmod'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'oh-mod'; m.id = 'oh-rmod';
    m.innerHTML = '<div class="oh-mbox"><h3>' + esc(wardName(ward)) + ' — ' + T('wrT') + '</h3><p style="margin:0 0 6px;color:var(--text-secondary);font-size:14px">' + T('wrS') + '</p><label>' + T('wrL') + '</label><input id="oh-rf" type="number" min="0" step="50" value="' + (cur || '') + '"><div class="oh-mbtn"><button type="button" class="oh-b s" data-rm="x">' + T('lcCancel') + '</button><button type="button" class="oh-b p" data-rm="ok">' + T('lcSave') + '</button></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', async function (e) {
      if (e.target === m || e.target.closest('[data-rm=x]')) { m.remove(); return; }
      if (!e.target.closest('[data-rm=ok]')) return;
      var v = +document.getElementById('oh-rf').value; if (!(v > 0)) return;
      var r = await _supa.from('beds').update({ daily_rate: v }).eq('clinic_id', cidNow()).eq('ward', ward);
      if (r.error) { if (typeof showToast === 'function') showToast(r.error.message); return; }
      m.remove(); if (typeof showToast === 'function') showToast(T('wrDone')); bedMap();
    });
  }

  /* ---------------- patient drawer (opens from the right) ---------------- */
  var DR = { id: null };
  function drCss() {
    if (document.getElementById('oh-dr-css')) return;
    var s = document.createElement('style'); s.id = 'oh-dr-css';
    s.textContent = [
      '.oh-drov{position:fixed;inset:0;background:rgba(8,20,14,.42);z-index:150;opacity:0;transition:opacity .2s}.oh-drov.on{opacity:1}',
      '.oh-dr{position:fixed;top:0;right:0;bottom:0;width:min(500px,100vw);background:var(--surface);z-index:151;display:flex;flex-direction:column;box-shadow:-12px 0 40px rgba(0,0,0,.18);transform:translateX(100%);transition:transform .25s ease}.oh-dr.on{transform:none}',
      '.oh-drh{display:flex;gap:14px;align-items:center;padding:18px 20px;border-bottom:1px solid var(--border)}.oh-drh .oh-av{width:48px;height:48px;font-size:16px;border-radius:12px}',
      '.oh-drh b{display:block;font-size:19px;font-weight:700;color:var(--text-primary)}.oh-drh span{font-size:14px;color:var(--text-tertiary)}',
      '.oh-x{margin-left:auto;width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:var(--surface);cursor:pointer;display:grid;place-items:center;color:var(--text-secondary);flex:none}',
      '.oh-drb{flex:1;overflow:auto;padding:18px 20px}',
      '.oh-drs{display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px}.oh-drs:first-child{margin-top:0}.oh-drs h4{margin:0;font-size:15px;font-weight:700;color:var(--text-primary)}.oh-drs span{font-size:13px;color:var(--text-tertiary)}',
      '.oh-tri{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border);border-radius:12px;overflow:hidden}.oh-tri div{padding:14px;border-left:1px solid var(--border)}.oh-tri div:first-child{border-left:0}.oh-tri span{display:block;font-size:13px;color:var(--text-tertiary)}.oh-tri b{display:block;font-size:19px;font-weight:700;margin-top:6px;color:var(--text-primary)}.oh-tri .due{background:var(--red-bg)}.oh-tri .due span,.oh-tri .due b{color:var(--red)}',
      '.oh-kv2{display:grid;grid-template-columns:1fr 1fr;gap:16px 20px;margin-top:18px}.oh-kv2 span{display:block;font-size:13px;color:var(--text-tertiary);margin-bottom:4px}.oh-kv2 b{font-size:15px;font-weight:600;color:var(--text-primary)}.oh-kv2 a{color:var(--green);font-weight:600;text-decoration:none;display:inline-flex;gap:6px;align-items:center;font-size:15px}',
      '.oh-nil{color:var(--text-tertiary)!important;font-weight:500!important;letter-spacing:.04em}',
      '.oh-vit{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.oh-vit div{background:var(--surface2);border-radius:10px;padding:10px}.oh-vit span{display:block;font-size:12.5px;color:var(--text-tertiary)}.oh-vit b{display:block;font-size:17px;font-weight:700;color:var(--text-primary);margin:2px 0}.oh-vit svg{width:100%;height:20px}',
      '.oh-cg{border:1px solid var(--border);border-radius:12px;overflow:hidden}.oh-cgr{border-top:1px solid var(--border)}.oh-cgr:first-child{border-top:0}',
      '.oh-cgh{display:flex;gap:12px;align-items:center;width:100%;padding:12px 14px;border:0;background:none;font:inherit;text-align:left;cursor:pointer;color:inherit}.oh-cgh:hover{background:var(--surface2)}',
      '.oh-cgi{width:38px;height:38px;border-radius:10px;border:1px solid var(--border);display:grid;place-items:center;color:var(--text-secondary);flex:none}',
      '.oh-cgh b{display:block;font-size:14.5px;font-weight:600;color:var(--text-primary)}.oh-cgh span{font-size:12.5px;color:var(--text-tertiary)}.oh-cgh em{margin-left:auto;font-style:normal;font-weight:700;color:var(--text-primary)}',
      '.oh-cgh .cv{transition:transform .15s;color:var(--text-tertiary)}.oh-cgr.open .cv{transform:rotate(90deg)}',
      '.oh-cgl{display:none;background:var(--surface2);padding:4px 14px 10px 64px}.oh-cgr.open .oh-cgl{display:block}',
      '.oh-cgl div{display:flex;justify-content:space-between;gap:10px;font-size:13.5px;padding:7px 0;border-top:1px dashed var(--border)}.oh-cgl div:first-child{border-top:0}.oh-cgl span{color:var(--text-secondary)}.oh-cgl b{font-weight:600;color:var(--text-primary);white-space:nowrap}',
      '.oh-tot2{display:flex;justify-content:space-between;padding:12px 14px;border-top:1px solid var(--border);font-weight:700;background:var(--surface2)}',
      '.oh-pyl div{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid var(--border)}.oh-pyl div:first-child{border-top:0}.oh-pyl b{font-weight:600}.oh-pyl span{font-size:12.5px;color:var(--text-tertiary);display:block}',
      '.oh-drf{border-top:1px solid var(--border);padding:14px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;background:var(--surface)}',
      '.oh-drf .oh-b{width:100%}.oh-drf .w{grid-column:1/-1}.oh-b.dis{background:var(--red-bg);color:var(--red);border-color:transparent}',
      '.oh-advbox{margin-top:14px}',
      '@media(max-width:560px){.oh-vit{grid-template-columns:repeat(2,1fr)}.oh-tri b{font-size:16px}}'
    ].join('\n');
    document.head.appendChild(s);
  }
  function grpName(t) {
    var k = String(t || '').toLowerCase();
    if (k.indexOf('bed') >= 0 || k.indexOf('room') >= 0) return [T('cgBed'), 'bed'];
    if (k.indexOf('doctor') >= 0 || k.indexOf('visit') >= 0 || k.indexOf('consult') >= 0) return [T('cgDoc'), 'doc'];
    if (k.indexOf('medic') >= 0 || k.indexOf('pharm') >= 0 || k.indexOf('drug') >= 0) return [T('cgMed'), 'med'];
    if (k.indexOf('lab') >= 0 || k.indexOf('test') >= 0 || k.indexOf('invest') >= 0 || k.indexOf('x-ray') >= 0 || k.indexOf('usg') >= 0) return [T('cgLab'), 'lab'];
    if (k.indexOf('ot') === 0 || k.indexOf('surg') >= 0 || k.indexOf('operation') >= 0) return [T('cgOt'), 'ot'];
    if (k.indexOf('nurs') >= 0) return [T('cgNur'), 'nur'];
    return [t || T('other'), 'oth'];
  }
  var GIC = { bed: IC.bed, doc: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>', med: '<path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><path d="M8.5 8.5l7 7"/>', lab: '<path d="M9 2v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V2M8 2h8"/>', ot: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>', nur: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', oth: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>' };
  function nil(v) { return (v === null || v === undefined || String(v).trim() === '') ? '<b class="oh-nil">NIL</b>' : '<b>' + esc(v) + '</b>'; }
  function dShort(d) { if (!d) return ''; var l = lang(); return new Date(d).toLocaleDateString(l === 'bn' ? 'bn-IN' : l === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }); }
  function spark(vals) {
    var v = vals.filter(function (x) { return isFinite(x); }); if (v.length < 2) return '';
    var mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), rg = mx - mn || 1;
    var pts = v.map(function (x, i) { return (i * 100 / (v.length - 1)).toFixed(1) + ',' + (18 - (x - mn) / rg * 14).toFixed(1); }).join(' ');
    return '<svg viewBox="0 0 100 20" preserveAspectRatio="none"><polyline points="' + pts + '" fill="none" stroke="#1BB880" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function closeDrawer() {
    var o = document.getElementById('oh-drov'), d = document.getElementById('oh-dr');
    if (d) d.classList.remove('on'); if (o) o.classList.remove('on');
    setTimeout(function () { if (o) o.remove(); if (d) d.remove(); }, 250); DR.id = null; document.body.classList.remove('oh-dropen');
  }
  async function openDrawer(admId, bedNo) {
    drCss(); css(); bmCss();
    DR.id = admId; DR.bed = bedNo || DR.bed;
    var o = document.getElementById('oh-drov'), d = document.getElementById('oh-dr');
    if (!d) {
      o = document.createElement('div'); o.id = 'oh-drov'; o.className = 'oh-drov'; o.onclick = closeDrawer; document.body.appendChild(o);
      d = document.createElement('aside'); d.id = 'oh-dr'; d.className = 'oh-dr'; d.setAttribute('role', 'dialog'); document.body.appendChild(d);
      d.innerHTML = '<div class="oh-drb" style="display:grid;place-items:center;color:var(--text-tertiary)">…</div>';
      d.addEventListener('click', drClick);
      requestAnimationFrame(function () { o.classList.add('on'); d.classList.add('on'); });
    }
    var cid = cidNow();
    var r = await Promise.all([
      _supa.from('admissions').select('*').eq('id', admId).maybeSingle(),
      _supa.from('admission_charges').select('*').eq('admission_id', admId).order('created_at'),
      _supa.from('nh_payments').select('*').eq('admission_id', admId).order('created_at'),
      _supa.from('progress_notes').select('*').eq('admission_id', admId).order('created_at', { ascending: false }).limit(6)
    ]);
    if (DR.id !== admId) return;
    var a = r[0].data; if (Array.isArray(a)) a = a.filter(function (x) { return String(x.id) === String(admId); })[0] || a[0]; a = a || {};
    var p = {};
    if (a.patient_id) { var pr = await _supa.from('nh_patients').select('*').eq('id', a.patient_id).maybeSingle(); p = pr.data || {}; if (Array.isArray(p)) p = p.filter(function (x) { return String(x.id) === String(a.patient_id); })[0] || {}; }
    var ch = (r[1].data || []).filter(function (x) { return String(x.admission_id) === String(admId); }), pays = (r[2].data || []).filter(function (x) { return String(x.admission_id) === String(admId); }), notes = (r[3].data || []).filter(function (x) { return !x.admission_id || String(x.admission_id) === String(admId); });
    DR.a = a; DR.p = p; document.body.classList.add('oh-dropen');
    var tot = ch.reduce(function (s, x) { return s + (+x.total_price || 0); }, 0), paid = pays.reduce(function (s, x) { return s + (+x.amount || 0); }, 0), due = tot - paid; DR.due = due;
    var st = due <= 0 ? ['full', T('stFull')] : paid <= 0 ? ['none', T('stNone')] : due >= BIG_DUE ? ['urg', T('stUrg')] : ['part', T('stPart')];
    var name = a.patient_name || p.full_name || '';
    var sex = String(p.gender || '').toLowerCase(), sexT = sex.indexOf('f') === 0 ? T('female') : sex.indexOf('m') === 0 ? T('male') : (p.gender || '');
    var sub = [p.age ? p.age + ' ' + T('yrs') : '', sexT, (DR.bed ? (lang() === 'en' ? 'Bed ' : lang() === 'hi' ? 'बेड ' : 'বেড ') + '<span class="nob">' + esc(DR.bed) + '</span>' : '')].filter(Boolean).join(' · ');
    var days = a.admission_date ? daysSince(a.admission_date) : null;
    var ph = function (v) { return v ? '<a class="nob" href="tel:' + esc(String(v).replace(/[^\d+]/g, '')) + '">' + ic2('phone', 16) + esc(v) + '</a>' : '<b class="oh-nil">NIL</b>'; };
    var fam = p.guardian_phone || p.family_phone || p.attendant_phone || '';
    var famLbl = T('famPh') + (p.guardian ? ' (' + esc(p.guardian) + ')' : '');
    var v0 = notes[0] || {}, vs = notes.slice().reverse();
    var vit = function (lab, key, unit) { var val = v0[key]; return '<div><span>' + lab + '</span>' + (val ? '<b class="nob">' + esc(val) + (unit || '') + '</b>' : '<b class="oh-nil">NIL</b>') + spark(vs.map(function (n) { return parseFloat(String(n[key] || '').split('/')[0]); })) + '</div>'; };
    var G = {}, GO = [];
    ch.forEach(function (x) { var g = grpName(x.charge_type); if (!G[g[1]]) { G[g[1]] = { n: g[0], items: [], sum: 0 }; GO.push(g[1]); } G[g[1]].items.push(x); G[g[1]].sum += (+x.total_price || 0); });
    var grows = GO.map(function (k) {
      var g = G[k], it = g.items, qty = it.reduce(function (s, x) { return s + (+x.quantity || 1); }, 0), up = it[0] && it[0].unit_price, same = it.every(function (x) { return +x.unit_price === +up; });
      var line = (k === 'bed' || k === 'doc') && same && up ? T('daysN', { n: qty }) + ' × ' + rs(up) + ' · ' + dShort(it[0].created_at) : (it.length > 1 ? T('itemsN', { n: it.length }) + ' · ' : '') + dShort(it[0].created_at);
      return '<div class="oh-cgr" data-g="' + k + '"><button type="button" class="oh-cgh" data-cg="' + k + '"><span class="oh-cgi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + GIC[k] + '</svg></span><span><b>' + esc(g.n) + '</b><span>' + line + '</span></span><em>' + rs(g.sum) + '</em><svg class="cv" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>'
        + '<div class="oh-cgl">' + it.map(function (x) { return '<div><span>' + esc(x.description || x.charge_type || '') + ' · ' + dShort(x.created_at) + ((+x.quantity || 1) > 1 ? ' · ' + x.quantity + ' × ' + rs(x.unit_price) : '') + '</span><b>' + rs(x.total_price) + '</b></div>'; }).join('') + '</div></div>';
    }).join('');
    var byM = {}; pays.forEach(function (x) { var m = methodName(x.method); byM[m] = (byM[m] || 0) + (+x.amount || 0); });
    var pmSum = Object.keys(byM).map(function (k) { return esc(k) + ' ' + rs(byM[k]); }).join(' · ');
    var h = '<div class="oh-drh">' + av(name) + '<div style="min-width:0"><b>' + esc(name) + '</b><span>' + (sub || '<span class="oh-nil">NIL</span>') + '</span></div><button type="button" class="oh-x" data-dr="x" aria-label="close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>'
      + '<div class="oh-drb"><div class="oh-drs"><h4>' + T('blTotal') + '</h4><span class="oh-chip ' + st[0] + '">' + st[1] + '</span></div>'
      + '<div class="oh-tri"><div><span>' + T('blTotal') + '</span><b>' + rs(tot) + '</b></div><div><span>' + T('colPaid') + '</span><b>' + rs(paid) + '</b></div><div class="' + (due > 0 ? 'due' : '') + '"><span>' + T('colDue') + '</span><b>' + rs(Math.max(0, due)) + '</b></div></div>'
      + '<div class="oh-kv2"><div><span>' + T('ptPh') + '</span>' + ph(p.phone) + '</div><div><span>' + famLbl + '</span>' + ph(fam) + '</div>'
      + '<div><span>' + T('admBy') + '</span>' + nil(a.admitting_doctor) + '</div><div><span>' + T('admWhy') + '</span>' + nil(a.admission_diagnosis || a.reason || a.chief_complaint) + '</div>'
      + '<div><span>' + T('admOn') + '</span>' + (a.admission_date ? '<b>' + dLong(String(a.admission_date).slice(0, 10)) + '</b>' : '<b class="oh-nil">NIL</b>') + '</div><div><span>' + T('howLong') + '</span>' + (days ? '<b>' + T('daysN', { n: days }) + '</b>' : '<b class="oh-nil">NIL</b>') + '</div></div>'
      + '<div class="oh-drs"><h4>' + T('vitals') + '</h4><span>' + (v0.created_at ? T('lastAt') + ' ' + dShort(v0.created_at) : '') + '</span></div>'
      + '<div class="oh-vit">' + vit(T('vBp'), 'bp') + vit(T('vPulse'), 'pulse') + vit(T('vTemp'), 'temperature', '°') + vit(T('vSpo2'), 'spo2', '%') + '</div>'
      + '<div class="oh-drs"><h4>' + T('chgList') + '</h4><span>' + GO.length + '</span></div>'
      + (grows ? '<div class="oh-cg">' + grows + '<div class="oh-tot2"><span>' + T('blTotal') + '</span><span>' + rs(tot) + '</span></div></div>' : '<div class="oh-cg"><div style="padding:14px;color:var(--text-tertiary)">NIL</div></div>')
      + '<div class="oh-drs"><h4>' + T('paidSoFar') + '</h4><span>' + (pmSum || '') + '</span></div>'
      + '<div class="oh-pyl">' + (pays.length ? pays.slice().reverse().map(function (x) { return '<div><div style="border:0;padding:0;display:block"><b>' + esc(methodName(x.method)) + '</b><span>' + dShort(x.created_at) + '</span></div><b>' + rs(x.amount) + '</b></div>'; }).join('') : '<div><b class="oh-nil">NIL</b></div>') + '</div>'
      + '<div class="oh-advbox" id="oh-dr-adv"></div></div>'
      + '<div class="oh-drf">'
      + (PAGE === 'reception'
        ? '<button type="button" class="oh-b s" data-dr="chg">+ ' + T('addChg') + '</button><button type="button" class="oh-b p" data-dr="pay">' + ic('rupee', 18) + T('takePay') + '</button><button type="button" class="oh-b dis w" data-dr="dis">' + ic('out', 18) + T('wdGo') + '</button>'
        : '<button type="button" class="oh-b s" data-dr="chg">+ ' + T('addChg') + '</button><button type="button" class="oh-b p" data-dr="opay">' + ic('rupee', 18) + T('takePay') + '</button><button type="button" class="oh-b dis w" data-dr="dis">' + ic('out', 18) + T('wdGo') + '</button>')
      + '</div>';
    d.innerHTML = h; bnDigits(d);
    var ab = document.getElementById('oh-dr-adv');
    if (ab && 'discharge_advised_at' in a) {
      var draw = function (on) { ab.innerHTML = on ? '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="oh-chip full">' + T('advOn') + '</span><button type="button" class="oh-lnk" data-adv="0">' + T('advUndo') + '</button></div>' : '<button type="button" class="oh-b s" style="width:100%" data-adv="1">' + ic('ok', 16) + T('advOff') + '</button>'; };
      draw(!!a.discharge_advised_at);
      ab.onclick = async function (e) { var b = e.target.closest('[data-adv]'); if (!b) return; var on = b.getAttribute('data-adv') === '1'; if (await adviseToggle(admId, on, a.admitting_doctor)) { a.discharge_advised_at = on ? new Date().toISOString() : null; draw(on); if (BM.data) bedMap(); } };
    }
  }
  function drClick(e) {
    var g = e.target.closest('[data-cg]'); if (g) { g.parentNode.classList.toggle('open'); return; }
    var b = e.target.closest('[data-dr]'); if (!b) return;
    var k = b.getAttribute('data-dr'), a = DR.a || {}, name = a.patient_name || (DR.p && DR.p.full_name) || '';
    if (k === 'x') { closeDrawer(); return; }
    try {
      if (k === 'pay' && typeof openTransactionPayment === 'function') openTransactionPayment(a.id, name);
      else if (k === 'chg' && PAGE === 'reception') { _bpAdmId = a.id; _bpPatientId = a.patient_id; openExpenseModal(); }
      else if (k === 'chg') { chargeModal(a); }
      else if (k === 'opay') { payModal(a, name, DR.due || 0); }
      else if (k === 'dis' && PAGE === 'reception' && typeof openDischargeConfirm === 'function') { closeDrawer(); openDischargeConfirm(a.id, a.bed_id, name); }
      else if (k === 'dis' && typeof openDischargeModal === 'function') { closeDrawer(); openDischargeModal(a.id); }
      else if (k === 'full' && typeof openPatientFromBed === 'function') { closeDrawer(); openPatientFromBed(a.patient_id, name, DR.bed || '', ''); }
    } catch (err) { console.warn('nh-home drawer', err); }
  }
  function refreshDrawer() { if (DR.id && document.getElementById('oh-dr')) openDrawer(DR.id); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && DR.id) closeDrawer(); });

  /* ---------------- staff Team list: initials, role, phone ---------------- */
  var ROLE = { owner: ['Owner', 'মালিক', 'मालिक'], receptionist: ['Receptionist', 'রিসেপশনিস্ট', 'रिसेप्शनिस्ट'], doctor: ['Doctor', 'ডাক্তার', 'डॉक्टर'], nurse: ['Nurse', 'নার্স', 'नर्स'], pharmacist: ['Pharmacist', 'ফার্মাসিস্ট', 'फार्मासिस्ट'], lab: ['Lab staff', 'ল্যাব', 'लैब'], accountant: ['Accountant', 'হিসাবরক্ষক', 'लेखाकार'] };
  function roleName(r) { var x = ROLE[String(r || '').toLowerCase()]; if (!x) return r || ''; var l = lang(); return x[l === 'bn' ? 1 : l === 'hi' ? 2 : 0]; }
  async function teamList() {
    var el = document.getElementById('staff-list'), cid = cidNow(); if (!el || !cid || PAGE !== 'owner') return;
    var r = await _supa.from('nh_staff').select('*').eq('clinic_id', cid).order('created_at');
    if (r.error || !r.data || !r.data.length) return;
    var hr = await _supa.from('hr_staff').select('user_id,name,phone,designation').eq('clinic_id', cid);
    var byU = {}; ((hr && hr.data) || []).forEach(function (h) { if (h.user_id) byU[h.user_id] = h; });
    var invP = await invitePhones(cid).catch(function () { return {}; });
    if (!document.getElementById('oh-team-css')) { var c = document.createElement('style'); c.id = 'oh-team-css'; c.textContent = '#staff-list.oh-team{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;padding:16px}.oh-tm{display:flex;gap:14px;align-items:center;border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface)}.oh-tm .oh-av{width:44px;height:44px;font-size:15px;font-weight:700}.oh-tm .i{flex:1;min-width:0}.oh-tm b{display:block;font-size:15px;font-weight:700;color:var(--text-primary)}.oh-tm .d{font-size:13px;color:var(--text-tertiary);margin:2px 0 6px}.oh-tm a{color:var(--green);text-decoration:none;font-size:14.5px;display:inline-flex;gap:6px;align-items:center}.oh-tm .act{display:flex;flex-direction:column;gap:6px}.oh-tm .act button{min-height:36px;padding:0 10px;border-radius:8px;border:1px solid var(--border-strong);background:var(--surface);font:inherit;font-size:13px;cursor:pointer;color:var(--text-secondary)}.oh-tm .act button.r{color:var(--red)}body.oh-skin #v-staff .panel .pt{font-size:16px!important;font-weight:700!important;letter-spacing:0!important;text-transform:none!important}'; document.head.appendChild(c); }
    el.classList.add('oh-team');
    el.innerHTML = r.data.map(function (s) {
      var h = byU[s.id] || {}, phn = s.phone || h.phone || invP[s.id] || '';
      return '<div class="oh-tm">' + av(s.full_name) + '<div class="i"><b>' + esc(s.full_name || '—') + '</b><div class="d">' + esc(roleName(s.role)) + (h.designation ? ' · ' + esc(h.designation) : '') + (s.is_active === false ? ' · ' + T('inactive') : '') + '</div>' + (phn ? '<a class="nob" href="tel:' + esc(phn) + '">' + ic2('phone', 15) + esc(phn) + '</a>' : '<span class="oh-nil" style="font-size:13px">NIL</span>') + '</div>'
        + (s.role !== 'owner' ? '<div class="act"><button type="button" data-tg="' + esc(s.id) + '" data-on="' + (s.is_active === false) + '">' + (s.is_active === false ? T('activate') : T('deactivate')) + '</button><button type="button" class="r" data-rv="' + esc(s.id) + '" data-n="' + esc(s.full_name || '') + '">' + T('revoke') + '</button></div>' : '') + '</div>';
    }).join('');
    if (!el._oh) { el._oh = 1; el.addEventListener('click', function (e) { var t = e.target.closest('[data-tg]'); if (t && typeof toggleStaffActive === 'function') toggleStaffActive(t.getAttribute('data-tg'), t.getAttribute('data-on') === 'true'); var v = e.target.closest('[data-rv]'); if (v && typeof removeStaff === 'function') removeStaff(v.getAttribute('data-rv'), v.getAttribute('data-n')); }); }
    var pts = document.querySelectorAll('#v-staff .panel .pt'); if (pts[0]) pts[0].textContent = T('teamT'); if (pts[1]) pts[1].textContent = T('invT');
    bnDigits(el);
  }

  /* ---------------- v6: payments (owner), charge with bill photo (owner), drag & drop, lists ---------------- */
  function modCss() {
    if (document.getElementById('oh-mod-css')) return;
    var s = document.createElement('style'); s.id = 'oh-mod-css';
    s.textContent = '.oh-mod{position:fixed;inset:0;background:rgba(10,20,15,.45);z-index:260;display:grid;place-items:center;padding:16px}.oh-mbox{background:var(--surface);border-radius:16px;width:min(480px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);color:var(--text-primary)}'
      + '.oh-mbox h3{margin:0 0 10px;font-size:19px;font-weight:700}.oh-mbox label{display:block;font-size:13.5px;color:var(--text-secondary);margin:12px 0 5px}'
      + '.oh-mbox input:not([type=file]),.oh-mbox select{width:100%;min-height:46px;border:1px solid var(--border-strong);border-radius:10px;padding:0 12px;font:inherit;font-size:15px;background:var(--surface);color:var(--text-primary);box-sizing:border-box}'
      + '.oh-mbtn{display:flex;gap:10px;justify-content:flex-end;margin-top:18px;flex-wrap:wrap}';
    document.head.appendChild(s);
  }
  function payModal(a, name, due) {
    modCss(); css();
    var old = document.getElementById('oh-pmod'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'oh-mod'; m.id = 'oh-pmod';
    var M = [['Cash', T('cash')], ['UPI', T('upi')], ['Card', T('card')], ['Bank transfer', T('bank')]], sel = null;
    m.innerHTML = '<div class="oh-mbox"><h3>' + T('takePay') + '</h3><div style="display:flex;justify-content:space-between;color:var(--text-secondary);font-size:14px"><span>' + esc(name) + '</span><span>' + T('colDue') + ': <b style="color:var(--red)">' + rs(Math.max(0, due)) + '</b></span></div>'
      + '<label>' + T('pmHow') + '</label><div class="oh-pmm" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' + M.map(function (x) { return '<button type="button" class="oh-b s" data-pm="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>'
      + '<label>' + T('pmAmt') + '</label><div style="display:flex;gap:8px"><input id="oh-pa" type="number" min="1" step="1" inputmode="decimal"><button type="button" class="oh-b s" data-pf="1" style="white-space:nowrap">' + T('pmFull') + ' ' + rs(Math.max(0, due)) + '</button></div>'
      + '<label>' + T('pmRef') + '</label><input id="oh-pr">'
      + '<div id="oh-perr" style="color:var(--red);font-size:13.5px;margin-top:8px;display:none"></div>'
      + '<div class="oh-mbtn"><button type="button" class="oh-b s" data-px="1">' + T('lcCancel') + '</button><button type="button" class="oh-b p" data-pok="1">' + T('takePay') + '</button></div></div>';
    document.body.appendChild(m); bnDigits(m);
    var err = function (t) { var e = document.getElementById('oh-perr'); e.textContent = t; e.style.display = 'block'; };
    m.addEventListener('click', async function (e) {
      if (e.target === m || e.target.closest('[data-px]')) { m.remove(); return; }
      var pm = e.target.closest('[data-pm]'); if (pm) { sel = pm.getAttribute('data-pm'); m.querySelectorAll('[data-pm]').forEach(function (b) { b.className = 'oh-b ' + (b === pm ? 'p' : 's'); }); return; }
      if (e.target.closest('[data-pf]')) { document.getElementById('oh-pa').value = Math.max(0, Math.round(due)); return; }
      var ok = e.target.closest('[data-pok]'); if (!ok) return;
      var amt = Math.round((+document.getElementById('oh-pa').value || 0) * 100) / 100, ref = document.getElementById('oh-pr').value.trim();
      if (!sel) return err(T('pmErrM')); if (!(amt > 0)) return err(T('pmErrA'));
      ok.disabled = true; ok.textContent = '…';
      var row = { clinic_id: cidNow(), admission_id: a.id, amount: amt, method: sel, payment_date: dayKey(new Date()), recorded_by: (typeof _myUid !== 'undefined' ? _myUid : null) };
      if (ref && sel !== 'Cash') row.txn_id = ref;
      var ins = await _supa.from('nh_payments').insert(row).select('*').single();
      if (ins.error && row.txn_id) { delete row.txn_id; ins = await _supa.from('nh_payments').insert(row).select('*').single(); }
      if (ins.error) { ok.disabled = false; ok.textContent = T('takePay'); return err(ins.error.message); }
      var payId = ins.data && ins.data.id, left = Math.round((due - amt) * 100) / 100;
      try { await _supa.from('nh_audit_log').insert({ clinic_id: cidNow(), actor_id: (typeof _myUid !== 'undefined' ? _myUid : null), action: 'payment_recorded', target_table: 'nh_payments', target_id: a.id, details: { amount: amt, method: sel, patient_name: name, status: left <= 0 ? 'Paid' : 'Partly paid', due: Math.max(left, 0), reference: ref || null, recorded_by_name: 'Owner' } }); } catch (x) {}
      m.querySelector('.oh-mbox').innerHTML = '<h3>' + T('pmDone') + ' ✓</h3><p style="font-size:15px">' + rs(amt) + ' · ' + esc(methodName(sel)) + '</p><p id="oh-pst" style="color:var(--text-secondary);font-size:14px">' + T('pmBill') + '</p><div class="oh-mbtn"><button type="button" class="oh-b p" data-px="1">OK</button></div>';
      bnDigits(m);
      var st = function (t) { var x = document.getElementById('oh-pst'); if (x) x.textContent = t; };
      try { if (payId && typeof auraMakeReceipt === 'function') await auraMakeReceipt(payId); } catch (x) {}
      try { var n = await _supa.functions.invoke('notify-payment', { body: { admission_id: a.id, payment_id: payId || null, lang: lang() } }); if (n && n.data && n.data.sent) st(T('pmWa')); } catch (x) {}
      try { if (typeof auraGenerateBill === 'function') { var g = await auraGenerateBill(a.id); if (g && g.ok) st(T('pmBillOk')); } } catch (x) {}
      refreshDrawer(); if (document.getElementById('oh-bill')) billing(); if (BM.data) bedMap();
    });
  }
  function chargeModal(a) {
    modCss(); css();
    var old = document.getElementById('oh-cmod'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'oh-mod'; m.id = 'oh-cmod'; var file = null;
    var TY = [['Medicine', T('cgMed')], ['Lab Test', T('cgLab')], ['Doctor Visit', T('cgDoc')], ['Bed Charge', T('cgBed')], ['OT', T('cgOt')], ['Nursing', T('cgNur')], ['Other', T('other')]];
    m.innerHTML = '<div class="oh-mbox"><h3>' + T('addChg') + '</h3><div style="color:var(--text-secondary);font-size:14px">' + esc(a.patient_name || '') + '</div>'
      + '<label>' + T('chType') + '</label><select id="oh-ct" style="width:100%;min-height:46px;border:1px solid var(--border-strong);border-radius:10px;padding:0 10px;font:inherit;background:var(--surface);color:var(--text-primary)">' + TY.map(function (x) { return '<option value="' + x[0] + '">' + x[1] + '</option>'; }).join('') + '</select>'
      + '<label>' + T('chDesc') + '</label><input id="oh-cd">'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div><label>' + T('chQty') + '</label><input id="oh-cq" type="number" min="1" value="1"></div><div><label>' + T('chPrice') + '</label><input id="oh-cp" type="number" min="0"></div></div>'
      + '<label>' + T('chPhoto') + '</label><label class="oh-drop" id="oh-cdrop" style="display:flex;align-items:center;justify-content:center;gap:10px;min-height:86px;border:2px dashed var(--border-strong);border-radius:12px;color:var(--text-secondary);cursor:pointer;text-align:center;padding:10px;margin:0"><input id="oh-cf" type="file" accept="image/*,application/pdf" capture="environment" style="display:none"><span id="oh-cfn">📷 ' + T('chDrop') + '</span></label>'
      + '<div id="oh-cerr" style="color:var(--red);font-size:13.5px;margin-top:8px;display:none"></div>'
      + '<div class="oh-mbtn"><button type="button" class="oh-b s" data-cx="1">' + T('lcCancel') + '</button><button type="button" class="oh-b p" data-cok="1">' + T('lcSave') + '</button></div></div>';
    document.body.appendChild(m);
    var setFile = function (f) { file = f || null; document.getElementById('oh-cfn').textContent = file ? '✓ ' + file.name : '📷 ' + T('chDrop'); };
    document.getElementById('oh-cf').addEventListener('change', function (e) { setFile(e.target.files[0]); });
    m.addEventListener('click', async function (e) {
      if (e.target === m || e.target.closest('[data-cx]')) { m.remove(); return; }
      var ok = e.target.closest('[data-cok]'); if (!ok) return;
      var desc = document.getElementById('oh-cd').value.trim(), qty = +document.getElementById('oh-cq').value || 1, price = +document.getElementById('oh-cp').value || 0, type = document.getElementById('oh-ct').value;
      var er = document.getElementById('oh-cerr');
      if (!desc || !(price > 0)) { er.textContent = T('chErr'); er.style.display = 'block'; return; }
      ok.disabled = true; ok.textContent = '…';
      if (file && a.patient_id) {
        var path = cidNow() + '/' + a.patient_id + '/bill_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        var up = await _supa.storage.from('nh-documents').upload(path, file, { upsert: true });
        if (!up.error) { try { await _supa.from('nh_patient_documents').insert({ clinic_id: cidNow(), patient_id: a.patient_id, file_path: path, file_name: file.name, doc_type: file.type, uploaded_by: (typeof _myUid !== 'undefined' ? _myUid : null), document_type: 'Bill / Receipt' }); } catch (x) {} }
      }
      var r = await _supa.from('admission_charges').insert({ clinic_id: cidNow(), admission_id: a.id, charge_type: type, description: desc, quantity: qty, unit_price: price, total_price: qty * price, added_by: (typeof _myUid !== 'undefined' ? _myUid : null) });
      if (r.error) { ok.disabled = false; ok.textContent = T('lcSave'); er.textContent = r.error.message; er.style.display = 'block'; return; }
      m.remove(); if (typeof showToast === 'function') showToast(T('chDone')); refreshDrawer(); if (BM.data) bedMap();
    });
  }
  /* drag a photo / PDF onto any upload box (ID card, bill, document) */
  function dragDrop() {
    if (window._ohDrop) return; window._ohDrop = 1;
    var box = function (t) {
      var el = t && t.closest ? t.closest('label,.oh-drop,[class*=upload],[class*=drop],[class*=scan],[class*=photo],.mod,.mod-ov,.modal,.oh-mbox,.panel') : null;
      while (el) { var inp = el.querySelector('input[type=file]'); if (inp) return { el: el, inp: inp }; el = el.parentElement && el.parentElement.closest('label,.mod,.mod-ov,.modal,.oh-mbox,.panel'); }
      return null;
    };
    document.addEventListener('dragover', function (e) { var b = box(e.target); if (!b) return; e.preventDefault(); b.el.classList.add('oh-dragon'); }, true);
    document.addEventListener('dragleave', function (e) { var b = box(e.target); if (b) b.el.classList.remove('oh-dragon'); }, true);
    document.addEventListener('drop', function (e) {
      var b = box(e.target); if (!b || !e.dataTransfer || !e.dataTransfer.files.length) return;
      e.preventDefault(); b.el.classList.remove('oh-dragon');
      try { var dt = new DataTransfer(); for (var i = 0; i < (b.inp.multiple ? e.dataTransfer.files.length : 1); i++) dt.items.add(e.dataTransfer.files[i]); b.inp.files = dt.files; } catch (x) {}
      b.inp.dispatchEvent(new Event('change', { bubbles: true }));
    }, true);
    var s = document.createElement('style'); s.textContent = '.oh-dragon{outline:3px dashed #1BB880!important;outline-offset:-3px;background:rgba(27,184,128,.06)!important}'; document.head.appendChild(s);
  }
  /* staff phone numbers come from the invite each person joined with */
  async function invitePhones(cid) {
    var r = await _supa.from('nh_invites').select('used_by,phone').eq('clinic_id', cid);
    var m = {}; ((r && r.data) || []).forEach(function (x) { if (x.used_by && x.phone) m[x.used_by] = x.phone; }); return m;
  }
  /* patients + notifications: same look as the rest */
  function listCss() {
    if (document.getElementById('oh-list-css')) return;
    var s = document.createElement('style'); s.id = 'oh-list-css';
    s.textContent = [
      'body.oh-skin #patients-list,body.oh-skin #owner-alerts-list{display:flex;flex-direction:column;gap:10px;padding:4px 0}',
      'body.oh-skin #patients-list .adm-row,body.oh-skin #owner-alerts-list>div{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--border)!important;border-radius:14px;padding:14px 16px!important;margin:0!important;transition:box-shadow .15s,transform .15s}',
      'body.oh-skin #patients-list .adm-row:hover{box-shadow:var(--sh-md);transform:translateY(-1px)}',
      'body.oh-skin #patients-list .adm-av{width:44px!important;height:44px!important;border-radius:12px!important;font-size:15px!important;font-weight:700!important;background:#EAF7F1!important;color:#0A6B4B!important;border:0!important;display:grid!important;place-items:center}',
      'body.oh-skin #patients-list .adm-name{font-size:15.5px!important;font-weight:700!important;color:var(--text-primary)}',
      'body.oh-skin #patients-list .adm-meta{font-size:13.5px!important;color:var(--text-tertiary)!important;margin-top:3px}',
      'body.oh-skin #v-patients .panel{background:none;border:0;box-shadow:none}',
      'body.oh-skin #v-patients .ph{background:none!important;border:0!important;padding:0 0 12px!important}',
      'body.oh-skin #patient-search{min-height:48px!important;border-radius:12px!important;font-size:15px!important;max-width:460px!important}',
      'body.oh-skin #v-patients .qbtn{min-height:44px;border-radius:12px!important;font-size:14px!important;font-weight:600}',
      'body.oh-skin #owner-alerts-list>div{border-left:4px solid var(--border-strong)!important}',
      'body.oh-skin #v-notifications .panel{background:none;border:0;box-shadow:none}',
      /* sidebar: business buttons green with white text, theme button and footer clean */
      'body.oh-skin #sb-biz button,body.oh-skin #sb-biz a,body.oh-skin .sb-facility button,body.oh-skin .sb-facility a{background:#0A5039!important;color:#fff!important;border:1px solid rgba(255,255,255,.18)!important}',
      'body.oh-skin #sidebar .theme-toggle,body.oh-skin #sidebar .sb-controls button{background:rgba(255,255,255,.1)!important;color:#fff!important;border:1px solid rgba(255,255,255,.18)!important}',
      'body.oh-skin #sidebar .sb-foot{background:transparent!important}',
      'body.oh-skin #sidebar .sb-out{color:#fff!important}',
      'body.oh-dropen .mod-ov,body.oh-dropen .oh-mod{z-index:260!important}body.oh-dropen .toast,body.oh-dropen #toast{z-index:300!important}'
    ].join('\n');
    document.head.appendChild(s);
  }
  function patientInitials() { document.querySelectorAll('#patients-list .adm-row').forEach(function (r) { var n = r.querySelector('.adm-name'), a = r.querySelector('.adm-av'); if (n && a && !a._oh) { a._oh = 1; a.textContent = ini(n.textContent); } }); }
  function notifHead() {
    if (PAGE !== 'owner') return;
    pageHead('v-notifications', 'noti', T('notiT'), T('notiS'), '');
  }

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
      else if (a.k === 'lic') { if (PAGE === 'owner') nav('licences', document.getElementById('oh-nb-lic')); }
      else if (a.k === 'wd') { nav('beds', navBtn('beds')); }
      else if (a.k === 'set') { var bs = document.getElementById('aura-billsetup'); if (bs) bs.classList.add('oh-show'); if (bs) bs.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
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
    try {
      var lic = await licLoad(cid);
      lic.forEach(function (x) { var d = daysTo(x.expires_on); if (d <= 30) alerts.push({ k: 'lic', t: d <= 15 ? 'red' : 'amb', name: x.name, n: d, d: x.expires_on, s: 2.5e9 - d }); });
      var adv = await advised(cid);
      adv.forEach(function (a) { var dd = due[a.id] || 0; alerts.push({ k: 'wd', t: 'amb', name: a.patient_name || '?', pid: a.patient_id, aid: a.id, bed: bedNo[a.bed_id] || '-', amt: dd, by: a.discharge_advised_by, s: 2.8e9 + dd }); });
    } catch (e) {}
    var bsc = document.getElementById('aura-billsetup');
    if (bsc && bsc.style.display !== 'none' && bsc.innerHTML.trim()) alerts.push({ k: 'set', t: 'amb', s: 1.5e9 });
    alerts.sort(function (x, y) { return y.s - x.s; });

    var allDue = 0, owing = 0;
    Object.keys(due).forEach(function (k) { if (k && k !== 'null' && due[k] > 0.5) { allDue += due[k]; owing++; } });
    var duesText = rs(allDue);
    dueCount = owing;
    try { await homeExtras(); } catch (e) { console.warn('nh-home extras', e); }
    last = { counts: counts, inToday: r[3].count || 0, outToday: r[4].count || 0, method: method, week: week, alerts: alerts, dueCount: dueCount, duesText: duesText };
    render();
    document.body.classList.add('oh-live');
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
    if (typeof window.loadBeds === 'function' && !window.loadBeds._oh) {
      var lb = window.loadBeds;
      window.loadBeds = function () { var h = document.getElementById('beds-by-ward'); if (h) h.classList.remove('oh-ready'); var res = lb.apply(this, arguments); var go = function () { bedMap().catch(function () { document.body.classList.add('oh-bmfail'); if (h) h.classList.add('oh-ready'); }); }; if (res && typeof res.then === 'function') res.then(go, go); else go(); return res; };
      window.loadBeds._oh = true;
    }
    wrap('loadPatientsList', patientInitials);
    wrap('loadPatients', patientInitials);
    wrap('loadBillingPage', function () { return billing(); });
    wrap('saveExpense', function () { refreshDrawer(); if (BM.data) bedMap(); });
    wrap('saveCharge', function () { refreshDrawer(); if (BM.data) bedMap(); });
    wrap('loadStaffList', function () { return teamList(); });
    wrap('tpRefreshScreens', function () { refreshDrawer(); if (document.getElementById('oh-bill')) billing(); if (BM.data) bedMap(); load(); });
    wrap('setLanguage', relang);
    wrap('setFamLanguage', relang);
  }
  try { early(); licNav(); greenCss(); bedModalHooks(); prefixHook(); listCss(); dragDrop(); } catch (e) {}
  hook();
  if (typeof window.nav === 'function' && !window.nav._oh) { var nv = window.nav; window.nav = function () { var x = nv.apply(this, arguments); try { if (document.getElementById('oh-bn')) bottomNav(); if (arguments[0] === 'bills' && PAGE === 'owner') billing(); if (arguments[0] === 'staff') staffBoard(); if (arguments[0] === 'licences') licences(); if (arguments[0] === 'notifications') notifHead(); } catch (e) {} return x; }; window.nav._oh = true; }
  window.ohLoad = function () { return load().catch(function (e) { console.warn('nh-home', e); }); };
  /* the first dashboard load may already have happened before this file arrived */
  setTimeout(function () { var v = document.getElementById('v-dashboard') || document.getElementById('v-home'); if (v && v.classList.contains('on')) window.ohLoad(); var vb = document.getElementById('v-beds'); if (vb && vb.classList.contains('on')) bedMap().catch(function () {}); }, 600);
})();
