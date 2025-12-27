import styled from 'styled-components';
import { CmComBlockKindKey } from './BlockKind.model';
import { KindBlock } from './KindBlock';

const makeStartsBlockKindSelector = (key: CmComBlockKindKey) => `[${KindBlock.blockKindAttribute}^="${key}"]` as const;
const makeEndsBlockKindSelector = (key: CmComBlockKindKey) => `[${KindBlock.blockKindAttribute}$="${key}"]` as const;

export const BlockKindProvider = styled.div`
  html &,
  :is(&, html) {
    .composition-block {
      position: relative;
      margin-top: 1em;
      padding-left: 1em;
      white-space: nowrap;
      ${'text-wrap: balance;'}
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

      &${makeStartsBlockKindSelector(CmComBlockKindKey.Enter)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Modulation)} {
        --styled-block-margin-left: 0.5rem;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.PTwo)} {
        font-style: italic;
      }

      &.anchor {
        margin: 10px 10px 10px 0;
        color: grey;
      }
    }

    .styled-block {
      margin-left: var(--styled-block-margin-left);

      .chords-block {
        margin-bottom: 0.5em;
        margin-left: 2em;
        white-space: pre-line;
      }

      &.chorded-block {
        .composition-line {
          line-height: 2.3em;
        }

        + [${KindBlock.inheritBlockKindAttribute}].without-chords {
          margin-top: -0.4em;
        }
      }

      &.without-chords {
        .composition-line {
          line-height: 1.5em;
        }

        + [${KindBlock.inheritBlockKindAttribute}].chorded-block {
          margin-top: 0.4em;
        }
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.Enter)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.PTwo)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Two)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Thirdo)} {
        --styled-block-margin-left: 0.5rem;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.OneWithShift)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Final)},
        &${makeEndsBlockKindSelector(CmComBlockKindKey.Shift)},
        &${makeEndsBlockKindSelector(CmComBlockKindKey.PlusPlusShift)} {
        --styled-block-margin-left: 1rem;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.Bridge)} {
        --styled-block-margin-left: 1.5rem;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.One)} {
        --styled-block-margin-left: 0.1rem;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.PTwo)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Bridge)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Final)} {
        font-style: italic;
      }

      &${makeStartsBlockKindSelector(CmComBlockKindKey.Two)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Thirdo)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Final)},
        &${makeStartsBlockKindSelector(CmComBlockKindKey.Bridge)} {
        font-weight: bold;
      }

      &${makeEndsBlockKindSelector(CmComBlockKindKey.Plus)}, &${makeEndsBlockKindSelector(CmComBlockKindKey.Shift)} {
        margin-top: 0;
      }
    }
  }
`;
