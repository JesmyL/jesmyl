import { translateEditorBase } from '#basis/locale';
import { Button } from '#shared/components';
import { TextInput } from '#shared/ui/TextInput';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';
import { includesBemoleChord, replaceBemoleChords } from 'shared/utils/cm/com/replaceBemoleChords';
import { replaceWordOccurrence } from 'shared/utils/cm/com/replaceWordOccurrence';

type Props = {
  title: React.ReactNode;
  list: string[];
  onInput(value: string, texti: number): void;
  corrects: IIncorrects[];
  onBemoleFix?: (texti: number, value: string) => void;
};

export const CmEditorComCreateComTextableListRedactor = ({ title, onInput, list, corrects, onBemoleFix }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      {list.map((text, texti) => (
        <CmEditorComCreateComTextableListRedactorItem
          key={texti}
          text={text}
          texti={texti}
          onInput={onInput}
          corrects={corrects[texti]}
          onBemoleFix={onBemoleFix}
        />
      ))}
    </>
  );
};

type ItemProps = {
  text: string;
  texti: number;
  onInput(value: string, texti: number): void;
  corrects: IIncorrects;
  onBemoleFix?: (texti: number, value: string) => void;
};

const CmEditorComCreateComTextableListRedactorItem = ({ text, texti, onInput, corrects, onBemoleFix }: ItemProps) => {
  const onFixWord = (incorrect: IIncorrect) => {
    if (!incorrect.word || incorrect.correct == null) return;
    const next = replaceWordOccurrence(text, incorrect.word, incorrect.wordOccurrence ?? 0, incorrect.correct);

    onInput(next, texti);
  };
  const isBemoleFixVisible = onBemoleFix != null && includesBemoleChord(text) && (corrects?.errors?.length ?? 0) > 0;

  return (
    <div className="my-2">
      <TextInput
        value={text}
        multiline
        onInput={value => onInput(value, texti)}
      />
      <CmEditorTextCorrectMessages
        corrects={corrects}
        onFixWord={onFixWord}
      />
      {isBemoleFixVisible && (
        <Button
          size="sx"
          onClick={() => onBemoleFix?.(texti, replaceBemoleChords(text))}
        >
          {translateEditorBase(EditorLocaleKey.CmEditorBemoleToDiez)}
        </Button>
      )}
    </div>
  );
};
