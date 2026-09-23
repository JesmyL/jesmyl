/** тип тональности */
export const enum TonType {
  Diezed = 0,
  Bemoled = 1,
}

export const takeCmComToggledTonType = (currentType: TonType | nil) =>
  currentType === TonType.Diezed ? TonType.Bemoled : TonType.Diezed;
