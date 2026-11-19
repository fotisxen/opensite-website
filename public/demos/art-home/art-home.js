/* aRt home · OpenSite demo · shared header/footer/cart */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const IG = "https://www.instagram.com/art_home_larissa/", TEL = "+302413016913", TELV = "2413 016913", ADDR = "Λάρισα";
const UNIQUE = false;

const P = [
 {
  "id": "a1",
  "nm": "Διακοσμητικές προτομές με μπαλόνι",
  "br": "aRt home",
  "cat": "Διακοσμητικά",
  "pr": 34,
  "old": 0,
  "img": "img/p2.jpg",
  "tag": "Best seller",
  "sz": [
   "Σετ 2 τεμ."
  ],
  "out": []
 },
 {
  "id": "a2",
  "nm": "Διακοσμητικά βιβλία-κουτιά",
  "br": "aRt home",
  "cat": "Διακοσμητικά",
  "pr": 28,
  "old": 0,
  "img": "img/p1.jpg",
  "tag": "Νέο",
  "sz": [
   "Σετ 2 τεμ."
  ],
  "out": []
 },
 {
  "id": "a3",
  "nm": "Βάζο κεραμικό",
  "br": "aRt home",
  "cat": "Διακοσμητικά",
  "pr": 22,
  "old": 0,
  "img": "img/p3.jpg",
  "tag": "",
  "sz": [
   "Μικρό",
   "Μεγάλο"
  ],
  "out": []
 },
 {
  "id": "a4",
  "nm": "Επιτραπέζιο φωτιστικό",
  "br": "aRt home",
  "cat": "Φωτιστικά",
  "pr": 46,
  "old": 0,
  "img": "img/p4.jpg",
  "tag": "",
  "sz": [
   "One size"
  ],
  "out": []
 },
 {
  "id": "a5",
  "nm": "Αρωματικό κερί σόγιας",
  "br": "aRt home",
  "cat": "Κεριά",
  "pr": 14,
  "old": 0,
  "img": "img/p5.jpg",
  "tag": "Νέο",
  "sz": [
   "180g",
   "350g"
  ],
  "out": []
 },
 {
  "id": "a6",
  "nm": "Αρωματικό χώρου με sticks",
  "br": "aRt home",
  "cat": "Κεριά",
  "pr": 18,
  "old": 23,
  "img": "img/p6.jpg",
  "tag": "Προσφορά",
  "sz": [
   "100ml",
   "200ml"
  ],
  "out": []
 },
 {
  "id": "a7",
  "nm": "Κορνίζα με πασπαρτού",
  "br": "aRt home",
  "cat": "Δώρα",
  "pr": 16,
  "old": 0,
  "img": "img/p7.jpg",
  "tag": "",
  "sz": [
   "13×18",
   "20×30"
  ],
  "out": []
 },
 {
  "id": "a8",
  "nm": "Σετ δώρου «Καλωσόρισμα»",
  "br": "aRt home",
  "cat": "Δώρα",
  "pr": 39,
  "old": 0,
  "img": "img/p8.jpg",
  "tag": "Δώρο",
  "sz": [
   "One size"
  ],
  "out": []
 }
];
window.SHOP_P = P;

