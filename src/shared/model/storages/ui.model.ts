export type StoragesColumnUiDict = Partial<{
  text: string | nil;
  bg: string | nil;
}>;

export const enum StoragesColumnUiListKey {
  /** Небольшой верхний отступ */
  MarginTopSmall = 37,
  /** Большой верхний отступ */
  MarginTopBig = 98,
  /** Очень большой верхний отступ */
  MarginTopLarge = 53,

  /** Небольшой нижний отступ */
  MarginBottomSmall = 94,
  /** Большой нижний отступ */
  MarginBottomBig = 21,
  /** Очень большой нижний отступ */
  MarginBottomLarge = 63,

  /** Небольшой размер шрифта */
  FontSizeSmall = 76,
  /** Большой размер шрифта */
  FontSizeBig = 20,
  /** Очень большой размер шрифта */
  FontSizeLarge = 61,
}
