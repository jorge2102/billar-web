import { SocialIcon, type SocialNetwork } from "./social-icon";

const MAP_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD30AFM5o3zMpb1wyDLx9fga0tGli5_ZIRd5XXFrVN7M0Pj10ZQ-LLBK_W1zHL7Ejcf25fI-M0akAbfegowwhX_G0FqiQ1pw8MENV209bH3iGNHMPHnZr7I5t4GaSV-1P12qe2dO_qZx5tO50PY0FF-i7QTr9PWamOSPINI0kLFrV_tDkwfDaVe265lqGY5KcdDoI7oZpHWKKOlSUL1ITnH0rLloWwNIMoKMN4HcVkujfqFaHdw0oDcYg";

const SCHEDULE = [
  { day: "Martes a Jueves", hours: "16:00 – 01:00" },
  { day: "Viernes y Sábados", hours: "16:00 – 03:00" },
  { day: "Domingos", hours: "15:00 – 00:00" },
];

const CHANNELS: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "facebook", label: "/BlackDogBillarBar", href: "https://facebook.com" },
  { network: "instagram", label: "@blackdogbillarbar", href: "https://instagram.com" },
  { network: "tiktok", label: "@blackdogcuebar", href: "https://tiktok.com" },
  { network: "whatsapp", label: "+51 987 654 321", href: "https://wa.me/51987654321" },
];

export function UbicacionSection() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl relative" id="ubicacion">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 flex flex-col justify-between gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary block mb-space-xs">
                Coordenadas del Club
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface leading-tight">
                Encuéntranos en el Distrito Histórico
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Ubicados en un sótano arquitectónico de época, con aislamiento acústico ideal para
                concentrarte en tu tiro.
              </p>
            </div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-container shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center sepia contrast-110 brightness-75"
                style={{ backgroundImage: `url('${MAP_IMAGE_SRC}')` }}
              />
              <div className="absolute bottom-space-md left-space-md right-space-md p-space-md rounded bg-surface-container-lowest/95 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm shadow-xl">
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-primary block">
                    Dirección Oficial
                  </span>
                  <p className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    Av. Las Brisas 742 • Sótano Histórico
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Distrito Bohemio • Valet parking y vigilancia en puerta
                  </p>
                </div>
                <a
                  className="px-space-md py-space-xs bg-primary-container hover:bg-primary text-on-primary-container font-label-sm text-label-sm uppercase rounded transition-colors flex items-center gap-space-xs shrink-0"
                  href="https://maps.google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-md">
            <div className="p-space-lg rounded-xl bg-surface-container shadow-lg">
              <div className="flex items-center gap-space-xs text-primary mb-space-md">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                  Horarios de Apertura
                </h3>
              </div>
              <div className="space-y-space-xs font-label-md text-body-sm">
                {SCHEDULE.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between py-1.5 border-b border-surface-container-high"
                  >
                    <span className="text-on-surface font-semibold">{item.day}</span>
                    <span className="text-primary font-bold">{item.hours}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-1.5 text-outline">
                  <span>Lunes</span>
                  <span className="italic text-error">Cerrado por mantenimiento</span>
                </div>
              </div>
            </div>
            <div className="p-space-lg rounded-xl bg-surface-container shadow-lg">
              <span className="font-label-sm text-label-sm uppercase text-primary block mb-space-xs">
                Comunidad del Club
              </span>
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-space-md">
                Canales Oficiales
              </h3>
              <div className="grid grid-cols-2 gap-space-xs">
                {CHANNELS.map((channel) => (
                  <a
                    key={channel.network}
                    className="p-space-xs rounded bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-space-xs"
                    href={channel.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon className="w-[17px] h-[17px] text-primary shrink-0" network={channel.network} />
                    <span className="font-label-sm text-label-sm truncate">{channel.label}</span>
                  </a>
                ))}
              </div>
              <a
                className="mt-space-md p-space-sm rounded bg-surface-container-low hover:bg-surface-container-high transition-all flex items-center justify-between group"
                href="https://spotify.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-space-xs">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
                    <SocialIcon className="w-[22px] h-[22px]" network="spotify" />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase block">
                      Spotify Curated Playlist
                    </span>
                    <span className="font-headline-sm text-[14px] text-on-surface font-semibold">
                      Led Zeppelin &amp; British Rock Vault
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
