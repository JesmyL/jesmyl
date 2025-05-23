import { StrongEditableFieldMultiline } from '#basis/ui/strong-control/field/StrongEditableFieldMultiline';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { useToast } from '#shared/ui/modal/useToast';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useState } from 'react';
import { StameskaIconName } from 'stameska-icon';

type Props<Key, Value> = {
  fieldKey?: Key;
  value?: Value;
  title?: string;
  description?: ReactNode;
  disabled?: boolean;
  type?: 'text' | 'number';
  icon?: StameskaIconName;
  placeholder?: string;
  isRedact?: boolean;
  setSelfRedact?: boolean;
  isImpossibleEmptyValue?: boolean;
  postfix?: ReactNode;
  multiline?: boolean;
  textClassName?: string;
  className?: string;
  onChange?: (value: string) => void | Promise<boolean>;
  onUpdate?: (value: string) => void | Promise<boolean>;
  onSend: (value: string) => Promise<unknown>;
  onSelfRedactChange?: (is: boolean) => void;
};

export default function StrongEditableField<Key extends string, Value extends string | Partial<Record<Key, string>>>(
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
  const isRedact = props.setSelfRedact ? isSelfRedact : props.isRedact;

  const sendValue = () => {
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

      props
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
      className="error-message"
    />
  ) : (
    <TheIconLoading isLoading={isLoading}>
      {stateValue !== value ? (
        <LazyIcon
          icon="LinkBackward"
          className="pointer"
          onPointerDown={() => setStateValue(value)}
        />
      ) : (
        <LazyIcon
          icon="CloudUpload"
          className="fade-05"
        />
      )}
    </TheIconLoading>
  );

  return (
    <div
      className={props.className || 'margin-gap-v'}
      attr-text={stateValue}
    >
      {isRedact ? (
        <>
          {(props.title || props.setSelfRedact) && (
            <div className="flex flex-gap">
              {props.icon && <LazyIcon icon={props.icon} />}
              {props.title}
              {props.setSelfRedact && editIcon}
              {indicatorNode}
            </div>
          )}
          <div className="flex flex-gap">
            {props.description}
            <KeyboardInput
              value={stateValue}
              placeholder={props.placeholder}
              multiline={props.multiline}
              type={props.type}
              disabled={props.disabled}
              onChange={val => {
                setStateValue(val);
                setIsUserChange(true);
                props.onChange?.(val);
              }}
              onBlur={sendValue}
              onKeyUp={event => {
                if (event.key === 'Escape') setIsUserChange(false);

                if (event.key === 'Enter' && (!props.multiline || event.ctrlKey)) sendValue();
              }}
            />
            {props.title || props.setSelfRedact ? null : indicatorNode}
          </div>
        </>
      ) : (
        <div
          draggable={!!value}
          className="flex flex-gap"
        >
          {props.icon && (
            <LazyIcon
              icon={props.icon}
              className="color--7 self-start"
            />
          )}
          {value ? (
            props.multiline ? (
              <StrongEditableFieldMultiline value={value} />
            ) : (
              <div className={'break-word ' + (props.textClassName || 'color--7 ')}>
                {value}
                {props.postfix || ''}
              </div>
            )
          ) : (
            <>{props.title && <>{props.title} - </>}Без значения</>
          )}
          {props.isRedact && props.setSelfRedact && editIcon}
        </div>
      )}
    </div>
  );
}
