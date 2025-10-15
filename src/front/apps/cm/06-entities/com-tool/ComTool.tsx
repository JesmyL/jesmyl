import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { memo } from 'react';
import {
  useCmComToolIsComToolIconItemsContext,
  useCmComToolItemAttrsContext,
  useCmComToolNameContext,
} from './state/contexts';

type Props = Parameters<typeof BottomPopupItem>[0] & { iconClassName?: string };

export const CmComTool = memo(({ iconClassName = '', ...props }: Props) => {
  const toolName = useCmComToolNameContext();

  return useCmComToolIsComToolIconItemsContext() ? (
    props.icon ? (
      <button className="m-1">
        <LazyIcon
          icon={props.icon}
          kind={props.iconKind}
          className={`pointer com-tool com-tool-${toolName} ${iconClassName}`}
          onClick={props.onClick}
        />
      </button>
    ) : (
      props.iconNode
    )
  ) : (
    <Bottom
      {...props}
      className={`com-tool com-tool-${toolName}`}
      iconClassName={iconClassName}
    />
  );
});

const Bottom = memo((props: Props) => {
  return (
    <BottomPopupItem
      {...useCmComToolItemAttrsContext()}
      {...props}
    />
  );
});
