import { cmIDB } from '$cm/shared/state';
import { translateBase } from '#basis/locale';
import { environment } from '#shared/environment';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid, CmAudioSrc, IExportableCom, parseCmAudioTail, parseHttpNumLeadLink } from 'shared/api';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { UsedBaseLocaleKey } from 'shared/model/+locale/base';
import { emptyFunc } from 'shared/utils';
import { toast } from 'sonner';
import { CmComAudioPlayerCacheState, CmComAudioPlayerSrcState } from '../model';

/**
 * Browser Cache Storage bucket holding tracks cached through the manual cloud button.
 * Keep in sync with the `audio-cache` runtime route in src/sw.ts.
 */
export const cmComAudioPlayerCacheName = 'audio-cache';

/** Per-track cache state: `cached` plays from storage; `error` marks the last failed attempt. Absence is "not cached". */
export const cmComAudioPlayerSrcStatesAtom = atom<PRecord<CmAudioSrc, CmComAudioPlayerSrcState>>({});

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
const inFlightCacheJobs = new Map<CmAudioSrc, Promise<Bool>>();

const setCmComAudioPlayerSrcState = (src: CmAudioSrc, state: CmComAudioPlayerSrcState) =>
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
    setCmComAudioPlayerSrcState(src, CmComAudioPlayerSrcState.Cached);
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

/** Downloads are queued: parallel multi-megabyte fetches/puts spike memory and can blank the page. */
let lastCmComAudioPlayerCacheTask: Promise<unknown> = Promise.resolve();

const queueCmComAudioPlayerCacheTask = <Result>(task: () => Promise<Result>): Promise<Result> => {
  const result = lastCmComAudioPlayerCacheTask.then(task, task);
  lastCmComAudioPlayerCacheTask = result.then(emptyFunc, emptyFunc);

  return result;
};

