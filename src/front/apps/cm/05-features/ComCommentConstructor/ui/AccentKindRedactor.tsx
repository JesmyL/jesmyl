import { Button, ButtonGroup } from '#shared/components';
import { cmComCommentAccentsColorClassNameList } from '$cm/entities/com-comment';
import { CmComCommentConstructorPropKey, CmComCommentConstructorRulePropsDict } from '$cm/shared/model/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
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

  const onKindChange = (kind: 1 | 2) =>
    updateDebounce(() => {
      cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
        dict.dict ??= {};
        const blockDict = (dict.dict[blockKey] ??= getDefaultPropsDict());
        if (blockDict == null) return;
        blockDict.kind = blockProps?.kind === kind ? 0 : kind;
      });
    });

  return (
    <div className="mt-5">
      <ButtonGroup.Root>
        <Button
          className={blockProps?.kind === 2 ? cmComCommentAccentsColorClassNameList[blockProps.kind] : undefined}
          onClick={() => onKindChange(2)}
        >
          усиленный акцент
        </Button>
        <Button
          className={blockProps?.kind === 1 ? cmComCommentAccentsColorClassNameList[blockProps.kind] : undefined}
          onClick={() => onKindChange(1)}
        >
          акцент
        </Button>
      </ButtonGroup.Root>
    </div>
  );
};
