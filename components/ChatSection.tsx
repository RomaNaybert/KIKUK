'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ChatApiResponse = {
  replyText: string;
  contextTag: 'PK' | 'RU' | 'MIX' | 'NEUTRAL';
};

const themes = {
  PK: 'from-emerald-50 via-white to-emerald-100',
  RU: 'from-white via-sky-50 to-red-50',
  MIX: 'from-emerald-50 via-sky-50 to-red-50',
  NEUTRAL: 'from-white via-zinc-50 to-white',
};

export function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [tag, setTag] = useState<keyof typeof themes>('NEUTRAL');

  const motif = useMemo(() => {
    if (tag === 'PK') return '◌';
    if (tag === 'RU') return '✧';
    if (tag === 'MIX') return '∞';
    return '·';
  }, [tag]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user' as const, content: input }];
    setMessages(next);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: next }),
    });

    const data = (await res.json()) as ChatApiResponse;
    setTag(data.contextTag);
    setMessages((prev) => [...prev, { role: 'assistant', content: data.replyText }]);
  };

  return (
    <section className={`relative min-h-screen bg-gradient-to-br ${themes[tag]} px-6 py-14 text-zinc-900 transition-all duration-500`}>
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-6 top-8 text-7xl">{motif}</div>
        <div className="absolute bottom-8 right-8 text-7xl">{motif}</div>
      </div>
      <div className="mx-auto flex h-[78vh] w-full max-w-4xl flex-col rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-soft backdrop-blur">
        <div className="flex-1 space-y-3 overflow-y-auto p-2">
          {messages.length === 0 ? <p className="text-zinc-500">Starten Sie ein Gespräch über Kultur, Werte und KI.</p> : null}
          {messages.map((message, index) => (
            <motion.p
              key={`${message.role}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                message.role === 'user' ? 'ml-auto bg-zinc-900 text-white' : 'bg-zinc-100'
              }`}
            >
              {message.content}
            </motion.p>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            className="flex-1 rounded-xl border border-zinc-200 px-4 py-3"
            placeholder="Fragen Sie nach Gemeinsamkeiten, Unterschieden oder Ideen…"
          />
          <button onClick={sendMessage} className="rounded-xl bg-zinc-900 px-5 py-3 text-white">
            Senden
          </button>
        </div>
      </div>
    </section>
  );
}
