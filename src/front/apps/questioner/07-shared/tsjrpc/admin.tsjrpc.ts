import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';
import { questionerIDB } from '../state/qIdb';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { QuestionerAdminShareTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.share.model';

export const questionerAdminTsjrpcClientBase = new (class Questioner extends TsjrpcBaseClient<QuestionerAdminShareTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerAdminShare',
      methods: {
        updateBlanks: async ({ blanks, maxMod }) => {
          questionerIDB.tb.blanks.bulkPut(blanks);
          questionerIDB.updateLastModifiedAt(maxMod);
        }
      }
    })
  }
})();

questionerAdminTsjrpcClientBase.$$register();

export const questionerAdminTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerAdminTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerAdmin',
      methods: {
        createBlank: true,
        addBlankTemplate: true,

        requestFreshes: true,
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
        setTemplateConditionOperator: true,
        addTemplateConditionNext: true,
        addTemplateConditionNextNext: true,
        removeTemplateCondition: true,
        setTemplateConditionNextTemplateId: true,
        setTemplateConditionNextOperator: true,
        setTemplateConditionNextValue: true,
      },
    });
  }
})();
