import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.43614 8C6.15488 8.84221 6 9.76282 6 10.7273C6 14.7439 8.68629 18 12 18C15.3137 18 18 14.7439 18 10.7273C18 9.76282 17.8451 8.84221 17.5639 8',
  d2: 'M14.5 21C14.5 21 13.818 18 12 18C10.182 18 9.5 21 9.5 21',
  d3: 'M18.5201 5.22967C18.812 6.89634 17.5003 8 17.5003 8C17.5003 8 15.8968 7.437 15.6049 5.77033C15.313 4.10366 16.6247 3 16.6247 3C16.6247 3 18.2282 3.56301 18.5201 5.22967Z',
  d4: 'M21.0942 12.1393C19.8128 13.4061 18.0778 12.9003 18.0778 12.9003C18.0778 12.9003 17.6241 11.1276 18.9055 9.86074C20.1868 8.59388 21.9219 9.09972 21.9219 9.09972C21.9219 9.09972 22.3756 10.8724 21.0942 12.1393Z',
  d5: 'M18.2335 18.1896C16.7335 17.614 16.5 16 16.5 16C16.5 16 17.7665 14.9616 19.2665 15.5372C20.7665 16.1128 21 17.7268 21 17.7268C21 17.7268 19.7335 18.7652 18.2335 18.1896Z',
  d6: 'M5.76651 18.1895C7.26651 17.6139 7.5 15.9999 7.5 15.9999C7.5 15.9999 6.23349 14.9615 4.73349 15.5371C3.23349 16.1127 3 17.7267 3 17.7267C3 17.7267 4.26651 18.7651 5.76651 18.1895Z',
  d7: 'M2.90565 12.1393C4.187 13.4061 5.92203 12.9003 5.92203 12.9003C5.92203 12.9003 6.37571 11.1276 5.09435 9.86074C3.813 8.59388 2.07797 9.09972 2.07797 9.09972C2.07797 9.09972 1.62429 10.8724 2.90565 12.1393Z',
  d8: 'M5.47987 5.22967C5.18799 6.89634 6.49968 8 6.49968 8C6.49968 8 8.10325 7.437 8.39513 5.77033C8.68701 4.10366 7.37532 3 7.37532 3C7.37532 3 5.77175 3.56301 5.47987 5.22967Z',
  d9: 'M6.6737 7.28882C7.06659 7.42003 7.27872 7.84489 7.14752 8.23777C6.89201 9.00288 6.75 9.84323 6.75 10.7275C6.75 14.4713 9.22904 17.2502 12 17.2502C14.771 17.2502 17.25 14.4713 17.25 10.7275C17.25 9.84323 17.108 9.00288 16.8525 8.23777C16.7213 7.84489 16.9334 7.42003 17.3263 7.28882C17.7192 7.15762 18.144 7.36975 18.2752 7.76264C18.5822 8.68195 18.75 9.68281 18.75 10.7275C18.75 15.0169 15.8565 18.7502 12 18.7502C8.14354 18.7502 5.25 15.0169 5.25 10.7275C5.25 9.68281 5.41775 8.68195 5.72476 7.76264C5.85596 7.36975 6.28082 7.15762 6.6737 7.28882Z',
  d10: 'M9.40581 19.1486C9.821 18.3657 10.6359 17.25 12.0002 17.25C13.3644 17.25 14.1793 18.3657 14.5945 19.1486C14.8194 19.5727 14.9769 19.9901 15.0778 20.2973C15.1269 20.4471 15.201 20.7209 15.2286 20.8229L15.2313 20.8328C15.3231 21.2367 15.0703 21.6395 14.6664 21.7313C14.2629 21.8231 13.8614 21.5706 13.7691 21.1674C13.7498 21.0963 13.6941 20.8916 13.6526 20.7652C13.5688 20.5099 13.4422 20.1773 13.2693 19.8514C12.889 19.1343 12.4539 18.75 12.0002 18.75C11.5464 18.75 11.1113 19.1343 10.731 19.8514C10.5582 20.1773 10.4315 20.5099 10.3477 20.7652C10.3062 20.8916 10.2507 21.0952 10.2315 21.1663C10.1395 21.5699 9.7377 21.8231 9.33391 21.7313C8.93 21.6395 8.677 21.2377 8.76882 20.8337L8.77178 20.8228C8.79961 20.7199 8.87355 20.4465 8.92255 20.2973C9.02342 19.9901 9.1809 19.5727 9.40581 19.1486Z',
  d11: 'M16.142 2.42613C16.3449 2.25535 16.623 2.20449 16.8733 2.29236C16.9328 2.31734 17.1247 2.39705 17.2201 2.44559C17.4099 2.54215 17.6644 2.69093 17.931 2.90366C18.4644 3.32939 19.0725 4.03525 19.259 5.10031C19.4453 6.16403 19.1154 7.04013 18.7624 7.62658C18.5858 7.92012 18.3987 8.14978 18.2544 8.3076C18.1818 8.38694 18.0303 8.52941 17.9833 8.57389C17.7804 8.74467 17.5023 8.79553 17.252 8.70766L17.2507 8.70721C17.1912 8.68223 17.0006 8.60298 16.9052 8.55443C16.7155 8.45787 16.4609 8.30909 16.1944 8.09636C15.661 7.67064 15.0528 6.96477 14.8663 5.89972C14.68 4.83599 15.0099 3.9599 15.3629 3.37344C15.5395 3.07991 15.7266 2.85024 15.8709 2.69242C15.9435 2.61308 16.095 2.47061 16.142 2.42613Z',
  d12: 'M22.6488 8.91439C22.6617 8.98105 22.7038 9.19385 22.7175 9.30638C22.7446 9.53027 22.7644 9.84221 22.7364 10.2025C22.6805 10.9222 22.4286 11.8748 21.6217 12.6726C20.8134 13.4717 19.8633 13.7052 19.1459 13.7438C18.7875 13.763 18.0896 13.6538 17.8681 13.6203C17.6135 13.5461 17.417 13.3424 17.3512 13.0856C17.3383 13.019 17.2962 12.8061 17.2825 12.6936C17.2554 12.4697 17.2356 12.1578 17.2636 11.7975C17.3195 11.0778 17.5714 10.1252 18.3783 9.3274C19.1866 8.52826 20.1367 8.29477 20.8541 8.25624C21.2125 8.23699 21.5216 8.26541 21.7431 8.29891C21.8544 8.31575 22.066 8.3647 22.1319 8.3797C22.3865 8.4539 22.583 8.65757 22.6488 8.91439Z',
  d13: 'M15.7582 16.1102L15.7578 16.108C15.7202 15.848 15.8213 15.5866 16.0245 15.42C16.0751 15.3833 16.2376 15.2643 16.3255 15.2097C16.5002 15.1011 16.7505 14.9647 17.0591 14.8498C17.6757 14.6204 18.564 14.4643 19.5352 14.8369C20.5071 15.2099 21.0602 15.9197 21.362 16.5033C21.5129 16.7952 21.6059 17.0639 21.6618 17.2615C21.6899 17.3609 21.7297 17.5582 21.7423 17.6194C21.7799 17.8794 21.6787 18.1401 21.4755 18.3067C21.425 18.3434 21.2625 18.4624 21.1746 18.517C20.9998 18.6256 20.7495 18.762 20.4409 18.8769C19.8244 19.1064 18.936 19.2624 17.9648 18.8898C16.9929 18.5168 16.4399 17.807 16.1381 17.2234C15.9871 16.9316 15.8941 16.6628 15.8382 16.4652C15.8101 16.3658 15.7707 16.1713 15.7582 16.1102Z',
  d14: 'M8.24219 16.108C8.22961 16.1691 8.1899 16.3658 8.1618 16.4652C8.10592 16.6628 8.0129 16.9316 7.86196 17.2234C7.56017 17.807 7.00708 18.5168 6.03521 18.8898C5.06399 19.2624 4.17565 19.1064 3.55913 18.8769C3.25051 18.762 3.00024 18.6256 2.82546 18.517C2.73756 18.4624 2.57506 18.3434 2.52449 18.3067C2.32132 18.1401 2.22022 17.8787 2.25783 17.6187L2.25815 17.6166C2.27073 17.5554 2.31013 17.3609 2.33823 17.2615C2.3941 17.0639 2.48713 16.7952 2.63807 16.5033C2.93985 15.9197 3.49294 15.2099 4.46481 14.8369C5.43603 14.4643 6.32437 14.6204 6.94089 14.8498C7.24952 14.9647 7.49978 15.1011 7.67456 15.2097C7.76246 15.2643 7.92447 15.3829 7.97504 15.4196C8.17821 15.5862 8.27981 15.848 8.24219 16.108Z',
  d15: 'M3.14588 8.25624C3.86327 8.29477 4.81338 8.52826 5.62166 9.3274C6.42855 10.1252 6.68051 11.0778 6.73644 11.7975C6.76445 12.1578 6.74456 12.4697 6.71746 12.6936C6.70384 12.8061 6.66157 13.0196 6.64861 13.0862C6.58288 13.3431 6.38582 13.5463 6.13131 13.6205L6.12916 13.6211C6.0632 13.6361 5.8544 13.6843 5.74306 13.7011C5.52155 13.7346 5.21249 13.763 4.85412 13.7438C4.13673 13.7052 3.18662 13.4717 2.37834 12.6726C1.57145 11.8748 1.31949 10.9222 1.26355 10.2025C1.23555 9.84221 1.25544 9.53027 1.28254 9.30638C1.29616 9.19385 1.33843 8.98042 1.35139 8.91377C1.41712 8.65694 1.61418 8.45371 1.86868 8.37951L1.87083 8.37889C1.9368 8.36389 2.1456 8.31575 2.25694 8.29891C2.47845 8.26541 2.78751 8.23699 3.14588 8.25624Z',
  d16: 'M7.12702 2.29236C7.3773 2.20449 7.65538 2.25535 7.85834 2.42613C7.90531 2.47061 8.05685 2.61308 8.12939 2.69242C8.27368 2.85024 8.46078 3.07991 8.63743 3.37344C8.99038 3.9599 9.32033 4.83599 9.13404 5.89972C8.94752 6.96477 8.33936 7.67064 7.80596 8.09636C7.53942 8.30909 7.28486 8.45787 7.0951 8.55443C6.9997 8.60298 6.8078 8.68268 6.74829 8.70766C6.49801 8.79553 6.21944 8.74425 6.01647 8.57348C5.96951 8.52899 5.81846 8.38694 5.74593 8.3076C5.60163 8.14978 5.41453 7.92012 5.23788 7.62658C4.88493 7.04013 4.55498 6.16403 4.74127 5.10031C4.92779 4.03525 5.53595 3.32939 6.06935 2.90366C6.33589 2.69093 6.59045 2.54215 6.78021 2.44559C6.87561 2.39705 7.06752 2.31734 7.12702 2.29236Z',
  d17: 'M7.38508 7.62552L7.14752 8.3369C6.89201 9.10201 6.75 9.94237 6.75 10.8266C6.75 14.5705 9.22904 17.3493 12 17.3493C14.771 17.3493 17.25 14.5705 17.25 10.8266C17.25 9.94237 17.108 9.10201 16.8525 8.3369L16.6149 7.62552L18.0377 7.15039L18.2752 7.86177C18.5822 8.78109 18.75 9.78194 18.75 10.8266C18.75 15.116 15.8565 18.8493 12 18.8493C8.14354 18.8493 5.25 15.116 5.25 10.8266C5.25 9.78194 5.41775 8.78109 5.72476 7.86177L5.96232 7.15039L7.38508 7.62552Z',
  d18: 'M9.40652 19.2482C9.82171 18.4653 10.6366 17.3496 12.0009 17.3496C13.3652 17.3496 14.18 18.4653 14.5952 19.2482C14.8201 19.6723 14.9776 20.0897 15.0785 20.3969C15.1293 20.5518 15.1668 20.6818 15.192 20.7748C15.2046 20.8214 15.2141 20.8588 15.2208 20.8857L15.2286 20.918L15.2309 20.9278L15.2317 20.9312L15.232 20.9324C15.232 20.9324 15.2322 20.9334 14.5009 21.0996L15.232 20.9324L15.3987 21.4175L13.936 21.75L13.7698 21.267L13.7691 21.264L13.7647 21.2461C13.7605 21.2291 13.7537 21.2021 13.7441 21.1666C13.7248 21.0955 13.6948 20.9912 13.6533 20.8648C13.5695 20.6095 13.4429 20.2769 13.27 19.951C12.8897 19.2339 12.4546 18.8496 12.0009 18.8496C11.5471 18.8496 11.112 19.2339 10.7317 19.951C10.5589 20.2769 10.4322 20.6095 10.3484 20.8648C10.3069 20.9912 10.2769 21.0955 10.2577 21.1666C10.2481 21.2021 10.2412 21.2291 10.237 21.2461L10.2327 21.264L10.2321 21.2662L10.0662 21.75L8.60352 21.4175L8.76953 20.9334L9.50087 21.0996C8.76953 20.9334 8.76953 20.9334 8.76953 20.9334L8.77004 20.9312L8.7708 20.9278L8.77312 20.918L8.78095 20.8857C8.7876 20.8588 8.79717 20.8214 8.80977 20.7748C8.83493 20.6818 8.87241 20.5518 8.92326 20.3969C9.02413 20.0897 9.18161 19.6723 9.40652 19.2482Z',
  d19: 'M17.931 3.00308C18.4644 3.42881 19.0725 4.13467 19.259 5.19973C19.4453 6.26345 19.1154 7.13955 18.7624 7.72601C18.5858 8.01954 18.3987 8.2492 18.2544 8.40702C18.0899 8.60127 17.7868 8.84919 17.6559 8.94887C17.4914 8.89812 17.111 8.76806 16.9052 8.65385C16.7155 8.55729 16.4609 8.40851 16.1944 8.19578C15.661 7.77006 15.0528 7.0642 14.8663 5.99914C14.68 4.93542 15.0099 4.05932 15.3629 3.47286C15.5395 3.17933 15.7266 2.94966 15.8709 2.79184C16.0141 2.62446 16.3296 2.36087 16.4695 2.25C16.642 2.30555 17.0336 2.44232 17.2201 2.54502C17.4099 2.64158 17.6644 2.79035 17.931 3.00308Z',
  d20: 'M22.7175 9.40599C22.7446 9.62988 22.7644 9.94182 22.7364 10.3021C22.6805 11.0218 22.4286 11.9744 21.6217 12.7722C20.8134 13.5713 19.8633 13.8048 19.1459 13.8434C18.7875 13.8626 18.4784 13.8342 18.2569 13.8007C17.9588 13.7688 17.5997 13.6537 17.4574 13.6002C17.4094 13.4714 17.3072 13.1296 17.2825 12.7932C17.2554 12.5693 17.2356 12.2574 17.2636 11.8971C17.3195 11.1774 17.5714 10.2248 18.3783 9.42701C19.1866 8.62787 20.1367 8.39438 20.8541 8.35585C21.2125 8.3366 21.5216 8.36502 21.7431 8.39852C22.0797 8.43266 22.4163 8.54641 22.5426 8.59902C22.5923 8.77063 22.697 9.17228 22.7175 9.40599Z',
  d21: 'M16.1382 17.323C15.9873 17.0312 15.8942 16.7624 15.8384 16.5648C15.7549 16.3108 15.7095 15.9411 15.6973 15.788C15.8344 15.6703 16.152 15.4098 16.3256 15.3093C16.5004 15.2007 16.7506 15.0643 17.0593 14.9494C17.6758 14.72 18.5641 14.5639 19.5353 14.9366C20.5072 15.3095 21.0603 16.0193 21.3621 16.6029C21.513 16.8948 21.6061 17.1635 21.6619 17.3611C21.7119 17.5215 21.7768 17.9458 21.803 18.1379C21.6524 18.263 21.3158 18.5339 21.1747 18.6166C20.9999 18.7252 20.7497 18.8616 20.441 18.9765C19.8245 19.206 18.9362 19.3621 17.9649 18.9894C16.9931 18.6164 16.44 17.9066 16.1382 17.323Z',
  d22: 'M8.16193 16.5648C8.10606 16.7624 8.01303 17.0312 7.86209 17.323C7.56031 17.9066 7.00722 18.6164 6.03535 18.9894C5.06413 19.3621 4.17579 19.206 3.55927 18.9765C3.25065 18.8616 3.00038 18.7252 2.8256 18.6166C2.53669 18.4569 2.28633 18.2309 2.19727 18.1379C2.22242 17.9489 2.28584 17.5289 2.33837 17.3611C2.39424 17.1635 2.48727 16.8948 2.63821 16.6029C2.93999 16.0193 3.49308 15.3095 4.46495 14.9366C5.43617 14.5639 6.32451 14.72 6.94103 14.9494C7.24965 15.0643 7.49992 15.2007 7.6747 15.3093C7.8343 15.4149 8.1834 15.6585 8.30303 15.788C8.27569 15.9835 8.2092 16.4125 8.16193 16.5648Z',
  d23: 'M3.14588 8.35585C3.86327 8.39438 4.81338 8.62787 5.62166 9.42701C6.42855 10.2248 6.68051 11.1774 6.73644 11.8971C6.76445 12.2574 6.74456 12.5693 6.71746 12.7932C6.69714 13.0243 6.5924 13.4275 6.54257 13.6002C6.35795 13.6571 5.93958 13.7768 5.74306 13.8007C5.52155 13.8342 5.21249 13.8626 4.85412 13.8434C4.13673 13.8048 3.18662 13.5713 2.37834 12.7722C1.57145 11.9744 1.31949 11.0218 1.26355 10.3021C1.23555 9.94182 1.25544 9.62988 1.28254 9.40599C1.30235 9.1839 1.40739 8.77547 1.45743 8.59902C1.61979 8.54405 2.00699 8.42699 2.25694 8.39852C2.47845 8.36502 2.78751 8.3366 3.14588 8.35585Z',
  d24: 'M5.74593 8.40702C5.60163 8.2492 5.41453 8.01954 5.23788 7.72601C4.88493 7.13955 4.55498 6.26345 4.74127 5.19973C4.92779 4.13467 5.53595 3.42881 6.06935 3.00308C6.33589 2.79035 6.59045 2.64158 6.78021 2.54502C6.9514 2.45134 7.35197 2.30931 7.53085 2.25C7.67504 2.36627 7.99661 2.63743 8.12939 2.79184C8.27368 2.94966 8.46078 3.17933 8.63743 3.47286C8.99038 4.05932 9.32033 4.93542 9.13404 5.99914C8.94752 7.0642 8.33936 7.77006 7.80596 8.19578C7.53942 8.40851 7.28486 8.55729 7.0951 8.65385C6.94539 8.72213 6.58565 8.87671 6.34446 8.94887C6.15128 8.79546 5.86494 8.52372 5.74593 8.40702Z',
};

export const IconLaurelWreath01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-stroke-rounded IconLaurelWreath01StrokeRounded"
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

export const IconLaurelWreath01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-duotone-rounded IconLaurelWreath01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
        opacity="var(--icon-opacity)" 
        d={d.d8} 
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

export const IconLaurelWreath01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-twotone-rounded IconLaurelWreath01TwotoneRounded"
    >
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
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-solid-rounded IconLaurelWreath01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconLaurelWreath01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-bulk-rounded IconLaurelWreath01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLaurelWreath01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-stroke-sharp IconLaurelWreath01StrokeSharp"
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

export const IconLaurelWreath01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="laurel-wreath-01-solid-sharp IconLaurelWreath01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfLaurelWreath01: TheIconSelfPack = {
  name: 'LaurelWreath01',
  StrokeRounded: IconLaurelWreath01StrokeRounded,
  DuotoneRounded: IconLaurelWreath01DuotoneRounded,
  TwotoneRounded: IconLaurelWreath01TwotoneRounded,
  SolidRounded: IconLaurelWreath01SolidRounded,
  BulkRounded: IconLaurelWreath01BulkRounded,
  StrokeSharp: IconLaurelWreath01StrokeSharp,
  SolidSharp: IconLaurelWreath01SolidSharp,
};