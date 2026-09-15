# ElectroStore — Production-Ready Full-Stack MERN E-Commerce Platform

A production-style full-stack E-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), styled with Tailwind CSS, secured with HTTP-only JWT authentication, and designed around a Cash-on-Delivery (COD) checkout workflow.

---

## 🌟 Key Features

- **Decoupled Architecture**: Fully separated `frontend/` (React + Vite) and `backend/` (Node.js + Express) codebases.
- **Dynamic Props-Based Products**: All product cards strictly adhere to the React `props` method (`<ProductCard product={product} />`). Adding new products never requires creating new components!
- **Authentication & Security**:
  - Secure signup and login with `bcryptjs` password hashing.
  - JWT tokens stored in secure HTTP-only cookies to mitigate XSS attacks.
  - Role & authentication guard with `ProtectedRoute.jsx`.
- **Modern Responsive Design**:
  - Tailwind CSS with responsive breakpoints (Desktop: 4 columns, Tablet: 2-3 columns, Mobile: 1-2 columns).
  - Modern desktop navbar and mobile slide-down drawer with Lucide React icons.
- **Dynamic Shop & Filtering**:
  - Real-time instant search bar (`SearchBar.jsx`) across product name, brand, category, and description.
  - Category filters, brand filters, and multiple sort options (Price low-to-high, high-to-low, top-rated, newest).
- **Cart Management**:
  - React Context API (`CartContext.jsx`) backed by `localStorage` (`ecommerce_cart`).
  - Add to cart, increment/decrement quantity with stock limits, item removal, and subtotal calculation.
- **Cash on Delivery (COD) Checkout**:
  - Streamlined order form pre-filled with customer details.
  - Shipping address, phone number, city, postal code, and delivery notes.
  - Real-time itemized order summary and grand total.
