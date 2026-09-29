// Prototipo Boxeo JBO: navegación entre vistas, horarios y formularios de demo
const H={Lunes:['9:00','15:50','17:00','18:30','20:00'],Martes:['17:00','18:30','20:00'],'Miércoles':['9:00','15:50','17:00','18:30','20:00'],Jueves:['17:00','18:30','20:00'],Viernes:['9:00','15:50','17:00','18:30','20:00'],'Sábado':['10:00','11:00','11:20']};
document.getElementById('sched').innerHTML=Object.entries(H).map(([d,t])=>`<div class="card day"><h4>${d}</h4>${t.map(x=>`<div class="slot ${d==='Sábado'&&x==='11:20'?'kids':''}">${x}${d==='Sábado'&&x==='11:20'?'<small>KIDS</small>':''}</div>`).join('')}</div>`).join('');

function go(v){document.querySelectorAll('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));document.querySelectorAll('#demo button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));window.scrollTo(0,0);if(v==='prueba')tGo(1);reveal()}
document.querySelectorAll('#demo button').forEach(b=>b.onclick=()=>go(b.dataset.v));

// trial days: next 7 days with classes
const dn=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],full={1:'Lunes',2:'Martes',3:'Miércoles',4:'Jueves',5:'Viernes',6:'Sábado'};
let days=[],sd=0,st=0;const base=new Date(2026,8,29);
for(let i=0;days.length<7&&i<10;i++){const d=new Date(base);d.setDate(base.getDate()+i);if(full[d.getDay()])days.push(d)}
function renderDays(){document.getElementById('tdays').innerHTML=days.map((d,i)=>`<button class="dchip ${i===sd?'on':''}" data-i="${i}"><span>${dn[d.getDay()]}</span><b>${d.getDate()}</b></button>`).join('');
 document.querySelectorAll('.dchip').forEach(b=>b.onclick=()=>{sd=+b.dataset.i;st=0;renderDays()});renderTimes()}
function renderTimes(){const t=H[full[days[sd].getDay()]];document.getElementById('ttimes').innerHTML=t.map((x,i)=>`<button class="tchip ${i===st?'on':''}" data-i="${i}">${x}</button>`).join('');
 document.querySelectorAll('.tchip').forEach(b=>b.onclick=()=>{st=+b.dataset.i;renderTimes()});
 const lbl=`${dn[days[sd].getDay()]} ${days[sd].getDate()} · ${t[st]}`;document.getElementById('tsum').textContent=lbl;document.getElementById('tok').textContent=`Tu clase de prueba quedó agendada para el ${lbl} hrs. Te enviamos la confirmación por WhatsApp.`}
renderDays();
let ts=1;function tGo(n){ts=n;document.querySelectorAll('[data-t]').forEach(e=>e.classList.toggle('on',+e.dataset.t===n));document.querySelectorAll('#tprog span').forEach((s,i)=>s.classList.toggle('on',i<Math.min(n,3)));document.getElementById('tprog').style.visibility=n===4?'hidden':'visible';window.scrollTo(0,0)}
function tNext(){tGo(ts+1)}function tBack(){ts>1&&ts<4?tGo(ts-1):go('public')}

function pmSetup(g,bank){document.querySelectorAll(g+' .pm-opt').forEach(b=>b.onclick=()=>{document.querySelectorAll(g+' .pm-opt').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById(bank).classList.toggle('on',b.dataset.pm==='tr')})}
pmSetup('#tpm','tbank');pmSetup('#ppm','pbank');
const DH={'Lunes, miércoles y viernes':['9:00','15:50','17:00','18:30'],'Lunes y miércoles':['20:00'],'Martes y jueves':['17:00','18:30'],'Martes y viernes':['20:00']};
dsel.innerHTML=Object.keys(DH).map(d=>`<option>${d}</option>`).join('');
const fillH=()=>hsel.innerHTML=DH[dsel.value].map(h=>`<option>${h} hrs</option>`).join('');dsel.onchange=fillH;fillH();
const clp=n=>'$'+n.toLocaleString('es-CL');
document.querySelectorAll('#plans .pp').forEach(b=>b.onclick=()=>{document.querySelectorAll('#plans .pp').forEach(x=>x.classList.remove('on'));b.classList.add('on');const v=clp(+b.dataset.p);pname.textContent=b.dataset.n;dh.style.display=b.dataset.dh?'':'none';pprice.textContent=v;ptotal.textContent=v;pbtn.textContent='Pagar '+v});
document.querySelectorAll('.copy').forEach(b=>b.onclick=()=>{b.lastChild.textContent='¡Copiado!';setTimeout(()=>b.lastChild.textContent='Copiar todos los datos',1500)});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function reveal(){document.querySelectorAll('.view.on .rv:not(.in)').forEach(e=>io.observe(e))}reveal();
