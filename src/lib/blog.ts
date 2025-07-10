
import postsData from '@/content/blog-posts.json';

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

// This function is kept for potential future use if switching back to file-based logic on server components
export async function getAllPosts(): Promise<Post[]> {
  // For now, it just returns the imported JSON data, sorted.
  return [...postsData]
    .map(p => p as Post)
    .sort((post1, post2) => new Date(post2.frontmatter.date).getTime() - new Date(post1.frontmatter.date).getTime());
}
