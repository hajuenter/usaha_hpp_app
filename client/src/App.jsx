import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calculate from "./pages/Calculate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { LoadingProvider, useLoading } from "./helper/LoadingContext";

function AppContent() {
  const { isLoading, setLoadingComplete } = useLoading();

  useEffect(() => {
    // Set timeout sebagai fallback
    const fallbackTimer = setTimeout(() => {
      setLoadingComplete();
    }, 3000); // 3 detik maksimal loading

    return () => clearTimeout(fallbackTimer);
  }, [setLoadingComplete]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <ClipLoader color="#2563eb" size={60} />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/calculate"
          element={
            <ProtectedRoute>
              <Calculate />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
