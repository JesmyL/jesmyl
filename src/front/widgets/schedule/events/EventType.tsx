import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { MyLib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { AttTranslatorType, attTranslatorTypes, IScheduleWidget, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import styled from 'styled-components';
import { ScheduleWidgetBindAtts } from '../atts/BindAtts';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { schEventTypesTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { useAttTypeTitleError } from './useAttTypeTitleError';

const isRedactTypeiModalOpenAtom = atom<number | null>(null);

export function ScheduleWidgetEventType(props: {
  schedule: IScheduleWidget;
  typei: number;
  typeBox: ScheduleWidgetDayListItemTypeBox;
  onSelect?: () => void;
  isRedact?: boolean;
  onItemSelectSend?: (typei: number) => Promise<unknown>;
}) {
  const [title, setTitle] = useState(props.typeBox.title);
  const error = useAttTypeTitleError(title, props.schedule, props.isRedact, props.typei);
  const [attTranslatorType, setAttTranslatorType] = useState(AttTranslatorType.Today);

  const attEntries = (props.typeBox.atts ? MyLib.keys(props.typeBox.atts) : []).length;

  const scheduleScopeProps = useScheduleScopePropsContext();
  const eventTypeScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, typei: props.typei }),
    [props.typei, scheduleScopeProps],
  );

  const innerNode = (
    <>
      <StrongEditableField
        fieldKey="title"
        value={props.typeBox}
        isRedact={props.isRedact}
        icon="SchoolReportCard"
        title="Название"
        isImpossibleEmptyValue
        onChanged={setTitle}
        onSend={value =>
          schEventTypesTsjrpcClient.setTitle({
            props: eventTypeScopeProps,
            value,
            prevTitle: props.typeBox.title,
          })
        }
      />
      {error && (
        <div className="flex gap-2 center text-xKO">
          <LazyIcon icon="Alert02" />
          {error}
        </div>
      )}
      <StrongEditableField
        type="tel"
        value={'' + (props.typeBox.tm ?? '')}
        postfix=" мин"
        isRedact={props.isRedact}
        title="Продолжительность, мин"
        icon="Clock01"
        onSend={value => schEventTypesTsjrpcClient.setTm({ props: eventTypeScopeProps, tm: +value })}
      />
      {props.isRedact ? (
        <ScheduleWidgetBindAtts
          schedule={props.schedule}
          atts={props.typeBox.atts}
          forTitle={
            <>
              Шаблон <span className="text-x7">{props.typeBox.title}</span> - Вставить обзорное вложение
            </>
          }
          topContent={
            <Dropdown
              id={attTranslatorType}
              items={attTranslatorTypes}
              onSelect={({ id }) => setAttTranslatorType(id)}
            />
          }
          customAttTopContent={attKey => (
            <SendableDropdown
              id={props.typeBox.atts?.[attKey]?.[0] as AttTranslatorType}
              items={attTranslatorTypes}
              className="mb-2"
              onSend={() =>
                schEventTypesTsjrpcClient.setAttImaginePeriod({
                  props: { ...eventTypeScopeProps, attKey },
                  value: attTranslatorType,
                })
              }
            />
          )}
          onAddAttSend={attKey =>
            schEventTypesTsjrpcClient.bindAttImagine({
              props: { ...eventTypeScopeProps, attKey },
              attTranslatorType,
            })
          }
          onRemoveAttSend={async attKey => {
            schEventTypesTsjrpcClient.removeAttImagine({ props: { ...eventTypeScopeProps, attKey } });
          }}
        />
      ) : (
        !attEntries || (
          <div>
            <div className="flex gap-2">
              <LazyIcon icon="Attachment" />
              Вложения
            </div>
          </div>
        )
      )}
    </>
  );

  return (
    <div className="relative">
      {props.isRedact || (
        <div className="flex flex-end w-full absolute top-0 right-0 m-1">
          <LazyIcon
            icon="Edit02"
            onClick={() => isRedactTypeiModalOpenAtom.set(props.typei)}
          />
        </div>
      )}

      {props.isRedact || !props.typeBox.title ? (
        innerNode
      ) : (
        <SelectItem
          className={
            'schedule-event-type-select-item' +
            (props.onItemSelectSend ? (props.isRedact ? '' : props.typeBox.title ? ' pointer ' : ' disabled ') : '') +
            (props.isRedact ? '' : ' bg-x5 p-2 my-2')
          }
          onSend={async () => props.onItemSelectSend?.(props.typei)}
        >
          {innerNode}
        </SelectItem>
      )}

      {props.isRedact || (
        <Modal
          openAtom={isRedactTypeiModalOpenAtom}
          checkIsOpen={typei => props.typei === typei}
        >
          <ModalHeader>
            <span className="flex gap-2 w-full between">
              <span>
                <span className="text-x7">{props.typeBox.title} </span>- Редактирование шаблона
              </span>
            </span>
          </ModalHeader>

          <ModalBody>
            <ScheduleWidgetEventType
              {...props}
              isRedact
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

const SelectItem = styled(StrongDiv)`
  border-radius: 3px;
`;
