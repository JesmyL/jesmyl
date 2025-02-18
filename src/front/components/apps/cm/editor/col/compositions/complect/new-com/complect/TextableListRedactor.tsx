import KeyboardInput from 'front/08-shared/ui/keyboard/KeyboardInput';
import { TextCorrectMessages } from 'front/components/apps/cm/editor/complect/TextBlockIncorrectMessages';
import { CorrectsBox } from 'front/components/apps/cm/editor/corrects-box/CorrectsBox';

export const CmNewComTextableListRedactor = ({
  title,
  onInput,
  list,
  corrects,
}: {
  title: React.ReactNode;
  list: string[];
  onInput(value: string, texti: number): void;
  corrects: CorrectsBox[];
}) => {
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
