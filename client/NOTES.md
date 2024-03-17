# Eye Glass Management Dashboard

## Objective
The primary objective of this assignment is to design and implement a comprehensive Eye Glasses Management Dashboard, providing the tools to efficiently manage the eyeglasses inventory, track sales, and analyze sales history. The assignment will incorporate features such as authentication, CRUD operations, state management, real-time UI updates, and eyeglasses filtering.

Each product must have following information

- Product name
- Product price
- Product quantity
- Product Image

> Additionally, ensure to include more product information based on the specified filter criteria mentioned in point 4.

## Requirements

### Technical

- Implement Redux for state management.
- Use RTK Query for efficient CRUD operations.
- Ensure the UI updates gracefully in real time.
- Apply tags for improved organization and categorization.
- Optimize for mobile responsiveness to ensure a reasonable user experience on various devices.

### Features

1. **Registration and Login:**
    - Users must register and log in to access the dashboard.
    - Use JWT (JSON Web Tokens) for secure authentication.
    - Roles:
        - `user` - Can only create and modify the products they have added to the inventory. Which includes:
            - Adding new eyeglass to the inventory.
            - Updating details of the eyeglasses.
            - Viewing and filtering the list of eyeglasses they have added.
            - Deleting existing eyeglass from the inventory.
            - Creating sales record.
                
        - `manager` - They have broader permissions and can modify any product within the inventory. This role is typically assigned to administrators or higher-level staff members responsible for overseeing the entire inventory.
            - Adding new eyeglasses to the inventory.
            - Deleting existing eyeglasses from the inventory.
            - Updating details of any eyeglasses in the inventory.
            - Viewing and reading the list of all eyeglasses in the inventory.
        
        By defining these roles and their respective permissions, the system ensures that users have control and ownership over the products they add while allowing managers to oversee and manage the entire inventory efficiently.

1. **Eye Glasses Management:**
    - Add a new pair of eyeglasses to the inventory.
    - Delete existing eyeglasses from the inventory.
    - Update eyeglasses details.
    - Read and view the list of eyeglasses in the inventory.
    - Implement a robust filtering system to effectively narrow down eyeglasses selections based on various criteria.

2. **Sales Management:**
    - Users can search for a product to sell, and upon finding it, they can click the "Sell" button. On clicking the sell button a form will pop up. The form will have the following fields:
        - Quantity of the product to be sold (Input quantity cannot exceed the current available stock of the product)
        - Name of the buyer
        - Date of the sale
    
    > Note: If the quantity reaches zero, the product will be removed from the inventory.
    
    - Invoice download (PDF)
        - After completing a sale, users will have the option to download the invoice for the order.
        - The invoice will contain details such as the product name, quantity, date, and name of the buyer.
3. **Sales History:** View sales history categorized by
    - Weekly
    - Daily
    - Monthly
    - Yearly
4. **Filter by:**
    - **Frame Material:** Allow users to set a filter for specific frame materials (e.g., metal, plastic, acetate).
    - **Frame Shape:** Implement a real-time search functionality for frame shapes to quickly find eyeglasses with specific shapes (e.g., rectangular, round, cat-eye).
    - **Lens Type:** Enable searching by lens types (e.g., single-vision, bifocal, progressive).
    - **Brand:** Implement a filter for eyeglasses brands to quickly find items by a specific manufacturer.
    - **Price Range:** Implement a price range filter for eyeglasses.
    - **Gender:** Allow users to filter eyeglasses based on gender (e.g., men, women, unisex).
    - **Color:** Include a filter for eyeglasses colors.
    - **Additional Relevant Filter Parameters:** Introduce other relevant filter parameters such as temple length, bridge size, or any custom attributes associated with the eyeglasses.
5. **Bulk Delete Product:** Ability to select and delete those products.
  
6. **Duplicate & Edit:** Ability to duplicate a product's details to modify and create a new product.
