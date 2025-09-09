// import React, { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import api from "@/lib/api";

// type Image = {
//   _id?: string;
//   title: string;
//   description?: string;
//   imageUrl: string;
// };

// const Gallery = () => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [modalIndex, setModalIndex] = useState<number | null>(null);

//   const fetchGallery = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/gallery");
//       setImages(res.data.data || []);
//     } catch {
//       setError("Failed to load gallery.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const openModal = (index: number) => setModalIndex(index);
//   const closeModal = () => setModalIndex(null);

//   const showPrev = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (modalIndex !== null) setModalIndex((modalIndex - 1 + images.length) % images.length);
//   };

//   const showNext = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (modalIndex !== null) setModalIndex((modalIndex + 1) % images.length);
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen py-36 px-4 bg-background">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
//             Gallery
//           </h1>

//           {loading ? (
//             <p className="text-center text-muted-foreground">Loading images...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : images.length === 0 ? (
//             <p className="text-center text-muted-foreground">No images found.</p>
//           ) : (
//            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   {images.map((img, index) => (
//     <div
//       key={img._id}
//       className="relative group cursor-pointer overflow-visible rounded-xl shadow-lg"
//       onClick={() => openModal(index)}
//     >
//       <div className="overflow-hidden rounded-xl">
//         <img
//           src={img.imageUrl}
//           alt={img.title}
//           className="w-full h-56 sm:h-64 md:h-72 object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-2"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold text-foreground">{img.title}</h3>
//         {img.description && <p className="text-muted-foreground">{img.description}</p>}
//       </div>
//     </div>
//   ))}
// </div>

//           )}
//         </div>
//       </div>

//       {/* Fullscreen Lightbox Modal */}
//       {modalIndex !== null && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div className="relative max-w-4xl w-full p-4">
//             <img
//               src={images[modalIndex].imageUrl}
//               alt={images[modalIndex].title}
//               className="w-full h-auto rounded-lg shadow-lg"
//             />
//             <p className="text-white mt-2 text-center">{images[modalIndex].title}</p>
//             {images[modalIndex].description && (
//               <p className="text-gray-300 text-center">{images[modalIndex].description}</p>
//             )}

//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
//             >
//               &times;
//             </button>

//             {/* Previous Button */}
//             <button
//               onClick={showPrev}
//               className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-gray-300"
//             >
//               &#10094;
//             </button>

//             {/* Next Button */}
//             <button
//               onClick={showNext}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-gray-300"
//             >
//               &#10095;
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default Gallery;


//=========================================




import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="flex flex-col min-h-screen">
      {/* Background + overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]" />

        {/* Content */}
        <div className="relative z-10">
          <Header />
          
          <main className="pt-36 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-neon animate-glow">Photo</span>{" "}
                  <span className="text-foreground">Gallery</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore our beautiful collection of memorable moments
                </p>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-lg text-muted-foreground">Loading images...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <Card className="max-w-md mx-auto bg-card/30 backdrop-blur-sm border-red-300/50">
                    <CardContent className="p-8">
                      <div className="w-24 h-24 bg-red-100/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-red-400">Error Loading Gallery</h3>
                      <p className="text-red-300 mb-4">{error}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-16">
                  <Card className="max-w-md mx-auto bg-card/30 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-8">
                      <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">📷</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-foreground">No Images Found</h3>
                      <p className="text-muted-foreground">
                        No images available at the moment. Check back later!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((img, index) => (
                    <Card
                      key={img._id}
                      className="group cursor-pointer border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float overflow-hidden"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => openModal(index)}
                    >
                      <CardContent className="p-0">
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                          <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="w-full h-56 sm:h-64 md:h-72 object-cover transform transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                                <span className="text-xl">🔍</span>
                              </div>
                              <p className="text-sm font-medium">View Full Size</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Image Info */}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {img.title}
                          </h3>
                          {img.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {img.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full p-4">
            <Card className="bg-card/10 backdrop-blur-md border-primary/30 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={images[modalIndex].imageUrl}
                  alt={images[modalIndex].title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {images[modalIndex].title}
                  </h3>
                  {images[modalIndex].description && (
                    <p className="text-gray-300 text-sm">
                      {images[modalIndex].description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-2 -right-2 w-10 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 backdrop-blur-sm"
            >
              ×
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
              >
                ›
              </button>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {modalIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
};

export default Gallery;