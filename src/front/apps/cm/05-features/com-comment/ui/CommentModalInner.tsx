import { Button } from '#shared/components/ui/button';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal, ModalBody, ModalFooter, ModalHeader, usePrompt } from '#shared/ui/modal';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import { CmCom } from '$cm/entities/com';
import {
  cmComCommentAltKeyAtom,
  cmComCommentRedactOrdSelectorIdAtom,
  cmComCommentRegisteredAltKeysAtom,
  TheCmComCommentInfo,
  useCmComCommentBlock,
} from '$cm/entities/com-comment';
import { CmComOrder } from '$cm/entities/com-order';
import { cmAppActions } from '$cm/shared/const';
import { cmIDB } from '$cm/shared/state';
import { useAuth } from '$index/shared/state';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { emptyArray } from 'shared/utils';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { toast } from 'sonner';
import { CmComCommentTransferAltModalInner } from './TransferAltCommentModalInner';

const HashSwitcherIcon = 'Note03';
const isShowInfoModalAtom = atom(false);
const isOpenTransferModalAtom = atom(false);

export const CmComCommentModalInner = ({ com }: { com: CmCom }) => {
  const ordSelectorId = useAtomValue(cmComCommentRedactOrdSelectorIdAtom);
  const altCommentKey = useAtomValue(cmComCommentAltKeyAtom);
  const deferredCallback = useDeferredCallback();
  const { takeCommentTexts, localCommentBlock, maxComCommentAlternativesCount } = useCmComCommentBlock(com.wid);
  const prompt = usePrompt();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const auth = useAuth();

  if (ordSelectorId === null) return;

  cmComCommentRegisteredAltKeysAtom.do.init();
  const visibleOrders = com.visibleOrders() ?? [];

  const comCommentBlockTexts = takeCommentTexts(ordSelectorId) ?? [];

  let ord: CmComOrder | und;
  let ordNN = 0;

  if (ordSelectorId !== 'head') {
    const ordi = visibleOrders.findIndex(ord => ord.isMySelector(ordSelectorId));

    ord = visibleOrders[ordi];
    ordNN = ordi + 1;
  }

  return (
    <>
      <ModalHeader className="flex gap-2 justify-between @container">
        <span className="flex gap-2 w-[calc(100cqw-23px*2)]">
          <LazyIcon icon="TextAlignLeft" />
          <span className="text-x7 nowrap">
            #{ordNN} {ord?.me.header()}
          </span>
          <span className="text-x3 ellipsis">{com.name}</span>
        </span>

        {ordSelectorId === 'head' ? (
          auth.login && (
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
          )
        ) : (
          <Button
            icon="TextFont"
            onClick={() => cmComCommentRedactOrdSelectorIdAtom.set('head')}
          />
        )}
      </ModalHeader>
      <ModalBody key={ordSelectorId}>
        {comCommentBlockTexts.concat(comCommentBlockTexts.length < 7 ? '' : [])?.map((line, linei) => {
          return (
            <TextInput
              key={`${altCommentKey}${linei}`}
              defaultValue={line}
              multiline
              className="mb-3"
              onInput={value => {
                deferredCallback(
                  async () => {
                    const texts = [...(takeCommentTexts(ordSelectorId) ?? emptyArray)];
                    const isAltComment =
                      altCommentKey != null &&
                      (localCommentBlock?.alt?.[altCommentKey] != null ||
                        mylib.keys(localCommentBlock?.alt ?? []).length < maxComCommentAlternativesCount);

                    texts[linei] = value;

                    cmIDB.tb.localComCommentBlocks.put({
                      ...localCommentBlock,
                      comw: com.wid,
                      m: Date.now(),
                      d: isAltComment
                        ? localCommentBlock?.d
                        : {
                            ...localCommentBlock?.d,
                            [ordSelectorId]: texts,
                          },
                      alt: isAltComment
                        ? {
                            ...localCommentBlock?.alt,
                            [altCommentKey]: {
                              ...localCommentBlock?.alt?.[altCommentKey],
                              [ordSelectorId]: texts,
                            },
                          }
                        : localCommentBlock?.alt,
                    });
                  },
                  1000,
                  false,
                );
              }}
            />
          );
        })}
      </ModalBody>
      <ModalFooter className="flex gap-2">
        {(localCommentBlock?.d?.[ordSelectorId] != null ||
          (altCommentKey && localCommentBlock?.alt?.[altCommentKey]?.[ordSelectorId] != null)) && <SavedLocalLabel />}

        <Dropdown<string | null>
          id={altCommentKey}
          nullTitle={<span className="text-x7">Общ</span>}
          onSelectId={cmComCommentAltKeyAtom.set}
          items={Array.from(registeredAltKeys).map(key => ({ id: key, title: key }))}
          renderItem={item => (
            <>
              <LazyIcon icon="TextAlignLeft" />
              {item}
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
      .pipe(
        setTimeoutPipe(() => {
          setIsShow(true);
        }, 2500),
      )
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
