import { focusedInputElementAtom } from '#shared/lib/atoms/focusedInputElementAtom';
import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { isMobileDevice } from '#shared/lib/device-differences';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { LazyIcon } from '../the-icon/LazyIcon';
import { PageContainerConfigurerProps } from './PageContainerConfigurer.model';

let navigate: () => void = emptyFunc;
const swiper = backSwipableContainerMaker(() => navigate());

export const PageContainerConfigurer = (props: PageContainerConfigurerProps) => {
  const backButtonRef = useRef<HTMLAnchorElement>(null);
  navigate = () => backButtonRef.current?.click();
  const focusedInput = useAtomValue(focusedInputElementAtom);

  const backButtonRenderPassNode = (
    <span className="flex pointer">
      <LazyIcon
        icon={props.backButtonIcon ?? 'ArrowLeft02'}
        className="mx-2"
      />
      <StyledPhaseContainerConfigurerHeadTitle className="full-w">
        {props.headTitle}
      </StyledPhaseContainerConfigurerHeadTitle>
    </span>
  );

  const backButtonNode = props.backButtonRender ? (
    props.backButtonRender(backButtonRef, backButtonRenderPassNode)
  ) : (
    <Link
      to={(props.backButtonPath as never) ?? '..'}
      ref={backButtonRef}
    >
      {backButtonRenderPassNode}
    </Link>
  );

  return (
    <div
      {...(props.withoutBackButton || props.withoutBackSwipe || focusedInput ? {} : swiper)}
      className={twMerge('phase-container relative', props.className)}
    >
      <StyledPhaseContainerConfigurerHeader
        className="header flex between w-full"
        st-hide-footer-menu={props.hideFooterMenu || (isMobileDevice && focusedInput) ? '' : undefined}
      >
        {props.withoutBackButton
          ? props.headTitle && (
              <StyledPhaseContainerConfigurerHeadTitle className="ml-5">
                {props.headTitle}
              </StyledPhaseContainerConfigurerHeadTitle>
            )
          : backButtonNode}
        <StyledPhaseContainerConfigurerHeadWithMoreIcon className={twMerge('head', props.headClass || 'flex between')}>
          <StyledPhaseContainerConfigurerHead className="w-full">{props.head}</StyledPhaseContainerConfigurerHead>
          {props.onMoreClick && (
            <button className="pointer m-1">
              <LazyIcon
                icon="MoreVerticalCircle01"
                id="phase-container-header-more-button"
                onClick={() => props.onMoreClick?.(true)}
              />
            </button>
          )}
        </StyledPhaseContainerConfigurerHeadWithMoreIcon>
      </StyledPhaseContainerConfigurerHeader>

      <StyledPhaseContainerConfigurerContent
        className={twMerge('content p-2', props.contentClass)}
        ref={props.contentRef}
      >
        {props.content}
      </StyledPhaseContainerConfigurerContent>
    </div>
  );
};

export const StyledPhaseContainerConfigurerHeadTitle = styled.span``;
export const StyledPhaseContainerConfigurerHeadWithMoreIcon = styled.div``;
export const StyledPhaseContainerConfigurerHead = styled.div``;

export const StyledPhaseContainerConfigurerHeader = styled.div`
  transition: var(--fullscreen-transition);
  margin-top: var(--header-top);
  background-color: var(--color--1);
  padding: var(--header-padding);
  width: 100vw;
  height: var(--header-height);
`;

export const StyledPhaseContainerConfigurerContent = styled.div`
  position: static;
  transition: var(--fullscreen-transition);
  background-color: var(--color--5);
  width: 100vw;
  height: var(--content-height);
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: calc(var(--footer-height) + 15px);

  &.no-padding-top {
    padding-top: 0;
  }
`;
