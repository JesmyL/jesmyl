import { mylib } from '#shared/lib/my-lib';
import { JSX } from 'react';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps, QuestionerUserAnswerContentProps } from 'shared/model/q/answer';
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
import { QuestionerUserCheckTemplateCardContent } from '../ui/user-templates/Check.user';
import { QuestionerUserCommentTemplateCardContent } from '../ui/user-templates/Comment.user';
import { QuestionerUserRadioTemplateCardContent } from '../ui/user-templates/Radio.user';
import { QuestionerUserSorterTemplateCardContent } from '../ui/user-templates/Sorter.user';
import { QuestionerUserTextIncludeTemplateCardContent } from '../ui/user-templates/TextInclude.user';
import { questionerTemplateDescriptions } from './templateDescriptions';

export const questionerCardContents = <Type extends QuestionerType>(type: Type) =>
  (
    ({
      [QuestionerType.Radio]: {
        userRender: props => <QuestionerUserRadioTemplateCardContent {...props} />,
        adminRender: props => <QuestionerAdminRadioTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultRadioTemplateCardContent {...props} />,
        takeShowError: takeShowErrorVarianted,
        customRequireMessage: null,
        takeUserAnswerError: props => {
          const isFill = props.userAnswer?.v != null;

          return {
            info: null,
            check:
              !props.template.req || isFill
                ? null
                : `Ответ на вопрос "${props.template.title ?? questionerTemplateDescriptions[props.template.type].title}" обязателен`,
            isFill,
          };
        },
      },
      [QuestionerType.Check]: {
        userRender: props => <QuestionerUserCheckTemplateCardContent {...props} />,
        adminRender: props => <QuestionerAdminCheckTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultCheckTemplateCardContent {...props} />,
        takeShowError: takeShowErrorVarianted,
        customRequireMessage: null,
        takeUserAnswerError: props => {
          const variantsLen = mylib.values(props.template.variants).filter(v => v?.title).length - 1;
          const title = props.template.title ?? questionerTemplateDescriptions[props.template.type].title;
          const min = props.template.min && Math.min(props.template.min, variantsLen);
          const max = props.template.max && Math.min(props.template.max, variantsLen);

          const _maxVars = max == null ? '' : `${max} ${mylib.declension(max, 'вариант', 'варианта', 'вариантов')}`;
          const _minVars = min == null ? '' : `${min} ${mylib.declension(min, 'вариант', 'варианта', 'вариантов')}`;

          const infoPrefix = `${props.template.req ? 'Нужно' : 'Можно'} выбрать`;
          const checkPrefix = `Ответ на вопрос "${title}" ${props.template.req ? 'должен' : 'может'} содержать`;

          return {
            isFill: !!props.userAnswer?.v.length,
            ...mylib.makeMaxMinReqInfo({
              length: props.userAnswer?.v.length ?? 0,
              isRequired: !!props.template.req,
              max,
              min,

              infoEqText: `${infoPrefix} ${_minVars}`,
              infoBetweenText: `${infoPrefix} от ${min} до ${max} вариантов`,
              infoMinText: `${infoPrefix} минимум ${_minVars}`,
              infoMaxText: `${infoPrefix} максимум ${_maxVars}`,

              checkEqText: `${checkPrefix} ${_maxVars}`,
              checkBetweenText: `${checkPrefix} от ${min} до ${max} вариантов`,
              checkMinText: `${checkPrefix} минимум ${_minVars}`,
              checkMaxText: `${checkPrefix} максимум ${_maxVars}`,

              checkRequiredText: `Ответ на вопрос "${title}" обязателен`,
            }),
          };
        },
      },
      [QuestionerType.Comment]: {
        adminRender: props => <QuestionerAdminCommentTemplateCardContent {...props} />,
        userRender: props => <QuestionerUserCommentTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultCommentTemplateCardContent {...props} />,
        takeUserAnswerError: props => {
          return {
            check:
              !props.template.req || props.userAnswer?.v
                ? null
                : `Комментарий ${props.template.title ? `"${props.template.title}" ` : ''}является обязательным`,
            info: null,
            isFill: !!props.userAnswer?.v,
          };
        },
        customRequireMessage: <>Этот комментарий обязателен к заполнению</>,
      },
      [QuestionerType.Sorter]: {
        adminRender: props => <QuestionerAdminSorterTemplateCardContent {...props} />,
        userRender: props => <QuestionerUserSorterTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultSorterTemplateCardContent {...props} />,
        takeUserAnswerError: props => {
          const isFill = !!props.template.len && props.userAnswer?.v.length === props.template.len;

          return {
            check:
              !props.template.req || isFill ? null : `Нужно отсортировать значения в пункте "${props.template.title}"`,
            info: null,
            isFill,
          };
        },
        customRequireMessage: <>Сортировка в этом блоке обязательна</>,
      },
      [QuestionerType.TextInclude]: {
        adminRender: props => <QuestionerAdminTextIncludeTemplateCardContent {...props} />,
        userRender: props => <QuestionerUserTextIncludeTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultTextIncludeTemplateCardContent {...props} />,
        takeUserAnswerError: props => {
          const isFill = mylib.keys(props.userAnswer?.v ?? {}).length === props.template.len;

          return {
            check:
              !props.template.req || isFill
                ? null
                : `Нужно восстановить все недостающие слова в пункте "${props.template.title}"`,
            info: null,
            isFill,
          };
        },
        customRequireMessage: <>Нужно восстановить все недостающие слова</>,
      },
    }) satisfies {
      [Type in QuestionerType]: {
        userRender: (props: QuestionerUserAnswerContentProps<Type>) => JSX.Element;
        adminRender: (props: QuestionerAdminTemplateContentProps<Type>) => JSX.Element;
        resultRender: (props: QuestionerResultContentProps<Type>) => JSX.Element;
        takeShowError?: (props: QuestionerUserAnswerContentProps<Type>) => string;
        takeUserAnswerError: (props: QuestionerUserAnswerContentProps<Type>) => {
          check: string | nil;
          info: string | nil;
          isFill: boolean;
        };
        customRequireMessage: React.ReactNode;
      };
    }
  )[type];

const takeShowErrorVarianted = (props: { template: { variants: Record<string, { title: string }> } }) =>
  mylib.values(props.template.variants).filter(v => v?.title).length ? '' : 'Нет варианотов ответа';
