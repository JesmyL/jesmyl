import { TextInput } from '#shared/ui/TextInput';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { IIncorrects } from 'shared/model/cm/Incorrects';

type Props = {
  title: React.ReactNode;
  list: string[];
  onInput(value: string, texti: number): void;
  corrects: IIncorrects[];
};

export const CmNewComTextableListRedactor = ({ title, onInput, list, corrects }: Props) => {
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
            <TextCorrectMessages corrects={corrects[texti]} />
          </div>
        );
      })}
    </>
  );
};
