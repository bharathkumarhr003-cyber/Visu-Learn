import { Clock, Users, TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ConceptCardProps {
  id?: number;
  title: string;
  description: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  learners: number;
  rating: number;
  tags: string[];
  progress?: number;
  thumbnail?: string;
}

const ConceptCard = ({ 
  id,
  title, 
  description, 
  subject, 
  difficulty, 
  duration, 
  learners, 
  rating, 
  tags,
  progress,
  thumbnail 
}: ConceptCardProps) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    Beginner: "bg-success text-success-foreground",
    Intermediate: "bg-secondary text-secondary-foreground", 
    Advanced: "bg-destructive text-destructive-foreground"
  };

  const handleCardClick = () => {
    if (id) {
      navigate(`/concept/${id}`);
    }
  };

  const handleLearnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      navigate(`/concept/${id}`);
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">
              {subject === "Algorithms" && "🔄"}
              {subject === "Data Structures" && "🏗️"}
              {subject === "Systems Design" && "⚙️"}
              {subject === "Database" && "🗄️"}
              {subject === "Networks" && "🌐"}
              {subject === "AI/ML" && "🤖"}
            </div>
          </div>
        )}
        
        {/* Progress bar */}
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Subject badge */}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm">
          {subject}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Rating */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{learners.toLocaleString()}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow" onClick={handleLearnClick}>
              <TrendingUp className="h-4 w-4 mr-1" />
              Learn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;