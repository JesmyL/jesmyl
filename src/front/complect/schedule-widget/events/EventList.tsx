import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { mylib } from 'front/utils';
import React, { ReactNode, useMemo, useState } from 'react';
import { IScheduleWidget, ScheduleWidgetCleans, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import styled from 'styled-components';
import DebouncedSearchInput from '../../DebouncedSearchInput';
import Modal from '../../modal/Modal/Modal';
import { ModalBody } from '../../modal/Modal/ModalBody';
import { ModalHeader } from '../../modal/Modal/ModalHeader';
import IconButton from '../../the-icon/IconButton';
import { IconPlusSignStrokeRounded } from '../../the-icon/icons/plus-sign';
import { TheIconType } from '../../the-icon/model';
import { schSokiInvocatorClient } from '../invocators/invocators.methods';
import ScheduleWidgetEventType from './EventType';
import { useAttTypeTitleError } from './useAttTypeTitleError';

const emptyArr: [] = [];

const itemIt = <Item,>({ item }: { item: Item }) => item;
const eqByTitle = (a: { title: string }, b: { title: string }) => (a.title > b.title ? 1 : b.title < a.title ? -1 : 0);

export default function ScheduleWidgetEventList({
  selectScope,
  postfix,
  schedule,
  Icon,
  selectFieldName,
  usedCounts,
}: {
  selectScope: string;
  selectFieldName: string;
  postfix: ReactNode;
  schedule: IScheduleWidget;
  Icon: TheIconType;
  usedCounts?: Record<number, number>;
}) {
  const types = schedule.types || emptyArr;
  const [term, setTerm] = useState('');
  const error = useAttTypeTitleError(term, schedule, true);

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
        <EvaSendButton
          key={tm}
          // scope={scheduleScope}
          // fieldName="types"
          className="margin-gap-v flex-max"
          Icon={IconPlusSignStrokeRounded}
          confirm={
            <>
              Добавить шаблон <span className="color--7">{node}</span>
            </>
          }
          postfix={node}
          // mapExecArgs={args => {
          //   return {
          //     ...args,
          //     value: { tm, title },
          //   };
          // }}
          onSend={() => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null)}
        />
      );
    });
  }, [error, sortedTypes, term]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>
            <div className="">
              <div>Шаблоны событий</div>
              <DebouncedSearchInput
                className="debounced-searcher round-styled"
                placeholder="Фильтр по названию"
                debounce={30}
                onDebounced={setTerm}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            {sortedTypes.length !== 1 && typesToAdd}
            {sortedTypes.map(typeBox => {
              const typei = types.indexOf(typeBox);

              return (
                <StyledItem key={typei}>
                  <ScheduleWidgetEventType
                    onSelect={() => setIsModalOpen(false)}
                    schedule={schedule}
                    selectFieldName={selectFieldName}
                    selectScope={selectScope}
                    typeBox={typeBox}
                    typei={typei}
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
      )}
      <IconButton
        Icon={Icon}
        postfix={postfix}
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
}

const StyledItem = styled.div`
  margin-bottom: 20px;
`;
