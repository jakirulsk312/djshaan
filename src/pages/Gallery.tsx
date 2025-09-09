import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";

type Image = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
};

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data.data || []);
    } catch {
      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) setModalIndex((modalIndex - 1 + images.length) % images.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) setModalIndex((modalIndex + 1) % images.length);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-36 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
            Gallery
          </h1>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading images...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground">No images found.</p>
          ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {images.map((img, index) => (
    <div
      key={img._id}
      className="relative group cursor-pointer overflow-visible rounded-xl shadow-lg"
      onClick={() => openModal(index)}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={img.imageUrl}
          alt={img.title}
          className="w-full h-56 sm:h-64 md:h-72 object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-2"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground">{img.title}</h3>
        {img.description && <p className="text-muted-foreground">{img.description}</p>}
      </div>
    </div>
  ))}
</div>

          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full p-4">
            <img
              src={images[modalIndex].imageUrl}
              alt={images[modalIndex].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <p className="text-white mt-2 text-center">{images[modalIndex].title}</p>
            {images[modalIndex].description && (
              <p className="text-gray-300 text-center">{images[modalIndex].description}</p>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
            >
              &times;
            </button>

            {/* Previous Button */}
            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-gray-300"
            >
              &#10094;
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-gray-300"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;
