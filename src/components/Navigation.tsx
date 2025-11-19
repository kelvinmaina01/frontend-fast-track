import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, MessageSquare, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/bootcamps", label: "Bootcamps", icon: BookOpen },
    { to: "/qa", label: "Q&A", icon: MessageSquare },
    { to: "/resources", label: "Resources", icon: Library },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <BookOpen className="h-6 w-6" />
            Tech Bootcamps Hub
          </Link>

          <div className="flex gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
