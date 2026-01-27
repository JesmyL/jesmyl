import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { broadcastNextLiveDataAtom } from '../atoms';

const cookieEventName = 'PRESENTATION_EVENT';
let presentationBroadcastChannel = () => {
  const channel = new BroadcastChannel('presentationBroadcastChannel');
  presentationBroadcastChannel = () => channel;
  return channel;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cookieStore: any;

class BroadcastConnectionDto {
  private unsubscribe = () => {};
  private isDesktop = false;

  private sendLiveData = (liveData: IndexSchWBroadcastLiveDataValue) => {
    presentationBroadcastChannel().postMessage(liveData);
  };

  focus = () => {
    if (!this.isDesktop) return;

    this.sendLiveData({ ...broadcastNextLiveDataAtom.get().data });
    cookieStore.set(this.makeCookieValue('SHOW'));
  };
  blur = () => cookieStore.set(this.makeCookieValue('CLOSE'));

  private makeCookieValue = (value: unknown) => {
    return {
      name: cookieEventName,
      value: `${`${Date.now()}`.padStart(20, '0')}${JSON.stringify(value)}`,
    };
  };

  init = async () => {
    if (!(await cookieStore.get(cookieEventName))) throw '';
    this.isDesktop = true;
    this.unsubscribe();

    const onMessage = (event: MessageEvent) => {
      if (event.data === null) this.sendLiveData(broadcastNextLiveDataAtom.get().data);
    };

    const unsubscribe = broadcastNextLiveDataAtom.subscribe(value => this.sendLiveData(value.data));
    presentationBroadcastChannel().addEventListener('message', onMessage);

    this.unsubscribe = () => {
      unsubscribe();
      presentationBroadcastChannel().removeEventListener('message', onMessage);
    };

    this.focus();

    return this;
  };

  subscribeEffect = (
    onLiveData: (data: IndexSchWBroadcastLiveDataValue) => void,
    setIsHide: (isHide: boolean) => void,
  ) => {
    const onMessage = (event: MessageEvent) => {
      const data: IndexSchWBroadcastLiveDataValue | nil = event.data;
      if (data == null) return;

      if (data.isHide != null) setIsHide(data.isHide);
      onLiveData(data);
    };
    presentationBroadcastChannel().addEventListener('message', onMessage);
    presentationBroadcastChannel().postMessage(null);

    return () => presentationBroadcastChannel().removeEventListener('message', onMessage);
  };
}

export const broadcastConnectionDto = new BroadcastConnectionDto();
