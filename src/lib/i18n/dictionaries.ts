import type { Locale } from "./config";

/* ============================================================
   Russian is the source of truth; the Uzbek object below is
   type-checked against its shape (`Dictionary = typeof ru`).
   Terms that stay as-is per the brief: "jele" (желе),
   "shotlar" (шоты), brand names (VITOM, VITOSHOTS, Uzum…).
   ============================================================ */

const ru = {
  nav: {
    about: "О бренде",
    catalog: "Каталог",
    delivery: "Доставка и оплата",
    whereToBuy: "Где купить",
    certificates: "Сертификаты",
    contacts: "Контакты",
    faq: "Вопросы и ответы",
  },
  header: {
    search: "Поиск",
    cart: "Корзина",
    account: "Аккаунт",
    menu: "Меню",
  },
  common: {
    close: "Закрыть",
    skipToContent: "К основному содержимому",
  },
  hero: {
    line1: "Морской коллаген",
    line2: "для ежедневного ритуала",
    ctaPrimary: "К подбору",
    ctaSecondary: "О бренде",
  },
  catalogSection: {
    shots: "Шоты",
    jelly: "Желе",
    cta: "К покупкам",
  },
  advantages: {
    eyebrow: "Daily effect",
    title: "Преимущества",
    skin: "Увлажнённая кожа",
    hair: "Густые волосы",
    nails: "Крепкие ногти",
    joints: "Подвижные суставы",
  },
  catalog: {
    title: "Каталог",
    all: "Все",
    jelly: "Желе",
    shots: "Шоты",
    filterGroup: "Фильтр по формату",
  },
  product: {
    volume: "Объём",
    addToCart: "В корзину",
    added: "Добавлено ✓",
    write: "Написать",
    flavorLabel: "Вкус",
    related: "Смотрите также",
    back: "Назад",
    more: "Подробнее",
    decrease: "Уменьшить количество",
    increase: "Увеличить количество",
    prevPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    productImage: "Изображение товара",
    photo: "Фото",
    writeTelegram: "Написать в Telegram",
    shortDesc: {
      shots:
        "Порционный жидкий курс морского коллагена со вкусом «{flavor}» — готов к приёму без подготовки. Один шот в день для красоты кожи, волос и тонуса.",
      jelly:
        "Мягкий желейный формат курса на морском коллагене со вкусом «{flavor}» — удобная порция на каждый день, приятная текстура без приторности.",
    },
  },
  badge: {
    new: "Новинка",
    sale: "Скидка",
    popular: "Хит",
  },
  tabs: {
    specs: "Характеристики",
    usage: "Рекомендация к применению",
    composition: "Состав",
    ingredients: "Ингредиенты",
    shots: {
      specs: [
        "Морской коллаген с высокой биодоступностью",
        "Порционный формат — готовый шот без смешивания",
        "Без сахара и искусственных красителей",
        "Курс рассчитан на ежедневный приём",
        "Натуральный вкус «{flavor}»",
      ],
      usage: [
        "Принимайте 1 шот в день, лучше утром натощак",
        "Встряхните перед употреблением",
        "Проходите курс не менее месяца для заметного результата",
        "Храните в прохладном тёмном месте",
      ],
      composition: [
        "Гидролизат морского коллагена",
        "Витамин C",
        "Натуральный экстракт «{flavor}»",
        "Очищенная вода",
      ],
      ingredients: [
        "Коллаген (рыбный гидролизат)",
        "Аскорбиновая кислота (витамин C)",
        "Натуральный ароматизатор",
        "Регулятор кислотности",
        "Консервант природного происхождения",
      ],
    },
    jelly: {
      specs: [
        "Морской коллаген в мягком желейном формате",
        "Без сахара и искусственных красителей",
        "Удобная ежедневная порция",
        "Приятная текстура и натуральный вкус",
        "Подходит для домашнего ритуала",
      ],
      usage: [
        "Принимайте 1 порцию желе в день",
        "Можно есть отдельно или добавлять в напитки",
        "Проходите курс регулярно для лучшего результата",
        "Храните в прохладном месте",
      ],
      composition: [
        "Гидролизат морского коллагена",
        "Желирующий агент растительного происхождения",
        "Витамин C",
        "Натуральный экстракт «{flavor}»",
      ],
      ingredients: [
        "Коллаген (рыбный гидролизат)",
        "Пектин / агар",
        "Аскорбиновая кислота (витамин C)",
        "Натуральный ароматизатор",
        "Регулятор кислотности",
      ],
    },
  },
  cart: {
    title: "Корзина",
    empty: "Корзина пуста",
    emptyDesc: "Добавьте формат коллагена — шоты или желе — из каталога.",
    toCatalog: "В каталог",
    total: "Итого",
    checkout: "Оформить заказ",
    clear: "Очистить корзину",
    decrease: "Уменьшить",
    increase: "Увеличить",
    remove: "Удалить из корзины",
    closeAria: "Закрыть корзину",
  },
  search: {
    dialogAria: "Поиск по каталогу",
    closeAria: "Закрыть поиск",
    queryAria: "Поисковый запрос",
    placeholder: "Название, вкус или категория…",
    hint: "Начните вводить — ищем по названию, вкусу и категории.",
    nothing: "По запросу «{q}» ничего не найдено.",
  },
  account: {
    dialogAria: "Личный кабинет",
    eyebrow: "Личный кабинет",
    title: "Скоро",
    desc: "Профиль и история заказов появятся здесь в ближайшее время.",
  },
  footer: {
    about: "О нас",
    delivery: "Доставка и оплата",
    faq: "FAQ",
    contacts: "Контакты",
    whereToBuy: "Где купить",
    certificates: "Сертификаты",
    rights: "© 2026 VITOM CLINIC",
    madeBy: "Сайт разработан командой",
    policy: "Политика конфиденциальности",
  },
  about: {
    title: "О бренде",
    intro:
      "VITOM соединяет морской коллаген, чистую визуальную культуру и понятные курсы без перегрузки. Основная линейка строится вокруг двух форматов приёма: порционные beauty shots и желе. Отдельная страница бренда готова к наполнению историей, составом и принципами продукта.",
    stat1: "Формата приёма",
    stat2: "Объёма курса",
    stat3: "Вкусовые палитры",
  },
  delivery: {
    title: "Доставка и оплата",
    step1Title: "Выбираете формат и объём",
    step1Body:
      "Шоты VITOSHOTS или желе, в нужном вкусе и на нужный курс — от месяца до длинного курса со скидкой за объём.",
    step2Title: "Оформляете заказ на Uzum Market",
    step2Body:
      "Переходите в наш магазин на Uzum, добавляете товар в корзину и подтверждаете заказ — каталог и наличие всегда актуальны.",
    step3Title: "Оплачиваете удобным способом",
    step3Body:
      "Картой онлайн или при получении. Оплата проходит на стороне Uzum Market — безопасно и без предоплаты наличными нам.",
    step4Title: "Получаете доставку по Узбекистану",
    step4Body:
      "Сроки, трекинг и пункты выдачи показывает маркетплейс. Доставка работает по всей стране.",
    ctaUzum: "Открыть на Uzum Market",
    ctaInstagram: "Заказать в Instagram",
    ctaTelegram: "Задать вопрос в Telegram",
  },
  whereToBuy: {
    title: "Где купить",
    intro:
      "VITOM продаётся только в официальных каналах — так вы получаете оригинальный продукт с гарантией состава и срока годности. Выбирайте удобный способ.",
    uzumEyebrow: "Marketplace",
    uzumDesc:
      "Официальный магазин VITOM с актуальным каталогом, оплатой и доставкой по всему Узбекистану.",
    telegramEyebrow: "Direct",
    telegramDesc:
      "Напишите нам напрямую — поможем выбрать формат, подскажем наличие и оформим заказ.",
    instagramEyebrow: "Social",
    instagramDesc:
      "Новинки, составы и реальные отзывы. Здесь же — анонсы поступлений и акций.",
    note:
      "Остерегайтесь подделок: VITOM не продаётся через сторонних посредников. Если сомневаетесь в продавце — напишите нам в Telegram, и мы подтвердим.",
  },
  certificates: {
    title: "Сертификаты",
    point1Title: "Сертификаты соответствия",
    point1Body:
      "Продукция сопровождается документами о соответствии — подтверждают качество и безопасность каждого формата.",
    point2Title: "Без сахара и подсластителей",
    point2Body:
      "В составе нет добавленного сахара и искусственных подсластителей — чистая формула без лишнего.",
    point3Title: "Без искусственных красителей",
    point3Body:
      "Вкус и цвет — за счёт натуральных компонентов. Никаких синтетических красителей.",
    point4Title: "Легкоусвояемый морской коллаген",
    point4Body:
      "В основе — морской коллаген с высокой биодоступностью: форма, которую организм усваивает легче.",
    note: "Нужны конкретные документы или копии сертификатов? Напишите нам — пришлём в ответ.",
    cta: "Запросить в Telegram",
  },
  contacts: {
    title: "Контакты",
    telegramEyebrow: "Чат",
    telegramDesc: "Самый быстрый способ связаться. Поможем с выбором, составом и заказом.",
    instagramEyebrow: "Соцсети",
    instagramDesc: "Новинки, обзоры и отзывы. Пишите в директ — отвечаем там же.",
    uzumEyebrow: "Заказ",
    uzumDesc: "Официальный магазин с оплатой и доставкой по Узбекистану.",
    fact1Value: "В течение дня",
    fact1Label: "Время ответа",
    fact2Value: "Узбекистан",
    fact2Label: "Доставка",
    fact3Value: "Каждый день",
    fact3Label: "На связи",
  },
  faq: {
    title: "Вопросы и ответы",
    intro:
      "Коротко о форматах, приёме и заказе VITOM. Не нашли ответ — напишите нам в Telegram, отвечаем в течение дня.",
    cta: "Написать в Telegram",
    items: [
      {
        q: "Чем шоты VITOSHOTS отличаются от желе?",
        a: "Это два формата одного курса. VITOSHOTS — готовый жидкий приём без подготовки, удобно брать с собой. Желе — мягкий формат для домашнего ритуала. Состав и действие совпадают, отличается только способ приёма и текстура.",
      },
      {
        q: "Как принимать и сколько длится курс?",
        a: "Один приём в день, лучше утром натощак или между приёмами пищи. Объём 700 мл и 650 г рассчитан примерно на месячный курс; варианты 1400 мл и 2100 мл — на более длинные курсы со скидкой за объём.",
      },
      {
        q: "Какие вкусы есть в линейке?",
        a: "Три вкуса в обоих форматах: смородина, яблоко и вишня. Вкусы взаимозаменяемы по составу — выбирайте по предпочтению.",
      },
      {
        q: "Из чего сделан коллаген?",
        a: "В основе морской коллаген — он отличается высокой биодоступностью. Состав чистый, без лишних добавок; полный список ингредиентов указан на упаковке каждого продукта.",
      },
      {
        q: "Как оформить заказ и получить доставку?",
        a: "Заказы идут через Uzum Market — нажмите «Где купить» или иконку Uzum в подвале сайта. Доставка и оплата проходят на стороне маркетплейса по всему Узбекистану.",
      },
      {
        q: "Есть ли сертификаты качества?",
        a: "Да. Продукция сопровождается сертификатами соответствия — раздел «Сертификаты» на главной странице. По дополнительным документам напишите нам в Telegram.",
      },
    ],
  },
  products: {
    nameShots: "Жидкий морской коллаген",
    nameJelly: "Морской коллаген желе",
    categoryShots: "Шоты",
    categoryJelly: "Желе",
    descShots: "Жидкий коллагеновый курс",
    descJelly: "Формат желе",
    flavors: {
      "Чёрная смородина": "Чёрная смородина",
      Яблоко: "Яблоко",
      Вишня: "Вишня",
    } as Record<string, string>,
  },
};

