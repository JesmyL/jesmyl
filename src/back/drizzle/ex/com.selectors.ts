import { db } from 'back/drizzle/drizzle.db';
import { eq } from 'drizzle-orm';
import { CmComIntensityLevel, CmComLangi, CmComWid } from 'shared/api';
import { Bool } from 'shared/enums';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from '.';
import { comsDB } from '../schema';

export const makePgCheckedSelectExportableComSqlRaw = <Adds extends Parameters<typeof makePgCheckedSelectSqlRaw>[1]>(
  adds?: Adds,
) =>
  makePgCheckedSelectSqlRaw(comsDB, {
    l: `=${CmComLangi.Ru}`,
    s: `=${CmComMetricNum.Four}`,
    d: `=${CmComIntensityLevel.Medium}`,
    al: `len=0`,
    nl: `len=0`,
    b: `=${Bool.False}`,
    bpm: `=0`,
    p: `=0`,

    isRemoved: PgCheckFieldMode.Remove,
    id: PgCheckFieldMode.Remove,
    visits: PgCheckFieldMode.Remove,

    ...adds,
  });

export const selectPgCheckedExportableCom = async (comw: CmComWid) =>
  (await db.select({ c: makePgCheckedSelectExportableComSqlRaw() }).from(comsDB).where(eq(comsDB.w, comw))).at(0)?.c;
