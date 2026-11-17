import "../styles/Footer.css";

function Footer() {
  return (
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
  );
}

export default Footer;
