// Builds the ICS Real Estate demo (propertiesforsaleingreece.com redesign) into public/demos/ics-properties/.
// Run: node scripts/demos/ics-props/build.cjs   ·   listings: props.json (snapshot of the live site, Nov 2026)
// Every listing gets its own static page (good for Google). Enquiries go to the ICS CRM demo inbox.
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "../../../public/demos/ics-properties");
const RAW = require("./props.json");
const SITE = "https://propertiesforsaleingreece.com";

const ea = s => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const eh = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
const t = (a, tag = "span", at = "") => `<${tag}${at ? " " + at : ""} data-el="${ea(a[1])}" data-fr="${ea(a[2] ?? a[0])}">${eh(a[0])}</${tag}>`;

const TY = { "Apartment": ["Apartment", "Διαμέρισμα", "Appartement"], "Building": ["Building", "Κτίριο", "Immeuble"], "Buildings": ["Building", "Κτίριο", "Immeuble"], "Land Plots": ["Land plot", "Οικόπεδο", "Terrain"], "Building Lots": ["Building plot", "Οικόπεδο", "Terrain constructible"], "Land Parcel": ["Land parcel", "Αγροτεμάχιο", "Parcelle"], "Commercial": ["Commercial property", "Επαγγελματικός χώρος", "Local commercial"], "Detached Home": ["Detached house", "Μονοκατοικία", "Maison individuelle"], "2 Storey Building": ["Two-storey building", "Διώροφο κτίριο", "Immeuble de deux étages"], "Studio": ["Studio", "Στούντιο", "Studio"], "Maisonette": ["Maisonette", "Μεζονέτα", "Maisonnette"], "House & Villa": ["House / villa", "Κατοικία / βίλα", "Maison / villa"] };
const TG = { "Buildings": "Building", "Building Lots": "Land Plots", "Land Parcel": "Land Plots", "2 Storey Building": "Building", "Studio": "Apartment", "Maisonette": "House & Villa", "Detached Home": "House & Villa" };
const GROUPS = { "Apartment": ["Apartments & studios", "Διαμερίσματα", "Appartements"], "House & Villa": ["Houses & villas", "Μονοκατοικίες & βίλες", "Maisons & villas"], "Land Plots": ["Land & plots", "Οικόπεδα & αγροτεμάχια", "Terrains"], "Building": ["Buildings", "Κτίρια", "Immeubles"], "Commercial": ["Commercial", "Επαγγελματικά", "Commercial"] };
const CITY_EL = { Athens: "Αθήνα", Patras: "Πάτρα", Sparti: "Σπάρτη", Lefkada: "Λευκάδα", Laconia: "Λακωνία", Kalamata: "Καλαμάτα", Kiato: "Κιάτο", Loutraki: "Λουτράκι", Karystos: "Κάρυστος", Amykles: "Αμύκλες", Chaidari: "Χαϊδάρι", "Korfos Korinthos": "Κόρφος Κορινθίας", Lemnos: "Λήμνος", Rhodes: "Ρόδος", Larisa: "Λάρισα", Thiva: "Θήβα", "Xirokampi Laconia": "Ξηροκάμπι Λακωνίας", Glyfada: "Γλυφάδα", Gastouni: "Γαστούνη", Thessaloniki: "Θεσσαλονίκη", Chania: "Χανιά", Piraeus: "Πειραιάς", Argos: "Άργος", Serres: "Σέρρες", Messini: "Μεσσήνη", Amaliada: "Αμαλιάδα" };

const P = RAW.map(p0 => { const p = { ...p0, slug2: decodeURIComponent(p0.slug).normalize("NFKD").replace(/[^a-z0-9-]/gi, "").toLowerCase() };
  const st = p.status, sold = st.includes("Sold"), rented = st.includes("Rented"), rent = st.includes("For Rent") || rented;
  const type = p.type[0] || "Apartment", city = p.city[0] || "Athens", area = p.area[0] || "";
  const mode = sold || rented ? "sold" : rent ? "rent" : "buy";
  const ty = TY[type] || [type, type, type];
  const place = area && area !== city ? `${area}, ${city}` : city;
  const placeEl = area && area !== city ? `${area}, ${CITY_EL[city] || city}` : CITY_EL[city] || city;
  const verb = rent ? ["for rent", "προς ενοικίαση", "à louer"] : ["for sale", "προς πώληση", "à vendre"];
  return { ...p, sold, rented, rent, mode, type, tg: TG[type] || type, city, area, place, file: `property-${p.slug2}.html`,
    tt: [p.title, `${ty[1]} ${verb[1]} · ${placeEl}`, `${ty[2]} ${verb[2]} · ${place}`], tyl: ty,
    gal: [...new Set([p.img, ...(p.gal || [])].filter(Boolean))], noFee: /no broker(age)? fee/i.test(p.desc), hot: st.includes("Hot"), isNew: st.includes("New Listing"), offer: st.includes("Under Offer"), reduced: st.includes("Reduced Price") };
});
const fmtP = p => "€" + Number(p.price).toLocaleString("en-US") + (p.rent ? " / mo" : "");
const live = P.filter(p => p.mode !== "sold"), buy = P.filter(p => p.mode === "buy"), rent = P.filter(p => p.mode === "rent"), sold = P.filter(p => p.mode === "sold");
const cityCount = c => live.filter(p => p.city === c).length;

const badge = p => [p.sold && `<span class="bd sold">${t(["Sold", "Πουλήθηκε", "Vendu"])}</span>`, p.rented && `<span class="bd sold">${t(["Rented", "Ενοικιάστηκε", "Loué"])}</span>`, p.offer && `<span class="bd off">${t(["Under offer", "Υπό διαπραγμάτευση", "Sous offre"])}</span>`, p.hot && !p.sold && `<span class="bd hot">${t(["Hot", "Ζήτηση", "Populaire"])}</span>`, p.isNew && `<span class="bd new">${t(["New", "Νέο", "Nouveau"])}</span>`, p.reduced && `<span class="bd red">${t(["Price reduced", "Μειωμένη τιμή", "Prix réduit"])}</span>`].filter(Boolean).join("");
const facts = p => [p.size && `${p.size} m²`, +p.beds && `🛏 ${p.beds}`, +p.baths && `🛁 ${p.baths}`, p.land && +p.land > 0 && p.tg !== "Land Plots" && `⛶ ${p.land} m²`].filter(Boolean).map(x => `<span>${x}</span>`).join("");
const card = p => `<a class="card pc${p.mode === "sold" ? " is-sold" : ""}" href="${p.file}" data-id="${p.id}" data-city="${ea(p.city)}" data-type="${ea(p.tg)}" data-price="${p.price}" data-beds="${+p.beds || 0}" data-size="${parseFloat(p.size) || 0}" data-date="${p.date}" data-s="${ea((p.title + " " + p.place + " " + p.desc.slice(0, 300)).toLowerCase())}">
 <div class="ph-img"><img src="${ea(p.img)}" alt="${ea(p.title)}" loading="lazy"><div class="badges">${badge(p)}</div><button class="fav" data-fav="${p.id}" aria-label="Save">♡</button></div>
 <div class="body"><div class="pr">${fmtP(p).replace(" / mo", `<small> / ${t(["month", "μήνα", "mois"])}</small>`)}</div>${t(p.tt, "h3")}<div class="loc">📍 ${eh(p.place)}</div><div class="facts">${facts(p) || `<span>${t(p.tyl)}</span>`}</div></div></a>`;

const NAV = [["buy.html", ["Buy", "Αγορά", "Acheter"]], ["rent.html", ["Rent", "Ενοικίαση", "Louer"]], ["sell.html", ["Sell / valuation", "Πώληση / εκτίμηση", "Vendre / évaluation"]], ["services.html", ["Services", "Υπηρεσίες", "Services"]], ["sold.html", ["Sold", "Πωλήθηκαν", "Vendus"]], ["about.html", ["About", "Εταιρεία", "À propos"]], ["contact.html", ["Contact", "Επικοινωνία", "Contact"]]];

