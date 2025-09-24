import { mylib } from '#shared/lib/my-lib';
import { QuestionerAdminCheckTemplateCardContent } from '$q/basis/ui/admin-templates/Check.admin';
import { QuestionerAdminCommentTemplateCardContent } from '$q/basis/ui/admin-templates/Comment.admin';
import { QuestionerAdminRadioTemplateCardContent } from '$q/basis/ui/admin-templates/Radio.admin';
import { QuestionerAdminSorterTemplateCardContent } from '$q/basis/ui/admin-templates/Sorter.admin';
import { QuestionerResultCheckTemplateCardContent } from '$q/basis/ui/result-templates/Check.result';
import { QuestionerResultCommentTemplateCardContent } from '$q/basis/ui/result-templates/Comment.result';
import { QuestionerResultRadioTemplateCardContent } from '$q/basis/ui/result-templates/Radio.result';
import { QuestionerResultSorterTemplateCardContent } from '$q/basis/ui/result-templates/Sorter.result';
import { QuestionerUserCheckTemplateCardContent } from '$q/basis/ui/user-templates/Check.user';
import { QuestionerUserCommentTemplateCardContent } from '$q/basis/ui/user-templates/Comment.user';
import { QuestionerUserRadioTemplateCardContent } from '$q/basis/ui/user-templates/Radio.user';
import { QuestionerUserSorterTemplateCardContent } from '$q/basis/ui/user-templates/Sorter.user';
import { JSX } from 'react';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps, QuestionerUserAnswerResultContentProps } from 'shared/model/q/answer';
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
          return !props.template.req || props.userAnswer != null
            ? null
            : {
                info: null,
                check: `Ответ на вопрос "${props.template.title ?? questionerTemplateDescriptions[props.template.type].title}" обязателен`,
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

          const infoPrefix = `Вариантов ${props.template.req ? 'должно' : 'может'} быть`;
          const checkPrefix = `Ответ на вопрос "${title}" ${props.template.req ? 'должен' : 'может'} содержать`;

          return mylib.makeMaxMinReqInfo({
            length: props.userAnswer?.v.length ?? 0,
            isRequired: !!props.template.req,
            max,
            min,

            infoEqText: `${infoPrefix} ${max}`,
            infoBetweenText: `${infoPrefix} от ${min} до ${max}`,
            infoMinText: `${infoPrefix} минимум ${_minVars}`,
            infoMaxText: `${infoPrefix} максимум ${_maxVars}`,

            checkEqText: `${checkPrefix} ${_maxVars}`,
            checkBetweenText: `${checkPrefix} от ${min} до ${max} вариантов`,
            checkMinText: `${checkPrefix} минимум ${_minVars}`,
            checkMaxText: `${checkPrefix} максимум ${_maxVars}`,

            checkRequiredText: `Ответ на вопрос "${title}" обязателен`,
          });
        },
      },
      [QuestionerType.Comment]: {
        adminRender: props => <QuestionerAdminCommentTemplateCardContent {...props} />,
        userRender: props => <QuestionerUserCommentTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultCommentTemplateCardContent {...props} />,
        takeUserAnswerError: props => {
          return {
            check:
              !props.template.req || props.userAnswer
                ? null
                : `Комментарий ${props.template.title ? `"${props.template.title}" ` : ''}является обязательным`,
            info: null,
          };
        },
        customRequireMessage: <>Этот комментарий обязателен к заполнению</>,
      },
      [QuestionerType.Sorter]: {
        adminRender: props => <QuestionerAdminSorterTemplateCardContent {...props} />,
        userRender: props => <QuestionerUserSorterTemplateCardContent {...props} />,
        resultRender: props => <QuestionerResultSorterTemplateCardContent {...props} />,
        takeUserAnswerError: props => {
          return {
            check: props.userAnswer ? null : `Нужно отсортировать значения в пункте "${props.template.title}"`,
            info: null,
          };
        },
        customRequireMessage: <>Сортировка в этом блоке обязательна</>,
      },
    }) satisfies {
      [Type in QuestionerType]: {
        userRender: (props: QuestionerUserAnswerContentProps<Type>) => JSX.Element;
        adminRender: (props: QuestionerAdminTemplateContentProps<Type>) => JSX.Element;
        resultRender: (props: QuestionerUserAnswerResultContentProps<Type>) => JSX.Element;
        takeShowError?: (props: QuestionerUserAnswerContentProps<Type>) => string;
        takeUserAnswerError: (
          props: QuestionerUserAnswerContentProps<Type>,
        ) => { check: string | nil; info: string | nil } | null;
        customRequireMessage: React.ReactNode;
      };
    }
  )[type];

const takeShowErrorVarianted = (props: { template: { variants: Record<string, { title: string }> } }) =>
  mylib.values(props.template.variants).filter(v => v?.title).length ? '' : 'Нет варианотов ответа';
