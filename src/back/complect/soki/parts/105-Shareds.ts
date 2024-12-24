import { SokiServerDoAction, SokiServerDoActionProps, SokiSharedKey } from 'shared/api';
import { SMyLib } from 'shared/utils';
import { SokiServerAuthorization } from './100-Authorization';

export class SokiServerShareds
  extends SokiServerAuthorization
  implements SokiServerDoAction<'ShareData' | 'GetShared'>
{
  sharedValues: Partial<Record<SokiSharedKey, Record<string, unknown>>> = {};

  async doOnShareData({ eventBody }: SokiServerDoActionProps) {
    if (eventBody.shareData === undefined) return false;
    SMyLib.entries(eventBody.shareData).forEach(([key, value]) => {
      this.sharedValues[key] = { ...this.sharedValues[key], ...value };
    });

    return false;
  }

  async doOnGetShared({ appName, client, eventBody, requestId }: SokiServerDoActionProps) {
    if (eventBody.getShared === undefined) return false;
    const { key, prefix } = eventBody.getShared;
    let value = this.sharedValues[key];

    if (value === undefined) {
      this.send({ appName, requestId }, client);
      return false;
    }

    if (prefix !== undefined) {
      const val: Record<string, unknown> = {};
      let isNoSets = true;

      SMyLib.entries(value).forEach(([key, value]) => {
        if (key.startsWith(prefix)) {
          val[key] = value;
          isNoSets = false;
        }
      });

      if (isNoSets) {
        this.send({ appName, requestId }, client);
        return false;
      }
    }

    this.send({ sharedData: { [key as never]: value }, appName, requestId }, client);

    return false;
  }
}
