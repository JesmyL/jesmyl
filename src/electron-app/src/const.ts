import { BrowserWindow } from 'electron';

export * from '../../shared/const/electron';
export * from '../../shared/utils/lazyInit';

export const electronAppWinHolder: { win?: BrowserWindow } = {};
