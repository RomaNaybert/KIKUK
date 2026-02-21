'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/constants';

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-ink to-slate-900 px-6 py-20 md:px-12">
      <h2 className="mb-10 text-3xl font-semibold md:text-5xl">Distanz im Raum, Nähe in Werten</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <motion.article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">
              {item.prefix}
              <AnimatedNumber value={item.value} />
              {item.suffix}
            </p>
          </motion.article>
        ))}
      </div>
      <p className="mt-12 text-xl font-medium text-emerald-200">Trotz aller Unterschiede teilen wir viele Werte.</p>
    </section>
  );
}
