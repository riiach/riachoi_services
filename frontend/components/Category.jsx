"use client";

import HorizontalScroll from "./ui/HorizontalScroll";
import { useCategory } from "../context/category";

export default function Category({ categories = [] }) {
  const { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory } = useCategory();
  const parents = categories.filter((category) => category._type !== "subCategory" && !category.parent);
  const children = categories.filter((category) => category.parent && category.parent.title === selectedCategory);

  return (
    <section aria-label="Browse by category" className="mb-10 w-full min-w-0">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Explore by category</h1>
      <HorizontalScroll as="nav" label="Categories" className="flex flex-nowrap gap-6 border-b border-foreground/15">
        {[{ _id: "all", title: "All" }, ...parents].map((category) => {
          const value = category._id === "all" ? "all" : category.title;
          const active = selectedCategory === value;
          return (
            <button key={category._id} type="button" aria-pressed={active} onClick={() => setSelectedCategory(value)} className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-1 py-3 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${active ? "border-foreground font-semibold text-foreground" : "border-transparent text-foreground/50 hover:text-foreground"}`}>
              {category.title}
            </button>
          );
        })}
      </HorizontalScroll>
      {selectedCategory !== "all" && <div className="mt-4"><HorizontalScroll role="group" label="Subcategories" className="flex flex-nowrap items-center gap-2 py-1">
        <button type="button" aria-pressed={!selectedSubCategory} onClick={() => setSelectedSubCategory(null)} className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${!selectedSubCategory ? "border-foreground bg-foreground text-background" : "border-foreground/20 bg-transparent text-foreground/60 hover:bg-foreground/5"}`}>All</button>
        {children.map((category) => (
          <button key={category._id} type="button" aria-pressed={selectedSubCategory === category._id} onClick={() => {
            if (selectedCategory !== category.parent.title) setSelectedCategory(category.parent.title);
            setSelectedSubCategory(category._id);
          }} className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${selectedSubCategory === category._id ? "border-foreground bg-foreground text-background" : "border-foreground/20 bg-transparent text-foreground/60 hover:bg-foreground/5"}`}>
            {category.title}
          </button>
        ))}
      </HorizontalScroll></div>}
    </section>
  );
}
