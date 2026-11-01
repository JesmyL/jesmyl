import { IIncorrects } from 'shared/model/cm/Incorrects';

const classNamePostfix = '-correct-block';
const baseClassName = 'my-[15px] rounded-[10px] p-2.5 whitespace-pre-line';
const errorClassName = `${baseClassName} bg-[rgba(255,0,0,0.3)] text-[red]`;
const warningClassName = `${baseClassName} bg-[rgba(255,165,0,0.3)] text-[orange]`;
const unknownClassName = `${baseClassName} bg-[rgba(0,255,255,0.3)] text-[cadetblue]`;

export const CmEditorTextCorrectMessages = ({ corrects }: { corrects: IIncorrects }) => {
  return (
    <>
      {corrects.errors?.map(({ message }, correcti) => {
        return (
          <div
            className={`error${classNamePostfix} ${errorClassName}`}
            key={correcti}
          >
            {message}
          </div>
        );
      })}
      {corrects.warnings?.map(({ message }, correcti) => {
        return (
          <div
            className={`warning${classNamePostfix} ${warningClassName}`}
            key={correcti}
          >
            {message}
          </div>
        );
      })}
      {corrects.unknowns?.map(({ message }, correcti) => {
        return (
          <div
            className={`unknown${classNamePostfix} ${unknownClassName}`}
            key={correcti}
          >
            {message}
          </div>
        );
      })}
    </>
  );
};
