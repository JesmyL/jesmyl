import { CmComFaceList, cmIDB } from '$cm/ext';
import { useMemo } from 'react';
import { CmComWid, CmComWidRefGroupDict, IExportableCom } from 'shared/api';
import { extractNumber, itIt } from 'shared/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';

export const CmComJoinGroupList = ({
  comw,
  comDescription,
  children,
  importantOnClick = itIt,
  emptyNode,
}: {
  comw: CmComWid;
  comDescription?: ((com: IExportableCom, comi: number) => React.ReactNode) | und;
  children?: (comJoinsList: CmComWid[], allJoins: CmComWidRefGroupDict) => React.ReactNode;
  importantOnClick?: Parameters<typeof CmComFaceList>[0]['importantOnClick'];
  emptyNode?: React.ReactNode;
}) => {
  const refs = cmIDB.useValue.comWidRefDict();

  const comJoinsList = useMemo(() => {
    if (refs[comw] == null) return [];
    const comJoinGroupId = refs[comw];
    const comws: CmComWid[] = [];

    forEachObjectEntries(refs, (comwStr, joinGroupId) => {
      if (comJoinGroupId === joinGroupId && +comwStr !== comw) comws.push(extractNumber(comwStr));
    });

    return comws;
  }, [comw, refs]);

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
