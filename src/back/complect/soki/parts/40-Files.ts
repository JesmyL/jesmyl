import {
  LocalSokiAuth,
  PullEventValue,
  SimpleKeyValue,
  SokiAppName,
  SokiClientUpdateCortage,
  SokiServerDoAction,
  SokiServerDoActionProps,
} from 'shared/api';
import { itIt, retNull, SMyLib } from 'shared/utils';
import { filer } from '../../filer/Filer';
import { FilerAppConfig, FilerContentData } from '../../filer/Filer.model';
import { SokiServerLiveTransfers } from './30-LiveTransfers';

export class SokiServerFiles extends SokiServerLiveTransfers implements SokiServerDoAction<'PullData'> {
  constructor() {
    super();

    filer.load().catch(() => {});

    filer.setWatcher((appName, key, value, mtime) => {
      this.send({
        appName,
        pull:
          appName === 'index'
            ? {
                appName,
                contents: [[{ key, value }], []],
                updates: [mtime, null, null, null],
              }
            : {
                appName,
                contents: [[], [{ key, value }]],
                updates: [null, null, mtime, null],
              },
      });
    });
  }

  private getContents(
    appName: SokiAppName,
    pullCortage: SokiClientUpdateCortage,
    auth?: LocalSokiAuth | null,
  ): PullEventValue {
    try {
      const [pullIndexLastUpdate, pullIndexMd5, pullAppLastUpdate, pullAppMd5] = pullCortage;

      let appLastUpdates = {
        cts: pullAppLastUpdate || 0,
        ts: pullAppLastUpdate || 0,
      };
      let indexLastUpdates = {
        cts: pullIndexLastUpdate || 0,
        ts: pullIndexLastUpdate || 0,
      };

      const getContents = ([fixName, fixData]: [string, FilerContentData], ts: { cts: number; ts: number }) => {
        if (fixData.level > (auth?.level || 0) || ts.ts >= fixData.mtime) return null;
        if (ts.cts < fixData.mtime) ts.cts = fixData.mtime;

        return {
          key: fixName,
          value: fixData.prepareContent ? fixData.prepareContent(fixData.data, auth) : fixData.data,
        };
      };

      const getRulesData =
        auth && auth.level > 49
          ? (config: FilerAppConfig, md5: string | nil) => {
              return config && md5 !== config.actions.shortRulesMd5
                ? { key: 'rules', value: config.actions.shortRules }
                : null;
            }
          : retNull;

      const indexMd5 = filer.appConfigs.index.actions.shortRulesMd5;
      const appMd5 = filer.appConfigs[appName]?.actions.shortRulesMd5;

      return {
        contents: [
          SMyLib.entries(filer.contents.index)
            .map(entries => getContents(entries, indexLastUpdates))
            .concat(getRulesData(filer.appConfigs.index, pullIndexMd5))
            .filter(itIt) as SimpleKeyValue<SokiAppName>[],

          SMyLib.entries(filer.contents[appName])
            .map(entries => getContents(entries, appLastUpdates))
            .concat(getRulesData(filer.appConfigs[appName], pullAppMd5))
            .filter(itIt) as SimpleKeyValue<SokiAppName>[],
        ],
        appName,
        updates: [
          indexLastUpdates.cts === pullIndexLastUpdate ? 0 : indexLastUpdates.cts,
          indexMd5 === pullIndexMd5 ? '' : indexMd5,

          appLastUpdates.cts === pullAppLastUpdate ? 0 : appLastUpdates.cts,
          appMd5 === pullAppMd5 ? '' : appMd5,
        ],
      };
    } catch (error) {
      console.error('CATCHED', error);

      return {
        contents: [[], []],
        appName,
        updates: [null, null, null, null],
      };
    }
  }

  async doOnPullData({ appName, client, eventBody, eventData, requestId }: SokiServerDoActionProps) {
    if (eventBody.pullData === undefined) return false;
    if (!eventData.appName) return false;

    const capsule = this.capsules.get(client);
    if (capsule) capsule.appName = eventData.appName;

    this.sendStatistic();

    const pull = this.getContents(eventData.appName, eventBody.pullData, capsule?.auth);

    if (pull.contents[0].length || pull.contents[1].length) this.send({ requestId, pull, appName }, client);
    else this.send({ requestId, appName }, client);

    return false;
  }
}
