import { BackgroundNameType } from '#basis/model/BackgroundNameType';
import Dropdown from 'front/08-shared/ui/dropdown/Dropdown';
import { DropdownItem } from 'front/08-shared/ui/dropdown/Dropdown.model';
import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { filesStorage } from '../../../07-basis/lib/consts/index/filesStorage';

interface Props {
  background?: BackgroundNameType;
  onSelect: (background: BackgroundNameType) => void;
}

export const BackgroundSelector = ({ background, onSelect }: Props) => {
  const [items, setItems] = useState<DropdownItem<BackgroundNameType>[]>([]);

  useEffect(() => {
    (async () => {
      const videos = await filesStorage.getOr('video', {});
      const images = await filesStorage.getOr('image', {});

      setItems([
        ...mylib.keys(videos).map((title): DropdownItem<BackgroundNameType> => ({ id: `video/${title}`, title })),
        ...mylib.keys(images).map((title): DropdownItem<BackgroundNameType> => ({ id: `image/${title}`, title })),
      ]);
    })();
  }, []);

  return (
    <Dropdown
      id={background}
      items={items}
      undTitle="По умолчанию"
      onSelectId={onSelect}
    />
  );
};
