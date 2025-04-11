import { mylib } from '#shared/lib/my-lib';
import styled, { css, keyframes } from 'styled-components';

export const IconProvider = (props: { children: React.ReactNode }) => <StyledProvider {...props} />;

const fillIconAnimation = keyframes`${css`
  to {
    stroke-dashoffset: 0;
  }
`}`;

const attrShorts = {
  f: 'fill: var(--icon-fill);',
  s: 'stroke: var(--icon-stroke);',
  sw: 'stroke-width: var(--icon-stroke-width);',

  c: 'clip-rule: evenodd;',
  fr: 'fill-rule: evenodd;',
  h1: 'height: 10px;',
  h2: 'height: 11px;',
  h3: 'height: 13px;',
  h4: 'height: 18px;',
  h5: 'height: 19px;',
  h6: 'height: 20px;',
  h7: 'height: 3px;',
  h8: 'height: 4px;',
  h9: 'height: 6px;',
  h0: 'height: 8.5px;',
  o1: 'opacity: 0.3;',
  o2: 'opacity: 0.34;',
  o3: 'opacity: 0.44;',
  o4: 'opacity: 0.5;',
  o5: 'opacity: 0.54;',
  o6: 'opacity: 0.93;',
  o7: 'opacity: 0.4;',
  s1: 'stroke-dasharray: 0.5 3;',
  s2: 'stroke-dasharray: 1 3;',
  s3: 'stroke-dasharray: 3 2;',
  s4: 'stroke-dasharray: 3 3;',
  sr: 'stroke-linecap: round;',
  ss: 'stroke-linecap: square;',
  sb: 'stroke-linejoin: bevel;',
  sj: 'stroke-linejoin: round;',
  m1: 'stroke-miterlimit: 10;',
  m2: 'stroke-miterlimit: 16;',
  t1: 'transform: matrix(1 0 0 1 16 8);',
  t2: 'transform: matrix(1 0 0 1 20 2.5);',
  t3: 'transform: matrix(1 0 0 1 20.5 2);',
  t4: 'transform: matrix(1 0 0 1 21 16);',
  t5: 'transform: matrix(1 0 0 1 22 9);',
  t6: 'transform: matrix(1 0 0 1 8 3);',
  t7: 'transform: matrix(4.37114e08 1 1 4.37114e08 15 22);',
  t8: 'transform: matrix(4.37114e08 1 1 4.37114e08 15 8);',
  t9: 'transform: matrix(4.37114e08 1 1 4.37114e08 15.0005 22);',
  t0: 'transform: matrix(4.37114e08 1 1 4.37114e08 21 22);',
  t: 'transform: matrix(4.37114e08 1 1 4.37114e08 9 2);',
  t_: 'transform: rotate(90 10 6);',
  w1: 'width: 10px;',
  w2: 'width: 11px;',
  w3: 'width: 12px;',
  w4: 'width: 13px;',
  w5: 'width: 16px;',
  w6: 'width: 17.5px;',
  w7: 'width: 18px;',
  w8: 'width: 19px;',
  w9: 'width: 19.5px;',
  w0: 'width: 20px;',
  w: 'width: 3px;',
  w_: 'width: 4px;',
};

const StyledProvider = styled.div`
  :is(html, &) .the-icon[the-icon],
  .the-icon[the-icon] {
    --icon-size: 24px;
    --icon-scale: 1;
    --icon-fill: var(--icon-color);
    --icon-stroke: var(--icon-color);

    scale: var(--icon-scale);
    width: var(--icon-size);
    min-width: var(--icon-size);
    max-width: var(--icon-size);
    height: var(--icon-size);
    min-height: var(--icon-size);
    max-height: var(--icon-size);

    ${Object.entries(attrShorts).map(([key, value]) => `[i-c~='${key}']{${value}}`)}

    &.with-animation {
      path {
        --stroke-length: 80;
        stroke-dasharray: var(--stroke-length);
        stroke-dashoffset: var(--stroke-length);
        animation: ${fillIconAnimation} 1s ease forwards;
      }

      ${(() => {
        const parentArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = [];

        for (let i = 0; i < parentArr.length; i++) {
          const arr = parentArr.slice(0, parentArr[i] + 1);
          let nthChild = 1;

          while (arr.length) {
            const index = mylib.randomOf(0, arr.length - 1);
            const delay = arr[index] - 1;

            if (delay)
              result.push(css`
                &:has(:nth-child(${parentArr[i] + 1}):last-child) path:nth-child(${nthChild}) {
                  animation-delay: ${delay / 10}s;
                }
              `);

            arr.splice(index, 1);
            nthChild++;
          }
        }

        return result;
      })()}
    }
  }
`;
