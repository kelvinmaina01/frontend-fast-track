import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ExternalLink, Plus, LogOut } from "lucide-react";

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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [bootcampForm, setBootcampForm] = useState({
    title: "",
    description: "",
    slug: "",
    icon: "",
    status: "coming_soon" as "active" | "coming_soon" | "archived",
  });
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

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

  const handleCreateBootcamp = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    const { error } = await supabase.from("bootcamps").insert([
      {
        ...bootcampForm,
        created_by: user?.id,
      },
    ]);

    if (error) {
      toast.error("Failed to create bootcamp: " + error.message);
    } else {
      toast.success("Bootcamp created successfully!");
      setBootcampForm({
        title: "",
        description: "",
        slug: "",
        icon: "",
        status: "coming_soon",
      });
    }
    setCreateLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage bootcamps and view submissions</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="bootcamps">Create Bootcamp</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>View all task submissions from students</CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <p>Loading submissions...</p>
                ) : submissions.length === 0 ? (
                  <p className="text-muted-foreground">No submissions yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Bootcamp</TableHead>
                          <TableHead>Lesson</TableHead>
                          <TableHead>GitHub Link</TableHead>
                          <TableHead>Submitted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              {submission.student_name || "Anonymous"}
                            </TableCell>
                            <TableCell>{submission.lessons.bootcamps.title}</TableCell>
                            <TableCell>{submission.lessons.title}</TableCell>
                            <TableCell>
                              <a
                                href={submission.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                              >
                                View Repo <ExternalLink className="h-3 w-3" />
                              </a>
                            </TableCell>
                            <TableCell>
                              {new Date(submission.submitted_at).toLocaleDateString()}
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

          <TabsContent value="bootcamps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Bootcamp</CardTitle>
                <CardDescription>Add a new bootcamp to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateBootcamp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={bootcampForm.title}
                      onChange={(e) =>
                        setBootcampForm({ ...bootcampForm, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={bootcampForm.description}
                      onChange={(e) =>
                        setBootcampForm({ ...bootcampForm, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL friendly)</Label>
                    <Input
                      id="slug"
                      value={bootcampForm.slug}
                      onChange={(e) =>
                        setBootcampForm({ ...bootcampForm, slug: e.target.value })
                      }
                      placeholder="e.g., frontend-bootcamp"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon (lucide-react name)</Label>
                    <Input
                      id="icon"
                      value={bootcampForm.icon}
                      onChange={(e) =>
                        setBootcampForm({ ...bootcampForm, icon: e.target.value })
                      }
                      placeholder="e.g., Code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      value={bootcampForm.status}
                      onChange={(e) =>
                        setBootcampForm({
                          ...bootcampForm,
                          status: e.target.value as "active" | "coming_soon" | "archived",
                        })
                      }
                    >
                      <option value="coming_soon">Coming Soon</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <Button type="submit" disabled={createLoading}>
                    <Plus className="mr-2 h-4 w-4" />
                    {createLoading ? "Creating..." : "Create Bootcamp"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
