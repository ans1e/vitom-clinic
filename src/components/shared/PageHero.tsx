import Image from "next/image";

import { HERO_BLUR } from "@/lib/hero-blur";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  image: string;
  imageMobile: string;
  imageAlt: string;
  /** Optional extra children rendered under the title (e.g. an animated word). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-screen page banner: a product photo that fills the viewport below the
 * header (like the homepage hero), with the page title overlaid at the
 * bottom-left. A light directional wash — bottom on mobile, left on desktop —
 * lifts the title off the photo without washing the image out.
 */
export function PageHero({
  title,
  image,
  imageMobile,
  imageAlt,
  children,
  className,
}: PageHeroProps): React.JSX.Element {
  return (
    <section className={cn("relative isolate overflow-hidden bg-cream", className)}>
      <div className="relative w-full h-[calc(100svh_-_var(--header-h,79px))] min-h-[480px]">
        <Image
          src={imageMobile}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR[imageMobile]}
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR[image]}
          sizes="100vw"
          className="object-cover hidden sm:block"
        />

        {/* No cream wash over the image — just a soft dark gradient at the very
            bottom so the white title reads in the photo's own text zone. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-12 lg:pb-16">
            <h1 className="display text-[clamp(2rem,7vw,64px)] text-white leading-[1.08] text-balance max-w-[18ch]">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
