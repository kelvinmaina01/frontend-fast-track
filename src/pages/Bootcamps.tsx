import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Code2, Database, Brain, Shield, Cloud, Sparkles, Loader2 } from "lucide-react";
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

  const getColorClasses = (index: number) => {
    const colors = [
      { gradient: "from-primary to-primary/80", text: "text-primary" },
      { gradient: "from-secondary to-secondary/80", text: "text-secondary" },
      { gradient: "from-accent to-accent/80", text: "text-accent" },
      { gradient: "from-destructive to-destructive/80", text: "text-destructive" },
      { gradient: "from-primary to-secondary", text: "text-primary" },
      { gradient: "from-secondary to-accent", text: "text-secondary" },
    ];
    return colors[index % colors.length];
  };

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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bootcamps.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No bootcamps available yet. Check back soon!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {bootcamps.map((bootcamp, index) => {
              const Icon = getIcon(bootcamp.icon);
              const colors = getColorClasses(index);
              const isActive = bootcamp.status === "active";

              return (
                <div
                  key={bootcamp.id}
                  className={cn(
                    "bg-card rounded-xl border transition-all h-full flex flex-col",
                    isActive
                      ? "border-primary shadow-md hover:shadow-xl hover:-translate-y-1"
                      : "border-border opacity-75"
                  )}
                >
                  {/* Card Header with Gradient */}
                  <div className={cn("bg-gradient-to-r p-6 rounded-t-xl", colors.gradient)}>
                    <Icon className="h-12 w-12 text-white mb-3" />
                    <h2 className="text-xl font-bold text-white">{bootcamp.title}</h2>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-1">
                      {bootcamp.description}
                    </p>

                    {isActive ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-success/10 text-success rounded">
                            ✓ Available Now
                          </span>
                        </div>
                        <Link to={`/bootcamps/${bootcamp.slug}`}>
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
        )}
      </div>
    </div>
  );
};

export default Bootcamps;
