/* ═══════════════════════════════════════════════════════════════
   AuraScale NH — shared logic for receptionist.html and doctor.html
   nh.html (Owner portal) does NOT load this file — it keeps its own
   already-hardened internals untouched. This file exists so the two
   newer portals share one copy of common logic instead of duplicating
   it, and so fixing a bug here fixes both portals at once.
   ═══════════════════════════════════════════════════════════════ */

const SUPABASE_URL='https://qquyqejqrxfhtmidmgkb.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdXlxZWpxcnhmaHRtaWRtZ2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NzA1MTIsImV4cCI6MjA5NjM0NjUxMn0.b7TgPU6ZzhC3-ahx-j0BRiRpJ9geyEMkePpV7KFyoZI';
const _supa=supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true}});

var _clinicId=null;
var _myUid=null;
var _myRole=null;
var _facilityName='';

/* ── AUTH GUARD ──
   Every page that loads this file calls nhAuthGuard('doctor') or
   nhAuthGuard('receptionist') before rendering anything. This is the
   real routing enforcement point:
   - not logged in            → send to nh.html to sign in
   - logged in, wrong role    → send to that role's correct portal
   - logged in, correct role  → proceed, with _clinicId/_myUid/_myRole set
   Database RLS is the actual security boundary (a wrong-role session
   cannot read another role's data even if this redirect were somehow
   bypassed) — this guard is what makes the *experience* correct. */
function _nhWithTimeout(promise,ms,label){
  return Promise.race([
    promise,
    new Promise(function(_,reject){setTimeout(function(){reject(new Error('Timed out loading '+label+'. Please check your internet connection and try again.'));},ms);})
  ]);
}
async function nhAuthGuard(requiredRole){
  try{
    var userRes=await _nhWithTimeout(_supa.auth.getUser(),20000,'your session');
    var user=userRes.data&&userRes.data.user;
    if(!user){ window.location.href='nh.html'; return null; }
    _myUid=user.id;

    var staffRow=await _nhWithTimeout(_supa.from('nh_staff').select('clinic_id,role,full_name,is_active').eq('id',user.id).single(),20000,'your staff record');
    if(!staffRow.data||!staffRow.data.clinic_id){ window.location.href='nh.html'; return null; }
    if(staffRow.data.is_active===false){
      await _supa.auth.signOut();
      alert('Your account has been deactivated. Contact your facility owner.');
      window.location.href='nh.html';
      return null;
    }
    _myRole=staffRow.data.role;
    _clinicId=staffRow.data.clinic_id;

    if(_myRole!==requiredRole){
      var dest=_myRole==='owner'?'nh.html':(_myRole==='doctor'?'doctor.html':'receptionist.html');
      window.location.href=dest;
      return null;
    }

    var cl=await _nhWithTimeout(_supa.from('clinics').select('name,is_approved').eq('id',_clinicId).single(),20000,'your facility details');
    if(!cl.data||!cl.data.is_approved){
      alert('This facility is not yet active.');
      window.location.href='nh.html';
      return null;
    }
    _facilityName=cl.data.name||'Nursing Home';
    return {uid:_myUid,clinicId:_clinicId,role:_myRole,facilityName:_facilityName};
  }catch(e){
    console.error('nhAuthGuard failed:',e);
    var loadingEl=document.getElementById('loading');
    if(loadingEl){loadingEl.textContent=e.message||'Something went wrong. Please try refreshing.';}
    else{alert(e.message||'Something went wrong. Please try refreshing.');}
    return null;
  }
}

async function handleLogout(){
  await _supa.auth.signOut();
  window.location.href='nh.html';
}

/* ── TOAST / MODAL HELPERS ── */
function showToast(msg){
  var t=document.getElementById('nh-toast');
  if(!t)return;
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(function(){t.classList.remove('show');},3200);
}
function openModal(id){ var m=document.getElementById(id); if(m)m.classList.add('open'); }
function closeModal(id){ var m=document.getElementById(id); if(m)m.classList.remove('open'); }

/* ── PERSISTENT PATIENTS ── */
async function findOrCreatePatient(name,phone,age,gender,assignedDoctorId){
  if(phone){
    var existing=await _supa.from('nh_patients').select('id').eq('clinic_id',_clinicId).eq('phone',phone).limit(1);
    if(existing.data&&existing.data.length){
      if(assignedDoctorId){await _supa.from('nh_patients').update({assigned_doctor_id:assignedDoctorId}).eq('id',existing.data[0].id);}
      return existing.data[0].id;
    }
  }
  var created=await _supa.from('nh_patients').insert({clinic_id:_clinicId,full_name:name,phone:phone,age:age,gender:gender,assigned_doctor_id:assignedDoctorId||null,needs_review:!!assignedDoctorId}).select('id').single();
  return created.data?created.data.id:null;
}

