/* CBMI · OpenSite demo · bilingual engine (EL/EN) + header / footer / drawer / notes / data */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const H = document.documentElement;

/* ── σταθερά στοιχεία επικοινωνίας ────────────────────────────────── */
const TEL = "+302111069472", TELV = "211 106 9472";
const MAIL = "europe@cbmi.com.cn";
const ADDR_EL = "Ζαλόκωστα 44, 152 33 Χαλάνδρι, Αθήνα";
const ADDR_EN = "44 Zalokosta St., 152 33 Chalandri, Athens, Greece";
const ADDR_FR_EL = "15 Rue Jean Jaurès, 92800 Puteaux, Γαλλία";
const ADDR_FR_EN = "15 Rue Jean Jaurès, 92800 Puteaux, France";
const LINKEDIN = "https://www.linkedin.com/company/sinoma-cbmi-construction/";

/* ── γλώσσα ───────────────────────────────────────────────────────── */
const lang = () => H.dataset.lang === "en" ? "en" : "el";
const t = (el, en) => lang() === "en" ? en : el;
const onLang = [];

function applyLang(l) {
  H.dataset.lang = l;
  H.setAttribute("lang", l);
  $$("[data-en]").forEach(n => {
    if (n.dataset.el == null) n.dataset.el = n.innerHTML;
    const v = n.dataset[l];
    if (v != null) n.innerHTML = v;
  });
  $$("[data-enph]").forEach(n => {
    if (n.dataset.elph == null) n.dataset.elph = n.getAttribute("placeholder") || "";
    const v = n.dataset[l + "ph"];
    if (v != null) n.setAttribute("placeholder", v);
  });
  $$("[data-enlabel]").forEach(n => {
    if (n.dataset.ellabel == null) n.dataset.ellabel = n.getAttribute("aria-label") || "";
    const v = n.dataset[l + "label"];
    if (v != null) n.setAttribute("aria-label", v);
  });
  const ti = document.body.dataset[l === "en" ? "ten" : "tel"];
  if (ti) document.title = ti;
  const de = document.body.dataset[l === "en" ? "den" : "del"];
  if (de) { const m = $('meta[name="description"]'); if (m) m.content = de; }
  $$(".lsw button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.l === l)));
  try { localStorage.setItem("cbmi-lang", l); } catch (e) {}
  onLang.forEach(f => { try { f(l); } catch (e) {} });
}

/* ── εικαστικό εργοστασίου (SVG, χωρίς εξωτερικές εικόνες) ─────────── */
const PLANT = (op = 1, hero = false) => `
<svg class="plant-strip" viewBox="0 0 1200 430" preserveAspectRatio="${hero ? "xMidYMax meet" : "xMidYMax slice"}" aria-hidden="true" style="position:absolute;${hero ? "left:0;right:0;bottom:0;width:100%;height:min(64%,460px)" : "inset:0;width:100%;height:100%"};opacity:${op}">
  <defs>
    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b2a36"/><stop offset=".55" stop-color="#141e27"/><stop offset="1" stop-color="#0d1216"/>
    </linearGradient>
    <linearGradient id="pa" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c0561f" stop-opacity=".0"/><stop offset=".5" stop-color="#c0561f" stop-opacity=".55"/><stop offset="1" stop-color="#c0561f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="430" fill="url(#pg)"/>
  <g stroke="rgba(255,255,255,.30)" fill="none" stroke-width="1.6">
    <!-- σιλό -->
    <path d="M120 360V210a44 44 0 0 1 88 0v150"/><path d="M120 236h88M120 300h88"/>
    <path d="M226 360V232a34 34 0 0 1 68 0v128"/><path d="M226 258h68M226 312h68"/>
    <!-- μεταφορική ταινία -->
    <path d="M300 300l96-26"/><path d="M300 314l96-26"/>
    <path d="M312 304l4 12M336 297l4 12M360 290l4 12M384 283l4 12"/>
    <!-- περιστροφικός κλίβανος -->
    <path d="M396 318l240-44 8 44-240 44z"/>
    <path d="M444 310l7 43M492 301l7 43M540 292l7 43M588 283l7 43"/>
    <!-- πύργος προθέρμανσης -->
    <path d="M636 360V72h92v288z"/>
    <path d="M636 120h92M636 168h92M636 216h92M636 264h92M636 312h92"/>
    <circle cx="618" cy="110" r="20"/><circle cx="618" cy="168" r="20"/><circle cx="618" cy="226" r="20"/><circle cx="618" cy="284" r="20"/>
    <!-- καπνοδόχος -->
    <path d="M784 360V40h30v320z"/><path d="M784 86h30M784 140h30M784 194h30"/>
    <!-- ψύκτης κλίνκερ / κτίριο -->
    <path d="M852 360V250h150v110z"/><path d="M852 282h150M900 250v110M952 250v110"/>
    <!-- μύλος -->
    <path d="M1030 360v-74h120v74z"/><circle cx="1090" cy="323" r="22"/>
    <!-- γερανός -->
    <path d="M1162 360V128M1162 150h-120M1052 150l110-22M1090 150v22"/>
    <!-- έδαφος -->
    <path d="M0 360h1200" stroke="rgba(255,255,255,.4)" stroke-width="2"/>
  </g>
  <g stroke="rgba(192,86,31,.75)" fill="none" stroke-width="2.4">
    <path d="M636 72h92"/><path d="M396 318l240-44"/>
  </g>
  <rect x="0" y="358" width="1200" height="3" fill="url(#pa)"/>
</svg>`;

const SLOT = (el, en, tall) => `<div class="slot ${tall ? "ar-45" : "ar-32"} ph" data-note="εδώ μπαίνει δική σας φωτογραφία από το έργο">
  ${PLANT(.6)}<span class="lbl" data-en="${en}">${el}</span></div>`;

const MARK = `<svg class="mk" viewBox="0 0 44 44" fill="none" aria-hidden="true">
  <rect x="2.5" y="2.5" width="39" height="39" stroke="currentColor" stroke-width="2"/>
  <path d="M11 33V16l11 9 11-9v17" stroke="currentColor" stroke-width="2.4"/>
  <path d="M11 11h22" stroke="#e37b3c" stroke-width="2.4"/></svg>`;

/* ── πλοήγηση ─────────────────────────────────────────────────────── */
const NAV = [
  ["company.html", "Η εταιρεία", "Company", "company"],
  ["services.html", "Υπηρεσίες", "Services", "services"],
  ["projects.html", "Έργα", "Projects", "projects"],
  ["decarbonization.html", "Απανθρακοποίηση", "Decarbonisation", "decarb"],
  ["news.html", "Νέα", "News", "news"]
];

document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html">${MARK}<span><b>CBMI</b><small data-en="Sinoma · Cement EPC">Sinoma · Κατασκευή εργοστασίων</small></span></a>
  <nav class="nav">${NAV.map(([h, el, en, k]) => `<a href="${h}" class="${k === page ? "on" : ""}" data-en="${en}">${el}</a>`).join("")}</nav>
  <div class="hdr-r">
    <div class="lsw" role="group" aria-label="Language"><button data-l="el" aria-pressed="true">ΕΛ</button><button data-l="en" aria-pressed="false">EN</button></div>
    <a class="btn btn-acc" href="contact.html" data-en="Contact">Επικοινωνία</a>
    <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</div></header>
<div class="mmenu" id="mmenu"><button class="x" id="mx" aria-label="Close">×</button><div class="wrap">
  <a class="m" href="demo.html" data-en="Home">Αρχική</a>
  ${NAV.map(([h, el, en]) => `<a class="m" href="${h}" data-en="${en}">${el}</a>`).join("")}
  <a class="m" href="contact.html" style="color:var(--acc2)" data-en="Contact">Επικοινωνία</a>
  <p class="small" style="margin-top:26px;color:var(--mute-d)"><span data-en="${ADDR_EN}">${ADDR_EL}</span><br><a href="tel:${TEL}">${TELV}</a> · <a href="mailto:${MAIL}">${MAIL}</a></p>
</div></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div>
      <a class="brand" href="demo.html" style="color:#fff">${MARK}<span><b>CBMI</b><small data-en="Sinoma · Cement EPC">Sinoma · Κατασκευή εργοστασίων</small></span></a>
      <p class="small" style="color:#99a2ab;margin-top:20px;max-width:380px" data-en="CBMI Construction Co., Ltd. — founded in 1959, a core member of Sinoma International Engineering and part of CNBM. Full-lifecycle EPC solutions for the cement industry: design, supply, construction, operation and maintenance.">CBMI Construction Co., Ltd. — ιδρύθηκε το 1959, βασικό μέλος της Sinoma International Engineering και του ομίλου CNBM. Ολοκληρωμένες λύσεις EPC για τη βιομηχανία τσιμέντου: μελέτη, προμήθεια, κατασκευή, λειτουργία και συντήρηση.</p>
    </div>
    <div><h4 data-en="Company">Εταιρεία</h4><ul>
      <li><a href="company.html" data-en="Profile &amp; group">Προφίλ &amp; όμιλος</a></li>
      <li><a href="company.html#timeline" data-en="Milestones">Σταθμοί</a></li>
      <li><a href="company.html#clients" data-en="Clients">Πελάτες</a></li>
      <li><a href="news.html" data-en="News">Νέα &amp; ανακοινώσεις</a></li></ul></div>
    <div><h4 data-en="Activities">Δραστηριότητες</h4><ul>
      <li><a href="services.html#epc" data-en="Cement EPC">EPC τσιμέντου</a></li>
      <li><a href="services.html#parts" data-en="Spare parts &amp; O&amp;M">Ανταλλακτικά &amp; O&amp;M</a></li>
      <li><a href="services.html#mining" data-en="Mining">Εξόρυξη</a></li>
      <li><a href="decarbonization.html" data-en="Decarbonisation">Απανθρακοποίηση</a></li></ul></div>
    <div><h4 data-en="Contact">Επικοινωνία</h4><ul>
      <li data-en="Athens office"><b>Γραφείο Αθηνών</b></li>
      <li><span data-en="${ADDR_EN}">${ADDR_EL}</span></li>
      <li><a href="tel:${TEL}">${TELV}</a></li>
      <li><a href="mailto:${MAIL}">${MAIL}</a></li>
      <li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
  </div>
  <div class="big">CBMI</div>
  <div class="foot-bottom">
    <span>© ${new Date().getFullYear()} CBMI Construction Co., Ltd. · Sinoma International Engineering · CNBM</span>
    <span data-en="Athens · Puteaux · Brussels · Prague · Madrid">Αθήνα · Puteaux · Βρυξέλλες · Πράγα · Μαδρίτη</span>
    <span data-en='Demo by <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a>'>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span>
  </div>
</div></footer>
<div class="mbar">
  <a class="btn btn-line" href="tel:${TEL}" style="color:#fff" data-en="Call">Κλήση</a>
  <a class="btn btn-acc" href="contact.html" data-en="Request a quote">Ζητήστε προσφορά</a>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Request">
  <div class="dr-head"><p class="h3" id="drT" data-en="Request">Αίτημα</p><button id="drX" style="font-size:30px;line-height:1" aria-label="Close">×</button></div>
  <div class="dr-body">
    <label class="field"><span data-en="Subject">Θέμα</span><select id="cTopic"></select></label>
    <div class="row2">
      <label class="field"><span data-en="Company">Εταιρεία</span><input id="cCo" autocomplete="organization"></label>
      <label class="field"><span data-en="Country">Χώρα</span><input id="cCountry" autocomplete="country-name"></label>
    </div>
    <label class="field"><span data-en="Full name">Ονοματεπώνυμο</span><input id="cName" autocomplete="name"></label>
    <div class="row2">
      <label class="field"><span data-en="Phone">Τηλέφωνο</span><input id="cTel" inputmode="tel" autocomplete="tel"></label>
      <label class="field"><span>Email</span><input id="cMail" type="email" autocomplete="email"></label>
    </div>
    <label class="field"><span data-en="Message">Μήνυμα</span><textarea id="cNote" rows="4" placeholder="Τοποθεσία, δυναμικότητα, χρονοδιάγραμμα…" data-enph="Location, capacity, timeline…"></textarea></label>
    <p class="small ph" data-note="Το αίτημα δρομολογείται στο σωστό τμήμα (sales / engineering / HR) με email" data-en="We reply within two working days, in Greek or English.">Απαντάμε εντός δύο εργάσιμων, στα ελληνικά ή στα αγγλικά.</p>
  </div>
  <div class="dr-foot"><button class="btn btn-acc" id="cGo" style="width:100%" data-en="Send request">Αποστολή αιτήματος</button><div class="okbox" id="cOk"></div></div>
</aside>
<button class="notes-toggle" id="notesToggle" type="button" data-en="Notes">Σημειώσεις</button>`);

/* ── header ───────────────────────────────────────────────────────── */
const hdr = $("#hdr");
const onScroll = () => hdr.classList.toggle("solid", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
$("#burger").onclick = () => $("#mmenu").classList.add("on");
$("#mx").onclick = () => $("#mmenu").classList.remove("on");
$$(".lsw button").forEach(b => b.onclick = () => applyLang(b.dataset.l));

/* ── reveal + bars ────────────────────────────────────────────────── */
const io = new IntersectionObserver(e => e.forEach(x => {
  if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
}), { threshold: .12 });
window.CbmiReveal = root => $$(".rv", root || document).forEach(e => io.observe(e));
window.CbmiReveal();

const bio = new IntersectionObserver(e => e.forEach(x => {
  if (x.isIntersecting) { $$(".bar-fill", x.target).forEach(f => f.style.width = f.dataset.w + "%"); bio.unobserve(x.target); }
}), { threshold: .3 });
$$(".bars").forEach(b => bio.observe(b));

/* ── drawer ───────────────────────────────────────────────────────── */
const FORMS = {
  quote: {
    el: ["Νέα γραμμή παραγωγής (EPC)", "Αναβάθμιση / εκσυγχρονισμός γραμμής", "Εναλλακτικά καύσιμα / απανθρακοποίηση", "Ανταλλακτικά & συντήρηση", "Μελέτη σκοπιμότητας / FEED", "Άλλο"],
    en: ["New production line (EPC)", "Line upgrade / modernisation", "Alternative fuels / decarbonisation", "Spare parts & maintenance", "Feasibility study / FEED", "Other"],
    tEl: "Ζητήστε προσφορά", tEn: "Request a quote"
  },
  parts: {
    el: ["Ανταλλακτικά κλιβάνου", "Ανταλλακτικά μύλων", "Φίλτρα & ανεμιστήρες", "Συντήρηση & επισκευές", "Άλλο"],
    en: ["Kiln spare parts", "Mill spare parts", "Filters & fans", "Maintenance & repairs", "Other"],
    tEl: "Ανταλλακτικά & συντήρηση", tEn: "Spare parts & maintenance"
  },
  info: {
    el: ["Γενική πληροφορία", "Συνεργασία / προμηθευτές", "Θέσεις εργασίας", "Τύπος & επικοινωνία", "Άλλο"],
    en: ["General enquiry", "Partnership / suppliers", "Careers", "Press & media", "Other"],
    tEl: "Επικοινωνία", tEn: "Contact"
  }
};
let drKind = "info", drPick = null;
const fillTopics = () => {
  const f = FORMS[drKind] || FORMS.info, l = lang();
  $("#drT").innerHTML = l === "en" ? f.tEn : f.tEl;
  $("#cTopic").innerHTML = f.el.map((o, i) => `<option data-en="${f.en[i]}">${o}</option>`).join("");
  if (l === "en") $$("#cTopic option").forEach(o => o.innerHTML = o.dataset.en);
  if (drPick != null && $("#cTopic").options[drPick]) $("#cTopic").options[drPick].selected = true;
};
const openDr = (kind, pick) => {
  drKind = FORMS[kind] ? kind : "info";
  drPick = pick != null ? +pick : null;
  fillTopics();
  $("#cOk").classList.remove("on");
  $("#drawer").classList.add("on"); $("#scrim").classList.add("on");
};
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
window.CbmiBind = root => $$("[data-cta]", root || document).forEach(b => b.onclick = e => {
  e.preventDefault(); openDr(b.dataset.cta, b.dataset.pick);
});
window.CbmiBind();
$("#drX").onclick = closeDr; $("#scrim").onclick = closeDr;
$("#cGo").onclick = () => {
  const o = $("#cOk");
  if (!$("#cName").value.trim() || !$("#cMail").value.trim()) {
    o.innerHTML = t("Συμπληρώστε ονοματεπώνυμο και email.", "Please fill in your name and email.");
    o.classList.add("on"); return;
  }
  o.innerHTML = t("✓ Ευχαριστούμε! Το αίτημά σας καταχωρήθηκε και θα λάβετε απάντηση εντός δύο εργάσιμων.<br><span class='small'>(demo · δεν στέλνεται τίποτα)</span>",
    "✓ Thank you. Your request has been registered and you will hear from us within two working days.<br><span class='small'>(demo · nothing is actually sent)</span>");
  o.classList.add("on");
};
addEventListener("keydown", e => { if (e.key === "Escape") { closeDr(); $("#mmenu").classList.remove("on"); } });
onLang.push(() => { if ($("#drawer").classList.contains("on") || true) fillTopics(); });

/* ── δεδομένα: έργα ───────────────────────────────────────────────── */
const PROJECTS = [
  { n: "Lumbres K6 · Oxyfuel", client: "EQIOM · CRH", c: "fr", cEl: "Γαλλία", cEn: "France", type: "decarb", y: "2023–2026", y0: 2023, cap: "3.500 t/d", capEn: "3,500 tpd",
    el: "Νέα γραμμή κλίνκερ με καύση oxyfuel — η πρώτη του είδους σε αυτή την κλίμακα στην Ευρώπη. Στόχος υποκατάστασης εναλλακτικών καυσίμων 80%, επιτεύχθηκε 92%. Μείωση CO₂ 860.000 τόνοι/έτος.",
    en: "New clinker line with oxyfuel combustion — the first of its kind at this scale in Europe. Alternative fuel substitution target 80%, 92% achieved. CO₂ reduction 860,000 t/year." },
  { n: "Airvault", client: "Heidelberg Materials", c: "fr", cEl: "Γαλλία", cEn: "France", type: "grind", y: "2025–2027", y0: 2025, cap: "", capEn: "",
    el: "Μονάδα χωριστής άλεσης (separate grinding) για σημαντική μείωση του κλίνκερ στο τελικό τσιμέντο. Εκτιμώμενη μείωση CO₂ έως 1 εκατ. τόνοι/έτος.",
    en: "Separate grinding plant that substantially cuts the clinker factor in the final cement. Estimated CO₂ reduction up to 1 Mt/year." },
  { n: "Le Teil", client: "Holcim", c: "fr", cEl: "Γαλλία", cEn: "France", type: "upgrade", y: "2025–2026", y0: 2025, cap: "", capEn: "",
    el: "Έργο μετασχηματισμού (transformation EPC) υφιστάμενης μονάδας, με μετατροπή ηλεκτροστατικού φίλτρου σε σακόφιλτρο.",
    en: "Transformation EPC of an existing plant, including conversion of the electrostatic precipitator to a bag filter." },
  { n: "Go4Zero · Mons", client: "Holcim", c: "be", cEl: "Βέλγιο", cEn: "Belgium", type: "decarb", y: "2023–", y0: 2023, cap: "4.000 t/d", capEn: "4,000 tpd",
    el: "Νέα γραμμή με ποσοστό υποκατάστασης εναλλακτικών καυσίμων 95% και μείωση CO₂ 1,1 εκατ. τόνοι/έτος — ένα από τα πιο φιλόδοξα έργα απανθρακοποίησης του κλάδου στην Ευρώπη.",
    en: "New line with a 95% alternative fuel substitution rate and 1.1 Mt/year CO₂ reduction — one of the industry's most ambitious decarbonisation projects in Europe." },
  { n: "Saint-Pierre-la-Cour", client: "Lafarge", c: "fr", cEl: "Γαλλία", cEn: "France", type: "decarb", y: "2021–2023", y0: 2021, cap: "", capEn: "",
    el: "Η πρώτη μονάδα καλσινωμένης αργίλου (calcined clay) για τσιμέντο στην Ευρώπη. Μείωση CO₂ 100.000 τόνοι/έτος.",
    en: "The first calcined clay operation for cement in Europe. CO₂ reduction 100,000 t/year." },
  { n: "Čížkovice · CIZ", client: "Holcim", c: "cz", cEl: "Τσεχία", cEn: "Czech Republic", type: "decarb", y: "2022–2024", y0: 2022, cap: "", capEn: "",
    el: "Καλσινωμένη άργιλος με ποσοστό υποκατάστασης καυσίμων 100% και μείωση CO₂ 100.000 τόνοι/έτος.",
    en: "Calcined clay with a 100% fuel substitution rate and 100,000 t/year CO₂ reduction." },
  { n: "Martres K3", client: "Lafarge", c: "fr", cEl: "Γαλλία", cEn: "France", type: "epc", y: "2019–2022", y0: 2019, cap: "", capEn: "",
    el: "Νέα γραμμή κλίνκερ. Στην προηγούμενη φάση του ίδιου εργοστασίου επιτεύχθηκε ποσοστό υποκατάστασης εναλλακτικών καυσίμων 85% (2018).",
    en: "New clinker line. In the earlier phase of the same plant an 85% alternative fuel substitution rate was achieved (2018)." },
  { n: "Devnya", client: "Heidelberg", c: "bg", cEl: "Βουλγαρία", cEn: "Bulgaria", type: "epc", y: "2012–2015", y0: 2012, cap: "4.000 t/d", capEn: "4,000 tpd",
    el: "Πλήρες EPC νέας γραμμής. Βραβεία «Building of the Year of Bulgaria 2014» και «Best Investment of Bulgaria 2015».",
    en: "Full EPC of a new line. Awarded “Building of the Year of Bulgaria 2014” and “Best Investment of Bulgaria 2015”." },
  { n: "Vasilikos", client: "Vassiliko Cement", c: "cy", cEl: "Κύπρος", cEn: "Cyprus", type: "epc", y: "2008–2011", y0: 2008, cap: "6.000 t/d", capEn: "6,000 tpd",
    el: "Το μεγαλύτερο σε δυναμικότητα ευρωπαϊκό έργο EPC της CBMI — πλήρης νέα γραμμή τσιμέντου στην Κύπρο.",
    en: "CBMI's largest European EPC project by capacity — a complete new cement line in Cyprus." },
  { n: "Gara", client: "Holcim", c: "az", cEl: "Αζερμπαϊτζάν", cEn: "Azerbaijan", type: "epc", y: "2008–2011", y0: 2008, cap: "4.000 t/d", capEn: "4,000 tpd",
    el: "Πλήρες EPC νέας γραμμής κλίνκερ.", en: "Full EPC of a new clinker line." },
  { n: "ANTEA", client: "TITAN", c: "al", cEl: "Αλβανία", cEn: "Albania", type: "epc", y: "2007–2010", y0: 2007, cap: "3.300 t/d", capEn: "3,300 tpd",
    el: "Νέο εργοστάσιο τσιμέντου για τον όμιλο TITAN στην Αλβανία, με πλήρη ευθύνη μελέτης, προμήθειας και κατασκευής.",
    en: "New cement plant for the TITAN group in Albania, with full responsibility for engineering, procurement and construction." },
  { n: "NOSTRA", client: "Strabag · Lafarge", c: "hu", cEl: "Ουγγαρία", cEn: "Hungary", type: "epc", y: "2008–2010", y0: 2008, cap: "2.500 t/d", capEn: "2,500 tpd",
    el: "Σύμβαση EP (μελέτη και προμήθεια) για νέα γραμμή στην Ουγγαρία.",
    en: "EP contract (engineering and procurement) for a new line in Hungary." },
  { n: "Málaga · FYM", client: "Italcementi", c: "es", cEl: "Ισπανία", cEn: "Spain", type: "epc", y: "2004–2007", y0: 2004, cap: "3.300 t/d", capEn: "3,300 tpd",
    el: "Πλήρες EPC νέας γραμμής στη Μάλαγα.", en: "Full EPC of a new line in Málaga." },
  { n: "Ragusa", client: "COLACEM", c: "it", cEl: "Ιταλία", cEn: "Italy", type: "epc", y: "2003–2005", y0: 2003, cap: "2.500 t/d", capEn: "2,500 tpd",
    el: "Το πρώτο ευρωπαϊκό έργο EPC της CBMI και η αρχή της παρουσίας της στην Ευρώπη.",
    en: "CBMI's first European EPC project and the start of its presence in Europe." },
  { n: "Bordeaux", client: "Lafarge", c: "fr", cEl: "Γαλλία", cEn: "France", type: "grind", y: "2005–2006", y0: 2005, cap: "55 t/h", capEn: "55 tph",
    el: "Μονάδα άλεσης σκωρίας — το πρώτο έργο της CBMI στη Γαλλία, με μηχανολογικό EPC.",
    en: "Slag grinding plant — CBMI's first project in France, delivered as a mechanical EPC." },
  { n: "Domicem", client: "Colacem", c: "do", cEl: "Δομινικανή Δημοκρατία", cEn: "Dominican Republic", type: "epc", y: "2002–2005", y0: 2002, cap: "", capEn: "",
    el: "Το πρώτο έργο EPC της CBMI εκτός Κίνας — η αρχή της διεθνούς της δραστηριότητας.",
    en: "CBMI's first EPC contract outside China — the beginning of its international activity." },
  { n: "Dujiangyan", client: "Lafarge", c: "cn", cEl: "Κίνα", cEn: "China", type: "epc", y: "2000–2003", y0: 2000, cap: "", capEn: "",
    el: "Το πρώτο συμβόλαιο EPC τσιμεντοβιομηχανίας στην Κίνα.",
    en: "The first cement industry EPC contract in China." }
];
const STUDIES = [
  { n: "IFESTOS", client: "TITAN", el: "Μελέτη σκοπιμότητας και συμμετοχή σε διαγωνισμό FEED.", en: "Feasibility study and participation in FEED bidding." },
  { n: "KAMARI WHR", client: "TITAN", el: "Μελέτη σκοπιμότητας για ανάκτηση θερμότητας απαερίων (waste heat recovery).", en: "Feasibility study for waste heat recovery (WHR)." },
  { n: "LE TEIL", client: "Holcim", el: "Μετατροπή ηλεκτροστατικού φίλτρου σε σακόφιλτρο.", en: "Conversion of the electrostatic precipitator to a bag filter." },
  { n: "MILAKI", client: "Holcim", el: "Σύστημα bypass χλωριδίων.", en: "Chloride bypass system." }
];
const TYPE_LABEL = {
  epc: ["EPC νέας γραμμής", "New line EPC"],
  decarb: ["Απανθρακοποίηση", "Decarbonisation"],
  upgrade: ["Αναβάθμιση", "Upgrade"],
  grind: ["Άλεση", "Grinding"]
};

/* ── render: έργα με φίλτρα ───────────────────────────────────────── */
const pcard = p => {
  const l = lang();
  return `<article class="pcard rv">
    <div class="top">${PLANT(.85)}
      <span class="yr">${p.y}</span>${p.cap ? `<span class="cap">${l === "en" ? p.capEn : p.cap}</span>` : ""}</div>
    <div class="body">
      <span class="cty">${l === "en" ? p.cEn : p.cEl} · ${p.client}</span>
      <h3>${p.n}</h3>
      <div class="meta"><i>${TYPE_LABEL[p.type][l === "en" ? 1 : 0]}</i></div>
      <p>${l === "en" ? p.en : p.el}</p>
    </div></article>`;
};

function initProjects() {
  const host = $("#pgrid"); if (!host) return;
  const state = { c: "all", type: "all", era: "all" };
  const countries = [...new Map(PROJECTS.map(p => [p.c, p])).values()]
    .sort((a, b) => a.cEl.localeCompare(b.cEl, "el"));

  const csel = $("#fCountry");
  const fillCountries = () => {
    const l = lang();
    csel.innerHTML = `<option value="all">${l === "en" ? "All countries" : "Όλες οι χώρες"}</option>` +
      countries.map(p => `<option value="${p.c}">${l === "en" ? p.cEn : p.cEl}</option>`).join("");
    csel.value = state.c;
  };
  const draw = () => {
    const l = lang();
    const list = PROJECTS.filter(p =>
      (state.c === "all" || p.c === state.c) &&
      (state.type === "all" || p.type === state.type) &&
      (state.era === "all" ||
        (state.era === "a" && p.y0 < 2011) ||
        (state.era === "b" && p.y0 >= 2011 && p.y0 < 2020) ||
        (state.era === "c" && p.y0 >= 2020)));
    host.innerHTML = list.length ? list.map(pcard).join("")
      : `<p class="empty" style="grid-column:1/-1">${l === "en" ? "No project matches these filters." : "Κανένα έργο δεν ταιριάζει σε αυτά τα φίλτρα."}</p>`;
    $("#fCount").innerHTML = l === "en"
      ? `<b>${list.length}</b> of ${PROJECTS.length} projects`
      : `<b>${list.length}</b> από ${PROJECTS.length} έργα`;
    window.CbmiReveal(host);
    requestAnimationFrame(() => $$(".rv", host).forEach(e => e.classList.add("in")));
  };
  csel.onchange = () => { state.c = csel.value; draw(); };
  $$("[data-f]").forEach(b => b.onclick = () => {
    const g = b.dataset.f, v = b.dataset.v;
    state[g] = v;
    $$(`[data-f="${g}"]`).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    draw();
  });
  fillCountries(); draw();
  onLang.push(() => { fillCountries(); draw(); });
}

/* ── render: επιλεγμένα έργα (αρχική) ───────────────────────────── */
function initHighlights() {
  const host = $("#phighlights"); if (!host) return;
  const pick = ["Lumbres K6 · Oxyfuel", "Go4Zero · Mons", "Vasilikos"];
  const draw = () => {
    host.innerHTML = PROJECTS.filter(p => pick.includes(p.n)).map(pcard).join("");
    window.CbmiReveal(host);
  };
  draw(); onLang.push(draw);
}

/* ── render: μελέτες ─────────────────────────────────────────────── */
function initStudies() {
  const host = $("#studies"); if (!host) return;
  const draw = () => {
    const l = lang();
    host.innerHTML = STUDIES.map(s => `<article class="card rv">
      <span class="num">${s.client}</span><h3>${s.n}</h3><p>${l === "en" ? s.en : s.el}</p></article>`).join("");
    window.CbmiReveal(host);
  };
  draw(); onLang.push(draw);
}

/* ── δεδομένα + render: νέα ──────────────────────────────────────── */
const NEWS = [
  { d: "2026-11-10", k: "project", el: { t: "Πρόοδος στο έργο oxyfuel K6 στο Lumbres", s: "Στη μονάδα της EQIOM (όμιλος CRH) το ποσοστό υποκατάστασης εναλλακτικών καυσίμων ξεπέρασε τον αρχικό στόχο του 80% και έφτασε το 92%." }, en: { t: "Progress on the K6 oxyfuel project in Lumbres", s: "At the EQIOM (CRH group) plant the alternative fuel substitution rate exceeded the initial 80% target and reached 92%." } },
  { d: "2026-09-22", k: "project", el: { t: "Ξεκίνησε η κατασκευή της μονάδας χωριστής άλεσης στο Airvault", s: "Το έργο για την Heidelberg Materials αναμένεται να μειώσει τις εκπομπές CO₂ έως 1 εκατομμύριο τόνους ετησίως." }, en: { t: "Construction started on the Airvault separate grinding plant", s: "The project for Heidelberg Materials is expected to cut CO₂ emissions by up to 1 million tonnes a year." } },
  { d: "2026-06-18", k: "tech", el: { t: "Καλσινωμένη άργιλος: από το Saint-Pierre-la-Cour στην Τσεχία", s: "Μετά την πρώτη ευρωπαϊκή μονάδα καλσινωμένης αργίλου στη Γαλλία, η τεχνολογία εφαρμόστηκε και στο Čížkovice της Τσεχίας με 100% υποκατάσταση καυσίμων." }, en: { t: "Calcined clay: from Saint-Pierre-la-Cour to the Czech Republic", s: "After the first European calcined clay operation in France, the technology was applied at Čížkovice in the Czech Republic with 100% fuel substitution." } },
  { d: "2026-04-07", k: "company", el: { t: "Τρία έργα EPC μεγάλης κλίμακας σε εξέλιξη στην Ευρώπη", s: "Η ευρωπαϊκή ομάδα της CBMI αριθμεί 26 project managers, 150 μηχανικούς εργοταξίου και 1.030 πιστοποιημένους τεχνίτες εγκαταστάσεων." }, en: { t: "Three large-scale EPC projects under way in Europe", s: "CBMI's European team comprises 26 project managers, 150 site engineers and 1,030 qualified installation workers." } },
  { d: "2026-02-13", k: "tech", el: { t: "27 τεχνικές προτάσεις για απανθρακοποίηση σε 7 χώρες", s: "Μέσα σε έναν χρόνο υποβλήθηκαν 27 τεχνικές προτάσεις σε 8 βασικούς πελάτες και 7 χώρες, εννέα από αυτές αυτοτελώς από τη CBMI." }, en: { t: "27 technical decarbonisation proposals across 7 countries", s: "In one year 27 technical bid proposals were submitted to 8 key clients in 7 countries, nine of them delivered independently by CBMI." } },
  { d: "2025-11-26", k: "company", el: { t: "Το γραφείο Ελλάδας ενισχύει την υποστήριξη πελατών στη ΝΑ Ευρώπη", s: "Από το Χαλάνδρι συντονίζονται η τεχνική υποστήριξη και οι προμήθειες για έργα στη Νοτιοανατολική Ευρώπη και την Ανατολική Μεσόγειο." }, en: { t: "The Greece office strengthens client support in SE Europe", s: "Technical support and procurement for projects in South-East Europe and the Eastern Mediterranean are coordinated from Chalandri." } }
];
const NK = { project: ["Έργα", "Projects"], tech: ["Τεχνολογία", "Technology"], company: ["Εταιρεία", "Company"] };

function initNews(limit) {
  const host = $("#nlist"); if (!host) return;
  const state = { k: "all" };
  const fmt = d => {
    const [y, m, dd] = d.split("-");
    const mel = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];
    const men = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return lang() === "en" ? `${men[+m - 1]} ${+dd}, ${y}` : `${+dd} ${mel[+m - 1]} ${y}`;
  };
  const draw = () => {
    const l = lang();
    let list = NEWS.filter(n => state.k === "all" || n.k === state.k);
    if (limit) list = list.slice(0, limit);
    host.innerHTML = list.map(n => {
      const c = l === "en" ? n.en : n.el;
      return `<article class="nitem rv">
        <span class="d">${fmt(n.d)}</span>
        <div><h3>${c.t}</h3><p>${c.s}</p></div>
        <span class="k">${NK[n.k][l === "en" ? 1 : 0]}</span></article>`;
    }).join("");
    const cnt = $("#nCount");
    if (cnt) cnt.innerHTML = l === "en" ? `<b>${list.length}</b> announcements` : `<b>${list.length}</b> ανακοινώσεις`;
    window.CbmiReveal(host);
    requestAnimationFrame(() => $$(".rv", host).forEach(e => e.classList.add("in")));
  };
  $$("[data-nk]").forEach(b => b.onclick = () => {
    state.k = b.dataset.nk;
    $$("[data-nk]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    draw();
  });
  draw(); onLang.push(draw);
}

/* ── επαφή: επιλογή γραφείου ─────────────────────────────────────── */
function initContact() {
  const f = $("#cform"); if (!f) return;
  $("#cfGo").onclick = e => {
    e.preventDefault();
    const o = $("#cfOk");
    if (!$("#cfName").value.trim() || !$("#cfMail").value.trim()) {
      o.innerHTML = t("Συμπληρώστε ονοματεπώνυμο και email.", "Please fill in your name and email.");
      o.classList.add("on"); return;
    }
    o.innerHTML = t("✓ Το μήνυμά σας στάλθηκε στο τμήμα που επιλέξατε. Θα λάβετε απάντηση εντός δύο εργάσιμων.<br><span class='small'>(demo · δεν στέλνεται τίποτα)</span>",
      "✓ Your message has been sent to the department you selected. You will hear from us within two working days.<br><span class='small'>(demo · nothing is actually sent)</span>");
    o.classList.add("on");
  };
}

/* ── placeholders εικόνων σε στατικές σελίδες ───────────────────── */
$$("[data-slot]").forEach(n => {
  const [el, en] = n.dataset.slot.split("|");
  n.outerHTML = SLOT(el, en || el, n.hasAttribute("data-tall"));
});

/* ── hero art ── */
const ha = $("#heroArt"); if (ha) ha.innerHTML = PLANT(.9, true);

/* ── σημειώσεις ─────────────────────────────────────────────────── */
$("#notesToggle").onclick = () => {
  const on = H.classList.toggle("notes");
  try { localStorage.setItem("cbmi-notes", on ? "on" : "off"); } catch (e) {}
};

/* ── εκκίνηση ───────────────────────────────────────────────────── */
initProjects(); initHighlights(); initStudies(); initNews(document.body.dataset.page === "home" ? 3 : 0); initContact();
applyLang(H.dataset.lang === "en" ? "en" : "el");
window.CbmiReveal();
})();
