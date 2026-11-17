/* Guzel Beauty & Wellness · OpenSite demo · shared header, footer, clouds and booking */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement, page = document.body.dataset.page || "home";
const IG = "https://www.instagram.com/guzel.beauty.wellness/";
const TW = "https://www.treatwell.gr/katasthma/guzel-beauty-x-wellness-therme/";

/* ---------- the monogram (stand-in for their round "g" logo) ---------- */
const mono = (cls = "mono") => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="mg${Math.random().toString(36).slice(2, 6)}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#d3e3ef"/><stop offset="1" stop-color="#8db2cf"/></radialGradient></defs><circle cx="50" cy="50" r="49" fill="#a9c6dd"/><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".8"/><text x="50" y="60" text-anchor="middle" font-family="Noto Serif Display, Georgia, serif" font-style="italic" font-weight="300" font-size="58" fill="#fff">g</text></svg>`;
window.GuzelMono = mono;

/* ---------- header, mobile menu, footer, drawer ---------- */
const links = [["pilates.html", "Pilates", "pilates"], ["aesthetics.html", "Περιποιήσεις", "aesthetics"], ["demo.html#gift", "Δωροκάρτα", "gift"], ["demo.html#visit", "Επικοινωνία", "visit"]];
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html" aria-label="Guzel αρχική"><span class="ph" data-note="Το δικό σας λογότυπο (το στρογγυλό «g»)">${mono()}</span><span><b>GUZEL</b><small>beauty × wellness</small></span></a>
  <nav class="nav">${links.map(([h, t, k]) => `<a href="${h}" class="${k === page ? "on" : ""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta"><span class="open-pill" id="openPill"><i></i><span></span></span><button class="btn btn-ink" data-book>Κράτηση</button><button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button></div>
</div></header>
<div class="mmenu" id="mmenu">${links.map(([h, t]) => `<a href="${h}">${t.replace(/^(.)/, "<em>$1</em>")}</a>`).join("")}<button class="btn btn-ink" data-book>Κλείστε ραντεβού</button></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot" id="visit-foot"><div class="wrap">
  <div class="foot-grid">
    <div><p class="h3">Pilates, φροντίδα προσώπου και σώματος, <em>στη Θέρμη.</em></p><div class="social"><a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a><a href="${TW}" target="_blank" rel="noopener" aria-label="Treatwell" class="ph" data-note="Facebook / TikTok αν υπάρχουν"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg></a></div></div>
    <div><h4>Studio</h4><ul><li><a href="pilates.html">Reformer Pilates</a></li><li><a href="pilates.html#machines">Cadillac</a></li><li><a href="pilates.html#packages">Πακέτα</a></li><li><a href="pilates.html#schedule">Πρόγραμμα</a></li></ul></div>
    <div><h4>Περιποιήσεις</h4><ul><li><a href="aesthetics.html#laser">Laser αποτρίχωση</a></li><li><a href="aesthetics.html#face">Πρόσωπο</a></li><li><a href="aesthetics.html#nails">Νύχια</a></li><li><a href="aesthetics.html#lashes">Φρύδια & βλεφαρίδες</a></li></ul></div>
    <div><h4>Επισκεφθείτε μας</h4><p>Θερμοπυλών, Θέρμη<br>(Πανόραμα–Θέρμη)</p><p>Δευ–Παρ 09:00–21:00<br>Σάβ–Κυρ κλειστά</p><p><a class="ph" data-note="Το τηλέφωνό σας" href="tel:+302310000000">2310 000 000</a></p></div>
  </div>
  <div class="big">Guzel</div>
  <div class="foot-bottom"><span>© 2026 Guzel Beauty × Wellness · Θέρμη Θεσσαλονίκης</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Κράτηση" aria-hidden="true">
  <div class="dr-head"><div class="cloud" data-cloud="drawer"></div><button class="dr-close" id="drClose" aria-label="Κλείσιμο">×</button><span class="eyebrow">Κράτηση</span><p class="h3" id="drTitle" style="margin-top:10px">Τι θα θέλατε;</p><div class="dr-steps"><i class="on"></i><i></i><i></i><i></i></div></div>
  <div class="dr-body" id="drBody">
    <div class="step on" data-s="0" id="stSvc"></div>
    <div class="step" data-s="1"><div class="days" id="days"></div><div class="times" id="times"></div><div class="who ph" id="who" data-note="Τα ονόματα της ομάδας σας από το Treatwell"></div></div>
    <div class="step" data-s="2"><div class="recap" id="recap"></div><label class="field"><span>Ονοματεπώνυμο</span><input id="bkName" autocomplete="name"></label><label class="field"><span>Κινητό</span><input id="bkPhone" type="tel" inputmode="tel" autocomplete="tel"></label><label class="field"><span>Σημείωση (προαιρετικά)</span><textarea id="bkNote" rows="2"></textarea></label><p class="small ph" data-note="Μπορεί να συνδεθεί με το Treatwell ή με δικό σας ημερολόγιο">Θα λάβετε επιβεβαίωση με SMS και υπενθύμιση μία μέρα πριν.</p></div>
    <div class="step" data-s="3"><div class="done-box">${mono()}<p class="h3">Σας περιμένουμε.</p><p id="doneTxt" class="small"></p><p class="small" style="margin-top:18px">Αυτό είναι demo: η κράτηση δεν στάλθηκε.</p></div></div>
  </div>
  <div class="dr-foot"><div class="sum" id="drSum">Διαλέξτε υπηρεσία</div><div style="display:flex;gap:8px"><button class="btn btn-line" id="drBack" style="padding:14px 18px">←</button><button class="btn btn-ink" id="drNext">Συνέχεια</button></div></div>
