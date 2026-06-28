import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ChannelCards, type Channel } from "@/components/shared/ChannelCards";
import { getDictionary } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Контакты",
  description:
    "Связаться с VITOM: пишите в Telegram, Instagram или оформляйте заказ на Uzum Market. Отвечаем в течение дня.",
  path: "/contacts",
});

export default async function ContactsPage(): Promise<React.JSX.Element> {
  const t = await getDictionary();
  const channels: Channel[] = [
    {
      icon: "telegram",
      eyebrow: t.contacts.telegramEyebrow,
      title: "Telegram",
      description: t.contacts.telegramDesc,
      href: "https://t.me/vitom_uz",
    },
    {
      icon: "instagram",
      eyebrow: t.contacts.instagramEyebrow,
      title: "Instagram",
      description: t.contacts.instagramDesc,
      href: "https://www.instagram.com/vitom.clinic/",
    },
    {
      icon: "uzum",
      eyebrow: t.contacts.uzumEyebrow,
      title: "Uzum Market",
      description: t.contacts.uzumDesc,
      href: "https://uzum.uz/shop/vitomclinic",
    },
  ];

  const facts = [
    { value: t.contacts.fact1Value, label: t.contacts.fact1Label },
    { value: t.contacts.fact2Value, label: t.contacts.fact2Label },
    { value: t.contacts.fact3Value, label: t.contacts.fact3Label },
  ];

  return (
    <>
      <PageHero
        title={t.contacts.title}
        image="/assets/hero-contacts.webp"
        imageMobile="/assets/hero-contacts-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal>
          <ChannelCards channels={channels} />
        </Reveal>

        <Reveal className="mt-16 grid sm:grid-cols-3 gap-10 border-t border-line pt-12">
          {facts.map((fact) => (
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
