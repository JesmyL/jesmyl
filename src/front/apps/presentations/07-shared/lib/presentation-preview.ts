import { electronPresentationsTsjrpcClientMethods } from '#basis/tsjrpc.electron/presentations.cli.methods';
import { PresentationSlide, presentationsTool } from '$presentations/shared/model/model';
import { useEffect, useState } from 'react';

const maxCachedPresentationPreviews = 12;

/** Tile thumbnails are disposable — an LRU keyed by path + size keeps replaced files from showing a stale slide. */
const presentationPreviewCache = new Map<string, PresentationSlide | nil>();

const takePreviewCacheKey = (filePath: string, size: number) => `${filePath}:${size}`;

export const takeCachedPresentationPreview = (filePath: string, size: number) =>
  presentationPreviewCache.get(takePreviewCacheKey(filePath, size));

const cachePresentationPreview = (cacheKey: string, slide: PresentationSlide | nil) => {
  if (presentationPreviewCache.size >= maxCachedPresentationPreviews) {
    const oldestKey = presentationPreviewCache.keys().next().value;
    if (oldestKey) presentationPreviewCache.delete(oldestKey);
  }

  presentationPreviewCache.set(cacheKey, slide);
};

export const readPresentationPreview = async (filePath: string, size: number): Promise<PresentationSlide | nil> => {
  const cacheKey = takePreviewCacheKey(filePath, size);
  if (presentationPreviewCache.has(cacheKey)) return presentationPreviewCache.get(cacheKey);

  const slide = await electronPresentationsTsjrpcClientMethods.getPresentationPreview({ filePath }, presentationsTool);
  cachePresentationPreview(cacheKey, slide);

  return slide;
};

export const usePresentationPreview = (filePath: string, size: number) => {
  const [slide, setSlide] = useState<PresentationSlide | nil>(() =>
    takeCachedPresentationPreview(filePath, size),
  );

  useEffect(() => {
    let isActive = true;

    readPresentationPreview(filePath, size)
      .then(next => {
        if (isActive) setSlide(next);
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [filePath, size]);

  return filePath ? slide : undefined;
};
