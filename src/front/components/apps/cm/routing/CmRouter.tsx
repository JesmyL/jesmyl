import useToast from 'front/complect/modal/useToast';
import { useAuth } from 'front/components/index/atoms';
import React, { memo, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { cmAppActions } from '../app-actions/cm-app-actions';
import { CmSharedComListActionInterpretator } from '../app-actions/SharedComList';
import useSelectedComs from '../base/useSelectedComs';
import TheCat from '../col/cat/TheCat';
import { useTakeActualComw } from '../col/com/useCcom';
import Lists from '../lists/Lists';
import { cmInitialInvokes } from './cm-initial-invokes';
import { CmFooter } from './CmFooter';

const Editor = React.lazy(() => import('../editor/Editor'));
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
      const copySeleccted = [...selectedComws];
      copySeleccted.length = maxSelectedComsCount;
      setSelectedComws(copySeleccted);
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

  if (isCantRender) return null;
  setTimeout(setIsCantRender, 0, true);

  return (
    <div hidden>
      <Suspense>
        <Editor />
      </Suspense>
    </div>
  );
});

cmInitialInvokes();
