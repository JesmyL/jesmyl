import styled from 'styled-components';
import { CmBlockStyleKey } from './BlockStyles.model';
import { StyleBlock } from './StyleBlock';

const makeStartsBlockStyleSelector = (key: CmBlockStyleKey) => `[${StyleBlock.blockStyleAttribute}^="${key}"]` as const;
const makeEndsBlockStyleSelector = (key: CmBlockStyleKey) => `[${StyleBlock.blockStyleAttribute}$="${key}"]` as const;

export const BlockStylesProvider = styled.div`
  html &,
  :is(&, html) {
    .composition-block {
      position: relative;
      margin-top: 1em;
      padding-left: 1em;
      white-space: nowrap;
      text-wrap: balance;
      word-wrap: normal;

      &:has(.styled-header.empty) {
        margin-top: 0.5em;
      }

      > .header {
        margin-right: 1em;
      }
    }

    .styled-header {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 0.5em;
      padding-top: 10px;
      margin-top: -10px;
      font-weight: bold;
      text-decoration: underline;

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.Enter)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Modulation)} {
        margin-left: 0.5em;
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.PTwo)} {
        font-style: italic;
      }

      &.anchor {
        margin: 10px 10px 10px 0;
        color: grey;
      }
    }

    .styled-block {
      .chords-block {
        margin-bottom: 0.5em;
        margin-left: 0.5em;
        white-space: pre-line;
      }

      &.chorded-block {
        .composition-line {
          line-height: 2.3em;
        }

        + [${StyleBlock.inheritBlockStyleAttribute}].without-chords {
          margin-top: -0.4em;
        }
      }

      &.without-chords {
        .composition-line {
          line-height: 1.5em;
        }

        + [${StyleBlock.inheritBlockStyleAttribute}].chorded-block {
          margin-top: 0.4em;
        }
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.Enter)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.PTwo)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Two)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Thirdo)} {
        margin-left: 0.5em;
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.OneWithShift)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Final)},
        &${makeEndsBlockStyleSelector(CmBlockStyleKey.Shift)},
        &${makeEndsBlockStyleSelector(CmBlockStyleKey.PlusPlusShift)} {
        margin-left: 1em;
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.Bridge)} {
        margin-left: 1.5em;
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.PTwo)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Bridge)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Final)} {
        font-style: italic;
      }

      &${makeStartsBlockStyleSelector(CmBlockStyleKey.Two)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Thirdo)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Final)},
        &${makeStartsBlockStyleSelector(CmBlockStyleKey.Bridge)} {
        font-weight: bold;
      }

      &${makeEndsBlockStyleSelector(CmBlockStyleKey.Plus)}, &${makeEndsBlockStyleSelector(CmBlockStyleKey.Shift)} {
        margin-top: 0;
      }
    }
  }
`;
