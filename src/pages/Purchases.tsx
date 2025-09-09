// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { getMyOrders, downloadAlbum } from "@/lib/api";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft, Download, Clock, Music } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// type Order = {
//   _id: string;
//   album: {
//     _id: string;
//     title: string;
//     description: string;
//     duration: string;
//     price: number;
//     image: string;
//   } | null; // Allow null albums
//   createdAt: string;
// };

// const Purchases = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await getMyOrders();
//       if (response.success) {
//         // Log for debugging
//         console.log("Orders data:", response.data);
        
//         // Check for orders with null albums
//         const ordersWithNullAlbums = response.data.filter((order: Order) => !order.album);
//         if (ordersWithNullAlbums.length > 0) {
//           console.warn("Found orders with null albums:", ordersWithNullAlbums);
//         }
        
//         setOrders(response.data);
//       }
//     } catch (error: unknown) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to load purchases"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (albumId: string) => {
//     setDownloadLoading(albumId);
//     try {
//       const response = await downloadAlbum(albumId);
//       if (response.success) {
//         // Open download URL in new tab
//         window.open(response.data.downloadUrl, "_blank");
//         toast({
//           title: "Download Started",
//           description: "Your album download has been initiated."
//         });
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Download Error",
//         description: error.response?.data?.message || "Failed to download album"
//       });
//     } finally {
//       setDownloadLoading(null);
//     }
//   };

//   // Filter orders to only include those with valid albums
//   const validOrders = orders.filter(order => order.album && order.album._id);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading your purchases...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header/>
//       <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//         {/* Header */}
//         <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//           <div className="container mx-auto px-4 py-4 flex items-center gap-4">
//             <Button variant="ghost" asChild>
//               <Link to="/albums">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Albums
//               </Link>
//             </Button>
//             <h1 className="text-2xl font-bold">My Purchases</h1>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="container mx-auto px-4 py-8">
//           <div className="pt-8 pb-12 text-center">
//             <h2 className="text-3xl font-bold mb-2">Your Music Library</h2>
//             <p className="text-muted-foreground">
//               Access and download your purchased albums
//             </p>
//           </div>

