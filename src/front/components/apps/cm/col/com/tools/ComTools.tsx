import { mylib } from '#shared/lib/my-lib';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmIDB } from '$cm/_db/cm-idb';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { useFixedCcom } from '$cm/basis/lib/com-selections';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { cmComClientInvocatorMethods } from '$cm/editor/lib/cm-editor-invocator.methods';
import { Chip, useMediaQuery } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { CmComCatMentions } from '../useGetCatMentions';
import { useMigratableListComTools } from './lib/useMigratableComTools';

export const ComTools = () => {
  const ccom = useFixedCcom();
  const [fontSize, setFontSize] = cmIDB.use.comFontSize();
  const [chordVisibleVariant] = useChordVisibleVariant();
  const comToolsNode = useMigratableListComTools();
  const ifixedCom = useLiveQuery(() => ccom && cmIDB.tb.fixedComs.get(ccom.wid), [ccom?.wid]);
  const [visitsCount, setVisitsCount] = useState<null | number>(null);

  useEffect(() => {
    if (ccom?.wid == null) return;

    (async () => {
      const visitsCount = await cmComClientInvocatorMethods.takeComwVisitsCount(null, ccom.wid);
      setVisitsCount(visitsCount);
    })();
  }, [ccom?.wid]);
  const isSmallDevice = useMediaQuery('(max-width: 350px)');

  if (!ccom) return null;

  return (
    <>
      <BottomPopupItem
        id="transpose-tool"
        icon="SlidersHorizontal"
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : undefined}
        title={isSmallDevice ? '' : 'Тональность'}
        onClick={event => event.stopPropagation()}
        rightNode={
          <div className="flex justify-between gap-1">
            <TheIconButton
              icon="MinusSign"
              className="minus"
              onClick={() => ccom.transpose(-1)}
            />
            <Chip
              label={ccom.getFirstSimpleChord()}
              className={'min-w-13 flex justify-center'}
              onClick={() => ccom.setChordsInitialTon()}
              classes={{ label: ifixedCom?.ton == null ? 'text-x7' : 'text-x3' }}
            />
            <TheIconButton
              icon="PlusSign"
              className="plus"
              onClick={() => ccom.transpose(1)}
            />
          </div>
        }
      />

      <BottomPopupItem
        id="font-size-tool"
        icon="TextFont"
        title={isSmallDevice ? '' : 'Размер шрифта'}
        onClick={event => event.stopPropagation()}
        rightNode={
          <div className="flex justify-between gap-1">
            <TheIconButton
              className="minus"
              icon="MinusSign"
              disabled={fontSize <= minFontSize}
              onClick={() => setFontSize(changeFontSize(-1))}
            />
            <Chip
              label={fontSize < 0 ? 'auto' : fontSize}
              className="min-w-13 flex justify-center"
              onClick={() => setFontSize(changeFontSize(0))}
              classes={{ label: fontSize < 0 ? 'text-x7' : 'text-x3' }}
            />
            <TheIconButton
              className="plus"
              icon="PlusSign"
              disabled={fontSize < 0 || fontSize >= maxFontSize}
              onClick={() => setFontSize(changeFontSize(1))}
            />
          </div>
        }
      />

      <div className="flex justify-center text-center w-full fade-05 text-xs mt-3">
        Клик на иконку для добавления в быстрое меню
      </div>
      {comToolsNode}

      <div className="fade-05 w-full py-2 px-5 text-x7">
        <CmComCatMentions com={ccom} />
      </div>

      <div className="full-width fade-05 flex center flex-gap font-size:0.7em py-3">
        Просмотрели
        {visitsCount === null ? (
          <TheIconLoading />
        ) : (
          ` ${visitsCount} ${mylib.declension(visitsCount, 'раз', 'раза', 'раз')}`
        )}
      </div>
      <div className="full-width fade-05 flex center font-size:0.7em py-3">
        Добавлено: {new Date(ccom.wid).toLocaleString('ru')}
      </div>
    </>
  );
};

const maxFontSize = 50;
const minFontSize = 5;

const changeFontSize = (delta: number) => {
  return (prev: number) => {
    if (delta === 0) return -prev;
    if (delta < 0 && prev <= minFontSize) return prev;
    if (delta > 0 && prev >= maxFontSize) return prev;

    return prev + delta;
  };
};
