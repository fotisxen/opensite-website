/* Vicolo Boutique · OpenSite demo · shared header/footer/cart (load after the page body) */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const IG = "https://www.instagram.com/vicolo.boutique/";
const TEL = "+302310244510", TELV = "2310 244510";
const ADDR = "Προξένου Κορομηλά 31, 546 22 Θεσσαλονίκη";

/* ---------- catalogue (δείγμα· οι τιμές είναι ενδεικτικές) ---------- */
const P = [
  {id:"v1", nm:"Μάλλινο παλτό oversize", br:"Milano", cat:"Πανωφόρια", pr:245, old:0, img:"img/p4.jpg", tag:"FW26", sz:["S","M","L"], out:["L"]},
  {id:"v2", nm:"Πλεκτή ζακέτα με κουμπιά", br:"Firenze", cat:"Πλεκτά", pr:118, old:0, img:"img/p1.jpg", tag:"Νέο", sz:["XS","S","M","L"], out:[]},
  {id:"v3", nm:"Παντελόνι με τσάκιση", br:"Milano", cat:"Παντελόνια", pr:96, old:0, img:"img/p2.jpg", tag:"", sz:["S","M","L"], out:["S"]},
  {id:"v4", nm:"Μποτάκι δερμάτινο", br:"Bologna", cat:"Παπούτσια", pr:168, old:198, img:"img/p3.jpg", tag:"Προσφορά", sz:["37","38","39","40"], out:["37"]},
  {id:"v5", nm:"Φόρεμα midi σατέν", br:"Roma", cat:"Φορέματα", pr:139, old:0, img:"img/p5.jpg", tag:"", sz:["XS","S","M"], out:[]},
  {id:"v6", nm:"Τσάντα ώμου δέρμα", br:"Firenze", cat:"Αξεσουάρ", pr:189, old:0, img:"img/p6.jpg", tag:"Νέο", sz:["One size"], out:[]},
  {id:"v7", nm:"Πουκάμισο ποπλίνα", br:"Milano", cat:"Πουκάμισα", pr:84, old:0, img:"img/p7.jpg", tag:"", sz:["XS","S","M","L"], out:[]},
  {id:"v8", nm:"Κασκόλ μαλλί & κασμίρι", br:"Roma", cat:"Αξεσουάρ", pr:62, old:78, img:"img/p8.jpg", tag:"Προσφορά", sz:["One size"], out:[]}
];
window.VICOLO_P = P;

