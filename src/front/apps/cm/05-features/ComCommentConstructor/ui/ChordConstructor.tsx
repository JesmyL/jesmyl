import { Button } from '#shared/components';
import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { cmLineCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorTextRedactor } from './TextRedactor';

export const CmComCommentConstructorChordConstructor = ({
  linei,
  wordi,
  chordi,
  isLast,
}: {
  linei: number;
  wordi: number;
  chordi: number;
  isLast: boolean;
}) => {
  const propsDict = useAtomValue(cmLineCommentConstructorRulePropsDictAtom);

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
                cmLineCommentConstructorRulePropsDictAtom.do.update(dict => {
                  if (dict.dict == null) return;

                  const wordKeyPrefix = `l${linei}w${wordi}` as const;
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
          blockKey={`l${linei}w${wordi}c${chordi}^`}
          blockPropsHolder={propsDict}
          getDefaultPropsDict={() => ({
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
            blockKey={`l${linei}w${wordi}c${chordi}<`}
            blockPropsHolder={propsDict}
            label="До"
            getDefaultPropsDict={() => ({
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
            blockKey={`l${linei}w${wordi}c${chordi}^`}
            blockPropsHolder={propsDict}
            label="Вместо"
            getDefaultPropsDict={() => ({
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
            blockKey={`l${linei}w${wordi}c${chordi}>`}
            blockPropsHolder={propsDict}
            label="После"
            getDefaultPropsDict={() => ({
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
