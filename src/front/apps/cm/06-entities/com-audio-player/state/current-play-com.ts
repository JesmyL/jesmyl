import { translateBase } from '#basis/locale';
import { addEventListenerPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { atom, useAtomValue } from 'atomaric';
import { CmAudioSrc } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { retNull } from 'shared/utils';
import { toast } from 'sonner';
import {
  cmComAudioPlayerAddCachedSrc,
  cmComAudioPlayerCachedSrcsAtom,
  takeCmComAudioPlayerCachedBlob,
  takeCmComAudioPlayerTrackUrl,
} from '../lib/audioCache';

const audioElement = document.createElement('audio');

// preload='auto' запускает буферизацию сразу при установке src (уже в момент выбора трека),
// поэтому к нажатию play сеть и буфер уже частично готовы и звук стартует без задержки
audioElement.preload = 'auto';
// preload-ошибка (трек не закэширован, а сети нет) до нажатия play молчит: пользователь ещё не просил воспроизведение.
// Тост показываем, только когда play был намерен — тогда ошибка действительно важна для пользователя.
audioElement.addEventListener('error', () => {
  if (cmComAudioPlayerBlobPendingApplyId === cmComAudioPlayerSrcApplyId) return;
  if (!cmComAudioPlayerIsPlayAtom.get()) return;

  toast(
    translateBase(BaseLocaleKey.CmAudioPlaybackError),
    makeToastKOMoodConfig(),
  );
});

const comPlayerDurationAtom = atom(0.01);
const comPlayerCurrentTimeAtom = atom(0);

export const cmComAudioPlayerPlaySrcAtom = atom<CmAudioSrc | null>(null);
export const cmComAudioPlayerEndedTickAtom = atom(false);
export const cmComAudioPlayerErrorTickAtom = atom(false);
export const cmComAudioPlayerIsPlayAtom = atom(false);
export const cmComAudioPlayerIsSrcLoadingAtom = atom(false);

/** Resolvable track title shown on the media session (lock screen); falls back to a title derived from the play src. */
export const cmComAudioPlayerMediaTitleAtom = atom<string | nil>(null);

export const useCmComAudioPlayerDuration = () => useAtomValue(comPlayerDurationAtom);
export const useCmComAudioPlayerCurrentTime = () => useAtomValue(comPlayerCurrentTimeAtom);

cmComAudioPlayerEndedTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerEndedTickAtom.set, 0, false);
});

cmComAudioPlayerErrorTickAtom.subscribe(isEnd => {
  if (isEnd) setTimeout(cmComAudioPlayerErrorTickAtom.set, 0, false);
});

// audio listeners

audioElement.addEventListener('durationchange', () => {
  comPlayerDurationAtom.set(audioElement.duration);
});

audioElement.addEventListener('ended', () => {
  cmComAudioPlayerUpdateCurrentTime(0);
  cmComAudioPlayerIsPlayAtom.set(false);

  cmComAudioPlayerEndedTickAtom.set(true);
});

audioElement.addEventListener('canplay', () => cmComAudioPlayerIsSrcLoadingAtom.set(false));
audioElement.addEventListener('playing', () => cmComAudioPlayerIsSrcLoadingAtom.set(false));
audioElement.addEventListener('waiting', () => {
  if (cmComAudioPlayerIsPlayAtom.get()) cmComAudioPlayerIsSrcLoadingAtom.set(true);
});
audioElement.addEventListener('pause', () => {
  if (!isCmComAudioPlayerSrcApplying) cmComAudioPlayerIsSrcLoadingAtom.set(false);
});

audioElement.addEventListener('error', () => {
  if (cmComAudioPlayerBlobPendingApplyId === cmComAudioPlayerSrcApplyId) return;

  cmComAudioPlayerIsSrcLoadingAtom.set(false);

  // тик ошибки поднимает авто-переход (adjacent-coms), поэтому preload-ошибка до play его не запускает:
  // тик ставим только если play был намерен
  if (!cmComAudioPlayerIsPlayAtom.get()) return;

  cmComAudioPlayerErrorTickAtom.set(true);
});

