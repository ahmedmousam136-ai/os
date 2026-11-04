/* aura-sticky.js — the top of the page stays in place while the list scrolls (like Facebook).
   Stays on screen: the page header, the tab bar, and in every tab its tools above the list
   (numbers, search, filters, buttons such as "Change GST of many", "Return to supplier", "Suppliers")
   and the list's column headings (Medicine, In stock, Nearest expiry, MRP, GST, Status).
   Works on Pharmacy, Wholesale and Lab without changing their pages. */
(function () {
  if (window.__auraSticky) return; window.__auraSticky = true;
  var root = document.documentElement;
  var css = document.createElement('style');
  css.textContent = ':root{--ast-top:0px;--ast-tabs:0px}'
    + '@media (min-width:901px){'
    +   '.ast-tbl.ast-fit{overflow-x:clip!important}'
    +   '.ast-fit>.dt>thead>tr>th,.ast-fit>table>thead>tr>th{position:sticky;top:calc(var(--ast-top) + var(--ast-tabs) + var(--ast-head,0px));z-index:15;background:var(--surface);box-shadow:inset 0 -1px 0 var(--border)}'
    + '}'
    + '.ast-head{position:sticky;top:calc(var(--ast-top) + var(--ast-tabs));z-index:20;background:var(--surface);margin:-16px -16px 10px;padding:16px 16px 6px;border-radius:inherit}'
    + '.ast-head.ast-stuck{box-shadow:0 6px 12px -8px rgba(0,0,0,.18);border-bottom:1px solid var(--border)}'
    + '@media (max-width:900px){.ast-head{margin:-12px -12px 10px;padding:12px 12px 6px}}';
  document.head.appendChild(css);

  function h(el) { return el ? el.getBoundingClientRect().height : 0; }
  function setTops() {
    var top = document.querySelector('.d-top'), tabs = document.querySelector('.d-tabs');
    var tp = top ? getComputedStyle(top).position : '';
    /* the header only counts when it really stays at the top (sticky / fixed); on the wide layout it scrolls away */
    root.style.setProperty('--ast-top', top && (tp === 'sticky' || tp === 'fixed') && getComputedStyle(top).display !== 'none' ? Math.round(h(top)) + 'px' : '0px');
    /* the tab bar is a side menu (wide screens) or a bottom bar (phones): it only counts when it sits sticky above the page */
    root.style.setProperty('--ast-tabs', tabs && getComputedStyle(tabs).position === 'sticky' ? Math.round(h(tabs)) + 'px' : '0px');
  }

  /* in each tab: the controls above its first list become one sticky block */
  function prepare(view) {
    if (view.__ast) return; view.__ast = true;
    var kids = [].slice.call(view.children), ti = -1;
    for (var i = 0; i < kids.length; i++) { if (kids[i].querySelector && (kids[i].matches('table') || kids[i].querySelector('table.dt'))) { ti = i; break; } }
    if (ti <= 0) return;
    var before = kids.slice(0, ti).filter(function (k) { return k.tagName !== 'SCRIPT' && k.tagName !== 'STYLE'; });
    /* only short tool bars: never a whole form */
    if (before.some(function (k) { return k.matches('form, details, .modal') || (k.querySelectorAll && k.querySelectorAll('input:not([type=file]),select,textarea').length > 6); })) return;
    var wrap = document.createElement('div'); wrap.className = 'ast-head';
    view.insertBefore(wrap, before[0]);
    before.forEach(function (k) { wrap.appendChild(k); });
    var tbl = kids[ti]; if (!tbl.matches('table')) tbl.classList.add('ast-tbl');
    view.__astHead = wrap; view.__astTbl = tbl;
    if (window.ResizeObserver) new ResizeObserver(function () { measure(view); }).observe(wrap);
  }
  function measure(view) {
    var wrap = view.__astHead; if (!wrap) return;
    if (!view.classList.contains('on')) return;
    /* a tall block (many tool rows on a small screen) would hide the list: then it is not kept on screen */
    var full = h(wrap), lim = window.innerHeight * 0.42, shown = full;
    wrap.style.position = ''; wrap.style.top = '';
    if (full > lim) {
      /* too tall (a phone): the number boxes scroll away and only the search / filter row onwards stays on screen */
      var sub = [].filter.call(wrap.children, function (k) { return k.querySelector && k.querySelector('input:not([type=file]):not([type=checkbox]), .seg'); })[0];
      var off = sub ? sub.offsetTop : 0;
      shown = full - off;
      if (sub && shown <= lim) wrap.style.top = 'calc(var(--ast-top) + var(--ast-tabs) - ' + off + 'px)';
      else { wrap.style.position = 'static'; shown = 0; }
    }
    view.style.setProperty('--ast-head', shown ? Math.round(shown - 6) + 'px' : '0px');
    var t = view.__astTbl;
    if (t && t.classList.contains('ast-tbl')) {
      var tb = t.querySelector('table'); t.classList.remove('ast-fit');
      if (tb && tb.scrollWidth <= t.clientWidth + 2) t.classList.add('ast-fit');
    }
  }
  function all() {
    setTops();
    [].forEach.call(document.querySelectorAll('.d-view'), function (v) { prepare(v); measure(v); });
  }
  function onScroll() {
    [].forEach.call(document.querySelectorAll('.d-view.on .ast-head'), function (w) {
      var top = parseFloat(getComputedStyle(w).top) || 0;
      w.classList.toggle('ast-stuck', w.getBoundingClientRect().top <= top + 0.5 && window.scrollY > 4);
    });
  }
  function start() {
    all();
    window.addEventListener('resize', all);
    window.addEventListener('scroll', onScroll, { passive: true });
    /* tabs switch by adding "on": measure the tab that just opened */
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { if (m.target.classList && m.target.classList.contains('d-view') && m.target.classList.contains('on')) setTimeout(function () { measure(m.target); onScroll(); }, 30); });
    }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
    if (window.ResizeObserver) { var top = document.querySelector('.d-top'); if (top) new ResizeObserver(setTops).observe(top); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('load', all);
})();
