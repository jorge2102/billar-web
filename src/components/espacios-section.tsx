"use client";

import { useState } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
  badge: string;
  title: string;
  body: string;
  thumbLabel: string;
  thumbTitle: string;
};

const SLIDES: Slide[] = [
  {
    src: "https://lh3.googleusercontent.com/aida/AEtjO1UZ5WDj84oegE2f9CNQoqM0pcINYteqBMMhKrG0C66XSA62QZBvAsNQS1vAQx5wCM0wAjWXt9C56BhfhlbVSJB3xGVJIEnrE-h4QMyEbYb7RLQ4h7Dn-2oSjc6toGDvyP2Lp1fKPBSpyBH71_w-FH8h9n9iMxi4mYv-gh6yNAUun3jFjGhgXL6DNc6yHepez5v0sFzdb1dYuLL4cC195P_SQPoLmclrOJMXDIH1UFWjiuGCuNodFa2O9Dav",
    alt: "Salón Principal Black Dog",
    badge: "Salón Principal • Led Zeppelin Hall",
    title: "Mesas Vintage & Paño Beige Simonis",
    body: "Lámparas cónicas de latón enfocadas sobre el tapete de paño beige arena, rodeadas de guitarras de colección y vinilos históricos.",
    thumbLabel: "01 / Salón",
    thumbTitle: "Mesas Simonis",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AEtjO1UyKNVkMhgooTXUiXpri6PfQA1LjQhXibdVxnwcsklJURzCfOgYioCYGhgxIV1DjvCOrfetv1bCPQQzi7PzQOOyoRNG4e29FBrjjemDE7yhqT80b4NFv1nYgOVxPAP9dah0w4odU7q2lktwAY6ZKKi2_MRVd_ArYYr9hUgPqhEGj7lFOWH-hiOBa513Q_z_47oQFYyAWyoj5T_uCxjOBTVMvqZBdjSjigvIgA-gS3VoYKtf50fh3iAbYJG5",
    alt: "Barra del Billar Bar",
    badge: "Barra de Caoba & Salón",
    title: "Bar de Culto para Jugadores",
    body: "Madera noble pulida, iluminación de filamento y servicio ininterrumpido a todas las mesas de juego.",
    thumbLabel: "02 / Bar",
    thumbTitle: "Barra & Taps",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AEtjO1XvBncxokkzUT0lg832VjawudwNHLrtR9Pj4Nu-HMokdrSxFdCnqjzumZHDjSqFT7ZcIrhok0CLW50nhmxPFrfKXvKGWipH9d2iIEqUmcToAGBTkNIQJjLFQqU9tum5XHcl4dOSmhuANoswW9RxpcC0g_xpfAuwIxkjhY1pVEh0SL0t1hCCfbQFMIaFaHewInpYJs7u9hBuBRGcyExYtbcuZikVdn2GORSMNGpHrk6MtUytNvohb4rV_xRm",
    alt: "Detalle del Taco y Paño",
    badge: "El Detalle del Tiro & Tacos de Autor",
    title: "Tacos de Fresno & Fieltro Sand Beige",
    body: "Mesa de madera tallada a mano, tiza fina y bolas pulidas para el tacto más exacto de cada tiro.",
    thumbLabel: "03 / Partida",
    thumbTitle: "Tacos & Fieltro",
  },
];

export function EspaciosSection() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  function goTo(nextIndex: number) {
    setIndex(((nextIndex % total) + total) % total);
  }

  return (
    <section className="w-full bg-surface-container-lowest py-space-xl relative overflow-hidden" id="espacios">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              <span>Galería del Salón</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface">
              La Atmósfera del Club
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Maderas nobles, iluminación cálida de latón, paño beige impecable y el latido del rock
              clásico.
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Foto anterior"
              className="w-12 h-12 rounded bg-surface-container-high hover:bg-surface-bright text-secondary hover:text-on-surface flex items-center justify-center transition-colors shadow-sm"
              onClick={() => goTo(index - 1)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <button
              aria-label="Siguiente foto"
              className="w-12 h-12 rounded bg-surface-container-high hover:bg-surface-bright text-secondary hover:text-on-surface flex items-center justify-center transition-colors shadow-sm"
              onClick={() => goTo(index + 1)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.src} className="min-w-full relative aspect-[16/9] lg:aspect-[21/9]">
                <Image alt={slide.alt} className="object-cover" fill sizes="100vw" src={slide.src} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-space-lg max-w-2xl">
                  <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase mb-space-xs inline-block">
                    {slide.badge}
                  </span>
                  <h3 className="font-headline-md text-headline-md uppercase text-on-surface font-bold">
                    {slide.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">{slide.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-space-md right-space-md flex items-center gap-space-xs z-20 bg-surface-container-lowest/80 px-space-md py-space-xs rounded-full backdrop-blur-md">
            {SLIDES.map((slide, dotIndex) => (
              <button
                key={slide.src}
                aria-label={`Ir a diapositiva ${dotIndex + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  dotIndex === index ? "bg-primary" : "bg-on-surface-variant/40 hover:bg-primary"
                }`}
                onClick={() => goTo(dotIndex)}
                type="button"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-gutter mt-space-md">
          {SLIDES.map((slide, thumbIndex) => (
            <button
              key={slide.src}
              className={`p-space-xs rounded bg-surface-container text-left hover:bg-surface-container-high transition-all flex items-center gap-space-sm ${
                thumbIndex === index ? "opacity-100" : "opacity-60"
              }`}
              onClick={() => goTo(thumbIndex)}
              type="button"
            >
              <div className="relative w-16 h-12 shrink-0 overflow-hidden rounded">
                <Image alt={`Miniatura ${slide.thumbTitle}`} className="object-cover" fill sizes="64px" src={slide.src} />
              </div>
              <div className="min-w-0">
                <span className="font-label-sm text-label-sm uppercase text-primary block">
                  {slide.thumbLabel}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate block">
                  {slide.thumbTitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
