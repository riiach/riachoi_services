export const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    content,
    featuredImage,
    featuredImageUrl,
    publishedAt,
    _updatedAt,
    keyword,
    seoTitle,
    seoDescription,
    pinned,
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current,
      seoTitle,
      seoDescription
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      photo,
      role,
      bio
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    content,
    featuredImage,
    featuredImageUrl,
    publishedAt,
    _updatedAt,
    keyword,
    seoTitle,
    seoDescription,
    "relatedContents": relatedContents[]->{
      _id,
      title,
      "slug": slug.current,
      summary,
      featuredImage,
      featuredImageUrl,
      publishedAt,
      keyword
    },
    pinned,
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current,
      seoTitle,
      seoDescription
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      photo,
      role,
      bio
    }
  }
`;

export const CATEGORY_QUERY = `*[_type == "category"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  heading,
  headingDescription,
  bannerImage,
  bannerImageUrl,
  "bannerImageAlt": bannerImage.alt
}`;