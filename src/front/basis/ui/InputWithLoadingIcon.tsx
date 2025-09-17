import { TextInput } from '#shared/ui/TextInput';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props<ChangedValue> = {
  onChange: (value: string) => Promise<ChangedValue>;
  onInput?: (value: string) => void;
  type?: 'email' | 'tel' | 'text';
  defaultValue: string;
  label?: string;
  placeholder?: string;
  className?: string;
  icon: KnownStameskaIconName;
  multiline?: boolean;
  isError?: boolean;
  disabled?: boolean;
};

export const InputWithLoadingIcon = <ChangedValue,>({
  onChange,
  onInput,
  type,
  defaultValue,
  icon,
  label,
  multiline,
  isError,
  placeholder,
  disabled,
  className = '',
}: Props<ChangedValue>) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex gap-2 my-2">
      {isError ? (
        <LazyIcon
          icon="Alert02"
          className="text-xKO"
        />
      ) : (
        <TheIconLoading
          icon={icon}
          isLoading={isLoading}
        />
      )}
      {label && <span className="nowrap">{label}</span>}

      <TextInput
        multiline={multiline}
        className={twMerge('w-full pointer', className)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onInput={onInput}
        onChanged={async value => {
          if (isError || defaultValue === value) return;
          setIsLoading(true);

          try {
            await onChange(value);
          } catch (_error) {
            //
          }

          setIsLoading(false);
        }}
      />
    </div>
  );
};
