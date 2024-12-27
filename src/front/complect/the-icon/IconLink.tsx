import { Link } from 'react-router-dom';
import { TheIconType } from './model';

interface Props {
  Icon: TheIconType;
  to: string;
}

export const IconLink = (props: Props) => {
  return (
    <Link
      to={props.to}
      className="pointer"
    >
      <props.Icon />
    </Link>
  );
};
