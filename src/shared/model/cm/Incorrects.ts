export interface IIncorrects {
  errors?: IIncorrect[];
  warnings?: IIncorrect[];
  unknowns?: IIncorrect[];
}

export interface IIncorrect {
  message: string;
}
