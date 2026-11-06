const $=s=>document.querySelector(s);
async function api(url,opts={}){const r=await fetch(url,{headers:{'Content-Type':'application/json'},...opts});const d=await r.json();if(!r.ok)throw Error(d.message||'Request failed');return d}
function notice(msg,error=false){const n=$('#notice');if(n){n.textContent=msg;n.className='notice show'+(error?' error':'')}}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
document.addEventListener('DOMContentLoaded',()=>{
 if($('#totalPatients'))api('/api/stats').then(d=>$('#totalPatients').textContent=d.totalPatients).catch(()=>$('#totalPatients').textContent='—');
 const form=$('#patientForm');
 if(form){
  const id=new URLSearchParams(location.search).get('edit');
  if(id)api('/api/patients/'+id).then(p=>{['name','email','phoneno','gender','age','problem'].forEach(k=>form.elements[k].value=p[k]);$('#formTitle').textContent='Edit Patient';$('#save').textContent='Save Changes'}).catch(e=>notice(e.message,true));
  form.addEventListener('submit',async e=>{e.preventDefault();const body=Object.fromEntries(new FormData(form));try{const d=await api(id?'/api/patients/'+id:'/api/patients',{method:id?'PUT':'POST',body:JSON.stringify(body)});notice(d.message);if(id)setTimeout(()=>location.href='patients.html',800);else form.reset()}catch(err){notice(err.message,true)}});
 }
 const rows=$('#rows');
 async function load(term=''){if(!rows)return;try{const data=await api('/api/patients?search='+encodeURIComponent(term));rows.innerHTML=data.length?data.map(p=>`<tr><td>${p.id}</td><td>${esc(p.name)}</td><td>${esc(p.email)}</td><td>${esc(p.phoneno)}</td><td>${esc(p.gender)}</td><td>${p.age}</td><td>${esc(p.problem)}</td><td><a class="btn secondary small" href="registration.html?edit=${p.id}">Edit</a> <button class="btn danger small" data-del="${p.id}">Delete</button></td></tr>`).join(''):'<tr><td colspan="8">No patients found.</td></tr>'}catch(e){rows.innerHTML=`<tr><td colspan="8">${esc(e.message)}</td></tr>`}}
 if(rows){load();$('#search').addEventListener('input',e=>load(e.target.value));rows.addEventListener('click',async e=>{const b=e.target.closest('[data-del]');if(b&&confirm('Delete this patient?'))try{await api('/api/patients/'+b.dataset.del,{method:'DELETE'});load($('#search').value)}catch(err){alert(err.message)}})}
});
