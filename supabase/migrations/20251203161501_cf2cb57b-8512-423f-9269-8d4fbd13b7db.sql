-- Add is_archived column to bootcamps table
ALTER TABLE public.bootcamps ADD COLUMN is_archived boolean NOT NULL DEFAULT false;

-- Add is_archived column to lessons table
ALTER TABLE public.lessons ADD COLUMN is_archived boolean NOT NULL DEFAULT false;

-- Create index for faster filtering
CREATE INDEX idx_bootcamps_archived ON public.bootcamps(is_archived);
CREATE INDEX idx_lessons_archived ON public.lessons(is_archived);