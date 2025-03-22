export interface ICorrects {
  errors?: ICorrect[];
  warnings?: ICorrect[];
  unknowns?: ICorrect[];
}

export interface ICorrect {
  message: string;
}
