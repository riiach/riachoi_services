"use client";

import { createContext, useContext, useState } from "react";

const SearchTagContext = createContext(null);

export function SearchTagProvider({ children }) {
  const [selectedTag, setSelectedTag] = useState("all");

  return (
    <SearchTagContext.Provider
      value={{
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </SearchTagContext.Provider>
  );
}

export function useSearchTag() {
  const context = useContext(SearchTagContext);

  if (!context) {
    throw new Error("useSearchTag must be used inside SearchTagContextProvider");
  }

  return context;
}