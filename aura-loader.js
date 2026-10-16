/* AuraScaleLoader: the one branded loading screen used by every AuraScale portal
   (owner, reception, doctor, pharmacy, lab, patient health book, admin).

   Look: the real AuraScale mark in the middle of a light screen, a thin AuraScale-green arc
   travelling round it, and a quiet "Loading AuraScale" label underneath. No black, no generic spinner.

   Use:
     <div id="loading" class="aura-loader" data-label="Loading AuraScale"></div>
     <script>AuraLoader.fill('loading')</script>     (fills that element straight away, before first paint)
     AuraLoader.show('Opening your health book')   (full-screen overlay from code)
     AuraLoader.hide()
   prefers-reduced-motion: the arc does not spin; the mark gently fades instead. */
(function () {
  if (window.AuraLoader) return;
  var MARK = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFCQjg4MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwQTZCNEIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgIDxwYXRoIGQ9Ik0gMjI3IDEzMyBBIDExOCAxMTggMCAwIDEgNDEzIDEzMyIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC4zOCIvPgogICAgPHBhdGggZD0iTSAyNjIgMTU0IEEgNzggNzggMCAwIDEgMzc4IDE1NCIgc3Ryb2tlLXdpZHRoPSIxNiIgb3BhY2l0eT0iMC43Ii8+CiAgPC9nPgogIDxwYXRoIGQ9Ik0gMTk2IDQ1MiBMIDMyMCAyMTQgTCA0NDQgNDUyIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxnIGZpbGw9IiM3Q0U2QkMiPgogICAgPHJlY3QgeD0iMjg0IiB5PSIzNDgiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjEyIi8+CiAgICA8cmVjdCB4PSIzMDgiIHk9IjMyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjcyIiByeD0iMTIiLz4KICA8L2c+Cjwvc3ZnPgo=';
  var css = ''
    + '.aura-loader{position:fixed;inset:0;z-index:99990;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;'
    +   'background:#F5F7F4;color:#5B6B63;font:600 13px Manrope,"Plus Jakarta Sans","Noto Sans Bengali",system-ui,sans-serif;letter-spacing:.02em}'
    + 'html[data-theme="dark"] .aura-loader{background:#0E1411;color:#84948C}'
    + '.aura-loader .al-box{position:relative;width:84px;height:84px}'
    + '.aura-loader .al-logo{position:absolute;inset:16px;border-radius:13px;background:url("' + MARK + '") center/126% no-repeat;'
    +   'box-shadow:0 6px 18px rgba(11,107,74,.22);animation:alBreathe 1.8s ease-in-out infinite}'
    + '.aura-loader svg{position:absolute;inset:0;width:84px;height:84px;animation:alSpin 1.1s cubic-bezier(.55,.15,.45,.85) infinite}'
    + '.aura-loader .al-track{stroke:#DCEAE2}html[data-theme="dark"] .aura-loader .al-track{stroke:#1E3329}'
    + '.aura-loader .al-arc{stroke:#0B6B4A}html[data-theme="dark"] .aura-loader .al-arc{stroke:#3FB68B}'
    + '.aura-loader .al-label{margin:0;max-width:300px;text-align:center;line-height:1.5}'
    + '.aura-loader.al-overlay{transition:opacity .2s ease}.aura-loader.al-overlay.al-off{opacity:0}'
    + '@keyframes alSpin{to{transform:rotate(360deg)}}'
    + '@keyframes alBreathe{0%,100%{transform:scale(1)}50%{transform:scale(.94)}}'
    + '@keyframes alFade{0%,100%{opacity:1}50%{opacity:.55}}'
    + '@media (prefers-reduced-motion:reduce){.aura-loader svg{animation:none}.aura-loader .al-logo{animation:alFade 1.6s ease-in-out infinite}}';
  var st = document.createElement('style'); st.id = 'aura-loader-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function inner(label) {
    return '<div class="al-box" role="img" aria-label="AuraScale">'
      + '<svg viewBox="0 0 84 84" aria-hidden="true"><circle class="al-track" cx="42" cy="42" r="39" fill="none" stroke-width="3"/>'
      + '<circle class="al-arc" cx="42" cy="42" r="39" fill="none" stroke-width="3" stroke-linecap="round" stroke-dasharray="62 183" transform="rotate(-90 42 42)"/></svg>'
      + '<div class="al-logo"></div></div>'
      + '<p class="al-label" role="status" aria-live="polite">' + (label || 'Loading AuraScale') + '</p>';
  }
  var overlay = null, hideTimer = null;
  window.AuraLoader = {
    /* turn an existing element (e.g. #loading) into the branded loader */
    fill: function (id, label) {
      var el = typeof id === 'string' ? document.getElementById(id) : id;
      if (!el) return;
      el.classList.add('aura-loader');
      el.innerHTML = inner(label || el.getAttribute('data-label'));
    },
    show: function (label) {
      clearTimeout(hideTimer);
      if (!overlay) {
        overlay = document.createElement('div'); overlay.className = 'aura-loader al-overlay'; overlay.id = 'aura-loader';
        overlay.innerHTML = inner(label);
        (document.body || document.documentElement).appendChild(overlay);
      } else if (label) { AuraLoader.text(label); }
    },
    text: function (t) { var p = overlay && overlay.querySelector('.al-label'); if (p) p.textContent = t; },
    hide: function () {
      if (!overlay) return; var o = overlay; overlay = null;
      o.classList.add('al-off'); hideTimer = setTimeout(function () { o.remove(); }, 200);
    },
    isOn: function () { return !!overlay; }
  };
})();
