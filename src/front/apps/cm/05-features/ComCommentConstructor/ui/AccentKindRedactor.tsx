import { Button, ButtonGroup } from '#shared/components';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { CmComCommentConstructorPropKey, CmComCommentConstructorRulePropsDict } from 'shared/model/cm/com-comment';
import { cmComCommentAccentsColorClassNameList } from 'shared/utils/cm';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';

export const CmComCommentConstructorAccentKindRedactor = <Key extends CmComCommentConstructorPropKey>({
  blockPropsHolder,
  blockKey,
  getDefaultPropsDict,
}: {
  blockKey: Key;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => CmComCommentConstructorRulePropsDict[Key];
}) => {
  const blockProps = blockPropsHolder.dict?.[blockKey];
  const updateDebounce = useDebounceCallback();

  const onKindChange = (type: 1 | 2) =>
    updateDebounce(() => {
      cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
        dict.dict ??= {};
        const blockDict = (dict.dict[blockKey] ??= getDefaultPropsDict());
        if (blockDict == null) return;
        blockDict.type = blockProps?.type === type ? 0 : type;
      });
    });

  return (
    <div className="mt-5">
      <ButtonGroup.Root>
        {(
          [
            { type: 1, color: 'bg-x7! text-x1' },
            { type: 2, color: 'bg-xKO! text-x1' },
          ] as const
        ).map(({ color, type }) => (
          <Button
            key={type}
            className={blockProps?.type === type ? color : cmComCommentAccentsColorClassNameList[type]}
            onClick={() => onKindChange(type)}
          >
            акцент
          </Button>
        ))}
      </ButtonGroup.Root>
    </div>
  );
};
