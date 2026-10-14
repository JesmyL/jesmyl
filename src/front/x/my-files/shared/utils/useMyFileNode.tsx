import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { BackgroundMediaNode } from '#shared/ui/BackgroundMediaNode';
import { useLiveQuery } from 'dexie-react-hooks';
import { ReactNode, useEffect, useState } from 'react';
import { MyFileBoxId, MyFileType } from 'x/my-files';
import { myFilesIDB } from '../state/idb';

export const useMyFileNode = (bgFileId: MyFileBoxId | nil) => {
  const [background, setBackground] = useState<ReactNode>(null);
  const fileBox = useLiveQuery(
    async () => (bgFileId == null ? bgFileId : myFilesIDB.tb.files.get(bgFileId)),
    [bgFileId],
  );

  useEffect(() => {
    if (fileBox == null || (fileBox.type !== MyFileType.Image && fileBox.type !== MyFileType.Video)) {
      setBackground(null);
      return;
    }

    let isActive = true;

    convertFileToBase64(fileBox.file).then(src => {
      if (isActive)
        setBackground(
          <BackgroundMediaNode
            src={src}
            isVideo={fileBox.type === MyFileType.Video}
          />,
        );
    });

    return () => {
      isActive = false;
    };
  }, [fileBox]);

  return background;
};
