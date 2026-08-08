import { translateBase } from '#basis/locale';
import { useCmCatICcat } from '$cm/entities/cat';
import { useCmComAllWidList, useCmComLaterList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmCatPage } from '$cm/pages/CatPage';
import { CmCatWid } from 'shared/api';

export const CmAllCatPage = () => {
  const icat = useCmCatICcat(CmCatWid.all);
  const { laterComws } = useCmComLaterList();
  const comws = useCmComAllWidList();

  return (
    <CmCatPage
      icat={icat}
      comsCount={comws?.length ?? 0}
      withoutBackButton
      comws={comws}
      topNodeRender={term => (
        <>
          {!term && !!laterComws?.length && (
            <div
              key="later-com-list"
              className="later-com-list"
            >
              <div className="list-title sticky">{translateBase(it => it.lasts)}:</div>
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
