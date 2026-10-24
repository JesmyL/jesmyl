import { translateBase } from '#basis/locale';
import { useCmComCurrent } from '$cm/entities/com';
import {
  cmComAudioPlayerCacheSrc,
  cmComAudioPlayerUncacheCom,
  cmComAudioPlayerCacheToast,
  useCmComAudioPlayerComCacheState,
} from '$cm/entities/com-audio-player';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twMerge } from 'tailwind-merge';
import { CmComTool } from '../ComTool';

/**
 * Bulk cache switch for the current com: an empty cloud caches every track, a checked cloud
 * un-caches them all. The check fades while only some tracks are cached and turns solid green once all are.
 */
export const CmComToolCacheTracks = () => {
  const ccom = useCmComCurrent();
  const srcs = ccom?.audio;
  const cacheState = useCmComAudioPlayerComCacheState(srcs);

  if (!ccom || !srcs?.length) return <CmComTool icon="CloudDownload" />;

  const isCached = cacheState !== 'none';

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.CacheTracks], { v: +isCached })}
      icon={isCached ? 'CloudSavingDone01' : 'CloudDownload'}
      iconKind={cacheState === 'all' ? 'SolidRounded' : undefined}
      iconClassName={twMerge(isCached && 'text-xOK', cacheState === 'some' && 'text-x7')}
      onClick={() =>
        isCached
          ? void cmComAudioPlayerUncacheCom(ccom.wid)
          : void Promise.all(
              srcs.map(src =>
                cmComAudioPlayerCacheSrc(src).then(isFreshlyCached => (isFreshlyCached ? src : null), () => null),
              ),
            ).then(freshSrcs => cmComAudioPlayerCacheToast(freshSrcs, ccom.name))
      }
    />
  );
};
