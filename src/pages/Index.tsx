import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ConceptExplorer from "@/components/ConceptExplorer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ConceptExplorer />
      </main>
    </div>
  );
};

export default Index;