- **MongoDB Persistence**:
  - Orders stored with snapshot of item prices, user reference, status tracking, and delivery information.
  - Customer order tracking page (`MyOrders.jsx`) with live status badges (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
- **Database Seeder**:
  - Built-in script populating 12 high-grade consumer electronics with Unsplash images.
- **Admin-Ready Backend**:
  - Full CRUD REST endpoints for products (`GET`, `POST`, `PUT`, `DELETE /api/products`).

---

## 🛠️ Technologies Used

### Frontend
- **React.js 18** (Modern functional components & hooks)
- **Vite 5** (High-speed build tool and dev server)
- **Tailwind CSS 3** (Utility-first responsive design)
- **React Router DOM 6** (Client-side routing)
- **Axios** (HTTP client with interceptors and cookie support)
- **Lucide React** (Vector icons)
- **Context API** (`AuthContext` & `CartContext`)

### Backend
- **Node.js** (JavaScript runtime)
- **Express.js 4** (Web framework)
- **MongoDB & Mongoose 8** (ODM database layer)
- **jsonwebtoken (JWT)** (Session authentication)
- **bcryptjs** (Password hashing)
- **cookie-parser** (HTTP-only cookie parser)
- **cors** (Cross-Origin Resource Sharing)
- **dotenv** (Environment configuration)

---

## 📂 Project Structure

```
ecommerce-mern/
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Responsive navbar with cart badge & auth menu
│   │   │   ├── Footer.jsx          # Multi-column footer with quick links
│   │   │   ├── ProductCard.jsx     # Reusable card receiving props
│   │   │   ├── ProductGrid.jsx     # Reusable responsive catalog grid
│   │   │   ├── SearchBar.jsx       # Real-time search across products
│   │   │   ├── Loading.jsx         # Loading spinner component
│   │   │   └── ProtectedRoute.jsx  # Route guard for auth pages
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Hero, categories, featured, offers, why choose us
│   │   │   ├── Shop.jsx            # Catalog with filters, search, and sorting
│   │   │   ├── ProductDetails.jsx  # Specifications, quantity, add to cart & related items
│   │   │   ├── Login.jsx           # Sign in form
│   │   │   ├── Signup.jsx          # Registration form
│   │   │   ├── Cart.jsx            # Shopping cart management
│   │   │   ├── Order.jsx           # Cash-on-delivery checkout form
│   │   │   ├── MyOrders.jsx        # Customer order history
│   │   │   └── NotFound.jsx        # 404 page
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Global authentication state
│   │   │   └── CartContext.jsx     # Persistent cart state in localStorage
│   │   │
│   │   ├── services/
│   │   │   ├── api.js              # Axios base instance
│   │   │   ├── authService.js      # Auth API endpoints
│   │   │   ├── productService.js   # Product API endpoints
│   │   │   └── orderService.js     # Order API endpoints
│   │   │
│   │   ├── App.jsx                 # Application routes
│   │   ├── main.jsx                # React root mount
│   │   └── index.css               # Tailwind CSS imports
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Mongoose MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # Signup, login, logout, me
│   │   │   ├── product.controller.js # Product CRUD & filtering
│   │   │   └── order.controller.js # Order creation & tracking
│   │   ├── models/
│   │   │   ├── user.model.js       # User schema with bcrypt
│   │   │   ├── product.model.js    # Product schema
│   │   │   └── order.model.js      # Order schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js      # /api/auth routes
│   │   │   ├── product.routes.js   # /api/products routes
│   │   │   └── order.routes.js     # /api/orders routes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js  # JWT validation
│   │   │   └── error.middleware.js # Centralized error handler
│   │   ├── seed.js                 # Database seeder (12 sample products)
│   │   ├── app.js                  # Express application setup
│   │   └── server.js               # Server listener bootstrap
│   │
│   ├── package.json
│   ├── .env.example
│   └── .env
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: v18 or newer (v20+ recommended)
- **MongoDB**: Local MongoDB community service running or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI.

---

### Step 1: Backend Setup

1. Open a terminal in `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_mern
   JWT_SECRET=supersecretjwtkey_ecommerce_2025_safe_token_very_secure_string
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```
   *(Note: For MongoDB Atlas, replace `MONGO_URI` with your connection string `mongodb+srv://<user>:<password>@cluster.mongodb.net/ecommerce_mern?retryWrites=true&w=majority`)*

4. **Seed Sample Products into Database**:
   ```bash
   npm run seed
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   Backend will run on: `http://localhost:5000`

---

### Step 2: Frontend Setup

1. Open a new terminal in `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify environment variables in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🚀 How to Add New Products Dynamically

Because the frontend uses the **Props Method** (`<ProductCard product={product} />`), you can easily add products either via MongoDB or by calling the API!

### Option A: Via REST API
Send a `POST` request to `http://localhost:5000/api/products` with JSON:
```json
{
  "name": "Sony WH-1000XM5",
  "brand": "Sony",
  "category": "Accessories",
  "description": "Industry-leading noise cancelling wireless headphones with dual processors.",
  "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
  "price": 79999,
  "originalPrice": 89999,
  "discount": 11,
  "rating": 4.8,
  "reviews": 168,
  "stock": 25
}
```

### Option B: Adding to `backend/src/seed.js`
Simply append a new object to the `sampleProducts` array in `backend/src/seed.js` and run:
```bash
npm run seed
```

---

## 📡 Backend API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate and set HTTP-only cookie | Public |
| `POST` | `/api/auth/logout` | Clear session cookie | Public |
| `GET` | `/api/auth/me` | Fetch currently logged-in user | Authenticated |

### Products (`/api/products`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/products` | Get products (supports `keyword`, `category`, `brand`, `sort`) | Public |
| `GET` | `/api/products/:id` | Get single product by ID | Public |
| `POST` | `/api/products` | Create product (Admin ready) | Public / Admin |
| `PUT` | `/api/products/:id` | Update product by ID | Public / Admin |
| `DELETE` | `/api/products/:id`| Delete product by ID | Public / Admin |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/orders` | Submit cash-on-delivery order | Authenticated |
| `GET` | `/api/orders/my-orders` | Fetch logged-in user's orders | Authenticated |
| `GET` | `/api/orders/:id` | View specific order details | Authenticated |

---

## 🚢 Deployment Guidelines

1. **Frontend**:
   - Run `npm run build` in `frontend/`.
   - The compiled production assets will be in `frontend/dist/`.
   - Can be hosted on Vercel, Netlify, Render, or AWS S3 + CloudFront.
   - Set environment variable `VITE_API_URL=https://your-backend-domain.com/api`.

2. **Backend**:
   - Set `NODE_ENV=production`.
   - Host on Render, Railway, DigitalOcean, or AWS EC2.
   - Configure `CLIENT_URL=https://your-frontend-domain.com` in backend `.env`.
   - Set `MONGO_URI` to a production MongoDB Atlas cluster.
