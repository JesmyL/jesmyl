import { TextInput } from '#shared/ui/TextInput';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { IIncorrects } from 'shared/model/cm/Incorrects';

type Props = {
  title: React.ReactNode;
  list: string[];
  onInput(value: string, texti: number): void;
  corrects: IIncorrects[];
};

export const CmEditorComCreateComTextableListRedactor = ({ title, onInput, list, corrects }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      {list.map((text, texti) => {
        return (
          <div
            className="my-2"
            key={texti}
          >
            <TextInput
              value={text}
              multiline
              onInput={value => onInput(value, texti)}
            />
            <CmEditorTextCorrectMessages corrects={corrects[texti]} />
          </div>
        );
      })}
    </>
  );
};
