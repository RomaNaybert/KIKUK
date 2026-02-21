'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatSection } from '@/components/ChatSection';
import { EarthHero } from '@/components/EarthHero';
import { FusionGenerator } from '@/components/FusionGenerator';
import { StatsSection } from '@/components/StatsSection';
import { pakistanValues, russiaValues } from '@/lib/constants';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setProgress(1);
      setLocked(false);
    }
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!locked) return;
      event.preventDefault();
      setProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + event.deltaY * 0.0009));
        if (next >= 1) setLocked(false);
        return next;
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [locked]);

  const activeValues = useMemo(() => (progress < 0.5 ? pakistanValues : russiaValues), [progress]);

  return (
    <main className="bg-ink text-white">
      <section ref={heroRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[32vw] font-black leading-none text-white/5">KI</div>
        <motion.h1 className="relative z-10 mb-8 max-w-3xl text-4xl font-semibold md:text-6xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          Kann KI eine Brücke zwischen Kulturen sein?
        </motion.h1>
        <EarthHero progress={progress} values={activeValues} revealLine={progress >= 0.98} />
        {locked && (
          <p className="mt-6 text-white/70">Scrollen, um die Reise von Pakistan nach Russland zu steuern.</p>
        )}
        <button onClick={() => { setProgress(1); setLocked(false); }} className="mt-4 w-fit rounded-lg border border-white/30 px-4 py-2 text-sm">
          Animation überspringen
        </button>
      </section>
      <StatsSection />
      <FusionGenerator />
      <ChatSection />
    </main>
  );
}
