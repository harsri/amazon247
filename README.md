# Amazon 247 - Full Stack E-Commerce Platform

> A fully functional, production-ready e-commerce web application built with modern web technologies, inspired by Amazon's user experience and feature set.

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-black?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)](https://www.mysql.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Demo & Links](#live-demo--links)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Folder Structure](#folder-structure)
6. [Database Schema](#database-schema)
7. [ER Diagram](#er-diagram)
8. [API Endpoints](#api-endpoints)
9. [Environment Variables](#environment-variables)
10. [Setup Instructions](#setup-instructions)
11. [Deployment](#deployment)
12. [Responsive Design](#responsive-design)
13. [Security Implementation](#security-implementation)
14. [Assumptions Made](#assumptions-made)
15. [Future Improvements](#future-improvements)
16. [Challenges Faced](#challenges-faced)
17. [Learning Outcomes](#learning-outcomes)
18. [Contributors](#contributors)
19. [License](#license)

---

## Project Overview

**Amazon Clone** is a comprehensive, full-stack e-commerce platform that replicates the core features and user experience of Amazon. The application enables users to browse products, manage wishlists, add items to cart, place orders, view order history, and engage with customer support—all through an intuitive, responsive interface.

This project demonstrates expertise in:
- Full-stack development with modern technologies
- Database design and optimization with Prisma ORM
- RESTful API architecture and design patterns
- JWT authentication and secure session management
- Responsive UI/UX using React and SCSS
- Production deployment on cloud platforms

---

## Live Demo & Links

| Component | Link | Status |
|-----------|------|--------|
| **Frontend** | https://amazon247.vercel.app | LIVE |
| **Backend API** | https://amazon-clone-backend.onrender.com | LIVE |
| **GitHub Repository** | https://github.com/harsri/amazon247 | AVAILABLE |
| **Database** | Railway MySQL | CONFIGURED |

---

## Features

### Authentication & Authorization
- User registration with email verification
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Protected routes and endpoints
- Session management with token refresh

### Product Discovery
- Advanced product search functionality
- Category-based filtering
- Price range filtering
- Brand filtering
- Sorting (relevance, price, rating, reviews)
- Product pagination
- Real-time search suggestions

### Product Management
- Detailed product pages with specifications
- High-quality product images with gallery
- Product ratings and reviews
- Stock availability indicators
- Delivery date estimation
- Discount percentage display
- MRP & selling price comparison

### Cart Functionality
- Add/remove items from cart
- Update quantity with stock validation
- Real-time price calculations
- Persistent cart storage
- Cart totals and summaries
- Out-of-stock handling

### Wishlist Management
- Add/remove items from wishlist
- Move to cart functionality
- Persistent wishlist storage
- Quick actions from wishlist
- Wishlist sharing (future)

### Checkout & Orders
- Address selection and management
- Multiple payment method options (COD, Card, UPI)
- Order summary before placement
- Order confirmation with email notification
- Order total with GST calculation
- Free delivery threshold logic

### Order Management
- Order history with filters
- Order status tracking (Pending, Processing, Shipped, Delivered)
- Order cancellation for pending orders
- Return request functionality
- Order search by product or order number
- Time-based filtering

### Reviews & Ratings
- Product review submission from orders
- 5-star rating system
- Review text with character limit
- Average rating calculation
- Rating count tracking
- Social proof display

### Location & Delivery
- Delivery pincode validation
- City-based delivery checking
- FREE delivery on orders above ₹999
- Delivery date estimation
- Pincode database management
- 8+ major Indian cities supported

### Customer Support
- Support ticket creation
- Issue categorization
- Ticket status tracking
- Support history
- Email notifications for updates
- Contact form with validation

### Notifications
- Real-time toast notifications
- Email notifications for orders
- Email notifications for support updates
- Success/error/warning messages
- Auto-dismiss notifications

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop optimization
- Touch-friendly interface
- Flexible layouts
- Adaptive images

### UI/UX Features
- Loading states with spinners
- Error handling and user feedback
- Smooth transitions and animations
- Consistent design system
- Accessibility features
- Dark mode ready (future)

### Data Validation & Security
- Backend input validation
- Frontend form validation
- Stock concurrency handling
- Duplicate order prevention
- Price tampering prevention
- URL parameter sanitization

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend Framework** | React.js | 18.2.0 | UI library |
| **Routing** | React Router | 6.x | Client-side routing |
| **Styling** | SCSS Modules | 4.x | Component-scoped styles |
| **State Management** | Context API | Native | Global state management |
| **HTTP Client** | Axios | 1.6.0 | API requests |
| **Notifications** | React Toastify | 9.x | Toast notifications |
| **Icons** | React Icons | 4.x | Icon library |
| **Build Tool** | Vite | 4.x | Fast build tool |
| **Deployment** | Vercel | - | Frontend hosting |
| | | | |
| **Backend Runtime** | Node.js | 18.x | JavaScript runtime |
| **Framework** | Express.js | 4.18 | Web framework |
| **ORM** | Prisma | 5.22 | Database ORM |
| **Database** | MySQL | 8.0 | Relational database |
| **Authentication** | JWT + bcryptjs | 8.x | Secure auth |
| **Email Service** | Nodemailer | 6.x | Email delivery |
| **Validation** | Custom middleware | - | Input validation |
| **Deployment** | Render/Railway | - | Backend hosting |
| | | | |
| **Database Hosting** | Railway | - | Cloud MySQL |
| **Version Control** | Git | 2.x | Source control |
| **Package Manager** | npm | 9.x | Dependency management |

---

## Folder Structure

```
amazon247/
|
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.scss
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation header
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── ProductCard.jsx    # Reusable product card
│   │   │   └── ScrollToTop.jsx    # Scroll utility
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page with carousel
│   │   │   ├── ProductDetails.jsx # Single product view
│   │   │   ├── Cart.jsx           # Shopping cart
│   │   │   ├── Checkout.jsx       # Checkout flow
│   │   │   ├── Wishlist.jsx       # Wishlist page
│   │   │   ├── Orders.jsx         # Order history
│   │   │   ├── AddressBook.jsx    # Address management
│   │   │   ├── Support.jsx        # Customer support
│   │   │   ├── Login.jsx          # Authentication
│   │   │   └── *.scss             # Page styles
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # User authentication
│   │   │   ├── CartContext.jsx    # Shopping cart state
│   │   │   ├── WishlistContext.jsx# Wishlist state
│   │   │   └── AddressContext.jsx # Address state
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx     # Main app layout
│   │   │
│   │   ├── utils/
│   │   │   └── api.js             # Axios instance
│   │   │
│   │   └── assets/
│   │       ├── images/
│   │       └── icons/
│   │
│   └── public/
│       └── favicon.ico
│
├── backend/
│   ├── package.json
│   ├── .env
│   ├── index.js               # Server entry point
│   │
│   ├── controllers/
│   │   ├── auth.controller.js    # Auth logic
│   │   ├── product.controller.js # Product logic
│   │   ├── cart.controller.js    # Cart logic
│   │   ├── wishlist.controller.js# Wishlist logic
│   │   ├── order.controller.js   # Order logic
│   │   ├── review.controller.js  # Review logic
│   │   ├── address.controller.js # Address logic
│   │   └── support.controller.js # Support logic
│   │
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   ├── product.routes.js     # Product endpoints
│   │   ├── cart.routes.js        # Cart endpoints
│   │   ├── wishlist.routes.js    # Wishlist endpoints
│   │   ├── order.routes.js       # Order endpoints
│   │   ├── review.routes.js      # Review endpoints
│   │   ├── address.routes.js     # Address endpoints
│   │   └── support.routes.js     # Support endpoints
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT verification
│   │
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── seed.js               # Database seeding
│   │
│   ├── utils/
│   │   ├── sendEmail.js          # Email service
│   │   └── emailTemplates.js     # Email templates
│   │
│   └── config/
│       └── database.js           # DB connection config
│
└── .gitignore
```

---

## Database Schema

### Users Table
**Purpose**: Store user account information and authentication details

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| name | VARCHAR(255) | NOT NULL | User full name |
| createdAt | TIMESTAMP | DEFAULT NOW() | Account creation date |
| updatedAt | TIMESTAMP | ON UPDATE | Last update timestamp |

### Categories Table
**Purpose**: Product categorization

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Category ID |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Category name |
| description | TEXT | - | Category description |

### Products Table
**Purpose**: Product catalog and pricing

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Product ID |
| title | VARCHAR(255) | NOT NULL | Product name |
| description | TEXT | - | Detailed description |
| price | DECIMAL(10,2) | NOT NULL | Selling price |
| originalPrice | DECIMAL(10,2) | - | MRP/List price |
| brand | VARCHAR(100) | - | Product brand |
| categoryId | INT | FOREIGN KEY | Related category |
| stock | INT | DEFAULT 0 | Available quantity |
| ratings | DECIMAL(2,1) | DEFAULT 0 | Average rating |
| ratingCount | INT | DEFAULT 0 | Number of reviews |
| boughtCount | INT | DEFAULT 0 | Purchase count |
| isPremium | BOOLEAN | DEFAULT FALSE | Premium listing flag |

### ProductImages Table
**Purpose**: Store multiple product images

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Image ID |
| productId | INT | FOREIGN KEY | Related product |
| url | VARCHAR(500) | NOT NULL | Image URL |

### WishlistItems Table
**Purpose**: User wishlist management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Wishlist item ID |
| userId | INT | FOREIGN KEY | Related user |
| productId | INT | FOREIGN KEY | Related product |
| createdAt | TIMESTAMP | DEFAULT NOW() | Added date |

### CartItems Table
**Purpose**: Shopping cart items

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Cart item ID |
| userId | INT | FOREIGN KEY | Related user |
| productId | INT | FOREIGN KEY | Related product |
| quantity | INT | NOT NULL | Item quantity |
| price | DECIMAL(10,2) | NOT NULL | Price at addition |
| createdAt | TIMESTAMP | DEFAULT NOW() | Added date |

### Orders Table
**Purpose**: Order records

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Order ID |
| userId | INT | FOREIGN KEY | Related user |
| orderNumber | VARCHAR(50) | UNIQUE | Reference number |
| totalAmount | DECIMAL(10,2) | NOT NULL | Order total |
| status | ENUM | DEFAULT PENDING | Order status |
| addressId | INT | FOREIGN KEY | Delivery address |
| paymentMethod | VARCHAR(50) | NOT NULL | Payment type |
| createdAt | TIMESTAMP | DEFAULT NOW() | Order date |

### OrderItems Table
**Purpose**: Individual items in orders

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Item ID |
| orderId | INT | FOREIGN KEY | Related order |
| productId | INT | FOREIGN KEY | Related product |
| quantity | INT | NOT NULL | Ordered quantity |
| price | DECIMAL(10,2) | NOT NULL | Price per unit |

### Reviews Table
**Purpose**: Product reviews and ratings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Review ID |
| userId | INT | FOREIGN KEY | Reviewer user |
| productId | INT | FOREIGN KEY | Reviewed product |
| rating | INT | NOT NULL | Rating 1-5 |
| comment | TEXT | - | Review text |
| createdAt | TIMESTAMP | DEFAULT NOW() | Review date |

### SupportTickets Table
**Purpose**: Customer support cases

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Ticket ID |
| userId | INT | FOREIGN KEY | Related user |
| subject | VARCHAR(255) | NOT NULL | Issue subject |
| message | TEXT | NOT NULL | Issue description |
| status | ENUM | DEFAULT OPEN | Ticket status |
| orderId | INT | FOREIGN KEY (NULL) | Related order |
| createdAt | TIMESTAMP | DEFAULT NOW() | Created date |

### Addresses Table
**Purpose**: User delivery addresses

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Address ID |
| userId | INT | FOREIGN KEY | Related user |
| fullName | VARCHAR(255) | NOT NULL | Recipient name |
| addressLine1 | VARCHAR(255) | NOT NULL | Street address |
| city | VARCHAR(100) | NOT NULL | City name |
| state | VARCHAR(100) | NOT NULL | State/Province |
| pincode | VARCHAR(10) | NOT NULL | Postal code |
| phone | VARCHAR(20) | NOT NULL | Phone number |
| isDefault | BOOLEAN | DEFAULT FALSE | Default address flag |

### DeliverablePincodes Table
**Purpose**: Service area management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY | Pincode ID |
| pincode | VARCHAR(10) | UNIQUE | Postal code |
| city | VARCHAR(100) | NOT NULL | City name |
| state | VARCHAR(100) | NOT NULL | State name |
| isDeliverable | BOOLEAN | DEFAULT TRUE | Delivery available |

---

## ER Diagram

```mermaid
erDiagram
    USERS ||--o{ WISHLISTS : has
    USERS ||--o{ CART_ITEMS : has
    USERS ||--o{ ORDERS : places
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ SUPPORT_TICKETS : creates
    USERS ||--o{ ADDRESSES : has
    
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ PRODUCT_IMAGES : includes
    PRODUCTS ||--o{ WISHLIST_ITEMS : appears_in
    PRODUCTS ||--o{ CART_ITEMS : in
    PRODUCTS ||--o{ ORDER_ITEMS : in
    PRODUCTS ||--o{ REVIEWS : reviewed_by
    
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS ||--o{ SUPPORT_TICKETS : related_to
    ORDERS }o--|| ADDRESSES : shipped_to
    
    USERS {
        int id PK
        string email UK
        string password
        string name
        timestamp createdAt
        timestamp updatedAt
    }
    
    CATEGORIES {
        int id PK
        string name UK
        string description
    }
    
    PRODUCTS {
        int id PK
        string title
        text description
        decimal price
        decimal originalPrice
        string brand
        int categoryId FK
        int stock
        decimal ratings
        int ratingCount
        int boughtCount
        boolean isPremium
    }
    
    PRODUCT_IMAGES {
        int id PK
        int productId FK
        string url
    }
    
    WISHLIST_ITEMS {
        int id PK
        int userId FK
        int productId FK
        timestamp createdAt
    }
    
    CART_ITEMS {
        int id PK
        int userId FK
        int productId FK
        int quantity
        decimal price
        timestamp createdAt
    }
    
    ORDERS {
        int id PK
        int userId FK
        string orderNumber UK
        decimal totalAmount
        string status
        int addressId FK
        string paymentMethod
        timestamp createdAt
    }
    
    ORDER_ITEMS {
        int id PK
        int orderId FK
        int productId FK
        int quantity
        decimal price
    }
    
    REVIEWS {
        int id PK
        int userId FK
        int productId FK
        int rating
        text comment
        timestamp createdAt
    }
    
    SUPPORT_TICKETS {
        int id PK
        int userId FK
        string subject
        text message
        string status
        int orderId FK
        timestamp createdAt
    }
    
    ADDRESSES {
        int id PK
        int userId FK
        string fullName
        string addressLine1
        string city
        string state
        string pincode
        string phone
        boolean isDefault
    }
    
    DELIVERABLE_PINCODES {
        int id PK
        string pincode UK
        string city
        string state
        boolean isDeliverable
    }
```

---

## API Endpoints

### Authentication Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/auth/register` | POST | User registration | No |
| `/auth/login` | POST | User login | No |
| `/auth/profile` | GET | Get user profile | Yes |
| `/auth/logout` | POST | User logout | Yes |

### Product Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/products` | GET | Get all products with filters | No |
| `/products/:id` | GET | Get single product details | No |
| `/products/search` | GET | Search products | No |
| `/products/category/:category` | GET | Get products by category | No |

### Cart Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/cart` | GET | Get cart items | Yes |
| `/cart` | POST | Add item to cart | Yes |
| `/cart/:itemId` | PUT | Update cart item quantity | Yes |
| `/cart/:itemId` | DELETE | Remove item from cart | Yes |
| `/cart/clear` | DELETE | Clear entire cart | Yes |

### Wishlist Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/wishlist` | GET | Get wishlist items | Yes |
| `/wishlist` | POST | Add to wishlist | Yes |
| `/wishlist/:itemId` | DELETE | Remove from wishlist | Yes |

### Order Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/orders` | POST | Place new order | Yes |
| `/orders` | GET | Get user orders | Yes |
| `/orders/:id` | GET | Get single order details | Yes |
| `/orders/:id/cancel` | PUT | Cancel order | Yes |
| `/orders/:id/return` | PUT | Request return | Yes |

### Review Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/reviews/:productId` | GET | Get product reviews | No |
| `/reviews/:productId` | POST | Submit review | Yes |
| `/reviews/:id` | PUT | Update review | Yes |
| `/reviews/:id` | DELETE | Delete review | Yes |

### Address Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/addresses` | GET | Get user addresses | Yes |
| `/addresses` | POST | Add new address | Yes |
| `/addresses/:id` | PUT | Update address | Yes |
| `/addresses/:id` | DELETE | Delete address | Yes |
| `/addresses/:id/default` | PUT | Set default address | Yes |

### Support Routes

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/support` | GET | Get support tickets | Yes |
| `/support` | POST | Create support ticket | Yes |
| `/support/:id` | GET | Get ticket details | Yes |
| `/support/:id` | PUT | Update ticket | Yes |

---

## Environment Variables

### Backend `.env` Configuration

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DATABASE_URL="mysql://username:password@host:port/database_name"

# JWT Configuration
JWT_SECRET="your_super_secret_jwt_key_minimum_32_characters"
JWT_EXPIRY="7d"

# Email Configuration (Nodemailer)
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_app_specific_password"

# Frontend URL (for CORS)
CLIENT_URL="https://amazon247.vercel.app"

# Payment Gateway (Future)
RAZORPAY_KEY_ID="your_razorpay_key"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### Frontend `.env` Configuration

```bash
# API Configuration
REACT_APP_API_BASE_URL="https://amazon-clone-backend.onrender.com/api"

# Environment
REACT_APP_ENV="production"

# Feature Flags (Optional)
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_DEBUG_MODE=false
```

---

## Setup Instructions

### Prerequisites

Ensure you have installed:
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- MySQL v8.0 or higher (local or cloud)
- Git v2.0 or higher

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with configuration
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Seed initial data (optional)
npx prisma db seed

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API base URL

# Start development server
npm start
# Application opens on http://localhost:3000

# Build for production
npm run build
```

### Database Setup

1. Create MySQL Database:
```sql
CREATE DATABASE amazon_clone;
```

2. Configure Prisma:
   - Update DATABASE_URL in backend .env
   - Run: npx prisma db push

3. Seed Sample Data:
```bash
npx prisma db seed
```

---

## Deployment

### Frontend Deployment (Vercel)

1. Connect Repository:
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import your GitHub repository

2. Configure Environment Variables:
   - Settings → Environment Variables
   - Add REACT_APP_API_BASE_URL

3. Deploy:
   - Select frontend as root directory
   - Set build command: npm run build
   - Output directory: dist
   - Deploy

### Backend Deployment (Render/Railway)

Using Render:
1. Connect GitHub repository to Render
2. Create Web Service
3. Set environment variables
4. Deploy

Using Railway:
1. Connect GitHub repository to Railway
2. Create new service
3. Add environment variables
4. Add MySQL plugin
5. Deploy

### Database Deployment (Railway/Heroku)

1. Create new MySQL database on Railway
2. Get DATABASE_URL
3. Add to backend environment variables
4. Run migrations: npx prisma migrate deploy

### Post-Deployment Checklist

- Update CLIENT_URL in backend environment
- Update REACT_APP_API_BASE_URL in frontend environment
- Test all API endpoints
- Verify email notifications
- Test checkout flow
- Monitor error logs
- Enable HTTPS
- Set up domain mapping

---

## Responsive Design

### Design Philosophy
- **Mobile-First Approach**: Start with mobile, enhance for larger screens
- **Flexible Layouts**: Use flexbox and grid for responsive containers
- **Scalable Images**: Responsive image sizing with `max-width` and `object-fit`

### Breakpoints

```scss
// Mobile devices (320px - 480px)
@media (max-width: 480px) {
  // Single column layouts
  // Large text sizes
  // Touch-friendly buttons
}

// Tablets (481px - 768px)
@media (max-width: 768px) {
  // 2-column layouts
  // Adjusted spacing
  // Optimized navigation
}

// Small Desktop (769px - 1024px)
@media (max-width: 1024px) {
  // 3-column layouts
  // Sidebar navigation
}

// Large Desktop (1025px+)
@media (min-width: 1025px) {
  // Full-width layouts
  // Multiple columns
  // Enhanced visuals
}
```

### Implementation Details

- **SCSS Modules**: Component-scoped styling to prevent conflicts
- **CSS Grid**: Product listings and category grids
- **Flexbox**: Navigation, buttons, and form layouts
- **REM Units**: Scalable font sizes based on root font-size
- **CSS Variables**: Theme colors and spacing tokens
- **Media Queries**: Conditional styling based on viewport

---

## Security Implementation

### Authentication & Authorization

JWT-based authentication with 7-day expiry
Tokens stored in httpOnly cookies (frontend)
Protected routes require valid JWT

Password Security:
- Bcryptjs hashing with 10-round salt
- No plaintext passwords in database
- Password reset via email verification

Protected Endpoints:
- Authentication middleware on all user-specific routes
- Token validation on each request
- Automatic logout on token expiry

### Data Protection

Input Validation:
- Email format validation
- Password strength requirements
- Phone number format checking
- Pincode validation

Backend Validation:
- Prisma schema validation
- SQL injection prevention via ORM
- XSS prevention with content sanitization

### Stock & Concurrency

Prevent overselling:
- Check stock before adding to cart
- Lock stock during order placement
- Restore stock on order cancellation
- Transaction handling for atomic operations

### API Security

REST API Best Practices:
- CORS configuration to allow only frontend domain
- Rate limiting on sensitive endpoints (future)
- Request logging and monitoring
- Error responses without sensitive info
- HTTPS required on production

### Environment Variable Protection

Secure Configuration:
- .env files in .gitignore
- Separate envs for dev/staging/production
- JWT_SECRET with minimum 32 characters
- Database credentials encrypted

---

## Assumptions Made

### Business Logic

1. **Demo Payment Flow Only**
   - All orders use Cash on Delivery (COD)
   - No real payment gateway integration
   - Order confirmation immediate

2. **Limited Geographic Scope**
   - Delivery available only to selected Indian cities
   - 8+ major cities supported
   - Pincode validation before checkout

3. **Email Notifications**
   - Uses mock email service in development
   - Real Nodemailer in production
   - Email sending may be delayed during high load

4. **Product Inventory**
   - Stock levels static in demo
   - No real-time inventory sync
   - Manual stock management required

### Feature Scope

1. **Customer Support**
   - Ticket system for issues
   - Email notifications only
   - AI chatbot not implemented (future)

2. **Order Tracking**
   - Manual status updates only
   - No real-time GPS tracking
   - Estimated delivery dates only

3. **Authentication**
   - Email-password only
   - No social login (future scope)
   - No OTP verification (future scope)

### Technical Assumptions

1. **Single Database Instance**
   - All data in one MySQL database
   - No read replicas or sharding
   - Suitable for demo/MVP phase

2. **Monolithic Architecture**
   - Single backend server
   - Single frontend app
   - No microservices

3. **Session Management**
   - JWT tokens for stateless auth
   - 7-day expiry for user sessions
   - Manual logout required

---

## Future Improvements

### Payment Integration
- Razorpay payment gateway
- Multiple payment methods (Wallets, UPI)
- Payment refund handling
- Transaction history and receipts

### Authentication Enhancements
- Google OAuth integration
- OTP-based login via SMS
- Two-factor authentication (2FA)
- Social media login (Facebook, Twitter)
- Biometric authentication

### Customer Experience
- AI-powered product recommendations
- Smart search with filters
- Voice search functionality
- Product comparison tool
- Virtual try-on (AR for certain products)

### Admin Dashboard
- Admin panel for inventory management
- Sales analytics and reports
- User management system
- Order fulfillment dashboard
- Promotional campaign tools

### Advanced Features
- Real-time order tracking with GPS
- Live customer support chat
- Coupon and discount system
- Loyalty points program
- Subscription boxes
- Multi-vendor marketplace
- Seller dashboard

### Performance Optimization
- Image optimization with CDN
- Database query optimization
- Caching strategies (Redis)
- Lazy loading implementation
- Code splitting and bundling optimization

### DevOps & Infrastructure
- Docker containerization
- Kubernetes orchestration
- Zero-downtime deployments
- Database backups and recovery
- Monitoring and alerting
- CI/CD pipeline automation

### Mobile Application
- Native iOS app
- Native Android app
- Cross-platform React Native
- Push notifications
- Offline mode

---

## Challenges Faced

### Database & ORM

**Challenge**: Setting up Prisma relationships with complex joins
- **Solution**: Studied Prisma documentation and implemented nested queries
- **Learning**: Importance of schema design and relationship planning

**Challenge**: MySQL join complexity with multiple foreign keys
- **Solution**: Used Prisma's `include` and `select` for efficient queries
- **Learning**: Performance implications of N+1 query problems

### Frontend Development

**Challenge**: Managing complex global state with Context API
- **Solution**: Created separate contexts for different domains (Auth, Cart, Wishlist)
- **Learning**: Prop drilling is a real issue with Context API at scale

**Challenge**: Responsive layout management across devices
- **Solution**: Implemented mobile-first approach with SCSS breakpoints
- **Learning**: Flexbox and Grid are essential for modern layouts

**Challenge**: Cart state persistence across page refreshes
- **Solution**: Used localStorage with Context API sync on app mount
- **Learning**: Browser storage limitations and data integrity

### Backend Development

**Challenge**: Handling concurrent cart and order operations
- **Solution**: Implemented transaction handling and stock validation
- **Learning**: Race conditions are real in production systems

**Challenge**: ER diagram validation and constraint handling
- **Solution**: Used Prisma's schema validation and database constraints
- **Learning**: Data integrity is critical from the database level

**Challenge**: Email notification reliability
- **Solution**: Implemented retry logic and error handling
- **Learning**: Email delivery is not guaranteed; need fallback mechanisms

### Authentication & Security

**Challenge**: JWT token management and refresh logic
- **Solution**: Implemented 7-day expiry with manual refresh on logout
- **Learning**: Balancing security and user experience is tricky

**Challenge**: Password hashing and verification
- **Solution**: Used bcryptjs with salting for secure storage
- **Learning**: Never store plain passwords; always hash

### Deployment

**Challenge**: Environment variable management across stages
- **Solution**: Created separate .env files for dev/staging/production
- **Learning**: Secrets management is crucial for security

**Challenge**: Database migration on production
- **Solution**: Tested migrations locally before deployment
- **Learning**: Zero-downtime deployments require careful planning

**Challenge**: CORS issues between frontend and backend
- **Solution**: Configured Express CORS middleware properly
- **Learning**: Same-origin policy is important for security

---

## Learning Outcomes

### Full-Stack Development

- Comprehensive understanding of client-server architecture
- RESTful API design principles and best practices
- End-to-end feature development from mockup to production
- Deployment pipeline understanding and execution

### Frontend Development

- React patterns: Hooks, Context API, component composition
- Responsive design: Mobile-first approach, breakpoints, CSS Grid/Flexbox
- State management: Complex state handling without Redux
- Performance optimization: Code splitting, lazy loading, memoization

### Backend Development

- Express.js framework: Routing, middleware, error handling
- Prisma ORM: Schema design, relationships, query optimization
- Authentication: JWT implementation, password hashing, middleware
- Email service: Nodemailer integration and email templating

### Database Design

- Relational database schema design principles
- Normalization: BCNF, avoiding anomalies, data integrity
- Indexing: Performance optimization, query analysis
- Constraints: Foreign keys, unique keys, check constraints

### DevOps & Deployment

- Platform deployment: Vercel (frontend), Render/Railway (backend)
- Environment management: .env configuration, secrets handling
- CI/CD concepts: Automated testing and deployment
- Monitoring: Error logging, performance metrics

### Best Practices

- Code organization: Modular structure, separation of concerns
- Error handling: Graceful error messages, fallback mechanisms
- Security: Input validation, password hashing, JWT auth
- Testing: Manual testing strategies, edge case handling

### Soft Skills

- Problem-solving: Debugging complex issues, finding solutions
- Documentation: Clear code comments, README maintenance
- Time management: Project planning, deadline management
- Research: Learning new technologies, RTFM (Read The Fine Manual)

---

## Contributors

### Development Team

| Name | Role | GitHub |
|------|------|--------|
| **Harshit Srivastava** | Full-Stack Developer | [@harsri](https://github.com/harsri) |

### Contributors

Grateful to the open-source community for amazing tools and libraries
Special thanks to React, Node.js, and Prisma teams

### How to Contribute

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

### MIT License Summary

```
Copyright (c) 2024 Harshit Srivastava

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

**You are free to**:
- Use commercially
- Modify the code
- Distribute
- Use privately

**With conditions**:
- License notice required
- No liability accepted

---

## Support & Contact

For questions, suggestions, or support:

- GitHub Issues: https://github.com/harsri/amazon247/issues
- Email: harshit@example.com
- LinkedIn: https://linkedin.com/in/harsrivastava

---

## Show Your Support

If you found this project helpful, please consider:

- Starring the repository
- Sharing with your network
- Providing feedback
- Contributing improvements

---

Made with care by Harshit Srivastava

*Last Updated: April 2024*

---

## Quick Links

- Frontend Repository: https://github.com/harsri/amazon247
- Live Application: https://amazon247.vercel.app
- API Documentation: https://amazon-clone-backend.onrender.com/api/docs
- Issue Tracker: https://github.com/harsri/amazon247/issues
- Project Roadmap: https://github.com/harsri/amazon247/projects

---

