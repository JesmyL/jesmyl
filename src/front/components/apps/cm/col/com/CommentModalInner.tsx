import { Button } from '#shared/components/ui/button';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { usePrompt } from '#shared/ui/modal/usePrompt';
import { useToast } from '#shared/ui/modal/useToast';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import {
  cmComCommentAltKeyAtom,
  cmComCommentRedactOrdSelectorIdAtom,
  cmComCommentRegisteredAltKeysAtom,
} from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useCmComCommentBlock } from '$cm/basis/lib/store/useCmComCommentBlock';
import { Com } from '$cm/col/com/Com';
import { TheComCommentInfo } from '$cm/col/com/complect/comment-parser/infos/TheComCommentInfo';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { emptyArray } from 'shared/utils';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { ComBlockCommentMakerCleans } from './complect/comment-parser/Cleans';
import { Order } from './order/Order';

const HashSwitcherIcon = 'Note03';
const isShowInfoModalAtom = atom(false);

export const CmComCommentModalInner = ({ com }: { com: Com }) => {
  const ordSelectorId = useAtomValue(cmComCommentRedactOrdSelectorIdAtom);
  const altCommentKey = useAtomValue(cmComCommentAltKeyAtom);
  const deferredCallback = useDeferredCallback();
  const { takeCommentTexts, localCommentBlock, maxComCommentAlternativesCount } = useCmComCommentBlock(com.wid);
  const prompt = usePrompt();
  const toast = useToast();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);

  if (ordSelectorId === null) return;

  const visibleOrders = com.orders?.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter) ?? [];

  const comCommentBlockTexts = takeCommentTexts(ordSelectorId) ?? [];

  let ord: Order | und;
  let ordNN = 0;

  if (mylib.isNum(ordSelectorId)) {
    const ordi = visibleOrders.findIndex(ord => ord.wid === ordSelectorId);
    ord = visibleOrders[ordi];
    ordNN = ordi + 1;
  } else if (ordSelectorId !== 'head') {
    const [leadOrdWid, watchOrdWid] = ordSelectorId.split('_').map(Number);
    const ordi = visibleOrders.findIndex(
      ord => ord.me.leadOrd?.wid === leadOrdWid && ord.me.watchOrd?.wid === watchOrdWid,
    );

    ord = visibleOrders[ordi];
    ordNN = ordi + 1;
  }

  return (
    <>
      <ModalHeader className="flex gap-2">
        <LazyIcon icon="TextAlignLeft" />
        <span className="text-x7 nowrap">
          #{ordNN} {ord?.me.header()}
        </span>
        <span className="text-x3 ellipsis">{com.name}</span>
        {ordSelectorId !== 'head' && (
          <LazyIcon
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
          items={registeredAltKeys.map(key => ({ id: key, title: key }))}
          addContent={
            registeredAltKeys.length < maxComCommentAlternativesCount && (
              <Button
                asSpan
                className="text-x7"
                onClick={async () => {
                  const altKeysSet = new Set<string>();

                  (await cmIDB.tb.localComCommentBlocks.toArray()).some(({ alt }) => {
                    mylib.keys(alt).forEach(key => altKeysSet.add(key));
                    return altKeysSet.size >= maxComCommentAlternativesCount;
                  });

                  if (altKeysSet.size < maxComCommentAlternativesCount)
                    (await cmIDB.tb.comCommentBlocks.toArray()).some(({ alt }) => {
                      mylib.keys(alt).forEach(key => altKeysSet.add(key));
                      return altKeysSet.size >= maxComCommentAlternativesCount;
                    });

                  cmComCommentRegisteredAltKeysAtom.set(
                    Array.from(altKeysSet).slice(0, maxComCommentAlternativesCount),
                  );

                  if (cmComCommentRegisteredAltKeysAtom.get().length >= maxComCommentAlternativesCount) {
                    toast('Добавлено максимальное количество альтернатив');
                    return;
                  }

                  const altCommentKey = await prompt('Добавить новую альтернативу');
                  const localComment = await cmIDB.tb.localComCommentBlocks.get(com.wid);

                  if (!altCommentKey || (localComment?.alt && altCommentKey in localComment.alt)) {
                    return;
                  }
                  const maxLen = 10;

                  if (altCommentKey.length > maxLen) {
                    toast(`Слишком длинное название (${maxLen}+)`, { mood: 'ko' });
                    return;
                  }

                  await cmIDB.tb.localComCommentBlocks.put({
                    ...localComment,
                    comw: com.wid,
                    m: Date.now(),
                    alt: { ...localComment?.alt, [altCommentKey]: {} },
                  });
                }}
              >
                <LazyIcon icon="PlusSign" />
                Добавить
              </Button>
            )
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
          <TheComCommentInfo HashSwitcherIcon={HashSwitcherIcon} />
        </ModalBody>
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
