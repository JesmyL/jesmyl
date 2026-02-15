import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmComCommentConstructorLineConstructor = ({ linei }: { linei: number }) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Строка {linei + 1}</div>
        <CmComCommentConstructorTextWithAccentRedactor
          blockKey={`l${linei}`}
          label="Коммент для строки"
          blockPropsHolder={propsDict}
          getDefaultPropsDict={() => ({
            kind: 0,
            linei,
            rate: cmComCommentTextDetectorCalculateRate(linei),
            text: '',
          })}
        />
      </div>
    </>
  );
};
