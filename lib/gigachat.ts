const SYSTEM_PROMPT =
  'Du bist der Assistent des Projekts „KI als Brücke zwischen Kulturen“. Antworte nur auf Deutsch und liefere JSON: {"replyText":"...","contextTag":"PK|RU|MIX|NEUTRAL","uiHints":{"palette":"pk|ru|mix|white","motif":"ornament|architecture|food|music|sport","mood":"calm|energetic|warm"}}';

type IncomingMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export async function askGigaChat(messages: IncomingMessage[]) {
  const token = process.env.GIGACHAT_API_KEY;
  if (!token) return null;

  const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GIGACHAT_MODEL ?? 'GigaChat:latest',
      temperature: 0.5,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function inferContext(content: string) {
  const text = content.toLowerCase();
  const pk = /(pakistan|lahore|karatschi|islamabad|urdu|punjab|sufi|biryani)/.test(text);
  const ru = /(russland|moskau|sankt petersburg|kasan|kyrill|borschtsch|taiga)/.test(text);

  if (pk && ru) return 'MIX';
  if (pk) return 'PK';
  if (ru) return 'RU';
  return 'NEUTRAL';
}
