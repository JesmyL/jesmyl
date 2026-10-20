import { translateBase } from '#basis/locale';
import { JSX } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import {
  QuestionerConditionContentProps,
  QuestionerResultContentProps,
  QuestionerUserAnswerContentProps,
} from 'shared/model/q/answer';
import { objectLength, objectValues } from 'shared/utils/object.utils';
import { QuestionerAdminCheckTemplateCardContent } from '../ui/admin-templates/Check.admin';
import { QuestionerAdminCommentTemplateCardContent } from '../ui/admin-templates/Comment.admin';
import { QuestionerAdminRadioTemplateCardContent } from '../ui/admin-templates/Radio.admin';
import { QuestionerAdminSorterTemplateCardContent } from '../ui/admin-templates/Sorter.admin';
import { QuestionerAdminTextIncludeTemplateCardContent } from '../ui/admin-templates/TextInclude.admin';
import { QuestionerResultCheckTemplateCardContent } from '../ui/result-templates/Check.result';
import { QuestionerResultCommentTemplateCardContent } from '../ui/result-templates/Comment.result';
import { QuestionerResultRadioTemplateCardContent } from '../ui/result-templates/Radio.result';
import { QuestionerResultSorterTemplateCardContent } from '../ui/result-templates/Sorter.result';
import { QuestionerResultTextIncludeTemplateCardContent } from '../ui/result-templates/TextInclude.result';
import { QuestionerTemplateConditionCheckCardContent } from '../ui/template-condition/Check.condition';
import { QuestionerTemplateConditionCommentCardContent } from '../ui/template-condition/Comment.condition';
import { QuestionerTemplateConditionRadioCardContent } from '../ui/template-condition/Radio.condition';
import { QuestionerTemplateConditionSorterCardContent } from '../ui/template-condition/Sorter.condition';
import { QuestionerTemplateConditionTextIncludeCardContent } from '../ui/template-condition/TextInclude.condition';
import { QuestionerUserCheckTemplateCardContent } from '../ui/user-templates/Check.user';
import { QuestionerUserCommentTemplateCardContent } from '../ui/user-templates/Comment.user';
import { QuestionerUserRadioTemplateCardContent } from '../ui/user-templates/Radio.user';
import { QuestionerUserSorterTemplateCardContent } from '../ui/user-templates/Sorter.user';
import { QuestionerUserTextIncludeTemplateCardContent } from '../ui/user-templates/TextInclude.user';
import { questionerTemplateDescriptions } from './templateDescriptions';

