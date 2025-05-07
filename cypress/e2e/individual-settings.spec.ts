describe("Individual Settings Page", () => {
    const mockUser = {
      id: "user123",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "1234567890",
      country: "uk",
      image: "",
      emailNotifications: "everything",
      pushNotifications: "everything",
      gym: {
        name: "Awesome Gym",
      },
    };
  
    beforeEach(() => {
      cy.intercept("GET", "/api/users/user123", {
        statusCode: 200,
        body: { user: mockUser },
      }).as("getUser");
  
      cy.intercept("POST", "/api/users/user123/update", {
        statusCode: 200,
        body: { success: true },
      }).as("updateUser");
  
      cy.visit("/individual/user123/settings");
      cy.wait("@getUser");
    });
  
    it("displays user data and allows editing", () => {
      cy.get('input[name="name"]').should("have.value", mockUser.name);
      cy.get('input[name="email"]').should("have.value", mockUser.email).should("be.disabled");
      cy.get('input[name="phoneNumber"]').should("have.value", mockUser.phoneNumber);
      cy.get("#country").should("contain.text", "United Kingdom");
  
      // Change name and country
      cy.get('input[name="name"]').clear().type("Janet Doe");
      cy.get("#country").click();
      cy.contains("Canada").click();
    });
  
    it("submits updated form data", () => {
      cy.get('input[name="name"]').clear().type("Janet Doe");
      cy.get("#country").click();
      cy.contains("Canada").click();
  
      cy.contains("Save").click();
      cy.wait("@updateUser").its("request.body").should("include", {
        name: "Janet Doe",
        country: "ca",
      });
    });
  
    it("deletes account when confirmed", () => {
      // Stub Appwrite account.get and deleteMember action
      cy.intercept("GET", "/v1/account", { $id: "account456" }).as("getAccount");
  
      cy.intercept("POST", "/api/users/user123/delete", {
        statusCode: 200,
        body: { success: true },
      }).as("deleteAccount");
  
      cy.contains("Delete Account").click(); // Opens dialog
      cy.contains("Confirm").click(); // Assuming confirm button inside <DeleteDialog />
  
      cy.wait("@deleteAccount");
    });
  });
  