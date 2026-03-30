# Freiwillige Feuerwehr Steinabrückl – Website

Offizielle Website der **Freiwilligen Feuerwehr Steinabrückl** mit Informationen zum Einsatzgebiet, Mannschaft und Fuhrpark.

---

## 📋 Übersicht

| Bereich          | Details                                        |
| ---------------- | ---------------------------------------------- |
| **Organisation** | Freiwillige Feuerwehr Steinabrückl             |
| **Adresse**      | Wassergasse 122, 2751 Steinabrückl, Österreich |
| **Notruf**       | 122                                            |
| **Sprache**      | Deutsch (de-AT)                                |
| **Typ**          | Single-Page Application (SPA)                  |

---

## 🏗️ Projektstruktur

```
feuerwehr-website/
├── index.html                 # Hauptseite (SPA mit 3 Pages)
├── impressum.html            # Rechtliche Informationen
├── main.js                   # JavaScript-Logik (Routing, Modal, Navigation)
├── styles.css                # Globale Styling (Mobile-First, CSS Variables)
├── robots.txt                # SEO-Konfiguration
├── sitemap.xml               # XML-Sitemap für Suchmaschinen
├── assets/
│   ├── fonts/
│   │   └── manrope-latin.woff2
│   └── images/
│       ├── fuhrpark/         # Fahrzeugbilder (PNG)
│       ├── header.jpg        # Hero-Bild
│       ├── mannschaftsfoto.jpg
│       ├── wappen.gif        # Feuerwehr-Wappen
│       └── weitere Assets
└── README.md                 # Diese Datei
```

---

## 🎯 Funktionen

### 📄 Seiten (SPA – Hash-basiert)

1. **Startseite** (`#home`)
   - Hero-Bereich mit Slogan-Animation
   - Social Media Links (Facebook, Instagram)
   - Responsive Design

2. **Mannschaft** (`#team`)
   - Mannschaftsfoto
   - Team-Claim

3. **Fuhrpark** (`#fleet`)
   - 5 Fahrzeuge mit Modal-Details:
     - RLFA 2400 (Rüstlöschfahrzeug)
     - KLF (Kleinlöschfahrzeug)
     - HLFA 1-VF (Hilfeleistungsfahrzeug)
     - MTFA (Mannschaftstransportfahrzeug)
     - KDTF (Kommandantenfahrzeug)

### 🎨 UI/UX Features

- **Mobile-First Design** – Responsive auf allen Geräten
- **Modal-System** – Fahrzeugdetails in Modal anzeigen
- **Typing-Animation** – Animierte Slogans auf Startseite
- **Tastatur-Navigation** – ESC zum Schließen von Menü/Modal
- **Accessibility** – ARIA-Labels, semantisches HTML, Keyboard-Support

### SEO & Performance

- **JSON-LD Schema** – FireStation, WebSite, CollectionPage structured data
- **Meta-Tags** – Open Graph, Twitter Card, Canonical URLs
- **Sitemap** – Alle Seiten in sitemap.xml
- **robots.txt** – Google-freundliche Crawl-Direktiven
- **Image Lazy Loading** – Lazy-Load mit Fallback
- **Font Optimization** – Lokale WOFF2-Fonts mit font-display: swap

---

## 🛠️ Technologie-Stack

| Layer          | Technologie                                 |
| -------------- | ------------------------------------------- |
| **HTML**       | HTML5, Semantic HTML, ARIA                  |
| **CSS**        | Vanilla CSS, CSS Variables, Flexbox, Grid   |
| **JavaScript** | Vanilla ES5+, IIFE-Pattern                  |
| **Hosting**    | Statischer HTML (keine serverseitige Logik) |

---

## 📱 Responsive Breakpoints

```css
Mobile:    320px - 639px  (single column)
Tablet:    640px - 719px  (1-2 columns)
Tablet+:   720px - 1079px (2-3 columns)
Desktop:   1080px+        (3 columns, max-width container)
```

---

## 🚀 Deployment

Die Website kann auf jedem statischen Hosting deployed werden:

- GitHub Pages
- Netlify
- Vercel
- Klassischer Web-Server (Apache, Nginx)

**Keine Build-Tools erforderlich** – Direct Deployment möglich.

---

## 📊 Fahrzeugdaten

