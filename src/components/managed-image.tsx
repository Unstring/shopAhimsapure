
"use client";

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { LogoIcon } from './logo';

export function ManagedImage(props: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <img src="/unavailable_product.png" alt="Unavailable product" className="object-contain opacity-50" />
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setError(true)}
    />
  );
}
