## Scope

A premium visual upgrade across five surfaces, plus motion polish. No backend changes — this is pure UI/presentation work on the existing app.

## 1. Three-Step Onboarding Flow

New screen shown once before the language splash. Stored in `localStorage` under `visamotion.onboarded.v1`.

- New file: `src/components/Onboarding.tsx`
- Top progress bar (1/3 → 3/3) with smooth fill animation
- Each step: large SVG illustration (passport + plane, checklist + globe, embassy badge + handshake) using inline SVG with the existing teal/indigo palette, headline, sub-copy, Skip + Next buttons
- Bilingual copy added to `src/lib/i18n.tsx` (`onb1Title/Sub`, `onb2…`, `onb3…`, `skip`, `next`, `getStarted`)
- Slide/fade transitions between steps
- Wired into `src/pages/Index.tsx` ahead of `SplashScreen`

## 2. Infographic Cards on CountryDetail

In `src/components/CountryDetail.tsx` add a dynamic infographic strip above the tabs:

- New `src/components/ApprovalRing.tsx` — animated SVG circular progress ring showing the country's approval rate (stroke-dasharray animated from 0 to value on mount via CSS transition)
- New `src/components/AnimatedTimeline.tsx` — SVG-based horizontal timeline (Application → Biometrics → Review → Decision) with staggered dot-pulse and connecting line draw animation
- Stat tiles: processing time, fee range, validity — each on a soft gradient card with depth shadow

## 3. Dashboard Premium Upgrade

In `src/components/Hero.tsx` (mobile app shell):

- Enlarge hero greeting card; add layered gradient (teal → indigo) with a subtle inner highlight and large rounded corners (`rounded-[2rem]`)
- Service tiles (Work/Visit/Business/TRC) standardized: 1:1 aspect, gradient background unique per tile, white icon in a frosted square, tile name, and a `shadow-[0_20px_40px_-20px_rgba(…)]` depth layer
- Subtle entrance: `animate-fade-in` stagger via inline delay

## 4. Auth-Style Visual Treatment (no real auth)

The app has no authentication — there is no Auth component to redesign. To honor the request, restyle the existing `SplashScreen.tsx` language picker in the VisaWise card-based style:

- Centered Visa Motion logo on a glass card
- Layered card stack (back card offset behind front card) for depth
- Inputs/buttons fade-and-slide in with staggered delays
- Keeps existing bilingual button behavior; no new auth flow is added

If the user actually wants login/signup, that requires enabling Lovable Cloud — flagged at end of message, not built in this pass.

## 5. Animated Country-Card Footer Section

In `src/components/Footer.tsx`:

- Above existing footer columns, add a horizontally scrolling strip of compact country chips (flag, name, approval %), one card per country from `src/data/countries.ts`
- CSS marquee animation (`@keyframes scroll-x`) added to `src/index.css`, paused on hover
- Each card links to `/country/{slug}/work`
- Cards use the same gradient/shadow language as dashboard tiles

## 6. Global Motion Polish

- Add `transition-all duration-300` defaults to interactive cards
- Page transitions: wrap routed pages with a fade-in container
- Tab switches inside `CountryDetail` get `animate-fade-in`

## Technical Notes

- All animation via Tailwind keyframes already in `tailwind.config.ts` (`fade-in`, `scale-in`, `accordion-*`) plus two new keyframes in `index.css`: `scroll-x` (marquee) and `draw-line` (timeline stroke)
- SVG infographics are hand-written (no chart library) for bundle weight
- Onboarding gate logic in `Index.tsx`: `if (!localStorage['visamotion.onboarded.v1']) → <Onboarding />` else existing splash/home flow

## Files Touched

Created: `Onboarding.tsx`, `ApprovalRing.tsx`, `AnimatedTimeline.tsx`
Edited: `Hero.tsx`, `SplashScreen.tsx`, `Footer.tsx`, `CountryDetail.tsx`, `i18n.tsx`, `index.css`, `pages/Index.tsx`
