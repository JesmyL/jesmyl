import { filer } from '../../complect/filer/Filer';
import smylib from '../../shared/SMyLib';
import { WedGuest } from './model';

export default function wedService(key: string, value: unknown) {
  return new Promise((resolve, reject) => {
    if (key === 'getGuest' && smylib.isNum(value)) {
      const guests: WedGuest[] = filer.contents.wed?.guests?.data ?? [];

      const guest = guests.find(guest => guest.mi === value);

      if (guest) resolve(guest);
      else reject('Ошибка. Участник не найден');
      return;
    }

    reject('Ошибка 973519002384');
  });
}
