import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { useCmComSelectedList } from '$cm/entities/com';
import { cmComShareComCommentPropsAtom } from '$cm/entities/index';
import { CmComSharedListActionInterpretator } from '$cm/features/com';
import { CmComCommentSharePull } from '$cm/features/com-comment';
import { cmAppActions } from '$cm/shared/const';
import { cmConstantsConfigAtom } from '$cm/shared/state';
import { Outlet } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import React, { memo, Suspense, useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';

const CmEditorPage = React.lazy(() => import('$cm+editor/app/EditorPage').then(m => ({ default: m.CmEditorPage })));
const comListOnActionAtom = atom<CmComWid[] | null>(null);

export const CmApp = () => {
  useCurrentAppSetter('cm');
  const { maxSelectedComsCount } = useAtomValue(cmConstantsConfigAtom);
  const comCommentShareProps = useAtomValue(cmComShareComCommentPropsAtom);
  const checkAccess = useCheckUserAccessRightsInScope();

  const { selectedComws, setSelectedComws } = useCmComSelectedList();

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if ('comws' in props && props.comws?.length) {
      comListOnActionAtom.set(props.comws);
      return true;
    }

    if ('comw' in props && props.comw != null) {
      navigateFromRoot({ to: '/cm/i', search: { comw: props.comw } });
      return true;
    }

    if ('shareCommentComw' in props && !!props.login && !!props.shareCommentComw) {
      cmComShareComCommentPropsAtom.set({ comw: props.shareCommentComw, login: props.login });
      return true;
    }

    return false;
  });

  useEffect(() => {
    if (selectedComws.length > maxSelectedComsCount) {
      const copySelected = [...selectedComws];
      copySelected.length = maxSelectedComsCount;
      setSelectedComws(copySelected);
      toast(`Можно выбрать максимум ${maxSelectedComsCount} песен`, makeToastKOMoodConfig());
    }
  }, [maxSelectedComsCount, selectedComws, setSelectedComws]);

  return (
    <>
      <Outlet />

      {checkAccess('cm', 'EDIT') && <RenderEditorOnce />}

      <CmComSharedListActionInterpretator comListOnActionAtom={comListOnActionAtom} />
      {comCommentShareProps && <CmComCommentSharePull shareProps={comCommentShareProps} />}
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
