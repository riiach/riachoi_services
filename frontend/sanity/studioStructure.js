// Keep portfolio taxonomy inside its own Studio section, separate from blog categories.
export const studioStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("portfolio-section")
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio")
            .items([
              S.documentTypeListItem("portfolio").title("Projects"),
              S.documentTypeListItem("portfolioCategory").title("Categories"),
              S.documentTypeListItem("portfolioSubCategory").title("Subcategories"),
            ])
        ),
      S.listItem()
        .id("work-section")
        .title("Work")
        .child(
          S.list()
            .title("Work")
            .items([
              S.documentTypeListItem("workProject").title("Projects"),
              S.documentTypeListItem("workEntry").title("Project Detail"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("category").title("Blog Categories"),
      S.documentTypeListItem("subCategory").title("Blog Subcategories"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
