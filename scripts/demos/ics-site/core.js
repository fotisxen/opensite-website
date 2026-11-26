const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],html=document.documentElement;
const {OFF,U,TYPES,DOCST}=ICS;
let L='en';try{L=localStorage.getItem('ics-lang')||'en'}catch(e){}
const T=(en,el,fr)=>L==='el'?el:L==='fr'?(fr??en):en;
const tr=a=>Array.isArray(a)?(a[{en:0,el:1,fr:2}[L]]??a[0]):a;
const loc=()=>L==='el'?'el-GR':L==='fr'?'fr-CA':'en-CA';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const offN=o=>L==='el'?OFF[o].el:L==='fr'?OFF[o].fr:o;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3600)};
let S=ICS.load();
if($('#notesT'))$('#notesT').onclick=()=>html.classList.toggle('notes');
$$('.yr').forEach(e=>e.textContent=new Date().getFullYear());$$('.yrs').forEach(e=>e.textContent=new Date().getFullYear()-2007);
const OFFS=Object.keys(OFF);
const myTZ=Intl.DateTimeFormat().resolvedOptions().timeZone;

/* static text: [data-el] / [data-fr] keep their English text and swap */
$$('[data-el]').forEach(e=>e.dataset.en=e.textContent);
$$('[data-ph-el]').forEach(e=>e.dataset.phEn=e.placeholder);
function setLang(l){L=l;html.lang=l;try{localStorage.setItem('ics-lang',l)}catch(e){}
 $$('[data-el]').forEach(e=>e.textContent=l==='el'?e.dataset.el:l==='fr'?(e.dataset.fr||e.dataset.en):e.dataset.en);
 $$('[data-ph-el]').forEach(e=>e.placeholder=l==='el'?e.dataset.phEl:l==='fr'?e.dataset.phFr:e.dataset.phEn);
 $$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));renderAll()}
$$('.lang').forEach(x=>x.onclick=e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.l)});

/* ---------- clocks + map ---------- */
let selOff=myTZ==='America/New_York'?2:/^America\//.test(myTZ)?0:4;
function renderClocks(){if(!$('#clocks'))return;$('#clocks').innerHTML=OFFS.map((o,i)=>{const t=ICS.tzNow(OFF[o].tz);return `<button class="clock${i===selOff?' on':''}" data-i="${i}"><b>${offN(o)}</b><span>${t.s}</span><small><i class="${t.open?'on':''}"></i>${t.open?T('open','ανοιχτά','ouvert'):T('closed','κλειστά','fermé')}</small></button>`}).join('')}
if($('#clocks'))$('#clocks').onclick=e=>{const c=e.target.closest('.clock');if(c){selOff=+c.dataset.i;renderClocks();renderQuote()}};
setInterval(renderClocks,30000);
(function(){const c=$('#routes');if(!c)return;let g,t=0,vis=true;new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(c);
 function fit(){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);g={x,w:r.width,h:r.height}}
 fit();addEventListener('resize',fit);const pr=(lo,la)=>[((lo+90)/132)*g.w,((58-la)/30)*g.h];
 function frame(){requestAnimationFrame(frame);t+=.016;if(!vis)return;const {x,w,h}=g;x.clearRect(0,0,w,h);
  for(let yy=8;yy<h;yy+=12)for(let xx=8;xx<w;xx+=12){x.fillStyle='rgba(255,255,255,.07)';x.fillRect(xx,yy,1.5,1.5)}
  x.fillStyle='rgba(255,255,255,.35)';x.font='600 10px Inter Tight';x.fillText(T('NORTH AMERICA','ΒΟΡΕΙΑ ΑΜΕΡΙΚΗ','AMÉRIQUE DU NORD'),...pr(-86,54));x.fillText(T('GREECE · CYPRUS','ΕΛΛΑΔΑ · ΚΥΠΡΟΣ','GRÈCE · CHYPRE'),...pr(18,46));x.fillText(T('ATLANTIC','ΑΤΛΑΝΤΙΚΟΣ','ATLANTIQUE'),...pr(-45,44));
  const a=pr(...OFF[OFFS[selOff]].ll);
  OFFS.forEach((o,i)=>{if(i===selOff)return;const b=pr(...OFF[o].ll),mx=(a[0]+b[0])/2,my=Math.min(a[1],b[1])-Math.abs(a[0]-b[0])*.28-12;x.strokeStyle='rgba(195,212,42,.35)';x.lineWidth=1.2;x.beginPath();x.moveTo(...a);x.quadraticCurveTo(mx,my,...b);x.stroke();const k=((t*.35+i*.17)%1),u=1-k,px=u*u*a[0]+2*u*k*mx+k*k*b[0],py=u*u*a[1]+2*u*k*my+k*k*b[1];x.fillStyle='#c3d42a';x.beginPath();x.arc(px,py,2.6,0,7);x.fill()});
  OFFS.forEach((o,i)=>{const p=pr(...OFF[o].ll),on=i===selOff;x.fillStyle=on?'#c3d42a':'#fff';x.beginPath();x.arc(p[0],p[1],on?5:3.5,0,7);x.fill();if(on){x.strokeStyle='rgba(195,212,42,.5)';x.beginPath();x.arc(p[0],p[1],9+Math.sin(t*3)*3,0,7);x.stroke()}x.fillStyle=on?'#fff':'rgba(255,255,255,.7)';x.font=`${on?600:500} 12px Inter Tight`;x.textAlign=o==='Athens'?'right':'left';x.fillText(offN(o),p[0]+(x.textAlign==='left'?10:-10),p[1]+(o==='Montreal'?-6:o==='New York'?14:4));x.textAlign='left'})}
 frame()})();
if($('#acc'))$('#acc').innerHTML=(s=>s+s)(['ATIO · Ontario','OTTIAQ · Québec','CTTIC · Canada','ATA · USA','PEM-FIT · Greece','PEEMPIP · Ionian University','Translation Bureau · PSPC registered supplier','CAPIC'].map(a=>`<span>${a}</span>`).join(''));

