
"use client";

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Leaf } from 'lucide-react';

export function ManagedImage(props: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Leaf className="h-1/4 w-1/4 text-muted-foreground/50" />
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
