import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalHeader, useConfirm } from '#shared/ui/modal';
import { TheButton } from '#shared/ui/TheButton';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrder } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { OrderRepeats } from 'shared/api';
import { checkIsNotNumber } from 'shared/utils/checkIs';
import { nbsp } from 'shared/utils/cm/com/const';
import { cmComOrderCheckRepeatKeyIsFlag, makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';

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

let isOpenModalAtom: Atom<boolean>;

export const CmEditorTabComRepeatsRemoveButton = ({
  isChordBlock,
  startOrd,
  ord,
  textLinei,
  wordi,
  reset,
  setField,
}: Props) => {
  isOpenModalAtom ??= atom(false);

  const confirm = useConfirm();

  return (
    <>
      <Button
        icon="Delete01"
        className="button text-white! bg-xKO!"
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
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>Сброс границ</ModalHeader>

        <ModalBody>
          {ord.regions
            ?.filter(({ startLinei, startWordi }) => textLinei === startLinei && wordi === startWordi)
            .map((flash, flashi) => {
              const { startLinei, startWordi, finLinei, finWordi, startOrd, finOrd, startKey, count } = flash;

              const fill = (
                ord?: CmComOrder | null,
                l?: number | nil,
                w?: number | nil,
                isStart?: boolean,
                fl?: number | nil,
                fw?: number | nil,
              ) => {
                const lines = (ord?.text || '').split(makeRegExp('/\\n+/'));
                return (isStart ? lines.slice(l || 0, fl == null ? undefined : fl + 1) : lines.slice(0, (l || 0) + 1))
                  .map(line =>
                    (isStart
                      ? (line || '').split(makeRegExp('/ +/')).slice(w || 0, fw == null ? undefined : fw + 1)
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
                  <div
                    className="pre-text"
                    dangerouslySetInnerHTML={{
                      __html:
                        startFlash.repeat(count || 0) +
                        nbsp +
                        (cmComOrderCheckRepeatKeyIsFlag(startKey || '')
                          ? fill(
                              startOrd,
                              startLinei,
                              startWordi,
                              true,
                              startLinei ?? undefined,
                              startWordi ?? undefined,
                            )
                          : startOrd === finOrd
                            ? fill(startOrd, startLinei, startWordi, true, finLinei, finWordi)
                            : `${fill(startOrd, startLinei, startWordi, true)}\n...\n${fill(
                                finOrd,
                                startLinei,
                                startWordi,
                                false,
                              )}`) +
                        (cmComOrderCheckRepeatKeyIsFlag(startKey || '') ? '' : nbsp + finishFlash.repeat(count || 0)),
                    }}
                  />
                  <TheButton
                    color="x3"
                    onClick={() => {
                      const { startOrd, finOrd, startKey, finKey } = flash;
                      const startRrepeats = mylib.clone(startOrd?.repeats);

                      if (startRrepeats && checkIsNotNumber(startRrepeats)) {
                        delete startRrepeats[startKey];
                        setField(startOrd, startRrepeats);
                      } else setField(startOrd, 0);

                      startOrd?.resetRegions();

                      if (startOrd !== finOrd && finOrd) {
                        const frepeats = { ...makeCmComOrderRepeatOrSelf(finOrd.repeats) };

                        delete frepeats[finKey || '.'];
                        setField(finOrd, frepeats);
                        finOrd?.resetRegions();
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
