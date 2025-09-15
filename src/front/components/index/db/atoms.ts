import { atom } from 'atomaric';
import { DeviceId } from 'shared/api';

export const indexDeviceIdAtom = atom(DeviceId.def, {
  storeKey: 'index:deviceId',
  unchangable: true,
});

export const lastUpdatedIconsMd5HashAtom = atom('', 'index:lastUpdatedIconsMd5Hash');
