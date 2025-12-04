import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import LessonCard from "@/components/LessonCard";
import { MessageCircle, Quote, Shield, Users, Clock, Target, BookOpen, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import instructorPhoto from "@/assets/instructor-photo.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const localLessons = [
  { id: "html", title: "HTML for Beginners", description: "Learn the fundamentals of HTML — the backbone of every website.", videoUrl: "https://www.youtube.com/embed/FQdaUv95mR8", resources: [{ name: "W3Schools HTML", url: "https://www.w3schools.com/html/" }, { name: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }], task: "Create a basic webpage with header, paragraph, image, link, and form. Upload to GitHub." },
  { id: "css", title: "CSS for Beginners", description: "Master CSS to style websites beautifully.", videoUrl: "https://www.youtube.com/embed/wRNinF7YQqQ", resources: [{ name: "W3Schools CSS", url: "https://www.w3schools.com/css/" }, { name: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }], task: "Style your HTML page with colors, spacing, Flexbox, and make it responsive. Upload to GitHub." },
  { id: "git", title: "Git & GitHub by Kevin Stratvert", description: "Learn version control with Git and GitHub.", videoUrl: "https://www.youtube.com/embed/tRZGeaHPoaw", resources: [{ name: "GitHub Docs", url: "https://docs.github.com" }, { name: "W3Schools Git", url: "https://www.w3schools.com/git/" }], task: "Upload your project to GitHub with 3+ commits. Submit repository link." },
  { id: "javascript", title: "JavaScript Full Course", description: "Learn JavaScript — the language that brings websites to life.", videoUrl: "https://www.youtube.com/embed/EfAl9bwzVZk", resources: [{ name: "W3Schools JS", url: "https://www.w3schools.com/js/" }, { name: "MDN JS", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }], task: "Add interactivity: button that changes text, counter, form validation. Upload to GitHub." },
  { id: "css-advanced", title: "CSS Grid & Animations", description: "Advanced CSS with Grid and animations.", videoUrl: "https://www.youtube.com/embed/EiNiSFIPIQE", resources: [{ name: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }], task: "Build responsive photo gallery with CSS Grid and animations. Upload to GitHub." },
  { id: "responsive", title: "Responsive Design", description: "Create websites that look great on all devices.", videoUrl: "https://www.youtube.com/embed/srvUrASNj0s", resources: [{ name: "MDN Responsive", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" }], task: "Make projects fully responsive with media queries. Upload to GitHub." },
  { id: "js-dom", title: "JavaScript DOM Manipulation", description: "Dynamically change HTML/CSS with JavaScript.", videoUrl: "https://www.youtube.com/embed/5fb2aPlgoys", resources: [{ name: "MDN DOM", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents" }], task: "Create todo list app with add/delete/complete features. Upload to GitHub." },
  { id: "react", title: "React for Beginners", description: "Get started with React — build user interfaces.", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", resources: [{ name: "React Docs", url: "https://react.dev/" }], task: "Build React counter app with increment/decrement/reset. Deploy and upload to GitHub." },
];

export default function FrontendBootcamp() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lessons, setLessons] = useState(localLessons);
  const { isAdmin } = useAuth();

  useEffect(() => {
    supabase.from("lessons").select("*").order("order_index").then(({ data }) => {
      if (data?.length) setLessons(data.map(l => ({ id: l.id, title: l.title, description: l.description, videoUrl: l.video_url, resources: l.resources as any, task: l.task })));
    });
  }, []);

  const progress = (completedLessons.length / lessons.length) * 100;

  const bootcampStats = [
    { icon: BookOpen, label: "Lessons", value: `${lessons.length}` },
    { icon: Clock, label: "Duration", value: "20+ hours" },
    { icon: Target, label: "Projects", value: `${lessons.length}` },
    { icon: Users, label: "Level", value: "Beginner" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/bootcamps" className="hover:text-primary transition-colors">Bootcamps</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Frontend Development</span>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-6">
                <Play className="h-4 w-4" />
                <span>Available Now — Start Learning Today</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Accelerated <span className="text-gradient">Frontend Dev</span> Bootcamp
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Master HTML, CSS, JavaScript, and React through hands-on projects. 
                Submit your work via GitHub and build a portfolio that gets you hired.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {bootcampStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="p-4 rounded-xl bg-card border border-border">
                      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-display font-bold text-xl">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-4xl space-y-8">
        {/* Progress Card */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display font-semibold text-lg">Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedLessons.length} of {lessons.length} lessons completed
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-display font-bold text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Instructor Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[200px_1fr] gap-0">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <img 
                  src={instructorPhoto} 
                  alt="Instructor" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-card shadow-xl" 
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg italic text-muted-foreground mb-4">
                      "Welcome to your frontend journey! Every expert was once a beginner. 
                      Stay consistent, build projects, and don't be afraid to make mistakes."
                    </p>
                    <p className="font-display font-semibold">Your Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Quick Access */}
        {isAdmin && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Admin Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Manage bootcamps, lessons, and view submissions</p>
                  </div>
                </div>
                <Link to="/admin">
                  <Button className="gap-2">
                    Go to Dashboard
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* WhatsApp Support */}
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <MessageCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">Get instant support on WhatsApp</p>
                </div>
              </div>
              <Button asChild className="bg-success hover:bg-success/90 gap-2">
                <a href="https://wa.me/254116251803" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Section */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            Course Lessons
          </h2>
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                lessonNumber={index + 1} 
                isCompleted={completedLessons.includes(lesson.id)} 
                onTaskSubmit={(id) => setCompletedLessons([...completedLessons, id])} 
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
