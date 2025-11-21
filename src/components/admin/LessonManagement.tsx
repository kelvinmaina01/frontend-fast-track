import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from "lucide-react";

interface Bootcamp {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  bootcamp_id: string;
  title: string;
  description: string;
  video_url: string;
  task: string;
  order_index: number;
  resources: any;
}

export default function LessonManagement() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedBootcamp, setSelectedBootcamp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    bootcamp_id: "",
    title: "",
    description: "",
    video_url: "",
    task: "",
    order_index: 0,
    resources: "[]",
  });

  useEffect(() => {
    fetchBootcamps();
  }, []);

  useEffect(() => {
    if (selectedBootcamp) {
      fetchLessons(selectedBootcamp);
    }
  }, [selectedBootcamp]);

  const fetchBootcamps = async () => {
    const { data, error } = await supabase
      .from("bootcamps")
      .select("id, title")
      .order("title");

    if (error) {
      toast.error("Failed to fetch bootcamps");
    } else {
      setBootcamps(data || []);
      if (data && data.length > 0) {
        setSelectedBootcamp(data[0].id);
      }
    }
  };

  const fetchLessons = async (bootcampId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("bootcamp_id", bootcampId)
      .order("order_index");

    if (error) {
      toast.error("Failed to fetch lessons");
    } else {
      setLessons(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lessonData = {
      ...formData,
      bootcamp_id: selectedBootcamp,
      resources: JSON.parse(formData.resources || "[]"),
      order_index: Number(formData.order_index),
    };

    if (editingLesson) {
      const { error } = await supabase
        .from("lessons")
        .update(lessonData)
        .eq("id", editingLesson.id);

      if (error) {
        toast.error("Failed to update lesson");
      } else {
        toast.success("Lesson updated successfully");
        setEditingLesson(null);
        fetchLessons(selectedBootcamp);
      }
    } else {
      const { error } = await supabase
        .from("lessons")
        .insert([lessonData]);

      if (error) {
        toast.error("Failed to create lesson");
      } else {
        toast.success("Lesson created successfully");
        setIsCreateOpen(false);
        fetchLessons(selectedBootcamp);
      }
    }

    setFormData({
      bootcamp_id: "",
      title: "",
      description: "",
      video_url: "",
      task: "",
      order_index: 0,
      resources: "[]",
    });
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      bootcamp_id: lesson.bootcamp_id,
      title: lesson.title,
      description: lesson.description,
      video_url: lesson.video_url,
      task: lesson.task,
      order_index: lesson.order_index,
      resources: JSON.stringify(lesson.resources || []),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    const { error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete lesson");
    } else {
      toast.success("Lesson deleted successfully");
      fetchLessons(selectedBootcamp);
    }
  };

  const LessonForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="video_url">YouTube Video URL</Label>
        <Input
          id="video_url"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          placeholder="https://www.youtube.com/embed/..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="task">Task Description</Label>
        <Textarea
          id="task"
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order_index">Order Index</Label>
        <Input
          id="order_index"
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="resources">Resources (JSON array)</Label>
        <Textarea
          id="resources"
          value={formData.resources}
          onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
          placeholder='[{"title": "Resource", "url": "https://..."}]'
        />
      </div>
      <Button type="submit">
        {editingLesson ? "Update Lesson" : "Create Lesson"}
      </Button>
      {editingLesson && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setEditingLesson(null);
            setFormData({
              bootcamp_id: "",
              title: "",
              description: "",
              video_url: "",
              task: "",
              order_index: 0,
              resources: "[]",
            });
          }}
          className="ml-2"
        >
          Cancel
        </Button>
      )}
    </form>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manage Lessons</CardTitle>
            <CardDescription>Create, edit, and delete lessons for bootcamps</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedBootcamp}>
                <Plus className="mr-2 h-4 w-4" />
                Create Lesson
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lesson</DialogTitle>
                <DialogDescription>Add a new lesson to the selected bootcamp</DialogDescription>
              </DialogHeader>
              <LessonForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bootcamp-select">Select Bootcamp</Label>
            <select
              id="bootcamp-select"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              value={selectedBootcamp}
              onChange={(e) => setSelectedBootcamp(e.target.value)}
            >
              {bootcamps.map((bootcamp) => (
                <option key={bootcamp.id} value={bootcamp.id}>
                  {bootcamp.title}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading lessons...</p>
          ) : lessons.length === 0 ? (
            <p className="text-muted-foreground">No lessons yet for this bootcamp.</p>
          ) : (
            <div className="space-y-6">
              {editingLesson && (
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle>Edit Lesson</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LessonForm />
                  </CardContent>
                </Card>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell>{lesson.order_index}</TableCell>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(lesson)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(lesson.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
