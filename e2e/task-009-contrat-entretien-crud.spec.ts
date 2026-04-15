import { test, expect } from "./fixtures";

test.describe("Contrat Entretien CRUD", () => {
  test("non-admin user cannot see delete button on contrat show page", async ({
    page,
    createUser,
    createSales,
    createContratEntretien,
  }) => {
    // Arrange: create an admin (first user) so subsequent users are non-admin
    await createUser({
      email: "admin@test.com",
      password: "password",
    });

    // Create a non-admin sales user
    await createSales({
      email: "user@test.com",
      password: "password",
      first_name: "Regular",
      last_name: "User",
    });

    // Create a contrat via the admin supabase client
    const contrat = await createContratEntretien({
      nom: "Contrat Test",
      periodicite: "annuelle",
      prix: 500,
      date_debut: "2026-01-01",
      date_fin: "2026-12-31",
      statut: "actif",
    });

    // Act: sign in as the non-admin user
    await page.goto("http://localhost:5175/");
    await page.getByLabel("Email").fill("user@test.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForLoadState("networkidle");

    // Navigate to the contrat show page
    await page.goto(
      `http://localhost:5175/#/contrats_entretien/${contrat.id}/show`,
    );
    await page.waitForLoadState("networkidle");

    // Assert: contrat details should be visible
    await expect(page.getByText("Contrat Test")).toBeVisible();

    // Assert: delete button should NOT be visible for non-admin
    await expect(
      page.getByRole("button", { name: /Delete|Supprimer/ }),
    ).not.toBeVisible();
  });

  test("admin can create, view, edit, and see delete button for a contrat", async ({
    page,
    dismissToast,
  }) => {
    // Sign up as admin user
    await page.goto("http://localhost:5175/");
    await expect(page.getByText("Welcome")).toBeVisible();

    await page.getByLabel("First name").fill("Admin");
    await page.getByLabel("Last name").fill("User");
    await page.getByLabel("Email").fill("admin@test.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Create account" }).click();
    await page.waitForLoadState("networkidle");

    // Navigate to Contrats d'entretien
    await page.getByRole("link", { name: "Contrats d'entretien" }).click();
    await page.waitForLoadState("networkidle");

    // Create a new contrat
    await page.getByRole("link", { name: /Create/ }).click();
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Nom *").fill("Contrat Annuel Pro");
    // Select periodicite
    await page.getByLabel("Periodicite *").click();
    await page.getByRole("option", { name: "Annuelle" }).click();
    await page.getByLabel("Prix *").fill("1200");
    await page.getByLabel("Date de debut *").fill("2026-01-01");
    await page.getByLabel("Date de fin *").fill("2026-12-31");
    // Statut should default to "actif"
    await page.getByLabel("Statut *").click();
    await page.getByRole("option", { name: "Actif" }).click();

    await page.getByRole("button", { name: "Save" }).click();
    await dismissToast("Element created");

    // Should redirect to show page
    await expect(page.getByText("Contrat Annuel Pro")).toBeVisible();
    await expect(page.getByText("1200")).toBeVisible();
    await expect(page.getByText("Annuelle")).toBeVisible();
    await expect(page.getByText("Actif")).toBeVisible();

    // Delete button should be visible for admin
    await expect(
      page.getByRole("button", { name: /Delete|Supprimer/ }),
    ).toBeVisible();

    // Navigate to edit
    await page.getByRole("link", { name: /Edit|Modifier/ }).click();
    await page.waitForLoadState("networkidle");

    // Edit form should be pre-populated
    await expect(page.getByLabel("Nom *")).toHaveValue("Contrat Annuel Pro");

    // Update the name
    await page.getByLabel("Nom *").clear();
    await page.getByLabel("Nom *").fill("Contrat Semestriel Pro");
    await page.getByRole("button", { name: "Save" }).click();
    await dismissToast("Element updated");

    // Should redirect back to show with updated data
    await expect(page.getByText("Contrat Semestriel Pro")).toBeVisible();

    // Navigate to list
    await page.getByRole("link", { name: "Contrats d'entretien" }).click();
    await page.waitForLoadState("networkidle");

    // Should see the contrat in the list
    await expect(page.getByText("Contrat Semestriel Pro")).toBeVisible();
  });
});
