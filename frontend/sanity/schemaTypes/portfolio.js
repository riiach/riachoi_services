import post from "./post";

const publishedOnly = '!(_id in path("drafts.**"))';

const portfolio = {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    {
      name: "thumbnails",
      title: "썸네일 사진",
      description: "업로드 이미지와 사진 URL을 섞어서 최대 4장까지 추가할 수 있습니다. 입력한 순서대로 표시됩니다.",
      type: "array",
      of: [
        { type: "image", title: "사진 업로드", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] },
        {
          name: "imageUrl",
          title: "사진 URL",
          type: "object",
          fields: [
            { name: "url", title: "사진 URL", type: "url", description: "이미지 파일의 직접 링크를 입력하세요.", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }) },
            { name: "alt", title: "Alt text", type: "string" },
          ],
          preview: { select: { url: "url", alt: "alt" }, prepare: ({ url, alt }) => ({ title: alt || "사진 URL", subtitle: url }) },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "categories",
      title: "상위 카테고리 (다중 선택)",
      type: "array",
      description: "여러 상위 카테고리를 추가할 수 있습니다. 추가하기에서 카테고리를 선택하거나 새로 만드세요.",
      of: [{
        type: "reference",
        to: [{ type: "portfolioCategory" }],
        options: { filter: publishedOnly, disableNew: false },
      }],
      validation: (Rule) => Rule.custom((items) => {
        const refs = (items || []).map((item) => item?._ref).filter(Boolean);
        return refs.length === new Set(refs).size || "같은 상위 카테고리를 중복 선택할 수 없습니다.";
      }),
    },
    // Keep single-category references from older Portfolio documents for backwards compatibility.
    // An explicitly set categories array (including []) overrides this legacy field.
    {
      name: "category",
      title: "이전 상위 카테고리",
      type: "reference",
      to: [{ type: "portfolioCategory" }],
      hidden: true,
    },
    {
      name: "subCategory",
      title: "하위 카테고리",
      type: "reference",
      to: [{ type: "portfolioSubCategory" }],
      description: "선택한 상위 카테고리 중 하나에 속한 하위 카테고리를 하나 선택하거나 새로 추가하세요.",
      readOnly: ({ document, value }) => {
        const parentIds = Array.isArray(document?.categories)
          ? document.categories.map((item) => item?._ref).filter(Boolean)
          : [document?.category?._ref].filter(Boolean);
        return parentIds.length === 0 && !value;
      },
      options: {
        disableNew: false,
        filter: ({ document }) => {
          const parentIds = Array.isArray(document?.categories)
            ? document.categories.map((item) => item?._ref).filter(Boolean)
            : [document?.category?._ref].filter(Boolean);
          return {
            filter: `${publishedOnly} && defined(parent._ref) && parent._ref in $parentIds`,
            params: { parentIds },
          };
        },
      },
      validation: (Rule) => Rule.custom(async (value, { document, getClient }) => {
        if (!value?._ref) return true;
        const parentIds = Array.isArray(document?.categories)
          ? document.categories.map((item) => item?._ref).filter(Boolean)
          : [document?.category?._ref].filter(Boolean);
        if (!parentIds.length) return "상위 카테고리를 먼저 선택하거나 하위 카테고리를 지워 주세요.";
        const client = getClient({ apiVersion: "2025-02-19" }).withConfig({ perspective: "published", useCdn: false });
        const actualParentId = await client.fetch('*[_type == "portfolioSubCategory" && _id == $id][0].parent._ref', { id: value._ref });
        return parentIds.includes(actualParentId) || "선택한 상위 카테고리 중 하나에 속한 하위 카테고리를 선택해 주세요.";
      }),
    },
    { name: "tags", title: "사용 툴", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: "예: Figma, Next.js, Adobe Photoshop. 입력한 툴은 카드 태그에 표시됩니다.", validation: (Rule) => Rule.unique() },
    { name: "link", title: "링크", type: "url", description: "카드를 클릭하면 이동할 주소입니다. https:// 주소 또는 /blog/... 같은 사이트 내부 경로를 입력하세요.", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"], allowRelative: true }) },
    { name: "isTeam", title: "Team", type: "boolean", options: { layout: "checkbox" }, initialValue: false, description: "협업 프로젝트라면 체크하세요." },
    { name: "isBootCamp", title: "Boot Camp", type: "boolean", options: { layout: "checkbox" }, initialValue: false, description: "부트캠프 프로젝트라면 체크하세요." },
    { name: "projectDate", title: "시작 날짜", type: "date", description: "Ongoing 여부와 관계없이 이 날짜를 기준으로 연도와 월별로 구분합니다.", validation: (Rule) => Rule.required() },
    { name: "isOngoing", title: "Ongoing", type: "boolean", options: { layout: "checkbox" }, initialValue: false, description: "진행 중인 프로젝트라면 체크하세요. 상태는 따로 저장되며 시작 날짜에 따른 분류는 유지됩니다.", },
    // Preserve previously published project URLs and bodies without showing the article editor.
    { name: "slug", title: "Legacy project URL", type: "slug", options: { source: "title", maxLength: 96 }, hidden: true },
    { name: "summary", title: "Summary", type: "text", hidden: true },
    { ...post.fields.find((field) => field.name === "content"), hidden: true },
  ],
  orderings: [{ title: "Newest projects", name: "projectDateDesc", by: [{ field: "projectDate", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "projectDate", media: "thumbnails.0" },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media: media?.asset ? media : undefined }),
  },
};

export default portfolio;
