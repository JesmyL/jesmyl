import TheButton from 'front/complect/Button';
import IconCheckbox from 'front/complect/the-icon/IconCheckbox';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import BrutalItem from '../../../../../complect/brutal-item/BrutalItem';
import { useExerExec } from '../../../../../complect/exer/hooks/useExer';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import { IconCalendar01StrokeRounded } from '../../../../../complect/the-icon/icons/calendar-01';
import { EditableMeetingsEvent } from './EditableMeetingsEvent';
import { useEditableMeetings } from './useEditableMeetings';

export default function AddContext({ close, currPath }: { close: (is: false) => void; currPath: number[] }) {
  const [name, setName] = useState('');
  const { meetings } = useEditableMeetings();
  const exec = useExerExec();
  const [contexts, usedContexts] = meetings?.getNames(currPath) || [[], []];
  const [bindEvents, setBindEvents] = useState<EditableMeetingsEvent[]>([]);

  const [, currGroupw] = meetings?.getContexts(currPath) || [];

  const stack = useMemo(
    () =>
      name &&
      contexts
        .filter(ctx => ctx.toLowerCase().search(name.toLowerCase()) > -1)
        .map(context => {
          return (
            <Item
              key={context}
              className="context-item pointer"
              onClick={() => setName(context)}
            >
              {context}
            </Item>
          );
        }),
    [contexts, name],
  );

  const switchEvent = (event: EditableMeetingsEvent) => {
    bindEvents.indexOf(event) > -1
      ? setBindEvents(bindEvents.filter(eventw => eventw !== event))
      : setBindEvents([...bindEvents, event]);
  };

  const eventsStack = meetings?.events
    ?.map((event, eventi) => {
      if (event.contextw && event.contextw !== currGroupw) return null;
      return (
        <BrutalItem
          key={eventi}
          icon={<IconCalendar01StrokeRounded />}
          title={event.name}
          onClick={() => switchEvent(event)}
          box={<IconCheckbox checked={bindEvents.indexOf(event) > -1} />}
        />
      );
    })
    .filter(item => item);

  return (
    <div className="add-context full-height padding-big-gap center over-y-auto">
      <h2>Название нового контекста</h2>
      <KeyboardInput
        className="full-width"
        value={name}
        onChange={value => setName(value)}
      />
      {stack}
      {eventsStack?.length ? (
        <>
          <h2>Переместить в новый контекст:</h2>
          {eventsStack}
        </>
      ) : null}
      <div className="full-width flex center">
        <TheButton
          className="margin-giant-gap"
          disabled={!name || usedContexts.indexOf(name) > -1}
          onClick={() => {
            meetings?.addContext(name, currPath, bindEvents);
            close(false);
            setTimeout(() => exec());
          }}
        >
          Добавить
        </TheButton>
      </div>
    </div>
  );
}

const Item = styled.div`
  margin: 0.5em;
  padding: 0.5em;
`;
