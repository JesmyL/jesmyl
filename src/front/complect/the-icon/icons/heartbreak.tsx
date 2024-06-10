import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 16L13.5 13.5L11.5 11.5L14.5 9L12 5C12 5 12.4578 4.50096 13.0344 4.06801C14.4404 3.01211 16.7809 2.34923 19.4626 3.99415C22.9819 6.15294 23.7783 13.2749 15.6605 19.2834C14.1143 20.4278 13.3412 21 12 21C10.6588 21 9.88572 20.4278 8.33953 19.2834C0.221721 13.2749 1.01807 6.15294 4.53744 3.99415C6.43149 2.83234 8.15537 2.82181 9.5 3.28788',
  d2: 'M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12 5 12 5L9.5 3.28788C8.15537 2.82181 6.43149 2.83234 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z',
  d3: 'M13.0344 4.06787C12.4578 4.50081 12 4.99986 12 4.99986L14.5 8.99986L11.5 11.4999L13.5 13.4999L12 15.9999',
  d4: 'M10.5296 2.915C8.90621 2.08411 6.63257 1.82951 4.14538 3.35515C2.08414 4.61952 0.924312 7.2606 1.3313 10.2951C1.74024 13.3443 3.71383 16.7929 7.89343 19.8865C9.34482 20.9614 10.41 21.7503 12.0001 21.7503C13.5902 21.7503 14.6554 20.9614 16.1068 19.8865C20.2864 16.7929 22.26 13.3443 22.6689 10.2951C23.0759 7.2606 21.9161 4.61952 19.8548 3.35515C16.8738 1.52662 14.1996 2.25537 12.5841 3.46861C12.5635 3.48406 12.5434 3.49913 12.5238 3.51384L15.1671 8.65714C15.3277 8.96945 15.25 9.35133 14.9802 9.57613L12.6111 11.5504L14.0304 12.9696C14.2738 13.213 14.3203 13.5907 14.1432 13.8858L12.6432 16.3858C12.4301 16.741 11.9694 16.8562 11.6142 16.6431C11.259 16.43 11.1439 15.9693 11.357 15.6141L12.5557 13.6162L10.9698 12.0303C10.8208 11.8813 10.7413 11.6765 10.7509 11.466C10.7604 11.2555 10.8581 11.0587 11.0199 10.9238L13.5584 8.80842L10.5296 2.915Z',
  d5: 'M4.14538 3.35467C7.12636 1.52614 9.80059 2.25488 11.4161 3.46812C11.6819 3.66771 11.8643 3.80431 12.0001 3.89655C12.1359 3.80431 12.3183 3.66771 12.5841 3.46812C14.1996 2.25488 16.8738 1.52614 19.8548 3.35467C21.9161 4.61903 23.0759 7.26011 22.6689 10.2946C22.26 13.3438 20.2864 16.7924 16.1068 19.886C14.6554 20.9609 13.5902 21.7498 12.0001 21.7498C10.41 21.7498 9.34482 20.9609 7.89343 19.886C3.71383 16.7924 1.74024 13.3438 1.3313 10.2946C0.924312 7.26011 2.08414 4.61903 4.14538 3.35467Z',
  d6: 'M11.4163 3.46815C11.6821 3.66775 11.8645 3.80435 12.0003 3.89659C12.1256 3.81149 12.2906 3.68863 12.524 3.51339L15.1674 8.65668C15.3279 8.969 15.2502 9.35087 14.9804 9.57567L12.6114 11.5499L14.0306 12.9692C14.274 13.2125 14.3205 13.5903 14.1434 13.8854L12.6434 16.3854C12.4303 16.7406 11.9696 16.8557 11.6144 16.6426C11.2592 16.4295 11.1441 15.9688 11.3572 15.6136L12.5559 13.6158L10.97 12.0298C10.821 11.8808 10.7415 11.676 10.7511 11.4655C10.7606 11.255 10.8583 11.0582 11.0202 10.9233L13.5586 8.80797L10.5298 2.91455C10.8521 3.07951 11.1487 3.26719 11.4163 3.46815Z',
  d7: 'M12 16L13.5 13.5L11.5 11.5L14.5 9L11.9991 4.7597C11.9991 4.7597 14.8652 1.60383 18.8569 3.74469C23.6916 6.33769 24.0389 16.492 11.9991 21C-0.0407534 16.492 0.306417 6.33768 5.14113 3.74468C6.84394 2.83142 8.34194 2.88204 9.5 3.24037',
  d8: 'M9.56284 2.47641L13.5191 8.82407L10.3896 11.4252L12.5563 13.5863L11.3576 15.5789L12.6438 16.3487L14.4451 13.3543L12.6117 11.5258L15.4822 9.13992L12.08 3.68133C12.451 3.39648 13.0008 3.03057 13.6362 2.75876C15.0219 2.16593 16.9801 1.88759 19.2121 3.08157C21.9946 4.57004 23.3602 8.13312 22.4864 11.8026C21.6024 15.5144 18.4616 19.3369 12.2628 21.6518L11.9998 21.75L11.7368 21.6518C5.53805 19.3369 2.39718 15.5144 1.51321 11.8026C0.639297 8.13312 2.00488 4.57003 4.7874 3.08156C6.61844 2.10208 8.26521 2.11343 9.56284 2.47641Z',
};

export const IconHeartbreakStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-stroke-rounded IconHeartbreakStrokeRounded"
    >
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

export const IconHeartbreakDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-duotone-rounded IconHeartbreakDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconHeartbreakTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-twotone-rounded IconHeartbreakTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHeartbreakSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-solid-rounded IconHeartbreakSolidRounded"
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

export const IconHeartbreakBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-bulk-rounded IconHeartbreakBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeartbreakStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-stroke-sharp IconHeartbreakStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeartbreakSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heartbreak-solid-sharp IconHeartbreakSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHeartbreak: TheIconSelfPack = {
  name: 'Heartbreak',
  StrokeRounded: IconHeartbreakStrokeRounded,
  DuotoneRounded: IconHeartbreakDuotoneRounded,
  TwotoneRounded: IconHeartbreakTwotoneRounded,
  SolidRounded: IconHeartbreakSolidRounded,
  BulkRounded: IconHeartbreakBulkRounded,
  StrokeSharp: IconHeartbreakStrokeSharp,
  SolidSharp: IconHeartbreakSolidSharp,
};