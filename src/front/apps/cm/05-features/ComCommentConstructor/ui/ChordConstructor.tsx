import { Button } from '#shared/components';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { cmComCommentTextDetectorCalculateRate } from 'shared/utils/cm/com/cmComCommentTextRulesDetector';
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

                  const wordKeyPrefix = `s${ordw}l${linei}w${wordi}` as const;
                  const keyPrefix = `${wordKeyPrefix}c${chordi}` as const;

                  delete dict.dict[`${keyPrefix}^`];
                  delete dict.dict[`${keyPrefix}<`];
                  delete dict.dict[`${keyPrefix}>`];

                  dict.wordChordiMaxDict[wordKeyPrefix] ??= 1;
                  dict.wordChordiMaxDict[wordKeyPrefix]--;
                });
              }}
            />
          )}
        </div>

        <CmComCommentConstructorAccentKindRedactor
          blockKey={`s${ordw}l${linei}w${wordi}c${chordi}^`}
          blockPropsHolder={propsDict}
          getDefaultPropsDict={() => ({
            sel: ordw,
            linei,
            wordi,
            chordi,
            text: '',
            place: '^',
            kind: 0,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
          })}
        />

        <div className="flex gap-2">
          <CmComCommentConstructorTextRedactor
            blockKey={`s${ordw}l${linei}w${wordi}c${chordi}<`}
            blockPropsHolder={propsDict}
            label="До"
            getDefaultPropsDict={() => ({
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '<',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmComCommentConstructorTextRedactor
            blockKey={`s${ordw}l${linei}w${wordi}c${chordi}^`}
            blockPropsHolder={propsDict}
            label="Вместо"
            getDefaultPropsDict={() => ({
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '^',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmComCommentConstructorTextRedactor
            blockKey={`s${ordw}l${linei}w${wordi}c${chordi}>`}
            blockPropsHolder={propsDict}
            label="После"
            getDefaultPropsDict={() => ({
              sel: ordw,
              linei,
              wordi,
              chordi,
              text: '',
              place: '>',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />
        </div>
      </div>
    </>
  );
};