/* ── DOCUMENTS: upload → store original → best-effort extraction.
   Extraction is always a DRAFT — clearly labeled, never auto-applied. ── */
async function uploadPatientDocument(file,patientId,onDone){
  if(!file||!patientId)return;
  showToast('Uploading document…');
  var path=_clinicId+'/'+patientId+'/'+Date.now()+'_'+file.name.replace(/[^a-zA-Z0-9._-]/g,'_');
  var up=await _supa.storage.from('nh-documents').upload(path,file);
  if(up.error){showToast('Upload failed: '+up.error.message);return;}
  var extractedText='';
  var summary={};
  if(file.type==='application/pdf'){
    try{
      var buf=await file.arrayBuffer();
      var pdf=await pdfjsLib.getDocument({data:buf}).promise;
      var text='';
      for(var i=1;i<=Math.min(pdf.numPages,10);i++){
        var page=await pdf.getPage(i);
        var content=await page.getTextContent();
        text+=content.items.map(function(it){return it.str}).join(' ')+'\n';
      }
      extractedText=text.trim();
      var phoneMatch=extractedText.match(/\b\d{10}\b/);
      var ageMatch=extractedText.match(/\bage[:\s]+(\d{1,3})\b/i);
      summary={possiblePhone:phoneMatch?phoneMatch[0]:null,possibleAge:ageMatch?ageMatch[1]:null};
    }catch(e){ extractedText='(Could not extract text from this PDF automatically — original file is still saved.)'; }
  }else{
    extractedText='(Extraction is currently supported for PDF files. The original image is saved and viewable.)';
  }
  await _supa.from('nh_patient_documents').insert({
    clinic_id:_clinicId,patient_id:patientId,file_path:path,file_name:file.name,
    doc_type:file.type,extracted_text:extractedText,extracted_summary:summary,uploaded_by:_myUid
  });
  await _supa.from('nh_audit_log').insert({clinic_id:_clinicId,actor_id:_myUid,action:'document_upload',target_table:'nh_patient_documents',target_id:patientId,details:{file_name:file.name}});
  showToast('Document uploaded — original preserved, extracted text is a draft, needs review.');
  if(onDone)onDone();
}
async function viewOriginalDoc(path){
  var r=await _supa.storage.from('nh-documents').createSignedUrl(path,300);
  if(r.error||!r.data){showToast('Could not open document: '+(r.error?r.error.message:'unknown error'));return;}
  window.open(r.data.signedUrl,'_blank');
}
var _docExtractCache={};
async function loadPatientDocumentsInto(patientId,elId,canUpload){
  var r=await _supa.from('nh_patient_documents').select('*').eq('patient_id',patientId).order('created_at',{ascending:false});
  var el=document.getElementById(elId);
  if(!el)return;
  if(!r.data||!r.data.length){el.innerHTML='<p class="ss">No documents uploaded yet.</p>';return;}
  el.innerHTML=r.data.map(function(d){
    _docExtractCache[d.id]=d.extracted_text||'';
    var fileName=(d.file_name||'Document').replace(/</g,'&lt;');
    return '<div class="doc-card">'
      +'<div class="doc-ic">📄</div>'
      +'<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:12px">'+fileName+'</div>'
      +'<div class="ss">'+new Date(d.created_at).toLocaleDateString('en-GB')+(d.extracted_text?' · Extracted / Draft — Needs Review':'')+'</div></div>'
      +'<button class="qbtn" onclick="viewOriginalDoc(\''+d.file_path+'\')">Original</button>'
      +(d.extracted_text?'<button class="qbtn" onclick="openExtractedTextEditor(\''+d.id+'\')">Extracted (Draft)</button>':'')
      +'</div>';
  }).join('');
}
var _activeExtractDocId=null;
function openExtractedTextEditor(docId){
  _activeExtractDocId=docId;
  var box=document.getElementById('extract-edit-box');
  var ta=document.getElementById('extract-edit-textarea');
  if(!box||!ta){
    /* Fallback if a page hasn't included the editor modal markup */
    alert('Extracted / Draft — Needs Review:\n\n'+(_docExtractCache[docId]||''));
    return;
  }
  ta.value=_docExtractCache[docId]||'';
  openModal('mod-extract-editor');
}
async function saveExtractedTextCorrection(){
  if(!_activeExtractDocId)return;
  var ta=document.getElementById('extract-edit-textarea');
  var corrected=ta.value;
  var r=await _supa.from('nh_patient_documents').update({extracted_text:corrected}).eq('id',_activeExtractDocId);
  if(r.error){showToast('Error: '+r.error.message);return;}
  await _supa.from('nh_audit_log').insert({clinic_id:_clinicId,actor_id:_myUid,action:'extracted_text_corrected',target_table:'nh_patient_documents',target_id:_activeExtractDocId});
  _docExtractCache[_activeExtractDocId]=corrected;
  closeModal('mod-extract-editor');
  showToast('Correction saved');
}

