import { ReactNode } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';

// Перечисление взаимоисключающих вариантов описания хвоста строки списка композиций: набор меток, кнопки кэша либо ничего.
export const enum CmComFaceDescriptionVariant {
  Nothing,
  FavouriteButtons,
  CacheButtons,
}

export interface CmComFaceInheritProps {
  /**
   * Хвост строки: либо функция рендера описания, либо вариант описания из CmComFaceDescriptionVariant; одновременно можно задать только одно.
   * Если не передано — по умолчанию рендерится набор FavouriteButtons (метка-лайк).
   */
  comDescription?: CmComFaceDescriptionVariant | ((com: IExportableCom, comi: number) => ReactNode);
  /** The com the caller plays: the player page's current com is not necessarily the last opened one. */
  currentComw?: CmComWid | nil;
  isPutCcomFaceOff?: boolean;
}
