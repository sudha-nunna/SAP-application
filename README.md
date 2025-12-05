# ShopFlow - React + Vite + Tailwind CSS

A modern e-commerce shopping application built with React, Vite, and Tailwind CSS.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart with persistent storage
- ❤️ Wishlist functionality
- 🌙 Dark mode support
- 📱 Responsive design
- ⚡ Fast performance with Vite

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. For production:
   ```bash
   vercel --prod
   ```

### Build Settings (Auto-detected by Vercel)

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

The `vercel.json` file is already configured for proper routing with React Router.

## Project Structure

```
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and API
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── dist/               # Build output
```

## License

MIT

