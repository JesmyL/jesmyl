import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useMemo } from 'react';
import { IScheduleWidget, ScheduleWidgetCleans, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import { emptyArray } from 'shared/utils';
import { StameskaIconName } from 'stameska-icon';
import styled from 'styled-components';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { schEventTypesSokiInvocatorClient } from '../invocators/invocators.methods';
import { ScheduleWidgetEventType } from './EventType';
import { useAttTypeTitleError } from './useAttTypeTitleError';

type Props = {
  postfix: ReactNode;
  schedule: IScheduleWidget;
  icon: StameskaIconName;
  usedCounts?: Record<number, number>;
  onItemSelectSend?: (typei: number) => Promise<unknown>;
};

const isModalOpenAtom = atom(false);

const itemIt = <Item,>({ item }: { item: Item }) => item;
const eqByTitle = (a: { title: string }, b: { title: string }) => (a.title > b.title ? 1 : b.title < a.title ? -1 : 0);
const termAtom = atom('');

export const ScheduleWidgetEventTypeList = ({ postfix, schedule, icon, usedCounts, onItemSelectSend }: Props) => {
  const types = schedule.types || emptyArray;
  const term = useAtomValue(termAtom);
  const error = useAttTypeTitleError(term, schedule, true);
  const scheduleScopeProps = useScheduleScopePropsContext();

  const sortedTypes = useMemo(() => {
    const sortedTypes: ScheduleWidgetDayListItemTypeBox[] = (
      term === '' ? [...types] : mylib.searchRate(types, term, ['title']).map(itemIt)
    ).sort(eqByTitle);

    if (!usedCounts) return sortedTypes;

    sortedTypes.sort((a, b) => {
      const ai = types.indexOf(a);
      const bi = types.indexOf(b);
      return (a.title ? usedCounts[ai] || 0 : -1) - (b.title ? usedCounts[bi] || 0 : -1);
    });

    return sortedTypes;
  }, [term, types, usedCounts]);

  const typesToAdd = useMemo((): React.ReactNode[] => {
    if (error || term.length < 3 || sortedTypes.some(({ title }) => title === term)) return [];

    const title = term[0].toUpperCase() + term.slice(1);

    return (sortedTypes.length ? [90, 60, 30, 15] : [120, 90, 60, 45, 30, 20, 15, 10, 5]).map(tm => {
      const node = (
        <>
          {title} {tm}м.
        </>
      );

      return (
        <TheIconSendButton
          key={tm}
          className="margin-gap-v flex-max"
          icon="PlusSign"
          confirm={
            <>
              Добавить шаблон события <span className="color--7">{node}</span>
            </>
          }
          postfix={node}
          onSend={() => schEventTypesSokiInvocatorClient.create({ props: scheduleScopeProps, title, tm })}
        />
      );
    });
  }, [error, scheduleScopeProps, sortedTypes, term]);

  return (
    <>
      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>
          <div>Шаблоны событий</div>
          <DebouncedSearchInput
            className="debounced-searcher round-styled"
            placeholder="Фильтр по названию"
            termAtom={termAtom}
          />
        </ModalHeader>
        <ModalBody>
          {sortedTypes.length !== 1 && typesToAdd}
          {sortedTypes.map(typeBox => {
            const typei = types.indexOf(typeBox);

            return (
              <StyledItem key={typei}>
                <ScheduleWidgetEventType
                  onSelect={isModalOpenAtom.reset}
                  schedule={schedule}
                  typeBox={typeBox}
                  typei={typei}
                  onItemSelectSend={onItemSelectSend}
                />
                {usedCounts ? (
                  <div className={'text-right' + (usedCounts[typei] ? '' : ' error-message')}>
                    {typeBox.title}
                    {usedCounts[typei]
                      ? ` исп. ${ScheduleWidgetCleans.termsToText(usedCounts[typei])}`
                      : ' не используется'}
                  </div>
                ) : null}
              </StyledItem>
            );
          })}
          {sortedTypes.length === 1 && typesToAdd}
        </ModalBody>
      </Modal>

      <TheIconButton
        icon={icon}
        postfix={postfix}
        onClick={isModalOpenAtom.toggle}
      />
    </>
  );
};

const StyledItem = styled.div`
  margin-bottom: 20px;
`;
