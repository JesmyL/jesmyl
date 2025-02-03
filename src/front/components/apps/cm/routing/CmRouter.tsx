import { useAuth } from 'front/components/index/atoms';
import React, { memo, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { cmAppActions } from '../app-actions/cm-app-actions';
import { CmSharedComListActionInterpretator } from '../app-actions/SharedComList';
import TheCat from '../col/cat/TheCat';
import { useTakeActualComw } from '../col/com/useCcom';
import Lists from '../lists/Lists';
import { cmInitialInvokes } from './cm-initial-invokes';
import { CmFooter } from './CmFooter';

const Editor = React.lazy(() => import('../editor/Editor'));

export default function CmRouter({ mainNode }: { mainNode: React.ReactNode }) {
  const auth = useAuth();
  useTakeActualComw();
  const [comListOnAction, setComListOnAction] = useState<CmComWid[] | null>(null);

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if (props.comws?.length) setComListOnAction(props.comws);
    if (props.comw != null) navigateFromRoot(`/cm/i/${props.comw}`);
  });

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
