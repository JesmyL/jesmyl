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

  .break-word {
    word-break: break-word;
  }

  .hidden {
    visibility: hidden;
  }

  .over- {
    &hidden {
      overflow: hidden;
    }

    &x-hidden {
      overflow-x: hidden;
    }

    &y-hidden {
      overflow-y: hidden;
    }

    &visible {
      overflow: visible;
    }

    &x-visible {
      overflow-x: visible;
    }

    &y-visible {
      overflow-y: visible;
    }

    &auto {
      max-width: 100%;
      max-height: 100%;
      overflow: auto;
    }

    &x-auto {
      max-width: 100%;
      overflow-x: auto;
    }

    &y-auto {
      max-height: 100%;
      overflow-y: auto;
    }
  }

  .border-radius {
    border-radius: var(--main-gap);

    &-big {
      border-radius: var(--main-gap);
    }
  }

  .half-width {
    width: 50%;
  }

  .half-height {
    height: 50%;
  }

  .full-size,
  .full-width {
    width: 100%;
  }

  .full-size,
  .full-height {
    height: 100%;
  }

  .full-min-width {
    min-width: 100%;
  }

  .full-min-height {
    min-height: 100%;
  }

  .full-max-width {
    max-width: 100%;
  }

  .min-width-90 {
    min-width: 90%;
  }

  .full-max-height {
    max-height: 100%;
  }

  .half-height {
    height: 50%;
  }

  .min-height-30vh {
    min-height: 30vh;
  }

  .height-30vh {
    height: 30vh;

    &-strong {
      height: 30vh;
      min-height: 30vh;
      max-height: 30vh;
    }
  }

  .vertical-middle {
    vertical-align: middle;
  }

  .vertical-top {
    vertical-align: top;
  }

  .children-middle {
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .display-none {
    display: none;
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

    &.flex-gap {
      gap: var(--main-gap);
    }

    &.flex-big-gap {
      gap: var(--main-big-gap);
    }

    &.flex-wrap {
      flex-wrap: wrap;
    }

    &.flex-big-gap {
      gap: var(--main-big-gap);
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

  .text {
    &-strike {
      text-decoration: line-through;
    }

    &-underline {
      text-decoration: underline;
    }

    &-bold {
      font-weight: bold;
    }
  }

  .pointers-none {
    pointer-events: none;
  }

  .pointers-all {
    pointer-events: all;
  }

  .absolute {
    position: absolute;

    &.full-fill {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .relative {
    position: relative;
  }

  .margin-auto {
    margin: auto;
  }

  .absolute,
  .relative {
    &.pos- {
      &bottom,
      &sea,
      &all {
        bottom: 0;

        &-over {
          bottom: -100%;
        }
      }

      &top,
      &ski,
      &all {
        top: 0;
      }

      &left,
      &ski,
      &sea,
      &all {
        left: 0;
      }

      &right,
      &ski,
      &sea,
      &all {
        right: 0;
      }
    }
  }

  .float- {
    &left {
      float: left;
    }

    &right {
      float: right;
    }
  }

  .non-overscroll {
    overscroll-behavior: none;
  }

  .text-height-block {
    height: 1.3em;
  }

  .relative {
    position: relative;
  }

  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .inactive {
    opacity: 0.7;
  }

  [class~='font-size:0.7em'] {
    font-size: 0.7em;
  }

  .no-resize {
    resize: none;
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

  .strong-size {
    width: var(--size);
    min-width: var(--size);
    max-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    max-height: var(--size);
  }

  .text- {
    &center {
      text-align: center;
    }

    &right {
      text-align: right;
    }

    &italic {
      font-style: italic;
    }
  }
`;
