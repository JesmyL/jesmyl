import { questionerBlanksStore } from 'back/apps/q/db-stores';
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
import { takeKeyId } from 'shared/utils';
import { questionerAdminServerTsjrpcBase } from '..';
import { questionerAdminServerTsjrpcShare } from '../../admin.tsjrpc.share';

export const questionerTSJRPCAddBlankTemplate: typeof questionerAdminServerTsjrpcBase.addBlankTemplate = async (
  { blankw, type },
  { auth, client },
) => {
  if (await throwIfNoUserScopeAccessRight(auth, 'q', 'EDIT', 'R')) throw '';

  const blank = await questionerBlanksStore.getItem(blankw);
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

  const keyId = takeKeyId(blank.tmp, QuestionerTemplateId.min);
  blank.ord.push(keyId);
  blank.tmp[keyId] = blankTmp;
  await questionerBlanksStore.saveItem(blankw, blank);

  questionerAdminServerTsjrpcShare.updateBlanks({ blanks: [blank], maxMod: blank.m }, client);
};
