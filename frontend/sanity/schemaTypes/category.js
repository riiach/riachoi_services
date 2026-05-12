export default {
  name: "category",
  title: "Category",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",

      validation: (Rule) =>
        Rule.required(), // Category title is required
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "title",
      },

      validation: (Rule) =>
        Rule.required(), // Slug is required
    },

    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number appears first.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    },

    {
      name: "bannerImage",
      title: "Banner Image Upload",
      type: "image",

      options: {
        hotspot: true,
      },

      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },

    {
      name: "bannerImageUrl",
      title: "Banner Image URL",
      type: "url",
    },

    {
      name: "heading",
      title: "Heading",
      type: "string",
    },

    {
      name: "headingDescription",
      title: "Heading Description",
      type: "text",
      rows: 3,
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