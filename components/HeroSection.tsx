'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pakistanValues, russiaValues } from '@/lib/constants';

type HeroProps = {
  progress: number;
  sequenceDone: boolean;
};

export function HeroSection({ progress, sequenceDone }: HeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2.7, 48, 48, 0, Math.PI);
    const material = new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      roughness: 0.8,
      metalness: 0.1,
      wireframe: false,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(3, 2, 4);
    scene.add(ambient, directional);

    camera.position.z = 6;

    let raf = 0;
    const animate = () => {
      globe.rotation.y = reducedMotion ? 0 : progress * Math.PI;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [progress, reducedMotion]);

  const visibleValues = useMemo(() => (progress < 0.5 ? pakistanValues : russiaValues), [progress]);

  return (
    <section className="relative h-screen overflow-hidden px-8 py-10 lg:px-16" aria-label="Einführung">
      <span className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-[28vw] font-black uppercase leading-none text-zinc-100/5">
        KI
      </span>
      <div className="relative z-10 grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 to-zinc-900/80 shadow-soft">
          <div ref={mountRef} className="absolute -left-[16%] bottom-[-8%] h-[120%] w-[130%]" />
          <ul className="absolute right-4 top-6 space-y-2">
            {visibleValues.map((value, index) => (
              <motion.li
                key={value}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-full border border-white/20 bg-zinc-950/65 px-3 py-1 text-xs"
              >
                ✦ {value}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative z-20 max-w-2xl">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Kann KI eine Brücke zwischen Kulturen sein?
          </h1>
          <p className="mt-5 text-zinc-300">Scrollen Sie langsam: Die Erde dreht sich von Pakistan nach Russland.</p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: sequenceDone ? 1 : 0, y: sequenceDone ? 0 : 10 }}
            className="mt-8 text-xl text-sky-200"
          >
            Ja — wenn wir KI kritisch, kreativ und respektvoll nutzen.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
