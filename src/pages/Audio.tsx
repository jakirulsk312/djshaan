import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Audio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="max-w-2xl w-full bg-card/30 backdrop-blur-sm border-primary/20 text-center">
              <CardContent className="p-12">
                {/* Icon */}
                <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                  <Music className="h-16 w-16 text-primary" />
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-neon animate-glow">Audio Songs</span>
                </h1>

                {/* Coming Soon Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-8">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-primary font-semibold">Coming Soon</span>
                </div>

                {/* Description */}
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  We're working hard to bring you high-quality audio versions of all your favorite mashups. 
                  Soon you'll be able to enjoy crystal-clear audio streaming and downloads right here!
                </p>

                {/* Features List */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 glow"></div>
                      <span className="text-muted-foreground">High-quality audio streaming</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 glow-purple"></div>
                      <span className="text-muted-foreground">Offline download options</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 glow-yellow"></div>
                      <span className="text-muted-foreground">Curated playlists</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 glow"></div>
                      <span className="text-muted-foreground">Multiple audio formats</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 glow-purple"></div>
                      <span className="text-muted-foreground">Exclusive audio content</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 glow-yellow"></div>
                      <span className="text-muted-foreground">Enhanced listening experience</span>
                    </div>
                  </div>
                </div>

                {/* Notify Button */}
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow text-lg px-8 py-4"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Notify Me When Ready
                </Button>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Stay tuned!</strong> Follow our social media channels 
                    and subscribe to our newsletter to be the first to know when audio features go live.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Audio;