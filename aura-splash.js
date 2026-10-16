/* AuraScale startup animation (splash), shown once before the sign-in screen.
 *
 * How it is wired:
 *   - A tiny guard in nh.html's <head> decides, before anything is painted, whether the splash should play:
 *       only when nobody is signed in on this browser, once per browser tab (sessionStorage), never after
 *       a password-reset / email-confirmation link, never inside the app. If it should play, it adds the class
 *       "as-pending" to <html>, which keeps the sign-in screen invisible (opacity 0) on a white background.
 *   - This file (loaded with `defer`) then plays the animation using the EXISTING logo: it copies the
 *     sign-in card's own logo block (#auth-screen .auth-logo: the AuraScale mark, the "AuraScale" wordmark and its
 *     subtitle) and places the copy exactly where the real logo sits, so the last frame is the real login logo.
 *   - At the end the white layer fades out while the sign-in screen fades in (a crossfade), and the copy is removed.
 *
 * Timeline (seconds):  0.00-0.20 white  ·  0.20-0.75 logo reveals left to right (opacity, slight slide, blur to sharp)
 *                      0.75-1.10 settles  ·  1.10-1.35 hold  ·  1.35-1.70 crossfade to the sign-in screen.
 * prefers-reduced-motion: no slide / blur / wipe, just a short fade (about 1 second in all).
 * Tap or press any key to skip. If anything goes wrong the sign-in screen simply appears (failsafe in the guard).
 */
(function () {
  var html = document.documentElement;
  if (!html.classList.contains('as-pending')) return;
  try { clearTimeout(window.__asFail); } catch (e) {}
  try { sessionStorage.setItem('aura_splash_v1', '1'); } catch (e) {}

  var src = document.querySelector('#auth-screen .auth-logo');
  var reduce = html.classList.contains('as-reduce');
  function reveal() { html.classList.remove('as-pending'); }
  if (!src) { reveal(); return; }

  var css = ''
    + '.as-splash{position:fixed;inset:0;z-index:2147483000;pointer-events:auto;cursor:default}'
    + '.as-splash .as-bg{position:absolute;inset:0;background:#FFFFFF}'
    + '.as-splash .as-logo{position:fixed;margin:0;will-change:opacity,transform,filter;opacity:0}'
    + '.as-splash.as-go .as-logo{animation:asReveal .9s cubic-bezier(.22,.61,.18,1) .2s both;'
    +   '-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 44%,rgba(0,0,0,0) 56%,rgba(0,0,0,0) 100%);'
    +   'mask-image:linear-gradient(90deg,#000 0%,#000 44%,rgba(0,0,0,0) 56%,rgba(0,0,0,0) 100%);'
    +   '-webkit-mask-size:260% 100%;mask-size:260% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}'
    + '.as-splash.as-out .as-bg{animation:asFade .35s cubic-bezier(.4,0,.2,1) both}'
    + '.as-splash.as-quick .as-logo{animation:asFadeIn .25s ease-out both}'
    + '@keyframes asReveal{'
    +   '0%{opacity:0;transform:translateX(-14px);filter:blur(6px);-webkit-mask-position:100% 0;mask-position:100% 0}'
    +   '61%{opacity:1;transform:translateX(-2px);filter:blur(.8px);-webkit-mask-position:0 0;mask-position:0 0}'
    +   '100%{opacity:1;transform:none;filter:blur(0);-webkit-mask-position:0 0;mask-position:0 0}}'
    + '@keyframes asFade{from{opacity:1}to{opacity:0}}'
    + '@keyframes asFadeIn{from{opacity:0}to{opacity:1}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var wrap = document.createElement('div');
  wrap.className = 'as-splash'; wrap.setAttribute('aria-hidden', 'true');
  var bg = document.createElement('div'); bg.className = 'as-bg'; wrap.appendChild(bg);

  /* the real logo block, copied as it is (same mark, same wordmark, same colours) */
  var logo = src.cloneNode(true);
  logo.classList.add('as-logo');
  [].forEach.call(logo.querySelectorAll('[id]'), function (n) { n.removeAttribute('id'); });
  wrap.appendChild(logo);

  /* put the copy exactly where the real logo is, so the final frame IS the login logo */
  function place() {
    var r = src.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      logo.style.left = r.left + 'px'; logo.style.top = r.top + 'px'; logo.style.width = r.width + 'px';
    } else {
      logo.style.left = '50%'; logo.style.top = '38%'; logo.style.width = 'min(360px, 86vw)'; logo.style.marginLeft = 'calc(min(360px, 86vw) / -2)';
    }
  }
  /* the sign-in card has its own short entrance animation; jump it to its end while it is still invisible,
     so we measure the logo's final resting place (the gentle "breathing" glow keeps running) */
  try {
    var card = src.closest('.auth-card') || src;
    (card.getAnimations ? card.getAnimations({ subtree: true }) : []).forEach(function (a) {
      if (a.animationName !== 'auraBreathe' && a.effect && a.effect.getTiming().iterations !== Infinity) a.finish();
    });
  } catch (e) {}
  document.body.appendChild(wrap);
  place();

  var timers = [], done = false;
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function finish() {
    if (done) return; done = true;
    timers.forEach(clearTimeout);
    reveal();
    wrap.classList.add('as-out');
    setTimeout(function () { wrap.remove(); st.remove(); window.removeEventListener('resize', place); }, 380);
  }
  window.addEventListener('resize', place);
  /* tap / click / any key skips straight to the sign-in screen */
  wrap.addEventListener('pointerdown', finish);
  window.addEventListener('keydown', function onKey() { window.removeEventListener('keydown', onKey); finish(); });

  requestAnimationFrame(function () {
    if (reduce) {
      wrap.classList.add('as-quick');
      at(650, finish);                 /* about 1 s in total, no movement */
    } else {
      wrap.classList.add('as-go');     /* 0.20-1.10 reveal and settle */
      at(1350, finish);                /* 1.10-1.35 hold, then 1.35-1.70 crossfade */
    }
  });
})();
