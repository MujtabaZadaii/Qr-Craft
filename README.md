# QRCraft - Beautiful QR Code Generator

Made by **Mujtaba Hyder** with help of AI.

A beautiful, customizable QR code generator built with React, Vite, Tailwind CSS, and shadcn/ui. File uploads and database rate limiting are handled securely using **Firebase**.

## Features
- Clean, modern, and beautiful UI.
- Generates high-quality QR codes for Links, Text, SMS, WhatsApp, Wi-Fi, and Email.
- Advanced Customization: Change colors, dots style, and corners.
- Upload custom logos to place at the center of the QR code (Firebase Storage).

---

## 🚀 How to Clone and Setup Locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/MujtabaZadaii/remix-of-craft-qr.git
cd remix-of-craft-qr
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Setup Firebase (Backend)
This app requires Firebase to handle logo uploads. 
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Storage**. Set their security rules to `allow read, write: if true;` for testing.
3. Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file and replace the placeholder values with your actual Firebase Configuration keys.

### 4. Run the Development Server
```bash
npm run dev
```
Your app will now be running at `http://localhost:8080/` (or the port specified in the terminal).

---

## 🌐 How to Deploy (Vercel)

This frontend application is configured to be deployed easily on **Vercel**:

1. Install Vercel CLI (if you haven't already):
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the prompts (press `Enter` to use default Vite settings).
4. **Important**: Go to your Vercel Project Dashboard -> **Settings** -> **Environment Variables** and paste all your `.env` keys there so the live site can connect to Firebase!
