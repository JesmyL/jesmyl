import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { atom } from '#shared/lib/atom';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { schGamesSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetSortCriteria } from './SortCriteria';

const isOpenCriteriasAtom = atom(false);

export function ScheduleWidgetSortCriterias() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <TheButton onClick={isOpenCriteriasAtom.toggle}>Посмотреть критерии сортировки</TheButton>

      <FullContent openAtom={isOpenCriteriasAtom}>
        <h3 className="flex flex-gap">
          Список критериев
          <TheIconSendButton
            icon="PlusSign"
            confirm="Добавить новый критерий?"
            onSend={() => schGamesSokiInvocatorClient.addCriteria({ props: scheduleScopeProps })}
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
    </>
  );
}
