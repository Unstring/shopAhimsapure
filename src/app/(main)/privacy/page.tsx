
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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
  
  // A hack to replace the date placeholder
  const finalContent = contentHtml.replace(
      '{new Date().toLocaleDateString(\'en-US\', { year: \'numeric\', month: \'long\', day: \'numeric\' })}', 
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  );

  return (
    <div 
      className="max-w-3xl mx-auto prose prose-lg prose-headings:font-headline prose-a:text-primary hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: finalContent }}
    />
  );
}
