# Portfolio Nathan Leray — CLAUDE.md

## Architecture
- **Monofichier** : tout dans `index.html` (HTML + CSS + JS inline, ~1750 lignes)
- **Pas de framework** : vanilla HTML/CSS/JS pur
- **Projets embarqués** : iframes vers `sites/` (ex: `sites/seve-restaurant/`)
- **Formulaire contact** : Formspree (`https://formspree.io/f/xpqoablg`)
- **Hébergement** : GitHub Pages — repo `NathanSkibidi/Portfolio`

## Concept central
Fenêtre **macOS Safari** centrée (80vw) sur fond blanc. Le portfolio EST un navigateur :
- Title bar avec traffic lights (rouge/jaune/vert)
- Onglets colorés par projet (Chrome tabs)
- Barre d'outils avec flèches nav, URL dynamique, bouton "En savoir +"
- Les projets sont des **sites vivants** dans des iframes (pas des screenshots)

## Direction artistique
- **Ton** : Apple-like, minimaliste raffiné, professionnel
- **Fond** : blanc pur `#FFFFFF`, fenêtre gris chaud `#F0EFED`
- **Accent** : rouge `#FF2D00` (dot nav active, liens hover)
- **Typographies** :
  - `Bebas Neue` — titres (uppercase, impact)
  - `Cormorant` italic — logo "Nathan Leray"
  - `DM Mono` 300/400 — body, UI, tags, boutons
- **Curseur custom** : SVG blanc avec bordure noire (flèche macOS stylisée)
- **Animations** : `cubic-bezier(0.16,1,0.3,1)`, fadeIn staggered au chargement

## 3 vues (switchView)
1. **Projets** (`proj`) — chrome visible, onglets + toolbar + slides iframe
2. **À propos** (`ap`) — chrome caché, split layout (gauche info / droite bio+stack)
3. **Contact** (`ct`) — chrome caché, split layout (gauche accroche / droite formulaire)

## Projets (PROJECTS array)
6 projets avec : `name`, `color`, `url`, `desc`, `tags[]`, `live?`, `image?`, `case?`
- Sève Restaurant — seul projet avec iframe live (`sites/seve-restaurant/`)
- 5 autres en placeholder "À venir" (Orbit, Verde, Pulse, Atelier, Luma)
- Case study = objet `{role, year, client, brief, approach, features[], result}`

## Case study
- **Desktop** : modal overlay (backdrop + panneau droit slide-in depuis la droite)
- **Mobile** : bottom sheet iOS-style (swipe down pour fermer)
- Accessible via bouton "En savoir +" dans l'infobar ou toolbar

## Loader rétro Mac
Chaque slide a un loader style boot macOS (logo Apple + barre de progression).
Se masque quand l'iframe charge ou après 1.2s pour les placeholders.

## Mobile (< 768px)
- Fenêtre macOS → plein écran, chrome masqué
- Nav gauche + logo → tab bar bottom (3 onglets : Projets/À propos/Contact)
- Slides → swipe horizontal + dots indicateurs
- Info projet sous l'iframe (nom, desc, tags, "Voir le site", "Détails")
- Case study → bottom sheet (mob-sheet) au lieu de modal
- Layouts split → stack vertical

## CSS clés
- `.has-iframe .proj-info` : infobar masquée par défaut (pas de hover sur iframe)
- `.proj-slide:not(.has-iframe):hover .proj-info` : hover uniquement sur placeholders
- `.tb-info` toggle `.show-info` sur les slides iframe
- Lazy-loading iframes via `data-src` → `src` au switch d'onglet

## Points d'attention
- Ne pas casser la métaphore macOS — tout doit rester cohérent "navigateur"
- Placeholders sont temporaires — seront remplacés par de vrais projets
- Le formulaire POST vers Formspree en AJAX (pas de rechargement page)
- Accessibility : focus-visible, prefers-reduced-motion, aria-labels
