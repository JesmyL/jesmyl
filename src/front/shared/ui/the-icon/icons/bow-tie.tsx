import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 9.5022C9 8.50179 6.02143 5.77926 4.66065 6.01432C1.11312 6.62711 1.11312 17.3771 4.66065 17.9899C6.02143 18.2249 9 15.5025 10 14.5021',
  d2: 'M14 9.5022C15 8.50179 17.9786 5.77926 19.3393 6.01432C22.8869 6.62711 22.8869 17.3771 19.3393 17.9899C17.9786 18.2249 15 15.5025 14 14.5022',
  d3: 'M9.5 12.002C9.5 9.90315 10.1219 9.00195 12 9.00195C13.749 9.00195 14.5 9.74822 14.5 12.002C14.5 14.1008 13.8781 15.002 12 15.002C10.1219 15.002 9.5 14.1008 9.5 12.002Z',
  d4: 'M9 12.002H8',
  d5: 'M16 12.002H15',
  d6: 'M4.66065 6.01432C1.11312 6.62711 1.11312 17.3771 4.66065 17.9899C6.02143 18.2249 9 15.5025 10 14.5021C8.8 12.1038 9.5 10.1695 10 9.5022C9 8.50179 6.02143 5.77926 4.66065 6.01432Z',
  d7: 'M19.3393 6.01432C22.8869 6.62711 22.8869 17.3771 19.3393 17.9899C17.9786 18.2249 15 15.5025 14 14.5022C15.2 12.104 14.5 10.1696 14 9.5022C15 8.50179 17.9786 5.77926 19.3393 6.01432Z',
  d8: 'M9.5 12C9.5 9.9012 10.1219 9 12 9C13.749 9 14.5 9.74627 14.5 12C14.5 14.0988 13.8781 15 12 15C10.1219 15 9.5 14.0988 9.5 12Z',
  d9: 'M9 12H8',
  d10: 'M16 12H15',
  d11: 'M7.91431 17.3103C7.37649 17.7118 6.80328 18.0918 6.25789 18.3585C5.74525 18.6092 5.11974 18.8303 4.53299 18.7289C3.25521 18.5082 2.44448 17.4087 1.96925 16.226C1.48048 15.0096 1.25 13.4886 1.25 12.0021C1.25 10.5156 1.48048 8.99456 1.96925 7.77821C2.44448 6.59552 3.2552 5.49598 4.53299 5.27526C5.11975 5.17391 5.74527 5.39499 6.2579 5.64572C6.80329 5.91247 7.3765 6.29243 7.91432 6.69399C8.16301 6.87967 8.40873 7.07345 8.64595 7.26804C8.90172 7.47785 9.0296 7.58275 9.03857 7.71184C9.04754 7.84093 8.91694 7.9825 8.65574 8.26566L8.65573 8.26566C8.59711 8.32921 8.53988 8.39574 8.48415 8.46537C8.00391 9.0655 7.75088 9.76388 7.62236 10.466C7.57393 10.7306 7.54972 10.8629 7.46627 10.9325C7.38282 11.002 7.25693 11.002 7.00516 11.002H6.5C5.94772 11.002 5.5 11.4498 5.5 12.002C5.5 12.5543 5.94772 13.002 6.5 13.002H7.00516C7.25693 13.002 7.38282 13.002 7.46627 13.0716C7.54972 13.1412 7.57393 13.2735 7.62236 13.5381C7.75088 14.2402 8.00391 14.9386 8.48415 15.5387C8.5399 15.6084 8.59716 15.6749 8.65581 15.7385C8.91704 16.0217 9.04765 16.1633 9.03868 16.2923C9.02972 16.4214 8.90182 16.5263 8.64604 16.7362C8.4088 16.9308 8.16304 17.1246 7.91431 17.3103ZM16.0857 17.3103C16.6235 17.7118 17.1967 18.0918 17.7421 18.3585C18.2548 18.6092 18.8803 18.8303 19.467 18.7289C20.7448 18.5082 21.5555 17.4087 22.0308 16.226C22.5195 15.0096 22.75 13.4886 22.75 12.0021C22.75 10.5156 22.5195 8.99456 22.0308 7.77821C21.5555 6.59552 20.7448 5.49598 19.467 5.27526C18.8803 5.17391 18.2547 5.39499 17.7421 5.64572C17.1967 5.91247 16.6235 6.29243 16.0857 6.69399C15.837 6.87964 15.5914 7.07339 15.3542 7.26795C15.0988 7.47746 14.9711 7.58221 14.962 7.7112C14.953 7.84018 15.0832 7.98159 15.3435 8.26441C15.368 8.29108 15.3923 8.3183 15.4164 8.34606C15.953 8.96442 16.2355 9.70441 16.3758 10.467C16.4244 10.7311 16.4486 10.8631 16.5321 10.9326C16.6155 11.002 16.7412 11.002 16.9927 11.002H17.5C18.0523 11.002 18.5 11.4498 18.5 12.002C18.5 12.5543 18.0523 13.002 17.5 13.002H16.9949C16.7431 13.002 16.6172 13.002 16.5338 13.0716C16.4503 13.1412 16.4261 13.2735 16.3777 13.5381C16.2491 14.2402 15.9961 14.9386 15.5159 15.5387C15.4601 15.6084 15.4028 15.6749 15.3442 15.7385C15.083 16.0217 14.9523 16.1633 14.9613 16.2924C14.9703 16.4215 15.0982 16.5264 15.354 16.7362C15.5912 16.9308 15.837 17.1246 16.0857 17.3103ZM12 8.25C10.9542 8.25 10.0542 8.50199 9.46013 9.24434C8.90193 9.94188 8.75 10.9156 8.75 12C8.75 13.0844 8.90193 14.0581 9.46013 14.7557C10.0542 15.498 10.9542 15.75 12 15.75C13.0458 15.75 13.9458 15.498 14.5399 14.7557C15.0981 14.0581 15.25 13.0844 15.25 12C15.25 10.8269 15.0625 9.8434 14.4723 9.16329C13.8556 8.45256 12.9606 8.25 12 8.25Z',
  d12: 'M9.46013 9.24434C10.0542 8.50199 10.9542 8.25 12 8.25C12.9606 8.25 13.8556 8.45256 14.4723 9.16329C15.0625 9.8434 15.25 10.8269 15.25 12C15.25 13.0844 15.0981 14.0581 14.5399 14.7557C13.9458 15.498 13.0458 15.75 12 15.75C10.9542 15.75 10.0542 15.498 9.46013 14.7557C8.90193 14.0581 8.75 13.0844 8.75 12C8.75 10.9156 8.90193 9.94188 9.46013 9.24434Z',
  d13: 'M6.25789 18.3584C6.80328 18.0917 7.37649 17.7117 7.91431 17.3102C8.16304 17.1245 8.4088 16.9307 8.64604 16.7361C8.90182 16.5263 9.02972 16.4213 9.03868 16.2923C9.04765 16.1632 8.91704 16.0216 8.65581 15.7384C8.59716 15.6748 8.5399 15.6083 8.48415 15.5386C8.00391 14.9385 7.75088 14.2401 7.62236 13.538C7.57393 13.2734 7.54972 13.1411 7.46627 13.0715C7.38282 13.002 7.25693 13.002 7.00516 13.002H6.5C5.94772 13.002 5.5 12.5542 5.5 12.002C5.5 11.4497 5.94772 11.002 6.5 11.002H7.00516C7.25693 11.002 7.38282 11.002 7.46627 10.9324C7.54972 10.8628 7.57393 10.7305 7.62236 10.4659C7.75088 9.76379 8.00391 9.06541 8.48415 8.46528C8.53988 8.39565 8.59711 8.32912 8.65573 8.26557C8.91693 7.98241 9.04754 7.84084 9.03857 7.71175C9.0296 7.58266 8.90172 7.47776 8.64595 7.26795C8.40873 7.07336 8.16301 6.87958 7.91432 6.6939C7.3765 6.29234 6.80329 5.91238 6.2579 5.64563C5.74527 5.3949 5.11975 5.17382 4.53299 5.27517C3.2552 5.49589 2.44448 6.59543 1.96925 7.77812C1.48048 8.99447 1.25 10.5155 1.25 12.002C1.25 13.4885 1.48048 15.0095 1.96925 16.2259C2.44448 17.4086 3.25521 18.5081 4.53299 18.7288C5.11974 18.8302 5.74525 18.6091 6.25789 18.3584Z',
  d14: 'M17.7421 18.3584C17.1967 18.0917 16.6235 17.7117 16.0857 17.3102C15.837 17.1245 15.5912 16.9307 15.354 16.7361C15.0982 16.5263 14.9703 16.4214 14.9613 16.2923C14.9523 16.1632 15.083 16.0216 15.3442 15.7384C15.4028 15.6749 15.4601 15.6083 15.5159 15.5386C15.9961 14.9385 16.2491 14.2401 16.3777 13.538C16.4261 13.2734 16.4503 13.1411 16.5338 13.0715C16.6172 13.002 16.7431 13.002 16.9949 13.002H17.5C18.0523 13.002 18.5 12.5542 18.5 12.002C18.5 11.4497 18.0523 11.002 17.5 11.002H16.9927C16.7412 11.002 16.6155 11.002 16.5321 10.9325C16.4486 10.863 16.4244 10.731 16.3758 10.4669C16.2355 9.70432 15.953 8.96433 15.4164 8.34597C15.3923 8.31821 15.368 8.29099 15.3435 8.26432C15.0832 7.9815 14.953 7.84009 14.962 7.71111C14.9711 7.58212 15.0988 7.47737 15.3542 7.26786C15.5914 7.0733 15.837 6.87955 16.0857 6.6939C16.6235 6.29234 17.1967 5.91238 17.7421 5.64563C18.2547 5.3949 18.8803 5.17382 19.467 5.27517C20.7448 5.49589 21.5555 6.59543 22.0308 7.77812C22.5195 8.99447 22.75 10.5155 22.75 12.002C22.75 13.4885 22.5195 15.0095 22.0308 16.2259C21.5555 17.4086 20.7448 18.5081 19.467 18.7288C18.8803 18.8302 18.2548 18.6091 17.7421 18.3584Z',
  d15: 'M9.5 9.00006C8.5 7.99965 6.02143 5.77932 4.66065 6.01437C1.11312 6.62716 1.11312 17.3771 4.66065 17.9899C6.02143 18.225 8.5 16.0005 9.5 15.0001',
  d16: 'M14.5 9.00006C15.5 7.99965 17.9786 5.77932 19.3393 6.01437C22.8869 6.62716 22.8869 17.3771 19.3393 17.9899C17.9786 18.225 15.5 16.0004 14.5 15.0001',
  d17: 'M14.5 9H9.5V15.002H14.5V9Z',
  d18: 'M9 12.002H7',
  d19: 'M17 12.002H15',
  d20: 'M9.25 9.00098C9.25 8.58676 9.58579 8.25098 10 8.25098H14C14.4142 8.25098 14.75 8.58676 14.75 9.00098V15.0029C14.75 15.4171 14.4142 15.7529 14 15.7529H10C9.58579 15.7529 9.25 15.4171 9.25 15.0029V9.00098Z',
  d21: 'M17.8513 5.5557C18.3392 5.34407 18.9124 5.18251 19.4669 5.27821C20.7445 5.49871 21.5553 6.59726 22.0307 7.77924C22.5195 8.99474 22.75 10.5146 22.75 12C22.75 13.4854 22.5195 15.0053 22.0307 16.2208C21.5553 17.4028 20.7445 18.5013 19.4669 18.7218C18.9121 18.8176 18.3386 18.6555 17.8508 18.4434C17.3453 18.2237 16.8292 17.9045 16.3494 17.5629C15.9345 17.2675 15.5305 16.9437 15.1639 16.6295C15.6702 16.2667 16 15.6733 16 15.0029V12.752H18V11.252H16V9.00098C16 8.32855 15.6682 7.73363 15.1593 7.37105C15.5273 7.05591 15.933 6.73094 16.3499 6.43465C16.8298 6.09355 17.3458 5.77496 17.8513 5.5557Z',
  d22: 'M8 9.00098C8 8.32855 8.33185 7.73363 8.8407 7.37105C8.47271 7.05591 8.06696 6.73094 7.65014 6.43466C7.17025 6.09355 6.65421 5.77497 6.14871 5.5557C5.66081 5.34407 5.08758 5.18251 4.5331 5.27821C3.25552 5.49871 2.44468 6.59726 1.96933 7.77924C1.48049 8.99474 1.25 10.5146 1.25 12C1.25 13.4854 1.48049 15.0053 1.96933 16.2208C2.44468 17.4028 3.25552 18.5013 4.5331 18.7218C5.08792 18.8176 5.66137 18.6555 6.14922 18.4434C6.65473 18.2237 7.17075 17.9046 7.6506 17.563C8.06553 17.2676 8.46947 16.9437 8.8361 16.6296C8.32985 16.2667 8 15.6733 8 15.0029V12.752H6V11.252H8V9.00098Z',
};

export const IconBowTieStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-stroke-rounded IconBowTieStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBowTieDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-duotone-rounded IconBowTieDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBowTieTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-twotone-rounded IconBowTieTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBowTieSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-solid-rounded IconBowTieSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBowTieBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-bulk-rounded IconBowTieBulkRounded"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconBowTieStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-stroke-sharp IconBowTieStrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBowTieSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bow-tie-solid-sharp IconBowTieSolidSharp"
    >
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBowTie: TheIconSelfPack = {
  name: 'BowTie',
  StrokeRounded: IconBowTieStrokeRounded,
  DuotoneRounded: IconBowTieDuotoneRounded,
  TwotoneRounded: IconBowTieTwotoneRounded,
  SolidRounded: IconBowTieSolidRounded,
  BulkRounded: IconBowTieBulkRounded,
  StrokeSharp: IconBowTieStrokeSharp,
  SolidSharp: IconBowTieSolidSharp,
};