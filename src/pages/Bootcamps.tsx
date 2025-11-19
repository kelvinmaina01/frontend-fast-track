import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Code2, Database, Brain, Shield, Cloud, Sparkles } from "lucide-react";

const Bootcamps = () => {
  const bootcamps = [
    {
      id: "frontend",
      name: "Accelerated Frontend Dev Bootcamp",
      description: "Master HTML, CSS, JavaScript, and modern frameworks. Build beautiful, responsive websites from scratch.",
      icon: Code2,
      color: "from-primary to-primary/80",
      textColor: "text-primary",
      available: true,
      lessons: 3,
    },
    {
      id: "backend",
      name: "Backend Development Bootcamp",
      description: "Learn server-side programming, databases, APIs, and cloud deployment.",
      icon: Database,
      color: "from-secondary to-secondary/80",
      textColor: "text-secondary",
      available: false,
    },
    {
      id: "ai",
      name: "AI & Machine Learning Bootcamp",
      description: "Dive into artificial intelligence, neural networks, and practical ML applications.",
      icon: Brain,
      color: "from-accent to-accent/80",
      textColor: "text-accent",
      available: false,
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity Bootcamp",
      description: "Learn ethical hacking, network security, and how to protect systems from threats.",
      icon: Shield,
      color: "from-destructive to-destructive/80",
      textColor: "text-destructive",
      available: false,
    },
    {
      id: "cloud",
      name: "Cloud Computing Bootcamp",
      description: "Master AWS, Azure, GCP, and modern DevOps practices for scalable applications.",
      icon: Cloud,
      color: "from-primary to-secondary",
      textColor: "text-primary",
      available: false,
    },
    {
      id: "data-science",
      name: "Data Science Bootcamp",
      description: "Analyze data, create visualizations, and build predictive models with Python.",
      icon: Sparkles,
      color: "from-secondary to-accent",
      textColor: "text-secondary",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Bootcamps</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our growing collection of expert-led bootcamps. Start with Frontend Development — more tracks launching soon!
          </p>
        </div>

        {/* Bootcamps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {bootcamps.map((bootcamp) => {
            const Icon = bootcamp.icon;
            
            return (
              <div
                key={bootcamp.id}
                className={cn(
                  "bg-card rounded-xl border transition-all h-full flex flex-col",
                  bootcamp.available
                    ? "border-primary shadow-md hover:shadow-xl hover:-translate-y-1"
                    : "border-border opacity-75"
                )}
              >
                {/* Card Header with Gradient */}
                <div className={cn("bg-gradient-to-r p-6 rounded-t-xl", bootcamp.color)}>
                  <Icon className="h-12 w-12 text-white mb-3" />
                  <h2 className="text-xl font-bold text-white">{bootcamp.name}</h2>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    {bootcamp.description}
                  </p>

                  {bootcamp.available ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-success/10 text-success rounded">
                          ✓ Available Now
                        </span>
                        <span>• {bootcamp.lessons} Lessons</span>
                      </div>
                      <Link to={`/bootcamps/${bootcamp.id}`}>
                        <Button className="w-full">
                          Start Learning
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded text-sm">
                        Coming Soon
                      </span>
                      <Button className="w-full" variant="outline" disabled>
                        Notify Me
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Import cn utility
import { cn } from "@/lib/utils";

export default Bootcamps;
