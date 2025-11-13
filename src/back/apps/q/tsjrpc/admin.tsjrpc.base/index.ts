import { questionerTextIncludeSymbols } from '#shared/lib/const/q/textIncludeSymbols';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';
import {
  QuestionerAnswerId,
  QuestionerBlank,
  QuestionerBlankRole,
  QuestionerBlankSelector,
  QuestionerTemplate,
  QuestionerTemplateId,
  QuestionerTemplateSelector,
  QuestionerType,
} from 'shared/model/q';
import { smylib, SMyLib } from 'shared/utils';
import { questionerBlanksDirStorage } from '../../file-stores';
import { questionerTSJRPCAddBlankTemplate } from './lib/addBlankTemplate';
import { questionerTSJRPCCreateBlank } from './lib/createBlank';
import { questionerTSJRPCFixTextIncludeTemplateTextValue } from './lib/fixTextIncludeTemplateTextValue';
import { questionerTypeDefaultIfConditionOperatorDict } from 'shared/const/q/typeDefaultIfConditionOperator';
import { questionerAdminServerTsjrpcShare } from '../admin.tsjrpc.share';

export const questionerAdminServerTsjrpcBase =
  new (class QuestionerAdmin extends TsjrpcBaseServer<QuestionerAdminTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerAdmin',
        methods: {
          createBlank: questionerTSJRPCCreateBlank,
          addBlankTemplate: questionerTSJRPCAddBlankTemplate,

          requestFreshes: ({ lastModfiedAt }, { client, auth }) => {
            if (auth?.login == null) return;
            const login = auth?.login;
            const { items, maxMod } = questionerBlanksDirStorage.getFreshItems(lastModfiedAt, item => adminRoles.has(item.team[login]?.r));

            if (items.length)
              questionerAdminServerTsjrpcShare.updateBlanks({ blanks: items, maxMod }, client);
          },

          getAdminBlank: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'q', 'EDIT', 'U')) throw '';
            const blank = questionerBlanksDirStorage.getItem(blankw);

            return { value: blank ? { ...blank, w: blankw } : null };
          },

          changeBlankTitle: updateBlank((blank, { value },) => (blank.title = value)),
          changeBlankDescription: updateBlank((blank, { value }) => (blank.dsc = value)),
          switchBlankIsAnonymous: updateBlank((blank) => (blank.anon = blank.anon ? undefined : 1)),

          changeTemplatePosition: updateBlank((blank, { templateId },) => {
            const templateKeys: QuestionerTemplateId[] = Array.from(
              new Set([...blank.ord, ...smylib.keys(blank.tmp).map(Number)]),
            );
            const index = templateKeys.indexOf(+templateId);
            blank.ord = smylib.withInsertedBeforei(templateKeys, index - 1, index);
          }),

          changeTemplateTitle: updateTemplate((template, { value },) => (template.title = value)),
          changeTemplateDescription: updateTemplate((template, { value },) => (template.dsc = value)),
          changeTemplateRequiredSign: updateTemplate((template, { value },) => (template.req = value ? 1 : undefined)),
          switchTemplateHiddenSign: updateTemplate(
            (template) => (template.hidden = template.hidden ? undefined : 1),
          ),
          changeTemplateRandomSortSign: updateTemplate((template, { value },) => {
            if (template.type === QuestionerType.Check || template.type === QuestionerType.Radio) {
              template.rSort = value ? 1 : undefined;
            }
          }),
          changeTemplateAboveText: updateTemplate((template, { text }) => {
            if (template.type === QuestionerType.Sorter) template.above = text || undefined;
          }),
          changeTemplateBelowText: updateTemplate((template, { text },) => {
            if (template.type === QuestionerType.Sorter) template.below = text || undefined;
          }),
          switchTemplateNoCorrectsSign: updateTemplate((template) => {
            if (template.type === QuestionerType.Sorter) {
              template.noCorrect = template.noCorrect ? undefined : 1;
              template.needSelect = undefined;
            }
          }),
          switchTemplateNeedSelectSign: updateTemplate((template) => {
            if (template.type === QuestionerType.Sorter) {
              template.needSelect = template.needSelect ? undefined : 1;

              if (!template.needSelect) {
                const answerIds = smylib.keys(template.variants).map(Number);
                if (template.correct?.length !== answerIds.length) {
                  template.correct = Array.from(new Set([...(template.correct ?? []), ...answerIds]));
                }
              }
            }
          }),
          changeTemplateMinSign: updateTemplate((template, { value },) => {
            if (template.type === QuestionerType.Check) {
              template.min = value > 1 ? value : undefined;
              if (template.max! < template.min!) template.min = template.max;
            }
          }),
          changeTemplateMaxSign: updateTemplate((template, { value },) => {
            if (template.type === QuestionerType.Check) {
              template.max = value > 0 ? value : undefined;
              if (template.max! < template.min!) template.max = template.min;
            }
          }),

          changeTemplateAnswerVariantTitle: updateTemplate((template, { value, answerId },) => {
            if ('variants' in template && template.variants[answerId]) {
              template.variants[answerId].title = value;
            }
          }),

          addTemplateAnswerVariant: updateTemplate((template) => {
            if (
              template.type === QuestionerType.Check ||
              template.type === QuestionerType.Radio ||
              template.type === QuestionerType.Sorter
            ) {
              template.variants ??= {};
              const answerId = smylib.takeKeyId(template.variants, QuestionerAnswerId.min);
              template.variants[answerId] = { title: '' };

              if (template.type === QuestionerType.Sorter) template.correct?.push(answerId);
            }
          }),

          changeTemplateCorrectAnswerSign: updateTemplate((template, { answerId },) => {
            if (template.type === QuestionerType.Check || template.type === QuestionerType.Sorter) {
              template.correct = template.correct?.includes(answerId)
                ? template.correct.filter(id => id !== answerId)
                : (template.correct?.concat(answerId) ?? [answerId]);

              return;
            }

            if (template.type === QuestionerType.Radio) {
              template.correct = template.correct === answerId ? undefined : answerId;

              return;
            }
          }),

          changeTemplateCorrectAnswerIndex: updateTemplate((template, { answerId },) => {
            if (template.type === QuestionerType.Sorter) {
              template.correct ??= smylib.keys(template.variants).map(Number);
              const answeri = template.correct.indexOf(+answerId);
              template.correct = smylib.withInsertedBeforei(template.correct, answeri - 1, answeri);

              return;
            }
          }),

          switchTemplateReplacementTextValue: updateTemplate((template, { textValue, textCode },) => {
            if (template.type === QuestionerType.TextInclude) {
              template.correct ??= {};
              template.correct[textCode] = textValue || '';
            }
          }),
          switchTemplateTextValue: updateTemplate((template, { text },) => {
            if (template.type === QuestionerType.TextInclude) {
              questionerTSJRPCFixTextIncludeTemplateTextValue(text, template);
            }
          }),

          addTemplateTextValue: updateTemplate((template) => {
            if (template.type === QuestionerType.TextInclude) {
              template.addTexts ??= [];
              template.addTexts.push('');
            }
          }),

          changeTemplateTextValue: updateTemplate((template, { text, texti },) => {
            if (template.type === QuestionerType.TextInclude) {
              template.addTexts ??= [];
              template.addTexts[texti] = text;
            }
          }),

          switchTemplateSymbolExistance: updateTemplate((template, { symbol },) => {
            if (template.type === QuestionerType.TextInclude) {
              const allSymbolsSet = new Set((template.symbols || questionerTextIncludeSymbols).split(''));

              if (allSymbolsSet.has(symbol)) {
                if (template.text.includes(symbol)) {
                  throw 'Этот символ уже исрользуется в тексте';
                }
                allSymbolsSet.delete(symbol);
              } else allSymbolsSet.add(symbol);

              template.symbols = Array.from(allSymbolsSet).sort().join('');

              if (!template.symbols || template.symbols === questionerTextIncludeSymbols) {
                delete template.symbols;
              }

              questionerTSJRPCFixTextIncludeTemplateTextValue(template.text, template);
            }
          }),
          setTemplateConditionOperator: updateTemplate((template, { operator, nexti },) => {
            template.if ??= { next: [] };
            if (nexti != null) {
              template.if.next[nexti].t = operator || undefined;
              return;
            }

            template.if.t = operator || undefined;
          }),
          addTemplateConditionNext: updateTemplate((template) => {
            template.if ??= { next: [] };
            template.if.next.push({ next: [] });
          }),
          addTemplateConditionNextNext: updateTemplate((template, { nexti, templateId }, blank) => {
            const ids = smylib.keys(blank.tmp);
            const tmpId = +ids[0] === +templateId ? ids[1] : ids[0];


            if (tmpId == null) return;

            template.if ??= { next: [] };
            template.if.next[nexti].next.push({ tmpId: +tmpId });
          }),
          removeTemplateCondition: updateTemplate((template, { nexti, nextNexti },) => {
            if (template.if == null) return;

            if (nextNexti != null) {
              template.if.next[nexti].next.splice(nextNexti, 1);
              if (!template.if.next[nexti].next.length) template.if.next.splice(nexti, 1);
            } else template.if.next.splice(nexti, 1);

            if (!template.if.next.length) delete template.if;
          }),
          setTemplateConditionNextTemplateId: updateTemplate((template, { nexti, conditionTemplateId, nextNexti },) => {
            if (template.if == null) return;
            template.if.next[nexti].next[nextNexti] = { tmpId: conditionTemplateId };
          }),
          setTemplateConditionNextValue: updateTemplate((template, { nexti, nextNexti, match }, blank) => {
            if (template.if == null) return;
            const nextTemplateCondition = template.if.next[nexti].next[nextNexti];
            const nextTemplate = blank.tmp[nextTemplateCondition.tmpId];
            if (nextTemplate == null) return;
            const operator = nextTemplateCondition.op ?? questionerTypeDefaultIfConditionOperatorDict[nextTemplate.type];
            const value = match[nextTemplate.type]?.[operator as never];


            if (value === undefined) return;
            nextTemplateCondition.val = value;

          }),
          setTemplateConditionNextOperator: updateTemplate((template, { nexti, nextNexti, match }, blank) => {
            if (template.if == null) return;
            const nextTemplateCondition = template.if.next[nexti].next[nextNexti];
            const nextTemplate = blank.tmp[nextTemplateCondition.tmpId];
            if (nextTemplate == null) return;
            const operator = match[nextTemplate.type];
            if (operator === undefined) return;
            nextTemplateCondition.op = operator;

          })
        },
      });
    }
  })();


