/* ══════════════════════════════════════════════════════════════════
   AuraScale NH — nh-shared.js
   Shared foundation for doctor.html and receptionist.html
   Extracted from nh__2_.html patterns · Same Supabase project
══════════════════════════════════════════════════════════════════ */

'use strict';

/* ── SUPABASE CLIENT (shared instance) ──────────────────────────── */
var SUPABASE_URL = 'https://qquyqejqrxfhtmidmgkb.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdXlxZWpxcnhmaHRtaWRtZ2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NzA1MTIsImV4cCI6MjA5NjM0NjUxMn0.b7TgPU6ZzhC3-ahx-j0BRiRpJ9geyEMkePpV7KFyoZI';
var _supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

/* ── SHARED STATE (written by nhAuthGuard, read by all portals) ─── */
var _clinicId = null;
var _myUid    = null;
var _myRole   = null;
var _myName   = null;

/* ── AUTH GUARD ─────────────────────────────────────────────────────
   Call at the top of every portal init().
   requiredRole: 'receptionist' | 'doctor' | 'owner' | null (any)
   Returns { facilityName, role, uid, clinicId } on success,
   or null if auth fails (and handles redirect automatically).      */
async function nhAuthGuard(requiredRole) {
  function withTimeout(p, ms, label) {
    return Promise.race([
      p,
      new Promise(function(_, rej) {
        setTimeout(function() {
          rej(new Error('Timed out loading ' + label + '. Check your connection.'));
        }, 20000);
      })
    ]);
  }

  try {
    var userRes = await withTimeout(_supa.auth.getUser(), 20000, 'session');
    var user = userRes.data && userRes.data.user;
    if (!user) { window.location.href = 'nh.html'; return null; }

    _myUid = user.id;

    /* Resolve clinic via nh_staff (covers invited doctor/receptionist logins) */
    var staffRow = await withTimeout(
      _supa.from('nh_staff')
        .select('clinic_id,role,full_name,is_active')
        .eq('id', user.id)
        .single(),
      20000, 'staff record'
    );

    var clinicId = null;
    if (staffRow.data && staffRow.data.clinic_id) {
      clinicId  = staffRow.data.clinic_id;
      _myRole   = staffRow.data.role || 'owner';
      _myName   = staffRow.data.full_name || null;
      if (staffRow.data.is_active === false) {
        await _supa.auth.signOut();
        window.location.href = 'nh.html';
        return null;
      }
    } else {
      /* Legacy owner lookup (predates nh_staff) */
      var legacy = await withTimeout(
        _supa.from('clinics')
          .select('id')
          .eq('owner_id', user.id)
          .eq('facility_type', 'nursing_home')
          .single(),
        20000, 'facility (legacy)'
      );
      if (legacy.data) {
        clinicId = legacy.data.id;
        _myRole  = 'owner';
        _myName  = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || null;
        await _supa.from('nh_staff').upsert({ id: user.id, clinic_id: clinicId, role: 'owner', full_name: _myName });
      }
    }

    if (!clinicId) { window.location.href = 'nh.html'; return null; }

    /* Role mismatch → redirect to the right portal */
    if (requiredRole && _myRole !== requiredRole) {
      var portals = { owner: 'nh.html', doctor: 'doctor.html', receptionist: 'receptionist.html' };
      window.location.href = portals[_myRole] || 'nh.html';
      return null;
    }

    var cl = await withTimeout(
      _supa.from('clinics').select('id,name,is_approved').eq('id', clinicId).single(),
      20000, 'facility details'
    );

    if (!cl.data) { window.location.href = 'nh.html'; return null; }

    if (!cl.data.is_approved) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;text-align:center;padding:20px"><div><div style="font-size:40px;margin-bottom:16px">⏳</div><h2>Account Pending Activation</h2><p style="color:#666;margin:12px 0 20px">Your AuraScale NH account is being reviewed. We activate within 24 hours.</p><a href="https://wa.me/919330660325?text=Hi, please activate my AuraScale NH account." target="_blank" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;text-decoration:none">📲 WhatsApp Us</a></div></div>';
      return null;
    }

    _clinicId = cl.data.id;

    /* Final fallback so the UI always has something sensible to show */
    if (!_myName) {
      _myName = (user.email ? user.email.split('@')[0] : 'User');
    }

    /* Set role on body for CSS visibility rules */
    document.body.setAttribute('data-role', _myRole);

    return {
      facilityName : cl.data.name || 'Nursing Home',
      role         : _myRole,
      uid          : _myUid,
      clinicId     : _clinicId,
      name         : _myName
    };

  } catch (e) {
    console.error('nhAuthGuard failed:', e);
    window.location.href = 'nh.html';
    return null;
  }
}

