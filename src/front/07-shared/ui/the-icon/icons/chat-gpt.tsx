import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.7453 14.85L6.90439 12V7C6.90439 4.79086 8.72952 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128',
  d2: 'M9.59961 19.1791C10.3266 20.2757 11.5866 21.0008 13.0192 21.0008C15.2707 21.0008 17.0958 19.21 17.0958 17.0008V12.0008L12.1612 9.0957',
  d3: 'M9.45166 13.5L9.45123 7.66938L13.8642 5.16938C15.814 4.06481 18.3072 4.72031 19.4329 6.63348C20.1593 7.86806 20.1388 9.32466 19.5089 10.4995',
  d4: 'M4.48963 13.4993C3.8595 14.6742 3.83887 16.131 4.56539 17.3657C5.6911 19.2789 8.18428 19.9344 10.1341 18.8298L14.5471 16.3298L14.643 10.7344',
  d5: 'M17.0959 17.6309C18.4415 17.5734 19.7295 16.8634 20.4529 15.634C21.5786 13.7209 20.9105 11.2745 18.9607 10.1699L14.5477 7.66992L9.48904 10.4255',
  d6: 'M6.90454 6.36914C5.55865 6.42638 4.27032 7.13647 3.54684 8.36606C2.42113 10.2792 3.08917 12.7256 5.03896 13.8302L9.45196 16.3302L14.5 13.5804',
  d7: 'M3.54684 8.36606C2.42113 10.2792 3.08917 12.7256 5.03896 13.8302L9.45196 16.3302L11.976 14.9553L6.90454 12V6.36914C5.55865 6.42638 4.27032 7.13647 3.54684 8.36606Z',
  d8: 'M13.0192 21.0014C15.2707 21.0014 17.0958 19.2105 17.0958 17.0014V12.0014L14.6285 10.5488L14.5 16.5006L9.59961 19.1797C10.3266 20.2763 11.5866 21.0014 13.0192 21.0014Z',
  d9: 'M19.4328 6.63348C18.3071 4.72031 15.814 4.06481 13.8642 5.16938L9.45117 7.66938L9.45139 10.5847L14.5 7.66938L19.5089 10.4995C20.1387 9.32466 20.1593 7.86806 19.4328 6.63348Z',
  d10: 'M10.8312 2.25C8.55502 2.25 6.72848 4.05765 6.72848 6.26471V11.6721L8.5033 12.717L8.50289 7.03256C8.50287 6.82597 8.61397 6.63534 8.79373 6.53351L13.8559 3.66586C13.8788 3.65291 13.9017 3.64014 13.9247 3.62756C13.1733 2.78424 12.0673 2.25 10.8312 2.25Z',
  d11: 'M20.3539 9.45169C20.7288 8.39044 20.649 7.18338 20.0322 6.13514C18.9022 4.21475 16.3899 3.54874 14.4214 4.66389L9.65002 7.36677L9.65016 9.25194L14.6484 6.52949C14.8224 6.4347 15.033 6.43646 15.2054 6.53413L20.2676 9.40178C20.2966 9.41818 20.3253 9.43483 20.3539 9.45169Z',
  d12: 'M9.65026 10.5581L9.65047 13.3923L11.9529 14.7478L14.4088 13.4101L14.4558 10.67L12.0476 9.25228L9.65026 10.5581Z',
  d13: 'M13.222 8.61259L18.1365 11.5058C18.3116 11.6088 18.4191 11.7968 18.4191 12V17.7353C18.4191 17.7628 18.4188 17.7902 18.4184 17.8175C19.5522 17.6046 20.584 16.9282 21.2022 15.8776C22.3284 13.9638 21.6646 11.5115 19.7022 10.3998L14.9173 7.68922L13.222 8.61259Z',
  d14: 'M15.5916 11.3387L15.4949 16.9767C15.4915 17.1798 15.3809 17.3658 15.2042 17.4659L10.142 20.3336C10.1196 20.3463 10.0971 20.3588 10.0746 20.3711C10.8259 21.2152 11.9325 21.75 13.1692 21.75C15.4454 21.75 17.2719 19.9424 17.2719 17.7353V12.3279L15.5916 11.3387Z',
  d15: 'M14.3862 14.7286L9.35164 17.4709C9.17762 17.5657 8.96699 17.5639 8.79457 17.4662L3.73237 14.5986C3.70272 14.5818 3.67331 14.5648 3.64412 14.5475C3.26908 15.6088 3.34884 16.816 3.9657 17.8643C5.09571 19.7847 7.60799 20.4507 9.57655 19.3355L14.3536 16.6294L14.3862 14.7286Z',
  d16: 'M10.7785 15.3875L8.8055 14.226C8.79258 14.219 8.77995 14.2116 8.76765 14.2037L5.86393 12.4942C5.68885 12.3912 5.58136 12.2032 5.58136 12V6.26471C5.58136 6.23734 5.58158 6.21003 5.58201 6.18277C4.44805 6.39557 3.41608 7.072 2.79778 8.12278C1.67163 10.0366 2.3354 12.4889 4.29779 13.6006L9.08274 16.3111L10.7785 15.3875Z',
  d17: 'M10.8315 2.25C8.55535 2.25 6.72881 4.05765 6.72881 6.26471V11.6721L8.50363 12.717L8.50322 7.03256C8.5032 6.82597 8.6143 6.63534 8.79406 6.53351L13.8563 3.66586C13.8791 3.65291 13.9021 3.64014 13.925 3.62756C13.1736 2.78424 12.0676 2.25 10.8315 2.25Z',
  d18: 'M9.65059 10.5581L9.65079 13.3923L11.9533 14.7478L14.4091 13.4101L14.4561 10.67L12.0479 9.25228L9.65059 10.5581Z',
  d19: 'M13.2224 8.61259L18.1368 11.5058C18.3119 11.6088 18.4194 11.7968 18.4194 12V17.7353C18.4194 17.7628 18.4192 17.7902 18.4187 17.8175C19.5525 17.6046 20.5843 16.9282 21.2026 15.8776C22.3287 13.9638 21.6649 11.5115 19.7025 10.3998L14.9176 7.68922L13.2224 8.61259Z',
  d20: 'M14.3865 14.7286L9.35197 17.4709C9.17795 17.5657 8.96732 17.5639 8.7949 17.4662L3.7327 14.5986C3.70305 14.5818 3.67364 14.5648 3.64445 14.5475C3.26941 15.6088 3.34917 16.816 3.96603 17.8643C5.09604 19.7847 7.60832 20.4507 9.57688 19.3355L14.3539 16.6294L14.3865 14.7286Z',
  d21: 'M20.3539 9.45188C20.7288 8.39063 20.649 7.18356 20.0322 6.13532C18.9022 4.21494 16.3899 3.54892 14.4214 4.66408L9.65002 7.36695L9.65016 9.25213L14.6484 6.52968C14.8224 6.43489 15.033 6.43664 15.2054 6.53431L20.2676 9.40196C20.2966 9.41837 20.3253 9.43501 20.3539 9.45188Z',
  d22: 'M15.5916 11.3388L15.4949 16.9769C15.4915 17.18 15.3809 17.366 15.2042 17.4661L10.142 20.3338C10.1196 20.3465 10.0971 20.359 10.0746 20.3713C10.8259 21.2154 11.9325 21.7502 13.1692 21.7502C15.4454 21.7502 17.2719 19.9425 17.2719 17.7355V12.3281L15.5916 11.3388Z',
  d23: 'M10.7785 15.3877L8.8055 14.2261C8.79257 14.2192 8.77995 14.2118 8.76765 14.2039L5.86393 12.4944C5.68885 12.3914 5.58136 12.2033 5.58136 12.0002V6.26489C5.58136 6.23753 5.58158 6.21021 5.58201 6.18295C4.44805 6.39576 3.41608 7.07219 2.79778 8.12296C1.67163 10.0368 2.3354 12.4891 4.29779 13.6007L9.08274 16.3113L10.7785 15.3877Z',
  d24: 'M11.7453 14.85L6.90437 12V7C6.90437 4.79086 8.72951 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128',
  d25: 'M4.48865 13.4993C3.85852 14.6742 3.83789 16.131 4.56441 17.3657C5.69012 19.2789 8.1833 19.9344 10.1331 18.8298L14.5461 16.3298L14.642 10.7344',
  d26: 'M17.0951 17.6309C18.4408 17.5734 19.7287 16.8634 20.4521 15.634C21.5778 13.7209 20.9098 11.2745 18.96 10.1699L14.547 7.66992L9.48828 10.4255',
};

export const IconChatGptStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-stroke-rounded IconChatGptStrokeRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChatGptDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-duotone-rounded IconChatGptDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChatGptTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-twotone-rounded IconChatGptTwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChatGptSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-solid-rounded IconChatGptSolidRounded"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChatGptBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-bulk-rounded IconChatGptBulkRounded"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconChatGptStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-stroke-sharp IconChatGptStrokeSharp"
    >
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChatGptSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chat-gpt-solid-sharp IconChatGptSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChatGpt: TheIconSelfPack = {
  name: 'ChatGpt',
  StrokeRounded: IconChatGptStrokeRounded,
  DuotoneRounded: IconChatGptDuotoneRounded,
  TwotoneRounded: IconChatGptTwotoneRounded,
  SolidRounded: IconChatGptSolidRounded,
  BulkRounded: IconChatGptBulkRounded,
  StrokeSharp: IconChatGptStrokeSharp,
  SolidSharp: IconChatGptSolidSharp,
};