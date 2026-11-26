// One-off: turns the single-page site script (old-script.js) into core.js that works on every page.
const fs = require("fs"), path = require("path");
let s = fs.readFileSync(path.join(__dirname, "old-script.js"), "utf8");
const rep = (a, b) => { if (!s.includes(a)) throw new Error("missing: " + a.slice(0, 80)); s = s.split(a).join(b); };

rep(`$('#notesT').onclick=()=>html.classList.toggle('notes');
$('#year').textContent=new Date().getFullYear();$('#yrs').textContent=new Date().getFullYear()-2007;`,
`if($('#notesT'))$('#notesT').onclick=()=>html.classList.toggle('notes');
$$('.yr').forEach(e=>e.textContent=new Date().getFullYear());$$('.yrs').forEach(e=>e.textContent=new Date().getFullYear()-2007);`);
rep(`$$('#lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));renderAll()}
$('#lang').onclick=e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.l)};`,
`$$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));renderAll()}
$$('.lang').forEach(x=>x.onclick=e=>{const b=e.target.closest('button');if(b)setLang(b.dataset.l)});`);
rep(`function renderClocks(){$('#clocks').innerHTML`, `function renderClocks(){if(!$('#clocks'))return;$('#clocks').innerHTML`);
rep(`$('#clocks').onclick=e=>`, `if($('#clocks'))$('#clocks').onclick=e=>`);
rep(`(function(){const c=$('#routes');let g`, `(function(){const c=$('#routes');if(!c)return;let g`);
rep(`$('#acc').innerHTML=`, `if($('#acc'))$('#acc').innerHTML=`);
rep(`function renderNeeds(){$('#needs').innerHTML`, `function renderNeeds(){if(!$('#needs'))return;$('#needs').innerHTML`);
rep(`<a class="btn line" href="#quote">`, `<a class="btn line" href="quote.html">`);
rep(`$('#planBook').onclick=()=>{B.topic=need;B.done=false;renderBook();$('#book').scrollIntoView({behavior:'smooth'})}}`,
`$('#planBook').onclick=()=>{location.href='book.html?topic='+need}}`);
rep(`$('#needs').onclick=`, `if($('#needs'))$('#needs').onclick=`);
rep(`function renderQuote(){const o=`, `function renderQuote(){if(!$('#qP'))return;const o=`);
rep(`document.querySelector('.qform').addEventListener(`, `if($('.qform'))document.querySelector('.qform').addEventListener(`);
rep(`$('#qPg').oninput=renderQuote;
const drop=$('#drop');`, `if($('#qP')){$('#qPg').oninput=renderQuote;
const drop=$('#drop');`);
rep(`$('#qPay').textContent=T('✓ Paid · your translator has the files','✓ Πληρώθηκε · ο μεταφραστής έχει τα αρχεία','✓ Payé · votre traducteur a les fichiers')})};`,
`$('#qPay').textContent=T('✓ Paid · your translator has the files','✓ Πληρώθηκε · ο μεταφραστής έχει τα αρχεία','✓ Payé · votre traducteur a les fichiers')})}}`);
rep(`const qCur=()=>OFFS[selOff]==='New York'?'USD':OFFS[selOff]==='Athens'||OFFS[selOff]==='Thessaloniki'||OFFS[selOff]==='Nicosia'?'EUR':'CAD';`,
`const qCur=()=>CUR;`);
rep("<input value=\"${esc($('#qName')?.value||'Eleni Papas')}\">",
"<input value=\"${esc(($('#qName')&&$('#qName').value)||($('#coN')&&$('#coN').value)||'Eleni Papas')}\">");
rep(`function renderBook(){const el=$('#bk');`, `function renderBook(){const el=$('#bk');if(!el)return;`);
rep(`function renderPortal(flash){const w=$('#pwin');`, `function renderPortal(flash){const w=$('#pwin');if(!w)return;`);
rep(`href="#book" style="margin-top:10px">+`, `href="book.html" style="margin-top:10px">+`);
rep(`$('#nlf').onsubmit=e=>{`, `$$('.nlf').forEach(f=>f.onsubmit=e=>{`);
rep(`const em=$('#nlE').value.trim();`, `const em=e.target.querySelector('input').value.trim();`);
rep(`toast(T('Subscribed. Welcome email on its way.','Εγγραφήκατε. Έρχεται email καλωσορίσματος.','Abonné. Un courriel de bienvenue arrive.'))};`,
`toast(T('Subscribed. Welcome email on its way.','Εγγραφήκατε. Έρχεται email καλωσορίσματος.','Abonné. Un courriel de bienvenue arrive.'))});`);
rep(` $('#team').innerHTML=`, ` if($('#team'))$('#team').innerHTML=`);
rep(` $('#oGrid').innerHTML=`, ` if($('#oGrid'))$('#oGrid').innerHTML=`);
rep(`href="#book" data-bo="\${o}"`, `href="book.html?office=\${encodeURIComponent(o)}" data-bo="\${o}"`);
rep(`const B={topic:0,off:'Toronto',mode:'office',day:-1,slot:null,done:false};`,
`const B={topic:0,off:'Toronto',mode:'office',day:-1,slot:null,done:false};{const q=new URLSearchParams(location.search);if(q.has('topic'))B.topic=+q.get('topic')||0;if(q.get('office')&&OFF[q.get('office')])B.off=q.get('office')}`);
// portal: "My plans" tab
rep(`['appts',T('Appointments','Ραντεβού','Rendez-vous'),'']];`,
`['appts',T('Appointments','Ραντεβού','Rendez-vous'),''],['plans',T('My plans','Οι συνδρομές μου','Mes abonnements'),'']];`);
rep("main=head+nowBox+track+({case:",
"const myPl=(S.orders||[]).filter(o=>o.kind==='plan'&&c.em.includes(o.email));\n" +
"  const plBox=`<div class=\"box\"><h4>${T('Annual plans','Ετήσιες συνδρομές','Abonnements annuels')}</h4>${myPl.map(o=>`<div class=\"inv\"><span><b>${esc(PLANS[o.key]?tr(PLANS[o.key].n):o.what)}</b><br><small class=\"muted\">${o.id} · ${T('renews','ανανέωση','renouvellement')} ${new Date(o.renew).toLocaleDateString(loc(),{day:'numeric',month:'short',year:'numeric'})}</small></span><span style=\"text-align:right\"><b>${money(o.amt,o.cur)}</b>/${T('yr','έτος','an')}<br><label class=\"chk\" style=\"justify-content:flex-end;margin-top:6px\"><input type=\"checkbox\" data-auto=\"${o.id}\" ${o.auto?'checked':''}> ${T('Auto-renew','Αυτόματη ανανέωση','Renouvellement auto')}</label></span></div>`).join('')||`<div class=\"muted\">${T('No plans yet.','Καμία συνδρομή ακόμη.','Aucun abonnement.')}</div>`}<a class=\"btn line s\" href=\"pricing.html#plans\" style=\"margin-top:10px\">${T('See all plans','Όλες οι συνδρομές','Voir les abonnements')}</a></div>`;\n" +
"  main=head+nowBox+track+({plans:plBox,case:");
rep(`if(!k)return;
 let upIdx=-1;`, `$$('[data-auto]').forEach(x=>x.onchange=()=>{S=ICS.load();const o=S.orders.find(y=>y.id===x.dataset.auto);o.auto=x.checked;ICS.save(S);toast(x.checked?T('Auto-renew is on','Η αυτόματη ανανέωση ενεργοποιήθηκε','Renouvellement automatique activé'):T('Auto-renew is off · we will remind you 30 days before','Η αυτόματη ανανέωση απενεργοποιήθηκε · θα σας υπενθυμίσουμε 30 μέρες πριν','Renouvellement désactivé · rappel 30 jours avant'))});
 if(!k)return;
 let upIdx=-1;`);
rep(`ICS.on(ns=>{const old=S;S=ns;if(!P.in){renderPortal();return}`, `ICS.on(ns=>{const old=S;S=ns;if(!$('#pwin'))return;if(!P.in){renderPortal();return}`);
fs.writeFileSync(path.join(__dirname, "core.js"), s);
console.log("core.js", s.length);
