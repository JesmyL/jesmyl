import { ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import styled from 'styled-components';

export default function BrutalItem({
  onClick,
  icon,
  title,
  box,
  description,
  to,
}: {
  icon: JSX.Element;
  title: string;
  box?: ReactNode;
  description?: ReactNode;
  to?: To;
  onClick?: () => void;
}) {
  const inner = (
    <Item className="pointer flex between relative">
      <div className="nowrap over-hidden flex center">
        <div className="margin-big-gap">{icon}</div>
        <div className="ellipsis inline-block">{title}</div>
      </div>
      {box && <div className="margin-big-gap flex">{box}</div>}
      {description && (
        <div className="item-description">
          <div className="item-description-inner">
            <span className="item-description-title">
              <span className="item-description-title-inner">{description}</span>
            </span>
          </div>
        </div>
      )}
    </Item>
  );

  return to ? (
    <Link
      to={to}
      className="full-width"
    >
      {inner}
    </Link>
  ) : (
    <div
      className="flex between relative full-width"
      onClick={onClick}
    >
      {inner}
    </div>
  );
}

const Item = styled.div`
  --brutal-item-height: 60px;
  --brutal-item-gap-v: 7px;

  margin-top: var(--brutal-item-gap-v);
  border-radius: 10px;
  background-color: var(--color--2);
  width: 100%;
  height: var(--brutal-item-height);

  > .item-description {
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    width: 100%;
    pointer-events: none;

    > .item-description-inner {
      position: relative;
      width: 80%;
      overflow: hidden;
      pointer-events: all;
      text-align: center;
      white-space: nowrap;

      > .item-description-title {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
        overflow: hidden;
        text-align: right;

        &:after {
          position: absolute;
          bottom: 0;
          left: -1.3em;
          background: linear-gradient(to left, transparent, var(--color--2) 50%);
          width: 2.5em;
          height: 1em;
          content: '';
        }

        > .item-description-title-inner {
          float: right;
          white-space: nowrap;
        }
      }
    }
  }
`;
