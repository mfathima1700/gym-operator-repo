describe('TrackerPage End-to-End Test', () => {
    beforeEach(() => {
      // Visiting the page before each test case
      cy.visit('/tracker/1');  // Replace '/tracker/1' with the actual URL if needed
    });
  
    it('should render the page correctly', () => {
      // Verify if the page title is correct
      cy.contains('Fitness & Nutrition Tracker').should('exist');
  
      // Ensure the nutrition form is present
      cy.get('form').should('exist');
      cy.get('input[name="activity"]').should('exist');
      cy.get('input[name="weight"]').should('exist');
      cy.get('input[name="duration"]').should('exist');
      cy.get('input[name="quantity"]').should('exist');
      cy.get('input[name="item"]').should('exist');
      cy.get('button').contains('Calculate').should('exist');
    });
  
    it('should calculate calories correctly on form submission', () => {
      // Enter data into the form
      cy.get('input[name="activity"]').type('Running');
      cy.get('input[name="weight"]').type('150');
      cy.get('input[name="duration"]').type('30');
  
      // Click on Calculate button to calculate calories
      cy.get('button').contains('Calculate').click();
  
      // Ensure that the exercise table is populated with results
      cy.get('.FitnessTable').should('contain', 'Total Calories');
      cy.get('.FitnessTable').find('tr').should('have.length.greaterThan', 1);
    });
  
    it('should calculate nutrition info correctly on form submission', () => {
      // Enter data into the form for nutrition
      cy.get('input[name="quantity"]').type('2');
      cy.get('input[name="item"]').type('Apple');
  
      // Click on Calculate button to calculate nutrition info
      cy.get('button').contains('Calculate').click();
  
      // Ensure that the nutrition table is populated with results
      cy.get('.FoodTable').should('contain', 'Calories');
      cy.get('.FoodTable').find('tr').should('have.length.greaterThan', 1);
    });
  
    it('should display error when invalid data is entered', () => {
      // Enter invalid data (e.g., text instead of numbers)
      cy.get('input[name="weight"]').type('Invalid Weight');
      cy.get('input[name="duration"]').type('Invalid Duration');
  
      // Attempt to calculate with invalid input
      cy.get('button').contains('Calculate').click();
  
      // Verify if an error message appears or the form is not submitted
      cy.get('.error-message').should('be.visible');
    });
  
    it('should navigate to a different page if user is redirected', () => {
      // Simulate user interaction that causes a redirect
      cy.get('button').contains('Go to Another Page').click();  // Replace with actual interaction
  
      // Check if the URL changes
      cy.url().should('include', '/new-page');  // Replace with the expected URL
    });
  
    /*
    it('should display user data after fetching from Redux store', () => {
      // Simulate a scenario where user data is already fetched from the store
      cy.window().then((window) => {
        window.store.dispatch({
          type: 'GET_USER_SUCCESS',
          payload: { name: 'John Doe', goals: ['Weight Loss'], gym: { id: '1' } },
        });
      });
  
      // Verify if the user's name appears in the layout
      cy.get('.user-name').should('contain', 'John Doe');
    });*/
  });
  