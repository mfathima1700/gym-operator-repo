describe("Owner Checkout Page", () => {
    const mockUserId = "test-owner-id";
  
    beforeEach(() => {
      cy.visit(`/owner/${mockUserId}/billing/checkout/`);
    });
  
    it("displays order summary and triggers Stripe checkout on button click", () => {
      // Assert the product name and price
      cy.contains("Gym Ownership Subscription").should("be.visible");
      cy.contains("£50.00").should("be.visible");
  
      // Intercept the createCheckoutOwnerSession call
      cy.intercept("POST", "/api/checkout/session", {
        statusCode: 200,
        body: { sessionId: "test-session-id" },
      }).as("createCheckoutSession");
  
      // Stub Stripe redirectToCheckout to avoid actual redirect
      cy.window().then((win) => {
        const stripeMock = {
          redirectToCheckout: cy.stub().resolves({}),
        };
      
        win.Stripe = () => stripeMock as unknown as import('@stripe/stripe-js').Stripe;
      });
  
      // Click "Pay Now" and confirm the request is made
      cy.contains("button", "Pay Now").click();
      cy.wait("@createCheckoutSession");
    });
  });
  