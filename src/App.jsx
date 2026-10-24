// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";
import { LanguageProvider } from "./context/LanguageContext";
import AppRouter from "./routes/AppRouter";
import ToastProvider from "./components/notifications/ToastProvider";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppDataProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </ToastProvider>
        </AppDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
