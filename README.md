# Verihubs Webcamtoy

A replica website of [Webcamtoy.com](https://webcamtoy.com) built with React, Vite, TypeScript, Tailwind CSS, and leveraging Web Browser Canvas API for it's main feature. 

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind

## Verihubs Webcamtoy Features

A replica website of [Webcamtoy.com](https://webcamtoy.com) built with React, Vite, TypeScript, Tailwind CSS, and leveraging Web Browser Canvas API for it's main feature.

This project enables us to test, capture images, and play around with webcam and various filters with your desktop/mobile device.

Features:
- Landing Page
- Webcam Stage
  - Capture Image - capture and save image to your device 
  - Effects/Filters
    - Normal (default)
    - Quad Camera - Displays 4 camera in a grid of 2x2
    - Upside Down - Vertically flipped camera
    - Red - 🔴
    - Green - 🟢
    - Blue - 🔵
    - Grayscale - ⬜️
    - X-Ray - 👻
  - Settings
    - Mirror - flip the webcam camera horizontally. defaults to true
    - Square - change aspect ratio of the webcam canvas. defaults to false

### Directory Structure

- `public/` - Static assets
- `src/` - Source files
- `index.css`
- `main.tsx` - Entrypoint for rendering our React App 
- `App.tsx` - Our top most level React component
- `src/components/` - Reusable components
- `src/modules/` - Top level wrapper component or page component. This directory can also have it's own components dir for module specific components
- `src/utils/` - Helper/utility functions, constants, typescript interfaces/types
- `src/hooks/` - Custom React Hooks

## Getting Started

### Requirements

- Node v18+
- npm

### Installation

```bash
$ npm i
$ npm run dev
```

### Other Used Libraries
- `@headlessui/react` - An unstyled and fully accessible UI components to help build our own accessible component library.
- `react-icons`
- `eslint` - Code linting to help enforce code style for this project
- `prettier` - to help standardize code style and formatting for a more consistent and readable codebase

### Recommended VSCode Extensions
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Code linting to help enforce code style for the repository
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind autocomplete, syntax highlighting, and linting
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - For consistent code styling and autoformatting. simply install and enable the extension. The extension will automatically read the prettier config for the Code Styling Rule

## References
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Canvas MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas)
