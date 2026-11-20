import { atom } from 'atomaric';
import { registerSW } from 'virtual:pwa-register';

/** Флаг готовой новой версии: по нему интерфейс показывает кнопку обновления. */
export const checkIsThereNewSWAtom = atom(false);

/** Сколько ждём активации нового воркера, прежде чем перезагрузить страницу сами. */
const updateReloadTimeoutMs = 10_000;

/** Признак того, что перезагрузку запросил пользователь кнопкой «Обновить». */
let isUpdateInitiated = false;

// Регистрируем service worker только там, где браузер его поддерживает.
if ('serviceWorker' in navigator) {
  // Ленивая регистрация (immediate: false): браузер сам проверяет новую версию в фоне,
  // а тост появляется, когда воркер уже готов к активации.
  registerSW({
    immediate: false,
    onNeedRefresh: () => checkIsThereNewSWAtom.set(true),
  });

  // controllerchange срабатывает и при первой установке, и после обновления, запущенного пользователем:
  // перезагружаем страницу только тогда, когда обновление запрошено кнопкой.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (isUpdateInitiated) window.location.reload();
  });
}

/** Единственная точка перезагрузки страницы — чтобы все фолбэки ниже вели себя одинаково. */
const reloadPage = () => window.location.reload();

/**
 * Кнопка «Обновить» работает всегда: принудительно проверяет скрипт воркера на сервере,
 * активирует найденный новый воркер и перезагружает страницу даже без новой версии.
 */
export const reloadSW = async () => {
  // Взводим флаг: верхний слушатель controllerchange по нему перезагрузит страницу,
  // когда новый воркер станет активным.
  isUpdateInitiated = true;

  // Без поддержки service worker остаётся только обычная перезагрузка страницы.
  if (!('serviceWorker' in navigator)) return reloadPage();

  // Ищем регистрацию: без неё обновлять воркер нечего, но страницу всё равно перезагружаем.
  let registration: ServiceWorkerRegistration | null = null;

  try {
    registration = (await navigator.serviceWorker.getRegistration()) ?? null;
  } catch {
    // Ошибка получения регистрации не должна мешать финальной перезагрузке.
  }

  if (!registration) return reloadPage();

  // Просим браузер заново скачать скрипт service worker — так новая версия появится,
  // даже если до нажатия кнопки воркер ещё не успел встать в ожидание.
  try {
    await registration.update();
  } catch {
    // Неудачная проверка обновления не отменяет перезагрузку страницы.
  }

  // Новый воркер может быть уже ожидающим или ещё устанавливающимся: оба поймут SKIP_WAITING.
  const newWorker = registration.waiting ?? registration.installing;

  // На сервере та же версия и нового воркера нет — обновлять нечего, просто перезагружаемся.
  if (!newWorker) return reloadPage();

  // Просим воркер пропустить ожидание: обработчик SKIP_WAITING уже есть в src/sw.ts.
  newWorker.postMessage({ type: 'SKIP_WAITING' });

  // Страховка: если воркер так и не активировался, перезагружаемся по таймауту.
  // Успешный controllerchange перезагрузит страницу раньше, и таймер умрёт вместе с документом.
  setTimeout(reloadPage, updateReloadTimeoutMs);
};

export const closeAllAppNotifications = async () => {
  // Без service worker уведомлений приложения не существует — выходим сразу.
  if (!('serviceWorker' in navigator)) return;

  // Работаем только с уже активной регистрацией: она отдаёт список показанных уведомлений.
  const registration = await navigator.serviceWorker.ready;

  // Закрываем каждое показанное уведомление, чтобы они не висели в системном центре.
  (await registration.getNotifications()).forEach(notification => notification.close());
};
