import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { Providers } from "@/app/providers";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Премиальная wellness-линия`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Морской коллаген VITOM в двух форматах — шоты и желе. Чистый состав, понятные курсы и три вкуса для ежедневного ритуала.",
  keywords: ["коллаген", "морской коллаген", "VITOM", "VITOSHOTS", "wellness", "красота"],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ru_RU",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Geologica:wght@300;400;500;600;700;800&family=Unbounded:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <LocaleProvider initialLocale={locale}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
            >
              {dict.common.skipToContent}
            </a>
            <Header />
            <main id="main" className="pt-[var(--header-h,79px)]">{children}</main>
            <Footer />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
