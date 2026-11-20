# Neelgiri Chemicals — Home Page

Next.js 14 (App Router, JavaScript/JSX) + Tailwind CSS 3 + Framer Motion. Light blue & white theme.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Adding your images

1. Drop files in `public/images/`.
2. Open `lib/images.js` and set each path, e.g. `hero: "/images/hero.png"`.

Any entry left as `null` shows a labelled light-blue placeholder box
so you know exactly what goes where.

## Theme

Colors live in `tailwind.config.js` under `colors.brand` (50 → 900).
Change that single palette to re-theme the whole site.

## Structure

```
app/            layout, globals.css, page.js
components/     Navbar, Hero, Categories, About, WhyChoose,
                FeaturedProducts, TestimonialsFaq, CTA, Footer
components/ui/  Reveal (scroll animation), ImagePlaceholder, Logo
lib/images.js   all image slots
```
