# Acoord Website PRD

## Original Problem Statement

Build the acoord.co landing experience for “solving artificial coordination” and “magic that you can trust.” Showcase the Ahi Agentic Operating System as an IDE for Agents: conversational intent beside a spatial node canvas, color-coded agent/tool/logic/MCP nodes, dark secure sandboxes, CRDT multiplayer presence, strict AST compilation, human checkpoints, enterprise RAG, and trusted execution. Use the supplied black-and-white ASCII artwork as animated backgrounds. Populate the site with use cases and ICP stories. The user selected both landing-page previews and dedicated pages for every ICP, plus an interactive product demo and a stored waitlist/contact form.

The 2026-08-02 rework expanded the brief: integrate the real exported Ahi desktop HTML walkthrough from `frontend/demo`; rebuild the homepage as a twelve-part, SEO-focused brand story using the uploaded business, UI design, technical writing, SEO, and ICP profiles; preserve the supplied design documents; apply the strict Minimalist Monochrome system; separate Watch Demo, Book a Call, and Join Waitlist conversion moments; and complete P2 newsletter capture plus a visible motion-intensity control.

The 2026-08-09 investor expansion added a dedicated `/investor` narrative: explain the counter-intuitive thesis that abundant intelligence makes coordination scarcer, connect market timing to the Agent Human Interface category, show the product through nine synchronized laptop feature dialogs, reuse the existing modeled agent profiles, articulate commercial and defensibility theses without inventing metrics, separate working product from modeled evidence, and end with investor meeting and desktop-waitlist conversion paths.

## Architecture Decisions

- React 19 single-page marketing application with route-level pages for the homepage, interactive demo, and 10 ICP stories.
- A dedicated `/investor` route composes modular narrative sections for thesis, timing, product, agent teams, commercial model, moat, proof boundaries, roadmap, and conversion.
- A custom CSS motion system recreates the supplied ASCII references with layered source images, scan lines, clipping, jitter, moving cursors, animated topology edges, and node execution states.
- Reusable data-driven ICP model powers both homepage cards and dedicated story pages.
- FastAPI service exposes health and waitlist endpoints; MongoDB persists requests with a unique email index and race-safe idempotency.
- FastAPI also exposes an idempotent newsletter endpoint backed by a separately indexed MongoDB collection.
- The browser reads the API origin from `REACT_APP_BACKEND_URL`; the backend reads Mongo settings and allowed origin from environment variables.
- The exported desktop application remains an unchanged static product artifact under `frontend/public/demo`; React provides the accessible scene navigation, guided-tour controls, fullscreen links, and marketing context around sandboxed iframes.
- `DemoWorkspace` emits active-scene changes to host pages, allowing the investor laptop to synchronize explanatory dialogs and human-boundary callouts with all nine existing product surfaces without duplicating the demo runtime.
- Enterprise demo content is centralized in `frontend/public/demo/scenarios.json`; the React host sends the selected scenario and motion setting into a strict opaque-origin iframe through `postMessage`, avoiding same-origin sandbox privileges while preserving the exported app's working controls.

## Implemented

