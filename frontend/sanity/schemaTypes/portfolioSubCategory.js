const portfolioSubCategory = {
  name: "portfolioSubCategory",
  title: "Portfolio Subcategory",
  type: "document",
  fields: [
    {
      name: "title",
      title: "하위 카테고리 이름",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "parent",
      title: "상위 카테고리",
      type: "reference",
      to: [{ type: "portfolioCategory" }],
      description: "포트폴리오 상위 카테고리를 선택하거나 새로 만드세요.",
      validation: (Rule) => Rule.required(),
      options: { filter: '!(_id in path("drafts.**"))', disableNew: false },
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
  preview: { select: { title: "title", subtitle: "parent.title" } },
};

export default portfolioSubCategory;
