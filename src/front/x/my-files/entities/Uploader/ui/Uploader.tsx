import { translateBase } from '#basis/locale';
import { defaultPreventer } from '#shared/lib/event-funcs';
import { ChangeEvent, useRef, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twMerge } from 'tailwind-merge';
import { MyFileBox } from 'x/my-files/shared/model/common';
import { addFileToMyFiles } from 'x/my-files/shared/utils/addFileToMyFiles';
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
        const type = takeFileType(file);

        return { file, id: await addFileToMyFiles(file, type), type };
      }),
    );

    if (fileBoxes.length && onChange) onChange(fileBoxes);

    setUpdated(Date.now());
  };

  return (
    <div className={twMerge('h-full w-full relative', className)}>
      <input
        key={updated}
        className="h-full w-full opacity-0 absolute z-20"
        type="file"
        multiple
        onClick={defaultPreventer}
        title=""
        onChange={handleOnChange}
      />
      {withButton && (
        <>
          <div
            className="flex flex-max p-2 bg-x6 text-x2 relative z-80"
            onClick={() => inputRef.current?.click()}
          >
            {translateBase(BaseLocaleKey.UploadFiles)}
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
