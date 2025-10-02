import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { useToast } from '#shared/ui/modal/useToast';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { StrongEditableFieldMultiline } from './StrongEditableFieldMultiline';

type Props<Key, Value> = {
  fieldKey?: Key;
  value?: Value;
  title?: string;
  description?: React.ReactNode;
  disabled?: boolean;
  type?: 'text' | 'tel';
  icon?: KnownStameskaIconName;
  placeholder?: string;
  isRedact?: boolean;
  isSelfRedact?: boolean;
  isImpossibleEmptyValue?: boolean;
  postfix?: React.ReactNode;
  multiline?: boolean;
  textClassName?: string;
  className?: string;
  onChanged?: (value: string) => void | Promise<boolean>;
  onUpdate?: (value: string) => void | Promise<boolean>;
  onSend: (value: string) => Promise<unknown>;
  onSelfRedactChange?: (is: boolean) => void;
};

let inputTimeout: TimeOut;

export function StrongEditableField<Key extends string, Value extends string | Partial<Record<Key, string>>>(
  props: Props<Key, Value>,
) {
  const value = typeof props.value === 'string' ? props.value : (props.value?.[props.fieldKey as never] ?? '');
  const [stateValue, setStateValue] = useState(value);
  const [isUserChange, setIsUserChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const { editIcon, isSelfRedact } = useIsRedactArea({
    redactable: true,
    canRedact: true,
    isShowDoneButton: true,
    onEditStart: props.onSelfRedactChange,
  });
  const isRedact = props.isSelfRedact ? isSelfRedact : props.isRedact;

  const sendValue = async () => {
    const isSendResuls =
      stateValue !== undefined &&
      (props.isImpossibleEmptyValue !== true || stateValue.trim()) &&
      stateValue.trim() !== value?.trim();

    if (props.onUpdate !== undefined) {
      props.onUpdate(stateValue.trim());
      return;
    }

    if (isSendResuls) {
      setIsLoading(true);
      setIsError(false);

      return props
        .onSend(stateValue.trim())
        .then(() => {
          setIsLoading(false);
          setIsUserChange(false);
        })
        .catch(errorMessage => {
          toast(errorMessage, { mood: 'ko' });
          setIsError(true);
        });
    } else setStateValue(value);
  };

  useEffect(() => {
    if (!isUserChange) setStateValue(value);
  }, [isUserChange, value]);

  const indicatorNode = isError ? (
    <LazyIcon
      icon="Alert01"
      className="text-xKO"
    />
  ) : (
    <TheIconLoading isLoading={isLoading}>
      {stateValue !== value ? (
        <LazyIcon
          icon="LinkBackward"
          className="pointer"
          onMouseDown={() => setStateValue(value)}
          onTouchStart={() => setStateValue(value)}
        />
      ) : (
        <LazyIcon
          icon="CloudUpload"
          className="opacity-50"
        />
      )}
    </TheIconLoading>
  );

  return (
    <div
      className={twMerge('my-2', props.className)}
      attr-text={stateValue}
    >
      {isRedact ? (
        <>
          {(props.title || props.isSelfRedact) && (
            <div className="flex gap-2">
              {props.icon && <LazyIcon icon={props.icon} />}
              {props.title}
              {props.isSelfRedact && editIcon}
              {indicatorNode}
            </div>
          )}
          <div className="flex gap-2 my-5">
            {props.description}
            <TextInput
              defaultValue={stateValue}
              st-mood="1"
              placeholder={props.placeholder}
              multiline={props.multiline}
              type={props.type}
              disabled={props.disabled}
              onInput={val => {
                clearTimeout(inputTimeout);
                inputTimeout = setTimeout(setStateValue, 500, val);

                setIsUserChange(true);
                props.onChanged?.(val);
              }}
              onChanged={sendValue}
              onKeyUp={event => {
                if (event.key === 'Escape') setIsUserChange(false);

                if (event.key === 'Enter' && (!props.multiline || event.ctrlKey)) sendValue();
              }}
            />
            <div className="flex flex-col">{props.title || props.isSelfRedact ? null : indicatorNode}</div>
          </div>
        </>
      ) : (
        <div
          draggable={!!value}
          className="flex gap-2"
        >
          {props.icon && (
            <LazyIcon
              icon={props.icon}
              className="text-x7 self-start"
            />
          )}
          {value ? (
            props.multiline ? (
              <StrongEditableFieldMultiline value={value} />
            ) : (
              <div className={twMerge('break-word', props.textClassName || 'text-x7')}>
                {value}
                {props.postfix || ''}
              </div>
            )
          ) : (
            <>{props.title && <>{props.title} - </>}Без значения</>
          )}
          {props.isRedact && props.isSelfRedact && editIcon}
        </div>
      )}
    </div>
  );
}
