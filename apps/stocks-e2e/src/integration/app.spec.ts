import {
  getGoogleChart,
  getGreeting,
  getPeriodInput,
  getPeriodOption,
  getSymbolInput
} from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to stocks!');
  });

  it('should retrieve stock prices without having to hit a submit button', function() {
    getSymbolInput().type('AAPL');
    getPeriodInput().click();
    getPeriodOption()
      .contains('Two years')
      .click();
    getGoogleChart();
  });
});
