/* ICS demo · "Ask Mr Moussas' assistant" chat.
   DEMO: answers are written from ICS content and picked by keyword, so it runs offline with no AI account.
   In production the same window sends the question to the connector, which asks Claude with the ICS knowledge and tools. */
(function(){
const $=s=>document.querySelector(s);
const L=()=>(document.documentElement.lang||'en').slice(0,2);
let LANG=null;
const T=(en,el,fr)=>{const l=LANG||L();return l==='el'?el:l==='fr'?(fr||en):en};
/* reply in the language the visitor writes in */
const detect=q=>/[α-ωάέήίόύώ]/i.test(q)?'el':/(je|j'|mon|ma|mes|vous|est|une|des|pour|bonjour|merci|combien|maison)/i.test(q)||/[éèêàçù]/i.test(q)?'fr':/[a-z]/i.test(q)?'en':null;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ς/g,'σ');
const PHOTO='team/anastasios-moussas.webp';

/* knowledge: keywords (accents removed) → answer + actions */
const K=[
 {id:'session',k:['συνεδρια','μουσσα','μουσα','moussas','tasos','τασο','meet','session','video call','βιντεοκλησ','rendez-vous avec','personally','προσωπικα','μιλησω με'],
  a:()=>T("I’d be glad to look at it together. You can book a 30-minute video session with me personally: you pay online and get a link by email. If it turns into a case, the fee is credited.","Θα χαρώ να το δούμε μαζί. Μπορείτε να κλείσετε συνεδρία 30 λεπτών μαζί μου, με βιντεοκλήση: πληρώνετε online και σας έρχεται ο σύνδεσμος στο email. Αν προχωρήσουμε σε υπόθεση, το ποσό αφαιρείται από την αμοιβή.","Avec plaisir. Vous pouvez réserver une séance vidéo de 30 minutes avec moi : paiement en ligne, lien par courriel. Si un dossier s’ouvre, le montant est déduit."),
  act:['session','book']},
 {id:'inh',k:['κληρονομ','διαθηκ','αποδοχ','αποποιησ','πεθαν','απεβιωσ','inherit','estate','will','died','passed away','success','testament','heritage','deces'],
  a:()=>T("Inheritance is what we do most. In short: one power of attorney signed at our office or the consulate, we translate the death certificate and the will, our notary in Athens does the acceptance and we register the property. No trip to Greece. It usually takes 3–6 months. Note: the new inheritance law (5303/2026) applies to deaths from 16 September 2026.","Οι κληρονομιές είναι αυτό που κάνουμε πιο συχνά. Με λίγα λόγια: ένα πληρεξούσιο που υπογράφετε στο γραφείο μας ή στο προξενείο, μεταφράζουμε τη ληξιαρχική πράξη και τη διαθήκη, ο συμβολαιογράφος μας στην Αθήνα κάνει την αποδοχή και μεταγράφουμε το ακίνητο. Χωρίς ταξίδι στην Ελλάδα. Συνήθως 3–6 μήνες. Προσοχή: ο νέος κληρονομικός νόμος (5303/2026) ισχύει για θανάτους από 16 Σεπτεμβρίου 2026.","Les successions, c’est ce que nous faisons le plus. En bref : une procuration signée à notre bureau ou au consulat, nous traduisons l’acte de décès et le testament, notre notaire à Athènes fait l’acceptation et nous enregistrons le bien. Sans voyager. En général 3 à 6 mois. Attention : la nouvelle loi (5303/2026) s’applique aux décès dès le 16 septembre 2026."),
  act:['page:inheritance.html','book:0','review']},
 {id:'tax',k:['φορολογ','δηλωσ','εφορια','ενφια','enfia','αφμ','afm','taxis','ε9','e9','ε1','tax','irs','impot','declaration','fiscal'],
  a:()=>T("If you own property or receive rent or a pension in Greece, you usually need to file there even if you live in Canada. We file for you, check your E9, spread ENFIA in instalments and keep your Taxisnet in order. Many clients take the yearly Tax Care plan so they never have to think about it.","Αν έχετε ακίνητο, ενοίκια ή σύνταξη στην Ελλάδα, συνήθως χρειάζεται δήλωση εκεί, ακόμη κι αν ζείτε στον Καναδά. Την κάνουμε εμείς, ελέγχουμε το Ε9, βάζουμε τον ΕΝΦΙΑ σε δόσεις και κρατάμε το Taxisnet σε τάξη. Πολλοί πελάτες παίρνουν την ετήσια Φορολογική φροντίδα για να μην το σκέφτονται καθόλου.","Si vous avez un bien, un loyer ou une pension en Grèce, il faut en général déclarer là-bas, même en vivant au Canada. Nous déposons pour vous, vérifions l’E9, étalons l’ENFIA et tenons Taxisnet à jour. Beaucoup de clients prennent l’abonnement annuel Fiscalité grecque."),
  act:['page:greek-taxes.html','plan:taxcare','buy:afm']},
 {id:'re',k:['ακινητ','σπιτι','διαμερισμ','οικοπεδ','πουλησ','πωλησ','νοικ','ενοικ','property','house','apartment','land','sell','rent','tenant','maison','vendre','louer','immobil'],
  a:()=>T("We look after property in Greece for owners abroad: tenants, rent, bills, repairs, and selling at the right price with a power of attorney. You can see what we sell on ICS Real Estate, or ask for a free valuation.","Φροντίζουμε ακίνητα στην Ελλάδα για ιδιοκτήτες στο εξωτερικό: ενοικιαστές, ενοίκια, λογαριασμούς, επισκευές, και πώληση στη σωστή τιμή με πληρεξούσιο. Δείτε τι πουλάμε στο ICS Real Estate ή ζητήστε δωρεάν εκτίμηση.","Nous gérons les biens en Grèce pour les propriétaires à l’étranger : locataires, loyers, factures, réparations, et vente au bon prix par procuration. Voyez nos annonces sur ICS Immobilier ou demandez une évaluation gratuite."),
  act:['page:real-estate.html','link:../ics-properties/demo.html','link:../ics-properties/sell.html']},
 {id:'tr',k:['μεταφρασ','πιστοποιητικ','translat','certif','traduct','diplom','πτυχι'],
  a:()=>T("Certified translations Greek ⇄ English ⇄ French, accepted in Canada, the USA and Greece. Usually CA$25–50 per page and most certificates are ready in one business day. You can see the exact price and pay online in 30 seconds.","Επίσημες μεταφράσεις ελληνικά ⇄ αγγλικά ⇄ γαλλικά, αποδεκτές σε Καναδά, ΗΠΑ και Ελλάδα. Συνήθως CA$25–50 ανά σελίδα, και τα περισσότερα πιστοποιητικά είναι έτοιμα σε μία εργάσιμη. Δείτε την ακριβή τιμή και πληρώστε online σε 30 δευτερόλεπτα.","Traductions certifiées grec ⇄ anglais ⇄ français, acceptées au Canada, aux É.-U. et en Grèce. En général 25 à 50 $ CA la page, la plupart prêtes en un jour ouvrable. Voyez le prix exact et payez en ligne en 30 secondes."),
  act:['page:quote.html']},
 {id:'bank',k:['συνταξ','αμκα','amka','τραπεζ','λογαριασμ','efka','εφκα','pension','bank','account','banque','retraite'],
  a:()=>T("Greek banks and pension funds want you at the counter; we go instead. We open or reactivate accounts, apply for and collect Greek pensions, and file the yearly life certificate. Canada and Greece have a social security agreement, so years in both countries may count together.","Οι τράπεζες και τα ταμεία θέλουν να πάτε στο γκισέ· πηγαίνουμε εμείς. Ανοίγουμε ή ενεργοποιούμε λογαριασμούς, κάνουμε αίτηση και είσπραξη ελληνικής σύνταξης και τη βεβαίωση ζωής κάθε χρόνο. Καναδάς και Ελλάδα έχουν συμφωνία κοινωνικής ασφάλισης, έτσι τα χρόνια και στις δύο χώρες μπορεί να μετρούν μαζί.","Les banques et caisses grecques veulent vous voir au guichet ; nous y allons pour vous. Comptes, pensions grecques, certificat de vie annuel. Le Canada et la Grèce ont un accord de sécurité sociale : vos années peuvent compter ensemble."),
  act:['page:banking-pensions.html','plan:pension','buy:amka']},
 {id:'imm',k:['μεταναστ','αδεια εργασ','working holiday','work permit','immigra','καναδα να δουλεψ','visa','βιζα','permis','citizenship','ιθαγενει'],
  a:()=>T("For work permits (ages 18–35), study permits and sponsorship we work with Tseliou Immigration, licensed consultants in Toronto. I can’t assess your eligibility here, but a licensed consultant can in one short call.","Για άδειες εργασίας (18–35), άδειες σπουδών και χορηγίες συνεργαζόμαστε με την Tseliou Immigration, αδειοδοτημένους συμβούλους στο Τορόντο. Εδώ δεν μπορώ να κρίνω αν πληροίτε τις προϋποθέσεις, αλλά ένας αδειοδοτημένος σύμβουλος μπορεί σε μια σύντομη συζήτηση.","Pour les permis de travail (18–35 ans), d’études et le parrainage, nous travaillons avec Tseliou Immigration, consultants autorisés à Toronto. Je ne peux pas évaluer votre admissibilité ici, mais un consultant autorisé le peut en un court appel."),
  act:['page:immigration.html','book:6']},
 {id:'price',k:['ποσο κοστιζ','κοστος','τιμη','τιμες','χρεωσ','price','cost','how much','fee','tarif','prix','combien'],
  a:()=>T("Fixed-price services (AFM, Taxisnet codes, AMKA, certificates) can be bought online. Bigger cases like an inheritance get a fixed price in writing after a free first conversation, so there are no surprises.","Υπηρεσίες με σταθερή τιμή (ΑΦΜ, Taxisnet, ΑΜΚΑ, πιστοποιητικά) αγοράζονται online. Οι μεγαλύτερες υποθέσεις, όπως μια κληρονομιά, παίρνουν σταθερή τιμή γραπτώς μετά από μια δωρεάν πρώτη συζήτηση. Χωρίς εκπλήξεις.","Les services à prix fixe (AFM, Taxisnet, AMKA, certificats) s’achètent en ligne. Les dossiers plus importants, comme une succession, reçoivent un prix fixe par écrit après une première conversation gratuite."),
  act:['page:pricing.html','book']},
 {id:'status',k:['υποθεση μου','που βρισκεται','σταδιο','status','my case','mon dossier','πυλη','portal'],
  a:()=>T("You can see exactly where your case is in the client portal: the stage, the documents we still need and messages from your consultant. You sign in with a code sent to your email, no password.","Το πού βρίσκεται η υπόθεσή σας το βλέπετε στην πύλη πελατών: στάδιο, έγγραφα που λείπουν και μηνύματα από τον σύμβουλό σας. Μπαίνετε με κωδικό που έρχεται στο email σας, χωρίς password.","Vous voyez où en est votre dossier dans le portail client : l’étape, les documents manquants et les messages de votre conseillère. Connexion par code reçu par courriel, sans mot de passe."),
  act:['page:portal.html']},
 {id:'office',k:['γραφει','διευθυνσ','τηλεφων','ωραριο','office','address','phone','hours','bureau','adresse','telephone','toronto','montreal','αθηνα','athens','new york'],
  a:()=>T("We have six offices: Toronto, Laval (Montreal), New York, Athens, Thessaloniki and Nicosia. Toll-free from Canada and the USA: 1.866.496.4539. You can meet us at the office or by video.","Έχουμε έξι γραφεία: Τορόντο, Λαβάλ (Μόντρεαλ), Νέα Υόρκη, Αθήνα, Θεσσαλονίκη και Λευκωσία. Χωρίς χρέωση από Καναδά και ΗΠΑ: 1.866.496.4539. Μας βλέπετε στο γραφείο ή με βίντεο.","Six bureaux : Toronto, Laval (Montréal), New York, Athènes, Thessalonique et Nicosie. Sans frais au Canada et aux É.-U. : 1.866.496.4539. Au bureau ou par vidéo."),
  act:['page:contact.html','book']},
 {id:'hello',k:['γεια','καλησπερ','καλημερ','hello','hi ','hey','bonjour','salut'],
  a:()=>T("Hello and welcome! Tell me what you need to sort out in Greece, in your own words, and I’ll show you the steps.","Γεια σας και καλώς ήρθατε! Πείτε μου με δικά σας λόγια τι χρειάζεται να τακτοποιήσετε στην Ελλάδα και θα σας δείξω τα βήματα.","Bonjour et bienvenue ! Dites-moi avec vos mots ce que vous devez régler en Grèce et je vous montre les étapes."),act:[]}
];
/* personal questions the assistant should not answer itself */
const PERSONAL=['ποσο φορο θα','θα πληρωσω','στη δικη μου','στην περιπτωση μου','η μητερα μου','ο πατερας μου','my mother','my father','in my case','how much tax will i','dans mon cas','ma mere','mon pere','δικαιουμαι'];

const ACT={
 session:()=>({t:T('Video session with Mr Moussas','Συνεδρία με τον κ. Μουσσά','Séance avec M. Moussas')+' · <span data-price="session"></span>',buy:'session',main:1}),
 review:()=>({t:T('Written case review (48h)','Γραπτός έλεγχος υπόθεσης (48 ώρες)','Analyse écrite du dossier (48 h)')+' · <span data-price="review"></span>',buy:'review'}),
 book:n=>({t:T('Free first consultation','Δωρεάν πρώτη συζήτηση','Première consultation gratuite'),href:'book.html'+(n!=null?'?topic='+n:'')}),
 page:h=>({t:T('Read more','Περισσότερα','En savoir plus')+' →',href:h}),
 link:h=>({t:h.includes('sell')?T('Free valuation','Δωρεάν εκτίμηση','Évaluation gratuite'):T('See properties','Δείτε ακίνητα','Voir les propriétés'),href:h}),
 plan:k=>({t:T('Annual plan','Ετήσια συνδρομή','Abonnement annuel')+' · <span data-plan-n="'+k+'"></span>',buy:k}),
 buy:k=>({t:T('Buy','Αγορά','Acheter')+' · <span data-cat-n="'+k+'"></span>',buy:k}),
 human:()=>({t:T('Have a consultant reply to me','Να μου απαντήσει σύμβουλος','Être rappelé par un conseiller'),human:1})
};
const actBtn=s=>{const [k,arg]=s.split(/:(.*)/);const a=ACT[k](arg===''?null:arg);return a.href?`<a class="cb-a${a.main?' on':''}" href="${a.href}">${a.t}</a>`:`<button class="cb-a${a.main?' on':''}" ${a.buy?`data-cbuy="${a.buy}"`:''} ${a.human?'data-human="1"':''}>${a.t}</button>`};

/* UI */
const css=document.createElement('style');css.textContent=`
.cb-l{position:fixed;right:16px;bottom:64px;z-index:70;display:flex;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:999px;background:#0f1512;color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.28);font:600 13.5px/1.2 var(--f,system-ui);max-width:calc(100% - 32px)}
.cb-l img,.cb-h img{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:50% 18%;background:#e4e1d6;flex:none}
.cb-l small{display:block;font-weight:500;color:#b7c0ba;font-size:11.5px}
.cb-dot{position:absolute;left:40px;top:6px;width:11px;height:11px;border-radius:50%;background:#7ec41f;box-shadow:0 0 0 2px #0f1512}
.cb-ai{font:700 9.5px/1 var(--f,system-ui);letter-spacing:.08em;background:var(--lime,#9eaf00);color:#10140a;padding:3px 5px;border-radius:5px;vertical-align:middle;margin-left:4px}
.cb{position:fixed;right:16px;bottom:16px;z-index:90;width:min(400px,calc(100% - 32px));height:min(640px,calc(100vh - 32px));display:none;flex-direction:column;background:#fbfbf8;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35)}
.cb.on{display:flex}
.cb-h{display:flex;gap:12px;align-items:center;padding:14px 14px 12px;background:#0f1512;color:#fff}
.cb-h b{display:block;font:600 15px/1.2 var(--f,system-ui)}.cb-h small{font-size:12px;color:#b7c0ba}
.cb-x{margin-left:auto;color:#fff;font-size:22px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08)}
.cb-n{font-size:11.5px;color:#66706a;background:#f1f2ea;padding:7px 14px;line-height:1.35}
.cb-m{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.cb-b{max-width:88%;padding:10px 13px;border-radius:16px;font-size:14.5px;line-height:1.45;white-space:pre-line}
.cb-b.me{align-self:flex-end;background:#0f1512;color:#fff;border-bottom-right-radius:5px}
.cb-r{display:flex;gap:8px;align-items:flex-end}.cb-r img{width:28px;height:28px;border-radius:50%;object-fit:cover;object-position:50% 18%;background:#e4e1d6;flex:none}
.cb-r .cb-b{background:#fff;box-shadow:inset 0 0 0 1px rgba(15,21,18,.1);border-bottom-left-radius:5px}
.cb-acts{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 0 36px}
.cb-a{font:600 12.5px/1.2 var(--f,system-ui);padding:8px 11px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px rgba(15,21,18,.18);color:#0f1512;text-decoration:none;cursor:pointer}
.cb-a.on{background:var(--lime,#9eaf00);box-shadow:none}
.cb-ty span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#9aa39d;animation:cbt 1s infinite}.cb-ty span:nth-child(2){animation-delay:.15s}.cb-ty span:nth-child(3){animation-delay:.3s}
@keyframes cbt{50%{transform:translateY(-4px);opacity:.5}}
.cb-chips{display:flex;gap:6px;overflow-x:auto;padding:0 14px 8px}
.cb-chips button{flex:none;font:500 12.5px/1 var(--f,system-ui);padding:8px 11px;border-radius:999px;background:#eef1dc;color:#2d3600}
.cb-f{display:flex;gap:8px;padding:10px 12px 12px;border-top:1px solid rgba(15,21,18,.08);background:#fff}
.cb-f input{flex:1;min-width:0;border:0;padding:12px 13px;border-radius:12px;background:#f3f3ee;font:15px var(--f,system-ui)}
.cb-f button{width:44px;border-radius:12px;background:#0f1512;color:#fff;font-size:18px}
.cb-hf{display:grid;gap:6px;margin-left:36px;background:#fff;padding:10px;border-radius:14px;box-shadow:inset 0 0 0 1px rgba(15,21,18,.12)}
.cb-hf input{border:0;padding:10px;border-radius:9px;background:#f3f3ee;font:14px var(--f,system-ui)}
@media (max-width:620px){.cb-l span.t{display:none}.cb-l{padding:6px}}
`;document.head.appendChild(css);

const launch=document.createElement('button');launch.className='cb-l';launch.setAttribute('aria-label','Chat');
const box=document.createElement('section');box.className='cb';box.setAttribute('aria-label','Chat');
document.body.append(launch,box);
let H=[];try{H=JSON.parse(sessionStorage.getItem('ics-chat')||'[]')}catch(e){}
const save=()=>{try{sessionStorage.setItem('ics-chat',JSON.stringify(H.slice(-40)))}catch(e){}};

function draw(){
 launch.innerHTML=`<span style="position:relative;display:flex"><img src="${PHOTO}" alt=""><i class="cb-dot"></i></span><span class="t">${T('Ask Mr Moussas’ assistant','Ρωτήστε τον βοηθό του κ. Μουσσά','Demandez à l’assistant de M. Moussas')}<span class="cb-ai">AI</span><small>${T('Replies instantly · 24/7','Απαντά αμέσως · 24/7','Répond tout de suite · 24/7')}</small></span>`;
 box.innerHTML=`<div class="cb-h"><img src="${PHOTO}" alt="Anastasios Moussas"><div><b>${T('Mr Moussas’ assistant','Ο βοηθός του κ. Μουσσά','L’assistant de M. Moussas')} <span class="cb-ai">AI</span></b><small>${T('Answers from ICS knowledge · EN / ΕΛ / FR','Απαντά με τη γνώση της ICS · EN / ΕΛ / FR','Répond avec le savoir d’ICS · EN / ΕΛ / FR')}</small></div><button class="cb-x" aria-label="Close">×</button></div>
 <div class="cb-n">${T('You are chatting with an AI assistant trained on Anastasios Moussas’ answers and ICS content. It gives general information, not legal or tax advice for your case; a person reviews anything specific.','Μιλάτε με βοηθό τεχνητής νοημοσύνης, εκπαιδευμένο στις απαντήσεις του Αναστάσιου Μουσσά και στο περιεχόμενο της ICS. Δίνει γενικές πληροφορίες, όχι νομική ή φορολογική συμβουλή για τη δική σας περίπτωση· ό,τι είναι συγκεκριμένο το εξετάζει άνθρωπος.','Vous parlez à un assistant IA formé sur les réponses d’Anastasios Moussas et le contenu d’ICS. Il donne de l’information générale, pas un avis juridique ou fiscal personnel ; une personne examine les cas précis.')}</div>
 <div class="cb-m" id="cbM"></div>
 <div class="cb-chips">${[['🏛',T('Inheritance','Κληρονομιά','Succession')],['🧾',T('Greek taxes','Φορολογικά','Impôts grecs')],['🏡',T('Property','Ακίνητο','Immobilier')],['📄',T('Translation','Μετάφραση','Traduction')],['🎥',T('Session with Mr Moussas','Συνεδρία με τον κ. Μουσσά','Séance avec M. Moussas')]].map(([i,t])=>`<button data-q="${esc(t)}">${i} ${t}</button>`).join('')}</div>
 <form class="cb-f"><input placeholder="${T('Write your question…','Γράψτε την ερώτησή σας…','Écrivez votre question…')}" aria-label="Message"><button aria-label="Send">➤</button></form>`;
 const m=$('#cbM');
 if(!H.length)H.push({r:'bot',id:'welcome'});
 H.forEach(x=>m.insertAdjacentHTML('beforeend',bubble(x)));fill();m.scrollTop=m.scrollHeight;
 box.querySelector('.cb-x').onclick=()=>box.classList.remove('on');
 box.querySelector('.cb-f').onsubmit=e=>{e.preventDefault();const i=e.target.querySelector('input');if(i.value.trim()){ask(i.value.trim());i.value=''}};
 box.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>ask(b.dataset.q));
}
const textOf=x=>x.id==='welcome'?T("Hello, I’m the digital assistant of Anastasios Moussas. Ask me anything about inheritance, Greek taxes, property, translations or pensions, in English, Greek or French. For your own case I can arrange a session with Mr Moussas himself.","Γεια σας, είμαι ο ψηφιακός βοηθός του Αναστάσιου Μουσσά. Ρωτήστε με ό,τι θέλετε για κληρονομιές, φορολογικά, ακίνητα, μεταφράσεις ή συντάξεις, στα ελληνικά, αγγλικά ή γαλλικά. Για τη δική σας υπόθεση μπορώ να κλείσω συνεδρία με τον ίδιο τον κ. Μουσσά.","Bonjour, je suis l’assistant numérique d’Anastasios Moussas. Posez-moi vos questions sur les successions, les impôts grecs, l’immobilier, les traductions ou les pensions, en français, anglais ou grec. Pour votre propre dossier, je peux organiser une séance avec M. Moussas lui-même."):x.id==='personal'?T("That depends on details of your own case, and I don’t want to guess on something this important. I can pass it to a consultant who replies by email, arrange a written case review within 48 hours, or book a session with Mr Moussas.","Αυτό εξαρτάται από τα στοιχεία της δικής σας υπόθεσης, και δεν θέλω να μαντέψω σε κάτι τόσο σημαντικό. Μπορώ να το προωθήσω σε σύμβουλο που θα σας απαντήσει με email, να κανονίσω γραπτό έλεγχο της υπόθεσης σε 48 ώρες, ή να κλείσω συνεδρία με τον κ. Μουσσά.","Cela dépend des détails de votre dossier, et je ne veux pas deviner sur un sujet aussi important. Je peux transmettre à un conseiller qui répondra par courriel, organiser une analyse écrite en 48 h, ou réserver une séance avec M. Moussas."):x.id==='none'?T("Good question. I don’t have a reliable answer to that in my notes, so I’d rather a person from our team answers you properly.","Καλή ερώτηση. Δεν έχω αξιόπιστη απάντηση γι’ αυτό στις σημειώσεις μου, οπότε προτιμώ να σας απαντήσει σωστά άνθρωπος της ομάδας μας.","Bonne question. Je n’ai pas de réponse fiable dans mes notes ; je préfère qu’une personne de l’équipe vous réponde correctement."):x.id==='sent'?T("Thank you. Your question and this conversation went to the team; a consultant will email you within one business day.","Ευχαριστώ. Η ερώτησή σας και η συζήτηση στάλθηκαν στην ομάδα· ένας σύμβουλος θα σας στείλει email εντός μίας εργάσιμης.","Merci. Votre question et cette conversation ont été transmises ; un conseiller vous écrira en un jour ouvrable."):(K.find(k=>k.id===x.id)||{a:()=>''}).a();
const actsOf=x=>x.p&&x.id!=='personal'?['session','review'].concat(((K.find(k=>k.id===x.id)||{}).act||[]).filter(a=>a!=='session').slice(0,2),['human']):x.id==='personal'?['human','review','session']:x.id==='none'?['human','book','session']:x.id==='welcome'||x.id==='sent'?[]:((K.find(k=>k.id===x.id)||{}).act||[]).concat(x.id!=='hello'?['human']:[]);
function bubble(x){const prev=LANG;LANG=x.lang||null;try{return bubble0(x)}finally{LANG=prev}}
function bubble0(x){if(x.r==='me')return `<div class="cb-b me">${esc(x.t)}</div>`;
 const note=x.p?'\n\n'+T('For your own situation, the details matter: Mr Moussas or one of our lawyers can look at it with you.','Για τη δική σας περίπτωση μετράνε οι λεπτομέρειες: ο κ. Μουσσάς ή ένας από τους δικηγόρους μας μπορεί να τη δει μαζί σας.','Pour votre situation, les détails comptent : M. Moussas ou l’un de nos avocats peut l’examiner avec vous.'):'';
 if(x.r==='form')return `<form class="cb-hf" data-hf><input name="n" placeholder="${T('Full name','Ονοματεπώνυμο','Nom complet')}"><input name="e" type="email" placeholder="Email"><button class="cb-a on" style="justify-self:start">${T('Send to the team','Αποστολή στην ομάδα','Envoyer à l’équipe')}</button></form>`;
 const a=actsOf(x);return `<div class="cb-r"><img src="${PHOTO}" alt=""><div class="cb-b">${esc(textOf(x)+note)}</div></div>${a.length?`<div class="cb-acts">${a.map(actBtn).join('')}</div>`:''}`}
function fill(){const P=window.ICSsite;if(P&&P.fill)P.fill();
 box.querySelectorAll('[data-cbuy]').forEach(b=>b.onclick=()=>{box.classList.remove('on');window.ICSsite&&window.ICSsite.checkout(b.dataset.cbuy)});
 box.querySelectorAll('[data-human]').forEach(b=>b.onclick=()=>{if(H[H.length-1].r==='form')return;const lg=(H.filter(x=>x.lang).pop()||{}).lang;H.push({r:'form',lang:lg});save();$('#cbM').insertAdjacentHTML('beforeend',bubble({r:'form',lang:lg}));fill();$('#cbM').scrollTop=1e6});
 box.querySelectorAll('[data-hf]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const n=f.n.value.trim(),em=f.e.value.trim();if(!n||!em)return;
  const q=H.filter(x=>x.r==='me').map(x=>x.t);if(window.ICS){const S=ICS.load();ICS.lead(S,'request',{name:n,email:em,off:'Toronto',type:'inh',topic:'AI assistant hand-off',what:'From the AI assistant chat · '+(q[q.length-1]||''),text:'Chat: '+q.join(' / ')},['mm']);ICS.save(S)}
  const lg=(H.filter(x=>x.lang).pop()||{}).lang;H=H.filter(x=>x.r!=='form');H.push({r:'bot',id:'sent',lang:lg});save();draw()})}
function ask(q){H.push({r:'me',t:q,lang:detect(q)});save();const m=$('#cbM');m.insertAdjacentHTML('beforeend',bubble({r:'me',t:q}));
 const ty=document.createElement('div');ty.className='cb-r';ty.innerHTML=`<img src="${PHOTO}" alt=""><div class="cb-b cb-ty"><span></span><span></span><span></span></div>`;m.appendChild(ty);m.scrollTop=1e6;
 const n=' '+norm(q)+' ';let id='none';
 const pers=PERSONAL.some(p=>n.includes(norm(p)));let best=0;K.forEach(k=>{const s=k.k.filter(w=>n.includes(norm(w))).length;if(s>best){best=s;id=k.id}});if(pers&&id==='none')id='personal';const lang=detect(q);
 setTimeout(()=>{ty.remove();const x={r:'bot',id,lang,p:pers&&id!=='personal'};H.push(x);save();
  LANG=x.lang||null;let full=textOf(x);if(x.p)full+='\n\n'+T('For your own situation, the details matter: Mr Moussas or one of our lawyers can look at it with you.','Για τη δική σας περίπτωση μετράνε οι λεπτομέρειες: ο κ. Μουσσάς ή ένας από τους δικηγόρους μας μπορεί να τη δει μαζί σας.','Pour votre situation, les détails comptent : M. Moussas ou l’un de nos avocats peut l’examiner avec vous.');LANG=null;m.insertAdjacentHTML('beforeend',bubble(x));const b=m.querySelectorAll('.cb-r .cb-b');const el=b[b.length-1];const acts=m.lastElementChild.classList.contains('cb-acts')?m.lastElementChild:null;
  if(acts)acts.style.visibility='hidden';let i=0;el.textContent='';const step=()=>{i+=3;el.textContent=full.slice(0,i);m.scrollTop=1e6;if(i<full.length)setTimeout(step,16);else{if(acts)acts.style.visibility='';fill();m.scrollTop=1e6}};step()},650+Math.random()*500)}
launch.onclick=()=>{box.classList.add('on');$('#cbM').scrollTop=1e6;setTimeout(()=>box.querySelector('.cb-f input').focus(),50)};
draw();
new MutationObserver(()=>draw()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
