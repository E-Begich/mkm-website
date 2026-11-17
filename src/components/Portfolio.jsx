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
      </p>
    </section>
  );
}

export default Portfolio;
