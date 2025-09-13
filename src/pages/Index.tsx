import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AlbumSection from "@/components/AlbumSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content with Background + Overlay */}
      <div className="relative flex-1">
        {/* Global Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        ></div>

        {/* Dark Overlay only for main content */}
        <div className="absolute inset-0 bg-[hsl(230_20%_8%_/_0.85)]"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <HeroSection />
            <AlbumSection />
            <GallerySection />
            <FAQSection />
          </main>
        </div>
      </div>

      {/* Footer without global background */}
      <footer className="relative z-10 bg-background text-foreground">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
