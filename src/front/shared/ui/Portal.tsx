import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { emptyArray } from 'shared/utils';

export function Portal({ children, classNames = emptyArray }: { children: ReactNode; classNames?: string[] }) {
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
