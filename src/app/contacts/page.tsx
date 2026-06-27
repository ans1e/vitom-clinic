import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ChannelCards, type Channel } from "@/components/shared/ChannelCards";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Контакты",
  description:
    "Связаться с VITOM: пишите в Telegram, Instagram или оформляйте заказ на Uzum Market. Отвечаем в течение дня.",
  path: "/contacts",
});

const CHANNELS: Channel[] = [
  {
    icon: "telegram",
    eyebrow: "Чат",
    title: "Telegram",
    description:
      "Самый быстрый способ связаться. Поможем с выбором, составом и заказом.",
    href: "https://t.me/vitom_uz",
  },
  {
    icon: "instagram",
    eyebrow: "Соцсети",
    title: "Instagram",
    description:
      "Новинки, обзоры и отзывы. Пишите в директ — отвечаем там же.",
    href: "https://www.instagram.com/vitom.clinic/",
  },
  {
    icon: "uzum",
    eyebrow: "Заказ",
    title: "Uzum Market",
    description:
      "Официальный магазин с оплатой и доставкой по Узбекистану.",
    href: "https://uzum.uz/shop/vitomclinic",
  },
];

const FACTS = [
  { value: "В течение дня", label: "Время ответа" },
  { value: "Узбекистан", label: "Доставка" },
  { value: "Каждый день", label: "На связи" },
];

export default function ContactsPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrow="Contacts"
        title="Контакты"
        image="/assets/hero-contacts.webp"
        imageMobile="/assets/hero-contacts-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="max-w-[760px]">
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[620px]">
            Мы на связи каждый день и отвечаем в течение дня. Выберите удобный канал —
            поможем с выбором формата и оформлением заказа.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-14">
          <ChannelCards channels={CHANNELS} />
        </Reveal>

        <Reveal className="mt-16 grid sm:grid-cols-3 gap-10 border-t border-line pt-12">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <p className="display text-[30px] sm:text-[34px] text-ink mb-2">{fact.value}</p>
              <p className="eyebrow text-[11px] text-smoke">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
      </section>
    </>
  );
}
