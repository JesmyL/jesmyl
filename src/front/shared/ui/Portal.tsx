import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { emptyArray } from 'shared/utils';

interface Props {
  children: ReactNode;
  classNames?: string[];
}

export function Portal({ children, classNames = emptyArray }: Props) {
  const [container] = useState(() => {
    const div = document.createElement('div');

    div.classList.add('portal-node', 'full-size', 'absolute', 'top-0', ...classNames);
    return div;
  });

  useEffect(() => {
    const parentContainer = document.querySelector('#root');
    if (parentContainer === null) return;
    parentContainer.appendChild(container);

    return () => {
      parentContainer.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}