export const questionerCardContents = <Type extends QuestionerType>(type: Type) =>
  ((): {
    [Type in QuestionerType]: () => {
      userRender: (props: QuestionerUserAnswerContentProps<Type>) => JSX.Element;
      adminRender: (props: QuestionerAdminTemplateContentProps<Type>) => JSX.Element;
      resultRender: (props: QuestionerResultContentProps<Type>) => JSX.Element;
      conditionConfigureRender: (props: QuestionerConditionContentProps<Type>) => JSX.Element;
      takeShowError?: (props: QuestionerUserAnswerContentProps<Type>) => string;
      takeUserAnswerError: (props: QuestionerUserAnswerContentProps<Type>) => {
        check: string | nil;
        info: string | nil;
        isFill: boolean;
      };
      customRequireMessage: React.ReactNode;
    };
  } => ({
    [QuestionerType.Radio]: () => ({
      userRender: props => <QuestionerUserRadioTemplateCardContent {...props} />,
      adminRender: props => <QuestionerAdminRadioTemplateCardContent {...props} />,
      resultRender: props => <QuestionerResultRadioTemplateCardContent {...props} />,
      conditionConfigureRender: props => <QuestionerTemplateConditionRadioCardContent {...props} />,
      takeShowError: takeShowErrorVarianted,
      customRequireMessage: null,
      takeUserAnswerError: props => {
        const isFill = props.userAnswer?.v != null;

        return {
          info: null,
          check:
            !props.template.req || isFill
              ? null
              : translateBase(BaseLocaleKey.QuestionerAnswerRequired, {
                  t: props.template.title ?? questionerTemplateDescriptions[props.template.type].title,
                }),
          isFill,
        };
      },
    }),
    [QuestionerType.Check]: () => ({
      userRender: props => <QuestionerUserCheckTemplateCardContent {...props} />,
      adminRender: props => <QuestionerAdminCheckTemplateCardContent {...props} />,
      resultRender: props => <QuestionerResultCheckTemplateCardContent {...props} />,
      conditionConfigureRender: props => <QuestionerTemplateConditionCheckCardContent {...props} />,
      takeShowError: takeShowErrorVarianted,
      customRequireMessage: null,
      takeUserAnswerError: props => {
        const variantsLen = objectValues(props.template.variants).filter(v => v?.title).length - 1;
        const title = props.template.title ?? questionerTemplateDescriptions[props.template.type].title;
        const min = props.template.min && Math.min(props.template.min, variantsLen);
        const max = props.template.max && Math.min(props.template.max, variantsLen);

        const _maxVars = max == null ? '' : translateBase(BaseLocaleKey.QuestionerVariantsNumber, { n: '' + max });
        const _minVars = min == null ? '' : translateBase(BaseLocaleKey.QuestionerVariantsNumber, { n: '' + min });

        const infoPrefix = translateBase(it =>
          props.template.req ? it[BaseLocaleKey.QuestionerNeedChoose] : it[BaseLocaleKey.QuestionerCanChoose],
        );
        const checkPrefix = translateBase(
          it => (props.template.req ? it[BaseLocaleKey.QuestionerAnswerMust] : it[BaseLocaleKey.QuestionerAnswerMay]),
          {
            t: title,
          },
        );

        return {
          isFill: !!props.userAnswer?.v.length,
          ...makeMaxMinReqInfo({
            length: props.userAnswer?.v.length ?? 0,
            isRequired: !!props.template.req,
            max,
            min,

            infoEqText: `${infoPrefix} ${_minVars}`,
            infoBetweenText: `${infoPrefix} ${translateBase(BaseLocaleKey.QuestionerFromToVariants, { a: '' + min, b: '' + max })}`,
            infoMinText: `${infoPrefix} ${translateBase(BaseLocaleKey.QuestionerMinimumVariants, { a: _minVars })}`,
            infoMaxText: `${infoPrefix} ${translateBase(BaseLocaleKey.QuestionerMaximumVariants, { a: _maxVars })}`,

            checkEqText: `${checkPrefix} ${_maxVars}`,
            checkBetweenText: `${checkPrefix} ${translateBase(BaseLocaleKey.QuestionerFromToVariants, { a: '' + min, b: '' + max })}`,
            checkMinText: `${checkPrefix} ${translateBase(BaseLocaleKey.QuestionerMinimumVariants, { a: _minVars })}`,
            checkMaxText: `${checkPrefix} ${translateBase(BaseLocaleKey.QuestionerMaximumVariants, { a: _maxVars })}`,

            checkRequiredText: translateBase(BaseLocaleKey.QuestionerAnswerRequired, { t: title }),
          }),
        };
      },
    }),
    [QuestionerType.Comment]: () => ({
      adminRender: props => <QuestionerAdminCommentTemplateCardContent {...props} />,
      userRender: props => <QuestionerUserCommentTemplateCardContent {...props} />,
      resultRender: props => <QuestionerResultCommentTemplateCardContent {...props} />,
      conditionConfigureRender: props => <QuestionerTemplateConditionCommentCardContent {...props} />,
      takeUserAnswerError: props => {
        return {
          check:
            !props.template.req || props.userAnswer?.v
              ? null
              : translateBase(BaseLocaleKey.QuestionerCommentRequiredFor, { t: props.template.title ?? '' }),
          info: null,
          isFill: !!props.userAnswer?.v,
        };
      },
      customRequireMessage: translateBase(BaseLocaleKey.QuestionerCommentRequired),
    }),
    [QuestionerType.Sorter]: () => ({
      adminRender: props => <QuestionerAdminSorterTemplateCardContent {...props} />,
      userRender: props => <QuestionerUserSorterTemplateCardContent {...props} />,
      resultRender: props => <QuestionerResultSorterTemplateCardContent {...props} />,
      conditionConfigureRender: props => <QuestionerTemplateConditionSorterCardContent {...props} />,
      takeUserAnswerError: props => {
        const isFill = !!props.template.len && props.userAnswer?.v.length === props.template.len;

        return {
          check:
            !props.template.req || isFill
              ? null
              : translateBase(BaseLocaleKey.QuestionerSortValuesIn, { t: props.template.title ?? '' }),
          info: null,
          isFill,
        };
      },
      customRequireMessage: translateBase(BaseLocaleKey.QuestionerSorterRequired),
    }),
    [QuestionerType.TextInclude]: () => ({
      adminRender: props => <QuestionerAdminTextIncludeTemplateCardContent {...props} />,
      userRender: props => <QuestionerUserTextIncludeTemplateCardContent {...props} />,
      resultRender: props => <QuestionerResultTextIncludeTemplateCardContent {...props} />,
      conditionConfigureRender: props => <QuestionerTemplateConditionTextIncludeCardContent {...props} />,
      takeUserAnswerError: props => {
        const isFill = objectLength(props.userAnswer?.v) === props.template.len;

        return {
          check:
            !props.template.req || isFill
              ? null
              : translateBase(BaseLocaleKey.QuestionerRestoreIn, { t: props.template.title ?? '' }),
          info: null,
          isFill,
        };
      },
      customRequireMessage: translateBase(BaseLocaleKey.QuestionerRestoreRequired),
    }),
  }))()[type]();

const takeShowErrorVarianted = (props: { template: { variants: Record<string, { title: string }> } }) =>
  objectValues(props.template.variants).filter(v => v?.title).length
    ? ''
    : translateBase(BaseLocaleKey.QuestionerNoVariants);

const makeMaxMinReqInfo = (props: {
  min: number | nil;
  max: number | nil;
  isRequired: boolean;
  length: number;
  infoBetweenText: string;
  checkBetweenText: string;
  infoEqText: string;
  checkEqText: string;
  checkMinText: string;
  infoMinText: string;
  checkMaxText: string;
  infoMaxText: string;
  checkRequiredText: string;
}): { check: string | null; info: null | string } => {
  if (props.min != null && props.max != null) {
    const info = props.max === props.min ? props.infoEqText : props.infoBetweenText;
    const check = props.max === props.min ? props.checkEqText : props.checkBetweenText;

    if (props.isRequired && !props.length) return { check, info };
    else if (!props.isRequired && !props.length) return { check: null, info };

    return {
      info,
      check:
        props.max === props.min
          ? props.length === props.min
            ? null
            : check
          : props.length < props.min || props.length > props.max
            ? check
            : null,
    };
  } else if (props.min != null) {
    return {
      info: props.infoMinText,
      check:
        props.isRequired && !props.length ? props.checkMinText : props.length < props.min ? props.checkMinText : null,
    };
  } else if (props.max != null) {
    return {
      info: props.infoMaxText,
      check:
        props.isRequired && !props.length
          ? props.checkRequiredText
          : props.length > props.max
            ? props.checkMaxText
            : null,
    };
  }

  if (props.isRequired && !props.length)
    return {
      check: props.checkRequiredText,
      info: null,
    };

  return { check: null, info: null };
};
