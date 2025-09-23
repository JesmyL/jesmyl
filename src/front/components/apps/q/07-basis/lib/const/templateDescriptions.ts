import { QuestionerType } from 'shared/model/q';

export const questionerTemplateDescriptions: Record<QuestionerType, { title: string; dsc: string }> = {
  [QuestionerType.Check]: {
    title: 'Чек-лист',
    dsc: 'В этом блоке можно выбрать несколько вариантов ответа',
  },
  [QuestionerType.Radio]: {
    title: 'Переключатель',
    dsc: 'В этом блоке можно выбрать только один вариант ответа',
  },
  [QuestionerType.Comment]: {
    title: 'Комментарий',
    dsc: 'Это блок для любого комментария',
  },
  [QuestionerType.Sorter]: {
    title: 'Сортировка',
    dsc: 'Нужно отсортировать список в правильном порядке',
  },
};

export const questionerTemplateDescriptionsOrder = [
  QuestionerType.Check,
  QuestionerType.Radio,
  QuestionerType.Comment,
  QuestionerType.Sorter,
];
