import { useCmCat } from '$cm/entities/cat';
import { useCmComLaterList, useCmComList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmCatPage } from '$cm/pages/CatPage';
import { cmIDB } from '$cm/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';

export const CmAllCatPage = () => {
  const cat = useCmCat(0);
  const { laterComws } = useCmComLaterList();
  const fullComsCount = useLiveQuery(() => cmIDB.db.coms.count());
  const coms = useCmComList();

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
              <CmComFaceList
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
