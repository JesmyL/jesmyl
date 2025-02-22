import { mylib } from '#shared/lib/my-lib';
import { filesStorage } from '#shared/ui/configurators/utils/storage';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useIndexFileAssociations } from '@index/atoms';
import { useEffect, useReducer, useState } from 'react';
import { MyFileType } from 'shared/api';
import { useRemoveMyFile } from '../hooks/remove-file';

export type FileAssociations = Record<
  MyFileType,
  { title: string; icon: TheIconKnownName; removeTitle: string; extensions: string[] }
>;

const forceUpdater = (it: number) => it + 1;

export const MyFilesTypeBox = ({ type }: { type: MyFileType }) => {
  const fileAssociations = useIndexFileAssociations();
  const [files, setFiles] = useState<File[]>([]);
  const [updates, forceUpdate] = useReducer(forceUpdater, 0);
  const removeFile = useRemoveMyFile(type);

  useEffect(() => {
    (async () => {
      const files = await filesStorage.get(type);
      if (files === undefined) return;
      setFiles(mylib.values(files));
      forceUpdate();
    })();
  }, [type, updates]);

  if (fileAssociations === undefined) return null;

  return (
    <>
      <div className="flex flex-gap margin-gap-t padding-gap bgcolor--2">
        <LazyIcon icon={fileAssociations[type].icon} />
        <span className="color--3">{fileAssociations[type].title} </span>
        {!fileAssociations[type].extensions.length || '(.' + fileAssociations[type].extensions.join(', .') + ')'}
      </div>
      <div className="margin-big-gap-l">
        {files.map(file => {
          return (
            <div
              key={file.name}
              className="flex flex-gap margin-gap-t"
            >
              {file.name}
              <IconButton
                icon="Cancel01"
                confirm={`Удалить ${fileAssociations[type].removeTitle} "${file.name}"`}
                onClick={() => removeFile(file)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
