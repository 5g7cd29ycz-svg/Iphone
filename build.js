#!/usr/bin/env node
/**
 * Generátor statického webu – bez závislostí.
 * Načte content.js a vytvoří složku dist/ s hotovým HTML.
 *   node build.js
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
delete require.cache[require.resolve("./content.js")];
const c = require("./content.js");

/* ---------- pomocné funkce ---------- */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (p = "/") => c.site.url.replace(/\/$/, "") + p;
const telHref = `tel:${c.kontakt.telefonOdkaz}`;
const mailHref = `mailto:${c.kontakt.email}`;
const year = new Date().getFullYear();
const today = new Date().toISOString().slice(0, 10);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
const minCss = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>])\s*/g, "$1").replace(/;}/g, "}").trim();
const hash = (s) => crypto.createHash("md5").update(s).digest("hex").slice(0, 8);

/* ---------- ikony (vlastní, jednoduché) ---------- */
const ICONS = {
  dum: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M15 4.5 18 2m-1.5 4L20 4.5"/><path d="M10 20v-5h4v5"/>',
  kabel: '<path d="M7 3v5a3 3 0 0 0 3 3h4a3 3 0 0 1 3 3v7"/><rect x="4" y="2" width="6" height="4" rx="1"/><path d="M15 21h4"/>',
  blesk: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5.5 12.5a10 10 0 0 1 13 0"/><path d="M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1"/>',
  kosik: '<path d="M3 4h2l2.4 11h11L21 7H6"/><circle cx="9" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/>',
  servis: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  sipka: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  hodiny: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  medaile: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
  domek: '<path d="M3 11 12 4l9 7v9H3z"/><path d="M12 20v-6"/>',
  stit: '<path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  koruna: '<circle cx="12" cy="12" r="10"/><path d="M15 9.5a3 3 0 1 0 0 5"/><path d="M9 7v10"/>',
};
const icon = (name, cls = "icon") =>
  `<svg class="${cls}" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.info}</svg>`;

const logo = `<svg class="logo-mark" aria-hidden="true" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#141b33" stroke="#ffb020" stroke-width="2"/><path d="M9 21a10 10 0 0 1 14-14" fill="none" stroke="#ffb020" stroke-width="2.4" stroke-linecap="round"/><path d="M12.5 21a6 6 0 0 1 8.5-8.5" fill="none" stroke="#ffd27a" stroke-width="2.4" stroke-linecap="round"/><circle cx="21" cy="11" r="2.4" fill="#fff"/></svg>`;

/* ---------- společné části ---------- */
function head({ title, description, canonical, css, extraHead = "", noindex = false }) {
  return `<!doctype html>
<html lang="${c.site.lang}" class="no-js">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.remove("no-js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="${esc(c.site.keywords)}">
<meta name="author" content="${esc(c.kontakt.jmeno)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="${c.site.themeColor}">
<meta name="color-scheme" content="dark">
<meta name="geo.region" content="CZ-80">
<meta name="geo.placename" content="${esc(c.kontakt.mesto)}">
<meta name="geo.position" content="${c.kontakt.geo.lat};${c.kontakt.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
<meta property="og:site_name" content="${esc(c.site.nazev)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${url(c.site.ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<style>${css}</style>
${extraHead}
</head>`;
}

