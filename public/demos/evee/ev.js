/* Eveebrand · OpenSite demo · shared shell + shop engine */
/* Shared e-shop engine template. */
(() => {
const CFG = {"name":"Eveebrand","pfx":"ev","logo":"Eveebrand<small>made for your everyday mood</small>","ig":"https://www.instagram.com/eveebrand_/","addr":"Online · αποστολές σε όλη την Ελλάδα","topbar":"Νέα κομμάτια κάθε εβδομάδα · Αποστολές σε όλη την Ελλάδα · Δωρεάν από 50 €","nav":[["shop.html","Κατάστημα","shop"],["about.html","Το brand","about"],["about.html#contact","Επικοινωνία",""]],"cats":["Φορέματα","Σετ","Πανωφόρια","Πουκάμισα & τοπ"],"moods":[{"k":"chill","t":"Chill","e":"☕"},{"k":"night","t":"Night out","e":"🌙"},{"k":"sport","t":"On the move","e":"⚡"},{"k":"soft","t":"Soft & chic","e":"🤍"}],"shopTitle":"Όλα τα κομμάτια","footText":"Ελληνικό brand γυναικείων ρούχων. Made for your everyday mood — από το πρωινό καφέ μέχρι τη βραδινή έξοδο.","contactLines":["Αποστολές σε όλη την Ελλάδα","Παραγγελίες 24/7 από το e-shop","Απαντάμε σε DM καθημερινά"],"freeShip":50,"ships":[{"k":"courier","t":"Courier στο σπίτι","d":"1–3 εργάσιμες σε όλη την Ελλάδα","p":3.5},{"k":"boxnow","t":"BOX NOW θυρίδα","d":"24/7 παραλαβή, 1–2 εργάσιμες","p":2.5}],"cod":true,"codFee":2,"coupons":[{"code":"EVEE10","pct":10,"t":"Έκπτωση 10% στην πρώτη σου παραγγελία"},{"code":"MOOD15","pct":15,"t":"Έκπτωση 15% στη συλλογή"}],"perks":["Αποστολή σε 1–3 εργάσιμες σε όλη την Ελλάδα","Δωρεάν μεταφορικά από 50 €","Αλλαγή μεγέθους μέσα σε 14 ημέρες"],"shipText":"Courier ή BOX NOW σε 1–3 εργάσιμες, σε όλη την Ελλάδα. Δωρεάν μεταφορικά από 50 €. Αλλαγή ή επιστροφή μέσα σε 14 ημέρες, με το κομμάτι αφόρετο.","doneNote":"Θα λάβεις τον κωδικό αποστολής μόλις φύγει το δέμα σου.","orderPrefix":"EV","products":[{"id":"l1","nm":"Lumina καπαρτίνα","cat":"Πανωφόρια","pr":89,"old":0,"tag":"Lumina","mood":["night","soft"],"imgs":["img/e02.jpg"],"colors":[{"n":"Μαύρο","hex":"#131316"}],"sizes":["S","M","L"],"out":[],"desc":"Μακριά καπαρτίνα με λάμψη και ζώνη στη μέση.","long":"Το πιο εντυπωσιακό κομμάτι της Lumina: μακριά γραμμή, γυαλιστερή υφή και ζώνη που σχηματίζει τη μέση. Φοριέται πάνω από φόρεμα ή με απλό μαύρο σύνολο.","comp":"Συνθετικό δέρμα με φόδρα"},{"id":"l2","nm":"Lumina dress","cat":"Φορέματα","pr":69,"old":0,"tag":"Lumina","mood":["soft","night"],"imgs":["img/e04.jpg"],"colors":[{"n":"Καρό","hex":"#6d564a"}],"sizes":["S","M","L"],"out":[],"desc":"Μίνι φόρεμα με στράπλες γραμμή.","comp":"Βαμβάκι με ελαστάνη"},{"id":"m1","nm":"Midnight set","cat":"Σετ","pr":75,"old":0,"tag":"Best seller","mood":["night","chill"],"imgs":["img/e03.jpg"],"colors":[{"n":"Denim","hex":"#4a5a6e"}],"sizes":["S","M","L"],"out":[],"desc":"Τοπ με δέσιμο και παντελόνι, σε ένα σετ.","long":"Το Midnight set: στράπλες τοπ με δέσιμο στη μέση και ίσιο παντελόνι στο ίδιο ύφασμα. Φοριέται μαζί ή χωριστά.","comp":"Βαμβακερό ύφασμα με ελαστάνη"},{"id":"s1","nm":"Αθλητικό σετ","cat":"Σετ","pr":55,"old":0,"tag":"4 χρώματα","mood":["sport","chill"],"imgs":["img/e01.jpg","img/e08.jpg"],"colors":[{"n":"Καφέ","hex":"#4d3a30","img":0},{"n":"Μπορντό","hex":"#5c2230","img":1},{"n":"Μαύρο","hex":"#131316"},{"n":"Γκρι","hex":"#8d8f94"}],"sizes":["XS","S","M","L"],"out":["XS"],"desc":"Τοπ και κολάν σε απαλό ύφασμα. Διαθέσιμο σε 4 χρώματα.","long":"Το σετ που φοράς για γυμναστήριο, για βόλτα και για το σπίτι. Απαλό ύφασμα που δεν διαφαίνεται, ψηλόμεσο κολάν και τοπ με στήριξη.","comp":"75% πολυαμίδιο, 25% ελαστάνη"},{"id":"p1","nm":"Πουκάμισο σατέν","cat":"Πουκάμισα & τοπ","pr":42,"old":0,"tag":"","mood":["soft","night"],"imgs":["img/e05.jpg"],"colors":[{"n":"Μαύρο","hex":"#131316"},{"n":"Κόκκινο","hex":"#9c2b2b"}],"sizes":["S","M","L"],"out":[],"desc":"Ένα πουκάμισο, δύο αποχρώσεις. Κομψό και θηλυκό.","long":"Κομψό, θηλυκό και ιδανικό για chic εμφανίσεις από το πρωί μέχρι το βράδυ. Διαθέσιμο σε μαύρο και κόκκινο.","comp":"100% πολυεστέρας σατέν"},{"id":"p2","nm":"Πουκάμισο zebra","cat":"Πουκάμισα & τοπ","pr":45,"old":0,"tag":"Νέο","mood":["chill","soft"],"imgs":["img/e06.jpg"],"colors":[{"n":"Zebra","hex":"#7a6a5e"}],"sizes":["S","M","L"],"out":[],"desc":"Oversize πουκάμισο με ζέβρα σχέδιο.","comp":"Βισκόζη"},{"id":"d1","nm":"Δαντελένιο μίνι φόρεμα","cat":"Φορέματα","pr":65,"old":79,"tag":"","mood":["night"],"imgs":["img/e07.jpg"],"colors":[{"n":"Μαύρο","hex":"#131316"}],"sizes":["S","M","L"],"out":["L"],"desc":"Διάφανο μανίκι, δαντέλα στο μπούστο.","long":"Το απόλυτο outfit για τις βραδινές σου εμφανίσεις: δαντέλα στο πάνω μέρος, εφαρμοστή μίνι γραμμή και διάφανο μανίκι.","comp":"Πολυαμίδιο με ελαστάνη"},{"id":"z1","nm":"Fluffy ζακέτα","cat":"Πανωφόρια","pr":72,"old":0,"tag":"","mood":["chill","soft"],"imgs":["img/e09.jpg"],"colors":[{"n":"Μπλε-άσπρο","hex":"#8fa9c9"}],"sizes":["One size"],"out":[],"desc":"Πολύ ιδιαίτερη, ζεστή και εντυπωσιακή.","long":"Πανέμορφη fluffy ζακέτα σε μπλε-άσπρο χρώμα. Πολύ ιδιαίτερη, ζεστή και εντυπωσιακή — το κομμάτι που κάνει ολόκληρο το σύνολο.","comp":"Συνθετική γούνα"}]};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const P = CFG.products;
const K = k => CFG.pfx + "-" + k;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money = n => (Math.round(n * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";
const byId = id => P.find(p => p.id === id);

/* ---------- header / menu ---------- */
const NAV = CFG.nav;
document.body.insertAdjacentHTML("afterbegin", `
<div class="topbar">${CFG.topbar}</div>
<header class="hdr" id="hdr"><div class="wrap hdr-in">
  <button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button>
  <a class="brand" href="demo.html">${CFG.logo}</a>
  <nav class="nav">${NAV.map(([h, t, k]) => `<a href="${h}" class="${k === page ? "on" : ""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta">
    <a class="ig-link" href="${CFG.ig}" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor"/></svg></a>
    <button class="cart-btn" id="cartBtn" aria-label="Καλάθι"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg><i id="cartN">0</i></button>
  </div>
</div></header>
<div class="mmenu" id="mmenu"><button class="x" id="mx" aria-label="Κλείσιμο">×</button><div class="wrap">
  <a href="demo.html">Αρχική</a>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}<a href="checkout.html">Ταμείο</a>
  <p class="small">${CFG.addr}</p>
</div></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div class="foot-about"><div class="foot-logo">${CFG.logo}</div><p>${CFG.footText}</p></div>
    <div><h4>Κατάστημα</h4><ul>${CFG.cats.map(c => `<li><a href="shop.html?c=${encodeURIComponent(c)}">${c}</a></li>`).join("")}</ul></div>
    <div><h4>Βοήθεια</h4><ul><li><a href="about.html#ship">Αποστολές & επιστροφές</a></li><li><a href="#" data-sizeguide>Οδηγός μεγεθών</a></li><li><a href="checkout.html">Ταμείο</a></li><li><a href="about.html#contact">Επικοινωνία</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul>${CFG.contactLines.map(l => `<li>${l}</li>`).join("")}<li><a href="${CFG.ig}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
  </div>
  <div class="pay-row"><span>Visa</span><span>Mastercard</span><span>Apple Pay</span><span>Google Pay</span><span>IRIS</span>${CFG.cod ? "<span>Αντικαταβολή</span>" : ""}</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} ${CFG.name}</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Καλάθι">
  <div class="dr-head"><p class="dr-t">Το καλάθι σου <span id="drCount"></span></p><button id="drX" aria-label="Κλείσιμο">×</button></div>
  <div class="ship-meter" id="shipMeter"></div>
  <div class="dr-body" id="drBody"></div>
  <div class="dr-foot">
    <div class="tot"><span>Υποσύνολο</span><b id="drTot">0 €</b></div>
    <p class="small">Τα μεταφορικά υπολογίζονται στο ταμείο.</p>
    <a class="btn btn-acc btn-block" id="drGo" href="checkout.html">Ολοκλήρωση παραγγελίας</a>
    <button class="btn-link" id="drKeep" type="button">Συνέχεια αγορών</button>
  </div>
</aside>
<div class="modal" id="sizeModal" role="dialog" aria-label="Οδηγός μεγεθών"><div class="modal-box">
  <button class="modal-x" data-close aria-label="Κλείσιμο">×</button>
  <h3>Οδηγός μεγεθών</h3><p class="small">Μετρήσεις σώματος σε εκατοστά.</p>
  <div class="tbl-wrap"><table class="sz-tbl"><thead><tr><th>Μέγεθος</th><th>Στήθος</th><th>Μέση</th><th>Γοφοί</th></tr></thead><tbody>
  <tr><td>XS</td><td>80–84</td><td>62–66</td><td>88–92</td></tr><tr><td>S</td><td>84–88</td><td>66–70</td><td>92–96</td></tr>
  <tr><td>M</td><td>88–92</td><td>70–74</td><td>96–100</td></tr><tr><td>L</td><td>92–98</td><td>74–80</td><td>100–106</td></tr>
  <tr><td>XL</td><td>98–104</td><td>80–86</td><td>106–112</td></tr></tbody></table></div>
  <p class="small ph" data-note="Βάζουμε τον δικό σας πίνακα μεγεθών" style="margin-top:14px">Ανάμεσα σε δύο νούμερα; Στείλτε μας μήνυμα και σας λέμε ποιο ταιριάζει.</p>
</div></div>
<div class="lb" id="lb"><button id="lbX" aria-label="Κλείσιμο">×</button><button class="nav-b pv" id="lbP" aria-label="Προηγούμενη">‹</button><img id="lbI" alt=""><button class="nav-b nx" id="lbN" aria-label="Επόμενη">›</button></div>
<div class="toast" id="toast"></div>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);

const hdr = $("#hdr");
const onScroll = () => hdr.classList.toggle("solid", scrollY > 20);
addEventListener("scroll", onScroll, {passive: true}); onScroll();
$("#burger").onclick = () => $("#mmenu").classList.add("on");
$("#mx").onclick = () => $("#mmenu").classList.remove("on");

const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), {threshold: .08});
const watch = root => $$(".rv", root).forEach(e => io.observe(e));

