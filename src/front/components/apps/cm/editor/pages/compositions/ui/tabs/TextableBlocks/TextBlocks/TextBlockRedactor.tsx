import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { InputWithLoadingIcon } from '$cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from '$cm/editor/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm/editor/lib/EditableCom';
import { TextCorrectMessages } from '$cm/editor/ui/TextBlockIncorrectMessages';
import { useState } from 'react';
import { CmTextableBlockAnchorTitles } from '../../ui/TextableBlockAnchorTitles';

export const CmTextBlockRedactor = ({ texti, text, ccom }: { texti: number; text: string; ccom: EditableCom }) => {
  const [value, setValue] = useState(text);
  const corrects = EditableCom.textBlockIncorrectMessages(value);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <TheIconButton
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
          <TheIconButton
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
        isError={!!corrects.errors?.length}
      />
      <TheIconButton
        icon="PlusSignCircle"
        confirm="Вставить новый блок сюда?"
        onClick={() => cmComClientInvocatorMethods.insertTextBlock(null, '', ccom.wid, texti + 1)}
      />
      <TextCorrectMessages corrects={corrects} />
    </div>
  );
};
