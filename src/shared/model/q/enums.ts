export const enum QuestionerType {
  Radio = 116,
  Check = 917,
  Comment = 501,
  Sorter = 498,
  TextInclude = 694,
}

export type QuestionerVariatedType = QuestionerType.Check | QuestionerType.Radio;

export const enum QuestionerAnswerId {
  empty = 0,
  min = 1,
}

export const enum QuestionerTemplateId {
  empty = 0,
  min = 1,
}

export const enum QuestionerBlankWid {
  empty = 0,
}

export const enum QuestionerBlankRole {
  Kicked = 0,
  Owner,
  Admin,
}
