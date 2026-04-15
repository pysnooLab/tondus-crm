-- Fix: Tondus RLS policies used auth.jwt() ->> 'role' to check for
-- 'utilisateur'/'admin' strings, but the Supabase JWT 'role' field
-- contains the Postgres role ('authenticated'), not a custom app role.
-- No custom_access_token_hook is configured to inject app roles.
--
-- Decision: Align with the pattern used by all other atomic-crm tables:
--   SELECT  → to authenticated using (true)
--   INSERT  → to authenticated with check (true)
--   UPDATE  → to authenticated using (true) with check (true)
--   DELETE  → to authenticated using (public.is_admin())
--
-- Pros: Consistent with contacts, companies, deals, tags, tasks.
--       Uses the existing is_admin() function (subquery on sales.administrator).
--       No JWT customization or auth hook needed.
-- Cons: None — the prior JWT-based approach was non-functional for all users.
-- Rationale: The JWT 'role' claim is always 'authenticated' in this project.
--            The is_admin() function is the established pattern for admin gating.

-- ===== tondeuse =====

-- SELECT: already uses auth.role() = 'authenticated', which works. Rewrite
-- to match the simpler pattern used by other tables for consistency.
DROP POLICY IF EXISTS "Authenticated users can read tondeuse" ON public.tondeuse;
CREATE POLICY "Enable read access for authenticated users"
  ON public.tondeuse FOR SELECT
  TO authenticated
  USING (true);

-- INSERT: was broken (checked jwt role = 'utilisateur'/'admin')
DROP POLICY IF EXISTS "Utilisateur or admin can insert tondeuse" ON public.tondeuse;
DROP POLICY IF EXISTS "Admin can insert tondeuse" ON public.tondeuse;
CREATE POLICY "Enable insert for authenticated users"
  ON public.tondeuse FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE: was broken (checked jwt role = 'utilisateur'/'admin')
DROP POLICY IF EXISTS "Utilisateur or admin can update tondeuse" ON public.tondeuse;
DROP POLICY IF EXISTS "Admin can update tondeuse" ON public.tondeuse;
CREATE POLICY "Enable update for authenticated users"
  ON public.tondeuse FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE: keep admin-only, but use is_admin() instead of broken jwt check
DROP POLICY IF EXISTS "Admin can delete tondeuse" ON public.tondeuse;
CREATE POLICY "Enable delete for admins"
  ON public.tondeuse FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ===== contrat_entretien =====

DROP POLICY IF EXISTS "Authenticated users can read contrat_entretien" ON public.contrat_entretien;
CREATE POLICY "Enable read access for authenticated users"
  ON public.contrat_entretien FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Utilisateur or admin can insert contrat_entretien" ON public.contrat_entretien;
CREATE POLICY "Enable insert for authenticated users"
  ON public.contrat_entretien FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Utilisateur or admin can update contrat_entretien" ON public.contrat_entretien;
CREATE POLICY "Enable update for authenticated users"
  ON public.contrat_entretien FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can delete contrat_entretien" ON public.contrat_entretien;
CREATE POLICY "Enable delete for admins"
  ON public.contrat_entretien FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ===== parc =====

DROP POLICY IF EXISTS "Authenticated users can read parc" ON public.parc;
CREATE POLICY "Enable read access for authenticated users"
  ON public.parc FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Utilisateur or admin can insert parc" ON public.parc;
CREATE POLICY "Enable insert for authenticated users"
  ON public.parc FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Utilisateur or admin can update parc" ON public.parc;
CREATE POLICY "Enable update for authenticated users"
  ON public.parc FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can delete parc" ON public.parc;
CREATE POLICY "Enable delete for admins"
  ON public.parc FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ===== parc_tondeuse =====

DROP POLICY IF EXISTS "Authenticated users can read parc_tondeuse" ON public.parc_tondeuse;
CREATE POLICY "Enable read access for authenticated users"
  ON public.parc_tondeuse FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Utilisateur or admin can write parc_tondeuse" ON public.parc_tondeuse;
CREATE POLICY "Enable insert for authenticated users"
  ON public.parc_tondeuse FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can delete parc_tondeuse" ON public.parc_tondeuse;
CREATE POLICY "Enable delete for admins"
  ON public.parc_tondeuse FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ===== parc_contrat =====

DROP POLICY IF EXISTS "Authenticated users can read parc_contrat" ON public.parc_contrat;
CREATE POLICY "Enable read access for authenticated users"
  ON public.parc_contrat FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Utilisateur or admin can write parc_contrat" ON public.parc_contrat;
CREATE POLICY "Enable insert for authenticated users"
  ON public.parc_contrat FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can delete parc_contrat" ON public.parc_contrat;
CREATE POLICY "Enable delete for admins"
  ON public.parc_contrat FOR DELETE
  TO authenticated
  USING (public.is_admin());
