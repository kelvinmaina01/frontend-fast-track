import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  BookOpen, 
  Home, 
  MessageSquare, 
  Library, 
  LogIn, 
  Shield, 
  Settings, 
  GraduationCap,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileText,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/bootcamps", label: "Bootcamps", icon: BookOpen },
    { to: "/qa", label: "Q&A", icon: MessageSquare },
    { to: "/resources", label: "Resources", icon: Library },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow-sm transition-transform group-hover:scale-105">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">
              Tech Bootcamps
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    isActive(link.to)
                      ? "bg-primary text-primary-foreground shadow-glow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Admin</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Admin Panel
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=overview" className="cursor-pointer flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard Overview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=bootcamps" className="cursor-pointer flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Manage Bootcamps
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=lessons" className="cursor-pointer flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Manage Lessons
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=submissions" className="cursor-pointer flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          View Submissions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin?tab=settings" className="cursor-pointer flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => supabase.auth.signOut()}
                  className="hidden sm:flex gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-down">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all",
                      isActive(link.to)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {user && isAdmin && (
                <>
                  <div className="h-px bg-border my-2" />
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-primary hover:bg-primary/10"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <div className="h-px bg-border my-2" />
                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-destructive hover:bg-destructive/10 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
