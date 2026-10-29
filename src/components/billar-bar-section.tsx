import Image from "next/image";

const BARRA_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida/AEtjO1UyKNVkMhgooTXUiXpri6PfQA1LjQhXibdVxnwcsklJURzCfOgYioCYGhgxIV1DjvCOrfetv1bCPQQzi7PzQOOyoRNG4e29FBrjjemDE7yhqT80b4NFv1nYgOVxPAP9dah0w4odU7q2lktwAY6ZKKi2_MRVd_ArYYr9hUgPqhEGj7lFOWH-hiOBa513Q_z_47oQFYyAWyoj5T_uCxjOBTVMvqZBdjSjigvIgA-gS3VoYKtf50fh3iAbYJG5";

const DETAILS = [
  {
    icon: "local_bar",
    title: "Coctelería Clásica & Destilados de Calidad",
    body: "Recetas tradicionales equilibradas, whiskies y aperitivos preparados con hielo tallado y dedicación para saborear entre jugadas.",
  },
  {
    icon: "sports_bar",
    title: "Cerveza Helada & Grifos Artesanales",
    body: "Selección rotativa de cervezas en copa fría, lupuladas o maltosas, perfectas para rondas distendidas y retos entre amigos.",
  },
  {
    icon: "coffee",
    title: "Café de Especialidad & Bocados de Mesa",
    body: "Café expreso recién molido y tablas de embutidos curados que acompañan las horas de concentración sin saturar tu mesa.",
  },
];

export function BillarBarSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl relative" id="billar-bar-lounge">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-space-xl">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[18px]">local_bar</span>
              <span>Concepto de Casa</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface">
              El Billar Bar: Caoba, Compañía &amp; Buen Brindis
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-xs">
              Un espacio pensado para disfrutar del juego sin prisas. Nuestra barra clásica de madera
              tostada acompaña cada partida con coctelería tradicional, cervezas de barril heladas,
              destilados seleccionados y café de origen, servidos directamente a tu mesa sin interrumpir
              el ritmo del taco.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-space-sm">
            <div className="p-space-md rounded-xl bg-surface-container text-center min-w-[140px] shadow-sm">
              <span className="font-headline-sm text-headline-sm text-primary font-bold block">Servicio</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Directo a Mesas
              </span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container text-center min-w-[140px] shadow-sm">
              <span className="font-headline-sm text-headline-sm text-primary font-bold block">Ambiente</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Bar &amp; Rock Lounge
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-space-lg">
          <div className="lg:col-span-6 rounded-xl overflow-hidden bg-surface-container shadow-lg relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                alt="Barra Clásica del Billar Bar"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                src={BARRA_IMAGE_SRC}
              />
            </div>
            <div className="p-space-lg">
              <div className="flex items-center justify-between gap-space-sm mb-space-xs flex-wrap">
                <span className="font-headline-sm text-[16px] uppercase text-on-surface font-bold">
                  Barra Histórica de Caoba &amp; Botellero Cálido
                </span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase">
                  Servicio Continuo
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Atención sobria y cercana para quienes entienden el billar no solo como destreza técnica,
                sino como un momento de pausa, buena música y conversación franca.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-space-sm">
            {DETAILS.map((detail) => (
              <div
                key={detail.title}
                className="p-space-md rounded-xl bg-surface-container shadow-sm flex items-start gap-space-md"
              >
                <div className="w-12 h-12 rounded bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">{detail.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[15px] uppercase text-on-surface font-bold mb-1">
                    {detail.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {detail.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-space-lg rounded-xl bg-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-md shadow-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">room_service</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                Privilegio de Salón
              </span>
              <h4 className="font-headline-sm text-[16px] uppercase text-on-surface font-bold">
                Servicio Completo de Bar a las 4 Mesas
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Haz tu pedido desde tu mesa de billar y mantén el foco en cada tiro.
              </p>
            </div>
          </div>
          <a
            className="px-space-lg py-space-sm bg-primary-container hover:bg-primary text-on-primary-container font-label-lg text-label-lg uppercase rounded shadow transition-all shrink-0"
            href="#reservas"
          >
            Reservar Mesa &amp; Turno
          </a>
        </div>
      </div>
    </section>
  );
}
