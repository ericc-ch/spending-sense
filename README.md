# SpendingSense - Personal Finance Tracker

SpendingSense is a modern, user-friendly personal finance tracking application built with Nuxt.js that helps users manage their expenses and maintain better control over their financial habits.

## Features

### Core Functionality
- **Expense Logging**
  - Add and categorize daily expenses
  - Add notes and descriptions to transactions
  - Edit or delete existing entries

- **Visual Analytics**
  - Pie charts showing expense distribution by category
  - Bar graphs for monthly spending trends
  - Interactive data visualization

- **Budget Management**
  - Set monthly budget limits by category
  - Receive alerts when approaching budget limits
  - Track remaining budget in real-time

### Technical Features
- **Data Privacy & Security**
  - All data stored locally in browser storage
  - No external server dependencies
  - Optional data export/backup functionality

- **Modern UI/UX**
  - Responsive design for all devices
  - Intuitive user interface
  - Dark/Light theme support

### Premium Features (Future)
- Advanced analytics and reporting
- Custom categories and tags
- Premium themes and customization options

## Technical Stack
- **Frontend**: Nuxt.js 3
- **UI Framework**: (TBD - Tailwind CSS/Vuetify)
- **State Management**: Nuxt State Management
- **Data Storage**: Browser LocalStorage/IndexedDB
- **Charts**: (TBD - Chart.js/D3.js)

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
