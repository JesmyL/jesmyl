import { Cyp } from '../../complect';

export const cyTestCmActionsWithComTools = (withComWidAction: () => string) => {
  it('actions with com tools', () => {
    cy.visit(`${Cyp.host}/cm/i/?comw=${withComWidAction()}`);

    cy.wait(100);
    cy.get('#com-comment-panel').scrollIntoView({ duration: 2000 });
    cy.get('#phase-container-header-more-button').as('openToolsButton').click();
    cy.get('#font-size-tool').as('fontSizeTool');
    cy.get('#transpose-tool').as('transposeTool');

    cy.get('@transposeTool').find('.minus').click().wait(300).click().wait(300).click().wait(300);
    cy.get('@transposeTool').find('.plus').click().wait(300).click().wait(300).click().wait(300);
    cy.get('@transposeTool').find('.center').click();

    cy.wait(777);

    cy.get('@fontSizeTool').find('.minus').click().wait(300).click().wait(300).click().wait(300);
    cy.get('@fontSizeTool').find('.plus').click().wait(300).click().wait(300).click().wait(300);
    cy.get('@fontSizeTool').find('.center').click().wait(500).click();

    cy.wait(300);

    cy.get('.com-tool-mark-com .icon-box').click().wait(500).click();

    cy.get('#com-tools-bottom-popup')
      .scrollTo('center', { duration: 500 })
      .scrollTo('bottom', { duration: 1500 })
      .scrollTo('top', { duration: 1500 });
  });
};
