import { useState } from "react";
import { ArrowLeft, BookOpen, Lightbulb, Eye, Brain, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ConceptPageProps {
  concept: {
    title: string;
    subject: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    rating: number;
    learners: number;
    tags: string[];
    definition: string;
    steps: Array<{
      title: string;
      description: string;
      code?: string;
    }>;
    analogy: {
      title: string;
      description: string;
      comparison: string;
    };
    quiz: Array<{
      question: string;
      options: string[];
      correct: number;
    }>;
  };
}

const ConceptPage = ({ concept }: ConceptPageProps) => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const difficultyColors = {
    Beginner: "bg-success text-success-foreground",
    Intermediate: "bg-secondary text-secondary-foreground", 
    Advanced: "bg-destructive text-destructive-foreground"
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === concept.quiz[currentQuiz].correct) {
      // Correct answer - update progress
      const newProgress = ((currentQuiz + 1) / concept.quiz.length) * 100;
      setProgress(newProgress);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < concept.quiz.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Explorer
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold">{concept.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{concept.subject}</Badge>
                  <Badge className={difficultyColors[concept.difficulty]}>
                    {concept.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Progress: {Math.round(progress)}%
              </div>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="definition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="definition" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Definition</span>
            </TabsTrigger>
            <TabsTrigger value="steps" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Steps</span>
            </TabsTrigger>
            <TabsTrigger value="analogy" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Analogy</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visual</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          {/* Definition Tab */}
          <TabsContent value="definition" className="animate-fade-in">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  What is {concept.title}?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-neutral max-w-none">
                  <p className="text-lg leading-relaxed">{concept.definition}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {concept.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{concept.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{concept.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{concept.learners.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Learners</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Steps Tab */}
          <TabsContent value="steps" className="animate-fade-in">
            <div className="space-y-4">
              {concept.steps.map((step, index) => (
                <Card key={index} className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    {step.code && (
                      <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analogy Tab */}
          <TabsContent value="analogy" className="animate-fade-in">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                  {concept.analogy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg leading-relaxed">
                  {concept.analogy.description}
                </div>
                
                <div className="p-6 bg-secondary/10 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-3">Real-World Comparison</h4>
                  <p className="leading-relaxed">{concept.analogy.comparison}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visualization Tab */}
          <TabsContent value="visualization" className="animate-fade-in">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-accent" />
                  Interactive Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Interactive Demo Coming Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        This section will contain an interactive visualization of {concept.title}
                      </p>
                    </div>
                    <Button className="bg-gradient-secondary">
                      <Play className="h-4 w-4 mr-2" />
                      Play Animation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="animate-fade-in">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-success" />
                    Test Your Knowledge
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuiz + 1} of {concept.quiz.length}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">
                    {concept.quiz[currentQuiz].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {concept.quiz[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          showAnswer
                            ? index === concept.quiz[currentQuiz].correct
                              ? "default"
                              : selectedAnswer === index
                              ? "destructive"
                              : "outline"
                            : selectedAnswer === index
                            ? "default"
                            : "outline"
                        }
                        className={`w-full justify-start text-left p-4 h-auto ${
                          showAnswer && index === concept.quiz[currentQuiz].correct
                            ? "bg-success hover:bg-success"
                            : ""
                        }`}
                        onClick={() => !showAnswer && handleAnswerSelect(index)}
                        disabled={showAnswer}
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {showAnswer && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      selectedAnswer === concept.quiz[currentQuiz].correct
                        ? "bg-success/10 border border-success/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}>
                      <p className={`font-semibold ${
                        selectedAnswer === concept.quiz[currentQuiz].correct
                          ? "text-success"
                          : "text-destructive"
                      }`}>
                        {selectedAnswer === concept.quiz[currentQuiz].correct
                          ? "Correct! Well done."
                          : "Incorrect. The correct answer is highlighted above."}
                      </p>
                    </div>

                    {currentQuiz < concept.quiz.length - 1 ? (
                      <Button onClick={nextQuestion} className="w-full">
                        Next Question
                      </Button>
                    ) : (
                      <div className="text-center space-y-4">
                        <p className="text-lg font-semibold">🎉 Quiz Complete!</p>
                        <Button className="bg-gradient-primary">
                          Continue Learning
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptPage;