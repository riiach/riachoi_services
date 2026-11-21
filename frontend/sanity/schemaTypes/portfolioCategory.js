const portfolioCategory = {
  name: "portfolioCategory",
  title: "Portfolio Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "카테고리 이름",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "정렬 순서",
      type: "number",
      description: "숫자가 작을수록 앞에 표시됩니다.",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    },
  ],
  preview: { select: { title: "title" } },
};

export default portfolioCategory;
