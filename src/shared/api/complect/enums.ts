/** Идентификатор устройства: плейсхолдер '{DEVICE_ID}' заменяется реальным id на этапе сборки. */
export const enum DeviceId {
  /** def: плейсхолдер, заменяемый реальным id устройства на этапе сборки. */
  def = '{DEVICE_ID}',
}

/** Тип устройства, с которого клиент открыл приложение. */
export const enum SokiDeviceType {
  /** iPhone: телефон Apple на iOS. */
  iPhone = 0,
  /** iPad: планшет Apple на iPadOS. */
  iPad = 1,
  /** Android: телефон или планшет на Android. */
  Android = 2,
  /** Pc: настольный компьютер или ноутбук. */
  Pc = 3,
}

export const enum IsInvitedGuestCome {
  Ignored,
  WillBe,
  Pass,
}

/** Язык интерфейса: числовой код стабилен для хранения и передачи между клиентом и сервером. */
export const enum Langi {
  /** Ru: русский язык. */
  Ru = 0,
  /** Ua: украинский язык. */
  Ua = 1,
  /** Kz: казахский язык. */
  Kz = 2,
  /** En: английский язык. */
  En = 3,
}

export type LangCode = 'ru' | 'ua' | 'kz' | 'en';
