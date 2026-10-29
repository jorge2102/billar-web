import { SocialIcon, type SocialNetwork } from "./social-icon";

const SOCIAL_LINKS: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "facebook", label: "Facebook", href: "https://facebook.com" },
  { network: "instagram", label: "Instagram", href: "https://instagram.com" },
  { network: "tiktok", label: "TikTok", href: "https://tiktok.com" },
  { network: "spotify", label: "Spotify", href: "https://spotify.com" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface">
      <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary">
              Black Dog Billar Bar
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Templo de billar clásico de precisión y ambiente de bar distinguido, edificado bajo los
              acordes inmortales de la era dorada del rock.
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs font-label-sm text-label-sm">
              <span className="px-space-xs py-0.5 bg-surface-container rounded border border-surface-container-high font-bold text-primary">
                Est. 1971 Spirit
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">Horarios</h3>
            <div className="flex flex-col gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                <span>Mar – Sáb: 16:00 – 03:00</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span>
                <span>Domingos: 15:00 – 00:00</span>
              </div>
              <p className="font-body-sm text-[11px] text-outline mt-1">
                Servicio continuo a las 4 mesas durante toda la jornada.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
              Ubicación &amp; Concierge
            </h3>
            <div className="flex flex-col gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">pin_drop</span>
                <span>Av. Las Brisas 742, Sótano Histórico</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                <span>+51 (1) 489-2099</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <SocialIcon className="w-[15px] h-[15px] text-primary" network="whatsapp" />
                <span>WhatsApp: +51 987 654 321</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">Redes Oficiales</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sintoniza nuestras listas de música analógica y avisos de torneos.
            </p>
            <div className="flex flex-wrap gap-space-xs mt-1">
              {SOCIAL_LINKS.map(({ network, label, href }) => (
                <a
                  key={network}
                  className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded font-label-sm text-label-sm uppercase transition-all"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialIcon className="w-3.5 h-3.5" network={network} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-space-lg border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <p>© 2024 Black Dog Billar Bar. Todos los derechos reservados.</p>
          <p className="font-headline-sm text-[12px] uppercase text-primary tracking-widest font-bold">
            «Hey, hey, mama, said the way you move, gon&apos; make you sweat, gon&apos; make you groove»
          </p>
        </div>
      </div>
    </footer>
  );
}