audioElement.addEventListener('timeupdate', () => {
  comPlayerCurrentTimeAtom.set(audioElement.currentTime);
});

// methods

/**
 * `timeupdate` only fires during playback and lags a seek by a task, so the atom would stay stale
 * (or never move while paused) unless a seek updates it synchronously too.
 */
export const cmComAudioPlayerUpdateCurrentTime = (time: number) => {
  if (isCmComAudioPlayerSrcApplying) {
    cmComAudioPlayerPendingSeekTime = time;
    comPlayerCurrentTimeAtom.set(time);
    return;
  }

  audioElement.currentTime = time;
  comPlayerCurrentTimeAtom.set(time);
};
export const takeCmComAudioPlayerCurrentTime = () => audioElement.currentTime;
export const takeCmComAudioPlayerDuration = () => audioElement.duration;
export const takeCmComAudioPlayerPlaybackRate = () => audioElement.playbackRate;

export const cmComAudioPlayerUpdatePlaybackRate = (playbackRate: number) => {
  audioElement.playbackRate = playbackRate;
};

export const cmComAudioPlayerAddEventListenerPipe = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Listener extends typeof addEventListenerPipe<HTMLAudioElement, any, any>,
>(
  eventName: Parameters<Listener>[1],
  callback: Parameters<Listener>[2],
) => {
  return addEventListenerPipe(audioElement, eventName, callback);
};

export const cmComAudioPlayerGetSrc = () => cmComAudioPlayerPlaySrcAtom.get();
export const cmComAudioPlayerSetMediaTitle = (title: string | nil) => cmComAudioPlayerMediaTitleAtom.set(title);

let trackObjectUrl: string | nil = null;
let isCmComAudioPlayerSrcApplying = false;
let cmComAudioPlayerPendingSeekTime: number | nil = null;
/** Monotonic id of the latest `cmComAudioPlayerSetSrc` call; a slower in-flight apply with an older id must not win. */
let cmComAudioPlayerSrcApplyId = 0;
let cmComAudioPlayerBlobPendingApplyId: number | null = null;

const revokeCmComAudioPlayerTrackUrl = () => {
  if (!trackObjectUrl) return;

  URL.revokeObjectURL(trackObjectUrl);
  trackObjectUrl = null;
};

const isPlayAbortError = (error: unknown) =>
  typeof error === 'object' && error != null && 'name' in error && error.name === 'AbortError';

/**
 * Известный закэшированный трек играется сразу из локального blob — без ожидания сети и без долгого спиннера
 * на кнопке play. Неизвестный трек стартует сразу с сетевого URL (service worker отдаёт /track/ по CacheFirst),
 * а фоновая проверка кэша подменяет src на blob, пока звук ещё не начался (currentTime === 0), не перебивая уже
 * играющий поток. Устаревший apply (id не совпал) отбрасываем, чтобы не перебить более новый выбор. В сетевом
 * пути, пока проверка кэша в полёте, оба error-листенера молчат: исход ошибки (тик и тост) сообщит её колбэк.
 */
