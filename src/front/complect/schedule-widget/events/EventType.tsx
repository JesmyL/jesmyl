import { MyLib } from 'front/utils';
import { useState } from 'react';
import { IScheduleWidget, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import styled from 'styled-components';
import { IconAlert02StrokeRounded } from '../../../complect/the-icon/icons/alert-02';
import { IconAttachmentStrokeRounded } from '../../../complect/the-icon/icons/attachment';
import { IconClock01StrokeRounded } from '../../../complect/the-icon/icons/clock-01';
import { IconEdit02StrokeRounded } from '../../../complect/the-icon/icons/edit-02';
import { IconSchoolReportCardStrokeRounded } from '../../../complect/the-icon/icons/school-report-card';
import Dropdown from '../../dropdown/Dropdown';
import useModal from '../../modal/useModal';
import StrongDiv from '../../strong-control/StrongDiv';
import StrongDropdown from '../../strong-control/StrongDropdown';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import StrongClipboardPicker from '../../strong-control/field/clipboard/Picker';
import ScheduleWidgetBindAtts from '../atts/BindAtts';
import { AttTranslatorType, attTranslatorTypes } from '../complect/attTranslatorType';
import { takeStrongScopeMaker } from '../useScheduleWidget';
import { useAttTypeTitleError } from './useAttTypeTitleError';

export default function ScheduleWidgetEventType(props: {
  selectScope: string;
  scheduleScope: string;
  selectFieldName: string;
  schedule: IScheduleWidget;
  typei: number;
  typeBox: ScheduleWidgetDayListItemTypeBox;
  onSelect?: () => void;
  isRedact?: boolean;
}) {
  const [title, setTitle] = useState(props.typeBox.title);
  const error = useAttTypeTitleError(title, props.schedule, props.isRedact, props.typei);
  const [attTranslatorType, setAttTranslatorType] = useState(AttTranslatorType.Today);

  const selfScope = takeStrongScopeMaker(props.scheduleScope, ' typei/', props.typei);
  const attEntries = (props.typeBox.atts ? MyLib.keys(props.typeBox.atts) : []).length;

  const [modalNode, screen] = useModal(({ header, body }) => {
    return (
      <>
        {header(
          <span className="flex flex-gap full-width between">
            <span>
              <span className="color--7">{props.typeBox.title} </span>- Редактирование шаблона
            </span>
            <StrongClipboardPicker />
          </span>,
        )}
        {body(
          <>
            <ScheduleWidgetEventType
              {...props}
              isRedact
            />
          </>,
        )}
      </>
    );
  });

  const innerNode = (
    <>
      <StrongEditableField
        scope={selfScope}
        fieldName="field"
        value={props.typeBox.title}
        isRedact={props.isRedact}
        Icon={IconSchoolReportCardStrokeRounded}
        title="Название"
        isImpossibleEmptyValue
        onChange={setTitle}
        mapExecArgs={(args, val) => {
          if (error) return;
          return {
            ...args,
            value: val,
            key: 'title',
          };
        }}
      />
      {error && (
        <div className="flex flex-gap center error-message">
          <IconAlert02StrokeRounded />
          {error}
        </div>
      )}
      <StrongEditableField
        scope={selfScope}
        fieldName="tm"
        type="number"
        value={'' + (props.typeBox.tm ?? '')}
        postfix=" мин"
        isRedact={props.isRedact}
        title="Продолжительность, мин"
        Icon={IconClock01StrokeRounded}
      />
      {props.isRedact ? (
        <ScheduleWidgetBindAtts
          scope={selfScope}
          schedule={props.schedule}
          scheduleScope={props.scheduleScope}
          atts={props.typeBox.atts}
          forTitle={
            <>
              Шаблон <span className="color--7">{props.typeBox.title}</span>
            </>
          }
          cantBindLinks
          topContent={
            <Dropdown
              id={attTranslatorType}
              items={attTranslatorTypes}
              onSelect={({ id }) => setAttTranslatorType(id)}
            />
          }
          customAttTopContent={(scope, attKey) => (
            <StrongDropdown
              id={props.typeBox.atts?.[attKey]?.[0] as AttTranslatorType}
              scope={scope}
              fieldName="period"
              cud="U"
              items={attTranslatorTypes}
              className="margin-gap-b"
            />
          )}
          mapExecArgs={args => {
            return {
              ...args,
              value: attTranslatorType,
            };
          }}
        />
      ) : (
        !attEntries || (
          <div>
            <div className="flex flex-gap">
              <IconAttachmentStrokeRounded />
              Вложения
            </div>
          </div>
        )
      )}
    </>
  );

  return (
    <div className="relative">
      {modalNode}
      {props.isRedact || (
        <div className="flex flex-end full-width absolute pos-top pos-right margin-sm-gap z-index:5">
          <IconEdit02StrokeRounded onClick={screen} />
        </div>
      )}
      {props.isRedact || !props.typeBox.title ? (
        innerNode
      ) : (
        <SelectItem
          scope={props.selectScope}
          fieldName={props.selectFieldName}
          className={
            'schedule-event-type-select-item' +
            (props.selectScope ? (props.isRedact ? '' : props.typeBox.title ? ' pointer ' : ' disabled ') : '') +
            (props.isRedact ? '' : ' bgcolor--5 padding-gap margin-gap-v')
          }
          mapExecArgs={args => {
            props.onSelect?.();
            return {
              ...args,
              eventType: props.typei,
            };
          }}
        >
          {innerNode}
        </SelectItem>
      )}
    </div>
  );
}

const SelectItem = styled(StrongDiv)`
  border-radius: 3px;
`;
