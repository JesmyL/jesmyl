import { findElementScrollParent } from '#shared/lib/utils';
import { RefObject, useEffect } from 'react';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';
import { CmComFaceListProps } from '../model/model';
import { useCmComFaceCurrentComw } from './useCurrentComw';

/** Bounded confirmation: the virtualized window renders the target only after the limits effect re-slices the list. */
const maxScrollFrames = 60;
/** A scroll event caused by our own alignment may re-slice the window; keep the row centred until it settles. */
const stableScrollFrames = 3;
/** Slack before a smooth scroll is re-aimed: re-issuing it every frame would fight the animation in flight. */
const centreTolerance = 4;
/** Frames without progress after which a smooth animation is presumed interrupted and must be finished instantly. */
const stalledScrollFrames = 4;

export const useCmComFaceScrollToCurrentComFace = (
  listRef: RefObject<HTMLDivElement | null>,
  props: CmComFaceListProps,
  deps: unknown[],
) => {
  const currentComw = useCmComFaceCurrentComw(props);

  useEffect(() => {
    const listNode = listRef.current;
    if (listNode === null || currentComw === undefined || props.isPutCcomFaceOff || props.titles) return;

    /** The target index comes from the full list, never from the rendered slice: the row may not be mounted yet. */
    const comwi = props.list.findIndex(com => com.w === currentComw);
    if (comwi < 0) return;

    const container = findElementScrollParent(listNode);
    if (!container) return;

    const scrollDeltaToCentre = (node: Element) => {
      const nodeRect = node.getBoundingClientRect();

      return nodeRect.top - container.getBoundingClientRect().top - (container.clientHeight - nodeRect.height) / 2;
    };

    const smoothScrollTo = (top: number) => container.scrollTo({ top, behavior: 'smooth' });

    /** The target of the last scroll command: while it stays put, the smooth animation is in flight and left alone. */
    let lastTargetTop: number | nil = null;
    /** The deviation of the previous frame: while it shrinks, the smooth animation makes progress. */
    let prevAbsDelta: number | nil = null;
    let stalledFrames = 0;

    /**
     * Phase 1: pre-position instantly to the estimated offset, so the virtualized window mounts the target row.
     * Must stay instant and unconditional: a smooth jump would be interrupted by the same re-slice it must survive.
     */
    const firstRow = listNode.firstElementChild;
    const secondRow = listNode.children[1];
    if (firstRow) {
      const firstComwi = props.list.findIndex(
        com => com.w === +firstRow.id.slice(cmComFaceCurrentComwIdPrefix.length),
      );
      const rowHeight =
        firstRow instanceof HTMLElement && secondRow instanceof HTMLElement
          ? secondRow.offsetTop - firstRow.offsetTop
          : firstRow.getBoundingClientRect().height;

      if (firstComwi >= 0 && rowHeight) {
        container.scrollTop = container.scrollTop + scrollDeltaToCentre(firstRow) + (comwi - firstComwi) * rowHeight;
      }
    }

    const selector = `#${cmComFaceCurrentComwIdPrefix}${currentComw}`;
    let frame = 0;
    let stableFrames = 0;
    let frameId = 0;
    let centredNode: Element | nil = null;

    const confirmScroll = () => {
      frame++;

      const node = listNode.querySelector<HTMLElement>(selector);

      if (node) {
        const delta = scrollDeltaToCentre(node);
        const absDelta = Math.abs(delta);
        const targetTop = container.scrollTop + delta;
        /** The window renders fresh rows when it re-slices, so the same com-face gets a new node. */
        const isRowRemounted = node !== centredNode;
        /** The target moves only when the layout shifts; while smooth scrolling it stays fixed and the animation is left alone. */
        const isTargetMoved = lastTargetTop == null || Math.abs(targetTop - lastTargetTop) > centreTolerance;
        /** Reserve the last frames for a stable confirmation instead of spending them on a lost animation. */
        const isBudgetEnding = frame >= maxScrollFrames - stableScrollFrames;

        centredNode = node;

        if (absDelta <= centreTolerance) {
          stableFrames++;
          stalledFrames = 0;
          if (stableFrames >= stableScrollFrames) return;
        } else {
          stableFrames = 0;

          const isProgressing = prevAbsDelta != null && absDelta < prevAbsDelta;
          const isSmoothAttempt = isRowRemounted || isTargetMoved;

          stalledFrames = isProgressing ? 0 : stalledFrames + 1;

          if (isBudgetEnding || (!isSmoothAttempt && stalledFrames >= stalledScrollFrames)) {
            /** Phase 3: the smooth attempt stalled or its budget is ending — finish instantly so the loop always converges. */
            container.scrollTop = targetTop;
            lastTargetTop = targetTop;
            prevAbsDelta = null;
            stalledFrames = 0;
          } else if (isSmoothAttempt) {
            /** Phase 2: the row is mounted — polish with a smooth scroll; re-aim when a re-slice shifts the target. */
            smoothScrollTo(targetTop);
            lastTargetTop = targetTop;
            prevAbsDelta = absDelta;
            stalledFrames = 0;
          } else {
            prevAbsDelta = absDelta;
          }
        }
      }

      if (frame >= maxScrollFrames) return;
      frameId = requestAnimationFrame(confirmScroll);
    };

    frameId = requestAnimationFrame(confirmScroll);

    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef, currentComw, props.isPutCcomFaceOff, props.titles, ...deps]);
};
