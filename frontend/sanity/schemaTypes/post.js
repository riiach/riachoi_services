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
          type: "block",

          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Highlight", value: "highlight" },
                { title: "Code", value: "code" },
            ],

            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",

                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                  {
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },

              {
                name: "textColor",
                title: "Text Color",
                type: "object",

                fields: [
                  {
                    name: "color",
                    title: "Color",
                    type: "string",

                    options: {
                      list: [
                        { title: "Dark", value: "#333333" },
                        { title: "Pink", value: "#FE257B" },
                        { title: "Gray", value: "#6A7282" },
                        { title: "Black", value: "#111111" },
                      ],
                    },
                  },
                ],
              },

              {
                name: "backgroundColor",
                title: "Highlight Color",
                type: "object",

                fields: [
                  {
                    name: "color",
                    title: "Color",
                    type: "string",

                    options: {
                      list: [
                        { title: "Light Gray", value: "#eeeeee" },
                        { title: "Pink", value: "#FE257B" },
                        { title: "Yellow", value: "#FFFF83"},
                        { title: "Purple", value: "#efc8ff"}
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        {
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
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "size",
              title: "Image Size",
              type: "string",
              initialValue: "full",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                  { title: "Full", value: "full" },
                ],
                layout: "radio",
              },
            },
          ],
        },
        {
          name: "gif",
          title: "GIF",
          type: "image",
          options: { accept: "image/gif" },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
          {
              type: "code",
              title: "Code Snippet",
              options: {
                  language: "javascript",
                  languageAlternatives: [
                      { title: "JavaScript", value: "javascript" },
                      { title: "TypeScript", value: "typescript" },
                      { title: "TSX", value: "tsx" },
                      { title: "Python", value: "python" },
                      { title: "SQL", value: "sql" },
                      { title: "PHP", value: "php" },
                      { title: "C++", value: "cpp" },
                      { title: "YAML", value: "yaml" },
                      { title: "Java", value: "java" },
                      { title: "JSX", value: "jsx" },
                      { title: "CSS", value: "css" },
                      { title: "HTML", value: "html" },
                      { title: "Bash", value: "bash" },
                      { title: "JSON", value: "json" },
                  ],
              },
          },
        {
          name: "htmlTable",
          title: "Table (HTML)",
          type: "object",
          fields: [
            {
              name: "html",
              title: "Table HTML",
              type: "text",
              rows: 12,
              description: "Paste <table> HTML. Supports caption, thead, tbody, tfoot, tr, th, td, colspan and rowspan. Scripts and custom styles are ignored.",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { subtitle: "html" },
            prepare: ({ subtitle }) => ({ title: "Table (HTML)", subtitle }),
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
      description: "Separate tags with commas. Example: Semantic Search, React, API",
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