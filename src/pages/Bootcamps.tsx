import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Code2, Database, Brain, Shield, Cloud, Sparkles, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Code2,
  Database,
  Brain,
  Shield,
  Cloud,
  Sparkles,
};

interface Bootcamp {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string | null;
  status: string;
  is_archived: boolean;
}

const Bootcamps = () => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBootcamps = async () => {
      const { data, error } = await supabase
        .from("bootcamps")
        .select("*")
        .eq("is_archived", false)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setBootcamps(data);
      }
      setLoading(false);
    };

    fetchBootcamps();
  }, []);

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Code2;
    return iconMap[iconName] || Code2;
  };

  const gradients = [
    "from-primary to-primary/70",
    "from-secondary to-secondary/70",
    "from-accent to-accent/70",
    "from-destructive to-destructive/70",
    "from-primary to-secondary",
    "from-secondary to-accent",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Growing Collection of Expert-Led Courses</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tech <span className="text-gradient">Bootcamps</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your path and start learning. Each bootcamp is designed to take you from 
              absolute beginner to building real-world projects.
            </p>
          </div>
        </div>
      </section>

      {/* Bootcamps Grid */}
      <section className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading bootcamps...</p>
            </div>
          ) : bootcamps.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                <Code2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No bootcamps available yet</h3>
              <p className="text-muted-foreground">Check back soon for new courses!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bootcamps.map((bootcamp, index) => {
                const Icon = getIcon(bootcamp.icon);
                const isActive = bootcamp.status === "active";
                const gradient = gradients[index % gradients.length];

                return (
                  <div
                    key={bootcamp.id}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                      isActive
                        ? "border-primary/30 hover:border-primary/50 hover:shadow-glow hover:-translate-y-2"
                        : "border-border opacity-80"
                    )}
                  >
                    {/* Live Badge */}
                    {isActive && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-2.5 py-1 bg-success text-success-foreground text-xs font-bold rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success-foreground animate-pulse" />
                          LIVE
                        </span>
                      </div>
                    )}

                    {/* Header with Gradient */}
                    <div className={cn("p-8 bg-gradient-to-br", gradient)}>
                      <div className="p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm inline-flex mb-4">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                        {bootcamp.title}
                      </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {bootcamp.description}
                      </p>

                      {isActive ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            <span className="text-success font-medium">Ready to Start</span>
                          </div>
                          <Link to={`/bootcamps/${bootcamp.slug}`} className="block">
                            <Button className="w-full gap-2 group-hover:shadow-lg transition-shadow">
                              Start Learning
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                              Coming Soon
                            </span>
                          </div>
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bootcamps;
