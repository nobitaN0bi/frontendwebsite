# Acoord Website PRD

## Original Problem Statement

Build the acoord.co landing experience for “solving artificial coordination” and “magic that you can trust.” Showcase the Ahi Agentic Operating System as an IDE for Agents: conversational intent beside a spatial node canvas, color-coded agent/tool/logic/MCP nodes, dark secure sandboxes, CRDT multiplayer presence, strict AST compilation, human checkpoints, enterprise RAG, and trusted execution. Use the supplied black-and-white ASCII artwork as animated backgrounds. Populate the site with use cases and ICP stories. The user selected both landing-page previews and dedicated pages for every ICP, plus an interactive product demo and a stored waitlist/contact form.

The 2026-08-02 rework expanded the brief: integrate the real exported Ahi desktop HTML walkthrough from `frontend/demo`; rebuild the homepage as a twelve-part, SEO-focused brand story using the uploaded business, UI design, technical writing, SEO, and ICP profiles; preserve the supplied design documents; apply the strict Minimalist Monochrome system; separate Watch Demo, Book a Call, and Join Waitlist conversion moments; and complete P2 newsletter capture plus a visible motion-intensity control.

## Architecture Decisions

- React 19 single-page marketing application with route-level pages for the homepage, interactive demo, and 10 ICP stories.
- A custom CSS motion system recreates the supplied ASCII references with layered source images, scan lines, clipping, jitter, moving cursors, animated topology edges, and node execution states.
- Reusable data-driven ICP model powers both homepage cards and dedicated story pages.
- FastAPI service exposes health and waitlist endpoints; MongoDB persists requests with a unique email index and race-safe idempotency.
- FastAPI also exposes an idempotent newsletter endpoint backed by a separately indexed MongoDB collection.
- The browser reads the API origin from `REACT_APP_BACKEND_URL`; the backend reads Mongo settings and allowed origin from environment variables.
- The exported desktop application remains an unchanged static product artifact under `frontend/public/demo`; React provides the accessible scene navigation, guided-tour controls, fullscreen links, and marketing context around sandboxed iframes.
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

## Prioritized Backlog

### P0

- No open launch-blocking product issues.

### P1

- Add consent/retention language and an internal request-management view before handling real enterprise lead volume.
- Have qualified counsel review the published legal drafts before accepting production customers or regulated data.
- Replace modeled ICP outcomes with approved, verifiable customer evidence before presenting metrics as real-world proof.

### P2

- Add real workspace authentication and connect the demo to live orchestration telemetry.
- Add CMS-managed ICP stories and editorial case-study publishing.
- Add product analytics for CTA conversion, story engagement, and demo scenario completion.
- Add shareable demo runs and generated coordination maps for organic distribution.
- Add editorial newsletter operations such as unsubscribe handling, suppression lists, and campaign delivery before sending production email.
- Replace the **MOCKED** enterprise scenario runtime with authenticated, tenant-scoped APIs when production Ahi workspace services are available.

## Next Tasks

1. Add per-chapter narration/soundless "video" polish: optional cinematic camera moves between chapters and a shareable branded decision map at the end of each industry film.
2. Review claims, modeled metrics, fictionalized company names, newsletter language, and legal text with legal/brand stakeholders.
2. Connect the product demo to authenticated Ahi workspace APIs and live orchestration telemetry when available.
3. Add an internal lead/newsletter management workflow with retention, export, deletion, and unsubscribe controls.
4. Publish verified production subprocessors and assurance reports before processing customer workspace data.
5. Validate the eight modeled enterprise narratives with domain experts before using any outcome language in external sales material.