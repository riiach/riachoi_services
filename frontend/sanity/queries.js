export const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
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
      _type,
      "parent": parent->{_id, title, "slug": slug.current},
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
      _type,
      "parent": parent->{_id, title, "slug": slug.current},
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

export const CATEGORY_QUERY = `*[_type in ["category", "subCategory"]] | order(order asc, title asc){
  _id,
  _type,
  "parent": parent->{_id, title, "slug": slug.current},
  title,
  "slug": slug.current,
  heading,
  headingDescription,
  bannerImage,
  bannerImageUrl,
  "bannerImageAlt": bannerImage.alt
}`;

// About uses full article bodies, without fetching unrelated blog posts.
export const ABOUT_POSTS_QUERY = POST_BY_SLUG_QUERY.replace(
  '*[_type == "post" && slug.current == $slug][0]',
  '*[_type == "post" && references(*[_type in ["category", "subCategory"] && (lower(title) == "about me" || slug.current == "about-me")]._id)] | order(publishedAt desc)'
);

const PORTFOLIO_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  projectDate,
  summary,
  tags,
  link,
  isTeam,
  isBootCamp,
  thumbnails[]{_key, alt, asset, crop, hotspot}
`;

export const PORTFOLIO_QUERY = `
  *[_type == "portfolio" && (defined(link) || defined(slug.current))] | order(projectDate desc) {
    ${PORTFOLIO_FIELDS}
  }
`;

export const PORTFOLIO_BY_SLUG_QUERY = `
  *[_type == "portfolio" && slug.current == $slug][0] {
    ${PORTFOLIO_FIELDS},
    content
  }
`;
