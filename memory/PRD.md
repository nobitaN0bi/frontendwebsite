# Acoord Website PRD

## Original Problem Statement

Build the acoord.co landing experience for “solving artificial coordination” and “magic that you can trust.” Showcase the Ahi Agentic Operating System as an IDE for Agents: conversational intent beside a spatial node canvas, color-coded agent/tool/logic/MCP nodes, dark secure sandboxes, CRDT multiplayer presence, strict AST compilation, human checkpoints, enterprise RAG, and trusted execution. Use the supplied black-and-white ASCII artwork as animated backgrounds. Populate the site with use cases and ICP stories. The user selected both landing-page previews and dedicated pages for every ICP, plus an interactive product demo and a stored waitlist/contact form.

## Architecture Decisions

- React 19 single-page marketing application with route-level pages for the homepage, interactive demo, and 10 ICP stories.
- A custom CSS motion system recreates the supplied ASCII references with layered source images, scan lines, clipping, jitter, moving cursors, animated topology edges, and node execution states.
- Reusable data-driven ICP model powers both homepage cards and dedicated story pages.
- FastAPI service exposes health and waitlist endpoints; MongoDB persists requests with a unique email index and race-safe idempotency.
- The browser reads the API origin from `REACT_APP_BACKEND_URL`; the backend reads Mongo settings and allowed origin from environment variables.

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

## Prioritized Backlog

### P0

- No open launch-blocking product issues.

### P1

- Add consent/retention language and an internal request-management view before handling real enterprise lead volume.
- Have qualified counsel review the published legal drafts before accepting production customers or regulated data.

### P2

- Add real workspace authentication and connect the demo to live orchestration telemetry.
- Add CMS-managed ICP stories and editorial case-study publishing.
- Add product analytics for CTA conversion, story engagement, and demo scenario completion.
- Add shareable demo runs and generated coordination maps for organic distribution.

## Next Tasks

1. Review claims, metrics, fictionalized company names, and legal text with legal/brand stakeholders.
2. Connect the product demo to authenticated Ahi workspace APIs when they are available.
3. Publish verified production subprocessors and assurance reports before processing customer workspace data.