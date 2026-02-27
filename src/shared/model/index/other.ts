import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';

export interface IndexValues {
  chatUrl?: string;
  iconSearchLink?: string;
  desktopWindowsDownLink?: string;
  desktopLinuxDownLink?: string;
}

export type IndexLoginBindsDict = PRecord<
  SokiAuthLogin,
  (OmitOwn<LocalSokiAuth, 'login'> & { login: '' }) | SokiAuthLogin
>;
