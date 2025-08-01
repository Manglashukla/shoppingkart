# 💼 ShoppingKart — MERN Stack E-commerce App

An advanced full-stack e-commerce web application built with **MongoDB, Express, React, and Node.js**, complete with:

* User Authentication
* Product Management
* Shopping Cart
* Stripe Payments
* Order Tracking
* Admin Dashboard

---

## ✨ Features

* 🔐 User Login/Register with JWT
* 🛒 Browse products & view product details
* 💼 Add to cart & checkout
* 💳 Stripe payment integration
* 💾 Order confirmation and history
* ⚙️ Admin dashboard:

  * Manage Products
  * Manage Users
  * Manage Orders
* 📷 Image Upload via Cloudinary
* 📦 Fully connected MongoDB backend
* 🎨 Responsive UI

---

## ⚙️ Getting Started

### 1⃣ Clone the Repo

```bash
git clone https://github.com/yourusername/shoppingkart.git
cd shoppingkart
```

### 2⃣ Install Dependencies

#### For Backend

```bash
cd backend
npm install
```

#### For Frontend

```bash
cd ../frontend
npm install
```

---

### 3⃣ Configure Environment Variables

Create a `.env` file in both the `/backend` and `/frontend` folders.

#### 📁 `/backend/.env`

```env
PORT=5050
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### 📁 `/frontend/.env`

```env
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

### 4⃣ Run the App in Development Mode

#### 🚀 Start Backend

```bash
cd backend
npm run dev
```

#### 🌐 Start Frontend

```bash
cd frontend
npm start
```

---

### 📦 Build for Production

```bash
cd frontend
npm run build
```

---

## 🧑‍💼 Author

**👤 Mangla Shukla**

* 📧 Email: [manglashukla67@gmail.com](mailto:manglashukla67@gmail.com)
* 💼 Portfolio (optional): \[Your Portfolio Link]
* 🐙 GitHub: [https://github.com/yourusername](https://github.com/yourusername)

---

## 📂 Folder Structure

```
shoppingkart/
├── backend/       // Express.js + MongoDB server
├── frontend/      // React app
├── README.md
└── .env           // (optional global env)
```

---

## ✅ Final Wrap-up Complete!

Your app is now:

* ✅ Organized and fully functional
* 🔐 Secured with `.env`
* 📝 Documented with `README.md`
* 🧑‍💼 Ready to deploy or push to GitHub
