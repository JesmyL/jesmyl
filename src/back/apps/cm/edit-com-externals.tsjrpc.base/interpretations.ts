import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComWid, IExportableComInterpretation, IScheduleWidgetWid, IServerSideCom } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { smylib } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { comsDirStorage, comsInSchEventDirStorage } from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmEditComExternalsTsjrpcInterpretations = () =>
  ({
    ordVisIntp: updateInterptetation((com, intp, { isInv, ordw }) => {
      const ord = com.o?.find(o => o.w === ordw);
      if (!ord) throw 'Не найдено';

      const ordsIntp = (intp.o ??= {});
      const ordInterpretation = (ordsIntp[ordw] ??= {});

      if (ordInterpretation.v == null || ordInterpretation.v === 1) ordInterpretation.v = 0;
      else if (isInv) ordInterpretation.v = 1;
      else delete ordInterpretation.v;

      const ordv = ord.v ?? 1;
      const intpv = ordInterpretation.v ?? 1;

      if ((!ordv && !intpv) || (ordv && intpv)) delete ordInterpretation.v;

      if (!smylib.keys(ordInterpretation).length) delete ordsIntp[ordw];
      if (!smylib.keys(ordsIntp).length) delete intp.o;
    }),

    tonIntp: updateInterptetation((com, intp, { ton }) => {
      intp.p = ton;
      if (!intp.p || com.p === intp.p) delete intp.p;
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
  <Props extends { schw: IScheduleWidgetWid; comw: CmComWid }>(
    update: (com: IServerSideCom, intp: IExportableComInterpretation, props: Props) => void,
  ) =>
  async (props: Props, { auth }: ServerTSJRPCTool) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U')) throw '';

    const com = comsDirStorage.getItem(props.comw);

    if (!com) throw 'Песня не найдена';

    const pack = await comsInSchEventDirStorage.getOrCreateItem(props.schw);
    const intp = (pack.intp ??= {});

    update(com, (intp[props.comw] ??= {}), props);

    if (!smylib.keys(intp[props.comw]).length) delete intp[props.comw];
    if (!smylib.keys(intp).length) delete pack.intp;

    const mod = comsInSchEventDirStorage.saveItem(props.schw);

    if (mod) {
      cmShareServerTsjrpcMethods.refreshSchEvComPacks({ packs: [pack], mod }, null);
    }
  };
