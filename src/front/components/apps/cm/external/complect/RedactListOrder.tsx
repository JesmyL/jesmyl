import { useState } from 'react';
import { CmComBindAttach } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import StrongEvaButton from '../../../../../complect/strong-control/StrongEvaButton';
import { IconArrowDataTransferVerticalStrokeRounded } from '../../../../../complect/the-icon/icons/arrow-data-transfer-vertical';
import { IconDelete01StrokeRounded } from '../../../../../complect/the-icon/icons/delete-01';
import { IconLinkBackwardStrokeRounded } from '../../../../../complect/the-icon/icons/link-backward';
import { useCcat } from '../../col/cat/useCcat';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';

interface Props {
  value: CmComBindAttach;
  scope: string;
  setCcom: (com: Com) => void;
}

export default function CmExternalComListAttRedactListOrder({ value, scope, setCcom }: Props) {
  const [removedComws, setRemovedComws] = useState<number[]>([]);
  const cat = useCcat(true);

  const comws = value.comws;
  const uniqRemovedComws = comws === undefined ? removedComws : removedComws.filter(comw => !comws.includes(comw));

  return (
    <div className="margin-giant-gap-t">
      {cat && (
        <ComFaceList
          list={comws}
          importantOnClick={emptyFunc}
          comDescription={(com, comi) => (
            <div className="flex flex-gap">
              {!comi || (
                <StrongEvaButton
                  scope={scope}
                  fieldName="listKey move"
                  fieldKey="comws"
                  fieldValue={{
                    find: ['.', '===', com.wid],
                    beforei: comi - 1,
                  }}
                  cud="U"
                  Icon={IconArrowDataTransferVerticalStrokeRounded}
                  className="color--3 margin-giant-gap-b"
                />
              )}
              <StrongEvaButton
                scope={scope}
                fieldName="listKey"
                fieldKey="comws"
                fieldValue={['.', '===', com.wid]}
                cud="D"
                Icon={IconDelete01StrokeRounded}
                onSuccess={
                  removedComws.includes(com.wid) ? undefined : () => setRemovedComws(comws => [...comws, com.wid])
                }
                className="color--ko"
              />
            </div>
          )}
        />
      )}
      {!uniqRemovedComws.length || (
        <>
          <h2>Удалённые песни</h2>
          {cat && (
            <ComFaceList
              list={uniqRemovedComws}
              importantOnClick={com => setCcom(com)}
              comDescription={(com, comi) => (
                <StrongEvaButton
                  scope={scope}
                  fieldName="listKey"
                  fieldKey="comws"
                  fieldValue={com.wid}
                  cud="C"
                  Icon={IconLinkBackwardStrokeRounded}
                  className="color--ok"
                  onSuccess={
                    removedComws.includes(com.wid) ? undefined : () => setRemovedComws(comws => [...comws, com.wid])
                  }
                />
              )}
            />
          )}
        </>
      )}
    </div>
  );
}
