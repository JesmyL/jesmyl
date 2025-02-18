import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon?: TheIconKnownName;
  iconNode?: JSX.Element;
  iconKind?: TheIconNameKind;
  titleNode?: React.ReactNode;
  title?: string;
  rightNode?: React.ReactNode;
  iconWrapperClassName?: string;
  path?: string;
  onIconClick?: PreventerAndStopperCallback;
}

export const BottomPopupItem = ({
  icon,
  iconNode,
  iconKind,
  titleNode,
  title,
  rightNode,
  iconWrapperClassName,
  path,
  onClick,
  onIconClick,
  ...attrs
}: Props) => {
  const node = (
    <StyledItem
      {...attrs}
      onClick={onClick}
      className={'pointer ' + (attrs.className || '')}
    >
      <div className="flex flex-gap">
        <div
          className={`icon-box ${iconWrapperClassName || ''}`}
          onClick={onIconClick}
        >
          {icon ? (
            <LazyIcon
              icon={icon}
              kind={iconKind}
              className="abs-icon"
            />
          ) : (
            iconNode
          )}
        </div>
        {(titleNode || title) && <div className="title">{titleNode ?? title}</div>}
      </div>
      {rightNode && <div className="abs-action flex around pointer">{rightNode}</div>}
    </StyledItem>
  );

  return path && onClick === undefined ? <Link to={path}>{node}</Link> : node;
};

const StyledItem = styled.div`
  justify-content: space-between;
  padding: 7px 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;

  &.abs-full {
    .abs-action {
      width: calc(6em + 20px);
    }
  }

  .abs-action {
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
`;
