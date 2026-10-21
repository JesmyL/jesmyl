/**
 * Browser Cache Storage bucket for the rights-gated CmRedactor chunks.
 * Keep in sync with the `cm-editor-cache` runtimeCaching entry in vite-pwa.options.ts.
 */
export const cmEditorCacheName = 'cm-editor-cache';

/** Editor chunks are built with this `assets/` prefix (see chunkFileNames in vite.config.ts). */
const cmEditorChunkUrlMarker = '/assets/cm-edit-';

let purgeJob: Promise<void> = Promise.resolve();

/** Drops editor keys from an unrelated bucket, e.g. `cm-edit-` chunks precached by an older service-worker version. */
const purgeCmEditorChunkEntries = async (cacheName: string) => {
  const cache = await caches.open(cacheName);
  const editorRequests = (await cache.keys()).filter(({ url }) => url.includes(cmEditorChunkUrlMarker));

  await Promise.all(editorRequests.map(request => cache.delete(request)));
};

/**
 * Wipes every cached editor asset a non-editor must not keep: the whole rights-gated bucket
 * (the service worker recreates it on demand) plus `cm-edit-` leftovers in other buckets.
 */
const takeCmEditorCachePurged = async () => {
  if (typeof caches === 'undefined') return;

  await Promise.all(
    (await caches.keys()).map(cacheName =>
      cacheName === cmEditorCacheName ? caches.delete(cacheName) : purgeCmEditorChunkEntries(cacheName),
    ),
  );
};

/**
 * Serialized purge: every call queues a fresh pass behind the previous one (a failed pass still lets the queue continue),
 * so a rapid revoke → grant → revoke never reuses a snapshot taken before the grant repopulated the caches.
 */
export const purgeCmEditorCache = (): Promise<void> =>
  (purgeJob = purgeJob.then(takeCmEditorCachePurged, takeCmEditorCachePurged));
