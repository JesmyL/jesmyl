import { schGamesSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/scope-contexts/scope-props-contexts';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import TheButton from 'front/08-shared/ui/TheButton';
import { useState } from 'react';
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
        <FullScreenContent onClose={setIsOpenCriterias}>
          <h3 className="flex flex-gap">
            Список критериев
            <TheIconSendButton
              icon="PlusSign"
              confirm="Добавить новый критерий?"
              onSend={() => schGamesSokiInvocatorClient.addCriteria(null, scheduleScopeProps)}
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
        </FullScreenContent>
      )}
    </>
  );
}
