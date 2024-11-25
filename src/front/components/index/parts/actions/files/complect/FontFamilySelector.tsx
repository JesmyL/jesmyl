import { MyLib } from 'front/utils';
import { useEffect, useState } from 'react';
import Dropdown from '../../../../../../complect/dropdown/Dropdown';
import { DropdownItem } from '../../../../../../complect/dropdown/Dropdown.model';
import { filesStorage } from '../utils/storage';

interface Props {
  fontFamily?: string | null;
  onSelect: (fontFamily: string) => void;
}

export const FontFamilySelector = ({ fontFamily, onSelect }: Props) => {
  const [items, setItems] = useState<DropdownItem<string>[]>([]);

  useEffect(() => {
    (async () => {
      const fonts = await filesStorage.get('font');
      if (fonts === undefined) return;

      setItems(MyLib.entries(fonts).map(([id]) => ({ id, title: id })));
    })();
  }, []);

  return (
    <Dropdown
      id={fontFamily ?? undefined}
      items={items}
      undTitle="По умолчанию"
      onSelectId={onSelect}
    />
  );
};
