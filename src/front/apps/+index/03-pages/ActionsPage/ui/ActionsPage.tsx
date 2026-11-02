import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase, translateEditorBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import IconConfigurator from '#shared/ui/configurators/Icon';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { hostConfig } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { checkIsStartsWith } from 'shared/utils/checkIs';
import { toast } from 'sonner';

let isOpenAtom: Atom<boolean>;

export function IndexActionsPage() {
  isOpenAtom ??= atom(false);

  const onHrefData = LinkAppActionFabric.useOnHrefData();
  const appName = useAppNameContext();
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <PageContainerConfigurer
      className=""
      headTitle={translateBase(BaseLocaleKey.Interactive)}
      contentClass="flex column p-2"
      content={
        <>
          <BrutalItem
            iconNode={<LazyIcon icon="QrCode01" />}
            title={translateBase(BaseLocaleKey.ReadQR)}
            onClick={isOpenAtom.do.toggle}
          />
          <Link
            to="/!other/$appName/actions/files"
            params={{ appName }}
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="File02" />}
              title={translateBase(BaseLocaleKey.MyFiles)}
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
              title={translateBase(BaseLocaleKey.Downloads)}
              idPostfix="down"
            />
          </Link>

          {!checkAccess('dash', 'DASH') || (
            <Link
              to="/!other/$appName/actions/dash"
              params={{ appName }}
              className="w-full"
            >
              <BrutalItem
                iconNode={<LazyIcon icon="DashboardSpeed01" />}
                title={translateEditorBase(EditorLocaleKey.VisitsDashboard)}
                idPostfix="visits-dashboard"
              />
            </Link>
          )}

          <IconConfigurator
            key="pick-icon"
            className="w-full"
            icon="SearchVisual"
            header={translateBase(BaseLocaleKey.ConfigPickIcon)}
            keepOpen
            onSend={async icon => {
              toast(
                <span className="flex items-center gap-2">
                  <LazyIcon icon={icon} />
                  {icon}
                </span>,
                {
                  ...makeToastOKMoodConfig(),
                  action: {
                    label: translateBase(BaseLocaleKey.Copy),
                    onClick: () => {
                      navigator.clipboard.writeText(icon);
                      toast(translateBase(BaseLocaleKey.ConfigTextCopied), makeToastOKMoodConfig());
                    },
                  },
                },
              );
            }}
            trigger={
              <BrutalItem
                iconNode={<LazyIcon icon="SearchVisual" />}
                title={translateBase(BaseLocaleKey.ConfigPickIcon)}
              />
            }
          />

          <QrReader
            openAtom={isOpenAtom}
            onReadData={value => {
              if (checkIsStartsWith(value, hostConfig.url)) {
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
