import { Button } from '#shared/components';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { WithAtom } from '#shared/ui/WithAtom';

export const CmComCommentSintaxInfo = () => {
  const constructText = (text: string, accentText: string | null) => (
    <span
      className="text-x7"
      dangerouslySetInnerHTML={{
        __html: text.replaceAll(accentText ?? text, all => `<span class="text-xKO">${all}</span>`),
      }}
    />
  );
  const descriptionText = (text: string, inBrackets: string) => (
    <>
      <span className="font-bold">{text}</span>
      <span className="opacity-50">({inBrackets})</span>
    </>
  );

  return (
    <WithAtom init={false}>
      {atom => (
        <>
          <Button
            icon="MessageQuestion"
            onClick={atom.do.toggle}
            className="w-full"
          >
            Синтаксис
          </Button>
          <Modal openAtom={atom}>
            <ModalHeader>Синтаксис</ModalHeader>
            <ModalBody className="flex custom-align-items flex-col gap-2 pre-text">
              <div>Напиши с начала строки в любом блоке комментов</div>
              <div className="ml-2">
                {constructText('!', null)} - для {descriptionText('акцента', '!')}
              </div>
              <div className="ml-2">
                {constructText('!!', null)} - для усиленного {descriptionText('акцента', '!!')}
              </div>
              <div className="ml-2 mt-2">
                {constructText('2', null)} - для определения комментария над {descriptionText('второй', '2')} строкой
              </div>
              <div className="ml-2">
                {constructText('3:4', ':4')} - правила для {descriptionText('четвёртого', ':4')} слова на{' '}
                {descriptionText('третей', '3')} строке
              </div>
              <div className="ml-4">
                {constructText('8:5 [<!!текст до]', '<')} - вставка "текст до" {descriptionText('перед', '<')}{' '}
                {descriptionText('пятым', ':5')} словом {descriptionText('восьмой', '8')} строки с{' '}
                {descriptionText('усиленным', '!!')} акцентом
              </div>
              <div className="ml-4">
                {constructText('2:6 [>!текст за]', '>')} - вставка "текст за" {descriptionText('после', '>')}{' '}
                {descriptionText('шестого', ':6')} слова {descriptionText('второй', '2')} строки с{' '}
                {descriptionText('акцентом', '!')}
              </div>
              <div className="ml-4">
                {constructText('1:3 [^!]', '^')} - акцент первого {descriptionText('аккорда', '^')} над{' '}
                {descriptionText('третим', ':3')} словом {descriptionText('первой', '1')} строки
              </div>
              <div className="ml-4">
                {constructText('5:2 [^. !!E]', 'E')} - усиленный акцент второго {descriptionText('аккорда', '^')} (с его
                заменой на E) над {descriptionText('вторым', ':2')} словом {descriptionText('пятой', '5')} строки;
                пропуск правил для {descriptionText('первого', '.')} {descriptionText('аккорда', '^')}
              </div>
              <div className="ml-4">
                {constructText('8:3 [^!<pre|]', '<')} - {descriptionText('акцент', '!')} первого{' '}
                {descriptionText('аккорда', '^')}, с добавлением текста "pre|" {descriptionText('перед', '<')} самим
                аккордом над {descriptionText('третим', ':3')} словом {descriptionText('восьмой', '8')} строки
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </WithAtom>
  );
};
