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
import { ClipLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Tampilkan loader selama 3 detik
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <ClipLoader size={50} color="#3b82f6" />
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

export default App;
