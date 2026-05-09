"use client";

import { createContext, useContext, useState } from "react";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
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