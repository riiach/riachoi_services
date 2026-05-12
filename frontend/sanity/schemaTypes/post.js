export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",

      validation: (Rule) =>
        Rule.required(), // Post title is required
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "title",
        maxLength: 96,
      },

      validation: (Rule) =>
        Rule.required(), // Slug is required
    },

    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    },

    {
      name: "content",
      title: "Content",
      type: "array",

      of: [
        {
          type: "block", // Rich text editor block
        },

        {
          type: "image", // Inline content image

          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",

      options: {
        hotspot: true,
      },
    },

    {
      name: "featuredImageUrl",
      title: "Featured Image URL",
      type: "url",
    },

    {
      name: "categories",
      title: "Categories",
      type: "array",

      of: [
        {
          type: "reference",

          to: [
            {
              type: "category",
            },
          ],

          weak: true, // Prevents publish issues with drafts/deletions

          options: {
            filter: '!(_id in path("drafts.**"))', // Prevents selecting draft categories
          },
        },
      ],
    },

    {
      name: "author",
      title: "Author",
      type: "reference",

      to: [
        {
          type: "author",
        },
      ],

      weak: true,

      options: {
        filter: '!(_id in path("drafts.**"))',
      },
    },

    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },

    {
      name: "keyword",
      title: "Keyword",
      type: "string",
    },

    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },

    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    },

    {
      name: "pinned",
      title: "Pinned",
      type: "boolean",

      initialValue: false,
    },

    {
      name: "relatedContents",
      title: "Related Contents",
      type: "array",
      description: "Add related posts for this content.",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
          weak: true,
          options: {
            filter: '!(_id in path("drafts.**"))',
          },
        },
      ],
    },
  ],
};