import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9953 12.5H12.0042M15.9908 12.5H15.9998M7.99976 12.5H8.00873',
  d2: 'M13.5 3.03368C12.2812 2.97856 11.0318 2.99114 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C21.9809 13.164 21.9937 12.8325 21.9982 12.5',
  d3: 'M17 4.5C17.4915 3.9943 18.7998 2 19.5 2M22 4.5C21.5085 3.9943 20.2002 2 19.5 2M19.5 2V10',
  d4: 'M14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0134 12.6607 22.0134 11.8009 21.9598 10.9707C21.6856 6.72838 18.3536 3.34913 14.1706 3.07107C12.7435 2.97621 11.2536 2.97641 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905Z',
  d5: 'M20.5059 10.125C20.5059 10.6773 20.0581 11.125 19.5059 11.125C18.9536 11.125 18.5059 10.6773 18.5059 10.125L18.5059 5.62496L17.9116 5.62498C17.736 5.62511 17.5203 5.62526 17.3439 5.60319L17.3405 5.60277C17.2141 5.587 16.638 5.51517 16.3637 4.94957C16.0887 4.38275 16.3907 3.88261 16.456 3.7744L16.4584 3.77037C16.5506 3.61735 16.6848 3.44647 16.7951 3.30592L16.8188 3.27567C17.1135 2.89985 17.4954 2.41563 17.8759 2.02462C18.0657 1.82951 18.283 1.62828 18.5139 1.46943C18.7191 1.32823 19.0693 1.12496 19.5 1.12496C19.9307 1.12496 20.2809 1.32823 20.4861 1.46943C20.717 1.62828 20.9343 1.82951 21.1241 2.02462C21.5046 2.41563 21.8865 2.89985 22.1812 3.27567L22.2049 3.30591C22.3152 3.44647 22.4494 3.61735 22.5416 3.77037L22.544 3.77441C22.6093 3.88261 22.9113 4.38275 22.6363 4.94957C22.362 5.51517 21.7859 5.58701 21.6595 5.60277L21.6561 5.60319C21.4797 5.62526 21.264 5.62511 21.0884 5.62498L20.5059 5.62496L20.5059 10.125Z',
  d6: 'M15.0138 5.60423C15.4001 6.40054 16.0359 6.76954 16.5168 6.94149C16.7697 7.03193 16.8961 7.07715 16.9509 7.15486C17.0056 7.23257 17.0056 7.3472 17.0056 7.57647L17.0056 10.125C17.0056 11.5057 18.1249 12.625 19.5056 12.625C20.8863 12.625 22.0056 11.5057 22.0056 10.125C22.0056 10.0917 22.0056 10.0751 22.0551 9.99996C22.1525 9.85203 22.4026 9.83037 22.524 9.95934C22.5857 10.0248 22.5864 10.0289 22.5878 10.0372C22.6456 10.3682 22.686 10.7052 22.7081 11.0473C22.7639 11.9097 22.7639 12.8018 22.7081 13.6642C22.4102 18.274 18.7869 21.9603 14.2203 22.2639C12.7601 22.3609 11.2369 22.3607 9.7796 22.2639C9.21466 22.2263 8.59972 22.0927 8.05834 21.8697C7.97227 21.8343 7.8962 21.803 7.82856 21.7754C7.69197 21.7198 7.62368 21.6919 7.54599 21.7016C7.4683 21.7112 7.40854 21.7552 7.28902 21.8431L7.19375 21.9132C6.40131 22.4976 5.40086 22.9075 3.98112 22.8729L3.93538 22.8718C3.6615 22.8653 3.36955 22.8583 3.13147 22.8123C2.8447 22.7568 2.48991 22.6181 2.26785 22.2395C2.02617 21.8275 2.12307 21.4108 2.21683 21.1484C2.30531 20.9007 2.45868 20.6102 2.61537 20.3135L2.63685 20.2728C3.10318 19.3891 3.23308 18.6669 2.98375 18.1854C2.15142 16.929 1.40267 15.3806 1.29175 13.6642C1.23601 12.8018 1.23601 11.9098 1.29175 11.0473C1.58966 6.43756 5.21295 2.75127 9.7796 2.44771C11.2369 2.35084 12.7601 2.35064 14.2203 2.44771C14.338 2.45553 14.455 2.4656 14.5714 2.47787C14.9321 2.5159 15.1124 2.53492 15.1901 2.65759C15.2677 2.78026 15.1958 2.98553 15.0519 3.39608C14.715 4.35732 14.8621 5.22653 15.0138 5.60423ZM8 11.625C7.44772 11.625 7 12.0727 7 12.625C7 13.1773 7.44772 13.625 8 13.625H8.00897C8.56126 13.625 9.00897 13.1773 9.00897 12.625C9.00897 12.0727 8.56126 11.625 8.00897 11.625H8ZM11.9955 11.625C11.4432 11.625 10.9955 12.0727 10.9955 12.625C10.9955 13.1773 11.4432 13.625 11.9955 13.625H12.0045C12.5568 13.625 13.0045 13.1773 13.0045 12.625C13.0045 12.0727 12.5568 11.625 12.0045 11.625H11.9955ZM15.991 11.625C15.4387 11.625 14.991 12.0727 14.991 12.625C14.991 13.1773 15.4387 13.625 15.991 13.625H16C16.5523 13.625 17 13.1773 17 12.625C17 12.0727 16.5523 11.625 16 11.625H15.991Z',
  d7: 'M16.5168 6.9415C16.036 6.76955 15.4002 6.40056 15.0139 5.60424C14.8622 5.22655 14.7151 4.35734 15.052 3.3961C15.1958 2.98555 15.2678 2.78028 15.1901 2.65761C15.1125 2.53494 14.9321 2.51592 14.5714 2.47789C14.455 2.46561 14.338 2.45555 14.2204 2.44773C12.7601 2.35066 11.2369 2.35086 9.77965 2.44773C5.213 2.75129 1.58972 6.43758 1.2918 11.0474C1.23607 11.9098 1.23607 12.8018 1.2918 13.6642C1.40272 15.3806 2.15148 16.929 2.98381 18.1854C3.23314 18.6669 3.10323 19.3891 2.6369 20.2728L2.61542 20.3135C2.45874 20.6102 2.30536 20.9007 2.21688 21.1484C2.12313 21.4108 2.02623 21.8275 2.26791 22.2395C2.48996 22.6181 2.84475 22.7568 3.13152 22.8123C3.36961 22.8584 3.66155 22.8653 3.93544 22.8719L3.98117 22.873C5.40092 22.9075 6.40136 22.4976 7.1938 21.9133L7.28907 21.8431C7.40859 21.7552 7.46835 21.7112 7.54604 21.7016C7.62373 21.692 7.69203 21.7198 7.82861 21.7755C7.89626 21.803 7.97233 21.8343 8.05839 21.8698C8.59978 22.0927 9.21472 22.2263 9.77965 22.2639C11.2369 22.3607 12.7601 22.3609 14.2204 22.2639C18.787 21.9603 22.4103 18.274 22.7082 13.6642C22.7639 12.8018 22.7639 11.9098 22.7082 11.0474C22.6861 10.7052 22.6457 10.3682 22.5879 10.0372C22.5864 10.029 22.5857 10.0248 22.5241 9.95936C22.4026 9.83039 22.1526 9.85205 22.0551 9.99998C22.0057 10.0751 22.0057 10.0917 22.0057 10.125C22.0057 11.5057 20.8864 12.625 19.5057 12.625C18.1249 12.625 17.0057 11.5057 17.0057 10.125L17.0057 7.57648C17.0057 7.34722 17.0057 7.23258 16.9509 7.15487C16.8962 7.07716 16.7697 7.03194 16.5168 6.9415Z',
  d8: 'M7 12.625C7 12.0727 7.44772 11.625 8 11.625H8.00897C8.56126 11.625 9.00897 12.0727 9.00897 12.625C9.00897 13.1773 8.56126 13.625 8.00897 13.625H8C7.44772 13.625 7 13.1773 7 12.625ZM10.9955 12.625C10.9955 12.0727 11.4432 11.625 11.9955 11.625H12.0045C12.5568 11.625 13.0045 12.0727 13.0045 12.625C13.0045 13.1773 12.5568 13.625 12.0045 13.625H11.9955C11.4432 13.625 10.9955 13.1773 10.9955 12.625ZM14.991 12.625C14.991 12.0727 15.4387 11.625 15.991 11.625H16C16.5523 11.625 17 12.0727 17 12.625C17 13.1773 16.5523 13.625 16 13.625H15.991C15.4387 13.625 14.991 13.1773 14.991 12.625Z',
  d9: 'M11.9242 12.5H11.933M15.8916 12.5H15.9005M7.95679 12.5H7.96569',
  d10: 'M15.9011 5L18.88 2L21.8589 5M18.88 10V2.63315',
  d11: 'M21.9115 12.2796C22.0257 17.5941 18.8782 19.6688 16.9162 20.7361C14.7609 21.9087 8.72042 22.0181 6.42612 20.5295L2.0589 21.9913C1.984 22.0203 1.99299 21.9974 2.02252 21.9222L3.62542 18.05C0.320613 13.447 1.57051 4.27678 9.33667 2.99512H14.0581',
  d12: 'M14.1405 2.2722C14.7618 2.31533 15.3659 2.41935 15.947 2.57837L13.5684 4.95705L16.7503 8.13903L16.7932 11.9142H21.2932L21.3361 8.13903L21.8847 7.59046C22.3532 8.5944 22.6471 9.69698 22.7278 10.8595C22.75 11.1796 22.75 11.5514 22.75 12.2105V12.2895C22.75 12.9486 22.75 13.3204 22.7278 13.6405C22.4082 18.2443 18.7443 21.9082 14.1405 22.2278C13.8204 22.25 13.4486 22.25 12.7895 22.25H11.2105C10.5514 22.25 10.1796 22.25 9.85949 22.2278C8.63831 22.143 7.48219 21.8226 6.43709 21.3113L1.47483 22.75L2.77921 18.0954C1.92471 16.8022 1.38603 15.2804 1.2722 13.6405C1.24999 13.3205 1.24999 12.9486 1.25 12.2895V12.2895V12.2895V12.2105V12.2105V12.2104C1.24999 11.5514 1.24999 11.1795 1.2722 10.8595C1.59176 6.25571 5.25571 2.59176 9.85949 2.2722C10.1795 2.24999 10.5514 2.24999 11.2105 2.25H11.2105H11.2105H12.7895H12.7895H12.7896C13.4486 2.24999 13.8205 2.24999 14.1405 2.2722ZM9.00897 11.5001H7V13.5001H9.00897V11.5001ZM13.0045 11.5001H10.9955V13.5001H13.0045V11.5001Z',
  d13: 'M19.043 1.25L22.7502 4.95711L21.3359 6.37132L20.043 5.07843V10.6642H18.043V5.07843L16.7502 6.37132L15.3359 4.95711L19.043 1.25Z',
};

export const IconMessageUpload02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-stroke-rounded IconMessageUpload02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageUpload02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-duotone-rounded IconMessageUpload02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconMessageUpload02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-twotone-rounded IconMessageUpload02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageUpload02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-solid-rounded IconMessageUpload02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageUpload02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-bulk-rounded IconMessageUpload02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageUpload02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-stroke-sharp IconMessageUpload02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageUpload02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-upload-02-solid-sharp IconMessageUpload02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMessageUpload02: TheIconSelfPack = {
  name: 'MessageUpload02',
  StrokeRounded: IconMessageUpload02StrokeRounded,
  DuotoneRounded: IconMessageUpload02DuotoneRounded,
  TwotoneRounded: IconMessageUpload02TwotoneRounded,
  SolidRounded: IconMessageUpload02SolidRounded,
  BulkRounded: IconMessageUpload02BulkRounded,
  StrokeSharp: IconMessageUpload02StrokeSharp,
  SolidSharp: IconMessageUpload02SolidSharp,
};