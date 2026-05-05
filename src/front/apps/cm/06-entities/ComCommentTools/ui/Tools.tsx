import { DropdownMenu } from '#shared/components';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';

export const CmComCommentTools = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex gap-2">
        <LazyIcon icon="MoreVerticalCircle01" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <WithAtomValue atom={cmIsShowMyCommentsAtom}>
          {isShow => (
            <>
              <DropdownMenu.Item onClick={cmIsShowMyCommentsAtom.do.toggle}>
                <IconCheckbox
                  checked={isShow}
                  postfix="Показать комменты"
                  className="w-full"
                />
              </DropdownMenu.Item>
            </>
          )}
        </WithAtomValue>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
