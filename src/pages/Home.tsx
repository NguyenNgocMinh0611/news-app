import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { ArticleListDemo } from "@/features/news/components/ArticleListDemo";
import { Outlet } from "react-router-dom";

export function Home(){
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}
export function HomePage() {
    return (
        <main className="container">
            <ArticleListDemo />
        </main>
    );
}