function layout({ file, title, desc, body, ld = [], active = "", img = "" }) {
  const canon = `${SITE}/${file === "demo.html" ? "" : file.replace(/^property-/, "property/").replace(".html", "/")}`;
  const org = { "@context": "https://schema.org", "@type": "RealEstateAgent", name: "ICS Real Estate · Integrated Consulting Services", url: SITE, telephone: "+30-210-3230205", email: "athens@icsgr.com", address: { "@type": "PostalAddress", streetAddress: "233 Leof. Syggrou", addressLocality: "Nea Smyrni, Athens", postalCode: "17121", addressCountry: "GR" }, areaServed: "Greece", parentOrganization: { "@type": "Organization", name: "Integrated Consulting Services (ICS)", url: "https://www.icsgr.com" } };
  return `<!doctype html>
<html lang="en" class="notes">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow"><!-- demo only -->
<meta name="theme-color" content="#14201a">
${t(title, "title")}
<meta name="description" content="${ea(desc)}">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="website"><meta property="og:site_name" content="ICS Real Estate"><meta property="og:title" content="${ea(title[0])}"><meta property="og:description" content="${ea(desc)}">${img ? `<meta property="og:image" content="${ea(img)}">` : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=Noto+Serif+Display:ital,wght@0,300;1,300;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="props.css?v=1">
${[org, ...ld].map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
<!-- OpenSite redesign demo for ICS Real Estate (propertiesforsaleingreece.com). Listings, photos and texts from the live site (Nov 2026).
     Generated by scripts/demos/ics-props/build.cjs. Enquiries go to the ICS CRM demo (../ics-crm/). -->
<script src="../ics-crm/store.js?v=4"></script>
<script>(function(){var h=document.documentElement;try{var q=new URLSearchParams(location.search);if(q.has("clean")){h.classList.remove("notes");h.classList.add("clean");sessionStorage.setItem("ics-clean","1")}else if(sessionStorage.getItem("ics-clean")){h.classList.remove("notes");h.classList.add("clean")}}catch(e){}})();</script>
</head>
<body>
<header class="nav"><div class="wrap">
  <a class="logo" href="demo.html"><i>⌂</i><span>ICS Real Estate<small>${t(["Properties in Greece · since 2007", "Ακίνητα στην Ελλάδα · από το 2007", "Immobilier en Grèce · depuis 2007"])}</small></span></a>
  <nav class="nav-l">${NAV.map(([h, l]) => `<a href="${h}" class="${active === h ? "on" : ""}">${t(l)}</a>`).join("")}</nav>
  <div class="nav-r"><div class="lang"><button class="on" data-l="en">EN</button><button data-l="el">ΕΛ</button><button data-l="fr">FR</button></div>
    <a class="favl" href="buy.html?saved=1" title="Saved">♥ <b class="favn">0</b></a>
    <a class="btn lime s" href="sell.html">${t(["Free valuation", "Δωρεάν εκτίμηση", "Évaluation gratuite"])}</a><button class="burger" aria-label="Menu">☰</button></div>
</div></header>
<nav class="mnav">${NAV.map(([h, l]) => `<a href="${h}">${t(l)}</a>`).join("")}<a href="buy.html?saved=1">♥ ${t(["Saved", "Αποθηκευμένα", "Favoris"])} (<span class="favn">0</span>)</a><a href="../ics/demo.html">ICS · icsgr.com ↗</a></nav>
<main>${body}</main>
<footer><div class="wrap">
  <div class="fgrid">
    <div><a class="logo" href="demo.html" style="color:#fff"><i>⌂</i>ICS Real Estate</a><p style="margin-top:12px;max-width:34ch">${t(["Part of Integrated Consulting Services. Buying, selling, renting and managing property in Greece for owners at home and abroad.", "Μέλος της Integrated Consulting Services. Αγορά, πώληση, ενοικίαση και διαχείριση ακινήτων στην Ελλάδα, για ιδιοκτήτες στην Ελλάδα και στο εξωτερικό.", "Membre d’Integrated Consulting Services. Achat, vente, location et gestion de biens en Grèce, pour propriétaires d’ici et d’ailleurs."])}</p></div>
    <div><h4>${t(["Properties", "Ακίνητα", "Propriétés"])}</h4><a href="buy.html">${t(["For sale", "Προς πώληση", "À vendre"])}</a><a href="rent.html">${t(["For rent", "Προς ενοικίαση", "À louer"])}</a><a href="sold.html">${t(["Recently sold", "Πρόσφατες πωλήσεις", "Vendus récemment"])}</a><a href="sell.html">${t(["Sell with us", "Πουλήστε μαζί μας", "Vendre avec nous"])}</a></div>
    <div><h4>${t(["ICS group", "Όμιλος ICS", "Groupe ICS"])}</h4><a href="../ics/demo.html">icsgr.com ↗</a><a href="../ics/real-estate.html">${t(["Property management", "Διαχείριση ακινήτων", "Gestion immobilière"])}</a><a href="../ics/pricing.html#plans">${t(["Property Care plan", "Φροντίδα ακινήτου", "Entretien immobilier"])}</a><a href="../ics/portal.html">${t(["Client portal", "Πύλη πελατών", "Portail client"])}</a></div>
    <div><h4>${t(["Contact", "Επικοινωνία", "Contact"])}</h4><a href="tel:+302103230205">Athens +30 210 3230 205</a><a href="tel:+14163912286">Toronto +1 416 391 2286</a><a href="tel:+18664964539">${t(["Toll-free 1.866.496.4539", "Χωρίς χρέωση 1.866.496.4539", "Sans frais 1.866.496.4539"])}</a><a href="mailto:athens@icsgr.com">athens@icsgr.com</a></div>
  </div>
  <div class="fbot"><span>© <span class="yr"></span> Integrated Consulting Services</span><span>redesign demo by <a href="https://opensite.gr" style="color:var(--lime2)">OpenSite</a></span></div>
</div></footer>
<a class="staff" href="../ics-crm/demo.html" target="_blank">↗ ICS Workspace (CRM)</a>
<button class="notes-t" id="notesT">Notes</button>
<div class="toast" id="toast"></div>
<script src="props.js?v=1"></script>
</body>
</html>
`;
}

