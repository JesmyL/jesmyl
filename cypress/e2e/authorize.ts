import { Cyp } from './complect';

export const cyTestAuthorize = (doTestTitle?: string, doTest?: () => Promise<void>) => {
  it(doTestTitle ?? 'authorize', async () => {
    const tgAuthCode = +prompt('Код для авторизации', '')!;
    cy.visit(`${Cyp.host}/cm/!other`);

    if (tgAuthCode) {
      await doTest?.();

      cy.get('#authorize-button').click();
      cy.get('#input-the-tg-code-button').click();
      cy.get('.input-keyboard-flash-controlled input').type('' + tgAuthCode, { animationDistanceThreshold: 200 });
      cy.get('#tg-auth-code-send-button').click();
    }
  });
};

export const cyTestReauthorize = () => {
  cyTestAuthorize('re authorize', async () => {
    cy.get('#profile-info').click();
    cy.get('#log-out-button').click();
    cy.get('#confirm-button-YES').click();
  });
};
