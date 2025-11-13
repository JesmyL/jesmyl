import { questionerBlanksDirStorage } from 'back/apps/q/file-stores';
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
  if (throwIfNoUserScopeAccessRight(auth, 'q', 'EDIT', 'R')) throw '';

  const blank = questionerBlanksDirStorage.getItem(blankw);
  if (blank == null) throw 'Not Found';

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

  const keyId = smylib.takeKeyId(blank.tmp, QuestionerTemplateId.min);
  blank.ord.push(keyId);
  blank.tmp[keyId] = blankTmp;
  questionerBlanksDirStorage.saveItem(blankw);

  return { value: { ...blank, w: blankw } };
};
