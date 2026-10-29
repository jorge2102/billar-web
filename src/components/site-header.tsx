import Image from "next/image";
import { SocialIcon } from "./social-icon";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0K0n7Ur3TfKXPpzCurgLiRGVjaOvdJEiynaTApgHXDv8QdQ8SLV1_P2DwUH2MtBeFGW2b9Q-KliTTZzcvhpybJKLSKsaTzfam0vPXIsqRyKZlgqvxFwu3NyUHKVeMbJIZRRryTmzJlKFFlFaD-dfN2MbfSotQ9j4XMsJCLD21FvYe7jYEr90AZ2hvRrNnHewB6hsdVfS8rf2UlO6gAoovayiO9M_c9Jwb7pd-V8G6mHz0-efelCzpInEU5MrbpCSgGvc";

const NAV_LINKS = [
  { href: "#billar-bar-lounge", label: "Billar Bar" },
  { href: "#espacios", label: "Espacios" },
  { href: "#servicios", label: "Servicios" },
  { href: "#reservas", label: "Mesas & Reservas" },
  { href: "#promociones", label: "Privilegios" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_16px_36px_-8px_rgba(18,10,6,0.85)]">
      <div className="h-20 max-w-[1320px] mx-auto px-gutter-mobile lg:px-margin flex items-center justify-between gap-gutter">
        <a className="flex items-center gap-space-md group" href="#">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
            <Image alt="Black Dog Billar Bar Logo" className="object-cover" fill sizes="44px" src={LOGO_SRC} />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary">
              Black Dog Billar Bar
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Rock, Metal &amp; Vintage Billiards
            </span>
          </div>
        </a>
        <nav className="hidden xl:flex items-center gap-space-md">
          <a
            className="font-label-md text-label-md px-space-sm py-space-xs bg-secondary-container text-on-secondary-container font-semibold rounded-lg transition-colors"
            href="#"
          >
            Inicio
          </a>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="font-label-md text-label-md px-space-sm py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-space-sm">
          <a
            className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high hover:bg-surface-bright text-secondary hover:text-on-surface font-label-md text-label-md uppercase rounded transition-all"
            href="#billar-bar-lounge"
          >
            <span className="material-symbols-outlined text-[17px] text-primary">local_bar</span>
            <span>Bar &amp; Lounge</span>
          </a>
          <a
            className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-bright text-primary flex items-center justify-center transition-all shadow-sm"
            href="https://wa.me/51987654321"
            rel="noopener noreferrer"
            target="_blank"
            title="Concierge WhatsApp"
          >
            <SocialIcon className="w-[18px] h-[18px]" network="whatsapp" />
          </a>
          <a
            className="px-space-lg py-space-sm bg-primary-container hover:bg-primary text-on-primary-container font-label-lg text-label-lg uppercase rounded shadow-[0_8px_24px_-4px_rgba(197,155,75,0.45)] transition-all flex items-center gap-space-xs"
            href="#reservas"
          >
            <span className="material-symbols-outlined text-[17px]">sports_score</span>
            <span>Reservar Mesa</span>
          </a>
        </div>
      </div>
    </header>
  );
}
