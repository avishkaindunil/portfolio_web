# Avishka Indunil — Personal Portfolio

Ultra-luxury, dark editorial portfolio built with **Next.js 15**, **TypeScript**, and **Google Fonts** (Cormorant Garamond + Syne).

## ✦ Design Aesthetic

- **Palette** — Deep obsidian background (`#0b0a08`) with warm ivory text (`#ede5d3`) and restrained gold accents (`#c4a45a`)
- **Typography** — Cormorant Garamond (300/400/italic) for display headings, Syne for UI and body text
- **Motion** — IntersectionObserver-powered scroll reveals with cubic-bezier easing
- **Details** — Thin gold dividers, decorative ghost text, hover micro-interactions throughout

## ✦ Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✦ Project Structure

```
app/
  layout.tsx    — Root layout: font loading + metadata
  globals.css   — Design tokens, CSS variables, component styles
  page.tsx      — All portfolio sections (single file, easy to edit)
```

## ✦ Customization

All data is at the top of `app/page.tsx` in three arrays:

| Constant      | What it controls              |
|---------------|-------------------------------|
| `EXPERIENCE`  | Work history cards            |
| `PROJECTS`    | Project cards                 |
| `SKILLS`      | Skill group tags              |

Update your **LinkedIn** and **GitHub** URLs in the `Contact` section near the bottom of `page.tsx`.

## ✦ Build for Production

```bash
npm run build
npm run start
```

Or deploy to [Vercel](https://vercel.com) — just connect your GitHub repo.

## ✦ Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [next/font/google](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Cormorant Garamond + Syne
- Zero external UI libraries — all custom CSS
