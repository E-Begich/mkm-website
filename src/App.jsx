
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Menu, Phone, Mail, X, MapPin } from 'lucide-react'
import { useState } from 'react'
import './App.css'
import Announcement from "./Announcement";


const navLinks = [
  { label: 'Početna', href: '#pocetna' },
  { label: 'O nama', href: '#o-nama' },
  { label: 'Usluge', href: '#usluge' },
  { label: 'Naši radovi', href: '#radovi' },
  { label: 'Kontakt', href: '#kontakt' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <Announcement />
      <header className="site-header">

        <a className="brand" href="#pocetna" aria-label="MKM početna">
          <img
            className="brand-logo"
            src="/images/logo.png"
            alt="MKM – tapetarska radionica"
          />
        </a>

        <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={link.href === '#pocetna' ? 'nav-link active' : 'nav-link'}
            >
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="#kontakt" onClick={() => setMenuOpen(false)}>
            <Phone size={15} />
            Kontaktirajte nas
            <ArrowRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

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

      <section className="portfolio" id="radovi">
        <div className="section-heading portfolio-heading">
          <div>
            <span className="eyebrow dark-eyebrow">
              <span className="eyebrow-line" />
              NAŠI RADOVI
            </span>
            <h2>Iz starog u posebno.</h2>
          </div>
          <p>Inspiracija za vaš sljedeći projekt.</p>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-image portfolio-one">
            <span>01 / Fotelje</span>
          </div>
          <div className="portfolio-image portfolio-two">
            <span>02 / Sofe</span>
          </div>
          <div className="portfolio-image portfolio-three">
            <span>03 / Detalji</span>
          </div>
        </div>
        <p className="portfolio-note">
          Fotografije su privremene i zamijenit ćemo ih stvarnim radovima MKM-a.
        </p>
      </section>


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

          <a href="mailto:info@mkm.hr" className="button-primary">
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


      <footer className="footer">
        <a
          className="brand footer-brand"
          href="#pocetna"
          aria-label="MKM početna"
        >
          <img
            className="brand-logo"
            src="/images/logo.png"
            alt="MKM – tapetarska radionica"
          />
        </a>

        <div className="footer-center">
          <p>
            © {new Date().getFullYear()} MKM – Tapetarska radionica.
            Sva prava pridržana.
          </p>
          <p className="footer-credit">
            Izrada web stranice: <span>E. Begic</span>
          </p>
        </div>

        <a href="#pocetna" className="back-top">
          POVRATAK NA VRH ↑
        </a>
      </footer>


    </main>
  )
}

export default App
