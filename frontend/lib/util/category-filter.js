export function matchesCategory(post, parent = "all", subCategory = null) {
  const categories = post.categories || [];
  if (subCategory) return categories.some((category) => category?._id === subCategory);
  return parent === "all" || categories.some((category) => category?.title === parent || category?.parent?.title === parent);
}
