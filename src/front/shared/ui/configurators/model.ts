import { MyFileBoxId } from 'x/my-files';

export type ConfiguratorEditProps<Config> = {
  config: Config;
  updateConfig: (config: Partial<Config>) => void;
  title?: string;
};

export interface BackgroundConfigProps {
  bgFileId?: MyFileBoxId;
  bg: string;
  withBg: boolean;
  bgColor: string;
}
