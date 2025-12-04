import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  Play, 
  BookOpen, 
  ListChecks,
  ChevronDown,
  ChevronUp,
  Github
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { cn } from "@/lib/utils";

const submissionSchema = z.object({
  name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
  githubLink: z.string().trim().url("Must be a valid URL").refine(
    (url) => url.includes("github.com"),
    "Must be a GitHub URL"
  )
});

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  resources: { name: string; url: string }[];
  task: string;
}

interface LessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  isCompleted: boolean;
  onTaskSubmit: (lessonId: string) => void;
}

const LessonCard = ({ lesson, lessonNumber, isCompleted, onTaskSubmit }: LessonCardProps) => {
  const [formData, setFormData] = useState({ name: "", githubLink: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = submissionSchema.safeParse({ 
      name: formData.name || undefined, 
      githubLink: formData.githubLink 
    });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("submissions").insert([{
        lesson_id: lesson.id,
        student_name: formData.name || null,
        github_link: formData.githubLink,
      }]);
      if (error) throw error;
      toast.success("Task submitted successfully!");
      onTaskSubmit(lesson.id);
      setFormData({ name: "", githubLink: "" });
    } catch (error: any) {
      toast.error("Failed to submit: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-2",
      isCompleted 
        ? "border-success/30 bg-success/5" 
        : "border-border hover:border-primary/30 hover:shadow-lg"
    )}>
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <CardHeader className="bg-gradient-to-r from-card via-muted/30 to-card border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex items-center justify-center h-12 w-12 rounded-xl font-display font-bold text-lg transition-colors",
                isCompleted 
                  ? "bg-success text-success-foreground" 
                  : "bg-primary text-primary-foreground"
              )}>
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : lessonNumber}
              </div>
              <div>
                <CardTitle className="text-xl font-display flex items-center gap-2">
                  {lesson.title}
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {lesson.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </CardHeader>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="p-0">
          {/* Video Section */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Play className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Video Tutorial</h3>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted shadow-inner">
              <iframe 
                src={lesson.videoUrl} 
                title={lesson.title} 
                className="w-full h-full" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
          </div>

          {/* Resources Section */}
          <div className="p-6 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <BookOpen className="h-4 w-4 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Extra Resources</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {lesson.resources.map((resource, index) => (
                <a 
                  key={index} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {resource.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Task Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <ListChecks className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg">Your Task</h3>
            </div>
            
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
              <p className="text-foreground">{lesson.task}</p>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${lesson.id}`} className="text-sm font-medium">
                    Your Name <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input 
                    id={`name-${lesson.id}`}
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`github-${lesson.id}`} className="text-sm font-medium">
                    GitHub Repository <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id={`github-${lesson.id}`}
                      type="url" 
                      placeholder="https://github.com/username/repo" 
                      value={formData.githubLink} 
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} 
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full sm:w-auto gap-2" 
                disabled={submitting || isCompleted}
                size="lg"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Task
                  </>
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default LessonCard;
