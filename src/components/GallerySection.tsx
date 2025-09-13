
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

interface Image {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

const GallerySection = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIndex, setModalIndex] = useState<number | null>(null); // Lightbox modal

  useEffect(() => {
    const fetchLatestImages = async () => {
      try {
        setLoading(true);
        const res = await api.get("/gallery");
        const allImages: Image[] = res.data.data || [];
        setImages(allImages.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestImages();
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
    <section className="py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent mb-3">
          📸 Gallery Highlights
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto italic">
          Handpicked <span className="text-lime-500 font-medium">Images</span> from our gallery 🎶
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <p className="text-muted-foreground text-center">No images available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <Card
                key={img._id}
                className="group border-primary/20 bg-card/50 backdrop-blur-sm 
             hover:border-primary/50 transition-all duration-300 
             hover:scale-105 animate-float cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(index)}
              >
                <CardContent className="p-0">
                  {/* Image Container with hover overlay */}
                  <div className="relative w-full h-72 overflow-hidden rounded-t-xl">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />

                    {/* Hover overlay (same as Gallery page) */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                          <span className="text-xl">🔍</span>
                        </div>
                        <p className="text-sm font-medium">View Full Size</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="p-4 text-left">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {img.title}
                    </h3>
                    {img.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {img.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>


            ))}
          </div>
        )}

        <div className="mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("/gallery", "_self")}
            className="border-primary text-primary hover:bg-primary/10 text-sm md:text-base px-5 py-3 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            View Gallery
          </Button>
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
    </section>
  );
};

export default GallerySection;
