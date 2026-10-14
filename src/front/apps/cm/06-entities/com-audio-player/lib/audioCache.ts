import { cmIDB } from '$cm/shared/state';
import { environment } from '#shared/environment';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid, HttpNumLeadLink } from 'shared/api';
import { Bool } from 'shared/enums';
import { emptyFunc } from 'shared/utils';

/**
 * Browser Cache Storage bucket holding tracks cached through the manual cloud button.
 * Keep in sync with the `audio-cache` runtimeCaching entry in vite-pwa.options.ts.
 */
export const cmComAudioPlayerCacheName = 'audio-cache';

/** Max tracks kept; mirrors workbox `expiration.maxEntries`. Oldest entries are evicted first. */
const cmComAudioPlayerCacheMaxEntries = 200;

/** Per-track cache state: `cached` plays from storage; `error` marks the last failed attempt. Absence is "not cached". */
export const cmComAudioPlayerSrcStatesAtom = atom<PRecord<HttpNumLeadLink, 'cached' | 'error'>>({});

const trackUrlPrefix = `${environment.backHttpUrl}/track/`;
const trackFileUrlPrefix = `${environment.backHttpUrl}/track-file/`;

export const takeCmComAudioPlayerTrackUrl = (src: HttpNumLeadLink) => `${trackUrlPrefix}${src}`;

/** The proxy streams upstream audio same-origin, so its response body is readable and cacheable for offline blob playback. */
const takeCmComAudioPlayerCacheUrl = (src: HttpNumLeadLink) => `${trackFileUrlPrefix}${src}`;

/** In-flight cache jobs keyed by src, so concurrent requests for the same track share one fetch. */
const inFlightCacheJobs = new Map<HttpNumLeadLink, Promise<void>>();

const setCmComAudioPlayerSrcState = (src: HttpNumLeadLink, state: 'cached' | 'error') =>
  cmComAudioPlayerSrcStatesAtom.set(prev => (prev[src] === state ? prev : { ...prev, [src]: state }));

const clearCmComAudioPlayerSrcStates = (srcs: HttpNumLeadLink[]) =>
  cmComAudioPlayerSrcStatesAtom.set(prev => {
    if (srcs.every(src => !(src in prev))) return prev;

    const next = { ...prev };
    for (const src of srcs) delete next[src];

    return next;
  });

const takeSrcFromCacheUrl = (url: string) => url.slice(trackFileUrlPrefix.length) as HttpNumLeadLink;

export const isCmComAudioPlayerSrcCached = async (src: HttpNumLeadLink): Promise<Bool> => {
  const cachedResponse = await (await caches.open(cmComAudioPlayerCacheName)).match(takeCmComAudioPlayerCacheUrl(src));

  if (cachedResponse) {
    setCmComAudioPlayerSrcState(src, 'cached');
    return Bool.True;
  }

  clearCmComAudioPlayerSrcStates([src]);

  return Bool.False;
};

/** Reads the cached audio body so the player can play a local object URL instead of a SW range request. */
export const takeCmComAudioPlayerCachedBlob = async (src: HttpNumLeadLink) => {
  const response = await (await caches.open(cmComAudioPlayerCacheName)).match(takeCmComAudioPlayerCacheUrl(src));

  return response?.blob();
};

/** Manual `cache.put` bypasses workbox ExpirationPlugin, so the oldest entries are pruned here. */
const pruneCmComAudioPlayerCache = async (cache: Cache) => {
  const keys = await cache.keys();
  const overflow = keys.length - cmComAudioPlayerCacheMaxEntries;
  if (overflow <= 0) return;

  const evicted = keys.slice(0, overflow);
  await Promise.all(evicted.map(key => cache.delete(key)));
  clearCmComAudioPlayerSrcStates(evicted.map(key => takeSrcFromCacheUrl(key.url)));
};

/**
 * Downloads one track into the cache. A manual retry clears a previous `error` first (via the
 * cache miss in `isCmComAudioPlayerSrcCached`); a failed attempt marks the src as `error` so its
 * cloud renders the retry state.
 */
