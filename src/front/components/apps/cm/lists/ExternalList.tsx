import { mylib } from '#shared/lib/my-lib';
import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { CmComListContext } from '@cm/base/translations/context';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { useComs } from '@cm/cols/useCols';
import { cmCompositionRoute } from '@cm/routing/cmRoutingApp';
import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import { itNUnd } from 'shared/utils';
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
    } catch (_error) {
      //
    }
  }, [params]);

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
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
