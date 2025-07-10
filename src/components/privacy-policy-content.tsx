"use client";

import { useState, useEffect } from 'react';

interface PrivacyPolicyContentProps {
  contentHtml: string;
}

export function PrivacyPolicyContent({ contentHtml }: PrivacyPolicyContentProps) {
  const [finalContent, setFinalContent] = useState(contentHtml);

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setFinalContent(contentHtml.replace('{new Date().toLocaleDateString(\'en-US\', { year: \'numeric\', month: \'long\', day: \'numeric\' })}', formattedDate));
  }, [contentHtml]);

  return (
    <div
      className="max-w-3xl mx-auto prose prose-lg prose-headings:font-headline prose-a:text-primary hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: finalContent }}
    />
  );
}
