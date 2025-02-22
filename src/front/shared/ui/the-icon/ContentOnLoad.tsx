import { TheIconLoading } from './IconLoading';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

export function ContentOnLoad({ children, isLoading }: Props) {
  return (
    <div className="relative">
      <div className={isLoading ? ' fade-03' : undefined}>{children}</div>
      {isLoading && (
        <div className="absolute full-size flex center pos-all">
          <TheIconLoading />
        </div>
      )}
    </div>
  );
}
