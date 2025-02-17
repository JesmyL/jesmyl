import Dropdown from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import Modal from '#widgets/modal/Modal/Modal';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
import { MyLib } from 'front/utils';
import { useMemo, useState } from 'react';
import { IScheduleWidget, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import styled from 'styled-components';
import { AttTranslatorType, attTranslatorTypes } from '../../../../back/apps/index/schedules/attTranslatorType';
import SendableDropdown from '../../../07-shared/ui/sends/dropdown/SendableDropdown';
import { ScheduleWidgetBindAtts } from '../atts/BindAtts';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schEventTypesSokiInvocatorClient } from '../invocators/invocators.methods';
import StrongEditableField from '../strong-control/field/StrongEditableField';
import StrongDiv from '../strong-control/StrongDiv';
import { useAttTypeTitleError } from './useAttTypeTitleError';

export default function ScheduleWidgetEventType(props: {
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
  const [isRedactModalOpen, setIsRedactModalOpen] = useState<unknown>(false);

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
        onChange={setTitle}
        onSend={value =>
          schEventTypesSokiInvocatorClient.setTitle(null, eventTypeScopeProps, value, props.typeBox.title)
        }
      />
      {error && (
        <div className="flex flex-gap center error-message">
          <LazyIcon icon="Alert02" />
          {error}
        </div>
      )}
      <StrongEditableField
        type="number"
        value={'' + (props.typeBox.tm ?? '')}
        postfix=" мин"
        isRedact={props.isRedact}
        title="Продолжительность, мин"
        icon="Clock01"
        onSend={value => schEventTypesSokiInvocatorClient.setTm(null, eventTypeScopeProps, +value)}
      />
      {props.isRedact ? (
        <ScheduleWidgetBindAtts
          schedule={props.schedule}
          atts={props.typeBox.atts}
          forTitle={
            <>
              Шаблон <span className="color--7">{props.typeBox.title}</span> - Вставить обзорное вложение
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
              className="margin-gap-b"
              onSend={() =>
                schEventTypesSokiInvocatorClient.setAttImaginePeriod(
                  null,
                  { ...eventTypeScopeProps, attKey },
                  attTranslatorType,
                )
              }
            />
          )}
          onAddAttSend={(attKey, value) =>
            schEventTypesSokiInvocatorClient.bindAttImagine(null, { ...eventTypeScopeProps, attKey }, attTranslatorType)
          }
          onRemoveAttSend={async attKey => {
            schEventTypesSokiInvocatorClient.removeAttImagine(null, { ...eventTypeScopeProps, attKey });
          }}
        />
      ) : (
        !attEntries || (
          <div>
            <div className="flex flex-gap">
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
        <div className="flex flex-end full-width absolute pos-top pos-right margin-sm-gap z-index:5">
          <LazyIcon
            icon="Edit02"
            onClick={setIsRedactModalOpen}
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
            (props.isRedact ? '' : ' bgcolor--5 padding-gap margin-gap-v')
          }
          onSend={async () => props.onItemSelectSend?.(props.typei)}
        >
          {innerNode}
        </SelectItem>
      )}

      {!isRedactModalOpen || (
        <Modal onClose={setIsRedactModalOpen}>
          <ModalHeader>
            <span className="flex flex-gap full-width between">
              <span>
                <span className="color--7">{props.typeBox.title} </span>- Редактирование шаблона
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
