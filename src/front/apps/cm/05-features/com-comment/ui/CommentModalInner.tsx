import { DropdownMenu } from '#shared/components';
import { Button } from '#shared/components/ui/button';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal, ModalBody, ModalFooter, ModalHeader, usePrompt } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import {
  cmComCommentCurrentOpenedAltKeyAtom,
  cmComCommentRedactOrdSelectorIdAtom,
  cmComCommentRegisteredAltKeysAtom,
  useCmComCommentBlock,
} from '$cm/entities/com-comment';
import { CmComOrder } from '$cm/entities/com-order';
import { CmCom } from '$cm/ext';
import { cmConstantsConfigAtom, cmIDB, cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { toast } from 'sonner';
import { CmComCommentHeadCommentTools } from './HeaderCommentTools';
import { CmComCommentKindComments } from './KindComments';
import { CmComCommentSimpleComments } from './SimpleComments';
import { CmComCommentTransferAltModalInner } from './TransferAltCommentModalInner';

let isKindCommentsAtom: Atom<boolean>;

export const CmComCommentModalInner = ({ com }: { com: CmCom }) => {
  isKindCommentsAtom ??= atom(false);

  const ordSelectorId = useAtomValue(cmComCommentRedactOrdSelectorIdAtom);
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[com.wid] ?? altCommentKeys.last;
  const isKindComments = useAtomValue(isKindCommentsAtom);

  const { localCommentBlock } = useCmComCommentBlock(com.wid);
  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const prompt = usePrompt();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);

  if (ordSelectorId === null) return;

  cmComCommentRegisteredAltKeysAtom.do.init();

  let ord: CmComOrder | und;
  let ordNN = 0;

  if (ordSelectorId !== CmComCommentBlockSpecialSelector.Head) {
    const { ord: ordBySelector, visibleOrdi } = com.getOrderBySelector(ordSelectorId);

    ord = ordBySelector;
    ordNN = visibleOrdi + 1;
  }

  return (
    <>
      <ModalHeader className="flex gap-2 justify-between @container">
        <span className="flex gap-2 w-[calc(100cqw-44px*2)]">
          <LazyIcon icon="TextAlignLeft" />
          <span className="text-x7 nowrap">
            {isKindComments || !ordNN || <>#{ordNN} </>}
            {ord?.me.header()}
          </span>
          <span className="text-x3 ellipsis">{com.name}</span>
        </span>

        <CmComCommentHeadCommentTools
          com={com}
          addItems={[
            <DropdownMenu.Item key="TextFirstlineRight">
              <Button
                icon="TextFirstlineRight"
                iconKind={isKindComments ? 'BulkRounded' : undefined}
                className={`w-full ${isKindComments ? ' text-x7' : ''}`}
                onClick={isKindCommentsAtom.do.toggle}
              >
                Комменты по блокам
              </Button>
            </DropdownMenu.Item>,

            <DropdownMenu.Item key="TextFont">
              <Button
                icon="TextFont"
                onClick={() => cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head)}
                className="w-full"
              >
                Редактировать главный коммент
              </Button>
            </DropdownMenu.Item>,
          ]}
        />
      </ModalHeader>

      <WithAtomValue atom={cmIsShowMyCommentsAtom}>
        {isShowComments =>
          isShowComments ? (
            <>
              <ModalBody>
                {isKindComments && !ordNN ? (
                  <CmComCommentKindComments
                    altCommentKey={altCommentKey}
                    com={com}
                  />
                ) : (
                  <CmComCommentSimpleComments
                    altCommentKey={altCommentKey}
                    ordSelectorId={ordSelectorId}
                    comw={com.wid}
                  />
                )}
              </ModalBody>
              <ModalFooter className="flex gap-2">
                {(localCommentBlock?.d?.[ordSelectorId] != null ||
                  (altCommentKey && localCommentBlock?.alt?.[altCommentKey]?.[ordSelectorId] != null)) && (
                  <SavedLocalLabel />
                )}

                <Dropdown<string | null>
                  id={altCommentKey}
                  nullTitle={<span className="text-x7">Общ</span>}
                  onSelectId={last =>
                    cmComCommentCurrentOpenedAltKeyAtom.do.setPartial({ last, [com.wid]: last ?? undefined })
                  }
                  items={Array.from(registeredAltKeys).map(key => ({ id: key, title: key }))}
                  renderItem={({ node }) => (
                    <>
                      <LazyIcon icon="TextAlignLeft" />
                      {node}
                    </>
                  )}
                  addContent={
                    <div className="flex flex-col gap-3">
                      <Button
                        asSpan
                        className="text-x7 w-full"
                        disabled={registeredAltKeys.size >= maxComCommentAlternativesCount}
                        onClick={async () => {
                          if (cmComCommentRegisteredAltKeysAtom.get().size >= maxComCommentAlternativesCount) {
                            toast('Добавлено максимальное количество альтернатив');
                            return;
                          }

                          const altCommentKey = (await prompt('Добавить новую альтернативу'))?.toLowerCase();
                          const localComment = await cmIDB.tb.localComCommentBlocks.get(com.wid);

                          if (!altCommentKey || (localComment?.alt && altCommentKey in localComment.alt)) {
                            return;
                          }
                          const maxLen = 10;

                          if (altCommentKey.length > maxLen) {
                            toast(`Слишком длинное название (${maxLen}+)`);
                            return;
                          }

                          await cmIDB.tb.localComCommentBlocks.put({
                            ...localComment,
                            comw: com.wid,
                            m: Date.now(),
                            alt: { ...localComment?.alt, [altCommentKey]: {} },
                          });

                          cmComCommentRegisteredAltKeysAtom.do.add(altCommentKey);
                        }}
                      >
                        <LazyIcon icon="PlusSign" />
                        Добавить
                      </Button>

                      <WithAtom init={false}>
                        {isOpenTransferModalAtom => (
                          <>
                            <Button
                              asSpan
                              className="text-x7"
                              onClick={isOpenTransferModalAtom.do.toggle}
                            >
                              <LazyIcon icon="ArrowDataTransferHorizontal" />
                              Обмен
                            </Button>

                            <Modal openAtom={isOpenTransferModalAtom}>
                              <CmComCommentTransferAltModalInner com={com} />
                            </Modal>
                          </>
                        )}
                      </WithAtom>
                    </div>
                  }
                />
              </ModalFooter>
            </>
          ) : (
            <ModalBody className="text-xKO">Комментарии скрыты</ModalBody>
          )
        }
      </WithAtomValue>
    </>
  );
};

const SavedLocalLabel = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(() => setIsShow(true), 2500))
      .effect();
  }, []);

  return (
    isShow && (
      <>
        Сохранено локально
        <LazyIcon
          icon="FileValidation"
          className="text-xOK"
        />
      </>
    )
  );
};
