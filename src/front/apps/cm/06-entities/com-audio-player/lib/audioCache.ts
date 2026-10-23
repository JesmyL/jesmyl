import { cmIDB } from '$cm/shared/state';
import { environment } from '#shared/environment';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid, CmAudioSrc, IExportableCom, parseCmAudioTail, parseHttpNumLeadLink } from 'shared/api';
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
export const cmComAudioPlayerSrcStatesAtom = atom<PRecord<CmAudioSrc, 'cached' | 'error'>>({});

/** Srcs present in Cache Storage, mirrored reactively so the "cached" tracklist reacts to cache/uncache actions. */
export const cmComAudioPlayerCachedSrcsAtom = atom<Set<CmAudioSrc>>(new Set());

const trackUrlPrefix = `${environment.backHttpUrl}/track/`;
const mp3Extension = '.mp3';

export const takeCmComAudioPlayerTrackUrl = (src: CmAudioSrc) => `${trackUrlPrefix}${src}`;

/** The proxy streams upstream audio same-origin, so its response body is readable and cacheable for offline blob playback. */
const takeCmComAudioPlayerCacheUrl = takeCmComAudioPlayerTrackUrl;

/** Older builds cached tracks with a `.mp3` suffix; both variants must resolve to the same src. */
const takeCmComAudioPlayerCacheUrls = (src: CmAudioSrc) => [
  takeCmComAudioPlayerCacheUrl(src),
  `${takeCmComAudioPlayerCacheUrl(src)}${mp3Extension}`,
];

/** In-flight cache jobs keyed by src, so concurrent requests for the same track share one fetch. */
const inFlightCacheJobs = new Map<CmAudioSrc, Promise<void>>();

const setCmComAudioPlayerSrcState = (src: CmAudioSrc, state: 'cached' | 'error') =>
  cmComAudioPlayerSrcStatesAtom.set(prev => (prev[src] === state ? prev : { ...prev, [src]: state }));

const clearCmComAudioPlayerSrcStates = (srcs: CmAudioSrc[]) =>
  cmComAudioPlayerSrcStatesAtom.set(prev => {
    if (srcs.every(src => !(src in prev))) return prev;

    const next = { ...prev };
    for (const src of srcs) delete next[src];

    return next;
  });

const takeSrcFromCacheUrl = (url: string): CmAudioSrc | nil => {
  const src = url.slice(trackUrlPrefix.length);
  const extensionlessSrc = src.endsWith(mp3Extension) ? src.slice(0, -mp3Extension.length) : src;

  return parseCmAudioTail(src) ?? parseCmAudioTail(extensionlessSrc) ?? parseHttpNumLeadLink(src);
};

const takeCmComAudioPlayerCachedResponse = async (src: CmAudioSrc) => {
  const cache = await caches.open(cmComAudioPlayerCacheName);

  for (const url of takeCmComAudioPlayerCacheUrls(src)) {
    const response = await cache.match(url);
    if (response) return response;
  }

  return null;
};

const addCmComAudioPlayerCachedSrc = (src: CmAudioSrc) =>
  cmComAudioPlayerCachedSrcsAtom.set(prev => (prev.has(src) ? prev : new Set(prev).add(src)));

const deleteCmComAudioPlayerCachedSrcs = (srcs: CmAudioSrc[]) =>
  cmComAudioPlayerCachedSrcsAtom.set(prev => {
    if (srcs.every(src => !prev.has(src))) return prev;

    const next = new Set(prev);
    srcs.forEach(src => next.delete(src));

    return next;
  });

/**
 * Reads every src currently present in Cache Storage; the reactive counterpart is {@link useCmComAudioPlayerCachedSrcs}.
 * Manual caching and service-worker playback both store tracks under the same `/track/` URLs.
 */
export const takeCmComAudioPlayerCachedSrcs = async () => {
  if (typeof caches === 'undefined') return new Set<CmAudioSrc>();

  const keys = await (await caches.open(cmComAudioPlayerCacheName)).keys();

  return new Set(
    keys
      .filter(key => key.url.startsWith(trackUrlPrefix))
      .map(key => takeSrcFromCacheUrl(key.url))
      .filter((src): src is CmAudioSrc => src != null),
  );
};

/** Whether a com has at least one audio src present in Cache Storage. */
export const isCmComAudioPlayerComCached = (com: IExportableCom, cachedSrcs: Set<CmAudioSrc>) =>
  !!com.al?.some(src => cachedSrcs.has(src));

export const isCmComAudioPlayerSrcCached = async (src: CmAudioSrc): Promise<Bool> => {
  const cachedResponse = await takeCmComAudioPlayerCachedResponse(src);

  if (cachedResponse) {
    setCmComAudioPlayerSrcState(src, 'cached');
    return Bool.True;
  }

  clearCmComAudioPlayerSrcStates([src]);

  return Bool.False;
};

