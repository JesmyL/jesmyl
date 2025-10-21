import { mylib } from '#shared/lib/my-lib';
import { filesStorage } from '#shared/ui/configurators/utils/storage';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useIndexFileAssociations } from '$index/shared/state';
import { useEffect, useReducer, useState } from 'react';
import { MyFileType } from 'shared/api';
import { useIndexMyFilesTypeBoxRemoveFile } from '../lib/remove-file';

export type IndexMyFilesTypeBoxAssociations = Record<
  MyFileType,
  { title: string; icon: KnownStameskaIconName; removeTitle: string; extensions: string[] }
>;

const forceUpdater = (it: number) => it + 1;

export const IndexMyFilesTypeBox = ({ type }: { type: MyFileType }) => {
  const fileAssociations = useIndexFileAssociations();
  const [files, setFiles] = useState<File[]>([]);
  const [updates, forceUpdate] = useReducer(forceUpdater, 0);
  const removeFile = useIndexMyFilesTypeBoxRemoveFile(type);

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
      <div className="flex gap-2 mt-2 p-2 bg-x2">
        <LazyIcon icon={fileAssociations[type].icon} />
        <span className="text-x3">{fileAssociations[type].title} </span>
        {!fileAssociations[type].extensions.length || '(.' + fileAssociations[type].extensions.join(', .') + ')'}
      </div>
      <div className="ml-5">
        {files.map(file => {
          return (
            <div
              key={file.name}
              className="flex gap-2 mt-2"
            >
              {file.name}
              <TheIconButton
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
