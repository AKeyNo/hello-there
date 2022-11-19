/// <reference types="cypress" />
import { SignInFields, SignUpFields } from '../../types/types';

declare global {
  namespace Cypress {
    interface Chainable {
      deleteUser(username: string): Chainable<void>;
      signup(user: SignUpFields): Chainable<void>;
      signin(user: SignInFields): Chainable<void>;
    }
  }
}

// deletes based off username
Cypress.Commands.add('deleteUser', (username: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:3000/api/user/${username}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('signin', (user: SignInFields) => {
  cy.get('input[name=username]').type(user.username);
  cy.get('input[name=password]').type(user.password);

  cy.get('[data-cy="user-sign-in"]').click();
});

Cypress.Commands.add('signup', (user: SignUpFields) => {
  cy.get('input[name=username]').type(user.username);
  cy.get('input[name=email]').type(user.email);
  cy.get('input[name=password]').type(user.password);
  cy.get('input[name=confirmPassword]').type(user.confirmPassword);

  cy.get('[data-cy="user-create-an-account"]').click();
});

export {};
