import "../styles/Services.css";

import { ArrowRight } from "lucide-react";

function Services() {
  return (
    <section className="services" id="usluge">
      <div className="section-heading">
        <div>
          <span className="eyebrow dark-eyebrow">
            <span className="eyebrow-line" />
            ŠTO RADIMO
          </span>
          <h2>Nov izgled. Isti karakter.</h2>
        </div>
      </div>

      <div className="service-grid">
        <article className="service-card">
          <span className="service-number">01</span>
          <h3>Tapeciranje namještaja</h3>
          <p>Obnova stolica, fotelja, sofa i drugih komada namještaja.</p>
          <a href="#kontakt" aria-label="Upit za tapeciranje namještaja">
            <ArrowRight />
          </a>
        </article>

        <article className="service-card">
          <span className="service-number">02</span>
          <h3>Obnova i popravci</h3>
          <p>Pažnja posvećena detaljima i udobnosti vašeg namještaja.</p>
          <a href="#kontakt" aria-label="Upit za obnovu namještaja">
            <ArrowRight />
          </a>
        </article>

        <article className="service-card">
          <span className="service-number">03</span>
          <h3>Novi materijali</h3>
          <p>Odabir tkanina i završnih detalja prema vašem ukusu.</p>
          <a href="#kontakt" aria-label="Upit za materijale">
            <ArrowRight />
          </a>
        </article>
      </div>
    </section>
  );
}

export default Services;
