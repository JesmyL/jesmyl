import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetSortCriteria } from './SortCriteria';

let isOpenCriteriasAtom: Atom<boolean>;

export function ScheduleWidgetSortCriterias() {
  isOpenCriteriasAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <TheButton onClick={isOpenCriteriasAtom.do.toggle}>Посмотреть критерии сортировки</TheButton>

      <FullContent openAtom={isOpenCriteriasAtom}>
        <h3 className="flex gap-2">
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
