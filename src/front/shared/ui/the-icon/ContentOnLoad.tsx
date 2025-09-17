import { TheIconLoading } from './IconLoading';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

export function ContentOnLoad({ children, isLoading }: Props) {
  return (
    <div className="relative">
      <div className={isLoading ? ' opacity-30' : undefined}>{children}</div>
      {isLoading && (
        <div className="absolute full-size flex center top-0 left-0 bottom-0 right-0">
          <TheIconLoading />
        </div>
      )}
    </div>
  );
}
