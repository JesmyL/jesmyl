import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactNode;
  classNames?: string[];
}

export function Portal({ children, classNames = [] }: Props) {
  const [container] = useState(() => {
    const div = document.createElement('div');

    div.classList.add('portal-node', 'full-size', 'absolute', 'top-0', 'z-300', ...classNames);
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
