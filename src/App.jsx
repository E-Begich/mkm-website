import { useState } from "react";

import "./styles/global.css";

import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import GalleryModal from "./components/GalleryModal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { portfolioCategories } from "./data/portfolioData";


function App() {

  const [activeCategory, setActiveCategory] = useState(null);

  const openGallery = (index) => setActiveCategory(index);
  const closeGallery = () => setActiveCategory(null);

  return (
    <main>
      <Announcement />
      <Navbar />
      <Hero />
      <Intro />
      <Services />

      <Portfolio
        categories={portfolioCategories}
        onOpenGallery={openGallery}
      />

      {activeCategory !== null && (
        <GalleryModal
          category={portfolioCategories[activeCategory]}
          onClose={closeGallery}
        />
      )}

      <Contact />
      <Footer />
    </main>
  );
}

export default App