/* ---------- service finder (3 languages) ---------- */
const NEEDS=[
 {ic:'🏛',type:'inh',t:['I inherited property in Greece','Κληρονόμησα ακίνητο στην Ελλάδα','J’ai hérité d’un bien en Grèce'],s:['Acceptance of inheritance, wills, estates','Αποδοχή κληρονομιάς, διαθήκες','Acceptation de succession, testaments'],
  steps:[[['Free consultation','Δωρεάν πρώτη συζήτηση','Consultation gratuite'],['We review the family tree and the property.','Εξετάζουμε το οικογενειακό δέντρο και το ακίνητο.','Nous examinons l’arbre familial et le bien.']],[['Power of attorney','Πληρεξούσιο','Procuration'],['Signed at your nearest ICS office or consulate.','Υπογράφεται στο πλησιέστερο γραφείο ICS ή προξενείο.','Signée au bureau ICS ou au consulat le plus proche.']],[['Certified translations','Επίσημες μεταφράσεις','Traductions certifiées'],['Death certificate, will, family status.','Ληξιαρχική πράξη, διαθήκη, οικογενειακή κατάσταση.','Acte de décès, testament, état familial.']],[['Acceptance & tax','Αποδοχή & φόρος','Acceptation et impôt'],['Our lawyers and notaries in Greece file everything.','Οι δικηγόροι και συμβολαιογράφοι μας στην Ελλάδα κάνουν τις πράξεις.','Nos avocats et notaires en Grèce s’occupent de tout.']],[['Registration','Μεταγραφή','Enregistrement'],['Land registry / cadastre and E9 update.','Υποθηκοφυλακείο / κτηματολόγιο και ενημέρωση Ε9.','Cadastre et mise à jour du E9.']]],
  docs:[['Death certificate','Ληξιαρχική πράξη θανάτου','Acte de décès'],['Will (if any)','Διαθήκη (αν υπάρχει)','Testament (le cas échéant)'],['Family status certificate','Πιστ. οικογενειακής κατάστασης','Certificat de situation familiale'],['Passport','Διαβατήριο','Passeport'],['Greek AFM','ΑΦΜ','AFM grec']],time:['3–6 months','3–6 μήνες','3 à 6 mois'],who:['Athens legal team','Νομική ομάδα Αθήνας','Équipe juridique d’Athènes']},
 {ic:'🧾',type:'tax',t:['File my Greek tax declaration','Φορολογική δήλωση στην Ελλάδα','Ma déclaration fiscale grecque'],s:['E1, E9, ENFIA, AFM, Taxisnet','Ε1, Ε9, ΕΝΦΙΑ, ΑΦΜ, Taxisnet','E1, E9, ENFIA, AFM, Taxisnet'],
  steps:[[['Send your documents','Στείλτε τα έγγραφα','Envoyez vos documents'],['Upload them in the client portal.','Τα ανεβάζετε στην πύλη πελατών.','Téléversez-les dans le portail client.']],[['Taxisnet access','Κωδικοί Taxisnet','Accès Taxisnet'],['We set up or recover your codes.','Εκδίδουμε ή ανακτούμε τους κωδικούς σας.','Nous créons ou récupérons vos codes.']],[['Declaration','Υποβολή δήλωσης','Déclaration'],['Filed on time, with the early-filing discount.','Υποβάλλεται εγκαίρως, με την έκπτωση πρόωρης υποβολής.','Déposée à temps, avec le rabais de dépôt hâtif.']],[['Payment plan','Εξόφληση','Paiement'],['You see the amounts and pay online.','Βλέπετε τα ποσά και πληρώνετε online.','Vous voyez les montants et payez en ligne.']]],
  docs:[['Previous year E1','Ε1 προηγούμενου έτους','E1 de l’an dernier'],['Foreign income statement','Βεβαίωση εισοδήματος εξωτερικού','Relevé de revenus étrangers'],['Property list (E9)','Ακίνητα (Ε9)','Liste des biens (E9)'],['Passport','Διαβατήριο','Passeport']],time:['2–3 weeks','2–3 εβδομάδες','2 à 3 semaines'],who:['Accounting team','Λογιστικό τμήμα','Équipe comptable']},
 {ic:'🏡',type:'re',t:['Buy, sell or rent property','Αγορά, πώληση ή ενοικίαση ακινήτου','Acheter, vendre ou louer un bien'],s:['Property management for owners abroad','Διαχείριση ακινήτων για ιδιοκτήτες στο εξωτερικό','Gestion immobilière pour propriétaires à l’étranger'],
  steps:[[['Valuation','Εκτίμηση','Évaluation'],['Our real estate consultant visits the property.','Ο σύμβουλος ακινήτων μας επισκέπτεται το ακίνητο.','Notre conseillère visite le bien.']],[['Paperwork','Δικαιολογητικά','Documents'],['Engineer certificates, energy certificate, cadastre.','Βεβαιώσεις μηχανικού, ΠΕΑ, κτηματολόγιο.','Certificats d’ingénieur, énergie, cadastre.']],[['Listing & viewings','Αγγελία & επισκέψεις','Annonce et visites'],['Listed on our property portal.','Καταχώριση στην πλατφόρμα ακινήτων μας.','Publié sur notre portail immobilier.']],[['Contract','Συμβόλαιο','Contrat'],['Signed by power of attorney, no need to travel.','Υπογραφή με πληρεξούσιο, χωρίς ταξίδι.','Signé par procuration, sans voyager.']]],
  docs:[['Title deed','Συμβόλαιο ιδιοκτησίας','Titre de propriété'],['E9','Ε9','E9'],['Cadastre extract','Απόσπασμα κτηματολογίου','Extrait du cadastre'],['Power of attorney','Πληρεξούσιο','Procuration']],time:['1–4 months','1–4 μήνες','1 à 4 mois'],who:['Real estate team','Τμήμα ακινήτων','Équipe immobilière']},
 {ic:'📄',type:'tr',t:['Certified translation','Επίσημη μετάφραση','Traduction certifiée'],s:['Greek ⇄ English ⇄ French','Ελληνικά ⇄ Αγγλικά ⇄ Γαλλικά','Grec ⇄ anglais ⇄ français'],
  steps:[[['Instant quote','Άμεση προσφορά','Soumission immédiate'],['Choose the document and pages below.','Επιλέγετε έγγραφο και σελίδες παρακάτω.','Choisissez le document et les pages ci-dessous.']],[['Upload & pay','Αποστολή & πληρωμή','Envoi et paiement'],['Securely, online.','Με ασφάλεια, online.','En ligne, en toute sécurité.']],[['Translation & proofing','Μετάφραση & έλεγχος','Traduction et révision'],['Mother-tongue translator plus a second specialist.','Μεταφραστής στη μητρική του και δεύτερος έλεγχος.','Traducteur de langue maternelle et seconde révision.']],[['Certified delivery','Πιστοποιημένη παράδοση','Livraison certifiée'],['PDF and courier, accepted in Canada, the USA and Greece.','PDF και courier, αποδεκτό σε Καναδά, ΗΠΑ, Ελλάδα.','PDF et messagerie, accepté au Canada, aux É.-U. et en Grèce.']]],
  docs:[['Scan of the document','Σκαναρισμένο έγγραφο','Copie numérisée du document']],time:['1–5 business days','1–5 εργάσιμες','1 à 5 jours ouvrables'],who:['Translation department','Μεταφραστικό τμήμα','Service de traduction']},
 {ic:'🏦',type:'bank',t:['Open a bank account or get an AFM','Τραπεζικός λογαριασμός ή ΑΦΜ','Ouvrir un compte ou obtenir un AFM'],s:['From abroad, with a power of attorney','Από το εξωτερικό, με πληρεξούσιο','De l’étranger, par procuration'],
  steps:[[['Consultation','Συζήτηση','Consultation'],['Which bank and what you need it for.','Ποια τράπεζα και για ποιο σκοπό.','Quelle banque et pour quel usage.']],[['Power of attorney','Πληρεξούσιο','Procuration'],['Signed at an ICS office.','Υπογράφεται σε γραφείο ICS.','Signée dans un bureau ICS.']],[['AFM & account','ΑΦΜ & λογαριασμός','AFM et compte'],['We apply on your behalf in Greece.','Κάνουμε την αίτηση για εσάς στην Ελλάδα.','Nous faisons la demande pour vous en Grèce.']]],
  docs:[['Passport','Διαβατήριο','Passeport'],['Proof of address','Αποδεικτικό διεύθυνσης','Preuve d’adresse'],['Proof of income','Αποδεικτικό εισοδήματος','Preuve de revenu']],time:['2–4 weeks','2–4 εβδομάδες','2 à 4 semaines'],who:['Athens office','Γραφείο Αθήνας','Bureau d’Athènes']},
 {ic:'👵',type:'inh',t:['Greek pension or AMKA','Ελληνική σύνταξη ή ΑΜΚΑ','Pension grecque ou AMKA'],s:['Apply, reactivate, collect from abroad','Αίτηση, επανενεργοποίηση, είσπραξη από το εξωτερικό','Demande, réactivation, perception de l’étranger'],
  steps:[[['Eligibility check','Έλεγχος δικαιώματος','Vérification de l’admissibilité'],['Years of insurance in Greece and abroad.','Χρόνια ασφάλισης σε Ελλάδα και εξωτερικό.','Années d’assurance en Grèce et à l’étranger.']],[['AMKA & e-EFKA','ΑΜΚΑ & e-ΕΦΚΑ','AMKA et e-EFKA'],['We issue or recover your AMKA.','Εκδίδουμε ή ανακτούμε τον ΑΜΚΑ σας.','Nous obtenons ou récupérons votre AMKA.']],[['Application','Αίτηση','Demande'],['Filed and followed up for you.','Υποβάλλεται και την παρακολουθούμε για εσάς.','Déposée et suivie pour vous.']]],
  docs:[['Passport','Διαβατήριο','Passeport'],['Insurance history','Ασφαλιστικό ιστορικό','Historique d’assurance']],time:['2–6 months','2–6 μήνες','2 à 6 mois'],who:['Athens office','Γραφείο Αθήνας','Bureau d’Athènes']},
 {ic:'✈',type:'imm',t:['Work or move to Canada','Δουλειά ή μετακόμιση στον Καναδά','Travailler ou s’installer au Canada'],s:['Work permits 18–35, immigration','Άδειες εργασίας 18–35, μετανάστευση','Permis de travail 18–35, immigration'],
  steps:[[['Eligibility check','Έλεγχος καταλληλότητας','Vérification de l’admissibilité'],['Age, studies, profession.','Ηλικία, σπουδές, επάγγελμα.','Âge, études, profession.']],[['Application','Αίτηση','Demande'],['With our licensed immigration partners in Canada.','Με τους αδειοδοτημένους συνεργάτες μας στον Καναδά.','Avec nos partenaires en immigration autorisés.']],[['Arrival support','Υποστήριξη άφιξης','Accueil'],['Translations and first steps in Toronto or Montreal.','Μεταφράσεις και πρώτα βήματα σε Τορόντο ή Μόντρεαλ.','Traductions et premiers pas à Toronto ou Montréal.']]],
  docs:[['Passport','Διαβατήριο','Passeport'],['Degrees','Πτυχία','Diplômes'],['CV','Βιογραφικό','CV']],time:['varies','ποικίλλει','variable'],who:['Toronto office','Γραφείο Τορόντο','Bureau de Toronto']}];
