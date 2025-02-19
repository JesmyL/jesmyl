import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/icon';
import { QrReader } from '#shared/ui/qr-code/useQrReader';
import { LinkAppActionFabric } from 'front/basis/lib/link-app-actions';
import { PhaseContainerConfigurer } from 'front/complect/phase-container/PhaseContainerConfigurer';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { hosts } from 'shared/api';
import { IndexMyFiles } from './files/MyFiles';

export function IndexActions() {
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
        element={<IndexMyFiles />}
      />
    </Routes>
  );
}
