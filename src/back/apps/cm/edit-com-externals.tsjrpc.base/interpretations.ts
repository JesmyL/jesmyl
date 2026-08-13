import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { sch2ComDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { PgCheckFieldMode } from 'back/drizzle/ex';
import { selectPgCheckedExportableCom } from 'back/drizzle/ex/com.selectors';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { and, eq } from 'drizzle-orm';
import { CmComMod, CmComWid, IExportableCom, IExportableComInterpretation, ScheduleWidgetWid } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { objectLength } from 'shared/utils/object.utils';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';
import { updateCmComOrderModulationValue, updateCmComOrderTonTypeSwitcherValue } from '../utils';

export const cmEditComExternalsTsjrpcInterpretations = () =>
  ({
    ordVisIntp: updateInterptetation((com, intp, { ordw }) => {
      const getOrd = () => {
        const cmOrds = new CmCom({ ...com, al: [], m: CmComMod.def }, null, intp).orders;
        return cmOrds?.find(o => o.wid === ordw);
      };

      const cmOrd = getOrd();

      if (!cmOrd) throw 'Не найдено';

      const ordsIntp = (intp.o ??= {});
      const ordIntp = (ordsIntp[ordw] ??= {});
      const isVisible = cmOrd.isVisible;

      delete ordIntp.v;

      if (isVisible) {
        if (getOrd()?.isVisible) ordIntp.v = 0;
      } else {
        if (!getOrd()?.isVisible) ordIntp.v = 1;
      }

      if (!objectLength(ordIntp)) delete ordsIntp[ordw];
      if (!objectLength(ordsIntp)) delete intp.o;
    }),

    tonIntp: updateInterptetation((com, intp, { ton }) => {
      intp.p = ton;
      if (checkIsEq(com.p, intp.p)) delete intp.p;
    }),

    bemoleIntp: updateInterptetation((com, intp, { val }) => {
      intp.b = val;
      if (checkIsEq(com.b, intp.b)) delete intp.b;
    }),

    bpmIntp: updateInterptetation((com, intp, { bpm }) => {
      intp.bpm = takeCorrectMetronomeBpm(bpm);

      if (takeCorrectMetronomeBpm(com.bpm) === takeCorrectMetronomeBpm(intp.bpm)) delete intp.bpm;
    }),

    ordMudlIntp: updateInterptetation((_, intp, { md, ordw }) => {
      updateCmComOrderModulationValue(((intp.o ??= {})[ordw] ??= {}), md);
    }),

    ordMdSwitchIntp: updateInterptetation((_, intp, { ordw }) => {
      updateCmComOrderTonTypeSwitcherValue(((intp.o ??= {})[ordw] ??= {}));
    }),
  }) satisfies ServerTsjrpcSatisfy<CmEditComExternalsTsjrpcModel>;

const updateInterptetation =
  <Props extends { schw: ScheduleWidgetWid; comw: CmComWid }>(
    update: (com: IExportableCom, intp: IExportableComInterpretation, props: Props) => void,
  ) =>
  async (props: Props, { auth }: ServerTSJRPCTool) => {
    if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U')) throw '';

    const com = await selectPgCheckedExportableCom(props.comw, { id: PgCheckFieldMode.RemoveIfNull });

    if (!com) throw 'Песня не найдена';
    const sch = await takeScheduleWidgetTiny({ w: props.schw });
    if (!sch) throw 'Мероприятие не найдено';
    const where = and(eq(sch2ComDB.schId, sch.id), eq(sch2ComDB.comId, com.id));
    if (!where) throw 'Error 915253412316';

    const sch2ComIntp = (await db.select({ intp: sch2ComDB.intp }).from(sch2ComDB).where(where).limit(1)).at(0);
    const updIntp = sch2ComIntp?.intp ?? {};
    update(com, updIntp, props);

    const intpMod = Date.now();
    const intp = objectLength(updIntp) ? updIntp : null;

    if (sch2ComIntp) {
      await dbUpdate(sch2ComDB, { intp, intpMod }, where);
    } else {
      await db.insert(sch2ComDB).values({ comId: com.id, schId: sch.id, intp, intpMod });
    }

    cmShareServerTsjrpcMethods.freshSchEvComIntp_v1(
      { intps: [{ schw: props.schw, intp: { [com.w]: intp } }], mod: intpMod },
      null,
    );
  };
