export default {
  name: "subCategory",
  title: "Sub Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() },
    {
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Choose the top-level category this subcategory belongs to.",
      validation: (Rule) => Rule.required(),
      options: { filter: '!(_id in path("drafts.**"))' },
    },
    { name: "order", title: "Order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) },
  ],
  preview: { select: { title: "title", subtitle: "parent.title" } },
};
