
import { useState } from "react";
import { ArrowRight, Paperclip } from "lucide-react";

import "../styles/RequestForm.css";

function RequestForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "Forma je pripremljena. Slanje upita ćemo povezati u sljedećem koraku."
    );
  };

  return (
    <section className="request-form-section" id="upit">
      <div className="request-form-container">
        <div className="request-form-heading">
          <span className="eyebrow dark-eyebrow">
            <span className="eyebrow-line" />
            ZATRAŽITE PONUDU
          </span>

          <h2>
            Recite nam što <span>trebate.</span>
          </h2>

          <p>
            Opišite nam svoju ideju ili projekt, a mi ćemo vam se
            javiti u najkraćem mogućem roku.
          </p>
        </div>

        <form className="request-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="request-name">Ime i prezime *</label>
              <input
                type="text"
                id="request-name"
                name="name"
                placeholder="Vaše ime i prezime"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="request-email">E-mail adresa *</label>
              <input
                type="email"
                id="request-email"
                name="email"
                placeholder="vas@email.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="request-phone">Broj telefona</label>
              <input
                type="tel"
                id="request-phone"
                name="phone"
                placeholder="Vaš broj telefona"
              />
            </div>

            <div className="form-field">
              <label htmlFor="request-service">Vrsta usluge *</label>
              <select
                id="request-service"
                name="service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Odaberite uslugu
                </option>
                <option value="Auto interijeri">Auto interijeri</option>
                <option value="Nautika">Nautika</option>
                <option value="Moto">Moto</option>
                <option value="Ostalo">Ostalo</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="request-message">Opis upita *</label>
            <textarea
              id="request-message"
              name="message"
              rows="5"
              placeholder="Opišite što biste željeli napraviti..."
              required
            />
          </div>

          <div className="form-field form-file-field">
            <label htmlFor="request-photos">
              <Paperclip size={18} />
              Dodajte fotografije
              <span>(opcionalno)</span>
            </label>

            <input
              type="file"
              id="request-photos"
              name="photos"
              accept="image/*"
              multiple
            />

            <small>
              Možete odabrati više fotografija koje prikazuju vaš projekt.
            </small>
          </div>

          <div className="request-form-submit">
            <button type="submit" className="button-primary">
              Pošaljite upit <ArrowRight size={17} />
            </button>

            <p className="form-note">* Obavezna polja</p>
          </div>

          {message && (
            <p className="form-status" role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default RequestForm;