//           {validOrders.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="max-w-md mx-auto">
//                 <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
//                 <p className="text-muted-foreground mb-6">
//                   {orders.length > 0 && orders.length !== validOrders.length 
//                     ? "Some of your purchases are currently unavailable. Please contact support if this issue persists."
//                     : "You haven't purchased any albums yet. Browse our collection to get started!"
//                   }
//                 </p>
//                 <Button asChild>
//                   <Link to="/albums">Browse Albums</Link>
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Show warning if some orders have null albums */}
//               {orders.length !== validOrders.length && (
//                 <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
//                   <p className="text-yellow-800 dark:text-yellow-200 text-sm">
//                     <strong>Note:</strong> {orders.length - validOrders.length} of your purchases are currently unavailable. 
//                     This may be due to albums that are no longer available. Please contact support if you need assistance.
//                   </p>
//                 </div>
//               )}
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {validOrders.map((order) => (
//                   <Card key={order._id} className="h-full flex flex-col">
//                     <CardHeader className="p-0">
//                       <div className="aspect-square relative overflow-hidden rounded-t-lg">
//                         <img
//                           src={order.album!.image || "/placeholder.svg"}
//                           alt={order.album!.title || "Album"}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.src = "/placeholder.svg";
//                           }}
//                         />
//                         <div className="absolute top-2 right-2">
//                           <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                             Owned
//                           </Badge>
//                         </div>
//                       </div>
//                     </CardHeader>
                    
//                     <CardContent className="flex-1 p-6 flex flex-col">
//                       <CardTitle className="text-xl mb-2">{order.album!.title}</CardTitle>
//                       <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
//                         {order.album!.description}
//                       </CardDescription>
                      
//                       <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{order.album!.duration}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <span>${order.album!.price}</span>
//                         </div>
//                       </div>

//                       <div className="text-xs text-muted-foreground mb-4">
//                         Purchased on {new Date(order.createdAt).toLocaleDateString()}
//                       </div>
                      
//                       <Button 
//                         onClick={() => handleDownload(order.album!._id)}
//                         disabled={downloadLoading === order.album!._id}
//                         className="w-full"
//                       >
//                         <Download className="w-4 h-4 mr-2" />
//                         {downloadLoading === order.album!._id ? "Preparing..." : "Download"}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//       <Footer/>
//     </> 
//   );
// };

// export default Purchases;


// ==========================================================================================


// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Play, Pause, Download } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// interface Purchase {
//   _id: string;
//   albumId: {
//     _id: string;
//     title: string;
//     description: string;
//     coverUrl: string;
//     downloadUrl: string;
//   };
//   status: string;
// }

// const Purchases = () => {
//   const [purchases, setPurchases] = useState<Purchase[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentTrack, setCurrentTrack] = useState<string | null>(null);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const fetchPurchases = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const res = await api.get("/orders/my-purchases", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPurchases(res.data.data);
//       } catch (err) {
//         console.error("Error fetching purchases:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPurchases();
//   }, []);

//   const handlePlay = (url: string) => {
//     if (currentTrack === url) {
//       // If playing the same track → pause
//       audio?.pause();
//       setCurrentTrack(null);
//       return;
//     }

//     // Stop any existing track
//     if (audio) {
//       audio.pause();
//     }

//     const newAudio = new Audio(url);
//     newAudio.play();
//     setAudio(newAudio);
//     setCurrentTrack(url);

//     newAudio.onended = () => {
//       setCurrentTrack(null);
//     };
//   };

//   if (loading) {
//     return <p className="text-center mt-20">Loading your purchases...</p>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-background to-muted px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">My Purchases</h1>

//         {purchases.length === 0 ? (
//           <p className="text-center text-muted-foreground">
//             You haven’t purchased any albums yet.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {purchases.map((purchase) => (
//               <Card key={purchase._id} className="overflow-hidden">
//                 <img
//                   src={purchase.albumId.coverUrl}
//                   alt={purchase.albumId.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <CardHeader>
//                   <CardTitle>{purchase.albumId.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     {purchase.albumId.description}
//                   </p>
//                   <div className="flex gap-3">
//                     <Button
//                       onClick={() => handlePlay(purchase.albumId.downloadUrl)}
//                       variant="default"
//                       className="flex items-center gap-2"
//                     >
//                       {currentTrack === purchase.albumId.downloadUrl ? (
//                         <>
//                           <Pause className="h-4 w-4" /> Pause
//                         </>
//                       ) : (
//                         <>
//                           <Play className="h-4 w-4" /> Play
//                         </>
//                       )}
//                     </Button>

//                     <Button
//                       asChild
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <a
//                         href={purchase.albumId.downloadUrl}
//                         download
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Download className="h-4 w-4" /> Download
//                       </a>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Purchases;


///==========================================================================================

















// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Play, Download } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import MusicPlayer from "./MusicPlayer";

// interface Purchase {
//   _id: string;
//   albumId: {
//     _id: string;
//     title: string;
//     description: string;
//     coverUrl: string;
//     downloadUrl: string;
//   };
//   status: string;
// }

// // ✅ Define Track type for music player
// interface Track {
//   title: string;
//   url: string;
//   coverUrl: string;
// }

// const Purchases = () => {
//   const [purchases, setPurchases] = useState<Purchase[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentTrack, setCurrentTrack] = useState<Track | null>(null); // ✅ fixed type

//   useEffect(() => {
//     const fetchPurchases = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const res = await api.get("/orders/my-purchases", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPurchases(res.data.data);
//       } catch (err) {
//         console.error("Error fetching purchases:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPurchases();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-20">Loading your purchases...</p>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen pt-24 pb-24 bg-gradient-to-br from-background to-muted px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">My Purchases</h1>

//         {purchases.length === 0 ? (
//           <p className="text-center text-muted-foreground">
//             You haven’t purchased any albums yet.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {purchases.map((purchase) => (
//               <Card key={purchase._id} className="overflow-hidden">
//                 <img
//                   src={purchase.albumId.coverUrl}
//                   alt={purchase.albumId.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <CardHeader>
//                   <CardTitle>{purchase.albumId.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     {purchase.albumId.description}
//                   </p>
//                   <div className="flex gap-3">
//                     <Button
//                       onClick={() =>
//                         setCurrentTrack({
//                           title: purchase.albumId.title,
//                           url: purchase.albumId.downloadUrl,
//                           coverUrl: purchase.albumId.coverUrl,
//                         })
//                       }
//                       variant="default"
//                       className="flex items-center gap-2"
//                     >
//                       <Play className="h-4 w-4" /> Play
//                     </Button>

//                     <Button
//                       asChild
//                       variant="outline"
//                       className="flex items-center gap-2"
//                     >
//                       <a
//                         href={purchase.albumId.downloadUrl}
//                         download
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Download className="h-4 w-4" /> Download
//                       </a>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />

//       {/* ✅ Global Music Player */}
//       <MusicPlayer track={currentTrack} onEnd={() => setCurrentTrack(null)} />
//     </>
//   );
// };

// export default Purchases;


//=======================================================================================





import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Purchase {
  _id: string;
  albumId: {
    _id: string;
    title: string;
    description: string;
    coverUrl: string;
    downloadUrl: string;
  };
  status: string;
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await api.get("/orders/my-purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(res.data.data);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();

    // ✅ cleanup: stop audio when component unmounts
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const handlePlay = (url: string) => {
    if (currentTrack === url) {
      // If already playing this track → pause
      audio?.pause();
      setCurrentTrack(null);
      return;
    }

    // Stop previous audio
    if (audio) {
      audio.pause();
    }

    // Play new track
    const newAudio = new Audio(url);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrack(url);

    newAudio.onended = () => {
      setCurrentTrack(null);
    };
  };

  if (loading) {
    return <p className="text-center mt-20">Loading your purchases...</p>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-background to-muted px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Purchases</h1>

        {purchases.length === 0 ? (
          <p className="text-center text-muted-foreground">
            You haven’t purchased any albums yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {purchases.map((purchase) => (
              <Card key={purchase._id} className="overflow-hidden">
                <img
                  src={purchase.albumId.coverUrl}
                  alt={purchase.albumId.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{purchase.albumId.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {purchase.albumId.description}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handlePlay(purchase.albumId.downloadUrl)}
                      variant="default"
                      className="flex items-center gap-2"
                    >
                      {currentTrack === purchase.albumId.downloadUrl ? (
                        <>
                          <Pause className="h-4 w-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" /> Play
                        </>
                      )}
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <a
                        href={purchase.albumId.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Purchases;
