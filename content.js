/**
 * ===============================================================
 *  VŠECHNY TEXTY, CENY A KONTAKTY WEBU NA JEDNOM MÍSTĚ
 * ===============================================================
 *  Po úpravě spusťte `npm run build` (nebo jen nahrajte změnu na
 *  GitHub – Netlify / GitHub Pages web sestaví samy).
 *
 *  Tipy:
 *  - Texty jsou obyčejné řetězce v uvozovkách. Pokud uvnitř potřebujete
 *    apostrof, použijte typografické uvozovky „ “ – nic nerozbijí.
 *  - Pole označená (HTML) mohou obsahovat jednoduché značky,
 *    např. <strong>tučně</strong> nebo <a href="...">odkaz</a>.
 *  - Řádky označené  // TODO  je potřeba před spuštěním zkontrolovat.
 */

module.exports = {
  // ------------------------------------------------------------
  //  ZÁKLADNÍ ÚDAJE
  // ------------------------------------------------------------
  site: {
    nazev: "Satelitní internet Opava", // TODO: název služby
    // Plná adresa webu BEZ lomítka na konci. Používá se pro SEO, sitemapu a sdílení.
    url: "https://www.satelitni-internet-opava.cz", // TODO: vaše doména
    // Vlastní doména pro GitHub Pages (vytvoří soubor CNAME). Na Netlify nechte prázdné "".
    customDomain: "",
    lang: "cs",
    title: "Montáž Starlink Opava | Satelitní internet na chatu i v Jeseníkách",
    description:
      "Profesionální montáž a instalace satelitního internetu Starlink v Opavě, Moravskoslezském kraji a Jeseníkách. Vyučený elektrikář, rychlé termíny, férové ceny. Internet na chatu i na samotě.",
    keywords:
      "montáž Starlink Opava, instalace Starlink, satelitní internet Opava, internet na chatu, Starlink Jeseníky",
    ogImage: "/assets/og-image.png",
    themeColor: "#0b1020",
  },

  kontakt: {
    jmeno: "Tomáš Till",
    telefon: "702 212 815", // jak se zobrazí na webu
    telefonOdkaz: "+420702212815", // pro tel: odkaz (bez mezer)
    email: "tomatil@seznam.cz",
    ico: "17504538",
    mesto: "Opava",
    psc: "746 01",
    kraj: "Moravskoslezský kraj",
    // Sídlo podle živnostenského rejstříku (pro GDPR). Nechcete-li zveřejnit ulici, stačí obec.
    sidlo: "Opava", // TODO: případně doplňte celou adresu sídla
    oblast: ["Opava a okolí", "Moravskoslezský kraj", "Jeseníky"],
    // Zeměpisné souřadnice pro schema.org (centrum Opavy)
    geo: { lat: 49.9387, lng: 17.9026 },
    // Kdy jste k zastižení (zobrazuje se u kontaktu)
    dostupnost: "Po–Pá 7–19 h, So po domluvě",
  },

  // Formspree: zaregistrujte se na formspree.io, vytvořte formulář a vložte sem
  // jeho adresu, např. "https://formspree.io/f/abcdwxyz".
  // Dokud je prázdné, formulář otevře e-mailového klienta (mailto) s vyplněnými údaji.
  formspreeEndpoint: "", // TODO

  // Upozornění o nezávislosti (zobrazuje se v patičce a u ceníku)
  nezavislost: "Nezávislá montážní služba, nejsme součástí Starlink ani SpaceX.",
  nezavislostDetail:
    "Nejsem autorizovaný partner ani prodejce Starlink či SpaceX. Starlink je ochranná známka společnosti Space Exploration Technologies Corp. Název používám pouze k označení zařízení, které montuji.",

  // ------------------------------------------------------------
  //  NAVIGACE
  // ------------------------------------------------------------
  menu: [
    { text: "Jak to funguje", kotva: "jak-to-funguje" },
    { text: "Služby", kotva: "sluzby" },
    { text: "Ceník", kotva: "cenik" },
    { text: "Realizace", kotva: "galerie" },
    { text: "Dotazy", kotva: "faq" },
    { text: "Kontakt", kotva: "kontakt" },
  ],

  // ------------------------------------------------------------
  //  1. HERO
  // ------------------------------------------------------------
  hero: {
    stitek: "Opava · Moravskoslezský kraj · Jeseníky",
    nadpis: "Rychlý internet i tam, kam optika nedosáhne",
    podnadpis:
      "Namontuji a nastavím satelitní internet Starlink na váš dům, chatu nebo firmu. Pevně, bezpečně a s čistě vedeným kabelem – od vyučeného elektrikáře z Opavy.",
    tlacitkoNabidka: "Chci nezávaznou nabídku",
    tlacitkoVolat: "Zavolat",
    body: ["Vyučený elektrikář", "Termín obvykle do 14 dnů", "Uzemnění a ochrana před bleskem"],
  },

  // ------------------------------------------------------------
  //  2. JAK TO FUNGUJE
  // ------------------------------------------------------------
  kroky: {
    nadpis: "Jak to funguje",
    uvod: "Od prvního telefonu po funkční Wi-Fi ve čtyřech jednoduchých krocích.",
    polozky: [
      {
        nadpis: "Ozvete se",
        text: "Zavolejte nebo vyplňte formulář. Stačí obec a typ objektu – zbytek doladíme.",
      },
      {
        nadpis: "Obhlídka a konzultace",
        text: "Prověřím výhled na oblohu, překážky a nejlepší místo pro anténu. Řeknu vám přesnou cenu.",
      },
      {
        nadpis: "Objednáte sadu",
        text: "Sadu si koupíte sami na starlink.com nebo v e-shopu. Rád poradím, kterou vybrat.",
      },
      {
        nadpis: "Namontuji a nastavím",
        text: "Pevná montáž, kabel do domu, uzemnění a nastavení Wi-Fi. Odcházím, až vše jede.",
      },
    ],
  },

  // ------------------------------------------------------------
  //  3. SLUŽBY  (ikona: dum | kabel | blesk | wifi | kosik | servis)
  // ------------------------------------------------------------
  sluzby: {
    nadpis: "Co pro vás udělám",
    uvod: "Kompletní instalace satelitního internetu od jednoho člověka – bez subdodavatelů.",
    polozky: [
      {
        ikona: "dum",
        nadpis: "Montáž antény",
        text: "Na střechu, štít domu, stožár, plochou střechu i do zahrady. Pevně a odolně vůči větru.",
      },
      {
        ikona: "kabel",
        nadpis: "Kabel do domu a napájení",
        text: "Čistě vedený kabel, průchod zdí s utěsněním, napájení na vhodném místě.",
      },
      {
        ikona: "blesk",
        nadpis: "Uzemnění a ochrana před bleskem",
        text: "Jako elektrikář řeším uzemnění a přepěťovou ochranu tak, jak má být.",
      },
      {
        ikona: "wifi",
        nadpis: "Wi-Fi a posílení signálu",
        text: "Nastavení sítě, mesh pro větší domy, kontrola pokrytí ve všech místnostech.",
      },
      {
        ikona: "kosik",
        nadpis: "Pomoc s výběrem sady",
        text: "Poradím, kterou sadu a tarif vybrat a jak ji objednat. Sadu kupujete napřímo.",
      },
      {
        ikona: "servis",
        nadpis: "Servis, přemístění, demontáž",
        text: "Anténa překáží, stěhujete se nebo signál vypadává? Přijedu a vyřeším to.",
      },
    ],
    proKoho: {
      nadpis: "Pro koho",
      polozky: ["Chaty a chalupy", "Samoty a vesnice bez optiky", "Firmy a provozovny", "Stavby", "Akce a festivaly"],
    },
  },

  // ------------------------------------------------------------
  //  4. CENÍK  – ceny upravujte zde
  // ------------------------------------------------------------
  cenik: {
    nadpis: "Orientační ceník",
    uvod: "Bez skrytých poplatků. Přesnou cenu znáte předem, ještě před montáží.",
    polozky: [
      // TODO: doplňte své ceny
      { sluzba: "Základní montáž", popis: "Anténa na zahradu nebo na fasádu, kabel do 15 m, zprovoznění a nastavení Wi-Fi", cena: "2 990 Kč" },
      { sluzba: "Montáž na střechu / stožár", popis: "Včetně držáku a bezpečného uchycení, uzemnění dle situace", cena: "od 4 490 Kč" },
      { sluzba: "Kabeláž nad 15 m", popis: "Každý další metr kabelu včetně vedení a chráničky", cena: "40 Kč/m" },
      { sluzba: "Doprava", popis: "V Opavě zdarma, mimo Opavu za každý ujetý km", cena: "12 Kč/km" },
    ],
    poznamka:
      "Ceny jsou orientační, finální cenu stanovím po konzultaci nebo obhlídce. Hardware (sada Starlink) ani měsíční předplatné nejsou v ceně – sadu kupujete přímo od výrobce nebo v e-shopu.",
    tlacitko: "Spočítat přesnou cenu",
  },

  // ------------------------------------------------------------
  //  5. PROČ JÁ
  // ------------------------------------------------------------
  procJa: {
    nadpis: "Proč si vybrat mě",
    uvod: "Jsem Tomáš Till, vyučený elektrikář a instalatér z Opavy. Montáž dělám sám, pečlivě a tak, abych se za ni nemusel stydět.",
    polozky: [
      { nadpis: "Vyučený elektrikář", text: "Napájení, uzemnění i přepěťovou ochranu udělám odborně a bezpečně." },
      { nadpis: "Místní", text: "Bydlím v Opavě, znám region od Hlučínska po Jeseníky. Žádné dlouhé čekání na technika zdaleka." },
      { nadpis: "Rychlé termíny", text: "Obvykle do 14 dnů od objednání, v naléhavých případech i dřív." },
      { nadpis: "Férové ceny", text: "Cenu znáte předem. Žádné příplatky, o kterých se dozvíte až na faktuře." },
    ],
  },

  // ------------------------------------------------------------
  //  6. GALERIE  – vlastní fotky nahrajte do assets/img/galerie/
  //  a změňte "src". Doporučení: WebP nebo JPG, šířka cca 1200 px, do 250 kB.
  // ------------------------------------------------------------
  galerie: {
    nadpis: "Realizace",
    uvod: "Ukázky z montáží. Fotky průběžně doplňuji.",
    fotky: [
      { src: "/assets/img/galerie/placeholder-1.svg", alt: "Anténa satelitního internetu na střeše rodinného domu", popis: "Rodinný dům, Opava" },
      { src: "/assets/img/galerie/placeholder-2.svg", alt: "Anténa na stožáru u horské chaty", popis: "Chata, Jeseníky" },
      { src: "/assets/img/galerie/placeholder-3.svg", alt: "Anténa na štítu domu s čistě vedeným kabelem", popis: "Štít domu, Hlučínsko" },
      { src: "/assets/img/galerie/placeholder-1.svg", alt: "Anténa na ploché střeše firemní budovy", popis: "Firma, Kravaře" },
      { src: "/assets/img/galerie/placeholder-2.svg", alt: "Anténa na zahradě u chalupy", popis: "Chalupa, Vítkovsko" },
      { src: "/assets/img/galerie/placeholder-3.svg", alt: "Dočasná instalace na stavbě", popis: "Stavba, Bruntálsko" },
    ],
  },

  // ------------------------------------------------------------
  //  7. ČASTÉ DOTAZY  (odpověď = HTML)
  // ------------------------------------------------------------
  faq: {
    nadpis: "Časté dotazy",
    polozky: [
      {
        otazka: "Kolik stojí Starlink měsíčně?",
        odpoved:
          'Cenu předplatného i sady určuje přímo Starlink a čas od času ji mění. Aktuální tarify najdete na <a href="https://www.starlink.com/cz" target="_blank" rel="noopener">oficiálním webu starlink.com</a>. Já účtuji pouze montáž podle ceníku výše.',
      },
      {
        otazka: "Jak rychlý satelitní internet je?",
        odpoved:
          "Běžně desítky až stovky Mbit/s ke stažení a odezva obvykle kolem 25–60 ms. Bez problémů zvládne videohovory, streamování i práci z domova. Rychlost se může během dne měnit podle vytížení sítě.",
      },
      {
        otazka: "Potřebuji k montáži povolení?",
        odpoved:
          "Na vlastní rodinný dům, chatu nebo pozemek zpravidla ne. Výjimkou mohou být památkové zóny, vyšší samostatné stožáry nebo bytové domy, kde je potřeba souhlas SVJ či majitele. Při konzultaci vám řeknu, jestli se vás to týká.",
      },
      {
        otazka: "Co když jsou kolem stromy nebo jiné překážky?",
        odpoved:
          "Anténa potřebuje co nejvolnější výhled na oblohu (u nás hlavně k severu). Před montáží výhled ověřím a najdu nejlepší místo – často pomůže vyšší držák nebo stožár, případně umístění na zahradě.",
      },
      {
        otazka: "Jak dlouho montáž trvá?",
        odpoved:
          "Běžná montáž zabere 2–4 hodiny. Složitější instalace na stožár, s dlouhým kabelem nebo s mesh Wi-Fi po celém domě může trvat déle – vždy vám to řeknu dopředu.",
      },
      {
        otazka: "Musím mít sadu koupenou předem?",
        odpoved:
          "Ideálně ano – sadu si objednáte sami a já ji pak namontuji. Pokud si nejste jistí, kterou vybrat, ozvěte se ještě před nákupem a poradím vám.",
      },
      {
        otazka: "Funguje to i v zimě, v dešti a ve sněhu?",
        odpoved:
          "Ano. Anténa umí rozpouštět sníh a je stavěná na venkovní provoz. Při velmi silném dešti nebo bouřce může krátce kolísat rychlost. Proto dbám na pevné uchycení a uzemnění.",
      },
      {
        otazka: "Jezdíte i mimo Opavu?",
        odpoved:
          "Ano – po celém Moravskoslezském kraji a v Jeseníkách. Doprava mimo Opavu se účtuje podle ceníku.",
      },
    ],
  },

  // ------------------------------------------------------------
  //  8. KONTAKTNÍ FORMULÁŘ
  // ------------------------------------------------------------
  formular: {
    nadpis: "Nezávazná poptávka",
    uvod: "Napište mi pár údajů a do 24 hodin (v pracovní dny) se vám ozvu s nabídkou. Nebo rovnou zavolejte.",
    typyObjektu: ["Rodinný dům", "Chata / chalupa", "Firma", "Jiné"],
    odeslat: "Odeslat poptávku",
    dekujeme: "Děkuji, poptávka dorazila. Ozvu se vám co nejdříve.",
    chyba: "Odeslání se nepovedlo. Otevírám váš e-mail s vyplněnou zprávou – stačí ji odeslat.",
  },
};
