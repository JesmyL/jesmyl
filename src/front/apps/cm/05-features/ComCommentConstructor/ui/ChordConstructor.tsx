import { Button } from '#shared/components';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { CmComCommentConstructorRuleType } from 'shared/model/cm/com-comment';
import { cmComCommentTextDetectorCalculateRate } from 'shared/utils/cm/com/cmComCommentTextRulesDetector';
import { useCmComCommentConstructorCurrentInnerKindContext } from '../state/CurrentInnerKind';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorTextRedactor } from './TextRedactor';

export const CmComCommentConstructorChordConstructor = ({
  ordw,
  linei,
  wordi,
  chordi,
  isLast,
}: {
  ordw: CmComOrderWid;
  linei: number;
  wordi: number;
  chordi: number;
  isLast: boolean;
}) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);
  const selectorPrefix = useCmComCommentConstructorCurrentInnerKindContext() ?? (`s${ordw}` as const);

  const wordKeyPrefix = `${selectorPrefix}l${linei}w${wordi}` as const;
  const chordKeyPrefix = `${wordKeyPrefix}c${chordi}` as const;

  return (
    <>
      <div
        key={chordi}
        className="rounded bg-x2 my-10 p-3"
      >
        <div className="flex w-full justify-between">
          <span>Аккорд {chordi + 1}</span>
          {isLast && (
            <Button
              icon="Delete02"
              className="text-xKO"
              onClick={() => {
                cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
                  if (dict.dict == null) return;

                  delete dict.dict[`${chordKeyPrefix}^`];
                  delete dict.dict[`${chordKeyPrefix}<`];
                  delete dict.dict[`${chordKeyPrefix}>`];

                  dict.wordChordiMaxDict[wordKeyPrefix] ??= 1;
                  dict.wordChordiMaxDict[wordKeyPrefix]--;
                });
              }}
            />
          )}
        </div>

        <CmComCommentConstructorAccentKindRedactor
          blockKey={`${chordKeyPrefix}^`}
          blockPropsHolder={propsDict}
          getDefaultPropsDict={() => ({
            pre: selectorPrefix,
            sel: ordw,
            linei,
            wordi,
            chordi,
            text: '',
            place: '^',
            type: 0,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
          })}
        />

        <div className="flex gap-2">
          <CmComCommentConstructorTextRedactor
            blockKey={`${chordKeyPrefix}<`}
            type={CmComCommentConstructorRuleType.Chord}
            blockPropsHolder={propsDict}
            label="До"
            getDefaultPropsDict={() => ({
              pre: selectorPrefix,
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '<',
              type: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmComCommentConstructorTextRedactor
            blockKey={`${chordKeyPrefix}^`}
            type={CmComCommentConstructorRuleType.Chord}
            blockPropsHolder={propsDict}
            label="Вместо"
            getDefaultPropsDict={() => ({
              pre: selectorPrefix,
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '^',
              type: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmComCommentConstructorTextRedactor
            blockKey={`${selectorPrefix}l${linei}w${wordi}c${chordi}>`}
            type={CmComCommentConstructorRuleType.Chord}
            blockPropsHolder={propsDict}
            label="После"
            getDefaultPropsDict={() => ({
              pre: selectorPrefix,
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '>',
              type: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />
        </div>
      </div>
    </>
  );
};
