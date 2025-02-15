import { LinkAppActionFabric } from 'front/complect/link-app-actions';
import { QrReader } from 'front/complect/qr-code/useQrReader';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { hosts } from 'shared/api';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import IndexMyFiles from './files/MyFiles';

export default function IndexActions() {
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
