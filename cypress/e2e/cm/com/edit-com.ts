import { Cyp } from '../../complect';

export const cyTestCmEditCom = (withComWidAction: () => string) => {
  it('actions with com tools', () => {
    cy.visit(`${Cyp.host}/cm/i/?comw=${withComWidAction()}`);

    cy.get('#phase-container-header-more-button').click().wait(1000);
    cy.get('.com-tool-edit-com').last().click();
  });
};
