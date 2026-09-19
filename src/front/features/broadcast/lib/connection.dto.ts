import { electronPresentationTsjrpcClient } from '#basis/tsjrpc.electron/presentation.cli.methods';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { ScheduleWidgetWid, ScheduleWidgetWidDef } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { broadcastNextLiveDataAtom } from '../atoms';

class BroadcastConnectionDto {
  sendLiveData = async (liveData: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => {
    broadcastNextLiveDataAtom.set(liveData);
    await electronPresentationTsjrpcClient.liveData(liveData);

    if (liveData.schw && liveData.schw !== ScheduleWidgetWidDef) schLiveTsjrpcClient.next(liveData);
  };

  focus = async () => {
    await electronPresentationTsjrpcClient.show(broadcastNextLiveDataAtom.get());
    await this.sendLiveData(broadcastNextLiveDataAtom.get());
  };

  blur = () => electronPresentationTsjrpcClient.close();

  init = async () => {
    await this.focus();

    return this;
  };
}

export const broadcastConnectionDto = new BroadcastConnectionDto();
