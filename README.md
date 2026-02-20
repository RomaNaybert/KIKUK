# KI als Brücke zwischen Kulturen

Interaktive One-Page-Website (Deutsch) über Pakistan, Russland und die Frage, ob KI kulturelle Brücken schaffen kann.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (Hero-Hemisphäre)

## Starten
```bash
npm install
npm run dev
```

Öffnen: `http://localhost:3000`

## Umgebungsvariablen
1. `.env.example` nach `.env.local` kopieren.
2. `GIGACHAT_API_KEY` setzen.
3. Optional `GIGACHAT_MODEL` anpassen.

Wenn kein API-Key vorhanden ist, nutzt `/api/chat` einen lokalen Fallback mit Context-Tags.

## API-Endpunkte
### `POST /api/chat`
Input:
```json
{"messages":[{"role":"user","content":"..."}]}
```
Output:
```json
{
  "replyText":"...",
  "contextTag":"PK|RU|MIX|NEUTRAL",
  "uiHints":{"palette":"pk|ru|mix|white","motif":"ornament|architecture|food|music|sport","mood":"calm|energetic|warm"}
}
```

### `POST /api/generate-image`
Input:
```json
{"category":"Essen","sideA":"Russland","sideB":"Pakistan"}
```
Output:
```json
{"imageUrl":"...","titleDe":"...","descriptionDe":"..."}
```

Der Endpunkt liefert aktuell kuratierte Platzhalterbilder pro Kategorie. Für echte Bildgenerierung kann hier später ein Modell-Provider integriert werden; die API-Struktur bleibt identisch.

## Hinweise zur Architektur
- `app/page.tsx`: Scroll-Lock-Sequenz + Zusammensetzung aller 4 Vollbild-Sektionen.
- `components/HeroSection.tsx`: Scrollgetriebene Erdrotation und Werte-Transition.
- `components/StatsSection.tsx`: In-View Counter und Faktenkarten.
- `components/FusionGeneratorSection.tsx`: Kategorieauswahl, Loader, Bildausgabe.
- `components/ChatSection.tsx`: Minimaler Chat mit adaptiver Farbwelt nach `contextTag`.
