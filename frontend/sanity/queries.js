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

// Portfolio taxonomy is independent of the blog's category and subCategory documents.
export const PORTFOLIO_CATEGORY_QUERY = `*[_type in ["portfolioCategory", "portfolioSubCategory"]] | order(order asc, title asc) {
  _id,
  _type,
  "parent": parent->{_id, title},
  title
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
  isOngoing,
  "categories": select(
    defined(categories) => array::compact(categories[]->{_id, title}),
    category->_type == "portfolioCategory" => array::compact([category->{_id, title}]),
    []
  ),
  "subCategory": select(
    subCategory->_type == "portfolioSubCategory" =>
      subCategory->{_id, "parentId": parent._ref}
  ),
  thumbnails[]{_type, _key, url, alt, asset, crop, hotspot}
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

// Work is separate from Portfolio. Deliverables are fetched with their parent project.
const WORK_FIELDS = `
  _id, title, "slug": slug.current, folderColor, workTypes, order,
  thumbnails[]{_key, alt, "url": asset->url},
  "entries": *[_type == "workEntry" && project._ref == ^._id] | order(order asc, _createdAt asc) {
    _id, title, workType, description, duration, price, currency, client, order,
    "image": previewImage{alt, "url": asset->url}
  }
`;

export const WORK_PROJECTS_QUERY = `
  *[_type == "workProject" && defined(slug.current)] | order(order asc, _createdAt desc) {
    ${WORK_FIELDS}
  }
`;

export const WORK_PROJECT_QUERY = `
  *[_type == "workProject" && slug.current == $slug][0] {
    ${WORK_FIELDS}
  }
`;
