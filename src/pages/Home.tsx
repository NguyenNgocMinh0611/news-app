import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { NewsFeed } from "@/features/news/components/NewsFeed";

export function Home(){
    return (
        <>
        <Header />
        <main className="container">
            <NewsFeed />
        </main>
        <Footer />
        </>
    )
}
