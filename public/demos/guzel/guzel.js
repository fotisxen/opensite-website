/* Guzel Beauty × Wellness · OpenSite demo · shared header, menu, footer, silk lines and booking (needs data.js first) */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement, page = document.body.dataset.page || "home";
const IG = "https://www.instagram.com/guzel.beauty.wellness/";
const TW = "https://www.treatwell.gr/katasthma/guzel-beauty-x-wellness-therme/";
const EUR = window.GZ_EUR, MIN = window.GZ_MIN, CAT = window.GZ_CATALOG, SVC = window.GZ_SVC, ST = window.GZ_STORES;

/* ---------- the monogram (stand-in for their round "g" logo) ---------- */
const mono = (cls = "mono") => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" fill="#a9c6dd"/><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".8"/><text x="50" y="60" text-anchor="middle" font-family="Noto Serif Display, Georgia, serif" font-style="italic" font-weight="300" font-size="58" fill="#fff">g</text></svg>`;
window.GuzelMono = mono;

/* ---------- navigation ---------- */
const CARE = [["laser.html", "Laser αποτρίχωση", "laser", "3D Laser · γυναίκες & άνδρες"], ["face.html", "Θεραπείες προσώπου", "face", "Hydrafacial, RF, AI δερμοανάλυση"], ["nails.html", "Νύχια", "nails", "Μανικιούρ, gel, acrygel, πεντικιούρ"], ["brows-lashes.html", "Φρύδια & βλεφαρίδες", "brows", "Lash lift, 4D brow lift"]];
const NAV = [["pilates.html", "Pilates", "pilates"], ["aesthetics.html", "Περιποιήσεις", "aesthetics", CARE], ["prices.html", "Τιμές", "prices"], ["shop.html", "The G Move", "shop"], ["gift.html", "Δωροκάρτες", "gift"], ["contact.html", "Καταστήματα", "contact"]];
const isOn = (k, sub) => k === page || (sub && sub.some(s => s[2] === page));
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html" aria-label="Guzel αρχική"><span class="ph" data-note="Το δικό σας λογότυπο (το στρογγυλό «g»)">${mono()}</span><span><b>GUZEL</b><small>beauty studio · wellness</small></span></a>
  <nav class="nav">${NAV.map(([h, t, k, sub]) => sub
    ? `<div class="dd"><a href="${h}" class="${isOn(k, sub) ? "on" : ""}">${t} <i>▾</i></a><div class="dd-menu">${sub.map(([sh, st, sk, sd]) => `<a href="${sh}" class="${sk === page ? "cur" : ""}"><b>${st}</b><small>${sd}</small></a>`).join("")}<a href="${h}" class="all">Όλες οι περιποιήσεις →</a></div></div>`
    : `<a href="${h}" class="${isOn(k) ? "on" : ""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta"><button class="btn btn-ink" data-book>Κράτηση</button><button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button></div>
</div></header>
<div class="mmenu" id="mmenu"><div class="mm-in">
  <a href="demo.html" class="big">Αρχική</a>
  <a href="pilates.html" class="big"><em>P</em>ilates</a>
  <a href="aesthetics.html" class="big"><em>Π</em>εριποιήσεις</a>
  <div class="mm-sub">${CARE.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
  <a href="prices.html" class="big">Τιμοκατάλογος</a>
  <a href="shop.html" class="big"><em>T</em>he G Move</a>
  <a href="about.html" class="big">Η Guzel</a>
  <a href="gift.html" class="big">Δωροκάρτες</a>
  <a href="contact.html" class="big">Καταστήματα</a>
  <button class="btn btn-ink" data-book>Κλείστε ραντεβού</button>
</div></div>`);

/* ---------- footer, booking drawer, notes toggle ---------- */
document.body.insertAdjacentHTML("beforeend", `
<section class="cta-band"><div class="silk" data-silk></div><div class="wrap"><span class="eyebrow">Guzel · Θέρμη</span><p class="h2" style="margin:16px 0 26px">Η ώρα σας,<br><em>με δύο κλικ.</em></p><div class="ctas"><button class="btn btn-ink" data-book>Κλείστε ραντεβού</button><a class="btn btn-line" href="prices.html">Δείτε τις τιμές</a></div></div></section>
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div><p class="h3">Beauty studio στο κέντρο, wellness <em>στη Θέρμη.</em></p><p style="margin-top:14px">★★★★★ 4,9 · πάνω από 6.700 κριτικές στο Treatwell</p><div class="social"><a href="${ST.c.ig}" target="_blank" rel="noopener" aria-label="Instagram Guzel Beauty Studio"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a><a href="${ST.t.ig}" target="_blank" rel="noopener" aria-label="Instagram Guzel Wellness Θέρμη"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a><a href="https://www.instagram.com/the.g.move/" target="_blank" rel="noopener" aria-label="Instagram The G Move" style="font:400 italic 18px/1 var(--serif)">g</a></div></div>
    <div><h4>Υπηρεσίες</h4><ul><li><a href="pilates.html">Pilates Reformer</a></li>${CARE.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="prices.html">Τιμοκατάλογος</a></li></ul></div>
    <div><h4>Κέντρο</h4><ul><li>${ST.c.name}</li><li>${ST.c.addr}</li><li>Δευ–Παρ 09–21 · Σάβ 09–17</li><li><a href="tel:${ST.c.tel}">${ST.c.phone}</a></li></ul></div>
    <div><h4>Θέρμη</h4><ul><li>${ST.t.name}</li><li>${ST.t.addr}, ${ST.t.area}</li><li>Δευ–Παρ 09–21</li><li><a class="ph" data-note="Το τηλέφωνο της Θέρμης" href="tel:+302310000000">2310 000 000</a></li></ul><h4 style="margin-top:26px">Guzel</h4><ul><li><a href="about.html">Η Guzel</a></li><li><a href="shop.html">The G Move</a></li><li><a href="gift.html">Δωροκάρτες</a></li></ul></div>
  </div>
  <div class="big">Guzel</div>
  <div class="foot-bottom"><span>© 2026 Guzel · Θεσσαλονίκη & Θέρμη</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Κράτηση" aria-hidden="true">
  <div class="dr-head"><div class="silk" data-silk="small"></div><button class="dr-close" id="drClose" aria-label="Κλείσιμο">×</button><span class="eyebrow">Κράτηση</span><p class="h3" id="drTitle" style="margin-top:10px">Τι θα θέλατε;</p><div class="dr-steps"><i class="on"></i><i></i><i></i><i></i></div></div>
  <div class="dr-body" id="drBody">
    <div class="step on" data-s="0"><div class="loc-pick" id="locPick"></div><label class="field" style="margin-bottom:12px"><input id="svcQ" type="search" placeholder="Αναζήτηση, π.χ. lash, ημιμόνιμο, πόδια…" autocomplete="off"></label><div class="svc-cats" id="svcCats"></div><div id="stSvc"></div></div>
    <div class="step" data-s="1"><div class="days" id="days"></div><div class="times" id="times"></div><div class="who ph" id="who" data-note="Τα ονόματα της ομάδας σας από το Treatwell"></div></div>
    <div class="step" data-s="2"><div class="recap" id="recap"></div><label class="field"><span>Ονοματεπώνυμο</span><input id="bkName" autocomplete="name"></label><label class="field"><span>Κινητό</span><input id="bkPhone" type="tel" inputmode="tel" autocomplete="tel"></label><label class="field"><span>Σημείωση (προαιρετικά)</span><textarea id="bkNote" rows="2"></textarea></label><p class="small ph" data-note="Μπορεί να συνδεθεί με το Treatwell ή με δικό σας ημερολόγιο">Θα λάβετε επιβεβαίωση με SMS και υπενθύμιση μία μέρα πριν.</p></div>
    <div class="step" data-s="3"><div class="done-box">${mono()}<p class="h3">Σας περιμένουμε.</p><p id="doneTxt" class="small"></p><p class="small" style="margin-top:18px">Αυτό είναι demo: η κράτηση δεν στάλθηκε.</p></div></div>
  </div>
  <div class="dr-foot"><div class="sum" id="drSum">Διαλέξτε υπηρεσία</div><div style="display:flex;gap:8px"><button class="btn btn-line" id="drBack" style="padding:14px 18px">←</button><button class="btn btn-ink" id="drNext">Συνέχεια</button></div></div>
</aside>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);
if (document.body.dataset.nocta === "1") $(".cta-band").remove();

$("#mmenu").addEventListener("click", e => { if (e.target.closest("a,button")) html.classList.remove("menu-open"); });
$("#burger").addEventListener("click", () => html.classList.toggle("menu-open"));
$("#notesToggle").addEventListener("click", () => { const on = html.classList.toggle("notes"); try { localStorage.setItem("gz-notes", on ? "on" : "off"); } catch (e) {} });
const hdr = $("#hdr"), solid = () => hdr.classList.toggle("solid", scrollY > 30);
addEventListener("scroll", solid, { passive: true }); solid();

/* ---------- open now (Mon–Fri 09–21) ---------- */
window.GuzelOpen = (d = new Date()) => {
  const wd = d.getDay(), m = d.getHours() * 60 + d.getMinutes(), weekday = wd >= 1 && wd <= 5;
  if (weekday && m >= 540 && m < 1260) return { open: true, txt: "Ανοιχτά τώρα · έως 21:00" };
  if (weekday && m < 540) return { open: false, txt: "Ανοίγουμε σήμερα στις 09:00" };
  return { open: false, txt: wd === 5 || wd === 6 || wd === 0 ? "Ανοίγουμε Δευτέρα 09:00" : "Ανοίγουμε αύριο 09:00" };
};

/* ---------- silk lines: thin flowing strokes with the loop of the "g" ---------- */
function rng(s) { return () => (s = (s * 16807) % 2147483647, (s - 1) / 2147483646); }
function silk(el, seed = 7) {
  const small = el.dataset.silk === "small", W = 1200, H = small ? 260 : 600, r = rng(seed);
  const lines = small ? 2 : 3;
  let s = "";
  for (let i = 0; i < lines; i++) {
    const y0 = H * (.62 + r() * .3), amp = H * (.05 + r() * .07), loopAt = 700 + r() * 380, lr = small ? 12 : 16 + r() * 10;
    // a long wave that ties one soft loop somewhere along the way
    const d = `M-40 ${y0.toFixed(0)} C ${(loopAt * .35).toFixed(0)} ${(y0 - amp).toFixed(0)}, ${(loopAt * .7).toFixed(0)} ${(y0 + amp).toFixed(0)}, ${loopAt.toFixed(0)} ${y0.toFixed(0)}`
      + ` c ${lr} ${-lr * .2}, ${lr * 1.1} ${-lr * 1.9}, 0 ${-lr * 2}`
      + ` c ${-lr * 1.1} 0, ${-lr * .9} ${lr * 1.6}, ${lr * .2} ${lr * 2}`
      + ` C ${(loopAt + 260).toFixed(0)} ${(y0 + amp * .8).toFixed(0)}, ${(loopAt + 480).toFixed(0)} ${(y0 - amp).toFixed(0)}, ${W + 60} ${(y0 + (r() - .5) * amp).toFixed(0)}`;
    const col = ["#8db2cf", "#c8ab86", "#bcd4e6"][i % 3], w = [1, .8, 1.6][i % 3];
    s += `<path class="ln" d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" pathLength="1" style="--dl:${(i * .35).toFixed(2)}s;--dur:${(26 + r() * 14).toFixed(1)}s;opacity:${(.35 + r() * .25).toFixed(2)}"/>`;
  }
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`;
}
window.GuzelSilk = silk;
$$("[data-silk]").forEach((el, i) => silk(el, 13 + i * 29));

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
window.GuzelReveal = root => $$(".rv:not(.in)", root).forEach(el => io.observe(el));
window.GuzelReveal(document);

/* ---------- reusable service list (rows with price and book arrow) ---------- */
window.GuzelRows = (ids, opts = {}) => ids.map(id => { const s = SVC[id]; if (!s) return ""; return `<div class="mrow"><div><b>${s.name}${s.where !== "b" ? ` <i class="where">${GZ_WHERE(s)}</i>` : ""}</b><span>${GZ_MIN(s.min)}${s.note ? " · " + s.note : ""}${s.pc ? ` · κέντρο ${EUR(s.pc)}` : ""}</span></div><span class="price">${s.was ? `<s>${EUR(s.was)}</s> ` : ""}${EUR(s.price)}</span><button class="bk" data-book="${id}" aria-label="Κράτηση ${s.name}">→</button></div>`; }).join("");
window.GuzelGroupRows = gid => window.GuzelRows(CAT.find(g => g.id === gid).items.map(i => i[0]));

/* ---------- booking drawer ---------- */
const TEAM = { pilates: ["Οποιοσδήποτε", "Σοφία"], face: ["Οποιοσδήποτε", "Μαρία"], "laser-w": ["Οποιοσδήποτε", "Μαρία"], "laser-m": ["Οποιοσδήποτε", "Μαρία"], wax: ["Οποιοσδήποτε", "Μαρία"], mani: ["Οποιοσδήποτε", "Ιμέλντα", "Βάνα"], art: ["Οποιοσδήποτε", "Ιμέλντα", "Βάνα"], pedi: ["Οποιοσδήποτε", "Ιμέλντα", "Βάνα"], lash: ["Οποιοσδήποτε", "Μαρία"] };
let cat = "all";
function renderSvcs() {
  const q = $("#svcQ").value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  $("#svcCats").innerHTML = [["all", "Όλα"], ...CAT.filter(g => g.items.some(i => GZ_AT(SVC[i[0]], B.loc))).map(g => [g.id, g.name])].map(([id, n]) => `<button class="chip ${cat === id ? "on" : ""}" data-c="${id}">${n}</button>`).join("");
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  $("#locPick").innerHTML = Object.values(ST).map(st => `<button class="${B.loc === st.id ? "on" : ""}" data-l="${st.id}"><b>${st.short}</b><small>${st.addr}</small></button>`).join("");
  const html = CAT.filter(g => cat === "all" || g.id === cat).map(g => {
    const items = g.items.map(i => SVC[i[0]]).filter(s => GZ_AT(s, B.loc) && (!q || norm(s.name + " " + (s.note || "") + " " + g.name).includes(q)));
    return items.length ? `<div class="svc-group"><h5>${g.name}</h5>${items.map(s => `<button class="svc ${B.svc && B.svc.id === s.id ? "on" : ""}" data-id="${s.id}"><span><b>${s.name}</b><small>${MIN(s.min)}${s.note ? " · " + s.note : ""}</small></span><em>${s.was ? `<s>${EUR(s.was)}</s>` : ""}${EUR(GZ_PRICE(s, B.loc))}</em></button>`).join("")}</div>` : "";
  }).join("");
  $("#stSvc").innerHTML = html || `<p class="small">Δεν βρέθηκε υπηρεσία. Δοκιμάστε άλλη λέξη.</p>`;
}
const B = { step: 0, loc: document.body.dataset.loc || "c", svc: null, day: null, time: null, who: "Οποιοσδήποτε", note: "" };
const DOW = ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"], MON = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαΐ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];
const allDays = []; { const d = new Date(); d.setHours(12, 0, 0, 0); while (allDays.length < 12) { if (d.getDay() >= 1) allDays.push(new Date(d)); d.setDate(d.getDate() + 1); } }
const days = allDays.filter(d => d.getDay() <= 5).slice(0, 10);
const storeDays = () => allDays.filter(d => ST[B.loc].open[d.getDay()]).slice(0, 10);
const key = d => d.toISOString().slice(0, 10);
const fmtDay = d => `${["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"][d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
window.GuzelDays = days; window.GuzelFmtDay = fmtDay;
function renderDays() {
  $("#days").innerHTML = storeDays().map(d => `<button class="day ${B.day && key(B.day) === key(d) ? "on" : ""}" data-k="${key(d)}"><small>${DOW[d.getDay()]}</small><b>${d.getDate()}</b><small>${MON[d.getMonth()]}</small></button>`).join("");
  renderTimes();
}
function renderTimes() {
  if (!B.day) { $("#times").innerHTML = `<p class="small" style="grid-column:1/-1">Διαλέξτε ημέρα για να δείτε τις ελεύθερες ώρες.</p>`; $("#who").innerHTML = ""; return; }
  const r = rng(+key(B.day).replace(/-/g, "") % 99991 + (B.svc ? B.svc.id.length * 31 : 0)), now = new Date(), today = key(B.day) === key(now);
  const close = ST[B.loc].open[B.day.getDay()][1], last = close - Math.max(30, B.svc ? B.svc.min : 60), slots = []; for (let m = 9 * 60; m <= last; m += 30) slots.push(m);
  $("#times").innerHTML = slots.map(m => { const t = `${String(m / 60 | 0).padStart(2, "0")}:${m % 60 ? "30" : "00"}`, past = today && m <= now.getHours() * 60 + now.getMinutes(), busy = r() < .34; return `<button class="time ${B.time === t ? "on" : ""}" data-t="${t}" ${past || busy ? "disabled" : ""}>${t}</button>`; }).join("");
  const team = TEAM[B.svc ? B.svc.gid : "pilates"] || ["Οποιοσδήποτε"];
  $("#who").innerHTML = `<p class="small" style="width:100%">Με ποιον;</p>` + team.map(n => `<button class="chip ${B.who === n ? "on" : ""}" data-w="${n}">${n}</button>`).join("");
}
function go(s) {
  B.step = s;
  $$("#drawer .step").forEach(el => el.classList.toggle("on", +el.dataset.s === s));
  $$(".dr-steps i").forEach((el, i) => el.classList.toggle("on", i <= s));
  $("#drTitle").textContent = ["Τι θα θέλατε;", "Πότε σας βολεύει;", "Τα στοιχεία σας", "Έγινε."][s];
  if (s === 0) renderSvcs();
  if (s === 1) renderDays();
  if (s === 2) $("#recap").innerHTML = `<b>${B.svc.name}</b>${ST[B.loc].name} · ${ST[B.loc].addr}<br>${fmtDay(B.day)} · ${B.time} · ${MIN(B.svc.min)}${B.who !== "Οποιοσδήποτε" ? " · με " + B.who : ""}`;
  if (s === 3) $("#doneTxt").innerHTML = `${$("#bkName").value.trim() ? $("#bkName").value.trim().split(" ")[0] + ", σ" : "Σ"}ας κρατήσαμε <b>${B.svc.name}</b><br>${fmtDay(B.day)} στις ${B.time}<br>${ST[B.loc].name}, ${ST[B.loc].addr}.`;
  $("#drBack").style.visibility = s > 0 && s < 3 ? "visible" : "hidden";
  $("#drNext").textContent = s === 2 ? "Επιβεβαίωση" : s === 3 ? "Κλείσιμο" : "Συνέχεια";
  $("#drBody").scrollTop = 0; sync();
}
function sync() {
  const ok = [!!B.svc, !!(B.day && B.time), true, true][B.step];
  $("#drNext").disabled = !ok; $("#drNext").style.opacity = ok ? 1 : .35;
  $("#drSum").innerHTML = B.svc ? `<b>${B.svc.name}</b>${ST[B.loc].short} · ${EUR(GZ_PRICE(B.svc, B.loc))}${B.day ? " · " + fmtDay(B.day) : ""}${B.time ? " · " + B.time : ""}` : "Διαλέξτε υπηρεσία";
}
$("#svcQ").addEventListener("input", renderSvcs);
$("#svcCats").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; cat = b.dataset.c; renderSvcs(); });
$("#stSvc").addEventListener("click", e => { const b = e.target.closest(".svc"); if (!b) return; B.svc = SVC[b.dataset.id]; $$(".svc").forEach(x => x.classList.toggle("on", x === b)); B.time = null; sync(); setTimeout(() => go(1), 240); });
$("#locPick").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; B.loc = b.dataset.l; if (B.svc && !GZ_AT(B.svc, B.loc)) B.svc = null; cat = "all"; B.day = null; B.time = null; renderSvcs(); sync(); });
$("#days").addEventListener("click", e => { const b = e.target.closest(".day"); if (!b) return; B.day = storeDays().find(d => key(d) === b.dataset.k); B.time = null; renderDays(); sync(); });
$("#times").addEventListener("click", e => { const b = e.target.closest(".time"); if (!b || b.disabled) return; B.time = b.dataset.t; $$(".time").forEach(x => x.classList.toggle("on", x === b)); sync(); });
$("#who").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; B.who = b.dataset.w; $$("#who .chip").forEach(x => x.classList.toggle("on", x === b)); });
$("#drNext").addEventListener("click", () => B.step === 3 ? close() : go(B.step + 1));
$("#drBack").addEventListener("click", () => go(Math.max(0, B.step - 1)));
function open(opts = {}) {
  Object.assign(B, { svc: null, day: null, time: null, who: "Οποιοσδήποτε", note: "" });
  if (opts.svc && SVC[opts.svc]) B.svc = SVC[opts.svc];
  if (opts.loc) B.loc = opts.loc; else if (B.svc && B.svc.where !== "b") B.loc = B.svc.where;
  cat = opts.cat || (B.svc ? B.svc.gid : "all"); $("#svcQ").value = "";
  if (opts.day) B.day = allDays.find(d => key(d) === opts.day) || null;
  if (opts.time) B.time = opts.time;
  $("#bkNote").value = opts.note || "";
  html.classList.add("booking-open"); $("#drawer").setAttribute("aria-hidden", "false");
  go(B.svc && B.day && B.time ? 2 : B.svc ? 1 : 0);
}
function close() { html.classList.remove("booking-open"); $("#drawer").setAttribute("aria-hidden", "true"); }
window.GuzelBook = open;
document.addEventListener("click", e => { const b = e.target.closest("[data-book]"); if (!b) return; e.preventDefault(); open({ svc: b.dataset.book || null, cat: b.dataset.cat || null, loc: b.dataset.loc || null, note: b.dataset.note || "" }); });
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
