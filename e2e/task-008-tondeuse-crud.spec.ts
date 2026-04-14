import { test, expect } from "./fixtures";

test.describe("Tondeuse CRUD", () => {
  test("admin can create, view, edit, and see delete button for a tondeuse", async ({
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

    // Navigate to Tondeuses
    await page.getByRole("link", { name: "Tondeuses" }).click();
    await page.waitForLoadState("networkidle");

    // Create a new tondeuse
    await page.getByRole("link", { name: /Create/ }).click();
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Nom *").fill("Tondeuse Pro 3000");
    await page.getByLabel("Prix *").fill("299.99");
    await page.getByLabel("Description").fill("Tondeuse professionnelle");
    // Actif should default to true (checked)
    await expect(page.getByLabel("Actif")).toBeChecked();

    await page.getByRole("button", { name: "Save" }).click();
    await dismissToast("Element created");

    // Should redirect to show page
    await expect(page.getByText("Tondeuse Pro 3000")).toBeVisible();
    await expect(page.getByText("299.99")).toBeVisible();
    await expect(page.getByText("Actif", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Tondeuse professionnelle"),
    ).toBeVisible();

    // Delete button should be visible for admin
    await expect(
      page.getByRole("button", { name: /Delete|Supprimer/ }),
    ).toBeVisible();

    // Navigate to edit
    await page.getByRole("link", { name: /Edit|Modifier/ }).click();
    await page.waitForLoadState("networkidle");

    // Edit form should be pre-populated
    await expect(page.getByLabel("Nom *")).toHaveValue("Tondeuse Pro 3000");
    await expect(page.getByLabel("Prix *")).toHaveValue("299.99");

    // Update the name
    await page.getByLabel("Nom *").clear();
    await page.getByLabel("Nom *").fill("Tondeuse Pro 4000");
    await page.getByRole("button", { name: "Save" }).click();
    await dismissToast("Element updated");

    // Should redirect back to show with updated data
    await expect(page.getByText("Tondeuse Pro 4000")).toBeVisible();

    // Navigate to list
    await page.getByRole("link", { name: "Tondeuses" }).click();
    await page.waitForLoadState("networkidle");

    // Should see the tondeuse in the list
    await expect(page.getByText("Tondeuse Pro 4000")).toBeVisible();
  });
});
