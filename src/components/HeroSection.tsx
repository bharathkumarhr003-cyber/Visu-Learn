import { ArrowRight, Play, Sparkles, Brain, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and hero image */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroVisual})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce-gentle blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full animate-bounce-gentle blur-xl" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-accent/10 rounded-full animate-bounce-gentle blur-xl" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Learn Computer Science Visually
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Master CS Concepts with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Interactive Learning
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From algorithms to system design, learn every computer science concept through 
            beautiful animations, interactive visualizations, and intuitive analogies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all group">
              Start Learning Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-12 opacity-60 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground hidden sm:block">Visual Learning</span>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-secondary" />
              <span className="text-sm text-muted-foreground hidden sm:block">Interactive Code</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-sm text-muted-foreground hidden sm:block">AI Explanations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;