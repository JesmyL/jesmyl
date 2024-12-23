import { useState } from 'react';
import useModal from '../../../../complect/modal/useModal';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconBookDownloadStrokeRounded } from '../../../../complect/the-icon/icons/book-download';
import { IconBookOpen02StrokeRounded } from '../../../../complect/the-icon/icons/book-open-02';
import { IconDelete02StrokeRounded } from '../../../../complect/the-icon/icons/delete-02';
import { IconPencilEdit02StrokeRounded } from '../../../../complect/the-icon/icons/pencil-edit-02';
import { soki } from '../../../../soki';
import { bibleMolecule } from '../molecules';
import { bibleAllTranslates, BibleTranslateName, translateDescriptions } from './complect';
import { useBibleMyTranslates } from './hooks';

export default function BibleModulesTranslationsRedactButton(): JSX.Element {
  const [myTranslates, setMyTranslates] = useBibleMyTranslates();

  const [translateOnLoad, setTranslateOnLoad] = useState<BibleTranslateName | null>(null);

  const [modalNode, openModal] = useModal(({ body, header }) => {
    return (
      <>
        {header(<>Переводы Библии</>)}
        {body(
          <>
            <h3 className="margin-gap-v text-bold">Загруженные переводы</h3>
            {myTranslates.map(tName => {
              const isUnremovable = myTranslates.length < 2;
              const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

              return (
                <IconButton
                  key={tName}
                  Icon={isUnremovable ? IconBookOpen02StrokeRounded : IconDelete02StrokeRounded}
                  className="margin-gap-l margin-gap-v"
                  iconClassName={isUnremovable ? undefined : 'color--ko'}
                  disabled={isUnremovable}
                  confirm={`Удалить безвозвратно модуль  "${title}"`}
                  prefix={title}
                  onClick={() => {
                    setMyTranslates(prev => prev.filter(name => name !== tName));
                    bibleMolecule.rem(tName);
                  }}
                />
              );
            })}
            <h3 className="margin-gap-v text-bold">Доступные к загрузке</h3>
            {bibleAllTranslates.map(tName => {
              if (myTranslates.includes(tName)) return null;
              const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

              return (
                <IconButton
                  key={tName}
                  Icon={IconBookDownloadStrokeRounded}
                  className="margin-gap-l margin-gap-v"
                  prefix={title}
                  disabled={translateOnLoad !== null}
                  onClick={() => {
                    setTranslateOnLoad(tName);
                    soki.send({ download: tName }, 'bible').on(() => {
                      setMyTranslates(prev => [...prev, tName]);
                      setTranslateOnLoad(null);
                    });
                  }}
                />
              );
            })}
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconPencilEdit02StrokeRounded}
        onClick={openModal}
      />
    </>
  );
}
