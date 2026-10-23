import { cache } from "react";
import { client } from "./client";
import { POSTS_QUERY, POST_BY_SLUG_QUERY, CATEGORY_QUERY, ABOUT_POSTS_QUERY, PORTFOLIO_QUERY, PORTFOLIO_BY_SLUG_QUERY } from "./queries";

// Keep CMS data until a signed Sanity webhook invalidates this shared tag.
const options = {
  next: { revalidate: false, tags: ["sanity-content"] },
  cache: "force-cache",
};

export const getPosts = cache(() => client.fetch(POSTS_QUERY, {}, options));
export const getCategories = cache(() => client.fetch(CATEGORY_QUERY, {}, options));
// Share the post lookup between metadata and page rendering.
export const getPost = cache((slug) =>
  client.fetch(POST_BY_SLUG_QUERY, { slug }, options)
);

export const getAboutPosts = cache(() => client.fetch(ABOUT_POSTS_QUERY, {}, options));

// Portfolio also refreshes periodically while the webhook's document filter is updated.
const portfolioOptions = { ...options, next: { ...options.next, revalidate: 60 } };
export const getPortfolioProjects = cache(() => client.fetch(PORTFOLIO_QUERY, {}, portfolioOptions));
export const getPortfolioProject = cache((slug) => client.fetch(PORTFOLIO_BY_SLUG_QUERY, { slug }, portfolioOptions));
