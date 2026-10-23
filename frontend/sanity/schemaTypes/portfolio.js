import post from "./post";

const portfolio = {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    {
      name: "thumbnails",
      title: "썸네일 사진",
      description: "최대 4장까지 추가할 수 있습니다. 사진 순서대로 호버 전환 및 모바일 스택에 표시됩니다.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "tags", title: "사용 툴", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, description: "예: Figma, Next.js, Adobe Photoshop. 입력한 툴은 카드 태그와 상단 필터에 표시됩니다.", validation: (Rule) => Rule.unique() },
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
  preview: { select: { title: "title", subtitle: "projectDate", media: "thumbnails.0" } },
};

export default portfolio;
