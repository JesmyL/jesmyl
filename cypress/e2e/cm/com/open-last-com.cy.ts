import { Cyp } from '../../complect';

export const cyTestCmOpenLastCom = (scrollSpeed: number, comWidStrTop: string) => {
  const withComWidAction = (comWidStr?: string) => {
    if (comWidStr !== undefined) comWidStrTop = comWidStr;
    return comWidStrTop;
  };

  it('open last com', () => {
    if (!scrollSpeed) return;

    cy.visit(`${Cyp.host}/cm/i`);

    let lastId: und | string = '';

    const onLastFound = () => {
      if (!lastId) return;

      cy.get(`#${lastId} .face-title`)
        .last()
        .then(element => {
          const lastComTitle = element.text();
          cy.log(lastComTitle, element);

          cy.get('.com-search input').type(lastComTitle);
          cy.get(`#${lastId}`).click();
          withComWidAction(lastId?.split('_').findLast(() => 1) ?? '');
        });
    };

    const scroll = () => {
      cy.get('.com-list .face-item:last-child')
        .scrollIntoView({ duration: scrollSpeed })
        .then(el => {
          const id = el.attr('id');

          if (id === lastId) {
            onLastFound();
            return;
          }

          lastId = id;
          scroll();
        });
    };

    scroll();
  });

  return withComWidAction;
};
