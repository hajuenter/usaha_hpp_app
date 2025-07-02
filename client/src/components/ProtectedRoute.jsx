import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn && !showMessage) {
      toast.error("Login terlebih dahulu");
      setShowMessage(true);
    }
  }, [isSignedIn, isLoaded, showMessage]);

  if (!isLoaded) return null;

  if (!isSignedIn) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
