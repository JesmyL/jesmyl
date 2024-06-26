import { WebSocket } from 'ws';
import { sokiWhenRejButTs } from '../../../values';
import { SokiCapsule, SokiServerEvent } from '../soki.model';

export class SokiServerTransfers {
  capsules = new Map<WebSocket, SokiCapsule>();
  clients = new Map<string, WebSocket>();

  send(
    data: SokiServerEvent,
    client?:
      | WebSocket
      | null
      | ((
          capsule: SokiCapsule,
          client: WebSocket,
          whenRejButTs: typeof sokiWhenRejButTs,
        ) => boolean | typeof sokiWhenRejButTs),
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
