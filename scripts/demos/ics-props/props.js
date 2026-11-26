/* ICS Real Estate demo · generated pages share this script. Leads go to the ICS CRM demo through ../ics-crm/store.js */
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],html=document.documentElement;
let L='en';try{L=localStorage.getItem('ics-lang')||'en'}catch(e){}
{const q=new URLSearchParams(location.search).get('lang');if(q&&/^(en|el|fr)$/.test(q))L=q}
const T=(en,el,fr)=>L==='el'?el:L==='fr'?(fr??en):en;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3600)};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
if($('#notesT'))$('#notesT').onclick=()=>html.classList.toggle('notes');
$$('.yr').forEach(e=>e.textContent=new Date().getFullYear());

/* language */
$$('[data-el]').forEach(e=>e.dataset.en=e.textContent);
$$('[data-ph-el]').forEach(e=>e.dataset.phEn=e.placeholder);
function setLang(l){L=l;html.lang=l;try{localStorage.setItem('ics-lang',l)}catch(e){}
 $$('[data-el]').forEach(e=>e.textContent=l==='el'?e.dataset.el:l==='fr'?(e.dataset.fr||e.dataset.en):e.dataset.en);
 $$('[data-ph-el]').forEach(e=>e.placeholder=l==='el'?e.dataset.phEl:l==='fr'?(e.dataset.phFr||e.dataset.phEn):e.dataset.phEn);
 $$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));
 $$('.desc-note').forEach(e=>e.hidden=l==='en');apply()}
$$('.lang').forEach(x=>x.onclick=e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.l)});
if($('.burger'))$('.burger').onclick=()=>{const m=$('.mnav');m.classList.toggle('on');$('.burger').textContent=m.classList.contains('on')?'✕':'☰'};

/* favourites */
let FAV=[];try{FAV=JSON.parse(localStorage.getItem('icsre-fav')||'[]')}catch(e){}
const favDraw=()=>{$$('[data-fav]').forEach(b=>{const on=FAV.includes(b.dataset.fav);b.textContent=on?'♥':'♡';b.setAttribute('aria-pressed',on)});$$('.favn').forEach(e=>e.textContent=FAV.length)};
document.addEventListener('click',e=>{const b=e.target.closest('[data-fav]');if(!b)return;e.preventDefault();const id=b.dataset.fav;FAV=FAV.includes(id)?FAV.filter(x=>x!==id):[...FAV,id];try{localStorage.setItem('icsre-fav',JSON.stringify(FAV))}catch(x){}favDraw();toast(FAV.includes(id)?T('Saved to your list','Αποθηκεύτηκε στη λίστα σας','Ajouté à votre liste'):T('Removed from your list','Αφαιρέθηκε από τη λίστα','Retiré de votre liste'));if(Q.saved)apply()});

/* listing filters (cards are static HTML; this only shows, hides and sorts them) */
const P=new URLSearchParams(location.search);
const Q={q:P.get('q')||'',city:P.get('city')||'',type:P.get('type')||'',beds:P.get('beds')||'',max:P.get('max')||'',sort:P.get('sort')||'new',saved:P.has('saved')};
function apply(){const g=$('#results');if(!g)return;
 const cards=$$('#results .pc');let n=0;
 cards.forEach(c=>{const d=c.dataset,ok=(!Q.q||d.s.includes(Q.q.toLowerCase()))&&(!Q.city||d.city===Q.city)&&(!Q.type||d.type===Q.type)&&(!Q.beds||+d.beds>=+Q.beds)&&(!Q.max||+d.price<=+Q.max)&&(!Q.saved||FAV.includes(d.id));c.style.display=ok?'':'none';if(ok)n++});
 const k={new:(a,b)=>b.dataset.date.localeCompare(a.dataset.date),asc:(a,b)=>a.dataset.price-b.dataset.price,desc:(a,b)=>b.dataset.price-a.dataset.price,size:(a,b)=>b.dataset.size-a.dataset.size}[Q.sort];
 cards.sort(k).forEach(c=>g.appendChild(c));
 $('#count').textContent=n;$('#noRes').hidden=n>0;
 const u=new URLSearchParams();Object.entries(Q).forEach(([a,b])=>{if(b&&!(a==='sort'&&b==='new'))u.set(a,b===true?'1':b)});history.replaceState(null,'',location.pathname+(u+''?'?'+u:''))}
