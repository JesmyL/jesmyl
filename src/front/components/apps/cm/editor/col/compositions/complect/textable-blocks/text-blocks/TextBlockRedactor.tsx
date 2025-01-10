import IconButton from 'front/complect/the-icon/IconButton';
import { IconCancel01StrokeRounded } from 'front/complect/the-icon/icons/cancel-01';
import { IconTextAlignLeftStrokeRounded } from 'front/complect/the-icon/icons/text-align-left';
import { InputWithLoadingIcon } from 'front/components/apps/cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator-editor.methods';
import { useState } from 'react';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/plus-sign-circle';
import { TextCorrectMessages } from '../../../../../complect/TextBlockIncorrectMessages';
import { EditableCom } from '../../../com/EditableCom';
import CmTextableBlockAnchorTitles from '../CmTextableBlockAnchorTitles';

export default function CmTextBlockRedactor({ texti, text, ccom }: { texti: number; text: string; ccom: EditableCom }) {
  const [value, setValue] = useState(text);
  const corrects = ccom.textBlockIncorrectMessages(value, texti);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <IconButton
          Icon={IconPlusSignCircleStrokeRounded}
          confirm="Вставить новый блок в самое начало?"
          onClick={() => cmComClientInvocatorMethods.insertTextBlock(null, '', ccom.wid, 0)}
        />
      )}
      <div className="flex between">
        <CmTextableBlockAnchorTitles
          texti={texti}
          com={ccom}
        />

        <span className="flex flex-gap">
          <IconButton
            Icon={IconCancel01StrokeRounded}
            onClick={() => cmComClientInvocatorMethods.removeTextBlock(null, ccom.wid, text, texti)}
            confirm={`Удалить${text ? '' : ' новый'} блок?\n\n${text}`}
          />
        </span>
      </div>
      <InputWithLoadingIcon
        multiline
        Icon={IconTextAlignLeftStrokeRounded}
        label=""
        defaultValue={text}
        onChange={value => ccom.changeTextBlock(texti, value)}
        onInput={setValue}
        corrects={corrects}
      />
      <IconButton
        Icon={IconPlusSignCircleStrokeRounded}
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertTextBlock(null, '', ccom.wid, texti + 1)}
      />
      <TextCorrectMessages corrects={corrects} />
    </div>
  );
}
