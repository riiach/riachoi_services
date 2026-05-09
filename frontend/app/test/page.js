import BlogBanner from "../../components/card/BlogBanner"
import Category from "../../components/Category"
import BlogList from "../sections/blog/BlogList"
import SidePanel from "../sections/blog/SidePanel"

export default function Test() {
  return (
    <main className="min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
      <Category />
      <BlogBanner />
      <div className="w-full h-auto gap-8 flex flex-col md:flex-row">
        <BlogList />
        <SidePanel />
      </div>
    </main>
  )
}