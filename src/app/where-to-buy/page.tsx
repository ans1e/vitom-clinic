import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ChannelCards, type Channel } from "@/components/shared/ChannelCards";
import { getDictionary } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Где купить",
  description:
    "Официальные точки продажи VITOM: магазин на Uzum Market, заказ в Telegram и новинки в Instagram. Покупайте только в проверенных каналах.",
  path: "/where-to-buy",
});

export default async function WhereToBuyPage(): Promise<React.JSX.Element> {
  const t = await getDictionary();
  const channels: Channel[] = [
    {
      icon: "uzum",
      eyebrow: t.whereToBuy.uzumEyebrow,
      title: "Uzum Market",
      description: t.whereToBuy.uzumDesc,
      href: "https://uzum.uz/shop/vitomclinic",
    },
    {
      icon: "telegram",
      eyebrow: t.whereToBuy.telegramEyebrow,
      title: "Telegram",
      description: t.whereToBuy.telegramDesc,
      href: "https://t.me/vitom_uz",
    },
    {
      icon: "instagram",
      eyebrow: t.whereToBuy.instagramEyebrow,
      title: "Instagram",
      description: t.whereToBuy.instagramDesc,
      href: "https://www.instagram.com/vitom.clinic/",
    },
  ];

  return (
    <>
      <PageHero
        title={t.whereToBuy.title}
        image="/assets/hero-wtb.webp"
        imageMobile="/assets/hero-wtb-m.webp"
        imageAlt="VITOM — коллаген с яблоком"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="max-w-[760px]">
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[620px]">{t.whereToBuy.intro}</p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-14">
          <ChannelCards channels={channels} />
        </Reveal>

        <Reveal className="mt-14 border-t border-line pt-10 max-w-[620px]">
          <p className="text-[14px] leading-[1.8] text-smoke">{t.whereToBuy.note}</p>
        </Reveal>
      </div>
      </section>
    </>
  );
}
