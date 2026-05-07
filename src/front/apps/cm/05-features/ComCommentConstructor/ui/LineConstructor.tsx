import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { CmComCommentConstructorRuleType } from 'shared/model/cm/com-comment';
import { cmComCommentTextDetectorCalculateRate } from 'shared/utils/cm';
import { useCmComCommentConstructorCurrentInnerKindContext } from '../state/CurrentInnerKind';
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
  const selectorPrefix = useCmComCommentConstructorCurrentInnerKindContext() ?? (`s${ordw}` as const);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Строка {solidLinei + 1}</div>
        <CmComCommentConstructorTextWithAccentRedactor
          blockKey={`${selectorPrefix}l${linei}`}
          label="Коммент для строки"
          blockPropsHolder={propsDict}
          type={CmComCommentConstructorRuleType.Line}
          getDefaultPropsDict={() => ({
            pre: selectorPrefix,
            sel: ordw,
            type: 0,
            linei,
            rate: cmComCommentTextDetectorCalculateRate(linei),
            text: '',
          })}
        />
      </div>
    </>
  );
};
