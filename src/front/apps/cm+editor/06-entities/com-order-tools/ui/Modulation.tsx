import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { atom } from 'atomaric';
import { aSharpToBChord, bToASharpChord } from 'shared/utils/cm/com/const';
import { CmEditorComOrderToolsProps } from '../model';

const intervals = Array.from({ length: 12 }, (_, i) => i);

const isModalOpenAtom = atom(false);

export const CmEditorComOrderToolsModulation = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
  let firstChord = com.chordLabels[ordi][0][0];

  if (firstChord[1] === '#') firstChord = firstChord.slice(0, 1);
  else firstChord = firstChord[0];

  firstChord = bToASharpChord[firstChord] ?? firstChord;
  const modulationDelta = ord.fieldValues.md ?? 0;

  return (
    <>
      <BottomPopupItem
        icon="Flash"
        title="Значение модуляции"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>Установка значения модуляции</ModalHeader>
        <ModalBody>
          <TheCmComOrder
            ord={ord}
            ordi={ordi}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            com={com}
          />
          {intervals.map(position => {
            const resultChord = com.transposeChord(firstChord, -(modulationDelta - position));

            return (
              <IconCheckbox
                key={position}
                checked={modulationDelta === position}
                disabled={modulationDelta === position}
                className="mt-2"
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setModulationValue({
                    comw: com.wid,
                    orderTitle: ord.me.header(),
                    ordw: ord.wid,
                    value: position,
                  })
                }
                onChange={isModalOpenAtom.reset}
                postfix={
                  <>
                    <div className="text-x7 w-7">{aSharpToBChord[resultChord] ?? resultChord}</div>
                    <div className="w-17 text-center">
                      (+{position}/-{12 - position})
                    </div>
                  </>
                }
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