export type Dictionary = typeof ru;

const uz: Dictionary = {
  nav: {
    about: "Brend haqida",
    catalog: "Katalog",
    delivery: "Yetkazib berish va to'lov",
    whereToBuy: "Qayerdan sotib olish",
    certificates: "Sertifikatlar",
    contacts: "Kontaktlar",
    faq: "Savol va javoblar",
  },
  header: {
    search: "Qidiruv",
    cart: "Savat",
    account: "Hisob",
    menu: "Menyu",
  },
  common: {
    close: "Yopish",
    skipToContent: "Asosiy mazmunga",
  },
  hero: {
    line1: "Dengiz kollageni",
    line2: "har kunlik ritual uchun",
    ctaPrimary: "Tanlovga",
    ctaSecondary: "Brend haqida",
  },
  catalogSection: {
    shots: "Shotlar",
    jelly: "Jele",
    cta: "Xaridlarga",
  },
  advantages: {
    eyebrow: "Daily effect",
    title: "Afzalliklar",
    skin: "Namlangan teri",
    hair: "Quyuq sochlar",
    nails: "Mustahkam tirnoqlar",
    joints: "Harakatchan bo'g'imlar",
  },
  catalog: {
    title: "Katalog",
    all: "Hammasi",
    jelly: "Jele",
    shots: "Shotlar",
    filterGroup: "Format bo'yicha filtr",
  },
  product: {
    volume: "Hajmi",
    addToCart: "Savatga",
    added: "Qo'shildi ✓",
    write: "Yozish",
    flavorLabel: "Ta'mi",
    related: "Shuningdek qarang",
    back: "Orqaga",
    more: "Batafsil",
    decrease: "Sonini kamaytirish",
    increase: "Sonini oshirish",
    prevPhoto: "Oldingi rasm",
    nextPhoto: "Keyingi rasm",
    productImage: "Mahsulot rasmi",
    photo: "Rasm",
    writeTelegram: "Telegramga yozish",
    shortDesc: {
      shots:
        "«{flavor}» ta'mli dengiz kollagenining porsiyali suyuq kursi — tayyorgarliksiz qabulga tayyor. Teri, soch go'zalligi va tetiklik uchun kuniga bitta shot.",
      jelly:
        "«{flavor}» ta'mli dengiz kollageni kursining yumshoq jele formati — har kun uchun qulay porsiya, me'yorida shirin yoqimli tekstura.",
    },
  },
  badge: {
    new: "Yangi",
    sale: "Chegirma",
    popular: "Xit",
  },
  tabs: {
    specs: "Xususiyatlar",
    usage: "Qo'llash bo'yicha tavsiya",
    composition: "Tarkibi",
    ingredients: "Ingredientlar",
    shots: {
      specs: [
        "Yuqori bioo'zlashtiriladigan dengiz kollageni",
        "Porsiyali format — aralashtirmasdan tayyor shot",
        "Shakar va sun'iy bo'yoqlarsiz",
        "Kurs har kunlik qabulga mo'ljallangan",
        "Tabiiy «{flavor}» ta'mi",
      ],
      usage: [
        "Kuniga 1 shot qabul qiling, eng yaxshisi ertalab och qoringa",
        "Iste'moldan oldin chayqating",
        "Sezilarli natija uchun kursni kamida bir oy davom ettiring",
        "Salqin, qorong'i joyda saqlang",
      ],
      composition: [
        "Dengiz kollageni gidrolizati",
        "C vitamini",
        "Tabiiy «{flavor}» ekstrakti",
        "Tozalangan suv",
      ],
      ingredients: [
        "Kollagen (baliq gidrolizati)",
        "Askorbin kislotasi (C vitamini)",
        "Tabiiy aromatizator",
        "Kislotalilik regulyatori",
        "Tabiiy kelib chiqishli konservant",
      ],
    },
    jelly: {
      specs: [
        "Yumshoq jele formatidagi dengiz kollageni",
        "Shakar va sun'iy bo'yoqlarsiz",
        "Qulay kunlik porsiya",
        "Yoqimli tekstura va tabiiy ta'm",
        "Uy rituali uchun mos",
      ],
      usage: [
        "Kuniga 1 porsiya jele qabul qiling",
        "Alohida yeyish yoki ichimliklarga qo'shish mumkin",
        "Yaxshiroq natija uchun kursni muntazam o'ting",
        "Salqin joyda saqlang",
      ],
      composition: [
        "Dengiz kollageni gidrolizati",
        "O'simlik kelib chiqishli jelelashtiruvchi agent",
        "C vitamini",
        "Tabiiy «{flavor}» ekstrakti",
      ],
      ingredients: [
        "Kollagen (baliq gidrolizati)",
        "Pektin / agar",
        "Askorbin kislotasi (C vitamini)",
        "Tabiiy aromatizator",
        "Kislotalilik regulyatori",
      ],
    },
  },
  cart: {
    title: "Savat",
    empty: "Savat bo'sh",
    emptyDesc: "Katalogdan kollagen formatini — shotlar yoki jele — qo'shing.",
    toCatalog: "Katalogga",
    total: "Jami",
    checkout: "Buyurtma berish",
    clear: "Savatni tozalash",
    decrease: "Kamaytirish",
    increase: "Oshirish",
    remove: "Savatdan o'chirish",
    closeAria: "Savatni yopish",
  },
  search: {
    dialogAria: "Katalog bo'yicha qidiruv",
    closeAria: "Qidiruvni yopish",
    queryAria: "Qidiruv so'rovi",
    placeholder: "Nomi, ta'mi yoki kategoriya…",
    hint: "Yoza boshlang — nomi, ta'mi va kategoriya bo'yicha qidiramiz.",
    nothing: "«{q}» so'rovi bo'yicha hech narsa topilmadi.",
  },
  account: {
    dialogAria: "Shaxsiy kabinet",
    eyebrow: "Shaxsiy kabinet",
    title: "Tez kunda",
    desc: "Profil va buyurtmalar tarixi tez orada shu yerda paydo bo'ladi.",
  },
  footer: {
    about: "Biz haqimizda",
    delivery: "Yetkazib berish va to'lov",
    faq: "FAQ",
    contacts: "Kontaktlar",
    whereToBuy: "Qayerdan sotib olish",
    certificates: "Sertifikatlar",
    rights: "© 2026 VITOM CLINIC",
    madeBy: "Saytni ishlab chiqdi",
    policy: "Maxfiylik siyosati",
  },
  about: {
    title: "Brend haqida",
    intro:
      "VITOM dengiz kollagenini, toza vizual madaniyat va ortiqcha yuksiz tushunarli kurslarni birlashtiradi. Asosiy liniya ikki qabul formati atrofida quriladi: porsiyali beauty shotlar va jele. Alohida brend sahifasi tarix, tarkib va mahsulot tamoyillari bilan to'ldirishga tayyor.",
    stat1: "Qabul formati",
    stat2: "Kurs hajmi",
    stat3: "Ta'm palitralari",
  },
  delivery: {
    title: "Yetkazib berish va to'lov",
    step1Title: "Format va hajmni tanlaysiz",
    step1Body:
      "VITOSHOTS shotlari yoki jele, kerakli ta'mda va kerakli kursda — bir oydan to hajm uchun chegirmali uzoq kursgacha.",
    step2Title: "Uzum Marketda buyurtma berasiz",
    step2Body:
      "Uzumdagi do'konimizga o'tasiz, mahsulotni savatga qo'shasiz va buyurtmani tasdiqlaysiz — katalog va mavjudlik doim dolzarb.",
    step3Title: "Qulay usulda to'laysiz",
    step3Body:
      "Onlayn karta bilan yoki qabul qilishda. To'lov Uzum Market tomonida amalga oshadi — xavfsiz va bizga naqd oldindan to'lovsiz.",
    step4Title: "O'zbekiston bo'ylab yetkazib berishni olasiz",
    step4Body:
      "Muddat, kuzatuv va topshirish punktlarini marketpleys ko'rsatadi. Yetkazib berish butun mamlakat bo'ylab ishlaydi.",
    ctaUzum: "Uzum Marketda ochish",
    ctaInstagram: "Instagramda buyurtma berish",
    ctaTelegram: "Telegramda savol berish",
  },
  whereToBuy: {
    title: "Qayerdan sotib olish",
    intro:
      "VITOM faqat rasmiy kanallarda sotiladi — shunda siz tarkibi va yaroqlilik muddati kafolatlangan original mahsulotni olasiz. Qulay usulni tanlang.",
    uzumEyebrow: "Marketplace",
    uzumDesc:
      "Dolzarb katalog, to'lov va O'zbekiston bo'ylab yetkazib berishga ega VITOMning rasmiy do'koni.",
    telegramEyebrow: "Direct",
    telegramDesc:
      "Bizga to'g'ridan-to'g'ri yozing — formatni tanlashga yordam beramiz, mavjudlikni aytamiz va buyurtma rasmiylashtiramiz.",
    instagramEyebrow: "Social",
    instagramDesc:
      "Yangiliklar, tarkiblar va haqiqiy sharhlar. Shu yerda — yangi kelishlar va aksiyalar e'lonlari.",
    note:
      "Soxtalardan ehtiyot bo'ling: VITOM uchinchi tomon vositachilar orqali sotilmaydi. Sotuvchiga shubhangiz bo'lsa — bizga Telegramda yozing, tasdiqlaymiz.",
  },
  certificates: {
    title: "Sertifikatlar",
    point1Title: "Muvofiqlik sertifikatlari",
    point1Body:
      "Mahsulot muvofiqlik hujjatlari bilan ta'minlangan — har bir format sifati va xavfsizligini tasdiqlaydi.",
    point2Title: "Shakar va shirinlashtiruvchilarsiz",
    point2Body:
      "Tarkibda qo'shilgan shakar va sun'iy shirinlashtiruvchilar yo'q — ortiqchasiz toza formula.",
    point3Title: "Sun'iy bo'yoqlarsiz",
    point3Body: "Ta'm va rang — tabiiy komponentlar hisobiga. Hech qanday sintetik bo'yoqlarsiz.",
    point4Title: "Oson o'zlashtiriladigan dengiz kollageni",
    point4Body:
      "Asosida — yuqori bioo'zlashtiriladigan dengiz kollageni: organizm osonroq o'zlashtiradigan shakl.",
    note: "Aniq hujjatlar yoki sertifikat nusxalari kerakmi? Bizga yozing — javoban yuboramiz.",
    cta: "Telegramda so'rash",
  },
  contacts: {
    title: "Kontaktlar",
    telegramEyebrow: "Chat",
    telegramDesc: "Bog'lanishning eng tez yo'li. Tanlash, tarkib va buyurtmada yordam beramiz.",
    instagramEyebrow: "Ijtimoiy tarmoqlar",
    instagramDesc: "Yangiliklar, sharhlar va fikrlar. Direktga yozing — o'sha yerda javob beramiz.",
    uzumEyebrow: "Buyurtma",
    uzumDesc: "O'zbekiston bo'ylab to'lov va yetkazib berishga ega rasmiy do'kon.",
    fact1Value: "Kun davomida",
    fact1Label: "Javob vaqti",
    fact2Value: "O'zbekiston",
    fact2Label: "Yetkazib berish",
    fact3Value: "Har kuni",
    fact3Label: "Aloqada",
  },
  faq: {
    title: "Savol va javoblar",
    intro:
      "VITOM formatlari, qabul qilish va buyurtma haqida qisqacha. Javob topmadingizmi — bizga Telegramda yozing, kun davomida javob beramiz.",
    cta: "Telegramga yozish",
    items: [
      {
        q: "VITOSHOTS shotlari jeleden nimasi bilan farq qiladi?",
        a: "Bu bir kursning ikki formati. VITOSHOTS — tayyorgarliksiz tayyor suyuq qabul, o'zi bilan olib yurish qulay. Jele — uy rituali uchun yumshoq format. Tarkibi va ta'siri bir xil, faqat qabul usuli va teksturasi farq qiladi.",
      },
      {
        q: "Qanday qabul qilinadi va kurs qancha davom etadi?",
        a: "Kuniga bir marta, eng yaxshisi ertalab och qoringa yoki ovqatlanishlar orasida. 700 ml va 650 g hajmi taxminan bir oylik kursga mo'ljallangan; 1400 ml va 2100 ml variantlari — hajm uchun chegirmali uzunroq kurslarga.",
      },
      {
        q: "Liniyada qanday ta'mlar bor?",
        a: "Ikkala formatda uchta ta'm: smorodina, olma va gilos. Ta'mlar tarkibi bo'yicha o'zaro almashtiriladi — xohishingizga ko'ra tanlang.",
      },
      {
        q: "Kollagen nimadan tayyorlangan?",
        a: "Asosida dengiz kollageni — u yuqori bioo'zlashtirilishi bilan ajralib turadi. Tarkibi toza, ortiqcha qo'shimchalarsiz; ingredientlarning to'liq ro'yxati har bir mahsulot qadog'ida ko'rsatilgan.",
      },
      {
        q: "Buyurtmani qanday rasmiylashtirib, yetkazib berishni olish mumkin?",
        a: "Buyurtmalar Uzum Market orqali amalga oshadi — «Qayerdan sotib olish» yoki sayt pastidagi Uzum belgisini bosing. Yetkazib berish va to'lov O'zbekiston bo'ylab marketpleys tomonida o'tadi.",
      },
      {
        q: "Sifat sertifikatlari bormi?",
        a: "Ha. Mahsulot muvofiqlik sertifikatlari bilan ta'minlangan — bosh sahifadagi «Sertifikatlar» bo'limi. Qo'shimcha hujjatlar bo'yicha bizga Telegramda yozing.",
      },
    ],
  },
  products: {
    nameShots: "Suyuq dengiz kollageni",
    nameJelly: "Dengiz kollagen jele",
    categoryShots: "Shotlar",
    categoryJelly: "Jele",
    descShots: "Suyuq kollagen kursi",
    descJelly: "Jele formati",
    flavors: {
      "Чёрная смородина": "Qora smorodina",
      Яблоко: "Olma",
      Вишня: "Gilos",
    } as Record<string, string>,
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ru, uz };
