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

## Next Tasks

1. Review claims, modeled metrics, fictionalized company names, newsletter language, and legal text with legal/brand stakeholders.
2. Connect the product demo to authenticated Ahi workspace APIs and live orchestration telemetry when available.
3. Add an internal lead/newsletter management workflow with retention, export, deletion, and unsubscribe controls.
4. Publish verified production subprocessors and assurance reports before processing customer workspace data.