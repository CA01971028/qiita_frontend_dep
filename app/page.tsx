'use client'
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Homepage />
      </main>
      <Footer />
    </div>
  );
}