- Animated ASCII hero with positioning, trust language, and two primary conversion paths.
- Full architecture narrative: intent, compilation, orchestration, trust, sandboxes, MCP, CRDT, hybrid RAG, and human approval.
- Interactive split-pane Ahi workspace with compliance, incident response, and clinical scenarios; animated graph execution, terminal telemetry, and collaboration cursors.
- Ten landing-page ICP previews and ten dedicated story routes with problem, trigger, solution pillars, metrics, quote, and next-story navigation.
- Responsive desktop/mobile navigation and layouts with reduced-motion support.
- Stored request-access modal with validation, success/error states, duplicate handling, and Mongo persistence.
- Backend regression suite for health, valid waitlist creation, idempotent duplicates, and validation.
- Verified frontend routes, interactions, responsive overflow, API persistence, and concurrent waitlist submissions.
- Added the supplied Calendly booking flow across navigation, conversion sections, stories, articles, and the waitlist success state.
- Added a modular legal and trust center covering privacy, terms, acceptable use, security, browser storage, enterprise DPA, service providers, and role-based contact aliases.
- Added consent-version persistence to request-access submissions.
- Added an SEO/GEO-ready technical publishing system with six field notes, search, topic filters, dynamic metadata, structured data, sitemap, robots.txt, and llms.txt.
- Added a cinematic ASCII motion language using all five supplied text artworks: exact compositions in hero/legal/resources/article/story surfaces and adaptive procedural fragments in dense sections.
- Added feature-specific visual explanations for intent classification, AST compilation, CRDT collaboration, guardrails, audit proof, ICP outcomes, and hybrid retrieval.
- Added shared-request caching for ASCII assets, intersection-driven activation, fine-pointer-only hover choreography, and full reduced-motion fallbacks.
- Rebuilt the homepage into twelve editorial sections: cinematic hero, coordination problem, four-stage operating model, seven platform capabilities, role-based agent ecosystem, real product walkthrough, ICP narratives, trust architecture, resources/FAQ, newsletter, book-a-call, and private-alpha waitlist.
- Integrated all nine real exported Ahi desktop surfaces: Dispatch, Ontology, Agent Builder, Docs + Thread, Knowledge, Collaboration, Sandbox, Browser, and Teamspaces.
- Added a video-like guided demo sequence with play/pause, scene progress, direct scene controls, fullscreen access, and a dedicated `/demo` walkthrough route.
- Added explicit modeled-scenario disclaimers so fictional ICP companies, quotations, and metrics are not presented as verified customer proof.
- Added SEO-focused SoftwareApplication and FAQ structured data plus updated title, description, Open Graph, and route metadata.
- Added a visible persistent Cinematic/Reduced motion control that honors the operating-system motion preference and suppresses decorative motion when reduced.
- Added stored newsletter capture with explicit consent, duplicate-safe API behavior, and frontend success/error states.
- Restyled the shared marketing, legal, resources, use-case, modal, header, and footer surfaces into the sharp monochrome editorial system while preserving the dark exported product UI.
- Added unique automation identifiers to primary conversion, navigation, footer, newsletter, motion, and demo controls, including generated identifiers inside exported demo pages.
- Corrected malformed SVG path data in the exported Teamspaces icon markup and verified clean iframe console behavior.
- Verified on 2026-08-02: JavaScript/Python lint, production frontend build, six backend API tests, full desktop/mobile product regression, and post-fix browser checks all pass.
- Added eight enterprise demo channels—Finance, Legal, Manufacturing, Customer Support, Logistics, E-commerce, SaaS, and Fashion—without renaming the nine product tabs.
- Populated every channel across Dispatch, Ontology, Agent Builder, Docs + Thread, Knowledge, Collaboration, Sandbox, Browser, and Teamspaces with continuous company, intent, agent, evidence, workflow, approval, and outcome context.
- Added a working page-specific simulation action to every exported product surface: route intent, ground ontology, compile workflows, draft decisions, retrieve knowledge, coordinate teams, execute sandbox analysis, collect browser evidence, and persist the operating plan.
- Added an enterprise-run autoplay that simulates the active step, advances through all nine surfaces, and can be paused; selected scenarios persist through React controls, fullscreen links, sidebar links, and inline exported-app navigation.
- Applied the uploaded Content Marketer framework: precise technical language, pain-to-decision storytelling, role-specific hooks, proof boundaries, and a contextual “Map this pattern to your team” booking CTA.
- Clearly labeled all enterprise data, companies, runs, and outcomes as **MOCKED** modeled simulations while preserving real interface navigation and interaction behavior.
- Tightened iframe isolation by removing `allow-same-origin`; scenario data and motion settings now arrive through parent messaging, and local storage access inside the strict sandbox is safely guarded.
- Verified on 2026-08-02: all 72 channel-by-tab combinations contain scenario-specific data, every simulation works, guided autoplay/pause works, scenario continuity persists, reduced motion works, mobile/tablet layouts do not overflow, regressions pass, and strict sandbox execution completes without the prior security warning.

