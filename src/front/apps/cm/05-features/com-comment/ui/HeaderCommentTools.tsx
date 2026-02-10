import { Button, DropdownMenu } from '#shared/components';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { CmCom } from '$cm/ext';
import { cmAppActions } from '$cm/shared/const';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { useAuth } from '$index/shared/state';

export const CmComCommentHeadCommentTools = ({ addItems, com }: { addItems?: React.ReactNode[]; com: CmCom }) => {
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
                  {addItems}
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

                  <DropdownMenu.Item>
                    <WithAtom init={false}>
                      {atom => (
                        <>
                          <Button
                            icon="MessageQuestion"
                            onClick={atom.do.toggle}
                            className="w-full"
                          >
                            Синтаксис
                          </Button>
                          <Modal openAtom={atom}>
                            <ModalHeader>Синтаксис</ModalHeader>
                            <ModalBody className="flex custom-align-items flex-col gap-2">
                              <div>Напиши с начала строки в любом блоке комментов</div>
                              <div className="ml-2">! - для акцента</div>
                              <div className="ml-2">!! - для усиленного акцента</div>
                              <div className="ml-2 mt-2">2 - для определения комментария 2 строки</div>
                              <div className="ml-2">3:4 - правила для 4го слова 3й строки</div>
                              <div className="ml-4">1:3 [^!] - акцент первого аккорда над 3м словом 1й строки</div>
                              <div className="ml-4">
                                5:2 [^. !!Е] - усиленный акцент второго аккорда (с его заменой на E) над 2м словом 5й
                                строки
                              </div>
                              <div className="ml-4">
                                8:5 [{'<'}!!текст до] - "текст до" перед 5м словом 8й строки с усиленным акцентом
                              </div>
                              <div className="ml-4">
                                2:6 [{'>'}!текст после] - "текст после" после 6м словом 2й строки с акцентом
                              </div>
                            </ModalBody>
                          </Modal>
                        </>
                      )}
                    </WithAtom>
                  </DropdownMenu.Item>
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
