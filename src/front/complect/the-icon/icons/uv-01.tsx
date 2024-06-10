import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.04 10.3678C17.9253 9.79352 17.7605 9.3378 18.1322 8.1761C18.3277 7.56506 18.9176 6.39167 18.4748 5.76728C17.8937 4.94813 16.5391 5.639 15.8239 5.86783C14.6296 6.24996 14.1908 6.04427 13.6322 4.96C13.3119 4.3384 12.8804 3 12 3C11.1196 3 10.6881 4.3384 10.3678 4.96C9.80919 6.04427 9.37039 6.24996 8.1761 5.86783C7.46091 5.639 6.10626 4.94813 5.52524 5.76728C5.08236 6.39167 5.67233 7.56506 5.86783 8.1761C6.23953 9.3378 6.07469 9.79352 4.96 10.3678C4.33844 10.688 3.0001 11.1196 3 11.9999C2.9999 12.8803 4.33837 13.3119 4.96 13.6322C6.07469 14.2065 6.23953 14.6622 5.86783 15.8239C5.65453 16.4906 5.01265 17.7433 5.63761 18.3655C6.26038 18.9856 7.5108 18.345 8.1761 18.1322C9.37039 17.75 9.80919 17.9557 10.3678 19.04C10.6881 19.6616 11.1196 21 12 21C12.8804 21 13.3119 19.6616 13.6322 19.04C14.1908 17.9557 14.6296 17.75 15.8239 18.1322C16.4892 18.345 17.7396 18.9856 18.3624 18.3655C18.9874 17.7433 18.3455 16.4906 18.1322 15.8239C17.7605 14.6622 17.9253 14.2065 19.04 13.6322C19.6616 13.3119 21.0001 12.8803 21 11.9999C20.9999 11.1196 19.6616 10.688 19.04 10.3678Z',
  d2: 'M12 21C11.1196 21 10.6881 19.6616 10.3678 19.04C9.80919 17.9557 9.37039 17.75 8.1761 18.1322C7.5108 18.345 6.26038 18.9856 5.63761 18.3655C5.01265 17.7433 5.65453 16.4906 5.86783 15.8239C6.23953 14.6622 6.07469 14.2065 4.96 13.6322C4.33837 13.3119 2.9999 12.8803 3 11.9999C3.0001 11.1196 4.33844 10.688 4.96 10.3678C6.07469 9.79352 6.23953 9.3378 5.86783 8.1761C5.67233 7.56506 5.08236 6.39167 5.52524 5.76728C6.10626 4.94813 7.46091 5.639 8.1761 5.86783C9.37039 6.24996 9.80919 6.04427 10.3678 4.96C10.6881 4.3384 11.1196 3 12 3',
  d3: 'M10.3381 3.34909C10.6163 2.90445 11.1392 2.25 12 2.25C12.8608 2.25 13.3837 2.90445 13.6619 3.34909C13.8159 3.59511 13.9429 3.85418 14.0456 4.0746C14.1023 4.19885 14.2528 4.52699 14.2989 4.6165C14.5708 5.14424 14.7174 5.24579 14.782 5.27315C14.8435 5.29915 15.0202 5.33752 15.5953 5.15351C15.694 5.12194 16.0851 4.97879 16.2068 4.93374C16.4537 4.84597 16.7493 4.74904 17.0543 4.68879C17.6218 4.57665 18.5241 4.54048 19.0865 5.33337C19.5211 5.94614 19.3883 6.70615 19.2687 7.16565C19.2008 7.4265 19.112 7.67809 19.0341 7.88933C18.9844 8.02198 18.8761 8.31208 18.8465 8.40465C18.6656 8.97008 18.6974 9.14554 18.7238 9.21059C18.7488 9.27241 18.8467 9.42454 19.3835 9.70109C19.473 9.74721 19.8011 9.89771 19.9254 9.95437C20.1458 10.0571 20.4048 10.1841 20.6508 10.338C21.0955 10.6162 21.7499 11.1391 21.75 11.9998C21.7501 12.8607 21.0956 13.3837 20.651 13.6619C20.4049 13.8158 20.1459 13.9428 19.9254 14.0456C19.8012 14.1023 19.473 14.2528 19.3835 14.2989C18.8467 14.5755 18.7488 14.7276 18.7238 14.7894C18.6974 14.8545 18.6656 15.0299 18.8465 15.5953C18.8772 15.6913 19.003 16.0304 19.0508 16.1583C19.134 16.387 19.2275 16.6603 19.2926 16.9434C19.4102 17.4552 19.5026 18.2887 18.8916 18.897C18.2826 19.5034 17.4509 19.4097 16.9405 19.292C16.658 19.2268 16.3853 19.1335 16.157 19.0504C16.029 19.0025 15.6912 18.8772 15.5953 18.8465C15.0202 18.6625 14.8435 18.7009 14.782 18.7269C14.7174 18.7542 14.5708 18.8558 14.2989 19.3835C14.2528 19.473 14.1023 19.8011 14.0456 19.9254C13.9429 20.1458 13.8159 20.4049 13.6619 20.6509C13.3837 21.0955 12.8608 21.75 12 21.75C11.1392 21.75 10.6163 21.0955 10.3381 20.6509C10.1841 20.4049 10.0571 20.1458 9.95439 19.9254C9.89772 19.8011 9.74721 19.473 9.70109 19.3835C9.4292 18.8558 9.2826 18.7542 9.21797 18.7269C9.15655 18.7009 8.97976 18.6625 8.40465 18.8465C8.30878 18.8772 7.97097 19.0025 7.84299 19.0504C7.61469 19.1335 7.342 19.2268 7.05947 19.292C6.54905 19.4097 5.71743 19.5034 5.10844 18.897C4.49743 18.2887 4.58979 17.4552 4.70743 16.9434C4.7725 16.6603 4.86596 16.387 4.94922 16.1583C4.99698 16.0304 5.12281 15.6913 5.15351 15.5953C5.33442 15.0299 5.30256 14.8545 5.2762 14.7894C5.25115 14.7276 5.15328 14.5755 4.6165 14.2989C4.52698 14.2528 4.19882 14.1023 4.07457 14.0456C3.85414 13.9428 3.59506 13.8158 3.34902 13.6619C2.90436 13.3837 2.2499 12.8607 2.25 11.9998C2.2501 11.1391 2.90454 10.6162 3.34915 10.338C3.59517 10.1841 3.85422 10.0571 4.07463 9.95437C4.19889 9.8977 4.52699 9.74721 4.6165 9.70109C5.15328 9.42454 5.25115 9.27241 5.2762 9.21059C5.30256 9.14554 5.33442 8.97008 5.15351 8.40465C5.12389 8.31208 5.01559 8.02198 4.9659 7.88933C4.88797 7.67809 4.79924 7.4265 4.73133 7.16565C4.61171 6.70615 4.47886 5.94614 4.9135 5.33337C5.47589 4.54048 6.37821 4.57665 6.94573 4.68879C7.2507 4.74904 7.54634 4.84597 7.79316 4.93374C7.91488 4.97879 8.30601 5.12194 8.40465 5.15351C8.97976 5.33752 9.15655 5.29915 9.21797 5.27315C9.2826 5.24579 9.4292 5.14424 9.70109 4.6165C9.74721 4.52698 9.89772 4.19885 9.95439 4.0746C10.0571 3.85418 10.1841 3.59511 10.3381 3.34909Z',
  d4: 'M12.0131 3.12204L9.82945 6.64926L5.81916 5.68793C5.746 5.67039 5.68003 5.73605 5.69732 5.80918L6.64181 9.8042L3.13324 12.0037C3.06966 12.0436 3.0703 12.1363 3.13442 12.1753L6.64292 14.3079L5.7297 18.3408C5.71324 18.4135 5.77872 18.4783 5.85137 18.4612L9.83071 17.5239L12.0053 21.0226C12.0447 21.0862 12.1372 21.0862 12.1768 21.0227L14.3565 17.5239L18.3564 18.4561C18.4292 18.4731 18.4946 18.4078 18.4777 18.335L17.5458 14.3408L21.0375 12.1625C21.1008 12.123 21.1008 12.0309 21.0375 11.9914L17.5496 9.81405L18.4882 5.82349C18.5053 5.7509 18.4403 5.68554 18.3675 5.70207L14.3512 6.61403L12.1848 3.12196C12.1453 3.05827 12.0525 3.05831 12.0131 3.12204Z',
  d5: 'M12 2.25C12.259 2.25 12.4997 2.38367 12.6367 2.60357L14.5916 5.74322L18.1941 4.90553C18.4464 4.84686 18.7111 4.92254 18.8943 5.10571C19.0775 5.28888 19.1531 5.5536 19.0945 5.80591L18.2568 9.40836L21.3964 11.3633C21.6163 11.5003 21.75 11.741 21.75 12C21.75 12.259 21.6163 12.4997 21.3964 12.6367L18.2568 14.5916L19.0945 18.1941C19.1531 18.4464 19.0775 18.7111 18.8943 18.8943C18.7111 19.0775 18.4464 19.1531 18.1941 19.0945L14.5916 18.2568L12.6367 21.3964C12.4997 21.6163 12.259 21.75 12 21.75C11.741 21.75 11.5003 21.6163 11.3633 21.3964L9.40836 18.2568L5.80591 19.0945C5.5536 19.1531 5.28888 19.0775 5.10571 18.8943C4.92254 18.7111 4.84686 18.4464 4.90553 18.1941L5.74322 14.5916L2.60357 12.6367C2.38367 12.4997 2.25 12.259 2.25 12C2.25 11.741 2.38367 11.5003 2.60357 11.3633L5.74322 9.40836L4.90553 5.80591C4.84686 5.5536 4.92254 5.28888 5.10571 5.10571C5.28888 4.92254 5.5536 4.84686 5.80591 4.90553L9.40836 5.74322L11.3633 2.60357C11.5003 2.38367 11.741 2.25 12 2.25Z',
};

export const IconUv01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-stroke-rounded IconUv01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-duotone-rounded IconUv01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-twotone-rounded IconUv01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-solid-rounded IconUv01SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-bulk-rounded IconUv01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-stroke-sharp IconUv01StrokeSharp"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-01-solid-sharp IconUv01SolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUv01: TheIconSelfPack = {
  name: 'Uv01',
  StrokeRounded: IconUv01StrokeRounded,
  DuotoneRounded: IconUv01DuotoneRounded,
  TwotoneRounded: IconUv01TwotoneRounded,
  SolidRounded: IconUv01SolidRounded,
  BulkRounded: IconUv01BulkRounded,
  StrokeSharp: IconUv01StrokeSharp,
  SolidSharp: IconUv01SolidSharp,
};