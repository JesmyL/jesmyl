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
import { questionerBlanksFileStore } from '../../file-stores';
import { questionerTSJRPCAddBlankTemplate } from './lib/addBlankTemplate';
import { questionerTSJRPCCreateBlank } from './lib/createBlank';
import { questionerTSJRPCFixTextIncludeTemplateTextValue } from './lib/fixTextIncludeTemplateTextValue';

export const questionerAdminServerTsjrpcBase =
  new (class QuestionerAdmin extends TsjrpcBaseServer<QuestionerAdminTsjrpcModel> {
    constructor() {
      const adminRoles = new Set([QuestionerBlankRole.Owner, QuestionerBlankRole.Admin, undefined, null]);
      adminRoles.delete(undefined);
      adminRoles.delete(null);

      const updateBlank = <Args extends QuestionerBlankSelector>(
        updater: (args: Args, blank: OmitOwn<QuestionerBlank, 'w'>) => void,
      ): ((args: Args, tool: ServerTSJRPCTool) => void) => {
        return async (args, tool) => {
          if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'q', 'EDIT', 'U')) throw '';

          const blanks = questionerBlanksFileStore.getValue();
          const blankw = args.blankw;

          if (!blanks[blankw]) throw `Blank ${blankw} not found`;
          if (!adminRoles.has(blanks[blankw].team[tool.auth.login]?.r)) throw 'Нет прав на это действие 63412393';

          updater(args, blanks[blankw]);
          blanks[blankw].m = Date.now();

          questionerBlanksFileStore.saveValue();
        };
      };

      const updateTemplate = <Args extends QuestionerTemplateSelector>(
        updater: (args: Args, template: QuestionerTemplate, blank: OmitOwn<QuestionerBlank, 'w'>) => void,
      ): ((args: Args, tool: ServerTSJRPCTool) => void) => {
        return updateBlank((args, blank) => {
          const template = blank.tmp[args.templateId];
          if (template == null) throw `The template ${args.templateId} of blank ${blank.title} is not found`;

          updater(args, template, blank);
        });
      };

      super({
        scope: 'QuestionerAdmin',
        methods: {
          createBlank: questionerTSJRPCCreateBlank,
          addBlankTemplate: questionerTSJRPCAddBlankTemplate,

          getAdminBlanks: async (_, { auth: { login } = {} }) => {
            if (throwIfNoUserScopeAccessRight(login, 'q', 'EDIT', 'R')) throw '';

            return {
              value: SMyLib.entries(questionerBlanksFileStore.getValue())
                .filter(blank => adminRoles.has(blank[1]?.team[login]?.r))
                .map(bla => ({ ...bla[1]!, w: +bla[0] })),
            };
          },
          getAdminBlank: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'U')) throw '';
            const blank = questionerBlanksFileStore.getValue()[blankw];

            return { value: blank ? { ...blank, w: blankw } : null };
          },

          changeBlankTitle: updateBlank(({ value }, blank) => (blank.title = value)),
          changeBlankDescription: updateBlank(({ value }, blank) => (blank.dsc = value)),
          switchBlankIsAnonymous: updateBlank((_, blank) => (blank.anon = blank.anon ? undefined : 1)),

          changeTemplatePosition: updateBlank(({ templateId }, blank) => {
            const templateKeys: QuestionerTemplateId[] = Array.from(
              new Set([...blank.ord, ...smylib.keys(blank.tmp).map(Number)]),
            );
            const index = templateKeys.indexOf(+templateId);
            blank.ord = smylib.withInsertedBeforei(templateKeys, index - 1, index);
          }),

          changeTemplateTitle: updateTemplate(({ value }, template) => (template.title = value)),
          changeTemplateDescription: updateTemplate(({ value }, template) => (template.dsc = value)),
          changeTemplateRequiredSign: updateTemplate(({ value }, template) => (template.req = value ? 1 : undefined)),
          switchTemplateHiddenSign: updateTemplate(
            (_, template) => (template.hidden = template.hidden ? undefined : 1),
          ),
          changeTemplateRandomSortSign: updateTemplate(({ value }, template) => {
            if (template.type === QuestionerType.Check || template.type === QuestionerType.Radio) {
              template.rSort = value ? 1 : undefined;
            }
          }),
          changeTemplateAboveText: updateTemplate(({ text }, template) => {
            if (template.type === QuestionerType.Sorter) template.above = text || undefined;
          }),
          changeTemplateBelowText: updateTemplate(({ text }, template) => {
            if (template.type === QuestionerType.Sorter) template.below = text || undefined;
          }),
          switchTemplateNoCorrectsSign: updateTemplate((_, template) => {
            if (template.type === QuestionerType.Sorter) {
              template.noCorrect = template.noCorrect ? undefined : 1;
              template.needSelect = undefined;
            }
          }),
          switchTemplateNeedSelectSign: updateTemplate((_, template) => {
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
          changeTemplateMinSign: updateTemplate(({ value }, template) => {
            if (template.type === QuestionerType.Check) {
              template.min = value > 1 ? value : undefined;
              if (template.max! < template.min!) template.min = template.max;
            }
          }),
          changeTemplateMaxSign: updateTemplate(({ value }, template) => {
            if (template.type === QuestionerType.Check) {
              template.max = value > 0 ? value : undefined;
              if (template.max! < template.min!) template.max = template.min;
            }
          }),

          changeTemplateAnswerVariantTitle: updateTemplate(({ value, answerId }, template) => {
            if ('variants' in template && template.variants[answerId]) {
              template.variants[answerId].title = value;
            }
          }),

          addTemplateAnswerVariant: updateTemplate((_, template) => {
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

          changeTemplateCorrectAnswerSign: updateTemplate(({ answerId }, template) => {
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

          changeTemplateCorrectAnswerIndex: updateTemplate(({ answerId }, template) => {
            if (template.type === QuestionerType.Sorter) {
              template.correct ??= smylib.keys(template.variants).map(Number);
              const answeri = template.correct.indexOf(+answerId);
              template.correct = smylib.withInsertedBeforei(template.correct, answeri - 1, answeri);

              return;
            }
          }),

          switchTemplateReplacementTextValue: updateTemplate(({ textValue, textCode }, template) => {
            if (template.type === QuestionerType.TextInclude) {
              template.correct ??= {};
              template.correct[textCode] = textValue || '';
            }
          }),
          switchTemplateTextValue: updateTemplate(({ text }, template) => {
            if (template.type === QuestionerType.TextInclude) {
              questionerTSJRPCFixTextIncludeTemplateTextValue(text, template);
            }
          }),

          addTemplateTextValue: updateTemplate((_, template) => {
            if (template.type === QuestionerType.TextInclude) {
              template.addTexts ??= [];
              template.addTexts.push('');
            }
          }),

          changeTemplateTextValue: updateTemplate(({ text, texti }, template) => {
            if (template.type === QuestionerType.TextInclude) {
              template.addTexts ??= [];
              template.addTexts[texti] = text;
            }
          }),

          switchTemplateSymbolExistance: updateTemplate(({ symbol }, template) => {
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
        },
      });
    }
  })();
