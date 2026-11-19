/* CivilTHES · OpenSite demo · shared header/footer/CTA */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const TEL = "+302310619505", TELV = "2310 619 505", MAIL = "info@civilthes.com", ADDR = "Ευαγόρα 6, 544 53 Θεσσαλονίκη";
const TOPICS = ["Ηλεκτρονική ταυτότητα κτιρίου","Άδεια μικρής κλίμακας","Οικοδομική άδεια","Τακτοποίηση αυθαιρέτου","Ενεργειακό πιστοποιητικό","Τοπογραφικό","Ανακαίνιση","Άδεια λειτουργίας καταστήματος","Άλλο"];
window.SVC_TOPICS = TOPICS;

const NAV = [["services.html","Υπηρεσίες","services"],["ktirio.html","Ταυτότητα κτιρίου","ktirio"],["projects.html","Έργα","projects"],["contact.html","Επικοινωνία","contact"]];
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html"><b>CivilTHES</b><small>τεχνικό γραφείο · Θεσσαλονίκη</small></a>
  <nav class="nav">${NAV.map(([h,t,k])=>`<a href="${h}" class="${k===page?"on":""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta">
    <a class="btn btn-line" href="tel:${TEL}" style="padding:11px 17px;font-size:13.5px">${TELV}</a>
    <button class="btn btn-ink" data-cta style="padding:11px 19px;font-size:13.5px">Ζητήστε προσφορά</button>
    <button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button>
  </div>
</div></header>
<div class="mmenu" id="mmenu"><button class="x" id="mx" aria-label="Κλείσιμο">×</button><div class="wrap">
  <a href="demo.html">Αρχική</a>${NAV.map(([h,t])=>`<a href="${h}">${t}</a>`).join("")}
  <p class="small" style="margin-top:26px">${ADDR}<br><a href="tel:${TEL}">${TELV}</a></p>
</div></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div><p class="h3" style="color:#fff">Μελέτη &amp; κατασκευή. Άδειες, ανακαινίσεις, <em>ταυτότητα κτιρίου</em>.</p>
      <p class="small" style="color:#bdb6ab;margin-top:12px">Τεχνικό γραφείο στη Θεσσαλονίκη: οικοδομικές άδειες, άδειες μικρής κλίμακας, ηλεκτρονική ταυτότητα κτιρίου, τακτοποιήσεις αυθαιρέτων, ενεργειακά πιστοποιητικά, τοπογραφικά, ανακαινίσεις και επίβλεψη.</p></div>
    <div><h4>Σελίδες</h4><ul><li><a href="services.html">Όλες οι υπηρεσίες</a></li><li><a href="ktirio.html">Ηλεκτρονική ταυτότητα κτιρίου</a></li><li><a href="projects.html">Έργα μας</a></li><li><a href="contact.html">Ζητήστε προσφορά</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul><li>${ADDR}</li><li><a href="tel:${TEL}">${TELV}</a></li><li><a href="tel:+306980127727">6980 127 727</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li></ul></div>
    <div><h4>Ζητήστε προσφορά</h4><ul><li><button class="btn btn-gold" data-cta style="padding:12px 20px;font-size:13.5px">Ζητήστε προσφορά</button></li></ul></div>
  </div>
  <div class="big">CivilTHES</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} CivilTHES</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Ζητήστε προσφορά">
  <div class="dr-head"><p class="h3">Ζητήστε προσφορά</p><button id="drX" style="font-size:28px;line-height:1">×</button></div>
  <div class="dr-body">
    <label class="field"><span>Θέμα</span><select id="cTopic">${TOPICS.map(t=>`<option>${t}</option>`).join("")}</select></label>
    <label class="field"><span>Ονοματεπώνυμο</span><input id="cName" autocomplete="name"></label>
    <label class="field"><span>Κινητό</span><input id="cTel" inputmode="tel" autocomplete="tel"></label>
    <label class="field"><span>Email (προαιρετικά)</span><input id="cMail" type="email" autocomplete="email"></label>
    <label class="field"><span>Πότε σας βολεύει</span><input id="cDate" type="date"></label>
    <label class="field"><span>Λίγα λόγια</span><textarea id="cNote" rows="3"></textarea></label>
    <p class="small ph" data-note="Συνδέεται με το email σας ή με το ημερολόγιό σας">Απαντάμε την ίδια ή την επόμενη εργάσιμη.</p>
  </div>
  <div class="dr-foot">
    <button class="btn btn-ink" id="cGo" style="width:100%">Αποστολή</button>
    <div class="okbox" id="cOk"></div>
  </div>
</aside>
<div class="lb" id="lb"><button id="lbX">×</button><button class="nav-b pv" id="lbP">‹</button><img id="lbI" alt=""><button class="nav-b" id="lbN" style="right:18px">›</button></div>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);

const hdr = $("#hdr");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 30), {passive:true});
hdr.classList.toggle("solid", scrollY > 30);
$("#burger").onclick = () => $("#mmenu").classList.add("on");
$("#mx").onclick = () => $("#mmenu").classList.remove("on");

const io = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add("in")), {threshold:.12});
$$(".rv").forEach(e => io.observe(e));

const openDr = (topic) => { if(topic){ const s=$("#cTopic"); [...s.options].forEach(o=>{ if(o.text===topic) s.value=o.value; }); }
  $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
window.SvcOpen = openDr;
$$("[data-cta]").forEach(b => b.onclick = () => openDr(b.dataset.topic));
$("#drX").onclick = closeDr; $("#scrim").onclick = closeDr;
addEventListener("keydown", e => { if(e.key==="Escape"){ closeDr(); $("#lb").classList.remove("on"); } });
$("#cGo").onclick = () => { const o = $("#cOk");
  if(!$("#cName").value.trim() || !$("#cTel").value.trim()){ o.textContent = "Συμπληρώστε ονοματεπώνυμο και κινητό."; o.classList.add("on"); return; }
  o.innerHTML = "✓ Το αίτημά σας καταχωρήθηκε. Θα επικοινωνήσουμε μαζί σας για τα δικαιολογητικά.<br><span class='small'>(demo — δεν στέλνεται τίποτα)</span>"; o.classList.add("on"); };

/* δένει κουμπιά που προστίθενται αργότερα από τη σελίδα */
window.SvcBindCta = root => $$("[data-cta]", root || document).forEach(b => b.onclick = () => openDr(b.dataset.topic));

let imgs = [], li = 0;
window.SvcLightbox = sel => { imgs = $$(sel).map(i=>i.src); $$(sel).forEach((im,i)=>{ im.style.cursor="zoom-in"; im.onclick = () => showLb(i); }); };
function showLb(i){ if(!imgs.length) return; li=(i+imgs.length)%imgs.length; $("#lbI").src=imgs[li]; $("#lb").classList.add("on"); }
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li+1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li-1); };
$("#lb").onclick = e => { if(e.target.id==="lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => { if($("#lb").classList.contains("on")){ if(e.key==="ArrowRight") showLb(li+1); if(e.key==="ArrowLeft") showLb(li-1); } });

$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes");
  try{ localStorage.setItem("cv-notes", on?"on":"off"); }catch(e){} };
})();
