-- Migration: Create contrat_entretien table

CREATE TABLE public.contrat_entretien (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nom TEXT NOT NULL,
  periodicite TEXT NOT NULL CHECK (periodicite IN ('semestrielle', 'annuelle')),
  prix NUMERIC(10, 2) NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  statut TEXT NOT NULL CHECK (statut IN ('actif', 'expire')),
  tondeuse_id UUID REFERENCES public.tondeuse(id) ON DELETE SET NULL
);

ALTER TABLE public.contrat_entretien ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read contrat_entretien"
  ON public.contrat_entretien FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utilisateur or admin can insert contrat_entretien"
  ON public.contrat_entretien FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Utilisateur or admin can update contrat_entretien"
  ON public.contrat_entretien FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'))
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Admin can delete contrat_entretien"
  ON public.contrat_entretien FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'));

CREATE TRIGGER contrat_entretien_updated_at
  BEFORE UPDATE ON public.contrat_entretien
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