const toast = msg => { const t = $("#toast"); t.innerHTML = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200); };

/* ---------- size guide modal ---------- */
const openSize = e => { if (e) e.preventDefault(); $("#sizeModal").classList.add("on"); };
document.addEventListener("click", e => {
  if (e.target.closest("[data-sizeguide]")) openSize(e);
  if (e.target.matches("#sizeModal, [data-close]")) $("#sizeModal").classList.remove("on");
});

/* ---------- cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem(K("cart")) || "[]").filter(i => byId(i.id)); } catch (e) {}
const subtotal = () => cart.reduce((s, i) => s + byId(i.id).pr * i.q, 0);
const count = () => cart.reduce((s, i) => s + i.q, 0);
function save() { try { localStorage.setItem(K("cart"), JSON.stringify(cart)); } catch (e) {} paint(); }
function paint() {
  const n = count();
  $("#cartN").textContent = n; $("#cartBtn").classList.toggle("has", n > 0);
  $("#drCount").textContent = n ? `(${n})` : "";
  const st = subtotal(), left = CFG.freeShip - st;
  $("#shipMeter").innerHTML = cart.length ? `<p>${left > 0 ? `Ακόμα <b>${money(left)}</b> για δωρεάν αποστολή` : "✓ Έχεις <b>δωρεάν αποστολή</b>"}</p><div class="bar"><i style="width:${Math.min(100, st / CFG.freeShip * 100)}%"></i></div>` : "";
  $("#drBody").innerHTML = cart.length ? cart.map((i, ix) => { const p = byId(i.id); return `
    <div class="ci"><a href="product.html?id=${p.id}"><img src="${p.imgs[i.img || 0]}" alt=""></a><div class="ci-m">
      <a href="product.html?id=${p.id}" class="ci-n">${p.nm}</a><span class="m">${[i.col, i.sz].filter(Boolean).join(" · ")}</span>
      <div class="qty sm"><button data-d="-1" data-i="${ix}" aria-label="Λιγότερα">−</button><span>${i.q}</span><button data-d="1" data-i="${ix}" aria-label="Περισσότερα">+</button></div>
    </div><div class="ci-r"><b>${money(p.pr * i.q)}</b><button class="rm" data-i="${ix}">Αφαίρεση</button></div></div>`; }).join("")
    : `<div class="empty"><p>Το καλάθι σου είναι άδειο.</p><a class="btn btn-ghost" href="shop.html">Δες τη συλλογή</a></div>`;
  $$("#drBody .rm").forEach(x => x.onclick = () => { cart.splice(+x.dataset.i, 1); save(); });
  $$("#drBody .qty button").forEach(x => x.onclick = () => { const it = cart[+x.dataset.i]; it.q = Math.max(1, Math.min(9, it.q + +x.dataset.d)); save(); });
  $("#drTot").textContent = money(st);
  $("#drGo").classList.toggle("off", !cart.length);
  if (window.SHOP_onCart) window.SHOP_onCart();
}
const openDr = () => { $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
$("#cartBtn").onclick = openDr; $("#drX").onclick = closeDr; $("#scrim").onclick = closeDr; $("#drKeep").onclick = closeDr;
$("#drGo").onclick = e => { if (!cart.length) { e.preventDefault(); toast("Το καλάθι είναι άδειο"); } };
function add(id, sz, col, q = 1, img = 0, open = true) {
  const k = cart.find(i => i.id === id && i.sz === sz && i.col === col);
  if (k) k.q = Math.min(9, k.q + q); else cart.push({id, sz, col, q, img});
  save(); if (open) openDr(); else toast("✓ Προστέθηκε στο καλάθι");
}

/* ---------- product card ---------- */
const disc = p => p.old ? Math.round((1 - p.pr / p.old) * 100) : 0;
function card(p) {
  const tag = p.tag || (p.old ? "-" + disc(p) + "%" : "");
  return `<article class="card rv" data-id="${p.id}">
  <a class="c-img" href="product.html?id=${p.id}"><img src="${p.imgs[0]}" alt="${esc(p.nm)}" loading="lazy">${p.imgs[1] ? `<img class="alt" src="${p.imgs[1]}" alt="" loading="lazy">` : ""}
    ${tag ? `<span class="tag ${p.old ? "sale" : ""}">${tag}</span>` : ""}${p.drop ? `<span class="drop">● ${p.drop}</span>` : ""}</a>
  <button class="quick" type="button" data-quick="${p.id}" aria-label="Γρήγορη προσθήκη">+</button>
  <div class="c-body">
    ${p.br ? `<span class="c-br">${p.br}</span>` : ""}
    <a class="c-nm" href="product.html?id=${p.id}">${p.nm}</a>
    <div class="c-row"><span class="c-pr"><b>${money(p.pr)}</b>${p.old ? `<s>${money(p.old)}</s>` : ""}</span>
    <span class="dots">${p.colors.map(c => `<i style="background:${c.hex}" title="${c.n}"></i>`).join("")}</span></div>
  </div></article>`;
}
document.addEventListener("click", e => {
  const q = e.target.closest("[data-quick]"); if (!q) return;
  const p = byId(q.dataset.quick); const avail = p.sizes.filter(s => !p.out.includes(s));
  if (p.sizes.length === 1 || avail.length === 1) { add(p.id, avail[0], p.colors[0] && p.colors[0].n, 1, 0, false); return; }
  location.href = "product.html?id=" + p.id + "#size";
});

