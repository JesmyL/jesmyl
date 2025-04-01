/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from 'node-telegram-bot-api';

export type TelegramWebAppInitData = {
  user: User & {
    is_premium: boolean;
    allows_write_to_pm: boolean;
  };
  chat_instance: string;
  chat_type: string;
  auth_date: string;
  hash: string;
};

export type TelegramWebApp = {
  initData: string;
  initDataUnsafe: TelegramWebAppInitData;
  version: string;
  platform: 'tdesktop' | string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    accent_text_color: string;
    bg_color: string;
    button_color: string;
    button_text_color: string;
    destructive_text_color: string;
    header_bg_color: string;
    hint_color: string;
    link_color: string;
    secondary_bg_color: string;
    section_bg_color: string;
    section_header_text_color: string;
    section_separator_color: string;
    subtitle_text_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive: boolean) => void;
    hideProgress: () => void;
    setParams: (params: { text?: string }) => void;
  };
  SettingsButton: {
    isVisible: boolean;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: any) => void;
    notificationOccurred: (type: any) => void;
    selectionChanged: () => void;
  };
  CloudStorage: {
    setItem: (key: string, value: any, callback: () => void) => void;
    getItem: (key: string, callback: () => void) => any;
    getItems: (keys: string[], callback: () => void) => void;
    removeItem: (key: string, callback: () => void) => void;
    removeItems: (keys: string[], callback: () => void) => void;
    getKeys: (cb: () => void) => void;
  };
  BiometricManager: {
    isInited: boolean;
    isBiometricAvailable: boolean;
    biometricType: string;
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    isBiometricTokenSaved: boolean;
    deviceId: string;
    init: (cb: () => void) => void;
    requestAccess: (params: { reason?: string }, callback: () => void) => void;
    authenticate: (params: { reason?: string }, callback: () => void) => void;
    updateBiometricToken: (token: string, callback: () => void) => void;
    openSettings: () => void;
  };
  setHeaderColor: (color_key: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  enableVerticalSwipes: () => void;
  disableVerticalSwipes: () => void;
  isVersionAtLeast: (ver: string) => void;
  onEvent: (eventType: string, callback: () => void) => void;
  offEvent: (eventType: string, callback: () => void) => void;
  sendData: (data: any[]) => void;
  switchInlineQuery: (query: string, choose_chat_types: string[]) => void;
  openLink: (url: string, options: { try_instant_view: boolean; try_browser: any }) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback: () => void) => void;
  showPopup: (params: Params, callback: () => void) => void;
  showAlert: (message: string, callback: () => void) => void;
  showConfirm: (message: string, callback: () => void) => void;
  showScanQrPopup: (params: Params, callback: () => void) => void;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback: () => void) => void;
  requestWriteAccess: (callback: () => void) => void;
  requestContact: (callback: () => void) => void;
  invokeCustomMethod: (method: string, params: Params, callback: () => void) => void;
  ready: () => void;
  expand: () => void;
  close: (options: { return_back: boolean }) => void;
};

type Params = { title: string; message: string; buttons: { id: string; type: any; text: string }[] };
