import * as React from 'react';
import Image from 'next/image';
import AhimsapureSVG from '../app/Ahimsapure.svg';

// Icon only
export function LogoIcon(props: React.ComponentProps<'span'>) {
  return (
    <span {...props} style={{ display: 'inline-flex', alignItems: 'center', ...props.style }}>
      <img src="/Ahimsapure.svg" width={32} height={32} alt="Ahimsapure Logo Icon" />
    </span>
  );
}

// Text only
export function LogoText(props: React.ComponentProps<'span'>) {
  return (
    <span {...props} style={{ fontFamily: 'inherit', fontWeight: 700, fontSize: '1.5rem', ...props.style }}>
      Ahimsa Pure
    </span>
  );
}

// Icon + Text (default)
export function Logo({ showIcon = true, showText = true, iconProps = {}, textProps = {}, ...rest }: {
  showIcon?: boolean;
  showText?: boolean;
  iconProps?: React.ComponentProps<'span'>;
  textProps?: React.ComponentProps<'span'>;
} & React.ComponentProps<'span'>) {
  return (
    <span {...rest} style={{ display: 'inline-flex', alignItems: 'center', gap: 1, ...rest.style }}>
      {showIcon && <LogoIcon {...iconProps} />}
      {showText && <LogoText {...textProps} />}
    </span>
  );
}

// For config-based usage
export const LogoConfig = {
  Icon: LogoIcon,
  Text: LogoText,
  Both: Logo,
};

export default Logo; 