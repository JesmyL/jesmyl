import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useToast } from '#shared/ui/modal/useToast';
import { Outlet } from '@tanstack/react-router';
import { useAuth } from 'front/components/index/atoms';
import React, { Suspense, memo, useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { cmAppActions } from '../app-actions/cm-app-actions';
import { CmSharedComListActionInterpretator } from '../app-actions/SharedComList';
import { useSelectedComs } from '../base/useSelectedComs';
import { CmFooter } from '../routing/CmFooter';

const maxSelectedComsCount = 50;
const CmEditorPage = React.lazy(() => import('$cm+editor/app/EditorPage').then(m => ({ default: m.CmEditorPage })));

export const CmApp = () => {
  const auth = useAuth();
  const [comListOnAction, setComListOnAction] = useState<CmComWid[] | null>(null);

  const { selectedComws, setSelectedComws } = useSelectedComs();
  const toast = useToast();

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if (props.comws?.length) setComListOnAction(props.comws);
    if (props.comw != null) navigateFromRoot({ to: '/cm/i', search: { comw: props.comw } });
  });

  useEffect(() => {
    if (selectedComws.length > maxSelectedComsCount) {
      const copySelected = [...selectedComws];
      copySelected.length = maxSelectedComsCount;
      setSelectedComws(copySelected);
      toast(`Можно выбрать максимум ${maxSelectedComsCount} песен`, { mood: 'ko' });
    }
  }, [selectedComws, setSelectedComws, toast]);

  return (
    <>
      <Outlet />
      <CmFooter />

      {auth.level >= 50 && <RenderEditorOnce />}

      {comListOnAction && (
        <CmSharedComListActionInterpretator
          comws={comListOnAction}
          onClose={setComListOnAction}
        />
      )}
    </>
  );
};

export const RenderEditorOnce = memo(() => {
  const [isCantRender, setIsCantRender] = useState(false);

  useEffect(
    () =>
      hookEffectPipe()
        .pipe(setTimeoutPipe(setIsCantRender, 0, true))
        .effect(),
    [],
  );
  if (isCantRender) return null;
  return (
    <div hidden>
      <Suspense>
        <CmEditorPage />
      </Suspense>
    </div>
  );
});
