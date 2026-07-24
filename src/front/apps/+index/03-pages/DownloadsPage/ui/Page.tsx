import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { translateBase } from '#basis/locale';
import { Skeleton } from '#shared/components';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';

export function IndexDownloadsPage() {
  const valuesQuery = useIndexValuesQuery();

  return (
    <PageContainerConfigurer
      className=""
      headTitle={translateBase(it => it.downloads)}
      content={
        <div className="h-full w-full">
          {valuesQuery.isLoading ? (
            <Skeleton className="w-[70cqw] h-[70px] m-auto" />
          ) : (
            <>
              <a
                href={valuesQuery.data?.desktopWindowsDownLink}
                download=""
              >
                <BrutalItem
                  iconNode={<LazyIcon icon="WindowsOld" />}
                  title={translateBase(it => it.jesmylForDesctop, { j: 'JesmyL', d: 'Window' })}
                />
              </a>
              <a
                href={valuesQuery.data?.desktopLinuxDownLink}
                download=""
              >
                <BrutalItem
                  iconNode={<LazyIcon icon="CloudDownload" />}
                  title={translateBase(it => it.jesmylForDesctop, { j: 'JesmyL', d: 'Linux' })}
                />
              </a>
            </>
          )}
        </div>
      }
    />
  );
}
