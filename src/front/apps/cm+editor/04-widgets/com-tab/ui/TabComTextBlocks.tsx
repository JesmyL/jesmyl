import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmEditorComTextsEditsHistoryAtom } from '$cm+editor/shared/state/atoms';
import {
  CmEditorComTabTextBlockPrevValueButton,
  CmEditorComTabTextBlockPrevValueUpdateModal,
} from '../sub-ui/TextBlockPrevValueHistory';
import { CmEditorComTabTextBlockRedactor } from '../sub-ui/TextBlockRedactor';

export const CmEditorComTabTextBlocks = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!ccom) return null;

  const isDisabled = !checkAccess('cm', 'COM_TXT', 'U');

  return (
    <>
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