/* ---------- lightbox ---------- */
let imgs = [], li = 0;
const showLb = i => { if (!imgs.length) return; li = (i + imgs.length) % imgs.length; $("#lbI").src = imgs[li]; $("#lb").classList.add("on"); };
const lightbox = (list, i) => { imgs = list; showLb(i); };
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li + 1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li - 1); };
$("#lb").onclick = e => { if (e.target.id === "lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => {
  if (e.key === "Escape") { $("#lb").classList.remove("on"); $("#sizeModal").classList.remove("on"); closeDr(); $("#mmenu").classList.remove("on"); }
  if ($("#lb").classList.contains("on")) { if (e.key === "ArrowRight") showLb(li + 1); if (e.key === "ArrowLeft") showLb(li - 1); }
});

/* ---------- notes ---------- */
$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes"); try { localStorage.setItem(K("notes"), on ? "on" : "off"); } catch (e) {} };

/* ---------- SHOP page ---------- */
function shopPage() {
  const root = $("#shop"); if (!root) return;
  const q = new URLSearchParams(location.search);
  const cats = ["Όλα", ...CFG.cats];
  const sizes = [...new Set(P.flatMap(p => p.sizes))];
  const colors = []; P.forEach(p => p.colors.forEach(c => { if (!colors.find(x => x.n === c.n)) colors.push(c); }));
  const maxPr = Math.ceil(Math.max(...P.map(p => p.pr)) / 10) * 10;
  const st = {c: cats.includes(q.get("c")) ? q.get("c") : "Όλα", m: q.get("m") || "", sz: new Set(), col: new Set(), max: maxPr, sale: q.has("sale"), sort: "new"};
  const moods = CFG.moods || null;
  $("#fCats").innerHTML = cats.map(c => `<button type="button" data-c="${c}">${c}</button>`).join("");
  if (moods && $("#fMoods")) $("#fMoods").innerHTML = `<button type="button" data-m="">Όλα</button>` + moods.map(m => `<button type="button" data-m="${m.k}">${m.e} ${m.t}</button>`).join("");
  $("#fSizes").innerHTML = sizes.map(s => `<button type="button" data-s="${s}">${s}</button>`).join("");
  $("#fCols").innerHTML = colors.map(c => `<button type="button" data-col="${c.n}" title="${c.n}"><i style="background:${c.hex}"></i><span>${c.n}</span></button>`).join("");
  const rng = $("#fMax"); rng.max = maxPr; rng.min = Math.floor(Math.min(...P.map(p => p.pr)) / 10) * 10; rng.value = maxPr; rng.step = 5;
  $("#fSale").checked = st.sale;
  function sync() {
    $$("#fCats button").forEach(b => b.setAttribute("aria-pressed", b.dataset.c === st.c));
    $$("#fMoods button").forEach(b => b.setAttribute("aria-pressed", b.dataset.m === st.m));
    $$("#fSizes button").forEach(b => b.setAttribute("aria-pressed", st.sz.has(b.dataset.s)));
    $$("#fCols button").forEach(b => b.setAttribute("aria-pressed", st.col.has(b.dataset.col)));
    $("#fMaxV").textContent = "έως " + money(st.max);
    if ($("#shopTitle")) $("#shopTitle").textContent = st.c === "Όλα" ? (st.m && moods ? moods.find(m => m.k === st.m).t : CFG.shopTitle) : st.c;
  }
  function render() {
    sync();
    let list = P.filter(p => (st.c === "Όλα" || p.cat === st.c) && (!st.m || (p.mood || []).includes(st.m)) && p.pr <= st.max && (!st.sale || p.old)
      && (!st.sz.size || p.sizes.some(s => st.sz.has(s) && !p.out.includes(s))) && (!st.col.size || p.colors.some(c => st.col.has(c.n))));
    if (st.sort === "lo") list = [...list].sort((a, b) => a.pr - b.pr);
    if (st.sort === "hi") list = [...list].sort((a, b) => b.pr - a.pr);
    if (st.sort === "sale") list = [...list].sort((a, b) => disc(b) - disc(a));
    $("#grid").innerHTML = list.length ? list.map(card).join("") : `<div class="none"><p>Δεν βρέθηκαν κομμάτια με αυτά τα φίλτρα.</p><button class="btn btn-ghost" id="clr2" type="button">Καθαρισμός φίλτρων</button></div>`;
    $("#count").textContent = list.length + (list.length === 1 ? " κομμάτι" : " κομμάτια");
    const act = (st.c !== "Όλα") + !!st.m + st.sz.size + st.col.size + (st.max < maxPr) + st.sale;
    $("#fBtnN").textContent = act ? `(${act})` : "";
    if ($("#clr2")) $("#clr2").onclick = clear;
    watch($("#grid"));
  }
  function clear() { st.c = "Όλα"; st.m = ""; st.sz.clear(); st.col.clear(); st.max = maxPr; rng.value = maxPr; st.sale = false; $("#fSale").checked = false; render(); }
  root.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.c !== undefined) st.c = b.dataset.c;
    else if (b.dataset.m !== undefined) st.m = b.dataset.m;
    else if (b.dataset.s) st.sz.has(b.dataset.s) ? st.sz.delete(b.dataset.s) : st.sz.add(b.dataset.s);
    else if (b.dataset.col) st.col.has(b.dataset.col) ? st.col.delete(b.dataset.col) : st.col.add(b.dataset.col);
    else return;
    render();
  });
  rng.oninput = () => { st.max = +rng.value; render(); };
  $("#fSale").onchange = e => { st.sale = e.target.checked; render(); };
  $("#sort").onchange = e => { st.sort = e.target.value; render(); };
  $("#fClear").onclick = clear;
  $("#fBtn").onclick = () => $(".filters").classList.toggle("open");
  $("#fDone").onclick = () => { $(".filters").classList.remove("open"); $("#grid").scrollIntoView({behavior: "smooth", block: "start"}); };
  render();
}

