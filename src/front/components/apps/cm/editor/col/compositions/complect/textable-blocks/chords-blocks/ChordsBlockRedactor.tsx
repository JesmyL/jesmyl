import IconButton from 'front/complect/the-icon/IconButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { InputWithLoadingIcon } from 'front/components/apps/cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { makeRegExp } from 'shared/utils';
import { TextCorrectMessages } from '../../../../../complect/TextBlockIncorrectMessages';
import { EditableCom } from '../../../com/EditableCom';
import CmTextableBlockAnchorTitles from '../CmTextableBlockAnchorTitles';

export default function CmChordsBlockRedactor({
  text,
  texti,
  ccom,
}: {
  texti: number;
  text: string;
  ccom: EditableCom;
}) {
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
        corrects={corrects}
      />
      <TextCorrectMessages corrects={corrects} />

      <IconButton
        icon="PlusSignCircle"
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertChordBlock(null, '', ccom.wid, texti + 1)}
      />
    </div>
  );
}