let need=0;
function renderNeeds(){if(!$('#needs'))return;$('#needs').innerHTML=NEEDS.map((n,i)=>`<button class="need${i===need?' on':''}" data-i="${i}"><span class="ic">${n.ic}</span><span><b>${tr(n.t)}</b><small>${tr(n.s)}</small></span></button>`).join('');
 const n=NEEDS[need];
 $('#plan').innerHTML=`<span class="k">${T('Your plan','Το πλάνο σας','Votre plan')}</span><h3>${tr(n.t)}</h3>
 <div class="meta"><span class="ph">⏱ ${tr(n.time)}</span><span>👤 ${tr(n.who)}</span><span>🌍 ${T('Done remotely','Από απόσταση','À distance')}</span></div>
 <ol class="steps">${n.steps.map((s,i)=>`<li style="animation-delay:${i*60}ms"><span><b>${tr(s[0])}</b><small>${tr(s[1])}</small></span></li>`).join('')}</ol>
 <div class="docs">${n.docs.map(d=>`<span>📎 ${tr(d)}</span>`).join('')}</div>
 <div class="cta"><button class="btn lime" id="planBook">${T('Book a consultation for this','Ραντεβού για αυτό','Prendre rendez-vous pour ceci')}</button>${n.type==='tr'?`<a class="btn line" href="quote.html">${T('Get a quote now','Προσφορά τώρα','Soumission maintenant')}</a>`:''}</div>`;
 $('#planBook').onclick=()=>{location.href='book.html?topic='+need}}
if($('#needs'))$('#needs').onclick=e=>{const b=e.target.closest('.need');if(b){need=+b.dataset.i;renderNeeds()}};

