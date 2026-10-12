export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  date?: string;
  displayOrder: number;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  favorite?: boolean;
}

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: 'memory-1',
    displayOrder: 1,
    title: 'أول يوم اتكلمنا في الكلية ❤️',
    caption: 'أول مرة وقفنا اتكلمنا فيها مع بعض في الكلية.. من اليوم ده وكل حاجة في حياتي بقت أحلى بكتير ❤️',
    image: '/images/memories/memory-1.jpg',
    date: 'الكلية',
    aspectRatio: 'portrait',
  },
  {
    id: 'memory-2',
    displayOrder: 2,
    title: 'أول آيس كوفي يجيبهولي ☕',
    caption: 'أول آيس كوفي تجيبهولي.. طعمه كان مختلف ومميز عشان كان من إيدك مخصوص ليا ☕✨',
    image: '/images/memories/memory-2.png',
    date: '8:30 AM Saturday',
    aspectRatio: 'portrait',
  },
  {
    id: 'memory-3',
    displayOrder: 3,
    title: 'اليوم اللي قالي فيه بحبك — 13/10/2025 ❤️',
    caption: 'اليوم اللي قولتلي فيه بحبك لأول مرة.. قلبي دق جامد وحسيت إن الدنيا كلها مش سايعاني من الفرحة ❤️',
    image: '/images/memories/memory-3.png',
    date: '13/10/2025',
    aspectRatio: 'portrait',
    favorite: true,
  },
  {
    id: 'memory-4',
    displayOrder: 4,
    title: 'يوم ما كتبلي بحبك وإحنا في محاضرة — 13/10/2025 💌',
    caption: 'يوم ما كتبتلي الرسالة دي وإحنا في المحاضرة: "توته انا حاسس اني بحبك ودي الحاجه بقا اللي معرفتش اقولها واحنا بره".. لسه شايلاها في قلبي 💌',
    image: '/images/memories/memory-4.jpg',
    date: '13/10/2025',
    aspectRatio: 'portrait',
  },
  {
    id: 'memory-5',
    displayOrder: 5,
    title: 'يوم ما أخدنا أصحابنا وروحنا البلد عنده، وأول ما دخلناها بص عليا وقالي: نورتيها ❤️',
    caption: 'اليوم اللي روحنا فيه البلد عندك مع أصحابنا.. أول ما دخلنا بصيت في عيني وقولتلي "نورتيها".. الكلمة دي فرقت معايا أوي ❤️',
    image: '/images/memories/memory-5.png',
    date: 'مشوار البلد',
    aspectRatio: 'portrait',
  },
  {
    id: 'memory-6',
    displayOrder: 6,
    title: 'الصورة اللي إنت بتحبها 📸',
    caption: 'الصورة اللي دايماً تقولي دي أحلى صورة ليكي وبحبها وإيدينا في إيد بعض.. كل ما بشوفها بفتكر حنيتك ودفى إيدك 📸❤️',
    image: '/images/memories/memory-6.png',
    date: 'صورتنا المفضلة',
    aspectRatio: 'portrait',
    favorite: true,
  },
  {
    id: 'memory-7',
    displayOrder: 7,
    title: 'أول ساحلة معايا للدكاترة، كنت اللي بتوديني ❤️',
    caption: 'أول ساحلة ومشاوير للدكاترة، كنت إنت اللي واقف في ضهري وبتوديني ومش سايبني لوحدي لحظة واحدة ❤️',
    image: '/images/memories/memory-7.png',
    date: 'سندي دايماً',
    aspectRatio: 'landscape',
  },
  {
    id: 'memory-8',
    displayOrder: 8,
    title: 'يوم السوبيا: قولتلك يومها مبحبش السوبيا، قولتلي جربيها على ضمانتي، ومن يومها مبشربش غيرها ❤️',
    caption: 'قولتلك يومها مبحبش السوبيا، قولتلي جربيها على ضمانتي.. ومن يومها مبشربش غيرها وبقت أحلى حاجة عشان على ضمانتك ❤️',
    image: '/images/memories/memory-8.png',
    date: 'على ضمانتك',
    aspectRatio: 'portrait',
  },
];
