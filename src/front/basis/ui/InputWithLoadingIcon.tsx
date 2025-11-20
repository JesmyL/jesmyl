import { TextInput } from '#shared/ui/TextInput';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { HTMLAttributes, useState } from 'react';
import { StameskaIconKind } from 'stameska-icon/utils';
import { twMerge } from 'tailwind-merge';

type Props<ChangedValue> = {
  onChanged: (value: string) => Promise<ChangedValue>;
  onInput?: (value: string) => void;
  defaultValue?: string;
  value?: string;
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
) &
  Parameters<typeof TextInput>[0] &
  OmitOwn<HTMLAttributes<HTMLInputElement>, 'onInput'>;

export const InputWithLoadingIcon = <ChangedValue,>({
  onChanged,
  onInput,
  type,
  label,
  multiline,
  isError,
  placeholder,
  disabled,
  strongDefaultValue,
  className = '',
  postfix,
  ...attrs
}: Props<ChangedValue>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstValue, setFirstValue] = useState(attrs.defaultValue ?? attrs.value);

  return (
    <div className="w-full flex gap-2 my-2">
      <div className={label ? 'mt-5' : ''}>
        {isError ? (
          <LazyIcon
            icon="Alert02"
            className="text-xKO"
          />
        ) : 'icon' in attrs ? (
          <TheIconLoading
            icon={attrs.icon}
            iconKind={attrs.iconKind}
            isLoading={isLoading}
          />
        ) : (
          attrs.iconNode
        )}
      </div>
      <div className="w-full">
        {label && <span className="nowrap">{label}</span>}

        <div className="flex gap-3">
          <TextInput
            {...attrs}
            multiline={multiline}
            className={twMerge('w-full pointer', className)}
            placeholder={placeholder}
            strongDefaultValue={strongDefaultValue}
            type={type}
            disabled={disabled}
            onInput={onInput}
            onChanged={async value => {
              if (isError || firstValue === value) return;
              setIsLoading(true);

              try {
                await onChanged(value);
                setFirstValue(value);
              } catch (_error) {
                //
              }

              setIsLoading(false);
            }}
          />
          {postfix}
        </div>
      </div>
    </div>
  );
};
