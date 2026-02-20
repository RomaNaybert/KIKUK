'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { funFacts } from '@/lib/constants';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const base = useMotionValue(0);
  const spring = useSpring(base, { duration: 1.2 });
  const display = useTransform(spring, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (inView) base.set(value);
  }, [base, inView, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StatsSection() {
  return (
    <section className="min-h-screen bg-zinc-900 px-8 py-20 lg:px-16" aria-label="Vergleich in Zahlen">
      <h2 className="text-3xl font-semibold md:text-5xl">Distanz — und doch erstaunlich nah.</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {funFacts.map((fact) => (
          <article key={fact.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">{fact.label}</p>
            <p className="mt-3 text-3xl font-semibold text-sky-200">
              {fact.prefix}
              <AnimatedNumber value={fact.value} />
              {fact.suffix}
            </p>
          </article>
        ))}
      </div>
      <motion.p
        className="mt-16 text-center text-2xl font-medium text-zinc-200"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Trotz aller Unterschiede teilen wir viele Werte.
      </motion.p>
    </section>
  );
}
