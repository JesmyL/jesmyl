import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { memo } from 'react';
import { useComToolItemAttrsContext, useComToolNameContext, useIsComToolIconItemsContext } from './lib/contexts';

type Props = Parameters<typeof BottomPopupItem>[0] & { iconClassName?: string };

export const ComTool = memo(({ iconClassName = '', ...props }: Props) => {
  const toolName = useComToolNameContext();

  return useIsComToolIconItemsContext() ? (
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
      {...useComToolItemAttrsContext()}
      {...props}
    />
  );
});
