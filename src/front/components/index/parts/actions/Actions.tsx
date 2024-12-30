import { LinkAppActionFabric } from 'front/complect/link-app-actions';
import { QrReader } from 'front/complect/qr-code/useQrReader';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { environment } from 'shared/api';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import { IconFile02StrokeRounded } from '../../../../complect/the-icon/icons/file-02';
import { IconQrCode01StrokeRounded } from '../../../../complect/the-icon/icons/qr-code-01';
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
                      if (value.data.startsWith(environment.host)) {
                        onHrefData(value.data);
                        setIsQrOpen(false);
                      }
                    }}
                  />
                )}
                <BrutalItem
                  icon={<IconQrCode01StrokeRounded />}
                  title="Читать QR"
                  onClick={() => setIsQrOpen(true)}
                />
                <BrutalItem
                  icon={<IconFile02StrokeRounded />}
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
