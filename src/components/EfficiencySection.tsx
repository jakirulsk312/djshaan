import { Button } from "@/components/ui/button";
import { Zap, Music, Users, Star } from "lucide-react";

const EfficiencySection = () => {
  const stats = [
    { icon: Music, label: "Songs", value: "1000+", color: "text-primary" },
    { icon: Users, label: "Listeners", value: "50K+", color: "text-secondary" },
    { icon: Star, label: "Rating", value: "4.9★", color: "text-accent" },
    { icon: Zap, label: "Languages", value: "4+", color: "text-neon-blue" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
              
                {/* <span className="text-primary glow">One channel!</span>
                <br />
                <span className="text-foreground">endless mashups</span>{" "}
                <span className="text-neon animate-glow">for your vibes and emotions</span> */}
                
                <span className="text-primary glow">You set </span>{" "}
                
                <span className="text-foreground">the mood</span>{" "}
                <span className="text-neon animate-glow">I’ll set the beat</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover an incredible collection of mashup songs spanning across Bengali, Hindi, English, and Bhojpuri languages. All your favorite music, reimagined and remixed in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => window.open("https://www.youtube.com/@vdjshaan", "_blank")}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow"
              >
                <Music className="mr-2 h-5 w-5" />
                Explore Now
              </Button>

              
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 glow"
              >
                <Zap className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-4 ${stat.color} glow`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <div className="text-3xl font-bold mb-2 text-foreground">
                    {stat.value}
                  </div>
                  
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "High Quality Audio",
              description: "Crystal clear sound with professional mixing",
              icon: "🎵"
            },
            {
              title: "Regular Updates",
              description: "New DJ added weekly",
              icon: "🔄"
            },
            {
              title: "Multiple Genres",
              description: "From classical to contemporary hits",
              icon: "🌟"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EfficiencySection;