const kicker = a => t(a, "span", 'class="k"');
const h2 = (a, b) => `<h2>${t(a)} ${t(b, "em")}</h2>`;
const VOICES = [["Highly recommend Anastasios and his team! One stop shop for all your legal and business affairs in Greece.", "Angelo Georgoussis"], ["Honest and hardworking. Made a very complicated process overseas dealing with property, wills and the government much easier.", "Tom Maras"], ["The team at ICS are amazing. I’d like to thank the Toronto office and their Athens office for being on top of my files.", "Dimitrios Tsianos"]];
const SERV = [["🤝", ["Buying, selling & leasing", "Αγορά, πώληση & μίσθωση", "Achat, vente & location"], ["From the first viewing to the contract, signed with a power of attorney if you live abroad.", "Από την πρώτη επίσκεψη ως το συμβόλαιο, με πληρεξούσιο αν ζείτε στο εξωτερικό.", "De la première visite au contrat, par procuration si vous vivez à l’étranger."], [["Listing with photos & video", "Αγγελία με φωτογραφίες & βίντεο", "Annonce avec photos & vidéo"], ["Viewings in person or by video", "Επισκέψεις από κοντά ή με βίντεο", "Visites sur place ou par vidéo"], ["No broker fee for the buyer on many listings", "Χωρίς μεσιτικά για τον αγοραστή σε πολλά ακίνητα", "Sans frais pour l’acheteur sur plusieurs annonces"]]],
  ["📐", ["Property valuation", "Εκτίμηση ακινήτου", "Évaluation"], ["A written valuation based on recent sales in the area.", "Γραπτή εκτίμηση με βάση πρόσφατες πωλήσεις στην περιοχή.", "Une évaluation écrite fondée sur les ventes récentes du secteur."], [["Visit by our consultant", "Επίσκεψη συμβούλου", "Visite de notre conseillère"], ["Comparable sales", "Συγκριτικά στοιχεία", "Ventes comparables"], ["Free when you list with us", "Δωρεάν αν μας αναθέσετε", "Gratuite si vous nous confiez la vente"]]],
  ["🔧", ["Renovation & repairs", "Ανακαίνιση & επισκευές", "Rénovation & réparations"], ["Architects, engineers and craftsmen who bring an older home up to today’s standards.", "Αρχιτέκτονες, μηχανικοί και τεχνίτες που φέρνουν ένα παλιό σπίτι στα σημερινά δεδομένα.", "Architectes, ingénieurs et artisans pour remettre une maison ancienne aux normes."], [["Estimate and timeline in writing", "Προϋπολογισμός & χρονοδιάγραμμα γραπτώς", "Devis et calendrier écrits"], ["Photo updates while you are away", "Φωτογραφίες προόδου όσο λείπετε", "Photos d’avancement à distance"], ["Energy upgrades", "Ενεργειακή αναβάθμιση", "Rénovation énergétique"]]],
  ["🔑", ["Property management", "Διαχείριση ακινήτου", "Gestion locative"], ["Tenants, rent, bills and maintenance, handled while you live abroad.", "Ενοικιαστές, ενοίκια, λογαριασμοί και συντήρηση, όσο ζείτε στο εξωτερικό.", "Locataires, loyers, factures et entretien, pendant que vous vivez à l’étranger."], [["Tenant screening and contracts", "Έλεγχος ενοικιαστών και μισθωτήρια", "Sélection des locataires et baux"], ["Rent collected and transferred", "Είσπραξη και μεταφορά ενοικίου", "Loyers encaissés et transférés"], ["Monthly statement in your portal", "Μηνιαία κατάσταση στην πύλη σας", "Relevé mensuel dans votre portail"]]],
  ["🧾", ["Taxes for owners", "Φορολογικά ιδιοκτητών", "Fiscalité des propriétaires"], ["E9, ENFIA and rental income declared correctly, every year.", "Ε9, ΕΝΦΙΑ και δήλωση ενοικίων σωστά, κάθε χρόνο.", "E9, ENFIA et revenus locatifs bien déclarés, chaque année."], [["E9 corrections 2014–2026", "Διορθώσεις Ε9 2014–2026", "Corrections E9 2014–2026"], ["ENFIA instalments", "Δόσεις ΕΝΦΙΑ", "Versements ENFIA"], ["Tax clearance for sales", "Φορολογική ενημερότητα για πωλήσεις", "Attestation fiscale pour la vente"]]],
  ["🏛", ["Inheritance & legal", "Κληρονομιές & νομικά", "Successions & juridique"], ["Inherited a house? Our lawyers accept the inheritance and get it ready to sell.", "Κληρονομήσατε σπίτι; Οι δικηγόροι μας κάνουν την αποδοχή και το ετοιμάζουν για πώληση.", "Vous avez hérité d’une maison ? Nos avocats règlent la succession et la préparent à la vente."], [["Acceptance of inheritance", "Αποδοχή κληρονομιάς", "Acceptation de succession"], ["Cadastre & legalisation", "Κτηματολόγιο & τακτοποίηση", "Cadastre & régularisation"], ["Notary partners across Greece", "Συνεργάτες συμβολαιογράφοι σε όλη την Ελλάδα", "Notaires partenaires dans toute la Grèce"]]]];
const svcCards = n => `<div class="sv">${SERV.slice(0, n).map(([i, h, p, l]) => `<div class="card svc"><i>${i}</i>${t(h, "h3")}${t(p, "p")}<ul>${l.map(x => t(x, "li")).join("")}</ul></div>`).join("")}</div>`;
const voices = `<div class="voices">${VOICES.map(([q, w]) => `<div class="card vq"><p>“${eh(q)}”</p><b>${eh(w)}</b></div>`).join("")}</div>`;
const band = `<div class="band"><div>${t(["Own property in Greece?", "Έχετε ακίνητο στην Ελλάδα;", "Un bien en Grèce ?"], "h2")}${t(["Sell it, rent it or simply have it looked after. Get a free valuation, or choose the yearly Property Care plan from ICS.", "Πουλήστε το, νοικιάστε το ή απλώς αφήστε μας να το φροντίζουμε. Ζητήστε δωρεάν εκτίμηση ή διαλέξτε την ετήσια Φροντίδα ακινήτου της ICS.", "Vendez-le, louez-le ou confiez-nous son entretien. Évaluation gratuite ou abonnement annuel Entretien immobilier d’ICS."], "p")}</div><div class="acts"><a class="btn lime" href="sell.html">${t(["Free valuation", "Δωρεάν εκτίμηση", "Évaluation gratuite"])}</a><a class="btn w" href="../ics/pricing.html#plans">${t(["Property Care plan ↗", "Φροντίδα ακινήτου ↗", "Entretien immobilier ↗"])}</a></div></div>`;

const filterBar = list => {
  const cities = [...new Set(list.map(p => p.city))].sort(), types = [...new Set(list.map(p => p.tg))];
  return `<div class="card fbar"><input name="q" placeholder="Search area, street, keyword…" data-ph-el="Περιοχή, οδός, λέξη…" data-ph-fr="Secteur, rue, mot-clé…" aria-label="Search">
  <select name="city" aria-label="City">${t(["All cities", "Όλες οι πόλεις", "Toutes les villes"], "option", 'value=""')}${cities.map(c => `<option value="${ea(c)}">${eh(c)} (${list.filter(p => p.city === c).length})</option>`).join("")}</select>
  <select name="type" aria-label="Type">${t(["All types", "Όλοι οι τύποι", "Tous les types"], "option", 'value=""')}${types.map(c => `<option value="${ea(c)}">${eh((GROUPS[c] || [c])[0])}</option>`).join("")}</select>
  <select name="beds" aria-label="Bedrooms">${t(["Bedrooms", "Υπνοδωμάτια", "Chambres"], "option", 'value=""')}<option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select>
  <select name="max" aria-label="Max price">${t(["Max price", "Μέγιστη τιμή", "Prix max"], "option", 'value=""')}${(list[0] && list[0].rent ? [500, 700, 1000, 2000] : [50000, 100000, 150000, 250000, 500000, 1000000]).map(v => `<option value="${v}">€${v.toLocaleString("en-US")}</option>`).join("")}</select>
  <select name="sort" aria-label="Sort">${t(["Newest", "Νεότερα", "Plus récents"], "option", 'value="new"')}${t(["Price ↑", "Τιμή ↑", "Prix ↑"], "option", 'value="asc"')}${t(["Price ↓", "Τιμή ↓", "Prix ↓"], "option", 'value="desc"')}${t(["Largest", "Μεγαλύτερα", "Plus grands"], "option", 'value="size"')}</select></div>`;
};
function T3c(a) { return `<option hidden></option>` && eh(a[0]); } // option labels stay English (selects cannot hold spans)

