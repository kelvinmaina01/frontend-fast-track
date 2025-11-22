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
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import BootcampPreview from "./BootcampPreview";
import { z } from "zod";

const bootcampSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens").min(1, "Slug is required").max(50),
  icon: z.string().trim().max(50).optional(),
  status: z.enum(["active", "coming_soon", "archived"])
});

interface Bootcamp {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string | null;
  status: string;
}

export default function BootcampManagement() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBootcamp, setEditingBootcamp] = useState<Bootcamp | null>(null);
  const [previewBootcampId, setPreviewBootcampId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    icon: "",
    status: "coming_soon" as "active" | "coming_soon" | "archived",
  });

  useEffect(() => {
    fetchBootcamps();
  }, []);

  const fetchBootcamps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bootcamps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch bootcamps");
    } else {
      setBootcamps(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = bootcampSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (editingBootcamp) {
      const { error } = await supabase
        .from("bootcamps")
        .update(formData)
        .eq("id", editingBootcamp.id);

      if (error) {
        toast.error("Failed to update bootcamp");
      } else {
        toast.success("Bootcamp updated successfully");
        setEditingBootcamp(null);
        fetchBootcamps();
      }
    } else {
      const { error } = await supabase
        .from("bootcamps")
        .insert([formData]);

      if (error) {
        toast.error("Failed to create bootcamp");
      } else {
        toast.success("Bootcamp created successfully");
        setIsCreateOpen(false);
        fetchBootcamps();
      }
    }

    setFormData({
      title: "",
      description: "",
      slug: "",
      icon: "",
      status: "coming_soon",
    });
  };

  const handleEdit = (bootcamp: Bootcamp) => {
    setEditingBootcamp(bootcamp);
    setFormData({
      title: bootcamp.title,
      description: bootcamp.description,
      slug: bootcamp.slug,
      icon: bootcamp.icon || "",
      status: bootcamp.status as "active" | "coming_soon" | "archived",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bootcamp?")) return;

    const { error } = await supabase
      .from("bootcamps")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete bootcamp");
    } else {
      toast.success("Bootcamp deleted successfully");
      fetchBootcamps();
    }
  };

  const BootcampForm = () => (
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
        <Label htmlFor="slug">Slug (URL friendly)</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="e.g., frontend-bootcamp"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon">Icon (lucide-react name)</Label>
        <Input
          id="icon"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="e.g., Code"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "active" | "coming_soon" | "archived",
            })
          }
        >
          <option value="coming_soon">Coming Soon</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <Button type="submit">
        {editingBootcamp ? "Update Bootcamp" : "Create Bootcamp"}
      </Button>
      {editingBootcamp && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setEditingBootcamp(null);
            setFormData({
              title: "",
              description: "",
              slug: "",
              icon: "",
              status: "coming_soon",
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
            <CardTitle>Manage Bootcamps</CardTitle>
            <CardDescription>Create, edit, and delete bootcamps</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Bootcamp
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Bootcamp</DialogTitle>
                <DialogDescription>Add a new bootcamp to the platform</DialogDescription>
              </DialogHeader>
              <BootcampForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading bootcamps...</p>
        ) : bootcamps.length === 0 ? (
          <p className="text-muted-foreground">No bootcamps yet.</p>
        ) : (
          <div className="space-y-6">
            {editingBootcamp && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Edit Bootcamp</CardTitle>
                </CardHeader>
                <CardContent>
                  <BootcampForm />
                </CardContent>
              </Card>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bootcamps.map((bootcamp) => (
                  <TableRow key={bootcamp.id}>
                    <TableCell className="font-medium">{bootcamp.title}</TableCell>
                    <TableCell>{bootcamp.slug}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          bootcamp.status === "active"
                            ? "bg-green-100 text-green-800"
                            : bootcamp.status === "coming_soon"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {bootcamp.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewBootcampId(bootcamp.id)}
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(bootcamp)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(bootcamp.id)}
                          title="Delete"
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
      </CardContent>

      {/* Preview Dialog */}
      <Dialog open={!!previewBootcampId} onOpenChange={() => setPreviewBootcampId(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bootcamp Preview</DialogTitle>
            <DialogDescription>
              This is how students will see this bootcamp
            </DialogDescription>
          </DialogHeader>
          {previewBootcampId && <BootcampPreview bootcampId={previewBootcampId} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
