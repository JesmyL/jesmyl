import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import styled, { css } from 'styled-components';
import { LazyIcon } from '../the-icon/LazyIcon';
import { PageContainerConfigurerProps } from './PageContainerConfigurer.model';
import { usePhaseContainerConfigurerWithoutFooterContext } from './lib/contexts';

let navigate: () => void = emptyFunc;
const swiper = backSwipableContainerMaker(() => navigate());

export function PageContainerConfigurer(props: PageContainerConfigurerProps) {
  const backButtonRef = useRef<HTMLAnchorElement>(null);
  const withoutFooter = usePhaseContainerConfigurerWithoutFooterContext();
  navigate = () => backButtonRef.current?.click();

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
    <StyledContainerPhase
      {...(props.withoutBackButton || props.withoutBackSwipe ? {} : swiper)}
      className={`phase-container relative ${props.className || ''}`}
      $withoutFooter={withoutFooter}
    >
      <StyledPhaseContainerConfigurerHeader
        className="header flex between full-width"
        st-hide-footer-menu={props.hideFooterMenu ? '' : undefined}
      >
        {props.withoutBackButton
          ? props.headTitle && (
              <StyledPhaseContainerConfigurerHeadTitle className="margin-big-gap-l">
                {props.headTitle}
              </StyledPhaseContainerConfigurerHeadTitle>
            )
          : backButtonNode}
        <StyledPhaseContainerConfigurerHeadWithMoreIcon className={`head ${props.headClass || 'flex between'}`}>
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
        className={`content ${props.contentClass || ' p-2'}`}
        ref={props.contentRef}
      >
        {props.content}
      </StyledPhaseContainerConfigurerContent>
    </StyledContainerPhase>
  );
}

const StyledContainerPhase = styled.div<{ $withoutFooter: boolean | und }>`
  height: 100%;

  ${props =>
    props.$withoutFooter &&
    css`
      --content-height: calc(100% - var(--keyboard-flash-height));
    `}
`;

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

  &.no-padding-top {
    padding-top: 0;
  }
`;
