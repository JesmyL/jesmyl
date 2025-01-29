import { InvocatorBaseEvent } from './soki.model';

export type SokiInvokerData = {
  name: string;
  method: string;
  params: unknown[];
  token?: string | nil;
};

export type SokiInvokerTranferDto<Event extends InvocatorBaseEvent, Tool = und> = {
  requestId: string;
  invoke: SokiInvokerData;
  sendResponse: (event: Event, tool: Tool) => void;
  tool: Tool;
};
