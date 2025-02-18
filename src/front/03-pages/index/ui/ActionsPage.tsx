import { QrReader } from '#entities/qr-code/useQrReader';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import BrutalItem from '#shared/ui/brutal-item/BrutalItem';
import PhaseContainerConfigurer from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { hosts } from 'shared/api';
import IndexMyFilesPage from './MyFilesPage';

export default function IndexActionsPage() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const onHrefData = LinkAppActionFabric.useOnHrefData();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
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
                <BrutalItem
                  iconNode={<LazyIcon icon="File02" />}
                  title="Мои файлы"
                  to="files"
                />
              </>
            }
          />
        }
      />

      <Route
        path="files"
        element={<IndexMyFilesPage />}
      />
    </Routes>
  );
}
