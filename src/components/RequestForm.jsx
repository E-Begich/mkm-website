
import { useState } from "react";
import {
  ArrowRight,
  Paperclip,
  X,
  ImagePlus,
} from "lucide-react";

import "../styles/RequestForm.css";

function RequestForm() {
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;
    const maxPhotos = 5;

    const validFiles = selectedFiles.filter((file) => {
      return allowedTypes.includes(file.type) && file.size <= maxSize;
    });

    const availableSlots = maxPhotos - photos.length;
    const newPhotos = validFiles.slice(0, availableSlots);

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    event.target.value = "";

    if (validFiles.length !== selectedFiles.length) {
      setMessage("Neke fotografije nisu dodane. Provjerite format i veličinu (maks. 5 MB).");
    } else if (selectedFiles.length > availableSlots) {
      setMessage("Možete dodati najviše 5 fotografija.");
    } else {
      setMessage("");
    }
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, i) => i !== index)
    );
  };

  /*const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Forma je spremna. Slanje ćemo povezati s PHP-om u sljedećem koraku.");
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    //console.log("Honeypot vrijednost:", formData.get("website"));

    // Dodavanje fotografija
    photos.forEach((photo) => {
      formData.append("photos[]", photo);
    });

    setMessage("Slanje upita u tijeku...");

    try {
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      //console.log("PHP odgovor:", result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Slanje upita nije uspjelo.");
      }

      setMessage(result.message);

      form.reset();
      setPhotos([]);

    } catch (error) {
      setMessage(error.message || "Došlo je do pogreške. Pokušajte ponovno.");
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website">Ostavite ovo polje prazno</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex="-1"
              autoComplete="new-password"
              readOnly
            />
          </div>

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
                <option value="Tapeciranje namještaja">
                  Tapeciranje namještaja
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
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotoChange}
              disabled={photos.length >= 5}
            />

            <small>
              Do 5 fotografija, maksimalno 5 MB po fotografiji (JPG, PNG, WebP).
            </small>

            {photos.length > 0 && (
              <div className="photo-preview-list">
                {photos.map((photo, index) => (
                  <div className="photo-preview" key={`${photo.name}-${index}`}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Odabrana fotografija ${index + 1}`}
                    />

                    <button
                      type="button"
                      className="remove-photo"
                      onClick={() => removePhoto(index)}
                      aria-label={`Ukloni fotografiju ${photo.name}`}
                    >
                      <X size={16} />
                    </button>

                    <span>{photo.name}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="photo-count">
              {photos.length} / 5 fotografija odabrano
            </p>
          </div>

          <div className="request-form-submit">
            <button
              type="submit"
              className="button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Slanje upita..."
              ) : (
                <>
                  Pošaljite upit <ArrowRight size={17} />
                </>
              )}
            </button>

            <p className="form-note">* Obavezna polja</p>
          </div>

          {message && (
            <p
              className={`form-status ${message.includes("uspješno") ? "success" :
                message.includes("Slanje upita") ? "loading" : "error"
                }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div >
    </section >
  );
}

export default RequestForm;
