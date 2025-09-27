import { TextInput } from '#shared/ui/TextInput';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { StameskaIconKind } from 'stameska-icon/utils';
import { twMerge } from 'tailwind-merge';

type Props<ChangedValue> = {
  onChanged: (value: string) => Promise<ChangedValue>;
  onInput?: (value: string) => void;
  type?: 'email' | 'tel' | 'text';
  defaultValue: string;
  label?: string;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  isError?: boolean;
  disabled?: boolean;
  strongDefaultValue?: boolean;
  postfix?: React.ReactNode;
} & (
  | {
      icon: KnownStameskaIconName;
      iconKind?: StameskaIconKind;
    }
  | {
      iconNode: React.ReactNode;
    }
);

export const InputWithLoadingIcon = <ChangedValue,>({
  onChanged,
  onInput,
  type,
  defaultValue,
  label,
  multiline,
  isError,
  placeholder,
  disabled,
  strongDefaultValue,
  className = '',
  ...props
}: Props<ChangedValue>) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex gap-2 my-2">
      <div className={label ? 'mt-5' : ''}>
        {isError ? (
          <LazyIcon
            icon="Alert02"
            className="text-xKO"
          />
        ) : 'icon' in props ? (
          <TheIconLoading
            icon={props.icon}
            iconKind={props.iconKind}
            isLoading={isLoading}
          />
        ) : (
          props.iconNode
        )}
      </div>
      <div className="w-full">
        {label && <span className="nowrap">{label}</span>}

        <div className="flex gap-3">
          <TextInput
            multiline={multiline}
            className={twMerge('w-full pointer', className)}
            defaultValue={defaultValue}
            placeholder={placeholder}
            strongDefaultValue={strongDefaultValue}
            type={type}
            disabled={disabled}
            onInput={onInput}
            onChanged={async value => {
              if (isError || defaultValue === value) return;
              setIsLoading(true);

              try {
                await onChanged(value.trim());
              } catch (_error) {
                //
              }

              setIsLoading(false);
            }}
          />
          {props.postfix}
        </div>
      </div>
    </div>
  );
};
