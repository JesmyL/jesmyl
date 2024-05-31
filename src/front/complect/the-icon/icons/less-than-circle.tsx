import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M14 8L10.6678 11.0203C9.77741 11.8273 9.77741 12.1727 10.6678 12.9797L14 16',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM14.6716 8.74095C15.0808 8.37005 15.1118 7.73765 14.7409 7.32844C14.37 6.91923 13.7376 6.88817 13.3284 7.25907L9.9962 10.2793C9.75786 10.4954 9.52481 10.7278 9.34858 10.9787C9.16641 11.2381 9 11.5809 9 12C9 12.4191 9.16641 12.7619 9.34858 13.0213C9.52481 13.2723 9.75786 13.5047 9.9962 13.7207L13.3284 16.7409C13.7376 17.1118 14.37 17.0808 14.7409 16.6716C15.1118 16.2624 15.0808 15.63 14.6716 15.2591L11.3393 12.2388C11.2302 12.1399 11.1506 12.0616 11.0929 12C11.1506 11.9384 11.2302 11.8601 11.3393 11.7612L14.6716 8.74095Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M14.7409 7.32844C15.1118 7.73765 15.0808 8.37005 14.6716 8.74095L11.3393 11.7612C11.2302 11.8601 11.1506 11.9384 11.0929 12C11.1506 12.0616 11.2302 12.1399 11.3393 12.2388L14.6716 15.2591C15.0808 15.63 15.1118 16.2624 14.7409 16.6716C14.37 17.0808 13.7376 17.1118 13.3284 16.7409L9.9962 13.7207C9.75786 13.5047 9.52481 13.2723 9.34858 13.0213C9.16641 12.7619 9 12.4191 9 12C9 11.5809 9.16641 11.2381 9.34858 10.9787C9.52481 10.7278 9.75786 10.4954 9.9962 10.2793L13.3284 7.25907C13.7376 6.88817 14.37 6.91923 14.7409 7.32844Z',
  d5: 'M14.0002 8L10 12L14.0002 16',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM14.7075 8.70722L13.2933 7.29297L8.58594 12.0001L13.2933 16.7072L14.7075 15.293L11.4144 12.0001L14.7075 8.70722Z',
} as const;

export const IconLessThanCircleStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-stroke-rounded IconLessThanCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLessThanCircleDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-duotone-rounded IconLessThanCircleDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanCircleTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-twotone-rounded IconLessThanCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLessThanCircleSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-solid-rounded IconLessThanCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanCircleBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-bulk-rounded IconLessThanCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanCircleStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-stroke-sharp IconLessThanCircleStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLessThanCircleSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-circle-solid-sharp IconLessThanCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLessThanCircle: TheIconSelfPack = {
  name: 'LessThanCircle',
  StrokeRounded: IconLessThanCircleStrokeRounded,
  DuotoneRounded: IconLessThanCircleDuotoneRounded,
  TwotoneRounded: IconLessThanCircleTwotoneRounded,
  SolidRounded: IconLessThanCircleSolidRounded,
  BulkRounded: IconLessThanCircleBulkRounded,
  StrokeSharp: IconLessThanCircleStrokeSharp,
  SolidSharp: IconLessThanCircleSolidSharp,
};