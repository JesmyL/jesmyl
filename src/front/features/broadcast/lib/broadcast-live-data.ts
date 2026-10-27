import { electronPresentationTsjrpcClientMethods } from '#basis/tsjrpc.electron/presentation.cli.methods';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { presentationProjectorTool } from 'shared/model/electron';
import { BroadcastLiveData, BroadcastViewApp } from '../Broadcast.model';
import { broadcastCurrentTextAppAtom, broadcastNextLiveDataAtom, broadcastPresentationsLiveDataAtom } from '../atoms';
import { getScreenBroadcastWindows } from '../hooks/windows';

export const sendBroadcastLiveData = (liveData: BroadcastLiveData) => {
  getScreenBroadcastWindows().forEach(win => win?.send(liveData));

  if (isElectronApp) void electronPresentationTsjrpcClientMethods.liveData(liveData, presentationProjectorTool);
};

export const switchBroadcastApp = (app: BroadcastViewApp) => {
  broadcastCurrentTextAppAtom.set(app);

  const live = broadcastNextLiveDataAtom.get();
  const presentations = broadcastPresentationsLiveDataAtom.get();
  const data = { ...live.data, app, ...(app === 'presentations' && presentations && { presentations }) };
  const liveData: BroadcastLiveData = { schw: live.schw, data };

  broadcastNextLiveDataAtom.set(liveData);
  sendBroadcastLiveData(liveData);
};