</aside>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);

$("#mmenu").addEventListener("click", e => { if (e.target.closest("a,button")) html.classList.remove("menu-open"); });
$("#burger").addEventListener("click", () => html.classList.toggle("menu-open"));
$("#notesToggle").addEventListener("click", () => { const on = html.classList.toggle("notes"); try { localStorage.setItem("gz-notes", on ? "on" : "off"); } catch (e) {} });

const hdr = $("#hdr"), solid = () => hdr.classList.toggle("solid", scrollY > 30 || document.body.dataset.solid === "1");
addEventListener("scroll", solid, { passive: true }); solid();

/* ---------- open now (Mon–Fri 09–21) ---------- */
function openState(d = new Date()) {
  const wd = d.getDay(), m = d.getHours() * 60 + d.getMinutes(), weekday = wd >= 1 && wd <= 5;
  if (weekday && m >= 540 && m < 1260) return { open: true, txt: "Ανοιχτά έως 21:00" };
  if (weekday && m < 540) return { open: false, txt: "Ανοίγουμε 09:00" };
  return { open: false, txt: wd === 5 || wd === 6 || wd === 0 ? "Ανοίγουμε Δευτέρα 09:00" : "Ανοίγουμε αύριο 09:00" };
}
window.GuzelOpen = openState;
const os = openState(); $("#openPill").classList.toggle("is-open", os.open); $("#openPill span").textContent = os.txt;

