import { useAppNameContext } from '#basis/lib/contexts';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { QrReader } from '#shared/ui/qr-code/useQrReader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { hosts } from 'shared/api';

export function IndexActionsPage() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  const appName = useAppNameContext();

  return (
    <PageContainerConfigurer
      className=""
      headTitle="Взаимодействие"
      contentClass="flex column padding-gap"
      content={
        <>
          {isQrOpen && (
            <QrReader
              onClose={setIsQrOpen}
              onReadData={value => {
                if (value.data.startsWith(hosts.host)) {
                  onHrefData(value.data);
                  setIsQrOpen(false);
                }
              }}
            />
          )}
          <BrutalItem
            iconNode={<LazyIcon icon="QrCode01" />}
            title="Читать QR"
            onClick={() => setIsQrOpen(true)}
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
        </>
      }
    />
  );
}
