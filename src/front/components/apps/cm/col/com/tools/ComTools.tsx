import { useLiveQuery } from 'dexie-react-hooks';
import { BottomPopupItem } from '../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import { IconMinusSignStrokeRounded } from '../../../../../../complect/the-icon/icons/minus-sign';
import { IconPlusSignStrokeRounded } from '../../../../../../complect/the-icon/icons/plus-sign';
import { IconSlidersHorizontalStrokeRounded } from '../../../../../../complect/the-icon/icons/sliders-horizontal';
import { IconTextFontStrokeRounded } from '../../../../../../complect/the-icon/icons/text-font';
import { ChordVisibleVariant } from '../../../Cm.model';
import { cmIDB } from '../../../_db/cm-idb';
import { useChordVisibleVariant } from '../../../base/useChordVisibleVariant';
import { useFixedCcom } from '../useCcom';
import { CmComCatMentions } from '../useGetCatMentions';
import { useMigratableListComTools } from './useMigratableComTools';

export const ComTools = () => {
  const ccom = useFixedCcom();
  const [fontSize, setFontSize] = cmIDB.use.comFontSize();
  const [chordVisibleVariant] = useChordVisibleVariant();
  const comToolsNode = useMigratableListComTools();
  const ifixedCom = useLiveQuery(() => ccom && cmIDB.tb.fixedComs.get(ccom.wid), [ccom?.wid]);

  if (!ccom) return null;

  return (
    <>
      <BottomPopupItem
        id="transpose-tool"
        Icon={IconSlidersHorizontalStrokeRounded}
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : undefined}
        title="Тональность"
        rightNode={
          <>
            <IconMinusSignStrokeRounded
              className="minus"
              onClick={event => {
                event.stopPropagation();
                ccom.transpose(-1);
              }}
            />
            <div
              className={'center' + (ifixedCom?.ton == null ? '' : ' color--7')}
              onClick={event => {
                event.stopPropagation();
                ccom.setChordsInitialTon();
              }}
            >
              {ccom.firstChord}
            </div>
            <IconPlusSignStrokeRounded
              className="plus"
              onClick={event => {
                event.stopPropagation();
                ccom.transpose(1);
              }}
            />
          </>
        }
      />

      <BottomPopupItem
        id="font-size-tool"
        Icon={IconTextFontStrokeRounded}
        title="Размер шрифта"
        rightNode={
          <>
            <IconButton
              className="minus"
              Icon={IconMinusSignStrokeRounded}
              disabled={fontSize < 0}
              onClick={event => {
                event.stopPropagation();
                setFontSize(fontSize - 1);
              }}
            />
            <div
              className="center"
              onClick={event => {
                event.stopPropagation();
                setFontSize(-fontSize);
              }}
            >
              {fontSize < 0 ? 'auto' : fontSize}
            </div>
            <IconButton
              className="plus"
              Icon={IconPlusSignStrokeRounded}
              disabled={fontSize < 0}
              onClick={event => {
                event.stopPropagation();
                setFontSize(fontSize + 1);
              }}
            />
          </>
        }
      />

      <div className="flex center full-width fade-05 font-size:0.7em margin-big-gap-t">
        Клик на иконку для добавления в быстрое меню
      </div>
      {comToolsNode}

      <div className="fade-05 full-width margin-gap-v color--7">
        <CmComCatMentions com={ccom} />
      </div>

      <div className="full-width fade-05 flex center font-size:0.7em margin-gap-v">
        Добавлено: {new Date(ccom.wid).toLocaleString('ru')}
      </div>
    </>
  );
};