/* ---------- translation quote ---------- */
const Q={lang:0,doc:0,spd:0};
const QL=[['Greek → English','Ελληνικά → Αγγλικά','Grec → anglais'],['English → Greek','Αγγλικά → Ελληνικά','Anglais → grec'],['Greek ⇄ French','Ελληνικά ⇄ Γαλλικά','Grec ⇄ français']];
const QD=[[['Certificate','Πιστοποιητικό','Certificat'],35],[['Diploma / transcript','Πτυχίο / αναλυτική','Diplôme / relevé'],42],[['Will / court decision','Διαθήκη / απόφαση','Testament / jugement'],50],[['Power of attorney','Πληρεξούσιο','Procuration'],45],[['Business document','Εταιρικό έγγραφο','Document d’affaires'],48]];
const QS=[[['Standard · 3 days','Κανονική · 3 ημέρες','Standard · 3 jours'],1],[['Express · 1 day','Express · 1 ημέρα','Express · 1 jour'],1.5],[['Same day','Αυθημερόν','Le jour même'],2]];
const files=[];
const qCur=()=>CUR;
const money=(a,c)=>new Intl.NumberFormat(loc(),{style:'currency',currency:c,maximumFractionDigits:0}).format(a);
const qPrice=()=>{const pg=+$('#qPg').value;return Math.round(QD[Q.doc][1]*(1+(pg-1)*.8)*QS[Q.spd][1])};
const qDesc=()=>{const pg=+$('#qPg').value;return `${tr(QL[Q.lang])} · ${tr(QD[Q.doc][0])} · ${pg} ${pg>1?T('pages','σελίδες','pages'):T('page','σελίδα','page')} · ${tr(QS[Q.spd][0])}`};
function renderQuote(){if(!$('#qP'))return;const o=(id,arr,key,f)=>$(id).innerHTML=arr.map((a,i)=>`<button class="${Q[key]===i?'on':''}" data-k="${key}" data-i="${i}">${f(a)}</button>`).join('');
 o('#qLang',QL,'lang',a=>tr(a));o('#qDoc',QD,'doc',a=>tr(a[0]));o('#qSpd',QS,'spd',a=>tr(a[0]));
 $('#qPgV').textContent=$('#qPg').value;$('#qP').textContent=money(qPrice(),qCur());$('#qD').textContent=qDesc();
 $('#files').innerHTML=files.map(f=>`<div><span>📄 ${esc(f.name)}</span><span>${Math.max(1,Math.round(f.size/1024))} KB</span></div>`).join('')}
if($('.qform'))document.querySelector('.qform').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){Q[b.dataset.k]=+b.dataset.i;renderQuote()}});
if($('#qP')){$('#qPg').oninput=renderQuote;
const drop=$('#drop');drop.onclick=()=>$('#file').click();drop.onkeydown=e=>{if(e.key==='Enter')$('#file').click()};
$('#file').onchange=e=>{files.push(...e.target.files);renderQuote()};
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over');if(ev==='drop'){files.push(...e.dataTransfer.files);renderQuote()}}));
function sendQuote(paid){const name=$('#qName').value.trim(),email=$('#qEmail').value.trim();if(!name||!email){toast(T('Please add your name and email','Συμπληρώστε όνομα και email','Ajoutez votre nom et votre courriel'));(!name?$('#qName'):$('#qEmail')).focus();return false}
 S=ICS.load();ICS.lead(S,'quote',{name,email,off:OFFS[selOff],what:qDesc(),amt:money(qPrice(),qCur()),files:files.map(f=>f.name),paid},[ {Montreal:'md',Athens:'mk',Thessaloniki:'gt',Nicosia:'mk'}[OFFS[selOff]]||'mm']);ICS.save(S);return true}
$('#qSend').onclick=()=>{if(sendQuote(false)){$('#qSend').textContent=T('✓ Request sent · we’ll email you within one business day','✓ Το αίτημα στάλθηκε · θα σας απαντήσουμε εντός μίας εργάσιμης','✓ Demande envoyée · réponse en un jour ouvrable')}};
$('#qPay').onclick=()=>{const name=$('#qName').value.trim(),email=$('#qEmail').value.trim();if(!name||!email){sendQuote(false);return}payModal(qPrice(),qCur(),qDesc(),()=>{sendQuote(true);$('#qPay').textContent=T('✓ Paid · your translator has the files','✓ Πληρώθηκε · ο μεταφραστής έχει τα αρχεία','✓ Payé · votre traducteur a les fichiers')})}}

