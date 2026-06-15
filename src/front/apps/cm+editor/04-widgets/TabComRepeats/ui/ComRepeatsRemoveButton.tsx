import { Button } from '#shared/components/ui/button';
import { propagationStopper } from '#shared/lib/event-funcs';
import { mylib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalHeader, useConfirm } from '#shared/ui/modal';
import { TheButton } from '#shared/ui/TheButton';
import { WithAtom } from '#shared/ui/WithAtom';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { checkIsNotNumber } from 'shared/utils/checkIs';
import { CmComOrdRepeatSlashPlacement, makeCmComOrderRepeats } from 'shared/utils/cm/order';
import { cmComOrderCheckRepeatKeyIsFlag, makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';
import { cmEditorTabComRepeatsStateAtom } from '../state/atoms';

interface Props {
  ord: EditableComOrder;
  textLinei: number;
  wordi: number;
}

export const CmEditorTabComRepeatsRemoveButton = ({ ord, textLinei, wordi }: Props) => {
  const { isChordBlock, start } = useAtomValue(cmEditorTabComRepeatsStateAtom);
  const confirm = useConfirm();
  if (!start) return;

  return (
    <WithAtom init={false}>
      {isOpenModalAtom => (
        <>
          <Button
            icon="Delete01"
            className="button text-white! bg-xKO!"
            onClick={async event => {
              propagationStopper(event);

              if (isChordBlock) {
                if (await confirm(`Сбросить повторения блока "${start.ord.me.header() || ''}"?`, 'Сброс')) {
                  cmEditComOrderClientTsjrpcMethods.removeRepeats({
                    comw: start.ord.com.wid,
                    ordw: start.ord.wid,
                  });
                  cmEditorTabComRepeatsStateAtom.reset();
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
                    return (
                      isStart ? lines.slice(l || 0, fl == null ? undefined : fl + 1) : lines.slice(0, (l || 0) + 1)
                    )
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
                            makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.Before, count || 0) +
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
                            (cmComOrderCheckRepeatKeyIsFlag(startKey || '')
                              ? ''
                              : makeCmComOrderRepeats(CmComOrdRepeatSlashPlacement.After, count || 0)),
                        }}
                      />
                      <TheButton
                        color="x3"
                        onClick={async () => {
                          const { startOrd, finOrd, startKey, finKey } = flash;
                          const startRrepeats = mylib.clone(startOrd?.repeats);

                          if (startRrepeats && checkIsNotNumber(startRrepeats)) {
                            delete startRrepeats[startKey];
                            await cmEditorTabComRepeatsStateAtom.do.$setField(startOrd, startRrepeats);
                          } else await cmEditorTabComRepeatsStateAtom.do.$setField(startOrd, 0);

                          if (startOrd !== finOrd && finOrd) {
                            const frepeats = { ...makeCmComOrderRepeatOrSelf(finOrd.repeats) };

                            delete frepeats[finKey || '.'];
                            await cmEditorTabComRepeatsStateAtom.do.$setField(finOrd, frepeats);
                          }

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
      )}
    </WithAtom>
  );
};
