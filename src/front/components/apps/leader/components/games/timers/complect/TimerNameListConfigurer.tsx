import { mylib } from 'front/utils';
import { useState } from 'react';
import KeyboardInput from '../../../../../../../complect/keyboard/KeyboardInput';
import SendButton from '../../../../../../../complect/sends/send-button/SendButton';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../complect/the-icon/icons/plus-sign-circle';
import useIsRedactArea from '../../../../../../../complect/useIsRedactArea';

export default function TimerNameListConfigurer({
  timerNames,
  onUpdate,
  redact,
  redactable,
  onSend,
}: {
  timerNames?: string[];
  redact?: boolean;
  redactable?: boolean;
  onUpdate?: (names: string[] | und) => void;
  onSend?: (names: string[]) => Promise<unknown> | und;
}) {
  const [names, updateNames] = useState<string[]>(timerNames ?? []);
  const [isSending, setIsSending] = useState(false);
  const { editIcon, isRedact, setIsSelfRedact } = useIsRedactArea(redactable, redact);

  return (
    <div className="margin-gap">
      <h2 className="flex flex-gap">
        Названия таймеров (точек)
        {editIcon}
      </h2>
      {isRedact ? (
        <>
          <div className={isSending ? 'disabled' : ''}>
            {names.map((name, namei) => {
              return (
                <KeyboardInput
                  key={namei}
                  className="margin-gap-v"
                  value={name}
                  onChange={value => {
                    const newNames = [...names];
                    newNames[namei] = value;
                    onUpdate?.(newNames.filter(n => n));
                    updateNames(newNames);
                  }}
                />
              );
            })}
            {!names.some(name => !name) && (
              <IconPlusSignCircleStrokeRounded
                className="color--ok"
                onClick={() => updateNames([...names, ''])}
              />
            )}
          </div>
          {onSend && (
            <div>
              {mylib.isEq(timerNames, names) || (
                <SendButton
                  title="Отправить названия"
                  confirm
                  onFailure={() => setIsSending(false)}
                  onSuccess={() => {
                    setIsSending(false);
                    setIsSelfRedact(false);
                  }}
                  onSend={() => {
                    setIsSending(true);
                    return onSend(names);
                  }}
                />
              )}
            </div>
          )}
        </>
      ) : (
        timerNames?.map((name, namei) => {
          return <div key={namei}>{name}</div>;
        })
      )}
    </div>
  );
}
