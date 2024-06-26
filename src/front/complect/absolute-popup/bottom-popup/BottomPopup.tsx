import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThrowEvent } from '../../eventer/ThrowEvent';
import Portal from '../../popups/[complect]/Portal';
import useMountTransition from '../../popups/useMountTransition';

export const BottomPopup = ({ content, close }: { content: ReactNode; close: () => void }) => {
  const popupContainer = useRef<HTMLDivElement>(null);
  const contentContainer = useRef<HTMLDivElement>(null);
  const overContentContainer = useRef<HTMLDivElement>(null);
  const [isMounted, className] = useMountTransition(true, '', 500);

  useEffect(() => ThrowEvent.listenKeyDown('Escape', () => close()), [close]);

  useEffect(() => {
    if (popupContainer.current === null) return;

    const popupContainerNode = popupContainer.current;

    return hookEffectLine()
      .addEventListener(popupContainerNode, 'scroll', () => {
        if (popupContainerNode.scrollTop === 0) close();
      })
      .effect();
  }, [close]);

  useEffect(() => {
    if (overContentContainer.current === null || popupContainer.current === null) return;
    popupContainer.current.scrollTop = overContentContainer.current.clientHeight;
  }, []);

  return (
    <>
      {isMounted && (
        <Portal>
          <Popup
            ref={popupContainer}
            className={className}
            onClick={() => close()}
          >
            <div
              className="over-container"
              ref={overContentContainer}
            />
            <div className="padding-container" />
            <div className="container">
              <div className="absolute full-width flex center margin-gap-v">
                <div className="badge" />
              </div>
              <Content
                className="content"
                ref={contentContainer}
              >
                {content}
              </Content>
            </div>
          </Popup>
        </Portal>
      )}
    </>
  );
};

const Content = styled.div`
  &:not(.custom-bottom-style) {
    > :not(.abs-item) {
      width: 100%;
      max-width: 450px;
      margin-bottom: var(--main-big-gap);
    }
  }
`;

const Popup = styled.div`
  --padding-top: 50vh;

  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
  scroll-behavior: smooth;

  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 350;
  transition: opacity 0.2s;
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  pointer-events: none;

  &.mounted {
    opacity: 1;
    pointer-events: all;

    > .container {
      top: 0;
    }
  }

  > .over-container {
    height: calc(100vh - var(--padding-top));
  }

  > .padding-container {
    height: var(--padding-top);
  }

  > * {
    scroll-snap-align: start;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  > .container {
    position: relative;
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    .badge {
      border-radius: 3px;
      background-color: var(--text-color);
      width: 20px;
      height: 3px;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 150;
      background-color: var(--color--1);
      padding: 30px;
      width: 100vw;
      min-height: 100%;
      overflow: hidden;

      .abs-item {
        justify-content: space-between;
        padding: 7px 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 100%;
        max-width: 450px;

        &.abs-full {
          cursor: pointer;

          .abs-action {
            width: calc(6em + 20px);
          }
        }

        .abs-action {
          cursor: pointer;

          > .abs-full,
          &.abs-full {
            width: calc(6em + 20px);
          }

          > * {
            width: 2em;
            text-align: center;

            + * {
              margin-left: 10px;
            }
          }
        }

        .title {
          text-align: center;
        }
      }
    }

    .icon-box {
      --size: 2.5em;

      border-radius: 50%;
      width: var(--size);
      min-width: var(--size);
      max-width: var(--size);
      height: var(--size);
      min-height: var(--size);
      max-height: var(--size);

      &.active {
        background: var(--color--2);
      }

      .abs-icon {
        margin: var(--main-gap);
      }
    }
  }
`;
