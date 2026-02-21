import { NextResponse } from 'next/server';

type Body = {
  category: 'Essen' | 'Musik' | 'Handwerk & Muster' | 'Sport' | 'Architektur' | 'Feste';
  sideA: string;
  sideB: string;
};

const placeholders: Record<Body['category'], string> = {
  Essen: '/placeholders/essen.svg',
  Musik: '/placeholders/musik.svg',
  'Handwerk & Muster': '/placeholders/handwerk.svg',
  Sport: '/placeholders/sport.svg',
  Architektur: '/placeholders/architektur.svg',
  Feste: '/placeholders/feste.svg'
};

export async function POST(req: Request) {
  const body = (await req.json()) as Body;

  return NextResponse.json({
    imageUrl: placeholders[body.category] || '/placeholders/essen.svg',
    titleDe: `${body.category}: Neue kulturelle Fusion`,
    descriptionDe: `Eine kuratierte Konzept-Illustration verbindet ${body.sideA} und ${body.sideB} in einer gemeinsamen, zeitgenössischen Idee.`
  });
}