/* ---------- clouds ---------- */
function rng(s) { return () => (s = (s * 16807) % 2147483647, (s - 1) / 2147483646); }
function cloud(el, seed = 7) {
  // billowing fabric ceiling: rows of soft "pillows", back rows smaller and bluer, front rows whiter
  const H = el.dataset.h ? +el.dataset.h : 260, r = rng(seed), drawer = el.dataset.cloud === "drawer";
  const W = Math.max(600, Math.round(H * ((el.clientWidth || 1200) * 1.16) / Math.max(1, el.clientHeight || H)));
  const rows = drawer ? 3 : 5, tints = ["#c3d4e2", "#cddce8", "#d6e3ed", "#dee9f1", "#e6eef4"];
  let defs = "", body = `<rect x="0" y="0" width="${W}" height="${H * .2}" fill="#cfdde9"/>`;
  for (let i = 0; i < rows; i++) {
    const k = i / Math.max(1, rows - 1), sh = tints[Math.round(k * (tints.length - 1))];
    defs += `<radialGradient id="pg${seed}${i}" cx="50%" cy="28%" r="68%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="${k > .5 ? "#fbfcfd" : "#f1f5f8"}"/><stop offset="1" stop-color="${sh}"/></radialGradient>`;
    const cy = H * (.1 + k * (drawer ? .42 : .5)), scale = .7 + k * .55;
    let puffs = "", x = -60 - r() * 60;
    while (x < W + 80) {
      const rx = (60 + r() * 60) * scale, yy = cy + (r() - .5) * H * .06, ry = Math.min(rx * (.5 + r() * .22), H * .95 - yy);
      puffs += `<ellipse cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}"/>`;
      x += rx * (1.25 + r() * .35);
    }
    const dur = 20 + r() * 18, dx = 14 + r() * 26;
    body += `<g class="layer" fill="url(#pg${seed}${i})" style="--d:${dur.toFixed(1)}s;--x:${dx.toFixed(1)}px;--y:${(r() * 6).toFixed(1)}px;animation-delay:${(-r() * dur).toFixed(1)}s;filter:${k < .3 ? "blur(1.4px) " : ""}drop-shadow(0 ${4 + i * 3}px ${8 + i * 4}px rgba(95,135,168,${(.12 + k * .1).toFixed(2)}))">${puffs}</g>`;
  }
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice"><defs>${defs}</defs>${body}</svg>`;
}
window.GuzelCloud = cloud;
$$("[data-cloud]").forEach((el, i) => cloud(el, 11 + i * 23));

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .14, rootMargin: "0px 0px -6% 0px" });
window.GuzelReveal = root => $$(".rv:not(.in)", root).forEach(el => io.observe(el));
window.GuzelReveal(document);

/* ---------- services for booking ---------- */
const SERVICES = [
  ["Pilates", [
    ["trial", "Δοκιμαστικό μάθημα Pilates", "60′ · Reformer", "Δωρεάν"],
    ["reformer", "Reformer Pilates", "60′ · έως 4 άτομα", "15 €"],
    ["cadillac", "Cadillac Pilates", "60′ · έως 3 άτομα", "15 €"]]],
  ["Laser", [
    ["laser-w", "Full Body Laser · Γυναίκες", "πακέτο 5 συνεδριών · 45′", "250 €"],
    ["laser-m", "Full Body Laser · Άνδρες", "πακέτο 5 συνεδριών · 60′", "350 €"],
    ["laser-zone", "Laser ανά περιοχή", "15–40′", "από 15 €"]]],
  ["Πρόσωπο", [
    ["deep", "Βαθύς καθαρισμός προσώπου", "75′", "45 €"],
    ["hydra", "Ενυδάτωση & λάμψη", "60′", "40 €"]]],
  ["Νύχια", [
    ["gel", "Μανικιούρ ημιμόνιμο", "60′", "20 €"],
    ["pedi", "Πεντικιούρ ημιμόνιμο", "60′", "25 €"],
    ["fill", "Συντήρηση νυχιών", "75′", "30 €"],
    ["art", "Nail art", "+15′", "από 5 €"]]],
  ["Φρύδια & βλεφαρίδες", [
    ["lash", "Lash lift", "50′", "30 €"],
    ["brow", "Brow lift", "45′", "28 €"],
    ["shape", "Σχηματισμός φρυδιών", "20′", "10 €"]]]
];
const SVC = {}; SERVICES.forEach(([g, list]) => list.forEach(([id, name, meta, price]) => SVC[id] = { id, name, meta, price, group: g }));
window.GuzelServices = SVC;
const TEAM = { Pilates: ["Οποιοσδήποτε", "Σοφία"], Laser: ["Οποιοσδήποτε", "Μαρία"], "Πρόσωπο": ["Οποιοσδήποτε", "Μαρία"], "Νύχια": ["Οποιοσδήποτε", "Ιμέλντα", "Βάνα"], "Φρύδια & βλεφαρίδες": ["Οποιοσδήποτε", "Μαρία"] };

