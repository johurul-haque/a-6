<h1 align="center">
  A-6
</h1>

<p align="center">
 Inventory Management System for eye-glass selling store.
</p>

<div align="center">
  <a href="./NOTES.md">Overview</a>
  |
  <a href="https://a-6-by-johurul.vercel.app/" target="_blank">Live Site</a>
</div>

## Tech stack
- **Next.js** - For routing and middleware
- **Redux Toolkit** - For client-side state management and data fetching
- **TypeScript** - Static type checking
- **Shadcn** - For complex user interfaces with *Tailwind CSS*
- **Tanstack Table** - For creating a dynamic data table
- **React Hook Form** - For handling form submission
- **Zod** - Validating form data
- **kendo-react-pdf**: For converting JSX to a downloadable PDF file.

## Getting started
> [!IMPORTANT]
> NodeJs version >= 20

- Rename `.env.example` to `.env.local` and add the variables.
- Go to `src/config/index.ts` and change `SERVER_DOMAIN` to where your server is running.


```bash
# install dependencies
pnpm install

# dev server
pnpm dev
```

## Demo credentials

### User
  - **email**: johurul@nnobd.org
  - **password**: @johurul

### Manager
  - **email**: johurul@manager.com
  - **password**: @johurul
