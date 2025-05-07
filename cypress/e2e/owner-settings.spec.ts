describe('Owner Settings Page', () => {
    const ownerId = '1234'; // You may need to mock this or use a test user
  
    beforeEach(() => {
      cy.intercept('GET', `/api/user/${ownerId}`, {
        fixture: 'user.json',
      }).as('getUser');
  
      cy.intercept('POST', '/api/settings/update', {
        statusCode: 200,
        body: { success: true },
      }).as('updateSettings');
  
      cy.visit(`/owner/settings/${ownerId}`);
      cy.wait('@getUser');
    });
  
    it('renders all form fields', () => {
      cy.get('input[name="gymName"]').should('exist');
      cy.get('input[name="gymCode"]').should('exist');
      cy.get('textarea[name="description"]').should('exist');
      cy.get('select#country').should('exist');
      cy.get('input[name="city"]').should('exist');
      cy.get('input[name="state"]').should('exist');
      cy.get('input[name="streetAddress"]').should('exist');
      cy.get('input[name="postcode"]').should('exist');
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="phoneNumber"]').should('exist');
      cy.get('input[name="email"]').should('be.disabled');
    });
  
    it('allows regenerating gym code', () => {
      cy.get('input[name="gymCode"]').invoke('val').then((oldCode) => {
        cy.contains('button', 'Regenerate').click();
        cy.get('input[name="gymCode"]').should('have.value', oldCode).and('not.have.value', oldCode);
      });
    });
  
    it('fills and submits the form successfully', () => {
      cy.get('input[name="gymName"]').clear().type('New Gym Name');
      cy.get('textarea[name="description"]').clear().type('A great gym in town.');
      cy.get('input[name="city"]').clear().type('Berlin');
      cy.get('input[name="state"]').clear().type('Berlin');
      cy.get('input[name="streetAddress"]').clear().type('Fitnessstraße 5');
      cy.get('input[name="postcode"]').clear().type('10115');
      cy.get('input[name="name"]').clear().type('John Doe');
      cy.get('input[name="phoneNumber"]').clear().type('+491234567890');
  
      cy.get('input[type="radio"][value="critical-only"]').check({ force: true });
  
      cy.contains('button', 'Save').click();
  
      cy.wait('@updateSettings');
      cy.url().should('include', `/owner/${ownerId}`);
    });
  });
  