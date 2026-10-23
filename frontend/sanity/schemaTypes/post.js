import ContentEditorInput, { HighlightDecorator, TextColorAnnotation, HighlightAnnotation } from "../components/ContentEditorInput";

const imageSizeField = {
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
};

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
      components: { input: ContentEditorInput },

      of: [
        {
          type: "block",
          styles: [
            { title: "Normal text", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],

          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strikethrough", value: "strike-through" },
              { title: "Highlight", value: "highlight", component: HighlightDecorator },
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
                components: { annotation: TextColorAnnotation },
                title: "Text Color",
                type: "object",

                fields: [
                  {
                    name: "color",
                    title: "Color",
                    type: "string",

                    options: {
                      list: [
                        { title: "Red", value: "#c74650" },
                        { title: "Orange", value: "#c87845" },
                        { title: "Yellow", value: "#b78a2d" },
                        { title: "Green", value: "#648e49" },
                        { title: "Teal", value: "#3d9693" },
                        { title: "Sky", value: "#258fb5" },
                        { title: "Blue", value: "#527fc3" },
                        { title: "Purple", value: "#8871bd" },
                        { title: "Pink", value: "#b854a2" },
                        { title: "Gray", value: "#787b80" },
                      ],
                    },
                  },
                ],
              },

              {
                name: "backgroundColor",
                components: { annotation: HighlightAnnotation },
                title: "Highlight Color",
                type: "object",

                fields: [
                  {
                    name: "color",
                    title: "Color",
                    type: "string",

                    options: {
                      list: [
                        { title: "Red", value: "#efb4bb" },
                        { title: "Orange", value: "#edc2a1" },
                        { title: "Yellow", value: "#efdb9c" },
                        { title: "Green", value: "#c2d6b2" },
                        { title: "Teal", value: "#b1d6d2" },
                        { title: "Sky", value: "#aed7e7" },
                        { title: "Blue", value: "#bbceef" },
                        { title: "Purple", value: "#cbbfe7" },
                        { title: "Pink", value: "#e4bcda" },
                        { title: "Gray", value: "#d4d5d7" },
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
            imageSizeField,
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
            imageSizeField,
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
        {
          name: "memo",
          title: "메모",
          type: "object",
          fields: [
            {
              name: "text",
              title: "내용",
              type: "text",
              rows: 8,
              description: "흰색 박스에 표시할 메모를 작성하세요. 줄바꿈은 그대로 유지됩니다.",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { subtitle: "text" },
            prepare: ({ subtitle }) => ({ title: "메모", subtitle }),
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
            { type: "subCategory" },
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