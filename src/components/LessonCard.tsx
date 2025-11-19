import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExternalLink, CheckCircle2, Upload, Send } from "lucide-react";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState({
    name: "",
    submission: "",
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.submission.trim()) {
      toast.error("Please provide your task submission");
      return;
    }

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      name: formData.name || "Anonymous",
      submission: formData.submission,
      fileName: formData.file?.name,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    toast.success("Task submitted successfully! 🎉");
    onTaskSubmit(lesson.id);
    
    // Reset form
    setFormData({ name: "", submission: "", file: null });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {lessonNumber}
              </span>
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              {isCompleted && (
                <CheckCircle2 className="h-6 w-6 text-success" />
              )}
            </div>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Video */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            📹 Video Tutorial
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            📚 Extra Resources
          </h3>
          <div className="space-y-2">
            {lesson.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                {resource.name}
              </a>
            ))}
          </div>
        </div>

        {/* Task */}
        <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
            ✏️ Your Task
          </h3>
          <p className="text-foreground mb-4">{lesson.task}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor={`name-${lesson.id}`}>Your Name (Optional)</Label>
              <Input
                id={`name-${lesson.id}`}
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor={`submission-${lesson.id}`}>
                Task Submission <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id={`submission-${lesson.id}`}
                placeholder="Describe what you built or paste your GitHub repository link..."
                rows={4}
                value={formData.submission}
                onChange={(e) => setFormData({ ...formData, submission: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor={`file-${lesson.id}`}>Upload File (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id={`file-${lesson.id}`}
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files?.[0] || null })
                  }
                />
                {formData.file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({ ...formData, file: null })}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isCompleted}>
              {isCompleted ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submitted
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Task
                </>
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
