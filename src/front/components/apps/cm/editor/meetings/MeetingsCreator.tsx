import { useState } from 'react';
import { useExerExec } from '../../../../../complect/exer/hooks/useExer';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import { cmIDB } from '../../_db/cm-idb';
import { useEditableMeetings } from './useEditableMeetings';

export default function MeetingsCreator({ close }: { close: (is: false) => void }) {
  const [name, setName] = useState('');
  const { meetings } = useEditableMeetings();
  const exec = useExerExec();
  const eventContext = cmIDB.useValue.eventContext();

  const [, currContextw] = meetings?.getContexts(eventContext) || [];

  return (
    <div className="flex column full-height padding-big-gap center">
      <div className="full-width margin-gap-v flex">
        <div className="margin-gap-h">Название</div>
        <KeyboardInput
          className="full-width"
          value={name}
          onChange={value => setName(value)}
        />
      </div>
      <button
        disabled={!name || !currContextw || !meetings}
        onClick={() => {
          meetings && currContextw && exec(meetings.addEvent(name, currContextw));
          close(false);
        }}
      >
        Создать
      </button>
      {!currContextw || !meetings ? (
        <div className="error-message">Не возможно создать событие вне контекста</div>
      ) : null}
    </div>
  );
}
