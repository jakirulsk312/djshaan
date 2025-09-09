import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
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

// Simple login modal (same as in Albums page)
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

const AlbumSection = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAlbum, setPendingAlbum] = useState<string | null>(null);

  const navigate = useNavigate();

  const PAYU_BASE_URL =
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_PAYU_BASE_URL_PROD
      : import.meta.env.VITE_PAYU_BASE_URL_TEST;

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

    // Resume order if login just happened
    const pendingAlbumId = localStorage.getItem("pendingAlbumId");
    const token = sessionStorage.getItem("token");
    if (pendingAlbumId && token) {
      localStorage.removeItem("pendingAlbumId");
      createOrder(pendingAlbumId);
    }
  }, []);

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

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    if (pendingAlbum) {
      localStorage.setItem("pendingAlbumId", pendingAlbum);
    }
    navigate("/login");
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
                  className="group border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-3 text-left">
                      <h3 className="font-semibold text-md mb-1 line-clamp-2">
                        {album.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {album.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Duration: {album.duration}
                      </p>
                      <p className="font-medium text-primary mb-2 text-sm">
                        ₹{displayPrice}
                      </p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-sm px-3 py-2 w-full animate-pulse-glow transform hover:scale-105 transition-all duration-300"
                        onClick={() => createOrder(album._id)}
                        disabled={processingOrder === album._id}
                      >
                        {processingOrder === album._id
                          ? "Processing..."
                          : `Download ₹${displayPrice}`}
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

      {/* Login Modal */}
      <LoginPromptModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />
    </section>
  );
};

export default AlbumSection;
