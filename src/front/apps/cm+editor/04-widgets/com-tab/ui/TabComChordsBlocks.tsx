import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorChordBlockRedactor } from '$cm+editor/entities/chord';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmEditorComChordEditsHistoryAtom } from '$cm+editor/shared/state/atoms';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { Bool } from 'shared/enums';
import { arrayByLength } from 'shared/utils/object.utils';
import {
  CmEditorComTabTextBlockPrevValueButton,
  CmEditorComTabTextBlockPrevValueUpdateModal,
} from '../sub-ui/TextBlockPrevValueHistory';

export const CmEditorComTabChordsBlocks = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const isDisabled = !checkAccess('cm', 'COM_CH', 'U');
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);
  const textList = isHardChords ? ccom.transposedHardChords() : ccom.transposedSimpleChords();

  const notEqLenInLineList = ccom.top.c1
    ? ccom.top.c1.length !== ccom.top.c.length
      ? arrayByLength(30, () => true)
      : ccom.top.c1.map((text, texti) => {
          const text1Lines = ccom.top.c[texti]?.split('\n');
          if (!text1Lines) return true;

          const notEqi = text
            .split('\n')
            .findIndex((line, linei) => line.split(' ').length !== text1Lines[linei]?.split(' ').length);

          if (notEqi < 0) return false;

          return notEqi;
        })
    : [];

  return (
    <>
      <div
        key={isHardChords}
        className="flex justify-between mt-2"
      >
        {checkAccess('cm', 'COM_CH', 'C') && (
          <TheIconButton
            icon="PlusSignCircle"
            confirm={translateBase(it => it.cm.com.insNwBlockAtX, { x: 'b' })}
            onClick={() =>
              cmEditComClientTsjrpcMethods.insertChordBlock({
                value: '',
                comw: ccom.wid,
                insertToi: 0,
                isHard: isHardChords,
              })
            }
          />
        )}
        <Dropdown
          id={isHardChords}
          items={[
            { id: Bool.False, title: 'Простые аккорды' },
            { id: Bool.True, title: 'Сложные аккорды' },
          ]}
          onSelectId={cmComIsChordHardLevelAtom.set}
        />
      </div>
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
                {checkAccess('cm', 'COM_CH', 'U') && (
                  <CmEditorComTabTextBlockPrevValueButton
                    historyAtom={cmEditorComChordEditsHistoryAtom}
                    comw={ccom.wid}
                    texti={texti}
                  />
                )}
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
                    confirm={translateBase(it => it.delX, { x: `\n\n${text}` })}
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
              notEqLenInLine={notEqLenInLineList[texti]}
            />
            {checkAccess('cm', 'COM_CH', 'C') && (
              <TheIconButton
                icon="PlusSignCircle"
                confirm={translateBase(it => it.cm.com.insNwBlockAtX, { x: 'h' })}
                onClick={() =>
                  cmEditComClientTsjrpcMethods.insertChordBlock({
                    value: '',
                    comw: ccom.wid,
                    insertToi: texti + 1,
                    isHard: isHardChords,
                  })
                }
              />
            )}
          </div>
        );
      })}

      <CmEditorComTabTextBlockPrevValueUpdateModal
        historyAtom={cmEditorComChordEditsHistoryAtom}
        comw={ccom.wid}
        onPaste={(value, texti) => ccom.changeChordsBlock(texti, value)}
        texts={ccom.chords}
      />
    </>
  );
};
