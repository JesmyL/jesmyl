import { JStorageBooleanVal } from '#shared/lib/JSimpleStorage/exports/Boolean';
import { ReactNode, useEffect, useState } from 'react';
import { StameskaIconName } from 'stameska-icon';
import { StyledLoadingSpinner } from './IconLoading';
import { LazyIcon } from './LazyIcon';

interface Props {
  checked?: boolean;
  onChange?: (is: boolean) => void;
  onClick?: () => Promise<unknown>;
  disabled?: boolean;
  prefix?: null | ReactNode;
  postfix?: null | ReactNode;
  className?: string;
  simpleValuer?: JStorageBooleanVal;
  negativeValue?: boolean;
}

export function IconCheckbox(props: Props) {
  const isClickable = !props.disabled;
  const className = `${props.className || ''}${isClickable ? ' pointer' : ''}${props.disabled ? ' disabled' : ''}`;
  const [isLoading, setIsLoading] = useState(false);

  const onClick = isClickable
    ? props.onClick
      ? async () => {
          try {
            setIsLoading(true);
            await props.onClick!();
            props.onChange?.(!props.checked);
            setIsLoading(false);
          } catch (_error) {
            //
          }
        }
      : () => props.onChange?.(!props.checked)
    : undefined;

  const renderNode = (icon: StameskaIconName) => {
    if (isLoading)
      return (
        <StyledLoadingSpinner
          icon="Loading03"
          className={className}
          onClick={onClick}
        />
      );

    return props.prefix === undefined && props.postfix === undefined ? (
      <LazyIcon
        icon={icon}
        className={className}
        onClick={onClick}
      />
    ) : (
      <span
        className={`flex flex-gap ${className || 'flex-max'}`}
        onClick={onClick}
      >
        {props.prefix}
        <LazyIcon icon={icon} />
        {props.postfix}
      </span>
    );
  };

  if (props.simpleValuer !== undefined)
    return (
      <WithSimpleValuer
        simpleValuer={props.simpleValuer}
        negativeValue={props.negativeValue}
      >
        {icon => renderNode(icon)}
      </WithSimpleValuer>
    );

  return renderNode(props.checked ? 'CheckmarkSquare04' : 'Square');
}

const WithSimpleValuer = (props: {
  children: (icon: StameskaIconName) => ReactNode;
  simpleValuer: JStorageBooleanVal;
  negativeValue?: boolean;
}) => {
  const [checked, setChecked] = useState(props.simpleValuer.get());

  useEffect(() => props.simpleValuer.listen(setChecked), [props.simpleValuer]);

  return <>{props.children((props.negativeValue ? !checked : checked) ? 'CheckmarkSquare04' : 'Square')}</>;
};
