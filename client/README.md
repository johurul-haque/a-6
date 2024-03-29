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
> **System Requirement:** NodeJs v20

Create a `.env.local` file and add the following variables

```ini
NEXT_PUBLIC_CLOUDINARY_URI='https://api.cloudinary.com/v1_1/:cloud_name/image/upload'
NEXT_PUBLIC_UPLOAD_PRESET=''
NEXT_PUBLIC_SECRET_KEY=''
```

Now from the `src/config/index.ts` file change `SERVER_DOMAIN` to where your server is running.

Now you can start the application with the following commands

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