-- Migration: Extend deals table with tondeuse and contrat_entretien relations

ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS tondeuse_id UUID REFERENCES public.tondeuse(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS contrat_entretien_id UUID REFERENCES public.contrat_entretien(id) ON DELETE SET NULL;
