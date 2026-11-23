import { RemoteBroadcastOs } from 'shared/model/index/Index.model';
import { describe, expect, it } from 'vitest';
import { takeRemoteBroadcastOs } from './device';

const setNavigatorOs = (platform: string, userAgent = '') => {
  Object.defineProperty(window.navigator, 'platform', { value: platform, configurable: true });
  Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, configurable: true });
};

describe('takeRemoteBroadcastOs', () => {
  it('detects Windows from the platform', () => {
    setNavigatorOs('Win32');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Win);
  });

  it('detects Mac from the platform', () => {
    setNavigatorOs('MacIntel');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Mac);
  });

  it('detects Linux from the platform', () => {
    setNavigatorOs('Linux x86_64');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Linux);
  });

  it('falls back to the userAgent for Android', () => {
    setNavigatorOs('', 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Linux);
  });

  it('treats iPhone as Mac in the userAgent fallback', () => {
    setNavigatorOs('', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Mac);
  });

  it('returns Other for an unknown device', () => {
    setNavigatorOs('', 'CustomBrowser/1.0');
    expect(takeRemoteBroadcastOs()).toBe(RemoteBroadcastOs.Other);
  });
});