/* ===== pages ===== */
const pages = {};
const hero = P.find(p => p.slug === "semi-detached-maisonette-in-vari-area") || live[0];
pages["demo.html"] = () => layout({ file: "demo.html", img: hero.img,
  title: ["Properties for sale & rent in Greece · ICS Real Estate", "Ακίνητα προς πώληση και ενοικίαση στην Ελλάδα · ICS Real Estate", "Propriétés à vendre et à louer en Grèce · ICS Real Estate"],
  desc: `${live.length} properties for sale and rent in Athens, the Peloponnese and the islands. Buy, sell, rent or have your property in Greece managed from abroad, with ICS.`,
  body: `
<section class="hero"><img class="bg" src="${ea(hero.img)}" alt="" fetchpriority="high"><div class="wrap">
  ${t(["ICS Real Estate · Greece", "ICS Real Estate · Ελλάδα", "ICS Immobilier · Grèce"], "span", 'class="k" style="color:#dfe6e1"')}
  <h1 style="margin-top:14px">${t(["Find your place", "Βρείτε το σπίτι σας"])} ${t(["in Greece.", "στην Ελλάδα.", "en Grèce."], "em")}</h1>
  ${t(["Homes, land and investment property in Athens, the Peloponnese and the islands, with lawyers, engineers and accountants on the same team. Buy, sell or rent from wherever you live.", "Σπίτια, οικόπεδα και επενδυτικά ακίνητα σε Αθήνα, Πελοπόννησο και νησιά, με δικηγόρους, μηχανικούς και λογιστές στην ίδια ομάδα. Αγοράστε, πουλήστε ή νοικιάστε από όπου κι αν ζείτε.", "Maisons, terrains et biens d’investissement à Athènes, dans le Péloponnèse et les îles, avec avocats, ingénieurs et comptables dans la même équipe. Achetez, vendez ou louez d’où que vous soyez."], "p")}
  <form class="search"><div class="tabs"><button type="button" class="on" data-m="buy">${t(["Buy", "Αγορά", "Acheter"])}</button><button type="button" data-m="rent">${t(["Rent", "Ενοικίαση", "Louer"])}</button></div>
    <select name="city" aria-label="City">${t(["All cities", "Όλες οι πόλεις", "Toutes les villes"], "option", 'value=""')}${[...new Set(live.map(p => p.city))].sort((a, b) => cityCount(b) - cityCount(a)).map(c => `<option value="${ea(c)}">${eh(c)} (${cityCount(c)})</option>`).join("")}</select>
    <select name="type" aria-label="Type">${t(["All types", "Όλοι οι τύποι", "Tous les types"], "option", 'value=""')}${Object.entries(GROUPS).map(([k, v]) => `<option value="${ea(k)}">${eh(v[0])}</option>`).join("")}</select>
    <select name="max" aria-label="Max price">${t(["Any price", "Οποιαδήποτε τιμή", "Tout prix"], "option", 'value=""')}${[100000, 200000, 300000, 500000, 1000000].map(v => `<option value="${v}">≤ €${v.toLocaleString("en-US")}</option>`).join("")}</select>
    <button class="btn">${t(["Search", "Αναζήτηση", "Rechercher"])}</button></form>
  <div class="hstats"><div><b>${live.length}</b>${t(["available now", "διαθέσιμα τώρα", "disponibles"])}</div><div><b>${sold.length}</b>${t(["sold & rented by us", "πουλήσαμε & νοικιάσαμε", "vendus et loués"])}</div><div><b>${new Set(P.map(p => p.city)).size}</b>${t(["cities across Greece", "πόλεις σε όλη την Ελλάδα", "villes en Grèce"])}</div></div>
</div></section>

<section><div class="wrap">
  ${kicker(["Featured", "Προτεινόμενα", "En vedette"])}${h2(["Hand-picked", "Επιλεγμένα"], ["this month.", "αυτόν τον μήνα.", "ce mois-ci."])}
  <div class="grid">${live.filter(p => p.featured).concat(live.filter(p => !p.featured && (p.hot || p.isNew))).slice(0, 6).map(card).join("")}</div>
  <div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="buy.html">${t([`All ${buy.length} properties for sale →`, `Και τα ${buy.length} ακίνητα προς πώληση →`, `Les ${buy.length} propriétés à vendre →`])}</a><a class="btn line" href="rent.html">${t(["For rent", "Προς ενοικίαση", "À louer"])}</a></div>
</div></section>

<section class="alt"><div class="wrap">
  ${kicker(["Browse by area", "Ανά περιοχή", "Par région"])}${h2(["From Athens", "Από την Αθήνα"], ["to the islands.", "ως τα νησιά.", "aux îles."])}
  <div class="cities">${[...new Set(live.map(p => p.city))].sort((a, b) => cityCount(b) - cityCount(a)).slice(0, 8).map(c => { const p = live.find(x => x.city === c); return `<a class="city" href="buy.html?city=${encodeURIComponent(c)}"><img src="${ea(p.img)}" alt="" loading="lazy"><span>${t([c, CITY_EL[c] || c, c])}<small>${cityCount(c)} ${t(["properties", "ακίνητα", "propriétés"])}</small></span></a>`; }).join("")}</div>
</div></section>

<section><div class="wrap">
  ${kicker(["Services", "Υπηρεσίες", "Services"])}${h2(["More than an agency.", "Κάτι παραπάνω από μεσιτικό."], ["A full team in Greece.", "Μια πλήρης ομάδα στην Ελλάδα.", "Une équipe complète en Grèce."])}
  ${svcCards(6)}
  <div style="margin-top:34px">${band}</div>
</div></section>

<section class="alt"><div class="wrap">
  ${kicker(["What clients say", "Τι λένε οι πελάτες", "Témoignages"])}${h2(["Trusted", "Εμπιστοσύνη"], ["on two continents.", "σε δύο ηπείρους.", "sur deux continents."])}${voices}
</div></section>

<section><div class="wrap">
  ${kicker(["From our blog", "Από το blog", "Du blogue"])}${h2(["Before you buy or sell,", "Πριν αγοράσετε ή πουλήσετε,"], ["read this.", "διαβάστε αυτό.", "lisez ceci."])}
  <div class="arts"><a class="card art" href="../ics/news-inheritance-law-2026.html"><small>${t(["News · Aug 2026", "Νέα · Αύγ 2026", "Nouvelles · août 2026"])}</small>${t(["New inheritance law: everything changing for wills, real estate, spouses, partners and debts", "Νέος κληρονομικός νόμος: τι αλλάζει σε διαθήκες, ακίνητα, συζύγους και χρέη", "Nouvelle loi successorale : ce qui change pour les testaments, les biens et les dettes"], "b")}${t(["Law 5303/2026 is the widest reform of Greek inheritance law in decades.", "Ο ν. 5303/2026 είναι η μεγαλύτερη αλλαγή του κληρονομικού δικαίου εδώ και δεκαετίες.", "La loi 5303/2026 est la plus vaste réforme depuis des décennies."], "p")}</a>
  <a class="card art" href="../ics/news.html"><small>${t(["Articles · Eleonora Lekka", "Άρθρα · Ελεονώρα Λέκκα", "Articles · Eleonora Lekka"])}</small>${t(["New apartments cost a fortune: steep increases in old apartments too", "Ακριβά τα νέα διαμερίσματα: μεγάλες αυξήσεις και στα παλιά", "Le neuf coûte une fortune : fortes hausses aussi dans l’ancien"], "b")}${t(["What the rise in Attica prices means if you plan to sell.", "Τι σημαίνει η άνοδος των τιμών στην Αττική αν σκέφτεστε να πουλήσετε.", "Ce que la hausse des prix en Attique signifie si vous vendez."], "p")}</a></div>
</div></section>` });

