import "../styles/Contact.css";

import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  return (
    <section className="contact" id="kontakt">
      <div className="contact-content">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          VAŠA IDEJA, NAŠ SLJEDEĆI PROJEKT
        </span>

        <h2>
          Vrijeme je za
          <br />
          <span>novi izgled.</span>
        </h2>

        <p>
          Svaki projekt počinje dobrom idejom. Recite nam svoju,
          a mi ćemo je pretvoriti u stvarnost.
        </p>

        <a href="mailto:mkm@mkm-ri.com" className="button-primary">
          Zatražite ponudu <ArrowRight size={17} />
        </a>
      </div>

      <div className="contact-location">
        <div className="contact-details">
          <div className="contact-item">
            <MapPin size={21} />
            <div>
              <h3>Posjetite nas</h3>
              <p>Tibljaška cesta 15, Rijeka</p>
            </div>
          </div>

          <div className="contact-item">
            <Phone size={21} />
            <div>
              <h3>Kontaktirajte nas</h3>
              <a href="tel:+38551267057">051-267-057</a>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={21} />
            <div>
              <h3>Pišite nam</h3>
              <a href="mailto:mkm@mkm-ri.com">mkm@mkm-ri.com</a>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            src="https://maps.google.com/maps?q=Tiblja%C5%A1ka%20cesta%2015%2C%20Rijeka%2C%20Croatia&output=embed"
            title="MKM – lokacija radionice"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <a
          className="contact-directions"
          href="https://www.google.com/maps/search/?api=1&query=Tiblja%C5%A1ka%20cesta%2015%2C%20Rijeka%2C%20Croatia"
          target="_blank"
          rel="noreferrer"
        >
          Otvori navigaciju <ArrowRight size={16} />
        </a>
      </div>

      <div className="contact-decoration">
        <img
          src="/images/logo.png"
          alt=""
          className="contact-logo"
        />
      </div>
    </section>
  );
}

export default Contact;
