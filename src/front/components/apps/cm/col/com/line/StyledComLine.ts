import styled from 'styled-components';

export const StyledComLine = styled.div`
  white-space: normal;

  * {
    font-size: 1em;

    &::before,
    &::after {
      font-size: 1em;
    }
  }

  .chorded {
    display: inline-block;
    position: relative;
    line-height: 1;
    white-space: pre;

    &.pre,
    &.post,
    &.spaced-word {
      &::before,
      &::after {
        color: color-mix(in lch, currentColor 50%, var(--color--7));
      }
    }

    &:not(.pre):not(.post) {
      &.spaced-word::before {
        left: -0.2em;
      }

      &::before {
        left: 0;
      }
    }

    &:not(.post) {
      &::before,
      &::after {
        position: absolute;
        top: -1em;
        z-index: 0;
        pointer-events: none;
        font-size: 1em;
      }

      .fragment {
        &::before {
          content: attr(attr-pchord);
          position: absolute;
          top: -1em;
          left: 100%;
        }

        &::after {
          content: attr(attr-chord);
          display: block;
          margin-top: -1em;
          color: transparent;
          margin-right: 0.2em;
        }
      }
    }

    &.spaced-word:not(.post)::after {
      content: '.';
      top: 0;
      width: 0.3em;
      color: transparent;
      left: -0.3em;
      height: 1.2em;
    }

    &.pre::before,
    &:not(.pre):not(.post)::before {
      content: attr(attr-chord);
      max-width: 500px;
      white-space: nowrap;
    }

    &.pre::before {
      left: -0.5em;
    }

    &.post {
      .fragment {
        display: inline-block;
        position: relative;

        &::before {
          content: attr(attr-chord);
          display: block;
          margin-top: -1em;
          height: 1em;
        }
      }

      &::before {
        position: absolute;
        top: -1em;
        right: 0;
      }

      &::after {
        content: attr(attr-pchord);
        display: inline-block;
        position: relative;
        top: -1em;
        margin-left: 0.2em;
      }
    }
  }

  .whole-word,
  .spaced-word {
    [dash-divider]::before {
      display: none;
    }
  }

  .whole-word {
    [attr-chord] {
      &:has(+ [attr-chord]) {
        .fragment {
          position: relative;

          > span:has(span) {
            display: inline-flex;
            justify-content: space-between;
            width: 100%;

            [dash-divider]::before {
              content: ' - ';
              display: inline-block;
              color: var(--color--7);
            }
          }
        }
      }

      + [attr-chord] {
        &:before {
          color: var(--color--3);
        }

        + [attr-chord] {
          &:before {
            color: var(--text-color);
          }

          + [attr-chord] {
            &:before {
              color: var(--color--3);
            }

            + [attr-chord] {
              &:before {
                color: var(--text-color);
              }
            }
          }
        }
      }
    }
  }
`;
