import { Card, CardContent } from "@/components/ui/card";
import { Music2, Heart, Globe, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Bengali DJ Songs",
      description: "Soulful Bengali melodies mixed with modern beats",
      icon: Music2,
      gradient: "from-primary to-primary/50",
      glow: "glow",
    },
    {
      title: "Hindi DJ Songs",
      description: "Bollywood classics with contemporary twists",
      icon: Heart,
      gradient: "from-secondary to-secondary/50",
      glow: "glow-purple",
    },
    {
      title: "English DJ Songs",
      description: "International hits reimagined and remixed",
      icon: Globe,
      gradient: "from-accent to-accent/50",
      glow: "glow-yellow",
    },
    {
      title: "Bhojpuri DJ Songs",
      description: "Traditional Bhojpuri music with modern production",
      icon: Headphones,
      gradient: "from-neon-blue to-neon-pink",
      glow: "glow",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Transparent overlay to keep global background visible */}
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon animate-glow">Musical</span>{" "}
            <span className="text-foreground">Diversity</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of traditional and modern music across multiple languages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border border-primary/10 bg-white/10 backdrop-blur-md hover:border-primary/30 transition-all duration-500 hover:scale-105 animate-float cursor-pointer shadow-none"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6 text-center bg-transparent rounded-xl">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center ${feature.glow} group-hover:animate-pulse-glow transition-all duration-300`}
                  >
                    <Icon className="h-6 w-6 text-background" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Animated line */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 group-hover:w-full transition-all duration-500"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
