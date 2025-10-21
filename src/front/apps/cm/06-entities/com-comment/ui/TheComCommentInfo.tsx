import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { CmComCommentForExample } from './ForExample';
import { TheCmComCommentBibleTextsInfo } from './TheComCommentBibleTextsInfo';

const isOpenBibleInfoAtom = atom(false);

export function TheCmComCommentInfo({ HashSwitcherIcon }: { HashSwitcherIcon: KnownStameskaIconName }) {
  const italicBlockNumber_ = <i>номер блока</i>;

  return (
    <div className="">
      <p>
        Если блоки не пронумерованы, жми{' '}
        <LazyIcon
          icon={HashSwitcherIcon}
          className="align-middle"
        />
      </p>

      <p>
        Термин <b>Запись</b> означает текст, записанный с новой строки и символом # до следующей такой
        последовательности
        <br />
        Термин <b>Заметка</b> означает текст, сформированный из Записей
        <br />
        Термин <b>Предисловие</b> означает текст, записанный до первой Записи
      </p>

      <p>
        Предисловие будет вставлено перед песней
        <br />
        {'Оно может содержать Библейские '}
        <span
          className="pointer text-x7 underline italic"
          onClick={isOpenBibleInfoAtom.do.toggle}
        >
          тексты
        </span>
      </p>

      <p>
        <b>#({italicBlockNumber_}) запись</b> - Для прикрепления Записи к блоку, начни писать его с новой строки в такой
        последовательности как в примере.
        <CmComCommentForExample>#7 моя запись</CmComCommentForExample>
        <br />
        Все такие Записи собираются в одну Заметку под якорем # (по примеру #7)
      </p>

      <p>
        <b>#1 #2</b> - Для написания следующей Записи отдели их минимум одним переносом строки
        <CmComCommentForExample>
          #1 запись
          <br />
          #2 запись
          <br />
          <br />
          #1 ещё запись для первого блока
        </CmComCommentForExample>
      </p>

      <p>
        <b>!!</b> - Два восклицательных знака, следующих сразу друг за другом, в любом месте Записи для блока выделит
        всю Заметку красным цветом
        <CmComCommentForExample>#1 вся заметка будет красным цветом!!</CmComCommentForExample>
      </p>

      <p>
        <b>!</b> - Восклицательный знак в любом месте Записи для блока выделит всю Заметку акцентным цветом
        <CmComCommentForExample>#3 вся заметка будет акцентной!</CmComCommentForExample>
      </p>

      <p>
        {'!! > !'} - Двойной восклицательный знак имеет преимущество перед одинарным для акцентирования цвета
        <CmComCommentForExample>#2 вся заметка! будет красной!!</CmComCommentForExample>
      </p>

      <p>
        <span className="opacity-50">#({italicBlockNumber_})</span>
        <b>!</b> - Запись с восклицательным знаком после '{italicBlockNumber_}' будет первой в итоговой Заметке для
        блока
        <CmComCommentForExample>
          #4 запись которой не станет
          <br />
          #1 какая-то запись
          <br />
          #4! эта запись перекроет все предыдущие записи для 4-го блока
        </CmComCommentForExample>
      </p>

      <p>
        <b>##</b>
        <span className="opacity-50">({italicBlockNumber_})</span> - Для внесения Записи ко всем блокам, относящимся к
        общему типу, указанному в '{italicBlockNumber_}'. Важно то, что записи, относящиеся к текущей выборке,
        написанные выше, имеют приоритет перед текущей записью, кроме случая, если указать знак приоритета данной записи
        (<span className="opacity-50">##5</span>
        <b>!</b>)
        <CmComCommentForExample>##5 - эта запись появится во всех одноимённых блоках как и #5</CmComCommentForExample>
      </p>

      <p>
        <b>[...]</b> - Всё, написанное в [квадратных скобках] редактировать не нужно - это вспомогательная информация о
        целевом блоке. Эти тексты вставляются и редактируются автоматически
      </p>

      <Modal openAtom={isOpenBibleInfoAtom}>
        <TheCmComCommentBibleTextsInfo />
      </Modal>
    </div>
  );
}
