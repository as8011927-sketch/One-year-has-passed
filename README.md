# Ziad ❤️ Habiba — A Private Romantic Memories PWA

> المكان بتاعنا إحنا الاتنين بس ❤️
> A private, personalized romantic digital gift and Progressive Web App (PWA) made especially from Ziad for Habiba.

---

## 🌟 Visual Identity & Aesthetic

The website is crafted specifically to reproduce the warm, intimate atmosphere of the reference design:
- **Background**: Warm dusty blush pink (`#F2E1DD`)
- **Main Surfaces**: Warm ivory (`#FFF9F2`)
- **Envelope**: Caramel beige (`#D8AE87`)
- **Primary Accent**: Muted rose (`#D88C88`)
- **Buttons**: Dusty pink (`#F3CED0`)
- **Text**: Warm brown (`#795C53`)
- **Mobile-first layout**: Perfectly optimized for 390px iPhone Safari viewport with comfortable margins, rounded cards, and floating hearts.

---

## 📱 Complete User Journey

1. **Screen One — The Envelope**:
   - Floating envelope in caramel beige with "A letter for Habiba"
   - Rose seal button with a beating heart
   - "♥ دوسي على الظرف ♥"
   - 3D origami flap opening animation and glowing ivory paper slide-up
2. **Screen Two — The Personal Letter**:
   - Ivory card with pencil icon and heart emoji
   - Message:
     > مش عارف رد فعلك هيبقى إيه...  
     > بس عملتلك حاجة مخصوص عشانك ❤️
   - Button: `🎀 الدخول للموقع`
3. **Screen Three — Secret Word**:
   - Header: `ENTER THE SECRET WORD`
   - Secret word: `love` (case-insensitive: accepts `love`, `Love`, `LOVE`)
   - Server-side verification via `/api/verify-secret` with secure signed HTTP-Only session cookies
   - Friendly Arabic error on incorrect attempt
   - Button: `💕 افتحي الهدية 💕`
4. **Screen Four — The Second Letter**:
   - Ivory card with 🥹 emoji
   - Emotional message:
     > كل حاجة جوا هنا مننا إحنا...  
     > حاجات صغيرة يمكن متعرفش إني لسه فاكرها ❤️
   - Button: `🎀 الدخول للموقع`
5. **Main Experience**:
   - **Our place Header**: `Our place` in script calligraphy, `💕 Ziad ❤️ Habiba`, `المكان بتاعنا إحنا الاتنين بس ❤️`
   - **Live Anniversary Counter**: Calculates elapsed days, hours, minutes, seconds dynamically from `06/11/2025` updating every second
   - **Milestones**: `📆 محطات قصتنا` — Card `بداية حكايتنا ❤️` (13/11/2025)
   - **Favorite Messages**: `❤️ Fav messages ❤️` — Individual speech bubbles with the 4 exact messages
   - **Hidden Gift Box**: Illustrated dusty rose box with cream ribbon; pops open with confetti to reveal `أول يوم وقفنا اتكلمنا في الكلية ❤️`
   - **Memories Timeline**: `Our Memories ❤️` — 8 memories in exact order with Polaroid cards, full-width cards, captions, dates, and interactive Lightbox modal
   - **Music Player**: Floating pill audio player for Mohammed Saeed's "DO RE MI" with visualizer wave and fallback
   - **PWA Installation**: Install prompt with iPhone Safari "Add to Home Screen" instructions

---

## 🚀 Running Locally

### 1. Requirements
- Node.js 18+ (tested with Node 24)
- npm or pnpm

### 2. Setup
```bash
# Clone or navigate to the folder
cd d:/Mostafa/HZloving

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 How to Replace Photos & Text

All content is cleanly organized in a single configuration file:  
👉 **`src/config/content.ts`**

### 1. Replacing Photos:
1. Place your photos in `public/images/memories/`:
   - `memory-1.jpg` (أول يوم اتكلمنا في الكلية)
   - `memory-2.jpg` (أول آيس كوفي يجيبهولي)
   - `memory-3.jpg` (اليوم اللي قالي فيه بحبك — 13/11)
   - `memory-4.jpg` (يوم ما كتبلي بحبك وإحنا في محاضرة — 13/11)
   - `memory-5.jpg` (يوم ما أخدنا أصحابنا وروحنا البلد عنده...)
   - `memory-6.jpg` (الصورة اللي إنت بتحبها)
   - `memory-7.jpg` (أول ساحلة معايا للدكاترة...)
   - `memory-8.jpg` (قولتلك يومها مبحبش السوبيا...)
2. Or update the paths in `src/config/content.ts` under the `memories` array.

### 2. Changing Dates or Messages:
Edit `src/config/content.ts`:
- Change `startDate` for the anniversary counter
- Update `messages` array for favorite messages
- Add additional milestones in the `milestones` array

---

## 🔐 How to Configure the Secret Word & Security

1. In `.env.local` (or Vercel environment variables):
   ```env
   SECRET_WORD="love"
   SESSION_SECRET="your-super-secret-random-key-for-cookie-signing"
   ```
2. When the user enters the word, `/api/verify-secret` compares the normalized string server-side and issues a cryptographically signed HTTP-Only cookie (`hz_love_session`) that prevents tampering.

---

## 🗄️ Supabase Configuration (Optional Cloud Sync & RLS)

To sync memories and store private photos in Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run the provided script in:
   👉 **`supabase/schema.sql`**
3. This creates:
   - `public.memories`
   - `public.milestones`
   - `public.favorite_messages`
   - Storage bucket `private-memories` with Row Level Security (RLS)
4. Add credentials to your `.env.local` or Vercel:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

---

## 🌐 Deploying to Vercel

1. Push the project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial romantic PWA for Ziad & Habiba"
   git branch -M main
   git remote add origin https://github.com/your-username/ziad-habiba-memories.git
   git push -u origin main
   ```
2. In [Vercel](https://vercel.com):
   - Click **Add New** > **Project**
   - Import your repository
   - Add environment variables (`SECRET_WORD`, `SESSION_SECRET`)
   - Click **Deploy**

---

## 📲 How to Install as a PWA on iPhone (Safari)

1. Open the website link in **Safari** on iPhone.
2. Tap the **Share icon** (square with arrow pointing up) at the bottom center.
3. Scroll down and tap **"Add to Home Screen"** (`إضافة إلى الشاشة الرئيسية`).
4. Tap **"Add"** in the top right corner.
5. The app will appear on Habiba's home screen with the custom icon and open full-screen like a native iOS application without browser address bars!
