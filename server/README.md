
# 📦 Backend - MERN Stack Server

This is the **Node.js + Express** backend server for a MERN stack application. It connects to a MongoDB database and handles API routes, user authentication, and data management.

---

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js
│   └── keys.js
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   └── userController.js
├── models/
│   ├── Post.js
│   ├── User.js
│   └── __tests__/
│       └── User.test.js
├── routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── authMiddleware.js