function header(isHome) {
  const pre = isHome ? "" : "/";
  return `<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="${isHome ? "#top" : "/"}" aria-label="${esc(c.site.nazev)} – úvod">${logo}<span>${esc(c.site.nazev)}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hlavni-menu"><span class="sr-only">Menu</span><span class="burger" aria-hidden="true"></span></button>
    <nav class="main-nav" id="hlavni-menu" aria-label="Hlavní navigace">
      <ul>${c.menu.map((m) => `<li><a href="${pre}#${m.kotva}">${esc(m.text)}</a></li>`).join("")}</ul>
      <a class="btn btn-primary btn-sm nav-cta" href="${telHref}">${icon("tel")}${esc(c.kontakt.telefon)}</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="brand footer-brand">${logo}<span>${esc(c.site.nazev)}</span></p>
      <p>Montáž satelitního internetu Starlink – ${esc(c.kontakt.jmeno)}, vyučený elektrikář.</p>
    </div>
    <div>
      <h2 class="footer-h">Kontakt</h2>
      <ul class="footer-list">
        <li><a href="${telHref}">${icon("tel")}${esc(c.kontakt.telefon)}</a></li>
        <li><a href="${mailHref}">${icon("mail")}${esc(c.kontakt.email)}</a></li>
        <li>${icon("hodiny")}${esc(c.kontakt.dostupnost)}</li>
      </ul>
    </div>
    <div>
      <h2 class="footer-h">Oblast působení</h2>
      <ul class="footer-list">${c.kontakt.oblast.map((o) => `<li>${icon("pin")}${esc(o)}</li>`).join("")}</ul>
    </div>
    <div>
      <h2 class="footer-h">Provozovatel</h2>
      <p>${esc(c.kontakt.jmeno)}<br>IČO: ${esc(c.kontakt.ico)}<br>Fyzická osoba podnikající dle živnostenského zákona, ${esc(c.kontakt.sidlo)}</p>
      <p><a href="/gdpr.html">Zásady ochrany osobních údajů</a></p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p class="disclaimer"><strong>${esc(c.nezavislost)}</strong> ${esc(c.nezavislostDetail)}</p>
    <p>© ${year} ${esc(c.kontakt.jmeno)}</p>
  </div>
</footer>`;
}

/* ---------- schema.org ---------- */
function schema() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": url("/#firma"),
    name: c.site.nazev,
    description: c.site.description,
    url: url("/"),
    image: url(c.site.ogImage),
    logo: url("/assets/apple-touch-icon.png"),
    telephone: c.kontakt.telefonOdkaz,
    email: c.kontakt.email,
    founder: { "@type": "Person", name: c.kontakt.jmeno },
    taxID: c.kontakt.ico,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: c.kontakt.mesto,
      postalCode: c.kontakt.psc,
      addressRegion: c.kontakt.kraj,
      addressCountry: "CZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.kontakt.geo.lat, longitude: c.kontakt.geo.lng },
    areaServed: [
      { "@type": "City", name: "Opava" },
      { "@type": "AdministrativeArea", name: "Moravskoslezský kraj" },
      { "@type": "Place", name: "Jeseníky" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Montáž satelitního internetu",
      itemListElement: c.sluzby.polozky.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nadpis, description: s.text },
      })),
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.polozky.map((f) => ({
      "@type": "Question",
      name: f.otazka,
      acceptedAnswer: { "@type": "Answer", text: f.odpoved.replace(/<[^>]+>/g, "") },
    })),
  };
  const j = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;
  return j(business) + "\n" + j(faq);
}

/* ---------- ilustrace v hero (vlastní SVG) ---------- */
const heroArt = `<svg class="hero-art" viewBox="0 0 480 400" role="img" aria-label="Ilustrace: domek s anténou na střeše přijímá signál z družice na noční obloze">
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2750"/><stop offset="1" stop-color="#0f1530"/></linearGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb020" stop-opacity=".45"/><stop offset="1" stop-color="#ffb020" stop-opacity="0"/></radialGradient>
  </defs>
  <circle cx="380" cy="80" r="70" fill="url(#glow)"/>
  <g fill="none" stroke="#ffb020" stroke-width="2" stroke-dasharray="4 8" opacity=".7">
    <path d="M375 90 C 330 150, 270 190, 238 214"/>
  </g>
  <g class="sat" transform="translate(380 80) rotate(-25)">
    <rect x="-34" y="-8" width="24" height="16" rx="2" fill="#3b4a86" stroke="#9fb0ff" stroke-width="1.5"/>
    <rect x="10" y="-8" width="24" height="16" rx="2" fill="#3b4a86" stroke="#9fb0ff" stroke-width="1.5"/>
    <rect x="-8" y="-10" width="16" height="20" rx="3" fill="#e9edff"/>
    <path d="M-22-8v16M22-8v16" stroke="#9fb0ff" stroke-width="1"/>
  </g>
  <path d="M0 360 Q 120 300 240 330 T 480 320 V400 H0z" fill="#0c1228"/>
  <path d="M0 380 Q 160 340 300 365 T 480 360 V400 H0z" fill="#090e20"/>
  <path d="M40 350 l22-60 22 60z M70 352 l18-48 18 48z" fill="#111a38"/>
  <path d="M400 345 l20-54 20 54z M430 350 l16-42 16 42z" fill="#111a38"/>
  <g transform="translate(150 230)">
    <path d="M0 60 L90 0 L180 60 V140 H0z" fill="url(#hg)"/>
    <path d="M-12 66 L90 -6 L192 66" fill="none" stroke="#ffb020" stroke-width="5" stroke-linejoin="round"/>
    <rect x="30" y="78" width="34" height="28" rx="3" fill="#ffd27a"/>
    <rect x="116" y="78" width="34" height="28" rx="3" fill="#ffd27a" opacity=".85"/>
    <rect x="74" y="96" width="32" height="44" rx="3" fill="#0b1020"/>
    <g transform="translate(118 -2)">
      <path d="M0 22 v14" stroke="#cfd6f5" stroke-width="3"/>
      <rect x="-18" y="2" width="36" height="22" rx="3" transform="rotate(-28 0 13)" fill="#f1f4ff" stroke="#9fb0ff" stroke-width="1.5"/>
    </g>
  </g>
</svg>`;

