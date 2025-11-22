import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  order_index: number;
}

interface SortableLessonRowProps {
  lesson: Lesson;
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export default function SortableLessonRow({ lesson, onEdit, onDelete, isSelected, onToggleSelect }: SortableLessonRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(lesson.id)}
          className="rounded border-input"
        />
      </TableCell>
      <TableCell>
        <button
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell>{lesson.order_index + 1}</TableCell>
      <TableCell className="font-medium">{lesson.title}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(lesson)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(lesson.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
