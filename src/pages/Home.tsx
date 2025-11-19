import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Brain, Shield, Cloud, Laptop } from "lucide-react";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

const Home = () => {
  const upcomingBootcamps = [
    { icon: Code2, name: "Frontend Development", color: "text-primary" },
    { icon: Database, name: "Backend Development", color: "text-secondary" },
    { icon: Brain, name: "AI & Machine Learning", color: "text-accent" },
    { icon: Shield, name: "Cybersecurity", color: "text-destructive" },
    { icon: Cloud, name: "Cloud Computing", color: "text-primary" },
    { icon: Database, name: "Data Science", color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Master Tech Skills with Expert-Led Bootcamps
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              Learn from curated video tutorials, complete hands-on tasks, and build real projects. 
              No signup required — start learning immediately!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <Link to="/bootcamps">
                <Button size="lg" variant="secondary" className="group">
                  Explore Bootcamps
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/bootcamps/frontend">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Frontend Bootcamp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Tech Bootcamps Hub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive learning platform designed for absolute beginners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Laptop className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Signup Required</h3>
              <p className="text-muted-foreground">
                Start learning immediately. Access tutorials, complete tasks, and submit assignments without creating an account.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-On Learning</h3>
              <p className="text-muted-foreground">
                Watch curated video tutorials, access quality resources, and complete practical coding tasks.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beginner Friendly</h3>
              <p className="text-muted-foreground">
                Structured lessons designed for absolute beginners with clear explanations and step-by-step guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Bootcamps Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Bootcamps</h2>
            <p className="text-muted-foreground text-lg">
              Start with our <span className="font-semibold text-primary">Accelerated Frontend Dev Bootcamp</span> — more coming soon!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingBootcamps.map((bootcamp, index) => {
              const Icon = bootcamp.icon;
              const isAvailable = index === 0;
              
              return (
                <div
                  key={bootcamp.name}
                  className={cn(
                    "bg-card p-6 rounded-xl border transition-all",
                    isAvailable
                      ? "border-primary shadow-md hover:shadow-lg cursor-pointer"
                      : "border-border opacity-60"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={cn("h-8 w-8 flex-shrink-0", bootcamp.color)} />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{bootcamp.name}</h3>
                      {isAvailable ? (
                        <Link to="/bootcamps/frontend">
                          <span className="text-sm text-primary hover:underline">
                            Available Now →
                          </span>
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">Coming Soon</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of learners mastering frontend development with our comprehensive bootcamp.
            </p>
            <Link to="/bootcamps/frontend">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
