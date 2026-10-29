import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { BillarBarSection } from "@/components/billar-bar-section";
import { EspaciosSection } from "@/components/espacios-section";
import { ServiciosSection } from "@/components/servicios-section";
import { ReservasSection } from "@/components/reservas-section";
import { PromocionesSection } from "@/components/promociones-section";
import { UbicacionSection } from "@/components/ubicacion-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full pt-20 bg-background">
        <HeroSection />
        <BillarBarSection />
        <EspaciosSection />
        <ServiciosSection />
        <ReservasSection />
        <PromocionesSection />
        <UbicacionSection />
      </main>
      <SiteFooter />
    </>
  );
}
