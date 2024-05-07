<h1 align="center">
  A-6
</h1>

<p align="center">
 Inventory Management Dashboard for eye-glass selling store.
</p>

<div align="center">
  <a href="./NOTES.md">Overview</a>
  |
  <a href="https://a-6-by-johurul.vercel.app/" target="_blank">Live Site</a>
</div>

## Features
- **Inventory Management:** Allows users to add, delete, and update eyeglasses details, with a robust filtering system to narrow down selections.
- **Sales Management:** Users can create sales records, download invoices, and update product quantities in real-time.
- **Sales History Overview:** Provides detailed views of sales history with weekly, daily, monthly, and yearly categorizations.
- **Filtering:** Enables filtering by frame material, frame shape, lens type, brand, price range, gender, color, and more.
- **Secure Authentication with JWT:** Uses JSON Web Tokens for secure user authentication and authorization.
- **Role-based Authorization:** Implements user roles for secure authorization, with distinct permissions for `user` and `manager`.
- **Invoice Generation:** After completing a sale, users can download an invoice as a PDF for record-keeping.
- **Bulk Delete Functionality:** Allows users to select and delete multiple products at once for easy inventory management.
- **Duplicate & Edit Feature:** Provides the ability to duplicate product details to create new eyeglasses with minimal effort.
- **Mobile Responsive Design:** Optimized for use on various devices, ensuring a smooth user experience on mobile and tablets.



## Tech Stack
### Frontend
- **Next.js** - For routing and middleware
- **Redux Toolkit** - For client-side state management and data fetching
- **TypeScript** - Static type checking
- **Shadcn/UI** - For complex user interfaces with *Tailwind CSS*
- **Tanstack Table** - For creating a dynamic data table
- **React Hook Form** - For handling form submission
- **Zod** - Validating form data
- **kendo-react-pdf** - For converting JSX to a downloadable PDF file.
  
### Backend
- **TypeScript** - Static type checking
- **Express.js** - Route handling and middleware
- **MongoDB** - Storing and managing data
- **Mongoose** - Data modeling and query building
- **Zod** - Validating and parsing incoming and inferring types
- **JSON Web Token** - Authenticating users

## Getting Started
There's a `README.md` file in both the [client](./client) and [server](./server) directory. It contains the getting started guides along with additional information about the project.

## License
This project is licensed under the MIT License.
