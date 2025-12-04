import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code2, 
  Database, 
  Brain, 
  Shield, 
  Cloud, 
  Laptop,
  Play,
  CheckCircle2,
  Users,
  Trophy,
  Zap,
  BookOpen,
  Sparkles
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const Home = () => {
  const upcomingBootcamps = [
    { icon: Code2, name: "Frontend Development", status: "available", color: "from-primary to-primary/70" },
    { icon: Database, name: "Backend Development", status: "coming", color: "from-secondary to-secondary/70" },
    { icon: Brain, name: "AI & Machine Learning", status: "coming", color: "from-accent to-accent/70" },
    { icon: Shield, name: "Cybersecurity", status: "coming", color: "from-destructive to-destructive/70" },
    { icon: Cloud, name: "Cloud Computing", status: "coming", color: "from-primary to-secondary" },
    { icon: Database, name: "Data Science", status: "coming", color: "from-secondary to-accent" },
  ];

  const features = [
    {
      icon: Laptop,
      title: "No Signup Required",
      description: "Jump straight into learning. Access all tutorials and submit your work without creating an account.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Play,
      title: "Video-First Learning",
      description: "Learn from carefully curated YouTube tutorials by industry experts and experienced educators.",
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      icon: Code2,
      title: "Hands-On Projects",
      description: "Build real projects from scratch. Each lesson includes practical tasks to solidify your skills.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: Trophy,
      title: "Portfolio Building",
      description: "Every completed project goes into your GitHub portfolio, showcasing your skills to employers.",
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Get help via WhatsApp. Connect with instructors and fellow learners when you're stuck.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Zap,
      title: "Accelerated Learning",
      description: "Fast-track your journey with structured curriculum designed to get you job-ready quickly.",
      color: "text-warning",
      bg: "bg-warning/10"
    }
  ];

  const stats = [
    { number: "8+", label: "Video Lessons" },
    { number: "100%", label: "Beginner Friendly" },
    { number: "Free", label: "Forever" },
    { number: "24/7", label: "Access" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-up">
              <Sparkles className="h-4 w-4" />
              <span>Start Learning for Free — No Signup Required</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Master Tech Skills with{" "}
              <span className="text-gradient">Expert-Led</span>{" "}
              Bootcamps
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Learn HTML, CSS, JavaScript, and React through curated video tutorials, 
              hands-on projects, and direct mentor support. Build a portfolio that gets you hired.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/bootcamps/frontend">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-glow">
                  <Play className="h-5 w-5" />
                  Start Frontend Bootcamp
                </Button>
              </Link>
              <Link to="/bootcamps">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Explore All Bootcamps
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Tech Bootcamps Hub?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive learning platform designed to take you from zero to job-ready
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4", feature.bg)}>
                    <Icon className={cn("h-6 w-6", feature.color)} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bootcamps Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Available Bootcamps
            </h2>
            <p className="text-muted-foreground text-lg">
              Start with <span className="text-primary font-semibold">Frontend Development</span> — more tracks launching soon!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingBootcamps.map((bootcamp, index) => {
              const Icon = bootcamp.icon;
              const isAvailable = bootcamp.status === "available";
              
              return (
                <div
                  key={bootcamp.name}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border transition-all duration-300",
                    isAvailable
                      ? "border-primary/50 shadow-glow-sm hover:shadow-glow cursor-pointer hover:-translate-y-1"
                      : "border-border opacity-70"
                  )}
                >
                  {/* Gradient Header */}
                  <div className={cn("p-6 bg-gradient-to-br", bootcamp.color)}>
                    <Icon className="h-10 w-10 text-primary-foreground mb-3" />
                    <h3 className="font-display text-xl font-bold text-primary-foreground">
                      {bootcamp.name}
                    </h3>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-card">
                    {isAvailable ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="text-success font-medium">Available Now</span>
                        </div>
                        <Link to="/bootcamps/frontend">
                          <Button className="w-full gap-2">
                            Start Learning
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                          Coming Soon
                        </span>
                        <Button className="w-full" variant="outline" disabled>
                          Notify Me
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Available Badge */}
                  {isAvailable && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-success text-success-foreground text-xs font-bold rounded-full">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-foreground blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary-foreground opacity-80" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
                Ready to Start Your Tech Journey?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90 max-w-xl mx-auto">
                Join thousands of learners mastering frontend development. 
                No signup required — dive in and start building today!
              </p>
              <Link to="/bootcamps/frontend">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6 shadow-lg">
                  <Play className="h-5 w-5" />
                  Start Learning Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
