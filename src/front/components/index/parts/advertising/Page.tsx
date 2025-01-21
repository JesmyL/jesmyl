import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { atom, useAtom } from '../../../../complect/atoms';
import Dropdown from '../../../../complect/dropdown/Dropdown';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import IconCheckbox from '../../../../complect/the-icon/IconCheckbox';
import { useAuth } from '../../atoms';

const bannersCountItems = [0, 10, 20, 30, 40, 50, 80, 100, 120, 150, 170, 200].map(num => {
  return {
    id: num,
    title: `Показывать ${num} банеров`,
  };
});

const isAutoScrollAtom = atom(false, 'index', 'isAdvertisingPageAutoScroll');

export default function IndexAdvertisingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bannersCount, setBannersCount] = useState(+localStorage.countOfAdvertisingBanners || 30);
  const [isAutoScroll, setIsAutoScroll] = useAtom(isAutoScrollAtom);
  const auth = useAuth();

  useEffect(() => {
    if (containerRef.current === null) return;
    const containerNode = containerRef.current;

    const advertisingPlaceNode = document.getElementById('yandex_rtb_R-A-place');
    const advertisingFloatNode = document.getElementById('yandex_rtb_R-A-float');

    if (advertisingPlaceNode === null || advertisingFloatNode === null) return;

    containerNode.appendChild(advertisingFloatNode);

    return () => {
      advertisingPlaceNode.appendChild(advertisingFloatNode);
    };
  }, []);

  useEffect(() => {
    if (!isAutoScroll || containerRef.current === null) return;
    const containerNode = containerRef.current;

    let prevScrollTop = 0;
    let noScrollActionCount = 0;

    const scrollInterval = setInterval(() => {
      containerNode.scrollTop += 50;

      if (prevScrollTop === containerNode.scrollTop) noScrollActionCount++;
      else noScrollActionCount = 0;

      prevScrollTop = containerNode.scrollTop;

      if (noScrollActionCount++ < 20) return;

      clearInterval(scrollInterval);
      window.location.reload();
    }, 300);

    return () => clearInterval(scrollInterval);
  }, [isAutoScroll]);

  useEffect(() => {
    localStorage.countOfAdvertisingBanners = bannersCount;
  }, [bannersCount]);

  return (
    <StyledContainer
      className="index-advertising"
      headTitle="Сторонняя реклама"
      contentRef={containerRef}
      head={
        <>
          <IconCheckbox
            postfix="авто-скролл"
            className="nowrap margin-gap-r"
            checked={isAutoScroll}
            onChange={setIsAutoScroll}
          />
        </>
      }
      content={
        <>
          <Dropdown
            id={bannersCount}
            items={bannersCountItems}
            onSelectId={setBannersCount}
          />
          {auth.level === 100 && (
            <div className="flex column flex-gap margin-gap-v">
              <a
                href="https://partner.yandex.ru/v2/settings/blocking/"
                className="text-underline color--7 pointer"
                target="_blank"
                rel="noreferrer"
              >
                Блокировка рекламных ресурсов
              </a>
              <a
                href="https://partner.yandex.ru/v2/dashboard/"
                className="text-underline color--7 pointer"
                target="_blank"
                rel="noreferrer"
              >
                Дашборд
              </a>
            </div>
          )}
        </>
      }
    />
  );
}

const StyledContainer = styled(PhaseContainerConfigurer)`
  .content {
    scroll-behavior: smooth;
  }
`;
