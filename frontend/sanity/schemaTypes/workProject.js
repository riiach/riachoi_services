const workProject = {
  name: "workProject",
  title: "Work Project",
  type: "document",
  fields: [
    { name: "title", title: "Project name", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    {
      name: "thumbnails",
      title: "Folder thumbnails (0–3)",
      description: "These are the images peeking out of the folder. Only the first three are ever shown.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
      validation: (Rule) => Rule.max(3),
    },
    {
      name: "workTypes",
      title: "Work types",
      description: "Create the work categories for this project (e.g. Email, Website, Brand System). These become the dropdown choices in Work → Work Types.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (Rule) => Rule.unique(),
    },
    {
      name: "folderColor",
      title: "Glassy folder color",
      type: "string",
      options: { layout: "radio", list: [
        { title: "Sage fog", value: "sage" },
        { title: "Blue fog", value: "blue" },
        { title: "Rose fog", value: "rose" },
        { title: "Lavender fog", value: "lavender" },
        { title: "Amber fog", value: "amber" },
      ] },
      initialValue: "sage",
    },
    { name: "order", title: "Display order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) },
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", media: "thumbnails.0", subtitle: "slug.current" },
    prepare: ({ title, media, subtitle }) => ({ title, media, subtitle }),
  },
};

export default workProject;
