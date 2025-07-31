import { mylib } from '#shared/lib/my-lib';
import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableComOrder } from '$cm+editor/basis/lib/EditableComOrder';
import { Order } from '$cm/col/com/order/Order';
import { atom } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { OrderRepeats } from 'shared/api';

interface Props {
  isChordBlock: boolean;
  startOrd: EditableComOrder;
  ord: EditableComOrder;
  textLinei: number;
  wordi: number;
  reset: () => void;
  setField: (ord?: EditableComOrder | null, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => void;
}

const startFlash = '/';
const finishFlash = '\\';
const flashDivider = '&nbsp;';

const isOpenModalAtom = atom(false);

export const CmComRepeatsRemoveButton = ({ isChordBlock, startOrd, ord, textLinei, wordi, reset, setField }: Props) => {
  const confirm = useConfirm();

  return (
    <>
      <div
        className="button remove"
        onClick={async event => {
          event.stopPropagation();

          if (isChordBlock) {
            if (await confirm(`Сбросить повторения блока "${startOrd.me.header() || ''}"?`, 'Сброс')) {
              cmEditComOrderClientTsjrpcMethods.removeRepeats({
                comw: startOrd.com.wid,
                orderTitle: startOrd.me.header(),
                ordw: startOrd.wid,
              });
              reset();
            }
            return;
          }

          isOpenModalAtom.set(true);
        }}
      >
        <LazyIcon icon="Delete01" />
      </div>

      <Modal openAtom={isOpenModalAtom}>
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
                <div
                  key={flashi}
                  className="flex gap-3 flex-wrap justify-center"
                >
                  <pre
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
                        ((startKey || '').startsWith('~') ? '' : flashDivider + finishFlash.repeat(count || 0)),
                    }}
                  />
                  <TheButton
                    color="x3"
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
                      isOpenModalAtom.reset();
                    }}
                  >
                    Сбросить
                  </TheButton>
                </div>
              );
            })}
        </ModalBody>
      </Modal>
    </>
  );
};
