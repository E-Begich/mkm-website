import "../styles/Portfolio.css";

function Portfolio({ categories, onOpenGallery }) {
  return (
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
        {categories.map((category, index) => (
          <button
            key={category.title}
            type="button"
            className={`portfolio-image portfolio-${index + 1}`}
            style={
              category.cover
                ? { backgroundImage: `url("${category.cover}")` }
                : undefined
            }
            onClick={() => onOpenGallery(index)}
            disabled={!category.cover}
            aria-label={`Otvori galeriju: ${category.title}`}
          >
            <span>
              {String(index + 1).padStart(2, "0")} / {category.title}
            </span>
          </button>
        ))}
      </div>

      <p className="portfolio-note">
        Fotografije su privremene i zamijenit ćemo ih stvarnim radovima MKM-a.
      </p>
    </section>
  );
}

export default Portfolio;
