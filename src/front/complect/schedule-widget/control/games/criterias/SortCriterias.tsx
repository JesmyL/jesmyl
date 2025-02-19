import { TheButton } from '#shared/ui/Button';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { useScheduleScopePropsContext } from 'front/complect/schedule-widget/complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import { useState } from 'react';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetSortCriteria } from './SortCriteria';

export const ScheduleWidgetSortCriterias = () => {
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
        </FullContent>
      )}
    </>
  );
};
