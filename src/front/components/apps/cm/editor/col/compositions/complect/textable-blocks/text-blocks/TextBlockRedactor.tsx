import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { InputWithLoadingIcon } from 'front/components/apps/cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { TextCorrectMessages } from '../../../../../complect/TextBlockIncorrectMessages';
import { EditableCom } from '../../../com/EditableCom';
import CmTextableBlockAnchorTitles from '../CmTextableBlockAnchorTitles';

export default function CmTextBlockRedactor({ texti, text, ccom }: { texti: number; text: string; ccom: EditableCom }) {
  const [value, setValue] = useState(text);
  const corrects = EditableCom.textBlockIncorrectMessages(value);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <IconButton
          icon="PlusSignCircle"
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
            icon="Cancel01"
            onClick={() => cmComClientInvocatorMethods.removeTextBlock(null, ccom.wid, text, texti)}
            confirm={`Удалить${text ? '' : ' новый'} блок?\n\n${text}`}
          />
        </span>
      </div>
      <InputWithLoadingIcon
        multiline
        icon="TextAlignLeft"
        label=""
        defaultValue={text}
        onChange={value => ccom.changeTextBlock(texti, value)}
        onInput={setValue}
        corrects={corrects}
      />
      <IconButton
        icon="PlusSignCircle"
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertTextBlock(null, '', ccom.wid, texti + 1)}
      />
      <TextCorrectMessages corrects={corrects} />
    </div>
  );
}
