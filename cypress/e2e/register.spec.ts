describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/auth/register');
    });
  
    it('fills and submits the registration form', () => {
      // Fill email
      cy.get('#email').type('test@example.com');
  
      // Fill password
      cy.get('#password').type('TestPassword123');
  
      // Re-type password
      cy.get('#passwordtwo').type('TestPassword123');
  
      // Select Member role (already default)
      // If role selector is interactive, include interaction here
      // cy.get('[data-testid="role-member"]').click(); // if needed
  
      // Fill gym code for member
      cy.get('#code').type('GYMCODE123');
  
      // Submit the form
      cy.contains('button', 'Create').click();
  
      // You can check for expected behavior after submit
      // Example: Redirect, toast, or API call mock
      // cy.url().should('include', '/some-expected-path');
    });
  
    it('triggers Google Sign Up', () => {
      cy.contains('button', 'Sign up with Google').click();
  
      // Since Appwrite handles this via redirect,
      // just checking the click is enough unless mocking OAuth
    });
  });
  