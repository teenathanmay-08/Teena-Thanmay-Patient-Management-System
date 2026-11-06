const express=require('express');
const path=require('path');
const db=require('./db');
const app=express(), PORT=process.env.PORT||3000;
app.use(express.json()); app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
function validate(p){
 const {name,email,phoneno,gender,age,problem}=p;
 if(![name,email,phoneno,gender,age,problem].every(v=>String(v??'').trim())) return 'All fields are required.';
 if(!/^\\S+@\\S+\\.\\S+$/.test(email)) return 'Enter a valid email.';
 if(!/^[0-9+() -]{7,15}$/.test(phoneno)) return 'Enter a valid phone number.';
 if(!['Male','Female','Other'].includes(gender)) return 'Select a valid gender.';
 if(!Number.isInteger(Number(age))||Number(age)<0||Number(age)>130) return 'Enter a valid age.';
 return null;
}
app.get('/api/stats',(q,s)=>db.query('SELECT COUNT(*) totalPatients FROM patients',(e,r)=>e?s.status(500).json({message:e.message}):s.json(r[0])));
app.get('/api/patients',(q,s)=>{
 const t='%'+String(q.query.search||'').trim()+'%';
 db.query('SELECT * FROM patients WHERE name LIKE ? OR email LIKE ? OR CAST(id AS CHAR) LIKE ? ORDER BY id DESC',[t,t,t],(e,r)=>e?s.status(500).json({message:e.message}):s.json(r));
});
app.get('/api/patients/:id',(q,s)=>db.query('SELECT * FROM patients WHERE id=?',[q.params.id],(e,r)=>e?s.status(500).json({message:e.message}):r.length?s.json(r[0]):s.status(404).json({message:'Patient not found.'})));
app.post('/api/patients',(q,s)=>{
 const err=validate(q.body); if(err)return s.status(400).json({message:err});
 const {name,email,phoneno,gender,age,problem}=q.body;
 db.query('INSERT INTO patients(name,email,phoneno,gender,age,problem) VALUES(?,?,?,?,?,?)',[name.trim(),email.trim(),phoneno.trim(),gender,Number(age),problem.trim()],(e,r)=>e?s.status(500).json({message:e.message}):s.status(201).json({message:'Patient registered successfully.',id:r.insertId}));
});
app.put('/api/patients/:id',(q,s)=>{
 const err=validate(q.body); if(err)return s.status(400).json({message:err});
 const {name,email,phoneno,gender,age,problem}=q.body;
 db.query('UPDATE patients SET name=?,email=?,phoneno=?,gender=?,age=?,problem=? WHERE id=?',[name.trim(),email.trim(),phoneno.trim(),gender,Number(age),problem.trim(),q.params.id],(e,r)=>e?s.status(500).json({message:e.message}):!r.affectedRows?s.status(404).json({message:'Patient not found.'}):s.json({message:'Patient updated successfully.'}));
});
app.delete('/api/patients/:id',(q,s)=>db.query('DELETE FROM patients WHERE id=?',[q.params.id],(e,r)=>e?s.status(500).json({message:e.message}):!r.affectedRows?s.status(404).json({message:'Patient not found.'}):s.json({message:'Patient deleted successfully.'})));
app.listen(PORT,()=>console.log('TEENA THANMAY Patient Management System running at http://localhost:'+PORT));
