# Svelte + Nx + Tailwindcss + ShadCN + Web Components Chrome Extension Starter Project

The purpose of this project is to create an efficient Svelte Monorepo structure to develop complex Chrome Extensions that demand constant maintaining and improvement. I specifically chose Svelte over React or Angular as lack of Virtual DOM overhead when injecting custom components into web-pages makes a lot of sense to me. Svelte is just simple enough to minimize conflicts on arbitrary web pages while also being functional enough to make maintaining a large codebase easier.

## 📖 Table of Contents

- [Features](#✨-Features)
- [Prerequisites](#🎯-Prerequisites)
- [Getting Started](#🚀-Getting-Started)
- [Project Structure](#🏗-Project-Structure)
- [Web Components (Svelte Custom Elements)](#🧩-web-components-svelte-custom-elements)
- [Commands](#🕹-Commands)
- [Release](#📦-Release)
- [License](#📜-License)

## ✨ Features

✅ Nx Workspace

✅ Svelte 5

✅ Typescript

✅ Chrome Types

✅ Live Reload

✅ Very Fast Build

✅ All In One Command

✅ Support Manifest V3

✅ Popup Page

✅ Options Page

✅ Devtools Panel

✅ Background Script

✅ Content Script

✅ ShadCN-Svelte

✅ Web Components (via Svelte Custom Elements and Lit)

✅ Custom Elements Use Compiled Tailwind Styles

✅ Injected Tailwind Styles Replace `rem` with `em` to ignore the page root styles

✅ Husky

✅ Commitlint

✅ Github Actions

✅ Commitizen

✅ Dark Mode

## 🎯 Prerequisites

- [Node.js](https://nodejs.org) (>= 20 required)
- [PNpm](https://pnpm.io/) package manager
- [Chrome](https://www.google.com/chrome) browser

## 🚀 Getting Started

1. Install dependencies

```shell
pnpm install
```

2. Run Live Reload

```shell
pnpm dev:all
```

3. Open Chrome browser
4. Go to this url: `chrome://extensions`
5. Click on `"Developer mode"`
6. Click on `"Load unpacked"`
7. Choose the `extension` directory from this root directory

> ℹ️ More info about developing Chrome extension can be found [here](https://developer.chrome.com/docs/extensions/mv3)

## 🏗 Project Structure

Nx Workspace contributes significantly to clear project structure in this repository. There are 5 projects that are compiled to separate folders.

1. Popup (`apps/popup`) - used for the upper popup
2. Options (`apps/options`) - used for the options page
3. DevTools Panel (`apps/devtools-panel`) - used for the devtools panel
4. Background Script (`apps/scripts/background`) - used for tracking page updates and communicating with other parts of the application via Chrome message system
5. Content Script (`apps/scripts/content`) - used for monitoring of opened web-pages and injection of WebComponents.

All the applications have already the Chrome types so can just use `chrome` and the editor will recognize it.

## 🧩 Web Components (Svelte Custom Elements)

The most important part of this project is the injection of Svelte-compiled web components into web pages, contained within /libs/custom-elements. I decided to use ShadCN to create reusable custom-elements. Injecting isolated, compiled Tailwind styles into the WebComponents (without breaking websites that use Tailwind) and getting development workflow with them to an acceptable level took most of development time.

It is also a part which I am least confident in, so any contribution would be appreciated.

## 🕹 Commands

Start with development configuration

```shell
pnpm dev:all
```

Start with production configuration.

```shell
pnpm prod:all
```

Build with development configuration.

```shell
npm run build:dev
```

Build with production configuration.

```shell
npm run build:prod
```

## 📜 License

[MIT](LICENSE)

# ❤️ Special thanks to

[freeCodeCamp.org](https://www.youtube.com/@freecodecamp) - for providing the idea for a bookmark app which organically touches on all aspects of Chrome Extension Development

[Aviv Haruzi](https://github.com/avivharuzi) - For an example of a Chrome Extension project with Nx Workspace and providing the template for this README.
