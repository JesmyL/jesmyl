import { useLiveQuery } from 'dexie-react-hooks';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';
import { MyFileType } from 'x/my-files/shared/model/enums';
import { myFilesIDB } from 'x/my-files/shared/state/idb';

export const FileListByType = ({ type }: { type: MyFileType }) => {
  const files = useLiveQuery(() => myFilesIDB.tb.files.where({ type }).toArray(), [type]);

  return (
    <div>
      <div className="font-bold">{myFilesConfig[type].title}</div>
      {files?.map(({ id, file }) => <div key={id}>{file.name}</div>)}
    </div>
  );
};
