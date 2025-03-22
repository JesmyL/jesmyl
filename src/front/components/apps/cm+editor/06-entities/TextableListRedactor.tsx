import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { ICorrects } from '$cm+editor/basis/model/Corrects';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';

type Props = {
  title: React.ReactNode;
  list: string[];
  onInput(value: string, texti: number): void;
  corrects: ICorrects[];
};

export const CmNewComTextableListRedactor = ({ title, onInput, list, corrects }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      {list.map((text, texti) => {
        return (
          <div
            className="margin-gap-v"
            key={texti}
          >
            <KeyboardInput
              value={text}
              multiline
              withoutCloseButton
              onInput={value => onInput(value, texti)}
            />
            <TextCorrectMessages corrects={corrects[texti]} />
          </div>
        );
      })}
    </>
  );
};
