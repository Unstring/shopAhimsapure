
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PrivacyPolicyContent } from '@/components/privacy-policy-content';

async function getPrivacyPolicy() {
  const filePath = path.join(process.cwd(), 'src/content/privacy-policy.md');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return contentHtml;
}

export default async function PrivacyPolicyPage() {
  const contentHtml = await getPrivacyPolicy();

  return (
    <PrivacyPolicyContent contentHtml={contentHtml} />
  );
}
