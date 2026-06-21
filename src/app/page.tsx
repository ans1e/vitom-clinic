import { Hero } from "@/components/shared/Hero";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { Advantages } from "@/components/shared/Advantages";
import { InfoCards } from "@/components/shared/InfoCards";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <CatalogSection />
      <Advantages />
      <InfoCards />
    </>
  );
}
