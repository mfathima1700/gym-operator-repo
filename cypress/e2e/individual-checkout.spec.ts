describe("Individual Checkout Page", () => {
    beforeEach(() => {
      // Replace with actual API route if different
      cy.intercept("GET", "/api/users/user123", {
        statusCode: 200,
        body: {
          gym: {
            id: "gym123",
            classes: [],
          },
        },
      }).as("getUser");
  
      cy.intercept("POST", "/api/billing/individual-checkout", {
        statusCode: 200,
        body: {
          sessionId: "mock_session_123",
        },
      }).as("checkoutSession");
  
      cy.visit("/checkout/individual/user123");
    });
  
    it("renders the page and handles checkout", () => {
      cy.contains("Checkout").should("be.visible");
      cy.contains("Gym Membership Subscription").should("exist");
      cy.contains("£25.00").should("exist");
  
      cy.intercept("POST", "**/v1/checkout/sessions", (req) => {
        req.reply({ id: "cs_test_mocked" });
      });
  
      // Optionally stub Stripe redirect
      cy.window().then((win) => {
        const stripeMock = {
          redirectToCheckout: cy.stub().resolves({}),
        };
      
        win.Stripe = () => stripeMock as unknown as import('@stripe/stripe-js').Stripe;
      });
  
      cy.contains("Pay Now").click();
  
      cy.wait("@checkoutSession").its("request.body").should("include", {
        id: "user123",
      });
    });
  });
  