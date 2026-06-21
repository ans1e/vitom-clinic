import { Reveal } from "@/components/shared/Reveal";

interface InfoCard {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  action: { label: string; href: string };
}

const CARDS: InfoCard[] = [
  {
    id: "delivery",
    eyebrow: "Delivery",
    title: "Доставка и оплата",
    body: "Отдельная страница с условиями доставки, способами оплаты и деталями оформления заказа.",
    action: { label: "Подробнее", href: "#" },
  },
  {
    id: "retail",
    eyebrow: "Retail",
    title: "Где купить",
    body: "Актуальная точка покупки для VITOM — официальный магазин на Uzum Market.",
    action: { label: "Перейти", href: "#" },
  },
  {
    id: "trust",
    eyebrow: "Trust",
    title: "Сертификаты",
    body: "Раздел для сертификатов, состава и юридической информации готов к подключению документов бренда.",
    action: { label: "Подробнее", href: "#" },
  },
];

export function InfoCards(): React.JSX.Element {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-14 border-t border-line pt-16 items-stretch">
          {CARDS.map((card) => (
            <Reveal key={card.id} className="h-full">
              <div id={card.id} className="flex flex-col h-full">
                <p className="eyebrow text-[11px] text-smoke mb-5">{card.eyebrow}</p>
                <h2 className="display text-[30px] text-ink mb-4">{card.title}</h2>
                <p className="text-[15px] leading-[1.7] text-smoke max-w-[420px] mb-6">{card.body}</p>
                <a href={card.action.href} className="navlink eyebrow text-[11px] text-ink mt-auto self-start">
                  {card.action.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
