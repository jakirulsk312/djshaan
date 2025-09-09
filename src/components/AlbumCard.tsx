
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Music } from "lucide-react";

type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number | string; // allow string in case it comes with "$"
  image: string;
  driveFileId: string;
  createdAt: string;
};

interface AlbumCardProps {
  album: Album;
  onBuy: (albumId: string) => void;
  loading?: boolean;
}

const AlbumCard = ({ album, onBuy, loading = false }: AlbumCardProps) => {
  // Convert price to INR display
  const displayPrice = typeof album.price === "string"
    ? album.price.replace("$", "")
    : album.price;

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={album.image}
            alt={album.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              ₹{displayPrice}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-6">
        <CardTitle className="text-xl mb-2 line-clamp-2">{album.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {album.description}
        </CardDescription>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{album.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4" />
            <span>Album</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onBuy(album._id)}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : `Buy for ₹${displayPrice}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
