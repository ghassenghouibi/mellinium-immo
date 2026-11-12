<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the agency experience client-only because scroll-driven photographic motion and intersection transitions require browser APIs.
- Structure the home page around the “About Mellinium Immobilière” brochure (about & commitment, services, areas covered, diplomatic & international clients, why us, team, social media, contact) as alternating photographic sections, with rental and sale listings woven in, rather than a numbered property tour.
- Keep every visitor-facing text bilingual (French and English) through `src/lib/i18n.tsx`; default to the browser language when it is French or English, otherwise English, and remember the visitor’s choice.
- Keep property inventory in one typed client-side catalog shared by home, search results, and property-detail routes so demonstration data remains consistent.
- Present all property locations and monetary values for the Tunisian market, with prices in TND, because the agency operates in Tunisia.
- Keep the hero search as a compact direct form and the “Construisez votre recherche” section as a separate four-step animated journey, so each entry point retains its intended pace.
- Keep property galleries driven by each catalog entry and synchronized between the cover, the thumbnails, and the full-screen viewer (`PhotoLightbox`); do not repeat the same photos in a second gallery lower on the page.
- Build every form control (selects, text fields, toggles, language switch) from `src/components/estate/fields.tsx` so the site keeps a single design system; never reintroduce native `<select>` styling.
- Present social networks as the fixed left-edge rail (wide screens) plus the floating WhatsApp button, not as a page section.
- Open the home page with the full-bleed cinematic film (`public/videos/hero-film.*`, chapters listed in `HeroFilm.tsx`) of the areas the agency covers; it is rendered with Remotion from full-resolution, downscaled-only photos (5 s per shot, 1 s cross-dissolve, ending on the opening frame for a seamless loop), so keep the place caption in sync when re-editing it.
- Use the agency’s real social accounts only (Facebook `Malihacity`, Instagram `mellinium_immobliere`, WhatsApp 22 098 006, LinkedIn `hela-dhaïbi-204020418`); do not add placeholder networks.
- Address every visitor (all embassies, international organisations, companies, private clients); the source brochure was written for one embassy, so never name a specific embassy or client on the site unless they have agreed to be referenced.
