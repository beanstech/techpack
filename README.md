# K'paas Tech Pack

A single-page React application with TypeScript showcasing a technical pack for K'paas clothing brand.

## Features

- Modern React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Responsive design
- Technical specifications display
- Size charts and grading information
- Full type safety with TypeScript

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
KpaasTech/
├── src/
│   ├── main.tsx          # React entry point
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles with Tailwind
├── main.tsx              # TechPack component (main content)
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # Node TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Technologies Used

- React 18 with TypeScript
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer
- TypeScript 5.2+

## TypeScript Features

- Strict type checking enabled
- React JSX support with proper typing
- Interface definitions for data structures
- Type assertions for better type safety
- Non-null assertions where appropriate
- Modern ES2020 target with DOM types
