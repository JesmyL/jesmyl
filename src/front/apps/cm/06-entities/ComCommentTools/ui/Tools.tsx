import { Button, DropdownMenu } from '#shared/components';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { CmCom } from '$cm/ext';
import { cmAppActions } from '$cm/shared/const';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { useAuth } from '$index/shared/state';

export const CmComCommentTools = ({ com }: { com: CmCom }) => {
  const auth = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex gap-2">
        <LazyIcon icon="MoreVerticalCircle01" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <WithAtomValue atom={cmIsShowMyCommentsAtom}>
          {isShow => (
            <>
              {isShow && (
                <>
                  {auth.login && (
                    <DropdownMenu.Item>
                      <WithAtom init={false}>
                        {atom =>
                          auth.login && (
                            <>
                              <Button
                                icon="QrCode"
                                onClick={atom.do.toggle}
                                className="w-full"
                              >
                                Поделиться
                              </Button>
                              <QrCodeFullScreen
                                openAtom={atom}
                                text={cmAppActions.makeLink({ shareCommentComw: com.wid, login: auth.login })}
                              />
                            </>
                          )
                        }
                      </WithAtom>
                    </DropdownMenu.Item>
                  )}
                </>
              )}
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
