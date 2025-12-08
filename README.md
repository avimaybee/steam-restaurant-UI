# Steam Restaurant — Modern Asian Fusion

A premium restaurant web application for Steam Restaurant, a funky modern Asian eatery located in Rye, Victoria on the Mornington Peninsula. Built with Next.js, shadcn/ui, and Framer Motion.

## ✨ Features

- **Online Ordering**: Full cart system with add/remove/update functionality
- **Checkout Flow**: Complete checkout with shipping options and promo codes
- **Table Reservations**: Multi-step reservation booking form
- **Gift Cards**: Gift card builder with live preview
- **Menu**: Interactive menu with category filtering and add-to-cart
- **Modern Stack**: Next.js with App Router, TypeScript, Tailwind CSS
- **Premium UI**: shadcn/ui components with custom luxury dark theme
- **Smooth Animations**: Framer Motion for professional page transitions

## 🍽️ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, philosophy, features, CTA |
| `/menu` | Interactive menu with category filtering |
| `/reservations` | Multi-step reservation form |
| `/about` | Story, team, and awards |
| `/gallery` | Masonry grid with lightbox |
| `/cart` | Shopping cart with order summary |
| `/checkout` | Complete checkout flow |
| `/contact` | Contact form with embedded map |
| `/gift-cards` | Gift card builder with live preview |
| `/login` | Authentication with social login |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment (Cloudflare Pages)

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Framework preset**: Next.js
3. Add environment variables (see below)

## 🔐 Environment Variables

Configure these in Cloudflare Pages dashboard or `.env.local` for local development:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🏪 Restaurant Info

- **Location**: 4/2257 Point Nepean Rd, Rye VIC 3941, Australia
- **Phone**: (03) 5985 7700
- **Email**: Steaminrye@gmail.com
- **Website**: https://steamrestaurant.com.au

### Opening Hours
- Monday: Closed
- Tuesday - Friday: 2:30pm - 10:00pm
- Saturday: 12:00pm - 10:00pm
- Sunday: 12:00pm - 8:00pm

## 🎨 Design System

- **Colors**: Gold (#D4AF37), Black (#050505), Blue Accent (#7AB6FF)
- **Typography**: Playfair Display (headings), Manrope (body)
- **Effects**: Grain overlay, shimmer buttons, steam particles

## 📦 Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Backend (Firestore)
- [Lucide React](https://lucide.dev/) - Icons

## 📄 License

MIT
