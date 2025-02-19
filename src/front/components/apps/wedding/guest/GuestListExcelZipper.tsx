import { TheButton } from '#shared/ui/Button';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { ISettings } from 'json-as-xlsx';
import { useState } from 'react';
import { WedGuest, WedGuestWillBe } from '../../../../../shared/api/complect/apps/wed/complect/model';
import {
  J2XSheet,
  J2XSheetColumn,
  Json2Excel,
} from '../../../../complect/schedule-widget/control/users/excel/Json2Excel';
import { FullContent } from '../../../../shared/ui/fullscreen-content/FullContent';

interface Props {
  setIsOpen: (is: boolean) => void;
  guests: WedGuest[];
}

export const GuestListExcelZipper = ({ setIsOpen, guests }: Props) => {
  const [settings, setSettings] = useState<ISettings>({ fileName: 'Список гостей' });

  return (
    <FullContent onClose>
      <KeyboardInput
        value={settings.fileName}
        onChange={fileName => setSettings(prev => ({ ...prev, fileName }))}
      />
      <TheButton
        onClick={() => {
          const resolvedGuests: WedGuest[] = [];
          const rejectedGuests: WedGuest[] = [];
          const undefinedGuests: WedGuest[] = [];
          const content: J2XSheet<WedGuest>[] = [];

          const columns: J2XSheetColumn<WedGuest>[] = [
            { label: 'Имя', value: 'fn' },
            { label: 'Фамилия', value: 'ln' },
            { label: 'Жена', value: 'wn' },
            { label: 'Пол', value: guest => (guest.s ? 'М' : 'Ж') },
            { label: 'Комментарий', value: 't' },
            { label: 'Отправлено', value: guest => (guest.g ? 'ДА' : 'нет') },
          ];

          guests.forEach(guest => {
            if (guest.w === WedGuestWillBe.Yes) resolvedGuests.push(guest);
            else if (guest.w === WedGuestWillBe.No) rejectedGuests.push(guest);
            else undefinedGuests.push(guest);
          });

          if (resolvedGuests.length)
            content.push({
              sheet: 'Будут присутствовать',
              columns,
              content: resolvedGuests,
            });

          if (rejectedGuests.length)
            content.push({
              sheet: 'Не придут',
              columns,
              content: rejectedGuests,
            });

          if (undefinedGuests.length)
            content.push({
              sheet: 'Не определились',
              columns,
              content: undefinedGuests,
            });

          Json2Excel.convert(content, settings);

          setIsOpen(false);
        }}
      >
        Сформировать Excel
      </TheButton>
    </FullContent>
  );
};
