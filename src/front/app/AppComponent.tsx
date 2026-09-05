import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { currentLangiAtom, translateBase } from '#basis/locale';
import { currentAppNameAtom } from '#basis/state/currentAppNameAtom';
import { hideAppFooterAtom } from '#basis/state/hideAppFooterAtom';
import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { isFullscreenAtom, switchFullScreen } from '#shared/lib/atoms/fullscreen';
import { rootAppModalTextContentAtom } from '#shared/lib/atoms/rootAppModalTextContentAtom';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { soki } from '#shared/soki';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { makeToastKOMoodConfig, Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { schLinkAction } from '#widgets/schedule/links';
import { indexIDB } from '$index/shared/state';
import { Outlet, ParsedLocation, useLocation, useNavigate } from '@tanstack/react-router';
import { atom, configureAtomaric, useAtomValue } from 'atomaric';
import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { langCodeDict, langCodeLoadingTitleDict } from 'shared/const/+locale';
import { CmComOrders } from 'shared/const/cm/Com/parents/20-Orders';
import { extractNumber, iife } from 'shared/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { appInitialInvokes } from './app-initial-invokes';
import { AppFooter } from './AppFooter';
import { routingApps } from './lib/configs';
import { localeIsLoadingAtom } from './store/triggers';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });
appInitialInvokes();

const forceUpdateAtom = atom(0);

takeBaseLanguageAtom().subscribe(() => forceUpdateAtom.do.increment());
forEachObjectEntries(langCodeDict, langiStr =>
  takeDynamicLanguageAtom(extractNumber(langiStr)).subscribe(() => forceUpdateAtom.do.increment()),
);

export const AppComponent = () => {
  const num = useAtomValue(forceUpdateAtom);

  const loc = useLocation();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);
  const appName = useAtomValue(currentAppNameAtom);
  const hideAppFooter = useAtomValue(hideAppFooterAtom);
  const isFullscreen = useAtomValue(isFullscreenAtom);
  const currentLangi = useAtomValue(currentLangiAtom);

  useEffect(() => {
    const unauthListener = soki.onTokenInvalidEvent.listen(() => {
      toast(
        translateBase(it => it.authIncorrect),
        makeToastKOMoodConfig(),
      );
    });

    const errorMessageListener = soki.onInvokeErrorMessageEvent.listen(errorMessage => {
      toast(errorMessage, makeToastKOMoodConfig());
    });

    return () => {
      unauthListener();
      errorMessageListener();
    };
  }, []);

  useFingersActions();
  useGlobalFontFamilySetter();

  useEffect(() => soki.pushCurrentUrl(), [loc.href]);

  return (
    <>
      <div
        className="above-container"
        st-hide-footer-menu={hideAppFooter ? '' : undefined}
      >
        <div
          className="application-container"
          st-fullscreen={isFullscreen ? '' : undefined}
        >
          <Outlet key={num} />
          {isFullscreen && (
            <LazyIcon
              icon="ArrowShrink02"
              className="pointer absolute top-0 right-0 z-50 m-[10px]"
              onClick={() => switchFullScreen(false)}
            />
          )}
        </div>
      </div>
      {isNeedFirstNavigate && (
        <FirstNaver
          onSet={setIsNeedFirstNavigate}
          loc={loc as never}
        />
      )}

      <React.Fragment key={num}>
        {appName &&
          (routingApps[appName]?.footer ?? (
            <AppFooter
              appName={appName}
              children={() => [
                <div
                  key={0}
                  className="size-full flex justify-center items-center pb-3"
                >
                  {translateBase(it => it.selProgram)}
                </div>,
              ]}
            />
          ))}
      </React.Fragment>

      <FullContent
        openAtom={localeIsLoadingAtom}
        checkIsOpen={num => num > 0}
        containerClassName="flex justify-center items-center w-full h-full"
      >
        {langCodeLoadingTitleDict[currentLangi] ?? 'Texts is loading'}
      </FullContent>

      <Modal
        openAtom={rootAppModalTextContentAtom}
        checkIsOpen={it => !!it.text}
      >
        <WithAtomValue atom={rootAppModalTextContentAtom}>
          {props => (
            <>
              <ModalHeader>{props.header || translateBase(it => it.msg)}</ModalHeader>
              <ModalBody>{props.text}</ModalBody>
              {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
            </>
          )}
        </WithAtomValue>
      </Modal>
    </>
  );
};

const FirstNaver = ({ onSet, loc }: { onSet: (is: false) => void; loc: ParsedLocation<object> }) => {
  const navigate = useNavigate();
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  schLinkAction.register();

  useEffect(() => {
    onHrefData(window.location.href);
  }, [onHrefData]);

  useEffect(() => {
    onSet(false);
    if (loc.pathname.length > 1 || loc.searchStr || loc.hash) return;
    navigate({ to: FooterPlacementManager.lastVisitedRouteUrl });
  }, [loc.hash, loc.pathname.length, loc.searchStr, navigate, onSet]);

  return <></>;
};

iife(async () => {
  const schs = await indexIDB.tb.schs.toCollection().keys();
  const keys = schs.flatMap(schw => (schw === Math.trunc(+schw) ? [] : [schw]));

  await indexIDB.tb.schs.where('w').anyOf(keys).delete();
});

CmComOrders.getLangLocales = langi => takeDynamicLanguageAtom(langi).get();
