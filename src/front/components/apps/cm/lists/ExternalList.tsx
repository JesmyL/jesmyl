import { mylib } from '#shared/lib/my-lib';
import { PageContainer } from '#shared/ui/PageContainer';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { itNUnd } from 'shared/utils';
import { CmComWid } from '../../../../../shared/api/complect/apps/cm/complect/enums';
import { CmComListContext } from '../base/translations/context';
import { ComFaceList } from '../col/com/face/list/ComFaceList';
import { useComs } from '../cols/useCols';
import { cmCompositionRoute } from '../routing/cmRoutingApp';
import './Lists.scss';

export function ExternalList() {
  const params = useParams();
  const [comws, setComws] = useState<CmComWid[] | null>(null);

  useEffect(() => {
    const comwsStr = params['comws'];
    if (comwsStr === undefined) return;

    try {
      const comws: number[] = JSON.parse(comwsStr);
      if (!mylib.isArr(comws) || comws.some(comw => !mylib.isNum(comw))) return;

      setComws(comws);
    } catch (error) {}
  }, [params]);

  return (
    <Routes>
      <Route
        index
        element={
          <PageContainer
            className="ext-list-container"
            backButtonIcon="Cancel01"
            headTitle="Внешний список"
            content={<ComFaceList list={comws} />}
          />
        }
      />

      {cmCompositionRoute(children => (
        <Context comws={comws}>{children}</Context>
      ))}
    </Routes>
  );
}

const Context = ({ children, comws }: { children: React.ReactNode; comws: CmComWid[] | null }) => {
  const coms = useComs();

  const contextValue = useMemo(() => {
    if (comws == null) return null;
    return { list: comws.map(comw => coms.find(com => com.wid === comw)!).filter(itNUnd) };
  }, [coms, comws]);

  return contextValue ? (
    <CmComListContext.Provider value={contextValue}>{children}</CmComListContext.Provider>
  ) : (
    children
  );
};
