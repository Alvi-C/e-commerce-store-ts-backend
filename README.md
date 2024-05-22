# E-Commerce Store Backend

This is a backend application for an e-commerce store built with Node.js, Express, TypeScript, and MongoDB. It includes functionalities for managing products and orders, along with a little inventory management.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- MongoDB (v7 or later)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Alvi-C/e-commerce-store-ts-backend.git
   cd e-commerce-store-ts-backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create .env file with the following content in the root of your project:

   ```sh
   NODE_ENV=development
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   ```

## Running the Application

1. **Start the server**

   ```sh
   npm run start:dev
   ```

## API Endpoints

1. **Products API**

   - Create a product

   ```http
    POST /api/products
   ```

   - Request Body

   ```json
   {
     "name": "Product Name",
     "description": "Product Description",
     "price": 100,
     "category": "Category",
     "tags": ["tag1", "tag2"],
     "variants": [
       {
         "type": "Color",
         "value": "Red"
       }
     ],
     "inventory": {
       "quantity": 50,
       "inStock": true
     }
   }
   ```

   - Get all products

   ```http
   GET /api/products
   ```

   - Query Parameters by product's name

   ```http
   GET /api/products?searchTerm=Product Name
   ```

   - Query Parameters by product's category

   ```http
   GET /api/products?searchTerm=Product Category
   ```

   - Update a product

   ```http
   PUT /api/products/:productId
   ```

   - Delete a product

   ```http
   DELETE /api/products/:productId
   ```

2. **Orders API**

   - Create an order

   ```http
   POST /api/orders
   ```

   - Request Body

   ```json
   {
     "email": "Product Name",
     "productId": "Product Description",
     "price": 100,
     "quantity": 1
   }
   ```

   - Get all orders

   ```http
   GET /api/orders
   ```

   - Query Parameters by email

   ```http
   GET /api/orders?email=test2@test.com
   ```

### Inventory management logic

- When a new order is created, the system should check the available quantity in inventory.
- If the ordered quantity exceeds the available quantity, return an error response indicating insufficient stock.
- Reduce the quantity of the ordered product in inventory
- If the inventory quantity reaches zero, set inStock to false. Otherwise, keep inStock as true.
