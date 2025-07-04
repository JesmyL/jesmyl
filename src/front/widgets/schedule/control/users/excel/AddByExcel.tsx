import { excel2jsonParserBox } from '#shared/lib/parseExcel2Json';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Script } from '#shared/ui/tags/Script';
import { ContentOnLoad } from '#shared/ui/the-icon/ContentOnLoad';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { useEffect, useState } from 'react';
import { ScheduleWidgetUserAddByExcelContent } from './AddByExcelContent';

const isOpenFullContentAtom = atom(false);

export function ScheduleWidgetUserAddByExcel() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await excel2jsonParserBox();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('' + error);
      }
    })();
  }, []);

  return (
    <>
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"
      />
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"
      />

      <LazyIcon
        className="pointer"
        icon="FileImport"
        onClick={isOpenFullContentAtom.toggle}
      />

      <FullContent openAtom={isOpenFullContentAtom}>
        <ContentOnLoad isLoading={isLoading}>
          {error ? (
            <div className="color--ko">
              <h3>Ошибка!</h3>
              <p>{error}</p>
            </div>
          ) : (
            <ScheduleWidgetUserAddByExcelContent close={isOpenFullContentAtom.reset} />
          )}
        </ContentOnLoad>
      </FullContent>
    </>
  );
}
