import { cmIDB } from '$cm/_db/cm-idb';
import { useLaterComList } from '$cm/base/useLaterComList';
import { useComs } from '$cm/basis/lib/coms-selections';
import { useCat } from '$cm/col/cat/useCcat';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmCatPage } from './CatPage';

export const TheAllCatPage = () => {
  const cat = useCat(0);
  const { laterComws } = useLaterComList();
  const fullComsCount = useLiveQuery(() => cmIDB.db.coms.count());
  const coms = useComs();

  return (
    <CmCatPage
      cat={cat}
      comsCount={fullComsCount ?? 0}
      withoutBackButton
      coms={coms}
      topNodeRender={term => (
        <>
          {!term && !!laterComws?.length && (
            <div
              key="later-com-list"
              className="later-com-list"
            >
              <div className="list-title sticky">Последние:</div>
              <ComFaceList
                list={laterComws}
                isPutCcomFaceOff
              />
            </div>
          )}
        </>
      )}
    />
  );
};
