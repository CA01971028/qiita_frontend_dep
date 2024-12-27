import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Bookmarks from "./Bookmarks";

const page = () => {
    return (
        <>
            <Header/>
            <Bookmarks/>
            <Footer/>
        </>
    );
}

export default page;