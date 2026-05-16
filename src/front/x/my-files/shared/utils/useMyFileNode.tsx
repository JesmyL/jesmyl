import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { useLiveQuery } from 'dexie-react-hooks';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { MyFileBoxId, MyFileType } from 'x/my-files';
import { myFilesIDB } from '../state/idb';

const style: CSSProperties = {
  position: 'absolute',
  objectFit: 'cover',
};

export const useMyFileNode = (bgFileId: MyFileBoxId | nil) => {
  const [background, setBackground] = useState<ReactNode>(null);
  const fileBox = useLiveQuery(
    async () => (bgFileId == null ? bgFileId : myFilesIDB.tb.files.get(bgFileId)),
    [bgFileId],
  );

  useEffect(() => {
    if (fileBox == null) {
      setBackground(fileBox);
      return;
    }

    (async () => {
      const src = await convertFileToBase64(fileBox.file);

      switch (fileBox.type) {
        case MyFileType.Video: {
          setBackground(
            <video
              autoPlay
              muted
              loop
              src={src}
              className="full-size pointers-none"
              style={style}
            />,
          );
          break;
        }

        case MyFileType.Image: {
          setBackground(
            <img
              alt=""
              src={src}
              className="full-size pointers-none"
              style={style}
            />,
          );
          break;
        }
      }
    })();
  }, [fileBox]);

  return background;
};
