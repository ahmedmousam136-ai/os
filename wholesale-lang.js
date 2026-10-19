/* AuraScale Wholesale: Bengali / Hindi screen text + Help & Support guides.
   Uses the same saved language as the rest of AuraScale (localStorage 'aurascale_lang').
   The screen is written in English; every visible English phrase is swapped for the chosen language.
   PDFs (invoices, notes, statements) always stay in English. */
'use strict';

var WL = {
bn: {
 'Home': 'হোম', 'Sales': 'বিক্রি', 'Purchase': 'কেনা', 'Stock': 'স্টক', 'Accounts': 'হিসাব', 'Parties': 'পার্টি', 'Settings': 'সেটিংস', 'Help': 'সাহায্য', 'Help & Support': 'সাহায্য ও সহায়তা', 'Wholesale': 'হোলসেল',
 'New invoice': 'নতুন ইনভয়েস', 'Invoices': 'ইনভয়েস', 'Credit notes': 'ক্রেডিট নোট', 'Customer *': 'কাস্টমার *', 'Customer': 'কাস্টমার', 'Invoice date': 'ইনভয়েসের তারিখ', 'Add item': 'আইটেম যোগ করুন',
 'Product': 'প্রোডাক্ট', 'Batch': 'ব্যাচ', 'Qty': 'পরিমাণ', 'Free': 'ফ্রি', 'Rate': 'রেট', 'Disc %': 'ছাড় %', 'Disc': 'ছাড়', 'Amount': 'টাকা', 'Payment': 'পেমেন্ট',
 'Credit': 'বাকি', 'Cash': 'নগদ', 'Bank': 'ব্যাংক', 'Cheque': 'চেক', 'Paid now (optional)': 'এখন দেওয়া টাকা (ঐচ্ছিক)', 'UTR / cheque no.': 'UTR / চেক নং', 'Note on invoice (optional)': 'ইনভয়েসে নোট (ঐচ্ছিক)',
 'Save & make invoice': 'সেভ করে ইনভয়েস তৈরি করুন', 'Taxable value': 'করযোগ্য মূল্য', 'Round off': 'রাউন্ড অফ', 'Invoice total': 'ইনভয়েস মোট', 'Customer will owe': 'কাস্টমারের বাকি হবে', 'Bill total': 'বিল মোট',
 'No items yet. Search above to add.': 'এখনও কোনো আইটেম নেই। উপরে খুঁজে যোগ করুন।', 'Today': 'আজ', '7 days': '৭ দিন', '30 days': '৩০ দিন', '1 year': '১ বছর', 'Date': 'তারিখ', 'Invoice': 'ইনভয়েস',
 'Open': 'খুলুন', 'On credit': 'বাকিতে', 'Cash / UPI / bank / cheque': 'নগদ / UPI / ব্যাংক / চেক', 'GST collected': 'আদায় করা GST', 'No invoices in this period.': 'এই সময়ে কোনো ইনভয়েস নেই।',
 'Credit note': 'ক্রেডিট নোট', 'Debit note': 'ডেবিট নোট', 'Debit notes': 'ডেবিট নোট', 'Reason': 'কারণ', 'Reason *': 'কারণ *', 'None yet.': 'এখনও কিছু নেই।', 'Goods returned': 'মাল ফেরত এসেছে',
 'Cancel invoice': 'ইনভয়েস বাতিল', 'Cancelled': 'বাতিল', 'Open / print': 'খুলুন / প্রিন্ট', 'Goods returned by the customer (credit note)': 'কাস্টমারের ফেরত দেওয়া মাল (ক্রেডিট নোট)', 'Can return': 'ফেরত হতে পারে',
 'Qty back': 'ফেরত পরিমাণ', 'Free back': 'ফ্রি ফেরত', 'Back into stock?': 'আবার স্টকে যাবে?', 'Yes, saleable': 'হ্যাঁ, বিক্রিযোগ্য', 'No (damaged / expired)': 'না (নষ্ট / মেয়াদোত্তীর্ণ)', 'Save credit note': 'ক্রেডিট নোট সেভ করুন',
 'New purchase': 'নতুন কেনা', 'Purchases': 'কেনার বিল', 'Return to supplier': 'সাপ্লায়ারকে ফেরত', "Scan the supplier's bill": 'সাপ্লায়ারের বিল স্ক্যান করুন', 'Take / choose photo': 'ছবি তুলুন / বাছুন',
 'Take a clear photo of the whole bill. AI reads the supplier, bill number and every line. You check the lines, then save.': 'পুরো বিলের পরিষ্কার ছবি তুলুন। AI সাপ্লায়ার, বিল নম্বর আর প্রতিটি লাইন পড়ে নেয়। আপনি লাইনগুলো মিলিয়ে সেভ করুন।',
 'Supplier *': 'সাপ্লায়ার *', 'Supplier': 'সাপ্লায়ার', "Supplier's bill no. *": 'সাপ্লায়ারের বিল নং *', 'Bill date *': 'বিলের তারিখ *', 'Bill date': 'বিলের তারিখ', 'Item': 'আইটেম', 'Salt / composition': 'সল্ট / উপাদান',
 'Sold per': 'বিক্রির একক', 'Pack (e.g. 1x10)': 'প্যাক (যেমন 1x10)', 'Batch no.': 'ব্যাচ নং', 'Expiry (month)': 'মেয়াদ (মাস)', 'Rate (before GST) ₹': 'রেট (GST ছাড়া) ₹', 'Discount %': 'ছাড় %', 'GST %': 'GST %',
 'MRP (per unit) ₹': 'MRP (প্রতি একক) ₹', 'Your selling rate (PTR) ₹': 'আপনার বিক্রির রেট (PTR) ₹', 'Add line': 'লাইন যোগ করুন', 'Batch / Exp': 'ব্যাচ / মেয়াদ', 'Qty + free': 'পরিমাণ + ফ্রি', 'Note (optional)': 'নোট (ঐচ্ছিক)',
 'Save purchase & add to stock': 'কেনা সেভ করে স্টকে যোগ করুন', 'Check that this matches the total on the paper bill.': 'কাগজের বিলের মোটের সঙ্গে মিলছে কিনা দেখে নিন।', 'No lines yet. Add them above, or scan the bill.': 'এখনও কোনো লাইন নেই। উপরে যোগ করুন, বা বিল স্ক্যান করুন।',
 'Supplier / bill no.': 'সাপ্লায়ার / বিল নং', 'Our ref.': 'আমাদের নং', 'Entered by': 'কে এন্ট্রি করেছেন', 'No purchases in this period.': 'এই সময়ে কোনো কেনা নেই।', 'Cancel purchase': 'কেনা বাতিল', 'Bill photo': 'বিলের ছবি',
 'Return goods to supplier': 'সাপ্লায়ারকে মাল ফেরত', 'From purchase bill (optional)': 'কোন কেনার বিল থেকে (ঐচ্ছিক)', 'Any batch in stock': 'স্টকের যেকোনো ব্যাচ', 'Item / batch': 'আইটেম / ব্যাচ', 'In stock': 'স্টকে আছে',
 'Save debit note': 'ডেবিট নোট সেভ করুন', 'Search an item above and pick the batch going back.': 'উপরে আইটেম খুঁজে যে ব্যাচ ফেরত যাবে সেটি বাছুন।',
 'Goods going back to the supplier (expired, damaged, short-dated). Stock goes down and the supplier owes you (debit note).': 'যে মাল সাপ্লায়ারকে ফেরত যাচ্ছে (মেয়াদোত্তীর্ণ, নষ্ট, কম মেয়াদের)। স্টক কমবে আর সাপ্লায়ার আপনার কাছে ঋণী হবে (ডেবিট নোট)।',
 'Check the lines read from the bill': 'বিল থেকে পড়া লাইনগুলো মিলিয়ে নিন', 'AI can misread.': 'AI ভুল পড়তে পারে।', 'Check every line against the paper bill': 'কাগজের বিলের সঙ্গে প্রতিটি লাইন মিলিয়ে নিন',
 'Item (match to your list)': 'আইটেম (আপনার তালিকার সঙ্গে মেলান)', 'Supplier on the bill': 'বিলে সাপ্লায়ার', 'Bill no.': 'বিল নং', 'Put the ticked lines into the purchase': 'টিক দেওয়া লাইনগুলো কেনায় যোগ করুন',
 'Not in your list. Choose or add the supplier on the purchase screen.': 'আপনার তালিকায় নেই। কেনার পাতায় সাপ্লায়ার বাছুন বা যোগ করুন।',
 'Search product or salt…': 'প্রোডাক্ট বা সল্ট খুঁজুন…', 'All': 'সব', 'Low / out': 'কম / শেষ', 'Expiring ≤ 90 days': '৯০ দিনের মধ্যে মেয়াদ শেষ', 'Expired': 'মেয়াদোত্তীর্ণ', 'New item': 'নতুন আইটেম',
 'Nearest expiry': 'সবচেয়ে কাছের মেয়াদ', 'Status': 'অবস্থা', 'Items': 'আইটেম', 'Stock value at cost': 'কেনা দামে স্টকের মূল্য', 'Low / out of stock': 'কম / স্টক শেষ', 'Out of stock': 'স্টক শেষ', 'Low': 'কম',
 'Soon': 'শীঘ্রই', 'Hidden': 'লুকানো', 'Correct': 'ঠিক করুন', 'Last movements': 'শেষ লেনদেন', 'Edit item': 'আইটেম বদলান', 'No stock.': 'স্টক নেই।', 'Cost': 'কেনা দাম', 'Manufacturer': 'প্রস্তুতকারক',
 'Schedule': 'শিডিউল', 'Warn when stock falls to': 'স্টক এত হলে সতর্ক করুন', 'Show in billing': 'বিলিংয়ে দেখান', 'Yes': 'হ্যাঁ', 'No (hidden)': 'না (লুকানো)', 'Name *': 'নাম *', 'Save': 'সেভ করুন',
 'Outstanding': 'বকেয়া', 'Receive / pay': 'টাকা নেওয়া / দেওয়া', 'Payments': 'পেমেন্ট', 'Party ledger': 'পার্টি লেজার', 'To receive (customers owe you)': 'পাওনা (কাস্টমার আপনার কাছে ঋণী)', 'To pay (you owe suppliers)': 'দেনা (আপনি সাপ্লায়ারের কাছে ঋণী)',
 'Party': 'পার্টি', 'Due': 'বাকি', 'Overdue': 'মেয়াদ পেরোনো বাকি', 'Oldest unpaid': 'সবচেয়ে পুরনো বাকি', 'You owe': 'আপনার দেনা', 'Ledger': 'লেজার', 'Receive': 'টাকা নিন', 'Pay': 'টাকা দিন', 'Remind': 'মনে করান',
 'Nobody owes you money.': 'কারও কাছে আপনার পাওনা নেই।', 'You owe nothing.': 'আপনার কোনো দেনা নেই।', 'Money received': 'টাকা পেয়েছি', 'Money paid': 'টাকা দিয়েছি', 'Received from *': 'কার কাছ থেকে *', 'Paid to *': 'কাকে দিয়েছেন *',
 'Amount ₹ *': 'টাকা ₹ *', 'Mode': 'মাধ্যম', 'Bank transfer (NEFT/RTGS/IMPS)': 'ব্যাংক ট্রান্সফার (NEFT/RTGS/IMPS)', 'Reference (optional)': 'রেফারেন্স (ঐচ্ছিক)', 'UTR / cheque / UPI ref. *': 'UTR / চেক / UPI রেফ. *',
 'No.': 'নং', 'Mode / ref.': 'মাধ্যম / রেফ.', 'Received': 'পেয়েছি', 'Paid': 'দিয়েছি', 'Cancel': 'বাতিল', 'No payments in this period.': 'এই সময়ে কোনো পেমেন্ট নেই।', 'From': 'থেকে', 'To': 'পর্যন্ত', 'Show': 'দেখান',
 'Entry': 'বিবরণ', 'Debit': 'ডেবিট', 'Balance': 'ব্যালান্স', 'Opening balance': 'শুরুর ব্যালান্স', 'Closing balance': 'শেষ ব্যালান্স', 'Statement PDF': 'স্টেটমেন্ট PDF', 'Send statement on WhatsApp': 'WhatsApp-এ স্টেটমেন্ট পাঠান',
 'Send receipt on WhatsApp': 'WhatsApp-এ রসিদ পাঠান', 'Net': 'নিট',
 'Search name, phone, GSTIN…': 'নাম, ফোন, GSTIN খুঁজুন…', 'Customers': 'কাস্টমার', 'Suppliers': 'সাপ্লায়ার', 'New party': 'নতুন পার্টি', 'Name': 'নাম', 'Type': 'ধরন', 'Phone': 'ফোন', 'Edit': 'বদলান',
 'customer': 'কাস্টমার', 'supplier': 'সাপ্লায়ার', 'both': 'দুটোই', 'GSTIN (if registered)': 'GSTIN (রেজিস্টার্ড হলে)', 'State': 'রাজ্য', 'Drug licence no(s).': 'ড্রাগ লাইসেন্স নং', 'Phone (WhatsApp)': 'ফোন (WhatsApp)',
 'Contact person': 'যোগাযোগের ব্যক্তি', 'Email': 'ইমেল', 'Address': 'ঠিকানা', 'Credit days': 'বাকির দিন', 'Credit limit ₹ (empty = no limit)': 'বাকির সীমা ₹ (খালি = সীমা নেই)',
 'Opening balance ₹ (+ they owe you, − you owe them)': 'শুরুর ব্যালান্স ₹ (+ তারা আপনার কাছে ঋণী, − আপনি তাদের কাছে ঋণী)', 'Active': 'চালু', 'No (hidden in lists)': 'না (তালিকায় লুকানো)', 'Notes': 'নোট',
 'Credit limit, credit days and opening balance can be set by the owner or accounts.': 'বাকির সীমা, বাকির দিন আর শুরুর ব্যালান্স মালিক বা হিসাবরক্ষক বসাতে পারেন।', 'No GSTIN (unregistered)': 'GSTIN নেই (রেজিস্টার্ড নয়)',
 'No GSTIN: the party is treated as unregistered.': 'GSTIN নেই: পার্টিকে আনরেজিস্টার্ড ধরা হবে।', 'No balance': 'কোনো ব্যালান্স নেই', 'Owes you': 'আপনার পাওনা',
 'Business details printed on every invoice': 'প্রতিটি ইনভয়েসে ছাপা ব্যবসার তথ্য', 'Business name *': 'ব্যবসার নাম *', 'Address *': 'ঠিকানা *', 'GSTIN *': 'GSTIN *', 'Drug licence no(s). (20B / 21B) *': 'ড্রাগ লাইসেন্স নং (20B / 21B) *',
 'FSSAI no. (if you sell food supplements)': 'FSSAI নং (ফুড সাপ্লিমেন্ট বিক্রি করলে)', 'Invoice number starts with': 'ইনভয়েস নম্বরের শুরু', 'Usual credit days for customers': 'কাস্টমারদের সাধারণ বাকির দিন', 'Bank name': 'ব্যাংকের নাম',
 'Account no.': 'অ্যাকাউন্ট নং', 'UPI ID': 'UPI ID', 'Terms printed at the bottom of invoices': 'ইনভয়েসের নিচে ছাপা শর্ত', 'Save details': 'তথ্য সেভ করুন', 'Staff': 'কর্মী', 'Role': 'ভূমিকা', 'Name / label': 'নাম / পরিচয়',
 'WhatsApp number *': 'WhatsApp নম্বর *', 'Invite': 'আমন্ত্রণ পাঠান', 'Inventory': 'ইনভেন্টরি', 'Not joined yet': 'এখনও যোগ দেননি', 'Remove access': 'অ্যাক্সেস সরান', 'Give access again': 'আবার অ্যাক্সেস দিন', 'Removed': 'সরানো হয়েছে',
 'No staff yet.': 'এখনও কোনো কর্মী নেই।', 'Invite code': 'আমন্ত্রণ কোড',
 'invoices, customer returns, cash with the invoice.': 'ইনভয়েস, কাস্টমারের ফেরত, ইনভয়েসের সঙ্গে নগদ।', 'purchases, supplier returns, stock.': 'কেনা, সাপ্লায়ারকে ফেরত, স্টক।',
 'payments, ledgers, outstanding. Only you (owner) can cancel anything.': 'পেমেন্ট, লেজার, বকেয়া। কিছু বাতিল করতে পারেন শুধু আপনি (মালিক)।',
 'A wholesale invoice must show your GSTIN and drug licence numbers (Form 20B / 21B). Ask your CA if unsure.': 'হোলসেল ইনভয়েসে আপনার GSTIN আর ড্রাগ লাইসেন্স নং (ফর্ম 20B / 21B) থাকতেই হবে। নিশ্চিত না হলে CA-কে জিজ্ঞেস করুন।',
 'Customers to collect from': 'যাদের কাছ থেকে টাকা আদায় করতে হবে', 'Stock needing attention': 'যে স্টকে নজর দিতে হবে', 'To receive': 'পাওনা', 'To pay suppliers': 'সাপ্লায়ারকে দেনা', 'Stock value (cost)': 'স্টকের মূল্য (কেনা দামে)',
 'All good: nothing low or expiring in 90 days.': 'সব ঠিক আছে: কিছু কম নেই, ৯০ দিনে কিছুর মেয়াদ শেষ হচ্ছে না।', 'Fill them in Settings': 'সেটিংসে ভরুন',
 'Business details (name, GSTIN, drug licence) are not complete, so invoices will be missing them.': 'ব্যবসার তথ্য (নাম, GSTIN, ড্রাগ লাইসেন্স) পুরো নেই, তাই ইনভয়েসে সেগুলো থাকবে না।',
 'Type 2-3 letters of the product or salt…': 'প্রোডাক্ট বা সল্টের ২-৩টি অক্ষর লিখুন…', 'Type the product name…': 'প্রোডাক্টের নাম লিখুন…', 'Type name, phone or GSTIN…': 'নাম, ফোন বা GSTIN লিখুন…',
 'Invoice no. or customer…': 'ইনভয়েস নং বা কাস্টমার…', 'Bill no. or supplier…': 'বিল নং বা সাপ্লায়ার…', 'optional': 'ঐচ্ছিক', '10-digit mobile': '১০ সংখ্যার মোবাইল',
 'Goods a customer sent back. To make a new one, open the invoice (Invoices) and tap': 'কাস্টমারের ফেরত পাঠানো মাল। নতুন করতে ইনভয়েস খুলে (ইনভয়েস) চাপুন',
 'Signed in:': 'লগইন:', 'Theme': 'থিম', 'Log out': 'লগ আউট', 'Your businesses': 'আপনার ব্যবসা', 'Photo of the order': 'অর্ডারের ছবি', 'Repeat last order': 'আগের অর্ডার আবার', 'Add to the bill': 'বিলে যোগ করুন', 'Check the order read from the photo': 'ছবি থেকে পড়া অর্ডার মিলিয়ে নিন', 'Bring your old data (Marg, Busy, Tally or Excel)': 'পুরনো তথ্য আনুন (Marg, Busy, Tally বা Excel)', 'Customers & suppliers': 'কেমিস্ট ও সাপ্লায়ার', 'Products & stock': 'ওষুধ ও স্টক', 'Choose Excel / CSV file': 'Excel / CSV ফাইল বাছুন', 'Sample file': 'নমুনা ফাইল', 'Import now': 'এখনই আনুন', 'WhatsApp messages': 'WhatsApp মেসেজ', 'Save WhatsApp settings': 'WhatsApp সেটিং সেভ করুন',  'Add another business': 'আরেকটি ব্যবসা যোগ করুন', '(pending)': '(অনুমোদনের অপেক্ষায়)', 'Language': 'ভাষা', 'Making the PDF…': 'PDF তৈরি হচ্ছে…', 'New': 'নতুন', 'new': 'নতুন',
 'Sales today ({n})': 'আজকের বিক্রি ({n})', 'Sales this month ({n})': 'এই মাসের বিক্রি ({n})', 'Margin {x} (before GST)': 'লাভ {x} (GST ছাড়া)', 'Invoices ({n})': 'ইনভয়েস ({n})',
 'To receive ({n} parties)': 'পাওনা ({n} পার্টি)', 'To receive ({n} customers)': 'পাওনা ({n} কাস্টমার)', 'To pay ({n})': 'দেনা ({n})', '{n} low · {m} batches expiring': '{n}টি কম · {m}টি ব্যাচের মেয়াদ শেষ হচ্ছে',
 '{n} in stock': 'স্টকে {n}', 'since {d}': '{d} থেকে', 'due {d}': 'শেষ তারিখ {d}', '{x} overdue': '{x} মেয়াদ পেরিয়েছে', 'Expiring in 90 days · expired': '৯০ দিনে মেয়াদ শেষ · মেয়াদোত্তীর্ণ',
 'Batch {x}': 'ব্যাচ {x}', 'Exp {x}': 'মেয়াদ {x}', 'Expired {x}': 'মেয়াদ শেষ {x}', 'State:': 'রাজ্য:', 'Matched: {x}': 'মিলেছে: {x}', 'Read: {x}': 'পড়া হয়েছে: {x}',
 'e.g. INV → INV/26-27/0001. A new series starts every 1 April.': 'যেমন INV → INV/26-27/0001। প্রতি ১ এপ্রিল নতুন সিরিজ শুরু হয়।', 'State from GSTIN:': 'GSTIN থেকে রাজ্য:', 'Sold per': 'বিক্রির একক',
 'Sold per {u}': 'বিক্রির একক {u}', 'Patient': 'রোগী'
},
hi: {
 'Home': 'होम', 'Sales': 'बिक्री', 'Purchase': 'खरीद', 'Stock': 'स्टॉक', 'Accounts': 'हिसाब', 'Parties': 'पार्टियाँ', 'Settings': 'सेटिंग्स', 'Help': 'मदद', 'Help & Support': 'मदद और सहायता', 'Wholesale': 'होलसेल',
 'New invoice': 'नया इनवॉइस', 'Invoices': 'इनवॉइस', 'Credit notes': 'क्रेडिट नोट', 'Customer *': 'ग्राहक *', 'Customer': 'ग्राहक', 'Invoice date': 'इनवॉइस की तारीख', 'Add item': 'आइटम जोड़ें',
 'Product': 'प्रोडक्ट', 'Batch': 'बैच', 'Qty': 'मात्रा', 'Free': 'फ्री', 'Rate': 'रेट', 'Disc %': 'छूट %', 'Disc': 'छूट', 'Amount': 'रकम', 'Payment': 'भुगतान',
 'Credit': 'उधार', 'Cash': 'नकद', 'Bank': 'बैंक', 'Cheque': 'चेक', 'Paid now (optional)': 'अभी दिया (वैकल्पिक)', 'UTR / cheque no.': 'UTR / चेक नं.', 'Note on invoice (optional)': 'इनवॉइस पर नोट (वैकल्पिक)',
 'Save & make invoice': 'सेव करें और इनवॉइस बनाएँ', 'Taxable value': 'कर योग्य मूल्य', 'Round off': 'राउंड ऑफ', 'Invoice total': 'इनवॉइस कुल', 'Customer will owe': 'ग्राहक पर बकाया होगा', 'Bill total': 'बिल कुल',
 'No items yet. Search above to add.': 'अभी कोई आइटम नहीं। ऊपर खोजकर जोड़ें।', 'Today': 'आज', '7 days': '7 दिन', '30 days': '30 दिन', '1 year': '1 साल', 'Date': 'तारीख', 'Invoice': 'इनवॉइस',
 'Open': 'खोलें', 'On credit': 'उधार पर', 'Cash / UPI / bank / cheque': 'नकद / UPI / बैंक / चेक', 'GST collected': 'वसूला गया GST', 'No invoices in this period.': 'इस अवधि में कोई इनवॉइस नहीं।',
 'Credit note': 'क्रेडिट नोट', 'Debit note': 'डेबिट नोट', 'Debit notes': 'डेबिट नोट', 'Reason': 'कारण', 'Reason *': 'कारण *', 'None yet.': 'अभी कुछ नहीं।', 'Goods returned': 'माल वापस आया',
 'Cancel invoice': 'इनवॉइस रद्द करें', 'Cancelled': 'रद्द', 'Open / print': 'खोलें / प्रिंट', 'Goods returned by the customer (credit note)': 'ग्राहक द्वारा लौटाया माल (क्रेडिट नोट)', 'Can return': 'लौट सकता है',
 'Qty back': 'वापसी मात्रा', 'Free back': 'फ्री वापसी', 'Back into stock?': 'फिर से स्टॉक में?', 'Yes, saleable': 'हाँ, बिकने लायक', 'No (damaged / expired)': 'नहीं (खराब / एक्सपायर्ड)', 'Save credit note': 'क्रेडिट नोट सेव करें',
 'New purchase': 'नई खरीद', 'Purchases': 'खरीद बिल', 'Return to supplier': 'सप्लायर को वापसी', "Scan the supplier's bill": 'सप्लायर का बिल स्कैन करें', 'Take / choose photo': 'फोटो लें / चुनें',
 'Take a clear photo of the whole bill. AI reads the supplier, bill number and every line. You check the lines, then save.': 'पूरे बिल की साफ फोटो लें। AI सप्लायर, बिल नंबर और हर लाइन पढ़ लेता है। आप लाइनें जाँचकर सेव करें।',
 'Supplier *': 'सप्लायर *', 'Supplier': 'सप्लायर', "Supplier's bill no. *": 'सप्लायर का बिल नं. *', 'Bill date *': 'बिल की तारीख *', 'Bill date': 'बिल की तारीख', 'Item': 'आइटम', 'Salt / composition': 'सॉल्ट / संरचना',
 'Sold per': 'बिक्री इकाई', 'Pack (e.g. 1x10)': 'पैक (जैसे 1x10)', 'Batch no.': 'बैच नं.', 'Expiry (month)': 'एक्सपायरी (महीना)', 'Rate (before GST) ₹': 'रेट (GST से पहले) ₹', 'Discount %': 'छूट %', 'GST %': 'GST %',
 'MRP (per unit) ₹': 'MRP (प्रति इकाई) ₹', 'Your selling rate (PTR) ₹': 'आपका बिक्री रेट (PTR) ₹', 'Add line': 'लाइन जोड़ें', 'Batch / Exp': 'बैच / एक्सपायरी', 'Qty + free': 'मात्रा + फ्री', 'Note (optional)': 'नोट (वैकल्पिक)',
 'Save purchase & add to stock': 'खरीद सेव करें और स्टॉक में जोड़ें', 'Check that this matches the total on the paper bill.': 'जाँचें कि यह कागज़ के बिल के कुल से मिलता है।', 'No lines yet. Add them above, or scan the bill.': 'अभी कोई लाइन नहीं। ऊपर जोड़ें, या बिल स्कैन करें।',
 'Supplier / bill no.': 'सप्लायर / बिल नं.', 'Our ref.': 'हमारा नं.', 'Entered by': 'किसने दर्ज किया', 'No purchases in this period.': 'इस अवधि में कोई खरीद नहीं।', 'Cancel purchase': 'खरीद रद्द करें', 'Bill photo': 'बिल की फोटो',
 'Return goods to supplier': 'सप्लायर को माल लौटाएँ', 'From purchase bill (optional)': 'किस खरीद बिल से (वैकल्पिक)', 'Any batch in stock': 'स्टॉक का कोई भी बैच', 'Item / batch': 'आइटम / बैच', 'In stock': 'स्टॉक में',
 'Save debit note': 'डेबिट नोट सेव करें', 'Search an item above and pick the batch going back.': 'ऊपर आइटम खोजें और लौटने वाला बैच चुनें।',
 'Goods going back to the supplier (expired, damaged, short-dated). Stock goes down and the supplier owes you (debit note).': 'सप्लायर को लौटने वाला माल (एक्सपायर्ड, खराब, कम एक्सपायरी)। स्टॉक घटेगा और सप्लायर पर आपका बकाया होगा (डेबिट नोट)।',
 'Check the lines read from the bill': 'बिल से पढ़ी लाइनें जाँचें', 'AI can misread.': 'AI गलत पढ़ सकता है।', 'Check every line against the paper bill': 'हर लाइन को कागज़ के बिल से मिलाएँ',
 'Item (match to your list)': 'आइटम (अपनी सूची से मिलाएँ)', 'Supplier on the bill': 'बिल पर सप्लायर', 'Bill no.': 'बिल नं.', 'Put the ticked lines into the purchase': 'टिक की गई लाइनें खरीद में डालें',
 'Not in your list. Choose or add the supplier on the purchase screen.': 'आपकी सूची में नहीं। खरीद स्क्रीन पर सप्लायर चुनें या जोड़ें।',
 'Search product or salt…': 'प्रोडक्ट या सॉल्ट खोजें…', 'All': 'सभी', 'Low / out': 'कम / खत्म', 'Expiring ≤ 90 days': '90 दिन में एक्सपायरी', 'Expired': 'एक्सपायर्ड', 'New item': 'नया आइटम',
 'Nearest expiry': 'सबसे नज़दीकी एक्सपायरी', 'Status': 'स्थिति', 'Items': 'आइटम', 'Stock value at cost': 'खरीद दाम पर स्टॉक मूल्य', 'Low / out of stock': 'कम / स्टॉक खत्म', 'Out of stock': 'स्टॉक खत्म', 'Low': 'कम',
 'Soon': 'जल्द', 'Hidden': 'छिपा', 'Correct': 'ठीक करें', 'Last movements': 'पिछली हलचल', 'Edit item': 'आइटम बदलें', 'No stock.': 'स्टॉक नहीं।', 'Cost': 'खरीद दाम', 'Manufacturer': 'निर्माता',
 'Schedule': 'शेड्यूल', 'Warn when stock falls to': 'स्टॉक इतना होने पर चेतावनी', 'Show in billing': 'बिलिंग में दिखाएँ', 'Yes': 'हाँ', 'No (hidden)': 'नहीं (छिपा)', 'Name *': 'नाम *', 'Save': 'सेव करें',
 'Outstanding': 'बकाया', 'Receive / pay': 'पैसा लें / दें', 'Payments': 'भुगतान', 'Party ledger': 'पार्टी लेजर', 'To receive (customers owe you)': 'लेना है (ग्राहकों पर बकाया)', 'To pay (you owe suppliers)': 'देना है (सप्लायरों का बकाया)',
 'Party': 'पार्टी', 'Due': 'बकाया', 'Overdue': 'समय पार बकाया', 'Oldest unpaid': 'सबसे पुराना बकाया', 'You owe': 'आपको देना है', 'Ledger': 'लेजर', 'Receive': 'पैसा लें', 'Pay': 'पैसा दें', 'Remind': 'याद दिलाएँ',
 'Nobody owes you money.': 'किसी पर आपका बकाया नहीं।', 'You owe nothing.': 'आप पर कोई बकाया नहीं।', 'Money received': 'पैसा मिला', 'Money paid': 'पैसा दिया', 'Received from *': 'किससे मिला *', 'Paid to *': 'किसे दिया *',
 'Amount ₹ *': 'रकम ₹ *', 'Mode': 'माध्यम', 'Bank transfer (NEFT/RTGS/IMPS)': 'बैंक ट्रांसफर (NEFT/RTGS/IMPS)', 'Reference (optional)': 'रेफरेंस (वैकल्पिक)', 'UTR / cheque / UPI ref. *': 'UTR / चेक / UPI रेफ. *',
 'No.': 'नं.', 'Mode / ref.': 'माध्यम / रेफ.', 'Received': 'मिला', 'Paid': 'दिया', 'Cancel': 'रद्द करें', 'No payments in this period.': 'इस अवधि में कोई भुगतान नहीं।', 'From': 'से', 'To': 'तक', 'Show': 'दिखाएँ',
 'Entry': 'विवरण', 'Debit': 'डेबिट', 'Balance': 'बैलेंस', 'Opening balance': 'शुरुआती बैलेंस', 'Closing balance': 'अंतिम बैलेंस', 'Statement PDF': 'स्टेटमेंट PDF', 'Send statement on WhatsApp': 'WhatsApp पर स्टेटमेंट भेजें',
 'Send receipt on WhatsApp': 'WhatsApp पर रसीद भेजें', 'Net': 'नेट',
 'Search name, phone, GSTIN…': 'नाम, फोन, GSTIN खोजें…', 'Customers': 'ग्राहक', 'Suppliers': 'सप्लायर', 'New party': 'नई पार्टी', 'Name': 'नाम', 'Type': 'प्रकार', 'Phone': 'फोन', 'Edit': 'बदलें',
 'customer': 'ग्राहक', 'supplier': 'सप्लायर', 'both': 'दोनों', 'GSTIN (if registered)': 'GSTIN (अगर रजिस्टर्ड)', 'State': 'राज्य', 'Drug licence no(s).': 'ड्रग लाइसेंस नं.', 'Phone (WhatsApp)': 'फोन (WhatsApp)',
 'Contact person': 'संपर्क व्यक्ति', 'Email': 'ईमेल', 'Address': 'पता', 'Credit days': 'उधार के दिन', 'Credit limit ₹ (empty = no limit)': 'उधार सीमा ₹ (खाली = कोई सीमा नहीं)',
 'Opening balance ₹ (+ they owe you, − you owe them)': 'शुरुआती बैलेंस ₹ (+ उन पर आपका बकाया, − आप पर उनका बकाया)', 'Active': 'चालू', 'No (hidden in lists)': 'नहीं (सूची में छिपा)', 'Notes': 'नोट',
 'Credit limit, credit days and opening balance can be set by the owner or accounts.': 'उधार सीमा, उधार के दिन और शुरुआती बैलेंस मालिक या अकाउंट्स ही तय कर सकते हैं।', 'No GSTIN (unregistered)': 'GSTIN नहीं (अनरजिस्टर्ड)',
 'No GSTIN: the party is treated as unregistered.': 'GSTIN नहीं: पार्टी अनरजिस्टर्ड मानी जाएगी।', 'No balance': 'कोई बैलेंस नहीं', 'Owes you': 'आपका बकाया',
 'Business details printed on every invoice': 'हर इनवॉइस पर छपने वाली व्यापार की जानकारी', 'Business name *': 'व्यापार का नाम *', 'Address *': 'पता *', 'GSTIN *': 'GSTIN *', 'Drug licence no(s). (20B / 21B) *': 'ड्रग लाइसेंस नं. (20B / 21B) *',
 'FSSAI no. (if you sell food supplements)': 'FSSAI नं. (अगर फूड सप्लीमेंट बेचते हैं)', 'Invoice number starts with': 'इनवॉइस नंबर की शुरुआत', 'Usual credit days for customers': 'ग्राहकों के सामान्य उधार दिन', 'Bank name': 'बैंक का नाम',
 'Account no.': 'खाता नं.', 'UPI ID': 'UPI ID', 'Terms printed at the bottom of invoices': 'इनवॉइस के नीचे छपने वाली शर्तें', 'Save details': 'जानकारी सेव करें', 'Staff': 'स्टाफ', 'Role': 'भूमिका', 'Name / label': 'नाम / पहचान',
 'WhatsApp number *': 'WhatsApp नंबर *', 'Invite': 'आमंत्रण भेजें', 'Inventory': 'इन्वेंटरी', 'Not joined yet': 'अभी जुड़े नहीं', 'Remove access': 'एक्सेस हटाएँ', 'Give access again': 'फिर से एक्सेस दें', 'Removed': 'हटाया गया',
 'No staff yet.': 'अभी कोई स्टाफ नहीं।', 'Invite code': 'आमंत्रण कोड',
 'invoices, customer returns, cash with the invoice.': 'इनवॉइस, ग्राहक की वापसी, इनवॉइस के साथ नकद।', 'purchases, supplier returns, stock.': 'खरीद, सप्लायर को वापसी, स्टॉक।',
 'payments, ledgers, outstanding. Only you (owner) can cancel anything.': 'भुगतान, लेजर, बकाया। कुछ भी रद्द सिर्फ आप (मालिक) कर सकते हैं।',
 'A wholesale invoice must show your GSTIN and drug licence numbers (Form 20B / 21B). Ask your CA if unsure.': 'होलसेल इनवॉइस पर आपका GSTIN और ड्रग लाइसेंस नं. (फॉर्म 20B / 21B) ज़रूरी है। पक्का न हो तो अपने CA से पूछें।',
 'Customers to collect from': 'जिनसे पैसा वसूलना है', 'Stock needing attention': 'जिस स्टॉक पर ध्यान देना है', 'To receive': 'लेना है', 'To pay suppliers': 'सप्लायरों को देना है', 'Stock value (cost)': 'स्टॉक मूल्य (खरीद दाम)',
 'All good: nothing low or expiring in 90 days.': 'सब ठीक: कुछ कम नहीं, 90 दिन में कुछ एक्सपायर नहीं हो रहा।', 'Fill them in Settings': 'सेटिंग्स में भरें',
 'Business details (name, GSTIN, drug licence) are not complete, so invoices will be missing them.': 'व्यापार की जानकारी (नाम, GSTIN, ड्रग लाइसेंस) पूरी नहीं है, इसलिए इनवॉइस पर नहीं छपेगी।',
 'Type 2-3 letters of the product or salt…': 'प्रोडक्ट या सॉल्ट के 2-3 अक्षर लिखें…', 'Type the product name…': 'प्रोडक्ट का नाम लिखें…', 'Type name, phone or GSTIN…': 'नाम, फोन या GSTIN लिखें…',
 'Invoice no. or customer…': 'इनवॉइस नं. या ग्राहक…', 'Bill no. or supplier…': 'बिल नं. या सप्लायर…', 'optional': 'वैकल्पिक', '10-digit mobile': '10 अंकों का मोबाइल',
 'Goods a customer sent back. To make a new one, open the invoice (Invoices) and tap': 'ग्राहक द्वारा लौटाया माल। नया बनाने के लिए इनवॉइस खोलें (इनवॉइस) और दबाएँ',
 'Signed in:': 'लॉगिन:', 'Theme': 'थीम', 'Log out': 'लॉग आउट', 'Your businesses': 'आपके व्यवसाय', 'Photo of the order': 'ऑर्डर की फोटो', 'Repeat last order': 'पिछला ऑर्डर दोबारा', 'Add to the bill': 'बिल में जोड़ें', 'Check the order read from the photo': 'फोटो से पढ़ा ऑर्डर जाँचें', 'Bring your old data (Marg, Busy, Tally or Excel)': 'पुराना डेटा लाएँ (Marg, Busy, Tally या Excel)', 'Customers & suppliers': 'ग्राहक और सप्लायर', 'Products & stock': 'दवाइयाँ और स्टॉक', 'Choose Excel / CSV file': 'Excel / CSV फ़ाइल चुनें', 'Sample file': 'नमूना फ़ाइल', 'Import now': 'अभी लाएँ', 'WhatsApp messages': 'WhatsApp संदेश', 'Save WhatsApp settings': 'WhatsApp सेटिंग सेव करें',  'Add another business': 'एक और व्यवसाय जोड़ें', '(pending)': '(मंज़ूरी बाकी)', 'Language': 'भाषा', 'Making the PDF…': 'PDF बन रहा है…', 'New': 'नया', 'new': 'नया',
 'Sales today ({n})': 'आज की बिक्री ({n})', 'Sales this month ({n})': 'इस महीने की बिक्री ({n})', 'Margin {x} (before GST)': 'मार्जिन {x} (GST से पहले)', 'Invoices ({n})': 'इनवॉइस ({n})',
 'To receive ({n} parties)': 'लेना है ({n} पार्टियाँ)', 'To receive ({n} customers)': 'लेना है ({n} ग्राहक)', 'To pay ({n})': 'देना है ({n})', '{n} low · {m} batches expiring': '{n} कम · {m} बैच एक्सपायर हो रहे',
 '{n} in stock': 'स्टॉक में {n}', 'since {d}': '{d} से', 'due {d}': 'अंतिम तारीख {d}', '{x} overdue': '{x} समय पार', 'Expiring in 90 days · expired': '90 दिन में एक्सपायरी · एक्सपायर्ड',
 'Batch {x}': 'बैच {x}', 'Exp {x}': 'एक्सपायरी {x}', 'Expired {x}': 'एक्सपायर्ड {x}', 'State:': 'राज्य:', 'Matched: {x}': 'मिला: {x}', 'Read: {x}': 'पढ़ा गया: {x}',
 'e.g. INV → INV/26-27/0001. A new series starts every 1 April.': 'जैसे INV → INV/26-27/0001। हर 1 अप्रैल को नई सीरीज़ शुरू होती है।', 'State from GSTIN:': 'GSTIN से राज्य:',
 'Sold per {u}': 'बिक्री इकाई {u}'
}};

