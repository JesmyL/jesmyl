import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { Eventer } from 'shared/utils';
import { TextTransferTsjrpcModel, TextTransferTsjrpcSharesModel } from 'shared/api';
import { textTransferCountAtom, textTransferWindowsAtom } from '../state';

export const textTransferKickEvent = Eventer.createValue();

export const textTransferTsjrpcClient = new (class TextTransfer extends TsjrpcClient<TextTransferTsjrpcModel> {
  constructor() {
    super({
      scope: 'TextTransfer',
    });
  }
})();

export const textTransferTsjrpcBaseClient =
  new (class TextTransferTsjrpcBaseClient extends TsjrpcBaseClient<TextTransferTsjrpcSharesModel> {
    constructor() {
      super({
        scope: 'TextTransfer',
        methods: {
          texts: async ({ windows }) => textTransferWindowsAtom.set(windows ?? []),
          count: async ({ count }) => textTransferCountAtom.set(count),
          kick: async () => textTransferKickEvent.invoke(),
        },
      });
    }
  })();
