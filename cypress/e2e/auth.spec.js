// <reference types="cypress" />;
describe('login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('로그인').click();
  });

  it('display error message when user login fails', () => {
    cy.url().should('include', 'login');

    const usernameText = 'yuchung';
    const passwordText = 'yuchung1234';

    cy.get(`[data-testid="username"]`)
      .type(usernameText)
      .should('have.value', usernameText);
    cy.get(`[data-testid="password"]`)
      .type(passwordText)
      .should('have.value', passwordText);
    cy.get('button[type=submit]').click();
    cy.get('.error').should('be.visible');
  });

  it('fails to access protected recource', async () => {
    cy.visit('/user/account');
    cy.get('.warning').should('be.visible');
  });

  it('can visit login page & login submission failure', async () => {
    const usernameText = 'yuch';
    const passwordText = 'yuch2009ung';

    cy.get(`[data-testid="username"]`)
      .type(usernameText)
      .should('have.value', usernameText);
    cy.get(`[data-testid="password"]`)
      .type(passwordText)
      .should('have.value', passwordText);
    cy.get('button[type=submit]').click();
    await cy.contains('계정').should('be.visible');
  });
});
