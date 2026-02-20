'use client';

import { useEffect, useState } from 'react';
import { ChatSection } from '@/components/ChatSection';
import { FusionGeneratorSection } from '@/components/FusionGeneratorSection';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';

export default function Page() {
  const [sequenceProgress, setSequenceProgress] = useState(0);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setSequenceProgress(1);
      setLocked(false);
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!locked) return;
      event.preventDefault();
      const delta = Math.sign(event.deltaY) * 0.07;
      setSequenceProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + delta));
        if (next >= 1) {
          setLocked(false);
          setTimeout(() => window.scrollTo({ top: window.innerHeight * 0.98, behavior: 'smooth' }), 220);
        }
        return next;
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [locked]);

  return (
    <main>
      <HeroSection progress={sequenceProgress} sequenceDone={sequenceProgress >= 1} />
      <StatsSection />
      <FusionGeneratorSection />
      <ChatSection />
    </main>
  );
}
