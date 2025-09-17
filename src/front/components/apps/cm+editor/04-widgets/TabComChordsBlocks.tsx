import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { CmChordsBlockRedactor } from '$cm+editor/entities/ChordsBlockRedactor';
import { CmTextableBlockAnchorTitles } from '$cm+editor/entities/TextableBlockAnchorTitles';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { makeRegExp } from 'regexpert';

export const CmEditorTabComChordsBlocks = () => {
  const ccom = useEditableCcom();
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!ccom) return null;

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
          <div className="my-3">
            <div className="flex between">
              <CmTextableBlockAnchorTitles
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
            <CmChordsBlockRedactor
              key={texti}
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