/* ── LOGOUT ─────────────────────────────────────────────────────── */
async function handleLogout() {
  await _supa.auth.signOut();
  window.location.href = 'nh.html';
}

/* ── TOAST ──────────────────────────────────────────────────────── */
function showToast(msg) {
  var t = document.getElementById('nh-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

/* ── HTML ESCAPE ─────────────────────────────────────────────────── */
function esc(s) {
  return String(s)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* ── FIND OR CREATE PATIENT ─────────────────────────────────────────
   Matches nh__2_.html's logic exactly:
   - Looks up by phone first (deduplicates returning patients)
   - Creates a new record only if not found
   - Updates assigned_doctor_id and needs_review if provided          */
async function findOrCreatePatient(name, phone, age, gender, assignedDoctorId) {
  if (!_clinicId) return null;

  if (phone) {
    var existing = await _supa
      .from('nh_patients')
      .select('id')
      .eq('clinic_id', _clinicId)
      .eq('phone', phone)
      .limit(1);

    if (existing.data && existing.data.length) {
      var existingId = existing.data[0].id;
      if (assignedDoctorId) {
        await _supa.from('nh_patients')
          .update({ assigned_doctor_id: assignedDoctorId })
          .eq('id', existingId);
      }
      return existingId;
    }
  }

  var created = await _supa
    .from('nh_patients')
    .insert({
      clinic_id          : _clinicId,
      full_name          : name,
      phone              : phone,
      age                : age,
      gender             : gender,
      assigned_doctor_id : assignedDoctorId || null,
      needs_review       : !!assignedDoctorId
    })
    .select('id')
    .single();

  return created.data ? created.data.id : null;
}

/* ── UPLOAD PATIENT DOCUMENT ────────────────────────────────────────
   Uploads a file (image or PDF) to nh-documents storage, saves a row
   in nh_patient_documents, and extracts text from PDFs automatically.
   callback() is called after the upload completes (pass null to skip). */
async function uploadPatientDocument(file, patientId, callback) {
  if (!file || !patientId || !_clinicId) return;

  showToast('Uploading document…');

  var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  var path = _clinicId + '/' + patientId + '/' + Date.now() + '_' + safeName;

  var up = await _supa.storage.from('nh-documents').upload(path, file);
  if (up.error) { showToast('Upload failed: ' + up.error.message); return; }

  /* Best-effort PDF text extraction — draft only, must be verified */
  var extractedText = '';
  if (file.type === 'application/pdf') {
    try {
      if (window.pdfjsLib) {
        var buf = await file.arrayBuffer();
        var pdf = await pdfjsLib.getDocument({ data: buf }).promise;
        var text = '';
        for (var i = 1; i <= Math.min(pdf.numPages, 10); i++) {
          var page = await pdf.getPage(i);
          var content = await page.getTextContent();
          text += content.items.map(function(it) { return it.str; }).join(' ') + '\n';
        }
        extractedText = text.trim();
      }
    } catch (e) {
      extractedText = '(PDF text extraction failed — original file is saved.)';
    }
  } else if (file.type.startsWith('image/')) {
    extractedText = '(Image document — view the original to read content.)';
  }

  var docType = file.type;
  /* Use the uploaded_by field from nh__2_.html for consistency */
  await _supa.from('nh_patient_documents').insert({
    clinic_id      : _clinicId,
    patient_id     : patientId,
    file_path      : path,
    file_name      : file.name,
    doc_type       : docType,
    extracted_text : extractedText,
    uploaded_by    : _myUid
  });

  await _supa.from('nh_audit_log').insert({
    clinic_id    : _clinicId,
    actor_id     : _myUid,
    action       : 'document_upload',
    target_table : 'nh_patient_documents',
    target_id    : patientId,
    details      : { file_name: file.name }
  });

  showToast('Document uploaded · ' + (extractedText ? 'Text extracted — review before use' : 'Saved'));

  if (typeof callback === 'function') callback();
}

/* ── LOAD PATIENT DOCUMENTS INTO ELEMENT ───────────────────────────
   Renders the document list for a patient into a given element ID.
   Matches the card layout from nh__2_.html's loadPatientDocuments.
   editable: if true, includes View Original button; always safe.     */
async function loadPatientDocumentsInto(patientId, elementId, editable) {
  var el = document.getElementById(elementId);
  if (!el) return;

  var r = await _supa
    .from('nh_patient_documents')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });

  if (!r.data || !r.data.length) {
    el.innerHTML = '<p style="font-size:12px;color:var(--text-tertiary)">No documents uploaded yet.</p>';
    return;
  }

  el.innerHTML = r.data.map(function(d) {
    var typeIcon = d.doc_type === 'application/pdf' ? '📄' :
                  d.doc_type && d.doc_type.startsWith('image/') ? '🖼️' : '📎';
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:var(--r-md);margin-bottom:8px;background:var(--surface)">'
      + '<div style="width:32px;height:32px;border-radius:8px;background:var(--blue-bg);color:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + typeIcon + '</div>'
      + '<div style="flex:1;min-width:0">'
        + '<div style="font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(d.file_name || 'Document') + '</div>'
        + '<div style="font-size:10.5px;color:var(--text-tertiary)">' + new Date(d.created_at).toLocaleDateString('en-GB')
          + (d.extracted_text ? ' · text available' : '') + '</div>'
      + '</div>'
      + (editable
          ? '<button class="qbtn" onclick="viewOriginalDocShared(\'' + esc(d.file_path) + '\')">View</button>'
          + (d.extracted_text ? '<button class="qbtn" onclick="viewExtractedShared(\'' + esc(d.id) + '\')">Extracted</button>' : '')
          : '')
      + '</div>';
  }).join('');
}

/* ── DOCUMENT HELPERS (used by loadPatientDocumentsInto buttons) ─── */
async function viewOriginalDocShared(path) {
  var r = await _supa.storage.from('nh-documents').createSignedUrl(path, 300);
  if (r.error || !r.data) { showToast('Could not open: ' + (r.error ? r.error.message : 'unknown')); return; }
  window.open(r.data.signedUrl, '_blank');
}
async function viewExtractedShared(docId) {
  var r = await _supa.from('nh_patient_documents').select('extracted_text').eq('id', docId).single();
  if (r.data && r.data.extracted_text) {
    alert('Extracted text (AI draft — verify against original document):\n\n' + r.data.extracted_text);
  } else {
    showToast('No extracted text available for this document.');
  }
}

/* ── SPEECH (NHSpeech) ──────────────────────────────────────────────
   Modular voice provider — matches nh__2_.html's NHSpeech exactly.
   Swap NHSpeech.provider to change STT engine without touching callers. */
var NHSpeech = {
  provider: {
    name: 'webspeech',
    _rec: null,
    isSupported: function() {
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    },
    start: function(opts) {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      this._rec = new SR();
      this._rec.lang = opts.lang || 'en-IN';
      this._rec.continuous = true;
      this._rec.interimResults = true;
      this._rec.onresult = function(e) {
        var t = '';
        for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
        opts.onResult(t);
      };
      this._rec.onerror = function(e) { if (opts.onError) opts.onError(e.error); };
      this._rec.onend   = function()  { if (opts.onEnd)   opts.onEnd();          };
      this._rec.start();
    },
    stop: function() {
      if (this._rec) { try { this._rec.stop(); } catch(e) {} }
    }
  },
  start: function(opts) {
    if (!this.provider.isSupported()) {
      if (opts.onError) opts.onError('unsupported');
      return false;
    }
    this.provider.start(opts);
    return true;
  },
  stop: function() { this.provider.stop(); }
};

/* ── THEME TOGGLE ───────────────────────────────────────────────── */
(function() {
  var th = localStorage.getItem('nh-theme') || 'light';
  document.documentElement.setAttribute('data-theme', th);
})();
function toggleTheme() {
  var th = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', th);
  localStorage.setItem('nh-theme', th);
}

/* ── SESSION RESTORE ─────────────────────────────────────────────── */
/* Each portal's init() calls nhAuthGuard — no extra listener needed.
   Supabase persists the session automatically via localStorage.      */
