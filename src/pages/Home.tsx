import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { Outlet } from "react-router-dom";
import { NewsFeed } from "@/features/news/components/NewsFeed";

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
            <NewsFeed />
        </main>
    );
}
