describe('sign up process', () => {
  beforeEach(() => {
    cy.deleteUser('ilovecoding123');
    cy.visit('/');
  });

  it('can sign up successfully, sign in successfully, and sign out', () => {
    cy.get('[data-cy="sign-up"]').click();
    cy.get('[data-cy="signup-title"]');
    cy.signup({
      username: 'ilovecoding123',
      email: 'ilovecoding@ilovecoding.com',
      password: 'm1b4VnsrRt3j0PZ6nqq1',
      confirmPassword: 'm1b4VnsrRt3j0PZ6nqq1',
    });

    cy.url().should('include', '/auth/signin');
    cy.get('[data-cy="signin-title"]');
    cy.signin({
      username: 'ilovecoding123',
      password: 'm1b4VnsrRt3j0PZ6nqq1',
    });

    cy.url().should('not.contain', 'auth');

    cy.get('[data-cy="sign-out"]').click();
    cy.get('[data-cy="home-page-title"]');
  });
});

export {};
