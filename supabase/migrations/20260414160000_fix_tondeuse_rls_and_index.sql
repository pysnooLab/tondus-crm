-- Amendment: Fix tondeuse RLS policies to allow utilisateur INSERT/UPDATE
-- and add missing date_fin index on contrat_entretien

-- Fix tondeuse INSERT policy: allow utilisateur + admin
DROP POLICY IF EXISTS "Admin can insert tondeuse" ON public.tondeuse;
CREATE POLICY "Utilisateur or admin can insert tondeuse"
  ON public.tondeuse FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

-- Fix tondeuse UPDATE policy: allow utilisateur + admin
DROP POLICY IF EXISTS "Admin can update tondeuse" ON public.tondeuse;
CREATE POLICY "Utilisateur or admin can update tondeuse"
  ON public.tondeuse FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'))
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

-- Add missing index on contrat_entretien.date_fin for dashboard query performance
CREATE INDEX IF NOT EXISTS idx_contrat_entretien_date_fin
  ON public.contrat_entretien (date_fin);
