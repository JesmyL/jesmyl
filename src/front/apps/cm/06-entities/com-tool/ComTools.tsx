import { Badge } from '#shared/components/ui/badge';
import { mylib } from '#shared/lib/my-lib';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ChordVisibleVariant } from '$cm/shared/model';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCmComCurrentFixedCom } from '../com/lib/com-selections';
import { cmComChordVisibleVariantAtom, cmComFontSizeAtom } from '../com/state/atoms';
import { CmComCatMentions } from '../com/ui/ComCatMentions';
import { CmComJoinGroupList } from '../ComJoinGroupList';
import { useCmComToolMigratableList } from './lib/useMigratableComTools';

export const CmComToolList = ({ onClose }: { onClose: (is: false) => void }) => {
  const ccom = useCmComCurrentFixedCom();
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);
  const comToolsNode = useCmComToolMigratableList();
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
              onClick={() => cmIDB.tb.fixedComs.put({ w: ccom.wid, ton: (ccom.transPosition ?? 0) - 1 })}
            />
            <Badge
              className={twMerge('min-w-13 flex justify-center bg-x2', ifixedCom?.ton == null ? 'text-x7' : 'text-x3')}
              onClick={async () => {
                const fixed = { ...(await cmIDB.tb.fixedComs.get(ccom.wid)) };
                delete fixed.ton;
                await cmIDB.tb.fixedComs.put(fixed);
              }}
            >
              {ccom.getFirstSimpleChord()}
            </Badge>
            <TheIconButton
              icon="PlusSign"
              className="plus"
              onClick={() => cmIDB.tb.fixedComs.put({ w: ccom.wid, ton: (ccom.transPosition ?? 0) + 1 })}
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
              onClick={() => cmComFontSizeAtom.set(changeFontSize(-1))}
            />

            <Badge
              className={twMerge('min-w-13 flex justify-center bg-x2', fontSize < 0 ? 'text-x7' : 'text-x3')}
              onClick={() => cmComFontSizeAtom.set(changeFontSize(0))}
            >
              {fontSize < 0 ? 'auto' : fontSize}
            </Badge>
            <TheIconButton
              className="plus"
              icon="PlusSign"
              disabled={fontSize < 0 || fontSize >= maxFontSize}
              onClick={() => cmComFontSizeAtom.set(changeFontSize(1))}
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
      <div className="ml-7">
        <CmComJoinGroupList
          com={ccom}
          children={comJoinsList => !comJoinsList.length || <div className="mt-7">Связанные песни</div>}
          importantOnClick={({ defaultClick }) => {
            onClose(false);
            defaultClick();
          }}
        />
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
