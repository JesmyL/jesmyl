import { currentLangiAtom } from '#basis/locale';
import { remoteManualAppAtom, resetRemoteManualApp } from '#features/broadcast/remote/app-switch-intent';
import { useRemoteBroadcastTranslate } from '#features/broadcast/remote/locale';
import {
  RemoteBroadcastBibleStep,
  RemoteBroadcastSearchScope,
  remoteBibleSearchMinTermLength,
  remoteDeviceNameAtom,
} from '#features/broadcast/remote/model';
import {
  remoteLocaleAtom,
  requestRemoteLocalesIfStale,
  useTranslateRemote,
} from '#features/broadcast/remote/remote-locale';
import { Button } from '#shared/components/ui/button';
import { DropdownMenu } from '#shared/components/ui/dropdown-menu';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { makeToastKOMoodConfig, makeToastOKMoodConfig, usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtomSet, useAtomValue } from 'atomaric';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { hostConfig } from 'shared/api';
import {
  RemoteBroadcastApp,
  RemoteBroadcastBibleJoinAddress,
  RemoteBroadcastBibleSearchMatch,
  RemoteBroadcastComListKind,
  RemoteBroadcastCommand,
  RemoteBroadcastErrorKind,
  RemoteBroadcastSnapshot,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import {
  remoteBroadcastAskNameSearchParam,
  remoteBroadcastSearchTermMaxLength,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserIdentityFieldMaxLength,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { BroadcastLiveApp } from 'shared/model/index/Index.model';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import { arrayByLength } from 'shared/utils/object.utils';
import { jversion } from 'shared/values';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { isRemoteBibleVerseSearchMatched, makeRemoteBibleWordRegs } from './bible-search';
import { closeRemoteBroadcastConnection, takeRemoteBroadcastConnection } from './connection';
import { parseScannedRemoteControlScreen } from './control-link';

const panelClassName = 'rounded-md p-2 flex column gap-2 w-full custom-align-items flex-1 min-h-0';
const itemButtonClassName = 'pointer rounded-sm bg-x1 text-x3 px-2 py-1 text-left text-sm shrink-0 break-word';
const itemTextLineHeight = '1.25rem';
const itemVerticalPadding = '.25rem';
const itemMinHeightStyle = {
  lineHeight: itemTextLineHeight,
  minHeight: `calc(2 * ${itemTextLineHeight} + 2 * ${itemVerticalPadding})`,
} as const;
const activeItemButtonClassName = 'bg-x7 text-x1';
const activeTranslationItemClassName = `${activeItemButtonClassName} opacity-100!`;
const gridCellClassName = 'pointer relative flex center rounded-sm bg-x2 text-x3 px-1 py-2 text-sm';
const verseSideIconButtonClassName = 'bg-x2! text-x3! border-0 shadow-none';
const verseSideActiveIconButtonClassName = 'bg-x3! text-x1! border-0 shadow-none';

const bibleVersePageSize = 20;
const bibleVerseBlockSize = 10;
const remoteBibleLongPressDelay = 450;
const remoteBibleLongPressMoveTolerance = 24;

const isRemoteBibleJoinModeAtom = atom(false);
const isRemoteConnectQrOpenAtom = atom(false);
const noRemoteBibleJoinVerseis: number[] = [];
let unreachableRemoteTarget: string | nil = null;

const makeJoinAddressChapterPatch = (
  booki: number,
  chapteri: number,
  verseis: number[],
): RemoteBroadcastBibleJoinAddress => ({ [booki]: { [chapteri]: verseis } });

const cmListKindConfig = {
  [RemoteBroadcastComListKind.All]: {
    icon: 'LeftToRightListBullet',
    iconKind: 'TwotoneRounded',
    localeKey: BaseLocaleKey.CmListsAll,
  },
  [RemoteBroadcastComListKind.Fav]: {
    icon: 'Favourite',
    iconKind: 'DuotoneRounded',
    localeKey: BaseLocaleKey.Favorite,
  },
  [RemoteBroadcastComListKind.Sel]: {
    icon: 'CheckmarkBadge01',
    iconKind: 'DuotoneRounded',
    localeKey: BaseLocaleKey.Selected,
  },
  [RemoteBroadcastComListKind.Cached]: {
    icon: 'CloudDownload',
    iconKind: 'TwotoneRounded',
    localeKey: BaseLocaleKey.Cached,
  },
} as const;

const cmListKinds = [
  RemoteBroadcastComListKind.All,
  RemoteBroadcastComListKind.Fav,
  RemoteBroadcastComListKind.Sel,
  RemoteBroadcastComListKind.Cached,
] as const;

const remoteAppTitleByApp: Record<
  BroadcastLiveApp,
  BaseLocaleKey.CmApp | BaseLocaleKey.Bible | BaseLocaleKey.Presentations
> = {
  cm: BaseLocaleKey.CmApp,
  bible: BaseLocaleKey.Bible,
  presentations: BaseLocaleKey.Presentations,
};

type RemoteBibleVerseItem = { versei: number; html: string };

const RemoteBibleVerseList = ({
  verses,
  activeVersei,
  isJoinMode,
  joinVerseis,
  onCommand,
  onJoinVerse,
  onJoinVerseRange,
  onToggleJoinMode,
}: {
  verses: RemoteBibleVerseItem[];
  activeVersei: number;
  isJoinMode: boolean;
  joinVerseis: number[];
  onCommand: (command: RemoteBroadcastCommand) => void;
  onJoinVerse: (versei: number) => void;
  onJoinVerseRange: (versei: number) => void;
  onToggleJoinMode: () => void;
}) => {
  const activeVerseRef = useRef<HTMLLIElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const hasAutoScrolledRef = useRef(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | nil>(null);
  const longPressStartPointRef = useRef<{ x: number; y: number } | nil>(null);
  const isClickAfterLongPressRef = useRef(false);
  const onJoinVerseRangeRef = useActualRef(onJoinVerseRange);

  const cancelLongPress = useCallback(() => {
    if (longPressTimeoutRef.current == null) return;

    clearTimeout(longPressTimeoutRef.current);
    longPressTimeoutRef.current = null;
  }, []);

  const beginLongPress = (x: number, y: number, versei: number) => {
    cancelLongPress();
    isClickAfterLongPressRef.current = false;
    longPressStartPointRef.current = { x, y };
    longPressTimeoutRef.current = setTimeout(() => {
      longPressTimeoutRef.current = null;
      isClickAfterLongPressRef.current = true;

      onJoinVerseRangeRef.current(versei);

      navigator.vibrate?.(10);
    }, remoteBibleLongPressDelay);
  };

  const moveLongPress = (x: number, y: number) => {
    const startPoint = longPressStartPointRef.current;
    if (startPoint == null || longPressTimeoutRef.current == null) return;

    if (Math.hypot(x - startPoint.x, y - startPoint.y) > remoteBibleLongPressMoveTolerance) cancelLongPress();
  };

  const finishLongPress = () => {
    longPressStartPointRef.current = null;
    cancelLongPress();
  };

  useEffect(() => cancelLongPress, [cancelLongPress]);

  const clickVerse = (versei: number) => {
    if (isClickAfterLongPressRef.current) {
      isClickAfterLongPressRef.current = false;
      return;
    }

    if (!isJoinMode) {
      onCommand({ bible: { versei } });
      return;
    }

    onJoinVerse(versei);
  };

  const syncScrollEdges = useCallback(() => {
    const list = listRef.current;
    if (list == null) return;

    setCanScrollUp(list.scrollTop > 1);
    setCanScrollDown(list.scrollTop + list.clientHeight < list.scrollHeight - 1);
  }, []);

  useEffect(() => {
    syncScrollEdges();
  }, [verses, syncScrollEdges]);

  useEffect(() => {
    const activeVerseNode = activeVerseRef.current;
    if (activeVerseNode == null) return;

    if (hasAutoScrolledRef.current) {
      const list = listRef.current;
      if (list != null) {
        const listRect = list.getBoundingClientRect();
        const verseRect = activeVerseNode.getBoundingClientRect();
        if (verseRect.top >= listRect.top && verseRect.bottom <= listRect.bottom) return;
      }
    }

    hasAutoScrolledRef.current = true;
    activeVerseNode.scrollIntoView({ block: 'center' });
    syncScrollEdges();
  }, [activeVersei, verses, syncScrollEdges]);

  const jumpToVersePage = (direction: -1 | 1) => {
    const list = listRef.current;
    if (list == null) return;

    const items = Array.from(list.children) as HTMLElement[];
    if (items.length === 0) return;

    const listTop = list.getBoundingClientRect().top;
    const topIndex = items.findIndex(item => item.getBoundingClientRect().bottom > listTop);
    const baseIndex = topIndex < 0 ? items.length - 1 : topIndex;
    const currentPage = Math.floor(baseIndex / bibleVersePageSize);
    const lastPage = Math.floor((items.length - 1) / bibleVersePageSize);
    const targetIndex =
      direction > 0
        ? currentPage >= lastPage
          ? items.length - 1
          : (currentPage + 1) * bibleVersePageSize
        : currentPage === 0
          ? 0
          : (currentPage - 1) * bibleVersePageSize;
    const targetItem = items[targetIndex];
    if (targetItem == null) return;

    list.scrollBy({
      top: targetItem.getBoundingClientRect().top - listTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative flex flex-1 min-h-0 w-full custom-align-items">
      <ol
        ref={listRef}
        onScroll={() => {
          syncScrollEdges();
          cancelLongPress();
        }}
        className="list-none flex-1 min-h-0 overflow-y-auto flex column gap-1 -ml-2 pr-10 custom-align-items"
      >
        {verses.map(verse => {
          const isTintedBlock = Math.floor(verse.versei / bibleVerseBlockSize) % 2 === 1;
          const isActive = verse.versei === activeVersei;
          const isJoined = joinVerseis.includes(verse.versei);

          return (
            <li
              key={verse.versei}
              ref={isActive ? activeVerseRef : null}
              style={itemMinHeightStyle}
              className={twMerge(
                itemButtonClassName,
                isTintedBlock && 'bg-x3/30',
                isActive && 'bg-x2',
                isJoined && activeItemButtonClassName,
                'select-none touch-pan-y [-webkit-touch-callout:none]',
              )}
              onPointerDown={event => {
                if (event.pointerType === 'touch' || event.button !== 0) return;

                beginLongPress(event.clientX, event.clientY, verse.versei);
              }}
              onPointerMove={event => {
                if (event.pointerType !== 'touch') moveLongPress(event.clientX, event.clientY);
              }}
              onPointerUp={event => {
                if (event.pointerType !== 'touch') finishLongPress();
              }}
              onPointerLeave={event => {
                if (event.pointerType !== 'touch') finishLongPress();
              }}
              onTouchStart={event => {
                const touch = event.touches[0];
                if (touch != null) beginLongPress(touch.clientX, touch.clientY, verse.versei);
              }}
              onTouchMove={event => {
                const touch = event.touches[0];
                if (touch != null) moveLongPress(touch.clientX, touch.clientY);
              }}
              onTouchEnd={finishLongPress}
              onContextMenu={event => event.preventDefault()}
              onClick={() => clickVerse(verse.versei)}
            >
              <span className="opacity-50 mr-1">{verse.versei + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: verse.html }} />
            </li>
          );
        })}
      </ol>

      <div className="absolute right-0 inset-y-0 z-10 flex column items-center">
        <div className="flex-1 flex column justify-center items-center gap-1 pointer-events-auto">
          {(canScrollUp || canScrollDown || verses.length > bibleVersePageSize) && (
            <>
              <TheIconButton
                icon="ArrowUp01"
                iconClassName={verseSideIconButtonClassName}
                onClick={() => jumpToVersePage(-1)}
              />
              <TheIconButton
                icon="ArrowDown01"
                iconClassName={verseSideIconButtonClassName}
                onClick={() => jumpToVersePage(1)}
              />
            </>
          )}
        </div>

        <div className="relative pointer-events-auto shrink-0">
          <TheIconButton
            icon="PlayListAdd"
            iconClassName={isJoinMode ? verseSideActiveIconButtonClassName : verseSideIconButtonClassName}
            onClick={onToggleJoinMode}
          />

          {!joinVerseis.length || (
            <span className="pointer-events-none absolute -top-1 -left-1 flex center min-w-4 h-4 rounded-full bg-x7 text-x1 text-[.625rem] leading-none">
              {joinVerseis.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const RemoteBroadcastPage = ({
  remote,
  viaQr,
  fromList,
  userName,
  askName,
  appName,
  onTargetUnreachable,
}: {
  remote?: string | nil;
  viaQr?: boolean;
  fromList?: string | nil;
  userName?: string | nil;
  askName?: string;
  appName?: RemoteBroadcastApp;
  onTargetUnreachable?: () => void;
}) => (
  <RemoteBroadcastRemote
    target={remote ?? null}
    viaQr={viaQr === true}
    fromList={fromList}
    userName={userName}
    askName={askName}
    appName={appName}
    onTargetUnreachable={onTargetUnreachable}
  />
);

const RemoteBroadcastRemote = ({
  target,
  viaQr,
  fromList,
  userName,
  askName,
  appName,
  onTargetUnreachable,
}: {
  target?: string | nil;
  viaQr: boolean;
  fromList?: string | nil;
  userName?: string | nil;
  askName?: string;
  appName?: RemoteBroadcastApp;
  onTargetUnreachable?: () => void;
}) => {
  const t = useRemoteBroadcastTranslate();
  const tRemote = useTranslateRemote();
  const isAskName = askName === '1';
  const connection = takeRemoteBroadcastConnection(
    target,
    isAskName || userName == null ? null : fromList,
    isAskName ? '' : (userName ?? null),
  );
  const {
    snapshot,
    isConnected,
    isBanned,
    isNotFound,
    isNoTranslation,
    isNameRequired,
    error,
    serverVersion,
    hasJesmylToken,
  } = useSyncExternalStore(connection.subscribe, connection.readState);

  const isVersionToastShownRef = useRef(false);

  useEffect(() => {
    if (serverVersion == null || serverVersion === jversion.num || isVersionToastShownRef.current) return;

    isVersionToastShownRef.current = true;

    toast(tRemote(RemoteLocaleKey.NewPultVersionAvailable), {
      ...makeToastKOMoodConfig(),
      duration: Infinity,
      action: { label: t(BaseLocaleKey.Update), onClick: () => location.reload() },
    });
  }, [serverVersion, t, tRemote]);

  const manualApp = useAtomValue(remoteManualAppAtom);
  const setManualApp = useAtomSet(remoteManualAppAtom);
  const previousTargetRef = useRef(target);

  useEffect(() => {
    const previousTarget = previousTargetRef.current;
    previousTargetRef.current = target;

    if (previousTarget === target) return;

    closeRemoteBroadcastConnection(previousTarget);
    resetRemoteManualApp();
  }, [target]);

  const navigate = useNavigate();
  const langi = useAtomValue(currentLangiAtom);
  const remoteLocaleStore = useAtomValue(remoteLocaleAtom);
  const isRemoteLocaleReady = remoteLocaleStore.byLangi[langi]?.[RemoteLocaleKey.PresentYourself] != null;
  const prompt = usePrompt();
  const namePromptRunRef = useRef(false);
  const [isNamePromptDismissed, setIsNamePromptDismissed] = useState(false);
  const [namePromptRequesti, setNamePromptRequesti] = useState(0);

  useEffect(() => {
    void requestRemoteLocalesIfStale();
  }, [langi]);

  useEffect(() => {
    if (!isAskName || snapshot == null) return;

    navigate({ to: '/remote/cm', replace: true, search: {} });
  }, [isAskName, navigate, snapshot]);

  useEffect(() => {
    if (!isNameRequired) {
      namePromptRunRef.current = false;
      setIsNamePromptDismissed(false);
      return;
    }

    if (isNamePromptDismissed || !isConnected || !isRemoteLocaleReady || namePromptRunRef.current) return;

    namePromptRunRef.current = true;

    void (async () => {
      const name = await prompt(tRemote(RemoteLocaleKey.PresentYourself), undefined, remoteDeviceNameAtom.get());
      const trimmedName = name?.trim().slice(0, remoteBroadcastUserIdentityFieldMaxLength);

      if (!trimmedName) {
        namePromptRunRef.current = false;
        setIsNamePromptDismissed(true);
        return;
      }

      remoteDeviceNameAtom.set(trimmedName);

      if (!connection.sendName(trimmedName)) {
        namePromptRunRef.current = false;
        setIsNamePromptDismissed(true);
        return;
      }

      connection.setNameOverride(trimmedName);
    })();
  }, [
    connection,
    isConnected,
    isNamePromptDismissed,
    isNameRequired,
    isRemoteLocaleReady,
    namePromptRequesti,
    prompt,
    tRemote,
  ]);

  const openNamePrompt = () => {
    namePromptRunRef.current = false;
    setIsNamePromptDismissed(false);
    setNamePromptRequesti(requesti => requesti + 1);
  };

  useEffect(() => {
    if (target != null && !isNoTranslation) {
      unreachableRemoteTarget = null;
      return;
    }

    if (target == null || !isNoTranslation || unreachableRemoteTarget === target) return;

    unreachableRemoteTarget = target;
    onTargetUnreachable?.();
  }, [target, isNoTranslation, onTargetUnreachable]);

  const selectScannedRemote = (value: string) => {
    const scanned = parseScannedRemoteControlScreen(value);
    if (scanned == null) return;

    isRemoteConnectQrOpenAtom.set(false);

    if (new URL(scanned.screenUrl).origin !== location.origin) {
      location.assign(
        `${scanned.screenUrl}${scanned.screenUrl.includes('?') ? '&' : '?'}${remoteBroadcastAskNameSearchParam}=1`,
      );
      return;
    }

    connection.setSecretCode(null);
    connection.setNameOverride('');
    connection.retry();
    navigate({ to: '/remote/cm', replace: true, search: { [remoteBroadcastAskNameSearchParam]: '1' } });
  };

  const retryConnect = () => connection.retry();

  const sendCommand = (command: RemoteBroadcastCommand) => connection.sendCommand(command);

  const wasConnectedRef = useRef(isConnected);

  useEffect(() => {
    const wasConnected = wasConnectedRef.current;
    wasConnectedRef.current = isConnected;

    if (!wasConnected || isConnected) return;

    resetRemoteManualApp();
  }, [isConnected]);

  const changeApp = (app: RemoteBroadcastApp) => {
    setManualApp(app);
    sendCommand({ app });
  };
  const toggleHide = () => {
    if (snapshot) sendCommand({ isHide: !snapshot.isHide });
  };
  const toggleInitialSlide = () => {
    if (snapshot) sendCommand({ isInitialSlide: !snapshot.isInitialSlide });
  };

  const isInvalidCode = error === RemoteBroadcastErrorKind.InvalidSecretCode;
  const statusText =
    isBanned || isInvalidCode
      ? tRemote(RemoteLocaleKey.Disconnected)
      : error === RemoteBroadcastErrorKind.PendingApproval
        ? tRemote(RemoteLocaleKey.PendingApproval)
        : !isConnected || !snapshot
          ? tRemote(RemoteLocaleKey.Reconnecting)
          : tRemote(RemoteLocaleKey.Connected);
  const errorText = isInvalidCode
    ? tRemote(RemoteLocaleKey.InvalidCode)
    : error === RemoteBroadcastErrorKind.NameRequired
      ? isNamePromptDismissed
        ? tRemote(RemoteLocaleKey.PresentYourself)
        : ''
      : error === RemoteBroadcastErrorKind.Banned
        ? tRemote(RemoteLocaleKey.Banned)
        : error === RemoteBroadcastErrorKind.PendingApproval
          ? tRemote(RemoteLocaleKey.PendingApproval)
          : error === RemoteBroadcastErrorKind.NoLanAddress
            ? tRemote(RemoteLocaleKey.NoLan)
            : error === RemoteBroadcastErrorKind.None
              ? ''
              : tRemote(RemoteLocaleKey.UnknownError);
  const isLoginRequired =
    error === RemoteBroadcastErrorKind.PendingApproval && !hasJesmylToken && location.hostname === hostConfig.host;
  const loginRequiredNode = !isLoginRequired ? null : (
    <div className="flex column center gap-2">
      <div className="text-sm">{tRemote(RemoteLocaleKey.LoginRequired)}</div>
      <Button onClick={() => location.assign('/auth')}>{tRemote(RemoteLocaleKey.Login)}</Button>
    </div>
  );
  const activeApp = manualApp ?? snapshot?.app ?? appName;

  useEffect(() => {
    if (appName == null || manualApp != null) return;
    if (activeApp === appName) return;
    if (activeApp !== 'cm' && activeApp !== 'bible') return;

    navigate({
      to: activeApp === 'bible' ? '/remote/bible' : '/remote/cm',
      replace: true,
      search: prev => ({
        ...(prev[remoteBroadcastSecretCodeSearchParam] == null
          ? {}
          : { [remoteBroadcastSecretCodeSearchParam]: prev[remoteBroadcastSecretCodeSearchParam] }),
        ...(prev[remoteBroadcastUserNameSearchParam] == null
          ? {}
          : { [remoteBroadcastUserNameSearchParam]: prev[remoteBroadcastUserNameSearchParam] }),
        ...(prev[remoteBroadcastAskNameSearchParam] == null
          ? {}
          : { [remoteBroadcastAskNameSearchParam]: prev[remoteBroadcastAskNameSearchParam] }),
      }),
    });
  }, [activeApp, appName, manualApp, navigate]);

  useEffect(() => {
    if (!viaQr || !isConnected || snapshot == null || appName == null) return;

    navigate({
      to: appName === 'bible' ? '/remote/bible' : '/remote/cm',
      replace: true,
      search: prev => ({
        ...(prev[remoteBroadcastSecretCodeSearchParam] == null
          ? {}
          : { [remoteBroadcastSecretCodeSearchParam]: prev[remoteBroadcastSecretCodeSearchParam] }),
        ...(prev[remoteBroadcastUserNameSearchParam] == null
          ? {}
          : { [remoteBroadcastUserNameSearchParam]: prev[remoteBroadcastUserNameSearchParam] }),
        ...(prev[remoteBroadcastAskNameSearchParam] == null
          ? {}
          : { [remoteBroadcastAskNameSearchParam]: prev[remoteBroadcastAskNameSearchParam] }),
      }),
    });
  }, [viaQr, isConnected, snapshot, appName, navigate]);
  const cm = activeApp === 'cm' ? (snapshot?.cm ?? null) : null;
  const bible = activeApp === 'bible' ? (snapshot?.bible ?? connection.readLastBible()) : null;
  const isReady = isConnected && snapshot != null;
  const isConnectionOnly = !isReady || error === RemoteBroadcastErrorKind.PendingApproval;
  const isContentEmpty = !cm && !bible;
  const isPanelRecoverable =
    snapshot != null && snapshot.app === activeApp && (activeApp === 'cm' || activeApp === 'bible') && isContentEmpty;

  useEffect(() => {
    if (!isPanelRecoverable) return;

    connection.requestPanelRecovery();
  }, [connection, isPanelRecoverable]);

  const connectionRow = (
    <div className="flex items-center gap-2 px-2">
      <span className={isConnected && snapshot ? 'text-xOK text-sm flex-1' : 'text-xKO text-sm flex-1'}>
        {statusText}
      </span>
      {isInvalidCode || isNameRequired || (
        <Button
          size="sm"
          onClick={retryConnect}
        >
          {tRemote(RemoteLocaleKey.Connect)}
        </Button>
      )}
      {!isNameRequired || (
        <Button
          size="sm"
          onClick={openNamePrompt}
        >
          {tRemote(RemoteLocaleKey.PresentYourself)}
        </Button>
      )}
      <Button
        size="sm"
        icon="QrCode"
        aria-label={t(BaseLocaleKey.ReadQR)}
        onClick={() => isRemoteConnectQrOpenAtom.set(true)}
      />
    </div>
  );

  const readyRows = appName == null && (
    <div className="flex gap-1 px-2">
      <Button
        size="sm"
        variant={activeApp === 'cm' ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => setManualApp('cm')}
      >
        {t(BaseLocaleKey.CmApp)}
      </Button>
      <Button
        size="sm"
        variant={activeApp === 'bible' ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => setManualApp('bible')}
      >
        {t(BaseLocaleKey.Bible)}
      </Button>
    </div>
  );

  const connectionOnlyNode = (
    <div className="flex column center gap-3 text-center">
      {!errorText || <div className="text-xKO text-sm">{errorText}</div>}
      {loginRequiredNode}
      {connectionRow}
    </div>
  );

  const noTranslationNode = (
    <div className="flex column center gap-3 text-center">
      <div className="flex column text-xKO text-sm">
        {target == null ? (
          <span>{tRemote(RemoteLocaleKey.NoTranslationNoTarget)}</span>
        ) : (
          <>
            <span>{tRemote(RemoteLocaleKey.NoTranslationLine1)}</span>
            <span>{target}</span>
            <span>{tRemote(RemoteLocaleKey.NoTranslationLine3)}</span>
          </>
        )}
      </div>
      <Button onClick={retryConnect}>{tRemote(RemoteLocaleKey.Connect)}</Button>
    </div>
  );

  const foreignAppRow =
    snapshot != null && activeApp !== snapshot.app && (activeApp === 'cm' || activeApp === 'bible') ? (
      <div className="flex items-center justify-center gap-2 px-2">
        <span className="text-sm">
          {tRemote(RemoteLocaleKey.OnScreenNow, { a: t(remoteAppTitleByApp[snapshot.app]) })}
        </span>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => changeApp(activeApp)}
        >
          {tRemote(RemoteLocaleKey.SwitchApp)}
        </Button>
      </div>
    ) : null;

  return (
    <>
      <PageContainerConfigurer
        className=""
        withoutBackButton
        headTitle={tRemote(RemoteLocaleKey.AppTitle)}
        head={
          <div className="flex items-center gap-1">
            {isConnected || snapshot == null || (
              <LazyIcon
                icon="Alert01"
                className="text-xKO"
              />
            )}
            {snapshot == null || (
              <TheIconButton
                icon={snapshot.isHide ? 'View' : 'ViewOff'}
                iconClassName="text-x3!"
                onClick={toggleHide}
              />
            )}
            {snapshot == null || (
              <TheIconButton
                icon="QrCode"
                kind={snapshot.isInitialSlide ? 'SolidRounded' : undefined}
                iconClassName="text-x3!"
                onClick={toggleInitialSlide}
              />
            )}
          </div>
        }
        contentClass={isConnectionOnly ? 'flex center p-0' : 'flex column gap-2 p-0 custom-align-items'}
        content={
          isNotFound || isNoTranslation ? (
            noTranslationNode
          ) : isConnectionOnly ? (
            connectionOnlyNode
          ) : (
            <>
              {!errorText || <div className="text-xKO text-sm px-2">{errorText}</div>}
              {loginRequiredNode}
              {readyRows}
              {foreignAppRow}

              {!cm || (
                <CmRemotePanel
                  cm={cm}
                  onCommand={sendCommand}
                />
              )}

              {!bible || (
                <BibleRemotePanel
                  bible={bible}
                  onCommand={sendCommand}
                />
              )}
            </>
          )
        }
      />

      <QrReader
        openAtom={isRemoteConnectQrOpenAtom}
        onReadData={selectScannedRemote}
      />
    </>
  );
};

const CmRemotePanel = ({
  cm,
  onCommand,
}: {
  cm: NonNullable<RemoteBroadcastSnapshot['cm']>;
  onCommand: (command: RemoteBroadcastCommand) => void;
}) => {
  const t = useRemoteBroadcastTranslate();
  const [listKind, setListKind] = useState(RemoteBroadcastComListKind.All);
  const noValue = t(BaseLocaleKey.NoValue);

  const comList = useMemo(() => {
    const lists = cm.lists;

    return listKind === RemoteBroadcastComListKind.Fav
      ? lists.fav
      : listKind === RemoteBroadcastComListKind.Sel
        ? lists.sel
        : listKind === RemoteBroadcastComListKind.Cached
          ? lists.cached
          : lists.all;
  }, [cm.lists, listKind]);

  const currentSlideRef = useRef<HTMLButtonElement | null>(null);
  const slidesListRef = useRef<HTMLDivElement | null>(null);
  const hasAutoScrolledRef = useRef(false);
  const previousComwRef = useRef(cm.comw);
  const previousSlideiRef = useRef(cm.slidei);

  useEffect(() => {
    const isComChanged = previousComwRef.current !== cm.comw;
    const isSlideChanged = previousSlideiRef.current !== cm.slidei;
    previousComwRef.current = cm.comw;
    previousSlideiRef.current = cm.slidei;

    if (isComChanged) {
      slidesListRef.current?.scrollTo({ top: 0 });
      hasAutoScrolledRef.current = true;
      return;
    }

    if (!hasAutoScrolledRef.current) {
      const currentSlideNode = currentSlideRef.current;
      if (currentSlideNode == null) return;

      hasAutoScrolledRef.current = true;
      currentSlideNode.scrollIntoView({ block: 'center' });
      return;
    }

    if (!isSlideChanged) return;

    currentSlideRef.current?.scrollIntoView({ block: 'nearest' });
  }, [cm.comw, cm.slidei, cm.slides]);

  return (
    <div className={panelClassName}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Dropdown
          id={listKind}
          onSelectId={setListKind}
          items={cmListKinds.map(kind => ({
            id: kind,
            title: (
              <LazyIcon
                icon={cmListKindConfig[kind].icon}
                kind={cmListKindConfig[kind].iconKind}
              />
            ),
          }))}
          renderItem={({ node, id }) => (
            <>
              {node}
              {t(cmListKindConfig[id].localeKey)}
            </>
          )}
          hiddenArrow
        />

        <Dropdown
          id={cm.comw}
          items={[] as { id: number; title: string }[]}
          triggerNode={() => (
            <Button
              asSpan
              size="sm"
              className="w-full min-w-0 justify-between"
            >
              <span className="min-w-0 truncate">{cm.comTitle || noValue}</span>
              <LazyIcon icon="ArrowDown01" />
            </Button>
          )}
          addContent={
            <div
              className="flex column custom-align-items gap-1 min-w-[70vw] max-h-[35vh] overflow-y-auto"
              onClick={event => event.stopPropagation()}
              onKeyDown={event => event.stopPropagation()}
            >
              {comList.map((com, orderi) => (
                <DropdownMenu.Item
                  key={com.comw}
                  style={itemMinHeightStyle}
                  className={`${itemButtonClassName} ${com.comw === cm.comw ? activeItemButtonClassName : ''}`}
                  onClick={() => onCommand({ cm: { comw: com.comw } })}
                >
                  <span className="opacity-50 mr-1">{orderi + 1}.</span>
                  {com.name || noValue}
                </DropdownMenu.Item>
              ))}
            </div>
          }
        />
      </div>

      <div
        ref={slidesListRef}
        className="grid grid-cols-1 content-start -mx-2 gap-1 flex-1 min-h-0 overflow-y-auto"
      >
        {cm.slides.map((slide, slidei) => (
          <button
            key={slidei}
            ref={slidei === cm.slidei ? currentSlideRef : undefined}
            className={twMerge(itemButtonClassName, slidei === cm.slidei && 'bg-x2')}
            onClick={() => onCommand({ cm: { slidei } })}
          >
            {slide ? (
              <div
                className="text-sm white-pre-wrap"
                {...makeCmComTextInnerHtmlProp(slide)}
              />
            ) : (
              t(BaseLocaleKey.CmEmptySlide)
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const BibleRemotePanel = ({
  bible,
  onCommand,
}: {
  bible: NonNullable<RemoteBroadcastSnapshot['bible']>;
  onCommand: (command: RemoteBroadcastCommand) => void;
}) => {
  const t = useRemoteBroadcastTranslate();
  const tRemote = useTranslateRemote();
  const [pickerStep, setPickerStep] = useState<RemoteBroadcastBibleStep | nil>(null);
  const [selectedBooki, setSelectedBooki] = useState(bible.booki);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchScope, setSearchScope] = useState(RemoteBroadcastSearchScope.Chapter);
  const searchInputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const lastSentSearchTermRef = useRef('');
  const onCommandRef = useActualRef(onCommand);
  const trimmedSearchTerm = searchTerm.trim();
  const debouncedSearchTerm = useDebounceValue(trimmedSearchTerm, 350);
  const noValue = t(BaseLocaleKey.NoValue);
  const translations = Array.isArray(bible.translations) ? bible.translations : [];

  useEffect(() => setSelectedBooki(bible.booki), [bible.booki]);

  useEffect(() => setSearchTerm(''), [bible.booki, bible.chapteri, bible.translationName]);

  useEffect(() => {
    if (searchScope !== RemoteBroadcastSearchScope.Bible || trimmedSearchTerm.length < remoteBibleSearchMinTermLength) {
      if (lastSentSearchTermRef.current === '') return;

      lastSentSearchTermRef.current = '';
      onCommandRef.current({ bible: { searchTerm: '' } });
      return;
    }

    if (debouncedSearchTerm !== trimmedSearchTerm) return;

    lastSentSearchTermRef.current = trimmedSearchTerm;
    onCommandRef.current({ bible: { searchTerm: trimmedSearchTerm } });
  }, [debouncedSearchTerm, onCommandRef, searchScope, trimmedSearchTerm]);

  const selectedChapterCount = selectedBooki === bible.booki ? bible.chapterCount : 0;
  const selectedBookTitle = bible.books[selectedBooki]?.short || noValue;

  const visibleVerses = useMemo<RemoteBibleVerseItem[]>(() => {
    const verses = bible.verses.map((html, versei) => ({ versei, html }));
    const term = searchTerm.trim();
    if (!term) return verses;

    const searchWords = makeRemoteBibleWordRegs(term);

    return verses.filter(verse => isRemoteBibleVerseSearchMatched(verse.html, searchWords));
  }, [bible.verses, searchTerm]);

  const isBibleSearchActive =
    searchScope === RemoteBroadcastSearchScope.Bible && searchTerm.trim().length >= remoteBibleSearchMinTermLength;

  const isJoinMode = useAtomValue(isRemoteBibleJoinModeAtom);
  const setIsJoinMode = useAtomSet(isRemoteBibleJoinModeAtom);
  const [joinVerseisMap, setJoinVerseisMap] = useState<PRecord<number, PRecord<number, number[]>>>(
    () => bible.joinAddress ?? {},
  );
  const joinVerseis = joinVerseisMap[bible.booki]?.[bible.chapteri] ?? noRemoteBibleJoinVerseis;

  useEffect(() => {
    setJoinVerseisMap(bible.joinAddress ?? {});
  }, [bible.joinAddress]);

  const setCurrentJoinVerseis = (verseis: number[]) => {
    setJoinVerseisMap(prev => ({
      ...prev,
      [bible.booki]: { ...prev[bible.booki], [bible.chapteri]: verseis },
    }));
  };

  const toggleJoinMode = () => {
    if (!isJoinMode) {
      setIsJoinMode(true);
      return;
    }

    setCurrentJoinVerseis([]);
    setIsJoinMode(false);

    if (joinVerseis.length) sendJoinSelection([]);
  };

  const sendJoinSelection = (verseis: number[]) => {
    const firstVersei = verseis.length ? Math.min(...verseis) : bible.versei;
    const lastVersei = verseis.length > 1 ? Math.max(...verseis) : firstVersei;

    onCommand({
      bible: {
        booki: bible.booki,
        chapteri: bible.chapteri,
        versei: firstVersei,
        finishVersei: lastVersei === firstVersei ? null : lastVersei,
        verseis,
        joinAddress: makeJoinAddressChapterPatch(bible.booki, bible.chapteri, verseis),
      },
    });
  };

  const joinVerse = (versei: number) => {
    const nextVerseis = joinVerseis.includes(versei)
      ? joinVerseis.filter(selectedVersei => selectedVersei !== versei)
      : [...joinVerseis, versei];

    setCurrentJoinVerseis(nextVerseis);
    sendJoinSelection(nextVerseis);
  };

  const joinVerseRange = (versei: number) => {
    setIsJoinMode(true);

    const lastVersei = joinVerseis.at(-1) ?? bible.versei;
    const step = versei < lastVersei ? -1 : 1;
    const nextVerseis = [...joinVerseis];

    for (let selectedVersei = lastVersei; selectedVersei !== versei; selectedVersei += step)
      if (!nextVerseis.includes(selectedVersei)) nextVerseis.push(selectedVersei);

    if (!nextVerseis.includes(versei)) nextVerseis.push(versei);

    setCurrentJoinVerseis(nextVerseis);
    sendJoinSelection(nextVerseis);
  };

  const toggleSearchScope = () => {
    const nextScope =
      searchScope === RemoteBroadcastSearchScope.Chapter
        ? RemoteBroadcastSearchScope.Bible
        : RemoteBroadcastSearchScope.Chapter;

    setSearchScope(nextScope);
    toast(
      nextScope === RemoteBroadcastSearchScope.Chapter
        ? t(BaseLocaleKey.BibleSearchChapter)
        : tRemote(RemoteLocaleKey.SearchByBible),
      makeToastOKMoodConfig(),
    );

    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const openBookPicker = () => {
    setSelectedBooki(bible.booki);
    setPickerStep(RemoteBroadcastBibleStep.Book);
  };

  const selectBook = (booki: number) => {
    setSelectedBooki(booki);
    onCommand({ bible: { booki } });
    setPickerStep(RemoteBroadcastBibleStep.Chapter);
  };

  const selectChapter = (chapteri: number) => {
    onCommand({ bible: { chapteri } });
    setPickerStep(null);
  };

  const selectSearchMatch = (match: RemoteBroadcastBibleSearchMatch) => {
    onCommand({
      bible: {
        booki: match.booki,
        chapteri: match.chapteri,
        versei: match.versei,
        finishVersei: null,
      },
    });
    setSearchTerm('');
    setJoinVerseisMap({});
  };

  return (
    <div className={panelClassName}>
      <div className="flex flex-row flex-wrap items-center gap-1 w-full shrink-0">
        <Button
          asSpan
          size="sm"
          className="min-w-0 max-w-[50%]"
          onClick={openBookPicker}
        >
          <span className="min-w-0 truncate">
            {bible.bookTitle || noValue} {bible.chapteri + 1}
          </span>
        </Button>

        {translations.length === 0 || (
          <Dropdown
            id={bible.translationName}
            onSelectId={tName => onCommand({ bible: { translationName: tName } })}
            items={translations.map(translation => ({
              id: translation.name,
              title: translation.title,
              className: translation.name === bible.translationName ? activeTranslationItemClassName : '',
            }))}
            triggerNode={() => (
              <Button
                asSpan
                size="sm"
                className="shrink-0 uppercase"
              >
                {bible.translationName}
              </Button>
            )}
          />
        )}

        <Button
          size="sm"
          icon={searchScope === RemoteBroadcastSearchScope.Bible ? 'BookBookmark02' : 'FileSearch'}
          className="text-x3 hover:text-x3"
          aria-label={
            searchScope === RemoteBroadcastSearchScope.Bible
              ? t(BaseLocaleKey.BibleSearchChapter)
              : tRemote(RemoteLocaleKey.SearchByBible)
          }
          onClick={toggleSearchScope}
        />

        <TextInput
          inputRef={searchInputRef}
          value={searchTerm}
          onInput={setSearchTerm}
          placeholder={t(BaseLocaleKey.Search)}
          maxLength={remoteBroadcastSearchTermMaxLength}
          className="h-8 min-w-0 flex-1 basis-40 text-sm"
        />
      </div>

      {!isBibleSearchActive || (
        <div className="flex flex-1 min-h-0 w-full custom-align-items overflow-y-auto flex column gap-1 -ml-2">
          {bible.searchMatches.map(match => (
            <div
              key={`${match.booki}-${match.chapteri}-${match.versei}`}
              style={itemMinHeightStyle}
              className={twMerge(itemButtonClassName, 'flex')}
              onClick={() => selectSearchMatch(match)}
            >
              <span className="opacity-50 mr-1 nowrap">
                {match.bookTitle || noValue} {match.chapteri + 1}:{match.versei + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: match.html }} />
            </div>
          ))}
        </div>
      )}

      {isBibleSearchActive || (
        <RemoteBibleVerseList
          verses={visibleVerses}
          activeVersei={bible.versei}
          isJoinMode={isJoinMode}
          joinVerseis={joinVerseis}
          onCommand={onCommand}
          onJoinVerse={joinVerse}
          onJoinVerseRange={joinVerseRange}
          onToggleJoinMode={toggleJoinMode}
        />
      )}

      {pickerStep == null || (
        <BottomPopup
          title={
            pickerStep === RemoteBroadcastBibleStep.Book ? (
              tRemote(RemoteLocaleKey.Book)
            ) : (
              <span className="flex items-center gap-1">
                <TheIconButton
                  icon="ArrowLeft02"
                  onClick={() => setPickerStep(RemoteBroadcastBibleStep.Book)}
                />
                {selectedBookTitle}
              </span>
            )
          }
          onClose={() => setPickerStep(null)}
        >
          {pickerStep === RemoteBroadcastBibleStep.Book && (
            <div className="grid grid-cols-6 gap-1">
              {bible.books.map((book, booki) => (
                <div
                  key={booki}
                  className={twMerge(
                    'flex justify-center items-center h-9 rounded-sm bg-x2 pointer',
                    booki === selectedBooki ? 'text-[black]' : book.color,
                    booki === bible.booki && 'bg-x7',
                    book.disabled && 'disabled',
                  )}
                  onClick={() => {
                    if (book.disabled) return;
                    selectBook(booki);
                  }}
                >
                  <span className="min-w-0 truncate">{book.short || noValue}</span>
                </div>
              ))}
            </div>
          )}

          {pickerStep === RemoteBroadcastBibleStep.Chapter && (
            <div className="grid grid-cols-6 gap-1">
              {arrayByLength(selectedChapterCount, chapteri => (
                <button
                  key={chapteri}
                  className={twMerge(
                    gridCellClassName,
                    selectedBooki === bible.booki && chapteri === bible.chapteri ? activeItemButtonClassName : '',
                  )}
                  onClick={() => selectChapter(chapteri)}
                >
                  {chapteri + 1}
                </button>
              ))}
            </div>
          )}
        </BottomPopup>
      )}
    </div>
  );
};
