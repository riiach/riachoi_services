import post from "./post";

const portfolio = {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    { name: "title", title: "Project name", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "URL", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "projectDate", title: "Project date", type: "date", description: "Projects are grouped by this year and month.", validation: (Rule) => Rule.required() },
    { name: "summary", title: "Summary", type: "text", rows: 3 },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: "These tags also appear in the portfolio filter. Spaces inside a tag are preserved.", validation: (Rule) => Rule.unique() },
    {
      name: "thumbnails",
      title: "Thumbnails",
      description: "Add 1–4 images. Their order controls the hover slideshow and mobile stack.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    // Share the blog's editor, including headings, code, tables and memos.
    post.fields.find((field) => field.name === "content"),
  ],
  orderings: [{ title: "Newest projects", name: "projectDateDesc", by: [{ field: "projectDate", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "projectDate", media: "thumbnails.0" } },
};

export default portfolio;
