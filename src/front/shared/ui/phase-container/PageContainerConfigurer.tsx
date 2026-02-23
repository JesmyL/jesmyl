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
      <div
        className="header flex between w-full bg-x1 mt-(--header-top) p-(--header-padding) w-[100vw] h-(--header-height) transition-(--fullscreen-transition)"
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
      </div>

      <StyledPhaseContainerConfigurerContent
        className={twMerge(
          'content p-2 static bg-x5 w-[100vw] h-(--content-height) overflow-x-hidden overflow-y-auto transition-(--fullscreen-transition)',
          props.contentClass,
          'pb-(--footer-height)',
        )}
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
export const StyledPhaseContainerConfigurerContent = styled.div``;
