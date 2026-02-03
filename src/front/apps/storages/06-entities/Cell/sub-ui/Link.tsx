import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link } from '@tanstack/react-router';
import { hosts } from 'shared/api';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeLink = (props: StoragesCellTypeProps<StoragesColumnType.Link>) => {
  const isEdit = useStoragesIsEditInnersContext();
  const linkValue = props.cell?.[1];

  if (!isEdit) {
    if (!linkValue) return;

    const isLocalLink = linkValue.startsWith(`${hosts.host}/`);
    const linkDisplay = isLocalLink ? linkValue.slice(hosts.host.length) : linkValue;

    const linkNode = (
      <span className="font-bold italic w-[calc(100cqw-50px)]! text-x7 underline ellipsis pointer">
        {isLocalLink && <span className="opacity-50">{hosts.host}</span>}
        {linkDisplay}
      </span>
    );

    return (
      <div className="flex gap-3 w-full">
        <span>{props.column.title} </span>

        <div className="flex gap-3 inline-flex leading-none w-full @container">
          {isLocalLink ? (
            <Link to={linkDisplay}>{linkNode}</Link>
          ) : (
            <a
              href={linkDisplay}
              target="_blank"
            >
              {linkNode}
            </a>
          )}

          <CopyTextButton
            text={linkValue}
            message={
              <>
                Скопировано <strong>{linkValue}</strong>
              </>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {props.columnTitleNode()}

        <InputWithLoadingIcon
          icon={props.icon}
          defaultValue={linkValue}
          strongDefaultValue
          onChanged={value =>
            storagesTsjrpcClient.editCellValue({
              value,
              cardi: props.card.i,
              rackw: props.rack.w,
              coli: props.coli,
              ...props.nestedSelectors,
            })
          }
        />
      </div>
    </>
  );
};
