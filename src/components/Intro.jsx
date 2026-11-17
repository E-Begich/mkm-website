import "../styles/Intro.css";

import { ArrowRight } from "lucide-react";

function Intro() {
  return (
    <section className="intro" id="o-nama">
      <div className="intro-label">
        <span className="eyebrow-line" />
        <span>O NAMA</span>
      </div>

      <div className="intro-content">
        <h2>
          Iskustvo od 2007.
          <br />
          <span>Nova priča za svaki komad.</span>
        </h2>

        <p>
          MKM je tapetarska radionica iz Rijeke koja se od 2007.
          godine bavi tapeciranjem namještaja, uređenjem interijera
          vozila i plovila te izradom auto presvlaka i tepiha.
        </p>

        <p>
          Svakom projektu pristupamo individualno, s naglaskom na
          kvalitetu izrade, pažnju prema detaljima i rješenja
          prilagođena željama naših klijenata. Naš je cilj pružiti
          profesionalnu uslugu i kvalitetan rezultat po pristupačnim
          cijenama.
        </p>

        <a href="#usluge" className="text-link">
          Saznajte više o našim uslugama <ArrowRight size={17} />
        </a>
      </div>

      <div className="intro-decoration">
        <img
          src="/images/logo.png"
          alt="MKM – tapetarska radionica"
          className="intro-logo"
        />
      </div>
    </section>
  );
}

export default Intro;
