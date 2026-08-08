import { languageSystemCode, translateBase } from '#basis/locale';
import { Badge } from '#shared/components/ui/badge';
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
import { CmComWidDef } from 'shared/api';
import { checkIsNil } from 'shared/utils/checkIs';
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
    queryFn: () => cmTsjrpcClient.takeComwVisitsCount({ comw: ccom?.wid ?? CmComWidDef }),
    enabled: !!ccom?.wid,
  });

  if (!ccom) return;

  return (
    <>
      <BottomPopupItem
        id="transpose-tool"
        icon="SlidersHorizontal"
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : ''}
        titleNode={<span className="@min-[100px]:visible invisible">{translateBase(it => it.cm.com.ton)}</span>}
        onClick={event => event.stopPropagation()}
        rightNode={
          <div className="flex justify-between gap-1">
            <TheIconButton
              icon="MinusSign"
              className="minus"
              onClick={() => cmIDB.fixComTransPos(ccom.wid, ccom.transPosition - 1)}
            />
            <Badge
              className={twMerge(
                'min-w-13 flex justify-center',
                checkIsNil(ifixedCom?.ton) ? 'text-x3 bg-x2' : 'bg-x7 text-x2',
              )}
              onClick={() => cmIDB.fixComTransPos(ccom.wid, null)}
            >
              {ccom.getFixedTonica()}
            </Badge>
            <TheIconButton
              icon="PlusSign"
              className="plus"
              onClick={() => cmIDB.fixComTransPos(ccom.wid, ccom.transPosition + 1)}
            />
          </div>
        }
      />

      <BottomPopupItem
        id="font-size-tool"
        icon="TextFont"
        titleNode={<span className="@min-[120px]:visible invisible">{translateBase(it => it.fontSize)}</span>}
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
        {translateBase(it => it.cm.com.addToolByClick)}
      </div>
      {comToolsNode}

      <div className="opacity-50 w-full py-2 px-5 text-x7">
        <CmComCatMentions com={ccom} />
      </div>

      <div className="ml-7 my-5 [&_.face-logo]:bg-x2!">
        <CmComJoinGroupList
          comw={ccom.wid}
          children={comJoinsList =>
            !comJoinsList.length || <div className="mb-2">{translateBase(it => it.cm.com.crossLinks)}</div>
          }
          importantOnClick={({ defaultClick }) => {
            onClose(false);
            defaultClick();
          }}
        />
      </div>

      <div className="w-full opacity-50 flex center gap-2 text-xs py-3">
        {visitsCountQuery.isLoading ? (
          <TheIconLoading />
        ) : (
          translateBase(it => it.lookedN, { n: visitsCountQuery.data ?? 0 })
        )}
      </div>
      <div className="w-full opacity-50 text-center text-xs py-3 white-pre">
        {translateBase(it => it.cm.com.addMod, {
          w: makeDateLabel(ccom.wid, languageSystemCode),
          m: makeDateLabel(ccom.mod, languageSystemCode),
        })}
      </div>
    </>
  );
};
