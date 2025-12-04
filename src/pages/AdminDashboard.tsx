import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ExternalLink, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Settings,
  Users,
  TrendingUp,
  Calendar,
  Loader2,
  Shield
} from "lucide-react";
import BootcampManagement from "@/components/admin/BootcampManagement";
import LessonManagement from "@/components/admin/LessonManagement";
import DashboardOverview from "@/components/admin/DashboardOverview";

interface Submission {
  id: string;
  student_name: string | null;
  github_link: string;
  submitted_at: string;
  lessons: {
    title: string;
    bootcamps: {
      title: string;
    };
  };
}

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  
  const defaultTab = searchParams.get("tab") || "overview";

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSubmissions();
    }
  }, [user, isAdmin]);

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select(`
        id,
        student_name,
        github_link,
        submitted_at,
        lessons (
          title,
          bootcamps (
            title
          )
        )
      `)
      .order("submitted_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch submissions");
    } else {
      setSubmissions(data || []);
    }
    setSubmissionsLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const tabItems = [
    { value: "overview", label: "Overview", icon: LayoutDashboard },
    { value: "submissions", label: "Submissions", icon: FileText },
    { value: "bootcamps", label: "Bootcamps", icon: GraduationCap },
    { value: "lessons", label: "Lessons", icon: BookOpen },
    { value: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your bootcamps and track submissions</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Student Submissions
                    </CardTitle>
                    <CardDescription>View and manage all task submissions from students</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {submissions.length} Total
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                    <p className="text-muted-foreground">Student submissions will appear here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Student</TableHead>
                          <TableHead className="font-semibold">Bootcamp</TableHead>
                          <TableHead className="font-semibold">Lesson</TableHead>
                          <TableHead className="font-semibold">Repository</TableHead>
                          <TableHead className="font-semibold">Submitted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => (
                          <TableRow key={submission.id} className="hover:bg-muted/30">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium">
                                  {submission.student_name || "Anonymous"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{submission.lessons.bootcamps.title}</Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {submission.lessons.title}
                            </TableCell>
                            <TableCell>
                              <a
                                href={submission.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                              >
                                View Code
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(submission.submitted_at).toLocaleDateString()}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bootcamps Tab */}
          <TabsContent value="bootcamps" className="space-y-6">
            <BootcampManagement />
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <LessonManagement />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Admin Settings
                </CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-muted/50 border border-border">
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Logged in as: <span className="text-foreground font-medium">{user.email}</span>
                    </p>
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Administrator
                    </Badge>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-warning/10 border border-warning/20">
                    <h3 className="font-semibold mb-2 text-warning">Danger Zone</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Irreversible actions that affect your account
                    </p>
                    <Button variant="destructive" onClick={handleLogout}>
                      Sign Out of Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