- **2026-06 cinematic rebuild:** Rebuilt the homepage as a full-viewport scroll film with soft snap: Scene 01 "Solving artificial coordination" (Creation-of-Adam ASCII hands generated from the supplied artwork, scroll-linked zoom "getting closer"), Scene 02 "magic that you can trust" escalating into "infinite time / infinite intelligence / infinite quality" with growing type, Scene 03 an eye that opens on scroll to reveal "Ahi — Agent Human Interface", Scene 04 an in-your-face "Select your industry" picker for all eight channels.
- Added nine cinematic, data-driven chapters per industry (Dispatch, Ontology, Agent builder, Docs + thread, Knowledge, Collaboration, **Code** — the full coding agent panel, replacing the Sandbox framing — Browser, Teamspaces) built from `scenarios.json`, each with its own animated box diagram: routing fan-out with drawn wires, graph edges drawing, compile stack with COMPILED stamps, document lines filling with citations, hybrid retrieval score bars, live thread with typing bubbles, IDE panel with run policy and terminal, browser evidence capture, approval card plus audit ledger.
- Added a sticky film HUD with industry label, chapter counter, progress rail, "Play the film" auto-scroll (7s per chapter, pausable), and skip-to-product.
- Switched the exported demo workspace and its nine surfaces to the light (white) theme by default and made the industry selection bidirectional between the film and the demo channel tabs.
- Added a final contact scene rendering the founder's supplied portrait as animated ASCII (scanline sweep, character flicker, line-by-line reveal) with Book a call, email, and waitlist actions.
- Motion follows the animation guidelines in use: transform/opacity only, ease-out entrances with 60-110ms staggers, scroll-linked CSS variables written outside React renders, and full `prefers-reduced-motion` plus motion-control fallbacks.
- All previously shipped editorial/SEO sections were retained after the film and given full-screen framing.
- Verified on 2026-06 (iteration_6): 100% frontend pass — hero/ASCII rendering, staged infinite scene, eye reveal, all eight industry switches rebuilding all nine chapters, HUD autoplay/pause, demo light theme and channel sync, portrait scene, retained sections, waitlist end-to-end, mobile 390x844, no console errors.

