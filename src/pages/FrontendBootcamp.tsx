import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LessonCard from "@/components/LessonCard";
import { MessageCircle, Quote, Shield } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Navigation />
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Accelerated Frontend Dev Bootcamp</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Master HTML, CSS, JavaScript, and React. Submit work via GitHub and become job-ready.</p>
          <Card className="max-w-md mx-auto mb-8"><CardContent className="p-6"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Your Progress</span><span className="text-sm text-muted-foreground">{completedLessons.length} / {lessons.length} lessons</span></div><Progress value={progress} className="h-2" /></CardContent></Card>
        </div>
      </section>
      <div className="container mx-auto px-4 max-w-4xl mb-12">
        <Card><CardContent className="p-6"><div className="grid md:grid-cols-[200px_1fr] gap-6 items-center"><img src={instructorPhoto} alt="Instructor" className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0 border-4 border-primary/20" /><div><div className="flex items-start gap-3 mb-4"><Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" /><p className="text-lg italic text-muted-foreground">"Welcome to your frontend journey! Every expert was once a beginner. Stay consistent and build projects."</p></div></div></div></CardContent></Card>
      </div>
      {isAdmin && <div className="container mx-auto px-4 max-w-4xl mb-8"><Card className="border-primary/50 bg-primary/5"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="p-3 rounded-full bg-primary/10"><Shield className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold">Admin Dashboard</h3><p className="text-sm text-muted-foreground">Manage bootcamps and submissions</p></div></div><Link to="/admin"><Button>Go to Dashboard</Button></Link></div></CardContent></Card></div>}
      <div className="container mx-auto px-4 max-w-4xl mb-12"><Card className="border-success/50 bg-success/5"><CardContent className="p-6"><div className="flex flex-col md:flex-row items-center justify-between gap-4"><div className="flex items-center gap-3"><MessageCircle className="h-8 w-8 text-success" /><div><h3 className="font-semibold">Need Help?</h3><p className="text-sm text-muted-foreground">Chat with me on WhatsApp</p></div></div><Button asChild variant="default" className="bg-success hover:bg-success/90"><a href="https://wa.me/254116251803" target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp</a></Button></div></CardContent></Card></div>
      <div className="container mx-auto px-4 pb-20 max-w-4xl"><div className="space-y-8">{lessons.map((lesson, index) => <LessonCard key={lesson.id} lesson={lesson} lessonNumber={index + 1} isCompleted={completedLessons.includes(lesson.id)} onTaskSubmit={(id) => setCompletedLessons([...completedLessons, id])} />)}</div></div>
    </div>
  );
}
