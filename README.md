# Fake Store + Kanban Board

## 📘 Project Overview

This is a React + TypeScript project with two main parts:
- **Fake Store** using the [Fake Store API](https://fakestoreapi.com/)
- **Kanban Board** for task management with drag-and-drop support

Both modules are in a single monorepo and share styles and components.

## ⚙️ Setup and Installation

```bash
git clone https://github.com/your-username/fake-store-kanban.git
cd fake-store-kanban
npm install
````

### 🔐 Environment Setup

Create a `.env` file in the root of the project:

```env
VITE_FAKE_STORE_API_URL=https://fakestoreapi.com
```

Then run the app:

```bash
npm run dev
```


## 🚀 Usage Guide

* **Fake Store Dashboard**: CRUD for products and users
* **Kanban Board**: Add, edit, delete and drag-and-drop tasks between columns


## 📡 API Endpoints Reference

Powered by [Fake Store API](https://fakestoreapi.com):

* `POST /auth/login`
* `GET /products`
* `GET /products/:id`
* `POST /products`
* `PUT /products/:id`
* `DELETE /products/:id`

* `GET /users`
* `GET /users/:id`
* `POST /users`
* `PUT /users/:id`
* `DELETE /users/:id`


## ✨ Bonus Features

* drag-and-drop for Kanban
* Skeleton on kanban item drag
* Dynamic color badges for lists


## 🌍 Live Deployment

Hosted on **Vercel**
👉 [https://fake-store-kanban.vercel.app](https://fake-store-kanban.vercel.app)

**Credentials**:  
• Username: `johnd`  
• Password: `m38rmF$`

