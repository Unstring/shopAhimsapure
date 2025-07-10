import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type PostFrontmatter = {
    title: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorRole: string;
    category: string;
    image: string;
    excerpt: string;
}

export type Post = {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string;
};

export async function getPostSlugs() {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    try {
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            frontmatter: data as PostFrontmatter,
            content: contentHtml,
        };
    } catch (error) {
        // If file not found or other error, return null
        return null;
    }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)));

  // Filter out any null posts and sort by date in descending order
  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
}
