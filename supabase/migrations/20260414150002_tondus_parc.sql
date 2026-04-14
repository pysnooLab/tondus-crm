-- Migration: Create parc table and join tables

CREATE TABLE public.parc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  company_id BIGINT NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  actif BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (company_id)
);

ALTER TABLE public.parc ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read parc"
  ON public.parc FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utilisateur or admin can insert parc"
  ON public.parc FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Utilisateur or admin can update parc"
  ON public.parc FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'))
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Admin can delete parc"
  ON public.parc FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'));

CREATE TRIGGER parc_updated_at
  BEFORE UPDATE ON public.parc
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Join table: parc <-> tondeuse
CREATE TABLE public.parc_tondeuse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parc_id UUID NOT NULL REFERENCES public.parc(id) ON DELETE CASCADE,
  tondeuse_id UUID NOT NULL REFERENCES public.tondeuse(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parc_id, tondeuse_id)
);

ALTER TABLE public.parc_tondeuse ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read parc_tondeuse"
  ON public.parc_tondeuse FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utilisateur or admin can write parc_tondeuse"
  ON public.parc_tondeuse FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Admin can delete parc_tondeuse"
  ON public.parc_tondeuse FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'));

-- Join table: parc <-> contrat_entretien
CREATE TABLE public.parc_contrat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parc_id UUID NOT NULL REFERENCES public.parc(id) ON DELETE CASCADE,
  contrat_entretien_id UUID NOT NULL REFERENCES public.contrat_entretien(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parc_id, contrat_entretien_id)
);

ALTER TABLE public.parc_contrat ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read parc_contrat"
  ON public.parc_contrat FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utilisateur or admin can write parc_contrat"
  ON public.parc_contrat FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('utilisateur', 'admin'));

CREATE POLICY "Admin can delete parc_contrat"
  ON public.parc_contrat FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin'));
