import WorkTypeInput from "../inputs/WorkTypeInput";

const workEntry = {
  name: "workEntry",
  title: "Work Type",
  type: "document",
  fields: [
    {
      name: "project",
      title: "Parent project",
      type: "reference",
      to: [{ type: "workProject" }],
      options: { disableNew: false },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "workType",
      title: "Work type",
      type: "string",
      description: "Choose a work type defined on the selected parent project.",
      components: { input: WorkTypeInput },
      validation: (Rule) => Rule.required(),
    },
    { name: "title", title: "Optional card title", type: "string", description: "When empty, the work type becomes the card title." },
    { name: "previewImage", title: "Card image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] },
    { name: "description", title: "Work description", type: "text", rows: 5 },
    { name: "duration", title: "Time spent", type: "string", description: "Optional, e.g. 2 weeks or 18 hours." },
    { name: "price", title: "Price", type: "number", validation: (Rule) => Rule.min(0) },
    {
      name: "currency", title: "Currency", type: "string", initialValue: "USD",
      options: { list: [{ title: "USD", value: "USD" }, { title: "KRW", value: "KRW" }, { title: "EUR", value: "EUR" }, { title: "GBP", value: "GBP" }] },
    },
    { name: "client", title: "Client", type: "string" },
    { name: "order", title: "Display order", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) },
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "workType", subtitle: "project.title", media: "previewImage" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Choose a work type", subtitle, media }),
  },
};

export default workEntry;
