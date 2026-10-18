/* AuraScale colour themes: one file for every portal (owner, reception, doctor, admin, pharmacy, lab).

   Tapping the Theme button now opens a small picker with 10 themes:
     Light and Dark (the two that already existed) plus Sage Mist, Ocean Care, Lavender Calm, Teal Sand,
     Rose Clinic, Saffron Sun, Forest Night and Midnight Blue.
   The choice is saved on that device and applies to every portal opened on it.

   How it fits with the existing code: each page still has its own toggleTheme() and still reads the old
   "nh-theme" setting (light / dark). This file keeps "nh-theme" set to the base of the chosen theme, so
   the rest of the page behaves exactly as before, and adds data-aura-theme="<id>" for the colour layer.
   The AuraScale logo and the bed-status colours never change. */
(function () {
  var KEY = 'aura-theme';
  var THEMES = [
    { id: 'light', name: 'Light', base: 'light', sw: ['#F5F7F4', '#FFFFFF', '#0B6B4A'] },
    { id: 'dark', name: 'Dark', base: 'dark', sw: ['#0E1411', '#161F1A', '#3FB68B'] },
    { id: 'sage', name: 'Sage Mist', base: 'light', side: 'light', t: {
      bg: '#EEF3EF', surface: '#FFFFFF', surface2: '#F6FAF7', border: '#DCE6DF', borderMid: '#C9D8CE',
      t1: '#15211B', t2: '#3F5148', t3: '#5B6B63', acc: '#0B6B4A', accBg: '#E3F2EA', accBorder: '#B9DCCB',
      side: '#E4EEE7', sideT: '#15211B', sideT2: '#3F5148', sideT3: '#5B6B63', sideLine: '#D3E2D8',
      sideHover: '#D8E7DD', sideOn: '#0B6B4A', navOn: '#FFFFFF', scale: '#0B8A5C' } },
    { id: 'ocean', name: 'Ocean Care', base: 'light', side: 'dark', t: {
      bg: '#EDF2F7', surface: '#FFFFFF', surface2: '#F5F8FB', border: '#D9E2EC', borderMid: '#C5D2E0',
      t1: '#13202E', t2: '#3E5063', t3: '#5A6B7D', acc: '#1F6FB0', accBg: '#E3EFFA', accBorder: '#B5D2EE',
      side: '#0F3352', sideT: '#FFFFFF', sideT2: '#C9DAEB', sideT3: '#8FAAC6', sideLine: '#1C4A72',
      sideHover: '#18456B', sideOn: '#2A7DBE', navOn: '#FFFFFF', scale: '#5FD1A6' } },
    { id: 'lavender', name: 'Lavender Calm', base: 'light', side: 'light', t: {
      bg: '#F3F1F8', surface: '#FFFFFF', surface2: '#F8F6FC', border: '#E3DEEF', borderMid: '#D3CBE7',
      t1: '#1F1A2E', t2: '#4E4665', t3: '#675F7C', acc: '#5B4BA6', accBg: '#EDE9FA', accBorder: '#CFC6EE',
      side: '#EBE6F6', sideT: '#1F1A2E', sideT2: '#4E4665', sideT3: '#675F7C', sideLine: '#DDD5EE',
      sideHover: '#E0D8F1', sideOn: '#5B4BA6', navOn: '#FFFFFF', scale: '#0B8A5C' } },
    { id: 'tealsand', name: 'Teal Sand', base: 'light', side: 'dark', t: {
      bg: '#F4EFE7', surface: '#FFFDF9', surface2: '#FAF6EF', border: '#E6DDD0', borderMid: '#D8CCBA',
      t1: '#1E211F', t2: '#4E4B44', t3: '#6A665D', acc: '#0E7C7B', accBg: '#E1F1EF', accBorder: '#AFD8D4',
      side: '#0E5E5C', sideT: '#FFFFFF', sideT2: '#D3EAE7', sideT3: '#9CC8C3', sideLine: '#1C716E',
      sideHover: '#167270', sideOn: '#F2E4CC', navOn: '#0E5E5C', scale: '#8FE0C4' } },
    { id: 'rose', name: 'Rose Clinic', base: 'light', side: 'light', t: {
      bg: '#FAF0F2', surface: '#FFFFFF', surface2: '#FDF7F8', border: '#F0DDE2', borderMid: '#E5C9D1',
      t1: '#2A1A1F', t2: '#5E434A', t3: '#7A5F66', acc: '#B03A5B', accBg: '#FBE7EC', accBorder: '#EFBFCC',
      side: '#F5E3E8', sideT: '#2A1A1F', sideT2: '#5E434A', sideT3: '#7A5F66', sideLine: '#EED3DA',
      sideHover: '#F0D7DE', sideOn: '#B03A5B', navOn: '#FFFFFF', scale: '#0B8A5C' } },
    { id: 'saffron', name: 'Saffron Sun', base: 'light', side: 'dark', t: {
      bg: '#FBF6EC', surface: '#FFFFFF', surface2: '#FDFAF3', border: '#EEE3CF', borderMid: '#E2D2B4',
      t1: '#22200F', t2: '#524C38', t3: '#6E6650', acc: '#C9731A', accBg: '#FCEFD9', accBorder: '#F0CF9E',
      side: '#1E4D3A', sideT: '#FFFFFF', sideT2: '#D3E5DA', sideT3: '#A3C4B2', sideLine: '#2B5E49',
      sideHover: '#275E48', sideOn: '#F2A23A', navOn: '#2B1C00', scale: '#F6C163' } },
    { id: 'forest', name: 'Forest Night', base: 'dark', side: 'dark', t: {
      bg: '#122520', surface: '#1A332B', surface2: '#1F3B32', border: '#24453A', borderMid: '#2F5547',
      t1: '#E8F3EE', t2: '#BFD3CA', t3: '#9DB8AC', acc: '#3FB68B', accBg: '#173F31', accBorder: '#2A6650',
      side: '#0D1D18', sideT: '#E8F3EE', sideT2: '#BFD3CA', sideT3: '#9DB8AC', sideLine: '#1A332B',
      sideHover: '#163029', sideOn: '#1F5A44', navOn: '#B9F2D9', scale: '#5FD3A3' } },
    { id: 'midnight', name: 'Midnight Blue', base: 'dark', side: 'dark', t: {
      bg: '#0F1A2B', surface: '#16253B', surface2: '#1B2C45', border: '#22344F', borderMid: '#2D4363',
      t1: '#E7EEF8', t2: '#BCCADC', t3: '#93A6C0', acc: '#4FA8E8', accBg: '#173554', accBorder: '#2B5A85',
      side: '#0A1322', sideT: '#E7EEF8', sideT2: '#BCCADC', sideT3: '#93A6C0', sideLine: '#16253B',
      sideHover: '#13213A', sideOn: '#1D3E66', navOn: '#BFE0FF', scale: '#5FD3A3' } }
  ];
  THEMES.forEach(function (th) { if (th.t) th.sw = [th.t.bg, th.t.side, th.t.acc]; });
  function find(id) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i]; return null; }
  function stored() {
    var id = null; try { id = localStorage.getItem(KEY); } catch (e) {}
    if (!find(id)) { var b = null; try { b = localStorage.getItem('nh-theme'); } catch (e) {} id = b === 'dark' ? 'dark' : 'light'; }
    return id;
  }

  /* ---------- the colour layer (built from the table above) ---------- */
  var css = '';
  THEMES.forEach(function (th) {
    if (!th.t) return; var t = th.t, S = 'html:root[data-aura-theme="' + th.id + '"][data-aura-theme]';
    css += S + '{--bg:' + t.bg + ';--surface:' + t.surface + ';--surface2:' + t.surface2 + ';--border:' + t.border + ';--border-mid:' + t.borderMid
      + ';--text-primary:' + t.t1 + ';--text-secondary:' + t.t2 + ';--text-tertiary:' + t.t3
      + ';--green:' + t.acc + ';--green-bg:' + t.accBg + ';--green-border:' + t.accBorder
      + ';--blue:' + t.acc + ';--blue-light:' + t.acc + ';--blue-bg:' + t.accBg + ';--blue-border:' + t.accBorder + ';--blue-hover:' + t.acc
      + ';--brand:' + t.acc + ';--brand-bg:' + t.accBg + ';--brand-border:' + t.accBorder
      + ';--sidebar-bg:' + t.side + ';--sidebar-text:' + t.sideT + ';--sidebar-text-secondary:' + t.sideT2 + ';--sidebar-text-tertiary:' + t.sideT3
      + ';--sidebar-border:' + t.sideLine + ';--sidebar-hover-bg:' + t.sideHover + ';--sidebar-active-bg:' + t.sideOn
      + ';--sidebar-av-bg:' + t.sideHover + ';--sidebar-av-border:' + t.sideLine
      + ';--aura-nav-on:' + t.navOn + ';--aura-scale:' + t.scale + ';--bed-free-edge:' + '#0B6B4A' + '}';
  });
  var A = 'html[data-aura-theme]';
  css += ''
    /* selected menu item, Pharmacy / Lab tabs */
    + A + ' body #sidebar .nb.on,' + A + ' body .d-tab.on{background:var(--sidebar-active-bg)!important;color:var(--aura-nav-on)!important}'
    + A + ' body #sidebar .nb:hover:not(.on),' + A + ' body .d-tab:hover:not(.on){background:var(--sidebar-hover-bg);color:var(--sidebar-text)}'
    /* wordmark: "Aura" in the menu text colour, "Scale" in a green that reads on this menu */
    + A + ' body #sidebar .sb-mark .a{color:var(--sidebar-text)!important}'
    + A + ' body #sidebar .sb-mark .s{color:var(--aura-scale)!important}'
    + A + ' body #sidebar .sb-mark .os,' + A + ' body #sidebar .sb-tag,' + A + ' body #sidebar .sb-mark-sub{color:var(--sidebar-text-tertiary)!important}'
    + A + ' body .d-side-brand b{color:var(--sidebar-text)}' + A + ' body .d-side-brand span,' + A + ' body .d-side-foot{color:var(--sidebar-text-tertiary)}'
    /* facility card, theme button, sign-out, profile inside the menu */
    + A + ' body #sidebar .sb-facility-inner,' + A + ' body #sidebar .sb-fac-inner{background:var(--sidebar-hover-bg)!important;border-color:var(--sidebar-border)!important}'
    + A + ' body #sidebar .sb-fac-name{color:var(--sidebar-text)!important}'
    + A + ' body #sidebar .sb-fac-type,' + A + ' body #sidebar .sb-online{color:var(--sidebar-text-secondary)!important}'
    + A + ' body #sidebar .theme-toggle{background:var(--sidebar-hover-bg)!important;border-color:var(--sidebar-border)!important;color:var(--sidebar-text)!important}'
    + A + ' body #sidebar .sb-out{color:var(--sidebar-text-secondary)!important}'
    + A + ' body #sidebar .sb-profile *{color:var(--sidebar-text)}'
    + A + ' body #sidebar .nav-sec{color:var(--sidebar-text-tertiary)!important}'
    + A + ' body #sidebar .sb-foot{border-top-color:var(--sidebar-border)!important}'
    + A + ' body #sidebar .sb-admin-name{color:var(--sidebar-text)!important}'
    /* logo always clearly visible: on coloured or dark menus it gets a thin light ring */
    + 'html[data-aura-side="dark"] body #sidebar .aura-mark,html[data-aura-side="dark"] body .d-side-brand i,html[data-aura-side="dark"] body #sidebar .sb-logo-mark{outline:2px solid rgba(255,255,255,.88);outline-offset:1px}'
    + 'html[data-aura-side="dark"] body #sidebar .sb-logo>.sb-mark:first-child::before{outline:2px solid rgba(255,255,255,.88);outline-offset:1px}'
    + 'html[data-aura-base="dark"] body .aura-mark-lg{outline:2px solid rgba(255,255,255,.85);outline-offset:2px}'
    /* the theme picker */
    + '.aura-tp-ov{position:fixed;inset:0;z-index:99980;background:rgba(10,20,15,.42);display:flex;align-items:center;justify-content:center;padding:16px}'
    + '.aura-tp{background:#FFFFFF;color:#14201A;border-radius:18px;width:min(460px,100%);max-height:calc(100vh - 32px);overflow:auto;box-shadow:0 20px 50px rgba(0,0,0,.28);font-family:Manrope,"Noto Sans Bengali",system-ui,sans-serif}'
    + '.aura-tp-h{display:flex;justify-content:space-between;align-items:center;padding:16px 18px 10px}'
    + '.aura-tp-h b{font-size:16px;font-weight:800}.aura-tp-h button{border:0;background:#F0F3F1;color:#14201A;border-radius:10px;width:34px;height:34px;font-size:16px;cursor:pointer}'
    + '.aura-tp-l{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 18px 18px}'
    + '.aura-tp-o{display:flex;align-items:center;gap:10px;padding:10px;border:2px solid #E3E8E4;border-radius:12px;background:#FFFFFF;color:#14201A;cursor:pointer;text-align:left;font:600 13px Manrope,system-ui,sans-serif}'
    + '.aura-tp-o:hover{border-color:#B9DCCB}.aura-tp-o.on{border-color:#0B6B4A;background:#F2F8F4}'
    + '.aura-tp-o .sw{display:flex;flex:none;border-radius:8px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.1)}'
    + '.aura-tp-o .sw i{width:12px;height:30px;display:block}.aura-tp-o .ck{margin-left:auto;color:#0B6B4A;font-weight:800}'
    + '.aura-tp-n{padding:0 18px 16px;font-size:12px;color:#5B6B63}'
    + '@media (max-width:380px){.aura-tp-l{grid-template-columns:1fr}}';
  var st = document.createElement('style'); st.id = 'aura-themes-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function apply(id) {
    var th = find(id) || find('light'), d = document.documentElement;
    d.setAttribute('data-theme', th.base);
    d.setAttribute('data-aura-base', th.base);
    if (th.t) { d.setAttribute('data-aura-theme', th.id); d.setAttribute('data-aura-side', th.side || 'light'); }
    else { d.removeAttribute('data-aura-theme'); d.setAttribute('data-aura-side', th.base === 'dark' ? 'dark' : 'light'); }
    try { localStorage.setItem(KEY, th.id); localStorage.setItem('nh-theme', th.base); } catch (e) {}
    var mc = document.getElementById('meta-tc'); if (mc) mc.content = th.t ? th.t.side : (th.base === 'dark' ? '#171B24' : '#ffffff');
  }
  apply(stored());

  /* ---------- the picker ---------- */
  function close() { var o = document.getElementById('aura-tp-ov'); if (o) o.remove(); document.removeEventListener('keydown', onKey); }
  function onKey(e) { if (e.key === 'Escape') close(); }
  function open() {
    close();
    var cur = stored();
    var ov = document.createElement('div'); ov.className = 'aura-tp-ov'; ov.id = 'aura-tp-ov';
    ov.innerHTML = '<div class="aura-tp" role="dialog" aria-modal="true" aria-label="Choose a theme">'
      + '<div class="aura-tp-h"><b>Choose a theme</b><button type="button" aria-label="Close">✕</button></div>'
      + '<div class="aura-tp-l">' + THEMES.map(function (th) {
          return '<button type="button" class="aura-tp-o' + (th.id === cur ? ' on' : '') + '" data-id="' + th.id + '">'
            + '<span class="sw">' + th.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>'
            + '<span>' + th.name + '</span>' + (th.id === cur ? '<span class="ck">✓</span>' : '') + '</button>';
        }).join('') + '</div>'
      + '<div class="aura-tp-n">Saved on this device for every AuraScale portal.</div></div>';
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.closest('.aura-tp-h button')) return close();
      var b = e.target.closest('.aura-tp-o'); if (!b) return;
      apply(b.getAttribute('data-id')); close();
    });
    document.body.appendChild(ov);
    document.addEventListener('keydown', onKey);
    var on = ov.querySelector('.aura-tp-o.on') || ov.querySelector('.aura-tp-o'); if (on) on.focus();
  }
  window.AuraThemes = { list: THEMES, apply: apply, open: open, current: stored };
  /* every existing Theme button calls toggleTheme(): from now on it opens the picker.
     (set after the page's own scripts have defined their toggleTheme) */
  function takeOver() { window.toggleTheme = open; apply(stored()); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', takeOver); else takeOver();
  window.addEventListener('load', takeOver);
})();