$("#stSvc").innerHTML = `<p class="small ph" data-note="Ενδεικτικές τιμές· οι πραγματικές από τον τιμοκατάλογό σας" style="margin-bottom:18px">Οι τιμές του Pilates και του laser είναι από τον τιμοκατάλογο του Treatwell.</p>` + SERVICES.map(([g, list]) => `<div class="svc-group"><h5>${g}</h5>${list.map(([id, n, m, p]) => `<button class="svc" data-id="${id}"><span><b>${n}</b><small>${m}</small></span><em>${p}</em></button>`).join("")}</div>`).join("");

const B = { step: 0, svc: null, day: null, time: null, who: "Οποιοσδήποτε", note: "" };
const DOW = ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"], MON = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαΐ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];
const days = []; { const d = new Date(); d.setHours(12, 0, 0, 0); while (days.length < 10) { if (d.getDay() >= 1 && d.getDay() <= 5) days.push(new Date(d)); d.setDate(d.getDate() + 1); } }
const key = d => d.toISOString().slice(0, 10);
const fmtDay = d => `${["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"][d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
window.GuzelDays = days; window.GuzelFmtDay = fmtDay;

function renderDays() {
  $("#days").innerHTML = days.map(d => `<button class="day ${B.day && key(B.day) === key(d) ? "on" : ""}" data-k="${key(d)}"><small>${DOW[d.getDay()]}</small><b>${d.getDate()}</b><small>${MON[d.getMonth()]}</small></button>`).join("");
  renderTimes();
}
function renderTimes() {
  if (!B.day) { $("#times").innerHTML = `<p class="small" style="grid-column:1/-1">Διαλέξτε ημέρα για να δείτε τις ελεύθερες ώρες.</p>`; $("#who").innerHTML = ""; return; }
  const r = rng(+key(B.day).replace(/-/g, "") % 99991 + (B.svc ? B.svc.id.length * 31 : 0)), now = new Date(), today = key(B.day) === key(now);
  const slots = []; for (let m = 9 * 60; m <= 20 * 60; m += 30) slots.push(m);
  $("#times").innerHTML = slots.map(m => { const t = `${String(m / 60 | 0).padStart(2, "0")}:${m % 60 ? "30" : "00"}`, past = today && m <= now.getHours() * 60 + now.getMinutes(), busy = r() < .34; return `<button class="time ${B.time === t ? "on" : ""}" data-t="${t}" ${past || busy ? "disabled" : ""}>${t}</button>`; }).join("");
  const team = TEAM[B.svc ? B.svc.group : "Pilates"];
  $("#who").innerHTML = `<p class="small" style="width:100%">Με ποιον;</p>` + team.map(n => `<button class="chip ${B.who === n ? "on" : ""}" data-w="${n}">${n}</button>`).join("");
}
function go(s) {
  B.step = s;
  $$("#drawer .step").forEach(el => el.classList.toggle("on", +el.dataset.s === s));
  $$(".dr-steps i").forEach((el, i) => el.classList.toggle("on", i <= s));
  $("#drTitle").textContent = ["Τι θα θέλατε;", "Πότε σας βολεύει;", "Τα στοιχεία σας", "Έγινε."][s];
  if (s === 1) renderDays();
  if (s === 2) $("#recap").innerHTML = `<b>${B.svc.name}</b>${fmtDay(B.day)} · ${B.time}${B.who !== "Οποιοσδήποτε" ? " · με " + B.who : ""}${B.note ? `<br><span class="small">${B.note}</span>` : ""}`;
  if (s === 3) $("#doneTxt").innerHTML = `${$("#bkName").value.trim() ? $("#bkName").value.trim().split(" ")[0] + ", σ" : "Σ"}ας κρατήσαμε <b>${B.svc.name}</b><br>${fmtDay(B.day)} στις ${B.time}.`;
  $("#drBack").style.visibility = s > 0 && s < 3 ? "visible" : "hidden";
  $("#drNext").textContent = s === 2 ? "Επιβεβαίωση" : s === 3 ? "Κλείσιμο" : "Συνέχεια";
  $("#drBody").scrollTop = 0; sync();
}
function sync() {
  const ok = [!!B.svc, !!(B.day && B.time), true, true][B.step];
  $("#drNext").disabled = !ok; $("#drNext").style.opacity = ok ? 1 : .35;
  $("#drSum").innerHTML = B.svc ? `<b>${B.svc.name}</b>${B.svc.price}${B.day ? " · " + fmtDay(B.day) : ""}${B.time ? " · " + B.time : ""}` : "Διαλέξτε υπηρεσία";
}
$("#stSvc").addEventListener("click", e => { const b = e.target.closest(".svc"); if (!b) return; B.svc = SVC[b.dataset.id]; $$(".svc").forEach(x => x.classList.toggle("on", x === b)); B.time = null; sync(); setTimeout(() => go(1), 260); });
$("#days").addEventListener("click", e => { const b = e.target.closest(".day"); if (!b) return; B.day = days.find(d => key(d) === b.dataset.k); B.time = null; renderDays(); sync(); });
$("#times").addEventListener("click", e => { const b = e.target.closest(".time"); if (!b || b.disabled) return; B.time = b.dataset.t; $$(".time").forEach(x => x.classList.toggle("on", x === b)); sync(); });
$("#who").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; B.who = b.dataset.w; $$("#who .chip").forEach(x => x.classList.toggle("on", x === b)); });
$("#drNext").addEventListener("click", () => B.step === 3 ? close() : go(B.step + 1));
$("#drBack").addEventListener("click", () => go(Math.max(0, B.step - 1)));

function open(opts = {}) {
  Object.assign(B, { svc: null, day: null, time: null, who: "Οποιοσδήποτε", note: "" });
  if (opts.svc && SVC[opts.svc]) B.svc = SVC[opts.svc];
  if (opts.day) B.day = days.find(d => key(d) === opts.day) || null;
  if (opts.time) B.time = opts.time;
  if (opts.who) B.who = opts.who;
  if (opts.note) { B.note = opts.note; $("#bkNote").value = opts.note; } else $("#bkNote").value = "";
  $$(".svc").forEach(x => x.classList.toggle("on", B.svc && x.dataset.id === B.svc.id));
  html.classList.add("booking-open"); $("#drawer").setAttribute("aria-hidden", "false");
  go(B.svc && B.day && B.time ? 2 : B.svc ? 1 : 0);
}
function close() { html.classList.remove("booking-open"); $("#drawer").setAttribute("aria-hidden", "true"); }
window.GuzelBook = open;
document.addEventListener("click", e => { const b = e.target.closest("[data-book]"); if (!b) return; e.preventDefault(); open({ svc: b.dataset.book || null, note: b.dataset.note || "" }); });
$("#scrim").addEventListener("click", close); $("#drClose").addEventListener("click", close);
addEventListener("keydown", e => { if (e.key === "Escape") { close(); html.classList.remove("menu-open"); } });
})();

/* ---------- line drawings of the two machines (Reformer moves, Cadillac sways) ---------- */
(() => {
const INK = "#1d2732", OAK = "#c8ab86", SKY = "#8db2cf";
function coil(x0, x1, y, n, amp) {
  let d = `M${x0} ${y}`; const step = (x1 - x0) / (n * 2);
  for (let i = 1; i <= n * 2; i++) d += ` L${x0 + step * i} ${y + (i % 2 ? -amp : amp)}`;
  return d + ` L${x1} ${y}`;
}
function reformer(el, opts = {}) {
  el.innerHTML = `<svg viewBox="0 0 640 280" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Reformer">
  <ellipse cx="320" cy="252" rx="290" ry="10" fill="rgba(95,135,168,.12)" stroke="none"/>
  <g stroke="${INK}" stroke-width="2">
    <rect x="40" y="178" width="560" height="16" rx="8" fill="#fff"/>
    <path d="M70 194 V240 M570 194 V240 M58 240 H82 M558 240 H582"/>
    <path d="M60 178 V64 M60 64 h18" /><circle cx="84" cy="64" r="7" fill="#fff"/>
    <path d="M556 178 L540 92 M584 178 L540 92"/><rect x="520" y="80" width="40" height="12" rx="6" fill="${SKY}" stroke="${INK}"/>
  </g>
  <g id="rfSprings" stroke="${SKY}" stroke-width="2"></g>
  <g id="rfCar">
    <path id="rfRope" stroke="${INK}" stroke-width="1.2" opacity=".55" d=""/>
    <rect x="170" y="148" width="170" height="26" rx="8" fill="${OAK}" stroke="${INK}" stroke-width="2"/>
    <rect x="176" y="140" width="40" height="12" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <rect x="232" y="118" width="12" height="30" rx="5" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <rect x="262" y="118" width="12" height="30" rx="5" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <circle cx="190" cy="176" r="5" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="320" cy="176" r="5" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
  </g></svg>`;
  const car = el.querySelector("#rfCar"), springs = el.querySelector("#rfSprings"), rope = el.querySelector("#rfRope");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t0 = performance.now(), vis = true;
  new IntersectionObserver(es => vis = es[0].isIntersecting).observe(el);
  function frame(now) {
    if (vis) {
      const p = reduce ? .35 : (1 - Math.cos(((now - t0) / (opts.period || 4200)) * Math.PI * 2)) / 2, dx = p * 120;
      car.setAttribute("transform", `translate(${dx} 0)`);
      const x0 = 340 + dx;
      springs.innerHTML = [0, 1, 2].map(i => `<path d="${coil(x0, 528, 158 + i * 6, 9, 3.2 - p * 1.2)}" opacity="${1 - i * .25}"/>`).join("");
      rope.setAttribute("d", `M${-dx + 84} 64 Q ${-dx + 140} ${120 + p * 10} 200 148`);
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function cadillac(el) {
  el.innerHTML = `<svg viewBox="0 0 640 300" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Cadillac">
  <ellipse cx="320" cy="282" rx="280" ry="10" fill="rgba(95,135,168,.12)" stroke="none"/>
  <g stroke="${INK}" stroke-width="2">
    <rect x="90" y="196" width="460" height="22" rx="8" fill="${OAK}"/>
    <path d="M110 218 V272 M530 218 V272"/>
    <path d="M100 196 V40 M540 196 V40 M100 40 H540 M100 70 H540"/>
    <path d="M320 40 V70" opacity=".5"/>
    <rect x="300" y="128" width="40" height="10" rx="5" fill="#fff" transform="rotate(0)"/>
  </g>
  <g class="sway" style="transform-origin:200px 70px;animation:sway 5s ease-in-out infinite alternate"><path d="${coil(200, 200.01, 70, 1, 0)}" stroke="none"/><path d="M200 70 ${Array.from({ length: 14 }, (_, i) => `L${200 + (i % 2 ? 5 : -5)} ${74 + i * 5}`).join(" ")} L200 150" stroke="${SKY}" stroke-width="2"/><circle cx="200" cy="156" r="6" stroke="${INK}" stroke-width="2" fill="#fff"/></g>
  <g class="sway" style="transform-origin:440px 70px;animation:sway 6s ease-in-out -2s infinite alternate"><path d="M440 70 ${Array.from({ length: 14 }, (_, i) => `L${440 + (i % 2 ? 5 : -5)} ${74 + i * 5}`).join(" ")} L440 150" stroke="${SKY}" stroke-width="2"/><circle cx="440" cy="156" r="6" stroke="${INK}" stroke-width="2" fill="#fff"/></g>
  <path d="M320 70 V128" stroke="${INK}" stroke-width="1.2" opacity=".5"/>
  </svg>`;
}
const st = document.createElement("style"); st.textContent = "@keyframes sway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}@media(prefers-reduced-motion:reduce){.sway{animation:none!important}}"; document.head.append(st);
window.GuzelMachines = { reformer, cadillac };
document.querySelectorAll("[data-machine]").forEach(el => (el.dataset.machine === "cadillac" ? cadillac : reformer)(el));
})();
