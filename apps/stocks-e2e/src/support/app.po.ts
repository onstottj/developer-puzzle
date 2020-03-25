export const getGreeting = () => cy.get('h1');
export const getSymbolInput = () => cy.get('[data-cy=symbolInput]');
export const getPeriodInput = () => cy.get('mat-select');
export const getPeriodOption = () => cy.get('.mat-option-text');
export const getSubmitButton = () => cy.get('button');
export const getGoogleChart = () => cy.get('google-chart');
export const getPricesList = () => cy.contains('average price per month');
