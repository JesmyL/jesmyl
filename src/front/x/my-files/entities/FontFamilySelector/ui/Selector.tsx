import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useLiveQuery } from 'dexie-react-hooks';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { bundledFontFamilies, MyFileId } from 'x/my-files/shared/model/common';
import { MyFileType } from 'x/my-files/shared/model/enums';
import { myFilesIDB } from 'x/my-files/shared/state/idb';
import { applyFontFamilyFromMyFiles } from 'x/my-files/shared/utils/applyFontFamilyFromMyFiles';

interface Props {
  fileId?: MyFileId | null;
  onSelect: (fileId: MyFileId) => void;
}

export const MyFilesFontFamilySelector = ({ fileId, onSelect }: Props) => {
  const fonts = useLiveQuery(() => myFilesIDB.tb.files.where({ type: MyFileType.Font }).toArray());

  return (
    <Dropdown
      id={fileId ?? undefined}
      items={[
        ...Array.from(bundledFontFamilies, ([id, { title }]) => ({ id, title })),
        ...(fonts?.map(({ file, id }) => ({ id, title: file.name })) ?? []),
      ]}
      undTitle={translateBase(BaseLocaleKey.ByDefault)}
      onSelectId={fileId =>
        applyFontFamilyFromMyFiles(window, fileId).then(isLoaded => {
          if (!isLoaded) throw translateBase(BaseLocaleKey.Error);
          onSelect(fileId);
        })
      }
    />
  );
};
