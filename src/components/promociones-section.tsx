const PROMOS = [
  {
    tag: "Tarde de Bar",
    schedule: "Mar a Jue",
    title: "Sunset Billar Bar",
    body: "2x1 en cervezas de grifo y 20% de cortesía en tiempo de mesa entre las 16:00 y las 19:30 hrs.",
    footer: "Cód: SUNSET-DOG",
    footerIcon: "sports_bar",
  },
  {
    tag: "Pack Amigos",
    schedule: "Todos los días",
    title: "Combo Led Zeppelin",
    body: "2 Horas ininterrumpidas de mesa + Cubeta con 5 cervezas frías + Tabla de quesos y embutidos para compartir.",
    footer: "$ 38 Total",
    footerIcon: "sports_score",
    footerIsPrice: true,
  },
  {
    tag: "Torneo 8-Ball",
    schedule: "Viernes 21:00",
    title: "Reto de los Viernes",
    body: "Inscripción libre al cuadro relámpago. Botella especial de la casa y 5 horas de juego gratis para el ganador.",
    footer: "Inscripción Libre",
    footerIcon: "trophy",
  },
  {
    tag: "Celebración",
    schedule: "Semana Natal",
    title: "Homenaje al Cumpleañero",
    body: "1 Hora de cortesía en mesa para el agasajado acreditando documento, más brindis de cortesía en la barra.",
    footer: "Con Documento",
    footerIcon: "celebration",
  },
];

export function PromocionesSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl" id="promociones">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-space-xs">
              Privilegios del Club
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface">
              Promociones: Billar &amp; Bar
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Beneficios diseñados para celebrar el juego de billar y los buenos encuentros.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">event_repeat</span>
            <span>Tarifas vigentes esta temporada</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className="p-space-lg rounded-xl bg-surface-container-lowest shadow-lg flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
              <div>
                <div className="flex items-center justify-between mb-space-sm gap-space-xs">
                  <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-bold">
                    {promo.tag}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">{promo.schedule}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">
                  {promo.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  {promo.body}
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span
                  className={
                    promo.footerIsPrice
                      ? "font-headline-sm text-[16px] text-primary font-bold"
                      : "font-label-sm text-label-sm text-outline uppercase"
                  }
                >
                  {promo.footer}
                </span>
                <span className="material-symbols-outlined text-primary text-[20px]">{promo.footerIcon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
