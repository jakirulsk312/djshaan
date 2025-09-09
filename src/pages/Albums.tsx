
// ==============================================================================//
// ============ without login or token user cannot download albums ==============//
// ==============================================================================//

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { AlertCircle } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import api from "@/lib/api";

// // Album type
// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number | string;
//   image: string;
//   driveFileId: string;
// };

// // Simple login prompt modal
// const LoginPromptModal = ({
//   open,
//   onClose,
//   onLogin,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onLogin: () => void;
// }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//   <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
//     <div className="flex items-center justify-center mb-4">
//       <AlertCircle className="h-6 w-6 text-destructive mr-2" />
//       <h3 className="text-lg font-bold">Login Required</h3>
//     </div>
//     <p className="mb-6">
//       You need to login or register to download or play an album.
//     </p>
//     <div className="flex justify-center gap-4">
//       <Button onClick={onLogin}>Login / Register</Button>
//       <Button variant="outline" onClick={onClose}>
//         Cancel
//       </Button>
//     </div>
//   </div>
// </div>
//   );
// };

// const Albums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [processingOrder, setProcessingOrder] = useState<string | null>(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [pendingAlbum, setPendingAlbum] = useState<string | null>(null);

//   const albumsPerPage = 8;
//   const navigate = useNavigate();

//   const PAYU_BASE_URL =
//     import.meta.env.VITE_NODE_ENV === "production"
//       ? import.meta.env.VITE_PAYU_BASE_URL_PROD
//       : import.meta.env.VITE_PAYU_BASE_URL_TEST;

//   // Fetch albums
//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums");
//       const albumsData = res.data.data || res.data.albums || [];
//       setAlbums(albumsData);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to load albums.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create PayU order
//   // const createOrder = async (albumId: string) => {
//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     setPendingAlbum(albumId);
//   //     setShowLoginModal(true);
//   //     return;
//   //   }

//   //   try {
//   //     setProcessingOrder(albumId);
//   //     const res = await api.post(
//   //       "/orders/create",
//   //       { albumId },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     const payuData = res.data.data;

//   //     const form = document.createElement("form");
//   //     form.method = "POST";
//   //     form.action = PAYU_BASE_URL;

//   //     Object.keys(payuData).forEach((key) => {
//   //       const input = document.createElement("input");
//   //       input.type = "hidden";
//   //       input.name = key;
//   //       input.value = payuData[key];
//   //       form.appendChild(input);
//   //     });

//   //     document.body.appendChild(form);
//   //     form.submit();
//   //   } catch (err) {
//   //     console.error("Order creation failed:", err);
//   //     alert(err?.response?.data?.message || "Failed to create order. Please try again.");
//   //   } finally {
//   //     setProcessingOrder(null);
//   //   }
//   // };

//   const createOrder = async (albumId: string) => {
//   const token = sessionStorage.getItem("token"); // ✅ use sessionStorage
//   if (!token) {
//     setPendingAlbum(albumId);
//     setShowLoginModal(true); // show modal
//     return;
//   }

//   try {
//     setProcessingOrder(albumId);
//     const res = await api.post(
//       "/orders/create",
//       { albumId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     const payuData = res.data.data;

//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = PAYU_BASE_URL;

//     Object.keys(payuData).forEach((key) => {
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = key;
//       input.value = payuData[key];
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     form.submit();
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     alert(err?.response?.data?.message || "Failed to create order. Please try again.");
//   } finally {
//     setProcessingOrder(null);
//   }
// };


//   useEffect(() => {
//     fetchAlbums();

//     // Resume pending order after login
//     const pendingAlbumId = localStorage.getItem("pendingAlbumId");
//     const token = localStorage.getItem("token");
//     if (pendingAlbumId && token) {
//       localStorage.removeItem("pendingAlbumId");
//       createOrder(pendingAlbumId);
//     }
//   }, []);

//   const handleLoginRedirect = () => {
//     setShowLoginModal(false);
//     if (pendingAlbum) {
//       localStorage.setItem("pendingAlbumId", pendingAlbum);
//     }
//     navigate("/login");
//   };

//   // Filter & paginate
//   const filteredAlbums = albums.filter(
//     (album) =>
//       album.title.toLowerCase().includes(search.toLowerCase()) ||
//       album.description.toLowerCase().includes(search.toLowerCase())
//   );
//   const indexOfLastAlbum = currentPage * albumsPerPage;
//   const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
//   const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
//   const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

//   return (
//     <div className="flex flex-col min-h-screen">
//   {/* Background + Overlay */}
//   <div className="relative flex-1">
//     <div
//       className="absolute inset-0 bg-cover bg-center bg-fixed"
//       style={{ backgroundImage: "url('/background.jpg')" }}
//     />
//     <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

