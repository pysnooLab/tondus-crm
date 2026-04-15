-- Rename tondeuse table to tondeuses (plural) to match the atomic-crm
-- convention used by all other entities: companies, contacts, deals,
-- tasks, sales, tags.
--
-- The react-admin resource is <Resource name="tondeuses"> and PostgREST
-- maps resource names directly to table names. Without this rename,
-- all CRUD operations return 404.
--
-- Postgres RENAME TO preserves indexes, RLS policies, FK constraints,
-- and triggers automatically.
--
-- NOTE: contrat_entretien, parc, parc_tondeuse, parc_contrat are also
-- singular but their UIs do not exist yet (TASK-009/010). Renaming
-- those tables is deferred to when their frontend resources are built.

ALTER TABLE public.tondeuse RENAME TO tondeuses;
