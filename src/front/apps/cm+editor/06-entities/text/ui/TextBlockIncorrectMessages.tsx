import { Button } from '#shared/components';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';

const classNamePostfix = '-correct-block';
const baseClassName = 'my-[15px] rounded-[10px] p-2.5 whitespace-pre-line';
const errorClassName = `${baseClassName} bg-[rgba(255,0,0,0.3)] text-[red]`;
const warningClassName = `${baseClassName} bg-[rgba(255,165,0,0.3)] text-[orange]`;
const unknownClassName = `${baseClassName} bg-[rgba(0,255,255,0.3)] text-[cadetblue]`;

type Props = {
  corrects: IIncorrects;
  onFixWord?: (incorrect: IIncorrect) => void;
};

export const CmEditorTextCorrectMessages = ({ corrects, onFixWord }: Props) => {
  const makeNode = (incorrect: IIncorrect, key: string, className: string) => (
    <div
      className={className}
      key={key}
    >
      {incorrect.message}
      {onFixWord && incorrect.correct && incorrect.correct !== incorrect.word && (
        <Button
          size="sx"
          className="ml-2"
          onClick={() => onFixWord(incorrect)}
        >
          {incorrect.correct}
        </Button>
      )}
    </div>
  );

  return (
    <>
      {corrects.errors?.map((incorrect, correcti) =>
        makeNode(incorrect, `error${correcti}`, `error${classNamePostfix} ${errorClassName}`),
      )}
      {corrects.warnings?.map((incorrect, correcti) =>
        makeNode(incorrect, `warning${correcti}`, `warning${classNamePostfix} ${warningClassName}`),
      )}
      {corrects.unknowns?.map((incorrect, correcti) =>
        makeNode(incorrect, `unknown${correcti}`, `unknown${classNamePostfix} ${unknownClassName}`),
      )}
    </>
  );
};
