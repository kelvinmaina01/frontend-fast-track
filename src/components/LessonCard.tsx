import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
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
      toast.success("Task submitted successfully! 🎉");
      onTaskSubmit(lesson.id);
      setFormData({ name: "", githubLink: "" });
    } catch (error: any) {
      toast.error("Failed to submit: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">{lessonNumber}</span>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-success" />}
        </div>
        <p className="text-muted-foreground">{lesson.description}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">📹 Video Tutorial</h3>
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe src={lesson.videoUrl} title={lesson.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">📚 Extra Resources</h3>
          <div className="space-y-2">
            {lesson.resources.map((resource, index) => (
              <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                <ExternalLink className="h-4 w-4" />{resource.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">✅ Your Task</h3>
          <p className="text-muted-foreground mb-4">{lesson.task}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input id="name" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub Repository Link *</Label>
              <Input id="githubLink" type="url" placeholder="https://github.com/username/repository" value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} required />
              <p className="text-sm text-muted-foreground">Upload your completed task to GitHub and paste the repository link here.</p>
            </div>
            <Button type="submit" className="w-full" disabled={submitting || isCompleted}>
              <Send className="mr-2 h-4 w-4" />
              {submitting ? "Submitting..." : isCompleted ? "Completed" : "Submit Task"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
