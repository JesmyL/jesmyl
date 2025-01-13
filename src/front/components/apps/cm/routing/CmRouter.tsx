import { MyLib } from 'front/utils';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { useAtom } from '../../../../complect/atoms';
import { cmIDB } from '../_db/cm-db';
import { cmAppActions } from '../app-actions/cm-app-actions';
import { CmSharedComListActionInterpretator } from '../app-actions/SharedComList';
import { cmFreshesSokiInvocatorClient } from '../cm-invocator.methods';
import TheCat from '../col/cat/TheCat';
import { useTakeActualComw } from '../col/com/useCcom';
import { listenSokiEventsForCm } from '../complect/listenSokiEventsForCm';
import Lists from '../lists/Lists';
import { cmMolecule, comCommentFractionalStore } from '../molecules';
import { CmFooter } from './CmFooter';

const Editor = React.lazy(() => import('../editor/Editor'));

const commentsAtom = cmMolecule.select(s => s.comComments);

export default function CmRouter({ mainNode }: { mainNode: React.ReactNode }) {
  useTakeActualComw();
  const [comListOnAction, setComListOnAction] = useState<CmComWid[] | null>(null);

  cmAppActions.useOnAction(({ props, navigateFromRoot }) => {
    if (props.comws?.length) setComListOnAction(props.comws);
    if (props.comw != null) navigateFromRoot(`/cm/i/${props.comw}`);
  });

  // todo remove it
  //////////////////////////
  const [comments, setComments] = useAtom(commentsAtom);
  useEffect(() => {
    let isUpdate = false;
    MyLib.entries(comments).forEach(([key, val]) => {
      isUpdate = true;
      if (!val || comCommentFractionalStore.get(key)) return;

      comCommentFractionalStore.set(key, val);
    });

    if (isUpdate) setComments({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //////////////////////////

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
        <Route
          path="edit/*"
          element={
            <Suspense>
              <Editor />
            </Suspense>
          }
        />
        {mainNode}
      </Routes>

      <CmFooter />

      {comListOnAction && (
        <CmSharedComListActionInterpretator
          comws={comListOnAction}
          onClose={setComListOnAction}
        />
      )}
    </>
  );
}

listenSokiEventsForCm();

setTimeout(async () => {
  const lastModified = await cmIDB.getSingleValue('lastModified', 0);
  await cmFreshesSokiInvocatorClient.getFreshes(null, lastModified);
}, 1000);
