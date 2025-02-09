import { ReactNode, useEffect, useState } from 'react';
import { IconCheckmarkSquare04StrokeRounded } from '../../complect/the-icon/icons/checkmark-square-04';
import { IconSquareStrokeRounded } from '../../complect/the-icon/icons/square';
import { JStorageBooleanVal } from '../JSimpleStorage/exports/Boolean';
import { StyledLoadingSpinner } from './IconLoading';
import { TheIconType } from './model';

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

export default function IconCheckbox(props: Props) {
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
          } catch (error) {}
        }
      : () => props.onChange?.(!props.checked)
    : undefined;

  const renderNode = (Icon: TheIconType) => {
    if (isLoading) Icon = StyledLoadingSpinner;

    return props.prefix === undefined && props.postfix === undefined ? (
      <Icon
        className={className}
        onClick={onClick}
      />
    ) : (
      <span
        className={`flex flex-gap ${className || 'flex-max'}`}
        onClick={onClick}
      >
        {props.prefix}
        <Icon />
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
        {Icon => renderNode(Icon)}
      </WithSimpleValuer>
    );

  return renderNode(props.checked ? IconCheckmarkSquare04StrokeRounded : IconSquareStrokeRounded);
}

const WithSimpleValuer = (props: {
  children: (Icon: TheIconType) => ReactNode;
  simpleValuer: JStorageBooleanVal;
  negativeValue?: boolean;
}) => {
  const [checked, setChecked] = useState(props.simpleValuer.get());

  useEffect(() => props.simpleValuer.listen(setChecked), [props.simpleValuer]);

  return (
    <>
      {props.children(
        (props.negativeValue ? !checked : checked) ? IconCheckmarkSquare04StrokeRounded : IconSquareStrokeRounded,
      )}
    </>
  );
};
