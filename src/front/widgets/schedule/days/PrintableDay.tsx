import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';
import { useScheduleWidgetRights } from '../useScheduleWidget';
import { ScheduleWidgetDay, ScheduleWidgetDayProps } from './Day';
import { StyledScheduleWidgetDayEvent } from './events/DayEvent';

export function ScheduleWidgetPrintableDay(props: ScheduleWidgetDayProps & { win: typeof window }) {
  const [fontSize, setFontSize] = useState(40);
  const page = useRef<HTMLDivElement>(null);
  const scheduleScopeProps = useMemo(() => ({ schw: props.schedule.w }), [props.schedule.w]);

  useEffect(() => {
    props.win.onclick = event => {
      setFontSize(fontSize + (event.clientX > props.win.innerWidth / 2 ? 1 : -1));
      if (page.current) props.win.navigator.clipboard.writeText(page.current.innerText);
    };
    props.win.onkeyup = event => {
      if (event.code === 'Equal') setFontSize(fontSize + 1);
      else if (event.code === 'Minus') setFontSize(fontSize - 1);
    };
  });

  const html = props.win.document.querySelector('html');
  if (html) html.style.fontSize = `${fontSize}px`;
  const rights = useScheduleWidgetRights(props.schedule);

  return (
    <ScheduleWidgetContextWrapper
      schedule={props.schedule}
      scheduleScopeProps={scheduleScopeProps}
      rights={{
        ...rights,
        isCanRead: true,
        isCanTotalRedact: false,
        isCanReadSpecials: false,
        isCanReadTitles: false,
        isCanRedact: false,
      }}
    >
      <StyledForPrint
        className="for-print canvas"
        ref={page}
      >
        <ScheduleWidgetDay
          {...props}
          isPrint
        />
      </StyledForPrint>
    </ScheduleWidgetContextWrapper>
  );
}

const StyledForPrint = styled.div`
  padding: 30px;
  font-size: 20px;

  .ScheduleWidgetDay {
    margin-top: 0;

    .day-title {
      margin-bottom: 30px;
      background-color: none;
      background: none;
    }

    * {
      color: black;
      font-size: 1rem;
      user-select: text;
    }

    .hide-on-print {
      display: none;
    }

    .not-printable {
      text-decoration: line-through;
    }

    ${StyledScheduleWidgetDayEvent} {
      background: none;
      background-color: none;
      padding: 0;
    }
  }

  @media print {
    .ScheduleWidgetDay {
      .not-printable {
        display: none;
      }
    }
  }
`;
