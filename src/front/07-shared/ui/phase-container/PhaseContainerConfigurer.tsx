import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { emptyFunc } from 'shared/utils';
import styled, { css } from 'styled-components';
import { backSwipableContainerMaker } from '../../lib/backSwipableContainerMaker';
import { contextCreator } from '../../lib/contextCreator';
import { LinkWithSearchRemember } from './LinkWithSearchRemember';
import { PhaseContainerConfigurerProps } from './PhaseContainerConfigurer.model';

let navigate: NavigateFunction = emptyFunc;
const swiper = backSwipableContainerMaker(() => navigate('..'));

export const [PhaseContainerConfigurerWithoutFooterContext, usePhaseContainerConfigurerWithoutFooterContext] =
  contextCreator(false);

export default function PhaseContainerConfigurer(props: PhaseContainerConfigurerProps) {
  navigate = useNavigate();
  const withoutFooter = usePhaseContainerConfigurerWithoutFooterContext();

  return (
    <StyledContainerPhase
      {...(props.withoutBackButton || props.withoutBackSwipe ? {} : swiper)}
      className={`phase-container relative ${props.className || ''}`}
      $withoutFooter={withoutFooter}
    >
      <StyledPhaseContainerConfigurerHeader
        className={'header flex between full-width' + (props.hideFooterMenu ? ' hideFooterMenu' : '')}
      >
        {props.withoutBackButton ? (
          props.headTitle && (
            <StyledPhaseContainerConfigurerHeadTitle className="margin-big-gap-l">
              {props.headTitle}
            </StyledPhaseContainerConfigurerHeadTitle>
          )
        ) : (
          <LinkWithSearchRemember
            to={props.backButtonPath ?? '..'}
            rememberProps={props.rememberProps}
            className="flex"
          >
            <LazyIcon
              icon={props.backButtonIcon ?? 'ArrowLeft02'}
              className="action-button"
            />
            <StyledPhaseContainerConfigurerHeadTitle>{props.headTitle}</StyledPhaseContainerConfigurerHeadTitle>
          </LinkWithSearchRemember>
        )}
        <StyledPhaseContainerConfigurerHeadWithMoreIcon className={`head ${props.headClass || 'flex between'}`}>
          <StyledPhaseContainerConfigurerHead>{props.head}</StyledPhaseContainerConfigurerHead>
          {props.onMoreClick && (
            <LazyIcon
              icon="MoreVerticalCircle01"
              id="phase-container-header-more-button"
              className="action-button"
              onClick={() => props.onMoreClick?.(true)}
            />
          )}
        </StyledPhaseContainerConfigurerHeadWithMoreIcon>
      </StyledPhaseContainerConfigurerHeader>

      <StyledPhaseContainerConfigurerContent
        className={`content ${props.contentClass || ' padding-gap'}`}
        ref={props.contentRef}
      >
        {props.content}
      </StyledPhaseContainerConfigurerContent>
    </StyledContainerPhase>
  );
}

const StyledContainerPhase = styled.div<{ $withoutFooter: boolean | und }>`
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

  .action-button {
    padding: var(--main-gap);
  }
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

  > .phase-content {
    height: 100%;
  }
`;
