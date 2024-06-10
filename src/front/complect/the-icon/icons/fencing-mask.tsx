import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9996 20C15.5002 20 20 14.2944 20 9.84106C20 4.64401 16.5709 1.98287 11.9996 2C7.42842 2.01713 4 4.64399 4 9.84104C4 14.2944 8.49907 20 11.9996 20Z',
  d2: 'M12 2L12 20',
  d3: 'M4.5 8C8 10 16 10 19.5 8',
  d4: 'M4.5 13C8 15 16 15 19.5 13',
  d5: 'M6 16C6 18.4 5 20.8 3 22',
  d6: 'M18 16C18 18.4 19 20.8 21 22',
  d7: 'M19.1198 13.5951C17.637 16.9655 14.5526 20.0001 11.9996 20.0001C9.44669 20.0001 6.36266 16.9654 4.88003 13.595C8.57759 14.8027 15.4222 14.8027 19.1198 13.5951Z',
  d8: 'M19.8912 8.30166C16.1791 9.90045 7.82117 9.90047 4.10889 8.30171C4.72618 4.12545 7.90428 2.01543 11.9996 2.00008C16.0953 1.98473 19.2742 4.11939 19.8912 8.30166Z',
  d9: 'M19.5 8.00068C16 10.0007 8 10.0007 4.5 8.00068L4.2017 7.77928C4.06943 8.41463 4 9.10216 4 9.84173C4 10.8875 4.24808 12.0023 4.67307 13.096C8.19836 14.9689 15.8014 14.9689 19.3268 13.0961C19.7519 12.0023 20 10.8875 20 9.84174C20 9.09757 19.9297 8.40539 19.7958 7.76562L19.5 8.00068Z',
  d10: 'M11.9996 20.0001C15.5002 20.0001 20 14.2945 20 9.84114C20 4.64409 16.5709 1.98295 11.9996 2.00008C7.42842 2.01721 4 4.64407 4 9.84112C4 14.2945 8.49907 20.0001 11.9996 20.0001Z',
  d11: 'M12 2V20M4.5 8C8 10 16 10 19.5 8M4.5 13C8 15 16 15 19.5 13',
  d12: 'M11.2492 1.76315C11.2492 1.45995 11.2492 1.30835 11.1482 1.21882C11.0471 1.12929 10.902 1.14686 10.6117 1.18202C8.74196 1.40849 7.06649 2.09333 5.77902 3.27263C4.95842 4.02428 4.31696 4.95721 3.8854 6.05881C3.80464 6.26495 3.76426 6.36802 3.79967 6.47196C3.83509 6.5759 3.93472 6.63571 4.13398 6.75533L4.87806 7.20203C6.20325 7.95676 8.32144 8.4268 10.6306 8.56013C10.9176 8.5767 11.061 8.58498 11.1551 8.49619C11.2492 8.40739 11.2492 8.26111 11.2492 7.96855V1.76315ZM4.11313 8.49236C3.78511 8.29544 3.6211 8.19698 3.47867 8.26014C3.46725 8.2652 3.4548 8.27172 3.44414 8.27822C3.3111 8.35931 3.29908 8.54286 3.27505 8.90995C3.25842 9.16397 3.25 9.42357 3.25 9.68867C3.25 10.1945 3.30206 10.7109 3.39901 11.2302C3.4244 11.3662 3.4371 11.4342 3.48016 11.4908C3.52321 11.5475 3.58795 11.5791 3.71742 11.6425L5.00187 12.271C5.00934 12.2747 5.01676 12.2784 5.0241 12.2823C6.35904 12.9915 8.4086 13.4318 10.6306 13.5601C10.9176 13.5767 11.061 13.585 11.1551 13.4962C11.2492 13.4074 11.2492 13.2611 11.2492 12.9685L11.2492 10.6709C11.2492 10.397 11.2492 10.26 11.1668 10.1732C11.0845 10.0864 10.9454 10.0791 10.6671 10.0644C8.18201 9.9333 5.75394 9.43016 4.12706 8.50052L4.11313 8.49236ZM4.33167 13.613C4.24612 13.5711 4.1551 13.6572 4.19346 13.7443C4.69029 14.8735 5.35137 15.9546 6.09798 16.9023C6.91839 17.9437 7.86589 18.8552 8.85919 19.5121C9.40175 19.8709 9.97297 20.1634 10.5557 20.354C10.8528 20.4512 11.0014 20.4998 11.1253 20.4099C11.2492 20.3201 11.2492 20.1513 11.2492 19.8137V15.6709C11.2492 15.397 11.2492 15.26 11.1668 15.1732C11.0845 15.0864 10.9454 15.0791 10.6671 15.0644C8.28027 14.9385 5.95073 14.4696 4.33167 13.613ZM12.7492 19.814C12.7492 20.1515 12.7492 20.3203 12.8731 20.4102C12.9969 20.5 13.1455 20.4514 13.4426 20.3543C14.0257 20.1638 14.5973 19.8712 15.1402 19.5121C16.1335 18.8553 17.0811 17.9437 17.9016 16.9023C18.6513 15.9509 19.3148 14.8649 19.8124 13.7307C19.8495 13.6461 19.7594 13.5638 19.6778 13.6071C18.0584 14.4673 15.7234 14.9382 13.3313 15.0644C13.053 15.0791 12.9139 15.0864 12.8315 15.1732C12.7492 15.26 12.7492 15.397 12.7492 15.6709V19.814ZM20.3106 11.5735C20.4341 11.508 20.4958 11.4753 20.5365 11.4195C20.5772 11.3637 20.5891 11.2977 20.6128 11.1658C20.7022 10.6682 20.75 10.1735 20.75 9.68869C20.75 9.40583 20.7404 9.12914 20.7215 8.85875C20.6981 8.52405 20.6864 8.3567 20.5743 8.27446C20.5474 8.25477 20.5138 8.23811 20.4819 8.22866C20.3486 8.18922 20.2025 8.28499 19.9104 8.47653C19.8976 8.48492 19.8846 8.49292 19.8713 8.50052C18.2444 9.43016 15.8163 9.93329 13.3313 10.0644C13.053 10.0791 12.9139 10.0864 12.8315 10.1732C12.7492 10.26 12.7492 10.397 12.7492 10.6709L12.7492 12.9685C12.7492 13.2611 12.7492 13.4074 12.8433 13.4962C12.9373 13.585 13.0808 13.5767 13.3678 13.5601C15.5897 13.4318 17.6392 12.9916 18.9741 12.2824L20.3106 11.5735ZM19.8729 6.70745C20.0609 6.58412 20.155 6.52246 20.1872 6.42069C20.2194 6.31892 20.18 6.2193 20.1011 6.02008C19.6698 4.93099 19.0333 4.00655 18.2215 3.26058C16.9332 2.07687 15.256 1.39062 13.3832 1.17338C13.0945 1.13988 12.9501 1.12313 12.8497 1.21262C12.7492 1.3021 12.7492 1.45292 12.7492 1.75457V7.96855C12.7492 8.26111 12.7492 8.40739 12.8433 8.49618C12.9373 8.58498 13.0808 8.5767 13.3678 8.56013C15.6696 8.42721 17.7817 7.9597 19.1077 7.20914L19.8729 6.70745Z',
  d13: 'M7.00015 15.8516C7.00015 15.2993 6.55244 14.8516 6.00015 14.8516C5.44787 14.8516 5.00015 15.2993 5.00015 15.8516C5.00015 18.0154 4.09735 20.0271 2.48566 20.9941C2.01208 21.2782 1.85851 21.8925 2.14266 22.3661C2.42681 22.8396 3.04107 22.9932 3.51465 22.7091C5.90295 21.2761 7.00015 18.4877 7.00015 15.8516ZM16.9998 15.8516C16.9998 15.2993 17.4476 14.8516 17.9998 14.8516C18.5521 14.8516 18.9998 15.2993 18.9998 15.8516C18.9998 18.0154 19.9026 20.0271 21.5143 20.9941C21.9879 21.2782 22.1415 21.8925 21.8573 22.3661C21.5732 22.8396 20.9589 22.9932 20.4854 22.7091C18.0971 21.2761 16.9998 18.4877 16.9998 15.8516Z',
  d14: 'M5.0841 15.446C5.03011 15.569 5.00015 15.7048 5.00015 15.8477C5.00015 18.0116 4.09735 20.0232 2.48566 20.9902C2.01208 21.2744 1.85851 21.8886 2.14266 22.3622C2.42681 22.8358 3.04107 22.9894 3.51465 22.7052C5.3331 21.6141 6.40307 19.7373 6.81013 17.7402C6.56408 17.4733 6.32612 17.1938 6.09798 16.9042C5.73707 16.4461 5.39615 15.9568 5.0841 15.446ZM17.1898 17.7398C17.4357 17.4731 17.6736 17.1937 17.9016 16.9043C18.2626 16.4461 18.6037 15.9567 18.9158 15.4458C18.9698 15.5688 18.9998 15.7048 18.9998 15.8477C18.9998 18.0116 19.9026 20.0232 21.5143 20.9902C21.9879 21.2744 22.1415 21.8886 21.8573 22.3622C21.5732 22.8358 20.9589 22.9894 20.4854 22.7052C18.6668 21.6141 17.5968 19.7371 17.1898 17.7398Z',
  d15: 'M11.2503 1.7649C11.2503 1.46172 11.2503 1.31013 11.1493 1.2206C11.0483 1.13107 10.9031 1.14864 10.6129 1.18376C8.74269 1.41011 7.06685 2.09498 5.77914 3.2745C4.95888 4.02584 4.31761 4.95831 3.88605 6.05932C3.80524 6.26548 3.76484 6.36855 3.80025 6.47251C3.83566 6.57647 3.93531 6.63629 4.1346 6.75593L4.87916 7.20291C6.20435 7.95764 8.32254 8.42769 10.6317 8.56102C10.9187 8.57759 11.0621 8.58587 11.1562 8.49708C11.2503 8.40828 11.2503 8.262 11.2503 7.96944V1.7649Z',
  d16: 'M4.11423 8.49325C3.78539 8.29583 3.62096 8.19712 3.47827 8.26079C3.46728 8.2657 3.45528 8.27198 3.44498 8.27822C3.31137 8.35923 3.29932 8.54324 3.2752 8.91126C3.25855 9.16545 3.25012 9.42524 3.25012 9.69054C3.25012 10.1958 3.30207 10.7116 3.39881 11.2304C3.42419 11.3664 3.43688 11.4344 3.47994 11.4911C3.52299 11.5477 3.58774 11.5794 3.71725 11.6428L5.00297 12.2719C5.01044 12.2755 5.01785 12.2793 5.0252 12.2832C6.36014 12.9924 8.4097 13.4327 10.6317 13.561C10.9187 13.5776 11.0621 13.5859 11.1562 13.4971C11.2503 13.4083 11.2503 13.262 11.2503 12.9694L11.2503 10.6718C11.2503 10.3979 11.2503 10.2609 11.1679 10.1741C11.0856 10.0873 10.9465 10.08 10.6682 10.0653C8.18311 9.93418 5.75504 9.43105 4.12816 8.5014L4.11423 8.49325Z',
  d17: 'M4.33277 13.6139C4.2466 13.5717 4.15492 13.6584 4.19356 13.7462C4.6904 14.8754 5.35148 15.9565 6.0981 16.9042C6.91852 17.9455 7.86601 18.8571 8.85931 19.514C9.40221 19.873 9.9738 20.1656 10.5569 20.3562C10.854 20.4533 11.0025 20.5019 11.1264 20.412C11.2503 20.3222 11.2503 20.1534 11.2503 19.8159V15.6718C11.2503 15.3979 11.2503 15.2609 11.1679 15.1741C11.0856 15.0873 10.9465 15.08 10.6682 15.0653C8.28137 14.9394 5.95183 14.4705 4.33277 13.6139Z',
  d18: 'M12.7503 19.8155C12.7503 20.1531 12.7503 20.3219 12.8742 20.4118C12.9981 20.5016 13.1467 20.453 13.4438 20.3558C14.0265 20.1653 14.5977 19.8728 15.1403 19.514C16.1337 18.8571 17.0812 17.9456 17.9018 16.9042C18.6518 15.9524 19.3155 14.8659 19.8131 13.7312C19.8501 13.6469 19.7603 13.5648 19.6789 13.608C18.0595 14.4682 15.7245 14.9391 13.3324 15.0653C13.0541 15.08 12.915 15.0873 12.8326 15.1741C12.7503 15.2609 12.7503 15.3979 12.7503 15.6718V19.8155Z',
  d19: 'M20.3109 11.5749C20.4343 11.5094 20.496 11.4767 20.5367 11.4208C20.5774 11.365 20.5893 11.2991 20.613 11.1671C20.7023 10.6697 20.7501 10.1752 20.7501 9.69055C20.7501 9.40716 20.7405 9.12996 20.7215 8.85908C20.6981 8.52551 20.6864 8.35873 20.5749 8.27649C20.5477 8.25643 20.5136 8.23951 20.4812 8.23001C20.3482 8.19107 20.2026 8.28652 19.9115 8.47742C19.8987 8.48581 19.8857 8.49381 19.8724 8.5014C18.2455 9.43104 15.8174 9.93418 13.3324 10.0653C13.0541 10.08 12.915 10.0873 12.8326 10.1741C12.7503 10.2609 12.7503 10.3979 12.7503 10.6718L12.7503 12.9694C12.7503 13.262 12.7503 13.4083 12.8444 13.4971C12.9384 13.5859 13.0819 13.5776 13.3689 13.561C15.5908 13.4327 17.6403 12.9924 18.9752 12.2833L20.3109 11.5749Z',
  d20: 'M19.8729 6.70905C20.061 6.58572 20.155 6.52405 20.1872 6.42228C20.2195 6.3205 20.18 6.22089 20.1011 6.02166C19.6698 4.9327 19.0334 4.00835 18.2216 3.26245C16.9336 2.07895 15.2567 1.39273 13.3844 1.17536C13.0956 1.14184 12.9512 1.12507 12.8508 1.21456C12.7503 1.30404 12.7503 1.45488 12.7503 1.75654V7.96944C12.7503 8.262 12.7503 8.40828 12.8444 8.49707C12.9384 8.58587 13.0819 8.57759 13.3689 8.56102C15.6707 8.4281 17.7828 7.96059 19.1088 7.21003L19.8729 6.70905Z',
  d21: 'M6 15.5C6 17.9 5 20.8 3 22',
  d22: 'M18 15.5C18 17.9 19 20.8 21 22',
  d23: 'M4.84138 18.701C5.28549 17.6557 5.51045 16.4645 5.51045 15.3926H7.50724C7.50724 16.7206 7.23301 18.1795 6.67873 19.4841C6.1273 20.7821 5.26307 22.0074 4.02734 22.7501L3 21.0351C3.76105 20.5777 4.39441 19.7531 4.84138 18.701ZM17.3213 19.4841C16.767 18.1795 16.4928 16.7206 16.4928 15.3926H18.4895C18.4895 16.4645 18.7145 17.6557 19.1586 18.701C19.6056 19.7531 20.239 20.5777 21 21.0351L19.9727 22.7501C18.7369 22.0074 17.8727 20.7821 17.3213 19.4841Z',
  d24: 'M15.1402 19.644C14.3836 20.1443 13.5714 20.5156 12.75 20.6615V15.2226C15.1643 15.1776 17.5746 14.9142 19.5557 14.414C19.0958 15.3478 18.5289 16.2381 17.9016 17.0342C17.0811 18.0755 16.1335 18.9871 15.1402 19.644Z',
  d25: 'M20.2754 12.6423C18.3431 13.296 15.6059 13.667 12.75 13.7223L12.75 10.2226C15.664 10.1683 18.5721 9.79576 20.7269 9.07277C20.7423 9.31697 20.75 9.56625 20.75 9.82052C20.75 10.7415 20.5774 11.6977 20.2754 12.6423Z',
  d26: 'M20.5223 7.55567C18.5803 8.26325 15.7298 8.66461 12.75 8.72232V1.25C14.8773 1.37564 16.7897 2.07675 18.2215 3.39241C19.3622 4.44058 20.1567 5.84112 20.5223 7.55567Z',
  d27: 'M11.25 8.72229V1.25476C9.12391 1.39247 7.21135 2.09246 5.77902 3.40446C4.63847 4.44918 3.84398 5.8441 3.47814 7.55537C5.41988 8.26304 8.27026 8.66449 11.25 8.72229Z',
  d28: 'M3.27309 9.07237C3.25775 9.31662 3.25 9.56603 3.25 9.8205C3.25 10.7413 3.42255 11.6974 3.72436 12.6418C5.65653 13.2957 8.39384 13.6669 11.25 13.7223L11.25 10.2226C8.33585 10.1681 5.42773 9.79552 3.27309 9.07237Z',
  d29: 'M11.25 15.2226C8.83545 15.1775 6.42505 14.9139 4.44394 14.4136C4.90379 15.3475 5.47069 16.2379 6.09798 17.0341C6.91839 18.0755 7.86589 18.9871 8.85919 19.6439C9.61592 20.1444 10.4284 20.5158 11.25 20.6617V15.2226Z',
};

export const IconFencingMaskStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-stroke-rounded IconFencingMaskStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconFencingMaskDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-duotone-rounded IconFencingMaskDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconFencingMaskTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-twotone-rounded IconFencingMaskTwotoneRounded"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFencingMaskSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-solid-rounded IconFencingMaskSolidRounded"
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

export const IconFencingMaskBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-bulk-rounded IconFencingMaskBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
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
      </g>
    </TheIconWrapper>
  );
};

export const IconFencingMaskStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-stroke-sharp IconFencingMaskStrokeSharp"
    >
      <path 
        d={d.d1} 
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFencingMaskSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fencing-mask-solid-sharp IconFencingMaskSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFencingMask: TheIconSelfPack = {
  name: 'FencingMask',
  StrokeRounded: IconFencingMaskStrokeRounded,
  DuotoneRounded: IconFencingMaskDuotoneRounded,
  TwotoneRounded: IconFencingMaskTwotoneRounded,
  SolidRounded: IconFencingMaskSolidRounded,
  BulkRounded: IconFencingMaskBulkRounded,
  StrokeSharp: IconFencingMaskStrokeSharp,
  SolidSharp: IconFencingMaskSolidSharp,
};