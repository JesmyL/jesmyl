import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useToast } from '#shared/ui/modal/useToast';
import { cmConstantsConfigAtom } from '$cm/basis/lib/store/atoms';
import { Outlet } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useAuth } from 'front/components/index/atoms';
import React, { Suspense, memo, useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { cmAppActions } from '../app-actions/cm-app-actions';
import { CmSharedComListActionInterpretator } from '../app-actions/SharedComList';
import { useSelectedComs } from '../base/useSelectedComs';

const CmEditorPage = React.lazy(() => import('$cm+editor/app/EditorPage').then(m => ({ default: m.CmEditorPage })));
const comListOnActionAtom = atom<CmComWid[] | null>(null);

export const CmApp = () => {
  useCurrentAppSetter('cm');
  const { maxSelectedComsCount } = useAtomValue(cmConstantsConfigAtom);

  const auth = useAuth();
  const { selectedComws, setSelectedComws } = useSelectedComs();
  const toast = useToast();

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if (props.comws?.length) {
      comListOnActionAtom.set(props.comws);
      return true;
    }
    if (props.comw != null) {
      navigateFromRoot({ to: '/cm/i', search: { comw: props.comw } });
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (selectedComws.length > maxSelectedComsCount) {
      const copySelected = [...selectedComws];
      copySelected.length = maxSelectedComsCount;
      setSelectedComws(copySelected);
      toast(`Можно выбрать максимум ${maxSelectedComsCount} песен`, { mood: 'ko' });
    }
  }, [maxSelectedComsCount, selectedComws, setSelectedComws, toast]);

  return (
    <>
      <Outlet />

      {auth.level >= 50 && <RenderEditorOnce />}

      <CmSharedComListActionInterpretator comListOnActionAtom={comListOnActionAtom} />
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
