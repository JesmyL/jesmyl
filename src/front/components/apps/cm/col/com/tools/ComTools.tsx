import { BottomPopupItem } from '../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useAtom } from '../../../../../../complect/atoms';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import { IconMinusSignStrokeRounded } from '../../../../../../complect/the-icon/icons/minus-sign';
import { IconPlusSignStrokeRounded } from '../../../../../../complect/the-icon/icons/plus-sign';
import { IconSlidersHorizontalStrokeRounded } from '../../../../../../complect/the-icon/icons/sliders-horizontal';
import { IconTextFontStrokeRounded } from '../../../../../../complect/the-icon/icons/text-font';
import { ChordVisibleVariant } from '../../../Cm.model';
import { useNumComUpdates } from '../../../atoms';
import { useChordVisibleVariant } from '../../../base/useChordVisibleVariant';
import { cmComFontSizeAtom } from '../../../molecules';
import { useCcom } from '../useCcom';
import { CmComCatMentions } from '../useGetCatMentions';
import { useMigratableListComTools } from './useMigratableComTools';

export const ComTools = () => {
  const ccom = useCcom();
  const [fontSize, setFontSize] = useAtom(cmComFontSizeAtom);
  const [chordVisibleVariant] = useChordVisibleVariant();
  const comToolsNode = useMigratableListComTools();
  const [, setNumComUpdates] = useNumComUpdates();

  if (!ccom) return null;

  return (
    <>
      <BottomPopupItem
        Icon={IconSlidersHorizontalStrokeRounded}
        className={chordVisibleVariant === ChordVisibleVariant.None ? 'disabled' : undefined}
        title="Тональность"
        rightNode={
          <>
            <IconMinusSignStrokeRounded
              onClick={event => {
                event.stopPropagation();
                ccom.transpose(-1);
                setNumComUpdates(it => it + 1);
              }}
            />
            <div
              onClick={event => {
                event.stopPropagation();
                ccom.setChordsInitialTon();
                setNumComUpdates(it => it + 1);
              }}
            >
              {ccom.firstChord}
            </div>
            <IconPlusSignStrokeRounded
              onClick={event => {
                event.stopPropagation();
                ccom.transpose(1);
                setNumComUpdates(it => it + 1);
              }}
            />
          </>
        }
      />

      <BottomPopupItem
        Icon={IconTextFontStrokeRounded}
        title="Размер шрифта"
        rightNode={
          <>
            <IconButton
              Icon={IconMinusSignStrokeRounded}
              disabled={fontSize < 0}
              onClick={event => {
                event.stopPropagation();
                setFontSize(fontSize - 1);
              }}
            />
            {fontSize < 0 ? (
              <div
                onClick={event => {
                  event.stopPropagation();
                  setFontSize(-fontSize);
                }}
              >
                auto
              </div>
            ) : (
              <div
                onClick={event => {
                  event.stopPropagation();
                  setFontSize(-fontSize);
                }}
              >
                {fontSize}
              </div>
            )}
            <IconButton
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
        Удерживайте для добавления в быстрое меню
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
