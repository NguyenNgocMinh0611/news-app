import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";

export function Home(){
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}