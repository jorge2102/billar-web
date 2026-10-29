import { SocialIcon } from "./social-icon";

const SERVICE_CARDS = [
  {
    icon: "sports_cricket",
    title: "4 Mesas Maestras Vintage",
    body: "Niveladas con precisión milimétrica, paño Simonis 860 en tono sand beige y bolas Aramith Tournament.",
    footLabel: "Calibrado Diario",
    footIcon: "straighten",
  },
  {
    icon: "local_bar",
    title: "Bar & Bebidas de Salón",
    body: "Cervezas artesanales heladas, cócteles clásicos y café recién preparado servidos sin pausa en cada mesa.",
    footLabel: "Servicio a Mesa",
    footIcon: "room_service",
  },
  {
    icon: "domain_verification",
    title: "Alquiler Privado Total",
    body: "Cierre completo del local para celebraciones privadas, torneos cerrados y reuniones de amigos con barista y bartender.",
    footLabel: "Hasta 45 Personas",
    footIcon: "key",
  },
  {
    icon: "album",
    title: "Noches de Vinilo & Rock",
    body: "Sesiones musicales analógicas con álbumes legendarios de rock clásico en tornamesa de alta fidelidad.",
    footLabel: "Jueves & Sábados",
    footIcon: "music_note",
  },
];

export function ServiciosSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl" id="servicios">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-space-xs">
            Distinción &amp; Sobriedad
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface">
            Servicios del Billar Bar
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Atención respetuosa, billar de alta precisión y un bar dispuesto para enriquecer cada velada.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all duration-300 shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded bg-surface-container-high group-hover:bg-primary-container text-primary group-hover:text-on-primary-container flex items-center justify-center mb-space-md transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">
                  {card.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  {card.body}
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between font-label-sm text-label-sm text-secondary uppercase">
                <span>{card.footLabel}</span>
                <span className="material-symbols-outlined text-primary text-[18px]">{card.footIcon}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest block">
                  Tarifa por Mesa
                </span>
                <h4 className="font-headline-md text-headline-md text-on-surface uppercase mt-1">
                  Sesión de Billar Clásico
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Incluye juego de bolas Aramith pulidas, tiza de maestro y racks de madera.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-lg text-headline-lg text-primary font-black">$ 15</span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
                  / hora
                </span>
              </div>
            </div>
            <div className="mt-space-md pt-space-md flex items-center justify-between gap-space-sm flex-wrap">
              <span className="font-body-sm text-body-sm text-secondary">
                Mínimo 60 min. Fracción posterior proporcional.
              </span>
              <a
                className="px-space-md py-space-xs bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm uppercase rounded transition-colors"
                href="#reservas"
              >
                Reservar Turno
              </a>
            </div>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest block">
                  Exclusividad Absoluta
                </span>
                <h4 className="font-headline-md text-headline-md text-on-surface uppercase mt-1">
                  Alquiler Privado Total
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Uso irrestricto de las 4 mesas maestras, personal de bar dedicado y control sonoro.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-lg text-headline-lg text-primary font-black">$ 200</span>
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
                  / bloque 3h
                </span>
              </div>
            </div>
            <div className="mt-space-md pt-space-md flex items-center justify-between gap-space-sm flex-wrap">
              <span className="font-body-sm text-body-sm text-secondary">Capacidad: hasta 45 personas.</span>
              <a
                className="px-space-md py-space-xs bg-primary-container hover:bg-primary text-on-primary-container font-label-sm text-label-sm uppercase rounded transition-colors flex items-center gap-space-xs"
                href="https://wa.me/51987654321"
                rel="noopener noreferrer"
                target="_blank"
              >
                <SocialIcon className="w-[14px] h-[14px]" network="whatsapp" />
                <span>Consultar WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