- **2026-06 cinematic experience rework (this fork):**
- Removed the agent-ecosystem section ("The right specialist. One governing intent.") and the trust section ("Every action leaves a reconstructable line.") per user request.
- Rewrote the problem headline to "The interface for AI and human team collaboration."
- Rebuilt "Fluid above. Strict beneath." as a dark cinematic section with a living eye backdrop (ellipse + ASCII iris + pupil, slow gaze drift + blink) behind four pillars: **ASK** (understand via 1,000+ integrations into one ontology), **ACT** (connectors become proactive hands), **EXPERT** (hire ontology-grounded digital experts, e.g. a social GTM expert supervised by the adjacent marketing team), **EXPLAINABLE** (traceable, replayable executions); plus a scrolling 1,000+ connector marquee.
- Removed the Meridian Capital scenario-story block (company/hook/trigger/human-line/outcome) from DemoWorkspace on / and /demo; the workflow story now lives only in the film; demo copy now says "Every step explainable."
- Moved newsletter capture into the blog/knowledge section as a light "Architecture & updates" dispatch block; removed the standalone dark newsletter section.
- Switched all global CTAs to "Download the desktop app" (opens waitlist modal, tagged WAITLIST) and "Book a demo" (Calendly): hero, header, footer, join section, demo page, resources page. WaitlistModal reframed as the desktop-app download waitlist.
- Rebuilt the final scene as a pure cinematic close: full-bleed ASCII portrait backdrop with scroll-linked zoom, letterbox bars, scanline/flicker/jitter, "Magic that you can trust." headline, Download + Book a demo CTAs — no email link, no contact form.
- Added a cinematic wipe overlay between film chapters (one-continuous-shot feel) with full reduced-motion fallbacks.
- Fixed AsciiBackdrop: removed AbortController logic that poisoned the shared fetch cache under StrictMode (fallback "COORDINATE" art was rendering); switched ASCII assets to local /ascii/*.txt files.
- Verified on 2026-06 (iteration_7 + follow-up self-test): backend 6/6 pass (health, waitlist create/duplicate/validation, newsletter subscribe/consent); frontend pass — film flow, hero CTAs, waitlist + newsletter end-to-end, pillar section, removed sections absent, finale without contact, mobile 390x844, no console errors; scenario-story removal re-verified on / and /demo after test-run revert.

- **2026-06 Shareable Film (decision maps):**
- Backend: `POST /api/decision-maps` (validated industry → short url-safe id, persisted in `decision_maps` with unique index) and `GET /api/decision-maps/{id}` (view-count increment, 404 on missing, 422 on invalid industry).
- Added a cinematic "END CARD" share scene after the nine chapters ("Your team missed the screening.") with scenario-aware storytelling copy; "Create the decision map" cuts a cinema-ticket card (perforated, ADMIT: YOUR ENTIRE TEAM) with the branded link, Copy (clipboard + fallback), and Open actions; state resets on industry switch; film autoplay auto-scrolls to the end card when the reel finishes.
- Added branded `/map/:id` route that retells the run as a story: masthead (REEL id / date / VIEWING count), narrative intro, opening intent quote, nine story beats with acts + mono state lines, human-line vs outcome split panel, modeled-simulation disclaimer, and a CTA band (Watch the film / Download the desktop app waitlist / Book a demo). Loading state prevents wrong-industry flash; missing ids show "This reel was never cut."
- Verified on 2026-06 (iteration_8): 14/14 backend tests (all 8 industries, view increments, 404/422, waitlist regression) and 100% frontend pass — ticket creation, copy, industry-switch reset, map storytelling page, view increments, missing state, waitlist modal from map, mobile 390x844, no console errors.

- **2026-06 Social previews + real-product MacBook showcase:**
- Added a dynamic 1200×630 branded poster for every decision map at `GET /api/decision-maps/{id}/poster.png`; each industry receives its own deterministic decision-network composition, explicit Acoord branding, safe-crop typography, reel metadata, and immutable caching.
- Added `GET /api/decision-maps/{id}/share`, a crawler-readable HTML bridge with OpenGraph/Twitter metadata, canonical map URL, HTTPS-safe proxy-aware public URLs, and an immediate browser handoff to `/map/:id`.
- Decision-map creation now returns `share_path` and `poster_path`; the end-card ticket previews the poster and copies/opens the unfurl-enabled share link rather than the raw SPA route.
- Refactored only the homepage real-use-case demo into an Apple-inspired product showcase while preserving the global monochrome system: a scroll-opened MacBook frame contains the existing live Ahi workspace, with five external explanation callouts and an animated Intent → Ontology → Execution → Approval → Record rail.
- Preserved all eight industry selectors, nine surface tabs, guided enterprise run, fullscreen links, iframe simulation controls, homepage scenario synchronization, mobile usability, and explicit **MOCKED** simulation labeling.
- Added Framer Motion for scroll-linked product motion plus full operating-system and in-app reduced-motion static layouts.
- Verified on 2026-06 (iteration_9 + post-fix self-test): frontend desktop/mobile/reduced-motion product checks pass with no horizontal overflow; live demo interactions remain functional; backend decision-map suite passes 19/19; HTTPS share redirect and absolute social metadata pass; final poster visual QA passes for thumbnail legibility, explicit branding, 10% crop safety, composition, and overlaps.

- **2026-08-09 Investor narrative:** Added `/investor` with a complete eight-part investor story: counter-intuitive coordination thesis, why-now signals, category positioning, interactive product architecture, scenario-aware agent profiles, commercial land/expand/compound thesis, five-layer moat, explicit working-product vs modeled-evidence boundary, roadmap, and investor conversion close.
- Added a large MacBook product stage containing the live nine-surface Ahi demo. Dispatch, Ontology, Agent Builder, Docs + Thread, Knowledge, Collaboration, Code, Browser, and Teamspaces each synchronize to a distinct animated explanation dialog plus a human-line checkpoint overlay; the guided enterprise run keeps those overlays synchronized automatically.
- Reused all existing enterprise channels and agent teams from `scenarios.json`; changing the modeled industry inside the laptop updates the investor agent-profile section without introducing unverified profiles or customer claims.
- Added strict investor-page disclosure language: demo companies, runs, outcomes, and metrics remain labeled **MOCKED** modeled simulations; commercial positioning is labeled as a thesis rather than reported revenue or forecast; no TAM, ARR, traction, or fundraising numbers were invented.
- Added investor navigation in the global header and footer, route SEO metadata, unique automation identifiers for critical content and interactions, responsive mobile layouts, touch-safe hover behavior, and both operating-system and in-app reduced-motion handling.
- Verified on 2026-08-09: JavaScript lint and production build pass; external-preview smoke test confirms no desktop overflow and synchronized Ontology dialogs; testing-agent iteration 10 reports 100% frontend pass across all sections, all nine scenes, guided-run synchronization, channel/agent updates, booking and waitlist CTAs, desktop 1920×800, mobile 390×844, reduced motion, data-testid coverage, and clean browser console.

## Prioritized Backlog

### P0

- No open launch-blocking product issues.

### P1

- Add privacy-conscious conversion analytics for investor-page chapter depth, demo surfaces viewed, channel selected, and investor-meeting CTA conversion.
- Replace investor-page modeled evidence with approved traction, customer outcomes, market sizing, and commercial metrics only after those materials are verified for publication.
- Add consent/retention language and an internal request-management view before handling real enterprise lead volume.
- Have qualified counsel review the published legal drafts before accepting production customers or regulated data.
- Replace modeled ICP outcomes with approved, verifiable customer evidence before presenting metrics as real-world proof.

### P2

- Add real workspace authentication and connect the demo to live orchestration telemetry.
- Add CMS-managed ICP stories and editorial case-study publishing.
- Add product analytics for CTA conversion, story engagement, and demo scenario completion.
- Add a decision-map guestbook so recipients can signal “worth a screening” to the sender.
- Add editorial newsletter operations such as unsubscribe handling, suppression lists, and campaign delivery before sending production email.
- Replace the **MOCKED** enterprise scenario runtime with authenticated, tenant-scoped APIs when production Ahi workspace services are available.

## Next Tasks

0. Extend the verified investor-page animation language into the remaining global homepage motion audit: `ease-out` for entrances/exits, `ease-in-out` for on-screen movement, transform/opacity-only motion, and complete reduced-motion/touch guards.
1. Conversion analytics: track which investor chapter, industry, and product surface visitors view before booking a demo or joining the download waitlist.
2. Connect the product demo to authenticated Ahi workspace APIs and live orchestration telemetry when available.
3. Narrated Mode: optional voiced walkthrough of the nine chapters while diagrams animate.
4. Decision-map guestbook: let recipients signal “worth a screening” and show the sender who watched.
5. Review claims, modeled metrics, fictionalized company names, newsletter language, and legal text with legal/brand stakeholders.
6. Add an internal lead/newsletter management workflow with retention, export, deletion, and unsubscribe controls.
7. Publish verified production subprocessors and assurance reports before processing customer workspace data.