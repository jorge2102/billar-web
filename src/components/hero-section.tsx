import Image from "next/image";

const HERO_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida/AEtjO1UZ5WDj84oegE2f9CNQoqM0pcINYteqBMMhKrG0C66XSA62QZBvAsNQS1vAQx5wCM0wAjWXt9C56BhfhlbVSJB3xGVJIEnrE-h4QMyEbYb7RLQ4h7Dn-2oSjc6toGDvyP2Lp1fKPBSpyBH71_w-FH8h9n9iMxi4mYv-gh6yNAUun3jFjGhgXL6DNc6yHepez5v0sFzdb1dYuLL4cC195P_SQPoLmclrOJMXDIH1UFWjiuGCuNodFa2O9Dav";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest">
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-tertiary-container/10 blur-[120px] pointer-events-none" />
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin pt-space-xl pb-space-xl relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">
              Club Exclusivo de Billar Bar • 4 Mesas de Autor • Vinilo Puro
            </span>
          </div>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase text-secondary">
            <span className="material-symbols-outlined text-[16px] text-primary">volume_up</span>
            <span>4 Mesas de Autor • Paño Beige Simonis • Bar de Culto</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-high w-fit">
              <span className="material-symbols-outlined text-primary text-[18px]">sports_cricket</span>
              <span className="font-label-md text-label-md uppercase text-secondary tracking-widest">
                El Genuino Concepto Billar Bar
              </span>
            </div>
            <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl uppercase text-on-surface leading-[1.05] tracking-tight">
              La esencia del auténtico <span className="text-primary italic">Billar Bar</span>: precisión de
              juego, bar distinguido &amp; <span className="text-secondary">alma de rock</span>.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Cuatro mesas maestras con paño beige arena Simonis de suave rodamiento, atmósfera de madera
              noble y un bar consagrado a brindar mientras las bolas ruedan con precisión milimétrica.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs pt-space-xs">
              <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">sports_cricket</span>
                <span className="font-label-md text-label-md text-on-surface">4 Mesas Maestras</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">local_bar</span>
                <span className="font-label-md text-label-md text-on-surface">Bar &amp; Lounge</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">album</span>
                <span className="font-label-md text-label-md text-on-surface">Rock Clásico en Vinilo</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-space-md pt-space-md">
              <a
                className="px-space-lg py-space-md bg-primary-container hover:bg-primary text-on-primary-container font-label-lg text-label-lg uppercase rounded shadow-[0_8px_24px_-4px_rgba(197,155,75,0.45)] transition-all flex items-center gap-space-xs group"
                href="#reservas"
              >
                <span>Reservar Mesa Exclusiva</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
              <a
                className="px-space-lg py-space-md bg-surface-container-high hover:bg-surface-bright text-secondary hover:text-on-surface font-label-lg text-label-lg uppercase rounded shadow-sm transition-all flex items-center gap-space-xs"
                href="#billar-bar-lounge"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">local_bar</span>
                <span>Conocer el Bar</span>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-gutter pt-space-md mt-space-sm bg-surface-container-low/70 p-space-md rounded">
              <div>
                <span className="font-headline-md text-headline-md text-primary font-bold block">4</span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Mesas de Competición
                </span>
              </div>
              <div>
                <span className="font-headline-md text-headline-md text-primary font-bold block">100%</span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Servicio en Partida
                </span>
              </div>
              <div>
                <span className="font-headline-md text-headline-md text-primary font-bold block">Vintage</span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                  Ambiente &amp; Sonido
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container-high p-space-xs rounded-xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="relative aspect-[4/5] rounded overflow-hidden">
                <Image
                  alt="Salón Principal Black Dog Billar Bar"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  src={HERO_IMAGE_SRC}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent" />
                <div className="absolute bottom-space-md left-space-md right-space-md p-space-md rounded bg-surface-container-lowest/90 backdrop-blur-md shadow-xl flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase block">
                      Mesa 1 • Central Black Dog
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-0.5">
                      Master of Puppets
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Paño beige Simonis &amp; atención de bar continuo
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">radio_button_checked</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 left-2 w-3 h-3 bg-primary/40 rounded-full" />
              <div className="absolute top-2 right-2 w-3 h-3 bg-primary/40 rounded-full" />
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary/40 rounded-full" />
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