const applyCmComAudioPlayerSrc = (src: CmAudioSrc, applyId: number) => {
  revokeCmComAudioPlayerTrackUrl();

  const finishApply = () => {
    if (cmComAudioPlayerPendingSeekTime != null) {
      audioElement.currentTime = cmComAudioPlayerPendingSeekTime;
      cmComAudioPlayerPendingSeekTime = null;
    }

    isCmComAudioPlayerSrcApplying = false;
    if (cmComAudioPlayerIsPlayAtom.get())
      void audioElement.play().catch(playError => {
        if (isPlayAbortError(playError)) return;

        cmComAudioPlayerIsPlayAtom.set(false);
        if (!isCmComAudioPlayerSrcApplying) cmComAudioPlayerIsSrcLoadingAtom.set(false);
      });
  };

  if (cmComAudioPlayerCachedSrcsAtom.get().has(src)) {
    void takeCmComAudioPlayerCachedBlob(src)
      .catch(retNull)
      .then(blob => {
        if (applyId !== cmComAudioPlayerSrcApplyId) return;

        if (blob?.size) {
          trackObjectUrl = URL.createObjectURL(blob);
          audioElement.src = trackObjectUrl;
        } else {
          audioElement.src = takeCmComAudioPlayerTrackUrl(src);
        }

        finishApply();
      });

    return;
  }

  audioElement.src = takeCmComAudioPlayerTrackUrl(src);

  finishApply();

  cmComAudioPlayerBlobPendingApplyId = applyId;
  void takeCmComAudioPlayerCachedBlob(src)
    .catch(retNull)
    .then(blob => {
      if (cmComAudioPlayerBlobPendingApplyId === applyId) cmComAudioPlayerBlobPendingApplyId = null;
      if (applyId !== cmComAudioPlayerSrcApplyId) return;

      if (blob?.size && !audioElement.error && audioElement.currentTime === 0) {
        cmComAudioPlayerAddCachedSrc(src);
        revokeCmComAudioPlayerTrackUrl();
        trackObjectUrl = URL.createObjectURL(blob);
        audioElement.src = trackObjectUrl;
        finishApply();

        return;
      }

      if (!audioElement.error) return;

      cmComAudioPlayerIsSrcLoadingAtom.set(false);

      if (!cmComAudioPlayerIsPlayAtom.get()) return;

      cmComAudioPlayerErrorTickAtom.set(true);
      toast(
        translateBase(BaseLocaleKey.CmAudioPlaybackError),
        makeToastKOMoodConfig(),
      );
    });
};

export const cmComAudioPlayerSetSrc = (src: CmAudioSrc | null) => {
  if (cmComAudioPlayerPlaySrcAtom.get() === src) return;

  cmComAudioPlayerUpdateCurrentTime(0);
  cmComAudioPlayerSwitchIsPlay(false);
  cmComAudioPlayerPlaySrcAtom.set(src);
  cmComAudioPlayerSetMediaTitle(null);
  revokeCmComAudioPlayerTrackUrl();

  const applyId = ++cmComAudioPlayerSrcApplyId;

  if (src == null) {
    isCmComAudioPlayerSrcApplying = false;
    cmComAudioPlayerIsSrcLoadingAtom.set(false);
    audioElement.removeAttribute('src');
    return;
  }

  isCmComAudioPlayerSrcApplying = true;
  cmComAudioPlayerIsSrcLoadingAtom.set(true);
  applyCmComAudioPlayerSrc(src, applyId);
};

export const cmComAudioPlayerSwitchIsPlay = (isPlay: boolean = audioElement.paused) => {
  if (audioElement.paused ? !isPlay : isPlay) return;

  cmComAudioPlayerIsPlayAtom.set(isPlay);

  if (!isPlay) {
    audioElement.pause();
    return;
  }

  if (isCmComAudioPlayerSrcApplying) return;

  // play после preload-ошибки: элемент уже в состоянии ошибки, поэтому прямой play() сразу бы упал.
  // Перезапускаем загрузку src тем же путём, что и SetSrc; apply сам возобновит play (isPlayAtom уже true),
  // а если ошибка повторится — она прозвучит громко, потому что play теперь намерен.
  if (audioElement.error) {
    const src = cmComAudioPlayerPlaySrcAtom.get();
    if (src == null) return;

    isCmComAudioPlayerSrcApplying = true;
    cmComAudioPlayerIsSrcLoadingAtom.set(true);
    applyCmComAudioPlayerSrc(src, ++cmComAudioPlayerSrcApplyId);
    return;
  }

  audioElement.play().catch(playError => {
    if (isPlayAbortError(playError)) return;

    cmComAudioPlayerIsPlayAtom.set(false);
    if (!isCmComAudioPlayerSrcApplying) cmComAudioPlayerIsSrcLoadingAtom.set(false);
  });
};
