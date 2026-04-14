import { describe, it, expect } from "vitest";
import { canAccess } from "./canAccess";

describe("canAccess", () => {
  describe("admin role", () => {
    it("returns true for any action on any resource", () => {
      expect(canAccess("admin", { action: "list", resource: "contacts" })).toBe(
        true,
      );
      expect(canAccess("admin", { action: "edit", resource: "deals" })).toBe(
        true,
      );
      expect(
        canAccess("admin", { action: "delete", resource: "contacts" }),
      ).toBe(true);
      expect(
        canAccess("admin", { action: "delete", resource: "companies" }),
      ).toBe(true);
      expect(canAccess("admin", { action: "list", resource: "sales" })).toBe(
        true,
      );
      expect(
        canAccess("admin", { action: "edit", resource: "configuration" }),
      ).toBe(true);
    });
  });

  describe("user role (non-admin)", () => {
    it("can read and write contacts", () => {
      expect(canAccess("user", { action: "list", resource: "contacts" })).toBe(
        true,
      );
      expect(canAccess("user", { action: "edit", resource: "contacts" })).toBe(
        true,
      );
      expect(
        canAccess("user", { action: "create", resource: "contacts" }),
      ).toBe(true);
    });

    it("can read and write companies", () => {
      expect(
        canAccess("user", { action: "list", resource: "companies" }),
      ).toBe(true);
      expect(
        canAccess("user", { action: "edit", resource: "companies" }),
      ).toBe(true);
    });

    it("can read and write deals", () => {
      expect(canAccess("user", { action: "list", resource: "deals" })).toBe(
        true,
      );
      expect(canAccess("user", { action: "edit", resource: "deals" })).toBe(
        true,
      );
    });

    it("can read and write tasks", () => {
      expect(canAccess("user", { action: "list", resource: "tasks" })).toBe(
        true,
      );
      expect(canAccess("user", { action: "edit", resource: "tasks" })).toBe(
        true,
      );
    });

    it("can read and write notes", () => {
      expect(
        canAccess("user", { action: "list", resource: "contact_notes" }),
      ).toBe(true);
      expect(
        canAccess("user", { action: "edit", resource: "deal_notes" }),
      ).toBe(true);
    });

    it("cannot delete any resource", () => {
      expect(
        canAccess("user", { action: "delete", resource: "contacts" }),
      ).toBe(false);
      expect(
        canAccess("user", { action: "delete", resource: "companies" }),
      ).toBe(false);
      expect(canAccess("user", { action: "delete", resource: "deals" })).toBe(
        false,
      );
      expect(canAccess("user", { action: "delete", resource: "tasks" })).toBe(
        false,
      );
      expect(
        canAccess("user", { action: "delete", resource: "contact_notes" }),
      ).toBe(false);
      expect(
        canAccess("user", { action: "delete", resource: "deal_notes" }),
      ).toBe(false);
    });

    it("cannot access the sales resource", () => {
      expect(canAccess("user", { action: "list", resource: "sales" })).toBe(
        false,
      );
      expect(canAccess("user", { action: "edit", resource: "sales" })).toBe(
        false,
      );
    });

    it("cannot access the configuration resource", () => {
      expect(
        canAccess("user", { action: "list", resource: "configuration" }),
      ).toBe(false);
      expect(
        canAccess("user", { action: "edit", resource: "configuration" }),
      ).toBe(false);
    });
  });
});
