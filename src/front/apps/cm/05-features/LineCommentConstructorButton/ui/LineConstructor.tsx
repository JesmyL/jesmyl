import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { useAtomValue } from 'atomaric';
import { cmLineCommentConstructorButtonRulePropsDictAtom } from '../state/atoms';
import { CmLineCommentConstructorButtonTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmLineCommentConstructorButtonLineConstructor = ({ linei }: { linei: number }) => {
  const propsDict = useAtomValue(cmLineCommentConstructorButtonRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Строка {linei + 1}</div>
        <CmLineCommentConstructorButtonTextWithAccentRedactor
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
