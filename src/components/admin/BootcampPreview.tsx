import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen } from "lucide-react";

interface Bootcamp {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string | null;
  status: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  task: string;
  order_index: number;
  resources: any;
}

export default function BootcampPreview({ bootcampId }: { bootcampId: string }) {
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBootcampData();
  }, [bootcampId]);

  const fetchBootcampData = async () => {
    setLoading(true);
    
    // Fetch bootcamp details
    const { data: bootcampData, error: bootcampError } = await supabase
      .from("bootcamps")
      .select("*")
      .eq("id", bootcampId)
      .single();

    // Fetch lessons
    const { data: lessonsData, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("bootcamp_id", bootcampId)
      .order("order_index");

    if (!bootcampError) setBootcamp(bootcampData);
    if (!lessonsError) setLessons(lessonsData || []);
    
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading preview...</div>;
  }

  if (!bootcamp) {
    return <div className="text-center py-8 text-muted-foreground">Bootcamp not found</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold">{bootcamp.title}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {bootcamp.description}
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant={bootcamp.status === "active" ? "default" : "secondary"}>
            {bootcamp.status}
          </Badge>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Course Content</h2>
        {lessons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No lessons added yet. Add lessons to see them here.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className="overflow-hidden hover-scale">
                <CardHeader className="bg-secondary/20">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Lesson {index + 1}</Badge>
                        <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Video Preview */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      📹 Video Lesson
                    </h4>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="text-4xl">🎥</div>
                        <p className="text-sm text-muted-foreground">Video will play here</p>
                        <p className="text-xs text-muted-foreground font-mono truncate max-w-md">
                          {lesson.video_url}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  {lesson.resources && Array.isArray(lesson.resources) && lesson.resources.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        📚 Extra Resources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.resources.map((resource: any, idx: number) => (
                          <Badge key={idx} variant="secondary" className="gap-1">
                            {resource.title || `Resource ${idx + 1}`}
                            <ExternalLink className="h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Task */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      ✏️ Your Task
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{lesson.task}</p>
                    </div>
                  </div>

                  {/* Submission Form Preview */}
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold">📤 Submit Your Work</h4>
                    <div className="space-y-3 opacity-60 pointer-events-none">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Your Name (Optional)</label>
                        <div className="h-10 bg-muted rounded-md"></div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">GitHub Repository Link</label>
                        <div className="h-10 bg-muted rounded-md"></div>
                      </div>
                      <div className="h-10 bg-primary/20 rounded-md flex items-center justify-center text-sm font-medium">
                        Submit Task
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Notice */}
      <Card className="border-primary">
        <CardContent className="py-4">
          <p className="text-sm text-center text-muted-foreground">
            ℹ️ This is a preview of how students will see this bootcamp. Interactive elements are disabled.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
