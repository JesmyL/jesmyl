import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';

export const questionerAdminTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerAdminTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerAdmin',
      methods: {
        createBlank: true,
        addBlankTemplate: true,

        getAdminBlanks: true,
        getAdminBlank: true,

        changeBlankTitle: true,
        changeBlankDescription: true,
        changeTemplateTitle: true,
        changeTemplateDescription: true,
        changeTemplateRequiredSign: true,
        addTemplateAnswerVariant: true,
        changeTemplateCorrectAnswerSign: true,
        changeTemplateAnswerVariantTitle: true,
        changeTemplateRandomSortSign: true,
        switchTemplateHiddenSign: true,
        switchBlankIsAnonymous: true,
        changeTemplateMinSign: true,
        changeTemplateMaxSign: true,
        changeTemplateAboveText: true,
        changeTemplateBelowText: true,
        switchTemplateNoCorrectsSign: true,
        changeTemplatePosition: true,
        changeTemplateCorrectAnswerIndex: true,
        switchTemplateNeedSelectSign: true,
        switchTemplateSymbolExistance: true,
        switchTemplateTextValue: true,
        switchTemplateReplacementTextValue: true,
        addTemplateTextValue: true,
        changeTemplateTextValue: true,
      },
    });
  }
})();
