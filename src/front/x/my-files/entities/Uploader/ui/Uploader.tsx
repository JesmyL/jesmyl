import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { defaultPreventer } from '#shared/lib/event-funcs';
import md5 from 'md5';
import { ChangeEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MyFileBox, MyFileBoxId } from 'x/my-files/shared/model/common';
import { myFilesIDB } from 'x/my-files/shared/state/idb';
import { takeFileType } from '../lib/takeFileType';

export const MyFilesUploader = ({
  withButton,
  onChange,
  children,
  className,
}: {
  className?: string;
  withButton?: boolean;
  onChange?: (files: MyFileBox[]) => void;
  children?: React.ReactNode;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [updated, setUpdated] = useState(0);

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fileBoxes = await Promise.all(
      Array.from(event.target?.files ?? []).map(async file => {
        const prevFileBox = await myFilesIDB.tb.files.get({ 'file.name': file.name });

        if (prevFileBox?.file.size === file.size) return prevFileBox;

        const id = md5(await convertFileToBase64(file)) as MyFileBoxId;
        const box = { file, id, type: takeFileType(file.type) };

        myFilesIDB.tb.files.put(box);

        return box;
      }),
    );

    if (fileBoxes.length && onChange) onChange(fileBoxes);

    setUpdated(Date.now());
  };

  return (
    <div className={twMerge('h-full w-full relative', className)}>
      <input
        key={updated}
        className="h-full w-full opacity-0 absolute z-70"
        type="file"
        multiple
        onClick={defaultPreventer}
        onChange={handleOnChange}
      />
      {withButton && (
        <>
          <div
            className="flex flex-max p-2 bg-x6 text-x2 relative z-80"
            onClick={() => inputRef.current?.click()}
          >
            Загрузить файлы
          </div>
          <input
            key={updated + 100}
            ref={inputRef}
            hidden
            type="file"
            multiple
            onChange={handleOnChange}
          />
        </>
      )}
      {children}
    </div>
  );
};
