import { QuestionerBlank } from "shared/model/q";


export type QuestionerAdminShareTsjrpcModel = {
  updateBlanks: (args: { blanks: QuestionerBlank[], maxMod: number }) => void
};
