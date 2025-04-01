import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { InputWithLoadingIcon } from '$cm/base/InputWithLoadingIcon';
import { useState } from 'react';
import { CmTextableBlockAnchorTitles } from './TextableBlockAnchorTitles';

export const CmTextBlockRedactor = ({ texti, text, ccom }: { texti: number; text: string; ccom: EditableCom }) => {
  const [value, setValue] = useState(text);
  const corrects = EditableCom.textBlockIncorrectMessages(value);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <TheIconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() =>
            cmComClientInvocatorMethods.insertTextBlock({
              value: '',
              comw: ccom.wid,
              insertToi: 0,
            })
          }
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
            onClick={() =>
              cmComClientInvocatorMethods.removeTextBlock({
                comw: ccom.wid,
                value: text,
                removei: texti,
              })
            }
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
        onClick={() =>
          cmComClientInvocatorMethods.insertTextBlock({
            value: '',
            comw: ccom.wid,
            insertToi: texti + 1,
          })
        }
      />
      <TextCorrectMessages corrects={corrects} />
    </div>
  );
};
