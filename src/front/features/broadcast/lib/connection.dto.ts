import { electronPresentationTsjrpcClientMethods } from '#basis/tsjrpc.electron/presentation.cli.methods';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { ScheduleWidgetWid, ScheduleWidgetWidDef } from 'shared/api';
import { ElectronAppWindowInvokeTool } from 'shared/model/electron';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { broadcastNextLiveDataAtom } from '../atoms';

export class BroadcastConnectionDto {
  tool: ElectronAppWindowInvokeTool;

  constructor(toWinNum: number) {
    this.tool = { toWinNum, winNum: 0 };
  }

  send = async (liveData: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => {
    broadcastNextLiveDataAtom.set(liveData);
    await electronPresentationTsjrpcClientMethods.liveData(liveData, this.tool);
    BroadcastConnectionDto.sendLiveData(liveData);
  };

  static sendLiveData = async (liveData: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => {
    if (liveData.schw && liveData.schw !== ScheduleWidgetWidDef) schLiveTsjrpcClient.next(liveData);
  };

  focus = async () => {
    await electronPresentationTsjrpcClientMethods.show(broadcastNextLiveDataAtom.get(), this.tool);
    await this.send(broadcastNextLiveDataAtom.get());
  };

  blur = () => electronPresentationTsjrpcClientMethods.close(undefined, this.tool);

  init = async () => {
    await this.focus();

    return this;
  };
}