const adminRoles = new Set([QuestionerBlankRole.Owner, QuestionerBlankRole.Admin, undefined, null]);
adminRoles.delete(undefined);
adminRoles.delete(null);

function updateBlank<Args extends QuestionerBlankSelector>(
  updater: (blank: OmitOwn<QuestionerBlank, 'w'>, args: Args,) => void,
): ((args: Args, tool: ServerTSJRPCTool) => void) {
  return async (args, tool) => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'q', 'EDIT', 'U')) throw '';

    const blank = questionerBlanksDirStorage.getItem(args.blankw);

    if (!blank) throw `Blank ${args.blankw} not found`;
    if (!adminRoles.has(blank.team[tool.auth.login]?.r)) throw 'Нет прав на это действие 63412393';

    updater(blank, args);
    blank.m = Date.now();

    const maxMod = questionerBlanksDirStorage.saveItem(args.blankw);


    if (maxMod != null)
      questionerAdminServerTsjrpcShare.updateBlanks({ blanks: [blank], maxMod }, { logins: SMyLib.keys(blank.team) });
  };
};

function updateTemplate<Args extends QuestionerTemplateSelector>(
  updater: (template: QuestionerTemplate, args: Args, blank: OmitOwn<QuestionerBlank, 'w'>) => void,
): ((args: Args, tool: ServerTSJRPCTool) => void) {
  return updateBlank((blank, args,) => {
    const template = blank.tmp[args.templateId];
    if (template == null) throw `The template ${args.templateId} of blank ${blank.title} is not found`;

    updater(template, args, blank);
  });
};