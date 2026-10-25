import { catDB } from 'back/drizzle.schema';
import { IExportableCat } from 'shared/api';

type CatRow = typeof catDB.$inferSelect;

/** В экспорт попадают только значимые поля: `m` — служебная метка синхронизации БД, пустые `s`/`d`/`isRemoved` не хранят смысла. */
export const exportableCatFromRow = ({ m: _, s, d, isRemoved, ...cat }: CatRow): IExportableCat => ({
  ...cat,
  ...(s && { s }),
  ...(d && { d }),
  ...(isRemoved && { isRemoved }),
});
