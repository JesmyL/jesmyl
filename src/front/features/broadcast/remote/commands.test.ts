import { parseRemoteBroadcastClientMessage } from '../../../../electron-app/src/remote/protocol';
import {
  RemoteBroadcastCommand,
  RemoteBroadcastCommandKind,
  RemoteBroadcastMessageKind,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { describe, expect, it } from 'vitest';

const commandCases: RemoteBroadcastCommand[] = [
  { kind: RemoteBroadcastCommandKind.Hello },
  { kind: RemoteBroadcastCommandKind.CmSlide, dir: -1 },
  { app: 'bible' },
  { isHide: true },
  { cm: { slidei: 3 } },
  { cm: { comw: 42 } },
  { bible: { booki: 43 } },
  { bible: { chapteri: 2 } },
  { bible: { versei: 15 } },
  {
    bible: {
      booki: 43,
      chapteri: 3,
      versei: 16,
      finishVersei: 20,
      joinAddress: { 43: { 3: [16, 17] } },
    },
  },
  { bible: { translationName: 'rst' } },
  { bible: { searchTerm: 'любовь' } },
];

describe('parseRemoteBroadcastClientMessage', () => {
  it('parses every action and every patch field without shifting numeric values', () => {
    for (const command of commandCases) {
      expect(parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Command, c: command })).toEqual({
        k: RemoteBroadcastMessageKind.Command,
        c: command,
      });
    }
  });

  it('keeps a single verse and a full address apart', () => {
    expect(
      parseRemoteBroadcastClientMessage({
        k: RemoteBroadcastMessageKind.Command,
        c: { bible: { versei: 0 } },
      }),
    ).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { bible: { versei: 0 } },
    });

    expect(
      parseRemoteBroadcastClientMessage({
        k: RemoteBroadcastMessageKind.Command,
        c: { bible: { booki: 1, chapteri: 0, versei: 0, finishVersei: null } },
      }),
    ).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { bible: { booki: 1, chapteri: 0, versei: 0, finishVersei: null } },
    });
  });

  it('drops an invalid verse, an unknown kind or an empty patch', () => {
    expect(
      parseRemoteBroadcastClientMessage({
        k: RemoteBroadcastMessageKind.Command,
        c: { bible: { versei: -1 } },
      }),
    ).toBeNull();

    expect(parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Command, c: { kind: 999 } })).toBeNull();

    expect(parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Command, c: {} })).toBeNull();
  });

  it('maps legacy command kinds onto the unified patch', () => {
    const parseLegacy = (command: unknown) =>
      parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Command, c: command });

    expect(parseLegacy({ kind: 1, app: 'bible' })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { app: 'bible' },
    });
    expect(parseLegacy({ kind: 2, isHide: true })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { isHide: true },
    });
    expect(parseLegacy({ kind: 4, slidei: 3 })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { cm: { slidei: 3 } },
    });
    expect(parseLegacy({ kind: 8, versei: 16 })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { bible: { versei: 16 } },
    });
    expect(parseLegacy({ kind: 9, booki: 1, chapteri: 0, versei: 0, finishVersei: null })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { bible: { booki: 1, chapteri: 0, versei: 0, finishVersei: null } },
    });
    expect(parseLegacy({ kind: 11, term: 'любовь' })).toEqual({
      k: RemoteBroadcastMessageKind.Command,
      c: { bible: { searchTerm: 'любовь' } },
    });
  });

  it('parses the hello envelope with an optional token', () => {
    expect(
      parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Hello, deviceId: 'device-1', token: 'jwt' }),
    ).toEqual({ k: RemoteBroadcastMessageKind.Hello, deviceId: 'device-1', token: 'jwt' });

    expect(parseRemoteBroadcastClientMessage({ k: RemoteBroadcastMessageKind.Hello, deviceId: '' })).toBeNull();
  });
});
