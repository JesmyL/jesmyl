import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { CmTextableBlockAnchorTitles } from '$cm+editor/entities/TextableBlockAnchorTitles';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { InputWithLoadingIcon } from '$cm/base/InputWithLoadingIcon';
import { useState } from 'react';
import { makeRegExp } from 'shared/utils';

export const CmChordsBlockRedactor = ({ text, texti, ccom }: { texti: number; text: string; ccom: EditableCom }) => {
  const [value, setValue] = useState(text);
  const corrects = EditableCom.chordsBlockIncorrectMessage(value);

  return (
    <div className="margin-big-gap-v">
      {!texti && (
        <TheIconButton
          icon="PlusSignCircle"
          confirm="Вставить новый блок в самое начало?"
          onClick={() =>
            cmComClientInvocatorMethods.insertChordBlock({
              value: '',
              comw: ccom.wid,
              insertToi: 0,
            })
          }
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
          <TheIconButton
            icon="Cancel01"
            confirm={`Удалить блок?\n\n${text}`}
            onClick={() =>
              cmComClientInvocatorMethods.removeChordBlock({
                comw: ccom.wid,
                value: text,
                removei: texti,
              })
            }
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

      <TheIconButton
        icon="PlusSignCircle"
        confirm="Вставить новый блок сюда?"
        onClick={() =>
          cmComClientInvocatorMethods.insertChordBlock({
            value: '',
            comw: ccom.wid,
            insertToi: texti + 1,
          })
        }
      />
    </div>
  );
};