/* ---------- PRODUCT page ---------- */
function productPage() {
  const root = $("#pdp"); if (!root) return;
  const p = byId(new URLSearchParams(location.search).get("id")) || P[0];
  document.title = p.nm + " · " + CFG.name;
  let ci = 0, sz = p.sizes.length === 1 ? p.sizes[0] : null, qn = 1, im = 0;
  const avail = s => !p.out.includes(s);
  root.innerHTML = `
  <nav class="crumbs"><a href="demo.html">Αρχική</a><span>/</span><a href="shop.html">Κατάστημα</a><span>/</span><a href="shop.html?c=${encodeURIComponent(p.cat)}">${p.cat}</a></nav>
  <div class="pdp">
    <div class="gal">
      <div class="g-main"><img id="gMain" src="${p.imgs[0]}" alt="${esc(p.nm)}">${p.old ? `<span class="tag sale">-${disc(p)}%</span>` : (p.tag ? `<span class="tag">${p.tag}</span>` : "")}<button class="zoom" id="gZoom" type="button" aria-label="Μεγέθυνση">⤢</button></div>
      ${p.imgs.length > 1 ? `<div class="g-th">${p.imgs.map((s, i) => `<button type="button" data-g="${i}"><img src="${s}" alt=""></button>`).join("")}</div>` : ""}
    </div>
    <div class="info">
      ${p.br ? `<span class="c-br">${p.br}</span>` : ""}
      <h1 class="p-nm">${p.nm}</h1>
      <div class="p-pr"><b>${money(p.pr)}</b>${p.old ? `<s>${money(p.old)}</s><span class="save">Κερδίζεις ${money(p.old - p.pr)}</span>` : ""}</div>
      ${p.real ? "" : `<p class="small ph" data-note="Ενδεικτική τιμή — μπαίνει η δική σας" style="display:inline-block">Τιμή με ΦΠΑ</p>`}
      ${p.drop ? `<p class="drop-l">● Νέα άφιξη · ${p.drop}</p>` : ""}
      <p class="p-desc">${p.desc}</p>
      ${p.colors.length ? `<div class="opt"><div class="opt-h"><span>Χρώμα: <b id="colN">${p.colors[0].n}</b></span></div><div class="swatches">${p.colors.map((c, i) => `<button type="button" data-ci="${i}" title="${c.n}" style="--sw:${c.hex}"><i></i></button>`).join("")}</div></div>` : ""}
      <div class="opt" id="size"><div class="opt-h"><span>Μέγεθος: <b id="szN">${sz || "—"}</b></span>${p.sizes.length > 1 ? `<a href="#" data-sizeguide>Οδηγός μεγεθών</a>` : ""}</div>
        <div class="sizes">${p.sizes.map(s => `<button type="button" data-sz="${s}" ${avail(s) ? "" : "disabled"}>${s}</button>`).join("")}</div>
        ${p.out.length ? `<p class="small muted">Εξαντλήθηκε: ${p.out.join(", ")} · <a href="#" id="notify">ειδοποίησέ με</a></p>` : ""}
        <p class="err" id="szErr">Διάλεξε μέγεθος</p></div>
      <div class="buy"><div class="qty"><button type="button" data-q="-1" aria-label="Λιγότερα">−</button><span id="qN">1</span><button type="button" data-q="1" aria-label="Περισσότερα">+</button></div>
        <button class="btn btn-acc grow" id="addBtn" type="button">Προσθήκη στο καλάθι</button></div>
      <button class="btn btn-ghost btn-block" id="buyNow" type="button">Αγορά τώρα</button>
      <ul class="perks">${CFG.perks.map(x => `<li>${x}</li>`).join("")}</ul>
      <div class="acc">
        <details open><summary>Περιγραφή</summary><p>${p.long || p.desc}</p></details>
        <details><summary>Σύνθεση & φροντίδα</summary><p>${p.comp || `<span class="ph" data-note="Η σύνθεση από την ετικέτα του ρούχου">Σύνθεση: θα συμπληρωθεί.</span>`}<br>Πλύσιμο στο χέρι ή σε πρόγραμμα για ευαίσθητα, στους 30°C.</p></details>
        <details><summary>Αποστολή & επιστροφές</summary><p>${CFG.shipText}</p></details>
      </div>
    </div>
  </div>`;
  const setImg = i => { im = i; $("#gMain").src = p.imgs[i]; $$(".g-th button").forEach((b, j) => b.classList.toggle("on", j === i)); };
  setImg(0);
  $$(".g-th button").forEach(b => b.onclick = () => setImg(+b.dataset.g));
  $("#gZoom").onclick = () => lightbox(p.imgs, im); $("#gMain").onclick = () => lightbox(p.imgs, im);
  const setCol = i => { ci = i; $$(".swatches button").forEach((b, j) => b.setAttribute("aria-pressed", j === i)); if ($("#colN")) $("#colN").textContent = p.colors[i].n; if (p.colors[i].img !== undefined) setImg(p.colors[i].img); };
  $$(".swatches button").forEach(b => b.onclick = () => setCol(+b.dataset.ci));
  if (p.colors.length) setCol(0);
  const setSz = s => { sz = s; $$(".sizes button").forEach(b => b.setAttribute("aria-pressed", b.dataset.sz === s)); $("#szN").textContent = s; $("#szErr").classList.remove("on"); };
  $$(".sizes button").forEach(b => b.onclick = () => !b.disabled && setSz(b.dataset.sz));
  if (sz) setSz(sz);
  $$(".buy .qty button").forEach(b => b.onclick = () => { qn = Math.max(1, Math.min(9, qn + +b.dataset.q)); $("#qN").textContent = qn; });
  const go = open => { if (!sz) { $("#szErr").classList.add("on"); $("#size").scrollIntoView({behavior: "smooth", block: "center"}); return false; }
    add(p.id, sz, p.colors[ci] && p.colors[ci].n, qn, p.colors[ci] && p.colors[ci].img !== undefined ? p.colors[ci].img : im, open); return true; };
  $("#addBtn").onclick = () => go(true);
  $("#buyNow").onclick = () => { if (go(false)) location.href = "checkout.html"; };
  if ($("#notify")) $("#notify").onclick = e => { e.preventDefault(); toast("✓ Θα σε ειδοποιήσουμε μόλις έρθει ξανά (demo)"); };
  const rel = P.filter(x => x.id !== p.id && x.cat === p.cat).concat(P.filter(x => x.id !== p.id && x.cat !== p.cat)).slice(0, 4);
  $("#related").innerHTML = rel.map(card).join("");
  watch(document);
}

