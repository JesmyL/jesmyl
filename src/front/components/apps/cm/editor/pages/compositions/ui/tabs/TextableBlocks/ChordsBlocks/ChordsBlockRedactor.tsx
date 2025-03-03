import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { InputWithLoadingIcon } from '@cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { EditableCom } from '@cm/editor/lib/EditableCom';
import { TextCorrectMessages } from '@cm/editor/ui/TextBlockIncorrectMessages';
import { useState } from 'react';
import { makeRegExp } from 'shared/utils';
import { CmTextableBlockAnchorTitles } from '../../ui/TextableBlockAnchorTitles';

export const CmChordsBlockRedactor = ({ text, texti, ccom }: { texti: number; text: string; ccom: EditableCom }) => {
  const [value, setValue] = useState(text);
  const corrects = EditableCom.chordsBlockIncorrectMessage(value);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <IconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() => cmComClientInvocatorMethods.insertChordBlock(null, '', ccom.wid, 0)}
        />
      )}
      <div className="flex between">
        <CmTextableBlockAnchorTitles
          chordi={texti}
          com={ccom}
        />

        <span className="flex flex-gap">
          {makeRegExp('/[A-H]b/').exec(text) && (
            <LazyIcon
              className="pointer"
              icon="Grid"
              onClick={() => ccom.replaceBemoles(texti)}
            />
          )}
          <IconButton
            icon="Cancel01"
            confirm={`Удалить блок?\n\n${text}`}
            onClick={() => cmComClientInvocatorMethods.removeChordBlock(null, ccom.wid, text, texti)}
          />
        </span>
      </div>
      <InputWithLoadingIcon
        multiline
        icon="Playlist03"
        label=""
        defaultValue={text}
        onChange={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
      />
      <TextCorrectMessages corrects={corrects} />

      <IconButton
        icon="PlusSignCircle"
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertChordBlock(null, '', ccom.wid, texti + 1)}
      />
    </div>
  );
};
