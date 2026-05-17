import { Button, DropdownMenu } from '#shared/components';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';

export const CmComCommentTools = ({ comw }: { comw: CmComWid }) => {
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
              <DropdownMenu.Item>
                <Button
                  icon="CloudDownload"
                  className="w-full"
                  onClick={async () => {
                    await cmTsjrpcClient.pullComComments({ comw });
                    toast('Свежие комментарии стянуты', makeToastOKMoodConfig());
                  }}
                >
                  Стянуть коменты
                </Button>
              </DropdownMenu.Item>
            </>
          )}
        </WithAtomValue>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
