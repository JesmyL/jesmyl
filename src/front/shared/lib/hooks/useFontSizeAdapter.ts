import { useLayoutEffect, useRef, useState } from 'react';

const metric = 'px';

export const useBibleBroadcastScreenFontSizeAdapter = (
  content: string,
  subUpdater: string | number,
  isCheckWidthOnly?: boolean,
) => {
  // Флаг готовности: false во время расчетов, true когда всё подогнано
  const [isReady, setIsReady] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAdjusting = useRef(false);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = contentRef.current;

    if (!wrapper || !container || !content) return;

    const adjustFontSize = () => {
      if (isAdjusting.current) return;
      isAdjusting.current = true;

      // 1. Мгновенно тушим готовность, чтобы скрыть изменения макета
      setIsReady(false);

      const containerStyle = container.style;
      const wrapperRect = wrapper.getBoundingClientRect();
      const wWidth = wrapperRect.width;
      const wHeight = wrapperRect.height;

      const currentFontSize = containerStyle.fontSize.endsWith(metric) ? parseFloat(containerStyle.fontSize) : 16;

      const cWidth = container.clientWidth;
      const cHeight = container.clientHeight;

      if (!cWidth || !cHeight || !wWidth || !wHeight) {
        isAdjusting.current = false;
        return;
      }

      // --- ШАГ 1: ГИГАНТСКИЙ МАТЕМАТИЧЕСКИЙ ПРЫЖОК ---
      let ratio = 1;
      if (isCheckWidthOnly) {
        ratio = wWidth / cWidth;
      } else {
        // Расчет по площади (Math.sqrt)
        const parentArea = wWidth * wHeight;
        const childArea = cWidth * cHeight;
        ratio = Math.sqrt(parentArea / childArea);
      }

      // Берем базовый безопасный прыжок с коэффициентом 0.9
      let newFontSize = Math.floor(currentFontSize * ratio * 0.9);
      newFontSize = Math.max(12, Math.min(newFontSize, 500));
      containerStyle.fontSize = newFontSize + metric;

      // Первичная грубая коррекция на случай, если вылетели одиночные слова
      if (container.clientWidth > wWidth || (!isCheckWidthOnly && container.clientHeight > wHeight)) {
        const overflowWidthRatio = wWidth / container.clientWidth;
        const overflowHeightRatio = wHeight / container.clientHeight;
        const finalRatio = isCheckWidthOnly ? overflowWidthRatio : Math.min(overflowWidthRatio, overflowHeightRatio);

        newFontSize = Math.floor(newFontSize * finalRatio * 0.98);
        containerStyle.fontSize = newFontSize + metric;
      }

      // --- ШАГ 2: СИНХРОННАЯ ДОВОДКА ДО ИДЕАЛА (ПРОХОД ВПЕРЕД) ---
      // Аккуратно увеличиваем по 1 пикселю, пока текст гарантированно помещается в границы экрана.
      // Благодаря ШАГу 1 этот цикл сработает всего 2-4 раза, что займет менее 0.1 миллисекунды.
      let limit = 20; // Защита от бесконечного цикла
      while (
        container.clientWidth <= wWidth &&
        (isCheckWidthOnly || container.clientHeight <= wHeight) &&
        newFontSize < 500 &&
        limit-- > 0
      ) {
        newFontSize += 1;
        containerStyle.fontSize = newFontSize + metric;
      }

      // --- ШАГ 3: ФИКСАЦИЯ ГРАНИЦЫ (ОТКАТ НА 1 ШАГ НАЗАД) ---
      // Так как цикл while остановился только тогда, когда текст ВЫЛЕЗ за границы,
      // мы делаем ровно один шаг назад (-1px), чтобы получить максимально возможный идеальный размер.
      newFontSize -= 1;
      containerStyle.fontSize = newFontSize + metric;

      // 2. Включаем готовность, когда подгон завершен.
      // Перенос в requestAnimationFrame гарантирует, что стейт обновится после применения стилей.
      requestAnimationFrame(() => {
        setIsReady(true);
        isAdjusting.current = false;
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!isAdjusting.current) {
        adjustFontSize();
      }
    });

    resizeObserver.observe(wrapper);
    adjustFontSize();

    return () => resizeObserver.disconnect();
  }, [content, subUpdater, isCheckWidthOnly]);

  return [wrapperRef, contentRef, isReady] as const;
};
