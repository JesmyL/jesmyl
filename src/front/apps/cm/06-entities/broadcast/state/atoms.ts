import { HorizontalDirection } from '#shared/model/Direction';
import { atom } from 'atomaric';

export const cmBroadcastBlockAtom = atom(0);
export const cmBroadcastSwitchBlockDirectionAtom = atom(HorizontalDirection.Center);
