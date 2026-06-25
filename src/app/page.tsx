import { Hero } from "@/components/shared/Hero";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { Advantages } from "@/components/shared/Advantages";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <CatalogSection />
      <Advantages />
    </>
  );
}
