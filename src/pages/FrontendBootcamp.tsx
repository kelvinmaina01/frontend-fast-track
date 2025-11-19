import { useState } from "react";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import { Code2, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      task: "Create a basic webpage with a header, paragraph, image, link, and a simple form with name and email fields. Upload to GitHub.",
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
      task: "Style your HTML page from Lesson 1. Add colors, spacing, use Flexbox for layout, and make it responsive for mobile devices. Upload to GitHub.",
    },
    {
      id: "git",
      title: "Git & GitHub for Beginners by Kevin Stratvert",
      description:
        "Learn version control with Git and GitHub. Understand how to track changes, collaborate with others, and manage your code professionally.",
      videoUrl: "https://www.youtube.com/embed/tRZGeaHPoaw",
      resources: [
        { name: "GitHub Docs", url: "https://docs.github.com" },
        { name: "W3Schools Git Tutorial", url: "https://www.w3schools.com/git/default.asp" },
      ],
      task: "Upload your styled webpage project to GitHub. Make at least 3 commits with meaningful messages, then submit your repository link.",
    },
    {
      id: "javascript",
      title: "JavaScript Full Course for Beginners",
      description:
        "Dive into JavaScript — the programming language that brings websites to life. Learn variables, functions, loops, and DOM manipulation.",
      videoUrl: "https://www.youtube.com/embed/EfAl9bwzVZk",
      resources: [
        { name: "W3Schools JavaScript Tutorial", url: "https://www.w3schools.com/js/" },
        { name: "MDN JavaScript Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "JavaScript.info", url: "https://javascript.info/" },
      ],
      task: "Add interactivity to your webpage: create a button that changes text, a simple counter, and a form that validates user input. Upload to GitHub.",
    },
    {
      id: "css-advanced",
      title: "CSS Grid & Animations",
      description:
        "Take your CSS skills to the next level with Grid layouts and smooth animations. Create modern, professional-looking websites.",
      videoUrl: "https://www.youtube.com/embed/EiNiSFIPIQE",
      resources: [
        { name: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
        { name: "CSS Animations Tutorial", url: "https://www.w3schools.com/css/css3_animations.asp" },
      ],
      task: "Build a responsive photo gallery using CSS Grid with hover animations and transitions. Upload to GitHub.",
    },
    {
      id: "responsive",
      title: "Responsive Design Tutorial",
      description:
        "Master responsive web design to make your websites look perfect on all devices — from phones to tablets to desktops.",
      videoUrl: "https://www.youtube.com/embed/srvUrASNj0s",
      resources: [
        { name: "Responsive Web Design Basics", url: "https://web.dev/responsive-web-design-basics/" },
        { name: "Media Queries Guide", url: "https://css-tricks.com/a-complete-guide-to-css-media-queries/" },
      ],
      task: "Convert one of your previous projects into a fully responsive website that works on mobile, tablet, and desktop. Upload to GitHub.",
    },
    {
      id: "js-dom",
      title: "JavaScript DOM Manipulation",
      description:
        "Learn how to manipulate HTML elements with JavaScript. Build interactive features like todo lists, calculators, and dynamic content.",
      videoUrl: "https://www.youtube.com/embed/5fb2aPlgoys",
      resources: [
        { name: "DOM Manipulation Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents" },
        { name: "JavaScript DOM Tutorial", url: "https://www.w3schools.com/js/js_htmldom.asp" },
      ],
      task: "Build a simple todo list application with add, delete, and mark-as-complete functionality. Upload to GitHub.",
    },
    {
      id: "react",
      title: "React for Beginners",
      description:
        "Get started with React — the most popular JavaScript library for building modern user interfaces and single-page applications.",
      videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
      resources: [
        { name: "Official React Docs", url: "https://react.dev/" },
        { name: "React Tutorial for Beginners", url: "https://www.w3schools.com/react/" },
      ],
      task: "Create a simple React app with at least 3 components: a header, a counter component, and a list component. Upload to GitHub.",
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
              Master HTML, CSS, JavaScript, and React — the essential building blocks of modern web development. 
              Complete hands-on tasks and build real projects with personalized support.
            </p>

            {/* WhatsApp Consultation */}
            <div className="mb-6">
              <Button
                asChild
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <a
                  href="https://wa.me/254116251803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get Personal Consultation on WhatsApp
                </a>
              </Button>
            </div>

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
