import { mylib } from 'front/utils';
import { useEffect, useReducer, useState } from 'react';
import { MyFileType } from 'shared/api';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import TheIcon from '../../../../../../complect/the-icon/TheIcon';
import { IconCancel01StrokeRounded } from '../../../../../../complect/the-icon/icons/cancel-01';
import { useIndexFileAssociations } from '../../../../atoms';
import { useRemoveMyFile } from '../hooks/remove-file';
import { filesStorage } from '../utils/storage';

export type FileAssociations = Record<
  MyFileType,
  { title: string; icon: KnownIconName; removeTitle: string; extensions: string[] }
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
        <TheIcon name={fileAssociations[type].icon} />
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
                Icon={IconCancel01StrokeRounded}
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
