import Image from "next/image";

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

        {/* Same treatment as the homepage hero: a light directional wash that
            lifts the title off the photo without washing the image out.
            Mobile grounds the title at the bottom; desktop washes the left. */}
        <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-cream/90 via-cream/15 to-transparent" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-cream/85 via-cream/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-10 lg:pb-16">
            <h1 className="display text-[44px] sm:text-[60px] lg:text-[76px] text-ink leading-[1.02]">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
