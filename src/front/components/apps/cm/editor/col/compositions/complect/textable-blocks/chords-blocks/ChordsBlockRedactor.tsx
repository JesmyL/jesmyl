import IconButton from 'front/complect/the-icon/IconButton';
import { IconCancel01StrokeRounded } from 'front/complect/the-icon/icons/cancel-01';
import { IconGridStrokeRounded } from 'front/complect/the-icon/icons/grid';
import { IconPlaylist03StrokeRounded } from 'front/complect/the-icon/icons/playlist-03';
import { InputWithLoadingIcon } from 'front/components/apps/cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { makeRegExp } from 'shared/utils';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/plus-sign-circle';
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
          Icon={IconPlusSignCircleStrokeRounded}
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
            <IconButton
              Icon={IconGridStrokeRounded}
              onClick={() => ccom.replaceBemoles(texti)}
            />
          )}
          <IconButton
            Icon={IconCancel01StrokeRounded}
            onClick={() => cmComClientInvocatorMethods.removeChordBlock(null, ccom.wid, text, texti)}
            confirm={`Удалить блок?\n\n${text}`}
          />
        </span>
      </div>
      <InputWithLoadingIcon
        multiline
        Icon={IconPlaylist03StrokeRounded}
        label=""
        defaultValue={text}
        onChange={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        corrects={corrects}
      />
      <TextCorrectMessages corrects={corrects} />

      <IconButton
        Icon={IconPlusSignCircleStrokeRounded}
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertChordBlock(null, '', ccom.wid, texti + 1)}
      />
    </div>
  );
}
