import { Button } from '#shared/components/ui/button';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal, ModalBody, ModalFooter, ModalHeader, usePrompt } from '#shared/ui/modal';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import {
  cmComCommentCurrentOpenedAltKeyAtom,
  cmComCommentRedactOrdSelectorIdAtom,
  cmComCommentRegisteredAltKeysAtom,
  TheCmComCommentInfo,
  useCmComCommentBlock,
} from '$cm/entities/com-comment';
import { CmComOrder } from '$cm/entities/com-order';
import { CmCom } from '$cm/ext';
import { cmAppActions } from '$cm/shared/const';
import { cmConstantsConfigAtom, cmIDB } from '$cm/shared/state';
import { useAuth } from '$index/shared/state';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { toast } from 'sonner';
import { CmComCommentKindComments } from './KindComments';
import { CmComCommentSimpleComments } from './SimpleComments';
import { CmComCommentTransferAltModalInner } from './TransferAltCommentModalInner';

const HashSwitcherIcon = 'Note03';
const isShowInfoModalAtom = atom(false);
const isOpenTransferModalAtom = atom(false);
const isKindCommentsAtom = atom(false);

export const CmComCommentModalInner = ({ com }: { com: CmCom }) => {
  const ordSelectorId = useAtomValue(cmComCommentRedactOrdSelectorIdAtom);
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[com.wid] ?? altCommentKeys.last;
  const isKindComments = useAtomValue(isKindCommentsAtom);

  const { localCommentBlock } = useCmComCommentBlock(com.wid);
  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const prompt = usePrompt();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const auth = useAuth();

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

        {ordSelectorId === CmComCommentBlockSpecialSelector.Head ? (
          <>
            {auth.login && (
              <WithAtom init={false}>
                {atom =>
                  auth.login && (
                    <>
                      <Button
                        icon="QrCode"
                        onClick={atom.do.toggle}
                      />
                      <QrCodeFullScreen
                        openAtom={atom}
                        text={cmAppActions.makeLink({ shareCommentComw: com.wid, login: auth.login })}
                      />
                    </>
                  )
                }
              </WithAtom>
            )}
            <Button
              icon="TextFirstlineRight"
              iconKind={isKindComments ? 'BulkRounded' : undefined}
              className={isKindComments ? 'text-x7' : undefined}
              onClick={isKindCommentsAtom.do.toggle}
            />
          </>
        ) : (
          <Button
            icon="TextFont"
            onClick={() => cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head)}
          />
        )}
      </ModalHeader>
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
          (altCommentKey && localCommentBlock?.alt?.[altCommentKey]?.[ordSelectorId] != null)) && <SavedLocalLabel />}

        <Dropdown<string | null>
          id={altCommentKey}
          nullTitle={<span className="text-x7">Общ</span>}
          onSelectId={last => cmComCommentCurrentOpenedAltKeyAtom.do.setPartial({ last, [com.wid]: last ?? undefined })}
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

              <Button
                asSpan
                className="text-x7"
                onClick={isOpenTransferModalAtom.do.toggle}
              >
                <LazyIcon icon="ArrowDataTransferHorizontal" />
                Обмен
              </Button>
            </div>
          }
        />

        {/* <LazyIcon
          icon="MessageQuestion"
          className="pointer flex w-full between text-x7 my-2"
          onClick={event => {
            propagationStopper(event);
            isShowInfoModalAtom.set(true);
          }}
        /> */}
      </ModalFooter>

      <Modal openAtom={isShowInfoModalAtom}>
        <ModalHeader>Заметки к песне</ModalHeader>
        <ModalBody>
          <TheCmComCommentInfo HashSwitcherIcon={HashSwitcherIcon} />
        </ModalBody>
      </Modal>
      <Modal openAtom={isOpenTransferModalAtom}>
        <CmComCommentTransferAltModalInner com={com} />
      </Modal>
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
