/* The Met Hotel · OpenSite demo · shared header / footer / drawer / lightbox / notes */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const TEL = "+302310017000", TELV = "2310 017 000", MAIL = "themethotel@chandris.gr";
const ADDR = "26ης Οκτωβρίου 48, 546 27 Θεσσαλονίκη";
const MARK = `<svg class="mk" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M4 36V6l16 16L36 6v30" stroke="currentColor" stroke-width="2.2"/><path d="M4 6h32" stroke="#d6b47e" stroke-width="1.2"/></svg>`;

const NAV = [["rooms.html","Δωμάτια & Σουίτες","rooms"],["dining.html","Γαστρονομία","dining"],["spa.html","M’SPA","spa"],["events.html","Εκδηλώσεις","events"],["location.html","Τοποθεσία","location"]];

document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html">${MARK}<span><b>THE MET</b><small>Hotel · Thessaloniki</small></span></a>
  <nav class="nav">${NAV.map(([h,t,k])=>`<a href="${h}" class="${k===page?"on":""}">${t}</a>`).join("")}</nav>
  <div class="hdr-r">
    <span class="lang ph" data-note="Ίδιο site σε EN / DE / FR με σωστό hreflang"><b>ΕΛ</b> <span>· EN · DE · FR</span></span>
    <a class="btn btn-gold" href="book.html">Κράτηση</a>
    <button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button>
  </div>
</div></header>
<div class="mmenu" id="mmenu"><button class="x" id="mx" aria-label="Κλείσιμο">×</button><div class="wrap">
  <a class="m" href="demo.html">Αρχική</a>${NAV.map(([h,t])=>`<a class="m" href="${h}">${t}</a>`).join("")}<a class="m" href="book.html" style="color:var(--gold2)">Κράτηση</a>
  <p class="small" style="margin-top:28px">${ADDR}<br><a href="tel:${TEL}">${TELV}</a> · <a href="mailto:${MAIL}">${MAIL}</a></p>
  <p class="lang" style="display:block;margin-top:18px"><b>ΕΛ</b> <span>· EN · DE · FR</span></p>
</div></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div>
      <a class="brand" href="demo.html" style="color:#fff">${MARK}<span><b>THE MET</b><small>Hotel · Thessaloniki</small></span></a>
      <p class="small" style="color:#a9a39a;margin-top:22px;max-width:360px">Ξενοδοχείο πέντε αστέρων στο νέο λιμάνι της Θεσσαλονίκης, μέλος των Design Hotels™ και του Marriott Bonvoy. 212 δωμάτια και σουίτες, rooftop πισίνα, M’SPA και 13 αίθουσες εκδηλώσεων.</p>
    </div>
    <div><h4>Διαμονή</h4><ul><li><a href="rooms.html">Δωμάτια & Σουίτες</a></li><li><a href="book.html">Κράτηση με την καλύτερη τιμή</a></li><li><a href="spa.html">M’SPA & πισίνες</a></li><li><a href="location.html">Τοποθεσία & parking</a></li></ul></div>
    <div><h4>Εμπειρίες</h4><ul><li><a href="dining.html">Sky Bar Restaurant</a></li><li><a href="dining.html#longbar">The Long Bar</a></li><li><a href="dining.html#chan">Chan</a></li><li><a href="events.html">Συνέδρια & γάμοι</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul><li>${ADDR}</li><li><a href="tel:${TEL}">${TELV}</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li><a href="https://www.instagram.com/themethotel/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/THEMETHOTEL.thessaloniki" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  </div>
  <div class="big">THE MET</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} The Met Hotel · Chandris Hotels</span><span>Design Hotels™ · Marriott Bonvoy · Green Key</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="mbook"><a class="btn btn-line" href="tel:${TEL}" style="color:#fff">Κλήση</a><a class="btn btn-gold" href="book.html">Κράτηση</a></div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Αίτημα">
  <div class="dr-head"><p class="h3" id="drT">Αίτημα</p><button id="drX" style="font-size:30px;line-height:1" aria-label="Κλείσιμο">×</button></div>
  <div class="dr-body">
    <label class="field"><span id="drTopicL">Θέμα</span><select id="cTopic"></select></label>
    <div class="row2"><label class="field"><span>Ημερομηνία</span><input id="cDate" type="date"></label><label class="field"><span id="drPplL">Άτομα</span><input id="cPpl" type="number" min="1" value="2"></label></div>
    <label class="field"><span>Ονοματεπώνυμο</span><input id="cName" autocomplete="name"></label>
    <div class="row2"><label class="field"><span>Κινητό</span><input id="cTel" inputmode="tel" autocomplete="tel"></label><label class="field"><span>Email</span><input id="cMail" type="email" autocomplete="email"></label></div>
    <label class="field"><span>Σχόλια</span><textarea id="cNote" rows="3"></textarea></label>
    <p class="small ph" data-note="Το αίτημα πάει στο σωστό τμήμα (sales / F&B / spa) με email">Απαντάμε μέσα σε λίγες ώρες, στα ελληνικά ή στα αγγλικά.</p>
  </div>
  <div class="dr-foot"><button class="btn btn-ink" id="cGo" style="width:100%">Αποστολή αιτήματος</button><div class="okbox" id="cOk"></div></div>
