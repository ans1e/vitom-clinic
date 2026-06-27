import Image from "next/image";

import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  image: string;
  imageMobile: string;
  imageAlt: string;
  /** Optional extra children rendered under the title (e.g. an animated word). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-width page banner: a product photo with the page title overlaid at the
 * bottom-left. A cream scrim keeps the title readable over both light and dark
 * photography — it is solid cream at the very bottom and fades up to reveal the
 * image, so dark ink text always sits on a legible base and the band blends
 * into the cream page below.
 */
export function PageHero({
  eyebrow,
  title,
  image,
  imageMobile,
  imageAlt,
  children,
  className,
}: PageHeroProps): React.JSX.Element {
  return (
    <section className={cn("relative isolate overflow-hidden bg-cream", className)}>
      <div className="relative w-full h-[400px] sm:h-[440px] lg:h-[520px]">
        <Image
          src={imageMobile}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover hidden sm:block"
        />

        {/* Readability scrim: solid cream at the base, fading up. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#faf8f4_0%,#faf8f4_15%,rgba(250,248,244,0.62)_42%,rgba(250,248,244,0)_78%)]" />
        {/* Gentle left wash so the title side stays calm on busy photos. */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-cream/45 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-8 lg:pb-12">
            <p className="eyebrow text-[11px] text-smoke mb-3 lg:mb-4">{eyebrow}</p>
            <h1 className="display text-[40px] sm:text-[56px] lg:text-[68px] text-ink leading-[1.02]">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
