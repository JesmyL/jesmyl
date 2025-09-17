import { Badge } from '#shared/components/ui/badge';
import { mylib } from '#shared/lib/my-lib';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { useFixedCcom } from '$cm/basis/lib/com-selections';
import { cmComFontSizeAtom } from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { useAtom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CmComCatMentions } from '../useGetCatMentions';
import { useMigratableListComTools } from './lib/useMigratableComTools';

export const ComTools = () => {
  const ccom = useFixedCcom();
  const [fontSize, setFontSize] = useAtom(cmComFontSizeAtom);
  const [chordVisibleVariant] = useChordVisibleVariant();
  const comToolsNode = useMigratableListComTools();
  const ifixedCom = useLiveQuery(() => ccom && cmIDB.tb.fixedComs.get(ccom.wid), [ccom?.wid]);
  const [visitsCount, setVisitsCount] = useState<null | number>(null);

  useEffect(() => {
    if (ccom?.wid == null) return;

    (async () => {
      const visitsCount = await cmTsjrpcClient.takeComwVisitsCount({ comw: ccom.wid });
      setVisitsCount(visitsCount);
    })();
  }, [ccom?.wid]);

  if (!ccom) return null;

  return (
    <>
      <BottomPopupItem
        id="transpose-tool"
        icon="SlidersHorizontal"
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : undefined}
        titleNode={<span className="@min-[100px]:visible invisible">Тональность</span>}
        onClick={event => event.stopPropagation()}
        rightNode={
          <div className="flex justify-between gap-1">
            <TheIconButton
              icon="MinusSign"
              className="minus"
              onClick={() => ccom.transpose(-1)}
            />
            <Badge
              className={twMerge('min-w-13 flex justify-center bg-x2', ifixedCom?.ton == null ? 'text-x7' : 'text-x3')}
              onClick={() => ccom.setChordsInitialTon()}
            >
              {ccom.getFirstSimpleChord()}
            </Badge>
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
        titleNode={<span className="@min-[120px]:visible invisible">Размер шрифта</span>}
        onClick={event => event.stopPropagation()}
        rightNode={
          <div className="flex justify-between gap-1">
            <TheIconButton
              className="minus"
              icon="MinusSign"
              disabled={fontSize <= minFontSize}
              onClick={() => setFontSize(changeFontSize(-1))}
            />

            <Badge
              className={twMerge('min-w-13 flex justify-center bg-x2', fontSize < 0 ? 'text-x7' : 'text-x3')}
              onClick={() => setFontSize(changeFontSize(0))}
            >
              {fontSize < 0 ? 'auto' : fontSize}
            </Badge>
            <TheIconButton
              className="plus"
              icon="PlusSign"
              disabled={fontSize < 0 || fontSize >= maxFontSize}
              onClick={() => setFontSize(changeFontSize(1))}
            />
          </div>
        }
      />

      <div className="flex justify-center text-center w-full opacity-50 text-xs mt-3">
        Клик на иконку для добавления в быстрое меню
      </div>
      {comToolsNode}

      <div className="opacity-50 w-full py-2 px-5 text-x7">
        <CmComCatMentions com={ccom} />
      </div>

      <div className="w-full opacity-50 flex center gap-2 text-xs py-3">
        Просмотрели
        {visitsCount === null ? (
          <TheIconLoading />
        ) : (
          ` ${visitsCount} ${mylib.declension(visitsCount, 'раз', 'раза', 'раз')}`
        )}
      </div>
      <div className="w-full opacity-50 flex flex-col text-xs py-3">
        <div>Добавлена: {new Date(ccom.wid).toLocaleString('ru')}</div>
        {Math.trunc(ccom.wid) !== Math.trunc(ccom.mod) && (
          <div>Обновлена: {new Date(ccom.mod).toLocaleString('ru')}</div>
        )}
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
