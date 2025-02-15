import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import Modal from '../../../../../../../../complect/modal/Modal/Modal';
import { TheComCommentForExample } from './ForExample';
import TheComCommentBibleTextsInfo from './TheComCommentBibleTextsInfo';

export default function TheComCommentInfo({ HashSwitcherIcon }: { HashSwitcherIcon: TheIconKnownName }) {
  const italicBlockNumber_ = <i>номер блока</i>;
  const [isOpenBibleInfo, setIsOpenBibleInfo] = useState<unknown>(false);

  return (
    <div className="">
      <p>
        Если блоки не пронумерованы, жми{' '}
        <LazyIcon
          icon={HashSwitcherIcon}
          className="vertical-middle"
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
          className="pointer color--7 text-underline text-italic"
          onClick={setIsOpenBibleInfo}
        >
          тексты
        </span>
      </p>

      <p>
        <b>#({italicBlockNumber_}) запись</b> - Для прикрепления Записи к блоку, начни писать его с новой строки в такой
        последовательности как в примере.
        <TheComCommentForExample>#7 моя запись</TheComCommentForExample>
        <br />
        Все такие Записи собираются в одну Заметку под якорем # (по примеру #7)
      </p>

      <p>
        <b>#1 #2</b> - Для написания следующей Записи отдели их минимум одним переносом строки
        <TheComCommentForExample>
          #1 запись
          <br />
          #2 запись
          <br />
          <br />
          #1 ещё запись для первого блока
        </TheComCommentForExample>
      </p>

      <p>
        <b>!!</b> - Два восклицательных знака, следующих сразу друг за другом, в любом месте Записи для блока выделит
        всю Заметку красным цветом
        <TheComCommentForExample>#1 вся заметка будет красным цветом!!</TheComCommentForExample>
      </p>

      <p>
        <b>!</b> - Восклицательный знак в любом месте Записи для блока выделит всю Заметку акцентным цветом
        <TheComCommentForExample>#3 вся заметка будет акцентной!</TheComCommentForExample>
      </p>

      <p>
        {'!! > !'} - Двойной восклицательный знак имеет преимущество перед одинарным для акцентирования цвета
        <TheComCommentForExample>#2 вся заметка! будет красной!!</TheComCommentForExample>
      </p>

      <p>
        <span className="fade-05">#({italicBlockNumber_})</span>
        <b>!</b> - Запись с восклицательным знаком после '{italicBlockNumber_}' будет первой в итоговой Заметке для
        блока
        <TheComCommentForExample>
          #4 запись которой не станет
          <br />
          #1 какая-то запись
          <br />
          #4! эта запись перекроет все предыдущие записи для 4-го блока
        </TheComCommentForExample>
      </p>

      <p>
        <b>##</b>
        <span className="fade-05">({italicBlockNumber_})</span> - Для внесения Записи ко всем блокам, относящимся к
        общему типу, указанному в '{italicBlockNumber_}'. Важно то, что записи, относящиеся к текущей выборке,
        написанные выше, имеют приоритет перед текущей записью, кроме случая, если указать знак приоритета данной записи
        (<span className="fade-05">##5</span>
        <b>!</b>)
        <TheComCommentForExample>##5 - эта запись появится во всех одноимённых блоках как и #5</TheComCommentForExample>
      </p>

      <p>
        <b>[...]</b> - Всё, написанное в [квадратных скобках] редактировать не нужно - это вспомогательная информация о
        целевом блоке. Эти тексты вставляются и редактируются автоматически
      </p>

      <>
        {isOpenBibleInfo && (
          <Modal onClose={setIsOpenBibleInfo}>
            <TheComCommentBibleTextsInfo />
          </Modal>
        )}
      </>
    </div>
  );
}
