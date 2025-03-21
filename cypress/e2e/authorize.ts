import { Cyp } from './complect';

export const cyTestAuthorize = (doTestTitle?: string, doTest?: () => void) => {
  it(doTestTitle ?? 'authorize', () => {
    const tgAuthCode = +prompt('Код для авторизации', '')!;
    cy.log('Код для авторизации', tgAuthCode);

    if (tgAuthCode) {
      cy.visit(`${Cyp.host}/!other/cm`);
      cy.wait(2000);

      doTest?.();

      cy.get('#authorize-button').click();
      cy.get('#input-the-tg-code-button').click();
      cy.get('.input-keyboard-flash-controlled input').type('' + tgAuthCode, { animationDistanceThreshold: 200 });
      cy.get('#tg-auth-code-send-button').click();
      cy.wait(2000);
    }
  });
};

export const cyTestReauthorize = () => {
  cyTestAuthorize('re authorize', () => {
    cy.get('#profile-info').click();
    cy.get('#log-out-button').click();
    cy.get('#confirm-button-YES').click();
  });
};
