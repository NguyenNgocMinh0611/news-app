import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { ArticleListDemo } from "@/features/news/components/ArticleListDemo";

export function Home(){
    return (
        <>
        <Header />
        <main className="container">
            <ArticleListDemo />
        </main>
        <Footer />
        </>
    )
}