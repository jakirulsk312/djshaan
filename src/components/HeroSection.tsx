
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { Play, Music, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";


interface Song {
  _id: string;
  title: string;
  views: string;
  duration: string;
  lang: string;
  thumbnail?: string;
  videoId: string;
  link: string;
}

const HeroSection = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/songs");
        const allSongs: Song[] = response.data.data || [];
        setSongs(allSongs.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestSongs();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-24 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s", transform: "translateX(-50%)" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20 md:pt-32">
        {/* Hero Image is commented out */}

        <div className="flex justify-center mt-4 md:mt-6">
          <img
            src="/vdj_logo.png"
            alt="VDJ Shaan"
            className="w-32 h-32 md:w-40 md:h-40 object-contain animate-glow invert brightness-200"
          />
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={() => window.open("https://www.youtube.com/@vdjshaan", "_blank")}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Play className="mr-2 h-6 w-6" />
            Explore YouTube
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open("https://open.spotify.com/artist/1AElbGTdtp3Uly2j6U4JpX", "_blank")
            }
            className="border-primary text-primary hover:bg-primary/10 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Music className="mr-2 h-6 w-6" />
            Listen Spotify
          </Button>
        </div>

        {/* Latest Songs */}
        <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
          <div className="mt-12 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent mb-4">
              ✨ Latest Releases
            </h2>

          </div>


          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : songs.length === 0 ? (
            <p className="text-muted-foreground text-center">No songs available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <YouTubeVideoCard key={song._id} song={song} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const YouTubeVideoCard = ({ song, index }: { song: Song; index: number }) => {
  const [muted, setMuted] = useState(true);

  const playerOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: muted ? 1 : 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      playlist: song.videoId,
    },
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  return (
    <Card
      className="group border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 
                 transition-all duration-300 hover:scale-105 animate-float cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => window.open(song.link, "_blank")}
    >
      <CardContent className="p-0">
        <div className="relative w-full h-72 overflow-hidden rounded-t-xl">
          <YouTube videoId={song.videoId} opts={playerOptions} className="w-full h-full" />

          <button
            onClick={toggleMute}
            className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-primary transition z-10"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
            {song.duration}
          </div>
          <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded z-10">
            {song.lang}
          </div>
        </div>

        <div className="p-4 text-left">
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {song.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{song.views}</span>
            <span className="text-primary font-medium">Watch Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