export const cmComAudioPlayerCacheSrc = (src: HttpNumLeadLink): Promise<void> => {
  const inFlight = inFlightCacheJobs.get(src);
  if (inFlight) return inFlight;

  const job = (async () => {
    try {
      if (await isCmComAudioPlayerSrcCached(src)) return;

      const url = takeCmComAudioPlayerCacheUrl(src);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Audio cache fetch failed: ${response.status} ${url}`);

      const cache = await caches.open(cmComAudioPlayerCacheName);
      await cache.put(url, response);
      setCmComAudioPlayerSrcState(src, 'cached');
      await pruneCmComAudioPlayerCache(cache);
    } catch (error) {
      setCmComAudioPlayerSrcState(src, 'error');
      throw error;
    }
  })();

  const clearInFlight = () => inFlightCacheJobs.delete(src);
  inFlightCacheJobs.set(src, job);
  job.then(clearInFlight, clearInFlight);

  return job;
};

/** Drops one track from the cache (used by the per-track button). Waits for an in-flight download so a late put can't resurrect a `cached` state. */
export const cmComAudioPlayerUncacheSrc = async (src: HttpNumLeadLink) => {
  await inFlightCacheJobs.get(src)?.catch(emptyFunc);

  try {
    const cache = await caches.open(cmComAudioPlayerCacheName);
    await cache.delete(takeCmComAudioPlayerCacheUrl(src));
  } catch (error) {
    console.error('[cm audio cache]', src, error);
  } finally {
    clearCmComAudioPlayerSrcStates([src]);
  }
};

/** Drops a com's tracks from the cache (used when the com is un-favourited). */
export const cmComAudioPlayerUncacheCom = async (comw: CmComWid) => {
  try {
    const srcs = (await cmIDB.tb.coms.get(comw))?.al;
    if (!srcs?.length) return;

    const cache = await caches.open(cmComAudioPlayerCacheName);
    await Promise.all(srcs.map(src => cache.delete(takeCmComAudioPlayerCacheUrl(src))));
    clearCmComAudioPlayerSrcStates(srcs);
  } catch (error) {
    console.error('[cm audio cache]', comw, error);
  }
};

/** srcs already reconciled with Cache Storage in this session, so remounts don't re-check (nor reset an `error` retry state). */
const hydratedSrcs = new Set<HttpNumLeadLink>();

/**
 * The state is runtime-only, so hydrate it from Cache Storage once per src; otherwise every
 * reload (incl. HMR) would show already-downloaded tracks as "not cached" until clicked again.
 */
const hydrateCmComAudioPlayerSrc = (src: HttpNumLeadLink) => {
  if (hydratedSrcs.has(src)) return;

  hydratedSrcs.add(src);
  void isCmComAudioPlayerSrcCached(src).catch(emptyFunc);
};

/** Reactive per-track cache state; `undefined` means "not cached". */
export const useCmComAudioPlayerSrcState = (src: HttpNumLeadLink) => {
  const state = useAtomValue(cmComAudioPlayerSrcStatesAtom)[src];

  useEffect(() => {
    hydrateCmComAudioPlayerSrc(src);
  }, [src]);

  return state;
};

/** Aggregated cache state of a com's tracks, for the bulk cache tool. */
export const useCmComAudioPlayerComCacheState = (srcs: HttpNumLeadLink[] | nil): 'none' | 'some' | 'all' => {
  const states = useAtomValue(cmComAudioPlayerSrcStatesAtom);

  useEffect(() => {
    srcs?.forEach(hydrateCmComAudioPlayerSrc);
  }, [srcs]);

  const cachedCount = srcs?.reduce((count, src) => count + (states[src] === 'cached' ? 1 : 0), 0) ?? 0;

  if (!srcs?.length || !cachedCount) return 'none';

  return cachedCount === srcs.length ? 'all' : 'some';
};
