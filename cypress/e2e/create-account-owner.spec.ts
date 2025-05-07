describe("Create Account Owner Page", () => {
    const mockUserId = "test-owner-id";
  
    beforeEach(() => {
      cy.visit(`/owner/${mockUserId}/create`);
    });
  
    it("fills out the form and submits successfully", () => {
      // Fill gym name
      cy.get('input[name="gymName"]').type("Iron Haven");
  
      // Fill first name
      cy.get('input[name="firstName"]').type("Jane");
  
      // Fill last name
      cy.get('input[name="lastName"]').type("Doe");
  
      // Fill description
      cy.get('textarea[name="description"]').type("A modern gym for strength training and fitness.");
  
      // Click Create
      cy.contains("button", "Create").click();
  
      // Optionally check for navigation or success (if redirect or state change occurs)
      // For example, check for new URL:
      // cy.url().should("include", `/owner/${mockUserId}`);
    });
  });
  