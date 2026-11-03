import { useRouter } from '@tanstack/react-router';
import { ClipboardEvent, ClipboardEventHandler, useState } from 'react';
import { AppActionHrefNaver } from './AppActionHrefNaver';

type PastedInputElement = HTMLInputElement & HTMLTextAreaElement;

const WHITESPACE_REGEXP = /\s/;

const parsePastedUrl = (text: string): URL | nil => {
  const [leadingToken] = text.trim().split(WHITESPACE_REGEXP);
  if (!leadingToken) return null;

  try {
    return new URL(leadingToken);
  } catch {
    if (!leadingToken.startsWith('/')) return null;
  }

  try {
    return new URL(leadingToken, location.href);
  } catch {
    return null;
  }
};

export const usePastedLinkNavigation = (
  onPaste?: ClipboardEventHandler<PastedInputElement>,
  onClear?: () => void,
) => {
  const router = useRouter({ warn: false });
  const [appActionNav, setAppActionNav] = useState<{ href: string; key: number } | null>(null);

  const handlePaste = (event: ClipboardEvent<PastedInputElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented) return;

    const text = event.clipboardData?.getData('text');
    const url = text == null ? null : parsePastedUrl(text);

    if (url == null || url.host !== location.host) return;

    const target = url.pathname + url.search + url.hash;
    if (target === '/') return;

    event.preventDefault();
    event.currentTarget.value = '';
    onClear?.();

    if (url.searchParams.has('appAction') && router) {
      setAppActionNav(state => ({ href: url.href, key: (state?.key ?? 0) + 1 }));
      return;
    }

    if (router) router.navigate({ to: target });
    else location.assign(target);
  };

  return {
    onPaste: handlePaste,
    appActionNavNode: appActionNav && <AppActionHrefNaver key={appActionNav.key} href={appActionNav.href} />,
  };
};