/* ---------- engine ---------- */
function whLang() { var l = 'en'; try { l = localStorage.getItem('aurascale_lang') || 'en'; } catch (e) {} return WL[l] ? l : 'en'; }
var _wlPat = {};
function _wlPats(l) {
  if (_wlPat[l]) return _wlPat[l];
  _wlPat[l] = Object.keys(WL[l]).filter(function (k) { return /\{\w\}/.test(k); }).map(function (k) {
    var names = []; var rx = '^' + k.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\\?\{(\w)\\?\}/g, function (m, n) { names.push(n); return '(.+?)'; }) + '$';
    return { rx: new RegExp(rx), names: names, out: WL[l][k] };
  });
  return _wlPat[l];
}
function whT(core, l) {
  l = l || whLang(); if (l === 'en') return null;
  var d = WL[l]; if (d[core] !== undefined) return d[core];
  var ps = _wlPats(l);
  for (var i = 0; i < ps.length; i++) { var m = core.match(ps[i].rx); if (m) { var o = ps[i].out; ps[i].names.forEach(function (n, j) { o = o.replace('{' + n + '}', m[j + 1]); }); return o; } }
  return null;
}
function _wlNode(n, l) {
  var p = n.parentElement; if (!p || p.closest('.pg,script,style,[data-notr]')) return;
  if (n.__en === undefined) n.__en = n.nodeValue;
  var src = n.__en, m = src.match(/^([^A-Za-z0-9]*)([\s\S]*?)(\s*)$/);
  if (!m || !m[2]) return;
  var t = whT(m[2], l), v = t === null ? src : m[1] + t + m[3];
  if (n.nodeValue !== v) n.nodeValue = v;
}
function whTranslate(root, l) {
  l = l || whLang(); root = root || document.body; if (!root) return;
  if (root.nodeType === 3) { _wlNode(root, l); return; }
  var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
  while ((n = w.nextNode())) { if (l === 'en' && n.__en === undefined) continue; _wlNode(n, l); }
  var els = root.querySelectorAll ? root.querySelectorAll('[placeholder]') : [];
  [].forEach.call(els, function (e) {
    if (e.__enPh === undefined) e.__enPh = e.getAttribute('placeholder');
    var t = l === 'en' ? null : whT(e.__enPh, l); e.setAttribute('placeholder', t === null ? e.__enPh : t);
  });
}
(function () {
  var pend = [], sch = false;
  function flush() { sch = false; var l = whLang(), a = pend; pend = []; if (l === 'en') return; a.forEach(function (n) { if (n.isConnected) whTranslate(n, l); }); }
  var mo = new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { pend.push(n); }); }); if (!sch) { sch = true; Promise.resolve().then(flush); } });
  function start() { mo.observe(document.body, { childList: true, subtree: true }); whTranslate(document.body); try { document.documentElement.lang = whLang(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
function whSetLang(l) {
  try { localStorage.setItem('aurascale_lang', l); } catch (e) {}
  whTranslate(document.body, whLang()); try { document.documentElement.lang = whLang(); } catch (e) {}
  if (typeof helpRender === 'function') helpRender();
  var s = document.getElementById('wl-sel'); if (s) s.value = whLang();
}
/* language box at the top (next to the ⋮ menu) */
function whLangBox() {
  var btn = document.querySelector('.d-menu-btn'); if (!btn || document.getElementById('wl-sel')) return;
  var s = document.createElement('select'); s.id = 'wl-sel'; s.setAttribute('data-notr', '1'); s.title = 'Language';
  s.style.cssText = 'border:1px solid var(--border);border-radius:8px;padding:7px 8px;background:var(--surface);color:var(--text-primary);font-size:12.5px;font-weight:600;margin-right:8px;max-width:118px;cursor:pointer';
  s.innerHTML = '<option value="en">🌐 English</option><option value="bn">🌐 বাংলা</option><option value="hi">🌐 हिन्दी</option>';
  s.value = whLang(); s.onchange = function () { whSetLang(s.value); };
  var wrap = btn.parentNode; wrap.style.display = 'flex'; wrap.style.alignItems = 'center'; wrap.insertBefore(s, btn);
  /* Help in the ⋮ menu too (on phones the bottom bar has no room for it) */
  var menu = document.getElementById('d-menu');
  if (menu && !document.getElementById('wl-help-mi')) { var a = document.createElement('button'); a.id = 'wl-help-mi'; a.innerHTML = '&#10067; Help &amp; Support'; a.onclick = function () { menu.classList.remove('open'); dTab('help'); }; var who = menu.querySelector('.who'); menu.insertBefore(a, who ? who.nextSibling : menu.firstChild); }
}

/* ---------- Help & Support guides (English / Bengali / Hindi) ---------- */
var WH_HELP = {
en: { title: 'How to use AuraScale Wholesale', sub: 'Short step-by-step guides', pick: 'Choose what you want to learn', wa_t: 'WhatsApp support', wa_s: 'Coming soon. WhatsApp support is in development right now.', wa_n: 'For now, please use these guides, or ask the owner of your business.', dev: 'In development',
 guides: [
  { id: 'start', ic: '🚀', n: 'First-time setup', d: 'Do this once, before your first invoice. (Owner)', steps: [
    ['Open Settings', 'Tap **Settings**. Fill your business name, address, **GSTIN** and **drug licence numbers (20B / 21B)**. These print on every invoice.'],
    ['Bank and terms', 'Add your bank account, IFSC and UPI ID so customers know where to pay. Add your usual credit days (e.g. 30).'],
    ['Invoice numbering', 'Choose how invoice numbers start (e.g. INV). Numbers run INV/26-27/0001, 0002 … and restart every 1 April, as GST requires.'],
    ['Add your staff', 'Under **Staff**, choose Sales, Inventory or Accounts, type their WhatsApp number and tap **Invite**. They get a code on WhatsApp and join with it.']] },
  { id: 'parties', ic: '👥', n: 'Add suppliers and customers', d: 'Your own list. Nobody else can see it.', steps: [
    ['Open Parties', 'Tap **Parties** → **New party**.'],
    ['Type the details', 'Name, type (customer / supplier / both), phone and **GSTIN**. The state is filled from the GSTIN, and AuraScale then chooses CGST+SGST or IGST by itself.'],
    ['Credit terms (owner / accounts)', 'Set credit days and a credit limit. Sales staff cannot give credit above this limit.'],
    ['Old balances', 'If a party already owed you money before AuraScale, enter it as **Opening balance** (+ they owe you, − you owe them).']] },
  { id: 'purchase', ic: '📥', n: 'Enter a purchase (stock in)', d: 'Owner or Inventory staff', steps: [
    ['Scan the bill', 'Tap **Purchase** → **Take / choose photo**. Take a clear photo of the whole bill. AI reads the supplier, bill number and every line.'],
    ['Check every line', 'Match each line to your item (or keep **New**). Check batch, expiry, quantity, free, rate and MRP against the paper bill, then tap **Put the ticked lines into the purchase**.'],
    ['Or type it', 'Type the item name, then batch, expiry, quantity, free, rate, discount, GST and MRP, and tap **Add line**. Your selling rate (PTR) is optional.'],
    ['Save', 'Check the **Bill total** matches the paper bill and tap **Save purchase & add to stock**. Stock goes up batch-wise. The same bill cannot be entered twice.']] },
  { id: 'invoice', ic: '🧾', n: 'Make a sales invoice', d: 'Owner or Sales staff', steps: [
    ['Choose the customer', 'Tap **Sales** → **New invoice** and type the customer name. You see their GSTIN, balance and credit limit.'],
    ['Add items', 'Type 2-3 letters of the product. The batch with the nearest expiry is chosen first; you can change it. Enter quantity, free, rate and discount.'],
    ['Payment', 'Choose Credit, Cash, UPI, Bank or Cheque. For credit you can also enter money paid now.'],
    ['Save', 'Tap **Save & make invoice**. The GST tax invoice PDF is made at once. Tap **WhatsApp** to send it to the customer.'],
    ['Safety checks', 'AuraScale refuses selling above MRP, selling an expired batch, selling more than in stock, and going over the credit limit (the owner can allow it).']] },
  { id: 'orderphoto', ic: '📝', n: 'Bill from a photo of the order', d: 'No typing. Owner or Sales staff', steps: [
    ['Take the photo', 'Tap **Sales** → **New invoice** → **Take / choose photo** in the green **Photo of the order** box. Photograph the chemist\'s handwritten slip, or choose a **screenshot of the WhatsApp order** from the gallery.'],
    ['AI reads it', 'In 15-30 seconds AI reads every medicine and quantity. If the shop\'s name is on the slip or the chat, the customer is chosen by itself.'],
    ['Check the lines', 'Left: what was written. Right: the product from your stock. When two products look alike (e.g. Shelcal / Shelcal HD) you choose. A red quantity box means the quantity could not be read: type it, or choose **skip this line**.'],
    ['Add to the bill', 'Tap **Add to the bill**. The batch that expires first is used (the next batch if it runs short), and the rate is the one this customer got last time.'],
    ['Save', 'Check the bill and tap **Save & make invoice**. Lines that were skipped are listed, so you can add them by typing.']] },
  { id: 'repeat', ic: '🔁', n: 'Repeat last order', d: 'For customers who order the same things', steps: [
    ['Choose the customer', 'In **Sales** → **New invoice**, choose the customer.'],
    ['Tap the button', 'Under the customer you see **Repeat last order** with the last invoice number, date, items and amount. Tap it.'],
    ['Change and save', 'All items of that invoice are filled with the same quantity and rate, from the batches in stock now. Change any quantity, then tap **Save & make invoice**.']] },
  { id: 'import', ic: '📂', n: 'Bring your old data', d: 'From Marg, Busy, Tally or Excel. Owner, once', steps: [
    ['Export from the old software', 'In your old software, export the **party / ledger list** and the **stock list (batch-wise)** as Excel or CSV.'],
    ['Choose the file', 'Tap **Settings** → **Bring your old data** → choose **Customers & suppliers** or **Products & stock** → **Choose Excel / CSV file**.'],
    ['Check the columns', 'AuraScale finds the columns by itself (name, mobile, GSTIN, batch, expiry, stock, MRP …). Check each box points to the right column. The first rows are shown as they will be saved.'],
    ['Check first, then import', 'Tap **Check first (nothing is saved)** to see what will be added, then **Import now**. Names already in your list are not added twice, and the same file can be imported again safely.'],
    ['Rows that need attention', 'A stock row without an expiry date, or a batch already in stock, is not added and is listed by row number. Fix it in the file and import again.']] },
  { id: 'whatsapp', ic: '📲', n: 'Automatic WhatsApp messages', d: 'The owner knows everything without opening the app', steps: [
    ['9 PM: today\'s summary', 'Sales, purchases, money in and out, what customers owe and how much is overdue, on the owner\'s WhatsApp.'],
    ['10 AM: collection list', 'Customers whose bills are past the due date, biggest amount first. Monday 10 AM: stock expiring in the next 60 days.'],
    ['11 AM: reminder to chemists', 'A polite payment reminder to the chemist when a bill is 1, 7, 15 and 30 days late, then monthly. It is **Off** until the owner switches it on.'],
    ['Switch on / off', 'Tap **Settings** → **WhatsApp messages**. Type your WhatsApp number, choose On / Off for each message and tap **Save WhatsApp settings**. Use **Send me … now** to try one.']] },
  { id: 'returns', ic: '↩️', n: 'Goods returned', d: 'Credit note and debit note', steps: [
    ['Customer sends goods back', 'Open the invoice in **Sales → Invoices** and tap **Goods returned**. Enter the quantity, choose if it goes back into stock, write the reason and save. A **credit note** PDF is made.'],
    ['You return goods to a supplier', 'Tap **Purchase → Return to supplier**. Choose the supplier (and the bill if you know it), search the item, pick the batch, enter quantity and reason. A **debit note** PDF is made.'],
    ['Balances update by themselves', 'The customer owes less after a credit note; the supplier owes you after a debit note.']] },
  { id: 'money', ic: '💰', n: 'Money in and out', d: 'Owner or Accounts staff', steps: [
    ['Money received', 'Tap **Accounts → Receive / pay → Money received**. Choose the party, amount, mode (cash / UPI / bank / cheque) and the UTR or cheque number. Save.'],
    ['Money paid to a supplier', 'Same screen, choose **Money paid**.'],
    ['Receipt on WhatsApp', 'After saving money received, tap **Send receipt on WhatsApp**.'],
    ['Bounced cheque', 'The owner can cancel the payment in **Accounts → Payments**. The balance goes back up.']] },
  { id: 'outstanding', ic: '⏱️', n: 'Outstanding and reminders', d: 'Who owes you, who you owe', steps: [
    ['See dues', 'Tap **Accounts → Outstanding**. Customers who owe you are at the top, overdue first. Suppliers you owe are below.'],
    ['Overdue', 'An invoice becomes overdue after its due date (invoice date + credit days). Payments settle the oldest invoices first.'],
    ['Remind on WhatsApp', 'Tap **Remind**. A polite message with the amount and your bank / UPI details opens in WhatsApp.']] },
  { id: 'ledger', ic: '📒', n: 'Party ledger and statement', d: 'Full account of one party', steps: [
    ['Open a ledger', 'Tap **Ledger** next to any party (or **Accounts → Party ledger**). Choose the dates and tap **Show**.'],
    ['Read it', 'Dr = they owe you. Cr = you owe them. Every invoice, bill, return and payment is listed with the running balance.'],
    ['Send a statement', 'Tap **Statement PDF**, or **Send statement on WhatsApp** to share it with the party.']] },
  { id: 'stock', ic: '📦', n: 'Stock and expiry', d: 'Batch-wise stock', steps: [
    ['See stock', 'Tap **Stock**. Use **Low / out**, **Expiring ≤ 90 days** and **Expired** to find what needs attention. Home also shows these.'],
    ['Batches', 'Tap an item to see every batch with expiry, MRP, PTR, cost, quantity and supplier, and the last movements.'],
    ['Correct stock', 'If the count on the shelf is different (breakage, counting), tap **Correct** next to the batch and write the reason. Every change is recorded.']] },
  { id: 'roles', ic: '🔐', n: 'Who can do what', d: 'Staff roles', steps: [
    ['Owner', 'Everything, including cancelling invoices, purchases and payments, settings and staff.'],
    ['Sales', 'Invoices, customer returns and cash taken with an invoice. Sees only customer dues, never supplier balances or purchase costs.'],
    ['Inventory', 'Purchases, supplier returns, items and stock correction.'],
    ['Accounts', 'Money received / paid, ledgers and outstanding. Can read invoices and purchases.'],
    ['Remove access', 'In **Settings → Staff**, tap **Remove access**. The person is signed out at once.']] }
 ] },
bn: { title: 'AuraScale হোলসেল কীভাবে ব্যবহার করবেন', sub: 'ছোট ছোট ধাপে গাইড', pick: 'কী শিখতে চান বাছুন', wa_t: 'WhatsApp সহায়তা', wa_s: 'শীঘ্রই আসছে। WhatsApp সহায়তা এখন তৈরি হচ্ছে।', wa_n: 'আপাতত এই গাইডগুলো দেখুন, বা আপনার ব্যবসার মালিককে জিজ্ঞেস করুন।', dev: 'তৈরি হচ্ছে',
 guides: [
  { id: 'start', ic: '🚀', n: 'প্রথমবারের সেটআপ', d: 'প্রথম ইনভয়েসের আগে একবার করুন। (মালিক)', steps: [
    ['সেটিংস খুলুন', '**সেটিংস** চাপুন। ব্যবসার নাম, ঠিকানা, **GSTIN** আর **ড্রাগ লাইসেন্স নং (20B / 21B)** ভরুন। এগুলো প্রতিটি ইনভয়েসে ছাপা হবে।'],
    ['ব্যাংক আর শর্ত', 'ব্যাংক অ্যাকাউন্ট, IFSC আর UPI ID দিন, যাতে কাস্টমার জানে কোথায় টাকা দেবে। সাধারণ বাকির দিন দিন (যেমন ৩০)।'],
    ['ইনভয়েস নম্বর', 'ইনভয়েস নম্বরের শুরু বাছুন (যেমন INV)। নম্বর চলবে INV/26-27/0001, 0002 … আর GST নিয়ম মেনে প্রতি ১ এপ্রিল নতুন করে শুরু হবে।'],
    ['কর্মী যোগ করুন', '**কর্মী** অংশে Sales, Inventory বা Accounts বাছুন, WhatsApp নম্বর লিখে **আমন্ত্রণ পাঠান** চাপুন। তাঁরা WhatsApp-এ কোড পাবেন আর সেই কোড দিয়ে যোগ দেবেন।']] },
  { id: 'parties', ic: '👥', n: 'সাপ্লায়ার আর কাস্টমার যোগ করুন', d: 'আপনার নিজের তালিকা। অন্য কেউ দেখতে পায় না।', steps: [
    ['পার্টি খুলুন', '**পার্টি** → **নতুন পার্টি** চাপুন।'],
    ['তথ্য লিখুন', 'নাম, ধরন (কাস্টমার / সাপ্লায়ার / দুটোই), ফোন আর **GSTIN**। GSTIN থেকে রাজ্য নিজে বসে যায়, আর AuraScale নিজেই CGST+SGST না IGST ঠিক করে।'],
    ['বাকির শর্ত (মালিক / হিসাবরক্ষক)', 'বাকির দিন আর বাকির সীমা বসান। Sales কর্মী এই সীমার বেশি বাকি দিতে পারবেন না।'],
    ['পুরনো বাকি', 'AuraScale-এর আগে থেকে কোনো পার্টির বাকি থাকলে **শুরুর ব্যালান্স** হিসেবে লিখুন (+ তারা আপনার কাছে ঋণী, − আপনি তাদের কাছে ঋণী)।']] },
  { id: 'purchase', ic: '📥', n: 'কেনা এন্ট্রি (স্টক ঢোকানো)', d: 'মালিক বা Inventory কর্মী', steps: [
    ['বিল স্ক্যান করুন', '**কেনা** → **ছবি তুলুন / বাছুন** চাপুন। পুরো বিলের পরিষ্কার ছবি তুলুন। AI সাপ্লায়ার, বিল নম্বর আর প্রতিটি লাইন পড়ে নেয়।'],
    ['প্রতিটি লাইন মিলিয়ে নিন', 'প্রতিটি লাইন আপনার আইটেমের সঙ্গে মেলান (বা **নতুন** রাখুন)। ব্যাচ, মেয়াদ, পরিমাণ, ফ্রি, রেট আর MRP কাগজের বিলের সঙ্গে মিলিয়ে **টিক দেওয়া লাইনগুলো কেনায় যোগ করুন** চাপুন।'],
    ['বা হাতে লিখুন', 'আইটেমের নাম, তারপর ব্যাচ, মেয়াদ, পরিমাণ, ফ্রি, রেট, ছাড়, GST আর MRP লিখে **লাইন যোগ করুন** চাপুন। আপনার বিক্রির রেট (PTR) ঐচ্ছিক।'],
    ['সেভ করুন', '**বিল মোট** কাগজের বিলের সঙ্গে মিলছে কিনা দেখে **কেনা সেভ করে স্টকে যোগ করুন** চাপুন। ব্যাচ অনুযায়ী স্টক বাড়বে। একই বিল দু-বার এন্ট্রি করা যায় না।']] },
  { id: 'invoice', ic: '🧾', n: 'বিক্রির ইনভয়েস তৈরি', d: 'মালিক বা Sales কর্মী', steps: [
    ['কাস্টমার বাছুন', '**বিক্রি** → **নতুন ইনভয়েস** চাপুন আর কাস্টমারের নাম লিখুন। তাঁদের GSTIN, বাকি আর বাকির সীমা দেখতে পাবেন।'],
    ['আইটেম যোগ করুন', 'প্রোডাক্টের ২-৩টি অক্ষর লিখুন। সবচেয়ে কাছের মেয়াদের ব্যাচ আগে বাছা হয়; চাইলে বদলাতে পারেন। পরিমাণ, ফ্রি, রেট আর ছাড় লিখুন।'],
    ['পেমেন্ট', 'বাকি, নগদ, UPI, ব্যাংক বা চেক বাছুন। বাকিতে চাইলে এখন দেওয়া টাকাও লিখতে পারেন।'],
    ['সেভ করুন', '**সেভ করে ইনভয়েস তৈরি করুন** চাপুন। সঙ্গে সঙ্গে GST ট্যাক্স ইনভয়েস PDF তৈরি হয়। কাস্টমারকে পাঠাতে **WhatsApp** চাপুন।'],
    ['নিরাপত্তা', 'MRP-র বেশি দামে বিক্রি, মেয়াদোত্তীর্ণ ব্যাচ বিক্রি, স্টকের বেশি বিক্রি আর বাকির সীমা পেরোনো AuraScale আটকে দেয় (মালিক অনুমতি দিতে পারেন)।']] },
  { id: 'orderphoto', ic: '📝', n: 'অর্ডারের ছবি থেকে বিল', d: 'টাইপ ছাড়াই। মালিক বা Sales কর্মী', steps: [
    ['ছবি তুলুন', '**Sales** → **New invoice** → সবুজ **অর্ডারের ছবি** বক্সে **ছবি তুলুন / বাছুন**। কেমিস্টের হাতে লেখা স্লিপের ছবি তুলুন, অথবা গ্যালারি থেকে **WhatsApp অর্ডারের স্ক্রিনশট** বাছুন।'],
    ['AI পড়ে নেয়', '১৫–৩০ সেকেন্ডে AI প্রতিটা ওষুধ আর সংখ্যা পড়ে নেয়। স্লিপে বা চ্যাটে দোকানের নাম থাকলে কেমিস্টও নিজে বেছে নেয়।'],
    ['লাইন মিলিয়ে নিন', 'বাঁদিকে: যা লেখা ছিল। ডানদিকে: আপনার স্টকের ওষুধ। দুটো ওষুধ একরকম দেখতে হলে (যেমন Shelcal / Shelcal HD) আপনি বাছবেন। সংখ্যার ঘর লাল মানে সংখ্যা পড়া যায়নি: লিখে দিন, অথবা **skip this line** বাছুন।'],
    ['বিলে যোগ করুন', '**বিলে যোগ করুন** চাপুন। যে ব্যাচ আগে এক্সপায়ার হবে সেটা আগে বসে (কম পড়লে পরের ব্যাচ থেকে), আর রেট বসে এই কেমিস্ট শেষবার যে রেট পেয়েছিল।'],
    ['সেভ', 'বিল দেখে **Save & make invoice** চাপুন। যে লাইন বাদ গেছে তার নাম দেখায়, টাইপ করে যোগ করতে পারেন।']] },
  { id: 'repeat', ic: '🔁', n: 'আগের অর্ডার আবার', d: 'যে কেমিস্ট একই জিনিস বারবার নেয়', steps: [
    ['কেমিস্ট বাছুন', '**Sales** → **New invoice**-এ কেমিস্ট বাছুন।'],
    ['বোতাম চাপুন', 'কেমিস্টের নামের নিচে **আগের অর্ডার আবার** বোতাম আসে, সঙ্গে শেষ বিলের নম্বর, তারিখ, কটা আইটেম আর টাকা। চাপুন।'],
    ['বদলে সেভ করুন', 'সেই বিলের সব ওষুধ একই সংখ্যা আর রেটে ভরে যায়, এখনকার স্টকের ব্যাচ থেকে। দরকার মতো সংখ্যা বদলে **Save & make invoice** চাপুন।']] },
  { id: 'import', ic: '📂', n: 'পুরনো তথ্য আনুন', d: 'Marg, Busy, Tally বা Excel থেকে। মালিক, একবারই', steps: [
    ['পুরনো সফটওয়্যার থেকে বের করুন', 'পুরনো সফটওয়্যার থেকে **পার্টি / লেজারের লিস্ট** আর **স্টকের লিস্ট (ব্যাচ অনুযায়ী)** Excel বা CSV হিসেবে বের করুন।'],
    ['ফাইল বাছুন', '**Settings** → **পুরনো তথ্য আনুন** → **কেমিস্ট ও সাপ্লায়ার** অথবা **ওষুধ ও স্টক** বাছুন → **Excel / CSV ফাইল বাছুন**।'],
    ['কলাম মিলিয়ে নিন', 'AuraScale নিজেই কলাম চিনে নেয় (নাম, মোবাইল, GSTIN, ব্যাচ, এক্সপায়ারি, স্টক, MRP …)। প্রতিটা বক্স ঠিক কলামে আছে কিনা দেখুন। প্রথম কয়েকটা সারি যেমন সেভ হবে তেমন দেখায়।'],
    ['আগে দেখুন, তারপর আনুন', '**Check first** চাপলে কিছু সেভ না করে দেখায় কী যোগ হবে। তারপর **এখনই আনুন**। যে নাম আগে থেকে আছে সেটা ডাবল হয় না। একই ফাইল আবার দিলেও কোনো ক্ষতি নেই।'],
    ['যে সারি ঠিক করতে হবে', 'এক্সপায়ারি ছাড়া স্টকের সারি, বা যে ব্যাচ আগে থেকেই স্টকে আছে, যোগ হয় না। সারির নম্বর দিয়ে দেখায়। ফাইলে ঠিক করে আবার আনুন।']] },
  { id: 'whatsapp', ic: '📲', n: 'অটোমেটিক WhatsApp মেসেজ', d: 'অ্যাপ না খুলেই মালিক সব জানবেন', steps: [
    ['রাত ৯টা: আজকের হিসাব', 'বিক্রি, কেনা, টাকা আসা-যাওয়া, কেমিস্টদের মোট বাকি আর কত টাকা মেয়াদ পেরিয়েছে, মালিকের WhatsApp-এ।'],
    ['সকাল ১০টা: আদায়ের লিস্ট', 'কোন কেমিস্টের বিলের তারিখ পেরিয়েছে, বেশি টাকা আগে। প্রতি সোমবার সকাল ১০টা: ৬০ দিনের মধ্যে যে মাল এক্সপায়ার হবে।'],
    ['সকাল ১১টা: কেমিস্টকে রিমাইন্ডার', 'বিল ১, ৭, ১৫ আর ৩০ দিন দেরি হলে (তারপর মাসে একবার) কেমিস্টকে ভদ্র রিমাইন্ডার যায়। মালিক চালু না করা পর্যন্ত এটা **Off** থাকে।'],
    ['চালু / বন্ধ', '**Settings** → **WhatsApp মেসেজ**। আপনার WhatsApp নম্বর লিখুন, প্রতিটা মেসেজের জন্য On / Off বাছুন, **WhatsApp সেটিং সেভ করুন** চাপুন। **Send me … now** চেপে একটা পরীক্ষা করে দেখতে পারেন।']] },
  { id: 'returns', ic: '↩️', n: 'মাল ফেরত', d: 'ক্রেডিট নোট আর ডেবিট নোট', steps: [
    ['কাস্টমার মাল ফেরত দিলে', '**বিক্রি → ইনভয়েস**-এ ইনভয়েস খুলে **মাল ফেরত এসেছে** চাপুন। পরিমাণ লিখুন, আবার স্টকে যাবে কিনা বাছুন, কারণ লিখে সেভ করুন। **ক্রেডিট নোট** PDF তৈরি হবে।'],
    ['আপনি সাপ্লায়ারকে মাল ফেরত দিলে', '**কেনা → সাপ্লায়ারকে ফেরত** চাপুন। সাপ্লায়ার (আর জানা থাকলে বিল) বাছুন, আইটেম খুঁজে ব্যাচ বাছুন, পরিমাণ আর কারণ লিখুন। **ডেবিট নোট** PDF তৈরি হবে।'],
    ['ব্যালান্স নিজে বদলায়', 'ক্রেডিট নোটের পরে কাস্টমারের বাকি কমে; ডেবিট নোটের পরে সাপ্লায়ার আপনার কাছে ঋণী হয়।']] },
  { id: 'money', ic: '💰', n: 'টাকা নেওয়া ও দেওয়া', d: 'মালিক বা Accounts কর্মী', steps: [
    ['টাকা পেলে', '**হিসাব → টাকা নেওয়া / দেওয়া → টাকা পেয়েছি** চাপুন। পার্টি, টাকা, মাধ্যম (নগদ / UPI / ব্যাংক / চেক) আর UTR বা চেক নম্বর দিন। সেভ করুন।'],
    ['সাপ্লায়ারকে টাকা দিলে', 'একই পাতায় **টাকা দিয়েছি** বাছুন।'],
    ['WhatsApp-এ রসিদ', 'টাকা পাওয়া সেভ করার পরে **WhatsApp-এ রসিদ পাঠান** চাপুন।'],
    ['চেক বাউন্স হলে', 'মালিক **হিসাব → পেমেন্ট**-এ পেমেন্টটি বাতিল করতে পারেন। বাকি আবার বেড়ে যাবে।']] },
  { id: 'outstanding', ic: '⏱️', n: 'বকেয়া আর মনে করানো', d: 'কে আপনার কাছে ঋণী, আপনি কার কাছে', steps: [
    ['বাকি দেখুন', '**হিসাব → বকেয়া** চাপুন। উপরে যে কাস্টমারদের কাছে পাওনা, মেয়াদ পেরোনোরা আগে। নিচে যে সাপ্লায়ারদের দেনা।'],
    ['মেয়াদ পেরোনো', 'শেষ তারিখ (ইনভয়েসের তারিখ + বাকির দিন) পেরোলে ইনভয়েস মেয়াদ পেরোনো হয়। টাকা এলে সবচেয়ে পুরনো ইনভয়েস আগে মেটে।'],
    ['WhatsApp-এ মনে করান', '**মনে করান** চাপুন। টাকার পরিমাণ আর আপনার ব্যাংক / UPI তথ্যসহ একটি ভদ্র মেসেজ WhatsApp-এ খুলবে।']] },
  { id: 'ledger', ic: '📒', n: 'পার্টি লেজার আর স্টেটমেন্ট', d: 'একটি পার্টির পুরো হিসাব', steps: [
    ['লেজার খুলুন', 'যেকোনো পার্টির পাশে **লেজার** চাপুন (বা **হিসাব → পার্টি লেজার**)। তারিখ বেছে **দেখান** চাপুন।'],
    ['পড়ুন', 'Dr = তারা আপনার কাছে ঋণী। Cr = আপনি তাদের কাছে ঋণী। প্রতিটি ইনভয়েস, বিল, ফেরত আর পেমেন্ট চলতি ব্যালান্সসহ দেখা যায়।'],
    ['স্টেটমেন্ট পাঠান', '**স্টেটমেন্ট PDF** চাপুন, বা পার্টিকে পাঠাতে **WhatsApp-এ স্টেটমেন্ট পাঠান** চাপুন।']] },
  { id: 'stock', ic: '📦', n: 'স্টক আর মেয়াদ', d: 'ব্যাচ অনুযায়ী স্টক', steps: [
    ['স্টক দেখুন', '**স্টক** চাপুন। কী নজর দিতে হবে খুঁজতে **কম / শেষ**, **৯০ দিনের মধ্যে মেয়াদ শেষ** আর **মেয়াদোত্তীর্ণ** ব্যবহার করুন। হোমেও এগুলো দেখা যায়।'],
    ['ব্যাচ', 'কোনো আইটেম চাপলে প্রতিটি ব্যাচের মেয়াদ, MRP, PTR, কেনা দাম, পরিমাণ, সাপ্লায়ার আর শেষ লেনদেন দেখা যায়।'],
    ['স্টক ঠিক করুন', 'তাকে গোনা সংখ্যা আলাদা হলে (ভাঙা, গোনার ভুল) ব্যাচের পাশে **ঠিক করুন** চাপুন আর কারণ লিখুন। প্রতিটি বদল রেকর্ড থাকে।']] },
  { id: 'roles', ic: '🔐', n: 'কে কী করতে পারেন', d: 'কর্মীদের ভূমিকা', steps: [
    ['মালিক', 'সবকিছু, ইনভয়েস, কেনা আর পেমেন্ট বাতিল, সেটিংস আর কর্মীসহ।'],
    ['Sales', 'ইনভয়েস, কাস্টমারের ফেরত আর ইনভয়েসের সঙ্গে নগদ। শুধু কাস্টমারের বাকি দেখেন, সাপ্লায়ারের ব্যালান্স বা কেনা দাম কখনও নয়।'],
    ['Inventory', 'কেনা, সাপ্লায়ারকে ফেরত, আইটেম আর স্টক ঠিক করা।'],
    ['Accounts', 'টাকা নেওয়া / দেওয়া, লেজার আর বকেয়া। ইনভয়েস আর কেনা পড়তে পারেন।'],
    ['অ্যাক্সেস সরানো', '**সেটিংস → কর্মী**-তে **অ্যাক্সেস সরান** চাপুন। সেই ব্যক্তি সঙ্গে সঙ্গে লগ আউট হয়ে যান।']] }
 ] },
hi: { title: 'AuraScale होलसेल कैसे इस्तेमाल करें', sub: 'छोटे-छोटे स्टेप वाली गाइड', pick: 'क्या सीखना है चुनें', wa_t: 'WhatsApp सहायता', wa_s: 'जल्द आ रहा है। WhatsApp सहायता अभी बन रही है।', wa_n: 'अभी के लिए ये गाइड देखें, या अपने व्यापार के मालिक से पूछें।', dev: 'बन रहा है',
 guides: [
  { id: 'start', ic: '🚀', n: 'पहली बार सेटअप', d: 'पहले इनवॉइस से पहले एक बार करें। (मालिक)', steps: [
    ['सेटिंग्स खोलें', '**सेटिंग्स** दबाएँ। व्यापार का नाम, पता, **GSTIN** और **ड्रग लाइसेंस नं. (20B / 21B)** भरें। ये हर इनवॉइस पर छपेंगे।'],
    ['बैंक और शर्तें', 'बैंक खाता, IFSC और UPI ID डालें ताकि ग्राहक जानें कहाँ भुगतान करना है। सामान्य उधार दिन डालें (जैसे 30)।'],
    ['इनवॉइस नंबर', 'इनवॉइस नंबर की शुरुआत चुनें (जैसे INV)। नंबर INV/26-27/0001, 0002 … चलेंगे और GST नियम के अनुसार हर 1 अप्रैल को फिर से शुरू होंगे।'],
    ['स्टाफ जोड़ें', '**स्टाफ** में Sales, Inventory या Accounts चुनें, WhatsApp नंबर लिखें और **आमंत्रण भेजें** दबाएँ। उन्हें WhatsApp पर कोड मिलेगा और वे उससे जुड़ेंगे।']] },
  { id: 'parties', ic: '👥', n: 'सप्लायर और ग्राहक जोड़ें', d: 'आपकी अपनी सूची। कोई और नहीं देख सकता।', steps: [
    ['पार्टियाँ खोलें', '**पार्टियाँ** → **नई पार्टी** दबाएँ।'],
    ['जानकारी लिखें', 'नाम, प्रकार (ग्राहक / सप्लायर / दोनों), फोन और **GSTIN**। GSTIN से राज्य अपने-आप भर जाता है, और AuraScale खुद CGST+SGST या IGST चुनता है।'],
    ['उधार शर्तें (मालिक / अकाउंट्स)', 'उधार के दिन और उधार सीमा डालें। Sales स्टाफ इस सीमा से ज़्यादा उधार नहीं दे सकता।'],
    ['पुराना बकाया', 'अगर AuraScale से पहले किसी पार्टी पर बकाया था, तो उसे **शुरुआती बैलेंस** में लिखें (+ उन पर आपका बकाया, − आप पर उनका बकाया)।']] },
  { id: 'purchase', ic: '📥', n: 'खरीद दर्ज करें (स्टॉक अंदर)', d: 'मालिक या Inventory स्टाफ', steps: [
    ['बिल स्कैन करें', '**खरीद** → **फोटो लें / चुनें** दबाएँ। पूरे बिल की साफ फोटो लें। AI सप्लायर, बिल नंबर और हर लाइन पढ़ लेता है।'],
    ['हर लाइन जाँचें', 'हर लाइन को अपने आइटम से मिलाएँ (या **नया** रखें)। बैच, एक्सपायरी, मात्रा, फ्री, रेट और MRP कागज़ के बिल से मिलाकर **टिक की गई लाइनें खरीद में डालें** दबाएँ।'],
    ['या हाथ से लिखें', 'आइटम का नाम, फिर बैच, एक्सपायरी, मात्रा, फ्री, रेट, छूट, GST और MRP लिखकर **लाइन जोड़ें** दबाएँ। आपका बिक्री रेट (PTR) वैकल्पिक है।'],
    ['सेव करें', 'जाँचें कि **बिल कुल** कागज़ के बिल से मिलता है और **खरीद सेव करें और स्टॉक में जोड़ें** दबाएँ। बैच के हिसाब से स्टॉक बढ़ेगा। एक ही बिल दो बार दर्ज नहीं हो सकता।']] },
  { id: 'invoice', ic: '🧾', n: 'बिक्री इनवॉइस बनाएँ', d: 'मालिक या Sales स्टाफ', steps: [
    ['ग्राहक चुनें', '**बिक्री** → **नया इनवॉइस** दबाएँ और ग्राहक का नाम लिखें। उनका GSTIN, बकाया और उधार सीमा दिखेगी।'],
    ['आइटम जोड़ें', 'प्रोडक्ट के 2-3 अक्षर लिखें। सबसे नज़दीकी एक्सपायरी वाला बैच पहले चुना जाता है; आप बदल सकते हैं। मात्रा, फ्री, रेट और छूट डालें।'],
    ['भुगतान', 'उधार, नकद, UPI, बैंक या चेक चुनें। उधार में अभी दिया पैसा भी डाल सकते हैं।'],
    ['सेव करें', '**सेव करें और इनवॉइस बनाएँ** दबाएँ। GST टैक्स इनवॉइस PDF तुरंत बनता है। ग्राहक को भेजने के लिए **WhatsApp** दबाएँ।'],
    ['सुरक्षा जाँच', 'MRP से ज़्यादा पर बेचना, एक्सपायर्ड बैच बेचना, स्टॉक से ज़्यादा बेचना और उधार सीमा पार करना AuraScale रोक देता है (मालिक अनुमति दे सकते हैं)।']] },
  { id: 'orderphoto', ic: '📝', n: 'ऑर्डर की फोटो से बिल', d: 'बिना टाइप किए। मालिक या Sales स्टाफ', steps: [
    ['फोटो लें', '**Sales** → **New invoice** → हरे **ऑर्डर की फोटो** बॉक्स में **फोटो लें / चुनें**। केमिस्ट की हाथ से लिखी पर्ची की फोटो लें, या गैलरी से **WhatsApp ऑर्डर का स्क्रीनशॉट** चुनें।'],
    ['AI पढ़ लेता है', '15–30 सेकंड में AI हर दवा और मात्रा पढ़ लेता है। पर्ची या चैट में दुकान का नाम हो तो ग्राहक भी अपने आप चुन लिया जाता है।'],
    ['लाइनें जाँचें', 'बाएँ: जो लिखा था। दाएँ: आपके स्टॉक की दवा। दो दवाएँ एक जैसी दिखें (जैसे Shelcal / Shelcal HD) तो आप चुनें। मात्रा का लाल बॉक्स मतलब मात्रा पढ़ी नहीं गई: लिख दें, या **skip this line** चुनें।'],
    ['बिल में जोड़ें', '**बिल में जोड़ें** दबाएँ। जो बैच पहले एक्सपायर होगा वह पहले लगता है (कम पड़े तो अगला बैच), और रेट वही जो इस ग्राहक को पिछली बार मिला था।'],
    ['सेव', 'बिल देखकर **Save & make invoice** दबाएँ। जो लाइनें छूट गईं उनके नाम दिखते हैं, उन्हें टाइप करके जोड़ सकते हैं।']] },
  { id: 'repeat', ic: '🔁', n: 'पिछला ऑर्डर दोबारा', d: 'जो ग्राहक बार-बार वही सामान लेते हैं', steps: [
    ['ग्राहक चुनें', '**Sales** → **New invoice** में ग्राहक चुनें।'],
    ['बटन दबाएँ', 'ग्राहक के नीचे **पिछला ऑर्डर दोबारा** बटन दिखता है, साथ में पिछले बिल का नंबर, तारीख, आइटम और रकम। दबाएँ।'],
    ['बदलें और सेव करें', 'उस बिल की सारी दवाएँ उसी मात्रा और रेट से भर जाती हैं, अभी के स्टॉक के बैच से। जो मात्रा बदलनी हो बदलें, फिर **Save & make invoice** दबाएँ।']] },
  { id: 'import', ic: '📂', n: 'पुराना डेटा लाएँ', d: 'Marg, Busy, Tally या Excel से। मालिक, एक बार', steps: [
    ['पुराने सॉफ्टवेयर से निकालें', 'पुराने सॉफ्टवेयर से **पार्टी / लेजर की सूची** और **स्टॉक की सूची (बैच के हिसाब से)** Excel या CSV में निकालें।'],
    ['फ़ाइल चुनें', '**Settings** → **पुराना डेटा लाएँ** → **ग्राहक और सप्लायर** या **दवाइयाँ और स्टॉक** चुनें → **Excel / CSV फ़ाइल चुनें**।'],
    ['कॉलम जाँचें', 'AuraScale खुद कॉलम पहचान लेता है (नाम, मोबाइल, GSTIN, बैच, एक्सपायरी, स्टॉक, MRP …)। हर बॉक्स सही कॉलम पर है या नहीं, देख लें। पहली कुछ पंक्तियाँ वैसे ही दिखती हैं जैसे सेव होंगी।'],
    ['पहले जाँचें, फिर लाएँ', '**Check first** दबाने पर बिना सेव किए दिखता है क्या जुड़ेगा। फिर **अभी लाएँ**। जो नाम पहले से है वह दोबारा नहीं जुड़ता। वही फ़ाइल फिर से देने में भी कोई नुकसान नहीं।'],
    ['जिन पंक्तियों को ठीक करना है', 'बिना एक्सपायरी वाली स्टॉक पंक्ति, या जो बैच पहले से स्टॉक में है, नहीं जुड़ती। पंक्ति नंबर के साथ दिखती है। फ़ाइल में ठीक करके फिर लाएँ।']] },
  { id: 'whatsapp', ic: '📲', n: 'अपने आप WhatsApp संदेश', d: 'ऐप खोले बिना मालिक को सब पता', steps: [
    ['रात 9 बजे: आज का हिसाब', 'बिक्री, खरीद, पैसा आना-जाना, ग्राहकों का कुल बकाया और कितना ओवरड्यू, मालिक के WhatsApp पर।'],
    ['सुबह 10 बजे: वसूली सूची', 'किन ग्राहकों के बिल की तारीख निकल गई, बड़ी रकम पहले। हर सोमवार सुबह 10 बजे: अगले 60 दिन में एक्सपायर होने वाला माल।'],
    ['सुबह 11 बजे: केमिस्ट को याद', 'बिल 1, 7, 15 और 30 दिन लेट होने पर (फिर हर महीने) केमिस्ट को विनम्र याद दिलाना। मालिक चालू न करे तब तक यह **Off** रहता है।'],
    ['चालू / बंद', '**Settings** → **WhatsApp संदेश**। अपना WhatsApp नंबर लिखें, हर संदेश के लिए On / Off चुनें, **WhatsApp सेटिंग सेव करें** दबाएँ। **Send me … now** दबाकर एक आज़मा सकते हैं।']] },
  { id: 'returns', ic: '↩️', n: 'माल वापसी', d: 'क्रेडिट नोट और डेबिट नोट', steps: [
    ['ग्राहक माल लौटाए', '**बिक्री → इनवॉइस** में इनवॉइस खोलें और **माल वापस आया** दबाएँ। मात्रा लिखें, फिर से स्टॉक में जाएगा या नहीं चुनें, कारण लिखकर सेव करें। **क्रेडिट नोट** PDF बनेगा।'],
    ['आप सप्लायर को माल लौटाएँ', '**खरीद → सप्लायर को वापसी** दबाएँ। सप्लायर (और पता हो तो बिल) चुनें, आइटम खोजें, बैच चुनें, मात्रा और कारण लिखें। **डेबिट नोट** PDF बनेगा।'],
    ['बैलेंस अपने-आप बदलता है', 'क्रेडिट नोट के बाद ग्राहक का बकाया घटता है; डेबिट नोट के बाद सप्लायर पर आपका बकाया होता है।']] },
  { id: 'money', ic: '💰', n: 'पैसा आना और जाना', d: 'मालिक या Accounts स्टाफ', steps: [
    ['पैसा मिला', '**हिसाब → पैसा लें / दें → पैसा मिला** दबाएँ। पार्टी, रकम, माध्यम (नकद / UPI / बैंक / चेक) और UTR या चेक नंबर डालें। सेव करें।'],
    ['सप्लायर को पैसा दिया', 'उसी स्क्रीन पर **पैसा दिया** चुनें।'],
    ['WhatsApp पर रसीद', 'पैसा मिलना सेव करने के बाद **WhatsApp पर रसीद भेजें** दबाएँ।'],
    ['चेक बाउंस', 'मालिक **हिसाब → भुगतान** में भुगतान रद्द कर सकते हैं। बकाया फिर बढ़ जाएगा।']] },
  { id: 'outstanding', ic: '⏱️', n: 'बकाया और याद दिलाना', d: 'किस पर आपका बकाया, आप पर किसका', steps: [
    ['बकाया देखें', '**हिसाब → बकाया** दबाएँ। ऊपर वे ग्राहक जिन पर आपका बकाया है, समय पार वाले पहले। नीचे वे सप्लायर जिनका आप पर बकाया है।'],
    ['समय पार', 'अंतिम तारीख (इनवॉइस तारीख + उधार दिन) के बाद इनवॉइस समय पार हो जाता है। भुगतान सबसे पुराने इनवॉइस पहले चुकाता है।'],
    ['WhatsApp पर याद दिलाएँ', '**याद दिलाएँ** दबाएँ। रकम और आपके बैंक / UPI की जानकारी के साथ एक विनम्र संदेश WhatsApp में खुलेगा।']] },
  { id: 'ledger', ic: '📒', n: 'पार्टी लेजर और स्टेटमेंट', d: 'एक पार्टी का पूरा हिसाब', steps: [
    ['लेजर खोलें', 'किसी भी पार्टी के पास **लेजर** दबाएँ (या **हिसाब → पार्टी लेजर**)। तारीखें चुनकर **दिखाएँ** दबाएँ।'],
    ['पढ़ें', 'Dr = उन पर आपका बकाया। Cr = आप पर उनका बकाया। हर इनवॉइस, बिल, वापसी और भुगतान चलते बैलेंस के साथ दिखता है।'],
    ['स्टेटमेंट भेजें', '**स्टेटमेंट PDF** दबाएँ, या पार्टी को भेजने के लिए **WhatsApp पर स्टेटमेंट भेजें** दबाएँ।']] },
  { id: 'stock', ic: '📦', n: 'स्टॉक और एक्सपायरी', d: 'बैच के हिसाब से स्टॉक', steps: [
    ['स्टॉक देखें', '**स्टॉक** दबाएँ। ध्यान देने वाली चीज़ें खोजने के लिए **कम / खत्म**, **90 दिन में एक्सपायरी** और **एक्सपायर्ड** इस्तेमाल करें। होम पर भी ये दिखते हैं।'],
    ['बैच', 'किसी आइटम को दबाने पर हर बैच की एक्सपायरी, MRP, PTR, खरीद दाम, मात्रा, सप्लायर और पिछली हलचल दिखती है।'],
    ['स्टॉक ठीक करें', 'अगर शेल्फ पर गिनती अलग है (टूट-फूट, गिनती की गलती), बैच के पास **ठीक करें** दबाएँ और कारण लिखें। हर बदलाव रिकॉर्ड रहता है।']] },
  { id: 'roles', ic: '🔐', n: 'कौन क्या कर सकता है', d: 'स्टाफ की भूमिकाएँ', steps: [
    ['मालिक', 'सब कुछ, इनवॉइस, खरीद और भुगतान रद्द करना, सेटिंग्स और स्टाफ समेत।'],
    ['Sales', 'इनवॉइस, ग्राहक की वापसी और इनवॉइस के साथ नकद। सिर्फ ग्राहकों का बकाया देखते हैं, सप्लायर बैलेंस या खरीद दाम कभी नहीं।'],
    ['Inventory', 'खरीद, सप्लायर को वापसी, आइटम और स्टॉक सुधार।'],
    ['Accounts', 'पैसा लेना / देना, लेजर और बकाया। इनवॉइस और खरीद पढ़ सकते हैं।'],
    ['एक्सेस हटाएँ', '**सेटिंग्स → स्टाफ** में **एक्सेस हटाएँ** दबाएँ। वह व्यक्ति तुरंत लॉग आउट हो जाता है।']] }
 ] }
};
var _helpId = 'start';
function helpPick(id) { _helpId = id; helpRender(); }
function helpRender() {
  var root = document.getElementById('help-root'); if (!root) return;
  var H = WH_HELP[whLang()] || WH_HELP.en, g = H.guides.filter(function (x) { return x.id === _helpId; })[0] || H.guides[0];
  var f = function (s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); };
  root.setAttribute('data-notr', '1');
  root.innerHTML = '<h3 style="font-size:16px;margin-bottom:2px">' + esc(H.title) + '</h3><p class="tiny" style="margin-bottom:12px">' + esc(H.sub) + '</p>'
    + '<div class="tiny" style="font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + esc(H.pick) + '</div>'
    + '<div class="wh-chips">' + H.guides.map(function (x) { return '<button type="button" class="wh-chip' + (x.id === g.id ? ' on' : '') + '" onclick="helpPick(\'' + x.id + '\')"><span>' + x.ic + '</span>' + esc(x.n) + '</button>'; }).join('') + '</div>'
    + '<div class="card" style="margin-top:12px;background:var(--surface)"><div style="font-size:15px;font-weight:800">' + g.ic + ' ' + esc(g.n) + '</div><div class="tiny" style="margin:2px 0 8px">' + esc(g.d) + '</div>'
    + g.steps.map(function (s, i) { return '<div class="wh-step"><div class="wh-num">' + (i + 1) + '</div><div><div style="font-weight:700;font-size:13.5px">' + esc(s[0]) + '</div><div style="font-size:13px;color:var(--text-secondary);line-height:1.55">' + f(s[1]) + '</div></div></div>'; }).join('') + '</div>'
    + '<div class="card" style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="width:42px;height:42px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">&#128242;</div>'
    + '<div style="flex:1;min-width:200px"><div style="font-weight:700">' + esc(H.wa_t) + '</div><div class="tiny" style="color:var(--text-secondary)">' + esc(H.wa_s) + '</div><div class="tiny">' + esc(H.wa_n) + '</div></div>'
    + '<span class="tag t-a">' + esc(H.dev) + '</span></div>';
}
function onTab_help() { helpRender(); }
