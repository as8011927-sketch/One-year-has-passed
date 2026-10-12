import { MEMORIES_DATA, MemoryItem } from '@/data/memories';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description?: string;
  badge?: string;
}

export interface FavoriteMessage {
  id: string;
  sender: "Ziad" | "Habiba";
  text: string;
  avatarColor?: string;
}

export type { MemoryItem };

export const COUPLE_CONFIG = {
  he: "Ziad",
  she: "Habiba",
  namesArabic: "زياد و حبيبة",
  headerScript: "Our place",
  coupleTitle: "💕 Ziad ❤️ Habiba",
  subTitle: "المكان بتاعنا إحنا الاتنين بس ❤️",
  
  // Relationship start date: 6 November 2025 — 06/11/2025
  startDate: "2025-11-06T00:00:00",
  counterHeading: "💕 بدايتنا 💕",
  counterFooter: "كل يوم بيعدي وهفضل أحبك أكتر ❤️",

  // Screen 1: Envelope - Habiba addressing Ziad
  envelope: {
    letterFor: "A letter for",
    recipient: "Ziad",
    hint: "♥ دوس على الظرف ♥",
  },

  // Screen 2: First Letter - Habiba speaking
  firstLetter: {
    emoji: "❤️",
    message: "مش عارفة رد فعلك هيبقى إيه...\nبس عملتلك حاجة مخصوص عشانك ❤️",
    buttonText: "🎀 الدخول للموقع",
  },

  // Screen 3: Secret Word Gate - Habiba addressing Ziad
  secretGate: {
    heading: "ENTER THE SECRET WORD",
    placeholder: "اكتب كلمة السر...",
    buttonText: "💕 افتح الهدية 💕",
    secretWord: "love",
    errorMessage: "مش هي دي كلمة السر يا زياد.. جرب كلمة تعبر عن حبنا 💕",
  },

  // Screen 4: Second Letter - Habiba speaking
  secondLetter: {
    emoji: "🥹",
    message: "كل حاجة جوا هنا مننا إحنا...\nحاجات صغيرة يمكن متعرفش إني لسه فاكراها ❤️",
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

  // Section 9: Favorite Messages (Ziad's beloved messages to Habiba)
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
    promptText: "اضغط هنا",
    revealedTitle: "أول يوم وقفنا اتكلمنا في الكلية ❤️",
    revealedSubtitle: "اليوم ده عمري ما هنساه، كان بداية كل حاجة حلوة بيننا",
    continueButtonText: "شوف ذكرياتنا سوا 📸",
  },

  // Section 11: Memories Timeline
  memories: MEMORIES_DATA,

  // Section 12: Music
  music: {
    title: "DO RE MI - MOHAMMED SAEED | دو ري مي - محمد سعيد",
    arabicName: "أغنيتنا ❤️",
    artist: "محمد سعيد",
    audioSrc: "/audio/do-re-mi.mp3",
    soundCloudUrl: "https://on.soundcloud.com/WrW3ZJBwY6mfeCYC2t",
    soundCloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/msproductionz/do-re-mi-mohammed-saeed&color=%23d88c88&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
  },
};
