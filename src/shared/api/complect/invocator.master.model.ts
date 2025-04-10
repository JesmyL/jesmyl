import { InvocatorBaseEvent } from './soki.model';

export type SokiInvokerData = {
  scope: string;
  method: string;
  args: object;
  token?: string | nil;
};

export type SokiInvokerTranferDto<Event extends InvocatorBaseEvent, Tool = und> = {
  requestId: string;
  invoke: SokiInvokerData;
  sendResponse: (event: Event, tool: Tool) => void;
  tool: Tool;
};
