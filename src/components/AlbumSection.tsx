
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

// Album type
interface Album {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number | string;
  image: string;
  driveFileId: string;
}

const AlbumSection = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestAlbums = async () => {
      try {
        setLoading(true);
        const response = await api.get("/albums");
        const allAlbums: Album[] = response.data.data || [];
        setAlbums(allAlbums.slice(0, 4)); // latest 4 albums
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAlbums();
  }, []);

  const handleCheckoutRedirect = (albumId: string) => {
    navigate(`/checkout/${albumId}`);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent mb-3">
          ✨ Latest Releases Albums
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto italic">
          Handpicked <span className="text-lime-500 font-medium">DJ Mashup Albums</span> for your vibe 🎶
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : albums.length === 0 ? (
          <p className="text-muted-foreground text-center">No albums available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {albums.map((album) => {
              const displayPrice =
                typeof album.price === "string"
                  ? album.price.replace("$", "")
                  : album.price;

              return (
                <Card
                  key={album._id}
                  className="group border-primary/20 bg-card/50 backdrop-blur-sm 
             hover:border-primary/50 transition-all duration-300 
             hover:scale-105 animate-float cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="relative w-full h-72 overflow-hidden rounded-t-xl">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>

                    <div className="p-4 text-left">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {album.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {album.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Duration: {album.duration}
                      </p>
                      <p className="font-medium text-primary mb-3 text-sm">
                        ₹{displayPrice}
                      </p>

                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 
                   text-sm px-3 py-2 w-full animate-pulse-glow transform hover:scale-105 transition-all duration-300"
                        onClick={() => handleCheckoutRedirect(album._id)}
                      >
                        Buy ₹{displayPrice}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("/albums", "_self")}
            className="border-primary text-primary hover:bg-primary/10 text-sm md:text-base px-5 py-3 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            View All Albums
          </Button>
        </div>
      </div>
    </section>
  );
};






// const AlbumSection = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLatestAlbums = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/albums");
//         setAlbums(res.data.data.slice(0, 4));
//       } catch (err) {
//         console.error("Failed to fetch albums:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLatestAlbums();
//   }, []);

//   return (
//     <section className="py-10">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-3xl font-extrabold mb-3">✨ Latest Releases Albums</h2>

//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {albums.map(album => (
//               <Card key={album._id} className="group hover:scale-105 transition-transform">
//                 <CardContent className="p-0">
//                   <img src={album.image} alt={album.title} className="w-full h-72 object-cover rounded-t-xl" />
//                   <div className="p-4 text-left">
//                     <h3 className="font-semibold mb-1">{album.title}</h3>
//                     <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
//                     <p className="font-medium text-primary mb-3">₹{album.price}</p>
//                     <Button onClick={() => navigate(`/checkout/${album._id}`)}>
//                       Buy ₹{album.price}
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };



export default AlbumSection;