/* ---------- CHECKOUT page ---------- */
function checkoutPage() {
  const root = $("#co"); if (!root) return;
  let ship = CFG.ships[0].k, pay = "card", coupon = null;
  $("#shipOpts").innerHTML = CFG.ships.map(s => `<label class="radio-card"><input type="radio" name="ship" value="${s.k}" ${s.k === ship ? "checked" : ""}><span class="rc-b"><b>${s.t}</b><small>${s.d}</small></span><span class="rc-p" data-price="${s.k}"></span></label>`).join("");
  const pays = [["card", "Κάρτα", "Visa, Mastercard, Apple/Google Pay"], ["iris", "IRIS", "Άμεση πληρωμή από την τράπεζά σου"]].concat(CFG.cod ? [["cod", "Αντικαταβολή", "+" + money(CFG.codFee) + " · πληρώνεις στην παράδοση"]] : []);
  $("#payOpts").innerHTML = pays.map(([k, t, d]) => `<label class="radio-card"><input type="radio" name="pay" value="${k}" ${k === pay ? "checked" : ""}><span class="rc-b"><b>${t}</b><small>${d}</small></span></label>`).join("");
  const shipCost = () => { const s = CFG.ships.find(x => x.k === ship); const st = subtotal(); return s.free !== false && st >= (s.freeAt || CFG.freeShip) ? 0 : s.p; };
  function sum() {
    const st = subtotal(), has = cart.length > 0, sc = has ? shipCost() : 0,
      dc = has && coupon ? Math.round(st * coupon.pct) / 100 : 0, cod = has && pay === "cod" ? CFG.codFee : 0, tot = st - dc + sc + cod;
    CFG.ships.forEach(s => { const el = $(`[data-price="${s.k}"]`); const free = s.free !== false && st >= (s.freeAt || CFG.freeShip); el.textContent = s.p === 0 || free ? "Δωρεάν" : money(s.p); });
    $("#coItems").innerHTML = cart.length ? cart.map(i => { const p = byId(i.id); return `<div class="co-i"><span class="co-im"><img src="${p.imgs[i.img || 0]}" alt=""><i>${i.q}</i></span><span class="co-n">${p.nm}<small>${[i.col, i.sz].filter(Boolean).join(" · ")}</small></span><b>${money(p.pr * i.q)}</b></div>`; }).join("")
      : `<p class="small">Το καλάθι είναι άδειο. <a href="shop.html">Δες τη συλλογή →</a></p>`;
    $("#coLines").innerHTML = `<div><span>Υποσύνολο</span><span>${money(st)}</span></div>${dc ? `<div class="disc"><span>Κουπόνι ${coupon.code}</span><span>−${money(dc)}</span></div>` : ""}<div><span>Αποστολή</span><span>${sc ? money(sc) : "Δωρεάν"}</span></div>${cod ? `<div><span>Αντικαταβολή</span><span>${money(cod)}</span></div>` : ""}<div class="grand"><span>Σύνολο</span><b>${money(tot)}</b></div>`;
    $("#coBtn").textContent = "Ολοκλήρωση παραγγελίας · " + money(tot);
    $("#cardBox").style.display = pay === "card" ? "" : "none";
    $("#boxNowPick").style.display = ship === "boxnow" ? "" : "none";
    $("#addrBox").style.display = CFG.ships.find(x => x.k === ship).pickup ? "none" : "";
    if ($("#country")) { const cy = ship === "cy"; $("#country").value = cy ? "Κύπρος" : "Ελλάδα"; }
  }
  window.SHOP_onCart = sum;
  root.addEventListener("change", e => { if (e.target.name === "ship") ship = e.target.value; if (e.target.name === "pay") pay = e.target.value; sum(); });
  $("#cpBtn").onclick = () => { const v = $("#cp").value.trim().toUpperCase(); const c = CFG.coupons.find(x => x.code === v);
    $("#cpMsg").textContent = c ? `✓ ${c.t}` : "Ο κωδικός δεν ισχύει"; $("#cpMsg").className = "cp-msg " + (c ? "ok" : "bad"); coupon = c || null; sum(); };
  $("#coForm").onsubmit = e => {
    e.preventDefault();
    if (!cart.length) { toast("Το καλάθι είναι άδειο"); return; }
    const bad = $$("#coForm [required]").filter(x => x.offsetParent !== null && !x.value.trim());
    $$("#coForm .bad").forEach(x => x.classList.remove("bad")); bad.forEach(x => x.classList.add("bad"));
    if (bad.length) { bad[0].focus(); toast("Συμπλήρωσε τα πεδία με κόκκινο"); return; }
    const no = CFG.orderPrefix + "-" + String(Date.now()).slice(-5);
    const email = $("#email").value;
    cart = []; save();
    root.innerHTML = `<div class="done rv in"><div class="done-ic">✓</div><h1>Ευχαριστούμε για την παραγγελία!</h1><p class="lead">Αριθμός παραγγελίας <b>${no}</b>. Στείλαμε επιβεβαίωση στο <b>${esc(email)}</b>.</p><p class="small">${CFG.doneNote}</p><p class="small muted">(demo — δεν καταχωρήθηκε ούτε στάλθηκε τίποτα)</p><a class="btn btn-acc" href="shop.html">Συνέχεια αγορών</a></div>`;
    scrollTo({top: 0, behavior: "smooth"});
  };
  sum();
}

/* ---------- forms on about/home ---------- */
$$("form[data-demo]").forEach(f => f.onsubmit = e => { e.preventDefault(); const o = $(".form-ok", f); if (o) { o.innerHTML = f.dataset.demo; o.classList.add("on"); } f.reset(); });

window.SHOP = {P, CFG, money, card, add, openCart: openDr, watch, lightbox, byId, toast};
paint(); shopPage(); productPage(); checkoutPage();
if (window.SHOP_init) window.SHOP_init();
watch(document);
})();
