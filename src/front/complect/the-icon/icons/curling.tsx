import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 15H12',
  d2: 'M7.00232 20H16.9977C18.8661 20 19.8002 20 20.4961 19.5981C22.162 18.6358 21.9954 16.6878 21.9954 15C21.9954 13.3122 22.162 11.3642 20.4961 10.4019C20.2312 10.2489 19.9318 10.1542 19.5594 10.0955C19.262 10.0486 19.1132 10.0251 19.0161 9.95468C18.9189 9.88421 18.8587 9.7663 18.7383 9.53049L17.6078 7.31672C16.189 4.57414 15.2278 4 12.0551 4H7.6144C7.02446 4 6.40472 4.00228 6.14112 4.61732C5.95569 5.04998 5.95569 5.95002 6.14112 6.38268C6.40472 6.99772 7.02446 7 7.6144 7H11.718C13.3971 7 13.7145 7.81197 13.774 8.9998V8.99981C13.797 9.45941 13.8085 9.68921 13.6606 9.84461C13.5128 10 13.271 10 12.7874 10H7.00232C5.13395 10 4.19977 10 3.50394 10.4019C1.83797 11.3642 2.00463 13.3122 2.00463 15C2.00463 16.6878 1.83797 18.6358 3.50394 19.5981C4.19977 20 5.13395 20 7.00232 20Z',
  d3: 'M12.0474 3.25004L7.57319 3.25002C7.30327 3.24981 6.90436 3.24951 6.53483 3.3589C6.09627 3.48873 5.67794 3.7763 5.4441 4.32191C5.29339 4.67356 5.24439 5.12393 5.24439 5.50004C5.24439 5.87614 5.29339 6.32651 5.4441 6.67817C5.67794 7.22377 6.09627 7.51134 6.53483 7.64117C6.90436 7.75056 7.30327 7.75026 7.57319 7.75005L11.7104 7.75004C12.4428 7.75004 12.6783 7.92661 12.7726 8.03826C12.8977 8.18653 12.9885 8.46327 13.0172 9.03732C13.023 9.15264 12.9307 9.24895 12.8152 9.24898L6.95885 9.25004C6.05505 9.25003 5.32608 9.25002 4.73803 9.30334C4.13191 9.3583 3.60226 9.47461 3.12114 9.75252C2.05058 10.3709 1.58284 11.3171 1.38695 12.2793C1.31308 12.6422 1.2758 13.0215 1.2577 13.3963C1.24425 13.6747 1.23753 13.8139 1.32619 13.907C1.41485 14 1.55868 14 1.84635 14H11.9919C12.5442 14 12.9919 14.4477 12.9919 15C12.9919 15.5523 12.5442 16 11.9919 16H1.84635C1.55868 16 1.41485 16 1.32619 16.093C1.23753 16.1861 1.24425 16.3253 1.25769 16.6037C1.27579 16.9785 1.31308 17.3579 1.38695 17.7207C1.58284 18.683 2.05058 19.6292 3.12114 20.2476C3.60226 20.5255 4.13191 20.6418 4.73803 20.6967C5.32608 20.7501 6.05505 20.75 6.95885 20.75H17.0258C17.9296 20.75 18.6586 20.7501 19.2466 20.6967C19.8528 20.6418 20.3824 20.5255 20.8635 20.2476C21.9341 19.6292 22.4018 18.683 22.5977 17.7207C22.754 16.9528 22.7465 16.1114 22.7401 15.3947V14.6054C22.7465 13.8886 22.754 13.0472 22.5977 12.2793C22.4018 11.3171 21.9341 10.3709 20.8635 9.75251C20.4974 9.54105 20.1037 9.42325 19.6686 9.35467C19.5626 9.33609 19.4784 9.27396 19.4305 9.22599C19.4236 9.21898 19.4201 9.21548 19.4063 9.19649C19.3925 9.1775 19.3871 9.16704 19.3764 9.14613L18.2681 6.97567L18.2663 6.97213C17.5472 5.58222 16.8723 4.58704 15.8661 3.98605C14.864 3.38751 13.6499 3.25004 12.0474 3.25004Z',
  d4: 'M7.57323 3.25002L12.0475 3.25004C13.65 3.25004 14.8641 3.38751 15.8661 3.98605C16.8723 4.58704 17.5473 5.58222 18.2663 6.97213L18.2682 6.97567L19.3986 9.18944C19.4318 9.23455 19.5322 9.33075 19.6686 9.35467C20.1037 9.42325 20.4975 9.54105 20.8636 9.75251C21.9341 10.3709 22.4019 11.3171 22.5978 12.2793C22.7541 13.0472 22.7466 13.8886 22.7401 14.6054V15.3947C22.7466 16.1114 22.7541 16.9528 22.5978 17.7207C22.4019 18.683 21.9341 19.6292 20.8636 20.2476C20.3825 20.5255 19.8528 20.6418 19.2467 20.6967C18.6586 20.7501 17.9297 20.75 17.0259 20.75H6.95889C6.05509 20.75 5.32613 20.7501 4.73807 20.6967C4.13195 20.6418 3.6023 20.5255 3.12118 20.2476C2.05062 19.6292 1.58288 18.683 1.387 17.7207C1.23067 16.9528 1.23819 16.1114 1.24461 15.3947V14.6054C1.23819 13.8886 1.23067 13.0472 1.387 12.2793C1.58288 11.3171 2.05062 10.3709 3.12118 9.75252C3.6023 9.47461 4.13195 9.3583 4.73807 9.30334C5.32613 9.25002 6.05509 9.25003 6.95889 9.25004L13.0271 9.24894C13.0271 9.24894 13.0214 9.12017 13.0173 9.03732C12.9885 8.46327 12.8978 8.18653 12.7726 8.03826C12.6784 7.92661 12.4428 7.75004 11.7104 7.75004L7.57323 7.75005C7.30331 7.75026 6.9044 7.75056 6.53487 7.64117C6.09631 7.51134 5.67798 7.22377 5.44414 6.67817C5.29343 6.32651 5.24443 5.87614 5.24443 5.50004C5.24443 5.12393 5.29343 4.67356 5.44414 4.32191C5.67798 3.7763 6.09631 3.48873 6.53487 3.3589C6.9044 3.24951 7.30331 3.24981 7.57323 3.25002Z',
  d5: 'M1.24242 16C1.24105 15.7917 1.24287 15.5886 1.24461 15.3947V14.6054C1.24287 14.4114 1.24105 14.2083 1.24243 14H11.9919C12.5442 14 12.9919 14.4477 12.9919 15C12.9919 15.5523 12.5442 16 11.9919 16H1.24242Z',
  d6: 'M1.99805 15H11.998',
  d7: 'M5.00335 20H21.002C21.5542 20 22.002 19.5523 22.002 19V11C22.002 10.4477 21.5542 10 21.002 10H19.0059L16.0038 4H5.99917V7H13.5026L15.0033 10H5.00334C3.34572 10 2.00195 11.3431 2.00195 13V17C2.00195 18.6569 3.34572 20 5.00335 20Z',
  d8: 'M1.25 17C1.25 19.0711 2.92966 20.75 5.00162 20.75H20.75C21.8546 20.75 22.75 19.8546 22.75 18.75V11.25C22.75 10.1454 21.8546 9.25 20.75 9.25H19.4674L16.4654 3.25H5.24709V6.75H13.0369L14.104 9.25H5.00162C2.92966 9.25 1.25 10.9289 1.25 13V14.25H12V15.75H1.25V17Z',
};

export const IconCurlingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-stroke-rounded IconCurlingStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCurlingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-duotone-rounded IconCurlingDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconCurlingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-twotone-rounded IconCurlingTwotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCurlingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-solid-rounded IconCurlingSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCurlingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-bulk-rounded IconCurlingBulkRounded"
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

export const IconCurlingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-stroke-sharp IconCurlingStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCurlingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="curling-solid-sharp IconCurlingSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCurling: TheIconSelfPack = {
  name: 'Curling',
  StrokeRounded: IconCurlingStrokeRounded,
  DuotoneRounded: IconCurlingDuotoneRounded,
  TwotoneRounded: IconCurlingTwotoneRounded,
  SolidRounded: IconCurlingSolidRounded,
  BulkRounded: IconCurlingBulkRounded,
  StrokeSharp: IconCurlingStrokeSharp,
  SolidSharp: IconCurlingSolidSharp,
};