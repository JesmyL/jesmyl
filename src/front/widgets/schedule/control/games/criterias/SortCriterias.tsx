import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom } from 'atomaric';
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
            onSend={() => schGamesTsjrpcClient.addCriteria({ props: scheduleScopeProps })}
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
