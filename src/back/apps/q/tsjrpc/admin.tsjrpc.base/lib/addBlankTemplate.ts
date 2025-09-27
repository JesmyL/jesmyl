import { questionerBlanksFileStore } from 'back/apps/q/file-stores';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import {
  QuestionerCheckTemplate,
  QuestionerCommentTemplate,
  QuestionerRadioTemplate,
  QuestionerSorterTemplate,
  QuestionerTemplate,
  QuestionerTemplateId,
  QuestionerTextIncludeTemplate,
  QuestionerType,
} from 'shared/model/q';
import { smylib } from 'shared/utils';
import { questionerAdminServerTsjrpcBase } from '..';

export const questionerTSJRPCAddBlankTemplate: typeof questionerAdminServerTsjrpcBase.addBlankTemplate = async (
  { blankw, type },
  { auth },
) => {
  if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'R')) throw '';

  const blanks = questionerBlanksFileStore.getValue();
  if (blanks[blankw] == null) throw 'Not Found';

  let blankTmp: QuestionerTemplate;

  const buildTemplate = <Tmp extends QuestionerTemplate, _Type extends Tmp['type']>(tmp: Tmp) => tmp;

  switch (type) {
    case QuestionerType.Check:
      blankTmp = buildTemplate<QuestionerCheckTemplate, QuestionerType.Check>({ type, variants: {}, req: 1, rSort: 1 });
      break;
    case QuestionerType.Radio:
      blankTmp = buildTemplate<QuestionerRadioTemplate, QuestionerType.Radio>({ type, variants: {}, req: 1, rSort: 1 });
      break;
    case QuestionerType.Comment:
      blankTmp = buildTemplate<QuestionerCommentTemplate, QuestionerType.Comment>({ type, req: 1 });
      break;
    case QuestionerType.Sorter:
      blankTmp = buildTemplate<QuestionerSorterTemplate, QuestionerType.Sorter>({ type, variants: {}, req: 1 });
      break;
    case QuestionerType.TextInclude:
      blankTmp = buildTemplate<QuestionerTextIncludeTemplate, QuestionerType.TextInclude>({
        type,
        req: 1,
        text: '',
      });
      break;
  }

  const keyId = smylib.takeKeyId(blanks[blankw].tmp, QuestionerTemplateId.min);
  blanks[blankw].ord.push(keyId);
  blanks[blankw].tmp[keyId] = blankTmp;
  questionerBlanksFileStore.saveValue();

  return { ...blanks[blankw], w: blankw };
};