/* ---------- navigation ---------- */
const NAV = [["shop.html","Κατάστημα","shop"],["lookbook.html","Lookbook","lookbook"],["about.html","Η Vicolo","about"],["visit.html","Επισκεφθείτε μας","visit"]];
document.body.insertAdjacentHTML("afterbegin", `
<header class="hdr" id="hdr"><div class="wrap">
  <a class="brand" href="demo.html"><b>VICOLO</b><small>Boutique · Thessaloniki</small></a>
  <nav class="nav">${NAV.map(([h,t,k])=>`<a href="${h}" class="${k===page?"on":""}">${t}</a>`).join("")}</nav>
  <div class="hdr-cta">
    <button class="cart-btn" id="cartBtn">Καλάθι <i id="cartN">0</i></button>
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
    <div>
      <p class="h3" style="color:#fff">Unique selections of <em style="color:var(--gold2)">Italian</em> women's clothing.</p>
      <p class="small" style="color:#bdb6ab;margin-top:12px">Στο κέντρο της Θεσσαλονίκης, στην Προξένου Κορομηλά. Νέες παραλαβές κάθε εβδομάδα.</p>
    </div>
    <div><h4>Κατάστημα</h4><ul>
      <li><a href="shop.html">Όλα τα είδη</a></li><li><a href="shop.html?c=Πανωφόρια">Πανωφόρια</a></li>
      <li><a href="shop.html?c=Φορέματα">Φορέματα</a></li><li><a href="shop.html?c=Αξεσουάρ">Αξεσουάρ</a></li></ul></div>
    <div><h4>Vicolo</h4><ul>
      <li><a href="about.html">Η ιστορία μας</a></li><li><a href="lookbook.html">Lookbook</a></li>
      <li><a href="visit.html">Επισκεφθείτε μας</a></li><li><a href="${IG}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
    <div><h4>Επικοινωνία</h4><ul>
      <li>${ADDR}</li><li><a href="tel:${TEL}">${TELV}</a></li>
      <li class="ph" data-note="Βάλε το ωράριο του καταστήματος">Δευ–Σάβ 10:00–21:00</li></ul></div>
  </div>
  <div class="big">VICOLO</div>
  <div class="foot-bottom"><span>© ${new Date().getFullYear()} Vicolo Boutique · Θεσσαλονίκη</span><span>Demo από <a href="https://opensite.gr" target="_blank" rel="noopener">OpenSite</a></span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Καλάθι">
  <div class="dr-head"><p class="h3">Το καλάθι σου</p><button id="drX" style="font-size:28px;line-height:1">×</button></div>
  <div class="dr-body" id="drBody"></div>
  <div class="dr-foot">
    <div class="tot"><span>Σύνολο</span><b id="drTot">0 €</b></div>
    <button class="btn btn-ink" id="drGo">Ολοκλήρωση παραγγελίας</button>
    <p class="small" style="margin-top:10px;text-align:center" class="ph">Δωρεάν αποστολή από 80 €</p>
    <div class="okbox" id="drOk"></div>
  </div>
</aside>
<div class="lb" id="lb"><button id="lbX">×</button><button class="nav-b pv" id="lbP">‹</button><img id="lbI" alt=""><button class="nav-b" id="lbN" style="right:18px">›</button></div>
<button class="notes-toggle" id="notesToggle" type="button">Σημειώσεις</button>`);

/* ---------- header behaviour ---------- */
const hdr = $("#hdr");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 30), {passive:true});
hdr.classList.toggle("solid", scrollY > 30);
$("#burger").onclick = () => $("#mmenu").classList.add("on");
$("#mx").onclick = () => $("#mmenu").classList.remove("on");

/* ---------- reveal ---------- */
const io = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add("in")), {threshold:.12});
$$(".rv").forEach(e => io.observe(e));

