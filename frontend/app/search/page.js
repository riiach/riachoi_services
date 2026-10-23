import { getPosts } from "../../sanity/data";
import BlogList from "../../sections/blog/BlogList";
import SidePanel from "../../sections/blog/SidePanel";

export const metadata = {
    title: "Search result | Ria Choi",
    description: "Search by tags and keywords",
};

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;

    const posts = await getPosts();

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
                (category) => category.title?.toLowerCase() === selectedCategory || category.parent?.title?.toLowerCase() === selectedCategory
            )
            : true;

        return keywordMatch && tagMatch && categoryMatch;
    });

    const searchLabel =
        params?.q || params?.tag || params?.category || "all posts";

    return (
        <main className="min-h-screen px-4 pt-24 pb-4 xl:px-10 2xl:px-48 bg-background">
            <h1 className="text-7xl font-semibold mb-12">
                Search result for <span className="text-accent">{searchLabel}</span>
            </h1>

            <div className="grid w-full min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div className="order-1 min-w-0 md:order-2"><BlogList posts={filteredPosts} /></div>
                <div className="order-2 min-w-0 w-full md:order-1 md:self-stretch md:flex">
                    <SidePanel posts={posts} />
                </div>
            </div>
        </main>
    );
}