/* aura-drop.js — drag & drop and paste for EVERY photo / file box in AuraScale.
   Drag a picture (or PDF / Excel where the box takes it) from Chrome's download list, a folder, or another tab,
   and drop it on the photo button: it works exactly as if the file was chosen with "Choose photo".
   Ctrl+V also works: copy a picture (e.g. WhatsApp → right-click → Copy image) and paste it on the page.
   No page needs changes: labels with a file box, visible file boxes, and buttons that open a file box
   (onclick="...click()" or an upload function) all become drop targets by themselves. */
(function () {
  if (window.__auraDrop) return; window.__auraDrop = true;

  var css = document.createElement('style');
  css.textContent = '.aura-drop-on{outline:2px dashed #12976A!important;outline-offset:3px!important;transition:outline-color .1s}'
    + '.aura-drop-hot{outline:3px solid #12976A!important;background-color:rgba(18,151,106,.12)!important}'
    + '.aura-drop-tip{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147483000;background:#0f2a20;color:#fff;'
    + 'padding:10px 18px;border-radius:999px;font:600 13px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.25);pointer-events:none;max-width:92vw;text-align:center}';
  (document.head || document.documentElement).appendChild(css);

  /* a button that only opens a hidden file box: onclick="document.getElementById('x').click()" */
  var BYID = /getElementById\(\s*['"]([^'"]+)['"]\s*\)\.click\(\)/;

  function isFile(el) { return el && el.tagName === 'INPUT' && el.type === 'file' && !el.disabled; }
  function shown(el) {
    if (!el || !el.getClientRects().length) return false;
    var s = getComputedStyle(el); return s.visibility !== 'hidden' && s.display !== 'none';
  }
  /* the file box an element opens without running anything (labels and the box itself) */
  function directInput(el) {
    if (isFile(el)) return el;
    if (el.tagName === 'LABEL') { var c = el.control || el.querySelector('input[type="file"]'); return isFile(c) ? c : null; }
    var f = el.getAttribute && el.getAttribute('data-drop-for'); if (f) { var i = document.getElementById(f); return isFile(i) ? i : null; }
    return null;
  }
  function isTarget(el) {
    if (!el || el.nodeType !== 1 || el.closest('[data-drop-skip]')) return false;
    if (directInput(el)) return true;
    var oc = el.getAttribute('onclick') || ''; if (!oc) return false;
    var m = BYID.exec(oc); return !!m && isFile(document.getElementById(m[1]));
  }
  /* the overlay / popup an element is in (position: fixed ancestor), so an open popup wins over the page behind it */
  function overlayOf(el) {
    for (var e = el; e && e !== document.body; e = e.parentElement) { if (getComputedStyle(e).position === 'fixed') return e; }
    return null;
  }
  function targets() {
    var all = [].filter.call(document.querySelectorAll('label, input[type="file"], [onclick], [data-drop-for]'), function (el) {
      if (!isTarget(el)) return false;
      if (isFile(el)) return shown(el);
      return shown(el);
    });
    /* "Take photo" + "Choose photo" are one box: keep the one without the camera */
    all = all.filter(function (el) {
      var i = directInput(el); if (!i || !i.hasAttribute('capture')) return true;
      return !all.some(function (o) { return o !== el && o.parentNode === el.parentNode && directInput(o) && !directInput(o).hasAttribute('capture'); });
    });
    var inPop = all.filter(function (el) { return overlayOf(el); });
    return inPop.length ? inPop : all;
  }
  function targetFrom(node, list) {
    for (var e = node; e && e !== document; e = e.parentNode) { if (list.indexOf(e) >= 0) return e; }
    return null;
  }
  /* fall back to the only box in the same popup / card / section */
  function nearest(node, list) {
    var t = targetFrom(node, list); if (t) return t;
    var box = node && node.closest ? node.closest('.modal, [role="dialog"], .card, .panel, section, .d-view') : null;
    if (box) { var inBox = list.filter(function (el) { return box.contains(el); }); if (inBox.length === 1) return inBox[0]; }
    return list.length === 1 ? list[0] : null;
  }

  function accepts(input, file) {
    var acc = (input.getAttribute('accept') || '').toLowerCase().split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!acc.length) return true;
    var type = (file.type || '').toLowerCase(), name = (file.name || '').toLowerCase();
    return acc.some(function (a) {
      if (a.charAt(0) === '.') return name.slice(-a.length) === a;
      if (/\/\*$/.test(a)) return type.indexOf(a.slice(0, -1)) === 0;
      return type === a;
    });
  }
  function nameFor(type, url) {
    var ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'application/pdf': 'pdf' }[type] || 'bin';
    var m = /\/([^\/?#]+\.(jpe?g|png|webp|gif|pdf))(?:[?#]|$)/i.exec(url || '');
    return m ? m[1] : 'picture-' + Date.now() + '.' + ext;
  }
  /* the files in a drop: real files, or a picture dragged from another tab (its address) */
  async function filesOf(dt) {
    var out = [].slice.call(dt.files || []);
    if (out.length) return out;
    [].forEach.call(dt.items || [], function (it) { if (it.kind === 'file') { var f = it.getAsFile(); if (f) out.push(f); } });
    if (out.length) return out;
    var url = (dt.getData('text/uri-list') || '').split(/\r?\n/).filter(function (l) { return l && l.charAt(0) !== '#'; })[0] || '';
    if (!url) { var m = /<img[^>]+src="([^"]+)"/i.exec(dt.getData('text/html') || ''); if (m) url = m[1].replace(/&amp;/g, '&'); }
    if (!url) return out;
    try {
      var r = await fetch(url); if (!r.ok) throw new Error('fetch');
      var b = await r.blob(); if (!b.size) throw new Error('empty');
      out.push(new File([b], nameFor(b.type, url), { type: b.type || 'image/jpeg' }));
    } catch (e) { out.fromTab = true; }
    return out;
  }
  /* which file box an element opens: labels directly; buttons by running their own click (it may note which patient etc.)
     with the file picker caught, so no "choose file" window opens */
  function inputOf(el) {
    var d = directInput(el); if (d) return d;
    var m = BYID.exec(el.getAttribute('onclick') || ''); if (!m) return null;
    var got = null, orig = HTMLInputElement.prototype.click;
    var stop = function (e) { e.preventDefault(); };
    HTMLInputElement.prototype.click = function () { if (this.type === 'file') { got = this; return; } return orig.apply(this, arguments); };
    el.addEventListener('click', stop);
    try { el.click(); } catch (e) {} finally { HTMLInputElement.prototype.click = orig; el.removeEventListener('click', stop); }
    return got;
  }
  function say(msg) {
    if (typeof window.showToast === 'function') { try { window.showToast(msg); return; } catch (e) {} }
    tip(msg); setTimeout(function () { tip(''); }, 3500);
  }
  function give(el, files) {
    var input = inputOf(el);
    if (!input) { say('This button does not take a file. Drop the picture on a photo button.'); return false; }
    var ok = files.filter(function (f) { return accepts(input, f); });
    if (!ok.length) { say('This box does not take that kind of file (' + (files[0].type || files[0].name || 'unknown') + ').'); return false; }
    if (!input.multiple) ok = ok.slice(0, 1);
    var dt = new DataTransfer(); ok.forEach(function (f) { dt.items.add(f); });
    input.files = dt.files;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  var tipEl = null;
  function tip(text) {
    if (!text) { if (tipEl) { tipEl.remove(); tipEl = null; } return; }
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'aura-drop-tip'; document.body.appendChild(tipEl); }
    tipEl.textContent = text;
  }
  var lit = [], hot = null, clearT = 0;
  function clear() { lit.forEach(function (el) { el.classList.remove('aura-drop-on', 'aura-drop-hot'); }); lit = []; hot = null; tip(''); }
  function carries(dt) { var t = [].slice.call((dt && dt.types) || []); return t.indexOf('Files') >= 0 || t.indexOf('text/uri-list') >= 0; }

  function over(e) {
    if (e.defaultPrevented || !carries(e.dataTransfer)) return;
    var list = targets(); if (!list.length) return;
    e.preventDefault(); e.dataTransfer.dropEffect = 'copy';
    clearTimeout(clearT); clearT = setTimeout(clear, 400);   /* dragging stopped or left the window */
    if (!lit.length) { lit = list; list.forEach(function (el) { el.classList.add('aura-drop-on'); }); tip('Drop the picture on a highlighted button'); }
    var t = nearest(e.target, lit);
    if (t !== hot) { if (hot) hot.classList.remove('aura-drop-hot'); hot = t; if (hot) hot.classList.add('aura-drop-hot'); }
  }
  window.addEventListener('dragenter', over);
  window.addEventListener('dragover', over);
  window.addEventListener('drop', async function (e) {
    if (e.defaultPrevented || !carries(e.dataTransfer)) { clear(); return; }
    var list = lit.length ? lit : targets(); if (!list.length) { clear(); return; }
    e.preventDefault();
    var t = nearest(e.target, list); clear(); clearTimeout(clearT);
    if (!t) { say('Drop the picture on one of the photo buttons.'); return; }
    var files = await filesOf(e.dataTransfer);
    if (!files.length) {
      say(files.fromTab ? 'That picture cannot be taken straight from the other tab. Right-click it → Copy image, then press Ctrl+V here (or download it and drag it from the download list).'
                        : 'Could not read that item. Drag the picture file itself.');
      return;
    }
    give(t, files);
  });

  /* Ctrl+V a copied picture: goes to the only photo box on screen (or in the open popup) */
  window.addEventListener('paste', function (e) {
    if (e.defaultPrevented) return;
    var files = [].slice.call((e.clipboardData && e.clipboardData.items) || []).filter(function (it) { return it.kind === 'file'; }).map(function (it) { return it.getAsFile(); }).filter(Boolean);
    if (!files.length) return;
    var list = targets().filter(function (el) { var i = directInput(el); return !i || files.some(function (f) { return accepts(i, f); }); });
    if (!list.length) return;
    e.preventDefault();
    if (list.length > 1) {
      var a = document.activeElement, t = a && targetFrom(a, list);
      if (!t) { say('There is more than one photo box here. Drag the picture onto the one you want.'); return; }
      give(t, files); return;
    }
    give(list[0], files);
  });
})();
