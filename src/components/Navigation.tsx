import { Search, BookOpen, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ConceptFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Explore
            </a>
            <a href="#subjects" className="text-foreground hover:text-primary transition-colors">
              Subjects
            </a>
            <a href="#progress" className="text-foreground hover:text-primary transition-colors">
              Progress
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search concepts..." 
                className="pl-10 bg-muted/50 border-muted-foreground/20 focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search concepts..." 
                  className="pl-10 bg-muted/50 border-muted-foreground/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                  Explore
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                  Subjects
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                  Progress
                </a>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-primary">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;