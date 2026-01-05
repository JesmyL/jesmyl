import { mylib } from '#shared/lib/my-lib';
import { indexIsDarkModeAtom } from '$index/shared/state';
import { atom, useAtomValue } from 'atomaric';
import { memo } from 'react';
import styled, { css } from 'styled-components';

const nodes: Record<number, React.ReactNode> = {};
const countAtom = atom(100, 'snow-weather:flake-count');

export const SnowWeather = memo(
  (props: { settingRender?: (props: { count: number; countAtom: typeof countAtom }) => React.ReactNode }) => {
    const count = useAtomValue(countAtom);
    const isDarkMode = useAtomValue(indexIsDarkModeAtom);

    const date = new Date();
    if (isDarkMode || (date.getMonth() > 1 && date.getMonth() !== 11)) return null;

    if (props.settingRender) return props.settingRender({ countAtom, count });
    if (nodes[count]) return nodes[count];

    return (nodes[count] ??= (
      <StyledSnowWeather className="relative top-0 left-0 w-[100vw] h-[100vh] overflow-hidden z-100000000">
        {Array.from({ length: count }, () => 0).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white -top-[30px]"
            style={{
              width: `${mylib.randomOf(1, 10) / 10}em`,
              height: `${mylib.randomOf(1, 10) / 10}em`,
              fontSize: `${mylib.randomOf(1, 3) / 8}em`,
              left: `${mylib.randomOf(0, 100)}%`,
              opacity: `${mylib.randomOf(1, 90) / 100}`,
              filter: `blur(${mylib.randomOf(1, 30) / 10}px)`,
              animation: `${animationPrefix}${mylib.randomIndex(animations)} ${mylib.randomOf(60, 300)}s linear infinite`,

              animationDelay: `${mylib.randomOf(-100, 200)}s`,
            }}
          />
        ))}
      </StyledSnowWeather>
    ));
  },
);

const animationPrefix = `snow-flake-fall-${Date.now()}-`;

const animations = Array.from({ length: 30 }, () => 0).map(
  (_, i) => css`
    @keyframes ${animationPrefix}${i} {
      from {
        transform: translate(0, -30px) rotate(0deg);
      }
      to {
        transform: translate(${mylib.randomOf(-500, 500)}px, 110vh) rotate(${mylib.randomOf(-5000, 5000)}deg);
      }
    }
  `,
);

const StyledSnowWeather = styled.div`
  pointer-events: none;

  * {
    border-radius: 50%;
    pointer-events: none;
    scale: 1;
    transition: scale 2s ease;

    @starting-style {
      scale: 0;
    }
  }

  ${animations}
`;