const listPage = (file, list, k, ha, hb, lead, title, desc) => layout({ file, active: file, title, desc,
  ld: [{ "@context": "https://schema.org", "@type": "ItemList", numberOfItems: list.length, itemListElement: list.slice(0, 30).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/property/${p.slug2}/`, name: p.title })) }],
  body: `<section style="padding-top:clamp(34px,5vw,56px)"><div class="wrap">
  ${kicker(k)}<h1 style="font:500 clamp(36px,4.6vw,62px)/1.02 var(--f);letter-spacing:-.04em;margin-top:12px">${t(ha)} ${t(hb, "em")}</h1>${t(lead, "p", 'class="lead"')}
  ${file === "sold.html" ? "" : filterBar(list)}
  <div class="rbar"><span><b id="count" style="color:var(--ink)">${list.length}</b> ${t(["properties", "ακίνητα", "propriétés"])}</span>${file === "sold.html" ? "" : `<button class="btn line s" id="clr">${t(["Clear filters", "Καθαρισμός φίλτρων", "Effacer les filtres"])}</button>`}</div>
  <div class="grid" id="results">${list.map(card).join("")}</div>
  <div class="empty card" id="noRes" hidden>${t(["Nothing matches yet. Leave us your wish list and we will email you when something comes up.", "Δεν βρέθηκε κάτι ακόμη. Αφήστε μας τι ψάχνετε και θα σας ειδοποιήσουμε μόλις βρεθεί.", "Rien pour l’instant. Laissez-nous vos critères : nous vous écrirons dès qu’un bien correspond."], "p")}<a class="btn" href="contact.html" style="margin-top:14px">${t(["Tell us what you need", "Πείτε μας τι ψάχνετε", "Dites-nous ce que vous cherchez"])}</a></div>
  <div style="margin-top:40px">${band}</div>
</div></section>` });

pages["buy.html"] = () => listPage("buy.html", buy, ["For sale", "Προς πώληση", "À vendre"], ["Properties for sale", "Ακίνητα προς πώληση"], ["in Greece.", "στην Ελλάδα.", "en Grèce."], ["Apartments, houses, land and buildings, checked by our lawyers and engineers before they go online.", "Διαμερίσματα, σπίτια, οικόπεδα και κτίρια, ελεγμένα από δικηγόρους και μηχανικούς πριν ανέβουν.", "Appartements, maisons, terrains et immeubles, vérifiés par nos avocats et ingénieurs avant publication."], ["Properties for sale in Greece · ICS Real Estate", "Ακίνητα προς πώληση στην Ελλάδα · ICS Real Estate", "Propriétés à vendre en Grèce · ICS Real Estate"], `${buy.length} properties for sale in Athens, Patras, Sparti, Lefkada, Kalamata and more. Filter by city, type, bedrooms and price.`);
pages["rent.html"] = () => listPage("rent.html", [...rent, ...P.filter(p => p.rented)], ["For rent", "Προς ενοικίαση", "À louer"], ["Homes for rent", "Σπίτια προς ενοικίαση"], ["in Athens.", "στην Αθήνα.", "à Athènes."], ["Long-term rentals, with clear contracts and a team that answers when something breaks.", "Μακροχρόνιες μισθώσεις, με καθαρά μισθωτήρια και ομάδα που απαντά όταν κάτι χαλάσει.", "Locations longue durée, avec des baux clairs et une équipe qui répond en cas de souci."], ["Apartments for rent in Athens · ICS Real Estate", "Διαμερίσματα προς ενοικίαση στην Αθήνα · ICS Real Estate", "Appartements à louer à Athènes · ICS Real Estate"], `${rent.length} homes for rent in Athens, managed by ICS.`);
pages["sold.html"] = () => listPage("sold.html", sold, ["Track record", "Το έργο μας", "Nos résultats"], [`${sold.length} properties`, `${sold.length} ακίνητα`, `${sold.length} propriétés`], ["sold & rented.", "πουλήθηκαν & νοικιάστηκαν.", "vendues et louées."], ["Many for owners who live in Canada and the USA and never had to travel.", "Πολλά για ιδιοκτήτες που ζουν σε Καναδά και ΗΠΑ και δεν χρειάστηκε να ταξιδέψουν.", "Souvent pour des propriétaires vivant au Canada ou aux É.-U., sans voyager."], ["Recently sold properties in Greece · ICS Real Estate", "Ακίνητα που πουλήσαμε · ICS Real Estate", "Propriétés vendues · ICS Real Estate"], `${sold.length} properties sold and rented by ICS Real Estate across Greece.`);

pages["services.html"] = () => layout({ file: "services.html", active: "services.html",
  title: ["Real estate services in Greece for owners abroad · ICS Real Estate", "Υπηρεσίες ακινήτων για ιδιοκτήτες στο εξωτερικό · ICS Real Estate", "Services immobiliers en Grèce · ICS Real Estate"],
  desc: "Buying, selling, leasing, valuation, renovation, property management and taxes for owners of property in Greece, with lawyers and engineers on the same team.",
  body: `<section style="padding-top:clamp(34px,5vw,56px)"><div class="wrap">${kicker(["Services", "Υπηρεσίες", "Services"])}<h1 style="font:500 clamp(36px,4.6vw,62px)/1.02 var(--f);letter-spacing:-.04em;margin-top:12px">${t(["Everything your property needs,", "Ό,τι χρειάζεται το ακίνητό σας,", "Tout ce dont votre bien a besoin,"])} ${t(["in one place.", "σε ένα μέρος.", "au même endroit."], "em")}</h1>
  ${t(["ICS is the largest North American firm managing property in Greece. Our real estate consultants work with ICS lawyers, accountants and engineers, so nothing falls between the cracks.", "Η ICS είναι η μεγαλύτερη εταιρεία στη Βόρεια Αμερική για ακίνητα στην Ελλάδα. Οι σύμβουλοι ακινήτων μας δουλεύουν μαζί με δικηγόρους, λογιστές και μηχανικούς της ICS, ώστε να μη χάνεται τίποτα.", "ICS est la plus grande firme nord-américaine de gestion immobilière en Grèce. Nos conseillers travaillent avec les avocats, comptables et ingénieurs d’ICS : rien ne se perd."], "p", 'class="lead"')}${svcCards(6)}</div></section>
<section class="alt"><div class="wrap split"><div>${kicker(["How selling works", "Πώς γίνεται η πώληση", "Comment se passe la vente"])}${h2(["Sell from abroad,", "Πουλήστε από το εξωτερικό,"], ["step by step.", "βήμα βήμα.", "étape par étape."])}</div>
  <ol class="steps">${[[["Free valuation", "Δωρεάν εκτίμηση", "Évaluation gratuite"], ["Our consultant visits and sends you a written price range.", "Ο σύμβουλος επισκέπτεται και σας στέλνει γραπτό εύρος τιμής.", "Notre conseillère visite et vous envoie une fourchette de prix écrite."]], [["Papers in order", "Χαρτιά σε τάξη", "Documents en règle"], ["Engineer certificate, energy certificate, cadastre, tax clearance.", "Βεβαίωση μηχανικού, ΠΕΑ, Κτηματολόγιο, φορολογική ενημερότητα.", "Certificat d’ingénieur, énergie, cadastre, attestation fiscale."]], [["Listing & viewings", "Αγγελία & επισκέψεις", "Annonce & visites"], ["Photos, video and viewings, in person or by video call.", "Φωτογραφίες, βίντεο και επισκέψεις, από κοντά ή με βίντεο.", "Photos, vidéo et visites, sur place ou en vidéo."]], [["Contract", "Συμβόλαιο", "Contrat"], ["Signed with a power of attorney. The money goes to your account.", "Υπογραφή με πληρεξούσιο. Τα χρήματα στον λογαριασμό σας.", "Signé par procuration. L’argent arrive sur votre compte."]]].map(([a, b]) => `<li><span>${t(a, "b")}${t(b, "small")}</span></li>`).join("")}</ol></div></section>
<section><div class="wrap">${band}</div></section>` });

pages["sell.html"] = () => layout({ file: "sell.html", active: "sell.html",
  title: ["Sell or rent your property in Greece · Free valuation · ICS Real Estate", "Πουλήστε ή νοικιάστε το ακίνητό σας · Δωρεάν εκτίμηση · ICS Real Estate", "Vendre ou louer votre bien en Grèce · Évaluation gratuite"],
  desc: "Get a free written valuation of your property in Greece and sell or rent it without travelling, with ICS Real Estate.",
  body: `<section style="padding-top:clamp(34px,5vw,56px)"><div class="wrap split">
  <div>${kicker(["Sell or rent", "Πώληση ή ενοικίαση", "Vendre ou louer"])}<h1 style="font:500 clamp(36px,4.6vw,62px)/1.02 var(--f);letter-spacing:-.04em;margin-top:12px">${t(["What is your property worth?", "Πόσο αξίζει το ακίνητό σας;", "Combien vaut votre bien ?"])} ${t(["Free valuation.", "Δωρεάν εκτίμηση.", "Évaluation gratuite."], "em")}</h1>
  ${t(["Tell us about the property. Within 3 business days our real estate team sends you a written price range based on recent sales nearby, and a plan to sell or rent it.", "Πείτε μας για το ακίνητο. Μέσα σε 3 εργάσιμες η ομάδα ακινήτων σάς στέλνει γραπτό εύρος τιμής με βάση πρόσφατες πωλήσεις στην περιοχή, και πλάνο για πώληση ή ενοικίαση.", "Décrivez votre bien. En 3 jours ouvrables, notre équipe vous envoie une fourchette de prix fondée sur les ventes récentes et un plan de vente ou de location."], "p", 'class="lead"')}
  <ol class="steps">${[[["No obligation", "Χωρίς δέσμευση", "Sans engagement"], ["The valuation is free, whatever you decide.", "Η εκτίμηση είναι δωρεάν, ό,τι κι αν αποφασίσετε.", "L’évaluation est gratuite, quelle que soit votre décision."]], [["No trip to Greece", "Χωρίς ταξίδι", "Sans voyager"], ["Everything can be signed with a power of attorney.", "Όλα υπογράφονται με πληρεξούσιο.", "Tout peut se signer par procuration."]], [["One team", "Μία ομάδα", "Une équipe"], ["Lawyers, engineers and accountants fix any paperwork first.", "Δικηγόροι, μηχανικοί και λογιστές τακτοποιούν πρώτα τα χαρτιά.", "Avocats, ingénieurs et comptables règlent d’abord les papiers."]]].map(([a, b]) => `<li><span>${t(a, "b")}${t(b, "small")}</span></li>`).join("")}</ol></div>
  <div class="card" data-done><form class="cform" data-lead="valuation">
    <div class="fld">${t(["I want to", "Θέλω να", "Je veux"])}<select name="goal"><option value="sell">Sell / Πουλήσω / Vendre</option><option value="rent">Rent out / Νοικιάσω / Louer</option><option value="value">Just know the value / Μάθω την αξία</option></select></div>
    <div class="r2"><label class="fld">${t(["Type", "Τύπος", "Type"])}<select name="ptype">${Object.values(GROUPS).map(g => `<option>${eh(g[0])}</option>`).join("")}</select></label><label class="fld">${t(["Size (m²)", "Εμβαδόν (τ.μ.)", "Surface (m²)"])}<input name="size" inputmode="numeric"></label></div>
    <label class="fld">${t(["Area / address", "Περιοχή / διεύθυνση", "Secteur / adresse"])}<input name="area" placeholder="e.g. Kypseli, Athens"></label>
    <label class="fld">${t(["Price you have in mind (optional)", "Τιμή που έχετε στο μυαλό σας (προαιρετικό)", "Prix envisagé (facultatif)"])}<input name="expect" placeholder="€"></label>
    <label class="fld">${t(["Photos or documents (optional)", "Φωτογραφίες ή έγγραφα (προαιρετικό)", "Photos ou documents (facultatif)"])}<input type="file" multiple accept="image/*,.pdf"></label>
    <div class="r2"><label class="fld">${t(["Full name", "Ονοματεπώνυμο", "Nom complet"])}<input name="name" autocomplete="name"></label><label class="fld">Email<input name="email" type="email" autocomplete="email"></label></div>
    <label class="fld">${t(["Phone", "Τηλέφωνο", "Téléphone"])}<input name="phone" type="tel"></label>
    <button class="btn lime">${t(["Get my free valuation", "Θέλω δωρεάν εκτίμηση", "Obtenir mon évaluation"])}</button>
    ${t(["Goes straight to the ICS real estate team. No spam, ever.", "Πηγαίνει κατευθείαν στην ομάδα ακινήτων της ICS. Ποτέ spam.", "Transmis directement à l’équipe immobilière d’ICS. Jamais de pourriel."], "p", 'class="note"')}
  </form></div>
</div></section>` });

pages["about.html"] = () => layout({ file: "about.html", active: "about.html",
  title: ["About ICS Real Estate · Integrated Consulting Services", "Η ICS Real Estate · Integrated Consulting Services", "À propos d’ICS Immobilier"],
  desc: "ICS Real Estate is part of Integrated Consulting Services, North America’s leader in real estate services in Greece, with offices in Athens, Toronto, Montreal and New York.",
  body: `<section style="padding-top:clamp(34px,5vw,56px)"><div class="wrap split"><div>${kicker(["About us", "Η εταιρεία", "À propos"])}<h1 style="font:500 clamp(36px,4.6vw,62px)/1.02 var(--f);letter-spacing:-.04em;margin-top:12px">${t(["North America’s leader", "Ο ηγέτης της Βόρειας Αμερικής"])} ${t(["in real estate services in Greece.", "στις υπηρεσίες ακινήτων στην Ελλάδα.", "en services immobiliers en Grèce."], "em")}</h1></div>
  <div>${t(["ICS Group knows the Greek market from the inside: local prices, rules and trends, with the eyes of clients who live abroad. We advise on homes, commercial spaces, hotels and land, and we look after properties as if they were our own, from tenants and maintenance to finances and long-term plans.", "Ο όμιλος ICS γνωρίζει την ελληνική αγορά από μέσα: τιμές, κανόνες και τάσεις ανά περιοχή, με τη ματιά πελατών που ζουν στο εξωτερικό. Συμβουλεύουμε για κατοικίες, επαγγελματικούς χώρους, ξενοδοχεία και οικόπεδα, και φροντίζουμε τα ακίνητα σαν να ήταν δικά μας, από ενοικιαστές και συντήρηση μέχρι οικονομικά και μακροπρόθεσμο σχέδιο.", "Le groupe ICS connaît le marché grec de l’intérieur : prix, règles et tendances, avec le regard de clients vivant à l’étranger. Nous conseillons pour résidences, locaux commerciaux, hôtels et terrains, et gérons les biens comme les nôtres."], "p", 'class="lead" style="margin-top:0"')}
  ${t(["Our renovation team, with architects, engineers and craftsmen, brings older homes up to modern standards while keeping their character, with energy-efficient solutions.", "Η ομάδα ανακαίνισης, με αρχιτέκτονες, μηχανικούς και τεχνίτες, φέρνει τα παλιά σπίτια στα σημερινά πρότυπα κρατώντας τον χαρακτήρα τους, με ενεργειακά αποδοτικές λύσεις.", "Notre équipe de rénovation, avec architectes, ingénieurs et artisans, modernise les maisons anciennes en préservant leur caractère, avec des solutions écoénergétiques."], "p", 'class="lead"')}</div></div></section>
<section class="alt"><div class="wrap">${kicker(["Our team", "Η ομάδα", "L’équipe"])}${h2(["People who answer", "Άνθρωποι που απαντούν"], ["the phone.", "στο τηλέφωνο.", "au téléphone."])}
  <div class="team">${[["Eleonora Lekka", ["Real Estate Consultant · Athens", "Σύμβουλος ακινήτων · Αθήνα", "Conseillère immobilière · Athènes"]], ["Anastasios Moussas", ["Managing Director · Toronto", "Διευθύνων Σύμβουλος · Τορόντο", "Directeur général · Toronto"]], ["Efthymia Tseliou", ["Director · Toronto", "Διευθύντρια · Τορόντο", "Directrice · Toronto"]], ["Marianna Michalitsianou", ["Senior Consultant · Toronto", "Senior Consultant · Τορόντο", "Conseillère principale · Toronto"]], ["Anastasia Gianniloi", ["Attorney at Law · Athens", "Δικηγόρος · Αθήνα", "Avocate · Athènes"]], ["Dimitrios Papadopoulos", ["Attorney at Law · Athens", "Δικηγόρος · Αθήνα", "Avocat · Athènes"]], ["Stavroula Rigopoulou", ["Accounting Consultant · Athens", "Λογίστρια · Αθήνα", "Comptable · Athènes"]], ["Georgios Tachtsidis", ["Senior Consultant · Thessaloniki", "Senior Consultant · Θεσσαλονίκη", "Conseiller principal · Thessalonique"]]].map(([n, r]) => `<figure class="pf"><div class="pf-i"><img src="../ics/team/${n.toLowerCase().replace(/[^a-z]+/g, "-")}.webp" alt="${ea(n)}" loading="lazy" width="480" height="600"></div><figcaption><b>${eh(n)}</b>${t(r, "small")}</figcaption></figure>`).join("")}</div></div></section>
<section><div class="wrap">${kicker(["What clients say", "Τι λένε οι πελάτες", "Témoignages"])}${voices}</div></section>` });

pages["contact.html"] = () => layout({ file: "contact.html", active: "contact.html",
  title: ["Contact ICS Real Estate · Athens, Toronto, Montreal, New York", "Επικοινωνία · ICS Real Estate", "Contact · ICS Immobilier"],
  desc: "Talk to ICS Real Estate in Athens, Toronto, Montreal or New York. We reply within one business day.",
  body: `<section style="padding-top:clamp(34px,5vw,56px)"><div class="wrap split"><div>${kicker(["Contact", "Επικοινωνία", "Contact"])}<h1 style="font:500 clamp(36px,4.6vw,62px)/1.02 var(--f);letter-spacing:-.04em;margin-top:12px">${t(["Four offices,", "Τέσσερα γραφεία,", "Quatre bureaux,"])} ${t(["one team.", "μία ομάδα.", "une équipe."], "em")}</h1>
  <div class="offs" style="grid-template-columns:1fr 1fr">${[["Athens", "Αθήνα", "233 Leof. Syggrou, N. Smyrni 17121", "+30 210 3230 205", "athens@icsgr.com"], ["Toronto", "Τορόντο", "#203 – 1315 Lawrence Ave East, ON M3A 3R3", "+1 416 391 2286", "toronto@icsgr.com"], ["Montreal", "Μόντρεαλ", "800 Boul. Chomedey, Tour C, Suite 120, Laval", "+1 514 270 7337", "montreal@icsgr.com"], ["New York", "Νέα Υόρκη", "#207 32-75 Steinway Str., Astoria NY 11103", "+1 718 360 1657", "newyork@icsgr.com"]].map(([n, g, a, p, m]) => `<div class="card off">${t([n, g, n], "h3")}<p>${eh(a)}</p><a href="tel:${p.replace(/\s/g, "")}">${p}</a><a href="mailto:${m}">${m}</a></div>`).join("")}</div></div>
  <div class="card" data-done><form class="cform" data-lead="contact"><div class="r2"><label class="fld">${t(["Full name", "Ονοματεπώνυμο", "Nom complet"])}<input name="name"></label><label class="fld">Email<input name="email" type="email"></label></div><label class="fld">${t(["Phone", "Τηλέφωνο", "Téléphone"])}<input name="phone" type="tel"></label><label class="fld">${t(["What are you looking for?", "Τι ψάχνετε;", "Que cherchez-vous ?"])}<textarea name="message" rows="5"></textarea></label><button class="btn lime">${t(["Send", "Αποστολή", "Envoyer"])}</button></form></div>
</div></section>` });

/* listing pages */
P.forEach(p => {
  const sim = P.filter(x => x.id !== p.id && x.mode !== "sold" && (x.city === p.city || x.tg === p.tg)).slice(0, 3);
  const [lat, lng] = p.loc;
  const gl = p.gal.length ? p.gal : [p.img];
  const ld = { "@context": "https://schema.org", "@type": "RealEstateListing", name: p.title, url: `${SITE}/property/${p.slug2}/`, datePosted: p.date, image: gl.slice(0, 5), description: p.desc.slice(0, 500),
    about: { "@type": p.tg === "Land Plots" ? "Landform" : "Accommodation", floorSize: p.size ? { "@type": "QuantitativeValue", value: parseFloat(p.size), unitCode: "MTK" } : undefined, numberOfBedrooms: +p.beds || undefined, address: { "@type": "PostalAddress", addressLocality: p.place, addressCountry: "GR" }, geo: lat ? { "@type": "GeoCoordinates", latitude: lat, longitude: lng } : undefined },
    offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: p.mode === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock", businessFunction: p.rent ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell" } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["Home", ""], [p.rent ? "For rent" : "For sale", p.rent ? "for-rent/" : "for-sale/"], [p.title, `property/${p.slug2}/`]].map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: `${SITE}/${u}` })) };
  const dl = [[["Type", "Τύπος", "Type"], t(p.tyl)], p.size && [["Size", "Εμβαδόν", "Surface"], `${p.size} m²`], p.land && +p.land > 0 && [["Plot", "Οικόπεδο", "Terrain"], `${p.land} m²`], +p.beds && [["Bedrooms", "Υπνοδωμάτια", "Chambres"], p.beds], +p.baths && [["Bathrooms", "Μπάνια", "Salles de bain"], p.baths], p.garage && [["Parking", "Θέση στάθμευσης", "Stationnement"], p.garage], p.year && [["Year built", "Έτος κατασκευής", "Année"], p.year], [["Area", "Περιοχή", "Secteur"], eh(p.place)], [["Reference", "Κωδικός", "Référence"], "#" + p.id]].filter(Boolean);
  pages[p.file] = () => layout({ file: p.file, active: p.rent ? "rent.html" : p.mode === "sold" ? "sold.html" : "buy.html", img: p.img, ld: [ld, bc],
    title: [`${p.title} · ${fmtP(p)} · ICS Real Estate`, `${p.tt[1]} · ${fmtP(p)} · ICS Real Estate`, `${p.tt[2]} · ${fmtP(p)} · ICS Real Estate`],
    desc: `${p.title}, ${fmtP(p)}${p.size ? `, ${p.size} m²` : ""}${+p.beds ? `, ${p.beds} bedrooms` : ""}. ${p.desc.slice(0, 120)}…`,
    body: `<div class="wrap"><nav class="crumbs"><a href="demo.html">${t(["Home", "Αρχική", "Accueil"])}</a><span><a href="${p.rent ? "rent" : p.mode === "sold" ? "sold" : "buy"}.html">${t(p.rent ? ["For rent", "Ενοικίαση", "À louer"] : p.mode === "sold" ? ["Sold", "Πωλήθηκαν", "Vendus"] : ["For sale", "Πώληση", "À vendre"])}</a></span><span>${eh(p.place)}</span></nav>
  <div class="gal"><div class="main"><img id="gMain" src="${ea(gl[0])}" alt="${ea(p.title)}" fetchpriority="high"><div class="badges">${badge(p)}</div><button class="fav" data-fav="${p.id}" aria-label="Save">♡</button><button data-lb="0" style="position:absolute;inset:0;z-index:1" aria-label="Open photos"></button></div>
   <div class="side">${[1, 2].map(i => gl[i] ? `<button data-lb="${i}"><img src="${ea(gl[i])}" alt="" loading="lazy">${i === 2 && gl.length > 3 ? `<span class="more">+${gl.length - 3} ${t(["photos", "φωτογραφίες", "photos"])}</span>` : ""}</button>` : `<button data-lb="0"><img src="${ea(gl[0])}" alt="" loading="lazy"></button>`).join("")}</div></div>
  ${gl.length > 1 ? `<div class="thumbs">${gl.map((g, i) => `<button class="${i ? "" : "on"}" aria-label="Photo ${i + 1}"><img src="${ea(g)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
  <div class="pgrid"><div class="pbody">
    <div class="ptitle">${t(p.tyl, "span", 'class="k"')}${t(p.tt, "h1")}<div class="addr">📍 ${eh(p.place)}</div></div>
    <div class="kf">${[[p.size ? p.size + " m²" : "—", ["size", "εμβαδόν", "surface"]], [+p.beds || "—", ["bedrooms", "υπνοδωμάτια", "chambres"]], [+p.baths || "—", ["bathrooms", "μπάνια", "salles de bain"]], [p.year || (p.land && +p.land > 0 ? p.land + " m²" : "—"), p.year ? ["built", "κατασκευή", "construit"] : ["plot", "οικόπεδο", "terrain"]]].map(([v, l]) => `<div><b>${eh(v)}</b>${t(l)}</div>`).join("")}</div>
    ${t(["Description", "Περιγραφή", "Description"], "h2")}${t(["The original description is in English. In the live site it is translated into Greek and French automatically and checked by our team.", "Η αρχική περιγραφή είναι στα αγγλικά. Στο κανονικό site μεταφράζεται αυτόματα στα ελληνικά και γαλλικά και ελέγχεται από την ομάδα μας.", "La description d’origine est en anglais. Sur le site réel, elle est traduite automatiquement en grec et en français, puis vérifiée."], "p", 'class="note desc-note ph" hidden style="margin-top:8px"')}
    <div class="desc">${eh(p.desc)}</div>
    ${t(["Details", "Στοιχεία", "Détails"], "h2")}<div class="dl">${dl.map(([l, v]) => `<div>${t(l)}<b>${v}</b></div>`).join("")}</div>
    ${p.feat.length ? t(["Features", "Παροχές", "Équipements"], "h2") + `<div class="feats">${p.feat.map(f => `<span>${eh(f)}</span>`).join("")}</div>` : ""}
    ${lat ? t(["Location", "Τοποθεσία", "Emplacement"], "h2") + `<iframe class="mapf" loading="lazy" title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.012},${lat - 0.007},${lng + 0.012},${lat + 0.007}&layer=mapnik&marker=${lat},${lng}"></iframe><p class="note" style="margin-top:6px">${t(["Approximate location. The exact address is shared before the viewing.", "Κατά προσέγγιση τοποθεσία. Η ακριβής διεύθυνση δίνεται πριν την επίσκεψη.", "Emplacement approximatif. L’adresse exacte est donnée avant la visite."])}</p>` : ""}
  </div>
  <aside class="side-c">
    <div class="card pbox"><div class="pr">${fmtP(p).replace(" / mo", `<small> / ${t(["month", "μήνα", "mois"])}</small>`)}</div>
      ${p.noFee ? `<div class="bd new" style="justify-self:start">${t(["No broker fee for the buyer", "Χωρίς μεσιτικά για τον αγοραστή", "Sans frais pour l’acheteur"])}</div>` : ""}
      ${p.mode === "sold" ? t([p.rented ? "This property has been rented." : "This property has been sold.", p.rented ? "Το ακίνητο έχει ενοικιαστεί." : "Το ακίνητο έχει πουληθεί.", p.rented ? "Ce bien a été loué." : "Ce bien a été vendu."], "p", 'class="note" style="font-size:15px"') + `<a class="btn lime" href="sell.html">${t(["Own something similar? Free valuation", "Έχετε κάτι παρόμοιο; Δωρεάν εκτίμηση", "Un bien similaire ? Évaluation gratuite"])}</a>` : `
      <div class="agent"><img class="av" src="../ics/team/eleonora-lekka.webp" alt="Eleonora Lekka" style="object-fit:cover;object-position:50% 15%;background:#e4e1d6"><span><b>Eleonora Lekka</b>${t(["Real Estate Consultant · Athens", "Σύμβουλος ακινήτων · Αθήνα", "Conseillère immobilière · Athènes"], "small")}</span></div>
      <div data-done><form data-lead="property" data-title="${ea(p.title)}" data-price="${ea(fmtP(p))}" data-id="${p.id}" style="display:grid;gap:10px">
        <div class="r2"><label class="fld">${t(["Name", "Όνομα", "Nom"])}<input name="name" autocomplete="name"></label><label class="fld">Email<input name="email" type="email" autocomplete="email"></label></div>
        <div class="r2"><label class="fld">${t(["Phone", "Τηλέφωνο", "Téléphone"])}<input name="phone" type="tel"></label><label class="fld">${t(["I am", "Είμαι", "Je suis"])}<select name="who"><option>${p.rent ? "Tenant" : "Buyer"}</option><option>Agent</option><option>Other</option></select></label></div>
        <label class="fld">${t(["Message", "Μήνυμα", "Message"])}<textarea name="message" rows="3">Hello, I am interested in “${eh(p.title)}” (#${p.id}).</textarea></label>
        <button class="btn lime">${t(["Request information", "Ζητήστε πληροφορίες", "Demander des informations"])}</button>
      </form></div>
      <a class="btn line" href="../ics/book.html?topic=2&amp;office=Athens">📅 ${t(["Book a viewing · in person or video", "Κλείστε επίσκεψη · από κοντά ή βίντεο", "Réserver une visite · sur place ou vidéo"])}</a>`}
      <button class="btn line s" id="share" type="button">🔗 ${t(["Copy link", "Αντιγραφή συνδέσμου", "Copier le lien"])}</button>
    </div>
    <a class="card pbox" href="../ics/real-estate.html" style="background:var(--ink);color:#eef2ec">${t(["Buying from abroad?", "Αγοράζετε από το εξωτερικό;", "Vous achetez de l’étranger ?"], "b")}${t(["ICS handles the AFM, bank account, lawyer and notary, so you can buy without travelling.", "Η ICS αναλαμβάνει ΑΦΜ, τράπεζα, δικηγόρο και συμβολαιογράφο, για να αγοράσετε χωρίς ταξίδι.", "ICS gère AFM, compte bancaire, avocat et notaire : achetez sans voyager."], "span", 'style="font-size:14px;color:#b6c0ba"')}<span style="color:var(--lime2);font-weight:600;font-size:14px">icsgr.com →</span></a>
  </aside></div>
  ${sim.length ? `<section style="padding-top:60px">${kicker(["Similar properties", "Παρόμοια ακίνητα", "Biens similaires"])}<div class="grid">${sim.map(card).join("")}</div></section>` : `<div style="height:60px"></div>`}
</div>
<div class="lb"><button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button></div>
<script>window.GAL=${JSON.stringify(gl)};</script>` });
});

/* ===== write ===== */
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.startsWith("property-")) fs.unlinkSync(path.join(OUT, f));
fs.copyFileSync(path.join(__dirname, "props.css"), path.join(OUT, "props.css"));
fs.copyFileSync(path.join(__dirname, "props.js"), path.join(OUT, "props.js"));
let n = 0; for (const [f, fn] of Object.entries(pages)) { fs.writeFileSync(path.join(OUT, f), fn()); n++; }
console.log(`ICS Real Estate: ${n} pages (${live.length} live, ${sold.length} sold/rented) → ${OUT}`);
