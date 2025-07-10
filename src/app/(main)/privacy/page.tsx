
"use client";

import ReactMarkdown from 'react-markdown';
import privacyPolicyData from '@/content/privacy-policy.json';

export default function PrivacyPolicyPage() {
  const { title, lastUpdated, content } = privacyPolicyData;
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const finalContent = content.replace('{current_date}', formattedDate);

  return (
    <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-headline font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{lastUpdated.replace('{current_date}', formattedDate)}</p>
        <div
            className="prose prose-lg max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:underline prose-p:text-muted-foreground"
        >
             <ReactMarkdown>{finalContent}</ReactMarkdown>
        </div>
    </div>
  );
}
