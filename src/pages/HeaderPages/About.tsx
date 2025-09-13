import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const storySections = [
    {
      title: "🌌 The Journey",
      content: [
        "From the bustling club scene of Mumbai to the global stage, VDJ Shaan’s journey is a story of sound, struggle, and evolution.",
        "He began in 2008 as a video editor, shaping visuals before realizing his true calling in music. By 2012, he had transitioned into VDJing — bringing visuals and beats together in a way India had never seen before. What started with Bollywood remixes soon became the foundation of a new sound.",
        "Shaan built his name remixing and reimagining India’s most iconic songs for the dancefloor, but he didn’t stop there. He evolved — introducing Afro house rhythms, Arabic textures, and global club energy into his sets and productions. This transformation gave birth to the Mirage series: not just albums, but a cultural movement that blends Bollywood nostalgia with international electronic vibes.",
        "Today, with the launch of Mirage Records, Shaan is stepping into the next chapter: original music. From Bollywood remixes to Afro-fusion edits, and now to original productions, his story is about constant reinvention without losing identity.",
        "Crowned by the Times Group as India’s No.1 VDJ, and having worked with legends like Sonu Nigam, Salim–Sulaiman, and Singer Shaan, Shaan is no longer just an artist — he is a brand, a storyteller, and a global ambassador of India’s fusion sound.",
      ],
    },
    {
      title: "🌌 About Mirage Music",
      content: [
        "Mirage is not just music — it’s a movement. Born from VDJ Shaan’s vision to merge Bollywood soul with Afro house and Arabic rhythms, Mirage has redefined the sound of Indian dancefloors. What began as an experimental fusion has now become a full-fledged culture — a sound that is unmistakably Shaan’s.",
        "From Mirage 1 to Mirage 4, every edition has pushed boundaries, delivering fresh edits and global club-ready cuts. Mirage has built a loyal following not only across India’s clubs and festivals, but also among international DJs and listeners who connect with its unique blend of nostalgia and innovation.",
        "In India, Mirage tracks have become staples in the nightlife scene, setting clubs ablaze from Mumbai to Goa, Delhi to Bangalore.",
        "Globally, Mirage has reached audiences in Dubai, London, and beyond, resonating with crowds hungry for a sound that feels both familiar and futuristic.",
        "With Mirage 5 on the horizon and the launch of Mirage Records, the vision is clearer than ever: to take this Indian-born global fusion sound to every corner of the world. Mirage isn’t just an album drop — it’s a cultural wave, and the world is beginning to ride it.",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content with Background + Overlay */}
      <div className="relative flex-1">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Header />
          <main className="pt-36 pb-16">
            <div className="container mx-auto px-4">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-foreground">🎧 About</span>{" "}
                  <span className="text-neon animate-glow">VDJ Shaan</span>
                </h1>
              </div>

              {/* Story Sections with Floating Animation */}
              {storySections.map((section, index) => (
                <div key={index} className="max-w-4xl mx-auto mb-16">
                  <Card
                    className={`bg-card/30 backdrop-blur-sm border-primary/20 transform transition-all duration-500 hover:scale-105 animate-float`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <CardContent className="p-8 md:p-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
                      <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                        {section.title}
                      </h2>
                      {section.content.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer without background */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
};

export default About;
