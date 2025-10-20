import { Atom, useAtomValue } from 'atomaric';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { StyledLoadingSpinner } from './IconLoading';
import { LazyIcon } from './LazyIcon';

interface Props {
  isRadio?: boolean;
  checked?: boolean;
  onChange?: (is: boolean) => void;
  onClick?: () => Promise<unknown> | void;
  disabled?: boolean;
  prefix?: null | ReactNode;
  postfix?: null | ReactNode;
  className?: string;
  valueAtom?: Atom<boolean>;
  negativeValue?: boolean;
}

export function IconCheckbox(props: Props) {
  const className = `${props.className || ''}${!props.disabled ? ' pointer' : ''}${props.disabled ? ' disabled' : ''}`;
  const [isLoading, setIsLoading] = useState(false);

  const onClick = props.disabled
    ? undefined
    : props.onClick
      ? async () => {
          try {
            const promiseLike = props.onClick!();
            if (!(promiseLike instanceof Promise)) return;

            setIsLoading(true);
            await promiseLike;
            props.onChange?.(!props.checked);
            setIsLoading(false);
          } catch (_error) {
            //
          }
        }
      : () => props.onChange?.(!props.checked);

  const renderNode = (icon: KnownStameskaIconName) => {
    const loadIcon = isLoading ? (
      <StyledLoadingSpinner
        icon="Loading03"
        className={className}
        onClick={onClick}
        withoutAnimation
      />
    ) : null;
    const kind = props.isRadio
      ? (props.negativeValue ? !props.checked : props.checked)
        ? 'SolidRounded'
        : undefined
      : undefined;

    return props.prefix === undefined && props.postfix === undefined ? (
      (loadIcon ?? (
        <LazyIcon
          icon={props.isRadio ? 'RadioButton' : icon}
          kind={kind}
          className={className}
          withoutAnimation
          onClick={onClick}
        />
      ))
    ) : (
      <span
        className={twMerge('flex gap-2 flex-max', className)}
        onClick={onClick}
      >
        {props.prefix}
        {loadIcon ?? (
          <LazyIcon
            icon={props.isRadio ? 'RadioButton' : icon}
            kind={kind}
            withoutAnimation
          />
        )}
        {props.postfix}
      </span>
    );
  };

  if (props.valueAtom !== undefined)
    return (
      <WithAtomValue
        valueAtom={props.valueAtom}
        negativeValue={props.negativeValue}
      >
        {icon => renderNode(icon)}
      </WithAtomValue>
    );

  return renderNode(props.checked ? 'CheckmarkSquare04' : 'Square');
}

const WithAtomValue = (props: {
  children: (icon: KnownStameskaIconName) => ReactNode;
  valueAtom: Atom<boolean>;
  negativeValue?: boolean;
}) => {
  const checked = useAtomValue(props.valueAtom);

  return <>{props.children((props.negativeValue ? !checked : checked) ? 'CheckmarkSquare04' : 'Square')}</>;
};
