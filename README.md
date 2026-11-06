# Satelitní internet Opava – web

Statický, rychlý web pro montáž satelitního internetu (Tomáš Till, Opava).
Čisté HTML + CSS + ~3 kB JS, **bez knihoven a bez `npm install`**.

## Jak upravovat

**Všechny texty, ceny, kontakty, FAQ a fotky jsou v jediném souboru `content.js`.**
Řádky s `// TODO` zkontrolujte před spuštěním (název, doména, ceny, Formspree).

| Co chci změnit | Kde |
|---|---|
| Ceny | `content.js` → `cenik.polozky` |
| Telefon, e-mail, IČO, oblast | `content.js` → `kontakt` |
| Otázky a odpovědi | `content.js` → `faq.polozky` |
| Fotky realizací | nahrajte do `assets/img/galerie/`, upravte `galerie.fotky` |
| Formulář (Formspree) | `content.js` → `formspreeEndpoint` |
| Barvy | `src/styles.css` → blok `:root` nahoře |

Po změně stačí změnu nahrát na GitHub – Netlify i GitHub Pages web sestaví samy.

### Lokální náhled (volitelné, potřebuje Node.js 18+)
```bash
npm run dev      # sestaví a spustí http://localhost:8080
npm run build    # jen sestaví do složky dist/
```

### Fotky
- Formát WebP nebo JPG, šířka cca 1200 px, velikost do ~250 kB
  (zdarma zmenšíte např. na squoosh.app).
- Vyplňte výstižný `alt` (popis pro nevidomé a Google), např. „Anténa na stožáru u chaty v Karlově Studánce“.
- Obrázky se načítají líně (lazy loading) – web zůstává rychlý.

### Formulář (Formspree)
1. Registrace zdarma na https://formspree.io (cílový e-mail tomatil@seznam.cz).
2. *New Form* → zkopírujte adresu typu `https://formspree.io/f/abcdwxyz`.
3. Vložte ji do `formspreeEndpoint` v `content.js`.

Dokud endpoint chybí (nebo když Formspree selže), formulář otevře e-mailovou
aplikaci návštěvníka s předvyplněnou zprávou (mailto).

### Obrázek pro sdílení (og-image)
`assets/og-image.png` a `apple-touch-icon.png` jsou vygenerované.
Po změně názvu/telefonu je můžete přegenerovat: `node tools/render-images.js`
(vyžaduje Playwright), nebo je nahradit vlastním obrázkem 1200×630 px.

## Struktura
```
content.js        ← VŠECHNY texty a údaje
build.js          ← generátor → dist/ (index.html, gdpr.html, 404, sitemap.xml, robots.txt)
serve.js          ← lokální náhled
src/styles.css    ← vzhled
src/main.js       ← menu + odeslání formuláře
assets/           ← favicon, og-image, fotky
netlify.toml      ← nastavení Netlify
.github/workflows/pages.yml ← nasazení na GitHub Pages
```

## Právní upozornění
Web obsahuje upozornění „Nezávislá montážní služba, nejsme součástí Starlink ani SpaceX.“
(patička + ceník) a nepoužívá logo ani fotky Starlinku. Text zásad GDPR (`gdpr.html`)
je vzor – doporučujeme nechat jej zkontrolovat.
