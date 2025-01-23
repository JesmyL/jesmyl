import { DeviceId, SokiCapsule, SokiServerEvent, sokiWhenRejButTs } from 'shared/api';
import { WebSocket } from 'ws';
import { SokiServerClientSelector } from '../model';

export class SokiServerTransfers {
  capsules = new Map<WebSocket, SokiCapsule>();
  capsulesByDeviceId = new Map<DeviceId, SokiCapsule>();
  capsulesByLogin = new Map<string, Set<SokiCapsule>>();
  clients = new Map<string, WebSocket>();

  actionWithCapsule(client: WebSocket, cb: (capsule: SokiCapsule) => void, triesCount = 10) {
    const tryAction = (triesCount: number) => {
      const capsule = this.capsules.get(client);
      if (capsule !== undefined) return cb(capsule);
      if (triesCount > 0) setTimeout(tryAction, 10, triesCount - 1);
    };

    tryAction(triesCount);
  }

  send(
    data: SokiServerEvent,
    client?: SokiServerClientSelector,
    errorFor?: WebSocket | null,
    rejEvent?: SokiServerEvent,
  ) {
    const event = JSON.stringify(data);

    if (client instanceof WebSocket) client.send(event);
    else {
      let rejEventStr: null | string = null;

      if (errorFor != null) {
        let freeRejEventStr: null | string = null;

        const freeEvent = JSON.stringify({ ...data, errorMessage: undefined });
        if (client == null) this.capsules.forEach((_, cli) => cli.send(errorFor === cli ? event : freeEvent));
        else
          this.capsules.forEach((capsule, cli) => {
            const res = client(capsule, cli, sokiWhenRejButTs);
            if (res === sokiWhenRejButTs) {
              if (errorFor === cli)
                cli.send(rejEventStr === null ? (rejEventStr = JSON.stringify(rejEvent)) : rejEventStr);
              else
                cli.send(
                  freeRejEventStr === null
                    ? (freeRejEventStr = JSON.stringify({
                        ...rejEvent,
                        errorMessage: undefined,
                      }))
                    : freeRejEventStr,
                );
            } else if (res) cli.send(errorFor === cli ? event : freeEvent);
          });
      } else {
        if (client == null) this.capsules.forEach((_, cli) => cli.send(event));
        else
          this.capsules.forEach((capsule, cli) => {
            const res = client(capsule, cli, sokiWhenRejButTs);
            if (res === sokiWhenRejButTs)
              cli.send(rejEventStr === null ? (rejEventStr = JSON.stringify(rejEvent)) : rejEventStr);
            else if (res) cli.send(event);
          });
      }
    }
  }
}
