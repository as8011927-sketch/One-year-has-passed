export interface Milestone {
  id: string;
  title: string;
  date: string; // e.g. "13/11/2025" or ISO
  description?: string;
  badge?: string;
}

export interface FavoriteMessage {
  id: string;
  sender: "Ziad" | "Habiba";
  text: string;
  avatarColor?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption?: string;
  date?: string;
  image: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  favorite?: boolean;
}

export const COUPLE_CONFIG = {
  he: "Ziad",
  she: "Habiba",
  namesArabic: "زياد و حبيبة",
  headerScript: "Our place",
  coupleTitle: "💕 Ziad ❤️ Habiba",
  subTitle: "المكان بتاعنا إحنا الاتنين بس ❤️",
  
  // Relationship start date: 6 November 2025 — 06/11/2025
  // Note: Local time explicit anchor: 2025-11-06T00:00:00
  startDate: "2025-11-06T00:00:00",
  counterHeading: "💕 بدايتنا 💕",
  counterFooter: "كل يوم بيعدي وهفضل أحبك أكتر",

  // Screen 1: Envelope
  envelope: {
    letterFor: "A letter for",
    recipient: "Habiba",
    hint: "♥ دوسي على الظرف ♥",
  },

  // Screen 2: First Letter
  firstLetter: {
    emoji: "❤️",
    message: "مش عارف رد فعلك هيبقى إيه...\nبس عملتلك حاجة مخصوص عشانك ❤️",
    buttonText: "🎀 الدخول للموقع",
  },

  // Screen 3: Secret Word Gate
  secretGate: {
    heading: "ENTER THE SECRET WORD",
    placeholder: "اكتبي كلمة السر...",
    buttonText: "💕 افتحي الهدية 💕",
    secretWord: "love",
    errorMessage: "مش هي دي كلمة السر يا حبيبة.. جربي كلمة تعبر عن حبنا 💕",
  },

  // Screen 4: Second Letter
  secondLetter: {
    emoji: "🥹",
    message: "كل حاجة جوا هنا مننا إحنا...\nحاجات صغيرة يمكن متعرفش إني لسه فاكرها ❤️",
    buttonText: "🎀 الدخول للموقع",
  },

  // Section 8: Milestones
  milestones: [
    {
      id: "milestone-1",
      title: "بداية حكايتنا ❤️",
      date: "13/11/2025",
      badge: "أول خطوة",
      description: "اليوم اللي بدأ فيه كل شيء حلو في حياتنا",
    },
  ] as Milestone[],

  // Section 9: Favorite Messages
  messages: [
    {
      id: "msg-1",
      sender: "Ziad",
      text: "وأنا كمان مرايف🙃🙃🙃🙃",
    },
    {
      id: "msg-2",
      sender: "Ziad",
      text: "وخليكي جمبي عشان لو وقف معاكي حاجه اعملها",
    },
    {
      id: "msg-3",
      sender: "Ziad",
      text: "هساعدك متقلقيش",
    },
    {
      id: "msg-4",
      sender: "Ziad",
      text: "أنا نازل عشانك",
    },
  ] as FavoriteMessage[],

  // Section 10: Hidden Gift
  hiddenGift: {
    heading: "🎁 لسه في حاجة مخبيّهالك... ❤️",
    promptText: "اضغطي هنا",
    revealedTitle: "أول يوم وقفنا اتكلمنا في الكلية ❤️",
    revealedSubtitle: "اليوم ده عمري ما هنساه، كان بداية كل حاجة حلوة بيننا",
    continueButtonText: "شوفي ذكرياتنا سوا 📸",
  },

  // Section 11: Memories Timeline
  memories: [
    {
      id: "memory-1",
      title: "أول يوم اتكلمنا في الكلية",
      caption: "أول نظرة وأول كلام بدأ يغير شكل أيامي",
      date: "الكلية",
      image: "/images/memories/memory-1.jpg",
      aspectRatio: "portrait",
    },
    {
      id: "memory-2",
      title: "أول آيس كوفي يجيبهولي",
      caption: "أطعم آيس كوفي شربته في حياتي عشان كان منك",
      date: "يوم خاص",
      image: "/images/memories/memory-2.jpg",
      aspectRatio: "square",
    },
    {
      id: "memory-3",
      title: "اليوم اللي قالي فيه بحبك — 13/11",
      caption: "الكلمة اللي خلت قلبي يدق بطريقة مختلفة تماماً",
      date: "13/11/2025",
      image: "/images/memories/memory-3.jpg",
      aspectRatio: "portrait",
      favorite: true,
    },
    {
      id: "memory-4",
      title: "يوم ما كتبلي بحبك وإحنا في محاضرة — 13/11",
      caption: "الورقة الصغيرة اللي لحد دلوقتي شايلاها في قلبي",
      date: "13/11/2025",
      image: "/images/memories/memory-4.jpg",
      aspectRatio: "square",
    },
    {
      id: "memory-5",
      title: "يوم ما أخدنا أصحابنا وروحنا البلد عنده، وأول ما دخلناها بص عليا وقالي نورتيها",
      caption: "كلمتك دي لسه بترن في ودني وبترسم ابتسامة على وشي",
      date: "زيارة البلد",
      image: "/images/memories/memory-5.jpg",
      aspectRatio: "portrait",
    },
    {
      id: "memory-6",
      title: "الصورة اللي إنت بتحبها",
      caption: "دايماً بتقولي دي أحلى صورة ليكي وبحب أشوفها في عينك",
      date: "صورتنا المفضلة",
      image: "/images/memories/memory-6.jpg",
      aspectRatio: "portrait",
      favorite: true,
    },
    {
      id: "memory-7",
      title: "أول ساحلة معايا للدكاترة، كنت اللي بتوديني",
      caption: "لما حسيت إن في حد واقف في ضهري ومش سايبني لوحدي أبداً",
      date: "مشاويرنا سوا",
      image: "/images/memories/memory-7.jpg",
      aspectRatio: "square",
    },
    {
      id: "memory-8",
      title: "قولتلك يومها مبحبش السوبيا، قولتلي جربيها على ضمانتي، ومن يومها مبشربش غيرها ❤️",
      caption: "أي حاجة على ضمانتك بتطلع أحلى حاجة في الدنيا",
      date: "سوبيا على ضمانتك",
      image: "/images/memories/memory-8.jpg",
      aspectRatio: "landscape",
    },
  ] as MemoryItem[],

  // Section 12: Music
  music: {
    title: "DO RE MI - MOHAMMED SAEED | دو ري مي - محمد سعيد",
    arabicName: "أغنيتنا ❤️",
    artist: "محمد سعيد",
    soundCloudUrl: "https://on.soundcloud.com/WrW3ZJBwY6mfeCYC2t",
    // Track embed URL if using standard SoundCloud widget
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1149953842&color=%23d88c88&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
  },
};
