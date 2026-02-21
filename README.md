# KI als Brücke zwischen Kulturen

Eine cinematic One-Page-Webseite (Deutsch) mit Next.js App Router, TypeScript, Tailwind, Framer Motion und Three.js.

## Features

- **Sektion 1:** Scroll-gebundene Hero-Sequenz mit halber Erde und kulturellen Werte-Labels.
- **Sektion 2:** Animierte Vergleichszahlen zwischen Pakistan und Russland.
- **Sektion 3:** Generator-Panel „Unterschied finden“ mit API-Flow und Fallback-Illustrationen.
- **Sektion 4:** Minimaler Chat-Bereich mit dynamischer Theme-Anpassung (`PK`, `RU`, `MIX`, `NEUTRAL`).

## Start

```bash
npm install
npm run dev
```

Dann öffnen: `http://localhost:3000`

## Umgebungsvariablen

1. `.env.example` nach `.env.local` kopieren.
2. Werte setzen:

```bash
GIGACHAT_API_KEY=...
GIGACHAT_BASE_URL=https://gigachat.devices.sberbank.ru/api/v1
GIGACHAT_MODEL=GigaChat
```

## API-Endpunkte

### `POST /api/chat`
Input:

```json
{ "messages": [{ "role": "user", "content": "..." }] }
```

Output:

```json
{
  "replyText": "...",
  "contextTag": "PK|RU|MIX|NEUTRAL",
  "uiHints": {
    "palette": "pk|ru|mix|white",
    "motif": "ornament|architecture|food|music|sport",
    "mood": "calm|energetic|warm"
  }
}
```

### `POST /api/generate-image`
Input:

```json
{ "category": "Essen", "sideA": "Russland", "sideB": "Pakistan" }
```

Output:

```json
{
  "imageUrl": "/placeholders/essen.svg",
  "titleDe": "...",
  "descriptionDe": "..."
}
```

## Anschluss eines echten Bildgenerators

Ersetze die Placeholder-Logik in `app/api/generate-image/route.ts` durch einen API-Aufruf zu einem Bildmodell und gib weiterhin dasselbe JSON-Schema zurück.
