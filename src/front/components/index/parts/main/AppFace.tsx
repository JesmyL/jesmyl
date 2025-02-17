import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FullContent } from '#widgets/fullscreen-content/FullContent';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutingAppConfig } from '../../../../02-processes/routers';

interface Props {
  config: RoutingAppConfig;
}

export const AppFace = ({ config: { appName, icon, title, lazies } }: Props) => {
  const [isOpenFull, setIsOpenFull] = useState<unknown>(false);

  const loadedRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="margin-big-gap-h margin-sm-gap-v flex between">
      <Link
        to={`/${appName}/i`}
        className="flex flex-gap pointer"
      >
        <LazyIcon icon={icon} />
        <span>{title}</span>
      </Link>
      {/* <LazyIcon icon="CloudDownload"
        className="pointer"
        onClick={setIsOpenFull}
      /> */}
      {!isOpenFull || (
        <FullContent
          className="flex center"
          onClose={setIsOpenFull}
        >
          <div>{isLoading ? 'Загружаем...' : 'Загрузка завершена!'}</div>
          {lazies.map((node, nodei) => (
            <div
              key={nodei}
              hidden
            >
              <Suspense
                fallback={
                  <Fallback
                    loadedRef={loadedRef}
                    setIsLoading={setIsLoading}
                  />
                }
              >
                {node}
              </Suspense>
            </div>
          ))}
        </FullContent>
      )}
    </div>
  );
};

const Fallback = ({
  loadedRef,
  setIsLoading,
}: {
  loadedRef: { current: number };
  setIsLoading: (is: boolean) => void;
}) => {
  useEffect(() => {
    loadedRef.current++;

    return () => {
      loadedRef.current--;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loadedRef.current <= 0) setIsLoading(false);
    };
  }, [loadedRef, setIsLoading]);

  return <></>;
};
