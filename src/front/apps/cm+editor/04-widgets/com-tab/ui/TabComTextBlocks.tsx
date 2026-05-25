import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components';
import { Modal } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithAtom } from '#shared/ui/WithAtom';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmEditorComTextsEditsHistoryAtom } from '$cm+editor/shared/state/atoms';
import {
  CmEditorComTabTextBlockPrevValueButton,
  CmEditorComTabTextBlockPrevValueUpdateModal,
} from '../sub-ui/TextBlockPrevValueHistory';
import { CmEditorComTabTextBlockRedactor } from '../sub-ui/TextBlockRedactor';
import { CmEditorComTabTextBlockWordLetterLowerer } from '../sub-ui/TextBlockWordLetterLowerer';

export const CmEditorComTabTextBlocks = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!ccom) return null;

  const isDisabled = !checkAccess('cm', 'COM_TXT', 'U');

  return (
    <>
      {checkAccess('cm', 'COM', 'D') && (
        <div className="flex gap-3">
          <WithAtom init={false}>
            {openAtom => (
              <>
                <Button
                  onClick={openAtom.do.toggle}
                  icon="TextFont"
                />
                <Modal openAtom={openAtom}>
                  {isOpen => isOpen && <CmEditorComTabTextBlockWordLetterLowerer com={ccom} />}
                </Modal>
              </>
            )}
          </WithAtom>
          {ccom.texts?.some(text => text.includes('|')) && (
            <TheIconButton
              onClick={() => cmEditComClientTsjrpcMethods.removeVerticalBarsFromTexts({ comw: ccom.wid })}
              icon="Scissor01"
              confirm="Удалить столбики в текстах?"
            />
          )}
        </div>
      )}
      {checkAccess('cm', 'COM_TXT', 'C') && (
        <TheIconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() =>
            cmEditComClientTsjrpcMethods.insertTextBlock({
              value: '',
              comw: ccom.wid,
              insertToi: 0,
            })
          }
        />
      )}

      {(ccom.texts?.length ? ccom.texts : ['']).map((text, texti) => {
        return (
          <div
            key={texti}
            className="my-5"
          >
            <div className="flex justify-between">
              <CmEditorComOrderAddTextableBlockAnchorTitles
                texti={texti}
                com={ccom}
              />

              <div className="flex gap-2">
                {checkAccess('cm', 'COM_TXT', 'U') && (
                  <CmEditorComTabTextBlockPrevValueButton
                    historyAtom={cmEditorComTextsEditsHistoryAtom}
                    comw={ccom.wid}
                    texti={texti}
                  />
                )}
                {checkAccess('cm', 'COM_TXT', 'D') && (
                  <TheIconButton
                    icon="Cancel01"
                    confirm={`Удалить${text ? '' : ' новый'} блок?\n\n${text}`}
                    onClick={() =>
                      cmEditComClientTsjrpcMethods.removeTextBlock({
                        comw: ccom.wid,
                        value: text,
                        removei: texti,
                      })
                    }
                  />
                )}
              </div>
            </div>
            <CmEditorComTabTextBlockRedactor
              ccom={ccom}
              text={text}
              texti={texti}
              disabled={isDisabled}
            />
            {checkAccess('cm', 'COM_TXT', 'C') && (
              <TheIconButton
                icon="PlusSignCircle"
                confirm="Вставить новый блок сюда?"
                onClick={() =>
                  cmEditComClientTsjrpcMethods.insertTextBlock({
                    value: '',
                    comw: ccom.wid,
                    insertToi: texti + 1,
                  })
                }
              />
            )}
          </div>
        );
      })}

      <CmEditorComTabTextBlockPrevValueUpdateModal
        historyAtom={cmEditorComTextsEditsHistoryAtom}
        comw={ccom.wid}
        onPaste={(value, texti) => ccom.changeTextBlock(texti, value)}
        texts={ccom.texts}
      />
    </>
  );
};
