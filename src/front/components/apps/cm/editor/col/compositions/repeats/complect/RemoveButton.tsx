import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { OrderRepeats } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { useConfirm } from '../../../../../../../../complect/modal/confirm/useConfirm';
import IconButton from '../../../../../../../../complect/the-icon/IconButton';
import { Order } from '../../../../../col/com/order/Order';
import { cmComOrderClientInvocatorMethods } from '../../../../cm-editor-invocator.methods';
import { EditableOrder } from '../../complect/orders/EditableOrder';

interface Props {
  isChordBlock: boolean;
  startOrd: EditableOrder;
  ord: EditableOrder;
  textLinei: number;
  wordi: number;
  reset: () => void;
  setField: (ord?: EditableOrder | null, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => void;
}

const startFlash = '/';
const finishFlash = '\\';
const flashDivider = '&nbsp;';

export const ComRepeatsRemoveButton = ({ isChordBlock, startOrd, ord, textLinei, wordi, reset, setField }: Props) => {
  const [confirmNode, confirm] = useConfirm();
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      {confirmNode}
      <div
        className="button remove"
        onClick={async event => {
          event.stopPropagation();

          if (isChordBlock) {
            if (await confirm(`Сбросить повторения блока "${startOrd.me.header() || ''}"?`, 'Сброс')) {
              cmComOrderClientInvocatorMethods.removeRepeats(
                null,
                startOrd.com.wid,
                startOrd.me.header(),
                startOrd.wid,
              );
              reset();
            }
            return;
          }

          setIsOpenModal(true);
        }}
      >
        <LazyIcon icon="Delete01" />
      </div>

      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>Сброс границ</ModalHeader>

          <ModalBody>
            {ord.regions
              ?.filter(({ startLinei, startWordi }) => textLinei === startLinei && wordi === startWordi)
              .map((flash, flashi) => {
                const { startLinei, startWordi, endLinei, endWordi, startOrd, endOrd, startKey, count } = flash;
                const fill = (
                  ord?: Order | null,
                  l?: number | nil,
                  w?: number | nil,
                  isBeg?: boolean,
                  fl?: number | und,
                  fw?: number | und,
                ) => {
                  const lines = (ord?.text || '').split(makeRegExp('/\\n+/'));
                  return (isBeg ? lines.slice(l || 0, fl == null ? fl : fl + 1) : lines.slice(0, (l || 0) + 1))
                    .map(line =>
                      (isBeg
                        ? (line || '').split(makeRegExp('/ +/')).slice(w || 0, fw == null ? fw : fw + 1)
                        : (line || '').split(makeRegExp('/ +/')).slice(0, (w || 0) + 1)
                      ).join(' '),
                    )
                    .join('\n');
                };

                return (
                  <pre
                    key={flashi}
                    onClick={() => {
                      const { startOrd, endOrd, startKey, endKey } = flash;
                      const srepeats = mylib.clone(startOrd?.repeats);

                      if (srepeats && typeof srepeats !== 'number') {
                        delete srepeats[startKey];
                        setField(startOrd, srepeats);
                      } else setField(startOrd, 0);

                      startOrd?.resetRegions();

                      if (startOrd !== endOrd && endOrd) {
                        const frepeats = {
                          ...(typeof endOrd.repeats === 'number' ? { '.': endOrd.repeats } : endOrd.repeats || {}),
                        };

                        delete frepeats[endKey || '.'];
                        setField(endOrd, frepeats);
                        endOrd?.resetRegions();
                      }

                      reset();
                      setIsOpenModal(false);
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        startFlash.repeat(count || 0) +
                        flashDivider +
                        ((startKey || '').startsWith('~')
                          ? fill(
                              startOrd,
                              startLinei,
                              startWordi,
                              true,
                              startLinei ?? undefined,
                              startWordi ?? undefined,
                            )
                          : startOrd === endOrd
                            ? fill(startOrd, startLinei, startWordi, true, endLinei ?? undefined, endWordi ?? undefined)
                            : `${fill(startOrd, startLinei, startWordi, true)}\n...\n${fill(
                                endOrd,
                                startLinei,
                                startWordi,
                                false,
                              )}`) +
                        flashDivider +
                        finishFlash.repeat(count || 0),
                    }}
                  />
                );
              })}
          </ModalBody>

          <ModalFooter>
            <div className="flex flex-big-gap">
              <IconButton
                icon="Unavailable"
                postfix="Отмена"
                onClick={setIsOpenModal}
              />
            </div>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