/* ---------- cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("vc-cart") || "[]"); } catch(e) {}
const money = n => (Math.round(n*100)/100).toString().replace(".", ",") + " €";
function save(){ try{ localStorage.setItem("vc-cart", JSON.stringify(cart)); }catch(e){} paintCart(); }
function paintCart(){
  const n = cart.reduce((s,i)=>s+i.q,0);
  $("#cartN").textContent = n; $("#cartBtn").classList.toggle("has", n>0);
  const b = $("#drBody");
  b.innerHTML = cart.length ? cart.map((i,ix)=>`
    <div class="ci"><img src="${i.img}" alt=""><div><b>${i.nm}</b><span class="m">${i.br} · μέγεθος ${i.sz}</span>
      <span class="m">${i.q} × ${money(i.pr)}</span></div><button class="rm" data-i="${ix}" aria-label="Αφαίρεση">×</button></div>`).join("")
    : '<p class="empty">Το καλάθι είναι άδειο.<br><span class="small">Διάλεξε κάτι από το κατάστημα.</span></p>';
  $$("#drBody .rm").forEach(x => x.onclick = () => { cart.splice(+x.dataset.i,1); save(); });
  $("#drTot").textContent = money(cart.reduce((s,i)=>s+i.pr*i.q,0));
}
window.VicoloAdd = (p, sz) => { const k = cart.find(i=>i.id===p.id && i.sz===sz);
  if(k) k.q++; else cart.push({id:p.id,nm:p.nm,br:p.br,pr:p.pr,img:p.img,sz,q:1}); save(); openDr(); };
const openDr = () => { $("#drawer").classList.add("on"); $("#scrim").classList.add("on"); };
const closeDr = () => { $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on"); };
$("#cartBtn").onclick = openDr; $("#drX").onclick = closeDr; $("#scrim").onclick = closeDr;
$("#drGo").onclick = () => { const o = $("#drOk");
  if(!cart.length){ o.textContent = "Το καλάθι είναι άδειο."; o.classList.add("on"); return; }
  o.innerHTML = "✓ Η παραγγελία καταχωρήθηκε. Θα λάβεις email επιβεβαίωσης.<br><span class='small'>(demo — δεν στέλνεται τίποτα)</span>";
  o.classList.add("on"); };
paintCart();

/* ---------- product card renderer ---------- */
window.VicoloCard = p => `
<article class="prod" data-cat="${p.cat}" data-id="${p.id}">
  <div class="ph-img"><img src="${p.img}" alt="${p.nm}" loading="lazy">${p.tag?`<span class="tag ${p.old?"sale":""}">${p.tag}</span>`:""}</div>
  <div class="body">
    <span class="br">${p.br}</span><h3 class="nm">${p.nm}</h3>
    <div class="sizes">${p.sz.map((s,i)=>`<button type="button" data-sz="${s}" ${p.out.includes(s)?"disabled":""} ${i===0&&!p.out.includes(s)?'aria-pressed="true"':""}>${s}</button>`).join("")}</div>
    <div class="pr"><b>${money(p.pr)}</b>${p.old?`<s>${money(p.old)}</s>`:""}</div>
    <button class="add" type="button">Στο καλάθι</button>
  </div>
</article>`;
window.VicoloBind = root => {
  $$(".prod", root).forEach(el => {
    const p = P.find(x=>x.id===el.dataset.id);
    $$(".sizes button", el).forEach(b => b.onclick = () => { if(b.disabled) return;
      $$(".sizes button", el).forEach(x=>x.setAttribute("aria-pressed", x===b)); });
    $(".add", el).onclick = () => {
      const s = $(".sizes button[aria-pressed=true]", el);
      if(!s){ alert("Διάλεξε μέγεθος"); return; }
      VicoloAdd(p, s.dataset.sz);
      const a = $(".add", el); a.textContent = "✓ Προστέθηκε"; a.classList.add("done");
      setTimeout(()=>{ a.textContent = "Στο καλάθι"; a.classList.remove("done"); }, 1400);
    };
  });
};

/* ---------- lightbox ---------- */
let imgs = [], li = 0;
window.VicoloLightbox = sel => { imgs = $$(sel).map(i=>i.src);
  $$(sel).forEach((im,i)=> im.closest("button,a,figure,div").style.cursor="zoom-in");
  $$(sel).forEach((im,i)=> im.onclick = () => showLb(i)); };
function showLb(i){ if(!imgs.length) return; li=(i+imgs.length)%imgs.length; $("#lbI").src=imgs[li]; $("#lb").classList.add("on"); }
$("#lbX").onclick = () => $("#lb").classList.remove("on");
$("#lbN").onclick = e => { e.stopPropagation(); showLb(li+1); };
$("#lbP").onclick = e => { e.stopPropagation(); showLb(li-1); };
$("#lb").onclick = e => { if(e.target.id==="lb") $("#lb").classList.remove("on"); };
addEventListener("keydown", e => { if($("#lb").classList.contains("on")){
  if(e.key==="Escape") $("#lb").classList.remove("on"); if(e.key==="ArrowRight") showLb(li+1); if(e.key==="ArrowLeft") showLb(li-1); }
  if(e.key==="Escape") closeDr(); });

/* ---------- notes ---------- */
$("#notesToggle").onclick = () => { const on = document.documentElement.classList.toggle("notes");
  try{ localStorage.setItem("vc-notes", on?"on":"off"); }catch(e){} };
})();
