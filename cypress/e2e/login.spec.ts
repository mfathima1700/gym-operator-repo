describe('Login Page E2E Test', () => {
    beforeEach(() => {
      cy.visit('/auth/login'); // Adjust the route as needed
    });
  
    it('logs in a user and redirects based on role', () => {
      cy.intercept('POST', '/api/auth/signin', {
        statusCode: 200,
        body: {
          success: true,
          user: {
            id: '68126cd5b4dcac5dd300960c',
            gymRole: 'OWNER',
            ownedGym: true,
          }
        }
      }).as('loginRequest');
  
      cy.get('#email').type('sdfsdfsdfsd@fsdfsdfd.com');
      cy.get('#password').type('password');
  
      // Click the "Sign in" button
      cy.contains('button', 'Sign in').click();
  
      cy.wait('@loginRequest');
      cy.url().should('include', '/owner/68126cd5b4dcac5dd300960c');
    });
  
    it('redirects OWNER to gym creation if no gym exists', () => {
      cy.intercept('POST', '/api/auth/signin', {
        statusCode: 200,
        body: {
          success: true,
          user: {
            id: 'user-123',
            gymRole: 'OWNER',
            ownedGym: false,
          }
        }
      }).as('loginRequest');
  
      cy.get('#email').type('owner2@example.com');
      cy.get('#password').type('password123');
      cy.contains('button', 'Sign in').click();
      cy.wait('@loginRequest');
      cy.url().should('include', '/owner/user-123/create');
    });
  
    it('shows error message on login failure', () => {
      cy.intercept('POST', '/api/auth/signin', {
        statusCode: 401,
        body: {
          success: false,
          error: 'Invalid credentials',
        }
      }).as('loginFail');
  
      cy.get('#email').type('bad@example.com');
      cy.get('#password').type('wrongpassword');
      cy.contains('button', 'Sign in').click();
      cy.wait('@loginFail');
  
      // You need to show an error in the UI for this to pass
      cy.contains('Invalid credentials').should('exist');
    });
  });
  