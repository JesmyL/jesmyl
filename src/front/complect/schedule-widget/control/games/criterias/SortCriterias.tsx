import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useScheduleScopePropsContext } from 'front/complect/schedule-widget/complect/scope-contexts/useScheduleScopePropsContext';
import { schSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { useState } from 'react';
import TheButton from '../../../../Button';
import { IconPlusSignStrokeRounded } from '../../../../the-icon/icons/plus-sign';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import ScheduleWidgetSortCriteria from './SortCriteria';

export default function ScheduleWidgetSortCriterias() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const [isOpenCriterias, setIsOpenCriterias] = useState<unknown>(false);

  return (
    <>
      <TheButton onClick={setIsOpenCriterias}>Посмотреть критерии сортировки</TheButton>
      {isOpenCriterias && (
        <FullContent onClose={setIsOpenCriterias}>
          <h3 className="flex flex-gap">
            Список критериев
            <EvaSendButton
              Icon={IconPlusSignStrokeRounded}
              confirm="Добавить новый критерий?"
              onSend={() => schSokiInvocatorClient.addGameCriteria(null, scheduleScopeProps)}
            />
          </h3>

          <ScheduleWidgetShareButtons prefix="Фотографии" />

          {rights.schedule.games?.criterias.map((criteria, criteriai) => {
            return (
              <ScheduleWidgetSortCriteria
                key={criteriai}
                criteriai={criteriai}
                criteria={criteria}
              />
            );
          })}
        </FullContent>
      )}
    </>
  );
}
