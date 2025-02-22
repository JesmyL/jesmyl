import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedactButtonDetector = ({ isRedact, to }: { isRedact: boolean; to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRedact) return;
    navigate(to);
  }, [isRedact, navigate, to]);

  return <></>;
};
