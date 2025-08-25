import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { cmConstantsConfigAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { CmTextableBlockAnchorTitles } from './TextableBlockAnchorTitles';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
}

export const CmTextBlockRedactor = ({ texti, text, ccom }: Props) => {
  const [value, setValue] = useState(text);
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(cmConstantsConfigAtom);
  const lineLengthCorrects = CmComUtils.textLinesLengthIncorrects(value, maxAvailableComLineLength);
  const corrects = lineLengthCorrects ?? CmComUtils.takeTextBlockIncorrects(value, eeStore);

  return (
    <div className="my-5">
      {!texti && (
        <TheIconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() =>
            cmEditComClientTsjrpcMethods.insertTextBlock({
              value: '',
              comw: ccom.wid,
              insertToi: 0,
            })
          }
        />
      )}
      <div className="flex justify-between">
        <CmTextableBlockAnchorTitles
          texti={texti}
          com={ccom}
        />

        <span className="flex gap-2">
          <TheIconButton
            icon="Cancel01"
            onClick={() =>
              cmEditComClientTsjrpcMethods.removeTextBlock({
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
          cmEditComClientTsjrpcMethods.insertTextBlock({
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
