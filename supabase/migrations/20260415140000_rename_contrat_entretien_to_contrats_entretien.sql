-- Rename contrat_entretien table to contrats_entretien (plural) to match
-- the atomic-crm convention used by all other entities: companies, contacts,
-- deals, tasks, sales, tags, tondeuses.
--
-- The react-admin resource is <Resource name="contrats_entretien"> and
-- PostgREST maps resource names directly to table names. Without this
-- rename, all CRUD operations return 404.
--
-- Postgres RENAME TO preserves indexes, RLS policies, FK constraints,
-- and triggers automatically.
--
-- RLS policies were already fixed by migration
-- 20260415120000_fix_tondus_rls_role_claims.sql (lines 53-78).
-- No additional RLS migration is needed.

ALTER TABLE public.contrat_entretien RENAME TO contrats_entretien;