/** Reads the cached audio body so the player can play a local object URL instead of a SW range request. */
export const takeCmComAudioPlayerCachedBlob = async (src: CmAudioSrc) => {
  const response = await takeCmComAudioPlayerCachedResponse(src);

  return response?.blob();
};

/** Manual `cache.put` bypasses workbox ExpirationPlugin, so the oldest entries are pruned here. */
const pruneCmComAudioPlayerCache = async (cache: Cache) => {
  const keys = await cache.keys();
  const overflow = keys.length - cmComAudioPlayerCacheMaxEntries;
  if (overflow <= 0) return;

  const evicted = keys.slice(0, overflow);
  const evictedSrcs = evicted
    .map(key => takeSrcFromCacheUrl(key.url))
    .filter((src): src is CmAudioSrc => src != null);
  await Promise.all(evicted.map(key => cache.delete(key)));
  clearCmComAudioPlayerSrcStates(evictedSrcs);
  deleteCmComAudioPlayerCachedSrcs(evictedSrcs);
};

/**
 * Downloads one track into the cache. A manual retry clears a previous `error` first (via the
 * cache miss in `isCmComAudioPlayerSrcCached`); a failed attempt marks the src as `error` so its
 * cloud renders the retry state.
 */
export const cmComAudioPlayerCacheSrc = (src: CmAudioSrc): Promise<void> => {
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
      addCmComAudioPlayerCachedSrc(src);
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
export const cmComAudioPlayerUncacheSrc = async (src: CmAudioSrc) => {
  await inFlightCacheJobs.get(src)?.catch(emptyFunc);

  try {
    const cache = await caches.open(cmComAudioPlayerCacheName);
    await Promise.all(takeCmComAudioPlayerCacheUrls(src).map(url => cache.delete(url)));
  } catch (error) {
    console.error('[cm audio cache]', src, error);
  } finally {
    clearCmComAudioPlayerSrcStates([src]);
    deleteCmComAudioPlayerCachedSrcs([src]);
  }
};

/** Drops a com's tracks from the cache (used when the com is un-favourited). */
export const cmComAudioPlayerUncacheCom = async (comw: CmComWid) => {
  try {
    const srcs = (await cmIDB.tb.coms.get(comw))?.al;
    if (!srcs?.length) return;

    const cache = await caches.open(cmComAudioPlayerCacheName);
    await Promise.all(
      srcs.flatMap(src => takeCmComAudioPlayerCacheUrls(src).map(url => cache.delete(url))),
    );
    clearCmComAudioPlayerSrcStates(srcs);
    deleteCmComAudioPlayerCachedSrcs(srcs);
  } catch (error) {
    console.error('[cm audio cache]', comw, error);
  }
};

/** srcs already reconciled with Cache Storage in this session, so remounts don't re-check (nor reset an `error` retry state). */
const hydratedSrcs = new Set<CmAudioSrc>();

/**
 * The state is runtime-only, so hydrate it from Cache Storage once per src; otherwise every
 * reload (incl. HMR) would show already-downloaded tracks as "not cached" until clicked again.
 */
const hydrateCmComAudioPlayerSrc = (src: CmAudioSrc) => {
  if (hydratedSrcs.has(src)) return;

  hydratedSrcs.add(src);
  void isCmComAudioPlayerSrcCached(src).catch(emptyFunc);
};

/** Reactive per-track cache state; `undefined` means "not cached". */
export const useCmComAudioPlayerSrcState = (src: CmAudioSrc) => {
  const state = useAtomValue(cmComAudioPlayerSrcStatesAtom)[src];

  useEffect(() => {
    hydrateCmComAudioPlayerSrc(src);
  }, [src]);

  return state;
};

/** Aggregated cache state of a com's tracks, for the bulk cache tool. */
export const useCmComAudioPlayerComCacheState = (srcs: CmAudioSrc[] | nil): 'none' | 'some' | 'all' => {
  const states = useAtomValue(cmComAudioPlayerSrcStatesAtom);

  useEffect(() => {
    srcs?.forEach(hydrateCmComAudioPlayerSrc);
  }, [srcs]);

  const cachedCount = srcs?.reduce((count, src) => count + (states[src] === 'cached' ? 1 : 0), 0) ?? 0;

  if (!srcs?.length || !cachedCount) return 'none';

  return cachedCount === srcs.length ? 'all' : 'some';
};

/** Whether the whole bucket was already reconciled in this session, so remounts don't re-read it. */
let cachedSrcsHydrated = false;

/** Reactive set of srcs present in Cache Storage; the full bucket is read once on mount, then kept fresh by cache/uncache actions. */
export const useCmComAudioPlayerCachedSrcs = () => {
  useEffect(() => {
    if (cachedSrcsHydrated) return;

    cachedSrcsHydrated = true;
    void takeCmComAudioPlayerCachedSrcs().then(
      srcs => cmComAudioPlayerCachedSrcsAtom.set(srcs),
      error => console.error('[cm audio cache]', error),
    );
  }, []);

  return useAtomValue(cmComAudioPlayerCachedSrcsAtom);
};
