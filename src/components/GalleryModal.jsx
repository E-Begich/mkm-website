import "../styles/GalleryModal.css";

import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function GalleryModal({ category, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeThumbnailRef = useRef(null);

  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeImageIndex]);

  if (!category) return null;

  const images = category.images;

  return (
    <div
      className="gallery-modal"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="gallery-modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={`Galerija: ${category.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gallery-close"
          onClick={onClose}
          aria-label="Zatvori galeriju"
        >
          <X size={26} />
        </button>

        <p className="gallery-modal-title">{category.title}</p>

        {images.length > 0 && (
          <img
            className="gallery-modal-image"
            src={images[activeImageIndex]}
            alt={`Radovi MKM – ${category.title}`}
          />
        )}

        {images.length > 1 && (
          <div className="gallery-controls">
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((current) =>
                  current === 0 ? images.length - 1 : current - 1
                )
              }
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft size={24} />
            </button>

            <span>
              {activeImageIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((current) =>
                  (current + 1) % images.length
                )
              }
              aria-label="Sljedeća fotografija"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="gallery-thumbnails">
            {images.map((image, index) => (
              <button
                key={image}
                ref={
                  activeImageIndex === index
                    ? activeThumbnailRef
                    : null
                }
                type="button"
                className={`gallery-thumbnail ${
                  activeImageIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Otvori fotografiju ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryModal;
