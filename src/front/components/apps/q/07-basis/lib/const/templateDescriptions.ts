import { QuestionerType } from 'shared/model/q';

export const questionerTemplateDescriptions: Record<QuestionerType, { title: string; dsc: string }> = {
  [QuestionerType.Check]: {
    title: 'Чек-лист',
    dsc: 'В этом блоке можновыбрать несколько вариантов ответа',
  },
  [QuestionerType.Radio]: {
    title: 'Переключатель',
    dsc: 'В этом блоке можно выбрать только один вариант ответа',
  },
  [QuestionerType.Comment]: {
    title: 'Комментарий',
    dsc: 'Это блок для любого комментария',
  },
};
