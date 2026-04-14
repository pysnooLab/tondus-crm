-- Migration: Create tondeuse table (catalogue de tondeuses)

CREATE TABLE public.tondeuse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nom TEXT NOT NULL,
  prix NUMERIC(10, 2) NOT NULL,
  actif BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.tondeuse ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read tondeuse"
  ON public.tondeuse FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert tondeuse"
  ON public.tondeuse FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin'));

CREATE POLICY "Admin can update tondeuse"
  ON public.tondeuse FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'))
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin'));

CREATE POLICY "Admin can delete tondeuse"
  ON public.tondeuse FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'));

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER tondeuse_updated_at
  BEFORE UPDATE ON public.tondeuse
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
