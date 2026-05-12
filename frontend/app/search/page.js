import BlogList from "../../sections/blog/BlogList";
import SidePanel from "../../sections/blog/SidePanel";
import { POSTS_QUERY } from "../../sanity/queries";
import { client } from "../../sanity/client";

export const metadata = {
    title: "Search result | Ria Choi",
    description: "Search by tags and keywords",
};

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;

    const posts = await client.fetch(POSTS_QUERY);

    const keyword = params?.q?.toLowerCase().trim() || "";
    const selectedTag = params?.tag?.toLowerCase().trim() || "";
    const selectedCategory = params?.category?.toLowerCase().trim() || "";

    const filteredPosts = posts.filter((post) => {
        const keywordMatch = keyword
            ? post.title?.toLowerCase().includes(keyword) ||
            post.keyword?.toLowerCase().includes(keyword) ||
            post.categories?.some((category) =>
                category.title?.toLowerCase().includes(keyword)
            )
            : true;

        const tagMatch = selectedTag
            ? post.keyword?.toLowerCase().includes(selectedTag)
            : true;

        const categoryMatch = selectedCategory
            ? post.categories?.some(
                (category) => category.title?.toLowerCase() === selectedCategory
            )
            : true;

        return keywordMatch && tagMatch && categoryMatch;
    });

    const searchLabel =
        params?.q || params?.tag || params?.category || "all posts";

    return (
        <main className="min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
            <h1 className="text-7xl font-semibold mb-12">
                Search result for <span className="text-accent">{searchLabel}</span>
            </h1>

            <div className="w-full h-auto gap-8 flex flex-col md:flex-row">
                <BlogList posts={filteredPosts} />
                <div className="w-full md:w-2/4 xl:w-1/3 h-auto ">
                    <SidePanel posts={posts} />
                </div>
            </div>
        </main>
    );
}