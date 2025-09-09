import { useState } from "react";
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConceptCard from "./ConceptCard";

const mockConcepts = [
  {
    id: 1,
    title: "Binary Search Trees",
    description: "Learn how BSTs organize data for efficient searching, insertion, and deletion operations.",
    subject: "Data Structures",
    difficulty: "Intermediate" as const,
    duration: "45 min",
    learners: 12453,
    rating: 4.8,
    tags: ["Trees", "Recursion", "Search"],
    progress: 0
  },
  {
    id: 2,
    title: "Dijkstra's Algorithm",
    description: "Master the shortest path algorithm with interactive visualizations and real-world examples.",
    subject: "Algorithms",
    difficulty: "Advanced" as const,
    duration: "1h 20min",
    learners: 8732,
    rating: 4.9,
    tags: ["Graph", "Shortest Path", "Greedy"],
    progress: 25
  },
  {
    id: 3,
    title: "Hash Tables Fundamentals",
    description: "Understand hash functions, collision resolution, and when to use hash tables effectively.",
    subject: "Data Structures",
    difficulty: "Beginner" as const,
    duration: "35 min",
    learners: 15678,
    rating: 4.7,
    tags: ["Hashing", "O(1)", "Key-Value"],
    progress: 100
  },
  {
    id: 4,
    title: "System Design Principles",
    description: "Design scalable systems using load balancing, caching, and distributed architectures.",
    subject: "Systems Design",
    difficulty: "Advanced" as const,
    duration: "2h 15min",
    learners: 6542,
    rating: 4.6,
    tags: ["Scalability", "Distributed", "Architecture"],
    progress: 60
  },
  {
    id: 5,
    title: "Neural Network Basics",
    description: "Build your first neural network and understand backpropagation with interactive demos.",
    subject: "AI/ML",
    difficulty: "Intermediate" as const,
    duration: "1h 45min",
    learners: 9876,
    rating: 4.8,
    tags: ["Deep Learning", "Backprop", "Neurons"],
    progress: 0
  },
  {
    id: 6,
    title: "Database Normalization",
    description: "Learn 1NF, 2NF, 3NF and design efficient relational database schemas.",
    subject: "Database",
    difficulty: "Intermediate" as const,
    duration: "55 min",
    learners: 7234,
    rating: 4.5,
    tags: ["SQL", "Schema Design", "Relationships"],
    progress: 80
  }
];

const subjects = ["All", "Algorithms", "Data Structures", "Systems Design", "Database", "AI/ML", "Networks"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const ConceptExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(["All"]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const filteredConcepts = mockConcepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concept.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === "All" || concept.subject === selectedSubject;
    
    const matchesDifficulty = selectedDifficulties.includes("All") || 
                             selectedDifficulties.includes(concept.difficulty);

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (difficulty === "All") {
      setSelectedDifficulties(checked ? ["All"] : []);
    } else {
      setSelectedDifficulties(prev => {
        const newSelection = checked 
          ? [...prev.filter(d => d !== "All"), difficulty]
          : prev.filter(d => d !== difficulty);
        
        return newSelection.length === 0 ? ["All"] : newSelection;
      });
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore <span className="bg-gradient-primary bg-clip-text text-transparent">Concepts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from hundreds of interactive CS concepts, each explained with beautiful visualizations
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts, algorithms, data structures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Subject Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedSubject === subject 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>

              {/* Difficulty Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Difficulty
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {difficulties.map((difficulty) => (
                    <DropdownMenuCheckboxItem
                      key={difficulty}
                      checked={selectedDifficulties.includes(difficulty)}
                      onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked)}
                    >
                      {difficulty}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "popular"}
                    onCheckedChange={() => setSortBy("popular")}
                  >
                    Most Popular
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "rating"}
                    onCheckedChange={() => setSortBy("rating")}
                  >
                    Highest Rated
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "duration"}
                    onCheckedChange={() => setSortBy("duration")}
                  >
                    Duration
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredConcepts.length} of {mockConcepts.length} concepts
          </p>
        </div>

        {/* Concepts Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 max-w-4xl mx-auto"
        }`}>
          {filteredConcepts.map((concept, index) => (
            <div 
              key={concept.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ConceptCard {...concept} />
            </div>
          ))}
        </div>

        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No concepts found matching your criteria</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedSubject("All");
              setSelectedDifficulties(["All"]);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConceptExplorer;