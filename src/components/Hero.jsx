import "../styles/Hero.css";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="pocetna">
      <div className="hero-image" />

      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow-line" />
          UMJETNOST TAPECIRANJA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Svaki interijer.
          <br />
          <span>Nova razina udobnosti.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Specijalizirana tapetarska rješenja za plovila, motocikle i automobile, uz izradu po mjeri i
          <br className="desktop-break" />
          beskompromisnu pažnju prema detaljima.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a href="#radovi" className="button-primary">
            Otkrijte naše radove <ArrowRight size={17} />
          </a>
          <a href="#o-nama" className="button-text">
            Upoznajte MKM
          </a>
        </motion.div>
      </div>

      <div className="hero-bottom">
        <span>DETALJI ČINE RAZLIKU</span>
        <a href="#o-nama" aria-label="Pomakni se na sljedeći dio">
          <ArrowDown size={19} />
        </a>
        <span className="hero-index"></span>
      </div>
    </section>
  );
}

export default Hero;
