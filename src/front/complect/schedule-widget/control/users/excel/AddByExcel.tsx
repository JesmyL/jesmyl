import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { ContentOnLoad, LazyIcon } from '#shared/ui/icon';
import { Script } from '#shared/ui/tags/Script';
import { useEffect, useState } from 'react';
import { excel2jsonParserBox } from '../../../../../shared/lib/parseExcel2Json';
import { ScheduleWidgetUserAddByExcelContent } from './AddByExcelContent';

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

  const [isOpenContent, setIsOpenContent] = useState<unknown>(false);

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
        onClick={setIsOpenContent}
      />
      {isOpenContent && (
        <FullContent onClose={setIsOpenContent}>
          <ContentOnLoad isLoading={isLoading}>
            {error ? (
              <div className="color--ko">
                <h3>Ошибка!</h3>
                <p>{error}</p>
              </div>
            ) : (
              <ScheduleWidgetUserAddByExcelContent close={() => setIsOpenContent(false)} />
            )}
          </ContentOnLoad>
        </FullContent>
      )}
    </>
  );
}
