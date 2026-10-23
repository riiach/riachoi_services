"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [selectedCategory, setCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const setSelectedCategory = useCallback((category) => {
    setCategory(category);
    setSelectedSubCategory(null);
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used inside CategoryProvider");
  }

  return context;
}