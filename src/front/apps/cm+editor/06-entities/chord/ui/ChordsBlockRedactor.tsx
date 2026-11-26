import { translateEditorBase } from '#basis/locale';
import { Button } from '#shared/components';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { pushComChordBlockToBuffer } from '$cm+editor/shared/lib/comBlockEditsBuffer';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';
import { includesBemoleChord, replaceBemoleChords } from 'shared/utils/cm/com/replaceBemoleChords';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  isDisabled: boolean;
  notEqLenInLine: string;
}

export const CmEditorChordBlockRedactor = ({ text, texti, ccom, isDisabled, notEqLenInLine }: Props) => {
  const [value, setValue] = useState(text);
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);
  const corrects = chordsBlockIncorrectMessage(value, isHardChords);
  const canReplaceBemoles = (corrects.errors?.length ?? 0) > 0 && includesBemoleChord(value);

  const replaceBemoles = () => {
    const next = replaceBemoleChords(value);

    pushComChordBlockToBuffer(ccom.wid, texti, value);
    setValue(next);
    void ccom.changeChordsBlock(texti, next);
  };

  return (
    <>
      <InputWithLoadingIcon
        multiline
        icon="Playlist03"
        inputClassName={isHardChords && !ccom.top.c1 ? 'bg-x2!' : 'bg-x1!'}
        value={value}
        onChanged={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={isDisabled}
      />
      {canReplaceBemoles && (
        <Button
          size="sx"
          disabled={isDisabled}
          onClick={replaceBemoles}
        >
          {translateEditorBase(EditorLocaleKey.CmEditorBemoleToDiez)}
        </Button>
      )}
      {notEqLenInLine && (
        <CmEditorTextCorrectMessages
          corrects={{
            errors: [{ message: translateEditorBase(EditorLocaleKey.CmChordLengthMismatch, { n: notEqLenInLine }) }],
          }}
        />
      )}
      <CmEditorTextCorrectMessages corrects={corrects} />
    </>
  );
};
