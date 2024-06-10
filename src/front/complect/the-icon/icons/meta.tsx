import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 9.86967C13.9623 6.62167 15.6835 5 17.1647 5C19.387 5 20.7904 7.58183 21.6093 11.0865C22.3915 14.4337 22.1649 19 19.387 19C18.1491 19 16.4446 17.1742 14.7779 14.7393C13.7173 13.205 12.7878 11.5755 12 9.86967Z',
  d2: 'M12 9.86967C9.84147 6.62167 7.94817 5 6.31888 5C3.87433 5 2.3306 7.58183 1.42978 11.0865C0.569303 14.4337 0.818647 19 3.87433 19C5.23594 19 7.11091 17.1742 8.94432 14.7393C10.1666 13.1165 11.1847 11.4925 12 9.86967Z',
  d3: 'M12 9.86967C10.0377 6.62167 8.31651 5 6.83534 5C4.61303 5 3.20964 7.58183 2.39071 11.0865C1.60846 14.4337 1.83513 19 4.61303 19C5.85086 19 7.55537 17.1742 9.22211 14.7393C10.3333 13.1165 11.2589 11.4925 12 9.86967Z',
  d4: 'M8.1461 14.0286C9.00421 12.7354 9.76973 11.3714 10.4358 9.94865C9.6556 8.66821 8.95006 7.74057 8.32461 7.12639C7.59421 6.40915 7.10847 6.25 6.84192 6.25C6.31938 6.25 5.77257 6.54103 5.19807 7.42809C4.6144 8.32928 4.1225 9.68181 3.74359 11.371C3.39377 12.9302 3.286 14.7218 3.53768 16.0577C3.66381 16.7272 3.86058 17.1763 4.06699 17.4348C4.23842 17.6494 4.42218 17.75 4.7085 17.75C4.7175 17.75 4.83111 17.7425 5.0731 17.596C5.30776 17.4539 5.59663 17.2212 5.93361 16.8828C6.608 16.2056 7.3645 15.2179 8.14299 14.0332L8.1461 14.0286ZM6.84192 3.75C7.9973 3.75 9.0487 4.40169 9.9709 5.30728C10.6406 5.96496 11.316 6.82804 12 7.87562C12.684 6.82804 13.3594 5.96496 14.0291 5.30728C14.9513 4.40169 16.0027 3.75 17.1581 3.75C18.769 3.75 19.9625 4.74989 20.7915 6.02991C21.6114 7.2958 22.1862 8.98657 22.5934 10.8021C22.9946 12.59 23.1535 14.7552 22.8174 16.5391C22.6497 17.4296 22.3389 18.3313 21.778 19.0337C21.182 19.7798 20.3386 20.25 19.2915 20.25C18.7063 20.25 18.1698 20.0292 17.7208 19.7573C17.2644 19.481 16.8214 19.1051 16.4007 18.6826C15.5604 17.8388 14.6992 16.6971 13.8781 15.4478C13.1967 14.4208 12.5697 13.3529 12 12.2496C11.4303 13.3529 10.8033 14.4208 10.1219 15.4478C9.30076 16.6971 8.43963 17.8388 7.5993 18.6826C7.17865 19.1051 6.73562 19.481 6.27925 19.7573C5.83021 20.0292 5.29366 20.25 4.7085 20.25C3.66144 20.25 2.81795 19.7798 2.22202 19.0337C1.66106 18.3313 1.35035 17.4296 1.1826 16.5391C0.84652 14.7552 1.00542 12.59 1.40656 10.8021C1.81381 8.98657 2.38864 7.2958 3.2085 6.02991C4.03751 4.74989 5.23104 3.75 6.84192 3.75ZM15.8539 14.0286C14.9958 12.7354 14.2303 11.3714 13.5642 9.94865C14.3444 8.66821 15.0499 7.74057 15.6754 7.12639C16.4058 6.40915 16.8915 6.25 17.1581 6.25C17.6806 6.25 18.2274 6.54103 18.8019 7.42809C19.3856 8.32928 19.8775 9.68177 20.2564 11.3709L20.2564 11.371C20.6062 12.9302 20.714 14.7218 20.4623 16.0577C20.3362 16.7272 20.1394 17.1763 19.933 17.4348C19.7616 17.6494 19.5778 17.75 19.2915 17.75C19.2825 17.75 19.1689 17.7425 18.9269 17.596C18.6922 17.4539 18.4034 17.2212 18.0664 16.8828C17.392 16.2056 16.6355 15.2179 15.857 14.0332L15.857 14.0332L15.8539 14.0286Z',
  d5: 'M13.5642 9.94865C14.2303 11.3714 14.9958 12.7354 15.8539 14.0286L15.857 14.0332L15.857 14.0332C16.6355 15.2179 17.392 16.2056 18.0664 16.8828C18.4034 17.2212 18.6922 17.4539 18.9269 17.596C19.1689 17.7425 19.2825 17.75 19.2915 17.75C19.5778 17.75 19.7616 17.6494 19.933 17.4348C20.1394 17.1763 20.3362 16.7272 20.4623 16.0577C20.714 14.7218 20.6062 12.9302 20.2564 11.371L20.2564 11.3709C19.8775 9.68177 19.3856 8.32928 18.8019 7.42809C18.2274 6.54103 17.6806 6.25 17.1581 6.25C16.8915 6.25 16.4058 6.40915 15.6754 7.12639C15.0499 7.74057 14.3444 8.66821 13.5642 9.94865ZM14.0291 5.30728C14.9513 4.40169 16.0027 3.75 17.1581 3.75C18.769 3.75 19.9625 4.74989 20.7915 6.02991C21.6114 7.2958 22.1862 8.98657 22.5934 10.8021C22.9946 12.59 23.1535 14.7552 22.8174 16.5391C22.6497 17.4296 22.3389 18.3313 21.778 19.0337C21.182 19.7798 20.3386 20.25 19.2915 20.25C18.7063 20.25 18.1698 20.0292 17.7208 19.7573C17.2644 19.481 16.8214 19.1051 16.4007 18.6826C15.5604 17.8388 14.6992 16.6971 13.8781 15.4478C12.8212 13.8547 11.8951 12.1634 11.1106 10.3937C10.9435 10.017 10.9669 9.57847 11.1729 9.22328C12.1416 7.55313 13.0908 6.22864 14.0291 5.30728Z',
  d6: 'M10.4358 9.94865C9.76973 11.3714 9.00421 12.7354 8.1461 14.0286L8.14299 14.0332C7.3645 15.2179 6.608 16.2056 5.93361 16.8828C5.59663 17.2212 5.30776 17.4539 5.0731 17.596C4.83111 17.7425 4.7175 17.75 4.7085 17.75C4.42218 17.75 4.23842 17.6494 4.06699 17.4348C3.86058 17.1763 3.66381 16.7272 3.53768 16.0577C3.286 14.7218 3.39377 12.9302 3.74359 11.371C4.1225 9.68181 4.6144 8.32928 5.19807 7.42809C5.77257 6.54103 6.31938 6.25 6.84192 6.25C7.10847 6.25 7.59421 6.40915 8.32461 7.12639C8.95006 7.74057 9.6556 8.66821 10.4358 9.94865ZM9.9709 5.30728C9.0487 4.40169 7.9973 3.75 6.84192 3.75C5.23104 3.75 4.03751 4.74989 3.2085 6.02991C2.38864 7.2958 1.81381 8.98657 1.40656 10.8021C1.00542 12.59 0.84652 14.7552 1.1826 16.5391C1.35035 17.4296 1.66106 18.3313 2.22202 19.0337C2.81795 19.7798 3.66144 20.25 4.7085 20.25C5.29366 20.25 5.83021 20.0292 6.27925 19.7573C6.73562 19.481 7.17865 19.1051 7.5993 18.6826C8.43963 17.8388 9.30076 16.6971 10.1219 15.4478C11.1788 13.8547 12.1049 12.1634 12.8894 10.3937C13.0565 10.017 13.0331 9.57847 12.8271 9.22328C11.8584 7.55313 10.9092 6.22864 9.9709 5.30728Z',
  d7: 'M12 9.86967C10.0377 6.62167 8.31651 5 6.83534 5C4.61303 5 3.20964 7.58183 2.39071 11.0865C1.60846 14.4337 1.83513 19 4.61303 19C5.85086 19 7.55537 17.1742 9.22211 14.7393C10.3333 13.1165 11.2589 11.4925 12 9.86967ZM12 9.86967C13.9623 6.62167 15.6835 5 17.1647 5C19.387 5 20.7904 7.58183 21.6093 11.0865C22.3915 14.4337 22.1649 19 19.387 19C18.1491 19 16.4446 17.1742 14.7779 14.7393C13.6667 13.1165 12.7411 11.4925 12 9.86967Z',
  d8: 'M3.25874 6.16973C4.09579 4.929 5.27168 4 6.83631 4C7.94725 4 8.98352 4.60243 9.92417 5.48919C10.6048 6.13082 11.2962 6.97793 12.001 8.01385C12.7057 6.97793 13.3971 6.13082 14.0778 5.48919C15.0184 4.60243 16.0547 4 17.1656 4C18.7303 4 19.9062 4.929 20.7432 6.16973C21.5726 7.39915 22.1628 9.05609 22.584 10.859C22.9965 12.624 23.1567 14.7518 22.8154 16.491C22.645 17.3594 22.3332 18.2158 21.7858 18.8738C21.2093 19.5668 20.3994 20 19.3879 20C18.8384 20 18.3236 19.8006 17.8774 19.5412C17.4251 19.2783 16.9797 18.9167 16.5502 18.5027C15.6917 17.675 14.805 16.5479 13.9537 15.3043C13.2273 14.2433 12.5762 13.1791 12.001 12.1121C11.4257 13.1791 10.7747 14.2433 10.0482 15.3043C9.1969 16.5479 8.31028 17.675 7.45174 18.5027C7.02227 18.9167 6.57685 19.2783 6.12455 19.5412C5.67837 19.8006 5.16353 20 4.614 20C3.60255 20 2.79264 19.5668 2.2161 18.8738C1.6687 18.2158 1.35691 17.3594 1.1865 16.491C0.845213 14.7518 1.00541 12.624 1.41792 10.859C1.83919 9.05609 2.42932 7.39915 3.25874 6.16973ZM13.1354 9.93436C13.8108 11.3419 14.6327 12.7558 15.604 14.1744L15.604 14.1745C16.4195 15.3657 17.2184 16.3688 17.9383 17.0628C18.298 17.4096 18.615 17.6566 18.8825 17.8121C19.1562 17.9712 19.3186 18 19.3879 18C19.7654 18 20.0256 17.8624 20.2484 17.5946C20.5003 17.2918 20.7172 16.7975 20.8529 16.1059C21.1238 14.7251 21.0062 12.8962 20.6365 11.3141L20.6365 11.314C20.2388 9.61225 19.7178 8.22593 19.0852 7.28827C18.4603 6.36192 17.8233 6 17.1656 6C16.7954 6 16.2305 6.2084 15.4497 6.94448C14.7573 7.59721 13.9842 8.58233 13.1354 9.93436ZM10.8665 9.93436C10.1911 11.3419 9.36925 12.7558 8.39796 14.1744L8.3979 14.1745C7.58248 15.3657 6.7835 16.3688 6.06366 17.0628C5.70393 17.4096 5.38696 17.6566 5.11943 17.8121C4.84579 17.9712 4.68339 18 4.614 18C4.2365 18 3.97637 17.8624 3.75357 17.5946C3.50163 17.2918 3.28479 16.7975 3.14907 16.1059C2.87811 14.7251 2.9957 12.8962 3.36545 11.3141L3.36545 11.314C3.76311 9.61225 4.28413 8.22593 4.91671 7.28827C5.54167 6.36192 6.17863 6 6.83631 6C7.20655 6 7.77145 6.2084 8.55226 6.94448C9.24467 7.59721 10.0177 8.58233 10.8665 9.93436Z',
};

export const IconMetaStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-stroke-rounded IconMetaStrokeRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-duotone-rounded IconMetaDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-twotone-rounded IconMetaTwotoneRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-solid-rounded IconMetaSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-bulk-rounded IconMetaBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-stroke-sharp IconMetaStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMetaSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="meta-solid-sharp IconMetaSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMeta: TheIconSelfPack = {
  name: 'Meta',
  StrokeRounded: IconMetaStrokeRounded,
  DuotoneRounded: IconMetaDuotoneRounded,
  TwotoneRounded: IconMetaTwotoneRounded,
  SolidRounded: IconMetaSolidRounded,
  BulkRounded: IconMetaBulkRounded,
  StrokeSharp: IconMetaStrokeSharp,
  SolidSharp: IconMetaSolidSharp,
};