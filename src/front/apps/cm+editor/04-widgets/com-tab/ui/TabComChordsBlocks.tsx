import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorChordBlockRedactor } from '$cm+editor/entities/chord';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { makeRegExp } from 'regexpert';

export const CmEditorComTabChordsBlocks = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const textList = ccom.transposedBlocks();
  const isDisabled = !checkAccess('cm', 'COM_CH', 'U');

  return (
    <>
      {checkAccess('cm', 'COM_CH', 'C') && (
        <TheIconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() =>
            cmEditComClientTsjrpcMethods.insertChordBlock({
              value: '',
              comw: ccom.wid,
              insertToi: 0,
            })
          }
        />
      )}
      {(textList?.length ? textList : ['']).map((text, texti) => {
        return (
          <div
            key={texti}
            className="my-3"
          >
            <div className="flex between">
              <CmEditorComOrderAddTextableBlockAnchorTitles
                chordi={texti}
                com={ccom}
              />

              <span className="flex gap-2">
                {makeRegExp('/[A-H]b/').exec(text) && (
                  <LazyIcon
                    className="pointer"
                    icon="Grid"
                    onClick={() => ccom.replaceBemoles(texti)}
                  />
                )}
                {checkAccess('cm', 'COM_CH', 'D') && (
                  <TheIconButton
                    icon="Cancel01"
                    confirm={`Удалить блок?\n\n${text}`}
                    onClick={() =>
                      cmEditComClientTsjrpcMethods.removeChordBlock({
                        comw: ccom.wid,
                        value: text,
                        removei: texti,
                      })
                    }
                  />
                )}
              </span>
            </div>
            <CmEditorChordBlockRedactor
              text={text}
              texti={texti}
              ccom={ccom}
              isDisabled={isDisabled}
            />
            {checkAccess('cm', 'COM_CH', 'C') && (
              <TheIconButton
                icon="PlusSignCircle"
                confirm="Вставить новый блок сюда?"
                onClick={() =>
                  cmEditComClientTsjrpcMethods.insertChordBlock({
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