const NAV = [["shop.html","Κατάστημα","shop"],["seasons.html","Εποχές","seasons"],["gifts.html","Βρες το δώρο","gifts"],["contact.html","Επικοινωνία","contact"]];
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html"><b>aRt home</b><small>διακόσμηση · δώρα · Λάρισα</small></a>
  <nav class="nav">${NAV.map(([h,t,k])=>`<a href="${h}" class="${k===page?"on":""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta">
    <button class="cart-btn" id="cartBtn">Καλάθι <i id="cartN">0</i></button>
    <button class="burger" id="burger" aria-label="Μενού"><span></span><span></span></button>
  </div>
</div></header>
<div class="mmenu" id="mmenu"><button class="x" id="mx" aria-label="Κλείσιμο">×</button><div class="wrap">
  <a href="demo.html">Αρχική</a>${NAV.map(([h,t])=>`<a href="${h}">${t}</a>`).join("")}
  <p class="small" style="margin-top:26px">${ADDR}</p>
</div></div>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div><p class="h3" style="color:#fff">Διακόσμηση σπιτιού &amp; <em>είδη δώρων</em>.</p>
      <p class="small" style="color:#bdb6ab;margin-top:12px">Διακόσμηση σπιτιού και είδη δώρων στη Λάρισα. Χριστούγεννα, Πάσχα και κάθε μέρα ενδιάμεσα.</p></div>
    <div><h4>Κατάστημα</h4><ul><li><a href="shop.html?c=Διακοσμητικά">Διακοσμητικά</a></li><li><a href="shop.html?c=Φωτιστικά">Φωτιστικά</a></li><li><a href="shop.html?c=Κεριά">Κεριά & αρώματα</a></li><li><a href="shop.html?c=Δώρα">Δώρα</a></li></ul></div>
    <div><h4>Πληροφορίες</h4><ul>${NAV.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="${IG}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul><li>${ADDR}</li><li><a href="tel:${TEL}">${TELV}</a></li></ul></div>
  </div>
  <div class="big">aRt home</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} aRt home</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Καλάθι">
  <div class="dr-head"><p class="h3">Το καλάθι σου</p><button id="drX" style="font-size:28px;line-height:1">×</button></div>
  <div class="dr-body" id="drBody"></div>
  <div class="dr-foot">
    <div class="tot"><span>Σύνολο</span><b id="drTot">0 €</b></div>
    <button class="btn btn-ink" id="drGo">Ολοκλήρωση παραγγελίας</button>
    <div class="okbox" id="drOk"></div>
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

let cart = [];
try { cart = JSON.parse(localStorage.getItem("ah-cart") || "[]"); } catch(e) {}
const money = n => (Math.round(n*100)/100).toString().replace(".", ",") + " €";
window.SHOP_money = money;
function save(){ try{ localStorage.setItem("ah-cart", JSON.stringify(cart)); }catch(e){} paintCart(); }
function paintCart(){
  const n = cart.reduce((s,i)=>s+i.q,0);
  $("#cartN").textContent = n; $("#cartBtn").classList.toggle("has", n>0);
  $("#drBody").innerHTML = cart.length ? cart.map((i,ix)=>`
    <div class="ci"><img src="${i.img}" alt=""><div><b>${i.nm}</b><span class="m">${i.br} · ${i.sz}</span>
      <span class="m">${i.q} × ${money(i.pr)}</span></div><button class="rm" data-i="${ix}" aria-label="Αφαίρεση">×</button></div>`).join("")
    : '<p class="empty">Το καλάθι είναι άδειο.<br><span class="small">Διάλεξε κάτι από το κατάστημα.</span></p>';
  $$("#drBody .rm").forEach(x => x.onclick = () => { cart.splice(+x.dataset.i,1); save(); });
  $("#drTot").textContent = money(cart.reduce((s,i)=>s+i.pr*i.q,0));
}
window.ShopAdd = (p, sz) => { const k = cart.find(i=>i.id===p.id && i.sz===sz);
  if(k && !UNIQUE) k.q++; else if(!k) cart.push({id:p.id,nm:p.nm,br:p.br,pr:p.pr,img:p.img,sz,q:1}); save(); openDr(); };
const openDr = () => { $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
$("#cartBtn").onclick = openDr; $("#drX").onclick = closeDr; $("#scrim").onclick = closeDr;
$("#drGo").onclick = () => { const o = $("#drOk");
  if(!cart.length){ o.textContent = "Το καλάθι είναι άδειο."; o.classList.add("on"); return; }
  o.innerHTML = "✓ Η παραγγελία καταχωρήθηκε. Θα λάβεις επιβεβαίωση.<br><span class='small'>(demo — δεν στέλνεται τίποτα)</span>";
  o.classList.add("on"); };
paintCart();

window.ShopCard = p => `
<article class="prod" data-cat="${p.cat}" data-id="${p.id}">
  <div class="ph-img"><img src="${p.img}" alt="${p.nm}" loading="lazy">${p.tag?`<span class="tag ${p.old?"sale":""}">${p.tag}</span>`:""}</div>
  <div class="body">
    <span class="br">${p.br}</span><h3 class="nm">${p.nm}</h3>
    <div class="sizes">${p.sz.map((s,i)=>`<button type="button" data-sz="${s}" ${p.out.includes(s)?"disabled":""} ${i===0&&!p.out.includes(s)?'aria-pressed="true"':""}>${s}</button>`).join("")}</div>
    <div class="pr"><b>${money(p.pr)}</b>${p.old?`<s>${money(p.old)}</s>`:""}</div>
    <button class="add" type="button">${UNIQUE?"Το θέλω":"Στο καλάθι"}</button>
  </div>
</article>`;
window.ShopBind = root => {
  $$(".prod", root).forEach(el => {
    const p = P.find(x=>x.id===el.dataset.id);
    $$(".sizes button", el).forEach(b => b.onclick = () => { if(b.disabled) return;
      $$(".sizes button", el).forEach(x=>x.setAttribute("aria-pressed", x===b)); });
    $(".add", el).onclick = () => {
      const s = $(".sizes button[aria-pressed=true]", el);
      if(!s){ alert("Διάλεξε μέγεθος"); return; }
      ShopAdd(p, s.dataset.sz);
      const a = $(".add", el); a.textContent = "✓ Προστέθηκε"; a.classList.add("done");
      setTimeout(()=>{ a.textContent = UNIQUE?"Το θέλω":"Στο καλάθι"; a.classList.remove("done"); }, 1400);
    };
  });
};

let imgs = [], li = 0;
window.ShopLightbox = sel => { imgs = $$(sel).map(i=>i.src); $$(sel).forEach((im,i)=> { im.style.cursor="zoom-in"; im.onclick = () => showLb(i); }); };
function showLb(i){ if(!imgs.length) return; li=(i+imgs.length)%imgs.length; $("#lbI").src=imgs[li]; $("#lb").classList.add("on"); }
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li+1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li-1); };
$("#lb").onclick = e => { if(e.target.id==="lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => { if(e.key==="Escape"){ $("#lb").classList.remove("on"); closeDr(); }
  if($("#lb").classList.contains("on")){ if(e.key==="ArrowRight") showLb(li+1); if(e.key==="ArrowLeft") showLb(li-1); } });

$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes");
  try{ localStorage.setItem("ah-notes", on?"on":"off"); }catch(e){} };
})();
