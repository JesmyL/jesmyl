import { MyFileBoxId } from 'x/my-files';

export type ConfiguratorEditProps<Config> = {
  config: Config;
  updateConfig: (config: Partial<Config>) => void;
  title?: string;
};

export interface BackgroundConfigProps {
  /** MyFiles box id — the background source in the web build. */
  bgFileId?: MyFileBoxId;
  /** Electron WorkDir file path — the only background source in the Electron build. */
  bgFilePath?: string;
  bg: string;
  withBg: boolean;
  bgColor: string;
}
