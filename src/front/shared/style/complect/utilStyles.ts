import { css } from 'styled-components';

export const utilStyles = css`
  .inline-block {
    display: inline-block;
  }

  .inline {
    display: inline;
  }

  .block {
    display: block;
  }

  .disabled,
  :disabled {
    opacity: 0.5;

    &:not(.clickable) {
      pointer-events: none;
    }
  }

  .ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .white-pre {
    white-space: pre;

    &-line {
      white-space: pre-line;
    }

    &-wrap {
      white-space: pre-wrap;
    }

    &-children {
      > * {
        white-space: pre;
      }
    }
  }

  .break-wrap {
    word-wrap: break-word;
  }

  .nowrap {
    white-space: nowrap;
  }

  .hidden {
    visibility: hidden;
  }

  .over-hidden {
    overflow: hidden;
  }

  .full-size,
  .w-full {
    width: 100%;
  }

  .full-size,
  .h-full {
    height: 100%;
  }

  .children-middle {
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .flex {
    display: flex;
  }

  .inline-flex {
    display: inline-flex;
  }

  .flex,
  .inline-flex {
    &.flex-max {
      width: max-content;
    }

    &.flex-wrap {
      flex-wrap: wrap;
    }

    &:not(.custom-align-items) {
      align-items: center;
    }

    &.between {
      justify-content: space-between;
    }

    &.around {
      justify-content: space-around;
    }

    &.center {
      justify-content: center;
    }

    &.column {
      flex-direction: column;

      &-reverse {
        flex-direction: column-reverse;
      }
    }

    &.start {
      justify-content: start;
    }

    &.flex-end {
      justify-content: end;
    }

    &.flex-start {
      justify-content: flex-start;
    }
  }

  .self {
    &-start {
      align-self: self-start;
    }

    &-center {
      align-self: center;
    }
  }

  .pointers {
    &-none {
      pointer-events: none;
    }
    &-all {
      pointer-events: all;
    }
  }

  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .for-print {
    &.canvas {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: white;
      overflow: auto;

      @media print {
        overflow: visible;
      }
    }

    &.print-as-a4 {
      page-break-inside: avoid;
      height: 29.7cm;
    }

    &.break-inside-avoid {
      page-break-inside: avoid;
    }
  }
`;
