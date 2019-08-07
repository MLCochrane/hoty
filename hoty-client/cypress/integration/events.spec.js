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
    cy.get('[data-cy="page-bar-content"]').within(($content) => {
      cy.get($content).contains('Hey Luke, check out the latest going on or add a new event');
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
    cy.get('[data-cy="event-list-item"]').as('eventListItem');
    // cy.window().its('store').invoke('getState').its('events')
    //   .its('events')
    //   .as('events');
    // cy.get('@events').then((ev) => {
    //   const count = ev.length;
    //   cy.get('[data-cy="event-list-item"]').should('have.length', count);
    // });
    cy.get('[data-cy="event-list"]').within(() => {
      cy.get('@eventListItem').should('have.length', 2);
      cy.get('@eventListItem').first().contains('Event number one');
      cy.get('@eventListItem').first().contains('This one has times.');
      cy.get('@eventListItem').first().contains('July 15, 2019');
    });
  });

  it('displays event when clicked', () => {
    cy.get('[data-cy="event-list-item"]').as('eventListItem');

    cy.get('[data-cy="event-overview"]').should('not.exist');
    cy.get('[data-cy="event-cta"]').contains('Something fun going down?!');
    cy.get('[data-cy="event-cta"]').within(() => {
      cy.get('button').contains('Create');
    });
    cy.get('@eventListItem').first().click().then(() => {
      cy.get('[data-cy="event-content"]').as('eventContent');
      cy.get('[data-cy="event-date"]').as('eventDate');
      cy.get('[data-cy="event-title"]').as('eventTitle');
      cy.get('[data-cy="event-host"]').as('eventHost');

      cy.get('[data-cy="event-cta"]').should('not.exist');
      cy.get('[data-cy="event-overview"]').children().should('have.length', 1);
      cy.get('@eventContent').should('have.length', 1);
      cy.get('@eventDate').contains('July 15, 2019 at 6:50pm');
      cy.get('@eventTitle').contains('Event number one');
      cy.get('@eventHost').contains('Luke Cochrane');
      cy.get('@eventListItem').eq(1).click();
      cy.get('@eventContent').contains('Event number one').should('not.exist');
      cy.get('@eventContent').should('have.length', 1);
      cy.get('@eventDate').contains('July 18, 2019 at 5:26pm');
      cy.get('@eventTitle').contains('Event number two');
      cy.get('@eventContent').contains('Dates amiright');
      cy.get('@eventHost').contains('John Smith');
    });
  });

  it('filters events from buttons in page bar', () => {
    expect(true).eq(false);
  });

  it('displays fab and links to form', () => {
    cy.get('[data-cy="event-fab"]').should('be.length', 1);
    cy.get('[data-cy="event-fab"]').click();
    cy.get('[data-cy="events"]').should('not.exist');
    cy.url().should('include', '/events/create');
  });
});

describe('Create events page', () => {
  it('will not display if not logged in', () => {
    cy.visit('localhost:3001/events/create');
    cy.get('[data-cy="create-event"]').should('not.exist');
    cy.get('[data-cy="header"]').should('not.exist');
    cy.login();
    cy.visit('localhost:3001/events/create');
    cy.get('[data-cy="create-events"]');
    cy.get('[data-cy="header"]');
  });
});

describe('Create events page content', () => {
  beforeEach(() => {
    cy.login();
    // cy.route('GET', 'http://localhost:3000/users/event', 'fixture:events.json');
    cy.visit('localhost:3001/events/create');
  });

  it('displays title and caption', () => {
    cy.get('[data-cy="page-bar"]').should('have.length', 1);
    cy.get('[data-cy="page-bar-title"]').should('have.length', 1);
    cy.get('[data-cy="page-bar-title"]').contains('Create new event');
    cy.get('[data-cy="page-bar-content"]').within(($content) => {
      cy.get($content).contains('I\'m excited already!');
    });
  });

  it('displays stepper correctly', () => {
    cy.get('[data-cy="event-form-stepper"]').should('have.length', 1);
    cy.get('[data-cy="event-form-step"]').should('have.length', 3);
    cy.get('[data-cy="event-form-step"]').should('not.have.class', 'MuiStep-completed');
    cy.get('[data-cy="event-form-title"]').contains('Overview');
    cy.get('[data-cy="event-form-next"]').contains('Next');
    cy.get('[data-cy="event-form-next"]').click();
    cy.get('[data-cy="event-form-step"]').first().should('have.class', 'MuiStep-completed');
    cy.get('[data-cy="event-form-title"]').contains('Themes');
    cy.get('[data-cy="event-form-next"]').click();
    cy.get('[data-cy="event-form-step"]').eq(1).should('have.class', 'MuiStep-completed');
    cy.get('[data-cy="event-form-next"]').contains('Publish');
    cy.get('[data-cy="event-form-title"]').contains('Review and Publish');
    // cy.get('[data-cy="event-form-next"]').click();
    // cy.get('[data-cy="event-form-step"]').eq(2).should('have.class', 'MuiStep-completed');
  });

  it('lets users select new themes', () => {
    cy.get('[data-cy="event-form-next"]').click().then(() => {
      cy.get('[data-cy="event-form-title"]').contains('Themes');
      cy.get('[data-cy="event-form-themes"] > li').should('have.length', 3);
      cy.get('[data-cy="event-theme-checked-false"]').should('have.length', 3);
      cy.get('[data-cy="event-form-themes"] > li').first().within(() => {
        cy.contains('celebration');
        cy.contains('🎉');
        cy.get('[data-cy="event-theme-checked-false"]').should('have.length', 1);
      });
      cy.get('[data-cy="event-form-themes"] > li').eq(1).within(() => {
        cy.contains('sports');
        cy.contains('🏈');
        cy.get('[data-cy="event-theme-checked-false"]').should('have.length', 1);
      });
      cy.get('[data-cy="event-form-themes"] > li').eq(2).within(() => {
        cy.contains('party');
        cy.contains('🥤');
        cy.get('[data-cy="event-theme-checked-false"]').should('have.length', 1);
      });
      cy.get('[data-cy="event-form-themes"] > li').first().click();
      cy.get('[data-cy="event-form-themes"] > li').first().find('[data-cy="event-theme-checked-true"]').should('have.length', 1);
      cy.get('[data-cy="event-form-themes"] > li').first().click();
      cy.get('[data-cy="event-form-themes"] > li').first().find('[data-cy="event-theme-checked-false"]').should('have.length', 1);
    });
  });

  it('displaysy the event review', () => {
    cy.get('input[name="title"]').type('Event title');
    cy.get('textarea[name="description"]').type('This would be the description content.');
    cy.get('[data-cy="event-form-next"]').click();
    cy.get('[data-cy="event-form-themes"] > li').first().click();
    cy.get('[data-cy="event-form-themes"] > li').eq(1).click();
    cy.get('[data-cy="event-form-next"]').click();
    cy.get('[data-cy="event-form-review"]').contains('Event title');
    cy.get('[data-cy="event-form-review"]').contains('This would be the description content.');
    cy.get('[data-cy="event-form-review"]').contains('🎉');
    cy.get('[data-cy="event-form-review"]').contains('🏈');
    cy.get('[data-cy="event-form-review"]').contains('July 25, 12:36pm');
  });

  // it('closes when exit button clicked', () => {
  //   cy.get('[data-cy="create-events"]').within(() => {
  //     cy.get('[data-cy="close-form"]').click();
  //   });
  //   cy.url().should('not.include', '/events/create');
  // });
});
