/** Собственная нумерация виртуальных категорий — ключ записи `BaseLocaleKey.CmCategoryList`. */
export const enum CmAdditionalCatKind {
  intensityTooSlow = 1,
  intensitySlow = 2,
  intensityMedium = 3,
  intensityFast = 4,
  intensityTooFast = 5,
  langRu = 6,
  langUa = 7,
  langKz = 8,
  langEn = 9,
}

/** тип тональности */
export const enum TonType {
  Diezed = 0,
  Bemoled = 1,
}

export const takeCmComToggledTonType = (currentType: TonType | nil) =>
  currentType === TonType.Diezed ? TonType.Bemoled : TonType.Diezed;
