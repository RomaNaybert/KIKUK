'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { categories } from '@/lib/constants';

type ApiResult = {
  imageUrl: string;
  titleDe: string;
  descriptionDe: string;
};

export function FusionGenerator() {
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const generate = async () => {
    setLoading(true);
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, sideA: 'Russland', sideB: 'Pakistan' })
    });
    const data = (await response.json()) as ApiResult;
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-20 md:px-12">
      <h2 className="mb-8 text-3xl font-semibold md:text-5xl">Unterschied finden</h2>
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-4">
        <span>Russland</span>
        <select className="rounded-lg bg-black/40 px-4 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <span>Pakistan</span>
      </div>
      <button onClick={generate} className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:scale-[1.02]">
        Unterschied finden
      </button>
      <div className="mt-8 min-h-[420px] rounded-3xl border border-white/10 bg-black/30 p-6">
        {loading && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <motion.div className="h-12 w-12 rounded-full border-2 border-white/25 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="h-2 w-full max-w-md rounded bg-white/10" initial={{ opacity: 0.4 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} />
            <p className="text-white/70">Kulturelle Fusion wird visualisiert...</p>
          </div>
        )}
        {!loading && result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Image src={result.imageUrl} alt={result.titleDe} width={1200} height={600} className="h-[320px] w-full rounded-2xl object-cover" />
            <h3 className="text-2xl font-semibold">{result.titleDe}</h3>
            <p className="text-white/75">{result.descriptionDe}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
