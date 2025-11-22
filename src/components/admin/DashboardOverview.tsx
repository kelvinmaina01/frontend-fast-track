import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, FileText, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Stats {
  totalBootcamps: number;
  totalLessons: number;
  totalSubmissions: number;
  activeBootcamps: number;
}

interface RecentSubmission {
  id: string;
  student_name: string | null;
  submitted_at: string;
  lessons: {
    title: string;
  };
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalBootcamps: 0,
    totalLessons: 0,
    totalSubmissions: 0,
    activeBootcamps: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentSubmissions();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    
    // Fetch bootcamps count
    const { count: bootcampsCount } = await supabase
      .from("bootcamps")
      .select("*", { count: "exact", head: true });
    
    // Fetch active bootcamps count
    const { count: activeBootcampsCount } = await supabase
      .from("bootcamps")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");
    
    // Fetch lessons count
    const { count: lessonsCount } = await supabase
      .from("lessons")
      .select("*", { count: "exact", head: true });
    
    // Fetch submissions count
    const { count: submissionsCount } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true });

    setStats({
      totalBootcamps: bootcampsCount || 0,
      totalLessons: lessonsCount || 0,
      totalSubmissions: submissionsCount || 0,
      activeBootcamps: activeBootcampsCount || 0,
    });
    
    setLoading(false);
  };

  const fetchRecentSubmissions = async () => {
    const { data } = await supabase
      .from("submissions")
      .select(`
        id,
        student_name,
        submitted_at,
        lessons (
          title
        )
      `)
      .order("submitted_at", { ascending: false })
      .limit(5);

    if (data) {
      setRecentSubmissions(data as RecentSubmission[]);
    }
  };

  const statCards = [
    {
      title: "Total Bootcamps",
      value: stats.totalBootcamps,
      description: `${stats.activeBootcamps} active`,
      icon: GraduationCap,
      color: "text-blue-600",
    },
    {
      title: "Total Lessons",
      value: stats.totalLessons,
      description: "Across all bootcamps",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      description: "From students",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: stats.totalLessons > 0 ? Math.round((stats.totalSubmissions / stats.totalLessons) * 100) : 0,
      description: "Submissions per lesson",
      icon: TrendingUp,
      color: "text-orange-600",
      suffix: "%",
    },
  ];

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}{stat.suffix || ""}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Latest task submissions from students</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSubmissions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No submissions yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.student_name || "Anonymous"}</TableCell>
                    <TableCell>{submission.lessons.title}</TableCell>
                    <TableCell>
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
