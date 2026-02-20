import { NextResponse } from 'next/server';

const placeholders: Record<string, { imageUrl: string; titleDe: string; descriptionDe: string }> = {
  Essen: {
    imageUrl: '/placeholders/essen.svg',
    titleDe: 'Fusionküche zwischen Samowar und Gewürzmarkt',
    descriptionDe: 'Eine elegante Szene aus Teekultur, Brot, Kräutern und Gewürzen, inspiriert von beiden Ländern.',
  },
  Musik: {
    imageUrl: '/placeholders/musik.svg',
    titleDe: 'Neue Klanglinie',
    descriptionDe: 'Saiten, Rhythmus und Chorflächen verbinden sich zu einem modernen, gemeinsamen Musikbild.',
  },
  'Handwerk & Muster': {
    imageUrl: '/placeholders/handwerk.svg',
    titleDe: 'Musterbrücke',
    descriptionDe: 'Textile Ornamente und Holzdetails verschmelzen zu einer ruhigen, musealen Komposition.',
  },
  Sport: {
    imageUrl: '/placeholders/sport.svg',
    titleDe: 'Gemeinsamer Spielfluss',
    descriptionDe: 'Eine neue Sportidee mit Teamgeist, Präzision und fairer Dynamik.',
  },
  Architektur: {
    imageUrl: '/placeholders/architektur.svg',
    titleDe: 'Horizonte aus Stein und Licht',
    descriptionDe: 'Bögen, Kuppeln und klare Linien treffen auf nordische Weite und urbane Minimalität.',
  },
  Feste: {
    imageUrl: '/placeholders/feste.svg',
    titleDe: 'Lichter der Begegnung',
    descriptionDe: 'Ein ruhiges Festmotiv mit Musik, Licht und gemeinschaftlicher Wärme.',
  },
};

export async function POST(req: Request) {
  const body = await req.json();
  const category: string = body?.category ?? 'Essen';

  const result = placeholders[category] ?? placeholders.Essen;
  return NextResponse.json(result);
}
