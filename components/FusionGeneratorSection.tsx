'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { categories } from '@/lib/constants';

type GenerationResponse = {
  imageUrl: string;
  titleDe: string;
  descriptionDe: string;
};

export function FusionGeneratorSection() {
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResponse | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, sideA: 'Russland', sideB: 'Pakistan' }),
      });
      const data = (await res.json()) as GenerationResponse;
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-8 py-20 lg:px-16" aria-label="Bildfusion">
      <h2 className="text-3xl font-semibold md:text-5xl">Unterschied finden, Verbindung gestalten.</h2>
      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
        <span className="rounded-full border border-white/15 px-3 py-1">Russland</span>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-white/15 bg-zinc-900 px-4 py-2"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <span className="rounded-full border border-white/15 px-3 py-1">Pakistan</span>
        <button onClick={generate} className="rounded-lg bg-sky-400 px-4 py-2 font-semibold text-zinc-900">
          Unterschied finden
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/70 p-4 md:p-8">
        {loading ? (
          <div className="space-y-6 py-14 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-sky-200 border-t-transparent" />
            <p className="text-zinc-300">Kulturelle Fusion wird generiert…</p>
            <div className="mx-auto h-2 w-full max-w-lg rounded-full bg-zinc-700 bg-[linear-gradient(110deg,#334155,45%,#e2e8f0,55%,#334155)] bg-[length:200%_100%] animate-shimmer" />
          </div>
        ) : result ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="relative h-[360px] overflow-hidden rounded-xl">
              <Image src={result.imageUrl} alt={result.titleDe} fill className="object-cover" />
            </div>
            <h3 className="text-2xl font-semibold">{result.titleDe}</h3>
            <p className="text-zinc-300">{result.descriptionDe}</p>
          </motion.div>
        ) : (
          <p className="py-20 text-center text-zinc-400">Wählen Sie eine Kategorie und starten Sie die Fusion.</p>
        )}
      </div>
    </section>
  );
}
