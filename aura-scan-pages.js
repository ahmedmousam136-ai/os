/* aura-scan-pages.js — read a distributor / supplier bill from 1 to 10 photos, or from a PDF.
   A long bill is often photographed in parts: page 2, 3 … have no bill header and no column headings.
   Page 1 is read first; its first rows are sent with every later page so the AI knows which column is which.
   All pages' rows are joined into one bill (the totals come from the last page that shows them).

   Use:
     AuraPages.tray(hostElement, { onRead: function (result) { … } , module: 'wholesale' (optional) })
     result = { ok: true, supplier, invoice_no, …, bill_total, lines: [...], pages: n, page_errors: [...], name_list_only: bool }
           or { ok: false, reason, message }                                                                                 */
(function () {
  if (window.AuraPages) return;
  var MAX = 10;
  var touch = false; try { touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window; } catch (e) {}
  var PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  var PDFW = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var css = document.createElement('style');
  css.textContent = '.ap-tray{margin-top:12px}.ap-btns{display:flex;gap:8px;flex-wrap:wrap}'
    + '.ap-btn{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border-radius:10px;padding:10px 14px;font:600 13px/1.2 inherit;border:1px solid var(--border-mid,var(--border));background:var(--surface);color:var(--text-primary);margin:0}'
    + '.ap-btn.g{background:var(--green);border-color:var(--green);color:#fff}.ap-btn input{display:none}.ap-btn[disabled]{opacity:.55;pointer-events:none}'
    + '.ap-thumbs{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}'
    + '.ap-th{position:relative;width:92px;height:122px;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.06)}'
    + '.ap-th img{width:100%;height:100%;object-fit:cover;display:block}'
    + '.ap-th b{position:absolute;left:6px;top:6px;background:rgba(10,40,30,.82);color:#fff;font-size:11px;border-radius:6px;padding:2px 6px}'
    + '.ap-th button{position:absolute;right:4px;top:4px;width:22px;height:22px;border-radius:50%;border:0;background:rgba(0,0,0,.6);color:#fff;cursor:pointer;font-size:12px;line-height:22px;padding:0}'
    + '.ap-th .mv{position:absolute;bottom:4px;left:0;right:0;display:flex;justify-content:space-between;padding:0 4px}'
    + '.ap-th .mv button{position:static;width:24px;height:22px;border-radius:6px}'
    + '.ap-th.st-ok{outline:3px solid var(--green)}.ap-th.st-bad{outline:3px solid var(--red)}.ap-th.st-run{outline:3px dashed var(--amber,#d97706)}'
    + '.ap-more{width:92px;height:122px;border-radius:10px;border:2px dashed var(--green);background:var(--green-bg);color:var(--green);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;font:700 12px/1.2 inherit;text-align:center;margin:0}'
    + '.ap-more span{font-size:28px;line-height:1}.ap-more input{display:none}.ap-more:hover{background:var(--surface)}'
    + '.ap-st{font-size:12.5px;margin-top:10px;color:var(--text-secondary);line-height:1.5}';
  document.head.appendChild(css);

  /* ---------- files -> page pictures ---------- */
  function resize(srcCanvasOrImg, w, h) {
    /* the AI looks at a picture at most ~1600 px wide: a bigger photo only takes longer to send */
    var max = 1600, k = Math.min(1, max / Math.max(w, h)), c = document.createElement('canvas');
    c.width = Math.round(w * k); c.height = Math.round(h * k);
    var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(srcCanvasOrImg, 0, 0, c.width, c.height);
    return c;
  }
  function toPage(c) {
    return new Promise(function (res) { c.toBlob(function (b) { res({ data: c.toDataURL('image/jpeg', 0.85), blob: b }); }, 'image/jpeg', 0.85); });
  }
  function imgFile(f) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { var im = new Image(); im.onload = function () { toPage(resize(im, im.width, im.height)).then(res); };
        im.onerror = function () { rej(new Error(f.name + ' is not a picture.')); }; im.src = fr.result; };
      fr.onerror = function () { rej(new Error('Could not read ' + f.name)); }; fr.readAsDataURL(f);
    });
  }
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve();
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = PDFJS;
      s.onload = function () { try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFW; } catch (e) {} res(); };
      s.onerror = function () { rej(new Error('Could not load the PDF reader. Check the internet connection.')); };
      document.head.appendChild(s);
    });
  }
  async function pdfFile(f, room) {
    await loadPdfJs();
    var doc = await window.pdfjsLib.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise, out = [];
    for (var p = 1; p <= doc.numPages && out.length < room; p++) {
      var pg = await doc.getPage(p), v0 = pg.getViewport({ scale: 1 }), sc = Math.min(3, 1600 / Math.max(v0.width, v0.height));
      var v = pg.getViewport({ scale: sc }), c = document.createElement('canvas'); c.width = Math.round(v.width); c.height = Math.round(v.height);
      var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
      await pg.render({ canvasContext: x, viewport: v }).promise;
      out.push(await toPage(c));
    }
    return { pages: out, total: doc.numPages };
  }
  async function toPages(files, room) {
    var out = [], notes = [];
    for (var i = 0; i < files.length && out.length < room; i++) {
      var f = files[i];
      if (/pdf$/i.test(f.type) || /\.pdf$/i.test(f.name)) {
        var r = await pdfFile(f, room - out.length); out = out.concat(r.pages);
        if (r.total > r.pages.length) notes.push('Only the first ' + r.pages.length + ' of ' + r.total + ' PDF pages were taken (limit ' + MAX + ').');
      } else if (/^image\//.test(f.type || '') || /\.(jpe?g|png|webp|heic)$/i.test(f.name)) out.push(await imgFile(f));
      else notes.push(f.name + ' is not a photo or PDF.');
    }
    if (files.length && out.length >= room && files.length > i) notes.push('Up to ' + MAX + ' pages can be read at a time.');
    return { pages: out, notes: notes };
  }

  /* ---------- read the pages ---------- */
  var WHY = { daily_limit: "Today's limit of bill photos is used up. Please add the lines by hand, or try tomorrow.",
    ai_key_not_set: 'Bill reading is not set up on the server yet (ANTHROPIC_API_KEY).', pharmacy_module_off: 'The Pharmacy module is not active.',
    not_allowed: 'Only the owner or inventory staff can scan bills.', not_signed_in: 'Your login has expired. Please log in again.',
    image_too_large: 'The photo is too large.', nothing_read: 'No product lines could be read on this page. Take a clearer, straight photo in good light.',
    photo_unclear: 'The writing on this page is too small or blurred. Take the photo closer, straight, in good light.' };
  async function call(body) {
    var r = await _supa.functions.invoke('pharmacy-bill-scan', { body: body }), d = r.data;
    if (r.error) { try { if (r.error.context && r.error.context.json) d = await r.error.context.json(); } catch (e) {} }
    if (!d && r.error) d = { ok: false, reason: 'unreachable', message: /Failed to send|fetch/i.test(r.error.message || '') ? 'The bill-reading server did not answer. Please try again in a minute.' : (r.error.message || 'error') };
    return d || { ok: false, reason: 'error' };
  }
  function msgOf(d) { return WHY[d && d.reason] || (d && d.message) || 'Could not read this page.'; }
  function key(l) { return [String(l.name || '').toLowerCase().replace(/\s+/g, ' ').trim(), String(l.batch || '').toLowerCase(), l.qty, l.rate].join('|'); }
  /* a list of medicine names only (no batch, expiry, MRP): it is not a stock bill */
  function nameListOnly(lines) {
    if (!lines || lines.length < 2) return false;
    var full = lines.filter(function (l) { return l.batch && l.expiry && l.mrp; }).length;
    return full / lines.length < 0.3;
  }
  async function readBill(pages, extra, progress) {
    var n = pages.length, body = function (i, hint) {
      var b = Object.assign({}, extra || {}, { clinic_id: _clinicId, image_base64: pages[i].data.split(',')[1], mime_type: 'image/jpeg' });
      if (n > 1) { b.page = i + 1; b.pages = n; if (hint) b.hint = hint; }
      return b;
    };
    progress && progress(0, 'run');
    var first = await call(body(0));
    if (!first || !first.ok) { progress && progress(0, 'bad', msgOf(first)); return { ok: false, reason: first && first.reason, message: (n > 1 ? 'Page 1: ' : '') + msgOf(first), page: 1 }; }
    progress && progress(0, 'ok', first.lines.length);
    var res = [first], errs = [], hint = (first.lines || []).slice(0, 3);
    /* the other pages, two at a time */
    var next = 1;
    async function worker() {
      while (next < n) {
        var i = next++; progress && progress(i, 'run');
        var d = await call(body(i, hint));
        if (d && d.ok) { res[i] = d; progress && progress(i, 'ok', d.lines.length); }
        else { res[i] = null; errs.push({ page: i + 1, message: msgOf(d) }); progress && progress(i, 'bad', msgOf(d)); }
      }
    }
    await Promise.all([worker(), worker(), worker()]);   /* three pages at a time */
    var out = Object.assign({}, first), lines = [], seen = {};
    res.forEach(function (d, i) {
      if (!d) return;
      ['supplier', 'supplier_gstin', 'supplier_phone', 'supplier_address', 'supplier_dl', 'invoice_no', 'invoice_date', 'order_no'].forEach(function (k) { if (!out[k] && d[k]) out[k] = d[k]; });
      if (i > 0 && d.bill_total != null) out.bill_total = d.bill_total;   /* the grand total is on the last page */
      (d.lines || []).forEach(function (l) {
        var k = key(l);
        if (i > 0 && seen[k] === i - 1) return;   /* the same row photographed twice where two pages overlap */
        seen[k] = i; l._page = i + 1; lines.push(l);
      });
    });
    out.lines = lines; out.pages = n; out.page_errors = errs; out.name_list_only = nameListOnly(lines);
    return out;
  }

  /* ---------- the tray: take / choose photos or a PDF, see the pages, read them ---------- */
  function tray(host, opt) {
    opt = opt || {};
    var P = [], busy = false, done = false, id = 'ap' + Math.random().toString(36).slice(2, 7);
    host.innerHTML = '<div class="ap-tray">'
      + '<div class="ap-btns">'
      /* data-cam: aura-dept.js must not rename or split these buttons */
      + (touch ? '<label class="ap-btn g" data-cam="1">&#128247; Take photo<input type="file" accept="image/*" capture="environment" data-ap="cam"/></label>' : '')
      + '<label class="ap-btn' + (touch ? '' : ' g') + '" data-cam="1">&#128444; Choose photos (1&ndash;' + MAX + ')<input type="file" accept="image/*" multiple data-ap="pick"/></label>'
      + '<label class="ap-btn" data-cam="1">&#128196; PDF bill<input type="file" accept="application/pdf,.pdf" data-ap="pdf"/></label>'
      + '</div>'
      + '<div class="ap-thumbs" id="' + id + '-t"></div>'
      + '<div class="ap-st" id="' + id + '-s">Long bill? ' + (touch ? 'Press <b>Take photo</b> again for each page' : 'Choose all its photos together') + ' (up to ' + MAX + '). Pages without a heading are fine &mdash; they are read in order as one bill. You can also drag the photos or the PDF here.</div>'
      + '<div style="margin-top:10px;display:none" id="' + id + '-go"><button type="button" class="ap-btn g" id="' + id + '-read">&#128269; Read the bill</button> <button type="button" class="ap-btn" id="' + id + '-clr">Clear</button></div></div>';
    var $ = function (s) { return document.getElementById(id + s); };
    function paint(state) {
      $('-t').innerHTML = P.map(function (p, i) {
        return '<div class="ap-th' + (state && state[i] ? ' st-' + state[i] : '') + '"><img src="' + p.data + '" alt="page ' + (i + 1) + '" data-v="' + i + '" title="Tap to see it big and zoom" style="cursor:zoom-in"/><b>' + (i + 1) + '</b>'
          + (busy ? '' : '<button type="button" data-x="' + i + '" title="Remove">&#10005;</button><div class="mv"><button type="button" data-l="' + i + '" title="Move left">&#8592;</button><button type="button" data-r="' + i + '" title="Move right">&#8594;</button></div>') + '</div>';
      }).join('')
        /* like WhatsApp: after the first photo, a "+ Add more" box for the next pages */
        + (P.length && P.length < MAX && !busy
          ? (touch ? '<label class="ap-more" data-cam="1" title="Take the next page"><span>&#128247;</span>Next page<input type="file" accept="image/*" capture="environment" data-ap="cam"/></label>' : '')
            + '<label class="ap-more" data-cam="1" title="Add more photos or a PDF"><span>&#65291;</span>Add more<input type="file" accept="image/*,application/pdf,.pdf" multiple data-ap="more"/></label>'
          : '');
      $('-go').style.display = P.length ? 'block' : 'none';
      $('-read').innerHTML = '&#128269; Read the bill (' + P.length + ' page' + (P.length === 1 ? '' : 's') + ')';
      [].forEach.call(host.querySelectorAll('.ap-btn'), function (b) { if (busy) b.setAttribute('disabled', ''); else b.removeAttribute('disabled'); });
    }
    async function add(files) {
      if (busy || !files || !files.length) return;
      if (done) { P = []; done = false; }   /* the last bill was read: these photos start a NEW bill */
      var room = MAX - P.length; if (room <= 0) { $('-s').innerHTML = '<span style="color:var(--red)">Up to ' + MAX + ' pages at a time. Read these first.</span>'; return; }
      $('-s').textContent = 'Preparing the pages…';
      try {
        var r = await toPages([].slice.call(files), room); P = P.concat(r.pages);
        $('-s').innerHTML = P.length + ' page' + (P.length === 1 ? '' : 's') + ' ready. Check the order (page 1 = the page with the bill heading), then press <b>Read the bill</b>.' + (r.notes.length ? '<br><span style="color:var(--amber,#b45309)">' + esc(r.notes.join(' ')) + '</span>' : '');
      } catch (e) { $('-s').innerHTML = '<span style="color:var(--red)">&#9888; ' + esc(e.message || e) + '</span>'; }
      paint();
    }
    host.addEventListener('change', function (e) {
      var t = e.target; if (!t || !t.getAttribute || !t.getAttribute('data-ap')) return;
      var fs = t.files; add(fs).then(function () { t.value = ''; });
    });
    host.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-v');
      if (v != null && window.AuraDocs) { AuraDocs.view(P.map(function (p) { return p.data; }), 'Bill pages', +v); return; }   /* tap a page: see it big, zoom in */
      var b = e.target.closest && e.target.closest('button'); if (!b || busy) return;
      var x = b.getAttribute('data-x'), l = b.getAttribute('data-l'), r = b.getAttribute('data-r');
      if (x != null) { P.splice(+x, 1); paint(); }
      else if (l != null && +l > 0) { var a = P[+l]; P[+l] = P[+l - 1]; P[+l - 1] = a; paint(); }
      else if (r != null && +r < P.length - 1) { var c = P[+r]; P[+r] = P[+r + 1]; P[+r + 1] = c; paint(); }
    });
    /* drag photos or a PDF anywhere on this box; Ctrl+V a copied picture while this box is on screen */
    function filesOf(dt) { return [].slice.call((dt && dt.files) || []).filter(function (f) { return /^image\//.test(f.type) || /pdf/i.test(f.type) || /\.pdf$/i.test(f.name); }); }
    host.addEventListener('dragover', function (e) { if (busy) return; var t = [].slice.call(e.dataTransfer.types || []); if (t.indexOf('Files') < 0) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; host.style.outline = '2px dashed var(--green)'; });
    host.addEventListener('dragleave', function () { host.style.outline = ''; });
    host.addEventListener('drop', function (e) { host.style.outline = ''; var fs = filesOf(e.dataTransfer); if (!fs.length || busy) return; e.preventDefault(); e.stopPropagation(); add(fs); });
    window.addEventListener('paste', function (e) {
      if (busy || !host.offsetParent || e.defaultPrevented) return;
      var fs = [].slice.call((e.clipboardData && e.clipboardData.items) || []).filter(function (it) { return it.kind === 'file'; }).map(function (it) { return it.getAsFile(); }).filter(Boolean);
      fs = fs.filter(function (f) { return /^image\//.test(f.type) || /pdf/i.test(f.type); }); if (!fs.length) return;
      e.preventDefault(); add(fs);
    }, true);
    $('-clr').onclick = function () { if (busy) return; P = []; paint(); $('-s').textContent = 'Cleared.'; };
    $('-read').onclick = async function () {
      if (busy || !P.length) return; busy = true; var state = P.map(function () { return ''; }); paint(state);
      var t0 = Date.now();
      $('-s').innerHTML = '<span class="spin" style="display:inline-block;width:14px;height:14px;vertical-align:middle;border-width:2px"></span> Reading ' + P.length + ' page' + (P.length === 1 ? '' : 's') + '… about ' + (P.length === 1 ? '15&ndash;30 seconds' : (P.length <= 4 ? '30&ndash;60 seconds' : '1&ndash;2 minutes')) + '.';
      var result;
      try {
        result = await readBill(P, opt.extra || (opt.module ? { module: opt.module } : null), function (i, st, info) {
          state[i] = st; paint(state);
          if (st === 'ok' || st === 'bad') $('-s').innerHTML = 'Page ' + (i + 1) + ': ' + (st === 'ok' ? info + ' lines read' : '<span style="color:var(--red)">' + esc(info) + '</span>') + ' &middot; ' + Math.round((Date.now() - t0) / 1000) + ' s';
        });
      } catch (e) { result = { ok: false, message: e.message || String(e) }; }
      busy = false; paint(state);
      if (result && result.ok) {
        $('-s').innerHTML = '&#10003; ' + result.lines.length + ' lines read from ' + result.pages + ' page' + (result.pages === 1 ? '' : 's') + '.'
          + (result.page_errors.length ? ' <span style="color:var(--red)">Not read: ' + result.page_errors.map(function (x) { return 'page ' + x.page + ' (' + esc(x.message) + ')'; }).join(', ') + '. Take that page again, or type its lines.</span>' : '');
        result._first = P[0];
        var keep = P.slice(); P = []; done = true; paint();   /* clear the tray: the next photos are the next bill */
        $('-s').innerHTML += '<br><span class="tiny">The pages were cleared. Photos you add now start a new bill.</span>';
        if (opt.onRead) opt.onRead(result, keep);
        return;
      } else $('-s').innerHTML = '<span style="color:var(--red)">&#9888; ' + esc(result && result.message || 'Could not read the bill.') + '</span>';
      if (opt.onRead) opt.onRead(result, P.slice());
    };
    paint();
    return { add: add, clear: function () { P = []; paint(); }, pages: function () { return P.slice(); } };
  }

  window.AuraPages = { tray: tray, readBill: readBill, toPages: toPages, nameListOnly: nameListOnly, MAX: MAX };
})();