</aside>
<div class="lb" id="lb"><button id="lbX" aria-label="Κλείσιμο">×</button><button class="pv" id="lbP" aria-label="Προηγούμενη">‹</button><img id="lbI" alt=""><button class="nx" id="lbN" aria-label="Επόμενη">›</button></div>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);

/* header */
const hdr = $("#hdr");
const onScroll = () => hdr.classList.toggle("solid", scrollY > 40);
addEventListener("scroll", onScroll, {passive:true}); onScroll();
$("#burger").onclick = () => $("#mmenu").classList.add("on");
$("#mx").onclick = () => $("#mmenu").classList.remove("on");

/* reveal */
const io = new IntersectionObserver(e => e.forEach(x => { if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } }), {threshold:.1});
$$(".rv").forEach(e => io.observe(e));

/* drawer */
const FORMS = {
  table:{t:"Κράτηση τραπεζιού",l:"Χώρος",o:["The Long Bar · all day menu","Chan · menu στο Long Bar","Avenue 48 · πρωινό","Sky Bar Restaurant · από την άνοιξη 2027"],p:"Άτομα"},
  event:{t:"Ζητήστε προσφορά",l:"Τύπος εκδήλωσης",o:["Συνέδριο / meeting","Εταιρικό event","Γάμος / δεξίωση","Βάπτιση","Γενέθλια / party","Gala dinner"],p:"Καλεσμένοι"},
  spa:{t:"Ραντεβού στο M’SPA",l:"Θεραπεία",o:["Ημερήσια είσοδος (πισίνα, jacuzzi, γυμναστήριο)","Μασάζ χαλάρωσης","Θεραπεία προσώπου","Πακέτο για δύο","Δεν ξέρω, θέλω συμβουλή"],p:"Άτομα"},
  info:{t:"Επικοινωνία",l:"Θέμα",o:["Κράτηση δωματίου","Ερώτηση για διαμονή","Κατοικίδια","Parking / μεταφορά","Άλλο"],p:"Άτομα"}
};
const openDr = (kind="info", pick) => { const f = FORMS[kind] || FORMS.info;
  $("#drT").textContent = f.t; $("#drTopicL").textContent = f.l; $("#drPplL").textContent = f.p;
  $("#cTopic").innerHTML = f.o.map(o=>`<option>${o}</option>`).join("");
  if(pick) [...$("#cTopic").options].forEach(o=>{ if(o.text.startsWith(pick)) o.selected = true; });
  $("#cOk").classList.remove("on");
  $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
window.MetBind = root => $$("[data-cta]", root || document).forEach(b => b.onclick = e => { e.preventDefault(); openDr(b.dataset.cta, b.dataset.pick); });
window.MetBind();
$("#drX").onclick = closeDr; $("#scrim").onclick = closeDr;
$("#cGo").onclick = () => { const o = $("#cOk");
  if(!$("#cName").value.trim() || !$("#cTel").value.trim()){ o.textContent = "Συμπληρώστε ονοματεπώνυμο και κινητό."; o.classList.add("on"); return; }
  o.innerHTML = "✓ Ευχαριστούμε! Το αίτημά σας καταχωρήθηκε και θα σας απαντήσουμε σύντομα.<br><span class='small'>(demo · δεν στέλνεται τίποτα)</span>"; o.classList.add("on"); };

/* lightbox: every img[data-lb] in the same group (data-lb value) */
let imgs = [], li = 0;
const showLb = i => { li = (i + imgs.length) % imgs.length; $("#lbI").src = imgs[li]; $("#lb").classList.add("on"); };
window.MetLb = () => $$("img[data-lb]").forEach(im => { im.style.cursor = "zoom-in";
  im.onclick = () => { const g = $$(`img[data-lb="${im.dataset.lb}"]`); imgs = g.map(x => x.currentSrc || x.src); showLb(g.indexOf(im)); }; });
window.MetLb();
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li+1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li-1); };
$("#lb").onclick = e => { if(e.target.id === "lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => {
  if(e.key === "Escape"){ closeDr(); $("#lb").classList.remove("on"); $("#mmenu").classList.remove("on"); }
  if($("#lb").classList.contains("on")){ if(e.key === "ArrowRight") showLb(li+1); if(e.key === "ArrowLeft") showLb(li-1); } });

/* booking bar → book.html with the dates */
const iso = d => d.toISOString().slice(0,10);
$$(".bbar").forEach(f => { const a = $("[name=in]", f), b = $("[name=out]", f);
  if(a && !a.value){ const t = new Date(); t.setDate(t.getDate()+7); a.value = iso(t); t.setDate(t.getDate()+2); b.value = iso(t); }
  a && (a.onchange = () => { if(b.value <= a.value){ const t = new Date(a.value); t.setDate(t.getDate()+1); b.value = iso(t); } });
  f.onsubmit = e => { e.preventDefault(); location.href = "book.html?" + new URLSearchParams(new FormData(f)).toString(); }; });

/* notes */
$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes");
  try{ localStorage.setItem("met-notes", on ? "on" : "off"); }catch(e){} };
})();