/** `cache.put` reports a full bucket with a `DOMException`, which is not an `Error` subclass in every browser. */
const isQuotaExceededError = (error: unknown) =>
  typeof error === 'object' &&
  error != null &&
  'name' in error &&
  (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');

/**
 * Quota is the only size limit: entries are dropped only when a put no longer fits — the oldest
 * tenth (at least one), which frees the room for the retried track without count-based eviction.
 */
const evictOldestCmComAudioPlayerCacheSrcs = async (cache: Cache) => {
  const keys = await cache.keys();
  if (!keys.length) return;

  const evicted = keys.slice(0, Math.max(1, Math.ceil(keys.length / 10)));
  const evictedSrcs = evicted.map(key => takeSrcFromCacheUrl(key.url)).filter((src): src is CmAudioSrc => src != null);

  await Promise.all(evicted.map(key => cache.delete(key)));
  clearCmComAudioPlayerSrcStates(evictedSrcs);
  deleteCmComAudioPlayerCachedSrcs(evictedSrcs);
};

/** Opens the cache, downloads the track and stores it; a full quota frees the oldest entries and retries once. */
const putCmComAudioPlayerTrack = async (cache: Cache, url: string) => {
  const put = async () => {
    const response = await fetch(url);
    if (!response.ok) throw `Audio cache fetch failed: ${response.status} ${url}`;

    await cache.put(url, response);
  };

  try {
    await put();
  } catch (error) {
    if (!isQuotaExceededError(error)) throw error;

    await evictOldestCmComAudioPlayerCacheSrcs(cache);
    await put();
  }
};

/** Cached bodies keep the proxy `content-length`, so sizes are read from headers — bodies are never materialised. */
const takeResponseBytes = (response: Response | nil) => +(response?.headers.get('content-length') ?? 0) || 0;

const sumResponsesBytes = (responses: (Response | nil)[]) => responses.reduce((sum, response) => sum + takeResponseBytes(response), 0);

/** A track lives under one of the current/legacy URL variants, so the first match holds its whole size. */
const takeCmComAudioPlayerSrcBytes = async (cache: Cache, src: CmAudioSrc) => {
  for (const url of takeCmComAudioPlayerCacheUrls(src)) {
    const response = await cache.match(url);
    if (response) return takeResponseBytes(response);
  }

  return 0;
};

const takeCmComAudioPlayerSrcsBytes = async (cache: Cache, srcs: CmAudioSrc[]) =>
  (await Promise.all(srcs.map(src => takeCmComAudioPlayerSrcBytes(cache, src)))).reduce(
    (sum, bytes) => sum + bytes,
    0,
  );

/** Fallback for environments without `navigator.storage.estimate`; matched in chunks so a huge bucket can't spike memory. */
const takeCmComAudioPlayerCacheBytes = async (cache: Cache) => {
  const keys = await cache.keys();
  const chunkSize = 50;
  let totalBytes = 0;

  for (let keyi = 0; keyi < keys.length; keyi += chunkSize) {
    totalBytes += sumResponsesBytes(await Promise.all(keys.slice(keyi, keyi + chunkSize).map(key => cache.match(key))));
  }

  return totalBytes;
};

const takeStorageEstimate = async (): Promise<StorageEstimate | nil> => {
  try {
    return await navigator.storage?.estimate?.();
  } catch {
    return null;
  }
};

const toMb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

/**
 * Occupied/free numbers come from the origin quota — the very limit the cache now relies on. The
 * audio-bucket sum is only a fallback for browsers without `navigator.storage.estimate`.
 */
const takeCmComAudioPlayerCacheSizeReport = async (trackBytes: number) => {
  const estimate = await takeStorageEstimate();
  const quota = estimate?.quota ?? null;
  const usage = estimate?.usage ?? null;
  const totalBytes = usage ?? (await takeCmComAudioPlayerCacheBytes(await caches.open(cmComAudioPlayerCacheName)));
  const freeBytes = quota == null || usage == null ? null : Math.max(quota - usage, 0);

  return { total: toMb(totalBytes), track: toMb(trackBytes), free: freeBytes == null ? null : toMb(freeBytes) };
};

/** Shows the shared cache-size toast; `trackBytes` must already be measured (before an uncache, after a cache). */
const showCmComAudioPlayerCacheSizeToast = async (
  trackBytes: number,
  comName: string,
  noQuotaKey: UsedBaseLocaleKey,
  quotaKey: UsedBaseLocaleKey,
) => {
  if (typeof caches === 'undefined') return;

  try {
    const { total, track, free } = await takeCmComAudioPlayerCacheSizeReport(trackBytes);
    const n = comName || translateBase(BaseLocaleKey.CmUnknown);

    toast(
      free == null
        ? translateBase(noQuotaKey, { n, t: total, d: track })
        : translateBase(quotaKey, { n, t: total, d: track, f: free }),
      makeToastOKMoodConfig(),
    );
  } catch (error) {
    console.error('[cm audio cache]', error);
  }
};

/**
 * Reports the freshly cached tracks' bytes plus the origin's occupied/free quota. Bulk caching
 * passes every new src of one com, so the whole batch shares one toast naming that com.
 */
export const cmComAudioPlayerCacheToast = async (srcs: (CmAudioSrc | nil)[], comName: string) => {
  const cachedSrcs = srcs.filter((src): src is CmAudioSrc => src != null);
  if (!cachedSrcs.length || typeof caches === 'undefined') return;

  try {
    const cache = await caches.open(cmComAudioPlayerCacheName);

    await showCmComAudioPlayerCacheSizeToast(
      await takeCmComAudioPlayerSrcsBytes(cache, cachedSrcs),
      comName,
      BaseLocaleKey.CmAudioCachedNoQuota,
      BaseLocaleKey.CmAudioCached,
    );
  } catch (error) {
    console.error('[cm audio cache]', error);
  }
};

/**
 * Downloads one track into the cache. A manual retry clears a previous `error` first (via the
 * cache miss in `isCmComAudioPlayerSrcCached`); a failed attempt marks the src as `error` so its
 * cloud renders the retry state.
 */
export const cmComAudioPlayerCacheSrc = (src: CmAudioSrc): Promise<Bool> => {
  const inFlight = inFlightCacheJobs.get(src);
  if (inFlight) return inFlight;

  const job = queueCmComAudioPlayerCacheTask(async (): Promise<Bool> => {
    try {
      if (await isCmComAudioPlayerSrcCached(src)) return Bool.False;

      const cache = await caches.open(cmComAudioPlayerCacheName);
      await putCmComAudioPlayerTrack(cache, takeCmComAudioPlayerCacheUrl(src));
      setCmComAudioPlayerSrcState(src, CmComAudioPlayerSrcState.Cached);
      addCmComAudioPlayerCachedSrc(src);

      return Bool.True;
    } catch (error) {
      setCmComAudioPlayerSrcState(src, CmComAudioPlayerSrcState.Error);
      throw error;
    }
  });

  const clearInFlight = () => inFlightCacheJobs.delete(src);
  inFlightCacheJobs.set(src, job);
  job.then(clearInFlight, clearInFlight);

  return job;
};

/** Drops one track from the cache (used by the per-track button). Waits for an in-flight download so a late put can't resurrect a `cached` state. */
export const cmComAudioPlayerUncacheSrc = async (src: CmAudioSrc, comName: string) => {
  await inFlightCacheJobs.get(src)?.catch(emptyFunc);

  let removedBytes = 0;
  try {
    const cache = await caches.open(cmComAudioPlayerCacheName);
    removedBytes = await takeCmComAudioPlayerSrcsBytes(cache, [src]);
    await Promise.all(takeCmComAudioPlayerCacheUrls(src).map(url => cache.delete(url)));
  } catch (error) {
    console.error('[cm audio cache]', src, error);
  } finally {
    clearCmComAudioPlayerSrcStates([src]);
    deleteCmComAudioPlayerCachedSrcs([src]);
  }

  if (removedBytes) {
    await showCmComAudioPlayerCacheSizeToast(
      removedBytes,
      comName,
      BaseLocaleKey.CmAudioUncachedNoQuota,
      BaseLocaleKey.CmAudioUncached,
    );
  }
};

/** Drops a com's tracks from the cache (used by the bulk cache/uncache control). */
export const cmComAudioPlayerUncacheCom = async (comw: CmComWid) => {
  try {
    const com = await cmIDB.tb.coms.get(comw);
    if (!com?.al?.length) return;

    const srcs = com.al;

    await Promise.all(srcs.map(src => inFlightCacheJobs.get(src)?.catch(emptyFunc)));

    const cache = await caches.open(cmComAudioPlayerCacheName);
    const removedBytes = await takeCmComAudioPlayerSrcsBytes(cache, srcs);
    await Promise.all(
      srcs.flatMap(src => takeCmComAudioPlayerCacheUrls(src).map(url => cache.delete(url))),
    );
    clearCmComAudioPlayerSrcStates(srcs);
    deleteCmComAudioPlayerCachedSrcs(srcs);

    if (removedBytes) {
      await showCmComAudioPlayerCacheSizeToast(
        removedBytes,
        com.n,
        BaseLocaleKey.CmAudioUncachedNoQuota,
        BaseLocaleKey.CmAudioUncached,
      );
    }
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
export const useCmComAudioPlayerComCacheState = (srcs: CmAudioSrc[] | nil): CmComAudioPlayerCacheState => {
  const states = useAtomValue(cmComAudioPlayerSrcStatesAtom);

  useEffect(() => {
    srcs?.forEach(hydrateCmComAudioPlayerSrc);
  }, [srcs]);

  const cachedCount =
    srcs?.reduce((count, src) => count + (states[src] === CmComAudioPlayerSrcState.Cached ? 1 : 0), 0) ?? 0;

  if (!srcs?.length || !cachedCount) return CmComAudioPlayerCacheState.None;

  return cachedCount === srcs.length ? CmComAudioPlayerCacheState.All : CmComAudioPlayerCacheState.Some;
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
