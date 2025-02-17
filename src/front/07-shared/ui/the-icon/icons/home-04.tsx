import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 18L14 18',
  d2: 'M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44633 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z',
  d3: 'M9.5238 1.99594C10.3597 1.52688 11.1339 1.25 12 1.25C12.8661 1.25 13.6403 1.52688 14.4762 1.99594C15.2861 2.45043 16.2141 3.12145 17.3811 3.96522L17.3811 3.96525L18.8902 5.05633C19.8267 5.73347 20.5747 6.2743 21.1389 6.77487C21.7215 7.29173 22.1573 7.807 22.4337 8.45513C22.7108 9.10469 22.7778 9.77045 22.7406 10.5381C22.7047 11.2789 22.5674 12.1726 22.3961 13.2871L22.0808 15.3387C21.8374 16.9225 21.6437 18.1837 21.359 19.1662C21.0646 20.1821 20.6498 20.9887 19.9086 21.6052C19.1704 22.2192 18.2911 22.4926 17.2169 22.6231C16.172 22.75 14.8539 22.75 13.1889 22.75H10.8111C9.14614 22.75 7.828 22.75 6.78306 22.6231C5.7089 22.4926 4.82957 22.2192 4.0914 21.6052C3.35015 20.9887 2.93544 20.1821 2.64105 19.1662C2.35634 18.1836 2.16255 16.9225 1.91918 15.3387L1.60392 13.2872C1.43264 12.1727 1.29528 11.2789 1.25941 10.5381C1.22224 9.77045 1.28925 9.10469 1.56629 8.45513C1.84274 7.807 2.27855 7.29173 2.86109 6.77487C3.42528 6.27429 4.17329 5.73346 5.10984 5.05632L6.61887 3.96524C7.78586 3.12145 8.7139 2.45043 9.5238 1.99594ZM10 17C9.44771 17 9 17.4477 9 18C9 18.5523 9.44771 19 10 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H10Z',
  d4: 'M12 1.25C11.1339 1.25 10.3597 1.52688 9.52381 1.99594C8.7139 2.45043 7.78586 3.12145 6.61887 3.96524L5.10984 5.05632C4.1733 5.73346 3.42528 6.27429 2.86109 6.77487C2.27855 7.29173 1.84274 7.807 1.5663 8.45513C1.28925 9.10469 1.22225 9.77045 1.25941 10.5381C1.29528 11.2789 1.43264 12.1727 1.60393 13.2872L1.91918 15.3387C2.16256 16.9225 2.35635 18.1836 2.64105 19.1662C2.93544 20.1821 3.35016 20.9887 4.0914 21.6052C4.82957 22.2192 5.7089 22.4926 6.78306 22.6231C7.828 22.75 9.14615 22.75 10.8111 22.75H13.1889C14.8539 22.75 16.172 22.75 17.2169 22.6231C18.2911 22.4926 19.1704 22.2192 19.9086 21.6052C20.6499 20.9887 21.0646 20.1821 21.359 19.1662C21.6437 18.1837 21.8374 16.9225 22.0808 15.3387L22.3961 13.2871C22.5674 12.1726 22.7047 11.2789 22.7406 10.5381C22.7778 9.77045 22.7108 9.10469 22.4337 8.45513C22.1573 7.807 21.7215 7.29173 21.1389 6.77487C20.5747 6.2743 19.8267 5.73347 18.8902 5.05633L17.3811 3.96525C16.2142 3.12146 15.2861 2.45043 14.4762 1.99594C13.6403 1.52688 12.8661 1.25 12 1.25Z',
  d5: 'M9 18C9 17.4477 9.44772 17 10 17L14 17C14.5523 17 15 17.4477 15 18C15 18.5523 14.5523 19 14 19L10 19C9.44772 19 9 18.5523 9 18Z',
  d6: 'M19.5016 22L22.0017 9L12.0017 2L2 9L4.50161 22H19.5016Z',
  d7: 'M12.4318 1.38558C12.1736 1.20482 11.8299 1.20481 11.5717 1.38554L1.56998 8.38554C1.32767 8.55513 1.20765 8.85129 1.26354 9.14172L3.76515 22.1417C3.83309 22.4948 4.14207 22.75 4.50164 22.75H19.5016C19.8612 22.75 20.1702 22.4948 20.2381 22.1416L22.7382 9.14164C22.7941 8.85125 22.6741 8.55515 22.4318 8.38558L12.4318 1.38558ZM10 19H14V17H10V19Z',
};

export const IconHome04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-stroke-rounded IconHome04StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-duotone-rounded IconHome04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-twotone-rounded IconHome04TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-solid-rounded IconHome04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-bulk-rounded IconHome04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-stroke-sharp IconHome04StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHome04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="home-04-solid-sharp IconHome04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHome04: TheIconSelfPack = {
  name: 'Home04',
  StrokeRounded: IconHome04StrokeRounded,
  DuotoneRounded: IconHome04DuotoneRounded,
  TwotoneRounded: IconHome04TwotoneRounded,
  SolidRounded: IconHome04SolidRounded,
  BulkRounded: IconHome04BulkRounded,
  StrokeSharp: IconHome04StrokeSharp,
  SolidSharp: IconHome04SolidSharp,
};