import { useToast } from '#shared/ui/modal';
import { hookEffectPipe, setTimeoutPipe } from 'front/08-shared/lib/hookEffectPipe';
import { useAuth } from 'front/components/index/atoms';
import React, { memo, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { cmInitialInvokes } from '../../../../02-processes/initial-invokes/cm-initial-invokes';
import { cmAppActions } from '../../../../07-basis/lib/consts/cm/link-actions';
import useSelectedComs from '../../../../07-basis/lib/hooks/cm/useSelectedComs';
import { CmSharedComListActionInterpretator } from '../../../../components/apps/cm/app-actions/SharedComList';
import TheCat from '../../../../components/apps/cm/col/cat/TheCat';
import { useTakeActualComw } from '../../../../components/apps/cm/col/com/useCcom';
import Lists from '../../../../components/apps/cm/lists/Lists';
import { CmFooter } from './CmFooter';

const Editor = React.lazy(() => import('../../../../components/apps/cm/editor/Editor'));
const maxSelectedComsCount = 50;

export default function CmRouter({ mainNode }: { mainNode: React.ReactNode }) {
  const auth = useAuth();
  useTakeActualComw();
  const [comListOnAction, setComListOnAction] = useState<CmComWid[] | null>(null);

  const { selectedComws, setSelectedComws } = useSelectedComs();
  const [toastNode, toast] = useToast();

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if (props.comws?.length) setComListOnAction(props.comws);
    if (props.comw != null) navigateFromRoot(`/cm/i/${props.comw}`);
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
      <Routes>
        <Route
          path="i/*"
          element={<TheCat all />}
        />
        <Route
          path="li/*"
          element={<Lists />}
        />

        {auth.level >= 50 && (
          <>
            <Route
              path="edit/*"
              element={
                <Suspense>
                  <Editor />
                </Suspense>
              }
            />
          </>
        )}
        {mainNode}
      </Routes>

      <CmFooter />

      {auth.level >= 50 && <RenderEditorOnce />}

      {comListOnAction && (
        <CmSharedComListActionInterpretator
          comws={comListOnAction}
          onClose={setComListOnAction}
        />
      )}
      {toastNode}
    </>
  );
}

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
        <Editor />
      </Suspense>
    </div>
  );
});

cmInitialInvokes();
