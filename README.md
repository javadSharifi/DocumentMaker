# DocumentMaker · Visual Document & PDF Form Overlay Editor

[![فارسی](https://img.shields.io/badge/README-فارسی-red?style=for-the-badge)](README.fa.md)

> **Build once. Fill forever.** A privacy-first, browser-based tool for creating reusable document templates and exporting pixel-perfect PDFs — no server, no cloud, no data ever leaves your device.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-documentmaker.netlify.app-4f46e5?style=for-the-badge)](https://documentmaker.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

---

## What is DocumentMaker?

**DocumentMaker** is an open-source, **local-first SPA** that lets you upload any document image, draw input zones on top of it with a drag-and-drop canvas, and generate a dynamic form that exports a high-fidelity PDF — with your data perfectly overlaid.

Use it for government forms, invoices, contracts, certificates, or any repeating paperwork you fill out manually today.

---

## Key Features

| Feature                         | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| 🖼️ **Visual Template Editor**   | Drag-and-drop zone mapping powered by Fabric.js v6           |
| 📋 **Auto Form Generation**     | Zones → form fields, instantly, with zero configuration      |
| 📄 **High-Fidelity PDF Export** | Pixel-perfect output via `jsPDF` + `html2canvas`             |
| 💾 **100% Local Storage**       | All data stored in IndexedDB (Dexie.js) — nothing uploaded   |
| 🌐 **RTL / LTR i18n**           | Full Persian & English support with dynamic layout switching |
| 🌙 **Dark / Light Theme**       | System-aware, no flash                                       |

---

## Privacy Guarantee

> **Your documents never leave your browser.**

All processing — image rendering, form data, PDF generation, and template storage — happens entirely client-side. There is no backend, no analytics, no third-party data sharing.

---

## Screenshots

### Dashboard & Template Management

![Dashboard](https://raw.githubusercontent.com/javadSharifi/DocumentMaker/main/public/img/placeholder-dashboard.webp)

### Canvas Template Editor

![Editor](https://raw.githubusercontent.com/javadSharifi/DocumentMaker/main/public/img/placeholder-editor.webp)

### Form Filler & PDF Export

![Form Filler](https://raw.githubusercontent.com/javadSharifi/DocumentMaker/main/public/img/placeholder-filler.webp)

---

## Tech Stack

| Layer         | Technology                               |
| ------------- | ---------------------------------------- |
| Framework     | React 19, TypeScript 5, Vite 7           |
| Canvas Engine | Fabric.js v6                             |
| State         | Zustand (UI) + TanStack Query (async)    |
| Storage       | Dexie.js (IndexedDB)                     |
| Styling       | Tailwind CSS v4, Radix UI, Framer Motion |
| PDF Export    | jsPDF, html2canvas, file-saver           |
| Routing       | React Router v7                          |

---

## Architecture

DocumentMaker follows **Clean Architecture** and **SOLID principles** across four strict layers:

```
src/
├── presentation/        # React components, pages, layouts (UI only)
│   ├── components/      # Radix UI + Tailwind primitives
│   ├── layouts/
│   └── pages/
├── application/         # Hooks, Zustand stores, React Query mutations
│   ├── hooks/
│   ├── services/
│   └── store/           # UI-only state — no async DB logic here
├── core/                # Domain entities, TypeScript interfaces, pure utils
│   ├── types/           # Template, Document, Zone models
│   └── utils/           # CoordinateTransformer, math helpers
└── infrastructure/      # Database config, repository implementations
    ├── db/
    └── repositories/
```

**Key decisions:**

- Zustand holds only transient UI state (atomic selectors, no re-render leaks)
- All async/DB operations go through TanStack Query — never directly in components
- Zero "God Components" — each component has a single, well-defined responsibility

---

## Getting Started

**Prerequisites:** Node.js v20+, pnpm (required — do not use npm/yarn)

```bash
# 1. Clone
git clone https://github.com/javadSharifi/DocumentMaker.git
cd DocumentMaker

# 2. Install
pnpm install

# 3. Develop
pnpm dev

# 4. Build for production
pnpm build
```

---

## Deployment

DocumentMaker is a pure CSR SPA. Deploy to any static host.

| Setting          | Value                                                 |
| ---------------- | ----------------------------------------------------- |
| Build Command    | `pnpm run build`                                      |
| Output Directory | `dist`                                                |
| SPA Redirect     | Included via `public/_redirects` (Netlify-compatible) |

Clean URLs work out of the box — no hash routing required.

---

## Contributing

Contributions are welcome. Please respect the architectural boundaries:

- No async/DB logic inside Zustand stores
- No business logic inside presentation components
- No "God Hooks" that mix multiple concerns

---

## License

MIT © [javadSharifi](https://github.com/javadSharifi/DocumentMaker)

---

<p align="center">
  <a href="https://documentmaker.netlify.app/">Live Demo</a> ·
  <a href="https://github.com/javadSharifi/DocumentMaker/issues">Report Bug</a> ·
  <a href="https://github.com/javadSharifi/DocumentMaker/issues">Request Feature</a>
</p>
