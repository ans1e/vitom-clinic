import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ChannelCards, type Channel } from "@/components/shared/ChannelCards";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Где купить",
  description:
    "Официальные точки продажи VITOM: магазин на Uzum Market, заказ в Telegram и новинки в Instagram. Покупайте только в проверенных каналах.",
  path: "/where-to-buy",
});

const CHANNELS: Channel[] = [
  {
    icon: "uzum",
    eyebrow: "Marketplace",
    title: "Uzum Market",
    description:
      "Официальный магазин VITOM с актуальным каталогом, оплатой и доставкой по всему Узбекистану.",
    href: "https://uzum.uz/shop/vitomclinic",
  },
  {
    icon: "telegram",
    eyebrow: "Direct",
    title: "Telegram",
    description:
      "Напишите нам напрямую — поможем выбрать формат, подскажем наличие и оформим заказ.",
    href: "https://t.me/vitom_uz",
  },
  {
    icon: "instagram",
    eyebrow: "Social",
    title: "Instagram",
    description:
      "Новинки, составы и реальные отзывы. Здесь же — анонсы поступлений и акций.",
    href: "https://www.instagram.com/vitom.clinic/",
  },
];

export default function WhereToBuyPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        title="Где купить"
        image="/assets/hero-wtb.webp"
        imageMobile="/assets/hero-wtb-m.webp"
        imageAlt="VITOM — коллаген с яблоком"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="max-w-[760px]">
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[620px]">
            VITOM продаётся только в официальных каналах — так вы получаете оригинальный
            продукт с гарантией состава и срока годности. Выбирайте удобный способ.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-14">
          <ChannelCards channels={CHANNELS} />
        </Reveal>

        <Reveal className="mt-14 border-t border-line pt-10 max-w-[620px]">
          <p className="text-[14px] leading-[1.8] text-smoke">
            Остерегайтесь подделок: VITOM не продаётся через сторонних посредников.
            Если сомневаетесь в продавце — напишите нам в Telegram, и мы подтвердим.
          </p>
        </Reveal>
      </div>
      </section>
    </>
  );
}
