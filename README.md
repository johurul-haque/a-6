<h1 align="center">
  A-6
</h1>

<p align="center">
 Inventory Management Dashboard for eye-glass selling store.
</p>

<p align="center">
 <strong>Johurul Haque (L2B2-0699)</strong>
</p>

<div align="center">
  <a href="./NOTES.md">Overview</a>
  |
  <a href="https://a-5-by-johurul.vercel.app/" target="_blank">Live Site</a>
</div>

## Tech stack
- **Next.js (Pages router)** - Only for routing and middleware
- **Redux Toolkit** - For client-side state management and data fetching
- **TypeScript** - Static type checking
- **Shadcn** - For building complex user interfaces with *Tailwind CSS*
- **Tanstack Table** - For creating a dynamic data table
- **React Hook Form** - For handling form submission
- **Zod** - Validating form data
- **kendo-react-pdf**: For converting JSX to a downloadable PDF file.

## Getting started
Create a `.env.local` file and add the following variables.

Now from the `src/config/index.ts` file change `SERVER_DOMAIN` to where the server is running.

Now you can start the application with the following commands

```bash
# install dependencies
pnpm install

# dev server
pnpm dev

# build for production
pnpm run build

# running in production
pnpm start
```

## Demo credentials

### User
  - **email**: johurul@nnobd.org
  - **password**: @johurul

### Manager
  - **email**: johurul@manager.com
  - **password**: @johurul