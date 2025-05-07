describe("Create Individual Account Page", () => {
  const mockUserId = "test-user-id";

  beforeEach(() => {
    cy.visit(`/individual/${mockUserId}/create`);
  });

  it("fills out individual form and submits", () => {
    // Fill first name
    cy.get('input[name="firstName"]').type("John");

    // Fill last name
    cy.get('input[name="lastName"]').type("Smith");

    // Submit the form
    cy.contains("button", "Save").click();

    // Optionally assert navigation to individual detail page
    // cy.url().should("include", `/individual/${mockUserId}`);
  });
});