//     {/* Main content */}
//     <div className="relative z-10">
//       <Header />

//       <main className="pt-36 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Search + Title */}
//           <div className="flex flex-col items-center justify-center mb-6">
//             <h2 className="text-4xl font-extrabold mb-12 text-neon animate-glow text-center">
//               💿 Albums
//             </h2>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by title or description..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Album Grid */}
//           {loading ? (
//             <p className="text-center text-muted-foreground">Loading albums...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : currentAlbums.length === 0 ? (
//             <p className="text-center text-muted-foreground">No albums found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {currentAlbums.map((album) => (
//                 <Card
//                   key={album._id}
//                   className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
//                 >
//                   <img src={album.image} alt={album.title} className="w-full h-40 object-cover" />
//                   <CardContent className="p-4">
//                     <h3 className="font-bold text-lg">{album.title}</h3>
//                     <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
//                     <p className="text-sm">Duration: {album.duration}</p>
//                     <p className="text-sm font-semibold">Price: ₹{album.price}</p>
//                     <Button
//                       className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-lg px-6 py-4 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
//                       onClick={() => createOrder(album._id)}
//                       disabled={processingOrder === album._id}
//                     >
//                       {processingOrder === album._id ? "Processing..." : `Download ₹${album.price}`}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Button
//                   key={i + 1}
//                   size="sm"
//                   variant={currentPage === i + 1 ? "default" : "outline"}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   </div>

//   <Footer />

//   <LoginPromptModal
//     open={showLoginModal}
//     onClose={() => setShowLoginModal(false)}
//     onLogin={handleLoginRedirect}
//   />
// </div>

//   );
// };

// export default Albums;




// ==============================================================================//
// ========================  ===========================//
// ==============================================================================//


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import api from "@/lib/api";

// Album type
type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number | string;
  image: string;
  driveFileId: string;
};

// Login modal
const LoginPromptModal = ({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive mr-2" />
          <h3 className="text-lg font-bold">Login Required</h3>
        </div>
        <p className="mb-6">
          You need to login or register to download or play an album.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onLogin}>Login / Register</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAlbum, setPendingAlbum] = useState<string | null>(null);

  const albumsPerPage = 8;
  const navigate = useNavigate();

  const PAYU_BASE_URL =
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_PAYU_BASE_URL_PROD
      : import.meta.env.VITE_PAYU_BASE_URL_TEST;

  // Fetch albums
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/albums");
      const albumsData = res.data.data || res.data.albums || [];
      setAlbums(albumsData);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load albums.");
    } finally {
      setLoading(false);
    }
  };

  // Create order
  const createOrder = async (albumId: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setPendingAlbum(albumId);
      setShowLoginModal(true);
      return;
    }

    try {
      setProcessingOrder(albumId);
      const res = await api.post(
        "/orders/create",
        { albumId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const payuData = res.data.data;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = PAYU_BASE_URL;

      Object.keys(payuData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Order creation failed:", err);
      alert(err?.response?.data?.message || "Failed to create order. Please try again.");
    } finally {
      setProcessingOrder(null);
    }
  };

  useEffect(() => {
    fetchAlbums();

    const pendingAlbumId = localStorage.getItem("pendingAlbumId");
    const token = sessionStorage.getItem("token");
    if (pendingAlbumId && token) {
      localStorage.removeItem("pendingAlbumId");
      createOrder(pendingAlbumId);
    }
  }, []);

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    if (pendingAlbum) localStorage.setItem("pendingAlbumId", pendingAlbum);
    navigate("/login");
  };

  // Filter & paginate
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background + overlay */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        <div className="relative z-10">
          <Header />

          <main className="pt-36 pb-16">
            <div className="container mx-auto px-4">
              {/* Title + Search */}
              <div className="flex flex-col items-center justify-center mb-6">
                <h2 className="text-4xl font-extrabold mb-12 text-neon animate-glow text-center">
                  💿 Albums
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title or description..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Album grid */}
              {loading ? (
                <p className="text-center text-muted-foreground">Loading albums...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : currentAlbums.length === 0 ? (
                <p className="text-center text-muted-foreground">No albums found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentAlbums.map((album) => (
                    <Card
                      key={album._id}
                      className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
                    >
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{album.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {album.description}
                        </p>
                        <p className="text-sm">Duration: {album.duration}</p>
                        <p className="text-sm font-semibold">Price: ₹{album.price}</p>
                        <Button
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-lg px-6 py-4 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                          onClick={() => createOrder(album._id)}
                          disabled={processingOrder === album._id}
                        >
                          {processingOrder === album._id
                            ? "Processing..."
                            : `Download ₹${album.price}`}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          size="sm"
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />

      <LoginPromptModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />
    </div>
  );
};

export default Albums;
