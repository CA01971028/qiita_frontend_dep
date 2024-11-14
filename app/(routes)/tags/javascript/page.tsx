import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h1 className="flex-grow">JavaScriptのページです!</h1>
      <Footer />
    </div>
  );
}

export default page;
