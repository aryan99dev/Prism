# Prism - Social Media Platform

A modern social media platform built with React, TypeScript, and Vite, featuring interactive UI elements and real-time updates.

## Features

- 🌈 Interactive UI with custom animations and effects
- 🔐 Secure authentication system
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Custom gradient backgrounds with RippleGrid effect
- 💾 Post creation and management
- 👤 User profiles and customization
- 🔍 Explore and discover content
- 💫 Modern animations and transitions

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Authentication:** Appwrite
- **State Management:** React Query
- **Animations:** Custom React components
- **Routing:** React Router DOM

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/aryan99dev/Prism.git
cd Prism
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Appwrite credentials:
```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── _auth/          # Authentication related components
├── _root/          # Root level pages
├── components/     # Reusable components
├── constants/      # Constants and configuration
├── context/       # React context providers
├── lib/           # Utility functions and API calls
├── types/         # TypeScript type definitions
└── styles/        # Global styles and TailwindCSS config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React + TypeScript + Vite template
- Appwrite for backend services
- TailwindCSS for styling
- React Query for state management
