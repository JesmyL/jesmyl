import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { itInvokeIt } from 'shared/utils';
import { broadcastFirstPresentationModeAtom, broadcastNextLiveDataAtom } from '../atoms';
import { BroadcastFirstPresentationMode } from '../Broadcast.model';

class BroadcastConnectionDto {
  conn: PresentationConnection | und;
  private session: PresentationRequest | null = null;
  private unsubscribe = () => {};

  private sendLiveData = (liveData: IndexSchWBroadcastLiveDataValue) => {
    if (this.conn == null || this.conn.state !== 'connected') return;
    this.conn.send(JSON.stringify(liveData));
  };

  focus = () => {
    if (broadcastFirstPresentationModeAtom.get() === BroadcastFirstPresentationMode.Hiddify)
      this.sendLiveData({ ...broadcastNextLiveDataAtom.get().data, isHide: false });
    else this.init();
  };
  blur = () => {
    if (broadcastFirstPresentationModeAtom.get() === BroadcastFirstPresentationMode.Hiddify)
      this.sendLiveData({ fio: '', isHide: true });
    else this.conn?.terminate();
  };

  init = async () => {
    this.unsubscribe();

    const createConnection = async () => {
      this.session ??= new PresentationRequest('/presentation');
      this.conn = await this.session.start();

      this.unsubscribe = broadcastNextLiveDataAtom.subscribe(value => this.sendLiveData(value.data));

      this.conn.onmessage = () => {
        this.sendLiveData(broadcastNextLiveDataAtom.get().data);
      };

      return this.conn;
    };

    this.conn = await createConnection();

    return this;
  };

  subscribeEffect = (
    onLiveData: (data: IndexSchWBroadcastLiveDataValue) => void,
    setIsHide: (isHide: boolean) => void,
  ) => {
    let clears: (() => void)[] = [];

    (async () => {
      const list = await navigator.presentation?.receiver?.connectionList;
      clears = list.connections.map(connection => {
        connection.onmessage = e => {
          const data: IndexSchWBroadcastLiveDataValue = JSON.parse(e.data);
          onLiveData(data);
          if (data.isHide != null) setIsHide(data.isHide);
        };
        connection.send('');

        return () => (connection.onmessage = null);
      });
    })();

    return () => clears.forEach(itInvokeIt);
  };
}

export const broadcastConnectionDto = new BroadcastConnectionDto();
