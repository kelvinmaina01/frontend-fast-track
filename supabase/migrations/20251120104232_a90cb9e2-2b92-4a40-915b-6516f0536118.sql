-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'organizer', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create bootcamps table
CREATE TABLE public.bootcamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  status TEXT DEFAULT 'coming_soon' CHECK (status IN ('active', 'coming_soon', 'archived')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.bootcamps ENABLE ROW LEVEL SECURITY;

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bootcamp_id UUID REFERENCES public.bootcamps(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL,
  resources JSONB DEFAULT '[]',
  task TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT,
  github_link TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bootcamps (public read, admin write)
CREATE POLICY "Anyone can view bootcamps"
  ON public.bootcamps FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert bootcamps"
  ON public.bootcamps FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

CREATE POLICY "Admins can update bootcamps"
  ON public.bootcamps FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

CREATE POLICY "Admins can delete bootcamps"
  ON public.bootcamps FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

-- RLS Policies for lessons (public read, admin write)
CREATE POLICY "Anyone can view lessons"
  ON public.lessons FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert lessons"
  ON public.lessons FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

CREATE POLICY "Admins can update lessons"
  ON public.lessons FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

CREATE POLICY "Admins can delete lessons"
  ON public.lessons FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

-- RLS Policies for submissions (anyone can submit, admins can view all)
CREATE POLICY "Anyone can submit"
  ON public.submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON public.submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'organizer'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create update trigger for bootcamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bootcamps_updated_at
  BEFORE UPDATE ON public.bootcamps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();