import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthProvider from "@/context/AuthContext.tsx";
import {QueryProvider} from "@/lib/react-query/QueryProvider.tsx";

// Create a client


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <QueryProvider>
          <AuthProvider >
        <App />
          </AuthProvider>
          </QueryProvider>
      </BrowserRouter>

);