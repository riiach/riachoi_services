export default {
  name: "author",
  title: "Author",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",

      validation: (Rule) =>
        Rule.required(), // Author name is required
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "name",
      },

      validation: (Rule) =>
        Rule.required(), // Slug is required
    },

    {
      name: "photo",
      title: "Photo",
      type: "image",

      options: {
        hotspot: true,
      },
    },

    {
      name: "role",
      title: "Role",
      type: "string",
    },

    {
      name: "bio",
      title: "Bio",
      type: "array",

      of: [
        {
          type: "block",
        },
      ],
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
  ],
};