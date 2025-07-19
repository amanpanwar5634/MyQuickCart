 # 🛒 MyQuickCart

**MyQuickCart** is a fully-featured and responsive e-commerce platform built with **Next.js**, **MongoDB**, **Express**, and **Node.js**.  
It offers seamless shopping experiences, robust admin management, and secure authentication using **Clerk**. Enhanced with **Inngest** to handle background tasks and workflows efficiently.

---

## ✨ Key Features

✅ **Product Browsing & Cart:**  
Users can explore products, add them to their cart, update quantities, and proceed to a detailed checkout.

✅ **Secure User Authentication:**  
**Clerk** integration allows secure sign-up, sign-in, and session management for both users and admins.

✅ **Admin Dashboard:**  
Admins have access to a protected dashboard to:
- Manage all products (add, edit, delete)
- View user details
- Monitor orders and transactions
- Get an overview of platform statistics

✅ **Order Summary & Checkout:**  
Responsive checkout page with order breakdown, address management, and review screen.

✅ **Background Jobs with Inngest:**  
Automatically handle tasks like sending confirmation emails or delayed workflows without blocking user actions.

✅ **Responsive & Stylish UI:**  
Modern design using **Tailwind CSS** ensures beautiful layout and accessibility across all devices.

✅ **Role-Based Access:**  
Separation between regular users and admins to protect sensitive actions and routes.

---

## ⚙️ Tech Stack

| Layer              | Tools & Libraries                                 |
|--------------------|---------------------------------------------------|
| **Frontend**       | Next.js (React), Tailwind CSS                     |
| **Backend**        | Node.js, Express.js                               |
| **Database**       | MongoDB                                           |
| **Authentication** | Clerk (User & Admin Auth)                         |
| **Admin Panel**    | Custom Admin Routes with Protected Access         |
| **Workflow Engine**| Inngest (for async workflows & tasks)             |
| **API**            | RESTful APIs with Express                         |

---

## 📊 Admin Dashboard Capabilities

The Admin Dashboard is built to help you manage everything:

- 🛍️ **Products:** Add, update, or delete product listings  
- 👥 **Users:** View user database, manage roles (admin/user)  
- 📦 **Orders:** Track all orders, update statuses  
- 📈 **Stats Overview:** Track platform metrics like revenue, new users, and inventory

> Access to the admin panel is restricted to users with an admin role, handled securely using Clerk role-based access.

---

## 📱 Responsive Design

Built with **Tailwind CSS**, the entire platform is optimized for mobile, tablet, and desktop views, ensuring users and admins get a smooth experience everywhere.

---

## 🔐 Why These Technologies?

- **Next.js** – SSR support, fast rendering, great for SEO and performance  
- **MongoDB** – Flexible schema design perfect for e-commerce data  
- **Express + Node.js** – Lightweight and scalable backend  
- **Clerk** – Easy and secure auth with role-based control  
- **Inngest** – Background jobs (like sending confirmation emails or cleanup tasks)  
- **Tailwind CSS** – Clean, utility-first styling system  
- **RESTful API** – Easy to consume from both frontend and admin panel  

---

 