/* ---------- payment (simulated) ---------- */
function payModal(amt,cur,desc,done){const ov=$('#ov');
 $('#pay').innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><span class="k">${T('Secure payment','Ασφαλής πληρωμή','Paiement sécurisé')}</span><button id="pX" style="font-size:20px">×</button></div><div class="amt">${money(amt,cur)}</div><div class="muted" style="font-size:14px">${esc(desc)}</div>
 <label class="fld">${T('Card','Κάρτα','Carte')}<div class="card-in"><input value="4242 4242 4242 4242" inputmode="numeric"><input value="12 / 28"><input value="123"></div></label>
 <label class="fld">${T('Name on card','Όνομα κατόχου','Nom sur la carte')}<input value="${esc(($('#qName')&&$('#qName').value)||($('#coN')&&$('#coN').value)||'Eleni Papas')}"></label>
 <button class="btn lime" id="pGo">${T('Pay','Πληρωμή','Payer')} ${money(amt,cur)}</button>
 <div class="sec">🔒 ${T('Processed by Stripe · Visa, Mastercard, Amex, Apple Pay, Google Pay · CAD, USD, EUR','Μέσω Stripe · Visa, Mastercard, Amex, Apple Pay, Google Pay · CAD, USD, EUR','Traité par Stripe · Visa, Mastercard, Amex, Apple Pay, Google Pay · CAD, USD, EUR')}</div>
 <div class="sec ph">${T('Demo: no card is charged.','Demo: καμία χρέωση.','Démo : aucune carte n’est débitée.')}</div>`;
 ov.classList.add('on');$('#pX').onclick=()=>ov.classList.remove('on');ov.onclick=e=>{if(e.target===ov)ov.classList.remove('on')};
 $('#pGo').onclick=()=>{$('#pGo').textContent=T('Processing…','Επεξεργασία…','Traitement…');setTimeout(()=>{$('#pay').innerHTML=`<div class="done"><div class="t">✓</div><h3 style="font:600 22px/1.2 var(--f)">${T('Payment received','Η πληρωμή ολοκληρώθηκε','Paiement reçu')}</h3><p class="muted" style="margin-top:8px">${money(amt,cur)} · ${T('a receipt is on its way to your email.','η απόδειξη έρχεται στο email σας.','un reçu est envoyé à votre courriel.')}</p><button class="btn" id="pOk" style="margin-top:16px">OK</button></div>`;$('#pOk').onclick=()=>ov.classList.remove('on');done()},900)}}

/* ---------- booking ---------- */
const CONS={Toronto:'mm',Montreal:'md','New York':'mm',Athens:'mk',Thessaloniki:'gt',Nicosia:'mk'};
const B={topic:0,off:'Toronto',mode:'office',day:-1,slot:null,done:false};{const q=new URLSearchParams(location.search);if(q.has('topic'))B.topic=+q.get('topic')||0;if(q.get('office')&&OFF[q.get('office')])B.off=q.get('office')}
const bDays=()=>{const r=[];let n=1;while(r.length<5){const d=new Date();d.setDate(d.getDate()+n);if(d.getDay()%6)r.push(n);n++}return r};
const taken=(n,h)=>((n*5+h*3)%7===0);
function renderBook(){const el=$('#bk');if(!el)return;
 if(B.done){const a=B.done,o=OFF[a.off];el.innerHTML=`<div class="done"><div class="t">✓</div><h3 style="font:600 24px/1.2 var(--f)">${T('You’re booked','Το ραντεβού κλείστηκε','Rendez-vous confirmé')}</h3><p class="muted" style="margin-top:8px">${ICS.fmtDT(a.ts,o.tz,loc())} ${offN(a.off)}<br>${T('Your time','Η ώρα σας','Votre heure')}: ${ICS.fmtDT(a.ts,myTZ,loc())}<br>${a.mode==='video'?T('Video call · link by email','Βιντεοκλήση · link στο email','Appel vidéo · lien par courriel'):o.addr}</p><div style="display:flex;gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap"><button class="btn" id="ics">📅 ${T('Add to calendar','Στο ημερολόγιο','Ajouter à l’agenda')}</button><button class="btn line" id="bAgain">${T('Book another','Νέο ραντεβού','Autre rendez-vous')}</button></div></div>`;
  $('#bAgain').onclick=()=>{B.done=false;B.slot=null;renderBook()};
  $('#ics').onclick=()=>{const f=d=>new Date(d).toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');const txt=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ICS//Booking//EN','BEGIN:VEVENT',`UID:${a.id}@icsgr.com`,`DTSTAMP:${f(Date.now())}`,`DTSTART:${f(a.ts)}`,`DTEND:${f(a.ts+1800e3)}`,`SUMMARY:ICS · ${a.topic}`,`LOCATION:${a.mode==='video'?'Video call':o.addr}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([txt],{type:'text/calendar'}));l.download='ics-appointment.ics';l.click()};return}
 const days=bDays(),o=OFF[B.off];
 el.innerHTML=`<label class="fld">${T('Topic','Θέμα','Sujet')}<select id="bT">${NEEDS.map((n,i)=>`<option value="${i}" ${i===B.topic?'selected':''}>${tr(n.t)}</option>`).join('')}</select></label>
 <div class="fld">${T('Office','Γραφείο','Bureau')}<div class="opts" id="bO">${OFFS.map(k=>`<button class="${k===B.off?'on':''}" data-o="${k}">${offN(k)}</button>`).join('')}</div></div>
 <div class="fld">${T('How','Πώς','Comment')}<div class="opts" id="bM"><button class="${B.mode==='office'?'on':''}" data-m="office">🏢 ${T('At the office','Στο γραφείο','Au bureau')}</button><button class="${B.mode==='video'?'on':''}" data-m="video">🎥 ${T('Video call','Βιντεοκλήση','Appel vidéo')}</button></div></div>
 <div class="fld">${T('Day','Ημέρα','Jour')}<div class="days" id="bD">${days.map(n=>{const d=new Date();d.setDate(d.getDate()+n);return `<button class="${B.day===n?'on':''}" data-d="${n}">${d.toLocaleDateString(loc(),{weekday:'short'})}<b>${d.getDate()}</b>${d.toLocaleDateString(loc(),{month:'short'})}</button>`}).join('')}</div></div>
 ${B.day>0?`<div class="fld">${T('Time','Ώρα','Heure')} · ${offN(B.off)}<div class="slots" id="bS">${[9,10,11,12,13,14,15,16].map(h=>{const ts=ICS.at(B.day,h,0,o.tz);return `<button ${taken(B.day,h)?'disabled':''} class="${B.slot===ts?'on':''}" data-s="${ts}">${String(h).padStart(2,'0')}:00<small>${T('you','εσείς','vous')} ${ICS.fmtT(ts,myTZ)}</small></button>`}).join('')}</div></div>`:''}
 ${B.slot?`<div class="tzline">🕘 ${ICS.fmtDT(B.slot,o.tz,loc())} ${offN(B.off)} · Toronto ${ICS.fmtT(B.slot,'America/Toronto')} · ${T('Athens','Αθήνα','Athènes')} ${ICS.fmtT(B.slot,'Europe/Athens')}</div>
 <div class="r2"><input id="bN" placeholder="${T('Full name','Ονοματεπώνυμο','Nom complet')}" style="padding:13px 14px;border-radius:12px;border:0;box-shadow:inset 0 0 0 1px var(--line)"><input id="bE" type="email" placeholder="Email" style="padding:13px 14px;border-radius:12px;border:0;box-shadow:inset 0 0 0 1px var(--line)"></div>
 <button class="btn lime" id="bGo">${T('Confirm appointment','Επιβεβαίωση ραντεβού','Confirmer le rendez-vous')}</button>`:''}`;
 $('#bT').onchange=e=>{B.topic=+e.target.value};
 $$('#bO button').forEach(b=>b.onclick=()=>{B.off=b.dataset.o;B.slot=null;renderBook()});
 $$('#bM button').forEach(b=>b.onclick=()=>{B.mode=b.dataset.m;renderBook()});
 $$('#bD button').forEach(b=>b.onclick=()=>{B.day=+b.dataset.d;B.slot=null;renderBook()});
 $$('#bS button').forEach(b=>b.onclick=()=>{B.slot=+b.dataset.s;renderBook()});
 if($('#bGo'))$('#bGo').onclick=()=>{const name=$('#bN').value.trim(),email=$('#bE').value.trim();if(!name||!email){toast(T('Please add your name and email','Συμπληρώστε όνομα και email','Ajoutez votre nom et votre courriel'));return}
  S=ICS.load();const u=CONS[B.off],a={id:'A'+Date.now(),who:name,em:email,c:null,u,off:B.off,ts:B.slot,mode:B.mode,topic:tr(NEEDS[B.topic].t)};S.appts.push(a);
  ICS.lead(S,'booking',{name,email,off:B.off,type:NEEDS[B.topic].type,topic:NEEDS[B.topic].t[0],when:`${ICS.fmtDT(a.ts,OFF[B.off].tz,'en-GB')} ${B.off} · ${B.mode==='video'?'video call':'at the office'} · ${NEEDS[B.topic].t[0]}`},[u]);ICS.save(S);B.done=a;renderBook()}}

