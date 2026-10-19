/* AuraScale: one login, several businesses (for example a nursing home AND a wholesale firm).
   The business being worked on is remembered in this browser ("aura_biz"). The database decides what each
   login may open (aura_my_businesses), so choosing a business here can never open someone else's. */
(function () {
  var KEY = 'aura_biz';
  function get() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function set(id) { try { if (id) localStorage.setItem(KEY, id); else localStorage.removeItem(KEY); } catch (e) {} }
  window.auraBizGet = get;
  window.auraBizSet = set;
  window.AURA_BIZ_LIST = null;
  window.AURA_BIZ_CUR = null;

  /* the list from the database; null when the database is not updated yet (file 20 not run) */
  window.auraMyBusinesses = async function () {
    var r = await _supa.rpc('aura_my_businesses');
    if (r.error) {
      var m = (r.error.message || '') + ' ' + (r.error.code || '');
      if (/PGRST202|Could not find the function|does not exist|404/i.test(m)) return null;
      throw new Error(r.error.message || 'Could not load your businesses');
    }
    window.AURA_BIZ_LIST = Array.isArray(r.data) ? r.data : [];
    return window.AURA_BIZ_LIST;
  };

  function kindOk(b, kind) {
    var t = b.business_type || 'nursing_home';
    if (kind === 'wholesale') return t === 'wholesale_pharmacy';
    if (kind === 'pharmacy') return t === 'nursing_home' || t === 'pharmacy';
    if (kind === 'lab') return t === 'nursing_home' || t === 'lab';
    if (kind === 'nh') return t === 'nursing_home';
    return true;
  }
  /* which kind of screen this page is */
  window.auraPageKind = function () {
    var p = location.pathname;
    if (/wholesale(\.html)?\/?$/i.test(p)) return 'wholesale';
    if (/pharmacy(\.html)?\/?$/i.test(p)) return 'pharmacy';
    if (/(lab|diagnostic)(\.html)?\/?$/i.test(p)) return 'lab';
    if (/(doctor|receptionist)(\.html)?\/?$/i.test(p)) return 'nh';
    return '';
  };
  /* pick the business to open: the remembered one, else the only one that fits this screen, else the only one;
     'choose' = ask the person */
  window.auraBizPick = function (list, kind) {
    if (!list || !list.length) return null;
    var cur = get(), c = null;
    list.forEach(function (b) { if (b.id === cur) c = b; });
    if (c && (!kind || kindOk(c, kind))) return c;
    if (kind) {
      var ok = list.filter(function (b) { return kindOk(b, kind); });
      if (ok.length === 1) return ok[0];
      var live = ok.filter(function (b) { return b.is_approved; });
      if (live.length === 1) return live[0];
      if (ok.length > 1) return 'choose';
    }
    if (c) return c;
    if (list.length === 1) return list[0];
    return 'choose';
  };
  window.auraPortalFor = function (b) {
    var r = b.role, t = b.business_type || 'nursing_home';
    if (r === 'pharmacist') return 'pharmacy.html';
    if (r === 'lab') return 'lab.html';
    if (r === 'sales' || r === 'inventory' || r === 'accounts') return 'wholesale.html';
    if (r === 'doctor') return 'doctor.html';
    if (r === 'receptionist') return 'receptionist.html';
    if (t === 'pharmacy') return 'pharmacy.html';
    if (t === 'lab') return 'lab.html';
    if (t === 'wholesale_pharmacy') return 'wholesale.html';
    return 'nh.html';
  };
  window.auraOpenBiz = function (id) {
    var b = null; (window.AURA_BIZ_LIST || []).forEach(function (x) { if (x.id === id) b = x; });
    set(id);
    window._auraLeaving = true;
    location.href = b ? auraPortalFor(b) : 'nh.html';
  };
  window.auraBizIcon = function (t) {
    return { pharmacy: '&#128138;', lab: '&#129514;', wholesale_pharmacy: '&#128666;' }[t] || '&#127973;';
  };
  window.auraBizTypeName = function (t) {
    return { pharmacy: 'Pharmacy', lab: 'Diagnostic centre', wholesale_pharmacy: 'Wholesale' }[t] || 'Nursing home';
  };
  window.auraBizIsOwner = function () {
    return (window.AURA_BIZ_LIST || []).some(function (b) { return b.role === 'owner'; });
  };
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  /* menu lines for the top-right menu of the Pharmacy / Lab / Wholesale screens */
  window.auraBizMenuHtml = function (curId) {
    var L = window.AURA_BIZ_LIST || [], out = '';
    if (L.length > 1) {
      out += '<div class="who" style="margin-top:2px">Your businesses</div>';
      L.forEach(function (b) {
        var on = b.id === curId;
        out += '<button data-notr onclick="' + (on ? '' : 'auraOpenBiz(\'' + b.id + '\')') + '" style="' + (on ? 'font-weight:700;' : '') + '">'
          + auraBizIcon(b.business_type) + ' ' + h(b.name || '') + (on ? ' &#10003;' : '') + (b.is_approved ? '' : ' <span style="font-size:10.5px;opacity:.7">(pending)</span>') + '</button>';
      });
    }
    if (auraBizIsOwner()) out += '<a href="nh.html?add=1">&#65291; Add another business</a>';
    return out;
  };
})();
