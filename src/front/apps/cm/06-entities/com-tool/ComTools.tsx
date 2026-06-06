import { Badge } from '#shared/components/ui/badge';
import { mylib } from '#shared/lib/my-lib';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComMaxFontSize, cmComMinFontSize } from '$cm/shared/const';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
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

  const visitsCountQuery = useQuery({
    queryKey: ['cmTsjrpcClient.takeComwVisitsCount', ccom?.wid],
    queryFn: () => cmTsjrpcClient.takeComwVisitsCount({ comw: ccom?.wid ?? CmComWid.def }),
    enabled: !!ccom?.wid,
  });

  if (!ccom) return null;

  return (
    <>
      <BottomPopupItem
        id="transpose-tool"
        icon="SlidersHorizontal"
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : ''}
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
              disabled={fontSize <= cmComMinFontSize}
              onClick={() => cmComFontSizeAtom.do.increment(-1)}
            />

            <Badge
              className={twMerge('min-w-13 flex justify-center bg-x2', fontSize < 0 ? 'text-x7' : 'text-x3')}
              onClick={() => cmComFontSizeAtom.set(fs => -fs)}
            >
              {fontSize < 0 ? 'auto' : fontSize}
            </Badge>
            <TheIconButton
              className="plus"
              icon="PlusSign"
              disabled={fontSize < 0 || fontSize >= cmComMaxFontSize}
              onClick={() => cmComFontSizeAtom.do.increment()}
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

      <div className="ml-7 my-5 [&_.face-logo]:bg-x2!">
        <CmComJoinGroupList
          com={ccom}
          children={comJoinsList => !comJoinsList.length || <div className="mb-2">Связанные песни</div>}
          importantOnClick={({ defaultClick }) => {
            onClose(false);
            defaultClick();
          }}
        />
      </div>

      <div className="w-full opacity-50 flex center gap-2 text-xs py-3">
        Просмотрели
        {visitsCountQuery.isLoading ? (
          <TheIconLoading />
        ) : (
          <>
            {' '}
            {visitsCountQuery.data} {mylib.declension(visitsCountQuery.data ?? 0, 'раз', 'раза', 'раз')}
          </>
        )}
      </div>
      <div className="w-full opacity-50 flex flex-col text-xs py-3">
        <div>Добавлена: {makeDateLabel(ccom.wid)}</div>
        {Math.trunc(ccom.wid) !== Math.trunc(ccom.mod) && <div>Обновлена: {makeDateLabel(ccom.mod)}</div>}
      </div>
    </>
  );
};
