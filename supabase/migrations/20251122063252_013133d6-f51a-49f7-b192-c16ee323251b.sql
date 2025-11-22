-- Add DELETE policy for submissions table
-- Allows admins and organizers to remove inappropriate or incorrect submissions
CREATE POLICY "Admins can delete submissions"
ON submissions FOR DELETE
USING (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'organizer')
);