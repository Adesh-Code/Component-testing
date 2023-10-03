import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface ColorType {
  Primary?: string;
  Secondary?: string;
  Error?: string;
  Success?: string;
  Warning?: string;
  White?: string;
  Bg?: string;
  Gray?: string;
}

export interface ButtonPropsType {
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: (e: React.SyntheticEvent<HTMLButtonElement, Event>) => unknown;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  variant?: ButtonVariants;
  width?: 'auto' | 'full';
  isDisabled?: boolean;
  isLoading?: boolean;
  href?: string;
  title?: string;
  style?: Partial<React.CSSProperties>;
  className?: string;
}

export enum ButtonVariants {
  Solid = 'solid',
  Outlined = 'outlined',
  Link = 'link',
}
