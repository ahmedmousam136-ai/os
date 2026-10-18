/* AuraScale NURSING HOME TAX MASTER (GST rules) – one screen used in two places:
     admin.html  (AuraScale admin)  : add a rule, verify it, give a rule an end date, add / edit a class, see the change log
     nh.html     (owner, Settings)  : read only – which rule applies to what, from which date, and its source
   Every GST rate used on patient bills and in the supplier-bill check comes from here (deploy/11-nh-tax-master.sql).
   A verified rule is never rewritten: a new rate is a NEW rule with a new start date; the old rule gets an end date.
   Bills already made keep the tax they were made with. */
(function () {
  var S = { el: null, admin: false, classes: [], rules: [], audit: [], open: {} };
  function db() { return typeof _supa !== 'undefined' ? _supa : null; }
  function E(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
  function toast(m) { if (typeof showToast === 'function') showToast(m); else alert(m); }
  function today() { return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10); }
  function dmy(s) { if (!s) return ''; var p = String(s).slice(0, 10).split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function pct(n) { return n == null ? '-' : (Math.round(Number(n) * 100) / 100) + '%'; }
  function err(e) {
    var m = String((e && e.message) || e || '');
    if (/nh_tax_|tax_rule_|tax_class_|schema cache|PGRST20/i.test(m) && /does not exist|could not find|schema cache|PGRST20/i.test(m)) return 'The Tax Master is not set up yet. Run 11-nh-tax-master.sql in Supabase first.';
    return m.replace(/^.*?ERROR:\s*/, '') || 'Something went wrong.';
  }
  var css = '.tm-wrap{display:flex;flex-direction:column;gap:12px}'
    + '.tm-disc{font-size:12px;line-height:1.5;color:var(--text-secondary);background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:10px 12px}'
    + '.tm-cls{border:1px solid var(--border);border-radius:14px;background:var(--surface);overflow:hidden}'
    + '.tm-ch{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px 14px;cursor:pointer;user-select:none}'
    + '.tm-ch b{font-size:14px}.tm-ch .c{font-size:11px;color:var(--text-tertiary);font-weight:700;letter-spacing:.04em}'
    + '.tm-ch .now{margin-left:auto;font-size:12px;font-weight:700;white-space:nowrap}'
    + '.tm-pill{display:inline-block;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;white-space:nowrap}'
    + '.tm-pill.ex{background:#E6F6EE;color:#0F7A4F}.tm-pill.tx{background:#FFF4E0;color:#9A5B00}.tm-pill.cd{background:#EEF2FF;color:#3949AB}'
    + '.tm-pill.dr{background:#FDECEC;color:#B42318}.tm-pill.vf{background:var(--surface2);color:var(--text-secondary);border:1px solid var(--border)}'
    + '.tm-body{border-top:1px solid var(--border);padding:10px 14px;display:none}.tm-cls.open .tm-body{display:block}'
    + '.tm-meta{font-size:12px;color:var(--text-secondary);margin-bottom:8px;line-height:1.5;overflow-wrap:anywhere}'
    + '.tm-rule{border:1px solid var(--border);border-radius:10px;padding:9px 11px;margin-bottom:8px;font-size:12.5px;line-height:1.5}'
    + '.tm-rule.cur{border-color:var(--green-border,#BFE6D2);background:var(--green-bg,#E6F6EE)}'
    + '.tm-rule .d{font-weight:800}.tm-rule .r{font-size:11.5px;color:var(--text-secondary);margin-top:3px;overflow-wrap:anywhere}'
    + '.tm-acts{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.tm-acts button{border:1px solid var(--border);background:var(--surface);color:var(--text-primary);border-radius:8px;padding:5px 10px;font-size:12px;font-weight:600;cursor:pointer}'
    + '.tm-form{border:1px solid var(--border);border-radius:14px;padding:12px 14px;background:var(--surface)}'
    + '.tm-form h4{margin:0 0 8px;font-size:14px}.tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}'
    + '.tm-grid label{display:block;font-size:11.5px;font-weight:700;color:var(--text-tertiary);margin-bottom:3px}'
    + '.tm-grid input,.tm-grid select,.tm-grid textarea{width:100%;box-sizing:border-box}'
    + '.tm-log{font-size:12px;color:var(--text-secondary)}.tm-log div{padding:5px 0;border-bottom:1px dashed var(--border);overflow-wrap:anywhere}'
    + '.tm-tabs{display:flex;gap:6px;flex-wrap:wrap}.tm-tabs button{border:1px solid var(--border);background:var(--surface);color:var(--text-primary);border-radius:999px;padding:6px 12px;font-size:12.5px;font-weight:700;cursor:pointer}'
    + '.tm-tabs button.on{background:var(--green);border-color:var(--green);color:#fff}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function ruleNow(code, day) {
    day = day || today();
    return S.rules.filter(function (r) { return r.class_code === code && r.status === 'verified' && r.effective_from <= day && (!r.effective_until || r.effective_until >= day); })
      .sort(function (a, b) { return a.effective_from < b.effective_from ? 1 : -1; })[0];
  }
  function treat(r) {
    if (!r) return '<span class="tm-pill dr">No verified rule</span>';
    if (r.bill_treatment === 'exempt') return '<span class="tm-pill ex">Patient bill: GST Exempt</span>';
    if (r.bill_treatment === 'taxable') return '<span class="tm-pill tx">Patient bill: GST ' + pct(r.bill_rate) + '</span>';
    return '<span class="tm-pill cd">Patient bill: ' + pct(r.bill_rate) + ' if above ₹' + Number(r.cond_above || 0).toLocaleString('en-IN') + '/day' + (r.cond_not_icu ? ', not ICU' : '') + '</span>';
  }
  function ruleHtml(r) {
    var cur = ruleNow(r.class_code) === r;
    var acts = '';
    if (S.admin) {
      if (r.status === 'draft') acts += '<button type="button" onclick="AuraTaxMaster.verify(\'' + r.id + '\')">&#10003; Verify</button><button type="button" style="color:var(--red)" onclick="AuraTaxMaster.del(\'' + r.id + '\')">Delete draft</button>';
      acts += '<button type="button" onclick="AuraTaxMaster.end(\'' + r.id + '\')">Set end date</button>';
    }
    return '<div class="tm-rule' + (cur ? ' cur' : '') + '"><div class="d">' + (cur ? 'In use now · ' : '') + 'From ' + dmy(r.effective_from) + (r.effective_until ? ' to ' + dmy(r.effective_until) : ' (no end date)') + '</div>'
      + '<div>' + treat(r) + ' ' + (r.goods_rate != null ? '<span class="tm-pill vf">GST on the goods (supplier bills): ' + pct(r.goods_rate) + '</span> ' : '')
      + (r.status === 'verified' ? '<span class="tm-pill vf">&#10003; Verified' + (r.verified_by ? ' by ' + E(r.verified_by) : '') + '</span>' : '<span class="tm-pill dr">Draft – not used yet</span>') + '</div>'
      + '<div class="r">' + E(r.legal_ref || '') + (r.note ? '<br>' + E(r.note) : '') + '</div>'
      + (acts ? '<div class="tm-acts">' + acts + '</div>' : '') + '</div>';
  }
  function classHtml(c) {
    var rs = S.rules.filter(function (r) { return r.class_code === c.code; }).sort(function (a, b) { return a.effective_from < b.effective_from ? 1 : -1; });
    var now = ruleNow(c.code);
    return '<div class="tm-cls' + (S.open[c.code] ? ' open' : '') + '" id="tm-c-' + E(c.code) + '"><div class="tm-ch" onclick="AuraTaxMaster.toggle(\'' + E(c.code) + '\')" role="button" tabindex="0">'
      + '<div style="min-width:0;flex:1 1 200px"><b>' + E(c.name) + '</b><div class="c">' + E(c.code) + ' · ' + (c.kind === 'goods' ? 'GOODS' : 'SERVICE') + (c.hsn_sac ? ' · HSN/SAC ' + E(c.hsn_sac) : '') + (c.is_active === false ? ' · NOT IN USE' : '') + '</div></div>'
      + '<div class="now">' + treat(now) + (now && now.goods_rate != null ? ' <span class="tm-pill vf">goods ' + pct(now.goods_rate) + '</span>' : '') + '</div></div>'
      + '<div class="tm-body"><div class="tm-meta">' + (c.keywords && c.keywords.length ? 'Matched by the words: ' + E(c.keywords.join(', ')) + '. ' : '') + (c.hsn_prefixes && c.hsn_prefixes.length ? 'Supplier HSN: ' + E(c.hsn_prefixes.join(', ')) + '. ' : '') + (c.is_fallback ? 'Used when nothing else matches. ' : '') + E(c.note || '') + '</div>'
      + (rs.length ? rs.map(ruleHtml).join('') : '<div class="tm-meta">No rule yet.</div>')
      + (S.admin ? '<div class="tm-acts"><button type="button" onclick="AuraTaxMaster.newRule(\'' + E(c.code) + '\')">+ New rule for this class</button><button type="button" onclick="AuraTaxMaster.editClass(\'' + E(c.code) + '\')">Edit class</button></div>' : '')
      + '</div></div>';
  }
  function render() {
    var el = S.el; if (!el) return;
    var services = S.classes.filter(function (c) { return c.kind !== 'goods'; }), goods = S.classes.filter(function (c) { return c.kind === 'goods'; });
    var h = '<div class="tm-wrap"><div class="tm-disc">' + (S.admin
        ? '<b>Tax Master for every nursing home.</b> Add a new rule when GST changes (a new rule with its start date). It is used only after you mark it <b>Verified</b> against the official notification; the earlier rule then ends the day before. Rules are never rewritten, and bills already made are never recalculated.'
        : '<b>GST rules used on your bills.</b> AuraScale applies these rules by itself: the class of each charge or stock item, and the rule valid on that date. Nobody at the reception types a GST rate. The rules are kept by AuraScale from published GST notifications; they are not a legal tax opinion – please confirm with your CA, and tell AuraScale if a rule looks wrong.')
      + '</div>';
    if (S.admin) h += '<div class="tm-tabs"><button type="button" onclick="AuraTaxMaster.newRule()">+ New rule</button><button type="button" onclick="AuraTaxMaster.editClass()">+ New class</button><button type="button" onclick="AuraTaxMaster.showLog()">Change log</button></div><div id="tm-form"></div>';
    h += '<div class="pt" style="font-size:13px;margin-top:4px">Services (patient bill)</div>' + services.map(classHtml).join('')
      + '<div class="pt" style="font-size:13px;margin-top:8px">Goods (stock items and supplier bills)</div>' + goods.map(classHtml).join('') + '</div>';
    el.innerHTML = h;
  }
  async function load() {
    if (!S.el || !db()) return;
    S.el.innerHTML = '<p class="ss" style="padding:6px 0">Loading the Tax Master&hellip;</p>';
    var r = await Promise.all([db().from('nh_tax_classes').select('*').order('priority').order('name'), db().from('nh_tax_rules').select('*').order('effective_from', { ascending: false })]);
    if (r[0].error || r[1].error) { S.el.innerHTML = '<p class="ss">' + E(err(r[0].error || r[1].error)) + '</p>'; return; }
    S.classes = r[0].data || []; S.rules = r[1].data || [];
    render();
  }
  function mount(el, admin) { S.el = typeof el === 'string' ? $(el) : el; S.admin = !!admin; load(); }
  function toggle(code) { S.open[code] = !S.open[code]; var c = $('tm-c-' + code); if (c) c.classList.toggle('open', !!S.open[code]); }

  /* ---------------- admin forms ---------------- */
  function opts(sel) { return S.classes.map(function (c) { return '<option value="' + E(c.code) + '"' + (c.code === sel ? ' selected' : '') + '>' + E(c.name) + ' (' + E(c.code) + ')</option>'; }).join(''); }
  function newRule(code) {
    var f = $('tm-form'); if (!f) return;
    f.innerHTML = '<div class="tm-form"><h4>New GST rule (saved as a draft)</h4><div class="tm-grid">'
      + '<div><label for="tm-r-cls">Class *</label><select class="finput" id="tm-r-cls">' + opts(code) + '</select></div>'
      + '<div><label for="tm-r-from">Effective from *</label><input class="finput" id="tm-r-from" type="date" value="' + today() + '"/></div>'
      + '<div><label for="tm-r-until">Valid until (optional)</label><input class="finput" id="tm-r-until" type="date"/></div>'
      + '<div><label for="tm-r-goods">GST on the goods % (for supplier bills; empty for services)</label><input class="finput" id="tm-r-goods" type="number" step="0.01" min="0" max="40"/></div>'
      + '<div><label for="tm-r-tr">On the patient bill *</label><select class="finput" id="tm-r-tr" onchange="AuraTaxMaster.trChange()"><option value="exempt">GST Exempt</option><option value="taxable">Taxable at a rate</option><option value="conditional">Taxable only above a rate per day</option></select></div>'
      + '<div class="tm-rate"><label for="tm-r-rate">GST % on the patient bill</label><input class="finput" id="tm-r-rate" type="number" step="0.01" min="0" max="40"/></div>'
      + '<div class="tm-cond"><label for="tm-r-above">Only when the rate per day is more than ₹</label><input class="finput" id="tm-r-above" type="number" step="1" min="0"/></div>'
      + '<div class="tm-cond"><label><input type="checkbox" id="tm-r-icu" checked/> Never on ICU / critical care</label></div>'
      + '<div style="grid-column:1/-1"><label for="tm-r-ref">Source: notification / circular *</label><input class="finput" id="tm-r-ref" maxlength="500" placeholder="e.g. Notification No. 9/2025-Central Tax (Rate), from 22-09-2025"/></div>'
      + '<div style="grid-column:1/-1"><label for="tm-r-note">Note (optional)</label><input class="finput" id="tm-r-note" maxlength="300"/></div>'
      + '</div><div class="tm-acts" style="margin-top:10px"><button type="button" class="btn-green" onclick="AuraTaxMaster.saveRule()">Save draft</button><button type="button" onclick="document.getElementById(\'tm-form\').innerHTML=\'\'">Cancel</button></div></div>';
    trChange(); f.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function trChange() {
    var v = ($('tm-r-tr') || {}).value;
    [].forEach.call(document.querySelectorAll('.tm-rate'), function (x) { x.style.display = v === 'exempt' ? 'none' : ''; });
    [].forEach.call(document.querySelectorAll('.tm-cond'), function (x) { x.style.display = v === 'conditional' ? '' : 'none'; });
  }
  async function saveRule() {
    var tr = $('tm-r-tr').value;
    var p = { class_code: $('tm-r-cls').value, effective_from: $('tm-r-from').value, effective_until: $('tm-r-until').value || '', goods_rate: $('tm-r-goods').value,
              bill_treatment: tr, bill_rate: tr === 'exempt' ? 0 : $('tm-r-rate').value, cond_above: $('tm-r-above').value, cond_not_icu: $('tm-r-icu').checked,
              legal_ref: $('tm-r-ref').value, note: $('tm-r-note').value };
    var r = await db().rpc('tax_rule_add', { p: p });
    if (r.error) return toast(err(r.error));
    toast('Draft rule saved. Check it against the notification, then tap Verify.'); S.open[p.class_code] = true; $('tm-form').innerHTML = ''; load();
  }
  async function verify(id) {
    var who = window.prompt('Verify this rule?\n\nOnly verify after checking it against the official GST notification. From its start date it will be used for every new charge, and the earlier rule of this class will end the day before.\n\nType your name (who checked it):');
    if (who === null) return;
    var r = await db().rpc('tax_rule_verify', { p_rule_id: id, p_by: who });
    toast(r.error ? err(r.error) : '✓ Rule verified'); load();
  }
  async function end(id) {
    var d = window.prompt('Last day this rule applies (YYYY-MM-DD):', today()); if (d === null) return;
    var r = await db().rpc('tax_rule_end', { p_rule_id: id, p_until: d });
    toast(r.error ? err(r.error) : '✓ End date saved'); load();
  }
  async function del(id) {
    if (!window.confirm('Delete this draft rule?')) return;
    var r = await db().rpc('tax_rule_delete_draft', { p_rule_id: id });
    toast(r.error ? err(r.error) : 'Draft deleted'); load();
  }
  function editClass(code) {
    var c = S.classes.filter(function (x) { return x.code === code; })[0] || { kind: 'goods', keywords: [], hsn_prefixes: [], priority: 50, is_active: true };
    var f = $('tm-form'); if (!f) return;
    f.innerHTML = '<div class="tm-form"><h4>' + (code ? 'Edit class ' + E(code) : 'New class') + '</h4><div class="tm-grid">'
      + '<div><label for="tm-c-code">Code *</label><input class="finput" id="tm-c-code" maxlength="24" value="' + E(c.code || 'NH-') + '"' + (code ? ' readonly' : '') + '/></div>'
      + '<div><label for="tm-c-name">Name *</label><input class="finput" id="tm-c-name" maxlength="80" value="' + E(c.name || '') + '"/></div>'
      + '<div><label for="tm-c-kind">Kind</label><select class="finput" id="tm-c-kind"><option value="goods"' + (c.kind === 'goods' ? ' selected' : '') + '>Goods (stock item)</option><option value="service"' + (c.kind === 'service' ? ' selected' : '') + '>Service</option></select></div>'
      + '<div><label for="tm-c-hsn">HSN / SAC printed on the bill</label><input class="finput" id="tm-c-hsn" maxlength="12" value="' + E(c.hsn_sac || '') + '"/></div>'
      + '<div style="grid-column:1/-1"><label for="tm-c-kw">Words that mean this class (comma separated)</label><input class="finput" id="tm-c-kw" value="' + E((c.keywords || []).join(', ')) + '"/></div>'
      + '<div><label for="tm-c-pre">Supplier HSN codes (comma separated)</label><input class="finput" id="tm-c-pre" value="' + E((c.hsn_prefixes || []).join(', ')) + '"/></div>'
      + '<div><label for="tm-c-pri">Priority (lower wins)</label><input class="finput" id="tm-c-pri" type="number" value="' + E(c.priority) + '"/></div>'
      + '<div><label><input type="checkbox" id="tm-c-act"' + (c.is_active !== false ? ' checked' : '') + '/> In use</label></div>'
      + '<div style="grid-column:1/-1"><label for="tm-c-note">Note</label><input class="finput" id="tm-c-note" maxlength="300" value="' + E(c.note || '') + '"/></div>'
      + '</div><div class="tm-acts" style="margin-top:10px"><button type="button" class="btn-green" onclick="AuraTaxMaster.saveClass()">Save class</button><button type="button" onclick="document.getElementById(\'tm-form\').innerHTML=\'\'">Cancel</button></div></div>';
  }
  async function saveClass() {
    var list = function (v) { return String(v || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean); };
    var p = { code: $('tm-c-code').value, name: $('tm-c-name').value, kind: $('tm-c-kind').value, hsn_sac: $('tm-c-hsn').value, keywords: list($('tm-c-kw').value),
              hsn_prefixes: list($('tm-c-pre').value), priority: $('tm-c-pri').value, is_active: $('tm-c-act').checked, note: $('tm-c-note').value };
    var r = await db().rpc('tax_class_save', { p: p });
    if (r.error) return toast(err(r.error));
    toast('✓ Class saved'); $('tm-form').innerHTML = ''; load();
  }
  async function showLog() {
    var f = $('tm-form'); if (!f) return;
    var r = await db().from('nh_tax_audit').select('*').order('at', { ascending: false }).limit(60);
    var names = { initial_set: 'Initial rules set', rule_added: 'Draft rule added', rule_verified: 'Rule verified', rule_closed: 'Earlier rule ended', rule_ended: 'End date set', draft_deleted: 'Draft deleted', class_saved: 'Class saved' };
    f.innerHTML = '<div class="tm-form"><h4>Change log</h4><div class="tm-log">' + (r.error ? E(err(r.error)) : (r.data || []).map(function (x) {
      var a = x.after || {};
      return '<div>' + E(new Date(x.at).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })) + ' · <b>' + E(names[x.action] || x.action) + '</b>' + (x.class_code ? ' · ' + E(x.class_code) : '') + (x.by_name ? ' · ' + E(x.by_name) : '')
        + (a.effective_from ? ' · from ' + E(dmy(a.effective_from)) : '') + (a.effective_until ? ' · until ' + E(dmy(a.effective_until)) : '') + '</div>';
    }).join('') || 'No changes yet.') + '</div><div class="tm-acts" style="margin-top:8px"><button type="button" onclick="document.getElementById(\'tm-form\').innerHTML=\'\'">Close</button></div></div>';
  }

  window.AuraTaxMaster = { mount: mount, load: load, toggle: toggle, newRule: newRule, trChange: trChange, saveRule: saveRule, verify: verify, end: end, del: del,
                           editClass: editClass, saveClass: saveClass, showLog: showLog };
})();
