"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

const tags = ["Interior", "Design", "Travel", "Fashion", "Food"];

const posts = [
  {
    title: "How to make better coffee at home without fancy gear",
    description: "...nto knausgaard offal intelligentsia beard.",
    href: "/blog/better-coffee",
  },
  {
    title: "Finding the perfect balance between style and function",
    description: "...nto knausgaard offal intelligentsia beard.",
    href: "/blog/style-and-function",
  },
  {
    title: "Mixing retro and modern decor for a balanced home",
    description: "...nto knausgaard offal intelligentsia beard.",
    href: "/blog/retro-modern-decor",
  },
];

export default function SearchOverlay() {
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

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(keyword.toLowerCase()),
  );

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase()),
  );

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
                placeholder="Search posts, tags and authors"
                className="w-full bg-transparent text-base text-black outline-none placeholder:text-gray-400"
              />
            </div>

            {keyword && (
              <div className="max-h-[500px] overflow-y-auto">
                {filteredTags.length > 0 && (
                  <section>
                    <p className="px-6 py-3 text-xs font-bold uppercase text-gray-400">
                      Tags
                    </p>

                    {filteredTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        onClick={closeSearch}
                        className="block bg-gray-100 px-6 py-4 text-black hover:bg-gray-200"
                      >
                        <span className="mr-3 text-gray-400">#</span>
                        <span className="text-accent">{tag}</span>
                      </Link>
                    ))}
                  </section>
                )}

                {filteredPosts.length > 0 && (
                  <section className="border-t border-gray-200">
                    <p className="px-6 py-3 text-xs font-bold uppercase text-gray-400">
                      Posts
                    </p>

                    <div className="space-y-5 px-6 pb-6">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.href}
                          href={post.href}
                          onClick={closeSearch}
                          className="block"
                        >
                          <h3 className="text-base text-black hover:text-accent">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {post.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}