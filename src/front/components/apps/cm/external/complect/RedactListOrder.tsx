import { useCcat } from '@cm/col/cat/useCcat';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { useState } from 'react';
import { CmComBindAttach, CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';

interface Props {
  value: CmComBindAttach;
  setCcomw: (comw: CmComWid) => void;
}

export function CmExternalComListAttRedactListOrder({ value, setCcomw }: Props) {
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
          // comDescription={(com, comi) => (
          //   <div className="flex flex-gap">
          //     {!comi || (
          //       <StrongEvaButton
          //         scope={scope}
          //         fieldName="listKey move"
          //         fieldKey="comws"
          //         fieldValue={{
          //           find: ['.', '===', com.wid],
          //           beforei: comi - 1,
          //         }}
          //         cud="U"
          //         icon="ArrowDataTransferVertical"
          //         className="color--3 margin-giant-gap-b"
          //       />
          //     )}
          //     <StrongEvaButton
          //       scope={scope}
          //       fieldName="listKey"
          //       fieldKey="comws"
          //       fieldValue={['.', '===', com.wid]}
          //       cud="D"
          //       icon="Delete01"
          //       onSuccess={
          //         removedComws.includes(com.wid) ? undefined : () => setRemovedComws(comws => [...comws, com.wid])
          //       }
          //       className="color--ko"
          //     />
          //   </div>
          // )}
        />
      )}
      {!uniqRemovedComws.length || (
        <>
          <h2>Удалённые песни</h2>
          {cat && (
            <ComFaceList
              list={uniqRemovedComws}
              importantOnClick={com => setCcomw(com.wid)}
              // comDescription={(com, comi) => (
              //   <StrongEvaButton
              //     scope={scope}
              //     fieldName="listKey"
              //     fieldKey="comws"
              //     fieldValue={com.wid}
              //     cud="C"
              //     icon="LinkBackward"
              //     className="color--ok"
              //     onSuccess={
              //       removedComws.includes(com.wid) ? undefined : () => setRemovedComws(comws => [...comws, com.wid])
              //     }
              //   />
              // )}
            />
          )}
        </>
      )}
    </div>
  );
}
