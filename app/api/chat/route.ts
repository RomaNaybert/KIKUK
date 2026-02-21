import { NextResponse } from 'next/server';

type Body = { messages: { role: 'user' | 'assistant' | 'system'; content: string }[] };

const SYSTEM_PROMPT = `Du bist ассистент проекта “KI als Brücke zwischen Kulturen”. Antworte nur auf Deutsch. Gib strikt JSON im Format {"replyText":"...","contextTag":"PK|RU|MIX|NEUTRAL","uiHints":{"palette":"pk|ru|mix|white","motif":"ornament|architecture|food|music|sport","mood":"calm|energetic|warm"}} zurück.`;

export async function POST(req: Request) {
  const body = (await req.json()) as Body;
  const key = process.env.GIGACHAT_API_KEY;
  const base = process.env.GIGACHAT_BASE_URL;

  if (key && base) {
    try {
      const response = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          model: process.env.GIGACHAT_MODEL || 'GigaChat',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...body.messages],
          temperature: 0.5
        })
      });

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text === 'string') {
        const parsed = JSON.parse(text);
        return NextResponse.json(parsed);
      }
    } catch {
      // Fallback below
    }
  }

  const latest = body.messages.at(-1)?.content?.toLowerCase() || '';
  const mentionsPK = /pakistan|lahore|karatschi|urdu|sufi/.test(latest);
  const mentionsRU = /russland|moskau|sibirien|russisch|slaw/.test(latest);
  const contextTag = mentionsPK && mentionsRU ? 'MIX' : mentionsPK ? 'PK' : mentionsRU ? 'RU' : 'NEUTRAL';

  return NextResponse.json({
    replyText:
      contextTag === 'MIX'
        ? 'Beide Kulturen zeigen, wie Tradition und Innovation zusammenwirken können. KI hilft, Gemeinsamkeiten sichtbar zu machen.'
        : contextTag === 'PK'
          ? 'Pakistan bringt reiche Muster, Musik und Gastfreundschaft ein. KI kann diese Perspektiven respektvoll vermitteln.'
          : contextTag === 'RU'
            ? 'Russland verbindet starke Kunsttraditionen mit technischer Neugier. KI kann diesen kulturellen Kontext zugänglich machen.'
            : 'Gern! Frag mich nach Essen, Architektur oder Musik zwischen Pakistan und Russland.',
    contextTag,
    uiHints: {
      palette: contextTag === 'MIX' ? 'mix' : contextTag === 'PK' ? 'pk' : contextTag === 'RU' ? 'ru' : 'white',
      motif: contextTag === 'MIX' ? 'architecture' : contextTag === 'PK' ? 'ornament' : contextTag === 'RU' ? 'music' : 'sport',
      mood: contextTag === 'NEUTRAL' ? 'calm' : 'warm'
    }
  });
}
