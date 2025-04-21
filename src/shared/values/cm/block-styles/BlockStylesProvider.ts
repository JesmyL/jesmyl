import styled from 'styled-components';
import { CmBlockStyleKey } from './BlockStyles.model';

const makeBlockStyleSelector = (key: CmBlockStyleKey) => `[block-style="${key}"]` as const;

export const BlockStylesProvider = styled.div`
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
    font-weight: bold;
    text-decoration: underline;

    &${makeBlockStyleSelector(CmBlockStyleKey.Enter)}, &${makeBlockStyleSelector(CmBlockStyleKey.Trans)} {
      margin-left: 0.5em;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.PTwo)} {
      font-style: italic;
    }

    &.anchor {
      margin: 10px 10px 10px 0;
      color: grey;
    }
  }

  .styled-block {
    &.chords-block {
      margin-bottom: 0.5em;
      margin-left: 0.5em;
      white-space: pre-line;
    }

    &.chorded-block {
      .composition-line {
        line-height: 2.3em;
      }

      + .inherit.without-chords {
        margin-top: -0.4em;
      }
    }

    &.without-chords {
      .composition-line {
        line-height: 1.5em;
      }

      + .inherit.chorded-block {
        margin-top: 0.4em;
      }
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.Enter)},
      &${makeBlockStyleSelector(CmBlockStyleKey.PTwo)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Two)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Thirdo)} {
      margin-left: 0.5em;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.ShiftOne)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Shift)},
      &${makeBlockStyleSelector(CmBlockStyleKey.PlusPlusShift)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Final)} {
      margin-left: 1em;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.Bridge)} {
      margin-left: 1.5em;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.PTwo)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Bridge)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Final)} {
      font-style: italic;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.Two)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Thirdo)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Final)},
      &${makeBlockStyleSelector(CmBlockStyleKey.Bridge)} {
      font-weight: bold;
    }

    &${makeBlockStyleSelector(CmBlockStyleKey.Plus)}, &${makeBlockStyleSelector(CmBlockStyleKey.Shift)} {
      margin-top: 0;
    }
  }
`;
