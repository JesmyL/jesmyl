import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
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

              {checkAccess('cm', 'COM_TXT', 'D') && (
                <TheIconButton
                  icon="Cancel01"
                  onClick={() =>
                    cmEditComClientTsjrpcMethods.removeTextBlock({
                      comw: ccom.wid,
                      value: text,
                      removei: texti,
                    })
                  }
                  confirm={`Удалить${text ? '' : ' новый'} блок?\n\n${text}`}
                />
              )}
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
    </>
  );
};
