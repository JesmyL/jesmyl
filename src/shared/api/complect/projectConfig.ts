import * as domainJson from '../../../../project-config.json';

const {
  base: { current, ...base },
  configs: { [current as 'jesmylRu']: currentConfig },
} = domainJson;

export const projectConfig = {
  ...base,
  ...currentConfig,
  host: `https://${currentConfig.dns}` as const,
};
