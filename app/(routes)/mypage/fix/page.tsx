import React from "react";
import Footer from "@/app/components/Footer";
import { Suspense } from "react";
import FixPage from "@/app/components/FixPage";

const page = () => {
    return (
        <>
            <Suspense>
                <FixPage />
            </Suspense>
            <Footer />
        </>
    );
}

export default page;