/* DM style · OpenSite demo · shared header/footer/cart */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const IG = "https://www.instagram.com/dmaria.style/", TEL = "+302108065420", TELV = "210 8065420", ADDR = "Δήμητρος 6, Μαρούσι 151 24";

const P = [
 {
  "id": "d1",
  "nm": "Σακάκι δομημένο",
  "br": "DM style",
  "cat": "Σακάκια",
  "pr": 78,
  "old": 0,
  "img": "img/p4.jpg",
  "tag": "Νέο",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": []
 },
 {
  "id": "d2",
  "nm": "Σακάκι oversize",
  "br": "DM style",
  "cat": "Σακάκια",
  "pr": 84,
  "old": 0,
  "img": "img/p5.jpg",
  "tag": "",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": [
   "S"
  ]
 },
 {
  "id": "d3",
  "nm": "Φόρεμα εμπριμέ μάξι",
  "br": "DM style",
  "cat": "Φορέματα",
  "pr": 69,
  "old": 0,
  "img": "img/p1.jpg",
  "tag": "Best seller",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": []
 },
 {
  "id": "d4",
  "nm": "Φόρεμα ριγέ",
  "br": "DM style",
  "cat": "Φορέματα",
  "pr": 62,
  "old": 78,
  "img": "img/p2.jpg",
  "tag": "Προσφορά",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": []
 },
 {
  "id": "d5",
  "nm": "Τοπ σατέν",
  "br": "DM style",
  "cat": "Τοπ",
  "pr": 38,
  "old": 0,
  "img": "img/p6.jpg",
  "tag": "",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": []
 },
 {
  "id": "d6",
  "nm": "Πλεκτό ζιβάγκο",
  "br": "DM style",
  "cat": "Τοπ",
  "pr": 44,
  "old": 0,
  "img": "img/p7.jpg",
  "tag": "Νέο",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": []
 },
 {
  "id": "d7",
  "nm": "Παντελόνι με τσάκιση",
  "br": "DM style",
  "cat": "Παντελόνια",
  "pr": 54,
  "old": 0,
  "img": "img/p8.jpg",
  "tag": "",
  "sz": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "out": []
 },
 {
  "id": "d8",
  "nm": "Παντελόνι wide leg",
  "br": "DM style",
  "cat": "Παντελόνια",
  "pr": 56,
  "old": 0,
  "img": "img/p3.jpg",
  "tag": "",
  "sz": [
   "S",
   "M",
   "L"
  ],
  "out": [
   "L"
  ]
 }
];
window.SHOP_P = P;

const NAV = [["shop.html","Κατάστημα","shop"],["showcase.html","Showcase","showcase"],["about.html","Η DM style","about"],["contact.html","Επικοινωνία","contact"]];
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html"><b>DM style</b><small>boutique · Μαρούσι</small></a>
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
    <div><p class="h3" style="color:#fff">Γυναικεία ρούχα με εκλεπτυσμένο στυλ και <em>κομψότητα</em>.</p>
      <p class="small" style="color:#bdb6ab;margin-top:12px">Boutique στο Μαρούσι, Δήμητρος 6. Αποστολές σε όλη την Ελλάδα με BOX NOW.</p></div>
    <div><h4>Κατάστημα</h4><ul><li><a href="shop.html?c=Σακάκια">Σακάκια</a></li><li><a href="shop.html?c=Φορέματα">Φορέματα</a></li><li><a href="shop.html?c=Τοπ">Τοπ</a></li><li><a href="shop.html?c=Παντελόνια">Παντελόνια</a></li></ul></div>
    <div><h4>Πληροφορίες</h4><ul>${NAV.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="${IG}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul><li>${ADDR}</li><li><a href="tel:${TEL}">${TELV}</a></li></ul></div>
  </div>
  <div class="big">DM style</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} DM style</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
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
try { cart = JSON.parse(localStorage.getItem("dm-cart") || "[]"); } catch(e) {}
const money = n => (Math.round(n*100)/100).toString().replace(".", ",") + " €";
window.SHOP_money = money;
window.SHOP_cart = () => cart;
function save(){ try{ localStorage.setItem("dm-cart", JSON.stringify(cart)); }catch(e){} paintCart(); }
window.SHOP_save = save;
function paintCart(){
  const n = cart.reduce((s,i)=>s+i.q,0);
  $("#cartN").textContent = n; $("#cartBtn").classList.toggle("has", n>0);
  $("#drBody").innerHTML = cart.length ? cart.map((i,ix)=>`
    <div class="ci"><img src="${i.img}" alt=""><div><b>${i.nm}</b><span class="m">${i.br} · ${i.sz}</span>
      <span class="m">${i.q} × ${money(i.pr)}</span></div><button class="rm" data-i="${ix}" aria-label="Αφαίρεση">×</button></div>`).join("")
    : '<p class="empty">Το καλάθι είναι άδειο.<br><span class="small">Διάλεξε κάτι από το κατάστημα.</span></p>';
  $$("#drBody .rm").forEach(x => x.onclick = () => { cart.splice(+x.dataset.i,1); save(); });
  $("#drTot").textContent = money(cart.reduce((s,i)=>s+i.pr*i.q,0));
  if(window.SHOP_onCart) window.SHOP_onCart(cart);
}
window.ShopAdd = (p, sz) => { const k = cart.find(i=>i.id===p.id && i.sz===sz);
  if(k) k.q++; else cart.push({id:p.id,nm:p.nm,br:p.br,pr:p.pr,img:p.img,sz,q:1}); save(); openDr(); };
const openDr = () => { $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
window.ShopOpenCart = openDr;
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
    <button class="add" type="button">Στο καλάθι</button>
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
      setTimeout(()=>{ a.textContent = "Στο καλάθι"; a.classList.remove("done"); }, 1400);
    };
  });
};

let imgs = [], li = 0;
window.ShopLightbox = sel => { imgs = $$(sel).map(i=>i.src); $$(sel).forEach((im,i)=>{ im.style.cursor="zoom-in"; im.onclick = () => showLb(i); }); };
function showLb(i){ if(!imgs.length) return; li=(i+imgs.length)%imgs.length; $("#lbI").src=imgs[li]; $("#lb").classList.add("on"); }
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li+1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li-1); };
$("#lb").onclick = e => { if(e.target.id==="lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => { if(e.key==="Escape"){ $("#lb").classList.remove("on"); closeDr(); }
  if($("#lb").classList.contains("on")){ if(e.key==="ArrowRight") showLb(li+1); if(e.key==="ArrowLeft") showLb(li-1); } });

$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes");
  try{ localStorage.setItem("dm-notes", on?"on":"off"); }catch(e){} };
})();
