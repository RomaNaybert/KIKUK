'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  progress: number;
  values: string[];
  revealLine: boolean;
};

export function EarthHero({ progress, values, revealLine }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.2, 48, 48, Math.PI / 2, Math.PI);
    const material = new THREE.MeshStandardMaterial({ color: '#5c7f92', roughness: 0.8, metalness: 0.1 });
    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe;
    scene.add(globe);

    const light = new THREE.DirectionalLight('#ffffff', 1.2);
    light.position.set(2, 2, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight('#8ba4b6', 0.45));

    let frameId = 0;
    const animate = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) globeRef.current.rotation.y = -1 + progress * 2;
  }, [progress]);

  const positions = useMemo(
    () => ['top-[12%] left-[14%]', 'top-[24%] left-[34%]', 'top-[34%] left-[18%]', 'top-[46%] left-[40%]', 'top-[62%] left-[16%]', 'top-[72%] left-[34%]', 'top-[82%] left-[24%]'],
    []
  );

  return (
    <div className="relative h-[65vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-soft">
      <div ref={containerRef} className="absolute inset-0" aria-hidden />
      <div className="absolute inset-0">
        {values.map((value, index) => (
          <motion.div key={value} className={`absolute ${positions[index]} rounded-full bg-black/45 px-3 py-1 text-xs text-white/90 backdrop-blur`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
            ⬤ {value}
          </motion.div>
        ))}
      </div>
      <motion.p className="absolute bottom-4 left-4 max-w-sm text-sm text-white/80" initial={{ opacity: 0, y: 20 }} animate={{ opacity: revealLine ? 1 : 0, y: revealLine ? 0 : 20 }}>
        Ja — wenn wir KI kritisch, kreativ und respektvoll nutzen.
      </motion.p>
    </div>
  );
}
