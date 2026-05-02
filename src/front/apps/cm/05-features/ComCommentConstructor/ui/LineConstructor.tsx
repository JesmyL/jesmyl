import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { CmComCommentConstructorRuleKind } from 'shared/model/cm/com-comment';
import { cmComCommentTextDetectorCalculateRate } from 'shared/utils/cm';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmComCommentConstructorLineConstructor = ({
  linei,
  solidLinei,
  ordw,
}: {
  ordw: CmComOrderWid;
  linei: number;
  solidLinei: number;
}) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Строка {solidLinei + 1}</div>
        <CmComCommentConstructorTextWithAccentRedactor
          blockKey={`s${ordw}l${linei}`}
          label="Коммент для строки"
          blockPropsHolder={propsDict}
          kind={CmComCommentConstructorRuleKind.Line}
          getDefaultPropsDict={() => ({
            sel: ordw,
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
