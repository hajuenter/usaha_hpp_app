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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);
    if (images.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <ClipLoader color="#2563eb" size={60} />
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
