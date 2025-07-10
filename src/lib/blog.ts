
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import ReactMarkdown from 'react-markdown';


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
    content: string; // This will now be raw markdown
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

        return {
            slug,
            frontmatter: data as PostFrontmatter,
            content: content, // Store raw markdown
        };
    } catch (error) {
        return null;
    }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const postsPromises = slugs.map(slug => getPostBySlug(slug));
  const posts = await Promise.all(postsPromises);
  
  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => new Date(post2.frontmatter.date).getTime() - new Date(post1.frontmatter.date).getTime());
}
