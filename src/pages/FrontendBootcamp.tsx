import { useState } from "react";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import { Code2, CheckCircle2 } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  resources: { name: string; url: string }[];
  task: string;
}

const FrontendBootcamp = () => {
  const lessons: Lesson[] = [
    {
      id: "html",
      title: "HTML for Beginners",
      description:
        "Learn the fundamentals of HTML — the backbone of every website. Understand tags, elements, and how to structure web pages.",
      videoUrl: "https://www.youtube.com/embed/FQdaUv95mR8",
      resources: [
        { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { name: "MDN HTML Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      ],
      task: "Create a basic webpage with a header, paragraph, image, link, and a simple form with name and email fields.",
    },
    {
      id: "css",
      title: "CSS for Beginners",
      description:
        "Master CSS to style your websites beautifully. Learn colors, spacing, layouts with Flexbox, and responsive design principles.",
      videoUrl: "https://www.youtube.com/embed/wRNinF7YQqQ",
      resources: [
        { name: "W3Schools CSS Tutorial", url: "https://www.w3schools.com/css/" },
        { name: "MDN CSS Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      ],
      task: "Style your HTML page from Lesson 1. Add colors, spacing, use Flexbox for layout, and make it responsive for mobile devices.",
    },
    {
      id: "git",
      title: "Git & GitHub for Beginners",
      description:
        "Learn version control with Git and GitHub. Understand how to track changes, collaborate with others, and manage your code professionally.",
      videoUrl: "https://www.youtube.com/embed/tRZGeaHPoaw",
      resources: [
        { name: "GitHub Docs", url: "https://docs.github.com" },
        { name: "W3Schools Git Tutorial", url: "https://www.w3schools.com/git/default.asp" },
      ],
      task: "Upload your styled webpage project to GitHub. Make at least 3 commits with meaningful messages, then submit your repository link.",
    },
  ];

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleTaskSubmit = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="h-10 w-10" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Accelerated Frontend Dev Bootcamp
              </h1>
            </div>
            <p className="text-lg text-white/90 mb-6">
              Master HTML, CSS, and Git — the essential building blocks of web development. 
              Complete hands-on tasks and build real projects.
            </p>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span>{progress}% Complete</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                {completedLessons.length} / {lessons.length} Lessons
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              lessonNumber={index + 1}
              isCompleted={completedLessons.includes(lesson.id)}
              onTaskSubmit={handleTaskSubmit}
            />
          ))}
        </div>

        {/* Completion Message */}
        {completedLessons.length === lessons.length && (
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-success/10 to-primary/10 border-2 border-success rounded-xl text-center">
            <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
            <p className="text-muted-foreground">
              You've completed the Accelerated Frontend Dev Bootcamp. Keep practicing and building projects!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontendBootcamp;