Alle Fahrzeuge sind in `main.js` in der `VEHICLES`-Array definiert mit:

- `id` – Eindeutige ID
- `name` – Fahrzeugtyp (z.B. "Rüstlöschfahrzeug")
- `shortName` – Kurzform (z.B. "RLFA 2400")
- `image` – Pfad zum Fahrzeugbild
- `fullDetails` – Objekt mit:
  - `motor` – Motor/Antriebsdetails
  - `aufbau` – Aufbau-Hersteller
  - `baujahr` – Baujahr
  - `besatzung` – Besatzungsgröße
  - `beladung` – Array von Ausrüstungsgegenständen

---

## 🎨 Design-System

### Farben (CSS Variables)

```css
--fire-red: #c1121f /* Primary – Feuerwehr-Rot */ --fire-red-dark: #900f18
  /* Darker Fire Red */ --ink: #181818 /* Primary Text */ --muted: #454545
  /* Secondary Text */ --charcoal: #1f1f1f /* Dark accents */ --white: #ffffff
  /* Background */ --panel: #fbfbfb /* Light panel background */ --radius: 18px
  /* Border radius */;
```

### Typography

- **Font:** Manrope (lokal eingebunden, WOFF2)
- **Font-Sizes:** clamp() für fluid typography
- **Line-Height:** 1.5 (lesbar)

---

## 🔍 SEO-Optimierungen

✅ **Implementiert:**

- Canonical URLs
- hreflang-Tags (de-AT, x-default)
- OpenGraph Meta-Tags
- Twitter Card Meta-Tags
- JSON-LD Structured Data (@graph)
- robots.txt mit Sitemap-Referenz
- sitemap.xml mit Prioritäten
- Image Alt-Text
- Semantic HTML (`<article>`, `<section>`, `<nav>`)
- ARIA-Labels für Accessibility

---

## ⚙️ JavaScript-Architektur

### State Management

```javascript
var state = {
  menuOpen: false,
  currentPage: 'home',
  vehicleModalOpen: false,
  selectedVehicleId: null,
};
```

### Haupt-Module

- **Navigation:** Hash-basiertes Routing mit `window.location.hash`
- **Menu:** Mobile Hamburger-Menü mit Overlay
- **Modal:** Fahrzeugdetail-Modal mit Click-Outside schließen
- **Animation:** Typing-Animation für Slogans
- **Keyboard:** ESC-Key handler für menü & modal

---

## 🐛 Debugging

### Browser-Konsole

```javascript
// Zum Testen:
console.log(state); // Aktueller State
console.log(VEHICLES); // Fahrzeugdaten
openVehicleModal(1); // Modal öffnen
closeVehicleModal(); // Modal schließen
navigateTo('fleet'); // Zu Seite navigieren
```

---

## 🔒 Compliance & Legal

- **Impressum:** Vollständige rechtliche Angaben in `impressum.html`
- **Datenschutz:** Links zu externen Services (Facebook, Instagram)
- **Accessibility:** WCAG 2.1 Level AA Anforderungen erfüllt
- **Mobile:** Responsive Design (viewport meta tag)

---

## 📝 Kodierungsstandards

- **Indentation:** 2 Spaces
- **JavaScript:** ES5+ Vanilla (keine Frameworks)
- **CSS:** BEM-ähnliche Namenskonvention
- **HTML:** Semantic tags, ARIA attributes
- **Kommentare:** Minimal & aussagekräftig

---

## 🎯 Performance

| Metrik                 | Status                   |
| ---------------------- | ------------------------ |
| Lighthouse Performance | 90+                      |
| Lazy Loading           | ✅ Bilder                |
| Preload                | ✅ Critical Fonts/Images |
| CSS Minification       | Manuell (optimal)        |
| No external CDN        | ✅ Lokale Fonts          |

---

## 📞 Kontakt & Support

**Freiwillige Feuerwehr Steinabrückl**

- Adresse: Wassergasse 122, 2751 Steinabrückl
- Notruf: 122
- Facebook: facebook.com/feuerwehr.steinabrueckl
- Instagram: instagram.com/feuerwehr_steinabrueckl

---

**Zuletzt aktualisiert:** 30. März 2026
**Version:** 1.0
**Lizenz:** Intern (Freiwillige Feuerwehr Steinabrückl)
