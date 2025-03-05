# E-commerce API

## Description
This project is a RESTful API for an e-commerce system, developed with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. The API allows users to register, manage products, make purchases, and track orders. **This project is still under development, and some features are being implemented.**

## Technologies Used
- **Node.js** + **Express.js** (Backend)
- **PostgreSQL** (Database)
- **Prisma ORM** (Database Management)
- **AWS** (Integration for scalability and storage)
- **Docker** (Containers for development and production environments)
- **JWT** (User authentication)

## Features
- **Authentication**: User registration and login with JWT
- **Product Management**: Creation, editing, and removal of products
- **Shopping Cart**: Add and remove items from the cart
- **Orders**: Checkout and order status tracking
- **Administration**: User and product control (admin permissions)

## Environment Setup

### Requirements
- **Node.js** (v18+)
- **Docker** and **Docker Compose**
- **PostgreSQL**

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/aluizio-n/ecommerce-api.git
   cd ecommerce-api
   ```
2. Configure the environment variables in the `.env` file:
   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

### Running with Docker
```sh
  docker-compose up -d
```

## API Documentation
The complete documentation is available via Swagger:
- Access: `http://localhost:3000/docs`

## Tests
To run automated tests:
```sh
npm test
```

## Contribution
Pull requests are welcome! Before submitting, please open an issue to discuss the change.

## License
This project is licensed under the MIT License.

---
Developed by [@aluizio-n](https://github.com/aluizio-n).

