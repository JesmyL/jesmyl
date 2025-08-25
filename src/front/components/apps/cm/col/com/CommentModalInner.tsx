import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Com } from '$cm/col/com/Com';
import { TheComCommentInfo } from '$cm/col/com/complect/comment-parser/infos/TheComCommentInfo';
import { atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { ComBlockCommentMakerCleans } from './complect/comment-parser/Cleans';
import { comCommentRedactOrdSelectorIdAtom } from './complect/comment-parser/complect';
import { Order } from './order/Order';

const HashSwitcherIcon = 'Note03';
const isShowInfoModalAtom = atom(false);

export const CmComCommentModalInner = ({ com }: { com: Com }) => {
  const ordSelectorId = useAtomValue(comCommentRedactOrdSelectorIdAtom);
  const deferredCallback = useDeferredCallback();
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(com.wid), [com.wid]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(com.wid), [com.wid]);

  if (ordSelectorId === null) return;

  const visibleOrders = com.orders?.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter) ?? [];

  const comCommentBlockTexts = localCommentBlock?.d[ordSelectorId] ?? commentBlock?.d[ordSelectorId] ?? [];

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
      <ModalHeader className="flex flex-gap">
        <LazyIcon icon="TextAlignLeft" />
        <span className="color--7 nowrap">
          #{ordNN} {ord?.me.header()}
        </span>
        <span className="color--3 ellipsis">{com.name}</span>
        {ordSelectorId !== 'head' && (
          <LazyIcon
            icon="TextFont"
            onClick={() => comCommentRedactOrdSelectorIdAtom.set('head')}
          />
        )}
      </ModalHeader>
      <ModalBody key={ordSelectorId}>
        {comCommentBlockTexts.concat(comCommentBlockTexts.length < 7 ? '' : [])?.map((line, linei) => {
          return (
            <TextInput
              key={linei}
              defaultValue={line}
              st-mood="1"
              multiline
              onInput={value => {
                deferredCallback(
                  () => {
                    const texts = [...(commentBlock?.d[ordSelectorId] ?? localCommentBlock?.d[ordSelectorId] ?? [])];

                    texts[linei] = value;

                    cmIDB.tb.localComCommentBlocks.put({
                      ...localCommentBlock,
                      comw: com.wid,
                      m: mylib.takeNewWid(),
                      d: {
                        ...localCommentBlock?.d,
                        [ordSelectorId]: texts,
                      },
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
      <ModalFooter className="flex flex-gap">
        {localCommentBlock?.d[ordSelectorId] != null && <SavedLocalLabel />}

        {/* <LazyIcon
          icon="MessageQuestion"
          className="pointer flex full-width between color--7 margin-gap-v"
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
          className="color--ok"
        />
      </>
    )
  );
};
