import { useAtomValue } from 'front/complect/atoms';
import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { IScheduleWidget } from 'shared/api';
import { IconComputerStrokeRounded } from '../../../complect/the-icon/icons/computer';
import { ScreenTranslationControlPanelShowMdButton } from '../../../components/apps/+complect/translations/controls/ShowMdButton';
import BibleTranslationSlide from '../../../components/apps/bible/translations/BibleTranslationSlide';
import BibleTranslationSlideMiniInfo from '../../../components/apps/bible/translations/BibleTranslationSlideMiniInfo';
import { CmTranslationSlideMiniInfo } from '../../../components/apps/cm/translation/complect/live/MiniInfo';
import { CmLiveTranslationScreen } from '../../../components/apps/cm/translation/complect/live/Screen';
import { IndexStateSchLiveData, ScheduleWidgetTranslationLiveDataKey } from '../../../components/index/Index.model';
import { liveDataAtom, useAuth } from '../../../components/index/atoms';
import { soki } from '../../../soki';
import BrutalItem from '../../brutal-item/BrutalItem';
import { ScheduleWidgetMarkdownLiveTranslation } from './MarkdownLive';

interface Props {
  onClose: (isOpen: boolean) => void;
  schedule: IScheduleWidget;
  isShowMarkdownOnly?: boolean;
}

export const ScheduleWidgetLiveTranslation = ({ onClose, schedule, isShowMarkdownOnly }: Props) => {
  const liveData = useAtomValue(liveDataAtom) as IndexStateSchLiveData;
  const [subscribeData, setSubscribeData] = useState<ScheduleWidgetTranslationLiveDataKey | und>();
  const [messageNode, setMessageNode] = useState<JSX.Element | null>(null);
  const auth = useAuth();

  useEffect(() => {
    if (subscribeData !== undefined) return;
    const schedulePrefix: ScheduleWidgetTranslationLiveDataKey<'', und> = `index-sch-${schedule.w}:`;
    const dataNames = mylib.keys(liveData).filter(name => name.startsWith(schedulePrefix));

    if (dataNames.length === 0) {
      setMessageNode(<div className="flex center full-size">Трансляций нет</div>);
      return;
    }

    if (dataNames.length === 1) {
      setMessageNode(null);
      setSubscribeData(dataNames[0]);
      return;
    }

    setMessageNode(
      <div className="flex center column full-height margin-gap-h">
        <div className="margin-gap-v">Сейчас трансляцию ведут несколько человек:</div>
        {dataNames.map(translationId => {
          const translation = liveData[translationId];

          return (
            <BrutalItem
              key={translationId}
              icon={<IconComputerStrokeRounded />}
              title={translation.fio}
              onClick={() => {
                setMessageNode(null);
                setSubscribeData(translationId);
              }}
              box={
                translation.cm !== undefined ? (
                  <CmTranslationSlideMiniInfo {...translation.cm} />
                ) : translation.bible !== undefined ? (
                  <BibleTranslationSlideMiniInfo {...translation.bible} />
                ) : (
                  <>Текст</>
                )
              }
            />
          );
        })}
      </div>,
    );
  }, [auth.login, liveData, onClose, schedule.w, subscribeData]);

  useEffect(() => {
    soki.send({ subscribe: 'liveData', subscribeData }, 'index');

    return () => {
      soki.send({ unsubscribe: 'liveData' }, 'index');
    };
  }, [schedule.w, subscribeData]);

  if (messageNode !== null) return messageNode;
  if (subscribeData === undefined) return;

  const translation = liveData[subscribeData];
  if (translation == null) return <div className="flex center full-size">Трансляция завершена</div>;

  return translation.markdown ? (
    <ScheduleWidgetMarkdownLiveTranslation md={translation.markdown} />
  ) : isShowMarkdownOnly ? (
    <div className="full-size flex center">
      <ScreenTranslationControlPanelShowMdButton />
    </div>
  ) : translation.cm !== undefined ? (
    <CmLiveTranslationScreen {...translation.cm} />
  ) : translation.bible !== undefined ? (
    <BibleTranslationSlide {...translation.bible} />
  ) : null;
};
