import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (imageSrc) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageSrc);
      return newSet;
    });
  };

  const setLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadedImages,
        handleImageLoad,
        setLoadingComplete,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
