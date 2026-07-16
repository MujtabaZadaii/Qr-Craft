# 🚀 QRCraft

A modern, feature-rich QR Code Generator built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**. QRCraft allows users to create beautiful, fully customizable QR codes with logo support, multiple data types, and high-resolution exports.

> Developed by **Mujtaba Hyder**

🌐 **Live Demo:** https://your-live-demo-url.com

---

## ✨ Overview

QRCraft is designed to make QR code generation simple, powerful, and visually appealing. It supports multiple QR formats, advanced customization, and secure cloud storage for uploaded logos using Firebase.

Whether you need a QR code for a website, Wi-Fi network, social media, business card, or personal use, QRCraft provides an intuitive interface with real-time preview and instant downloads.

---

## ✨ Features

- 🎨 Beautiful and responsive interface
- ⚡ Instant QR code generation
- 🌈 Fully customizable colors
- 🔘 Multiple QR dot styles
- ⬜ Custom corner styles
- 🖼 Upload logos with Firebase Storage
- 📱 Generate QR codes for:
  - Website URLs
  - Plain Text
  - Email
  - SMS
  - WhatsApp
  - Wi-Fi Networks
- 📥 Download high-quality PNG images
- 🚀 Fast performance powered by Vite
- ☁ Secure logo uploads using Firebase

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- JavaScript (ES6+)

### Backend Services

- Firebase Authentication *(optional)*
- Firebase Firestore
- Firebase Storage

### Deployment

- Vercel

---

## 📁 Project Structure

```text
QRCraft/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Getting Started

## Clone the Repository

```bash
git clone https://github.com/MujtabaZadaii/remix-of-craft-qr.git
```

```bash
cd remix-of-craft-qr
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Firebase

Create a Firebase project from the Firebase Console.

Enable:

- Firestore Database
- Firebase Storage

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your Firebase credentials.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Run the Development Server

```bash
npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🌐 Deployment

QRCraft is optimized for deployment on **Vercel**.

Deploy directly from GitHub or using the Vercel CLI.

```bash
vercel
```

After deployment, add the same Firebase environment variables inside:

**Vercel Dashboard → Project Settings → Environment Variables**

Redeploy the project after saving the variables.

---

## 📸 Screenshots

> Add screenshots or GIFs showcasing the application interface.

---

## 👨‍💻 Author

**Mujtaba Hyder**

- GitHub: https://github.com/MujtabaZadaii
- Portfolio: https://zadaiir.netlify.app/

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.
