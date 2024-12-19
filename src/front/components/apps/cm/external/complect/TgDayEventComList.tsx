import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import {
  CmComBindAttach,
  CmComWid,
  CmMeetingEventWid,
  IScheduleWidgetDayEventMi,
  IScheduleWidgetWid,
} from 'shared/api';
import { itIt } from 'shared/utils';
import styled from 'styled-components';
import { makeCmScheduleWidgetComListUrl } from '../../../../../../shared/api/complect/apps/cm/complect/attInformCm';
import { useInitSoki } from '../../../../../app/useInitSoki';
import { BottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import CopyTextButton from '../../../../../complect/CopyTextButton';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { useGetScheduleOrPull } from '../../../../../complect/schedule-widget/general/useSetScheduleOrPull';
import {
  takeScheduleStrongScopeMaker,
  takeStrongScopeMaker,
  useScheduleWidgetRights,
} from '../../../../../complect/schedule-widget/useScheduleWidget';
import { IconCopy01StrokeRounded } from '../../../../../complect/the-icon/icons/copy-01';
import { IconNoteEditStrokeRounded } from '../../../../../complect/the-icon/icons/note-edit';
import { CmTranslationComListContext, CmTranslationComListContextValue } from '../../base/translations/context';
import { ChordVisibleVariant } from '../../Cm.model';
import { Cat } from '../../col/cat/Cat';
import { useCcat } from '../../col/cat/useCcat';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { useMeetings } from '../../lists/meetings/useMeetings';
import { CmFooter } from '../../routing/CmFooter';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import CmExternalComListAttRedactList from './RedactList';
import TheComForFullScreen from './TheComForFullScreen';

const attName = '[cm]:coms';

const error = (children: React.ReactNode) => <div className="color--ko full-size flex center">{children}</div>;

export default function TgDayEventComList() {
  const params = useParams();
  const dayi = +params.dayi! as NaNumber;
  const attMi = params.attMi;
  const eventMi = +params.eventMi! as IScheduleWidgetDayEventMi | NaN;
  const schw = +params.schw! as IScheduleWidgetWid | NaN;

  useInitSoki('cm');

  if (mylib.isNaN(dayi) || mylib.isNaN(eventMi) || mylib.isNaN(schw) || !attMi) return error('Ссылка не действительна');

  return (
    <Inner
      schw={schw}
      dayi={dayi}
      eventMi={eventMi}
      attMi={attMi}
    />
  );
}

const Inner = ({
  schw,
  dayi,
  eventMi,
  attMi,
}: {
  schw: IScheduleWidgetWid;
  dayi: number;
  eventMi: IScheduleWidgetDayEventMi;
  attMi: string;
}) => {
  const [isOpenListRedact, setIsOpenListRedact] = useState<unknown>(false);
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const [isOpenComposition, setIsOpenComposition] = useState(false);
  const [ccom, setCcom] = useState<Com | und>();
  const { schedule, isLoading } = useGetScheduleOrPull(schw);
  const rights = useScheduleWidgetRights(schedule);
  const meetings = useMeetings();
  const cat = useCcat(true);

  if (isLoading) return <div className="full-size flex center">Загрузка расписания...</div>;
  if (!schedule) return error('Мероприятие не найдено');
  if (!cat) return error('Прогрузка списка песен...');

  const day = schedule.days[dayi];
  if (day == null) return error('День не найден');

  const event = day?.list.find(event => event.mi === eventMi);
  if (!event) return error('Событие не найдено');

  const comsAtt =
    attMi !== '-'
      ? (event.atts?.[`[SCH]:custom:${attMi}`]?.[attName as never] as CmComBindAttach | und)
      : (event.atts?.[attName] as CmComBindAttach | und);

  if (!comsAtt) return error('Песен в событии нет');
  if (mylib.isArr(comsAtt)) return;

  let comws: CmComWid[] = [];

  const comwList = comsAtt.comws as CmComWid[];
  const eventw = comsAtt.eventw as CmMeetingEventWid;

  if (comwList) comws = comws.concat(comwList);

  if (eventw != null) {
    const event = meetings.meetings?.events?.find(event => event.wid === eventw);

    if (event) comws = comws.concat(event.stack);
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <PhaseContainerConfigurer
              className=""
              headTitle={
                <StyledTitle className="ellipsis block">
                  {schedule.types[event.type]?.title ?? ''}
                  <b> ● {schedule.title}</b>
                </StyledTitle>
              }
              onMoreClick={setIsOpenMorePopup}
              content={
                <>
                  <ComFaceList list={comws} />
                  {isOpenListRedact && (
                    <FullContent onClose={setIsOpenListRedact}>
                      <CmExternalComListAttRedactList
                        scope={takeStrongScopeMaker(
                          takeStrongScopeMaker(
                            takeStrongScopeMaker(takeScheduleStrongScopeMaker(schedule.w), ` dayi/`, dayi),
                            ' eventMi/',
                            eventMi,
                          ),
                          ' attKey/',
                          attName,
                        )}
                        value={comsAtt}
                        setCcom={setCcom}
                        setIsOpenComposition={setIsOpenComposition}
                      />
                    </FullContent>
                  )}

                  {isOpenComposition && (
                    <FullContent onClose={setIsOpenComposition}>
                      <TheComForFullScreen
                        com={ccom}
                        chordVisibleVariant={ChordVisibleVariant.Maximal}
                        comList={comws.map(comw => cat.coms.find(com => com.wid === comw)!).filter(itIt) ?? []}
                        onComSet={setCcom}
                      />
                    </FullContent>
                  )}

                  {isOpenMorePopup && (
                    <BottomPopup onClose={setIsOpenMorePopup}>
                      <CopyTextButton
                        text={makeCmScheduleWidgetComListUrl(schedule.w, dayi, eventMi, attMi)}
                        withoutIcon
                        description={
                          <BottomPopupItem
                            Icon={IconCopy01StrokeRounded}
                            title="Копировать ссылку на список"
                          />
                        }
                      />

                      {rights.isCanRedact && (
                        <BottomPopupItem
                          Icon={IconNoteEditStrokeRounded}
                          title="Редактировать список"
                          onClick={setIsOpenListRedact}
                        />
                      )}
                    </BottomPopup>
                  )}
                </>
              }
            />
          }
        />

        {cmCompositionRoute(children => (
          <ContextList
            list={comws}
            cat={cat}
            pageTitlePostfix={' - ' + schedule.types[event.type].title}
          >
            {children}
          </ContextList>
        ))}
      </Routes>
      <CmFooter />
    </>
  );
};

const ContextList = ({
  children,
  list,
  cat,
  pageTitlePostfix,
}: {
  children: React.ReactNode;
  list: CmComWid[];
  cat: Cat;
  pageTitlePostfix: string;
}) => {
  const value = useMemo((): CmTranslationComListContextValue => {
    return {
      list: list.map(comw => cat.coms.find(com => com.wid === comw)!).filter(itIt),
      pageTitlePostfix,
    };
  }, [cat.coms, list, pageTitlePostfix]);

  return <CmTranslationComListContext.Provider value={value}>{children}</CmTranslationComListContext.Provider>;
};

const StyledTitle = styled.span`
  max-width: calc(100vw - 96px);
`;
