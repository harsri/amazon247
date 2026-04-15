# Build Full-Stack Amazon-Inspired E-Commerce Application

This document outlines the architecture and implementation phases for building a robust, full-stack Amazon-inspired e-commerce platform. The application will use React.js (Frontend), Node.js/Express (Backend), MySQL with Prisma ORM (Database), and SCSS Modules for styling.

> [!IMPORTANT]
> This is a large-scale project. We will follow a phased approach to ensure each component works correctly before moving to the next.

## User Review Required

> [!WARNING]
> Please review the database schema and project structure carefully. Changing core structures later in the development process can be time-consuming.
> Also, ensure you have a local MySQL instance running or access to a cloud MySQL database.

## Proposed Architecture and Phases

### Phase 1: Project Setup & Database Architecture (Backend Focus)
- Initialize the `backend` and `frontend` directories with their respective `package.json` files.
- Set up Prisma with MySQL and define the schema:
  - `users`: id, email, password, etc.
  - `categories`: id, name, description, etc.
  - `products`: id, categoryId, title, description, price, stock, ratings, etc.
  - `product_images`: id, productId, url, etc.
  - `wishlist_items`: id, userId, productId
  - `cart_items`: id, userId, productId, quantity
  - `orders`: id, userId, totalAmount, status, address, paymentMethod, etc.
  - `order_items`: id, orderId, productId, quantity, price
  - `support_tickets`: id, userId, subject, message, status
  - `deliverable_pincodes`: pincode, city, state
- Generate Prisma Client and create seed data (20-30 products, categories, pincodes).
- Set up Express server structure (routes, controllers, middlewares).

### Phase 2: Core Backend Features
- Implement Custom Error Handling and Middleware.
- **Authentication**: JWT-based Signup and Login with bcryptjs.
- **Products API**: Endpoints for listing (with filters/sorting), fetching details, and stock checking.
- **Cart & Wishlist API**: Add/remove items, sync with database.
- **Order API**: Order placement with Prisma Transactions to handle concurrency (prevent overselling), payment mock, nodemailer integration for confirmation emails.
- **Support API**: Endpoints for FAQ and contact form submissions.

### Phase 3: Frontend Foundation & Tools
- Initialize React app using Vite (`npx create-vite@latest frontend --template react`).
- Setup SCSS Modules, React Router, Axios, and React Toastify.
- Build Context Providers (AuthContext, CartContext, WishlistContext).
- Define global CSS tokens (Amazon-inspired colors, typography, utility classes).
- Create base Layouts (`MainLayout`, `AuthLayout`).

### Phase 4: Frontend Components & Pages
- **Shared Components**: Dark Navbar, Footer, Loader, ProductCard, Toast notifications.
- **Pages**:
  - `Home`: Categories, promotional hero, product grid.
  - `Auth`: Login and Signup pages.
  - `ProductDetails`: Image carousel, specs, subtotal, 'Add to Cart', pincode check.
  - `Cart`: Summary, subtotal, item list.
  - `Wishlist`: Saved items.
  - `Checkout`: Address form, order summary, dummy payment selection.
  - `Orders`: Past order history.
  - `Support`: FAQs, contact form.

### Phase 5: Refinement & Polish
- Ensure strict mobile-first responsive design across all views.
- Add Loading and Empty states (skeletons, empty carts).
- Verify Toast notifications are appropriately integrated.
- Write README documentation.

## Decisions Made

| Question | Decision |
|---|---|
| **Database** | MySQL via MySQL Workbench — `localhost:3306`, user `root`, database `amazon_clone`. Password will be added to `.env` by user. |
| **Email (Nodemailer)** | Use **Ethereal Mail** (fake SMTP) for development. Zero setup needed. A preview URL will appear in terminal to view sent emails. Can swap to Gmail/SendGrid later. |
| **User Roles** | No roles — app is customer-only. |
| **Node.js/npm** | Confirmed available on system. |

## Open Questions

All questions resolved! ✅ Ready for execution.

## Verification Plan

### Automated/Tool-Based
- Verify database schemas via Prisma Studio.
- Run node scripts to test seed generation.
- Check backend endpoints using dummy requests.

### Manual Verification
- Test User Registration and Login flows.
- Verify JWT is stored correctly and restricted routes work.
- Add products to wishlist and cart; manipulate quantities; verify subtotal updates.
- Complete a checkout flow and verify stock reduces correctly in the DB.
- Ensure the UI matches the mobile-first requirement by using the browser's responsive design tools.
