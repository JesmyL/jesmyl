import { defaultQueryClient } from '#basis/lib/config/queryClient';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { rootAppModalTextContentAtom } from '#shared/lib/atoms/rootAppModalTextContentAtom';
import { soki } from '#shared/soki';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { authIDB } from '$index/db/auth-idb';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { configureAtomaric } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { routeTree } from 'routeTree.gen';
import { BlockStylesProvider } from 'shared/values/cm/block-styles/BlockStylesProvider';
import { Toaster } from 'sonner';
import { makeStameskaIconStyledProvider } from 'stameska-icon/provider';
import styled, { css, keyframes } from 'styled-components';
import './App.scss';
import './tw.css';

configureAtomaric({ useSyncExternalStore });

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <StyledIconProvider>
        <BlockStylesProvider>
          <AppDialogProvider title="app">
            <RouterProvider router={router} />

            <Modal
              openAtom={rootAppModalTextContentAtom}
              checkIsOpen={checkUserModalTextContentShow}
            >
              <WithAtomValue atom={rootAppModalTextContentAtom}>
                {props => (
                  <>
                    <ModalHeader>{props.header || 'Сообщение'}</ModalHeader>
                    <ModalBody>{props.text}</ModalBody>
                    {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
                  </>
                )}
              </WithAtomValue>
            </Modal>
          </AppDialogProvider>
        </BlockStylesProvider>
      </StyledIconProvider>
      <Toaster
        position="bottom-center"
        style={{ bottom: '100px' }}
      />
    </QueryClientProvider>
  );
};

const StyledIconProvider = makeStameskaIconStyledProvider(styled, css, keyframes);
const checkUserModalTextContentShow = (it: { text: React.ReactNode }) => !!it.text;

soki.onTokenInvalidEvent.listen(() => {
  authIDB.remove.auth();
  authIDB.remove.token();
});
