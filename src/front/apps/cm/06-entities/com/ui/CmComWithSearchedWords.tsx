import { makeStyleNode } from '$cm/shared/lib/makeStyleNode';
import { css } from '@emotion/react';
import React from 'react';
import { CmComWid } from 'shared/api';
import { CmComWordFounds } from '../model/com';

export const CmComWithSearchedWords = (props: {
  wordFounds: Required<CmComWordFounds>[CmComWid];
  children: React.ReactNode;
}) => {
  return (
    <>
      {props.children}
      {makeStyleNode(css`
        ${props.wordFounds.map(({ linei, ordw, wordi }) => {
          const ends = `$='.${`${ordw}`.padStart(2, '0')}'`;

          return css`
            [anchor-ord='${ordw}'],
            [anchor-ord${ends}],
            [ord-selector='${ordw}'],
            [ord-selector${ends}] {
              [ord-linei='${linei}'] [line-wordi='${wordi}'] span {
                background-color: var(--color-x2);
              }
            }
          `;
        })}
      `)}
    </>
  );
};
