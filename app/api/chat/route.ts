import { NextResponse } from 'next/server';
import { askGigaChat, inferContext } from '@/lib/gigachat';

const fallbackTexts = {
  PK: 'Spannend! In Pakistan verbinden Gastfreundschaft, Familie und Handwerk viele Generationen. KI kann solche Stimmen sichtbar machen.',
  RU: 'Russland zeigt eine starke Mischung aus Literatur, Musik und regionalen Traditionen. KI kann diese Vielfalt zugänglich erklären.',
  MIX: 'Genau hier wird KI zur Brücke: Unterschiede bleiben sichtbar, aber Gemeinsamkeiten werden erlebbar.',
  NEUTRAL: 'Gern. Wenn Sie möchten, vergleichen wir als Nächstes konkrete Kulturfelder wie Essen, Musik oder Architektur.',
} as const;

const paletteByTag = { PK: 'pk', RU: 'ru', MIX: 'mix', NEUTRAL: 'white' } as const;

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body?.messages ?? [];

  const fromModel = await askGigaChat(messages);
  if (fromModel?.replyText && fromModel?.contextTag) {
    return NextResponse.json(fromModel);
  }

  const lastMessage = messages[messages.length - 1]?.content ?? '';
  const contextTag = inferContext(lastMessage) as keyof typeof fallbackTexts;

  return NextResponse.json({
    replyText: fallbackTexts[contextTag],
    contextTag,
    uiHints: {
      palette: paletteByTag[contextTag],
      motif: 'ornament',
      mood: 'calm',
    },
  });
}
