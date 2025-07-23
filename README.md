# Prism – Modern Social Media Platform

Prism is a cutting-edge social media platform built with React, TypeScript, and Vite. It features a sleek, interactive UI, real-time updates, and a fully responsive design. Prism is designed for seamless user experience, robust authentication, and creative content sharing.

## ✨ Features

- Interactive UI with custom animations and effects
- Secure authentication powered by Appwrite
- Fully responsive design for mobile, tablet, and desktop
- Dynamic gradient backgrounds and animated effects (RippleGrid, DotGrid, Dither, etc.)
- Post creation, editing, and management
- User profiles with customization and follow/unfollow
- Explore, search, and discover trending content
- Real-time updates and notifications
- Saved and liked posts functionality
- Modern transitions and smooth navigation

## 🛠️ Tech Stack

- **Frontend:** React (TypeScript)
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Authentication & Backend:** Appwrite
- **State Management:** React Query
- **Routing:** React Router DOM
- **Animations:** Custom React components

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryan99dev/Prism.git
   cd Prism
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with your Appwrite credentials:
   ```env
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_URL=your_appwrite_url
   VITE_APPWRITE_STORAGE_ID=your_storage_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
   VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
   VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── _auth/         # Authentication components (Sign In, Sign Up, Auth Layout)
├── _root/         # Main application pages (Home, Explore, Profile, etc.)
├── components/    # Reusable UI components and shared elements
│   ├── Logos/     # SVG and logo components
│   ├── Shared/    # Shared UI (cards, loaders, backgrounds, etc.)
│   └── ui/        # Form and input primitives
├── constants/     # App-wide constants
├── context/       # React context providers (Auth, etc.)
├── hooks/         # Custom React hooks
├── lib/           # Utilities, API, validation, and react-query logic
├── types/         # TypeScript type definitions
├── globals.css    # Global styles
└── main.tsx       # App entry point
```

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add: Your feature description'`)
4. Push to your branch (`git push origin feature/YourFeatureName`)
5. Open a Pull Request with a clear description

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- [Appwrite](https://appwrite.io/) for backend services
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [React Query](https://tanstack.com/query/latest) for state management

---

> Designed and developed by Aryan99dev. For questions or support, please open an issue or contact the maintainer.
