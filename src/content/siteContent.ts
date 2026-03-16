import type { Language } from "@/config/languages";

export type GalleryItem = {
  id: string;
  src: string;
  alt: { uk: string; en: string };
  tag?: { uk: string; en: string };
};

export type Service = {
  id: "fitness" | "body-pump" | "functional" | "stretching" | "pilates" | "hiit";
  slug: string;
  title: { uk: string; en: string };
  description: { uk: string; en: string };
  fullDescription: { uk: string; en: string };
  difficulty: { uk: string; en: string };
  durationMin: number;
  heroImage: string;
  video?: string;
  benefits: { uk: string[]; en: string[] };
};

export type Trainer = {
  id: string;
  photo: string;
  name: { uk: string; en: string };
  specialization: { uk: string; en: string };
  experienceYears: number;
  approach: { uk: string; en: string };
  achievements?: { uk: string[]; en: string[] };
  certificates?: { uk: string[]; en: string[] };
  socials?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  pricing?: {
    singleSession: number;
    pack10: number;
    note?: { uk: string; en: string };
  };
};

export const CONTENT = {
  nav: {
    hero: { uk: "Головна", en: "Home" },
    gallery: { uk: "Галерея", en: "Gallery" },
    hours: { uk: "Графік", en: "Hours" },
    trainers: { uk: "Тренери", en: "Trainers" },
    services: { uk: "Послуги", en: "Services" },
    kbzhv: { uk: "КБЖВ", en: "Macros" },
    contact: { uk: "Контакти", en: "Contact" },
  },

  header: {
    cta: { uk: "Записатися", en: "Join" },
    settings: { uk: "Налаштування", en: "Settings" },
    ariaOpenMenu: { uk: "Відкрити меню", en: "Open menu" },
    ariaCloseMenu: { uk: "Закрити меню", en: "Close menu" },
  },

  hero: {
    eyebrow: { uk: "Premium Fitness Club", en: "Premium Fitness Club" },
    title: {
      uk: "Strong Muscle Gym - зал, де сила стає системою",
      en: "Strong Muscle Gym - where strength becomes a system",
    },
    subtitle: {
      uk: "Преміальне обладнання, розумні програми та тренери, які ведуть до результату. Тренуйся красиво, потужно й технологічно.",
      en: "Premium equipment, smart programming, and coaches who deliver results. Train with style, power, and technology.",
    },
    primaryCta: { uk: "Записатися на пробне", en: "Book a trial" },
    secondaryCta: { uk: "Дивитися послуги", en: "Explore services" },
    visualKicker: {
      uk: "Спринт + Сила + Контроль",
      en: "Sprint + Strength + Control",
    },
    stats: [
      { id: "members", value: 1200, suffix: "+", uk: "учасників клубу", en: "members" },
      { id: "coaches", value: 14, suffix: "", uk: "сертифікованих тренерів", en: "certified coaches" },
      { id: "open", value: 24, suffix: "/7", uk: "доступ до залу", en: "gym access" },
      { id: "programs", value: 32, suffix: "+", uk: "програм на місяць", en: "monthly programs" },
    ],
  },

  gallery: {
    title: { uk: "Атмосфера SMG", en: "SMG atmosphere" },
    subtitle: {
      uk: "Метал, світло, ритм. Дивись, як виглядає тренування в преміальному клубі.",
      en: "Metal, light, rhythm. See what training looks like in a premium club.",
    },
    cta: { uk: "Записатися", en: "Join now" },
    items: [
      {
        id: "g1",
        src: "/images/gallery/gallery-1.webp",
        alt: { uk: "Силова зона", en: "Strength Zone" },
        tag: { uk: "Strength", en: "Strength" },
      },
      {
        id: "g2",
        src: "/images/gallery/gallery-2.webp",
        alt: { uk: "Тренажерний зал", en: "Gym Floor" },
        tag: { uk: "Machines", en: "Machines" },
      },
      {
        id: "g3",
        src: "/images/gallery/gallery-3.webp",
        alt: { uk: "Кардіо деталі", en: "Cardio Details" },
        tag: { uk: "Cardio", en: "Cardio" },
      },
      {
        id: "g4",
        src: "/images/gallery/gallery-4.webp",
        alt: { uk: "Панорамний вид", en: "Panoramic View" },
        tag: { uk: "View", en: "View" },
      },
      {
        id: "g5",
        src: "/images/gallery/gallery-5.webp",
        alt: { uk: "Гантельна зона", en: "Dumbbell Area" },
        tag: { uk: "Iron", en: "Iron" },
      },
      {
        id: "g6",
        src: "/images/gallery/gallery-6.webp",
        alt: { uk: "Кардіо біля вікон", en: "Cardio by the Windows" },
        tag: { uk: "Cardio", en: "Cardio" },
      },
    ] satisfies GalleryItem[],
  },

  hours: {
    title: { uk: "Графік роботи", en: "Working hours" },
    subtitle: {
      uk: "Плануй тренування без компромісів. Ми відкриті тоді, коли тобі потрібно.",
      en: "Plan training with no compromises. We’re open when you need it.",
    },
    ctaPrimary: { uk: "Записатися", en: "Join" },
    ctaSecondary: { uk: "Зателефонувати", en: "Call" },
    phone: "+380 (44) 123-45-67",
    schedule: [
      { day: 1, uk: "Понеділок", en: "Monday", open: "08:30", close: "21:30" },
      { day: 2, uk: "Вівторок", en: "Tuesday", open: "08:30", close: "21:30" },
      { day: 3, uk: "Середа", en: "Wednesday", open: "08:30", close: "21:30" },
      { day: 4, uk: "Четвер", en: "Thursday", open: "08:30", close: "21:30" },
      { day: 5, uk: "П’ятниця", en: "Friday", open: "08:30", close: "21:30" },
      { day: 6, uk: "Субота", en: "Saturday", open: "09:00", close: "19:00" },
      { day: 0, uk: "Неділя", en: "Sunday", open: "00:00", close: "00:00" },
    ],
    statusOpen: { uk: "Зараз відчинено", en: "Open now" },
    statusClosed: { uk: "Зараз зачинено", en: "Closed now" },
  },

  services: {
    title: { uk: "Послуги та класи", en: "Services & classes" },
    subtitle: {
      uk: "Від бази до піку форми. Обери формат, який підходить твоїй цілі.",
      en: "From foundation to peak shape. Choose the format that fits your goal.",
    },
    cta: { uk: "Записатися", en: "Book" },
    items: [
      {
        id: "fitness",
        slug: "fitness",
        title: { uk: "Fitness", en: "Fitness" },
        description: {
          uk: "Поєднання різних технік та форматів для покращення загального стану організму.",
          en: "A combination of different techniques and formats to improve your overall physical condition.",
        },
        fullDescription: {
          uk: "Групові тренування Fitness в SMGym - це поєднання різних технік та форматів, які спрямовані на покращення загального стану організму. Тренування проходять із використанням різноманітного інвентарю: гантелі, фітнес-резинки, степ-платформи та інше. На заняттях панує атмосфера підтримки, мотивації та вдосконалення.",
          en: "Group Fitness training at SMGym combines different techniques and formats focused on improving your overall physical condition. Sessions use a variety of equipment: dumbbells, resistance bands, step platforms, and more. The atmosphere is built around support, motivation, and continuous improvement.",
        },
        difficulty: { uk: "Середній", en: "Intermediate" },
        durationMin: 60,
        heroImage: "/images/services/fitness.webp",
        video: "/videos/services/fitness.mp4",
        benefits: {
          uk: ["Загальний тонус тіла", "Робота з інвентарем", "Підтримка форми", "Атмосфера мотивації"],
          en: ["Full-body tone", "Equipment-based training", "Better shape", "Motivating atmosphere"],
        },
      },
      {
        id: "body-pump",
        slug: "body-pump",
        title: { uk: "Body Pump", en: "Body Pump" },
        description: {
          uk: "Динамічне жироспалювання та зміцнення м’язів у високому темпі.",
          en: "Dynamic fat-burning and muscle strengthening in a high-tempo format.",
        },
        fullDescription: {
          uk: "Body Pump допомагає швидко спалювати калорії та зміцнювати м’язи. Заняття проходить під динамічну музику, а вправи виконуються у високому повторному режимі. У програмі використовується спеціальний інвентар: штанги з регульованою вагою, диски, степи та гантелі. Формат підходить і новачкам, і досвідченим, адже навантаження можна адаптувати під рівень підготовки.",
          en: "Body Pump helps burn calories quickly and strengthen muscles. Sessions are performed to dynamic music with high-rep training blocks. The program uses specialized equipment: adjustable barbells, plates, steps, and dumbbells. It works for both beginners and advanced participants since the load can be adapted to the fitness level.",
        },
        difficulty: { uk: "Середній", en: "Intermediate" },
        durationMin: 55,
        heroImage: "/images/services/body-pump.webp",
        video: "/videos/services/body-pump.mp4",
        benefits: {
          uk: ["Жироспалювання", "М’язовий тонус", "Високий темп", "М’язова витривалість"],
          en: ["Fat burning", "Muscle tone", "High tempo", "Muscular endurance"],
        },
      },
      {
        id: "functional",
        slug: "functional",
        title: { uk: "Functional + Stretching", en: "Functional + Stretching" },
        description: {
          uk: "Комбінований формат: силовий блок + розтяжка для сили, постави й гнучкості.",
          en: "A combined format: strength block + stretching for strength, posture, and flexibility.",
        },
        fullDescription: {
          uk: "Functional + Stretching - це комбіноване тренування, яке поєднує силові вправи та розтяжку. Спочатку виконується силовий блок для зміцнення пресу, м’язів спини та сідниць, які формують сильний корсет і підтримують правильну поставу. Після цього йде блок розтяжки, який допомагає м’яко розслабити м’язи, зняти напругу після навантаження та покращити гнучкість. Використовується різний інвентар: гімнастичні килимки, гумові стрічки, блоки, фітболи та степ-платформи.",
          en: "Functional + Stretching is a combined class that mixes strength work with flexibility training. First comes a strength block focused on the core, back, and glutes to build a strong body framework and support posture. Then comes stretching to release tension, improve recovery, and increase flexibility. Various equipment is used, including mats, resistance bands, blocks, fitballs, and step platforms.",
        },
        difficulty: { uk: "Високий", en: "Advanced" },
        durationMin: 50,
        heroImage: "/images/services/functional.webp",
        video: "/videos/services/functional.mp4",
        benefits: {
          uk: ["Сильний кор", "Краща постава", "Розслаблення після навантаження", "Гнучкість і рухливість"],
          en: ["Strong core", "Better posture", "Relaxation after training", "Flexibility and mobility"],
        },
      },
      {
        id: "stretching",
        slug: "stretching",
        title: { uk: "Stretching", en: "Stretching" },
        description: {
          uk: "М’яка робота над гнучкістю, мобільністю та відновленням.",
          en: "Gentle work on flexibility, mobility, and recovery.",
        },
        fullDescription: {
          uk: "Stretching - це комплекс різноманітних вправ на розтяжку, які роблять тіло більш гнучким, рухливим і здоровим. На заняттях ми м’яко пропрацьовуємо м’язи, знімаємо напругу та відновлюємося після силових вправ чи робочого дня. Використовується різний інвентар: гімнастичні килимки, гумові стрічки, блоки та фітболи. Формат покращує поставу, кровообіг і допомагає уникати травм, а також дає повне емоційне розслаблення.",
          en: "Stretching is a set of flexibility exercises that makes the body more mobile, flexible, and healthy. During the session we gently work through the muscles, release tension, and recover after strength sessions or a long working day. Equipment such as mats, resistance bands, blocks, and fitballs may be used. This format improves posture, circulation, and helps prevent injuries while also giving emotional relaxation.",
        },
        difficulty: { uk: "Легкий", en: "Beginner" },
        durationMin: 45,
        heroImage: "/images/services/stretching.webp",
        video: "/videos/services/stretching.mp4",
        benefits: {
          uk: ["Гнучкість", "Мобільність", "Відновлення", "Емоційне розслаблення"],
          en: ["Flexibility", "Mobility", "Recovery", "Emotional relaxation"],
        },
      },
      {
        id: "pilates",
        slug: "pilates",
        title: { uk: "Pilates", en: "Pilates" },
        description: {
          uk: "Плавні контрольовані рухи для постави, стабілізації та сили корпусу.",
          en: "Smooth controlled movements for posture, stabilization, and core strength.",
        },
        fullDescription: {
          uk: "Pilates - це гімнастика, що складається з плавних рухів і вправ, які виконуються в повільному темпі. Вона вирівнює і стабілізує хребет, зменшує дискомфорт та больові відчуття у спині. Регулярні заняття допомагають підтягнути тіло, зміцнити м’язи та збільшити їхню силу, не роблячи силует масивним. Формат активно використовується і у фізичній терапії для реабілітації після травм.",
          en: "Pilates is a system of smooth movements and exercises performed at a slow, controlled pace. It aligns and stabilizes the spine, reduces discomfort and back pain, and helps tone the body while strengthening muscles without making the silhouette bulky. This format is also widely used in physical therapy and post-injury rehabilitation.",
        },
        difficulty: { uk: "Легкий", en: "Beginner" },
        durationMin: 50,
        heroImage: "/images/services/pilates.webp",
        video: "/videos/services/pilates.mp4",
        benefits: {
          uk: ["Стабілізація хребта", "Сильний центр", "Покращення постави", "Безпечне зміцнення м’язів"],
          en: ["Spinal stability", "Strong core", "Better posture", "Safe muscle strengthening"],
        },
      },
      {
        id: "hiit",
        slug: "hiit",
        title: { uk: "HIIT", en: "HIIT" },
        description: {
          uk: "Вибухове інтервальне тренування для швидкого результату.",
          en: "Explosive interval training for fast and visible results.",
        },
        fullDescription: {
          uk: "HIIT - це вибухове тренування з інтервальним навантаженням, яке спалює максимум калорій за короткий час. Тут поєднуються силові й кардіо вправи у форматі «робота–відпочинок». Ми використовуємо різний інвентар: гантелі, фітбол, степи та власну вагу тіла. Тренування ідеально підходить тим, хто хоче швидко схуднути, підтягнути тіло та прокачати витривалість.",
          en: "HIIT is explosive interval training that burns maximum calories in a short time. It combines strength and cardio exercises in a work-rest format. Equipment may include dumbbells, fitballs, step platforms, and bodyweight drills. This training is ideal for those who want fast fat loss, body toning, and endurance improvement.",
        },
        difficulty: { uk: "Високий", en: "Advanced" },
        durationMin: 35,
        heroImage: "/images/services/hiit.webp",
        video: "/videos/services/hiit.mp4",
        benefits: {
          uk: ["Максимум калорій", "Швидкий результат", "Кардіо + сила", "Витривалість"],
          en: ["Maximum calorie burn", "Fast results", "Cardio + strength", "Endurance"],
        },
      },
    ] satisfies Service[],
  },

  trainers: {
    title: { uk: "Команда SM GYM", en: "SMG coaches" },
    subtitle: {
      uk: "Персонал, який працює на результат: техніка, система, прогрес. Обери свого тренера - і почни правильно.",
      en: "A team built for results: technique, system, progress. Choose your coach and start right.",
    },
    cta: { uk: "Записатися", en: "Book" },
    viewProfile: { uk: "Профіль", en: "Profile" },
    next: { uk: "Наступний", en: "Next" },
    prev: { uk: "Попередній", en: "Previous" },
    openProfileAria: { uk: "Відкрити профіль тренера", en: "Open trainer profile" },
    closeProfileAria: { uk: "Закрити профіль", en: "Close profile" },
    tabs: {
      overview: { uk: "Огляд", en: "Overview" },
      achievements: { uk: "Досягнення", en: "Achievements" },
      certificates: { uk: "Сертифікати", en: "Certificates" },
      pricing: { uk: "Ціни", en: "Pricing" },
    },
    trainers: [
      {
        id: "t1",
        photo: "/images/trainers/valeria.webp",
        name: { uk: "Валерія Чернова-Міхно", en: "Valeriia Chernova-Mikhno" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 9,
        approach: {
          uk: "Реабілітація після травм, корекція сколіозу, порушень постави та ніг, набір м'язевої маси, схуднення, покращення гнучкості.",
          en: "Post-injury rehab, scoliosis and posture correction, muscle gain, fat loss, and flexibility improvement.",
        },
        socials: {
          instagram: "https://www.instagram.com/_valeria_chernova.mihno_/",
        },
        pricing: {
          singleSession: 570,
          pack10: 3700,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t2",
        photo: "/images/trainers/yana.webp",
        name: { uk: "Яна Бакарджиєва", en: "Yana Bakardzhyieva" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 7,
        approach: {
          uk: "Набір м'язової маси, схуднення, збільшення силових показників, корекція харчування, реабілітація, післяпологове відновлення, індивідуальні програми тренувань.",
          en: "Muscle gain, fat loss, strength improvement, nutrition correction, rehab, postpartum recovery, and individual training plans.",
        },
        socials: {
          instagram: "https://www.instagram.com/yana_personal_trainer/",
        },
        pricing: {
          singleSession: 500,
          pack10: 3000,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t3",
        photo: "/images/trainers/ulyana.webp",
        name: { uk: "Уляна Щербо", en: "Uliana Shcherbo" },
        specialization: {
          uk: "Персональний тренер та тренер групових напрямків",
          en: "Personal Trainer & Group Instructor",
        },
        experienceYears: 6,
        approach: {
          uk: "Розвиток фізичних якостей, схуднення, набір м'язової маси та збільшення силових показників, покращення мобільності та гнучкості, складання індивідуальних програм тренувань.",
          en: "Physical development, fat loss, muscle gain, strength improvement, mobility and flexibility improvement, and individual training plans.",
        },
        socials: {
          instagram: "https://www.instagram.com/uliana_trainer_bc/",
        },
        pricing: {
          singleSession: 500,
          pack10: 3400,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t4",
        photo: "/images/trainers/oleksandr.webp",
        name: { uk: "Олександр Ширант", en: "Oleksandr Shyrant" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 7,
        approach: {
          uk: "Набір м'язевої маси, схуднення, розвиток силових та фізичних якостей, складання індивідуального плану тренувань.",
          en: "Muscle gain, fat loss, development of strength and physical qualities, and personal training plans.",
        },
        socials: {
          instagram: "https://www.instagram.com/alex.shyrant/",
        },
        pricing: {
          singleSession: 570,
          pack10: 3700,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t5",
        photo: "/images/trainers/bogdan.webp",
        name: { uk: "Богдан Сіваченко", en: "Bohdan Sivachenko" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 3,
        approach: {
          uk: "Набір м'язової маси, збільшення силових показників, схуднення, покращення фізичних якостей тіла, складання індивідуального плану тренувань.",
          en: "Muscle gain, strength growth, fat loss, improvement of body physical qualities, and personal training plans.",
        },
        socials: {
          instagram: "https://www.instagram.com/godwin_sivachenko/",
        },
        pricing: {
          singleSession: 420,
          pack10: 2200,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t6",
        photo: "/images/trainers/iryna-antoniuk.webp",
        name: { uk: "Ірина Антонюк", en: "Iryna Antoniuk" },
        specialization: {
          uk: "Персональний тренер та тренер групових напрямків",
          en: "Personal Trainer & Group Instructor",
        },
        experienceYears: 5,
        approach: {
          uk: "Покращення мобільності, схуднення, здобуття витривалості, відновлення та реабілітація після травм, операцій, пологів, корекція постави.",
          en: "Mobility improvement, fat loss, endurance development, recovery and rehab after injuries, surgery, postpartum recovery, and posture correction.",
        },
        socials: {
          instagram: "https://www.instagram.com/yarynka8888/",
        },
        pricing: {
          singleSession: 420,
          pack10: 2600,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t7",
        photo: "/images/trainers/alina.webp",
        name: { uk: "Аліна Голик", en: "Alina Holyk" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 4,
        approach: {
          uk: "Схуднення, набір м'язової маси, рекомпозиція тіла, покращення гнучкості, реабілітація після травм та операцій.",
          en: "Fat loss, muscle gain, body recomposition, flexibility improvement, and rehab after injuries and surgeries.",
        },
        socials: {
          instagram: "https://www.instagram.com/alina.holyk/",
        },
        pricing: {
          singleSession: 500,
          pack10: 3200,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t8",
        photo: "/images/trainers/daria.webp",
        name: { uk: "Дар'я Згур'єва", en: "Daria Zhurieva" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 3,
        approach: {
          uk: "Розвиток фізичних якостей, схуднення, набір м'язової маси та збільшення силових показників, покращення мобільності та гнучкості.",
          en: "Development of physical qualities, fat loss, muscle gain, strength increase, mobility, and flexibility improvement.",
        },
        socials: {
          instagram: "https://www.instagram.com/fit_dashz3l/",
        },
        pricing: {
          singleSession: 420,
          pack10: 2500,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t9",
        photo: "/images/trainers/oleksandra.webp",
        name: { uk: "Олександра Синявська", en: "Oleksandra Syniavska" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 4,
        approach: {
          uk: "Розвиток витривалості, схуднення, набір м'язевої маси, збільшення силових показників та покращення мобільності.",
          en: "Endurance development, fat loss, muscle gain, strength growth, and mobility improvement.",
        },
        socials: {
          instagram: "https://www.instagram.com/8vesna/",
        },
        pricing: {
          singleSession: 500,
          pack10: 2800,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t10",
        photo: "/images/trainers/mariia.webp",
        name: { uk: "Марія Бойко", en: "Mariia Boiko" },
        specialization: {
          uk: "Персональний тренер та лікар-ендокринолог",
          en: "Personal Trainer & Endocrinologist",
        },
        experienceYears: 6,
        approach: {
          uk: "Схуднення, набір м'язової маси, розвиток фізичних якостей, тренування вагітних та післяпологове відновлення.",
          en: "Fat loss, muscle gain, physical development, training for pregnant women, and postpartum recovery.",
        },
        socials: {
          instagram: "https://www.instagram.com/mariia_boiko_/",
        },
        pricing: {
          singleSession: 640,
          pack10: 4100,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t11",
        photo: "/images/trainers/yaroslav.webp",
        name: { uk: "Ярослав Міхно", en: "Yaroslav Mikhno" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 6,
        approach: {
          uk: "Реабілітаційні тренування, набір м'язевої маси, схуднення, складання індивідуального плану харчування та тренувань.",
          en: "Rehabilitation training, muscle gain, fat loss, and building individual nutrition and training plans.",
        },
        socials: {
          instagram: "https://www.instagram.com/mi.hno/",
        },
        pricing: {
          singleSession: 570,
          pack10: 3700,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
      {
        id: "t12",
        photo: "/images/trainers/sviatoslav.webp",
        name: { uk: "Святослав Бойко", en: "Sviatoslav Boiko" },
        specialization: { uk: "Персональний тренер", en: "Personal Trainer" },
        experienceYears: 8,
        approach: {
          uk: "Набір м'язової маси, схуднення, розвиток силових та фізичних якостей, складання індивідуального плану тренувань, корекція раціону, мотиваційний супровід.",
          en: "Muscle gain, fat loss, strength and physical development, individual training plans, nutrition correction, and motivational support.",
        },
        socials: {
          instagram: "https://www.instagram.com/sviat_boiko_coach/",
        },
        pricing: {
          singleSession: 680,
          pack10: 6000,
          note: {
            uk: "*потребує активної Клубної карти",
            en: "*requires active club membership",
          },
        },
      },
    ] satisfies Trainer[],
  },

  kbzhvCta: {
    title: { uk: "КБЖВ під твою ціль - за 60 секунд", en: "Macros for your goal - in 60 seconds" },
    subtitle: {
      uk: "Розрахуй калорії, білки, жири й вуглеводи - і отримай чіткий план на старт.",
      en: "Calculate calories, protein, fats, and carbs - and get a clear starting plan.",
    },
    cta: { uk: "Розрахувати", en: "Calculate" },
    note: {
      uk: "Без реєстрації. Дані залишаються у вас на пристрої.",
      en: "No signup. Your data stays on your device.",
    },
  },

  footer: {
    tagline: {
      uk: "Тренируйся розвивайся разом з нами!",
      en: "Train and develop with us!",
    },
    contactsTitle: { uk: "Контакти", en: "Contacts" },
    socialsTitle: { uk: "Соцмережі", en: "Socials" },
    address: {
      uk: "Броварський проспект, 7б, Київ, Украина, 02002",
      en: "Brovarsky Avenue, 7b, Kiev, Ukraine, 02002",
    },
    phone: "+380 (98) 123 45 67",
    socials: [
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
      { id: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    ],
    copyright: { uk: "Усі права захищені.", en: "All rights reserved." },
  },
} as const;

export function pickLang<T extends { uk: string; en: string }>(obj: T, lang: Language) {
  return lang === "uk" ? obj.uk : obj.en;
}