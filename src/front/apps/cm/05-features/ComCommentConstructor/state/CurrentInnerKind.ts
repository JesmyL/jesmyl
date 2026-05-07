import { contextCreator } from '#shared/lib/contextCreator';
import { CmComCommentConstructorPropsDictSelectorRulePropsKey } from 'shared/model/cm/com-comment';

export const [CmComCommentConstructorCurrentInnerKindContext, useCmComCommentConstructorCurrentInnerKindContext] =
  contextCreator<CmComCommentConstructorPropsDictSelectorRulePropsKey | nil>(null);
