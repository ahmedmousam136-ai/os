/* AuraScale startup animation (splash), shown once before the sign-in screen.
 *
 * How it is wired (unchanged):
 *   - A tiny guard in nh.html's <head> decides, before anything is painted, whether the splash should play:
 *       EVERY time the sign-in screen is about to show (signed out, after Sign Out, or an expired login),
 *       never after a password-reset / email-confirmation link, never when the app opens straight in. If it should play, it adds the class
 *       "as-pending" to <html>, which keeps the sign-in screen invisible on a white background.
 *   - This file copies the sign-in card's OWN logo block (#auth-screen .auth-logo: the AuraScale mark, the
 *     "AuraScale" wordmark and its subtitle) and places the copy exactly over the real logo, so the last frame
 *     is the real login logo. Nothing is redrawn: same mark, same wordmark font, same colours.
 *
 * Timeline (seconds):
 *   0.00-0.25  white
 *   0.25-1.20  the wordmark writes itself letter by letter: A, Au, Aur, Aura, AuraS ... AuraScale
 *              (each letter fades in from a soft blur, no movement)
 *   1.10-1.55  the AuraScale mark settles in above it (fade, slight rise, blur to sharp)
 *   1.35-1.60  the small "NH" and the subtitle fade in
 *   1.60-1.95  hold
 *   1.95-2.30  crossfade to the sign-in screen
 * prefers-reduced-motion: no letters / movement / blur, just a short fade (about 1 second in all).
 * Tap or press any key to skip. If anything goes wrong the sign-in screen simply appears (failsafe in the guard).
 * No sound: browsers block autoplay before a tap, and a login screen is better silent.
 */
(function () {
  var html = document.documentElement;

  /* A login was saved on this browser: ask Supabase whether it is still valid.
     Valid   -> the app opens straight away, no animation.
     Expired -> the sign-in screen will show, so play the animation first. */
  if (html.classList.contains('as-wait')) {
    var tries = 0;
    var giveUp = function () { html.classList.remove('as-wait'); };
    var waitForApp = function () {
      var n = 0;
      (function chk() {
        var shell = document.getElementById('app-shell'), auth = document.getElementById('auth-screen');
        if ((shell && shell.classList.contains('authenticated')) || (auth && auth.classList.contains('hidden')) || ++n > 40) { try { clearTimeout(window.__asFail); } catch (e) {} giveUp(); return; }
        setTimeout(chk, 75);
      })();
    };
    (function ask() {
      var c = null; try { c = _supa; } catch (e) {}
      if (!c || !c.auth) { if (++tries < 40) return setTimeout(ask, 75); return giveUp(); }
      c.auth.getSession().then(function (r) {
        if (r && r.data && r.data.session) return waitForApp();
        try { clearTimeout(window.__asFail); } catch (e) {}
        if (window.AuraLoader) AuraLoader.hide();   /* the saved login has expired: the sign-in screen is next */
        html.classList.remove('as-wait'); html.classList.add('as-pending');
        window.__asFail = setTimeout(function () { html.classList.remove('as-pending'); }, 4000);
        play();
      }, giveUp);
    })();
    return;
  }
  if (html.classList.contains('as-pending')) play();

  function play() {
  try { clearTimeout(window.__asFail); } catch (e) {}

  var src = document.querySelector('#auth-screen .auth-logo');
  var reduce = html.classList.contains('as-reduce');
  function reveal() { html.classList.remove('as-pending'); }
  if (!src) { reveal(); return; }

  var STEP = 0.105, START = 0.25;            /* seconds between letters, first letter */
  var css = ''
    + '.as-splash{position:fixed;inset:0;z-index:2147483000;pointer-events:auto;cursor:default}'
    + '.as-splash .as-bg{position:absolute;inset:0;background:#FFFFFF}'
    + '.as-splash .as-logo{position:fixed;margin:0}'
    + '.as-splash .as-ch{opacity:0}'
    + '.as-splash .as-mark,.as-splash .as-late{opacity:0}'
    + '.as-splash.as-go .as-ch{animation:asLetter .42s cubic-bezier(.22,.61,.36,1) both}'
    + '.as-splash.as-go .as-mark{animation:asMark .5s cubic-bezier(.22,.61,.18,1) 1.1s both}'
    + '.as-splash.as-go .as-late{animation:asIn .3s ease-out 1.35s both}'
    + '.as-splash.as-out .as-bg{animation:asFade .35s cubic-bezier(.4,0,.2,1) both}'
    + '.as-splash.as-quick .as-ch,.as-splash.as-quick .as-mark,.as-splash.as-quick .as-late{animation:asIn .25s ease-out both}'
    + '@keyframes asLetter{0%{opacity:0;filter:blur(5px)}60%{opacity:1;filter:blur(.6px)}100%{opacity:1;filter:blur(0)}}'
    + '@keyframes asMark{0%{opacity:0;transform:translateY(8px) scale(.965);filter:blur(5px)}70%{opacity:1;filter:blur(.4px)}100%{opacity:1;transform:none;filter:blur(0)}}'
    + '@keyframes asIn{from{opacity:0}to{opacity:1}}'
    + '@keyframes asFade{from{opacity:1}to{opacity:0}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var wrap = document.createElement('div');
  wrap.className = 'as-splash'; wrap.setAttribute('aria-hidden', 'true');
  var bg = document.createElement('div'); bg.className = 'as-bg'; wrap.appendChild(bg);

  /* the real logo block, copied as it is */
  var logo = src.cloneNode(true);
  logo.classList.add('as-logo');
  [].forEach.call(logo.querySelectorAll('[id]'), function (n) { n.removeAttribute('id'); });

  /* split "Aura" and "Scale" into letters (same spans, same colours, nothing re-styled) */
  var n = 0;
  [].forEach.call(logo.querySelectorAll('.auth-word .a, .auth-word .s'), function (part) {
    var text = part.textContent; part.textContent = '';
    for (var i = 0; i < text.length; i++) {
      var c = document.createElement('span'); c.className = 'as-ch'; c.textContent = text.charAt(i);
      c.style.animationDelay = (START + STEP * n++).toFixed(3) + 's';
      part.appendChild(c);
    }
  });
  var mark = logo.querySelector('.aura-hero'); if (mark) mark.classList.add('as-mark');
  [].forEach.call(logo.querySelectorAll('.auth-word .os, .auth-sub'), function (e) { e.classList.add('as-late'); });
  wrap.appendChild(logo);

  /* put the copy exactly where the real logo is */
  function place() {
    var r = src.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      logo.style.left = r.left + 'px'; logo.style.top = r.top + 'px'; logo.style.width = r.width + 'px';
    } else {
      logo.style.left = '50%'; logo.style.top = '38%'; logo.style.width = 'min(360px, 86vw)'; logo.style.marginLeft = 'calc(min(360px, 86vw) / -2)';
    }
  }
  /* the sign-in card has its own short entrance animation; jump it to its end while it is still invisible */
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
  wrap.addEventListener('pointerdown', finish);
  window.addEventListener('keydown', function onKey() { window.removeEventListener('keydown', onKey); finish(); });

  requestAnimationFrame(function () {
    if (reduce) { wrap.classList.add('as-quick'); at(650, finish); }
    else { wrap.classList.add('as-go'); at(1950, finish); }
  });
  }
})();
