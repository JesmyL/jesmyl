export const enum QuestionerType {
  /** Вопрос с одиночным выбором одного варианта ответа */
  Radio = 116,
  /** Вопрос с множественным выбором нескольких вариантов ответа */
  Check = 917,
  /** Свободный текстовый ответ (комментарий) */
  Comment = 501,
  /** Задание отсортировать варианты ответа в правильном порядке */
  Sorter = 498,
  /** Заполнение пропусков в тексте — введённые фрагменты сравниваются с эталоном */
  TextInclude = 694,
}

export type QuestionerVariatedType = QuestionerType.Check | QuestionerType.Radio;

export const enum QuestionerAnswerId {
  /** Пустой идентификатор — ответа нет */
  empty = 0,
  /** Минимальный идентификатор варианта ответа */
  min = 1,
}

export const enum QuestionerTemplateId {
  /** Пустой идентификатор — шаблона нет */
  empty = 0,
  /** Минимальный идентификатор шаблона */
  min = 1,
}

export const enum QuestionerBlankWid {
  /** Пустой идентификатор — опросник не выбран */
  empty = 0,
}

export const enum QuestionerBlankRole {
  /** Исключён из опросника — доступа к нему нет */
  Kicked = 0,
  /** Владелец опросника — полный доступ */
  Owner = 1,
  /** Администратор опросника — управление содержимым и участниками */
  Admin = 2,
}