/* ── SPEECH PROVIDER (modular — swap .provider to change engine later) ── */
var NHSpeech={
  provider:{
    name:'webspeech',
    _rec:null,
    isSupported:function(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);},
    start:function(opts){
      var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      this._rec=new SR();
      this._rec.lang=opts.lang||'en-IN';
      this._rec.continuous=true;
      this._rec.interimResults=true;
      this._rec.onresult=function(e){
        var t='';
        for(var i=0;i<e.results.length;i++){t+=e.results[i][0].transcript;}
        opts.onResult(t);
      };
      this._rec.onerror=function(e){opts.onError&&opts.onError(e.error);};
      this._rec.onend=function(){opts.onEnd&&opts.onEnd();};
      this._rec.start();
    },
    stop:function(){ if(this._rec){try{this._rec.stop();}catch(e){}} }
  },
  start:function(opts){
    if(!this.provider.isSupported()){opts.onError&&opts.onError('unsupported');return false;}
    this.provider.start(opts);
    return true;
  },
  stop:function(){ this.provider.stop(); }
};

/* ── AYUSHMAN / PM-JAY (internal record only — never fabricate official verification) ── */
async function loadPatientAyushmanInto(patientId,elId,editable){
  var r=await _supa.from('nh_ayushman_cases').select('*').eq('patient_id',patientId).order('updated_at',{ascending:false}).limit(1);
  var el=document.getElementById(elId);
  if(!el)return;
  var existing=r.data&&r.data.length?r.data[0]:null;
  el.innerHTML='<div class="extract-box">Internal Record only — confirm real status on the official Ayushman Bharat / PM-JAY portal.</div>'
    +(existing?('<div style="font-size:12.5px"><b>Status:</b> '+existing.status.replace(/_/g,' ')+'<br><b>Beneficiary ID:</b> '+(existing.beneficiary_id||'—')+'<br><b>ABHA ID:</b> '+(existing.abha_id||'—')+'<br><b>Notes:</b> '+(existing.notes||'—')+'</div>'):'<p class="ss">No case recorded yet.</p>')
    +(editable?('<button class="add-btn" style="margin-top:10px" onclick="openModal(\'mod-ayushman\')">'+(existing?'Update Case':'+ Start Case')+'</button>'):'');
}
async function saveAyushmanCase(patientId,onDone){
  var beneficiary=(document.getElementById('ay-beneficiary').value||'').trim();
  var abha=(document.getElementById('ay-abha').value||'').trim();
  var status=document.getElementById('ay-status').value;
  var notes=(document.getElementById('ay-notes').value||'').trim();
  var existing=await _supa.from('nh_ayushman_cases').select('id').eq('patient_id',patientId).limit(1);
  var payload={clinic_id:_clinicId,patient_id:patientId,beneficiary_id:beneficiary,abha_id:abha,status:status,notes:notes,created_by:_myUid,updated_at:new Date().toISOString()};
  var res;
  if(existing.data&&existing.data.length){res=await _supa.from('nh_ayushman_cases').update(payload).eq('id',existing.data[0].id);}
  else{res=await _supa.from('nh_ayushman_cases').insert(payload);}
  if(res.error){showToast('Error: '+res.error.message);return;}
  await _supa.from('nh_audit_log').insert({clinic_id:_clinicId,actor_id:_myUid,action:'ayushman_case_update',target_table:'nh_ayushman_cases',target_id:patientId,details:{status:status}});
  closeModal('mod-ayushman');
  showToast('Ayushman case saved');
  if(onDone)onDone();
}
