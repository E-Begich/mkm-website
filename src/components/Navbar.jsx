import "../styles/Navbar.css";

import { useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

const navLinks = [
  { label: "Početna", href: "#pocetna" },
  { label: "O nama", href: "#o-nama" },
  { label: "Usluge", href: "#usluge" },
  { label: "Naši radovi", href: "#radovi" },
  { label: "Kontakt", href: "#kontakt" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <a className="brand" href="#pocetna" aria-label="MKM početna">
        <img
          className="brand-logo"
          src="/images/logo.png"
          alt="MKM – tapetarska radionica"
        />
      </a>

      <nav
        className={
          menuOpen ? "navigation navigation-open" : "navigation"
        }
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className={
              link.href === "#pocetna" ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </a>
        ))}

        <a className="nav-contact" href="#kontakt" onClick={closeMenu}>
          <Phone size={15} />
          Kontaktirajte nas
          <ArrowRight size={15} />
        </a>
      </nav>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default Navbar;
