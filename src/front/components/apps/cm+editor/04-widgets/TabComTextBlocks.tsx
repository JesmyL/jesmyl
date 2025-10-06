import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { CmTextableBlockAnchorTitles } from '$cm+editor/entities/TextableBlockAnchorTitles';
import { CmTextBlockRedactor } from '$cm+editor/entities/TextBlockRedactor';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';

export const CmEditorTabTextBlocks = () => {
  const ccom = useEditableCcom();
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
              <CmTextableBlockAnchorTitles
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
            <CmTextBlockRedactor
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
