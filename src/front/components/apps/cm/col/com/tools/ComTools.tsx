import { useLiveQuery } from 'dexie-react-hooks';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { BottomPopupItem } from '../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import IconButton from '../../../../../../complect/the-icon/IconButton';
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
        icon="SlidersHorizontal"
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : undefined}
        title="Тональность"
        rightNode={
          <>
            <LazyIcon
              icon="MinusSign"
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
              {ccom.getFirstSimpleChord()}
            </div>
            <LazyIcon
              icon="PlusSign"
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
        icon="TextFont"
        title="Размер шрифта"
        rightNode={
          <>
            <IconButton
              className="minus"
              icon="MinusSign"
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
              icon="PlusSign"
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
