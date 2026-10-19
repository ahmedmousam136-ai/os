/* AuraScale CENTRAL GST LIST for pharmacy and wholesale products (admin.html -> GST rates).
   One list: HSN code -> GST rate. A change ("HSN 3004: 12% -> 5% from 22/09/2025") moves every product with that HSN
   that is still at the OLD rate, in every pharmacy and wholesale, on that date (file 29). Products at other rates are left alone.
   The government watcher (gst-watcher) puts the changes it finds in new notifications here as "waiting for approval".
   Bills and invoices already made never change. */
(function () {
  var S = { el: null, rows: [], changes: [], sources: [], seen: [] };
  function db() { return typeof _supa !== 'undefined' ? _supa : null; }
  function E(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
  function toast(m) { if (typeof showToast === 'function') showToast(m); else alert(m); }
  function today() { return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10); }
  function dmy(s) { if (!s) return ''; var p = String(s).slice(0, 10).split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function pct(n) { return n == null ? '-' : (Math.round(Number(n) * 100) / 100) + '%'; }
  var RATES = [0, 5, 12, 18, 28, 40];
  function err(e) {
    var m = String((e && e.message) || e || '');
    if (/aura_gst|schema cache|PGRST20/i.test(m) && /does not exist|could not find|schema cache|PGRST20/i.test(m)) return 'The central GST list is not set up yet: run file 29 in Supabase.';
    return m.replace(/^.*?ERROR:\s*/, '') || 'Something went wrong.';
  }
  var css = '.gc-wrap{display:flex;flex-direction:column;gap:14px}.gc-card{border:1px solid var(--border);border-radius:14px;background:var(--surface);padding:12px 14px}'
    + '.gc-card h3{font-size:14px;margin:0 0 8px}.gc-t{width:100%;border-collapse:collapse;font-size:13px}.gc-t th{text-align:left;font-size:11px;color:var(--text-tertiary);font-weight:700;padding:6px 8px;border-bottom:1px solid var(--border)}'
    + '.gc-t td{padding:8px;border-bottom:1px solid var(--border);vertical-align:top}.gc-pend{border-color:#F5C26B;background:#FFF9EC}'
    + '.gc-b{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface);border-radius:8px;padding:6px 10px;font-size:12px;font-weight:700;cursor:pointer;color:var(--text-primary)}'
    + '.gc-b.g{background:#0E9F6E;border-color:#0E9F6E;color:#fff}.gc-b.r{color:#B42318}.gc-in{border:1px solid var(--border);border-radius:8px;padding:6px 8px;font-size:13px;background:var(--surface);color:var(--text-primary)}'
    + '.gc-tiny{font-size:11.5px;color:var(--text-secondary);line-height:1.5}.gc-pill{display:inline-block;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:var(--surface2);border:1px solid var(--border)}';
  function rateSel(id, val) { return '<select class="gc-in" id="' + id + '">' + RATES.map(function (r) { return '<option value="' + r + '"' + (Number(val) === r ? ' selected' : '') + '>' + r + '%</option>'; }).join('') + '</select>'; }

  async function load() {
    var c = db(); if (!c || !S.el) return;
    S.el.innerHTML = '<div class="gc-tiny">Loading&hellip;</div>';
    var a = await c.from('aura_gst_hsn').select('*').order('hsn');
    if (a.error) { S.el.innerHTML = '<div class="gc-card" style="color:#B42318">' + E(err(a.error)) + '</div>'; return; }
    var b = await c.from('aura_gst_changes').select('*').order('created_at', { ascending: false }).limit(200);
    var s = await c.from('aura_gst_sources').select('*').order('url');
    var w = await c.from('aura_gst_seen').select('*').neq('status', 'baseline').order('created_at', { ascending: false }).limit(15);
    S.rows = a.data || []; S.changes = b.data || []; S.sources = s.data || []; S.seen = w.data || [];
    render();
  }
  function render() {
    var pend = S.changes.filter(function (x) { return x.status === 'pending'; });
    var sched = S.changes.filter(function (x) { return x.status === 'approved'; });
    var hist = S.changes.filter(function (x) { return x.status === 'applied' || x.status === 'rejected'; }).slice(0, 40);
    var h = '<div class="gc-wrap">'
      + '<div class="gc-tiny">One GST list for every <b>pharmacy and wholesale</b> product. A change moves products that have that HSN code <b>and are still at the old rate</b>, on the date you set. Products at other rates (special 0% drugs, a business\'s own exceptions) are not touched. Bills already made never change. Supplier bills keep checking rates too.</div>';
    /* 1. waiting for approval */
    h += '<div class="gc-card' + (pend.length ? ' gc-pend' : '') + '"><h3>&#128276; Found in government notifications &mdash; waiting for your approval (' + pend.length + ')</h3>'
      + (pend.length ? pend.map(function (x) {
        return '<div style="border-top:1px solid var(--border);padding:10px 0" id="gp-' + x.id + '"><b>HSN ' + E(x.hsn) + '</b> ' + E(x.description || '')
          + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0">From ' + rateSel('gpo-' + x.id, x.old_rate) + ' to ' + rateSel('gpn-' + x.id, x.new_rate)
          + ' starting <input class="gc-in" type="date" id="gpd-' + x.id + '" value="' + E(x.effective_from) + '"/>'
          + ' <button class="gc-b" onclick="AuraGstCentral.preview(\'' + x.id + '\')">Who is affected?</button>'
          + ' <button class="gc-b g" onclick="AuraGstCentral.decide(\'' + x.id + '\',true)">&#10003; Approve</button> <button class="gc-b r" onclick="AuraGstCentral.decide(\'' + x.id + '\',false)">Reject</button></div>'
          + '<div class="gc-tiny">' + E(x.note || '') + (x.source_url ? ' &middot; <a href="' + E(x.source_url) + '" target="_blank" rel="noopener">Read the notification</a>' : '') + '</div><div class="gc-tiny" id="gpp-' + x.id + '"></div></div>';
      }).join('') : '<div class="gc-tiny">Nothing waiting. The watcher checks the government pages every morning at 9:15.</div>') + '</div>';
    /* 2. the list */
    h += '<div class="gc-card"><h3>&#128203; Current GST list</h3><div style="overflow-x:auto"><table class="gc-t"><thead><tr><th>HSN</th><th>Goods</th><th>Rate</th><th>Since</th><th></th></tr></thead><tbody>'
      + (S.rows.length ? S.rows.map(function (r) {
        return '<tr><td><b>' + E(r.hsn) + '</b></td><td>' + E(r.description || '') + '</td><td><b>' + pct(r.rate) + '</b></td><td>' + dmy(r.since) + '</td>'
          + '<td style="white-space:nowrap"><button class="gc-b" onclick="AuraGstCentral.changeForm(\'' + E(r.hsn) + '\')">Change rate</button> <button class="gc-b r" onclick="AuraGstCentral.delRow(\'' + E(r.hsn) + '\')">Remove</button></td></tr>'
          + '<tr id="gcf-' + E(r.hsn) + '" style="display:none"><td colspan="5"></td></tr>';
      }).join('') : '<tr><td colspan="5" class="gc-tiny">No rows yet.</td></tr>')
      + '</tbody></table></div>'
      + '<details style="margin-top:10px"><summary class="gc-b" style="display:inline-flex">&#10133; Add an HSN to the list</summary><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-top:8px">'
      + '<div><div class="gc-tiny">HSN (4-8 digits)</div><input class="gc-in" id="gca-hsn" inputmode="numeric" maxlength="8" style="width:110px"/></div>'
      + '<div><div class="gc-tiny">Goods</div><input class="gc-in" id="gca-desc" style="width:240px"/></div>'
      + '<div><div class="gc-tiny">Rate today</div>' + rateSel('gca-rate', 5) + '</div><div><div class="gc-tiny">Since</div><input class="gc-in" type="date" id="gca-since"/></div>'
      + '<button class="gc-b g" onclick="AuraGstCentral.addRow()">Add</button></div><div class="gc-tiny" style="margin-top:4px">Adding a row records today\'s rate only; it does not change any product. To move products, use <b>Change rate</b>.</div></details></div>';
    /* 3. scheduled */
    h += '<div class="gc-card"><h3>&#128197; Approved, starting later (' + sched.length + ')</h3>' + (sched.length ? '<table class="gc-t"><tbody>' + sched.map(function (x) { return '<tr><td><b>HSN ' + E(x.hsn) + '</b></td><td>' + pct(x.old_rate) + ' &rarr; <b>' + pct(x.new_rate) + '</b></td><td>from <b>' + dmy(x.effective_from) + '</b></td><td class="gc-tiny">' + E(x.note || '') + '</td></tr>'; }).join('') + '</tbody></table><div class="gc-tiny">Applied automatically at 00:05 on that date.</div>' : '<div class="gc-tiny">None.</div>') + '</div>';
    /* 4. mismatch */
    h += '<div class="gc-card"><h3>&#128269; Products whose rate differs from the list</h3><div id="gc-mm" class="gc-tiny"><button class="gc-b" onclick="AuraGstCentral.mismatch()">Check now</button> Shows HSN codes where products are at another rate (possible wrong HSN, an exception, or an old rate).</div></div>';
    /* 5. watcher */
    h += '<div class="gc-card"><h3>&#128065; Government watcher</h3><table class="gc-t"><tbody>' + S.sources.map(function (s) {
      return '<tr><td>' + E(s.label || s.url) + '<div class="gc-tiny"><a href="' + E(s.url) + '" target="_blank" rel="noopener">' + E(s.url) + '</a></div></td><td>' + (s.last_check ? (s.last_ok ? '<span class="gc-pill" style="color:#0F7A4F">OK</span>' : '<span class="gc-pill" style="color:#B42318">Could not read</span>') + '<div class="gc-tiny">' + dmy(s.last_check) + (s.last_error ? ' &middot; ' + E(s.last_error) : '') + '</div>' : '<span class="gc-tiny">not checked yet</span>') + '</td></tr>';
    }).join('') + '</tbody></table>'
      + '<div style="margin-top:8px"><button class="gc-b g" id="gc-now" onclick="AuraGstCentral.checkNow()">Check the government pages now</button> <span class="gc-tiny" id="gc-now-st"></span></div>'
      + (S.seen.length ? '<div class="gc-tiny" style="margin-top:8px"><b>Last documents read:</b><br>' + S.seen.map(function (x) { return dmy(x.created_at) + ' &middot; ' + E(x.title || '') + ' &middot; <i>' + E({ read: 'rate change found', no_change: 'no rate change for medicines', error: 'could not read' }[x.status] || x.status) + '</i>'; }).join('<br>') + '</div>' : '') + '</div>';
    /* 6. history */
    h += '<div class="gc-card"><h3>&#128214; History</h3>' + (hist.length ? '<table class="gc-t"><thead><tr><th>HSN</th><th>Change</th><th>From</th><th>Result</th><th>By</th></tr></thead><tbody>' + hist.map(function (x) {
      return '<tr><td>' + E(x.hsn) + '</td><td>' + pct(x.old_rate) + ' &rarr; ' + pct(x.new_rate) + '</td><td>' + dmy(x.effective_from) + '</td><td>' + (x.status === 'applied' ? '<b>' + (x.products_changed || 0) + '</b> products changed' : 'rejected') + '</td><td class="gc-tiny">' + (x.source === 'watcher' ? 'found by watcher' : 'by admin') + (x.note ? ' &middot; ' + E(x.note) : '') + '</td></tr>';
    }).join('') + '</tbody></table>' : '<div class="gc-tiny">No changes yet.</div>') + '</div>';
    S.el.innerHTML = h + '</div>';
  }
  function changeForm(hsn) {
    var r = S.rows.filter(function (x) { return x.hsn === hsn; })[0]; if (!r) return;
    var tr = $('gcf-' + hsn); tr.style.display = tr.style.display === 'none' ? '' : 'none';
    tr.firstChild.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;padding:6px 0">'
      + '<div><div class="gc-tiny">Products now at</div>' + rateSel('gco-' + hsn, Number(r.rate) === 5 ? 12 : r.rate) + '</div><div><div class="gc-tiny">move to</div>' + rateSel('gcn-' + hsn, r.rate) + '</div>'
      + '<div><div class="gc-tiny">starting</div><input class="gc-in" type="date" id="gcd-' + hsn + '" value="' + today() + '"/></div>'
      + '<div><div class="gc-tiny">Reason / notification</div><input class="gc-in" id="gcr-' + hsn + '" style="width:220px" placeholder="e.g. Notification 9/2025-CT(R)"/></div>'
      + '<button class="gc-b" onclick="AuraGstCentral.previewRow(\'' + hsn + '\')">Who is affected?</button><button class="gc-b g" onclick="AuraGstCentral.saveChange(\'' + hsn + '\')">Save change</button></div>'
      + '<div class="gc-tiny" id="gcp-' + hsn + '"></div>';
  }
  function previewText(p, oldR, newR, from) {
    var other = Object.keys(p.left_alone_by_rate || {}).map(function (k) { return p.left_alone_by_rate[k] + ' at ' + pct(k); }).join(', ');
    return '<b>' + p.products + '</b> product' + (p.products === 1 ? '' : 's') + ' (' + p.pharmacy + ' pharmacy, ' + p.wholesale + ' wholesale) in <b>' + p.businesses + '</b> business' + (p.businesses === 1 ? '' : 'es')
      + ' will move from ' + pct(oldR) + ' to <b>' + pct(newR) + '</b>' + (from > today() ? ' on ' + dmy(from) : ' now') + '.' + (other ? ' Left alone: ' + other + '.' : '');
  }
  async function previewRow(hsn) {
    var o = Number($('gco-' + hsn).value), n = Number($('gcn-' + hsn).value), d = $('gcd-' + hsn).value;
    var r = await db().rpc('aura_gst_preview', { p_hsn: hsn, p_old: o }); $('gcp-' + hsn).innerHTML = r.error ? E(err(r.error)) : previewText(r.data, o, n, d);
  }
  async function saveChange(hsn) {
    var o = Number($('gco-' + hsn).value), n = Number($('gcn-' + hsn).value), d = $('gcd-' + hsn).value || today();
    if (o === n) { toast('The new rate is the same as the old one.'); return; }
    var p = await db().rpc('aura_gst_preview', { p_hsn: hsn, p_old: o }); if (p.error) { toast(err(p.error)); return; }
    if (!confirm('HSN ' + hsn + ': ' + o + '% to ' + n + '% ' + (d > today() ? 'from ' + dmy(d) : 'now') + '\n\n' + p.data.products + ' products in ' + p.data.businesses + ' businesses will change.\nBills already made do not change.\n\nSave?')) return;
    var r = await db().rpc('aura_gst_change', { p_hsn: hsn, p_description: (S.rows.filter(function (x) { return x.hsn === hsn; })[0] || {}).description || '', p_old: o, p_new: n, p_from: d, p_note: $('gcr-' + hsn).value, p_url: '' });
    if (r.error) { toast(err(r.error)); return; }
    toast(r.data.applied_now ? 'Done: ' + r.data.products_changed + ' products changed.' : 'Saved. It starts on ' + dmy(d) + '.'); load();
  }
  async function preview(id) {
    var o = Number($('gpo-' + id).value), n = Number($('gpn-' + id).value), d = $('gpd-' + id).value, x = S.changes.filter(function (c) { return c.id === id; })[0];
    var r = await db().rpc('aura_gst_preview', { p_hsn: x.hsn, p_old: o }); $('gpp-' + id).innerHTML = r.error ? E(err(r.error)) : previewText(r.data, o, n, d);
  }
  async function decide(id, yes) {
    var o = Number($('gpo-' + id).value), n = Number($('gpn-' + id).value), d = $('gpd-' + id).value;
    if (yes && o === n) { toast('The new rate is the same as the old one.'); return; }
    if (!confirm(yes ? 'Approve this change? Products still at ' + o + '% move to ' + n + '% ' + (d > today() ? 'on ' + dmy(d) : 'now') + '.' : 'Reject this change? Nothing will change.')) return;
    var r = await db().rpc('aura_gst_decide', { p_id: id, p_approve: yes, p_old: o, p_new: n, p_from: d });
    if (r.error) { toast(err(r.error)); return; }
    toast(yes ? (r.data.status === 'applied' ? 'Approved: ' + r.data.products_changed + ' products changed.' : 'Approved. It starts on ' + dmy(d) + '.') : 'Rejected.'); load();
  }
  async function addRow() {
    var h = ($('gca-hsn').value || '').replace(/\D/g, ''); if (!/^\d{4,8}$/.test(h)) { toast('HSN must be 4 to 8 digits.'); return; }
    var r = await db().rpc('aura_gst_set_row', { p_hsn: h, p_description: $('gca-desc').value, p_rate: Number($('gca-rate').value), p_since: $('gca-since').value || null });
    if (r.error) { toast(err(r.error)); return; } toast('Added.'); load();
  }
  async function delRow(hsn) {
    if (!confirm('Remove HSN ' + hsn + ' from the list? No product changes.')) return;
    var r = await db().rpc('aura_gst_delete_row', { p_hsn: hsn }); if (r.error) { toast(err(r.error)); return; } load();
  }
  async function mismatch() {
    var el = $('gc-mm'); el.innerHTML = 'Checking&hellip;';
    var r = await db().rpc('aura_gst_mismatch'); if (r.error) { el.innerHTML = E(err(r.error)); return; }
    var L = r.data || [];
    el.innerHTML = L.length ? '<table class="gc-t"><thead><tr><th>HSN</th><th>List says</th><th>Products at</th><th>How many</th><th>Businesses</th></tr></thead><tbody>' + L.map(function (x) { return '<tr><td>' + E(x.hsn) + '</td><td>' + pct(x.list_rate) + '</td><td><b>' + pct(x.product_rate) + '</b></td><td>' + x.n + '</td><td>' + x.businesses + '</td></tr>'; }).join('') + '</tbody></table><div class="gc-tiny">If a whole group is still at an old rate, use <b>Change rate</b> on that HSN to move them.</div>' : '&#10003; Every product matches the list.';
  }
  async function checkNow() {
    var b = $('gc-now'), st = $('gc-now-st'); b.disabled = true; st.textContent = 'Checking (up to 2 minutes)…';
    try {
      var r = await db().functions.invoke('gst-watcher', { body: { mode: 'check_now' } });
      var d = r.data; if (!d || !d.ok) throw new Error((d && d.reason) || (r.error && r.error.message) || 'Could not run the watcher. Is the gst-watcher function deployed?');
      st.textContent = d.found ? d.found + ' change(s) found — see "waiting for your approval".' : 'Checked. No new rate changes for medicines.';
      load();
    } catch (e) { st.textContent = '⚠ ' + (e.message || e); }
    finally { b.disabled = false; }
  }
  function mount(id) {
    S.el = $(id); if (!S.el) return;
    if (!$('gc-css')) { var st = document.createElement('style'); st.id = 'gc-css'; st.textContent = css; document.head.appendChild(st); }
    load();
  }
  window.AuraGstCentral = { mount: mount, load: load, changeForm: changeForm, previewRow: previewRow, saveChange: saveChange, preview: preview, decide: decide, addRow: addRow, delRow: delRow, mismatch: mismatch, checkNow: checkNow };
})();
