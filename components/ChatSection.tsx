'use client';

import { motion } from 'framer-motion';
import { FormEvent, useMemo, useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type Tag = 'PK' | 'RU' | 'MIX' | 'NEUTRAL';

const themes: Record<Tag, string> = {
  PK: 'from-emerald-100 to-white',
  RU: 'from-blue-100 via-white to-red-100',
  MIX: 'from-emerald-100 via-blue-50 to-rose-100',
  NEUTRAL: 'from-white to-white'
};

export function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [tag, setTag] = useState<Tag>('NEUTRAL');

  const motif = useMemo(() => {
    if (tag === 'PK') return '●◌●';
    if (tag === 'RU') return '✦✧✦';
    if (tag === 'MIX') return '—◌—';
    return '';
  }, [tag]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const nextMessages = [...messages, { role: 'user', content: input } as ChatMessage];
    setMessages(nextMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: nextMessages })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.replyText }]);
    setTag(data.contextTag as Tag);
  };

  return (
    <motion.section className={`min-h-screen bg-gradient-to-b ${themes[tag]} px-6 py-12 text-slate-900 transition-colors duration-500 md:px-12`}>
      <div className="mx-auto flex h-[80vh] max-w-3xl flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Dialog als Brücke</h2>
          <span className="text-sm text-slate-500">{motif}</span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-4">
          {messages.length === 0 && <p className="text-slate-400">Frage nach Musik, Architektur oder Alltag zwischen Russland und Pakistan.</p>}
          {messages.map((msg, i) => (
            <div key={`${msg.role}-${i}`} className={`max-w-[80%] rounded-xl px-3 py-2 ${msg.role === 'user' ? 'ml-auto bg-slate-900 text-white' : 'bg-white text-slate-800 border border-slate-200'}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-4 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-xl border border-slate-300 px-4 py-3" placeholder="Nachricht eingeben..." />
          <button className="rounded-xl bg-slate-900 px-5 py-3 text-white">Senden</button>
        </form>
      </div>
    </motion.section>
  );
}
