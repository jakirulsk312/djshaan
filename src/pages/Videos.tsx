
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import api from "@/lib/api"


// Match backend response
type Video = {
  _id: string;
  title: string;
  views?: string;
  duration?: string;
  lang?: string;
  thumbnail?: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", "Bengali", "Hindi", "English", "Bhojpuri"];

  const videosPerPage = 8;


  useEffect(() => {
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching videos from API...");
      const response = await api.get("/songs"); // শুধু endpoint লিখবেন

      console.log("API Response:", response.data);
      setVideos(response.data.data);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response) {
        console.error("Response error:", {
          status: error.response.status,
          data: error.response.data,
        });
        setError(error.response.data?.message || "Server error occurred.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Request setup error:", error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchVideos();
}, []);

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.lang === selectedCategory);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank");
  };

  // Pagination numbers with ellipsis
  const getPageNumbers = () => {
    const total = totalPages;
    const current = currentPage;
    const delta = 2;
    const range: (number | string)[] = [];

    range.push(1);

    if (current - delta > 2) {
      range.push("...");
    }

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current + delta < total - 1) {
      range.push("...");
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-36 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-neon animate-glow">Video</span>{" "}
              <span className="text-foreground">Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our amazing collection of mashup videos across different languages
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground glow"
                    : "border-primary/30 text-foreground hover:bg-primary/10"
                } transition-all duration-300`}
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading videos...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Oops! Something went wrong</h3>
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Videos Grid */}
          {!loading && !error && currentVideos.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentVideos.map((video, index) => (
                  <Card
                    key={video._id}
                    className="group cursor-pointer border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleVideoClick(video.link)}
                  >
                    <CardContent className="p-0">
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />

                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse-glow">
                            <Play className="h-8 w-8 text-primary-foreground ml-1" />
                          </div>
                        </div>

                        {/* Duration badge */}
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        )}

                        {/* Category badge */}
                        {video.lang && (
                          <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
                            {video.lang}
                          </div>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {video.title}
                        </h3>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{video.views}</span>
                          <span className="text-primary font-medium">Watch Now</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>

                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={index} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(Number(page))}
                        className={
                          currentPage === page ? "bg-primary text-white" : "hover:bg-primary/10"
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!loading && !error && filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                No videos found
              </h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All"
                  ? "No videos available at the moment. Check back later!"
                  : `No videos available for ${selectedCategory}. Try selecting a different category.`}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Videos;
