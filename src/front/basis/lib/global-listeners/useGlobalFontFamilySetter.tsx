import { indexIDB } from '$index/shared/state';
import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles, takeMyFileFontFamily } from 'x/my-files';

// Предзагруженный bundled-шрифт из fontStyles.ts (он же последний в --font-family):
// используется, если пользовательский шрифт так и не загрузился.
const fallbackFontFamily = 'main';

export const useGlobalFontFamilySetter = () => {
  const appFontFamilyId = indexIDB.useValue.appFontFamilyId();

  useEffect(() => {
    if (appFontFamilyId == null) return;

    const family = `"${takeMyFileFontFamily(appFontFamilyId)}"`;

    // Признак жизни эффекта: после смены шрифта или размонтирования поздние ответы
    // загрузки (включая отложенный повтор) не должны трогать стиль body.
    let isAlive = true;
    let retryTimeoutId: ReturnType<typeof setTimeout> | nil = null;

    // Применяем шрифт и выставляем inline-стиль только после реальной загрузки FontFace;
    // при неудаче один раз повторяем через секунду (переживаем занятую IDB сразу после
    // обновления service worker), а если и повтор не удался — ставим предзагруженный
    // bundled-шрифт main, чтобы пользователь всегда видел загруженный шрифт.
    const tryApplyFontFamily = async (isRetry: boolean) => {
      const isLoaded = await applyFontFamilyFromMyFiles(window, appFontFamilyId).catch(() => false);
      if (!isAlive) return;

      if (isLoaded) {
        document.body.style.fontFamily = family;
        return;
      }

      if (!isRetry) retryTimeoutId = setTimeout(() => void tryApplyFontFamily(true), 1000);
      else document.body.style.fontFamily = fallbackFontFamily;
    };

    void tryApplyFontFamily(false);

    return () => {
      isAlive = false;
      if (retryTimeoutId != null) clearTimeout(retryTimeoutId);
      document.body.style.fontFamily = '';
    };
  }, [appFontFamilyId]);
};
