describe('Events page', () => {
  it('will not display if not logged in', () => {
    cy.visit('localhost:3001/events');
    cy.get('[data-cy="events"]').should('not.exist');
    cy.get('[data-cy="header"]').should('not.exist');
    cy.get('[data-cy="landing"]');
    cy.login();
    cy.visit('localhost:3001/events');
    cy.get('[data-cy="events"]');
    cy.get('[data-cy="header"]');
    cy.get('[data-cy="landing"]').should('not.exist');
  });
});

describe('Events page content', () => {
  before(() => {
    cy.login();
    cy.route('GET', 'http://localhost:3000/users/event', 'fixture:events.json');
    cy.visit('localhost:3001/events');
  });

  it('displays title and filters', () => {
    cy.get('[data-cy="page-bar"]').should('have.length', 1);
    cy.get('[data-cy="page-bar-title"]').should('have.length', 1);
    cy.get('[data-cy="page-bar-title"]').contains('Events');
    cy.get('[data-cy="page-bar-content"]').within(() => {
      cy.get('button')
        .should(($el) => {
          expect($el).to.have.length(4);
          const filter = $el.map((i, el) => Cypress.$(el).attr('data-filter'));

          expect(filter.get()).to.deep.eq([
            'all',
            'upcoming',
            'past',
            'current',
          ]);
        });
    });
  });

  it('displays event list', () => {
    // cy.window().its('store').invoke('getState').its('events')
    //   .its('events')
    //   .as('events');
    // cy.get('@events').then((ev) => {
    //   const count = ev.length;
    //   cy.get('[data-cy="event-list-item"]').should('have.length', count);
    // });
    cy.get('[data-cy="event-list"]').within(() => {
      cy.get('[data-cy="event-list-item"]').should('have.length', 2);
      cy.get('[data-cy="event-list-item"]').first().contains('Event number one');
      cy.get('[data-cy="event-list-item"]').first().contains('This one has times.');
      cy.get('[data-cy="event-list-item"]').first().contains('July 15, 2019');
    });
  });

  it('displays event when clicked', () => {
    cy.get('[data-cy="event-overview"]').should('not.exist');
    cy.get('[data-cy="event-cta"]').contains('Something fun going down?!');
    cy.get('[data-cy="event-cta"]').within(() => {
      cy.get('button').contains('Create');
    });
    cy.get('[data-cy="event-list-item"]').first().click();
    cy.get('[data-cy="event-cta"]').should('not.exist');
    cy.get('[data-cy="event-overview"]').contains('Event number two').should('not.exist');
    cy.get('[data-cy="event-list-item"]').eq(1).click();
    cy.get('[data-cy="event-overview"]').contains('Event number one').should('be.visible');
  });

  it('filters events from buttons in page bar', () => {
    expect(true).eq(false);
  });

  it('displays fab', () => {
    cy.get('[data-cy="event-fab"]').should('be.length', 1);
  });
});
