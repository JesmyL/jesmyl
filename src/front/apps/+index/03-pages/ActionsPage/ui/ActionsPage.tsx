import { useAppNameContext } from '#basis/state/contexts';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { hosts } from 'shared/api';

let isOpenAtom: Atom<boolean>;

export function IndexActionsPage() {
  isOpenAtom ??= atom(false);

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
          <Link
            to="/!other/$appName/actions/down"
            params={{ appName }}
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="CloudDownload" />}
              title="Загрузки"
              idPostfix="down"
            />
          </Link>

          <QrReader
            openAtom={isOpenAtom}
            onReadData={value => {
              if (value.startsWith(hosts.host)) {
                onHrefData(value);
                isOpenAtom.set(false);
              }
            }}
          />
        </>
      }
    />
  );
}
