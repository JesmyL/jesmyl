import { Link } from 'react-router-dom';
import { LazyIcon } from './LazyIcon';

interface Props {
  icon: TheIconKnownName;
  to: string;
}

export const IconLink = (props: Props) => {
  return (
    <Link
      to={props.to}
      className="pointer"
    >
      <LazyIcon icon={props.icon} />
    </Link>
  );
};
