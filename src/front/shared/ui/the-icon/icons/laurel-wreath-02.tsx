import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.5201 6.22967C18.812 7.89634 17.5003 9 17.5003 9C17.5003 9 15.8968 8.437 15.6049 6.77033C15.313 5.10366 16.6247 4 16.6247 4C16.6247 4 18.2282 4.56301 18.5201 6.22967Z',
  d2: 'M20.927 13.5887C19.5821 14.7178 17.9368 14.0892 17.9368 14.0892C17.9368 14.0892 17.6365 12.3314 18.9814 11.2023C20.3262 10.0732 21.9715 10.7019 21.9715 10.7019C21.9715 10.7019 22.2718 12.4596 20.927 13.5887Z',
  d3: 'M16.7335 19.8262C15.2335 19.2506 15 17.6366 15 17.6366C15 17.6366 16.2665 16.5982 17.7665 17.1738C19.2665 17.7494 19.5 19.3634 19.5 19.3634C19.5 19.3634 18.2335 20.4018 16.7335 19.8262Z',
  d4: 'M15 17.6366C16.4051 16.4358 18.0006 14.0564 18.0006 11.7273C18.0006 10.7628 17.8457 9.84221 17.5644 9',
  d5: 'M5.47987 6.22967C5.18799 7.89634 6.49968 9 6.49968 9C6.49968 9 8.10325 8.437 8.39513 6.77033C8.68701 5.10366 7.37532 4 7.37532 4C7.37532 4 5.77175 4.56301 5.47987 6.22967Z',
  d6: 'M3.07304 13.5887C4.41792 14.7178 6.06316 14.0892 6.06316 14.0892C6.06316 14.0892 6.36352 12.3314 5.01864 11.2023C3.67375 10.0732 2.02851 10.7019 2.02851 10.7019C2.02851 10.7019 1.72816 12.4596 3.07304 13.5887Z',
  d7: 'M7.26651 19.8262C8.76651 19.2506 9 17.6366 9 17.6366C9 17.6366 7.73349 16.5982 6.23349 17.1738C4.73349 17.7494 4.5 19.3634 4.5 19.3634C4.5 19.3634 5.76651 20.4018 7.26651 19.8262Z',
  d8: 'M9 17.6366C7.59489 16.4358 5.99945 14.0564 5.99945 11.7273C5.99945 10.7628 6.15433 9.84221 6.43559 9',
  d9: 'M16.142 3.42613C16.3449 3.25535 16.623 3.20449 16.8733 3.29236C16.9328 3.31734 17.1247 3.39705 17.2201 3.44559C17.4099 3.54215 17.6644 3.69093 17.931 3.90366C18.4644 4.32939 19.0725 5.03525 19.259 6.10031C19.4453 7.16403 19.1154 8.04013 18.7624 8.62658C18.5858 8.92012 18.3987 9.14978 18.2544 9.3076C18.1818 9.38694 18.0303 9.52941 17.9833 9.57389C17.7804 9.74467 17.5023 9.79553 17.252 9.70766C17.1925 9.68268 17.0006 9.60298 16.9052 9.55443C16.7155 9.45787 16.4609 9.30909 16.1944 9.09636C15.661 8.67064 15.0528 7.96477 14.8663 6.89972C14.68 5.83599 15.0099 4.9599 15.3629 4.37344C15.5395 4.07991 15.7266 3.85024 15.8709 3.69242C15.9435 3.61308 16.095 3.47061 16.142 3.42613Z',
  d10: 'M22.7109 10.5761C22.7182 10.6423 22.7425 10.8539 22.7468 10.9648C22.7555 11.1854 22.7501 11.4912 22.6941 11.8405C22.5823 12.5381 22.2607 13.4483 21.4092 14.1631C20.5563 14.8792 19.6098 15.0315 18.9068 15.0121C18.5556 15.0023 18.2564 14.95 18.0429 14.8997C17.9356 14.8745 17.7324 14.8097 17.6691 14.7897C17.4215 14.6951 17.2421 14.4762 17.1974 14.2148C17.1901 14.1487 17.1658 13.9371 17.1615 13.8262C17.1529 13.6056 17.1583 13.2997 17.2142 12.9505C17.326 12.2529 17.6477 11.3427 18.4991 10.6279C19.3521 9.91177 20.2985 9.75948 21.0015 9.77893C21.3527 9.78864 21.6519 9.84094 21.8654 9.89124C21.9727 9.91653 22.1759 9.98132 22.2392 10.0012C22.4868 10.0959 22.6662 10.3148 22.7109 10.5761Z',
  d11: 'M14.3382 18.1019C14.3101 18.0026 14.2704 17.8059 14.2578 17.7447C14.2202 17.4847 14.3213 17.2233 14.5245 17.0567C14.5751 17.02 14.7376 16.9011 14.8255 16.8464C15.0002 16.7378 15.2505 16.6014 15.5591 16.4866C16.1757 16.2571 17.064 16.101 18.0352 16.4737C19.0071 16.8466 19.5602 17.5564 19.862 18.14C20.0129 18.4319 20.1059 18.7006 20.1618 18.8982C20.1899 18.9976 20.2297 19.1949 20.2423 19.2561C20.2799 19.5161 20.1787 19.7769 19.9755 19.9434C19.925 19.9802 19.7625 20.0991 19.6746 20.1537C19.4998 20.2623 19.2495 20.3987 18.9409 20.5136C18.3244 20.7431 17.436 20.8992 16.4648 20.5265C15.4929 20.1536 14.9399 19.4437 14.6381 18.8602C14.4871 18.5683 14.3941 18.2995 14.3382 18.1019Z',
  d12: 'M17.3269 8.28882C17.7197 8.15762 18.1446 8.36975 18.2758 8.76264C18.5828 9.68195 18.7506 10.6828 18.7506 11.7275C18.7506 13.0569 18.2981 14.3599 17.6831 15.469C17.0671 16.5799 16.2609 17.5458 15.4873 18.207C15.1724 18.4761 14.699 18.439 14.4299 18.1241C14.1608 17.8092 14.1979 17.3358 14.5127 17.0667C15.1443 16.5269 15.8383 15.7028 16.3713 14.7416C16.9054 13.7784 17.2506 12.7271 17.2506 11.7275C17.2506 10.8432 17.1086 10.0029 16.853 9.23777C16.7218 8.84489 16.934 8.42003 17.3269 8.28882Z',
  d13: 'M7.85803 3.42613C7.65507 3.25535 7.37699 3.20449 7.12671 3.29236L7.12543 3.29281C7.06593 3.31779 6.8753 3.39705 6.77989 3.44559C6.59014 3.54215 6.33558 3.69093 6.06904 3.90366C5.53564 4.32939 4.92748 5.03525 4.74096 6.10031C4.55467 7.16403 4.88462 8.04013 5.23757 8.62658C5.41422 8.92012 5.60132 9.14978 5.74561 9.3076C5.81815 9.38694 5.96969 9.52941 6.01666 9.57389C6.21962 9.74467 6.4977 9.79553 6.74798 9.70766C6.80748 9.68268 6.99939 9.60298 7.09479 9.55443C7.28455 9.45787 7.53911 9.30909 7.80565 9.09636C8.33905 8.67064 8.94721 7.96477 9.13373 6.89972C9.32002 5.83599 8.99007 4.9599 8.63712 4.37344C8.46047 4.07991 8.27337 3.85024 8.12907 3.69242C8.05654 3.61308 7.90601 3.47147 7.85905 3.42699L7.85803 3.42613Z',
  d14: 'M1.28912 10.5761C1.28177 10.6423 1.25751 10.8539 1.25317 10.9648C1.24453 11.1854 1.24993 11.4912 1.30589 11.8405C1.41766 12.5381 1.73934 13.4483 2.5908 14.1631C3.44375 14.8792 4.39015 15.0315 5.09317 15.0121C5.44435 15.0023 5.74361 14.95 5.95709 14.8997C6.06441 14.8745 6.26759 14.8097 6.33087 14.7897C6.57851 14.6951 6.7579 14.4762 6.80256 14.2148C6.80991 14.1487 6.83416 13.9371 6.83851 13.8262C6.84714 13.6056 6.84175 13.2997 6.78579 12.9505C6.67402 12.2529 6.35234 11.3427 5.50088 10.6279C4.64793 9.91177 3.70152 9.75948 2.9985 9.77893C2.64732 9.78864 2.34806 9.84094 2.13458 9.89124C2.02727 9.91653 1.82409 9.98132 1.76081 10.0012C1.51317 10.0959 1.33377 10.3148 1.28912 10.5761Z',
  d15: 'M9.66177 18.1019C9.68987 18.0026 9.72958 17.8059 9.74217 17.7447C9.77978 17.4847 9.67868 17.2233 9.47551 17.0567C9.42494 17.02 9.26244 16.9011 9.17454 16.8464C8.99976 16.7378 8.74949 16.6014 8.44087 16.4866C7.82435 16.2571 6.93601 16.101 5.96479 16.4737C4.99292 16.8466 4.43983 17.5564 4.13804 18.14C3.9871 18.4319 3.89408 18.7006 3.8382 18.8982C3.8101 18.9976 3.77049 19.1936 3.75791 19.2548L3.75771 19.2561C3.7201 19.5161 3.82129 19.7769 4.02447 19.9434C4.07503 19.9802 4.23754 20.0991 4.32544 20.1537C4.50022 20.2623 4.75048 20.3987 5.05911 20.5136C5.67563 20.7431 6.56397 20.8992 7.53519 20.5265C8.50706 20.1536 9.06015 19.4437 9.36193 18.8602C9.51287 18.5683 9.6059 18.2995 9.66177 18.1019Z',
  d16: 'M6.67314 8.28882C6.28025 8.15762 5.8554 8.36975 5.72419 8.76264C5.41718 9.68195 5.24943 10.6828 5.24943 11.7275C5.24943 13.0569 5.70195 14.3599 6.31688 15.469C6.93291 16.5799 7.73914 17.5458 8.51272 18.207C8.8276 18.4761 9.30103 18.439 9.57014 18.1241C9.83925 17.8092 9.80214 17.3358 9.48725 17.0667C8.85572 16.5269 8.16168 15.7028 7.62871 14.7416C7.09464 13.7784 6.74943 12.7271 6.74943 11.7275C6.74943 10.8432 6.89144 10.0029 7.14695 9.23777C7.27816 8.84489 7.06602 8.42003 6.67314 8.28882Z',
  d17: 'M17.931 4.00308C18.4644 4.42881 19.0725 5.13467 19.259 6.19973C19.4453 7.26345 19.1154 8.13955 18.7624 8.72601C18.5858 9.01954 18.3987 9.2492 18.2544 9.40702C18.1818 9.48636 18.119 9.54878 18.072 9.59326C17.9942 9.67011 17.7622 9.86235 17.6559 9.94887C17.5779 9.92043 17.3657 9.84355 17.1407 9.7635C17.0811 9.73852 17.0006 9.7024 16.9052 9.65385C16.7155 9.55729 16.4609 9.40851 16.1944 9.19578C15.661 8.77006 15.0528 8.0642 14.8663 6.99914C14.68 5.93542 15.0099 5.05932 15.3629 4.47286C15.5395 4.17933 15.7266 3.94966 15.8709 3.79184C15.9435 3.71251 16.0063 3.65009 16.0533 3.60561C16.1344 3.52536 16.3645 3.3351 16.4695 3.25C16.6042 3.2954 16.8958 3.39604 16.9847 3.43536C17.0442 3.46035 17.1247 3.49647 17.2201 3.54502C17.4099 3.64158 17.6644 3.79035 17.931 4.00308Z',
  d18: 'M22.7272 10.7963C22.7345 10.8625 22.7425 10.9535 22.7468 11.0644C22.7555 11.285 22.7501 11.5908 22.6941 11.9401C22.5823 12.6377 22.2607 13.5479 21.4092 14.2627C20.5563 14.9788 19.6098 15.1311 18.9068 15.1117C18.5556 15.102 18.2564 15.0497 18.0429 14.9994C17.9356 14.9741 17.8483 14.9489 17.785 14.929C17.6813 14.8987 17.3982 14.7882 17.2696 14.7367C17.2449 14.6115 17.1927 14.3276 17.1811 14.1939C17.1738 14.1277 17.1658 14.0367 17.1615 13.9258C17.1529 13.7052 17.1583 13.3994 17.2142 13.0501C17.326 12.3525 17.6477 11.4423 18.4991 10.7275C19.3521 10.0114 20.2985 9.85909 21.0015 9.87854C21.3527 9.88825 21.6519 9.94055 21.8654 9.99085C21.9727 10.0161 22.06 10.0413 22.1233 10.0612C22.3724 10.1273 22.5707 10.217 22.6387 10.2535C22.664 10.3882 22.7171 10.6853 22.7272 10.7963Z',
  d19: 'M14.3384 18.1019C14.3103 18.0026 14.2911 17.9195 14.2785 17.8584C14.2563 17.7604 14.2151 17.462 14.1973 17.3251C14.3057 17.2341 14.5414 17.039 14.6169 16.9863C14.6674 16.9496 14.7377 16.9011 14.8256 16.8464C15.0004 16.7378 15.2506 16.6014 15.5593 16.4866C16.1758 16.2571 17.0641 16.101 18.0353 16.4737C19.0072 16.8466 19.5603 17.5564 19.8621 18.14C20.013 18.4319 20.1061 18.7006 20.1619 18.8982C20.19 18.9976 20.2092 19.0807 20.2218 19.1418C20.2433 19.2368 20.2849 19.5369 20.303 19.675C20.2035 19.7601 19.9802 19.947 19.8834 20.0139C19.8329 20.0506 19.7626 20.0991 19.6747 20.1537C19.4999 20.2623 19.2497 20.3987 18.941 20.5136C18.3245 20.7431 17.4362 20.8992 16.4649 20.5265C15.4931 20.1536 14.94 19.4437 14.6382 18.8602C14.4873 18.5683 14.3942 18.2995 14.3384 18.1019Z',
  d20: 'M18.0392 8.15039L18.2767 8.86177C18.5837 9.78109 18.7515 10.7819 18.7515 11.8266C18.7515 13.1561 18.299 14.4591 17.684 15.5681C17.068 16.6791 16.2618 17.645 15.4882 18.3061L14.5137 17.1658C15.1452 16.6261 15.8392 15.8019 16.3722 14.8407C16.9063 13.8775 17.2515 12.8263 17.2515 11.8266C17.2515 10.9424 17.1095 10.102 16.854 9.3369L16.6164 8.62552L18.0392 8.15039Z',
  d21: 'M6.06904 4.00308C5.53564 4.42881 4.92748 5.13467 4.74096 6.19973C4.55467 7.26345 4.88462 8.13955 5.23757 8.72601C5.41422 9.01954 5.60132 9.2492 5.74561 9.40702C5.81815 9.48636 5.881 9.54878 5.92797 9.59326C5.98862 9.65263 6.23069 9.85507 6.34415 9.94887L6.85935 9.7635C6.91886 9.73852 6.99939 9.7024 7.09479 9.65385C7.28455 9.55729 7.53911 9.40851 7.80565 9.19578C8.33905 8.77006 8.94721 8.0642 9.13373 6.99914C9.32002 5.93542 8.99007 5.05932 8.63712 4.47286C8.46047 4.17933 8.27337 3.94966 8.12907 3.79184C8.03723 3.66742 7.78895 3.38485 7.53054 3.25C7.46615 3.25 7.16024 3.37358 7.01534 3.43536C6.95583 3.46035 6.8753 3.49647 6.77989 3.54502C6.59014 3.64158 6.33558 3.79035 6.06904 4.00308Z',
  d22: 'M1.25317 11.0644C1.24453 11.285 1.24993 11.5908 1.30589 11.9401C1.41766 12.6377 1.73934 13.5479 2.5908 14.2627C3.44375 14.9788 4.39015 15.1311 5.09317 15.1117C5.44435 15.102 5.74361 15.0497 5.95709 14.9994C6.06441 14.9741 6.15171 14.9489 6.21499 14.929L6.73041 14.7367L6.81885 14.1939C6.82621 14.1277 6.83416 14.0367 6.83851 13.9258C6.84714 13.7052 6.84175 13.3994 6.78579 13.0501C6.67402 12.3525 6.35234 11.4423 5.50088 10.7275C4.64793 10.0114 3.70152 9.85909 2.9985 9.87854C2.64732 9.88825 2.34806 9.94055 2.13458 9.99085C1.9446 10.0298 1.53988 10.1822 1.36127 10.2535C1.326 10.436 1.25501 10.8536 1.25317 11.0644Z',
  d23: 'M9.3618 18.8602C9.51273 18.5683 9.60576 18.2995 9.66163 18.1019C9.71306 17.9373 9.77713 17.5155 9.80273 17.3251C9.6898 17.2201 9.40602 16.9775 9.1744 16.8464C8.99962 16.7378 8.74935 16.6014 8.44073 16.4866C7.82421 16.2571 6.93587 16.101 5.96465 16.4737C4.99278 16.8466 4.43969 17.5564 4.13791 18.14C3.98697 18.4319 3.89394 18.7006 3.83807 18.8982C3.79014 19.0525 3.72403 19.4804 3.69697 19.675C3.83519 19.7933 4.15437 20.0547 4.3253 20.1537C4.50008 20.2623 4.75035 20.3987 5.05897 20.5136C5.67549 20.7431 6.56383 20.8992 7.53505 20.5265C8.50692 20.1536 9.06001 19.4437 9.3618 18.8602Z',
  d24: 'M5.96083 8.15039L5.72327 8.86177C5.41626 9.78109 5.24851 10.7819 5.24851 11.8266C5.24851 13.1561 5.70102 14.4591 6.31595 15.5681C6.93198 16.6791 7.73822 17.645 8.51179 18.3061L9.48633 17.1658C8.85479 16.6261 8.16075 15.8019 7.62778 14.8407C7.09372 13.8775 6.74851 12.8263 6.74851 11.8266C6.74851 10.9424 6.89052 10.102 7.14603 9.3369L7.38359 8.62552L5.96083 8.15039Z',
};

export const IconLaurelWreath02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-stroke-rounded IconLaurelWreath02StrokeRounded"
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
      <path 
        d={d.d7} 
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
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-duotone-rounded IconLaurelWreath02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d7} 
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
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-twotone-rounded IconLaurelWreath02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-solid-rounded IconLaurelWreath02SolidRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-bulk-rounded IconLaurelWreath02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-stroke-sharp IconLaurelWreath02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-02-solid-sharp IconLaurelWreath02SolidSharp"
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
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLaurelWreath02: TheIconSelfPack = {
  name: 'LaurelWreath02',
  StrokeRounded: IconLaurelWreath02StrokeRounded,
  DuotoneRounded: IconLaurelWreath02DuotoneRounded,
  TwotoneRounded: IconLaurelWreath02TwotoneRounded,
  SolidRounded: IconLaurelWreath02SolidRounded,
  BulkRounded: IconLaurelWreath02BulkRounded,
  StrokeSharp: IconLaurelWreath02StrokeSharp,
  SolidSharp: IconLaurelWreath02SolidSharp,
};