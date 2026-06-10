import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { Metronome } from '#widgets/metronome';
import { useCmComSelectedList } from '$cm/entities/com';
import { cmComSelectedComwsAtom } from '$cm/entities/index';
import { CmComSharedListActionInterpretator } from '$cm/features/com';
import { cmAppActions } from '$cm/shared/const';
import { Global } from '@emotion/react';
import { Outlet } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import React, { memo, Suspense, useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { blockCmGlobalCss } from 'shared/values/cm/block-kinds/BlockKindsProvider';
import { toast } from 'sonner';

const CmEditorPage = React.lazy(() => import('$cm+editor/app/EditorPage').then(m => ({ default: m.CmEditorPage })));
let comListOnActionAtom: Atom<CmComWid[] | null>;

export const CmApp = () => {
  comListOnActionAtom ??= atom<CmComWid[] | null>(null);

  useCurrentAppSetter('cm');
  const { maxSelectedComsCount } = useAtomValue(constantsConfigAtom);
  const checkAccess = useCheckUserAccessRightsInScope();

  const { selectedComws } = useCmComSelectedList();

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if ('comws' in props && props.comws?.length) {
      comListOnActionAtom.set(props.comws);
      return true;
    }

    if ('comw' in props && props.comw != null) {
      navigateFromRoot({ to: '/cm/i', search: { comw: props.comw } });
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (selectedComws.length > maxSelectedComsCount) {
      const copySelected = [...selectedComws];
      copySelected.length = maxSelectedComsCount;
      cmComSelectedComwsAtom.set(copySelected);
      toast(`Можно выбрать максимум ${maxSelectedComsCount} песен`, makeToastKOMoodConfig());
    }
  }, [maxSelectedComsCount, selectedComws]);

  return (
    <>
      <Outlet />

      <Global styles={blockCmGlobalCss} />

      {checkAccess('cm', 'EDIT') && <RenderEditorOnce />}

      <CmComSharedListActionInterpretator comListOnActionAtom={comListOnActionAtom} />

      <Metronome />
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
