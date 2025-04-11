import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.14426 2.5C6.48724 2.56075 4.93529 2.81456 3.87493 3.87493C2.81456 4.93529 2.56075 6.48724 2.5 9.14426M14.8557 2.5C17.5128 2.56075 19.0647 2.81456 20.1251 3.87493C21.1854 4.93529 21.4392 6.48724 21.5 9.14426M14.8557 21.5C17.5128 21.4392 19.0647 21.1854 20.1251 20.1251C21.1854 19.0647 21.4392 17.5128 21.5 14.8557M9.14426 21.5C6.48724 21.4392 4.93529 21.1854 3.87493 20.1251C2.81456 19.0647 2.56075 17.5128 2.5 14.8557',
  d2: 'M7.99981 8H8.00879',
  d3: 'M15.9998 16H16.0088',
  d4: 'M8 16L16 8',
  d5: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d6: 'M10.144 2.47715C10.1566 3.02929 9.71927 3.48712 9.16713 3.49974C6.47325 3.56134 5.32529 3.83879 4.58204 4.58204C3.83879 5.32529 3.56134 6.47325 3.49974 9.16713C3.48712 9.71927 3.02929 10.1566 2.47715 10.144C1.92501 10.1314 1.48764 9.67355 1.50027 9.12141C1.56017 6.50124 1.79034 4.54531 3.16782 3.16782C4.54531 1.79034 6.50124 1.56017 9.12141 1.50027C9.67355 1.48764 10.1314 1.92501 10.144 2.47715ZM13.856 2.47715C13.8686 1.92501 14.3265 1.48764 14.8786 1.50027C17.4988 1.56017 19.4547 1.79034 20.8322 3.16782C22.2097 4.54531 22.4398 6.50124 22.4997 9.12141C22.5124 9.67355 22.075 10.1314 21.5229 10.144C20.9707 10.1566 20.5129 9.71927 20.5003 9.16713C20.4387 6.47325 20.1612 5.32529 19.418 4.58204C18.6747 3.83879 17.5268 3.56134 14.8329 3.49974C14.2807 3.48712 13.8434 3.02929 13.856 2.47715ZM21.5229 13.856C22.075 13.8686 22.5124 14.3264 22.4997 14.8786C22.4398 17.4988 22.2097 19.4547 20.8322 20.8322C19.4547 22.2097 17.4988 22.4398 14.8786 22.4997C14.3265 22.5124 13.8686 22.075 13.856 21.5229C13.8434 20.9707 14.2807 20.5129 14.8329 20.5003C17.5268 20.4387 18.6747 20.1612 19.418 19.418C20.1612 18.6747 20.4387 17.5268 20.5003 14.8329C20.5129 14.2807 20.9707 13.8434 21.5229 13.856ZM2.47715 13.856C3.02929 13.8434 3.48712 14.2807 3.49974 14.8329C3.56134 17.5268 3.83879 18.6747 4.58204 19.418C5.32529 20.1612 6.47325 20.4387 9.16713 20.5003C9.71927 20.5129 10.1566 20.9707 10.144 21.5229C10.1314 22.075 9.67355 22.5124 9.12141 22.4997C6.50124 22.4398 4.54531 22.2097 3.16782 20.8322C1.79034 19.4547 1.56017 17.4988 1.50027 14.8786C1.48764 14.3265 1.92501 13.8686 2.47715 13.856Z',
  d7: 'M6.49609 8C6.49609 7.17157 7.16767 6.5 7.99609 6.5H8.00508C8.8335 6.5 9.50508 7.17157 9.50508 8C9.50508 8.82843 8.8335 9.5 8.00508 9.5H7.99609C7.16767 9.5 6.49609 8.82843 6.49609 8Z',
  d8: 'M14.4961 16C14.4961 15.1716 15.1677 14.5 15.9961 14.5H16.0051C16.8335 14.5 17.5051 15.1716 17.5051 16C17.5051 16.8284 16.8335 17.5 16.0051 17.5H15.9961C15.1677 17.5 14.4961 16.8284 14.4961 16Z',
  d9: 'M16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289Z',
  d10: 'M9.14426 2.5H2.5V9.14426M14.8557 2.5H21.5V9.14426M14.8557 21.5H21.5V14.8557M9.14426 21.5H2.5V14.8557',
  d11: 'M1.5 1.5H9.14426V3.5H3.5V9.14426H1.5V1.5ZM20.5 3.5H14.8557V1.5H22.5V9.14426H20.5V3.5ZM22.5 14.8557V22.5H14.8557V20.5H20.5V14.8557H22.5ZM3.5 20.5V14.8557H1.5V22.5H9.14426V20.5H3.5Z',
  d12: 'M16.7072 8.70718L8.70718 16.7072L7.29297 15.293L15.293 7.29297L16.7072 8.70718Z',
};

export const IconDiscount01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiscount01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Discount01 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDiscount01: TheIconSelfPack = [
  'Discount01',
  IconDiscount01StrokeRounded,
  IconDiscount01DuotoneRounded,
  IconDiscount01TwotoneRounded,
  IconDiscount01SolidRounded,
  IconDiscount01BulkRounded,
  IconDiscount01StrokeSharp,
  IconDiscount01SolidSharp,
];