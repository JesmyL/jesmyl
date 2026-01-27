import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { Skeleton } from '#shared/components';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';

export function IndexDownloadsPage() {
  const valuesQuery = useIndexValuesQuery();

  return (
    <PageContainerConfigurer
      className=""
      headTitle="Загрузки"
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
                  title="JesmyL для Windows"
                />
              </a>
              <a
                href={valuesQuery.data?.desktopLinuxDownLink}
                download=""
              >
                <BrutalItem
                  iconNode={<LazyIcon icon="CloudDownload" />}
                  title="JesmyL для Linux"
                />
              </a>
            </>
          )}
        </div>
      }
    />
  );
}
