"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

export default function SearchOverlay({ posts = [] }) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  // Stores the search box DOM element
  const searchBoxRef = useRef(null);

  // Closes search and clears input
  const closeSearch = () => {
    setOpen(false);
    setKeyword("");
  };

  useEffect(() => {
    // Stops this effect when the search overlay is closed
    if (!open) return;

    // Closes the search overlay when clicking outside of the search box
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    }

    // Closes the search overlay when pressing Escape
    function handleEscape(event) {
      if (event.key === "Escape") {
        closeSearch();
      }
    }

    // Adds browser event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Removes browser event listeners to prevent memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const normalizedKeyword = keyword.toLowerCase().trim();

  // Filters posts by title, keyword/tag, and category title
  const filteredPosts = posts.filter((post) => {
    if (!normalizedKeyword) return false;

    // Checks post title
    const titleMatch = post.title
      ?.toLowerCase()
      .includes(normalizedKeyword);

    // Checks post keyword/tag string
    const tagMatch = post.keyword
      ?.toLowerCase()
      .includes(normalizedKeyword);

    // Checks category titles
    const categoryMatch = post.categories?.some((category) =>
      category.title?.toLowerCase().includes(normalizedKeyword)
    );

    return titleMatch || tagMatch || categoryMatch;
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Search">
        <Search className="h-6 w-6 text-foreground hover:text-accent" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/10 backdrop-blur-sm">
          <div
            ref={searchBoxRef}
            className="mx-auto mt-9 w-[90%] max-w-xl overflow-hidden rounded-md bg-white shadow-xl"
          >
            <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-5">
              {keyword ? (
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-black" />
                </button>
              ) : (
                <Search className="h-5 w-5 text-black" />
              )}

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
                placeholder="Search by title, tag, or category"
                className="w-full bg-transparent text-base text-black outline-none placeholder:text-gray-400"
              />
            </div>

            {keyword && (
              <div className="max-h-[500px] overflow-y-auto">
                {filteredPosts.length > 0 ? (
                  <section>
                    <p className="px-6 py-3 text-xs font-bold uppercase text-gray-400">
                      Search Results
                    </p>

                    <div className="space-y-5 px-6 pb-6">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.id || post.slug || post.title}
                          href={`/blog/${post.slug}`}
                          onClick={closeSearch}
                          className="block"
                        >
                          <h3 className="text-base text-black hover:text-accent">
                            {post.title}
                          </h3>

                          <p className="text-sm text-gray-400">
                            {post.description}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                            {post.categories?.map((category) => (
                              <span key={category.id || category.title}>
                                #{category.title}
                              </span>
                            ))}

                            {post.keyword
                              ?.split(" ")
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                              .map((tag) => (
                                <span key={tag}>#{tag}</span>
                              ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : (
                  <p className="px-6 py-6 text-sm text-gray-400">
                    No results found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}