/* ---------- stránka: index ---------- */
function indexPage(css, jsFile) {
  const k = c.kontakt;
  const endpoint = (c.formspreeEndpoint || "").trim();
  const formAction = endpoint || `mailto:${k.email}?subject=${encodeURIComponent("Poptávka montáže – " + c.site.nazev)}`;
  const formEnctype = endpoint ? "" : ' enctype="text/plain"';
  const procIcons = ["medaile", "pin", "hodiny", "koruna"];

  return `${head({ title: c.site.title, description: c.site.description, canonical: url("/"), css, extraHead: schema() })}
<body>
${header(true)}
<main id="obsah">

<section class="hero" aria-labelledby="hero-h">
  <div class="stars" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${icon("pin")}${esc(c.hero.stitek)}</p>
      <h1 id="hero-h">${esc(c.hero.nadpis)}</h1>
      <p class="lead">${esc(c.hero.podnadpis)}</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="#kontakt">${esc(c.hero.tlacitkoNabidka)}${icon("sipka")}</a>
        <a class="btn btn-ghost btn-lg" href="${telHref}">${icon("tel")}${esc(c.hero.tlacitkoVolat)} ${esc(k.telefon)}</a>
      </div>
      <ul class="hero-points">${c.hero.body.map((b) => `<li>${icon("check")}${esc(b)}</li>`).join("")}</ul>
    </div>
    <div class="hero-visual">${heroArt}</div>
  </div>
</section>

<section class="section" id="jak-to-funguje" aria-labelledby="kroky-h">
  <div class="container">
    <header class="section-head"><h2 id="kroky-h">${esc(c.kroky.nadpis)}</h2><p>${esc(c.kroky.uvod)}</p></header>
    <ol class="steps">
      ${c.kroky.polozky.map((s, i) => `<li class="step"><span class="step-num" aria-hidden="true">${i + 1}</span><h3>${esc(s.nadpis)}</h3><p>${esc(s.text)}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<section class="section section-alt" id="sluzby" aria-labelledby="sluzby-h">
  <div class="container">
    <header class="section-head"><h2 id="sluzby-h">${esc(c.sluzby.nadpis)}</h2><p>${esc(c.sluzby.uvod)}</p></header>
    <ul class="cards">
      ${c.sluzby.polozky.map((s) => `<li class="card"><span class="card-icon">${icon(s.ikona)}</span><h3>${esc(s.nadpis)}</h3><p>${esc(s.text)}</p></li>`).join("\n      ")}
    </ul>
    <div class="audience">
      <h3>${esc(c.sluzby.proKoho.nadpis)}:</h3>
      <ul class="chips">${c.sluzby.proKoho.polozky.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="section" id="cenik" aria-labelledby="cenik-h">
  <div class="container narrow">
    <header class="section-head"><h2 id="cenik-h">${esc(c.cenik.nadpis)}</h2><p>${esc(c.cenik.uvod)}</p></header>
    <div class="price-wrap">
      <table class="price-table">
        <caption class="sr-only">Orientační ceny montáže</caption>
        <thead><tr><th scope="col">Služba</th><th scope="col" class="num">Cena</th></tr></thead>
        <tbody>
          ${c.cenik.polozky.map((p) => `<tr><th scope="row"><span class="price-name">${esc(p.sluzba)}</span>${p.popis ? `<span class="price-desc">${esc(p.popis)}</span>` : ""}</th><td class="num">${esc(p.cena)}</td></tr>`).join("\n          ")}
        </tbody>
      </table>
      <p class="note">${icon("info")}<span>${esc(c.cenik.poznamka)}</span></p>
      <p class="note note-legal">${icon("stit")}<span><strong>${esc(c.nezavislost)}</strong></span></p>
      <p class="center"><a class="btn btn-primary" href="#kontakt">${esc(c.cenik.tlacitko)}${icon("sipka")}</a></p>
    </div>
  </div>
</section>

<section class="section section-alt" id="proc-ja" aria-labelledby="proc-h">
  <div class="container">
    <header class="section-head"><h2 id="proc-h">${esc(c.procJa.nadpis)}</h2><p>${esc(c.procJa.uvod)}</p></header>
    <ul class="why">
      ${c.procJa.polozky.map((p, i) => `<li><span class="why-icon">${icon(procIcons[i % procIcons.length])}</span><div><h3>${esc(p.nadpis)}</h3><p>${esc(p.text)}</p></div></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="section" id="galerie" aria-labelledby="galerie-h">
  <div class="container">
    <header class="section-head"><h2 id="galerie-h">${esc(c.galerie.nadpis)}</h2><p>${esc(c.galerie.uvod)}</p></header>
    <ul class="gallery">
      ${c.galerie.fotky.map((f) => `<li><figure><img src="${esc(f.src)}" alt="${esc(f.alt)}" width="600" height="450" loading="lazy" decoding="async">${f.popis ? `<figcaption>${esc(f.popis)}</figcaption>` : ""}</figure></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="section section-alt" id="faq" aria-labelledby="faq-h">
  <div class="container narrow">
    <header class="section-head"><h2 id="faq-h">${esc(c.faq.nadpis)}</h2></header>
    <div class="faq">
      ${c.faq.polozky.map((f) => `<details><summary>${esc(f.otazka)}</summary><div class="faq-body"><p>${f.odpoved}</p></div></details>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section" id="kontakt" aria-labelledby="kontakt-h">
  <div class="container contact-grid">
    <div class="contact-info">
      <h2 id="kontakt-h">${esc(c.formular.nadpis)}</h2>
      <p>${esc(c.formular.uvod)}</p>
      <ul class="contact-list">
        <li><a href="${telHref}">${icon("tel")}<span><small>Telefon</small>${esc(k.telefon)}</span></a></li>
        <li><a href="${mailHref}">${icon("mail")}<span><small>E-mail</small>${esc(k.email)}</span></a></li>
        <li>${icon("pin")}<span><small>Působím</small>${esc(k.oblast.join(", "))}</span></li>
        <li>${icon("hodiny")}<span><small>K zastižení</small>${esc(k.dostupnost)}</span></li>
      </ul>
    </div>

    <form class="contact-form" id="poptavka" action="${esc(formAction)}" method="POST"${formEnctype} data-endpoint="${esc(endpoint)}" data-email="${esc(k.email)}" data-subject="${esc("Poptávka montáže – " + c.site.nazev)}" novalidate>
      <div class="field-row">
        <div class="field"><label for="f-jmeno">Jméno a příjmení <span class="req" aria-hidden="true">*</span></label><input id="f-jmeno" name="jmeno" type="text" autocomplete="name" required></div>
        <div class="field"><label for="f-tel">Telefon <span class="req" aria-hidden="true">*</span></label><input id="f-tel" name="telefon" type="tel" autocomplete="tel" inputmode="tel" required></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        <div class="field"><label for="f-obec">Obec / adresa <span class="req" aria-hidden="true">*</span></label><input id="f-obec" name="obec" type="text" autocomplete="address-level2" required></div>
      </div>
      <fieldset class="field">
        <legend>Typ objektu</legend>
        <div class="choice-row">${c.formular.typyObjektu.map((t, i) => `<label class="choice"><input type="radio" name="typ_objektu" value="${esc(t)}"${i === 0 ? " checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div>
      </fieldset>
      <fieldset class="field">
        <legend>Máte už sadu Starlink?</legend>
        <div class="choice-row"><label class="choice"><input type="radio" name="mam_sadu" value="Ano"><span>Ano</span></label><label class="choice"><input type="radio" name="mam_sadu" value="Ne" checked><span>Ne</span></label></div>
      </fieldset>
      <div class="field"><label for="f-zprava">Zpráva</label><textarea id="f-zprava" name="zprava" rows="4" placeholder="Např. kam chcete anténu umístit, jak daleko je to do domu…"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-gotcha">Nevyplňujte</label><input id="f-gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
      <input type="hidden" name="_subject" value="${esc("Poptávka montáže – " + c.site.nazev)}">
      <div class="field consent"><label class="check"><input type="checkbox" name="souhlas_gdpr" value="Ano" required><span>Souhlasím se <a href="/gdpr.html" target="_blank">zpracováním osobních údajů</a> za účelem vyřízení poptávky. <span class="req" aria-hidden="true">*</span></span></label></div>
      <p class="form-status" role="status" aria-live="polite"></p>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${esc(c.formular.odeslat)}${icon("sipka")}</button>
      <p class="form-hint"><span class="req" aria-hidden="true">*</span> povinné údaje</p>
    </form>
  </div>
</section>

</main>
${footer()}

<div class="mobile-bar" aria-label="Rychlý kontakt">
  <a class="btn btn-primary" href="${telHref}">${icon("tel")}Zavolat</a>
  <a class="btn btn-ghost" href="#kontakt">Nabídka</a>
</div>

<script id="form-texts" type="application/json">${JSON.stringify({ ok: c.formular.dekujeme, err: c.formular.chyba }).replace(/</g, "\\u003c")}</script>
<script src="/${jsFile}" defer></script>
</body>
</html>`;
}

/* ---------- stránka: GDPR ---------- */
function gdprPage(css, jsFile) {
  const k = c.kontakt;
  return `${head({ title: `Zásady ochrany osobních údajů | ${c.site.nazev}`, description: `Jak ${c.site.nazev} (${k.jmeno}) zpracovává osobní údaje z kontaktního formuláře.`, canonical: url("/gdpr.html"), css })}
<body>
${header(false)}
<main id="obsah" class="section legal">
  <div class="container narrow prose">
    <h1>Zásady ochrany osobních údajů</h1>
    <p>Platné od ${today.split("-").reverse().join(". ").replace(/^0/, "")}</p>

    <h2>1. Správce osobních údajů</h2>
    <p>${esc(k.jmeno)}, IČO ${esc(k.ico)}, místo podnikání ${esc(k.sidlo)}<br>
    E-mail: <a href="${mailHref}">${esc(k.email)}</a>, telefon: <a href="${telHref}">${esc(k.telefon)}</a><br>
    (dále jen „správce“). Pověřence pro ochranu osobních údajů správce nejmenoval, protože mu tato povinnost nevzniká.</p>

    <h2>2. Jaké údaje zpracovávám</h2>
    <p>Pouze údaje, které mi sami poskytnete v kontaktním formuláři, e-mailem nebo telefonicky: jméno a příjmení, telefon, e-mail, obec či adresu místa montáže, typ objektu, informaci, zda máte sadu, a obsah vaší zprávy.</p>

    <h2>3. Účel a právní základ</h2>
    <ul>
      <li><strong>Vyřízení poptávky a příprava nabídky</strong> – jednání o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).</li>
      <li><strong>Plnění smlouvy</strong> – provedení montáže a komunikace s vámi (čl. 6 odst. 1 písm. b) GDPR).</li>
      <li><strong>Plnění zákonných povinností</strong> – vystavení a archivace dokladů (čl. 6 odst. 1 písm. c) GDPR).</li>
    </ul>
    <p>Zaškrtnutím políčka ve formuláři potvrzujete, že jste se s těmito zásadami seznámili. Údaje nepoužívám k marketingu a neprodávám je.</p>

    <h2>4. Doba uložení</h2>
    <p>Pokud z poptávky nevznikne zakázka, údaje smažu nejpozději do 12 měsíců od poslední komunikace. Pokud zakázka vznikne, uchovávám údaje po dobu trvání smluvního vztahu a dále po dobu stanovenou právními předpisy (např. daňové a účetní doklady až 10 let).</p>

    <h2>5. Kdo může mít k údajům přístup</h2>
    <ul>
      <li><strong>Formspree, Inc.</strong> (USA) – služba, přes kterou se odesílá kontaktní formulář a která mi zprávu doručí e-mailem. Předání do USA probíhá v souladu s kapitolou V GDPR (rámec EU–USA pro ochranu osobních údajů, případně standardní smluvní doložky).</li>
      <li><strong>Poskytovatel e-mailové schránky</strong> (Seznam.cz, a.s.) – ukládání e-mailové komunikace.</li>
      <li><strong>Poskytovatel hostingu webu</strong> – technické provozní záznamy serveru (IP adresa, čas přístupu) pro zajištění bezpečnosti.</li>
      <li>Účetní nebo orgány veřejné moci, pokud to vyžaduje zákon.</li>
    </ul>

    <h2>6. Cookies a měření návštěvnosti</h2>
    <p>Tento web nepoužívá cookies, analytické ani reklamní nástroje a nesleduje vaše chování.</p>

    <h2>7. Vaše práva</h2>
    <p>Máte právo požadovat přístup ke svým údajům, jejich opravu nebo výmaz, omezení zpracování, přenositelnost údajů a máte právo vznést námitku. Stačí napsat na <a href="${mailHref}">${esc(k.email)}</a>, odpovím nejpozději do jednoho měsíce.</p>
    <p>Pokud se domníváte, že s údaji nakládám v rozporu s předpisy, můžete podat stížnost u <a href="https://uoou.gov.cz" target="_blank" rel="noopener">Úřadu pro ochranu osobních údajů</a>, Pplk. Sochora 27, 170 00 Praha 7.</p>

    <h2>8. Zabezpečení</h2>
    <p>Web běží výhradně přes šifrované spojení HTTPS. Přístup k přijatým zprávám mám pouze já.</p>

    <p><a class="btn btn-ghost" href="/">← Zpět na úvod</a></p>
  </div>
</main>
${footer()}
<script src="/${jsFile}" defer></script>
</body>
</html>`;
}

/* ---------- build ---------- */
function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const css = minCss(fs.readFileSync(path.join(ROOT, "src/styles.css"), "utf8"));
  const js = fs.readFileSync(path.join(ROOT, "src/main.js"), "utf8");
  const jsFile = `main.${hash(js)}.js`;
  fs.writeFileSync(path.join(DIST, jsFile), js);

  copyDir(path.join(ROOT, "assets"), path.join(DIST, "assets"));

  fs.writeFileSync(path.join(DIST, "index.html"), indexPage(css, jsFile));
  fs.writeFileSync(path.join(DIST, "gdpr.html"), gdprPage(css, jsFile));

  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url("/")}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>${url("/gdpr.html")}</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.2</priority></url>
</urlset>
`
  );
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${url("/sitemap.xml")}\n`);
  fs.writeFileSync(
    path.join(DIST, "404.html"),
    `${head({ title: `Stránka nenalezena | ${c.site.nazev}`, description: c.site.description, canonical: url("/404.html"), css, noindex: true })}
<body>${header(false)}<main id="obsah" class="section legal"><div class="container narrow prose center"><h1>Stránka nenalezena</h1><p>Tahle stránka tu není. Zkuste úvod, nebo rovnou zavolejte.</p><p class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="/">Na úvod</a><a class="btn btn-ghost" href="${telHref}">${icon("tel")}${esc(c.kontakt.telefon)}</a></p></div></main>${footer()}<script src="/${jsFile}" defer></script></body></html>`
  );
  fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
  if (c.site.customDomain) fs.writeFileSync(path.join(DIST, "CNAME"), c.site.customDomain.trim() + "\n");

  const size = fs.statSync(path.join(DIST, "index.html")).size;
  console.log(`✔ Web sestaven do dist/ (index.html ${(size / 1024).toFixed(1)} kB)`);
}

build();
