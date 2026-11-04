/* aura-docs.js — every photo that is read is kept for future reference, and every photo can be opened and zoomed.
   AuraDocs.save({ module, kind, ref_no, party, doc_date, amount, pages })   pages: blobs / {blob} / storage paths
   AuraDocs.view(list, title, start)     list: storage paths, data: URLs or https URLs — full screen, zoom, move, rotate, download
   AuraDocs.panel(el, { module })        the "Photos" tab: every saved photo by date, kind, number and party
   Needs SQL 52 (table aura_docs). The pictures are in the private "bills" bucket. */
(function () {
  if (window.AuraDocs) return;
  var KIND = { purchase_bill: '🧾 Purchase bill', prescription: '📝 Prescription', order: '🛒 Order', transport: '🚚 Transport / L.R.', receipt: '💳 Payment receipt', party: '🪪 Party card / licence', lab: '🧪 Lab paper', other: '📄 Other' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function sb() { try { return _supa; } catch (e) { return null; } }
  function cid() { try { return _clinicId; } catch (e) { return null; } }
  function toast(m) { try { showToast(m); } catch (e) {} }

  var css = document.createElement('style');
  css.textContent = '.adv{position:fixed;inset:0;z-index:99990;background:rgba(8,14,12,.97);display:flex;flex-direction:column;color:#fff;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;user-select:none}'
    + '.adv-h{display:flex;align-items:center;gap:8px;padding:10px 12px;flex-wrap:wrap}.adv-h .t{flex:1;min-width:140px}.adv-h .t b{display:block;font-size:15px}.adv-h .t span{font-size:12px;opacity:.75}'
    + '.adv-h button,.adv-h a{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:9px;min-width:38px;height:36px;padding:0 10px;font:600 15px system-ui;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}'
    + '.adv-h button:hover,.adv-h a:hover{background:rgba(255,255,255,.22)}'
    + '.adv-s{flex:1;position:relative;overflow:hidden;touch-action:none;cursor:grab}.adv-s.drag{cursor:grabbing}'
    + '.adv-s img{position:absolute;left:50%;top:50%;max-width:none;transform-origin:0 0;box-shadow:0 10px 40px rgba(0,0,0,.5);background:#fff}'
    + '.adv-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:64px;border:0;border-radius:10px;background:rgba(255,255,255,.14);color:#fff;font-size:26px;cursor:pointer;z-index:2}'
    + '.adv-nav.l{left:10px}.adv-nav.r{right:10px}'
    + '.adv-th{display:flex;gap:8px;justify-content:center;padding:8px;overflow-x:auto}.adv-th img{height:54px;border-radius:6px;opacity:.55;cursor:pointer;border:2px solid transparent}.adv-th img.on{opacity:1;border-color:#3fb68b}'
    + '.adv-tip{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);font-size:12px;opacity:.7;pointer-events:none;white-space:nowrap}'
    + '.adp-f{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px}.adp-f label{font-size:12px;color:var(--text-secondary);display:block;margin-bottom:3px}'
    + '.adp-r{display:flex;gap:12px;align-items:center;padding:10px 4px;border-bottom:1px solid var(--border);cursor:pointer}.adp-r:hover{background:var(--surface2,var(--bg))}'
    + '.adp-r .th{width:56px;height:56px;border-radius:8px;background:var(--bg) center/cover no-repeat;border:1px solid var(--border);flex:none}'
    + '.adp-r .m{flex:1;min-width:0}.adp-r .m b{font-size:14px}.adp-r .m div{font-size:12px;color:var(--text-secondary)}.adp-r .w{text-align:right;font-size:12px;color:var(--text-secondary);white-space:nowrap}';
  document.head.appendChild(css);

  /* ---------- storage ---------- */
  var URLS = {};
  async function urlOf(x) {
    if (/^(data:|https?:|blob:)/.test(x)) return x;
    if (URLS[x] && URLS[x].t > Date.now()) return URLS[x].u;
    var r = await sb().storage.from('bills').createSignedUrl(x, 3600);
    if (r.error) throw r.error;
    URLS[x] = { u: r.data.signedUrl, t: Date.now() + 50 * 60000 };
    return r.data.signedUrl;
  }
  async function toBlob(p) {
    if (p instanceof Blob) return p;
    if (p && p.blob instanceof Blob) return p.blob;
    var d = typeof p === 'string' ? p : p && p.data;
    if (d && /^data:/.test(d)) return await (await fetch(d)).blob();
    return null;
  }
  /* keep the pages: upload new pictures, then one row with the date, time and details */
  async function save(meta) {
    try {
      if (!sb() || !cid() || !meta || !meta.pages || !meta.pages.length) return null;
      var now = new Date(), ym = now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2), stamp = now.getTime(), paths = [];
      for (var i = 0; i < meta.pages.length && i < 10; i++) {
        var p = meta.pages[i];
        if (typeof p === 'string' && !/^data:/.test(p)) { paths.push(p); continue; }   /* already in storage */
        var b = await toBlob(p); if (!b) continue;
        var path = cid() + '/docs/' + (meta.module || 'other') + '/' + ym + '/' + stamp + '-' + (i + 1) + '.jpg';
        var up = await sb().storage.from('bills').upload(path, b, { contentType: 'image/jpeg', upsert: true });
        if (!up.error) paths.push(path);
      }
      if (!paths.length) return null;
      var d = meta.doc_date && /^\d{4}-\d{2}-\d{2}$/.test(meta.doc_date) ? meta.doc_date : null;
      var row = { clinic_id: cid(), module: meta.module || 'other', kind: KIND[meta.kind] ? meta.kind : 'other', title: (meta.title || '').slice(0, 160) || null,
        ref_no: (meta.ref_no ? String(meta.ref_no) : '').slice(0, 80) || null, party: (meta.party ? String(meta.party) : '').slice(0, 160) || null,
        doc_date: d, amount: Number(meta.amount) > 0 ? Number(meta.amount) : null, pages: paths };
      var r = await sb().from('aura_docs').insert(row);
      if (r.error) { if (!/aura_docs/.test(r.error.message || '')) console.warn('aura-docs', r.error); return null; }
      return paths;
    } catch (e) { console.warn('aura-docs', e); return null; }
  }

  /* ---------- the viewer: zoom with the wheel, a pinch, + / -, double-click; drag to move; rotate; download ---------- */
  function view(list, title, start, sub) {
    list = (list || []).filter(Boolean); if (!list.length) return;
    var old = document.getElementById('adv'); if (old) old.remove();
    var i = Math.max(0, Math.min(list.length - 1, start || 0)), s = 1, x = 0, y = 0, rot = 0, fit = 1, img;
    var ov = document.createElement('div'); ov.className = 'adv'; ov.id = 'adv';
    ov.innerHTML = '<div class="adv-h"><div class="t"><b>' + esc(title || 'Photo') + '</b><span id="adv-n"></span>' + (sub ? '<span> &middot; ' + esc(sub) + '</span>' : '') + '</div>'
      + '<button data-a="out" title="Zoom out (-)">&minus;</button><button data-a="in" title="Zoom in (+)">&#65291;</button><button data-a="fit" title="Fit to screen (0)">&#9634;</button>'
      + '<button data-a="rot" title="Turn">&#10227;</button><a id="adv-dl" title="Open / download the original" target="_blank" rel="noopener">&#11015;</a><button data-a="x" title="Close (Esc)">&#10005;</button></div>'
      + '<div class="adv-s" id="adv-s"><img id="adv-i" alt=""/>' + (list.length > 1 ? '<button class="adv-nav l" data-a="prev">&#8249;</button><button class="adv-nav r" data-a="next">&#8250;</button>' : '')
      + '<div class="adv-tip">Scroll / pinch to zoom &middot; drag to move &middot; double-click to zoom in</div></div>'
      + (list.length > 1 ? '<div class="adv-th" id="adv-th"></div>' : '');
    document.body.appendChild(ov);
    img = ov.querySelector('#adv-i'); var stage = ov.querySelector('#adv-s');
    function apply() { img.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg) scale(' + s + ')'; }
    function center() {
      var W = stage.clientWidth, H = stage.clientHeight, w = img.naturalWidth || 1, h = img.naturalHeight || 1, sw = rot % 180 ? h : w, sh = rot % 180 ? w : h;
      fit = Math.min((W - 24) / sw, (H - 24) / sh, 1.5); s = fit;
      /* image placed at the centre: its top-left corner, after rotation about that corner */
      img.style.left = '0px'; img.style.top = '0px';
      var cx = W / 2, cy = H / 2, a = rot * Math.PI / 180, hw = w * s / 2, hh = h * s / 2;
      x = cx - (hw * Math.cos(a) - hh * Math.sin(a)); y = cy - (hw * Math.sin(a) + hh * Math.cos(a)); apply();
    }
    function zoomAt(k, px, py) {
      var ns = Math.max(fit * 0.5, Math.min(fit * 8, s * k)); k = ns / s;
      x = px - (px - x) * k; y = py - (py - y) * k; s = ns; apply();
    }
    async function show(n) {
      i = (n + list.length) % list.length; rot = 0;
      ov.querySelector('#adv-n').textContent = list.length > 1 ? 'Page ' + (i + 1) + ' of ' + list.length : '';
      img.style.opacity = '.3';
      try { var u = await urlOf(list[i]); img.onload = function () { img.style.opacity = '1'; center(); }; img.src = u; ov.querySelector('#adv-dl').href = u; }
      catch (e) { img.style.opacity = '1'; ov.querySelector('#adv-n').textContent = 'Could not open this photo: ' + (e.message || e); }
      var th = ov.querySelector('#adv-th');
      if (th) [].forEach.call(th.children, function (t, k) { t.classList.toggle('on', k === i); });
    }
    if (list.length > 1) {
      var th = ov.querySelector('#adv-th');
      list.forEach(function (p, k) { var t = document.createElement('img'); t.alt = 'page ' + (k + 1); t.onclick = function () { show(k); }; th.appendChild(t); urlOf(p).then(function (u) { t.src = u; }).catch(function () {}); });
    }
    function close() { ov.remove(); document.removeEventListener('keydown', key); }
    function key(e) {
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight' && list.length > 1) show(i + 1); else if (e.key === 'ArrowLeft' && list.length > 1) show(i - 1);
      else if (e.key === '+' || e.key === '=') zoomAt(1.25, stage.clientWidth / 2, stage.clientHeight / 2); else if (e.key === '-') zoomAt(0.8, stage.clientWidth / 2, stage.clientHeight / 2); else if (e.key === '0') center();
    }
    document.addEventListener('keydown', key);
    ov.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return; var a = b.getAttribute('data-a'), W = stage.clientWidth / 2, H = stage.clientHeight / 2;
      if (a === 'x') close(); else if (a === 'in') zoomAt(1.4, W, H); else if (a === 'out') zoomAt(0.7, W, H); else if (a === 'fit') center();
      else if (a === 'rot') { rot = (rot + 90) % 360; center(); } else if (a === 'prev') show(i - 1); else if (a === 'next') show(i + 1);
    });
    stage.addEventListener('wheel', function (e) { e.preventDefault(); var r = stage.getBoundingClientRect(); zoomAt(e.deltaY < 0 ? 1.15 : 0.87, e.clientX - r.left, e.clientY - r.top); }, { passive: false });
    stage.addEventListener('dblclick', function (e) { var r = stage.getBoundingClientRect(); if (s > fit * 1.5) center(); else zoomAt(2.5, e.clientX - r.left, e.clientY - r.top); });
    var pts = {}, last = null, pinch = null;
    stage.addEventListener('pointerdown', function (e) { if (e.target.closest('button')) return; stage.setPointerCapture(e.pointerId); pts[e.pointerId] = { x: e.clientX, y: e.clientY }; stage.classList.add('drag'); last = { x: e.clientX, y: e.clientY }; });
    stage.addEventListener('pointermove', function (e) {
      if (!pts[e.pointerId]) return; pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pts), r = stage.getBoundingClientRect();
      if (ids.length >= 2) {
        var a = pts[ids[0]], b = pts[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
        if (pinch) zoomAt(d / pinch, mx, my); pinch = d; return;
      }
      if (last) { x += e.clientX - last.x; y += e.clientY - last.y; apply(); } last = { x: e.clientX, y: e.clientY };
    });
    function up(e) { delete pts[e.pointerId]; if (Object.keys(pts).length < 2) pinch = null; if (!Object.keys(pts).length) { last = null; stage.classList.remove('drag'); } else { var k = Object.keys(pts)[0]; last = pts[k]; } }
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    window.addEventListener('resize', function () { if (document.getElementById('adv')) center(); });
    show(i);
  }

  /* ---------- the Photos tab ---------- */
  function panel(el, opt) {
    opt = opt || {}; if (!el) return;
    var mod = opt.module, PAGE = 40, rows = [], from = 0, more = false;
    if (!el.__adp) {
      el.__adp = true;
      el.innerHTML = '<h3 style="font-size:16px;margin-bottom:2px">&#128193; Saved photos</h3>'
        + '<p class="tiny" style="margin-bottom:12px">Every bill, prescription and paper photographed in AuraScale is kept here with its date and time &mdash; open it any day, even years later. Tap a row to see the photo; zoom in to read it.</p>'
        + '<div class="adp-f"><div><label>What</label><select class="finput" id="adp-k" style="width:190px"><option value="">All photos</option>' + Object.keys(KIND).map(function (k) { return '<option value="' + k + '">' + KIND[k] + '</option>'; }).join('') + '</select></div>'
        + '<div><label>From</label><input class="finput" type="date" id="adp-f" style="width:150px"/></div><div><label>To</label><input class="finput" type="date" id="adp-t" style="width:150px"/></div>'
        + '<div style="flex:1;min-width:180px"><label>Bill no. / name</label><input class="finput" id="adp-q" placeholder="e.g. SMA/26-27 or Cipla"/></div></div>'
        + '<div id="adp-l"></div><div style="text-align:center;margin-top:10px"><button class="btn btn-sm" id="adp-m" style="display:none">Show more</button></div>';
      var t = null, again = function () { clearTimeout(t); t = setTimeout(function () { load(true); }, 250); };
      ['adp-k', 'adp-f', 'adp-t'].forEach(function (id) { el.querySelector('#' + id).onchange = again; }); el.querySelector('#adp-q').oninput = again;
      el.querySelector('#adp-m').onclick = function () { load(false); };
      el.addEventListener('click', function (e) { var r = e.target.closest('.adp-r'); if (!r) return; var d = rows[+r.getAttribute('data-i')]; if (d) view(d.pages, KIND[d.kind] || 'Photo', 0, [d.ref_no, d.party, when(d.created_at)].filter(Boolean).join(' · ')); });
    }
    function when(t) { var d = new Date(t); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }); }
    async function load(reset) {
      if (reset) { rows = []; from = 0; }
      var L = el.querySelector('#adp-l'); if (reset) L.innerHTML = '<p class="tiny">Loading&hellip;</p>';
      var q = sb().from('aura_docs').select('*').eq('clinic_id', cid()).order('created_at', { ascending: false });
      if (mod) q = q.eq('module', mod);
      var k = el.querySelector('#adp-k').value, f = el.querySelector('#adp-f').value, t = el.querySelector('#adp-t').value, s = el.querySelector('#adp-q').value.trim().replace(/[,()%]/g, ' ');
      if (k) q = q.eq('kind', k); if (f) q = q.gte('created_at', f + 'T00:00:00+05:30'); if (t) q = q.lte('created_at', t + 'T23:59:59+05:30');
      if (s) q = q.or('ref_no.ilike.%' + s + '%,party.ilike.%' + s + '%');
      var r = await q.range(from, from + PAGE - 1);
      if (r.error) { L.innerHTML = '<p class="tiny" style="color:var(--red)">' + (/aura_docs/.test(r.error.message || '') ? 'Saved photos need SQL 52 to be run once on the server.' : esc(r.error.message)) + '</p>'; return; }
      var got = r.data || []; rows = rows.concat(got); from += got.length; more = got.length === PAGE;
      el.querySelector('#adp-m').style.display = more ? 'inline-flex' : 'none';
      if (!rows.length) { L.innerHTML = '<div class="muted" style="text-align:center;padding:24px">No saved photos yet. Photos of bills, prescriptions and orders appear here after they are used.</div>'; return; }
      L.innerHTML = rows.map(function (d, i) {
        return '<div class="adp-r" data-i="' + i + '"><div class="th" data-p="' + esc(d.pages[0]) + '"></div><div class="m"><b>' + esc(KIND[d.kind] || 'Photo') + (d.ref_no ? ' &middot; ' + esc(d.ref_no) : '') + '</b>'
          + '<div>' + esc(d.party || '') + (d.amount ? ' &middot; &#8377;' + Number(d.amount).toLocaleString('en-IN') : '') + (d.doc_date ? ' &middot; bill date ' + esc(d.doc_date.split('-').reverse().join('/')) : '') + '</div></div>'
          + '<div class="w">' + when(d.created_at) + '<br>' + d.pages.length + ' page' + (d.pages.length === 1 ? '' : 's') + (d.created_by_name ? ' &middot; ' + esc(String(d.created_by_name).split('@')[0]) : '') + '</div></div>';
      }).join('');
      [].forEach.call(L.querySelectorAll('.th[data-p]'), function (t) { urlOf(t.getAttribute('data-p')).then(function (u) { t.style.backgroundImage = 'url("' + u + '")'; }).catch(function () {}); });
    }
    load(true);
  }

  window.AuraDocs = { save: save, view: view, panel: panel, KIND: KIND };

  /* the old "open the photo in a new tab" buttons now open the zoom viewer */
  function takeOver() {
    window.rxPhotoOpen = function (p) { view([p], 'Prescription photo'); };
    window.viewBillPhoto = function (p) { view([p], 'Bill photo'); };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', takeOver); else takeOver();
  window.addEventListener('load', takeOver);
})();
