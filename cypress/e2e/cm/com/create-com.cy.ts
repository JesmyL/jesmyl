import { Cyp } from '../../complect';

export const cyTestCmCreateCom = () => {
  it('create com', () => {
    cy.visit(`${Cyp.host}/cm/edit`);

    const observeLink = prompt('URL для скачивания песни', 'https://holychords.pro/956');

    if (!observeLink) return;

    cy.get('#edit-coms').click();
    cy.get('#phase-container-header-more-button').click();
    cy.get('#create-com-button').click();
    cy.get('.url-observer-input-wrapper').type(observeLink, { animationDistanceThreshold: 100 });

    cy.get('.url-observer-send-button').click();
    cy.get('#new-com-parse-text-button').click();

    cy.get('#new-com-input-wrapper input').then(inputElement => {
      const comTitle = inputElement.attr('value') ?? '';

      cy.get('#header-new-audio + .com-audio-track .add-com-audio-button').click();
      cy.get('#public-new-com-button').click();

      cy.get('#footer-button-cm-all').click();
      cy.get('.debounced-input input').type(comTitle, { animationDistanceThreshold: 1 });
    });
  });
};
