import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { LanguageProvider } from "./context/LanguageContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EnsiklopediaPage from "./pages/EnsiklopediaPage";
import DetailHerbalPage from "./pages/DetailHerbalPage";
import KeluhanPage from "./pages/KeluhanPage";
import DetailRacikanPage from "./pages/DetailRacikanPage";
import ArtikelPage from "./pages/ArtikelPage";
import DetailArtikelPage from "./pages/DetailArtikelPage";
import RiwayatPage from "./pages/RiwayatPage";
import JurnalResepPage from "./pages/JurnalResepPage";
import ProfilPage from "./pages/ProfilPage";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/ensiklopedia" element={<EnsiklopediaPage />} />
              <Route path="/ensiklopedia/:slug" element={<DetailHerbalPage />} />
              <Route path="/racikan/:slug" element={<DetailRacikanPage />} />

              <Route
                path="/keluhan"
                element={
                  <ProtectedRoute>
                    <KeluhanPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/artikel" element={<ArtikelPage />} />
              <Route path="/artikel/:slug" element={<DetailArtikelPage />} />

              <Route
                path="/riwayat"
                element={
                  <ProtectedRoute>
                    <RiwayatPage />
                  </ProtectedRoute>
                }
              /><Route
                path="/jurnal-resep"
                element={
                  <ProtectedRoute>
                    <JurnalResepPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <ProfilPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </LanguageProvider>  
    </BrowserRouter>
  );
}

export default App;