/* ---------- client portal (live from the CRM data) ---------- */
let P={in:false,tab:'case',email:'eleni.papas@example.com',ci:0};try{P.in=sessionStorage.getItem('ics-portal')==='1'}catch(e){}
const me=()=>S.clients.find(c=>c.em.includes(P.email))||S.clients[0];
const myCases=()=>S.cases.filter(k=>k.portal?.on&&k.cl.some(x=>x[0]===me().id));
function renderPortal(flash){const w=$('#pwin');if(!w)return;
 if(!P.in){w.style.gridTemplateColumns='1fr';w.innerHTML=`<div class="pmain"><form class="plogin" id="pl"><h3>${T('Sign in to your case','Είσοδος στην υπόθεσή σας','Accéder à votre dossier')}</h3><p class="muted" style="font-size:14.5px">${T('No password to remember: we email you a one-time code.','Χωρίς κωδικό: σας στέλνουμε κωδικό μίας χρήσης στο email.','Aucun mot de passe : nous vous envoyons un code unique par courriel.')}</p>
  <label class="fld">Email<input id="pE" type="email" value="${esc(P.email)}"></label><label class="fld">${T('Code from your email','Κωδικός από το email','Code reçu par courriel')}<input id="pC" value="482913" inputmode="numeric"></label><button class="btn lime">${T('Sign in','Είσοδος','Se connecter')}</button><div class="hint">${T('Demo: client Eleni Papas (inheritance in Kalamata). Code pre-filled.','Demo: πελάτισσα Eleni Papas (κληρονομιά στην Καλαμάτα). Ο κωδικός είναι συμπληρωμένος.','Démo : cliente Eleni Papas (succession à Kalamata). Code pré-rempli.')}</div></form></div>`;
  $('#pl').onsubmit=e=>{e.preventDefault();P.email=$('#pE').value.trim()||P.email;P.in=true;try{sessionStorage.setItem('ics-portal','1')}catch(x){}w.style.gridTemplateColumns='';renderPortal()};return}
 w.style.gridTemplateColumns='';const c=me(),cs=myCases(),k=cs[P.ci]||cs[0];
 const reqDocs=k?k.docs.filter(d=>d.client&&d.s==='req'):[],dueInv=k?S.invoices.filter(i=>i.c===k.id&&i.st!=='paid'):[];
 const unreadMsg=k?k.portal.msgs.filter(m=>m[0]!=='client').length:0;
 const nav=[['case',T('My case','Η υπόθεσή μου','Mon dossier'),''],['docs',T('Documents','Έγγραφα','Documents'),reqDocs.length||''],['msgs',T('Messages','Μηνύματα','Messages'),''],['pay',T('Invoices','Τιμολόγια','Factures'),dueInv.length||''],['appts',T('Appointments','Ραντεβού','Rendez-vous'),''],['plans',T('My plans','Οι συνδρομές μου','Mes abonnements'),'']];
 let main='';
 if(!k)main=`<div class="muted">${T('No active cases.','Καμία ενεργή υπόθεση.','Aucun dossier actif.')}</div>`;
 else{const ty=TYPES[k.type],cons=U[k.own];
  const head=`<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-start"><div><h3>${k.id} · ${esc(k.t)}</h3><div class="sub">${T('Your consultant','Ο σύμβουλός σας','Votre conseillère')}: ${cons.n} · ${offN(cons.off)}</div></div><span class="live">${T('Live','Ζωντανά','En direct')}</span></div>`;
  const track=`<div class="track ${flash==='stage'?'flash':''}" style="--n:${ty.steps.length}">${ty.steps.map((s,i)=>`<div class="${i<k.st?'done':i===k.st?'now':''}">${tr(s)}</div>`).join('')}</div>`;
  const nxt=ty.steps[k.st+1],need=k.docs.filter(d=>d.client&&d.s==='req').length;
  const nowBox=`<div class="nowbox ${flash==='stage'?'flash':''}"><div class="nb-step">${k.st+1}<small>/${ty.steps.length}</small></div><div><span class="nb-k">${T('Where your case is now','Πού βρίσκεται τώρα η υπόθεσή σας','Où en est votre dossier')}</span><b>${tr(ty.steps[k.st])}</b><p>${ty.tips?tr(ty.tips[k.st]):''}</p>${nxt?`<small>${T('Next step','Επόμενο βήμα','Étape suivante')}: <b>${tr(nxt)}</b></small>`:''}${need?`<button class="btn lime s" data-pt="docs" style="margin-top:10px">${T(`We need ${need} document${need>1?'s':''} from you →`,`Χρειαζόμαστε ${need} έγγραφ${need>1?'α':'ο'} από εσάς →`,`Il nous faut ${need} document${need>1?'s':''} →`)}</button>`:''}</div></div>`;
  const docsBox=`<div class="box ${flash==='docs'?'flash':''}"><h4>${T('Documents','Έγγραφα','Documents')}</h4>${k.docs.map((d,i)=>{const need=d.client&&d.s==='req';return `<div class="doc"><i class="${d.s==='req'?'wait':'ok'}">${d.s==='req'?'!':'✓'}</i><span>${esc(d.n.replace(/\.pdf$/i,''))}</span>${need?`<button class="btn s" data-up="${i}">${T('Upload','Ανέβασμα','Téléverser')}</button>`:`<small>${tr(DOCST[d.s])}</small>`}</div>`}).join('')}<input type="file" id="pFile" hidden accept=".pdf,image/*">${reqDocs.length?`<button class="sample" id="pSample">📄 ${T('Demo: upload a sample PDF','Demo: ανέβασμα δείγματος PDF','Démo : téléverser un exemple PDF')}</button>`:''}</div>`;
  const msgsBox=`<div class="box ${flash==='msgs'?'flash':''}"><h4>${T('Messages','Μηνύματα','Messages')}</h4><div id="pMs">${k.portal.msgs.map(m=>`<div class="msg ${m[0]==='client'?'me':''}"><span class="av">${m[0]==='client'?c.n.split(' ').map(w=>w[0]).join(''):U[m[0]].n.split(' ').map(w=>w[0]).join('').slice(0,2)}</span><span><small>${m[0]==='client'?T('You','Εσείς','Vous'):U[m[0]].n} · ${new Date(m[1]).toLocaleString(loc(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</small><div class="bb">${esc(m[2])}</div></span></div>`).join('')||`<div class="muted">—</div>`}</div><form class="msend" id="pmf"><input id="pmIn" placeholder="${T('Write to your consultant…','Γράψτε στον σύμβουλό σας…','Écrivez à votre conseillère…')}"><button class="btn s">${T('Send','Αποστολή','Envoyer')}</button></form></div>`;
  const payBox=`<div class="box ${flash==='pay'?'flash':''}"><h4>${T('Invoices','Τιμολόγια','Factures')}</h4>${S.invoices.filter(i=>i.c===k.id).map(i=>`<div class="inv"><span>${esc(i.desc)}<br><small class="muted">${i.id}</small></span><span style="text-align:right"><b>${money(i.amt,i.cur)}</b><br>${i.st==='paid'?`<span class="paid">${T('Paid','Πληρώθηκε','Payée')}</span>`:`<button class="btn lime s" data-pay="${i.id}" style="margin-top:4px">${T('Pay now','Πληρωμή','Payer')}</button>`}</span></div>`).join('')||`<div class="muted">—</div>`}</div>`;
  const ap=S.appts.filter(a=>a.em===c.em[0]&&a.ts>Date.now()-3600e3).sort((a,b)=>a.ts-b.ts);
  const apBox=`<div class="box"><h4>${T('Appointments','Ραντεβού','Rendez-vous')}</h4>${ap.map(a=>`<div class="inv"><span>${a.mode==='video'?'🎥':'🏢'} <b>${esc(a.topic)}</b><br><small class="muted">${U[a.u].n} · ${offN(a.off)}</small></span><span style="text-align:right;font-size:13.5px">${ICS.fmtDT(a.ts,OFF[a.off].tz,loc())} ${offN(a.off)}<br><b>${ICS.fmtT(a.ts,myTZ)} ${T('your time','η ώρα σας','votre heure')}</b></span></div>`).join('')||`<div class="muted">${T('None booked.','Κανένα.','Aucun.')}</div>`}<a class="btn line s" href="book.html" style="margin-top:10px">+ ${T('Book','Κράτηση','Réserver')}</a></div>`;
  const myPl=(S.orders||[]).filter(o=>o.kind==='plan'&&c.em.includes(o.email));
  const plBox=`<div class="box"><h4>${T('Annual plans','Ετήσιες συνδρομές','Abonnements annuels')}</h4>${myPl.map(o=>`<div class="inv"><span><b>${esc(PLANS[o.key]?tr(PLANS[o.key].n):o.what)}</b><br><small class="muted">${o.id} · ${T('renews','ανανέωση','renouvellement')} ${new Date(o.renew).toLocaleDateString(loc(),{day:'numeric',month:'short',year:'numeric'})}</small></span><span style="text-align:right"><b>${money(o.amt,o.cur)}</b>/${T('yr','έτος','an')}<br><label class="chk" style="justify-content:flex-end;margin-top:6px"><input type="checkbox" data-auto="${o.id}" ${o.auto?'checked':''}> ${T('Auto-renew','Αυτόματη ανανέωση','Renouvellement auto')}</label></span></div>`).join('')||`<div class="muted">${T('No plans yet.','Καμία συνδρομή ακόμη.','Aucun abonnement.')}</div>`}<a class="btn line s" href="pricing.html#plans" style="margin-top:10px">${T('See all plans','Όλες οι συνδρομές','Voir les abonnements')}</a></div>`;
  main=head+nowBox+track+({plans:plBox,case:`<div class="pcols">${docsBox}${msgsBox}</div>`,docs:docsBox,msgs:msgsBox,pay:payBox,appts:apBox})[P.tab]}
 w.innerHTML=`<aside class="pside"><div class="who"><span class="av">${c.n.split(' ').map(x=>x[0]).join('')}</span><span><b>${esc(c.n)}</b><small>${esc(c.addr)}</small></span></div>${nav.map(([v,l,n])=>`<button class="${P.tab===v?'on':''}" data-pt="${v}">${l}<em>${n}</em></button>`).join('')}${cs.length>1?`<select id="pCase" style="margin-top:10px;padding:8px;border-radius:8px;background:#1e2823;color:#fff;border:0">${cs.map((x,i)=>`<option value="${i}" ${i===P.ci?'selected':''}>${x.id}</option>`).join('')}</select>`:''}<button data-out="1" style="margin-top:auto;color:#8a938d">${T('Sign out','Έξοδος','Déconnexion')}</button></aside><div class="pmain">${main}</div>`;
 $$('[data-pt]').forEach(b=>b.onclick=()=>{P.tab=b.dataset.pt;renderPortal()});
 if($('#pCase'))$('#pCase').onchange=e=>{P.ci=+e.target.value;renderPortal()};
 $('[data-out]').onclick=()=>{P.in=false;try{sessionStorage.removeItem('ics-portal')}catch(e){}renderPortal()};
 $$('[data-auto]').forEach(x=>x.onchange=()=>{S=ICS.load();const o=S.orders.find(y=>y.id===x.dataset.auto);o.auto=x.checked;ICS.save(S);toast(x.checked?T('Auto-renew is on','Η αυτόματη ανανέωση ενεργοποιήθηκε','Renouvellement automatique activé'):T('Auto-renew is off · we will remind you 30 days before','Η αυτόματη ανανέωση απενεργοποιήθηκε · θα σας υπενθυμίσουμε 30 μέρες πριν','Renouvellement désactivé · rappel 30 jours avant'))});
 if(!k)return;
 let upIdx=-1;$$('[data-up]').forEach(b=>b.onclick=()=>{upIdx=+b.dataset.up;$('#pFile').click()});
 const upload=async f=>{if(upIdx<0)upIdx=k.docs.findIndex(d=>d.client&&d.s==='req');if(upIdx<0)return;toast(T('Uploading and reading your document…','Ανέβασμα και ανάγνωση του εγγράφου…','Téléversement et lecture du document…'));
  let r=null;try{r=await ICS.readDoc(f)}catch(e){}
  S=ICS.load();const kk=S.cases.find(x=>x.id===k.id),d=kk.docs[upIdx];d.s='rec';d.by='client';d.d=Date.now();d.n=d.n+' · '+f.name;d.fresh=true;if(r&&Object.keys(r.fields).length){d.extract=r.fields;d.title=r.title}
  kk.log.unshift(['client',Date.now(),'Uploaded '+f.name+' from the portal']);ICS.lead(S,'upload',{name:c.n,email:c.em[0],case:kk.id,text:d.n+(d.extract?` · ${Object.keys(d.extract).length} fields read`:'')},[kk.own]);ICS.save(S);upIdx=-1;renderPortal('docs');
  toast(T('Uploaded. Your consultant has been notified.','Ανέβηκε. Ο σύμβουλός σας ενημερώθηκε.','Téléversé. Votre conseillère a été avisée.'))};
 if($('#pFile'))$('#pFile').onchange=e=>{const f=e.target.files[0];if(f)upload(f)};
 if($('#pSample'))$('#pSample').onclick=async()=>{const b=await (await fetch('../ics-crm/samples/family-status-certificate.pdf')).blob();upIdx=-1;upload(new File([b],'family-status-certificate.pdf',{type:'application/pdf'}))};
 if($('#pmf'))$('#pmf').onsubmit=e=>{e.preventDefault();const v=$('#pmIn').value.trim();if(!v)return;S=ICS.load();const kk=S.cases.find(x=>x.id===k.id);kk.portal.msgs.push(['client',Date.now(),v]);ICS.lead(S,'message',{name:c.n,email:c.em[0],case:kk.id,text:v},[kk.own]);ICS.save(S);renderPortal('msgs')};
 $$('[data-pay]').forEach(b=>b.onclick=()=>{const i=S.invoices.find(x=>x.id===b.dataset.pay);payModal(i.amt,i.cur,i.desc,()=>{S=ICS.load();const ii=S.invoices.find(x=>x.id===i.id);ii.st='paid';ii.paidAt=Date.now();ii.fresh=true;ICS.lead(S,'payment',{name:c.n,email:c.em[0],case:i.c,what:i.desc,amt:money(i.amt,i.cur)},[k.own]);ICS.save(S);renderPortal('pay')})})}

/* updates from the CRM (other tab) */
ICS.on(ns=>{const old=S;S=ns;if(!$('#pwin'))return;if(!P.in){renderPortal();return}
 const k0=old.cases.find(x=>x.id===(myCases()[P.ci]||{}).id),k1=S.cases.find(x=>x.id===k0?.id);let fl='';
 if(k0&&k1){if(k1.st!==k0.st)fl='stage';else if(k1.portal.msgs.length>k0.portal.msgs.length)fl='msgs';else if(k1.docs.filter(d=>d.client&&d.s==='req').length>k0.docs.filter(d=>d.client&&d.s==='req').length)fl='docs'}
 renderPortal(fl);
 if(fl==='stage')toast(T('Your case moved to: ','Η υπόθεσή σας πέρασε στο: ','Votre dossier est passé à : ')+tr(TYPES[k1.type].steps[k1.st]));
 if(fl==='msgs')toast(T('New message from your consultant','Νέο μήνυμα από τον σύμβουλό σας','Nouveau message de votre conseillère'));
 if(fl==='docs')toast(T('Your consultant asked for a document','Ο σύμβουλός σας ζήτησε ένα έγγραφο','Votre conseillère demande un document'))});

/* ---------- newsletter ---------- */
$$('.nlf').forEach(f=>f.onsubmit=e=>{e.preventDefault();const em=e.target.querySelector('input').value.trim();S=ICS.load();if(!S.subs.includes(em))S.subs.push(em);ICS.lead(S,'newsletter',{email:em},['et']);ICS.save(S);e.target.reset();toast(T('Subscribed. Welcome email on its way.','Εγγραφήκατε. Έρχεται email καλωσορίσματος.','Abonné. Un courriel de bienvenue arrive.'))});

/* ---------- team & offices ---------- */
function renderTeam(){const tm=[['Anastasios Moussas',['President, Managing Director','Πρόεδρος','Président, directeur général']],['Efthymia Tseliou',['Director','Διευθύντρια','Directrice']],['Marianna Michalitsianou',['Senior Consultant · Toronto','Senior Consultant · Τορόντο','Conseillère principale · Toronto']],['Marie-Eve Duclos-Haskis',['Senior Consultant · Montreal','Senior Consultant · Μόντρεαλ','Conseillère principale · Montréal']],['Maria Korda',['Senior Consultant · Athens','Senior Consultant · Αθήνα','Conseillère principale · Athènes']],['Anastasia Gianniloi',['Managing Lawyer · Athens','Δικηγόρος · Αθήνα','Avocate gérante · Athènes']],['Eleonora Lekka',['Senior Real Estate Consultant','Σύμβουλος ακινήτων','Conseillère immobilière']],['Stavroula Rigopoulou',['Senior Accounting Consultant','Λογιστικό τμήμα','Conseillère comptable']],['Georgios Tachtsidis',['Senior Consultant · Thessaloniki','Senior Consultant · Θεσσαλονίκη','Conseiller principal · Thessalonique']]];
 if($('#team'))$('#team').innerHTML=tm.map(([n,r])=>`<span><b>${n}</b> · ${tr(r)}</span>`).join('')+`<span>+ ${T('5 lawyers in Athens, notaries & consultants','5 δικηγόροι στην Αθήνα, συμβολαιογράφοι & σύμβουλοι','5 avocats à Athènes, notaires et conseillers')}</span>`;
 if($('#oGrid'))$('#oGrid').innerHTML=OFFS.map(o=>{const t=ICS.tzNow(OFF[o].tz),d=OFF[o];return `<div class="card off"><h3>${offN(o)}<small>${t.s} · ${t.open?T('open','ανοιχτά','ouvert'):T('closed','κλειστά','fermé')}</small></h3><p>${esc(d.addr)}</p><a href="tel:${d.tel.replace(/\s/g,'')}">${d.tel}</a><a href="mailto:${d.mail}">${d.mail}</a><a href="book.html?office=${encodeURIComponent(o)}" data-bo="${o}" style="color:var(--lime);font-weight:600;margin-top:8px">${T('Book here →','Ραντεβού εδώ →','Réserver ici →')}</a></div>`}).join('');
 $$('[data-bo]').forEach(a=>a.onclick=()=>{B.off=a.dataset.bo;B.slot=null;B.done=false;renderBook()})}

