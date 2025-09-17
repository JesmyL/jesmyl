import { useAppNameContext } from '#basis/lib/contexts';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { QrReader } from '#shared/ui/qr-code/useQrReader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { hosts } from 'shared/api';

const isOpenAtom = atom(false);

export function IndexActionsPage() {
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  const appName = useAppNameContext();

  return (
    <PageContainerConfigurer
      className=""
      headTitle="Взаимодействие"
      contentClass="flex column p-2"
      content={
        <>
          <BrutalItem
            iconNode={<LazyIcon icon="QrCode01" />}
            title="Читать QR"
            onClick={isOpenAtom.do.toggle}
          />
          <Link
            to="/!other/$appName/actions/files"
            params={{ appName }}
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="File02" />}
              title="Мои файлы"
              idPostfix="files"
            />
          </Link>

          <QrReader
            openAtom={isOpenAtom}
            onReadData={value => {
              if (value.data.startsWith(hosts.host)) {
                onHrefData(value.data);
                isOpenAtom.set(false);
              }
            }}
          />
        </>
      }
    />
  );
}
