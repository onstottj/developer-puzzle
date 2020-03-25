import {
  getGoogleChart,
  getGreeting,
  getPeriodInput,
  getPeriodOption,
  getPricesList,
  getSubmitButton,
  getSymbolInput
} from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to Stocks!');
  });

  it('should display a chart and prices list', function() {
    getSymbolInput().type('AAPL');
    getPeriodInput().click();
    getPeriodOption()
      .contains('Two years')
      .click();

    getSubmitButton().click();

    getGoogleChart();
    getPricesList();
  });
});
