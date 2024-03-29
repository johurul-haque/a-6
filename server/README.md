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
  <a href="https://documenter.getpostman.com/view/28307598/2sA2rGtJoa">Documentation</a>
|
  <a href="https://a-5-by-johurul.vercel.app/">Live Site</a>
</div>

## Tech stack
- **TypeScript** - Static type checking
- **Express.js** - Route handling and middleware
- **MongoDB** - Storing and managing data
- **Mongoose** - Data modeling and query building
- **Zod** - Validating and parsing incoming and inferring types
- **JSON Web Token** - Authenticating users

## Getting started
Create a `.env` file at the root of your project and add the following variables

```ini
NODE_ENV= # development | production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=****
CLIENT_DOMAIN= # http://localhost:3000
```

To generate a new **JWT secret** use the following commands
```bash
$ node
$ require('crypto').randomBytes(32).toString('hex')
```

Now you can use the following commands

```bash
# install dependencies
pnpm install

# dev server
pnpm dev

# build for production only using npm
npm run build

# running in production
pnpm start
```