import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, MessageSquare, Library, LogIn, Shield, Settings, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/bootcamps", label: "Bootcamps", icon: BookOpen },
    { to: "/qa", label: "Q&A", icon: MessageSquare },
    { to: "/resources", label: "Resources", icon: Library },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary"><BookOpen className="h-6 w-6" />Tech Bootcamps Hub</Link>
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return <Link key={link.to} to={link.to} className={cn("flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><Icon className="h-4 w-4" /><span className="hidden sm:inline">{link.label}</span></Link>;
            })}
            <div className="ml-2 pl-2 border-l">
              {user ? (
                isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Shield className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Admin</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                      <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=bootcamps" className="cursor-pointer">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Manage Bootcamps
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=lessons" className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Manage Lessons
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=submissions" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          View Submissions
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