if($('.fbar')){const f=$('.fbar');['q','city','type','beds','max','sort'].forEach(k=>{const el=f.querySelector(`[name=${k}]`);if(!el)return;el.value=Q[k];el.addEventListener(k==='q'?'input':'change',()=>{Q[k]=el.value;apply()})});
 if($('#clr'))$('#clr').onclick=()=>{Object.assign(Q,{q:'',city:'',type:'',beds:'',max:'',saved:false});f.querySelectorAll('input,select').forEach(x=>{if(x.name!=='sort')x.value=''});apply()}}

/* home search */
if($('.search')){let mode='buy';$$('.search .tabs button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('.search .tabs button').forEach(x=>x.classList.toggle('on',x===b))});
 $('.search').onsubmit=e=>{e.preventDefault();const u=new URLSearchParams();['city','type','max'].forEach(k=>{const v=$('.search [name='+k+']').value;if(v)u.set(k,v)});location.href=(mode==='rent'?'rent.html':'buy.html')+(u+''?'?'+u:'')}}

/* gallery + lightbox */
const G=window.GAL||[];let gi=0;
const show=i=>{gi=(i+G.length)%G.length;if($('#gMain'))$('#gMain').src=G[gi];$$('.thumbs button').forEach((b,j)=>b.classList.toggle('on',j===gi));if($('.lb.on'))$('.lb img').src=G[gi]};
$$('.thumbs button').forEach((b,j)=>b.onclick=()=>show(j));
const lbOpen=i=>{show(i);$('.lb').classList.add('on');$('.lb img').src=G[gi]};
$$('[data-lb]').forEach(b=>b.onclick=()=>lbOpen(+b.dataset.lb));
if($('.lb')){$('.lb .x').onclick=()=>$('.lb').classList.remove('on');$('.lb .p').onclick=()=>show(gi-1);$('.lb .n').onclick=()=>show(gi+1);
 addEventListener('keydown',e=>{if(!$('.lb.on'))return;if(e.key==='Escape')$('.lb').classList.remove('on');if(e.key==='ArrowLeft')show(gi-1);if(e.key==='ArrowRight')show(gi+1)})}
if($('#share'))$('#share').onclick=()=>{try{navigator.clipboard.writeText(location.href.split('?')[0])}catch(e){}toast(T('Link copied','Ο σύνδεσμος αντιγράφηκε','Lien copié'))};

/* forms → ICS CRM inbox (store.js) */
$$('form[data-lead]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const v=n=>(f.querySelector(`[name=${n}]`)||{}).value||'';
 if(!v('name')||!v('email')){toast(T('Please add your name and email','Συμπληρώστε όνομα και email','Ajoutez votre nom et votre courriel'));return}
 const kind=f.dataset.lead,files=[...f.querySelectorAll('input[type=file]')].flatMap(i=>[...i.files].map(x=>x.name));
 const d={name:v('name'),email:v('email'),phone:v('phone'),off:'Athens',type:'re',files,text:v('message')||undefined};
 if(kind==='property'){d.topic='Property enquiry · '+f.dataset.title;d.what=`${f.dataset.title} · ${f.dataset.price} · #${f.dataset.id} · ${v('who')}`}
 if(kind==='valuation'){d.topic=`${v('goal')==='rent'?'Rent out':'Sell'} · ${v('ptype')} in ${v('area')}`;d.what=`${d.topic} · ${v('size')} m²${v('expect')?' · expects '+v('expect'):''}`}
 if(kind==='contact'){d.what='ICS Real Estate · contact form'}
 if(window.ICS){const S=ICS.load();ICS.lead(S,kind,d,['el','mk']);ICS.save(S)}
 const box=f.closest('[data-done]')||f;box.innerHTML=`<div class="done"><div class="t">✓</div><h3 style="font:600 21px/1.2 var(--f)">${T('Thank you, we got it','Ευχαριστούμε, το λάβαμε','Merci, c’est reçu')}</h3><p class="note" style="margin-top:8px;font-size:15px">${kind==='property'?T('Eleonora Lekka will contact you within one business day to arrange a viewing, in person or by video.','Η Ελεονώρα Λέκκα θα επικοινωνήσει μαζί σας εντός μίας εργάσιμης για επίσκεψη, από κοντά ή με βίντεο.','Eleonora Lekka vous contactera en un jour ouvrable pour organiser une visite, sur place ou par vidéo.'):kind==='valuation'?T('Our real estate team will send you a free valuation within 3 business days.','Η ομάδα ακινήτων θα σας στείλει δωρεάν εκτίμηση εντός 3 εργάσιμων.','Notre équipe vous enverra une évaluation gratuite en 3 jours ouvrables.'):T('We reply within one business day.','Απαντάμε εντός μίας εργάσιμης.','Réponse en un jour ouvrable.')}</p></div>`});

favDraw();setLang(L);
})();
