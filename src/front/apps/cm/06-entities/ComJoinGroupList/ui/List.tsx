import { CmComFaceList, cmIDB } from '$cm/ext';
import { useMemo } from 'react';
import { CmComWid, CmComWidRefGroupDict } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { extractNumber, itIt } from 'shared/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';

export const CmComJoinGroupList = ({
  com,
  comDescription,
  children,
  importantOnClick = itIt,
  emptyNode,
}: {
  com: CmCom;
  comDescription?: ((com: CmCom, comi: number) => React.ReactNode) | und;
  children?: (comJoinsList: CmComWid[], allJoins: CmComWidRefGroupDict) => React.ReactNode;
  importantOnClick?: Parameters<typeof CmComFaceList>[0]['importantOnClick'];
  emptyNode?: React.ReactNode;
}) => {
  const refs = cmIDB.useValue.comWidRefDict();

  const comJoinsList = useMemo(() => {
    const comw = com.wid;
    if (refs[comw] == null) return [];
    const comJoinGroupId = refs[comw];
    const comws: CmComWid[] = [];

    forEachObjectEntries(refs, (comwStr, joinGroupId) => {
      if (comJoinGroupId === joinGroupId && +comwStr !== comw) comws.push(extractNumber(comwStr));
    });

    return comws;
  }, [com.wid, refs]);

  return (
    <>
      {children?.(comJoinsList, refs)}
      {comJoinsList.length ? (
        <CmComFaceList
          list={Array.from(comJoinsList)}
          isPutCcomFaceOff={false}
          importantOnClick={importantOnClick}
          className="max-h-[40vh]"
          comDescription={comDescription}
        />
      ) : (
        emptyNode
      )}
    </>
  );
};
