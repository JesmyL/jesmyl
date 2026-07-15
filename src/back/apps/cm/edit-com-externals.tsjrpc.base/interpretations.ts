import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { sch2ComDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { selectPgCheckedExportableCom } from 'back/drizzle/ex/com.selectors';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { and, eq } from 'drizzle-orm';
import { CmComMod, CmComWid, IExportableCom, IExportableComInterpretation, ScheduleWidgetWid } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmCom } from 'shared/const/cm/Com';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { objectLength } from 'shared/utils/object.utils';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

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
      if (!intp.p || com.p === intp.p) delete intp.p;
    }),

    bemoleIntp: updateInterptetation((com, intp, { val }) => {
      intp.b = val;
      if (!intp.b || com.b === intp.b) delete intp.b;
    }),

    bpmIntp: updateInterptetation((com, intp, { bpm }) => {
      intp.bpm = takeCorrectMetronomeBpm(bpm);

      if (
        intp.bpm === takeCorrectMetronomeBpm() ||
        takeCorrectMetronomeBpm(com.bpm) === takeCorrectMetronomeBpm(intp.bpm)
      )
        delete intp.bpm;
    }),
  }) satisfies ServerTsjrpcSatisfy<CmEditComExternalsTsjrpcModel>;

const updateInterptetation =
  <Props extends { schw: ScheduleWidgetWid; comw: CmComWid }>(
    update: (com: IExportableCom, intp: IExportableComInterpretation, props: Props) => void,
  ) =>
  async (props: Props, { auth }: ServerTSJRPCTool) => {
    if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U')) throw '';

    const com = await selectPgCheckedExportableCom(props.comw);

    if (!com) throw 'Песня не найдена';
    const sch = await takeScheduleWidgetTiny({ w: props.schw });
    if (!sch) throw 'Мероприятие не найдено';
    const where = and(eq(sch2ComDB.schId, sch.id), eq(sch2ComDB.comId, com.id));
    if (!where) throw 'Error 915253412316';

    const intp = (await db.select({ intp: sch2ComDB.intp }).from(sch2ComDB).where(where).limit(1)).at(0)?.intp ?? {};

    update(com, intp, props);

    const intpMod = Date.now();
    await dbUpdate(sch2ComDB, { intp: objectLength(intp) ? intp : null, intpMod }, where);

    if (intpMod) {
      cmShareServerTsjrpcMethods.freshSchEvComIntp({ intps: [{ schw: props.schw, intp }], mod: intpMod }, null);
    }
  };
