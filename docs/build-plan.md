# 3D Component Builder Plan

## Reference Experience Findings (from a leading browser-based 3D design tool)
- The landing experience emphasizes an **all-in-one** platform for 3D + design with **real-time collaboration** as a core value. 
- Primary use cases are showcased across several categories (e.g., interactive web experiences, product design, branding/marketing, gamified experiences, mockups, logos, animated characters), suggesting the product positions itself as **multi-domain** rather than a single-purpose editor.
- The top navigation highlights product areas (products, resources, community, customers, enterprise, pricing) and encourages **conversion** via “Get Started” / “Log In” CTAs.
- The hero and gallery sections emphasize **visual examples** of created work, implying strong support for **sharing** and **showcasing** outputs.

## Product Goals for Our Builder
1. **Browser-first 3D editor** with real-time rendering.
2. **Component-driven workflow** with reusable parts.
3. **Export-ready outputs** for web embedding and asset pipelines.
4. **Collaboration-friendly foundations** (even if real-time is a later phase).

## Architecture Outline (Three.js + Node)
### Client (Three.js)
- `viewport.js`: renderer, camera, controls, resize handling.
- `scene.js`: scene initialization, lighting, helpers.
- `components.js`: create/update/remove 3D components.
- `materials.js`: material definitions + caching.
- `loaders.js`: GLTF/OBJ/etc asset loading.
- `export.js`: export GLTF/GLB, screenshots.
- `ui.js`: DOM bindings for inspector, toolbar, panels.
- `state.js`: centralized state store + events.

### Server (Node)
- `server/index.js`: server entry.
- `server/routes.js`: REST endpoints for asset upload/export.
- `server/storage.js`: persistence layer (local or cloud).
- `server/export.js`: server-side export helpers (optional).

## Task Breakdown
### Phase 1 — Foundations
1. **Scaffold client/server structure** with the module layout above.
2. **Viewport bootstrap**: renderer, camera, orbit controls, resize.
3. **Scene setup**: lighting, grid, axes helpers.
4. **Basic UI skeleton**: toolbar, viewport container, inspector panel.

### Phase 2 — Components
1. **Component registry**: add/update/remove primitives (box/sphere/etc).
2. **Transform controls**: move/rotate/scale for selected component.
3. **Material presets**: standard material library with UI picker.

### Phase 3 — Assets & Export
1. **Asset loading**: import GLTF/GLB with progress UI.
2. **Export**: GLTF/GLB export + PNG snapshot.
3. **Project save/load**: JSON scene serialization.

### Phase 4 — Collaboration & Sharing
1. **Shareable links**: save projects server-side and load by ID.
2. **Real-time sync (future)**: live cursors, shared selection state.
3. **Gallery**: saved project list + preview thumbnails.
