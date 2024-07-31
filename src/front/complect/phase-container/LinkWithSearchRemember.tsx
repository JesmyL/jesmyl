import { Link, LinkProps, NavLinkProps, SetURLSearchParams, useParams, useSearchParams } from 'react-router-dom';

const mapParamsSelf = {} as {
  params: Record<string, string | und>;
  searchParams: [URLSearchParams, SetURLSearchParams];
};

function mapParams(this: typeof mapParamsSelf, param: string) {
  if (this.params[param] === undefined && !this.searchParams[0].has(param)) return null;

  return `${param}=${this.searchParams[0].get(param) ?? this.params[param]}`;
}

const itNNull = (it: unknown) => it !== null;

const LinkWith = ({
  rememberProps,
  to,
  ...props
}: {
  rememberProps: string[];
} & LinkProps) => {
  mapParamsSelf.searchParams = useSearchParams();
  mapParamsSelf.params = useParams();
  const search = rememberProps.map(mapParams, mapParamsSelf).filter(itNNull).join('&');

  return (
    <Link
      {...props}
      to={`${to}${search ? `?${search}` : ''}`}
    />
  );
};

interface Props {
  rememberProps?: string[];
  to: string;
}

export const LinkWithSearchRemember = <IsNavLink extends boolean | und>({
  rememberProps,
  ...props
}: Props & (IsNavLink extends true ? NavLinkProps : LinkProps)) => {
  return rememberProps !== undefined ? (
    <LinkWith
      rememberProps={rememberProps}
      {...(props as any)}
    />
  ) : (
    <Link {...(props as any)} />
  );
};
